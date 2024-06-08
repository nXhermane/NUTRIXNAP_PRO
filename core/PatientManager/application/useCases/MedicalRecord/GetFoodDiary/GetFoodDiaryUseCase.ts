import { GetFoodDiaryError } from './GetFoodDiaryError';
import { GetFoodDiaryRequest } from './GetFoodDiaryRequest';
import { GetFoodDiaryResponse } from './GetFoodDiaryResponse';
import { Patient, MedicalRecord } from './../../../../domain';
import { MedicalRecordDto, MedicalRecordPersistenceType, FoodDiaryDto } from './../../../../infrastructure';
import { PatientRepository, MedicalRecordRepository, PatientRepositoryError, MedicalRecordRepositoryError } from './../../../../infrastructure';
import { UseCase, AggregateID, Mapper } from '@shared';

export class GetFoodDiaryUseCase implements UseCase<GetFoodDiaryRequest, GetFoodDiaryResponse> {
   constructor(
      private patientRepo: PatientRepository,
      private medicalRecordRepo: MedicalRecordRepository,
      private medicalRecordMapper: Mapper<MedicalRecord, MedicalRecordPersistenceType, MedicalRecordDto>,
   ) {}

   async execute(request: GetFoodDiaryRequest): Promise<GetFoodDiaryResponse> {
      try {
         const patient = await this.getPatient(request.patientId);
         const medicalRecord = await this.getMedicalRecord(patient.medicalRecordId);
         const foodDiary = this.getFoodDiaryToMedicalRecord(medicalRecord, request.foodDiaryId);
         return { foodDiary };
      } catch (e: any) {
         this.handleErrors(e, request);
      }
   }

   private async getPatient(patientId: AggregateID): Promise<Patient> {
      try {
         return await this.patientRepo.getById(patientId);
      } catch (e) {
         throw new GetFoodDiaryError('Failed to retrieve patient.', e as Error);
      }
   }

   private async getMedicalRecord(medicalRecordId: AggregateID): Promise<MedicalRecord> {
      try {
         return await this.medicalRecordRepo.getById(medicalRecordId);
      } catch (e) {
         throw new GetFoodDiaryError('Failed to retrieve medical record.', e as Error);
      }
   }

   private getFoodDiaryToMedicalRecord(medicalRecord: MedicalRecord, foodDiaryId: AggregateID): FoodDiaryDto {
      const reponseMedicalRecord = this.medicalRecordMapper.toResponse(medicalRecord);
      return reponseMedicalRecord.foodDiaries.find((foodDairy: FoodDiaryDto) => foodDairy.id === foodDiaryId) as FoodDiaryDto;
   }

   private handleErrors(e: any, request: GetFoodDiaryRequest): never {
      if (e instanceof PatientRepositoryError || e instanceof MedicalRecordRepositoryError) {
         throw new GetFoodDiaryError(e.message, e as Error, e.metadata);
      }
      throw new GetFoodDiaryError(`Unexpected error: ${e?.constructor.name}`, e as Error, request);
   }
}
