import { NutrientDto, QuantityDto } from "./../sharedType";
export type FoodDto = {
    foodId: number;
    foodCode: string;
    foodName: string;
    foodNameF: string;
  //  scientificName?: string;
    foodSource: string;
    foodOrigin: string;
    groupId: number;
    groupCode: string;
    groupName: string;
    groupNameF: string;
    nutrients: NutrientDto[];
    quantity: QuantityDto;
};
