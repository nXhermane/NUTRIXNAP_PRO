import { SQLiteDatabase } from "expo-sqlite/next";
import { Knex } from "knex";

export default interface IDatabase {
   db: SQLiteDatabase | null;
   knex: Knex | null;
}
