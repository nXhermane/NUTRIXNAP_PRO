import {
    IFoodService,
    FoodService,
    RecipeService,
    IRecipeService,
    GetAllFoodUseCase,
    GetFoodByFoodGroupUseCase,
    GetFoodByIdUseCase,
    SearchFoodUseCase,
    CreateRecipeUseCase,
    DeleteRecipeUseCase,
    GetAllRecipeUseCase,
    GetRecipeByIdUseCase,
    GetRecipeNutritionnalValueUseCase,
    FoodDto
} from "./application";
import { RecipeFactrory, NutritionCalculatorService } from "./domain";
import {
    FoodMapper,
    db as FoodDb,
    FoodRepositoryImplDb,
    RecipeRepositoryImplDb,
    RecipeMapper
} from "./infrastructure";
import { SearchEngine } from "@shared";
import { Knex } from "knex";
export interface IFoodAndRecipe {
    food: IFoodService;
    recipe: IRecipeService;
}
export class FoodAndRecipe {
    private static instance: IFoodAndRecipe | null = null;

    static async getInstance(): Promise<IFoodAndRecipe> {
        if (this.instance === null) {
            const db = await FoodDb;
            const knexDb = db.knex;
            const foodMapper = new FoodMapper();
            const recipeMapper = new RecipeMapper();
            const foodRepo = new FoodRepositoryImplDb(
                knexDb as Knex,
                foodMapper
            );
            const recipeRepo = new RecipeRepositoryImplDb(
                knexDb as Knex,
                recipeMapper
            );

            const searchEngine = new SearchEngine<FoodDto>([], {
                keys: "foodName"
            });

            const recipeFactory = new RecipeFactrory(foodRepo);
            const getFoodByIdUC = new GetFoodByIdUseCase(foodRepo, foodMapper);
            const getAllFoodUC = new GetAllFoodUseCase(foodRepo, foodMapper);
            const getFoodByGroupUC = new GetFoodByFoodGroupUseCase(
                foodRepo,
                foodMapper
            );
            const searchFoodUC = new SearchFoodUseCase(
                foodRepo,
                foodMapper,
                searchEngine
            );

            const foodService = new FoodService(
                getFoodByIdUC,
                getAllFoodUC,
                getFoodByGroupUC,
                searchFoodUC
            );

            const nutritionCalculator = new NutritionCalculatorService(
                foodRepo
            );

            const createRecipeUC = new CreateRecipeUseCase(
                recipeRepo,
                recipeFactory
            );
            const deleteRecipeUC = new DeleteRecipeUseCase(recipeRepo);
            const getRecipeByIdUC = new GetRecipeByIdUseCase(
                recipeRepo,
                recipeMapper
            );

            const getAllRecipeUC = new GetAllRecipeUseCase(
                recipeRepo,
                recipeMapper
            );

            const getRecipeNutritionnalValueUC =
                new GetRecipeNutritionnalValueUseCase(
                    recipeRepo,
                    nutritionCalculator
                );

            const recipeService = new RecipeService(
                createRecipeUC,
                deleteRecipeUC,
                getRecipeByIdUC,
                getAllRecipeUC,
                getRecipeNutritionnalValueUC
            );
            this.instance = {
                food: foodService,
                recipe: recipeService
            };
        }
        return this.instance;
    }
}
