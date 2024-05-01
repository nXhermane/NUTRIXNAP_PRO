import {
    IFoodManager,
    FoodManager,
    RecipeManager,
    IRecipeManager
} from "./application";
import {
    Food,
    Recipe,
    RecipeFactrory,
    NutritionCalculatorService
} from "./domain";
import {
    FoodMapper,
    db as FoodDb,
    FoodPersistenceType,
    FoodResponseType,
    FoodRepositoryImplDb,
    RecipeRepositoryImplDb,
    RecipeMapper,
    RecipePersistenceDto,
    RecipeResponseDto
} from "./infrastructure";
import { SearchEngine } from "@shared";
export interface IFoodAndRecipe {
    food: IFoodManager;
    recipe: IRecipeManager;
}
export class FoodAndRecipe {
    private static instance: IFoodAndRecipe | null = null;

    static async getInstance(): Promise<IFoodAndRecipe> {
        if (this.instance === null) {
            const db = await FoodDb;
            const knexDb = db.knex;
            const foodMapper = new FoodMapper<
                Food,
                FoodPersistenceType,
                FoodResponseType
            >();
            const recipeMapper = new RecipeMapper<
                Recipe,
                RecipePersistenceDto,
                RecipeResponseDto
            >();
            const foodRepo = new FoodRepositoryImplDb(knexDb, foodMapper);
            const recipeRepo = new RecipeRepositoryImplDb(knexDb, recipeMapper);

            const searchEngine = new SearchEngine<FoodResponseType>([], {
                keys: "foodName"
            });
            const recipeFactory = new RecipeFactrory(foodRepo);
            const nutritionCalculator = new NutritionCalculatorService(
                foodRepo
            );

            this.instance = {
                food: new FoodManager(foodRepo, foodMapper, searchEngine),
                recipe: new RecipeManager(
                    recipeRepo,
                    recipeFactory,
                    recipeMapper,
                    nutritionCalculator
                )
            };
        }
        return this.instance;
    }
}
