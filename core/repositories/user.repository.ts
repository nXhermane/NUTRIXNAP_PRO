import { IUserRepository, UserEntity, IDatabase } from "@/core/interfaces";
import Database, { db } from "@/core/db/db.config";
import { Knex } from "knex";

export default class UserRepository implements IUserRepository {
    private db: IDatabase | null;
    private knex: Knex | null;
    private tableName: string = "users";

    constructor() {
        this.knex = null;
        this.db = null;
        db.then((db: IDatabase) => {
            this.db = db;
            this.knex = db.knex;
            this.init();
        });
    }

    private async init(): Promise<void> {
        try {
            const hasUsersTable = await this.knex?.schema.hasTable(
                this.tableName
            );
            if (!hasUsersTable) {
                await this.createUsersTable();
                console.log(`Table "${this.tableName}" created successfully.`);
            } else {
                console.log(`Table "${this.tableName}" already exists.`);
            }
        } catch (error) {
            console.error(
                `Error initializing "${this.tableName}" table:`,
                error
            );
        }
    }

    private async createUsersTable(): Promise<void> {
        await this.knex?.schema.createTable(this.tableName, table => {
            table.increments("id").primary();
            table.string("name", 200);
            table.string("lastname", 100);
            table.string("firstname", 100);
            table.enu("gender", ["M", "F", "O"]);
            table.string("country", 100);
            table.string("email", 200).unique();
            table.string("tel", 100);
            table.date("birthday");
            table.string("profession", 200);
            table.string("profil_img", 300);
            table.string("password", 255);
        });
    }

    async findById(id: number): Promise<UserEntity | null> {
        try {
            const user = await this.knex<UserEntity>(this.tableName)
                ?.select()
                .where("id", id)
                .first();
            return user || null;
        } catch (error) {
            console.error("Error finding user by ID:", error);
            return null;
        }
    }

    async create(user: UserEntity): Promise<number | null> {
        try {
            const [{ id }] = await this.knex<UserEntity>(this.tableName)
                ?.insert({
                    name: user.name,
                    lastname: user?.lastname,
                    firstname: user?.firstname,
                    gender: user?.gender,
                    email: user.email,
                    tel: user?.tel,
                    birthday: user?.birthday,
                    profil_img: user?.profil_img,
                    password: user?.password,
                    country: user?.country
                })
                .returning("id");
            return id || null;
        } catch (error) {
            console.error("Error creating user:", error);
            return null;
        }
    }

    async findAll(): Promise<UserEntity[]> {
        try {
            const users = await this.knex<UserEntity>(this.tableName)?.select();
            return users;
        } catch (error) {
            console.error("Error finding all users:", error);
            return [];
        }
    }

    async update(user: UserEntity): Promise<UserEntity> {
        try {
            await this.knex<UserEntity>(this.tableName)?.where("id", user.id).update(user);
            return (await this.findById(user.id)) || user;
        } catch (error) {
            console.error("Error updating user:", error);
            return user;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await this.knex<UserEntity>(this.tableName)?.where("id", id).del();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }
}
