import { UseCase, Mapper } from '@shared';
import { GetAllRecipeRequest } from './GetAllRecipeRequest';
import { GetAllRecipeResponse } from './GetAllRecipeResponse';
import { GetAllRecipeError } from './GetAllRecipeError';
import { RecipeRepository, RecipeRepositoryError, RecipeRepositoryNotFoundException, RecipePersistenceDto } from './../../../../infrastructure';
import { Recipe } from './../../../../domain';
import { RecipeDto } from './../sharedType';

export class GetAllRecipeUseCase implements UseCase<GetAllRecipeRequest, GetAllRecipeResponse> {
   constructor(
      private repo: RecipeRepository,
      private mapper: Mapper<Recipe, RecipePersistenceDto, RecipeDto>,
   ) {}

   async execute(request: GetAllRecipeRequest = {}): Promise<GetAllRecipeResponse> {
      try {
         const recipes = await this.repo.getAllRecipe({
            page: request?.paginated?.page || 0,
            pageSize: request?.paginated?.pageSize || 100,
         });
         return recipes.map((recipe: Recipe) => this.mapper.toResponse(recipe)) as GetAllRecipeResponse;
      } catch (e) {
         if (e instanceof RecipeRepositoryNotFoundException) {
            return [] as GetAllRecipeResponse;
         } else if (e instanceof RecipeRepositoryError) {
            throw new GetAllRecipeError(e.message, e, e.metadata);
         } else {
            throw new GetAllRecipeError(`Unexpected error: ${e?.constructor.name}`, e as Error, request);
         }
      }
   }
}
