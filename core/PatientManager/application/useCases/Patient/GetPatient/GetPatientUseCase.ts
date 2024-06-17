import { GetPatientError } from "./GetPatientError";
import { GetPatientRequest } from "./GetPatientRequest";
import { GetPatientResponse } from "./GetPatientResponse";
import { UseCase, Mapper } from "@shared";
import {
   PatientRepository,
   PatientRepositoryError,
   PatientDto,
   PatientPersistenceType,
   PatientRepositoryNotFoundException,
} from "./../../../../infrastructure";
import { Patient } from "./../../../../domain";

export class GetPatientUseCase implements UseCase<GetPatientRequest, GetPatientResponse> {
   constructor(
      private repo: PatientRepository,
      private mapper: Mapper<Patient, PatientPersistenceType, PatientDto>,
   ) {}

   async execute(request: GetPatientRequest): Promise<GetPatientResponse> {
      try {
         const patient = await this.repo.getById(request.patientId);
         const { medicalRecordId, ...otherProps } = this.mapper.toResponse(patient);
         return otherProps as GetPatientResponse;
      } catch (e) {
         if (e instanceof PatientRepositoryNotFoundException || e instanceof PatientRepositoryError) {
            throw new GetPatientError(e.message, e as Error, e.metadata);
         } else {
            throw new GetPatientError(`Unexpected error: ${e?.constructor.name}`, e as Error, request);
         }
      }
   }
}
