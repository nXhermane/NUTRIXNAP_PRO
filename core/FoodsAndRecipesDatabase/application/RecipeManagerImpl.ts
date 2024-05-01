import { IRecipeManager } from "./interfaces/RecipeManager";
import {
    CreateRecipeDto,
    RecipeRepository,
    RecipeResponseDto,
    RecipePersistenceDto
} from "./../infrastructure";
import { AggregateID, Paginated, Mapper } from "@shared";
import {
    Recipe,
    RecipeFactrory,
    INutritionCalculatorService,
    INutrient as NutrientDto
} from "./../domain";

export class RecipeManager implements IRecipeManager {
    constructor(
        private repo: RecipeRepository,
        private factory: RecipeFactrory,
        private mapper: Mapper<Recipe, RecipePersistenceDto, RecipeResponseDto>,
        private nutritionCalculator: INutritionCalculatorService
    ) {}

    async createRecipe(createRecipeDto: CreateRecipeDto): Promise<AggregateID> {
        const { typeId, categoryId, ...otherProps } = createRecipeDto;
        const type = await this.repo.getRecipeType(typeId);
        const category = await this.repo.getRecipeCategory(categoryId);
        const recipe = await this.factory({ ...otherProps, type, category });
        this.repo.save(recipe);
        return recipe.id;
    }
    deleteRecipe(recipeId: AggregateID): void {
        this.repo.delete(recipeId);
    }
    async getRecipeById(recipeId: AggregateID): Promise<RecipeResponseDto> {
        const recipe = await this.repo.getRecipeById(recipeId);
        return this.mapper.toResponse(recipe);
    }
    async getAllRecipe(paginated?: Paginated): Promise<RecipeResponseDto[]> {
        const recipes = await this.repo.getAllRecipe({
            page: paginated?.page || 0,
            pageSize: paginated?.pageSize || 100
        });
        return recipes.map((recipe: Recipe) => this.mapper.toResponse(recipe));
    }
    async getRecipeNutritionalValue(
        recipeId: AggregateID
    ): Promise<NutrientDto[]> {
        const recipe = await this.repo.getRecipeById(recipeId);
        return await this.nutritionCalculator.calculateRecipeNutritionalValue(
            recipe
        );
    }
}
