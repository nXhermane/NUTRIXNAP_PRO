import { Patient, MedicalRecord } from "./../../../domain";
import { AggregateID, Paginated } from "@shared";
export interface PatientRepository {
    save(patient: Patient, medicalRecord: MedicalRecord): Promise<void>;
    getPatientById(patiemtId: AggregateID): Promise<Patient>;
    getPatientMedicalRecord(patientId: AggregateID): Promise<MedicalRecord>;
    getMedicalRecordById(medicalRecordId: AggregateID): Promise<MedicalRecord>;
    getAllPatient(paginated?: Paginated): Promise<Patient[]>;
    delete(patientId: AggregateID): Promise<void>;
}
