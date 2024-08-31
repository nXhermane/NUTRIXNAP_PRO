import { CreateRecipeErrors } from "./CreateRecipeErrors";
import { CreateRecipeRequest } from "./CreateRecipeRequest";
import { CreateRecipeResponse } from "./CreateRecipeResponse";
import { RecipeFactrory, CreateRecipeProps, IQuantity, IIngredient, IPreparationStep } from "./../../../../domain";
import { UseCase, Result, left, right, AppError, AggregateID } from "./../../../../../shared";
import { RecipeRepository, RecipeRepositoryError } from "./../../../../infrastructure";
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
         if (recipe.isFailure) return left(new CreateRecipeErrors.CreateRecipeFailed(recipe.err));
         this.repo.save(recipe.val);
         return right(Result.ok<AggregateID>(recipe.val.id));
      } catch (e) {
         if (e instanceof RecipeRepositoryError) return left(new CreateRecipeErrors.RecipeRepoError(e));
         return left(new AppError.UnexpectedError(e));
      }
   }
}
