import { AggregateID, Either, AppError, Result } from "@shared";
import { NutrientDto } from "./../../sharedType";
import { GetRecipeNutritionnalValueErrors } from "./GetRecipeNutritionnalValueErrors";
export type GetRecipeNutritionnalValueResponse = Either<
   AppError.UnexpectedError | GetRecipeNutritionnalValueErrors.RecipeNotFoundError,
   Result<{
      recipeId: AggregateID;
      nutrients: NutrientDto[];
   }>
>;
