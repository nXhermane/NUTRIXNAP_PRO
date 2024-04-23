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
    nutrientTagName: string;
    nutrientValue: string;
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

export interface NutrientResponseType
    extends Omit<
        NutrientAmount & NutrientName,
        "nutrientValue" | "foodId" | "nutrientTagName"
    > {
    nutrientValue: number;
    originalValue: string;
}

export interface FoodInfo {
    foodGroup: FoodGroup;
    foodNutrients: NutrientResponseType[];
}

export interface FoodPersistenceType
    extends Omit<FoodName, "foodGroupId">,
        FoodInfo {}

export interface FoodResponseType extends FoodPersistenceType {}
