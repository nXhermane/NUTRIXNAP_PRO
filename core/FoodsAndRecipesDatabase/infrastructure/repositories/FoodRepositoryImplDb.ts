import { FoodRepository } from "./interfaces/FoodRepository";
import { Food } from "./../../domain";
import { AggregateID, Result, Mapper, Paginated } from "@shared";
import { Knex } from "knex";
import { SQLiteDatabase } from "expo-sqlite/next";
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
        const food = await this._getAllFoodInfoQuery()
            .where("fn.foodId", foodId)
            .first();
        return this.mapper.toDomain(food);
    }

    /**
     *
     *
     *
     *
     * */

    async getFoodByFoodGroupId(
        foodGroupId: string,
        paginated?: Paginated
    ): Promise<Food[]> {
        const query = this._getAllFoodInfoQuery().where(
            "fg.groupId",
            foodGroupId
        );
        if (paginated) query.limit(paginated.pageSize).offset(paginated.page);
        const foodRaws = await query;
        return foodRaws.map((food: FoodPersistenceType) =>
            this.mapper.toDomain(food)
        );
    }

    /**
     *
     *
     *
     *
     * */

    async getAllFood(
        foodOrigin?: string,
        paginated: Paginated = {
            page: 0,
            pageSize: 100
        }
    ): Promise<Food[]> {
        try {
            const results = await this.getAllFoodData(foodOrigin, paginated);
            return results.map((food: FoodPersistenceType) =>
                this.mapper.toDomain(food)
            );
        } catch (e) {
            console.log(
                `Une Erreur s'est produite lors de la récuperation des aliment: ${e} class ${this.constructor.name}`
            );
            return [];
        }
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

    async getAllFoodData(
        foodOrigin?: string,
        paginated: Paginated = {
            page: 0,
            pageSize: 100
        }
    ): Promise<FoodPersistenceType[]> {
        const query = this._getAllFoodInfoQuery()
            .limit(paginated?.pageSize || 100)
            .offset(paginated?.page || 0);
        if (foodOrigin && foodOrigin != undefined && foodOrigin != null)
            query.where("fn.foodOrigin", foodOrigin);
        return await query;
    }
    /**
     *
     *
     *
     *
     * */

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
