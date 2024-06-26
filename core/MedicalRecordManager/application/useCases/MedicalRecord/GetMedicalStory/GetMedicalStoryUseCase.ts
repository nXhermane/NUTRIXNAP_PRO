import { GetMedicalStoryError } from "./GetMedicalStoryError";
import { GetMedicalStoryRequest } from "./GetMedicalStoryRequest";
import { GetMedicalStoryResponse } from "./GetMedicalStoryResponse";
import { MedicalRecord } from "./../../../../domain";
import { MedicalRecordDto, MedicalRecordPersistenceType, MedicalStoryDto } from "./../../../../infrastructure";
import { MedicalRecordRepository, MedicalRecordRepositoryError } from "./../../../../infrastructure";
import { UseCase, AggregateID, Mapper } from "@shared";

export class GetMedicalStoryUseCase implements UseCase<GetMedicalStoryRequest, GetMedicalStoryResponse> {
   constructor(
      private medicalRecordRepo: MedicalRecordRepository,
      private medicalRecordMapper: Mapper<MedicalRecord, MedicalRecordPersistenceType, MedicalRecordDto>,
   ) {}

   async execute(request: GetMedicalStoryRequest): Promise<GetMedicalStoryResponse> {
      try {
         const medicalRecord = await this.getMedicalRecord(request.patientId);
         const medicalStory = this.getMedicalStoryStoryToMedicalRecord(medicalRecord);
         return { medicalStory };
      } catch (e: any) {
         this.handleErrors(e, request);
      }
   }

   private async getMedicalRecord(medicalRecordId: AggregateID): Promise<MedicalRecord> {
      try {
         return await this.medicalRecordRepo.getById(medicalRecordId);
      } catch (e) {
         throw new GetMedicalStoryError("Failed to retrieve medical record.", e as Error);
      }
   }

   private getMedicalStoryStoryToMedicalRecord(medicalRecord: MedicalRecord): MedicalStoryDto {
      const reponseMedicalRecord = this.medicalRecordMapper.toResponse(medicalRecord);
      return reponseMedicalRecord.medicalStory as MedicalStoryDto;
   }

   private handleErrors(e: any, request: GetMedicalStoryRequest): never {
      if (e instanceof MedicalRecordRepositoryError) {
         throw new GetMedicalStoryError(e.message, e as Error, e.metadata);
      }
      throw new GetMedicalStoryError(`Unexpected error: ${e?.constructor.name}`, e as Error, request);
   }
}
