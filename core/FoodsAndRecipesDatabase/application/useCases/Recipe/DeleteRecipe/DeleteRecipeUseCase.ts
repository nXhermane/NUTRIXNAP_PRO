import { DeleteRecipeError } from "./DeleteRecipeError";
import { DeleteRecipeRequest } from "./DeleteRecipeRequest";
import { DeleteRecipeResponse } from "./DeleteRecipeResponse";
import { UseCase } from "@shared";
import {
    RecipeRepository,
    RecipeRepositoryError
} from "./../../../../infrastructure";
export class DeleteRecipeUseCase
    implements UseCase<DeleteRecipeRequest, DeleteRecipeResponse>
{
    constructor(private repo: RecipeRepository) {}

    async execute(request: DeleteRecipeRequest): Promise<DeleteRecipeResponse> {
        try {
            this.repo.delete(request.recipeId);
            return true;
        } catch (e) {
            if (e instanceof RecipeRepositoryError) return false;
            throw new DeleteRecipeError(
                `Unexpected error: ${e?.constructor.name}`,
                e as Error,
                request
            );
        }
    }
}
