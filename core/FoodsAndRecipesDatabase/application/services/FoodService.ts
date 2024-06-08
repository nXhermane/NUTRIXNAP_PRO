import { IFoodService } from './interfaces/FoodService';
import {
   GetFoodByIdRequest,
   GetFoodByIdResponse,
   GetAllFoodRequest,
   GetFoodByFoodGroupRequest,
   GetFoodByFoodGroupResponse,
   SearchFoodResponse,
   SearchFoodRequest,
   GetAllFoodResponse,
   GetFoodByIdError,
   GetAllFoodError,
   GetFoodByFoodGroupError,
   SearchFoodError,
} from './../useCases';
import { Message, UseCase } from '@shared';

export class FoodService implements IFoodService {
   constructor(
      private getFoodByIdUC: UseCase<GetFoodByIdRequest, GetFoodByIdResponse>,
      private getAllFoodUC: UseCase<GetAllFoodRequest, GetAllFoodResponse>,
      private getFoodByGroupUC: UseCase<GetFoodByFoodGroupRequest, GetFoodByFoodGroupResponse>,
      private searchFoodUC: UseCase<SearchFoodRequest, SearchFoodResponse>,
   ) {}

   async getFoodById(req: GetFoodByIdRequest): Promise<GetFoodByIdResponse | Message> {
      try {
         const res = await this.getFoodByIdUC.execute(req);
         return res;
      } catch (e: any) {
         if (e instanceof GetFoodByIdError) return new Message('error', e.message);
         return new Message('error', 'Unspected Error.Retry this action.');
      }
   }
   async getAllFood(req: GetAllFoodRequest): Promise<GetAllFoodResponse | Message> {
      try {
         const res = await this.getAllFoodUC.execute(req);
         return res;
      } catch (e: any) {
         if (e instanceof GetAllFoodError) return new Message('error', e.message);
         return new Message('error', 'Unspected Error.Retry this action.');
      }
   }
   async getFoodByGroupId(req: GetFoodByFoodGroupRequest): Promise<GetFoodByFoodGroupResponse | Message> {
      try {
         const res = await this.getFoodByGroupUC.execute(req);
         return res;
      } catch (e: any) {
         if (e instanceof GetFoodByFoodGroupError) return new Message('error', e.message);
         return new Message('error', 'Unspected Error.Retry this action.');
      }
   }
   async search(req: SearchFoodRequest): Promise<SearchFoodResponse | Message> {
      try {
         const res = await this.searchFoodUC.execute(req);
         return res;
      } catch (e) {
         if (e instanceof SearchFoodError) return new Message('error', e.message);
         return new Message('error', 'Unspected Error.Retry this action.');
      }
   }
}
