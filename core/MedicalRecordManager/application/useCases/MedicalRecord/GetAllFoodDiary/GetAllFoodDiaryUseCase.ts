import { GetAllFoodDiaryError } from "./GetAllFoodDiaryError";
import { GetAllFoodDiaryRequest } from "./GetAllFoodDiaryRequest";
import { GetAllFoodDiaryResponse } from "./GetAllFoodDiaryResponse";
import { MedicalRecord } from "./../../../../domain";
import { MedicalRecordDto, MedicalRecordPersistenceType, FoodDiaryDto } from "./../../../../infrastructure";
import { MedicalRecordRepository, MedicalRecordRepositoryError } from "./../../../../infrastructure";
import { UseCase, AggregateID, Mapper } from "@shared";

export class GetAllFoodDiaryUseCase implements UseCase<GetAllFoodDiaryRequest, GetAllFoodDiaryResponse> {
   constructor(
      private medicalRecordRepo: MedicalRecordRepository,
      private medicalRecordMapper: Mapper<MedicalRecord, MedicalRecordPersistenceType, MedicalRecordDto>,
   ) {}

   async execute(request: GetAllFoodDiaryRequest): Promise<GetAllFoodDiaryResponse> {
      try {
         const medicalRecord = await this.getMedicalRecord(request.patientId);
         const foodDiaries = this.getAllFoodDiaryToMedicalRecord(medicalRecord);
         return { foodDiaries };
      } catch (e: any) {
         this.handleErrors(e, request);
      }
   }

   private async getMedicalRecord(medicalRecordId: AggregateID): Promise<MedicalRecord> {
      try {
         return await this.medicalRecordRepo.getById(medicalRecordId);
      } catch (e) {
         throw new GetAllFoodDiaryError("Failed to retrieve medical record.", e as Error);
      }
   }

   private getAllFoodDiaryToMedicalRecord(medicalRecord: MedicalRecord): FoodDiaryDto[] {
      const reponseMedicalRecord = this.medicalRecordMapper.toResponse(medicalRecord);
      return reponseMedicalRecord.foodDiaries;
   }

   private handleErrors(e: any, request: GetAllFoodDiaryRequest): never {
      if (e instanceof MedicalRecordRepositoryError) {
         throw new GetAllFoodDiaryError(e.message, e as Error, e.metadata);
      }
      throw new GetAllFoodDiaryError(`Unexpected error: ${e?.constructor.name}`, e as Error, request);
   }
}
