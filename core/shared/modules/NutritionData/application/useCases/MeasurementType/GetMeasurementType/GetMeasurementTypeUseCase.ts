import { GetMeasurementTypeErrors } from "./GetMeasurementTypeErrors";
import { GetMeasurementTypeRequest } from "./GetMeasurementTypeRequest";
import { GetMeasurementTypeResponse } from "./GetMeasurementTypeResponse";
import { UseCase, Mapper, AppError, Result, left, right } from "@shared";
import { IMeasurementType, MeasurementType } from "./../../../../domain";
import {
   MeasurementTypeDto,
   MeasurementTypeRepository,
   MeasurementTypeRepositoryError,
   MeasurementTypeRepositoryNotFoundException,
} from "./../../../../infrastructure";

export class GetMeasurementTypeUseCase implements UseCase<GetMeasurementTypeRequest, GetMeasurementTypeResponse> {
   constructor(private repo: MeasurementTypeRepository) {}

   async execute(request: GetMeasurementTypeRequest): Promise<GetMeasurementTypeResponse> {
      try {
         const measure = await this.repo.getById(request.idOrCode);
         return right(
            Result.ok<MeasurementTypeDto>({
               measurementCategory: measure.measureCategory as "Antropometry" | "MedicalAnalysis" | "BodyComposition",
               measureTypeId: measure.id,
               unit: measure.unit,
               name: measure.name,
               nameF: measure.nameF,
               code: measure.code,
            }),
         );
      } catch (e) {
         if (e instanceof MeasurementTypeRepositoryNotFoundException) {
            return left(new GetMeasurementTypeErrors.MeasurementTypeNotFoundError(e, request.idOrCode));
         } else {
            return left(new AppError.UnexpectedError(e));
         }
      }
   }
}