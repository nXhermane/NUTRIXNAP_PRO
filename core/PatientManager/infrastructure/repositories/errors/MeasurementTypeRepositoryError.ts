import { ExceptionBase, INTERNAL_SERVER_ERROR, NOT_FOUND } from '@shared';
export class MeasurementTypeRepositoryError extends ExceptionBase {
   code = INTERNAL_SERVER_ERROR;
}
export class MeasurementTypeRepositoryNotFoundException extends ExceptionBase {
   code = NOT_FOUND;
}
