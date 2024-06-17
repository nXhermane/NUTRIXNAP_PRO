import { GetAllObjectiveError } from "./GetAllObjectiveError";
import { GetAllObjectiveRequest } from "./GetAllObjectiveRequest";
import { GetAllObjectiveResponse } from "./GetAllObjectiveResponse";
import { MedicalRecord } from "./../../../../domain";
import { MedicalRecordDto, MedicalRecordPersistenceType, ObjectiveDto } from "./../../../../infrastructure";
import { MedicalRecordRepository, MedicalRecordRepositoryError } from "./../../../../infrastructure";
import { UseCase, AggregateID, Mapper } from "@shared";

export class GetAllObjectiveUseCase implements UseCase<GetAllObjectiveRequest, GetAllObjectiveResponse> {
   constructor(
      private medicalRecordRepo: MedicalRecordRepository,
      private medicalRecordMapper: Mapper<MedicalRecord, MedicalRecordPersistenceType, MedicalRecordDto>,
   ) {}

   async execute(request: GetAllObjectiveRequest): Promise<GetAllObjectiveResponse> {
      try {
         const medicalRecord = await this.getMedicalRecord(request.patientId);
         const objectives = this.getAllObjectiveToMedicalRecord(medicalRecord);
         return { objectives };
      } catch (e: any) {
         this.handleErrors(e, request);
      }
   }

   private async getMedicalRecord(medicalRecordId: AggregateID): Promise<MedicalRecord> {
      try {
         return await this.medicalRecordRepo.getById(medicalRecordId);
      } catch (e) {
         throw new GetAllObjectiveError("Failed to retrieve medical record.", e as Error);
      }
   }

   private getAllObjectiveToMedicalRecord(medicalRecord: MedicalRecord): ObjectiveDto[] {
      const reponseMedicalRecord = this.medicalRecordMapper.toResponse(medicalRecord);
      return reponseMedicalRecord.objectives;
   }

   private handleErrors(e: any, request: GetAllObjectiveRequest): never {
      if (e instanceof MedicalRecordRepositoryError) {
         throw new GetAllObjectiveError(e.message, e as Error, e.metadata);
      }
      throw new GetAllObjectiveError(`Unexpected error: ${e?.constructor.name}`, e as Error, request);
   }
}
