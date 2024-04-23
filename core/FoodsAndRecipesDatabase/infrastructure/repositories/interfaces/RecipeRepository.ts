import { Recipe } from "./../../../domain";
import { AggregateID } from "@shared";
export interface RecipeRepository {
    save?(recipe: Recipe): Promise<Recipe>;
    delete?(recipeId: AggregateID): Promise<void>;
    getRecipeById?(recipeId: AggregateID): Promise<Recipe>;
    getAllRecipe?(): Promise<Recipe[]>;
}
