import { CreateNutritionistProps } from "./../../../domain";
export type SignUpRequest = {
   data: CreateNutritionistProps & { password: string };
};
