import { Result, UseCaseError, AggregateID } from "@shared";
export namespace CreateObjectiveErrors {
   export class MedicalRecordNotFoundError extends Result<UseCaseError> {
      constructor(err: any, id?: AggregateID) {
         const message = `The MedicalRecord or Patient with id:${id} is not found.[Error]:${err?.toJSON() || err}`;
         super(false, { message } as UseCaseError);
      }
   }
   export class MedicalRecordRepoError extends Result<UseCaseError> {
      constructor(err: any) {
         const message = `MedicalRecord Repository Error. Try this operation after a few moment.`;
         super(false, { message } as UseCaseError);
      }
   }
   export class ObjectiveFactoryError extends Result<UseCaseError> {
      constructor(e: any) {
         const message = `Objective Creation error.`;
         super(false, { message } as UseCaseError);
      }
   }
}
