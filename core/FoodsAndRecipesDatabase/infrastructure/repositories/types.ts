import { RecipePersistenceDto } from './../dtos/RecipePersistenceDto';
export interface FoodName {
   foodId: number;
   foodCode: string;
   foodGroupId: number;
   foodName: string;
   foodNameF: string;
   scientificName?: string;
   foodSource: string;
   foodOrigin: string;
}

export interface FoodGroup {
   groupId: number;
   groupCode: string;
   groupName: string;
   groupNameF: string;
}

export interface NutrientAmount {
   foodId: number | string;
   nutrientId: number;
   nutrientValue: number;
   originalValue: string;
}

export interface NutrientName {
   nutrientNameId: number;
   nutrientName: string;
   nutrientNameF: string;
   nutrientCode: string;
   nutrientUnit: string;
   nutrientSymbol?: string;
   tagname: string;
   nutrientDecimal: string;
}

export interface RecipePersistenceType extends RecipePersistenceDto {
   categoryId: number;
   categoryName: string;
   categoryNameF: string;
   typeId: number;
   typeName: string;
   typeNameF: string;
}

export interface FoodPersistenceType extends Omit<FoodName, 'foodGroupId'>, FoodGroup {
   nutrients: string;
}
export type NutrientPersistenceArray = [
   nutrientValue: number,
   nutrientId: number,
   originalValue: string,
   nutrientName: string,
   nutrientNameF: string,
   nutrientCode: string,
   tagname: string,
   nutrientUnit: string,
   nutrientDecimal: number,
];
