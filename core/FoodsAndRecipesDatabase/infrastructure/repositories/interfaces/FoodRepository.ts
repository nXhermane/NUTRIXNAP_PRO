import { Food } from "./../../../domain/aggregates/Food";
import { AggregateID } from "@shared";
import { FoodResponseType } from "./../types";
export interface FoodRepository {
    save?(food: Food): Promise<Food>;
    delete?(foodId: AggregateID, foodOrigin: string): Promise<void>;
    getFoodById(foodId: AggregateID, foodOrigin?: string): Promise<Food>;
    getFoodByFoodGroupId?(foodGroupId: string): Promise<FoodResponseType[]>;
    searchFoodByFoodNameOrCode?(
        searchParam: {
            value: string;
            foodOrigin?: string;
        },
        pagginated?: {
            page: number;
            pageSize: number;
        }
    ): Promise<FoodResponseType[]>;

    getAllFood?(
        foodOrigin?: string,
        pagginated?: {
            page: number;
            pageSize: number;
        }
    ): Promise<FoodResponseType[]>;
    getAllFoodId(foodOrigin?: string): Promise<AggregateID[]>;
}
