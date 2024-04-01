import { PatientEntity, SearchPatientOptions } from "@/core/interfaces";
export default interface PatientService {
    getPatientById(id: number): Promise<PatientEntity | null>;
    getAllPatient(): Promise<PatientEntity[]>;
    updatePatient(patient: PatientEntity): Promise<PatientEntity>;
    createPatient(patient: PatientEntity): Promise<PatientEntity>;
    deletePatient(id: number): Promise<void>;
    searchPatient(
        searchValue: string,
        options?: SearchPatientOptions
    ): Promise<PatientEntity[]>;
}
