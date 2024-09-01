import { Result, UseCaseError } from "@shared";

export namespace ValidateTokenErrors {
   export class InvalidToken extends Result<UseCaseError> {    }    


}
