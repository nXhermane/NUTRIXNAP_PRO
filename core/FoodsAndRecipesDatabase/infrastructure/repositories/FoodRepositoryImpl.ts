import * as schemas from "../database/foodAndRecipe.schema";
import { FoodRepository } from "./interfaces/FoodRepository";
import { FoodRepositoryError, FoodRepositoryNotFoundException } from "./errors/FoodRepositoryError";
import { AggregateID, Result, Mapper, Paginated, DomainEvents } from "@shared";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";
import { SQLiteDatabase } from "expo-sqlite";
import { Food } from "../../domain";
import { FoodPersistenceType } from "./types";
import { FoodDto } from "../dtos";

export class FoodRepositoryImpl implements FoodRepository {
   private db;
   constructor(
      expo: SQLiteDatabase,
      private mapper: Mapper<Food, FoodPersistenceType, FoodDto>,
   ) {
      this.db = drizzle(expo);
   }
   async save(food: Food): Promise<Food> {
      try {
        const foodPersistence = this.mapper.toPersistence(food)
        const exist = await this.checkIfExist(foodPersistence.foodId)
        if(exist) this.db.insert(schemas.foodNames)
      } catch (error: any) {}
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
}
