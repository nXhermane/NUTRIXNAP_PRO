import { AggregateID } from "@shared";
import { NutrientDto } from "./../../sharedType";
export type GetRecipeNutritionnalValueResponse = {
    recipeId: AggregateID;
    nutrients: NutrientDto[];
};
