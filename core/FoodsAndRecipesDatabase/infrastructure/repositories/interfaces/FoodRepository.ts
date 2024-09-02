import { Food } from "./../../../domain/aggregates/Food";
import { AggregateID, Paginated } from "@shared";
export interface FoodRepository {
   save?(food: Food): Promise<void>
   delete?(foodId: AggregateID, foodOrigin: string): Promise<void>;
   getFoodById(foodId: AggregateID): Promise<Food>;
   getFoodByFoodGroupId(foodGroupId: string, paginated?: Paginated): Promise<Food[]>;
   getAllFood(foodOrigin?: string, paginated?: Paginated): Promise<Food[]>;
   getAllFoodId(foodOrigin?: string): Promise<AggregateID[]>;
}
