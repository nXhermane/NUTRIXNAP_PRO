import { Quantity, IQuantity } from "./../value-objects/Quantity";
import { MealsType, IMealsType } from "./../value-objects/MealsType";
import {
    MealsCategory,
    IMealsCategory
} from "./../value-objects/MealsCategory";
import { Ingredient, IIngredient } from "./../value-objects/Ingredient";
import {
    PreparationStep,
    IPreparationStep
} from "./../value-objects/PreparationStep";
import { Recipe, IRecipe } from "./../aggregates/Recipe";
import { Result } from "@shared";

export type CreateRecipeProps = {
    quantity: IQuantity;
    type: IMealsType;
    category: IMealsCategory;
    ingredients: IIngredient[];
    preparationMethod: IPreparationStep[];
} & Omit<
    IRecipe,
    "type" | "category" | "ingredients" | "preparationMethod" | "quantity"
>;

export class RecipeFactrory {
    static create(recipeProps: CreateRecipeProps): Result<Recipe> {
        const {
            quantity,
            type,
            category,
            ingredients,
            preparationMethod,
            nameTranslate,
            author,
            ...otherRecipeProps
        } = recipeProps;
        try {
            const newQuantity = new Quantity(quantity);
            const newType = new MealsType(type);
            const newCategory = new MealsCategory(category);
            const newIngredients: Ingredient[] = ingredients.map(
                (ingProps: IIngredient) => new Ingredient(ingProps)
            );
            const newPreparationMethod = preparationMethod.map(
                (step: IPreparationStep) => {
                    return new PreparationStep(step);
                }
            );
            const newRecipe = new Recipe({
                props: {
                    name: otherRecipeProps.name,
                    type: newType,
                    category: newCategory,
                    quantity: newQuantity,
                    ingredients: newIngredients,
                    preparationMethod: newPreparationMethod,
                    cookingTime: otherRecipeProps.cookingTime,
                    description: otherRecipeProps.description,
                    author,
                    nameTranslate
                }
            });
            return Result.ok<Recipe>(newRecipe);
        } catch (e) {
            return Result.fail<Recipe>(String(e));
        }
    }
}
