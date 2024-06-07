import { PatientDto } from "./../../../../infrastructure"
export type GetAllPatientResponse = Omit<PatientDto, 'medicalRecordId'>[]