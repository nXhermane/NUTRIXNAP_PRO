import { PatientRepository } from "./interfaces/PatientRepository";
import { Patient, MedicalRecord } from "./../../domain";
import { AggregateID, Result, Mapper, Paginated } from "@shared";
import { Knex } from "knex";
import { PatientDto } from "./../dtos/PatientDto";
import { PatientPersistenceType } from "./types";
import { PatientRepositoryError, PatientRepositoryNotFoundException } from "./errors/PatientRepositoryError";
export class PatientRepositoryImplDb implements PatientRepository {
   private patientTableName = "patients";
   constructor(
      private knex: Knex,
      private mapper: Mapper<Patient, PatientPersistenceType, PatientDto>,
   ) {}
   async save(patient: Patient, trx?: Knex.Transaction): Promise<void> {
      try {
         const patientPersistence = this.mapper.toPersistence(patient);
         const exist = await this.checkIfExist(patientPersistence.id);
         const query = trx
            ? this.knex<PatientPersistenceType>(this.patientTableName).transacting(trx)
            : this.knex<PatientPersistenceType>(this.patientTableName);
         !exist ? await query.insert(patientPersistence) : await query.where("id", patientPersistence.id).update(patientPersistence);
      } catch (error) {
         throw new PatientRepositoryError("Erreur lors de la sauvegarde du patient", error as Error, {});
      }
   }
   async delete(patientId: AggregateID, trx?: Knex.Transaction): Promise<void> {
      try {
         const query = trx
            ? this.knex<PatientPersistenceType>(this.patientTableName).transacting(trx)
            : this.knex<PatientPersistenceType>(this.patientTableName);
         await query.delete().where("id", patientId);
      } catch (error) {
         throw new PatientRepositoryError("Erreur lors de la suppression du patient", error as Error, {});
      }
   }
   async getById(patientId: AggregateID): Promise<Patient> {
      try {
         const patient = await this.knex<PatientPersistenceType>(this.patientTableName).select().where("id", patientId).first();
         if (!patient) throw new PatientRepositoryNotFoundException("Patient non trouvée pour l'ID donné", new Error(""), { patientId });
         return this.mapper.toDomain(patient as PatientPersistenceType);
      } catch (error) {
         throw new PatientRepositoryError("Erreur lors de la récupération du patient par ID", error as Error, { patientId });
      }
   }
   async getAll(paginated?: Paginated): Promise<Patient[]> {
      try {
         const query = this.knex<PatientPersistenceType>(this.patientTableName).select();
         if (paginated) query.limit(paginated.pageSize).offset(paginated.page);
         const patients = await query;
         if (patients.length === 0) {
            throw new PatientRepositoryNotFoundException("Aucun patient trouvé", new Error(""), {});
         }
         return patients.map((patient: PatientPersistenceType) => this.mapper.toDomain(patient));
      } catch (error) {
         throw new PatientRepositoryError("Erreur lors de la récupération de tous les patients", error as Error, {});
      }
   }
   private async checkIfExist(patientId: AggregateID): Promise<boolean> {
      const patient = await this.knex<PatientPersistenceType>(this.patientTableName).select().first();
      return patient ? true : false;
   }
}
