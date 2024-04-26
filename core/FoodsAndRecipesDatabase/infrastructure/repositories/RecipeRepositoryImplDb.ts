import { RecipeRepository } from "./interfaces/RecipeRepository";
import { Mapper, AggregateID } from "@shared";
import { Recipe } from "./../../domain";
import { Knex } from "knex";
import { RecipePersistenceType } from "./types";
import { RecipePersistenceDto } from "./../dtos/RecipePersistenceDto";
export class RecipeRepositoryImplDb implements RecipeRepository {
    private recipeTableName: string = "recipes";
    private mealsTypeTableName: string = "meals_types";
    private mealsCategoryTableName: string = "meals_categories";
    constructor(
        private knex: Knex,
        private mapper: Mapper<Recipe, RecipePersistenceDto, any>
    ) {}
    async save(recipe: Recipe): Promise<void> {
        const recipePersistence = this.mapper.toPersistence(recipe);
        await this.knex<RecipePersistenceDto>(this.recipeTableName).insert(
            recipePersistence
        );
    }
    async delete(recipeId: AggregateID): Promise<void> {
        await this.knex<RecipePersistenceDto>(this.recipeTableName)
            .delete()
            .where("recipeId", recipeId);
    }
    async getRecipeById(recipeId: AggregateID): Promise<Recipe> {
        const recipe = await this.knex<RecipePersistenceType>(
            this.recipeTableName
        )
            .select(
                this.recipeTableName + ".*",
                this.mealsTypeTableName + ".name as typeName",
                this.mealsTypeTableName + ".nameF as typeNameF",
                this.mealsCategoryTableName + ".name as categoryName",
                this.mealsCategoryTableName + ".nameF as categoryNameF"
            )
            .where("recipeId", recipeId)
            .leftJoin(
                this.mealsTypeTableName,
                this.recipeTableName + ".typeId",
                this.mealsTypeTableName + ".typeId"
            )
            .leftJoin(
                this.mealsCategoryTableName,
                this.recipeTableName + ".categoryId",
                this.mealsCategoryTableName + ".categoryId"
            )
            .first();

        return this.mapper.toDomain(recipe as RecipePersistenceType);
    }
    async getAllRecipe(pagginated?: {
        page: number;
        pageSize: number;
    }): Promise<Recipe[]> {
        const query = this.knex<RecipePersistenceType>("recipes")
            .select(
                this.recipeTableName + ".*",
                this.mealsTypeTableName + ".name as typeName",
                this.mealsTypeTableName + ".nameF as typeNameF",
                this.mealsCategoryTableName + ".name as categoryName",
                this.mealsCategoryTableName + ".nameF as categoryNameF"
            )
            .leftJoin(
                this.mealsTypeTableName,
                this.recipeTableName + ".typeId",
                this.mealsTypeTableName + ".typeId"
            )
            .leftJoin(
                this.mealsCategoryTableName,
                this.recipeTableName + ".categoryId",
                this.mealsCategoryTableName + ".categoryId"
            );

        if (pagginated)
            query.limit(pagginated.pageSize).offset(pagginated.page);
        const recipes = await query;

        return recipes.map((recipe: RecipePersistenceType) =>
            this.mapper.toDomain(recipe)
        );
    }
}
