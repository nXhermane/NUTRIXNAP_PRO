import { INutritionCalculatorService } from "./interfaces/INutritionCalculatorService";
import { Recipe } from "./../aggregates/Recipe";
import { FoodRepository } from "./../../infrastructure";
import { IIngredient } from "./../value-objects/Ingredient";
import { IQuantity } from "./../value-objects/Quantity";
import { INutrient } from "./../entities/Nutrient";
import { BaseEntityProps } from "@shared";
export class NutritionCalculatorService implements INutritionCalculatorService {
    constructor(private foodRepo: FoodRepository) {}
    async calculateRecipeNutritionalValue(
        recipe: Recipe
    ): Promise<(INutrient & BaseEntityProps)[]> {
        const nutritionalValue: { [key: string]: INutrient & BaseEntityProps } =
            {};
        const ingredients = recipe.ingredients;

        // Récupération asynchrone des données des aliments
        const ingredientWithNutrientValue = await Promise.all(
            ingredients.map(async (ingredient: IIngredient) => {
                const food = await this.foodRepo.getFoodById(ingredient.foodId);
                const nutrientValues =
                    this.convertNutrientQuantityToNewQuantity(
                        food.foodNutrients,
                        food.foodQuantity,
                        ingredient.quantity.unpack()
                    );
                return { ingredient, nutrientValues };
            })
        );

        // Agrégation des valeurs nutritionnelles par nutriment
        ingredientWithNutrientValue.forEach(
            ({ ingredient, nutrientValues }) => {
                nutrientValues.forEach(
                    (nutrient: INutrient & BaseEntityProps) => {
                        const existingNutrient =
                            nutritionalValue[nutrient.nutrientINFOODSTagName];
                        if (existingNutrient) {
                            existingNutrient.nutrientValue +=
                                nutrient.nutrientValue;
                        } else {
                            nutritionalValue[nutrient.nutrientINFOODSTagName] =
                                {
                                    ...nutrient
                                };
                        }
                    }
                );
            }
        );

        // Conversion de l'objet en tableau et retour
        return Object.values(nutritionalValue);
    }
    /**
     * Convert NutrientValue
     * ||prevNutrientValue--->prevQuantity
     * ||newNutrientValue---->newQuantity
     * ||newNutrientValue=prevValue*newQuantity/prevQuantity
     * */

    convertNutrientQuantityToNewQuantity(
        nutrients: (INutrient & BaseEntityProps)[],
        prevQuantity: IQuantity,
        newQuantity: IQuantity
    ): (INutrient & BaseEntityProps)[] {
        const prevValue =
            prevQuantity.unit === newQuantity.unit ? prevQuantity.value : 0;
        const newValue =
            prevQuantity.unit === newQuantity.unit ? newQuantity.value : 0;
        return nutrients.map((nutrient: INutrient & BaseEntityProps) => {
            nutrient.nutrientValue =
                (nutrient.nutrientValue * newValue) / prevValue;
            return nutrient;
        });
    }
}
