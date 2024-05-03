import { ExceptionBase, USECASE } from "@shared";
export class GetRecipeByIdError extends ExceptionBase {
    code = USECASE;
}
