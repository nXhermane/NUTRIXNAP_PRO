import { FoodDiaryEntity } from "@/core/interfaces";

export type CreateFoodDiaryType = Omit<
    FoodDiaryEntity,
    "id" | "createdAt" | "updatedAt"
>;
export type UpdateFoodDiaryType = { id: number } & Partial<
    Omit<
        FoodDiaryEntity,
        "id" | "patient_unique_id" | "createdAt" | "updatedAt"
    >
>;
