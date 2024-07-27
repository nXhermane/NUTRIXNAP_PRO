import {
   IMeasurementTypeService,
   CreateMeasurementTypeUseCase,
   DeleteMeasurementTypeUseCase,
   GetAllMeasurementTypeUseCase,
   GetAllMeasurementTypeIdUseCase,
   GetMeasurementTypeUseCase,
   MeasurementTypeService,
} from "./application";
import { MeasurementTypeRepositoryImplDb, db } from "./infrastructure";
import { SQLiteDatabase } from "expo-sqlite";
import { IFoodRecipeServiceDataProvider, FoodAndRecipe } from "@foodAndRecipe";
export interface INutritionData {
   measurement: IMeasurementTypeService;
   foodAndRecipeProvider: IFoodRecipeServiceDataProvider;
}

export class NutritionData {
   private static instance: INutritionData | null = null;
   static async getInstance(): Promise<INutritionData> {
      if (NutritionData.instance) {
         const expo = (await db).db;

         const measurementRepo = new MeasurementTypeRepositoryImplDb(expo as SQLiteDatabase);

         const createMeasureUC = new CreateMeasurementTypeUseCase(measurementRepo);
         const getMeasureUC = new GetMeasurementTypeUseCase(measurementRepo);
         const getAllMeasureUC = new GetAllMeasurementTypeUseCase(measurementRepo);
         const getAllMeasureIdUC = new GetAllMeasurementTypeIdUseCase(measurementRepo);
         const deleteMeasureUC = new DeleteMeasurementTypeUseCase(measurementRepo);

         const measurementService = new MeasurementTypeService(createMeasureUC, getMeasureUC, getAllMeasureUC, getAllMeasureIdUC, deleteMeasureUC);

         NutritionData.instance = {
            measurement: measurementService,
            foodAndRecipeProvider: (await FoodAndRecipe.getInstance()).api.foodAndRecipeDataProvider,
         };
      }
      return NutritionData.instance as INutritionData;
   }
}
export * from "./domain";
export * from "./infrastructure";
export * from "./application";
