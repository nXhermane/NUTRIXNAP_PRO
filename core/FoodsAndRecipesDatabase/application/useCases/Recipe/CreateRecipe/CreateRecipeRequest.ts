import { IngredientDto, PreparationStepDto } from "./../sharedType";
import { QuantityDto } from "./../../sharedType";
import { AggregateID } from "@shared";
export type CreateRecipeRequest = {
    quantity: QuantityDto;
    typeId: AggregateID;
    categoryId: AggregateID;
    ingredients: IngredientDto[];
    preparationMethod: PreparationStepDto[];
    name: string;
    cookingTime: number;
    description: string;
    author: string;
    nameTranslate?: {
        inFrench?: string;
        inEnglish?: string;
    };
};
