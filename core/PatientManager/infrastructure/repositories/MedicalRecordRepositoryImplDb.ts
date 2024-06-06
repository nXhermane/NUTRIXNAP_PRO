import { MedicalRecordRepository } from "./interfaces/MedicalRecordRepository";
import { MedicalRecord } from "./../../domain";
import { AggregateID, Result, Mapper, Paginated } from "@shared";
import { Knex } from "knex";
import { MedicalRecordDto } from "./../dtos/MedicalRecordDto"
import { MedicalRecordPersistenceType, MedicalRecordTableType, FoodDiaryPersistenceType, ConsultationInformationPersistenceType, FoodStoryPersistenceType, MedicalStoryPersistenceType, PersonalAndSocialStoryPersistenceType, PatientMeasurementPersistenceType, ObjectivePersistenceType } from "./types"
import { MedicalRecordRepositoryError, MedicalRecordRepositoryNotFoundException } from "./errors/MedicalRecordRepositoryError"
export class MedicalRepositoryImplDb implements MedicalRecordRepository {
  private medicalRecordTableName = "medicalRecords"
  private consultationInformationTableName = "consultationInformations"
  private foodStoryTableName = "foodStories"
  private medicalStoryTableName = "medicalStories"
  private personalAndSocialStoryTableName = "personalAndSocialStories"
  private foodDiaryTableName = "foodDiaries"
  private objectiveTableName = "objectives"
  private patientMeasurementTableName = "patientMeasurements"

  constructor(private knex: Knex, private mapper: Mapper<MedicalRecord, MedicalRecordPersistenceType, MedicalRecordDto>) { }

  async save(medicalRecord: MedicalRecord, trx?: Knex.Transaction): Promise<void> {
    try {
      const medicalRecordPersistence = this.mapper.toPersistence(medicalRecord)
      await this.saveMedicalRecord(medicalRecordPersistence.medicalRecord, trx)
      await this.saveConsultationInformation(medicalRecordPersistence.consultationInformation, trx)
      await this.saveFoodStory(medicalRecordPersistence.foodStory, trx)
      await this.saveMedicalStory(medicalRecordPersistence.medicalStory, trx)
      await this.savePersonalAndSocialStory(medicalRecordPersistence.personalAndSocialStory, trx)
      await this.savePatientMeasurement(medicalRecordPersistence.patientMeasurement, trx)
      await Promise.all(medicalRecordPersistence.objectives.map(async (objective: ObjectivePersistenceType) => await this.saveObjective(objective, trx)))
      await Promise.all(medicalRecordPersistence.foodDiaries.map(async (foodDiary: FoodDiaryPersistenceType) => await this.saveFoodDiary(foodDiary, trx)))
    } catch (error) {
      throw new MedicalRecordRepositoryError("Erreur lors de la sauvegarde du dossier du patient", error as Error, {})
    }
  }

  async getById(medicalRecordId: AggregateID): Promise<MedicalRecord> {
    try {
      const medicalRecordPersistence = {
        medicalRecord: await this.knex<MedicalRecordTableType>(this.medicalRecordTableName).select().where("id", medicalRecordId).first(),
        consultationInformation: await this.knex<ConsultationInformationPersistenceType>(this.consultationInformationTableName).select().where({ medicalRecordId }).first(),
        foodStory: await this.knex<FoodStoryPersistenceType>(this.foodStoryTableName).select().where({ medicalRecordId }).first(),
        medicalStory: await this.knex<MedicalStoryPersistenceType>(this.medicalStoryTableName).select().where({ medicalRecordId }).first(),
        personalAndSocialStory: await this.knex<PersonalAndSocialStoryPersistenceType>(this.personalAndSocialStoryTableName).select().where({ medicalRecordId }).first(),
        patientMeasurement: await this.knex<PatientMeasurementPersistenceType>(this.patientMeasurementTableName).select().where({ medicalRecordId }).first(),
        foodDiaries: await this.knex<FoodDiaryPersistenceType>(this.foodDiaryTableName).select().where({ medicalRecordId }),
        objectives: await this.knex<ObjectivePersistenceType>(this.objectiveTableName).select().where({ medicalRecordId })
      }
      return this.mapper.toDomain(medicalRecordPersistence)
    } catch (error) {
      throw new MedicalRecordRepositoryError("Erreur lors de la récupération du dossier du patient par ID", error as Error, {})
    }
  }

  async delete(medicalRecordId: AggregateID, trx?: Knex.Transaction): Promise<void> {
    try {
      const query = trx ? this.knex<MedicalRecordTableType>(this.medicalRecordTableName).transacting(trx) : this.knex<MedicalRecordTableType>(this.medicalRecordTableName)
      await query.delete().where("id", medicalRecordId);
    } catch (error) {
      throw new MedicalRecordRepositoryError("Erreur lors de la suppression du dossier du patient", error as Error, { medicalRecordId })
    }
  }

  private async saveMedicalRecord(medicalRecord: MedicalRecordTableType, trx?: Knex.Transaction): Promise<void> {
    const exist = await this.getMedicalRecordById(medicalRecord.id)
    const query = trx ? this.knex<MedicalRecordTableType>(this.medicalRecordTableName).transacting(trx) : this.knex<MedicalRecordTableType>(this.medicalRecordTableName)
    !exist ? await query.insert(medicalRecord) : await query.where("id", medicalRecord.id).update(medicalRecord)
  }

  private async saveFoodDiary(foodDiary: FoodDiaryPersistenceType, trx?: Knex.Transaction): Promise<void> {
    const exist = await this.getFoodDiaryById(foodDiary.id)
    const query = trx ? this.knex<FoodDiaryPersistenceType>(this.foodDiaryTableName).transacting(trx) : this.knex<FoodDiaryPersistenceType>(this.foodDiaryTableName)
    !exist ? await query.insert(foodDiary) : await query.where("id", foodDiary.id).update(foodDiary)
  }

  private async saveConsultationInformation(consultationInformation: ConsultationInformationPersistenceType, trx?: Knex.Transaction): Promise<void> {
    const exist = await this.getConsultationInformationById(consultationInformation.id)
    const query = trx ? this.knex<ConsultationInformationPersistenceType>(this.consultationInformationTableName).transacting(trx) : this.knex<ConsultationInformationPersistenceType>(this.consultationInformationTableName)
    !exist ? await query.insert(consultationInformation) : await query.where("id", consultationInformation.id).update(consultationInformation)
  }

  private async saveFoodStory(foodStory: FoodStoryPersistenceType, trx?: Knex.Transaction): Promise<void> {
    const exist = await this.getFoodStoryById(foodStory.id)
    const query = trx ? this.knex<FoodStoryPersistenceType>(this.foodStoryTableName).transacting(trx) : this.knex<FoodStoryPersistenceType>(this.foodStoryTableName)
    !exist ? await query.insert(foodStory) : await query.where("id", foodStory.id).update(foodStory)
  }

  private async saveMedicalStory(medicalStory: MedicalStoryPersistenceType, trx?: Knex.Transaction): Promise<void> {
    const exist = await this.getMedicalRecordById(medicalStory.id)
    const query = trx ? this.knex<MedicalStoryPersistenceType>(this.medicalStoryTableName).transacting(trx) : this.knex<MedicalStoryPersistenceType>(this.medicalStoryTableName)
    !exist ? await query.insert(medicalStory) : await query.where("id", medicalStory.id).update(medicalStory)
  }

  private async savePersonalAndSocialStory(personalAndSocialStory: PersonalAndSocialStoryPersistenceType, trx?: Knex.Transaction): Promise<void> {
    const exist = await this.getPersonalAndSocialStoryById(personalAndSocialStory.id)
    const query = trx ? this.knex<PersonalAndSocialStoryPersistenceType>(this.personalAndSocialStoryTableName).transacting(trx) : this.knex<PersonalAndSocialStoryPersistenceType>(this.personalAndSocialStoryTableName)
    !exist ? await query.insert(personalAndSocialStory) : await query.where("id", personalAndSocialStory.id).update(personalAndSocialStory)
  }

  private async savePatientMeasurement(patientMeasurement: PatientMeasurementPersistenceType, trx?: Knex.Transaction): Promise<void> {
    const exist = await this.getPatientMeasurementById(patientMeasurement.id)
    const query = trx ? this.knex<PatientMeasurementPersistenceType>(this.patientMeasurementTableName).transacting(trx) : this.knex<PatientMeasurementPersistenceType>(this.patientMeasurementTableName)
    !exist ? await query.insert(patientMeasurement) : await query.where("id", patientMeasurement.id).update(patientMeasurement)
  }

  private async saveObjective(objective: ObjectivePersistenceType, trx?: Knex.Transaction): Promise<void> {
    const exist = await this.getObjectiveById(objective.id)
    const query = trx ? this.knex<ObjectivePersistenceType>(this.objectiveTableName).transacting(trx) : this.knex<ObjectivePersistenceType>(this.objectiveTableName)
    !exist ? await query.insert(objective) : await query.where("id", objective.id).update(objective)
  }

  private async checkIfExist(medicalRecordId: AggregateID): Promise<boolean> {
    const medicalRecord = await this.knex<MedicalRecordTableType>(this.medicalRecordTableName).select().where("id", medicalRecordId).first()
    return medicalRecord ? true : false
  }

  private async getMedicalRecordById(medicalRecordId: AggregateID): Promise<MedicalRecordTableType | undefined> {
    return await this.knex<MedicalRecordTableType>(this.medicalRecordTableName).select().where("id", medicalRecordId).first()
  }

  private async getFoodDiaryById(foodDiaryId: AggregateID): Promise<FoodDiaryPersistenceType | undefined> {
    return await this.knex<FoodDiaryPersistenceType>(this.foodDiaryTableName).select().where("id", foodDiaryId).first()
  }

  private async getConsultationInformationById(consultationInformationId: AggregateID): Promise<ConsultationInformationPersistenceType | undefined> {
    return await this.knex<ConsultationInformationPersistenceType>(this.consultationInformationTableName).select().where("id", consultationInformationId).first()
  }

  private async getFoodStoryById(foodStoryId: AggregateID): Promise<FoodStoryPersistenceType | undefined> {
    return await this.knex<FoodStoryPersistenceType>(this.foodStoryTableName).select().where("id", foodStoryId).first()
  }

  private async getMedicalStoryById(medicalStoryId: AggregateID): Promise<MedicalStoryPersistenceType | undefined> {
    return await this.knex<MedicalStoryPersistenceType>(this.medicalStoryTableName).select().where("id", medicalStoryId).first()
  }

  private async getPersonalAndSocialStoryById(personalAndSocialStoryId: AggregateID): Promise<PersonalAndSocialStoryPersistenceType | undefined> {
    return await this.knex<PersonalAndSocialStoryPersistenceType>(this.personalAndSocialStoryTableName).select().where("id", personalAndSocialStoryId).first()
  }

  private async getPatientMeasurementById(patientMeasurementId: AggregateID): Promise<PatientMeasurementPersistenceType | undefined> {
    return await this.knex<PatientMeasurementPersistenceType>(this.patientMeasurementTableName).select().where("id", patientMeasurementId).first()
  }

  private async getObjectiveById(objectiveId: AggregateID): Promise<ObjectivePersistenceType | undefined> {
    return await this.knex<ObjectivePersistenceType>(this.objectiveTableName).select().where("id", objectiveId).first()
  }
}