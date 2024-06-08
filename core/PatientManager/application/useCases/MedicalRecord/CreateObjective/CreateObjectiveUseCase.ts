import { CreateObjectiveError } from './CreateObjectiveError';
import { CreateObjectiveRequest } from './CreateObjectiveRequest';
import { CreateObjectiveResponse } from './CreateObjectiveResponse';
import { MedicalRecordFactory, Patient, MedicalRecord, Objective } from './../../../../domain';
import { PatientRepository, MedicalRecordRepository, PatientRepositoryError, MedicalRecordRepositoryError } from './../../../../infrastructure';
import { UseCase, AggregateID } from '@shared';

export class CreateObjectiveUseCase implements UseCase<CreateObjectiveRequest, CreateObjectiveResponse> {
   constructor(
      private patientRepo: PatientRepository,
      private medicalRecordRepo: MedicalRecordRepository,
      private medicalRecordFactory: MedicalRecordFactory,
   ) {}

   async execute(request: CreateObjectiveRequest): Promise<CreateObjectiveResponse> {
      try {
         const objective = await this.createObjective(request);
         const patient = await this.getPatient(request.patientId);
         const medicalRecord = await this.getMedicalRecord(patient.medicalRecordId);
         this.addObjectiveToMedicalRecord(medicalRecord, objective);
         await this.saveMedicalRecord(medicalRecord);
         return { objectiveId: objective.id };
      } catch (e: any) {
         this.handleErrors(e, request);
      }
   }

   private async createObjective(request: CreateObjectiveRequest): Promise<Objective> {
      const objective = await this.medicalRecordFactory.createObjective(request.data);
      if (objective.isFailure) throw new CreateObjectiveError('Create Objective failed.', objective.err as unknown as Error);
      return objective.val;
   }

   private async getPatient(patientId: AggregateID): Promise<Patient> {
      try {
         return await this.patientRepo.getById(patientId);
      } catch (e) {
         throw new CreateObjectiveError('Failed to retrieve patient.', e as Error);
      }
   }

   private async getMedicalRecord(medicalRecordId: AggregateID): Promise<MedicalRecord> {
      try {
         return await this.medicalRecordRepo.getById(medicalRecordId);
      } catch (e) {
         throw new CreateObjectiveError('Failed to retrieve medical record.', e as Error);
      }
   }

   private addObjectiveToMedicalRecord(medicalRecord: MedicalRecord, objective: Objective) {
      medicalRecord.addObjective(objective);
   }

   private async saveMedicalRecord(medicalRecord: MedicalRecord) {
      try {
         await this.medicalRecordRepo.save(medicalRecord);
      } catch (e) {
         throw new CreateObjectiveError('Failed to save medical record.', e as Error);
      }
   }

   private handleErrors(e: any, request: CreateObjectiveRequest): never {
      if (e instanceof PatientRepositoryError || e instanceof MedicalRecordRepositoryError) {
         throw new CreateObjectiveError(e.message, e as Error, e.metadata);
      }
      throw new CreateObjectiveError(`Unexpected error: ${e?.constructor.name}`, e as Error, request);
   }
}
