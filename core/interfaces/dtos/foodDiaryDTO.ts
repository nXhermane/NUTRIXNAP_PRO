export default interface FoodDiaryDTO {
    patient_unique_id: string;
    foodIds: { id: number; origin: string }[];
    foodQuantities: {
        value?: number;
        unity?: string;
        litteralQuantity?: string;
    }[];
    date: string;
    meals: string;
    mealsType: string;
    observations: string;
    images: string[];
    createdAt?: string;
    updatedAt?: string;
}
