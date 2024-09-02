import { FoodGroup, IFoodGroup } from "../../domain";
import { INutrientAmount } from "../../domain/value-objects/NutrientAmount";
import { RecipePersistenceDto } from "./../dtos/RecipePersistenceDto";
export interface Timestamp {
   createdAt: string;
   updatedAt: string;
}
export interface FoodNamePersistenceType extends Timestamp {
   foodId: string;
   foodCode: string;
   groupId: string;
   foodName: string;
   foodNameF: string;
   scientificName?: string;
   foodSource: string;
   foodOrigin: string;
}

export interface FoodGroupPersistenceType extends Timestamp {
   groupId: string;
   groupCode: string;
   groupName: string;
   groupNameF: string;
}

export interface NutrientAmountPersitenceType {
   nutrientId: string;
   nutrientValue: number;
   originalValue: string;
}

export interface NutrientName {
   nutrientNameId: string;
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

export interface FoodPersistenceType extends Omit<FoodNamePersistenceType, "foodGroupId"> {
   foodGroup: FoodGroup;
   foodNutrients: INutrientAmount[];
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
export interface NutrientPersistenceType extends Timestamp {
   nutrientId: string;
   nutrientCode: string;
   nutrientDecimal: string;
   nutrientName: string;
   nutrientNameF: string;
   nutrientUnit: string;
   tagname: string;
   nutrientSymbol: string;
}
