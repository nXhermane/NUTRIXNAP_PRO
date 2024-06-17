import { AddMeasurementError } from "./AddMeasurementError";
import { AddMeasurementRequest } from "./AddMeasurementRequest";
import { AddMeasurementResponse } from "./AddMeasurementResponse";
import {
   MedicalRecordFactory,
   MedicalRecord,
   AnthropometricMeasurement,
   BodyCompositionMeasurement,
   MedicalAnalysisResult,
} from "./../../../../domain";
import { MedicalRecordRepository, MedicalRecordRepositoryError } from "./../../../../infrastructure";
import { UseCase, AggregateID } from "@shared";

export class AddMeasurementUseCase implements UseCase<AddMeasurementRequest, AddMeasurementResponse> {
   constructor(
      private medicalRecordRepo: MedicalRecordRepository,
      private medicalRecordFactory: MedicalRecordFactory,
   ) {}

   async execute(request: AddMeasurementRequest): Promise<AddMeasurementResponse> {
      try {
         const measurement = await this.createMeasurement(request);
         const medicalRecord = await this.getMedicalRecord(request.patientId);
         this.addMeasurementToMedicalRecord(medicalRecord, measurement);
         await this.saveMedicalRecord(medicalRecord);
      } catch (e: any) {
         this.handleErrors(e, request);
      }
   }

   private async createMeasurement(
      request: AddMeasurementRequest,
   ): Promise<AnthropometricMeasurement | BodyCompositionMeasurement | MedicalAnalysisResult> {
      const measurement = await this.medicalRecordFactory.createMeasurement(request.data);
      if (measurement.isFailure) throw new AddMeasurementError("Create Measurement  failed.", measurement.err as unknown as Error);
      return measurement.val;
   }

   private async getMedicalRecord(medicalRecordId: AggregateID): Promise<MedicalRecord> {
      try {
         return await this.medicalRecordRepo.getById(medicalRecordId);
      } catch (e) {
         throw new AddMeasurementError("Failed to retrieve medical record.", e as Error);
      }
   }

   private addMeasurementToMedicalRecord(
      medicalRecord: MedicalRecord,
      measurement: AnthropometricMeasurement | BodyCompositionMeasurement | MedicalAnalysisResult,
   ) {
      medicalRecord.addMeasurement(measurement);
   }

   private async saveMedicalRecord(medicalRecord: MedicalRecord) {
      try {
         await this.medicalRecordRepo.save(medicalRecord);
      } catch (e) {
         throw new AddMeasurementError("Failed to save medical record.", e as Error);
      }
   }

   private handleErrors(e: any, request: AddMeasurementRequest): never {
      if (e instanceof MedicalRecordRepositoryError) {
         throw new AddMeasurementError(e.message, e as Error, e.metadata);
      }
      throw new AddMeasurementError(`Unexpected error: ${e?.constructor.name}`, e as Error, request);
   }
}
