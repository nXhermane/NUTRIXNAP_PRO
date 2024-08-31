import { UseCase, Mapper, Result, left, right, AppError } from "./../../../../../shared";
import { GetAllFoodRequest } from "./GetAllFoodRequest";
import { GetAllFoodResponse } from "./GetAllFoodResponse";
import { GetAllFoodErrors } from "./GetAllFoodErrors";
import { FoodRepository, FoodRepositoryError, FoodRepositoryNotFoundException } from "./../../../../infrastructure";
import { Food } from "./../../../../domain";
import { FoodDto } from "./../sharedType";
import { FoodPersistenceType } from "./../../../../infrastructure/repositories/types";

export class GetAllFoodUseCase implements UseCase<GetAllFoodRequest, GetAllFoodResponse> {
   constructor(
      private repo: FoodRepository,
      private mapper: Mapper<Food, FoodPersistenceType, FoodDto>,
   ) {}

   async execute(request: GetAllFoodRequest = {}): Promise<GetAllFoodResponse> {
      try {
         const foods = await this.repo.getAllFood(request?.foodOrigin, request?.paginated);
         return right(Result.ok<FoodDto[]>(foods.map((food: Food) => this.mapper.toResponse(food))));
      } catch (e) {
         if (e instanceof FoodRepositoryNotFoundException) {
            return right(Result.ok<FoodDto[]>([]));
         } else if (e instanceof FoodRepositoryError) {
            return left(new GetAllFoodErrors.FoodRepositoryError(e.toJSON()));
         } else {
            return left(new AppError.UnexpectedError(e));
         }
      }
   }
}
