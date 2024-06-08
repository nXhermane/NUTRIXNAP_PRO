import { PatientEntity, SearchPatientOptions, CreatePatientType, UpdatePatientType } from '@/core/interfaces';
export default interface PatientService {
   getPatientById(id: number): Promise<PatientEntity | null>;
   getAllPatient(): Promise<PatientEntity[]>;
   updatePatient(patient: UpdatePatientType): Promise<PatientEntity>;
   createPatient(patient: CreatePatientType): Promise<PatientEntity | null>;
   deletePatient(id: number): Promise<void>;
   searchPatient(searchValue: string, options?: SearchPatientOptions): Promise<PatientEntity[]>;
}
