import { Message } from "@shared";
import {
    CreateRecipeRequest,
    CreateRecipeResponse,
    DeleteRecipeRequest,
    DeleteRecipeResponse,
    GetAllRecipeRequest,
    GetAllRecipeResponse,
    GetRecipeByIdRequest,
    GetRecipeByIdResponse,
    GetRecipeNutritionnalValueRequest,
    GetRecipeNutritionnalValueResponse
} from "./../../useCases";
export interface IRecipeService {
    createRecipe(
        req: CreateRecipeRequest
    ): Promise<CreateRecipeResponse | Message>;
    deleteRecipe(
        req: DeleteRecipeRequest
    ): Promise<DeleteRecipeResponse | Message>;
    getRecipeById(
        req: GetRecipeByIdRequest
    ): Promise<GetRecipeByIdResponse | Message>;
    getAllRecipe(
        req: GetAllRecipeRequest
    ): Promise<GetAllRecipeResponse | Message>;
    getRecipeNutritionnalValue(
        req: GetRecipeNutritionnalValueRequest
    ): Promise<GetRecipeNutritionnalValueResponse | Message>;
}
