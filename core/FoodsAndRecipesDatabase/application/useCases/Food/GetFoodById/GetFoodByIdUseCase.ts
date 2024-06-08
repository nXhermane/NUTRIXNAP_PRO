import { GetFoodByIdError } from './GetFoodByIdError';
import { GetFoodByIdResponse } from './GetFoodByIdResponse';
import { GetFoodByIdRequest } from './GetFoodByIdRequest';
import { UseCase, Mapper } from '@shared';
import { FoodRepository, FoodRepositoryError, FoodRepositoryNotFoundException } from './../../../../infrastructure';
import { Food } from './../../../../domain';
import { FoodDto } from './../sharedType';
import { FoodPersistenceType } from './../../../../infrastructure/repositories/types';

export class GetFoodByIdUseCase implements UseCase<GetFoodByIdRequest, GetFoodByIdResponse> {
   constructor(
      private repo: FoodRepository,
      private mapper: Mapper<Food, FoodPersistenceType, FoodDto>,
   ) {}

   async execute(request: GetFoodByIdRequest): Promise<GetFoodByIdResponse> {
      try {
         const food = await this.repo.getFoodById(request.foodId);
         return this.mapper.toResponse(food) as GetFoodByIdResponse;
      } catch (e) {
         if (e instanceof FoodRepositoryNotFoundException || e instanceof FoodRepositoryError) {
            throw new GetFoodByIdError(e.message, e, e.metadata);
         } else {
            throw new GetFoodByIdError(`Unexpected error: ${e?.constructor.name}`, e as Error, request);
         }
      }
   }
}
