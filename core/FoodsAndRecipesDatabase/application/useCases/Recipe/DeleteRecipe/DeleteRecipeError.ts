import { ExceptionBase, USECASE } from "@shared";

export class DeleteRecipeError extends ExceptionBase {
    code = USECASE;
}
