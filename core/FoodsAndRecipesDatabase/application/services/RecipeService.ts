import { Message, UseCase } from '@shared';
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
   GetRecipeNutritionnalValueResponse,
   CreateRecipeError,
   DeleteRecipeError,
   GetAllRecipeError,
   GetRecipeByIdError,
   GetRecipeNutritionnalValueError,
} from './../useCases';
import { IRecipeService } from './interfaces/RecipeService';
export class RecipeService implements IRecipeService {
   constructor(
      private createUC: UseCase<CreateRecipeRequest, CreateRecipeResponse>,
      private deleteUC: UseCase<DeleteRecipeRequest, DeleteRecipeResponse>,
      private getByIdUC: UseCase<GetRecipeByIdRequest, GetRecipeByIdResponse>,
      private getAllUC: UseCase<GetAllRecipeRequest, GetAllRecipeResponse>,
      private getNutritionnalValueUC: UseCase<GetRecipeNutritionnalValueRequest, GetRecipeNutritionnalValueResponse>,
   ) {}
   async createRecipe(req: CreateRecipeRequest): Promise<CreateRecipeResponse | Message> {
      try {
         const res = await this.createUC.execute(req);
         return res;
      } catch (e) {
         if (e instanceof CreateRecipeError) return new Message('error', e.message);
         return new Message('error', 'Unspected Error.Retry this action.');
      }
   }
   async deleteRecipe(req: DeleteRecipeRequest): Promise<DeleteRecipeResponse | Message> {
      try {
         const res = await this.deleteUC.execute(req);
         return res;
      } catch (e) {
         if (e instanceof DeleteRecipeError) return new Message('error', e.message);
         return new Message('error', 'Unspected Error.Retry this action.');
      }
   }
   async getRecipeById(req: GetRecipeByIdRequest): Promise<GetRecipeByIdResponse | Message> {
      try {
         const res = await this.getByIdUC.execute(req);
         return res;
      } catch (e) {
         if (e instanceof GetRecipeByIdError) return new Message('error', e.message);
         return new Message('error', 'Unspected Error.Retry this action.');
      }
   }

   async getAllRecipe(req: GetAllRecipeRequest): Promise<GetAllRecipeResponse | Message> {
      try {
         const res = await this.getAllUC.execute(req);
         return res;
      } catch (e) {
         if (e instanceof GetAllRecipeError) return new Message('error', e.message);
         return new Message('error', 'Unspected Error.Retry this action.');
      }
   }
   async getRecipeNutritionnalValue(req: GetRecipeNutritionnalValueRequest): Promise<GetRecipeNutritionnalValueResponse | Message> {
      try {
         const res = await this.getNutritionnalValueUC.execute(req);
         return res;
      } catch (e) {
         if (e instanceof GetRecipeNutritionnalValueError) return new Message('error', e.message);
         return new Message('error', 'Unspected Error.Retry this action.');
      }
   }
}
