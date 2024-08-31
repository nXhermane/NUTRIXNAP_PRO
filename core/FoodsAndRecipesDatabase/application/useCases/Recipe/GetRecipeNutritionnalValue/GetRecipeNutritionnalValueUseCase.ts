import { GetRecipeNutritionnalValueErrors } from "./GetRecipeNutritionnalValueErrors";
import { GetRecipeNutritionnalValueRequest } from "./GetRecipeNutritionnalValueRequest";
import { GetRecipeNutritionnalValueResponse } from "./GetRecipeNutritionnalValueResponse";
import { UseCase, AppError, Result, left, right, AggregateID } from "@shared";
import { RecipeRepository, RecipeRepositoryError, RecipeRepositoryNotFoundException } from "./../../../../infrastructure";
import { INutritionCalculatorService } from "./../../../../domain";
import { NutrientDto } from "./../../sharedType";
export class GetRecipeNutritionnalValueUseCase implements UseCase<GetRecipeNutritionnalValueRequest, GetRecipeNutritionnalValueResponse> {
   constructor(
      private repo: RecipeRepository,
      private service: INutritionCalculatorService,
   ) {}

   async execute(request: GetRecipeNutritionnalValueRequest): Promise<GetRecipeNutritionnalValueResponse> {
      try {
         const recipe = await this.repo.getRecipeById(request.recipeId);
         const nutrients = (await this.service.calculateRecipeNutritionalValue(recipe)).map((nutrient: any) => ({
            nutrientId: nutrient.id,
            nutrientName: nutrient.nutrientName,
            nutrientNameF: nutrient?.nutrientNameTranslate?.inFrench || nutrient.name,
            nutrientCode: nutrient.nutrientCode,
            nutrientUnit: nutrient.nutrientUnit,
            tagname: nutrient.nutrientINFOODSTagName,
            nutrientDecimal: nutrient.nutrientDecimal,
            nutrientValue: nutrient.nutrientValue,
            originalValue: nutrient?.originalValue || String(nutrient.nutrientValue),
         }));
         return right(
            Result.ok<{ recipeId: AggregateID; nutrients: NutrientDto[] }>({
               recipeId: request.recipeId,
               nutrients: nutrients as NutrientDto[],
            }),
         );
      } catch (e) {
         if (e instanceof RecipeRepositoryNotFoundException) {
            return left(new GetRecipeNutritionnalValueErrors.RecipeNotFoundError(e, request.recipeId));
         } else {
            return left(new AppError.UnexpectedError(e));
         }
      }
   }
}
