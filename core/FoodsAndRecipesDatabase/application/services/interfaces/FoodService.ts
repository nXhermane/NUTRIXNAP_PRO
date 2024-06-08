import {
   GetFoodByIdRequest,
   GetFoodByIdResponse,
   GetAllFoodRequest,
   GetAllFoodResponse,
   GetFoodByFoodGroupRequest,
   GetFoodByFoodGroupResponse,
   SearchFoodResponse,
   SearchFoodRequest,
} from './../../useCases';
import { Message } from '@shared';

export interface IFoodService {
   getFoodById(req: GetFoodByIdRequest): Promise<GetFoodByIdResponse | Message>;
   getAllFood(req: GetAllFoodRequest): Promise<GetAllFoodResponse | Message>;
   getFoodByGroupId(req: GetFoodByFoodGroupRequest): Promise<GetFoodByFoodGroupResponse | Message>;
   search(req: SearchFoodRequest): Promise<SearchFoodResponse | Message>;
}
