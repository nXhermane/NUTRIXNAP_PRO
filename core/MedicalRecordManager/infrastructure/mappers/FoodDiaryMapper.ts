import { FoodDiary, FoodDiaryFoodItem } from "./../../domain";
import { Mapper } from "@shared";
import { FoodDiaryPersistenceType } from "./../repositories/types";
import { FoodDiaryDto } from "./../dtos/FoodDiaryDto";
export class FoodDiaryMapper extends Mapper<FoodDiary, FoodDiaryPersistenceType, FoodDiaryDto> {
   toPersistence(entity: FoodDiary): FoodDiaryPersistenceType {
      return {
         id: entity.id as string,
         date: entity.date,
         meal: {
            withCompany: entity.meal.withCompany,
            watchingTv: entity.meal.watchingTv,
            sittingAtTable: entity.meal.sittingAtTable,
            foodItems: entity.meal.foodItems.map((foodItem: FoodDiaryFoodItem) => ({
               foodId: foodItem.foodId,
               recipeId: foodItem.recipeId,
               isRecipe: foodItem.isRecipe,
               isHomeMade: foodItem.isHomeMade,
               quantity: foodItem.quantity,
            })),
            mealTypeId: entity.meal.mealTypeId,
            description: entity.meal.description,
         },
         observation: entity.observation,
         images: entity.images,
         createdAt: entity.createdAt,
         updatedAt: entity.updatedAt,
      };
   }
   toDomain(record: FoodDiaryPersistenceType): FoodDiary {
      const { id, createdAt, updatedAt, ...otherProps } = record;
      return new FoodDiary({
         id,
         createdAt,
         updatedAt,
         props: { ...otherProps },
      });
   }
   toResponse(entity: FoodDiary): FoodDiaryDto {
      return {
         id: entity.id,
         createdAt: entity.createdAt,
         updatedAt: entity.updatedAt,
         date: entity.date,
         meal: {
            withCompany: entity.meal.withCompany,
            watchingTv: entity.meal.watchingTv,
            sittingAtTable: entity.meal.sittingAtTable,
            foodItems: entity.meal.foodItems.map((foodItem: FoodDiaryFoodItem) => ({
               foodId: foodItem.foodId,
               recipeId: foodItem.recipeId,
               isRecipe: foodItem.isRecipe,
               isHomeMade: foodItem.isHomeMade,
               quantity: foodItem.quantity,
            })),
            mealTypeId: entity.meal.mealTypeId,
            description: entity.meal.description,
         },
         observation: entity.observation,
         images: entity.images,
      };
   }
}
