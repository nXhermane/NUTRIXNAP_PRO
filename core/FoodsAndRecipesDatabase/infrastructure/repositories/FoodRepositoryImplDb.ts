import { FoodRepository } from "./interfaces/FoodRepository";
import { Food } from "./../../domain";
import { AggregateID, Result, Mapper, Paginated } from "@shared";
import { Knex } from "knex";
import { SQLiteDatabase } from "expo-sqlite/next";
import { FoodName, FoodPersistenceType } from "./types";
import {
    FoodRepositoryError,
    FoodRepositoryNotFoundException
} from "./errors/FoodRepositoryError";
import { FoodDto } from "./../../application";
export class FoodRepositoryImplDb implements FoodRepository {
    private nutrientTableName: string = "nutrient_name";
    private nutrientAmountTable: string = "nutrient_amounts";
    private foodNameTable: string = "food_names";
    private foodGroupTable: string = "food_groups";
    constructor(
        private knex: Knex,
        private mapper: Mapper<Food, FoodPersistenceType, FoodDto>
    ) {}

    async getFoodById(foodId: AggregateID): Promise<Food> {
        try {
            const food = await this._getAllFoodInfoQuery()
                .where("fn.foodId", foodId)
                .first();
            if (!food) {
                throw new FoodRepositoryNotFoundException(
                    "Food not found",
                    new Error("Food Not Exist"),
                    {
                        foodId
                    }
                );
            }
            return this.mapper.toDomain(food);
        } catch (error) {
            throw new FoodRepositoryError(
                "Failed to retrieve food by ID",
                error as Error,
                { foodId }
            );
        }
    }

    async getFoodByFoodGroupId(
        foodGroupId: string,
        paginated?: Paginated
    ): Promise<Food[]> {
        try {
            const query = this._getAllFoodInfoQuery().where(
                "fg.groupId",
                foodGroupId
            );
            if (paginated)
                query.limit(paginated.pageSize).offset(paginated.page);
            const foodRaws = await query;
            if (!foodRaws || foodRaws.length === 0) {
                throw new FoodRepositoryNotFoundException(
                    "No food found for the given group ID",
                    new Error("Food of Specify foodGrpup doesn't exist"),
                    { foodGroupId, paginated }
                );
            }
            return foodRaws.map((food: FoodPersistenceType) =>
                this.mapper.toDomain(food)
            );
        } catch (error) {
            throw new FoodRepositoryError(
                "Failed to retrieve food by food group ID",
                error as Error,
                { foodGroupId, paginated }
            );
        }
    }

    async getAllFood(
        foodOrigin?: string,
        paginated: Paginated = {
            page: 0,
            pageSize: 100
        }
    ): Promise<Food[]> {
        try {
            const results = await this.getAllFoodData(foodOrigin, paginated);
            if (!results || results.length === 0) {
                throw new FoodRepositoryNotFoundException(
                    "No food found",
                    new Error(""),
                    {
                        foodOrigin,
                        paginated
                    }
                );
            }
            return results.map((food: FoodPersistenceType) =>
                this.mapper.toDomain(food)
            );
        } catch (error) {
            throw new FoodRepositoryError(
                "Failed to retrieve all food",
                error as Error,
                {
                    foodOrigin,
                    paginated
                }
            );
        }
    }

    async getAllFoodId(foodOrigin?: string): Promise<AggregateID[]> {
        try {
            let query = this.knex<FoodName>(this.foodNameTable).select(
                "foodId"
            );
            if (foodOrigin) query = query.where("foodOrigin", foodOrigin);
            const foodIds = await query;
            if (!foodIds || foodIds.length === 0) {
                throw new FoodRepositoryNotFoundException(
                    "No food ID found",
                    new Error(""),
                    {
                        foodOrigin
                    }
                );
            }
            return foodIds.map(({ foodId }: { foodId: number }) => foodId);
        } catch (error) {
            throw new FoodRepositoryError(
                "Failed to retrieve all food IDs",
                error as Error,
                {
                    foodOrigin
                }
            );
        }
    }

    async getAllFoodData(
        foodOrigin?: string,
        paginated: Paginated = {
            page: 0,
            pageSize: 100
        }
    ): Promise<FoodPersistenceType[]> {
        try {
            const query = this._getAllFoodInfoQuery()
                .limit(paginated?.pageSize || 100)
                .offset(paginated?.page || 0);
            if (foodOrigin && foodOrigin != undefined && foodOrigin != null)
                query.where("fn.foodOrigin", foodOrigin);
            const results = await query;
            if (!results || results.length === 0) {
                throw new FoodRepositoryNotFoundException(
                    "No food data found",
                    new Error(""),
                    {
                        foodOrigin,
                        paginated
                    }
                );
            }
            return results;
        } catch (error) {
            throw new FoodRepositoryError(
                "Failed to retrieve all food data",
                error as Error,
                {
                    foodOrigin,
                    paginated
                }
            );
        }
    }

    private _getAllFoodInfoQuery(): Knex.QueryBuilder {
        const { knex } = this;
        const query = knex
            .select(
                {
                    foodName: "fn.foodName",
                    foodNameF: "fn.foodNameF",
                    foodCode: "fn.foodCode",
                    foodOrigin: "fn.foodOrigin",
                    foodSource: "fn.foodSource",
                    scientificName: "fn.scientificName",
                    foodId: "fn.foodId",
                    groupId: "fg.groupId",
                    groupCode: "fg.groupCode",
                    groupName: "fg.groupName",
                    groupNameF: "fg.groupNameF"
                },
                knex.raw(
                    `GROUP_CONCAT('['||na.nutrientValue||','||na.nutrientId||',\"'||na.originalValue||'\",\"'||nn.nutrientName||'\",\"'||nn.nutrientNameF||'\",\"'||nn.nutrientCode||'\",\"'||nn.tagname||'\",\"'||nn.nutrientUnit||'\",'||nn.nutrientDecimal||']') as nutrients`
                )
            )
            .from("food_names as fn")
            .leftJoin("nutrient_amounts as na", "fn.foodId", "na.foodId")
            .leftJoin("nutrient_names as nn", "nn.nutrientId", "na.nutrientId")
            .leftJoin("food_groups as fg", "fn.groupId", "fg.groupId")
            .groupBy("fn.foodId");
        return query;
    }
}
