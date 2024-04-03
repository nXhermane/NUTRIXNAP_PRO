import {
    IPatientRepository,
    PatientEntity,
    IDatabase,
    SearchPatientOptions
} from "@/core/interfaces";
import Database, { db } from "@/core/db/db.config";
import { Knex } from "knex";

export default class PatientRepository implements IPatientRepository {
    private db: IDatabase;
    private knex: Knex;
    private tableName: string = "patients";

    constructor() {
        db.then(db => {
            this.db = db;
            this.knex = db.knex;
            this.init();
        });
    }

    private async init(): Promise<void> {
        try {
            const hasUsersTable = await this.knex.schema.hasTable(
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
        await this.knex.schema.createTable(this.tableName, table => {
            table.increments("id").primary();
            table.string("name", 200);
            table.enu("gender", ["M", "F", "O"]);
            table.string("country", 100);
            table.string("email", 200);
            table.string("tel", 100);
            table.date("birthday");
            table.string("occupancy", 200);
            table.string("profil_img", 300);
            table.string("consultationLocation", 200);
            table.date("createdAt");
            table.date("updateAt");
        });
    }

    async findById(id: number): Promise<PatientEntity | null> {
        try {
            const patient = await this.knex<PatientEntity>(this.tableName)
                .select()
                .where("id", id)
                .first();
            return patient || null;
        } catch (error) {
            console.error("Error finding Patient by ID:", error);
            return null;
        }
    }

    async create(patient: PatientEntity): Promise<number | null> {
        try {
<<<<<<< HEAD
            const [id] = await this.knex(this.tableName)
=======
            const [{id}] = await this.knex(this.tableName)
>>>>>>> 65fe56f (After .git remove)
                .insert({
                    name: patient.name,
                    gender: patient?.gender,
                    email: patient?.email,
                    tel: patient?.tel,
                    birthday: patient?.birthday,
                    profil_img: patient?.profil_img,
                    country: patient?.country,
                    occupancy: patient?.occupancy,
                    consultationLocation: patient?.consultationLocation,
                    createdAt: new Date().toLocaleDateString(),
                    updateAt: new Date().toLocaleDateString()
                })
                .returning("id");
<<<<<<< HEAD
            return id || null;
=======
            return  id ||null;
>>>>>>> 65fe56f (After .git remove)
        } catch (error) {
            console.error("Error creating Patient:", error);
            return null;
        }
    }

    async findAll(): Promise<PatientEntity[]> {
        try {
            const patients = await this.knex<PatientEntity>(
                this.tableName
            ).select();
            return patients;
        } catch (error) {
            console.error("Error finding all Patient:", error);
            return [];
        }
    }

    async update(patient: PatientEntity): Promise<PatientEntity> {
        try {
            await this.knex(this.tableName)
                .where("id", patient.id)
                .update(patient);
            return (await this.findById(patient.id)) || patient;
        } catch (error) {
            console.error("Error updating Patient:", error);
            return user;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await this.knex(this.tableName).where("id", id).del();
        } catch (error) {
            console.error("Error deleting Patient:", error);
        }
    }
    async search(
        searchValue: string,
        options?: SearchPatientOptions
    ): Promise<PatientEntity[]> {
        try {
            const value = "%" + searchValue + "%";
            let reqQuerry = this.knex<PatientEntity>(this.tableName)
                .select()
                .whereLike("id", value)
                .orWhereLike("name", value)
                .orWhereLike("tel", value)
                .orWhereLike("occupancy", value)
                .orWhereLike("email", value);

            if (options?.gender)
                reqQuerry = reqQuerry.andWhere("gender", options.gender);
            if (options?.periode) {
                if (options.periode === "thisMonth")
                    reqQuerry = reqQuerry
                        .whereRaw("MONTH(createdAt) = MONTH(CURRENT_DATE())")
                        .whereRaw("YEAR(createdAt) = YEAR(CURRENT_DATE())");

                if (options?.periode)
                    reqQuerry = reqQuerry
                        .whereRaw("WEEK(createdAt) = WEEK(CURRENT_DATE())")
                        .whereRaw("YEAR(createdAt) = YEAR(CURRENT_DATE())");
            }
            
            return await reqQuerry
        } catch (error) {
            console.error("Error search  Patient:", error);
            return [];
        }
    }
}
