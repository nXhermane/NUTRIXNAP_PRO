import { CreateFoodProps } from "./../../domain/factories/FoodFactory";
import { FoodResponseType } from "./../../infrastructure/repositories/types";
import { AggregateID, Paginated } from "@shared";

export interface IFoodManager {
    addFood(food: CreateFoodProps): Promise<AggregateID>;
    getFoodById(foodId: AggregateID): Promise<FoodResponseType>;
    getAllFood(params: {
        foodOrigin?: string;
        paginated?: Paginated;
    }): Promise<FoodResponseType[]>;
    getFoodByFoodGroup(params: {
        foodGroupId: string;
        paginated?: Paginated;
    }): Promise<FoodResponseType[]>;
    deleteFood(foodId: AggregateID): Promise<void>;
    search(foodName: string): FoodResponseType[];
}
