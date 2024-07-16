import { PatientMeasurement } from "./../../../domain";
import { AggregateID, Paginated } from "@shared";
export interface PatientMeasurementRepository {
   save(patientMeasurement: PatientMeasurement,trx?:any): Promise<void>;
   getById(patientMeasurementId: AggregateID): Promise<PatientMeasurement>;
   delete(patientMeasurementId: AggregateID,trx?:any): Promise<void>;
}
