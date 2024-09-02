
import { sql } from "drizzle-orm";
import { sqliteTable, integer, text, primaryKey, unique, index, foreignKey } from "drizzle-orm/sqlite-core";
// Définition des tables

// Table food_groups
export const foodGroups = sqliteTable("food_groups", {
   groupId: text("groupId").primaryKey(),
   groupCode: text("groupCode", { length: 15 }),
   groupName: text("groupName", { length: 255 }),
   groupNameF: text("groupNameF", { length: 255 }),
   createdAt: text("createdAt")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
   updatedAt: text("updatedAt")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

// Table food_names
export const foodNames = sqliteTable(
   "food_names",
   {
      foodId: text("foodId").primaryKey(),
      foodCode: text("foodCode", { length: 10 }),
      groupId: text("groupId")
         .notNull()
         .references(() => foodGroups.groupId),
      foodName: text("foodName", { length: 255 }),
      foodNameF: text("foodNameF", { length: 255 }),
      scientificName: text("scientificName", { length: 155 }),
      foodSource: text("foodSource", { length: 255 }),
      foodOrigin: text("foodOrigin", { length: 100 }),
      createdAt: text("createdAt")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
   updatedAt: text("updatedAt")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
   },
   (table) => ({
      foodCodeIndex: index("foodCodeIndex").on(table.foodCode),
      groupIdIndex: index("groupIdIndex").on(table.groupId),
      foodNameIndex: index("foodNameIndex").on(table.foodName),
      foodNameFIndex: index("foodNameFIndex").on(table.foodNameF),
      foodIdIndex: index("foodIdIndex").on(table.foodId),
   }),
);

// Table nutrient_names
export const nutrientNames = sqliteTable(
   "nutrient_names",
   {
      nutrientId: text("nutrientId").primaryKey(),
      nutrientCode: text("nutrientCode", { length: 10 }),
      nutrientName: text("nutrientName", { length: 255 }),
      nutrientNameF: text("nutrientNameF", { length: 255 }),
      nutrientUnit: text("nutrientUnit", { length: 5 }),
      nutrientSymbol: text("nutrientSymbol", { length: 10 }),
      tagname: text("tagname", { length: 20 }),
      nutrientDecimal: text("nutrientDecimal", { length: 15 }),
      createdAt: text("createdAt")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
   updatedAt: text("updatedAt")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
   },
   (table) => ({
      nutrientIdIndex: index("nutrientIdIndex").on(table.nutrientId),
      tagnameIndex: index("tagnameIndex").on(table.tagname),
   }),
);

// Table nutrient_amounts
export const nutrientAmounts = sqliteTable(
   "nutrient_amounts",
   {
      foodId: text("foodId")
         .notNull()
         .references(() => foodNames.foodId),
      nutrientId: text("nutrientId")
         .notNull()
         .references(() => nutrientNames.nutrientId),
      nutrientValue: integer("nutrientValue").notNull().default(0),
      originalValue: text("originalValue", { length: 15 }),
   },
   (table) => ({
      foodIdIndexNut: index("foodIdIndexNut").on(table.foodId),
      nutrientIdIndexNut: index("nutrientIdIndexNut").on(table.nutrientId),
   }),
);

// Table meals_types
export const mealsTypes = sqliteTable("meals_types", {
   typeId: text("typeId").primaryKey(),
   name: text("name"),
   nameF: text("nameF"),
   createdAt: text("createdAt")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
   updatedAt: text("updatedAt")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

// Table meals_categories
export const mealsCategories = sqliteTable("meals_categories", {
   categoryId: text("categoryId").primaryKey(),
   name: text("name", { length: 200 }),
   nameF: text("nameF", { length: 200 }),
   createdAt: text("createdAt")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
   updatedAt: text("updatedAt")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

// Table recipes
export const recipes = sqliteTable("recipes", {
   recipeId: text("recipeId").primaryKey(), // Utilisation de UUID en tant que texte
   name: text("name", { length: 255 }),
   nameF: text("nameF", { length: 255 }),
   categoryId: integer("categoryId")
      .notNull()
      .references(() => mealsCategories.categoryId),
   typeId: integer("typeId")
      .notNull()
      .references(() => mealsTypes.typeId),
   ingredients: text("ingredients"), // Stockage des JSON sous forme de texte
   preparationMethod: text("preparationMethod"), // Stockage des JSON sous forme de texte
   cookingTime: integer("cookingTime"),
   quantity: text("quantity"), // Stockage des JSON sous forme de texte
   description: text("description"),
   createdAt: text("createdAt")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
   updatedAt: text("updatedAt")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});
