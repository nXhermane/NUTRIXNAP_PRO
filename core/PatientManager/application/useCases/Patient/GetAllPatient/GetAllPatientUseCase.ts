import { GetAllPatientError } from "./GetAllPatientError";
import { GetAllPatientRequest } from "./GetAllPatientRequest";
import { GetAllPatientResponse } from "./GetAllPatientResponse";
import { UseCase, Mapper } from "@shared";
import { PatientRepository, PatientRepositoryError, PatientDto, PatientPersistenceType, PatientRepositoryNotFoundException } from "./../../../../infrastructure";
import { Patient } from "./../../../../domain";

export class GetAllPatientUseCase implements UseCase<GetAllPatientRequest, GetAllPatientResponse> {

  constructor(private repo: PatientRepository, private mapper: Mapper<Patient, PatientPersistenceType, PatientDto>) { }

  async execute(request: GetAllPatientRequest): Promise<GetAllPatientResponse> {
    try {
      const patients = await this.repo.getAll(request?.paginated);
      return patients.map((patient: Patient) => {
        const { medicalRecordId, ...otherProps } = this.mapper.toResponse(patient);
        return otherProps
      }) as GetAllPatientResponse
    } catch (e) {
      if (
        e instanceof PatientRepositoryNotFoundException ||
        e instanceof PatientRepositoryError
      ) {
        throw new GetAllPatientError(e.message, e as Error, e.metadata);
      } else {
        throw new GetAllPatientError(`Unexpected error: ${e?.constructor.name}`, e as Error, request);
      }
    }
  }
}
