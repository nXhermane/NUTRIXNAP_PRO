import { SQLiteDatabase } from "expo-sqlite";
import { IFoodRecipeServiceDataProvider } from "./interfaces/FoodRecipeServiceDataProvider";
import { db } from "../../infrastructure/database/db.config";
import {
   FoodGroupMapper,
   FoodGroupRepositoryImpl,
   FoodMapper,
   FoodRepositoryImpl,
   RecipeMapper,
   RecipeRepositoryImpl,
} from "../../infrastructure";
import { FoodRecipeServiceDataProvider } from "./FoodRecipeServiceDataProvider";

export class FoodAndRecipeApi {
   private static instance: IFoodRecipeServiceDataProvider | null = null;
   static async getInstance(): Promise<IFoodRecipeServiceDataProvider> {
      if (!FoodAndRecipeApi.instance) {
         const expo: SQLiteDatabase = (await db).db as SQLiteDatabase;
         const foodMapper = new FoodMapper();
         const recipeMapper = new RecipeMapper();
         const foodGroupMapper = new FoodGroupMapper();
         const foodGroupRepo = new FoodGroupRepositoryImpl(expo as SQLiteDatabase, foodGroupMapper);
         const foodRepo = new FoodRepositoryImpl(expo as SQLiteDatabase, foodMapper, foodGroupRepo);
         const recipeRepo = new RecipeRepositoryImpl(expo as SQLiteDatabase, recipeMapper);
         FoodAndRecipeApi.instance = new FoodRecipeServiceDataProvider(foodRepo, recipeRepo);
      }
      return FoodAndRecipeApi.instance;
   }
}
