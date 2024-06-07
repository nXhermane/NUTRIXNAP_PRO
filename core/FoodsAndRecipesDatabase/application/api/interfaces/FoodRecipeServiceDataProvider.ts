import { AggregateID } from "@shared"
export interface IFoodRecipeServiceDataProvider {
  getAllFoodIds(): Promise<AggregateID[]>
  getAllRecipeIds(): Promise<AggregateID[]>
  getAllMealTypeIds(): Promise<AggregateID[]>
}