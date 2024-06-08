import { ExceptionBase, USECASE } from '@shared';

export class SearchFoodError extends ExceptionBase {
   code = USECASE;
}
