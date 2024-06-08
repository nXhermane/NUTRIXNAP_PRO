import { GetAllObjectiveError } from './GetAllObjectiveError';
import { GetAllObjectiveRequest } from './GetAllObjectiveRequest';
import { GetAllObjectiveResponse } from './GetAllObjectiveResponse';
import { Patient, MedicalRecord } from './../../../../domain';
import { MedicalRecordDto, MedicalRecordPersistenceType, ObjectiveDto } from './../../../../infrastructure';
import { PatientRepository, MedicalRecordRepository, PatientRepositoryError, MedicalRecordRepositoryError } from './../../../../infrastructure';
import { UseCase, AggregateID, Mapper } from '@shared';

export class GetAllObjectiveUseCase implements UseCase<GetAllObjectiveRequest, GetAllObjectiveResponse> {
   constructor(
      private patientRepo: PatientRepository,
      private medicalRecordRepo: MedicalRecordRepository,
      private medicalRecordMapper: Mapper<MedicalRecord, MedicalRecordPersistenceType, MedicalRecordDto>,
   ) {}

   async execute(request: GetAllObjectiveRequest): Promise<GetAllObjectiveResponse> {
      try {
         const patient = await this.getPatient(request.patientId);
         const medicalRecord = await this.getMedicalRecord(patient.medicalRecordId);
         const objectives = this.getAllObjectiveToMedicalRecord(medicalRecord);
         return { objectives };
      } catch (e: any) {
         this.handleErrors(e, request);
      }
   }

   private async getPatient(patientId: AggregateID): Promise<Patient> {
      try {
         return await this.patientRepo.getById(patientId);
      } catch (e) {
         throw new GetAllObjectiveError('Failed to retrieve patient.', e as Error);
      }
   }

   private async getMedicalRecord(medicalRecordId: AggregateID): Promise<MedicalRecord> {
      try {
         return await this.medicalRecordRepo.getById(medicalRecordId);
      } catch (e) {
         throw new GetAllObjectiveError('Failed to retrieve medical record.', e as Error);
      }
   }

   private getAllObjectiveToMedicalRecord(medicalRecord: MedicalRecord): ObjectiveDto[] {
      const reponseMedicalRecord = this.medicalRecordMapper.toResponse(medicalRecord);
      return reponseMedicalRecord.objectives;
   }

   private handleErrors(e: any, request: GetAllObjectiveRequest): never {
      if (e instanceof PatientRepositoryError || e instanceof MedicalRecordRepositoryError) {
         throw new GetAllObjectiveError(e.message, e as Error, e.metadata);
      }
      throw new GetAllObjectiveError(`Unexpected error: ${e?.constructor.name}`, e as Error, request);
   }
}
