import { DeletePatientError } from './DeletePatientError';
import { DeletePatientRequest } from './DeletePatientRequest';
import { DeletePatientResponse } from './DeletePatientResponse';
import { UseCase, TransactionManager, FileManager, Image } from '@shared';
import { PatientRepository, MedicalRecordRepository, PatientRepositoryError, MedicalRecordRepositoryError } from './../../../../infrastructure';

export class DeletePatientUseCase implements UseCase<DeletePatientRequest, DeletePatientResponse> {
   constructor(
      private patientRepo: PatientRepository,
      private medicalRecordRepo: MedicalRecordRepository,
      private transactionManager: TransactionManager,
      private fileManager: FileManager,
   ) {}

   async execute(request: DeletePatientRequest): Promise<DeletePatientResponse> {
      try {
         const patient = await this.patientRepo.getById(request.patientId);
         await Promise.all(patient.getImage().map(async (img: Image) => await this.fileManager.delete(img.uri)));
         this.transactionManager.transaction<void>(async (trx: any) => {
            await this.medicalRecordRepo.delete(patient.medicalRecordId, trx);
            await this.patientRepo.delete(patient.id, trx);
         });
         return true;
      } catch (e) {
         if (e instanceof PatientRepositoryError || e instanceof MedicalRecordRepositoryError)
            throw new DeletePatientError(`Unexpected error: ${e?.constructor.name}`, e as Error, request);
         return false;
      }
   }
}
