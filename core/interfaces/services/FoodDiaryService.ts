import {
    FoodDiaryEntity,
    FoodDiaryDTO,
    UpdateFoodDiaryDto
} from "@/core/interfaces";

export default interface FoodDiaryService {
    createFoodDiary(foodDiary: FoodDiaryDTO): Promise<FoodDiaryDTO>;
    getFoodDiaryById(id: number): Promise<FoodDiaryDTO | null>;
    getFoodDiaryByPatientUniqueId(unique_id: string): Promise<FoodDiaryDTO[]>;
    updateFoodDiary(foodDiary: UpdateFoodDiaryDto): Promise<FoodDiaryDTO>;
    deleteFoodDiary(id: number): Promise<void>;
}
