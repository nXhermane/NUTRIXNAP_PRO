import { ExceptionBase, USECASE } from '@shared';

export class CreateRecipeError extends ExceptionBase {
   code = USECASE;
}
