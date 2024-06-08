import { IUserRepository, UserEntity, IDatabase, CreateUserType, UpdateUserType } from '@/core/interfaces';
import { TableNames } from '@/core/constants';
import Database, { db } from '@/core/db/db.config';
import { Knex } from 'knex';
import * as Crypto from 'expo-crypto';
import { DateManager } from '@/core/utility';

export default class UserRepository implements IUserRepository {
   private db: IDatabase | null = null;
   private knex: Knex | null = null;
   private static readonly tableName: string = TableNames.Users;

   constructor() {
      db.then((db: IDatabase) => {
         this.db = db;
         this.knex = db.knex;
         this.init();
      });
   }

   private async init(): Promise<void> {
      try {
         const hasUsersTable = await this.knex?.schema.hasTable(UserRepository.tableName);
         if (!hasUsersTable) {
            await this.createUsersTable();
            console.log(`Table "${UserRepository.tableName}" created successfully.`);
         } else {
            console.log(`Table "${UserRepository.tableName}" already exists.`);
         }
      } catch (error) {
         console.error(`Error initializing "${UserRepository.tableName}" table:`, error);
      }
   }

   private async createUsersTable(): Promise<void> {
      await this.knex?.schema.createTable(UserRepository.tableName, (table) => {
         table.increments('id').primary();
         table.string('name', 200).notNullable();
         table.string('lastname', 100);
         table.string('firstname', 100);
         table.enu('gender', ['M', 'F', 'O']);
         table.string('country', 100);
         table.string('email', 200).unique();
         table.string('tel', 100);
         table.date('birthday');
         table.string('profession', 200);
         table.string('profil_img', 300);
         table.string('password', 255);
         table.uuid('unique_id').notNullable();
         table.timestamps(true, true, true);
      });
   }

   async findById(id: number): Promise<UserEntity | null> {
      try {
         const user = await this.knex!<UserEntity>(UserRepository.tableName)?.select().where('id', id).first();
         return user || null;
      } catch (error) {
         console.error('Error finding user by ID:', error);
         return null;
      }
   }

   async create(user: CreateUserType): Promise<number | null> {
      try {
         const [{ id }] = await this.knex!<UserEntity>(UserRepository.tableName)
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
               country: user?.country,
               unique_id: Crypto.randomUUID(),
            })
            .returning('id');
         return id || null;
      } catch (error) {
         console.error('Error creating user:', error);
         return null;
      }
   }

   async findAll(): Promise<UserEntity[]> {
      try {
         const users = await this.knex!<UserEntity>(UserRepository.tableName)?.select();
         return users;
      } catch (error) {
         console.error('Error finding all users:', error);
         return [];
      }
   }

   async update(user: UpdateUserType): Promise<UserEntity> {
      try {
         const date = DateManager.dateToTimestamps(new Date());
         await this.knex!<UserEntity>(UserRepository.tableName)
            ?.where('id', user.id)
            .update({ ...user, updatedAt: date });
         return ((await this.findById(user.id)) as UserEntity) || user;
      } catch (error) {
         console.error('Error updating user:', error);
         return user as UserEntity;
      }
   }

   async delete(id: number): Promise<void> {
      try {
         await this.knex!<UserEntity>(UserRepository.tableName)?.where('id', id).del();
      } catch (error) {
         console.error('Error deleting user:', error);
      }
   }
}
