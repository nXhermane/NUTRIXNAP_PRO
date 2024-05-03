import { GetFoodByFoodGroupRequest } from "./GetFoodByFoodGroupRequest";
import { GetFoodByFoodGroupResponse } from "./GetFoodByFoodGroupResponse";
import { GetFoodByFoodGroupError } from "./GetFoodByFoodGroupError";
import { UseCase, Mapper } from "@shared";
import {
    FoodRepository,
    FoodRepositoryError,
    FoodRepositoryNotFoundException
} from "./../../../../infrastructure";
import { Food } from "./../../../../domain";
import { FoodDto } from "./../sharedType";
import { FoodPersistenceType } from "./../../../../infrastructure/repositories/types";

export class GetFoodByFoodGroupUseCase
    implements UseCase<GetFoodByFoodGroupRequest, GetFoodByFoodGroupResponse>
{
    constructor(
        private repo: FoodRepository,
        private mapper: Mapper<Food, FoodPersistenceType, FoodDto>
    ) {}

    async execute(
        request: GetFoodByFoodGroupRequest
    ): Promise<GetFoodByFoodGroupResponse> {
        try {
            const foods = await this.repo.getFoodByFoodGroupId(
                request.foodGroupId,
                request?.paginated
            );
            return foods.map((food: Food) => this.mapper.toResponse(food));
        } catch (e) {
            if (e instanceof FoodRepositoryNotFoundException) {
                return [] as GetFoodByFoodGroupResponse;
            } else if (e instanceof FoodRepositoryError) {
                throw new GetFoodByFoodGroupError(e.message, e, e.metadata);
            } else {
                throw new GetFoodByFoodGroupError(
                    `Unexpected error: ${e?.constructor.name}`,
                    e as Error,
                    request
                );
            }
        }
    }
}
