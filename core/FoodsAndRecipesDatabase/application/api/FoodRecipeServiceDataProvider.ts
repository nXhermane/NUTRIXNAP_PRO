import {
   RecipeRepository,
   FoodRepository,
   FoodRepositoryNotFoundException,
   RecipeRepositoryNotFoundException,
   RecipeRepositoryError,
   FoodRepositoryError,
} from './../../infrastructure';
import { IFoodRecipeServiceDataProvider } from './interfaces/FoodRecipeServiceDataProvider';
import { FoodRecipeServiceDataProviderError } from './errors/FoodRecipeServiceDataProviderError';
import { AggregateID } from '@shared';
import { IMealsType } from './../../domain';
export class FoodRecipeServiceDataProvider implements IFoodRecipeServiceDataProvider {
   constructor(
      private foodRepo: FoodRepository,
      private recipeRepo: RecipeRepository,
   ) {}
   async getAllFoodIds(): Promise<AggregateID[]> {
      try {
         const foodIds = await this.foodRepo.getAllFoodId();
         return foodIds;
      } catch (e) {
         if (e instanceof FoodRepositoryNotFoundException) {
            return [] as AggregateID[];
         } else if (e instanceof FoodRepositoryError) {
            throw new FoodRecipeServiceDataProviderError(e.message, e as Error, e.metadata);
         } else {
            throw new FoodRecipeServiceDataProviderError(`Unexpected error: ${e?.constructor.name}`, e as Error);
         }
      }
   }
   async getAllRecipeIds(): Promise<AggregateID[]> {
      try {
         const recipeIds = await this.recipeRepo.getAllRecipeId();
         return recipeIds;
      } catch (e) {
         if (e instanceof RecipeRepositoryNotFoundException) {
            return [] as AggregateID[];
         } else if (e instanceof RecipeRepositoryError) {
            throw new FoodRecipeServiceDataProviderError(e.message, e as Error, e.metadata);
         } else {
            throw new FoodRecipeServiceDataProviderError(`Unexpected error: ${e?.constructor.name}`, e as Error);
         }
      }
   }
   async getAllMealTypeIds(): Promise<AggregateID[]> {
      try {
         const mealTypes = await this.recipeRepo.getAllRecipeType();
         return mealTypes.map((mealType: IMealsType) => mealType.typeId);
      } catch (e) {
         if (e instanceof RecipeRepositoryNotFoundException) {
            return [] as AggregateID[];
         } else if (e instanceof RecipeRepositoryError) {
            throw new FoodRecipeServiceDataProviderError(e.message, e as Error, e.metadata);
         } else {
            throw new FoodRecipeServiceDataProviderError(`Unexpected error: ${e?.constructor.name}`, e as Error);
         }
      }
   }
}
