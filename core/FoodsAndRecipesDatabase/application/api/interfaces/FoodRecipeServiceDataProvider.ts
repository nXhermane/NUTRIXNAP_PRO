type AggregateID = string | number;
export interface IFoodRecipeServiceDataProvider {
   getAllFoodIds(): Promise<AggregateID[]>;
   getAllRecipeIds(): Promise<AggregateID[]>;
   getAllMealTypeIds(): Promise<AggregateID[]>;
}
