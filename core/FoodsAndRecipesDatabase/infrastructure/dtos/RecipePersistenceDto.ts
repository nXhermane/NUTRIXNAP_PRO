export interface RecipePersistenceDto {
    recipeId: string;
    name: string;
    nameF: string;
    categoryId: number;
    typeId: number;
    ingredients: string;
    preparationMethod: string;
    cookingTime: number;
    quantity: string;
    description: string;
    author: string;
    createdAt: string;
    updatedAt: string;
}
