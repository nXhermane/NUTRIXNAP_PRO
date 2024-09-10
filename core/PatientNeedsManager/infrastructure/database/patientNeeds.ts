import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const nutritionRules = sqliteTable("nutrition_rules", {
  id: text("id").primaryKey(),
  name: text("name", { length: 255 }),
  nameF: text("nameF", { length: 255 }),
  code: text("code", { length: 100 }).notNull().unique(),
  formula: text("formula").notNull(),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});
