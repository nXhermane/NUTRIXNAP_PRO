import { QuantityDto } from "./../sharedType";
import { AggregateID } from "./../../../../shared";
export type IngredientDto = {
   name: string;
   quantity: QuantityDto;
   foodId: AggregateID;
};

export type MealsTypeDto = {
   typeId: number;
   name: string;
   nameF: string;
};
export type MealsCategoryDto = {
   categoryId: number;
   name: string;
   nameF: string;
};

export type PreparationStepDto = {
   stepNumber: number;
   description: string;
   estimatedTime: number;
};

export type RecipeDto = {
   name: string;
   nameF: string;
   cookingTime: number;
   type: MealsTypeDto;
   category: MealsCategoryDto;
   preparationMethod: PreparationStepDto[];
   quantity: QuantityDto;
   description: string;
   author: string;
   ingredients: IngredientDto[];
   id: AggregateID;
   createdAt: string;
   updatedAt: string;
};
