import { FoodDiaryEntity, FoodDiaryDTO, UpdateFoodDiaryDto } from "@/core/interfaces";

export interface FoodDiaryService {
  createFoodDiary(foodDiary: FoodDiaryDTO): Promise<FoodDiaryDTO>;
  getFoodDiaryById(id: number): Promise<FoodDiaryDTO | null>;
  getFoodDiariesByPatientUniqueId(unique_id: string): Promise<FoodDiaryDTO[]>;
  updateFoodDiary(id: number, foodDiary: UpdateFoodDiaryDto): Promise<FoodDiaryDTO>;
  deleteFoodDiary(id: number): Promise<void>;
}

export class FoodDiaryServiceImpl implements FoodDiaryService {
  async createFoodDiary(foodDiary: FoodDiaryDTO): Promise<FoodDiaryDTO> {
    // implementation here
  }

  async getFoodDiaryById(id: number): Promise<FoodDiaryDTO | null> {
    // implementation here
  }

  async getFoodDiariesByPatientUniqueId(unique_id: string): Promise<FoodDiaryDTO[]> {
    // implementation here
  }

  async updateFoodDiary(id: number, foodDiary: UpdateFoodDiaryDto): Promise<FoodDiaryDTO> {
    // implementation here
  }

  async deleteFoodDiary(id: number): Promise<void> {
    // implementation here
  }
}
