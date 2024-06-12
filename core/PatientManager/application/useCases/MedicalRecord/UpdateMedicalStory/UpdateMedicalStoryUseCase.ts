import { UpdateMedicalStoryError } from './UpdateMedicalStoryError';
import { UpdateMedicalStoryRequest } from './UpdateMedicalStoryRequest';
import { UpdateMedicalStoryResponse } from './UpdateMedicalStoryResponse';
import { Patient, MedicalRecord, MedicalStory, type CreateMedicalStoryProps } from './../../../../domain';
import {
   PatientRepository,
   MedicalRecordRepository,
   PatientRepositoryError,
   MedicalRecordRepositoryError,
   MedicalRecordDto,
   MedicalRecordPersistenceType,
} from './../../../../infrastructure';
import { UseCase, AggregateID } from '@shared';

export class UpdateMedicalStoryUseCase implements UseCase<UpdateMedicalStoryRequest, UpdateMedicalStoryResponse> {
   constructor(
      private patientRepo: PatientRepository,
      private medicalRecordRepo: MedicalRecordRepository,
   ) {}

   async execute(request: UpdateMedicalStoryRequest): Promise<UpdateMedicalStoryResponse> {
      try {
         const patient = await this.getPatient(request.patientId);
         const medicalRecord = await this.getMedicalRecord(patient.medicalRecordId);
         const medicalStory = this.getMedicalStoryFromMedicalRecord(medicalRecord);
         this.updateMedicalStory(medicalStory, request.data);
         this.updateMedicalRecord(medicalRecord, medicalStory);
         await this.saveMedicalRecord(medicalRecord);
      } catch (e: any) {
         this.handleErrors(e, request);
      }
   }

   private async getPatient(patientId: AggregateID): Promise<Patient> {
      try {
         return await this.patientRepo.getById(patientId);
      } catch (e) {
         throw new UpdateMedicalStoryError('Failed to retrieve patient.', e as Error);
      }
   }

   private async getMedicalRecord(medicalRecordId: AggregateID): Promise<MedicalRecord> {
      try {
         return await this.medicalRecordRepo.getById(medicalRecordId);
      } catch (e) {
         throw new UpdateMedicalStoryError('Failed to retrieve medical record.', e as Error);
      }
   }

   private updateMedicalStory(medicalStory: MedicalStory, data: Partial<CreateMedicalStoryProps>) {
      if (data?.pathologies) medicalStory.pathologies = data.pathologies;
      if (data?.drugie) medicalStory.drugie = data.drugie;
      if (data?.personalBackground) medicalStory.personalBackground = data.personalBackground;
      if (data?.familyBackground) medicalStory.familyBackground = data.familyBackground;
      if (data?.otherInformation) medicalStory.otherInformation = data.otherInformation;
   }

   private getMedicalStoryFromMedicalRecord(medicalRecord: MedicalRecord): MedicalStory {
      const medicalRecordProps = medicalRecord.getProps();
      return medicalRecordProps.medicalStory;
   }

   private updateMedicalRecord(medicalRecord: MedicalRecord, medicalStory: MedicalStory) {
      medicalRecord.updateMedicalStory(medicalStory);
   }

   private async saveMedicalRecord(medicalRecord: MedicalRecord) {
      try {
         await this.medicalRecordRepo.save(medicalRecord);
      } catch (e) {
         throw new UpdateMedicalStoryError('Failed to save medical record.', e as Error);
      }
   }

   private handleErrors(e: any, request: UpdateMedicalStoryRequest): never {
      if (e instanceof PatientRepositoryError || e instanceof MedicalRecordRepositoryError) {
         throw new UpdateMedicalStoryError(e.message, e as Error, e.metadata);
      }
      throw new UpdateMedicalStoryError(`Unexpected error: ${e?.constructor.name}`, e as Error, request);
   }
}
