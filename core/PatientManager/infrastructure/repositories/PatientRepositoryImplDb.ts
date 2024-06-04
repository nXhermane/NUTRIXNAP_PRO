import { PatientRepository } from "./interfaces/PatientRepository";
import { Patient, MedicalRecord } from "./../../domain";
import { AggregateID, Result, Mapper, Paginated } from "@shared";
import { Knex } from "knex";
import { SQLiteDatabase } from "expo-sqlite/next";

export class PatientRepositoryImplDb implements PatientRepository{
  
  constructor(
    private knex:Knex,){}
}