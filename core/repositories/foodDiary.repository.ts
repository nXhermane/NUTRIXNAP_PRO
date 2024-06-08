import { FoodDiaryEntity, UpdateFoodDiaryType, CreateFoodDiaryType, IFoodDiaryRepository, IDatabase } from '@/core/interfaces';
import { Knex } from 'knex';
import Database, { db } from '@/core/db/db.config';
import { DateManager } from '@/core/utility';
import { TableNames } from '@/core/constants';
export default class FoodDiaryRepository implements IFoodDiaryRepository {
   private db: IDatabase | null = null;
   private knex: Knex | null = null;
   private static readonly tableName: string = TableNames.FoodDiaries;
   private static readonly dependTableNames: string = TableNames.Patients;
   constructor() {
      db.then((db: IDatabase) => {
         this.db = db;
         this.knex = db.knex;
         this.init();
      });
   }
   private async init() {
      try {
         const hasUsersTable = await this.knex?.schema.hasTable(FoodDiaryRepository.tableName);
         if (!hasUsersTable) {
            await this.createTable();
            console.log(`Table "${FoodDiaryRepository.tableName}" created successfully.`);
         } else {
            console.log(`Table "${FoodDiaryRepository.tableName}" already exists.`);
         }
      } catch (error) {
         console.error(`Error initializing "${FoodDiaryRepository.tableName}" table:`, error);
      }
   }
   private async createTable(): Promise<void> {
      await this.knex?.schema.createTable(FoodDiaryRepository.tableName, (table) => {
         table.increments('id').primary();
         table.uuid('patient_unique_id').notNullable();
         table.json('foodIds');
         table.json('foodQuantities');
         table.date('date');
         table.string('meals', 400);
         table.string('mealsType', 200);
         table.text('observations');
         table.json('images');
         table.timestamps(true, true, true);
         table.foreign('patient_unique_id').references(FoodDiaryRepository.dependTableNames + '.unique_id');
      });
   }
   async create(foodDiary: CreateFoodDiaryType): Promise<number | null> {
      try {
         const [{ id }] = await this.knex!<FoodDiaryEntity>(FoodDiaryRepository.tableName)
            ?.insert({
               patient_unique_id: foodDiary.patient_unique_id,
               foodIds: foodDiary.foodIds,
               foodQuantities: foodDiary.foodQuantities,
               date: foodDiary.date,
               meals: foodDiary.meals,
               mealsType: foodDiary.mealsType,
               observations: foodDiary.observations,
               images: foodDiary.images,
            })
            .returning('id');

         return id as number;
      } catch (error) {
         console.error('Error creating FoodDiary:', error);
         return null;
      }
   }
   async findById(id: number): Promise<FoodDiaryEntity | null> {
      try {
         const foodDiary = await this.knex!<FoodDiaryEntity>(FoodDiaryRepository.tableName)?.select().where('id', id).first();
         return foodDiary || null;
      } catch (error) {
         console.error('Error finding FoodDiary by ID:', error);
         return null;
      }
   }
   async findByPatientUniqueId(patient_unique_id: string): Promise<FoodDiaryEntity[]> {
      try {
         const foodDiary = await this.knex!<FoodDiaryEntity>(FoodDiaryRepository.tableName)?.select().where('patient_unique_id', patient_unique_id);

         return foodDiary;
      } catch (error) {
         console.error('Error finding FoodDiary by PatientUniqueId:', error);
         return [];
      }
   }

   async findAll(): Promise<FoodDiaryEntity[]> {
      try {
         const foodDiaries = await this.knex!<FoodDiaryEntity>(FoodDiaryRepository.tableName)?.select();
         return foodDiaries;
      } catch (error) {
         console.error('Error finding all FoodDiary:', error);
         return [];
      }
   }
   async update(foodDiary: UpdateFoodDiaryType): Promise<FoodDiaryEntity> {
      try {
         const date = DateManager.dateToTimestamps(new Date());
         await this.knex!<FoodDiaryEntity>(FoodDiaryRepository.tableName)
            ?.where('id', foodDiary.id)
            .update({ ...foodDiary, updatedAt: date });
         return (await this.findById(foodDiary.id)) as FoodDiaryEntity;
      } catch (error) {
         console.error('Error updating FoodDiary:', error);
         return foodDiary as FoodDiaryEntity;
      }
      return foodDiary as FoodDiaryEntity;
   }

   async delete(id: number): Promise<void> {
      try {
         await this.knex!<FoodDiaryEntity>(FoodDiaryRepository.tableName)?.where('id', id).del();
      } catch (error) {
         console.error('Error deleting FoodDiary:', error);
      }
   }
}
