import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { openDatabaseAsync, SQLiteDatabase } from "expo-sqlite/next";
import ExpoSQLiteDialect from "@expo/knex-expo-sqlite-dialect";
import { Knex as KnexType, knex as Knex } from "knex";
export interface IDatabase {
    db: SQLiteDatabase | null;
    knex: KnexType | null;
}

export default class Database implements IDatabase {
    public db: SQLiteDatabase | null;
    public knex: KnexType | null;
    private static instance: Database;
    private constructor() {
        this.db = null;
        this.knex = null;
    }
    private async downloadDb(): Promise<void> {
        if (
            !(
                await FileSystem.getInfoAsync(
                    FileSystem.documentDirectory + "db"
                )
            ).exists
        ) {
            await FileSystem.makeDirectoryAsync(
                FileSystem.documentDirectory + "db"
            );
        }
        await FileSystem.downloadAsync(
            Asset.fromModule(require("./../../assets/db/nutrition.sqlite")).uri,
            FileSystem.documentDirectory + "db/nutrixnap.sqlite"
        );
    }
    private async init(): Promise<void> {
        await this.downloadDb();
        if (!this.db) {
            this.db = await openDatabaseAsync("nutrixnap.sqlite");
        }
        if (!this.knex)
            this.knex = Knex({
                client: ExpoSQLiteDialect,
                connection: {
                    filename: "nutrixnap.sqlite"
                },
                useNullAsDefault: true
            });
    }
    public static async getInstance(): Promise<IDatabase> {
        if (!Database.instance) {
            Database.instance = new Database();
            await Database.instance.init();
        }
        return Database.instance;
    }
}
