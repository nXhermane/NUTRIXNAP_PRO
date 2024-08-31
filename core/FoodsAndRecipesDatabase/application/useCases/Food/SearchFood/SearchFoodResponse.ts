import { AppError, Result, Either } from "@shared";
import { FoodDto } from "./../sharedType";
export type SearchFoodResponse = Either<AppError.UnexpectedError, Result<FoodDto[]>>;
