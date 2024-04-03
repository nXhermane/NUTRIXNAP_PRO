import { PatientEntity, SearchPatientOptions } from "@/core/interfaces";
export default interface IPatientRepository {
    findById(id: number): Promise<PatientEntity | null>;
    create(user: PatientEntity): Promise<PatientEntity | null>;
    findAll(): Promise<PatientEntity[]>;
    update(user: PatientEntity): Promise<PatientEntity>;
    delete(id: number): Promise<void>;
    search(
        searchValue: string,
        options: SearchPatientOptions
    ): Promise<PatientEntity[]>;
}
