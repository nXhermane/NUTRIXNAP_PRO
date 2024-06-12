import { GetFoodStoryError } from './GetFoodStoryError';
import { GetFoodStoryRequest } from './GetFoodStoryRequest';
import { GetFoodStoryResponse } from './GetFoodStoryResponse';
import { Patient, MedicalRecord } from './../../../../domain';
import { MedicalRecordDto, MedicalRecordPersistenceType, FoodStoryDto } from './../../../../infrastructure';
import { PatientRepository, MedicalRecordRepository, PatientRepositoryError, MedicalRecordRepositoryError } from './../../../../infrastructure';
import { UseCase, AggregateID, Mapper } from '@shared';

export class GetFoodStoryUseCase implements UseCase<GetFoodStoryRequest, GetFoodStoryResponse> {
   constructor(
      private patientRepo: PatientRepository,
      private medicalRecordRepo: MedicalRecordRepository,
      private medicalRecordMapper: Mapper<MedicalRecord, MedicalRecordPersistenceType, MedicalRecordDto>,
   ) {}

   async execute(request: GetFoodStoryRequest): Promise<GetFoodStoryResponse> {
      try {
         const patient = await this.getPatient(request.patientId);
         const medicalRecord = await this.getMedicalRecord(patient.medicalRecordId);
         const foodStory = this.getFoodStoryToMedicalRecord(medicalRecord);
         return { foodStory };
      } catch (e: any) {
         this.handleErrors(e, request);
      }
   }

   private async getPatient(patientId: AggregateID): Promise<Patient> {
      try {
         return await this.patientRepo.getById(patientId);
      } catch (e) {
         throw new GetFoodStoryError('Failed to retrieve patient.', e as Error);
      }
   }

   private async getMedicalRecord(medicalRecordId: AggregateID): Promise<MedicalRecord> {
      try {
         return await this.medicalRecordRepo.getById(medicalRecordId);
      } catch (e) {
         throw new GetFoodStoryError('Failed to retrieve medical record.', e as Error);
      }
   }

   private getFoodStoryToMedicalRecord(medicalRecord: MedicalRecord): FoodStoryDto {
      const reponseMedicalRecord = this.medicalRecordMapper.toResponse(medicalRecord);
      return reponseMedicalRecord.foodStory as FoodStoryDto;
   }

   private handleErrors(e: any, request: GetFoodStoryRequest): never {
      if (e instanceof PatientRepositoryError || e instanceof MedicalRecordRepositoryError) {
         throw new GetFoodStoryError(e.message, e as Error, e.metadata);
      }
      throw new GetFoodStoryError(`Unexpected error: ${e?.constructor.name}`, e as Error, request);
   }
}
