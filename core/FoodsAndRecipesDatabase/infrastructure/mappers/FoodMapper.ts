import { Mapper, BaseEntityProps } from "@shared";
import { Food, FoodGroup, Nutrient, INutrient, Quantity } from "./../../domain";

import {
    FoodPersistenceType,
    FoodResponseType,
    NutrientPersistenceType,
    FoodGroup as FoodGroupType,
    NutrientPersistenceArray
} from "./../repositories/types";
export class FoodMapper
    implements Mapper<Food, FoodPersistenceType, FoodResponseType>
{
    toPersistence(entity: Food): FoodPersistenceType {
        return this.toResponse(entity) as FoodPersistenceType;
    }
    toDomain(record: FoodPersistenceType): Food {
        try {
            const foodGroup = new FoodGroup({
                id: record.groupId,
                props: {
                    foodGroupCode: record.groupCode,
                    foodGroupName: record.groupName,
                    foodGroupNameF: record.groupNameF
                }
            });
            const nutrientsData =
                record.nutrients === null
                    ? []
                    : (JSON.parse(
                          "[" + record.nutrients + "]"
                      ) as NutrientPersistenceArray[]);
            const foodNutrients = nutrientsData.map(
                (nutrient: NutrientPersistenceArray) => {
                    return new Nutrient({
                        id: nutrient[1],
                        props: {
                            nutrientCode: nutrient[5],
                            nutrientINFOODSTagName: nutrient[6],
                            nutrientValue: nutrient[0],
                            nutrientName: nutrient[3],
                            nutrientUnit: nutrient[7],
                            nutrientDecimals: nutrient[8],
                            originalValue: nutrient[2],
                            nutrientNameTranslate: {
                                inFrench: nutrient[4]
                            }
                        }
                    });
                }
            );

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
        } catch (e) {
            console.log(record);
            console.log(
                `Error lors du mappage de food avec ${this.toDomain.name} ${e}`
            );
        }
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
