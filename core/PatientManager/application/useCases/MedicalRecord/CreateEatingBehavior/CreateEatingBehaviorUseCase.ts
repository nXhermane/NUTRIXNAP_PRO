import { CreateEatingBehaviorError } from './CreateEatingBehaviorError';
import { CreateEatingBehaviorRequest } from './CreateEatingBehaviorRequest';
import { CreateEatingBehaviorResponse } from './CreateEatingBehaviorResponse';
import { MedicalRecordFactory, Patient, MedicalRecord, EatingBehavior } from './../../../../domain';
import { PatientRepository, MedicalRecordRepository, PatientRepositoryError, MedicalRecordRepositoryError } from './../../../../infrastructure';
import { UseCase, AggregateID } from '@shared';

export class CreateObjectiveUseCase implements UseCase<CreateEatingBehaviorRequest, CreateEatingBehaviorResponse> {
   constructor(
      private patientRepo: PatientRepository,
      private medicalRecordRepo: MedicalRecordRepository,
      private medicalRecordFactory: MedicalRecordFactory,
   ) {}

   async execute(request: CreateEatingBehaviorRequest): Promise<CreateEatingBehaviorResponse> {
      try {
         const eatingBehavior = this.createEatingBehavior(request);
         const patient = await this.getPatient(request.patientId);
         const medicalRecord = await this.getMedicalRecord(patient.medicalRecordId);
         this.addEatingBehaviorToMedicalRecord(medicalRecord, eatingBehavior);
         await this.saveMedicalRecord(medicalRecord);
         return {
            eatingBehavior: {
               date: eatingBehavior.date,
               eatingBehavior: eatingBehavior.eatingBehavior,
            },
         };
      } catch (e: any) {
         this.handleErrors(e, request);
      }
   }

   private createEatingBehavior(request: CreateEatingBehaviorRequest): EatingBehavior {
      const eatingBehavior = this.medicalRecordFactory.createEatingBehavior(request.data);
      if (eatingBehavior.isFailure) throw new CreateEatingBehaviorError('Create Eating Behavior failed.', eatingBehavior.err as unknown as Error);
      return eatingBehavior.val;
   }

   private async getPatient(patientId: AggregateID): Promise<Patient> {
      try {
         return await this.patientRepo.getById(patientId);
      } catch (e) {
         throw new CreateEatingBehaviorError('Failed to retrieve patient.', e as Error);
      }
   }

   private async getMedicalRecord(medicalRecordId: AggregateID): Promise<MedicalRecord> {
      try {
         return await this.medicalRecordRepo.getById(medicalRecordId);
      } catch (e) {
         throw new CreateEatingBehaviorError('Failed to retrieve medical record.', e as Error);
      }
   }

   private addEatingBehaviorToMedicalRecord(medicalRecord: MedicalRecord, eatingBehavior: EatingBehavior) {
      medicalRecord.addEatingBehavior(eatingBehavior);
   }

   private async saveMedicalRecord(medicalRecord: MedicalRecord) {
      try {
         await this.medicalRecordRepo.save(medicalRecord);
      } catch (e) {
         throw new CreateEatingBehaviorError('Failed to save medical record.', e as Error);
      }
   }

   private handleErrors(e: any, request: CreateEatingBehaviorRequest): never {
      if (e instanceof PatientRepositoryError || e instanceof MedicalRecordRepositoryError) {
         throw new CreateEatingBehaviorError(e.message, e as Error, e.metadata);
      }
      throw new CreateEatingBehaviorError(`Unexpected error: ${e?.constructor.name}`, e as Error, request);
   }
}
