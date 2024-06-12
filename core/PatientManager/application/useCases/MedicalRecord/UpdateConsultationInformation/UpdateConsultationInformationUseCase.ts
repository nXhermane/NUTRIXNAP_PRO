import { UpdateConsultationInformationError } from './UpdateConsultationInformationError';
import { UpdateConsultationInformationRequest } from './UpdateConsultationInformationRequest';
import { UpdateConsultationInformationResponse } from './UpdateConsultationInformationResponse';
import { Patient, MedicalRecord, ConsultationInformation, type CreateConsultationInformationProps } from './../../../../domain';
import {
   PatientRepository,
   MedicalRecordRepository,
   PatientRepositoryError,
   MedicalRecordRepositoryError,
   ConsultationInformationDto,
   MedicalRecordDto,
   MedicalRecordPersistenceType,
} from './../../../../infrastructure';
import { UseCase, AggregateID } from '@shared';

export class UpdateConsultationInformationUseCase implements UseCase<UpdateConsultationInformationRequest, UpdateConsultationInformationResponse> {
   constructor(
      private patientRepo: PatientRepository,
      private medicalRecordRepo: MedicalRecordRepository,
   ) {}

   async execute(request: UpdateConsultationInformationRequest): Promise<UpdateConsultationInformationResponse> {
      try {
         const patient = await this.getPatient(request.patientId);
         const medicalRecord = await this.getMedicalRecord(patient.medicalRecordId);
         const consultationInformation = this.getConsultationInformationFromMedicalRecord(medicalRecord);
         this.updateConsultationInformation(consultationInformation, request.data);
         this.updateMedicalRecord(medicalRecord, consultationInformation);
         await this.saveMedicalRecord(medicalRecord);
      } catch (e: any) {
         this.handleErrors(e, request);
      }
   }

   private async getPatient(patientId: AggregateID): Promise<Patient> {
      try {
         return await this.patientRepo.getById(patientId);
      } catch (e) {
         throw new UpdateConsultationInformationError('Failed to retrieve patient.', e as Error);
      }
   }

   private async getMedicalRecord(medicalRecordId: AggregateID): Promise<MedicalRecord> {
      try {
         return await this.medicalRecordRepo.getById(medicalRecordId);
      } catch (e) {
         throw new UpdateConsultationInformationError('Failed to retrieve medical record.', e as Error);
      }
   }

   private updateConsultationInformation(consultationInformation: ConsultationInformation, data: Partial<CreateConsultationInformationProps>) {
      if (data?.consultationMotive) consultationInformation.consultationMotive = data.consultationMotive;
      if (data?.expectations) consultationInformation.expectations = data.expectations;
      if (data?.clinicalObjective) consultationInformation.clinicalObjective = data.clinicalObjective;
      if (data?.otherInformation) consultationInformation.otherInformation = data.otherInformation;
   }

   private getConsultationInformationFromMedicalRecord(medicalRecord: MedicalRecord): ConsultationInformation {
      const medicalRecordProps = medicalRecord.getProps();
      return medicalRecordProps.consultationInformation;
   }

   private updateMedicalRecord(medicalRecord: MedicalRecord, consultationInformation: ConsultationInformation) {
      medicalRecord.updateConsultationInformation(consultationInformation);
   }

   private async saveMedicalRecord(medicalRecord: MedicalRecord) {
      try {
         await this.medicalRecordRepo.save(medicalRecord);
      } catch (e) {
         throw new UpdateConsultationInformationError('Failed to save medical record.', e as Error);
      }
   }

   private handleErrors(e: any, request: UpdateConsultationInformationRequest): never {
      if (e instanceof PatientRepositoryError || e instanceof MedicalRecordRepositoryError) {
         throw new UpdateConsultationInformationError(e.message, e as Error, e.metadata);
      }
      throw new UpdateConsultationInformationError(`Unexpected error: ${e?.constructor.name}`, e as Error, request);
   }
}
