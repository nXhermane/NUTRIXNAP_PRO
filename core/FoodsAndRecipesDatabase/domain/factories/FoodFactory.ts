import {
    Quantity as FoodQuantity,
    IQuantity as IFoodQuantity
} from "./../value-objects/Quantity";
import { Nutrient, INutrient } from "./../entities/Nutrient";
import { FoodGroup, IFoodGroup } from "./../entities/FoodGroup";
import { Food, IFood } from "./../aggregates/Food";
import { CreateEntityProps, Result } from "@shared";
type CreateFoodProps = {
    foodQuantity: IFoodQuantity;
    foodGroup: CreateEntityProps<IFoodGroup>;
    foodNutrients: CreateEntityProps<INutrient>[];
} & Omit<IFood, "foodQuantity" | "foodGroup" | "foodNutrients">;

export class FoodFactrory {
    static create(foodProps: CreateFoodProps): Result<Food> {
        const { foodQuantity, foodGroup, foodNutrients, ...otherFoodProps } =
            foodProps;
        try {
            const newQuantity = new FoodQuantity(foodQuantity);
            const newFoodGroup = new FoodGroup(foodGroup);
            // Création de nouvelles instances de Nutrient à partir des propriétés fournies
            const newFoodNutrients: Nutrient[] = foodNutrients.map(
                (nutrientProps: CreateEntityProps<INutrient>) =>
                    new Nutrient(nutrientProps)
            );

            const newFood = new Food({
              props:{
                foodName: otherFoodProps.foodName,
                foodCode: otherFoodProps.foodCode,
                foodSource: otherFoodProps.foodSource,
                foodOrigin: otherFoodProps.foodOrigin,
                foodNameTranslate: otherFoodProps?.foodNameTranslate,
                foodNutrients: newFoodNutrients,
                foodQuantity: newQuantity,
                foodGroup: newFoodGroup,
            }});
            return Result.ok<Food>(newFood);
        } catch (e) {
            return Result.fail<Food>(String(e));
        }
    }
}
