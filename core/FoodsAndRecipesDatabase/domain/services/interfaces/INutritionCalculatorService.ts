import { Recipe } from "./../../aggregates/Recipe";

export interface INutritionCalculatorService {
    calculateRecipeNutritionalValue(recipe: Recipe): Promise<void>;
}
