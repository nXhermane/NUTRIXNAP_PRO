import { AppServiceResponse, AggregateID, Message } from "@shared";
import { PatientDto } from "../../infrastructure";
import {
   CreatePatientRequest,
   GetPatientRequest,
   GetAllPatientRequest,
   DeletePatientRequest,
   CreatePatientUseCase,
   GetPatientUseCase,
   GetAllPatientUseCase,
   DeletePatientUseCase,
} from "../useCases";
import { IPatientService } from "./interfaces/PatientService";

export class PatientService implements IPatientService {
   constructor(
      private createPatientUC: CreatePatientUseCase,
      private getPatientUC: GetPatientUseCase,
      private getAllPatientUC: GetAllPatientUseCase,
      private deletePatientUC: DeletePatientUseCase,
   ) {}
   async createPatient(req: CreatePatientRequest): Promise<AppServiceResponse<AggregateID> | Message> {
      const res = await this.createPatientUC.execute(req);
      if (res.isLeft()) return new Message("error", JSON.stringify(res.value.err));
      return { data: res.value.val };
   }
   async getPatient(req: GetPatientRequest): Promise<AppServiceResponse<PatientDto> | Message> {
      const res = await this.getPatientUC.execute(req);
      if (res.isLeft()) return new Message("error", JSON.stringify(res.value.err));
      return { data: res.value.val };
   }
   async getAllPatient(req: GetAllPatientRequest): Promise<AppServiceResponse<PatientDto[]> | Message> {
      const res = await this.getAllPatientUC.execute(req);
      if (res.isLeft()) return new Message("error", JSON.stringify(res.value.err));
      return { data: res.value.val };
   }
   async deletePatient(req: DeletePatientRequest): Promise<AppServiceResponse<boolean> | Message> {
      const res = await this.deletePatientUC.execute(req);
      if (res.isLeft()) return new Message("error", JSON.stringify(res.value.err));
      return { data: res.value.val };
   }
}
