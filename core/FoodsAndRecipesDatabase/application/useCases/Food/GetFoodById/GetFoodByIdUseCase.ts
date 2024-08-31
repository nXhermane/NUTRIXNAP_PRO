import { GetFoodByIdErrors } from "./GetFoodByIdErrors";
import { GetFoodByIdResponse } from "./GetFoodByIdResponse";
import { GetFoodByIdRequest } from "./GetFoodByIdRequest";
import { UseCase, Mapper, Result, AppError, left, right } from "./../../../../../shared";
import { FoodRepository, FoodRepositoryError, FoodRepositoryNotFoundException } from "./../../../../infrastructure";
import { Food } from "./../../../../domain";
import { FoodDto } from "./../sharedType";
import { FoodPersistenceType } from "./../../../../infrastructure/repositories/types";

export class GetFoodByIdUseCase implements UseCase<GetFoodByIdRequest, GetFoodByIdResponse> {
   constructor(
      private repo: FoodRepository,
      private mapper: Mapper<Food, FoodPersistenceType, FoodDto>,
   ) {}

   async execute(request: GetFoodByIdRequest): Promise<GetFoodByIdResponse> {
      try {
         const food = await this.repo.getFoodById(request.foodId);
         return right(Result.ok<FoodDto>(this.mapper.toResponse(food)));
      } catch (e) {
         if (e instanceof FoodRepositoryNotFoundException) {
            return left(new GetFoodByIdErrors.FoodNotFoundError(e.toJSON()));
         } else {
            return left(new AppError.UnexpectedError(e));
         }
      }
   }
}
