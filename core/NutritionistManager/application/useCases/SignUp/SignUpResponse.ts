import { AggregateID, Result, AppError, Either } from "@shared";
import { SignUpErrors } from "./SignUpErrors";
export type SignUpResponse = Either<
   AppError.UnexpectedError | SignUpErrors.EmailAlreadyExist | SignUpErrors.NutritionistRepoError | SignUpErrors.NutritionistFactoryError,
   Result<void>
>;
