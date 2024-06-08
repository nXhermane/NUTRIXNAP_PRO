import { FoodDiaryEntity, FoodDiaryDTO } from '@/core/interfaces';

export type CreateFoodDiaryType = Omit<FoodDiaryEntity, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateFoodDiaryType = { id: number } & Partial<Omit<FoodDiaryEntity, 'id' | 'patient_unique_id' | 'createdAt' | 'updatedAt'>>;

export type UpdateFoodDiaryDto = { id: number } & Partial<Omit<FoodDiaryDTO, 'id' | 'patient_unique_id' | 'createdAt' | 'updatedAt'>>;

export type FoodId = { id: number; origin: string };
export type FoodQuantity = Map<
   number,
   {
      value?: number;
      unity?: string;
      litteralQuantity?: string;
   }
>;
