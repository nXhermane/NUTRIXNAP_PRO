import { CreateFoodDiaryError } from './CreateFoodDiaryError';
import { CreateFoodDiaryRequest } from './CreateFoodDiaryRequest';
import { CreateFoodDiaryResponse } from './CreateFoodDiaryResponse';
import { MedicalRecordFactory, Patient, MedicalRecord, FoodDiary } from './../../../../domain';
import { PatientRepository, MedicalRecordRepository, PatientRepositoryError, MedicalRecordRepositoryError } from './../../../../infrastructure';
import { Image, FileManager, UseCase, AggregateID } from '@shared';

export class CreatePatientUseCase implements UseCase<CreateFoodDiaryRequest, CreateFoodDiaryResponse> {
   constructor(
      private patientRepo: PatientRepository,
      private medicalRecordRepo: MedicalRecordRepository,
      private medicalRecordFactory: MedicalRecordFactory,
      private fileManager: FileManager,
   ) {}

   async execute(request: CreateFoodDiaryRequest): Promise<CreateFoodDiaryResponse> {
      try {
         const foodDiary = await this.createFoodDiary(request);
         const patient = await this.getPatient(request.patientId);
         const medicalRecord = await this.getMedicalRecord(patient.medicalRecordId);
         await this.saveFoodDiaryImages(foodDiary, patient);
         this.addFoodDiaryToMedicalRecord(medicalRecord, foodDiary);
         await this.saveMedicalRecord(medicalRecord);

         return { foodDiaryId: foodDiary.id };
      } catch (e: any) {
         this.handleErrors(e, request);
      }
   }

   private async createFoodDiary(request: CreateFoodDiaryRequest): Promise<FoodDiary> {
      const foodDiary = await this.medicalRecordFactory.createFoodDiary(request.data);
      if (foodDiary.isFailure) throw new CreateFoodDiaryError('Create Food Diary failed.');
      return foodDiary.val;
   }

   private async getPatient(patientId: AggregateID): Promise<Patient> {
      try {
         return await this.patientRepo.getById(patientId);
      } catch (e) {
         throw new CreateFoodDiaryError('Failed to retrieve patient.', e as Error);
      }
   }

   private async getMedicalRecord(medicalRecordId: AggregateID): Promise<MedicalRecord> {
      try {
         return await this.medicalRecordRepo.getById(medicalRecordId);
      } catch (e) {
         throw new CreateFoodDiaryError('Failed to retrieve medical record.', e as Error);
      }
   }

   private async saveFoodDiaryImages(foodDiary: FoodDiary, patient: Patient) {
      const imagesDir = `${patient.id}-${patient.name}/foodDiaries`;
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
         throw new CreateFoodDiaryError('Failed to save medical record.', e as Error);
      }
   }

   private handleErrors(e: any, request: CreateFoodDiaryRequest): never {
      if (e instanceof PatientRepositoryError || e instanceof MedicalRecordRepositoryError) {
         throw new CreateFoodDiaryError(e.message, e as Error, e.metadata);
      }
      throw new CreateFoodDiaryError(`Unexpected error: ${e?.constructor.name}`, e as Error, request);
   }
}
