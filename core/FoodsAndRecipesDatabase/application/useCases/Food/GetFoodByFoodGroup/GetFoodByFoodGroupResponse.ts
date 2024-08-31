import { Either, AppError, Result } from "./../../../../../shared";
import { GetFoodByFoodGroupErrors } from "./GetFoodByFoodGroupErrors";
import { FoodDto } from "./../sharedType";
export type GetFoodByFoodGroupResponse = Either<AppError.UnexpectedError | GetFoodByFoodGroupErrors.FoodRepositoryError, Result<FoodDto[]>>;
