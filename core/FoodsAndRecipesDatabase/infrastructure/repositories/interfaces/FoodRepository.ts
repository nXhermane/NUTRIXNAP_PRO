import { Food } from "./../../../domain/aggregates/Food";
import { AggregateID } from "@shared";
export interface FoodRepository {
    save(food: Food): Promise<Food>;
    delete(foodId: AggregateID, foodOrigin: string): Promise<void>;
    getFoodById(foodId: AggregateID, foodOrigin?: string): Promise<Food>;
    getFoodByFoodGroupCode?(foodGroupCode: string): Promise<Food[]>;
    searchFoodByFoodNameOrCode?(
        foodNameOrCode: string,
        foodOrigin?: string
    ): Promise<Food[]>;
    //Paginated Methodes
    getFoodByFoodGroupCodePaginated?(
        foodGroupCode: string,
        page: number,
        pageSize: number,
        foodOrigin?: string
    ): Promise<Food[]>;
    getAllFoodPaginated?(
        page: number,
        pageSize: number,
        foodOrigin?: string
    ): Promise<Food[]>;
    searchFoodByFoodNameOrCodePaginated?(
        foodNameOrCode: string,
        page: number,
        pageSize: number,
        foodOrigin?: string
    ): Promise<Food[]>;
}
