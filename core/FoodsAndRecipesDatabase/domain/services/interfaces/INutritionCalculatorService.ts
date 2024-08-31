import { Recipe } from "./../../aggregates/Recipe";
import { INutrient } from "./../../entities/Nutrient";
import { BaseEntityProps } from "@shared";
export interface INutritionCalculatorService {
   calculateRecipeNutritionalValue(recipe: Recipe): Promise<(INutrient & BaseEntityProps)[]>;
}
