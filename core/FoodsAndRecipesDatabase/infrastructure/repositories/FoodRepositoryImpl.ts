import * as schemas from "../database/foodAndRecipe.schema";
import { FoodRepository } from "./interfaces/FoodRepository";
import { FoodRepositoryError, FoodRepositoryNotFoundException } from "./errors/FoodRepositoryError";
import { AggregateID, Result, Mapper, Paginated, DomainEvents } from "@shared";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { and, eq } from "drizzle-orm";
import { SQLiteDatabase } from "expo-sqlite";
import { Food } from "../../domain";
import { FoodPersistenceType, FoodNamePersistenceType } from "./types";
import { FoodDto } from "../dtos";
import { FoodGroupRepository } from "./interfaces/FoodGroupRepository";
import { INutrientAmount } from "../../domain/value-objects/NutrientAmount";

export class FoodRepositoryImpl implements FoodRepository {
   private db;
   constructor(
      expo: SQLiteDatabase,
      private mapper: Mapper<Food, FoodNamePersistenceType, FoodDto>,
      private foodGroupRepo: FoodGroupRepository,
   ) {
      this.db = drizzle(expo);
   }
   async save(food: Food): Promise<void> {
      try {
         const foodPersistence = this.mapper.toPersistence(food);
         const exist = await this.checkIfExist(foodPersistence.foodId);
         await this.db.transaction(async (tx) => {
            if (!exist) {
               await tx.insert(schemas.foodNames).values(foodPersistence);
            } else {
               await tx
                  .update(schemas.foodNames)
                  .set(foodPersistence)
                  .where(eq(schemas.foodNames.foodId, food.id as string));
            }
            await Promise.all(
               food.foodNutrients.map(async (value: INutrientAmount) => {
                  const exist = await this.checkIfNutrientAmountExist(food.id, value.nutrientId);
                  return !exist
                     ? tx.insert(schemas.nutrientAmounts).values({
                          ...value,
                          foodId: food.id as string,
                          nutrientId: value.nutrientId as string,
                       })
                     : tx
                          .update(schemas.nutrientAmounts)
                          .set({
                             ...value,
                             foodId: food.id as string,
                             nutrientId: value.nutrientId as string,
                          })
                          .where(
                             and(
                                eq(schemas.nutrientAmounts.foodId, food.id as string),
                                eq(schemas.nutrientAmounts.nutrientId, value.nutrientId as string),
                             ),
                          );
               }),
            );
            this.foodGroupRepo.save(food.getProps().foodGroup, tx);
         });
      } catch (error: any) {
         throw new FoodRepositoryError("Erreur lors du sauvegarde du Food ", error as Error, { food });
      }
   }
   delete?(foodId: AggregateID, foodOrigin: string): Promise<void> {
      throw new Error("Method not implemented.");
   }
   getFoodById(foodId: AggregateID): Promise<Food> {
      throw new Error("Method not implemented.");
   }
   getFoodByFoodGroupId(foodGroupId: string, paginated?: Paginated): Promise<Food[]> {
      throw new Error("Method not implemented.");
   }
   getAllFood(foodOrigin?: string, paginated?: Paginated): Promise<Food[]> {
      throw new Error("Method not implemented.");
   }
   getAllFoodId(foodOrigin?: string): Promise<AggregateID[]> {
      throw new Error("Method not implemented.");
   }

   private async checkIfExist(foodId: AggregateID): Promise<boolean> {
      const food = await this.db
         .select()
         .from(schemas.foodNames)
         .where(eq(schemas.foodNames.foodId, foodId as string))
         .get();
      return !!food;
   }
   private async checkIfNutrientAmountExist(foodId: AggregateID, nutrientId: AggregateID): Promise<boolean> {
      const nutAmount = await this.db
         .select()
         .from(schemas.nutrientAmounts)
         .where(and(eq(schemas.nutrientAmounts.foodId, foodId as string), eq(schemas.nutrientAmounts.nutrientId, nutrientId as string)))
         .get();
      return !!nutAmount;
   }
}
