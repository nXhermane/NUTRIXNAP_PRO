import { IPatientRepository, PatientEntity, IDatabase, SearchPatientOptions, CreatePatientType, UpdatePatientType } from "@/core/interfaces";
import { db } from "@/core/db/db.config";
import { Knex } from "knex";
import * as Crypto from "expo-crypto";
import { DateManager } from "@/core/utility";
import { TableNames } from "@/core/constants";
export default class PatientRepository implements IPatientRepository {
   private db: IDatabase | null = null;
   private knex: Knex | null = null;
   private static readonly tableName: string = TableNames.Patients;

   constructor() {
      db.then((db: IDatabase) => {
         this.db = db;
         this.knex = db.knex;
         this.init();
      });
   }

   private async init(): Promise<void> {
      try {
         const hasUsersTable = await this.knex?.schema.hasTable(PatientRepository.tableName);
         if (!hasUsersTable) {
            await this.createTable();
            console.log(`Table "${PatientRepository.tableName}" created successfully.`);
         } else {
            console.log(`Table "${PatientRepository.tableName}" already exists.`);
         }
      } catch (error) {
         console.error(`Error initializing "${PatientRepository.tableName}" table:`, error);
      }
   }

   private async createTable(): Promise<void> {
      await this.knex?.schema.createTable(PatientRepository.tableName, (table) => {
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
         table.uuid("unique_id").notNullable();
         table.timestamps(true, true, true);
      });
   }

   async findById(id: number): Promise<PatientEntity | null> {
      try {
         const patient = await this.knex!<PatientEntity>(PatientRepository.tableName)?.select().where("id", id).first();
         return patient || null;
      } catch (error) {
         console.error("Error finding Patient by ID:", error);
         return null;
      }
   }

   async create(patient: CreatePatientType): Promise<number | null> {
      try {
         const [{ id }] = await this.knex!(PatientRepository.tableName)
            ?.insert({
               name: patient.name,
               gender: patient?.gender,
               email: patient?.email,
               tel: patient?.tel,
               birthday: patient?.birthday,
               profil_img: patient?.profil_img,
               country: patient?.country,
               occupancy: patient?.occupancy,
               consultationLocation: patient?.consultationLocation,
               unique_id: Crypto.randomUUID(),
            })
            .returning("id");

         return id || null;
      } catch (error) {
         console.error("Error creating Patient:", error);
         return null;
      }
   }

   async findAll(): Promise<PatientEntity[]> {
      try {
         const patients = await this.knex!<PatientEntity>(PatientRepository.tableName)?.select();
         return patients;
      } catch (error) {
         console.error("Error finding all Patient:", error);
         return [];
      }
   }

   async update(patient: UpdatePatientType): Promise<PatientEntity> {
      try {
         const date = DateManager.dateToTimestamps(new Date());
         await this.knex!<PatientEntity>(PatientRepository.tableName)
            ?.where("id", patient.id)
            .update({ ...patient, updatedAt: date });
         return ((await this.findById(patient.id)) as PatientEntity) || patient;
      } catch (error) {
         console.error("Error updating Patient:", error);
         return patient as PatientEntity;
      }
   }

   async delete(id: number): Promise<void> {
      try {
         await this.knex!<PatientEntity>(PatientRepository.tableName)?.where("id", id).del();
      } catch (error) {
         console.error("Error deleting Patient:", error);
      }
   }
   async search(searchValue: string, options?: SearchPatientOptions): Promise<PatientEntity[]> {
      try {
         const value = "%" + searchValue + "%";
         let reqQuerry = this.knex!<PatientEntity>(PatientRepository.tableName)
            ?.select()
            .whereLike("id", value)
            .orWhereLike("name", value)
            .orWhereLike("tel", value)
            .orWhereLike("occupancy", value)
            .orWhereLike("email", value);

         if (options?.gender) reqQuerry = reqQuerry.andWhere("gender", options.gender);
         if (options?.periode) {
            if (options.periode === "thisMonth")
               reqQuerry = reqQuerry.whereRaw("MONTH(createdAt) = MONTH(CURRENT_DATE())").whereRaw("YEAR(createdAt) = YEAR(CURRENT_DATE())");

            if (options?.periode)
               reqQuerry = reqQuerry.whereRaw("WEEK(createdAt) = WEEK(CURRENT_DATE())").whereRaw("YEAR(createdAt) = YEAR(CURRENT_DATE())");
         }

         return await reqQuerry;
      } catch (error) {
         console.error("Error search  Patient:", error);
         return [];
      }
   }
}
