import { CreateObjectiveError } from "./CreateObjectiveError";
import { CreateObjectiveRequest } from "./CreateObjectiveRequest";
import { CreateObjectiveResponse } from "./CreateObjectiveResponse";
import { MedicalRecord, Objective } from "./../../../../domain";
import { MedicalRecordRepository, MedicalRecordRepositoryError } from "./../../../../infrastructure";
import { UseCase, AggregateID } from "@shared";

export class CreateObjectiveUseCase implements UseCase<CreateObjectiveRequest, CreateObjectiveResponse> {
   constructor(private medicalRecordRepo: MedicalRecordRepository) {}

   async execute(request: CreateObjectiveRequest): Promise<CreateObjectiveResponse> {
      try {
         const objective = await this.createObjective(request);
         const medicalRecord = await this.getMedicalRecord(request.patientId);
         this.addObjectiveToMedicalRecord(medicalRecord, objective);
         await this.saveMedicalRecord(medicalRecord);
         return { objectiveId: objective.id };
      } catch (e: any) {
         this.handleErrors(e, request);
      }
   }

   private async createObjective(request: CreateObjectiveRequest): Promise<Objective> {
      const objective = await Objective.create(request.data);
      if (objective.isFailure) throw new CreateObjectiveError("Create Objective failed.", objective.err as unknown as Error);
      return objective.val;
   }

   private async getMedicalRecord(medicalRecordId: AggregateID): Promise<MedicalRecord> {
      try {
         return await this.medicalRecordRepo.getById(medicalRecordId);
      } catch (e) {
         throw new CreateObjectiveError("Failed to retrieve medical record.", e as Error);
      }
   }

   private addObjectiveToMedicalRecord(medicalRecord: MedicalRecord, objective: Objective) {
      medicalRecord.addObjective(objective);
   }

   private async saveMedicalRecord(medicalRecord: MedicalRecord) {
      try {
         await this.medicalRecordRepo.save(medicalRecord);
      } catch (e) {
         throw new CreateObjectiveError("Failed to save medical record.", e as Error);
      }
   }

   private handleErrors(e: any, request: CreateObjectiveRequest): never {
      if (e instanceof MedicalRecordRepositoryError) {
         throw new CreateObjectiveError(e.message, e as Error, e.metadata);
      }
      throw new CreateObjectiveError(`Unexpected error: ${e?.constructor.name}`, e as Error, request);
   }
}
