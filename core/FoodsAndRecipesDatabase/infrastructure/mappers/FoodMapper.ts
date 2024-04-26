import { Mapper, BaseEntityProps } from "@shared";
import { Food, FoodGroup, Nutrient, INutrient, Quantity } from "./../../domain";

import {
    FoodPersistenceType,
    FoodResponseType,
    NutrientPersistenceType,
    FoodGroup as FoodGroupType
} from "./../repositories/types";
export class FoodMapper
    implements Mapper<Food, FoodPersistenceType, FoodResponseType>
{
    toPersistence(entity: Food): FoodPersistenceType {
        return this.toResponse(entity) as FoodPersistenceType;
    }
    toDomain(record: FoodPersistenceType): Food {
        const foodGroup = new FoodGroup({
            id: record.foodGroup.groupId,
            props: {
                foodGroupCode: record.foodGroup.groupCode,
                foodGroupName: record.foodGroup.groupName,
                foodGroupNameF: record.foodGroup.groupNameF
            }
        });

        const foodNutrients = record.foodNutrients.map((nutrient: any) => {
            return new Nutrient({
                id: nutrient.nutrientId,
                props: {
                    nutrientCode: nutrient.nutrientCode,
                    nutrientINFOODSTagName: nutrient.tagname,
                    nutrientValue: nutrient.nutrientValue,
                    nutrientName: nutrient.nutrientName,
                    nutrientUnit: nutrient.nutrientUnit,
                    nutrientDecimals: nutrient.nutrientDecimal,
                    originalValue: nutrient.originalValue,
                    nutrientNameTranslate: {
                        inFrench: nutrient.nutrientNameF
                    }
                }
            });
        });

        const foodQuantity = new Quantity({ value: 100, unit: "g" });
        const foodProps = {
            foodName: record.foodName,
            foodCode: record.foodCode,
            foodSource: record.foodSource ? record.foodSource : "",
            foodOrigin: record.foodOrigin,
            foodNameTranslate: {
                inFrench: record.foodNameF
            },
            foodNutrients,
            foodQuantity,
            foodGroup
        };

        return new Food({
            id: record.foodId,
            props: foodProps
        });
    }
    toResponse(entity: Food): FoodResponseType {
        const foodGroup: FoodGroupType = {
            groupId: entity.foodGroup.id as number,
            groupCode: entity.foodGroup.foodGroupCode,
            groupName: entity.foodGroup.foodGroupName,
            groupNameF: entity.foodGroup.foodGroupNameF
        };
        const nutrients: NutrientPersistenceType[] = entity.foodNutrients.map(
            (nutrient: BaseEntityProps & INutrient) => {
                return {
                    nutrientId: nutrient.id as number,
                    nutrientName: nutrient.nutrientName,
                    nutrientNameF:
                        nutrient?.nutrientNameTranslate?.inFrench || "",
                    nutrientCode: nutrient.nutrientCode,
                    nutrientUnit: nutrient.nutrientUnit,
                    tagname: nutrient.nutrientINFOODSTagName,
                    nutrientDecimal: String(nutrient.nutrientDecimals),
                    nutrientValue: nutrient.nutrientValue,
                    originalValue:
                        nutrient?.originalValue ||
                        String(nutrient.nutrientValue)
                };
            }
        );
        const food: FoodResponseType = {
            foodId: entity.id as number,
            foodName: entity.foodName,
            foodNameF: entity.foodNameF,
            foodCode: entity.foodCode,
            foodOrigin: entity.foodOrigin,
            foodGroup: foodGroup,
            foodSource: entity.foodSource,
            foodNutrients: nutrients
        };
        return food;
    }
}
