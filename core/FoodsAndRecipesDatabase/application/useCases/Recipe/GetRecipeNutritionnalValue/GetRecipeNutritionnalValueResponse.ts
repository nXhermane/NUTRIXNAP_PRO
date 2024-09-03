import { AggregateID, Either, AppError, Result } from "@shared";
import { GetRecipeNutritionnalValueErrors } from "./GetRecipeNutritionnalValueErrors";
export type GetRecipeNutritionnalValueResponse = Either<
   AppError.UnexpectedError | GetRecipeNutritionnalValueErrors.RecipeNotFoundError,
   Result<{
      recipeId: AggregateID;
      nutrients: NutritionalValue[];
   }>
>;

export type NutritionalValue = {
   nutrientId: AggregateID;
   value: number;
   originalValue?: string;
   name: string;
   nameF: string;
   tagname: string;
   unit: string;
};
