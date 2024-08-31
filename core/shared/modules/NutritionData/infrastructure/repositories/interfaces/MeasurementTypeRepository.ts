import { AggregateID } from "@shared";
import { MeasurementType } from "./../../../domain";
export interface MeasurementTypeRepository {
   save(measuementType: MeasurementType): Promise<void>;
   getById(measurementTypeId: AggregateID): Promise<MeasurementType>;
   getAll(measurementCategory?: "Antropometry" | "MedicalAnalysis" | "BodyComposition"): Promise<MeasurementType[]>;
   getAllId(measurementCategory?: "Antropometry" | "MedicalAnalysis" | "BodyComposition"): Promise<{ id: AggregateID; code: string }[]>;
   delete(measurementTypeId: AggregateID): Promise<void>;
}
