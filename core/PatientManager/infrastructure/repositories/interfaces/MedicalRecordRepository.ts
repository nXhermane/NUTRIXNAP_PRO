import { MedicalRecord } from "./../../../domain";
import { AggregateID, Paginated } from "@shared";
export interface MedicalRecordRepository {
  save(medicalRecord: MedicalRecord): Promise<void>;
  getById(medicalRecordId: AggregateID): Promise<MedicalRecord>;
  delete(medicalRecordId: AggregateID): Promise<void>;
}
