import { GetFoodStoryError } from "./GetFoodStoryError";
import { GetFoodStoryRequest } from "./GetFoodStoryRequest";
import { GetFoodStoryResponse } from "./GetFoodStoryResponse";
import { MedicalRecord } from "./../../../../domain";
import { MedicalRecordDto, MedicalRecordPersistenceType, FoodStoryDto } from "./../../../../infrastructure";
import { MedicalRecordRepository, MedicalRecordRepositoryError } from "./../../../../infrastructure";
import { UseCase, AggregateID, Mapper } from "@shared";

export class GetFoodStoryUseCase implements UseCase<GetFoodStoryRequest, GetFoodStoryResponse> {
   constructor(
      private medicalRecordRepo: MedicalRecordRepository,
      private medicalRecordMapper: Mapper<MedicalRecord, MedicalRecordPersistenceType, MedicalRecordDto>,
   ) {}

   async execute(request: GetFoodStoryRequest): Promise<GetFoodStoryResponse> {
      try {
         const medicalRecord = await this.getMedicalRecord(request.patientId);
         const foodStory = this.getFoodStoryToMedicalRecord(medicalRecord);
         return { foodStory };
      } catch (e: any) {
         this.handleErrors(e, request);
      }
   }

   private async getMedicalRecord(medicalRecordId: AggregateID): Promise<MedicalRecord> {
      try {
         return await this.medicalRecordRepo.getById(medicalRecordId);
      } catch (e) {
         throw new GetFoodStoryError("Failed to retrieve medical record.", e as Error);
      }
   }

   private getFoodStoryToMedicalRecord(medicalRecord: MedicalRecord): FoodStoryDto {
      const reponseMedicalRecord = this.medicalRecordMapper.toResponse(medicalRecord);
      return reponseMedicalRecord.foodStory as FoodStoryDto;
   }

   private handleErrors(e: any, request: GetFoodStoryRequest): never {
      if (e instanceof MedicalRecordRepositoryError) {
         throw new GetFoodStoryError(e.message, e as Error, e.metadata);
      }
      throw new GetFoodStoryError(`Unexpected error: ${e?.constructor.name}`, e as Error, request);
   }
}
