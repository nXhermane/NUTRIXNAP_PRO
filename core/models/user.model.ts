import { UserEntity, IDatabase } from "@/core/interfaces";
import Database from "@/core/db/db.config";
import { Knex } from "knex";

export default class UserModel {
    private static db: IDatabase;
    private static tableName: string = "users";
    public static async init(): Promise<void> {
        this.db = await Database.getInstance();
        const hasUsersTable: boolean | undefined =
            await this.db.knex?.schema.hasTable(this.tableName);
        if (!hasUsersTable) {
            await this.db.knex?.schema.createTable(
                this.tableName,
                (table: Knex.TableBuilder) => {
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
                }
            );
            console.log("Table " + this.tableName + " is created correctily");
        } else console.log("Table " + this.tableName + " are already existe");
    }
    public static async findById(id: number): Promise<UserEntity | undefined> {
        const user: UserEntity | undefined = await this.db
            .knex<UserEntity>(this.tableName)
            ?.select()
            .where("id", id)
            .first();
        return user;
    }
    public static async findAll(): Promise<UserEntity[]> {
        const users: UserEntity[] = await this.db
            .knex<UserEntity>(this.tableName)
            ?.select();
        return users;
    }
    public static async create(
        userEntity: UserEntity
    ): Promise<number | undefined> {
        const [{ id }] = await this.db
            .knex(this.tableName)
            ?.insert({
                name: userEntity.name,
                lastname: userEntity?.lastname,
                firstname: userEntity?.firstname,
                gender: userEntity?.gender,
                email: userEntity.email,
                tel: userEntity?.tel,
                birthday: userEntity?.birthday,
                profil_img: userEntity?.profil_img,
                password: userEntity?.password,
                country: userEntity?.country
            })
            .returning("id");
        return id;
    }
    public static async update(user: UserEntity): Promise<UserEntity> {
        await this.db.knex(this.tableName)?.where("id", user.id).update(user);
        return user;
    }
    public static async delete(id: number): Promise<void> {
        await this.db.knex(this.tableName)?.where("id", id).del();
    }
}
