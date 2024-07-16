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
import { AggregateID, Result, Mapper, Paginated } from "@shared";
import { MedicalRecord } from "./../../domain";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";
import { SQLiteDatabase } from "expo-sqlite";
import { MedicalRecordPersistenceType } from "./types";
import { MedicalRecordDto } from "./../dtos";
import { MedicalRecordRepositoryError, MedicalRecordRepositoryNotFoundException } from "./errors/MedicalRecordRepositoryError";

export class MedicalRecordRepositoryImpl implements MedicalRecordRepository {
   private db;
   constructor(
      expo: SQLiteDatabase,
      private mapper: Mapper<MedicalRecord, MedicalRecordPersistenceType, MedicalRecordDto>,
      private consultationInfoRepo: ConsultationInformationRepository,
      private foodDiaryRepo: FoodDiaryRepository,
      private foodStoryRepo: FoodStoryRepository,
      private medicalStoryRepo: MedicalStoryRepository,
      private objectiveRepo: ObjectiveRepository,
      private patientMeasurementRepo: PatientMeasurementRepository,
      private personalAndSocialStoryRepo: PersonalAndSocialStoryRepository,
   ) {
      this.db = drizzle(expo);
   }
   async save(medicalRecord: MedicalRecord): Promise<void> {
      try {
         const persistenceMedicalRecord = this.mapper.toPersistence(medicalRecord);
         const exist = await this.checkIfExist(persistenceMedicalRecord.id);
         
         
      } catch (e: any) {
         throw new MedicalRecordRepositoryError("Erreur lors de la sauvegarde du dossier medicale(MedicalRecord)", e as Error, {});
      }
   }
   async getById(medicalRecordId: AggregateID): Promise<MedicalRecord> {
      try {
         const medicalRecord = await this.db
            .select()
            .from(medicalRecords)
            .where(eq(medicalRecords.id, medicalRecordId as string))
            .get();
         if (!medicalRecord)
            throw new MedicalRecordRepositoryNotFoundException("MedicalRecord non trouvée pour l'ID donné", new Error(""), {
               medicalRecordId,
            });
         return this.mapper.toDomain(medicalRecord as MedicalRecordPersistenceType);
      } catch (e: any) {
         throw new MedicalRecordRepositoryError("Erreur lors de la récupération du MedicalRecord par ID", e as Error, {
            medicalRecordId,
         });
      }
   }
   async delete(medicalRecordId: AggregateID): Promise<void> {
      try {
         
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
