import { Result, UseCaseError, AggregateID } from "@shared";
export namespace SignUpErrors {
   export class EmailAlreadyExist extends Result<UseCaseError> {
      constructor(e: any) {
         const message = `This Email alredy exist.Sign In or use another email to sign up.:${e?.toJSON() || e}`;
         super(false, { message } as UseCaseError);
      }
   }
   export class NutritionistRepoError extends Result<UseCaseError> {
      constructor(err: any) {
         const message = `Nutritionist Repository Error. Try this operation after a few moment.[Error]:${err?.toJSON() || err}`;
         super(false, { message } as UseCaseError);
      }
   }
   export class NutritionistFactoryError extends Result<UseCaseError> {
      constructor(e: any) {
         const message = `Nutritionist Creation error.[Error]:${e?.toJSON() || e}`;
         super(false, { message } as UseCaseError);
      }
   }
}
