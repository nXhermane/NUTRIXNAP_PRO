import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { openDatabaseAsync, SQLiteDatabase } from "expo-sqlite";
import ExpoSQLiteDialect from "@expo/knex-expo-sqlite-dialect";
import { Knex, knex } from "knex";
import { IDatabase } from "@shared";

export default class Database implements IDatabase {
   public db: SQLiteDatabase | null = null;
   public knex: Knex | null = null;
   private static instance: Database;
   private constructor() {}
   private async downloadDb(): Promise<void> {
      if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite")).exists) {
         await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "SQLite");
      }
      await FileSystem.downloadAsync(
         Asset.fromModule(require("./../../../databaseFiles/standard_recommendation.sqlite")).uri,
         FileSystem.documentDirectory + "SQLite/standard_recommendation.sqlite",
      );
   }
   private async init(): Promise<void> {
      await this.downloadDb();
      if (!this.db) {
         this.db = await openDatabaseAsync("standard_recommendation.sqlite");
      } else this.db = Database.instance.db;
      if (!this.knex)
         this.knex = knex({
            client: ExpoSQLiteDialect,
            connection: {
               filename: "standard_recommendation.sqlite",
            },
            useNullAsDefault: true,
         });
      else this.knex = Database.instance.knex;
   }
   public static async getInstance(): Promise<IDatabase> {
      if (!Database.instance) {
         Database.instance = new Database();
         await Database.instance.init();
      }
      return Database.instance;
   }
}
export const db: Promise<IDatabase> = Database.getInstance();
