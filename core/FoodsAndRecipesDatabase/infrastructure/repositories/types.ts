import { RecipePersistenceDto } from "./../dtos/RecipePersistenceDto";
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

export interface FoodInfo {
    foodGroup: FoodGroup;
    foodNutrients: NutrientPersistenceType[];
}
export interface NutrientPersistenceType
    extends Omit<NutrientName & NutrientAmount, "nutrientNameId" | "foodId"> {}
export interface FoodPersistenceType
    extends Omit<FoodName, "foodGroupId">,
        FoodInfo {}

export interface FoodResponseType extends FoodPersistenceType {}
export interface RecipePersistenceType
    extends RecipePersistenceDto{
    categoryId: number;
    categoryName: string;
    categoryNameF: string;
    typeId: number;
    typeName: string;
    typeNameF: string;
}
