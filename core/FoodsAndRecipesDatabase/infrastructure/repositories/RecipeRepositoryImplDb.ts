import { RecipeRepository } from "./interfaces/RecipeRepository";
import { Mapper, AggregateID } from "@shared";
import { Recipe } from "./../../domain";
import { Knex } from "knex";
export class RecipeRepositoryImplDb implements RecipeRepository {
    constructor(
        private knex: Knex,
        private mapper: Mapper<Recipe>
    ) {}
    async save(recipe: Recipe): Promise<Recipe> {}
    async delete(recipeId: AggregateID): Promise<void> {}
    async getRecipeById(recipeId: AggregateID): Promise<Recipe> {}
    async getAllRecipe(): Promise<Recipe[]> {}
}
