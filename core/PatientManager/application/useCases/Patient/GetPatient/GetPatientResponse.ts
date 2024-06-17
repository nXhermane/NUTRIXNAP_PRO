import { PatientDto } from "./../../../../infrastructure";
export type GetPatientResponse = Omit<PatientDto, "medicalRecordId">;
