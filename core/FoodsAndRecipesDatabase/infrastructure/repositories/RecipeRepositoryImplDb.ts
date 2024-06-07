import { RecipeRepository } from "./interfaces/RecipeRepository";
import { Mapper, AggregateID, Paginated } from "@shared";
import { Recipe, IMealsType, IMealsCategory } from "./../../domain";
import { Knex } from "knex";
import { RecipePersistenceType } from "./types";
import { RecipePersistenceDto } from "./../dtos/RecipePersistenceDto";
import {
  RecipeRepositoryNotFoundException,
  RecipeRepositoryError
} from "./errors/RecipeRepositoryError";
import { RecipeDto } from "./../../application";
export class RecipeRepositoryImplDb implements RecipeRepository {
  private recipeTableName: string = "recipes";
  private mealsTypeTableName: string = "meals_types";
  private mealsCategoryTableName: string = "meals_categories";
  constructor(
    private knex: Knex,
    private mapper: Mapper<Recipe, RecipePersistenceDto, RecipeDto>
  ) { }
  async save(recipe: Recipe): Promise<void> {
    try {
      const recipePersistence = this.mapper.toPersistence(recipe);
      const exist = await this.checkIfRecipeExist(recipePersistence.recipeId)
      if (!exist)
        await this.knex<RecipePersistenceDto>(this.recipeTableName).insert(
          recipePersistence
        );
      else
        await this.knex<RecipePersistenceDto>(this.recipeTableName).where('recipeId', recipePersistence.recipeId).update(recipePersistence)
    } catch (error) {
      throw new RecipeRepositoryError(
        "Erreur lors de la sauvegarde de la recette",
        error as Error,
        {}
      );
    }
  }

  async delete(recipeId: AggregateID): Promise<void> {
    try {
      await this.knex<RecipePersistenceDto>(this.recipeTableName)
        .delete()
        .where("recipeId", recipeId);
    } catch (error) {
      throw new RecipeRepositoryError(
        "Erreur lors de la suppression de la recette",
        error as Error,
        {}
      );
    }
  }
  async getRecipeById(recipeId: AggregateID): Promise<Recipe> {
    try {
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
      if (!recipe) {
        throw new RecipeRepositoryNotFoundException(
          "Recette non trouvée pour l'ID donné",
          new Error(""),
          { recipeId }
        );
      }
      return this.mapper.toDomain(recipe as RecipePersistenceType);
    } catch (error) {
      throw new RecipeRepositoryError(
        "Erreur lors de la récupération de la recette par ID",
        error as Error,
        { recipeId }
      );
    }
  }
  async getAllRecipe(paginated?: Paginated): Promise<Recipe[]> {
    try {
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

      if (paginated)
        query.limit(paginated.pageSize).offset(paginated.page);
      const recipes = await query;
      if (recipes.length === 0) {
        throw new RecipeRepositoryNotFoundException(
          "Aucune recette trouvée",
          new Error(""),
          {}
        );
      }
      return recipes.map((recipe: RecipePersistenceType) =>
        this.mapper.toDomain(recipe)
      );
    } catch (error) {
      throw new RecipeRepositoryError(
        "Erreur lors de la récupération de toutes les recettes",
        error as Error,
        {}
      );
    }
  }
  async getRecipeType(typeId: AggregateID): Promise<IMealsType> {
    try {
      const type = await this.knex<IMealsType>(this.mealsTypeTableName)
        .select()
        .where("typeId", typeId)
        .first();
      if (!type) {
        throw new RecipeRepositoryNotFoundException(
          "Type de recette non trouvé pour l'ID donné",
          new Error(""),
          { typeId }
        );
      }
      return type;
    } catch (error) {
      throw new RecipeRepositoryError(
        "Erreur lors de la récupération du type de recette",
        error as Error,
        { typeId }
      );
    }
  }

  async getRecipeCategory(categoryId: AggregateID): Promise<IMealsCategory> {
    try {
      const category = await this.knex<IMealsCategory>(
        this.mealsCategoryTableName
      )
        .select()
        .where("categoryId", categoryId)
        .first();
      if (!category) {
        throw new RecipeRepositoryNotFoundException(
          "Catégorie de recette non trouvée pour l'ID donné",
          new Error(""),
          { categoryId }
        );
      }
      return category;
    } catch (error) {
      throw new RecipeRepositoryError(
        "Erreur lors de la récupération de la catégorie de recette",
        error as Error,
        { categoryId }
      );
    }
  }

  async getAllRecipeType(): Promise<IMealsType[]> {
    try {
      const types = await this.knex<IMealsType>(
        this.mealsTypeTableName
      ).select();
      if (types.length === 0) {
        throw new RecipeRepositoryNotFoundException(
          "Aucun type de recette trouvé",
          new Error()
        );
      }
      return types;
    } catch (error) {
      throw new RecipeRepositoryError(
        "Erreur lors de la récupération de tous les types de recettes",
        error as Error
      );
    }
  }

  async getAllRecipeCategory(): Promise<IMealsCategory[]> {
    try {
      const categories = await this.knex<IMealsCategory>(
        this.mealsCategoryTableName
      ).select();
      if (categories.length === 0) {
        throw new RecipeRepositoryNotFoundException(
          "Aucune catégorie de recette trouvée",
          new Error("")
        );
      }
      return categories;
    } catch (error) {
      throw new RecipeRepositoryError(
        "Erreur lors de la récupération de toutes les catégories de recettes",
        error as Error
      );
    }
  }

  async getAllRecipeId(): Promise<AggregateID[]> {
    try {
      const recipeIds = await await this.knex<RecipePersistenceType>(this.recipeTableName).select("recipeId")
      if (recipeIds.length === 0)
        throw new RecipeRepositoryNotFoundException("Aucune recette trouvée", new Error(""), {});
      return recipeIds.map((id:{recipeId: AggregateID}) => id.recipeId)
    } catch (error) {
      throw new RecipeRepositoryError("Erreur lors de la récupération de toutes les ids de recettes", error as Error, {});
    }
  }
  private async checkIfRecipeExist(recipeId: AggregateID): Promise<boolean> {
    const recipe = await this.knex<RecipePersistenceDto>(this.recipeTableName).select().where('recipeId', recipeId).first()
    return recipe ? true : false
  }

}
