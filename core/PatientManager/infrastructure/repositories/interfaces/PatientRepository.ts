import { Patient } from "./../../../domain";
import { AggregateID, Paginated } from "@shared";
export interface PatientRepository {
  save(patient: Patient): Promise<void>;
  getById(patiemtId: AggregateID): Promise<Patient>;
  getAll(paginated?: Paginated): Promise<Patient[]>;
  delete(patientId: AggregateID): Promise<void>;
}
