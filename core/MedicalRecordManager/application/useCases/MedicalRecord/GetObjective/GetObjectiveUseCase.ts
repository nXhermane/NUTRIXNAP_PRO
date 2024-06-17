import { GetObjectiveError } from "./GetObjectiveError";
import { GetObjectiveRequest } from "./GetObjectiveRequest";
import { GetObjectiveResponse } from "./GetObjectiveResponse";
import { MedicalRecord } from "./../../../../domain";
import { MedicalRecordDto, MedicalRecordPersistenceType, ObjectiveDto } from "./../../../../infrastructure";
import { MedicalRecordRepository, MedicalRecordRepositoryError } from "./../../../../infrastructure";
import { UseCase, AggregateID, Mapper } from "@shared";

export class GetObjectiveUseCase implements UseCase<GetObjectiveRequest, GetObjectiveResponse> {
   constructor(
      private medicalRecordRepo: MedicalRecordRepository,
      private medicalRecordMapper: Mapper<MedicalRecord, MedicalRecordPersistenceType, MedicalRecordDto>,
   ) {}

   async execute(request: GetObjectiveRequest): Promise<GetObjectiveResponse> {
      try {
         const medicalRecord = await this.getMedicalRecord(request.patientId);
         const objective = this.getObjectiveToMedicalRecord(medicalRecord, request.objectiveId);
         return { objective };
      } catch (e: any) {
         this.handleErrors(e, request);
      }
   }

   private async getMedicalRecord(medicalRecordId: AggregateID): Promise<MedicalRecord> {
      try {
         return await this.medicalRecordRepo.getById(medicalRecordId);
      } catch (e) {
         throw new GetObjectiveError("Failed to retrieve medical record.", e as Error);
      }
   }

   private getObjectiveToMedicalRecord(medicalRecord: MedicalRecord, objectiveId: AggregateID): ObjectiveDto {
      const reponseMedicalRecord = this.medicalRecordMapper.toResponse(medicalRecord);
      return reponseMedicalRecord.objectives.find((objective: ObjectiveDto) => objective.id === objectiveId) as ObjectiveDto;
   }

   private handleErrors(e: any, request: GetObjectiveRequest): never {
      if (e instanceof MedicalRecordRepositoryError) {
         throw new GetObjectiveError(e.message, e as Error, e.metadata);
      }
      throw new GetObjectiveError(`Unexpected error: ${e?.constructor.name}`, e as Error, request);
   }
}
