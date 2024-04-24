import { Mapper, BaseEntityProps } from "@shared";
import { Food, FoodGroup, Nutrient, INutrient, Quantity } from "./../../domain";

import {
    FoodPersistenceType,
    FoodResponseType,
    NutrientResponseType,
    FoodGroupType
} from "./../repositories/types";

type FoodNutrientResponseType = Omit<NutrientResponseType, 'nutrientNameTranslate'>;

export class FoodMapper
    implements Mapper<Food, FoodPersistenceType, FoodResponseType>
{
    toPersistence(entity: Food): FoodPersistenceType {
        return this.toResponse(entity) as FoodPersistenceType;
    }

    toDomain(record: FoodPersistenceType): Food {
        const isFoodGroup = (group: any): group is FoodGroupType => {
            return (
                typeof group.groupId === 'number' &&
                typeof group.groupCode === 'string' &&
                typeof group.groupName === 'string' &&
                typeof group.groupNameF === 'string'
            );
        };

        const isNutrient = (nutrient: any): nutrient is INutrient => {
            return (
                typeof nutrient.id === 'number' &&
                typeof nutrient.nutrientCode === 'string' &&
                typeof nutrient.tagname === 'string' &&
                typeof nutrient.nutrientValue === 'number' &&
                typeof nutrient.nutrientName === 'string' &&
                typeof nutrient.nutrientUnit === 'string' &&
                typeof nutrient.nutrientDecimals === 'number' &&
                typeof nutrient.originalValue === 'number' &&
                typeof nutrient.nutrientNameTranslate === 'object' &&
                typeof nutrient.nutrientNameTranslate.inFrench === 'string'
            );
        };

        const foodGroup = isFoodGroup(record.foodGroup)
            ? new FoodGroup({
                id: record.foodGroup.groupId,
                props: {
                    foodGroupCode: record.foodGroup.groupCode,
                    foodGroupName: record.foodGroup.groupName,
                    foodGroupNameF: record.foodGroup.groupNameF
                }
            })
            : new FoodGroup({
                id: record.foodGroup as number,
                props: {
                    foodGroupCode: '',
                    foodGroupName: '',
                    foodGroupNameF: ''
                }
            });

        const foodNutrients = (record.foodNutrients || []).map((nutrient: any) => {
            if (!isNutrient(nutrient)) {
                return null;
            }

            return new Nutrient({
                id: nutrient.nutrientNameId,
                props: {
                    nutrientCode: nutrient.nutrientCode,
                    nutrientINFOODSTagName: nutrient.tagname,
                    nutrientValue: nutrient.nutrientValue,
                    nutrientName: nutrient.nutrientName,
                    nutrientUnit: nutrient.nutrientUnit,
                    nutrientDecimals: nutrient.nutrientDecimals,
                    originalValue: nutrient.originalValue,
                    nutrientNameTranslate: {
                        inFrench: nutrient.nutrientNameTranslate.inFrench
                    }
                }
            });
        }).filter(nutrient => nutrient !== null);

        const foodQuantity = new Quantity({ value: 100, unit: "g" });

        const foodProps = {
            foodName: record.foodName,
            foodCode: record.foodCode,
            foodSource: record.foodSource || '',
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

        const nutrients = entity.foodNutrients.map(nutrient => {
            const {
                id,
                nutrientCode,
                nutrientINFOODSTagName,
                nutrientValue,
                nutrientName,
                nutrientUnit,
                nutrientDecimals,
                originalValue,
                nutrientNameTranslate
            } = nutrient;

            return {
                nutrientNameId: id as number,
                nutrientName,
                nutrientNameF: nutrientNameTranslate.inFrench,
                nutrientCode,
                nutrientUnit,
                tagname: nutrientINFOODSTagName,
                nutrientDecimal: String(nutrientDecimals),
                nutrientValue
            };
        });

        const food: FoodResponseType = {
            foodId: entity.id as number,
            foodName: entity.foodName,
            foodNameF: entity.foodNameF,
            foodCode: entity.foodCode,
            foodOrigin: entity.foodOrigin,
            foodGroup,
            foodSource: entity.foodSource,
            foodNutrients: nutrients as NutrientResponseType[]
        };

        return food;
    }
}
