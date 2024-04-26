import { FoodRepository } from "./interfaces/FoodRepository";
import { Food } from "./../../domain";
import { AggregateID, Result, Mapper } from "@shared";
import { Knex } from "knex";

import {
    FoodName,
    FoodGroup,
    NutrientAmount,
    NutrientName,
    NutrientPersistenceType,
    FoodInfo,
    FoodResponseType,
    FoodPersistenceType
} from "./types";
export class FoodRepositoryImplDb implements FoodRepository {
    private nutrientTableName: string = "nutrient_name";
    private nutrientAmountTable: string = "nutrient_amounts";
    private foodNameTable: string = "food_names";
    private foodGroupTable: string = "food_groups";
    constructor(
        private knex: Knex,
        private mapper: Mapper<Food, FoodPersistenceType, FoodResponseType>
    ) {}

    /**
     *
     *
     *
     *
     * */

    async getFoodById(foodId: AggregateID): Promise<Food> {
        const food = await this.knex<FoodName & FoodGroup>(this.foodNameTable)
            .select(this.foodNameTable + ".*", this.foodGroupTable + ".*")
            .leftJoin(
                this.foodGroupTable,
                this.foodNameTable + ".foodGroupId",
                this.foodGroupTable + ".groupId"
            )
            .where({ foodId })
            .first();
        const foodInfoResult = await this.getFoodInfo(food.foodId);
        if (foodInfoResult.isFailure)
            throw new Error(String(foodInfoResult.err));

        return this.mapper.toDomain({
            foodCode: food.foodCode,
            foodName: food.foodName,
            foodNameF: food.foodNameF,
            foodId: food.foodId,
            foodSource: food.foodSource,
            foodOrigin: food.foodOrigin,
            scientificName: food.scientificName,
            foodGroup: {
                groupId: food.groupId,
                groupCode: food.groupCode,
                groupName: food.groupName,
                groupNameF: food.groupNameF
            },
            foodNutrients: foodInfoResult.val
        });
    }

    /**
     *
     *
     *
     *
     * */

    async getFoodByFoodGroupId(
        foodGroupId: string,
        pagginated?: {
            page: number;
            pageSize: number;
        }
    ): Promise<FoodResponseType[]> {
        const query = this.knex<FoodName & FoodGroup>(this.foodNameTable)
            .select(this.foodNameTable + ".*", this.foodGroupTable + ".*")
            .leftJoin(
                this.foodGroupTable,
                this.foodNameTable + ".foodGroupId",
                this.foodGroupTable + ".groupId"
            )
            .where("foodGroupId", foodGroupId);
        if (pagginated)
            query.limit(pagginated.pageSize).offset(pagginated.page);

        const foodRaws = await query;

        return this.getFoodsData(foodRaws);
    }

    /**
     *
     *
     *
     *
     * */

    async getAllFood(
        pagginated?: {
            page: number;
            pageSize: number;
        },
        foodOrigin?: string
    ): Promise<FoodResponseType[]> {
        const query = this.knex<FoodName & FoodGroup>(this.foodNameTable)
            .select(this.foodNameTable + ".*", this.foodGroupTable + ".*")
            .leftJoin(
                this.foodGroupTable,
                this.foodNameTable + ".foodGroupId",
                this.foodGroupTable + ".groupId"
            );

        if (foodOrigin) query.where("foodOrigin", foodOrigin);
        if (pagginated)
            query.limit(pagginated.pageSize).offset(pagginated.page);
        const foodRaws: (FoodName & FoodGroup)[] = await query;

        return this.getFoodsData(foodRaws);
    }
    /**
     *
     *
     *
     *
     * */
    async getAllFoodId(foodOrigin?: string): Promise<AggregateID[]> {
        let query = this.knex<FoodName>(this.foodNameTable).select("foodId");
        if (foodOrigin) query = query.where("foodOrigin", foodOrigin);
        const foodIds = await query;
        return foodIds.map(({ foodId }: { foodId: number }) => foodId);
    }

    /**
     *
     *
     *
     *
     * */

    private async getFoodInfo(
        foodId: number
    ): Promise<Result<NutrientPersistenceType[]>> {
        try {
            const nutrient = await this.knex<NutrientPersistenceType>(
                this.nutrientAmountTable
            )
                .select(
                    this.nutrientAmountTable + ".originalValue",
                    this.nutrientAmountTable + ".nutrientValue",
                    this.nutrientAmountTable + ".nutrientId",
                    this.nutrientTableName + ".nutrientName",
                    this.nutrientTableName + ".nutrientNameF",
                    this.nutrientTableName + ".nutrientCode",
                    this.nutrientTableName + ".nutrientUnit",
                    this.nutrientTableName + ".tagname",
                    this.nutrientTableName + ".nutrientDecimal"
                )
                .leftJoin(
                    this.nutrientTableName,
                    this.nutrientAmountTable + ".nutrientId",
                    this.nutrientTableName + ".nutrientNameId"
                )
                .where({ foodId: foodId });
            return Result.ok<NutrientPersistenceType[]>(nutrient);
        } catch (e: any) {
            return Result.fail<NutrientPersistenceType[]>(
                `Error to get food ${foodId} info ${e}`
            );
        }
    }

    /**
     *
     *
     *
     *
     * */

    private async getFoodsData(
        foodRaws: (FoodName & FoodGroup)[]
    ): Promise<FoodResponseType[]> {
        const foods: FoodResponseType[] = [];
        for (const foodRaw of foodRaws) {
            const foodInfoResult = await this.getFoodInfo(foodRaw.foodId);
            if (foodInfoResult.isFailure)
                throw new Error(String(foodInfoResult.err));
            foods.push({
                foodCode: foodRaw.foodCode,
                foodName: foodRaw.foodName,
                foodNameF: foodRaw.foodNameF,
                foodId: foodRaw.foodId,
                foodSource: foodRaw.foodSource,
                foodOrigin: foodRaw.foodOrigin,
                scientificName: foodRaw.scientificName,
                foodGroup: {
                    groupId: foodRaw.groupId,
                    groupCode: foodRaw.groupCode,
                    groupName: foodRaw.groupName,
                    groupNameF: foodRaw.groupNameF
                },
                foodNutrients: foodInfoResult.val
            });
        }
        return foods;
    }
}
