import { RecipeRepository } from "./interfaces/RecipeRepository";
import { Mapper, AggregateID, Paginated } from "@shared";
import { Recipe, IMealsType, IMealsCategory } from "./../../domain";
import { Knex } from "knex";
import { RecipePersistenceType } from "./types";
import { RecipePersistenceDto } from "./../dtos/RecipePersistenceDto";
import { RecipeResponseDto } from "./../dtos/RecipeResponseDto";
export class RecipeRepositoryImplDb implements RecipeRepository {
    private recipeTableName: string = "recipes";
    private mealsTypeTableName: string = "meals_types";
    private mealsCategoryTableName: string = "meals_categories";
    constructor(
        private knex: Knex,
        private mapper: Mapper<Recipe, RecipePersistenceDto, RecipeResponseDto>
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
    async getAllRecipe(paginated?: Paginated): Promise<Recipe[]> {
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

        if (paginated) query.limit(paginated.pageSize).offset(paginated.page);
        const recipes = await query;

        return recipes.map((recipe: RecipePersistenceType) =>
            this.mapper.toDomain(recipe)
        );
    }
    async getRecipeType(typeId: AggregateID): Promise<IMealsType> {
        return await this.knex<IMealsType>(this.mealsTypeTableName)
            .select()
            .where("typeId", typeId)
            .first();
    }
    async getRecipeCategory(categoryId: AggregateID): Promise<IMealsCategory> {
        return await this.knex<IMealsCategory>(this.mealsCategoryTableName)
            .select()
            .where("categoryId", categoryId)
            .first();
    }
    async getAllRecipeType(): Promise<IMealsType[]> {
        const types = await this.knex<IMealsType>(
            this.mealsTypeTableName
        ).select();
        return types;
    }
    async getAllRecipeCategory(): Promise<IMealsCategory[]> {
        const categories = await this.knex<IMealsCategory>(
            this.mealsCategoryTableName
        ).select();
        return categories;
    }
}
