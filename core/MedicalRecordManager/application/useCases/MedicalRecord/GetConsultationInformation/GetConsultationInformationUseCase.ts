import { GetConsultationInformationError } from "./GetConsultationInformationError";
import { GetConsultationInformationRequest } from "./GetConsultationInformationRequest";
import { GetConsultationInformationResponse } from "./GetConsultationInformationResponse";
import { MedicalRecord } from "./../../../../domain";
import { MedicalRecordDto, MedicalRecordPersistenceType, ConsultationInformationDto } from "./../../../../infrastructure";
import { MedicalRecordRepository, MedicalRecordRepositoryError } from "./../../../../infrastructure";
import { UseCase, AggregateID, Mapper } from "@shared";

export class GetConsultationInformationUseCase implements UseCase<GetConsultationInformationRequest, GetConsultationInformationResponse> {
   constructor(
      private medicalRecordRepo: MedicalRecordRepository,
      private medicalRecordMapper: Mapper<MedicalRecord, MedicalRecordPersistenceType, MedicalRecordDto>,
   ) {}

   async execute(request: GetConsultationInformationRequest): Promise<GetConsultationInformationResponse> {
      try {
         const medicalRecord = await this.getMedicalRecord(request.patientId);
         const consultationInformation = this.getConsultationInformationToMedicalRecord(medicalRecord);
         return { consultationInformation };
      } catch (e: any) {
         this.handleErrors(e, request);
      }
   }

   private async getMedicalRecord(medicalRecordId: AggregateID): Promise<MedicalRecord> {
      try {
         return await this.medicalRecordRepo.getById(medicalRecordId);
      } catch (e) {
         throw new GetConsultationInformationError("Failed to retrieve medical record.", e as Error);
      }
   }

   private getConsultationInformationToMedicalRecord(medicalRecord: MedicalRecord): ConsultationInformationDto {
      const reponseMedicalRecord = this.medicalRecordMapper.toResponse(medicalRecord);
      return reponseMedicalRecord.consultationInformation;
   }

   private handleErrors(e: any, request: GetConsultationInformationRequest): never {
      if (e instanceof MedicalRecordRepositoryError) {
         throw new GetConsultationInformationError(e.message, e as Error, e.metadata);
      }
      throw new GetConsultationInformationError(`Unexpected error: ${e?.constructor.name}`, e as Error, request);
   }
}
