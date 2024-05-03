import { UseCase, Mapper } from "@shared";
import { GetAllFoodRequest } from "./GetAllFoodRequest";
import { GetAllFoodResponse } from "./GetAllFoodResponse";
import { GetAllFoodError } from "./GetAllFoodError";
import {
    FoodRepository,
    FoodRepositoryError,
    FoodRepositoryNotFoundException
} from "./../../../../infrastructure";
import { Food } from "./../../../../domain";
import { FoodDto } from "./../sharedType";
import { FoodPersistenceType } from "./../../../../infrastructure/repositories/types";

export class GetAllFoodUseCase
    implements UseCase<GetAllFoodRequest, GetAllFoodResponse>
{
    constructor(
        private repo: FoodRepository,
        private mapper: Mapper<Food, FoodPersistenceType, FoodDto>
    ) {}

    async execute(
        request: GetAllFoodRequest = {}
    ): Promise<GetAllFoodResponse> {
        try {
            const foods = await this.repo.getAllFood(
                request?.foodOrigin,
                request?.paginated
            );
            return foods.map((food: Food) => this.mapper.toResponse(food));
        } catch (e) {
            if (e instanceof FoodRepositoryNotFoundException) {
                return [] as GetAllFoodResponse;
            } else if (e instanceof FoodRepositoryError) {
                throw new GetAllFoodError(e.message, e, e.metadata);
            } else {
                throw new GetAllFoodError(
                    `Unexpected error: ${e?.constructor.name}`,
                    e as Error,
                    request
                );
            }
        }
    }
}
