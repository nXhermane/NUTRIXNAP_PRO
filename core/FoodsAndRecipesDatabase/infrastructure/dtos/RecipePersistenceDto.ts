export interface RecipePersistenceDto {
    recipeId: string;
    name: string;
    nameF: string;
    category: number;
    type: number;
    ingredients: string;
    preparationMethod: string;
    cookingTime: number;
    quantity: string;
    description: string;
    author?: string;
}
