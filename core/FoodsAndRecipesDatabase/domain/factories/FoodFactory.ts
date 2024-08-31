import { Quantity as FoodQuantity, IQuantity as IFoodQuantity } from "./../value-objects/Quantity";
import { Nutrient, INutrient } from "./../entities/Nutrient";
import { FoodGroup, IFoodGroup } from "./../entities/FoodGroup";
import { Food, IFood } from "./../aggregates/Food";
import { CreateEntityProps, Result } from "@shared";
export type CreateFoodProps = {
   foodQuantity: IFoodQuantity;
   foodGroup: CreateEntityProps<IFoodGroup>;
   foodNutrients: CreateEntityProps<INutrient>[];
} & Omit<IFood, "foodQuantity" | "foodGroup" | "foodNutrients">;

export class FoodFactrory {
   constructor() {}
   create(foodProps: CreateFoodProps): Result<Food> {
      const { foodQuantity, foodGroup, foodNutrients, ...otherFoodProps } = foodProps;
      try {
         const newQuantity = new FoodQuantity(foodQuantity);
         const newFoodGroup = new FoodGroup(foodGroup);
         // Création de nouvelles instances de Nutrient à partir des propriétés fournies
         const newFoodNutrients: Nutrient[] = foodNutrients.map((nutrientProps: CreateEntityProps<INutrient>) => {
            const result = this.createNutrient(nutrientProps);
            if (result.isFailure) throw Error(String(result.err));
            return result.val;
         });

         const newFood = new Food({
            props: {
               foodName: otherFoodProps.foodName,
               foodCode: otherFoodProps.foodCode,
               foodSource: otherFoodProps.foodSource,
               foodOrigin: otherFoodProps.foodOrigin,
               foodNameTranslate: otherFoodProps?.foodNameTranslate,
               foodNutrients: newFoodNutrients,
               foodQuantity: newQuantity,
               foodGroup: newFoodGroup,
            },
         });
         return Result.ok<Food>(newFood);
      } catch (e) {
         return Result.fail<Food>(String(e));
      }
   }

   createNutrient(nutrientProps: CreateEntityProps<INutrient>): Result<Nutrient> {
      try {
         const nutrient = new Nutrient(nutrientProps);
         nutrient.validate();
         return Result.ok<Nutrient>(nutrient);
      } catch (e) {
         return Result.fail<Nutrient>(String(e));
      }
   }
}
