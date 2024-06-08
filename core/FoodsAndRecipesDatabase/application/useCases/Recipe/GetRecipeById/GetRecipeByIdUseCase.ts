import { GetRecipeByIdError } from './GetRecipeByIdError';
import { GetRecipeByIdResponse } from './GetRecipeByIdResponse';
import { GetRecipeByIdRequest } from './GetRecipeByIdRequest';
import { UseCase, Mapper } from '@shared';
import { RecipeRepository, RecipeRepositoryError, RecipeRepositoryNotFoundException, RecipePersistenceDto } from './../../../../infrastructure';
import { Recipe } from './../../../../domain';
import { RecipeDto } from './../sharedType';

export class GetRecipeByIdUseCase implements UseCase<GetRecipeByIdRequest, GetRecipeByIdResponse> {
   constructor(
      private repo: RecipeRepository,
      private mapper: Mapper<Recipe, RecipePersistenceDto, RecipeDto>,
   ) {}

   async execute(request: GetRecipeByIdRequest): Promise<GetRecipeByIdResponse> {
      try {
         const recipe = await this.repo.getRecipeById(request.recipeId);
         return this.mapper.toResponse(recipe) as GetRecipeByIdResponse;
      } catch (e) {
         if (e instanceof RecipeRepositoryNotFoundException || e instanceof RecipeRepositoryError) {
            throw new GetRecipeByIdError(e.message, e, e.metadata);
         } else {
            throw new GetRecipeByIdError(`Unexpected error: ${e?.constructor.name}`, e as Error, request);
         }
      }
   }
}
