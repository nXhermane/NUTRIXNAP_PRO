import { CreateFoodDiaryError } from "./CreateFoodDiaryError";
import { CreateFoodDiaryRequest } from "./CreateFoodDiaryRequest";
import { CreateFoodDiaryResponse } from "./CreateFoodDiaryResponse";
import { MedicalRecord, FoodDiary } from "./../../../../domain";
import { MedicalRecordRepository, MedicalRecordRepositoryError } from "./../../../../infrastructure";
import { Image, FileManager, UseCase, AggregateID } from "@shared";

export class CreatePatientUseCase implements UseCase<CreateFoodDiaryRequest, CreateFoodDiaryResponse> {
   constructor(
      private medicalRecordRepo: MedicalRecordRepository,

      private fileManager: FileManager,
   ) {}

   async execute(request: CreateFoodDiaryRequest): Promise<CreateFoodDiaryResponse> {
      try {
         const foodDiary = await this.createFoodDiary(request);
         const medicalRecord = await this.getMedicalRecord(request.patientId);
         await this.saveFoodDiaryImages(foodDiary, medicalRecord.id);
         this.addFoodDiaryToMedicalRecord(medicalRecord, foodDiary);
         await this.saveMedicalRecord(medicalRecord);

         return { foodDiaryId: foodDiary.id };
      } catch (e: any) {
         this.handleErrors(e, request);
      }
   }

   private async createFoodDiary(request: CreateFoodDiaryRequest): Promise<FoodDiary> {
      const foodDiary = await FoodDiary.create(request.data);
      if (foodDiary.isFailure) throw new CreateFoodDiaryError("Create Food Diary failed.");
      return foodDiary.val;
   }

   private async getMedicalRecord(medicalRecordId: AggregateID): Promise<MedicalRecord> {
      try {
         return await this.medicalRecordRepo.getById(medicalRecordId);
      } catch (e) {
         throw new CreateFoodDiaryError("Failed to retrieve medical record.", e as Error);
      }
   }

   private async saveFoodDiaryImages(foodDiary: FoodDiary, medicalRecordId: AggregateID) {
      const imagesDir = `${medicalRecordId}/foodDiaries`;
      const images = await Promise.all(
         foodDiary.getImage().map(
            async (img: Image) =>
               await this.fileManager.save({
                  file: img,
                  dirname: imagesDir,
               }),
         ),
      );
      foodDiary.images = images;
   }

   private addFoodDiaryToMedicalRecord(medicalRecord: MedicalRecord, foodDiary: FoodDiary) {
      medicalRecord.addFoodDiary(foodDiary);
   }

   private async saveMedicalRecord(medicalRecord: any) {
      try {
         await this.medicalRecordRepo.save(medicalRecord);
      } catch (e) {
         throw new CreateFoodDiaryError("Failed to save medical record.", e as Error);
      }
   }

   private handleErrors(e: any, request: CreateFoodDiaryRequest): never {
      if (e instanceof MedicalRecordRepositoryError) {
         throw new CreateFoodDiaryError(e.message, e as Error, e.metadata);
      }
      throw new CreateFoodDiaryError(`Unexpected error: ${e?.constructor.name}`, e as Error, request);
   }
}
