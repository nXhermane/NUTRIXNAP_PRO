import { Quantity, IQuantity } from "./../value-objects/Quantity";
import { MealsType, IMealsType } from "./../value-objects/MealsType";
import { MealsCategory, IMealsCategory } from "./../value-objects/MealsCategory";
import { Ingredient, IIngredient } from "./../value-objects/Ingredient";
import { PreparationStep, IPreparationStep } from "./../value-objects/PreparationStep";
import { Recipe, IRecipe } from "./../aggregates/Recipe";
import { Result } from "@shared";
import { FoodRepository } from "./../../infrastructure";
export type CreateRecipeProps = {
   quantity: IQuantity;
   type: IMealsType;
   category: IMealsCategory;
   ingredients: (Omit<IIngredient, "quantity"> & {
      quantity: IQuantity;
   })[];
   preparationMethod: IPreparationStep[];
} & Omit<IRecipe, "type" | "category" | "ingredients" | "preparationMethod" | "quantity">;

export class RecipeFactrory {
   constructor(private foodRepository: FoodRepository) {}
   async create(recipeProps: CreateRecipeProps): Promise<Result<Recipe>> {
      const { quantity, type, category, ingredients, preparationMethod, nameTranslate, author, ...otherRecipeProps } = recipeProps;
      try {
         const newQuantity = new Quantity(quantity);
         const newType = new MealsType(type);
         const newCategory = new MealsCategory(category);
         const newIngredients: Ingredient[] = await Promise.all(
            ingredients.map(
               async (
                  ingProps: Omit<IIngredient, "quantity"> & {
                     quantity: IQuantity;
                  },
               ) => {
                  const result = await this.createIngredient(ingProps);
                  if (result.isFailure) throw Error(String(result.err));
                  return result.val;
               },
            ),
         );
         const newPreparationMethod = preparationMethod.map((step: IPreparationStep) => {
            return new PreparationStep(step);
         });
         const newRecipe = new Recipe({
            props: {
               name: otherRecipeProps.name,
               type: newType,
               category: newCategory,
               quantity: newQuantity,
               ingredients: newIngredients,
               preparationMethod: newPreparationMethod,
               cookingTime: otherRecipeProps.cookingTime,
               description: otherRecipeProps.description,
               author,
               nameTranslate,
            },
         });
         return Result.ok<Recipe>(newRecipe);
      } catch (e) {
         return Result.fail<Recipe>(String(e));
      }
   }
   async createIngredient(
      ingProps: Omit<IIngredient, "quantity"> & {
         quantity: IQuantity;
      },
   ): Promise<Result<Ingredient>> {
      try {
         const quantity = new Quantity(ingProps.quantity);
         const ingredient = new Ingredient({
            name: ingProps.name,
            quantity,
            foodId: ingProps.foodId,
         });
         const foodIds = await this.foodRepository.getAllFoodId();
         ingredient.validateIngredient(foodIds);
         return Result.ok<Ingredient>(ingredient);
      } catch (e) {
         return Result.fail<Ingredient>(String(e));
      }
   }
}
