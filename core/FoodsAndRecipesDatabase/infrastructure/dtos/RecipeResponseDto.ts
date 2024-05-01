import {
    IQuantity,
    IMealsType,
    IMealsCategory,
    IPreparationStep,
    IIngredient
} from "./../../domain";
import { AggregateID } from "@shared";
export interface RecipeResponseDto {
    name: string;
    nameF: string;
    cookingTime: number;
    type: IMealsType;
    category: IMealsCategory;
    preparationMethod: IPreparationStep[];
    quantity: IQuantity;
    description: string;
    author: string;
    ingredients: IIngredient[];
    id: AggregateID;
    createdAt: string;
    updatedAt: string;
}
