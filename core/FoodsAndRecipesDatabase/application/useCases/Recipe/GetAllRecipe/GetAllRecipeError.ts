import { ExceptionBase, USECASE } from "@shared";

export class GetAllRecipeError extends ExceptionBase {
    code = USECASE;
}
