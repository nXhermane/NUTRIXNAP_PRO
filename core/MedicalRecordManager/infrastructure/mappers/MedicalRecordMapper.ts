import {
   MedicalRecord,
   EatingBehavior,
   FoodDiary,
   FoodStory,
   MedicalStory,
   ConsultationInformation,
   Objective,
   PatientMeasurements,
   PersonalAndSocialStory,
} from "./../../domain";
import { Mapper, BaseEntityProps, Entity, AggregateID } from "@shared";
import {
   MedicalRecordPersistenceType,
   MedicalRecordPersistenceRecordType,
   ConsultationInformationPersistenceType,
   FoodStoryPersistenceType,
   MedicalStoryPersistenceType,
   ObjectivePersistenceType,
   PersonalAndSocialStoryPersistenceType,
   PatientMeasurementPersistenceType,
   FoodDiaryPersistenceType,
} from "./../repositories/types";
import { MedicalRecordDto } from "./../dtos/MedicalRecordDto";
import { FoodDiaryDto } from "./../dtos/FoodDiaryDto";
import { FoodStoryDto } from "./../dtos/FoodStoryDto";
import { MedicalStoryDto } from "./../dtos/MedicalStoryDto";
import { ConsultationInformationDto } from "./../dtos/ConsultationInformationDto";
import { ObjectiveDto } from "./../dtos/ObjectiveDto";
import { PatientMeasurementDto } from "./../dtos/PatientMeasurementDto";
import { PersonalAndSocialStoryDto } from "./../dtos/PersonalAndSocialStoryDto";

export class MedicalRecordMapper implements Mapper<MedicalRecord, MedicalRecordPersistenceType, MedicalRecordDto> {
   constructor(
      private mapper: {
         foodDiary: Mapper<FoodDiary, FoodDiaryPersistenceType, FoodDiaryDto>;
         foodStory: Mapper<FoodStory, FoodStoryPersistenceType, FoodStoryDto>;
         medicalStory: Mapper<MedicalStory, MedicalStoryPersistenceType, MedicalStoryDto>;
         consInfo: Mapper<ConsultationInformation, ConsultationInformationPersistenceType, ConsultationInformationDto>;
         objective: Mapper<Objective, ObjectivePersistenceType, ObjectiveDto>;
         patientMeasure: Mapper<PatientMeasurements, PatientMeasurementPersistenceType, PatientMeasurementDto>;
         personalAndSocialStory: Mapper<PersonalAndSocialStory, PersonalAndSocialStoryPersistenceType, PersonalAndSocialStoryDto>;
      },
   ) {}
   toPersistence(entity: MedicalRecord): MedicalRecordPersistenceType {
      return {
         id: entity.id,
         medicalStoryId: entity.getMedicalStory().id,
         foodStoryId: entity.getFoodStory().id,
         consultationInformationId: entity.getConsultationInformation().id,
         personalAndSocialStoryId: entity.getPersonalAndSocialStory().id,
         patientMeasurementId: entity.getMeasure().id,
         foodDiaryIds: entity.foodDiaries.map((foodDiary: any) => foodDiary.id as AggregateID),
         objectiveIds: entity.objectives.map((objective: any) => objective.id),
         eatingBehaviors: entity.getEatingBehavior(),
         status: "Active",
      };
   }
   toDomain(record: MedicalRecordPersistenceRecordType): MedicalRecord {
      const { id, updateAt, createdAt, status } = record;
      return new MedicalRecord({
         id,
         updateAt,
         createdAt,
         props: {
            foodDiaries: record.foodDiaries,
            consultationInformation: record.consultationInformation,
            measure: record.patientMeasurements,
            foodStory: record.foodStory,
            medicalStory: record.medicalStory,
            objectives: record.objectives,
            personalAndSocialStory: record.personalAndSocialStory,
            eatingBehaviors: record.eatingBehaviors,
         },
      });
   }
   toResponse(entity: MedicalRecord): MedicalRecordDto {
      const entityProps = entity.getProps();
      return {
         foodDiaries: entityProps.foodDiaries.map((foodDiary: FoodDiary) => this.mapper.foodDiary.toResponse(foodDiary)),
         consultationInformation: this.mapper.consInfo.toResponse(entityProps.consultationInformation),
         foodStory: this.mapper.foodStory.toResponse(entityProps.foodStory),
         medicalStory: this.mapper.medicalStory.toResponse(entityProps.medicalStory),
         personalAndSocialStory: this.mapper.personalAndSocialStory.toResponse(entityProps.personalAndSocialStory),
         objectives: entityProps.objectives.map((obj: Objective) => this.mapper.objective.toResponse(obj)),
         eatingBehaviors: entityProps.eatingBehaviors.map((eatBehav: EatingBehavior) => ({
            date: eatBehav.date,
            eatingBehavior: eatBehav.eatingBehavior,
         })),
         measure: this.mapper.patientMeasure.toResponse(entityProps.measure),
         id: entityProps.id,
         createdAt: entityProps.createdAt,
         updatedAt: entityProps.updatedAt,
      };
   }
}
