import { Recipe } from "./../../../domain";
import { AggregateID } from "@shared";
export interface RecipeRepository {
    save(recipe: Recipe): Promise<void>;
    delete(recipeId: AggregateID): Promise<void>;
    getRecipeById(recipeId: AggregateID): Promise<Recipe>;
    getAllRecipe(pagginated?: {
        page: number;
        pageSize: number;
    }): Promise<Recipe[]>;
}
