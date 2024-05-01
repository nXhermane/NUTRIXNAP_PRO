import { IQuantity, IIngredient } from "./../../domain";
import { AggregateID } from "@shared";
export  interface CreateRecipeDto {
    quantity: IQuantity;
    typeId: AggregateID;
    category: AggregateID;
    ingredients: IIngredient[];
    preparationMethod: IPreparationStep[];
    name: string;
    cookingTime: number;
    description: string;
    author: string;
    nameTranslate?: {
        inFrench?: string;
        inEnglish?: string;
    };
}
