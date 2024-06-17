import { GetFoodDiaryError } from "./GetFoodDiaryError";
import { GetFoodDiaryRequest } from "./GetFoodDiaryRequest";
import { GetFoodDiaryResponse } from "./GetFoodDiaryResponse";
import { MedicalRecord } from "./../../../../domain";
import { MedicalRecordDto, MedicalRecordPersistenceType, FoodDiaryDto } from "./../../../../infrastructure";
import { MedicalRecordRepository, MedicalRecordRepositoryError } from "./../../../../infrastructure";
import { UseCase, AggregateID, Mapper } from "@shared";

export class GetFoodDiaryUseCase implements UseCase<GetFoodDiaryRequest, GetFoodDiaryResponse> {
   constructor(
      private medicalRecordRepo: MedicalRecordRepository,
      private medicalRecordMapper: Mapper<MedicalRecord, MedicalRecordPersistenceType, MedicalRecordDto>,
   ) {}

   async execute(request: GetFoodDiaryRequest): Promise<GetFoodDiaryResponse> {
      try {
         const medicalRecord = await this.getMedicalRecord(request.patientId);
         const foodDiary = this.getFoodDiaryToMedicalRecord(medicalRecord, request.foodDiaryId);
         return { foodDiary };
      } catch (e: any) {
         this.handleErrors(e, request);
      }
   }

   private async getMedicalRecord(medicalRecordId: AggregateID): Promise<MedicalRecord> {
      try {
         return await this.medicalRecordRepo.getById(medicalRecordId);
      } catch (e) {
         throw new GetFoodDiaryError("Failed to retrieve medical record.", e as Error);
      }
   }

   private getFoodDiaryToMedicalRecord(medicalRecord: MedicalRecord, foodDiaryId: AggregateID): FoodDiaryDto {
      const reponseMedicalRecord = this.medicalRecordMapper.toResponse(medicalRecord);
      return reponseMedicalRecord.foodDiaries.find((foodDairy: FoodDiaryDto) => foodDairy.id === foodDiaryId) as FoodDiaryDto;
   }

   private handleErrors(e: any, request: GetFoodDiaryRequest): never {
      if (e instanceof MedicalRecordRepositoryError) {
         throw new GetFoodDiaryError(e.message, e as Error, e.metadata);
      }
      throw new GetFoodDiaryError(`Unexpected error: ${e?.constructor.name}`, e as Error, request);
   }
}
