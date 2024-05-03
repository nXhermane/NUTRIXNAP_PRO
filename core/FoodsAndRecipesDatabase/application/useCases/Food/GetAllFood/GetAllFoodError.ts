import { ExceptionBase, USECASE } from "@shared";

export class GetAllFoodError extends ExceptionBase {
    code = USECASE;
}
