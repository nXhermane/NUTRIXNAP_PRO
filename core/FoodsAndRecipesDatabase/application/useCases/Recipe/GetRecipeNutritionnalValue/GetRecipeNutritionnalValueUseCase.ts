import { GetRecipeNutritionnalValueError } from "./GetRecipeNutritionnalValueError";
import { GetRecipeNutritionnalValueRequest } from "./GetRecipeNutritionnalValueRequest";
import { GetRecipeNutritionnalValueResponse } from "./GetRecipeNutritionnalValueResponse";
import { UseCase } from "@shared";
import {
    RecipeRepository,
    RecipeRepositoryError,
    RecipeRepositoryNotFoundException
} from "./../../../../infrastructure";
import { INutritionCalculatorService } from "./../../../../domain";
import { NutrientDto } from "./../../sharedType";
export class GetRecipeNutritionnalValueUseCase
    implements
        UseCase<
            GetRecipeNutritionnalValueRequest,
            GetRecipeNutritionnalValueResponse
        >
{
    constructor(
        private repo: RecipeRepository,
        private service: INutritionCalculatorService
    ) {}

    async execute(
        request: GetRecipeNutritionnalValueRequest
    ): Promise<GetRecipeNutritionnalValueResponse> {
        try {
            const recipe = await this.repo.getRecipeById(request.recipeId);
            const nutrients = (
                await this.service.calculateRecipeNutritionalValue(recipe)
            ).map((nutrient: any) => ({
                nutrientId: nutrient.id,
                nutrientName: nutrient.nutrientName,
                nutrientNameF:
                    nutrient?.nutrientNameTranslate?.inFrench || nutrient.name,
                nutrientCode: nutrient.nutrientCode,
                nutrientUnit: nutrient.nutrientUnit,
                tagname: nutrient.nutrientINFOODSTagName,
                nutrientDecimal: nutrient.nutrientDecimal,
                nutrientValue: nutrient.nutrientValue,
                originalValue:
                    nutrient?.originalValue || String(nutrient.nutrientValue)
            }));
            return {
                recipeId: request.recipeId,
                nutrients: nutrients as NutrientDto[]
            } as GetRecipeNutritionnalValueResponse;
        } catch (e) {
            if (
                e instanceof RecipeRepositoryNotFoundException ||
                e instanceof RecipeRepositoryError
            ) {
                throw new GetRecipeNutritionnalValueError(
                    e.message,
                    e,
                    e.metadata
                );
            } else {
                throw new GetRecipeNutritionnalValueError(
                    `Unexpected error: ${e?.constructor.name}`,
                    e as Error,
                    request
                );
            }
        }
    }
}
