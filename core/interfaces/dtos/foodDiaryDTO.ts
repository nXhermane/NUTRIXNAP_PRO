import { FoodId, FoodQuantity } from '@/core/interfaces';

export default interface FoodDiaryDTO {
   id?: number;
   patient_unique_id: string;
   foodIds: FoodId[];
   foodQuantities: FoodQuantity;
   date: string;
   meals: string;
   mealsType: string;
   observations: string;
   images: string[];
   createdAt?: string;
   updatedAt?: string;
}
