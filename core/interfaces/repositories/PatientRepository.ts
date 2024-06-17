import { PatientEntity, SearchPatientOptions, CreatePatientType, UpdatePatientType } from "@/core/interfaces";
export default interface IPatientRepository {
   findById(id: number): Promise<PatientEntity | null>;
   create(patient: CreatePatientType): Promise<number | null>;
   findAll(): Promise<PatientEntity[]>;
   update(patient: UpdatePatientType): Promise<PatientEntity>;
   delete(id: number): Promise<void>;
   search(searchValue: string, options: SearchPatientOptions): Promise<PatientEntity[]>;
}
