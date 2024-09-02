import { IQuantity, Mapper } from "@shared";
import { Recipe, MealsType, MealsCategory, Ingredient, IIngredient, FoodQuantity, PreparationStep, IPreparationStep } from "./../../domain";
import { RecipePersistenceDto } from "./../dtos/RecipePersistenceDto";
import { RecipePersistenceType } from "./../repositories/types";
import { RecipeDto, QuantityDto, MealsCategoryDto, MealsTypeDto, PreparationStepDto } from "./../dtos";
export class RecipeMapper implements Mapper<Recipe, RecipePersistenceDto, RecipeDto> {
   toPersistence(recipe: Recipe): RecipePersistenceDto {
      const persistenceRecipe: RecipePersistenceDto = {
         recipeId: recipe.id as string,
         name: recipe.name,
         nameF: recipe.nameF,
         categoryId: recipe.category.categoryId,
         typeId: recipe.type.typeId,
         ingredients: JSON.stringify(recipe.ingredients),
         preparationMethod: JSON.stringify(recipe.preparationMethod),
         cookingTime: recipe.cookingTime,
         quantity: JSON.stringify(recipe.quantity),
         description: recipe.description,
         author: recipe.author,
         createdAt: recipe.createdAt,
         updatedAt: recipe.updatedAt,
      };
      return persistenceRecipe;
   }
   toDomain(record: RecipePersistenceType): Recipe {
      const { ingredients, preparationMethod, quantity } = record;

      const convertToIIngredientArray = JSON.parse(ingredients) as IIngredient[];
      const converToPreparationStepArray = JSON.parse(preparationMethod) as IPreparationStep[];
      const convertToIQunatity = JSON.parse(quantity) as IQuantity;

      const newIngredients = convertToIIngredientArray.map((ing: IIngredient) => new Ingredient(ing));
      const newPreparationMethod = converToPreparationStepArray.map((preparationStep: IPreparationStep) => new PreparationStep(preparationStep));
      const newQuantity = new FoodQuantity(convertToIQunatity);
      const newCategory = new MealsCategory({
         categoryId: record.categoryId,
         name: record.categoryName,
         nameF: record.categoryNameF,
      });
      const newType = new MealsType({
         typeId: record.typeId,
         name: record.typeName,
         nameF: record.typeNameF,
      });

      return new Recipe({
         id: record.recipeId,
         createdAt: record?.createdAt || new Date().toJSON(),
         updatedAt: record?.updatedAt || new Date().toJSON(),
         props: {
            name: record.name,
            category: newCategory,
            type: newType,
            ingredients: newIngredients,
            preparationMethod: newPreparationMethod,
            cookingTime: record.cookingTime,
            quantity: newQuantity,
            description: record.description,
            author: record.author,
            nameTranslate: {
               inFrench: record.nameF,
            },
         },
      });
   }
   toResponse(recipe: Recipe): RecipeDto {
      const recipeDto = {
         name: recipe.name,
         nameF: recipe.nameF,
         type: recipe.type as MealsTypeDto,
         category: recipe.category as MealsCategoryDto,
         cookingTime: recipe.cookingTime,
         ingredients: recipe.ingredients.map((ing: IIngredient) => ({
            name: ing.name,
            quantity: ing.quantity.unpack(),
            foodId: ing.foodId,
         })),
         preparationMethod: recipe.preparationMethod as PreparationStepDto[],
         description: recipe.description,
         author: recipe.author,
         quantity: recipe.quantity as QuantityDto,
         id: recipe.id,
         createdAt: recipe.createdAt,
         updatedAt: recipe.updatedAt,
      };
      return recipeDto as RecipeDto;
   }
}
