import { FoodDiaryEntity, UpdateFoodDiaryType, CreateFoodDiaryType } from "@/core/interfaces";

export default interface FoodDiaryRepository {
   findById(id: number): Promise<FoodDiaryEntity | null>;
   findByPatientUniqueId(patient_unique_id: string): Promise<FoodDiaryEntity[]>;
   create(foodDiary: CreateFoodDiaryType): Promise<number | null>;
   findAll(): Promise<FoodDiaryEntity[]>;
   update(foodDiary: UpdateFoodDiaryType): Promise<FoodDiaryEntity>;
   delete(id: number): Promise<void>;
}
