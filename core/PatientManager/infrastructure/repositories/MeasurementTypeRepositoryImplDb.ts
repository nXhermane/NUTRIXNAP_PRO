import { AggregateID, PatientMeasurementCategory } from '@shared';
import { MeasurementTypeRepository } from './interfaces/MeasurementTypeRepository';
import { MeasurementType } from './../../domain';
import { Knex } from 'knex';
import { MeasurementTypePersistenceType } from './types';
import { MeasurementTypeRepositoryError, MeasurementTypeRepositoryNotFoundException } from './errors/MeasurementTypeRepositoryError';
export class MeasurementTypeRepositoryImplDb implements MeasurementTypeRepository {
   private measurementTypeTableName = 'measurementTypes';

   constructor(private knex: Knex) {}

   async save(measuementType: MeasurementType): Promise<void> {
      try {
         const measurementTypePersistence = {
            id: measuementType.id,
            name: measuementType.name,
            nameF: measuementType.nameF,
            measureCategory: measuementType.measureCategory as 'Antropometry' | 'MedicalAnalysis' | 'BodyCompositiona',
            measureCode: measuementType.code,
            unit: measuementType.unit,
            createdAt: measuementType.createdAt,
            updatedAt: measuementType.updatedAt,
         };
         const exist = await this.checkIfExist(measurementTypePersistence.id);
         if (!exist) await this.knex<MeasurementTypePersistenceType>(this.measurementTypeTableName).insert(measurementTypePersistence);
         else
            await this.knex<MeasurementTypePersistenceType>(this.measurementTypeTableName)
               .where('id', measurementTypePersistence.id)
               .update(measurementTypePersistence);
      } catch (error) {
         throw new MeasurementTypeRepositoryError('Erreur lors de la sauvegarde du type de mesure.', error as Error, {});
      }
   }

   async getById(measurementTypeId: AggregateID): Promise<MeasurementType> {
      try {
         const measurementType = await this.knex<MeasurementTypePersistenceType>(this.measurementTypeTableName)
            .select()
            .where('id', measurementTypeId)
            .first();
         if (!measurementType)
            throw new MeasurementTypeRepositoryNotFoundException("Type de mesure non trouvée pour l'ID donné", new Error(''), { measurementTypeId });
         return this.mapToDomain(measurementType);
      } catch (error) {
         throw new MeasurementTypeRepositoryError('Erreur lors de la récupération du type de mesure par ID', error as Error, { measurementTypeId });
      }
   }

   async getAll(measurementCategory?: 'Antropometry' | 'MedicalAnalysis' | 'BodyComposition'): Promise<MeasurementType[]> {
      try {
         const query = this.knex<MeasurementTypePersistenceType>(this.measurementTypeTableName).select();
         if (measurementCategory) query.where('measureCategory', measurementCategory);
         const measurementTypes = await query;
         if (measurementTypes.length === 0) throw new MeasurementTypeRepositoryNotFoundException('Aucun type dr mesure trouvé', new Error(''), {});
         return measurementTypes.map((measurementType: MeasurementTypePersistenceType) => this.mapToDomain(measurementType));
      } catch (error) {
         throw new MeasurementTypeRepositoryError('Erreur lors de la récupération de tous les types de mesure', error as Error, {});
      }
   }

   async getAllId(measurementCategory?: 'Antropometry' | 'MedicalAnalysis' | 'BodyComposition'): Promise<AggregateID[]> {
      const measurementTypes = await this.getAll(measurementCategory);
      return measurementTypes.map((measurementType: MeasurementType) => measurementType.id);
   }

   async delete(measurementTypeId: AggregateID): Promise<void> {
      try {
         await this.knex<MeasurementTypePersistenceType>(this.measurementTypeTableName).delete().where('id', measurementTypeId);
      } catch (error) {
         throw new MeasurementTypeRepositoryError('Erreur lors de la suppression du type de mesure', error as Error, { measurementTypeId });
      }
   }

   private async checkIfExist(measurementTypeId: AggregateID): Promise<boolean> {
      const measurementType = await this.knex<MeasurementTypePersistenceType>(this.measurementTypeTableName)
         .select()
         .where('id', measurementTypeId)
         .first();
      return measurementType ? true : false;
   }

   private mapToDomain(measurementTypePersistence: MeasurementTypePersistenceType): MeasurementType {
      const { id, createdAt, updatedAt, measureCode, measureCategory, nameF, name, unit } = measurementTypePersistence;
      return new MeasurementType({
         id,
         createdAt,
         updatedAt,
         props: {
            name,
            unit,
            measureCategory: measureCategory as PatientMeasurementCategory,
            code: measureCode,
            nameTranslate: { inFrench: nameF },
         },
      });
   }
}
