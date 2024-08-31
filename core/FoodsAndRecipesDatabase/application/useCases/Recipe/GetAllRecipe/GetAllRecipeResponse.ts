import { AppError, Result, Either } from "./../../../../../shared";
import { GetAllRecipeErrors } from "./GetAllRecipeErrors";
import { RecipeDto } from "./../sharedType";
export type GetAllRecipeResponse = Either<AppError.UnexpectedError | GetAllRecipeErrors.RecipeRepositoryError, Result<RecipeDto[]>>;
