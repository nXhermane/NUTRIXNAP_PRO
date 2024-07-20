import { medicalRecords } from "./../database/medicalRecord.schema";
import {
   MedicalRecordRepository,
   ConsultationInformationRepository,
   FoodDiaryRepository,
   FoodStoryRepository,
   MedicalStoryRepository,
   ObjectiveRepository,
   PatientMeasurementRepository,
   PersonalAndSocialStoryRepository,
} from "./interfaces";
import { AggregateID, Mapper } from "@shared";
import { MedicalRecord, FoodDiary, Objective } from "./../../domain";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";
import { SQLiteDatabase } from "expo-sqlite";
import { MedicalRecordPersistenceType } from "./types";
import { MedicalRecordDto } from "./../dtos";
import { MedicalRecordRepositoryError, MedicalRecordRepositoryNotFoundException } from "./errors/MedicalRecordRepositoryError";

interface Repositories {
   consultationInfoRepo: ConsultationInformationRepository;
   foodDiaryRepo: FoodDiaryRepository;
   foodStoryRepo: FoodStoryRepository;
   medicalStoryRepo: MedicalStoryRepository;
   objectiveRepo: ObjectiveRepository;
   patientMeasurementRepo: PatientMeasurementRepository;
   personalAndSocialStoryRepo: PersonalAndSocialStoryRepository;
}

export class MedicalRecordRepositoryImpl implements MedicalRecordRepository {
   private db;

   constructor(
      expo: SQLiteDatabase,
      private mapper: Mapper<MedicalRecord, MedicalRecordPersistenceType, MedicalRecordDto>,
      private repositories: Repositories,
   ) {
      this.db = drizzle(expo);
   }

   async save(medicalRecord: MedicalRecord): Promise<void> {
      const { consultationInformation, foodStory, medicalStory, measure, personalAndSocialStory, foodDiaries, objectives } = medicalRecord.getProps();
      const persistenceMedicalRecord = this.mapper.toPersistence(medicalRecord);
      const exist = await this.checkIfExist(persistenceMedicalRecord.id);

      try {
         await this.db.transaction(async (tx) => {
            await this.repositories.consultationInfoRepo.save(consultationInformation, tx);
            await this.repositories.foodStoryRepo.save(foodStory, tx);
            await this.repositories.medicalStoryRepo.save(medicalStory, tx);
            await this.repositories.patientMeasurementRepo.save(measure, tx);
            await this.repositories.personalAndSocialStoryRepo.save(personalAndSocialStory, tx);
            await Promise.all(foodDiaries.map((foodDiary) => this.repositories.foodDiaryRepo.save(foodDiary, tx)));
            await Promise.all(objectives.map((obj) => this.repositories.objectiveRepo.save(obj, tx)));

            if (!exist) {
               await tx.insert(medicalRecords).values(persistenceMedicalRecord);
            } else {
               await tx.update(medicalRecords).set(persistenceMedicalRecord).where(eq(medicalRecords.id, persistenceMedicalRecord.id));
            }
         });
      } catch (e: any) {
         throw new MedicalRecordRepositoryError("Erreur lors de la sauvegarde du dossier medicale (MedicalRecord)", e as Error, {});
      }
   }

   async getById(medicalRecordId: AggregateID): Promise<MedicalRecord> {
      try {
         const medicalRecord = await this.db
            .select()
            .from(medicalRecords)
            .where(eq(medicalRecords.id, medicalRecordId as string))
            .get();

         if (!medicalRecord) {
            throw new MedicalRecordRepositoryNotFoundException("MedicalRecord non trouvée pour l'ID donné", new Error(""), { medicalRecordId });
         }

         return this.mapper.toDomain(medicalRecord as MedicalRecordPersistenceType);
      } catch (e: any) {
         throw new MedicalRecordRepositoryError("Erreur lors de la récupération du MedicalRecord par ID", e as Error, { medicalRecordId });
      }
   }

   async delete(medicalRecordId: AggregateID): Promise<void> {
      try {
         const medicalRecordRaw = await this.db
            .select()
            .from(medicalRecords)
            .where(eq(medicalRecords.id, medicalRecordId as string))
            .get();

         await this.db.transaction(async (tx) => {
            const { medicalStoryId, foodStoryId, consultationInformationId, patientMeasurementId, objectiveIds, foodDiaryIds } = medicalRecordRaw;
            await this.repositories.medicalStoryRepo.delete(medicalStoryId, tx);
            await this.repositories.foodStoryRepo.delete(foodStoryId, tx);
            await this.repositories.consultationInfoRepo.delete(consultationInformationId, tx);
            await this.repositories.patientMeasurementRepo.delete(patientMeasurementId, tx);
            await Promise.all(objectiveIds.map((objId) => this.repositories.objectiveRepo.delete(objId, tx)));
            await Promise.all(foodDiaryIds.map((foodDiaryId) => this.repositories.foodDiaryRepo.delete(foodDiaryId, tx)));
            await tx.delete(medicalRecords).where(eq(medicalRecords.id, medicalRecordId as string));
         });
      } catch (error: any) {
         throw new MedicalRecordRepositoryError("Erreur lors de la suppression du MedicalRecord", error as Error, {});
      }
   }

   private async checkIfExist(medicalRecordId: AggregateID): Promise<boolean> {
      const medicalRecord = await this.db
         .select()
         .from(medicalRecords)
         .where(eq(medicalRecords.id, medicalRecordId as string))
         .get();
      return !!medicalRecord;
   }
}
