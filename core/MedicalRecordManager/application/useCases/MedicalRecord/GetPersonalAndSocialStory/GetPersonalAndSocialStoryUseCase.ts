import { GetPersonalAndSocialStoryError } from "./GetPersonalAndSocialStoryError";
import { GetPersonalAndSocialStoryRequest } from "./GetPersonalAndSocialStoryRequest";
import { GetPersonalAndSocialStoryResponse } from "./GetPersonalAndSocialStoryResponse";
import { MedicalRecord } from "./../../../../domain";
import { MedicalRecordDto, MedicalRecordPersistenceType, PersonalAndSocialStoryDto } from "./../../../../infrastructure";
import { MedicalRecordRepository, MedicalRecordRepositoryError } from "./../../../../infrastructure";
import { UseCase, AggregateID, Mapper } from "@shared";

export class GetPersonalAndSocialStoryUseCase implements UseCase<GetPersonalAndSocialStoryRequest, GetPersonalAndSocialStoryResponse> {
   constructor(
      private medicalRecordRepo: MedicalRecordRepository,
      private medicalRecordMapper: Mapper<MedicalRecord, MedicalRecordPersistenceType, MedicalRecordDto>,
   ) {}

   async execute(request: GetPersonalAndSocialStoryRequest): Promise<GetPersonalAndSocialStoryResponse> {
      try {
         const medicalRecord = await this.getMedicalRecord(request.patientId);
         const personalAndSocialStory = this.getPersonalAndSocialStoryStoryToMedicalRecord(medicalRecord);
         return { personalAndSocialStory };
      } catch (e: any) {
         this.handleErrors(e, request);
      }
   }

   private async getMedicalRecord(medicalRecordId: AggregateID): Promise<MedicalRecord> {
      try {
         return await this.medicalRecordRepo.getById(medicalRecordId);
      } catch (e) {
         throw new GetPersonalAndSocialStoryError("Failed to retrieve medical record.", e as Error);
      }
   }

   private getPersonalAndSocialStoryStoryToMedicalRecord(medicalRecord: MedicalRecord): PersonalAndSocialStoryDto {
      const reponseMedicalRecord = this.medicalRecordMapper.toResponse(medicalRecord);
      return reponseMedicalRecord.personalAndSocialStory as PersonalAndSocialStoryDto;
   }

   private handleErrors(e: any, request: GetPersonalAndSocialStoryRequest): never {
      if (e instanceof MedicalRecordRepositoryError) {
         throw new GetPersonalAndSocialStoryError(e.message, e as Error, e.metadata);
      }
      throw new GetPersonalAndSocialStoryError(`Unexpected error: ${e?.constructor.name}`, e as Error, request);
   }
}
