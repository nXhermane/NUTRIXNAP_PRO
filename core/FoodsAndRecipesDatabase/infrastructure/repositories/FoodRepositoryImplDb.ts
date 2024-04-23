import { FoodRepository } from "./interfaces/FoodRepository";
import { Food } from "./../../domain";
import { AggregateID, Result } from "@shared";
import { db } from "./../database/db.config";
import IDatabase from "./../database/IDatabase";
import { Knex } from "knex";
import { Mapper } from "@shared";
import {
    FoodName,
    FoodGroup,
    NutrientAmount,
    NutrientName,
    NutrientResponseType,
    FoodInfo,
    FoodResponseType,
    FoodPersistenceType
} from "./types";
export class FoodRepositoryImplDb implements FoodRepository {
    private nutrientTableName: string = "nutrient_name";
    private nutrientAmountTable: string = "nutrient_amount";
    private foodNameTable: string = "food_names";
    private foodGroupTable: string = "food_groups";
    constructor(
        private knex: Knex,
        private mapper: Mapper<Food, FoodPersistenceType, FoodResponseType>
    ) {}
    async getFoodById(foodId: AggregateID): Promise<Food> {
        const foodName = await this.knex<FoodName>(this.foodNameTable)
            .select()
            .where("foodId", foodId as number)
            .first();
        if (!foodName)
            throw new Error("Food with id " + foodId + " doesn't exists");
        const foodInfoResult: Result<FoodInfo> =
            await this.getFoodInfo(foodName);
        if (foodInfoResult.isFailure)
            throw new Error(String(foodInfoResult.err));
        const { foodGroupId, ...otherFoodProps } = foodName;
        return this.mapper.toDomain({
            ...otherFoodProps,
            ...foodInfoResult.val
        });
    }
    async getFoodByFoodGroupId(
        foodGroupId: string
    ): Promise<FoodResponseType[]> {
        const foodNames: FoodName[] = await this.knex<FoodName>(
            this.foodNameTable
        )
            .select()
            .where("foodGroupId", foodGroupId);
        const foods: FoodResponseType[] = await Promise.all(
            foodNames.map(async (foodName: FoodName) => {
                const foodInfoResult = await this.getFoodInfo(foodName);
                if (foodInfoResult.isFailure)
                    throw new Error(String(foodInfoResult.err));
                const { foodGroupId, ...otherFoodProps } = foodName;
                return {
                    ...otherFoodProps,
                    ...foodInfoResult.val
                };
            })
        );
        return foods;
    }
    async searchFoodByFoodNameOrCode(
        searchParam: {
            value: string;
            foodOrigin?: string;
        },
        pagginated?: {
            page: number;
            pageSize: number;
        }
    ): Promise<FoodResponseType[]> {
        const searchValue = "%" + searchParam.value + "%";
        let query = this.knex(this.foodNameTable)
            .select()
            .whereLike("foodName", searchValue)
            .orWhereLike("foodNameF", searchValue)
            .orWhereLike("foodCode", searchValue);
        if (searchParam.foodOrigin)
            query = query.andWhere("foodOrigin", searchParam.foodOrigin);
        if (pagginated)
            query = query.limit(pagginated.pageSize).offset(pagginated.page);
        
        const foodNames = await query;
        const foods: FoodResponseType[] = await Promise.all(
            foodNames.map(async (foodName: FoodName) => {
                const foodInfoResult = await this.getFoodInfo(foodName);
                if (foodInfoResult.isFailure)
                    throw new Error(String(foodInfoResult.err));

                const { foodGroupId, ...otherFoodProps } = foodName;
                return {
                    ...otherFoodProps,
                    ...foodInfoResult.val
                };
            })
        );
        return foods;
    }
    async getAllFood(
        foodOrigin?: string,
        pagginated = {
            page: 0,
            pageSize: 10
        }
    ): Promise<FoodResponseType[]> {
        let query = this.knex<FoodName>(this.foodNameTable).select();
        if (foodOrigin) query = query.where("foodOrigin", foodOrigin);
        query = query.limit(pagginated.pageSize).offset(pagginated.page);
        const foodNames: FoodName[] = await query;
        const foods: FoodResponseType[] = await Promise.all(
            foodNames.map(async (foodName: FoodName) => {
                const foodInfoResult = await this.getFoodInfo(foodName);
                if (foodInfoResult.isFailure)
                    throw new Error(String(foodInfoResult.err));
                const { foodGroupId, ...otherFoodProps } = foodName;
                return {
                    ...otherFoodProps,
                    ...foodInfoResult.val
                };
            })
        );
        return foods;
    }
    async getAllFoodId(foodOrigin?: string): Promise<AggregateID[]> {
        let query = this.knex<FoodName>(this.foodNameTable).select("foodId");
        if (foodOrigin) query = query.where("foodOrigin", foodOrigin);
        const foodIds = await query;

        return foodIds.map(({ foodId }: { foodId: number }) => foodId);
    }
    private async getFoodInfo(foodName: FoodName): Promise<Result<FoodInfo>> {
        try {
            const foodGroup = await this.knex<FoodGroup>(this.foodGroupTable)
                .select()
                .where("groupId", foodName.foodGroupId)
                .first();

            const foodNutrientRows:NutrientAmount[] = await this.knex<NutrientAmount>(
                this.nutrientAmountTable
            )
                .select()
                .where("foodId", foodName.foodId);

            const foodNutrients = await Promise.all<NutrientResponseType>(
                foodNutrientRows.map(async (foodNutrient: NutrientAmount) => {
                    const foodNutrientName = await this.knex<NutrientName>(
                        this.nutrientTableName
                    )
                        .select()
                        .where("tagname", foodNutrient.nutrientTagName)
                        .first();
                    const nutrientValue = this.convertNutrientValueToNumber(
                        foodNutrient.nutrientValue
                    );
                    return {
                        ...foodNutrientName,
                        nutrientValue,
                        originalValue: foodNutrient.nutrientValue
                    };
                })
            );

            return Result.ok<FoodInfo>({
                foodGroup,
                foodNutrients
            });
        } catch (e: any) {
            return Result.fail<FoodInfo>(
                `Error to get food ${foodName.foodId} info ${e}`
            );
        }
    }

    private convertNutrientValueToNumber(value: string): number {
        if (value === null || value === undefined) return 0;
        let val: number = Number(value);
        if (value.includes("<")) {
            val = Number(value.replace("<", ""));
        }
        if (isNaN(val)) val = 0;
        return val;
    }
}
