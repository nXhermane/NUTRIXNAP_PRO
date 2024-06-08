import { CreateRecipeError } from './CreateRecipeError';
import { CreateRecipeRequest } from './CreateRecipeRequest';
import { CreateRecipeResponse } from './CreateRecipeResponse';
import { RecipeFactrory, CreateRecipeProps, IQuantity, IIngredient, IPreparationStep } from './../../../../domain';
import { UseCase } from '@shared';
import { RecipeRepository, RecipeRepositoryError } from './../../../../infrastructure';
export class CreateRecipeUseCase implements UseCase<CreateRecipeRequest, CreateRecipeResponse> {
   constructor(
      private repo: RecipeRepository,
      private factory: RecipeFactrory,
   ) {}

   async execute(request: CreateRecipeRequest): Promise<CreateRecipeResponse> {
      try {
         const { typeId, categoryId, ...otherProps } = request;
         const type = await this.repo.getRecipeType(typeId);
         const category = await this.repo.getRecipeCategory(categoryId);
         const recipe = await this.factory.create({
            ...otherProps,
            type,
            category,
         } as CreateRecipeProps);
         if (recipe.isFailure) throw new CreateRecipeError(`Create Recipe Failed`);
         this.repo.save(recipe.val);
         return {
            recipeId: recipe.val.id,
         } as CreateRecipeResponse;
      } catch (e) {
         if (e instanceof RecipeRepositoryError) throw new CreateRecipeError(e.message, e, e.metadata);
         throw new CreateRecipeError(`Unexpected error: ${e?.constructor.name}`, e as Error, request);
      }
   }
}
