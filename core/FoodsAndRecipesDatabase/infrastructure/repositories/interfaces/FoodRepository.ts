import { Food } from "./../../../domain/aggregates/Food";
import { AggregateID, Paginated } from "@shared";
import { FoodResponseType } from "./../types";
export interface FoodRepository {
    save(food: Food): Promise<Food>;
    delete(foodId: AggregateID, foodOrigin: string): Promise<void>;
    getFoodById(foodId: AggregateID, foodOrigin?: string): Promise<Food>;
    getFoodByFoodGroupId(
        foodGroupId: string,
        paginated?: Paginated
    ): Promise<FoodResponseType[]>;
    getAllFood(
        foodOrigin?: string,
        paginated?: Paginated
    ): Promise<FoodResponseType[]>;
    getAllFoodId(foodOrigin?: string): Promise<AggregateID[]>;
}
