import { CreateRecipeDto } from "./../../infrastructure";
import { AggregateID, Paginated } from "@shared";
import {RecipeResponseDto} from './../../infrastructure'
export interface IRecipeManger {
    createRecipe(createRecipeDto: CreateRecipeDto): Promise<AggregateID>;
    deleteRecipe(recipeId: AggregateID): void;
    getRecipeById(recipeId: AggregateID): Promise<RecipeResponseDto>;
    getAllRecipe(paginated?: Paginated): Promise<RecipeResponseDto[]>;
}
