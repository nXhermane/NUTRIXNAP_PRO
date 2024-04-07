import {
    IPatientService,
    IPatientRepository,
    PatientEntity,
    SearchPatientOptions,
    CreatePatientType,
    UpdatePatientType
} from "@/core/interfaces";
export default class UserService implements IPatientService {
    constructor(private repository: IPatientRepository) {}

    async getPatientById(id: number): Promise<PatientEntity | null> {
        const patient = await this.repository.findById(id);
        return patient;
    }
    async getAllPatient(): Promise<PatientEntity[]> {
        const patients = await this.repository.findAll();
        return patients;
    }
    async updatePatient(patient: UpdatePatientType): Promise<PatientEntity> {
        const upPatient = await this.repository.update(patient);
        console.log(upPatient)
        return upPatient;
    }
    async createPatient(patient: CreatePatientType): Promise<PatientEntity> {
        const id = await this.repository.create(patient);
        return (await this.getPatientById(id as number)) as PatientEntity;
    }
    async deletePatient(id: number): Promise<void> {
        await this.repository.delete(id);
    }
    async searchPatient(
        searchValue: string,
        options?: SearchPatientOptions
    ): Promise<PatientEntity[]> {
        const patients = await this.repository.search(
            searchValue,
            options || ({} as SearchPatientOptions)
        );
        return patients;
    }
}
