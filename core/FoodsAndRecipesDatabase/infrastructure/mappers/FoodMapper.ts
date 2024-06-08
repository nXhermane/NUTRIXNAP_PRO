import { Mapper, BaseEntityProps } from '@shared';
import { Food, FoodGroup, Nutrient, INutrient, Quantity } from './../../domain';
import { FoodDto, NutrientDto, QuantityDto } from './../../application';
import { FoodPersistenceType, FoodGroup as FoodGroupType, NutrientPersistenceArray } from './../repositories/types';
export class FoodMapper implements Mapper<Food, FoodPersistenceType, FoodDto> {
   toPersistence(entity: Food): FoodPersistenceType {
      return {} as FoodPersistenceType;
   }
   toDomain(record: FoodPersistenceType): Food {
      const foodGroup = new FoodGroup({
         id: record.groupId,
         props: {
            foodGroupCode: record.groupCode,
            foodGroupName: record.groupName,
            foodGroupNameF: record.groupNameF,
         },
      });
      const nutrientsData = record.nutrients === null ? [] : (JSON.parse('[' + record.nutrients + ']') as NutrientPersistenceArray[]);
      const foodNutrients = nutrientsData.map((nutrient: NutrientPersistenceArray) => {
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
                  inFrench: nutrient[4],
               },
            },
         });
      });

      const foodQuantity = new Quantity({ value: 100, unit: 'g' });
      const foodProps = {
         foodName: record.foodName,
         foodCode: record.foodCode,
         foodSource: record.foodSource ? record.foodSource : '',
         foodOrigin: record.foodOrigin,
         foodNameTranslate: {
            inFrench: record.foodNameF,
         },
         foodNutrients,
         foodQuantity,
         foodGroup,
      };

      return new Food({
         id: record.foodId,
         props: foodProps,
      });
   }
   toResponse(entity: Food): FoodDto {
      const nutrients: NutrientDto[] = entity.foodNutrients.map((nutrient: BaseEntityProps & INutrient) => {
         return {
            nutrientId: nutrient.id as number,
            nutrientName: nutrient.nutrientName,
            nutrientNameF: nutrient?.nutrientNameTranslate?.inFrench || '',
            nutrientCode: nutrient.nutrientCode,
            nutrientUnit: nutrient.nutrientUnit,
            tagname: nutrient.nutrientINFOODSTagName,
            nutrientDecimal: String(nutrient.nutrientDecimals),
            nutrientValue: nutrient.nutrientValue,
            originalValue: nutrient?.originalValue || String(nutrient.nutrientValue),
         };
      });
      const food: FoodDto = {
         foodId: entity.id as number,
         foodName: entity.foodName,
         foodNameF: entity.foodNameF,
         foodCode: entity.foodCode,
         foodOrigin: entity.foodOrigin,
         foodSource: entity.foodSource,
         groupId: entity.foodGroup.id as number,
         groupCode: entity.foodGroup.foodGroupCode,
         groupName: entity.foodGroup.foodGroupName,
         groupNameF: entity.foodGroup.foodGroupNameF,
         nutrients: nutrients,
         // scientificName: entity.scientificName,
         quantity: { unit: 'g', value: 100 },
      };
      return food;
   }
}
