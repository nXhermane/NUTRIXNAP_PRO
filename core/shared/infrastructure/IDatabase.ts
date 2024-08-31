import { SQLiteDatabase } from "expo-sqlite";
import { Knex } from "knex";

export interface IDatabase {
   db: SQLiteDatabase | null;
   knex: Knex | null;
}
