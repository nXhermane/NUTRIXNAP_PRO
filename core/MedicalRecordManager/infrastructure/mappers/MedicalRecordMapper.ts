import { MedicalRecord, EatingBehavior } from "./../../domain";
import { Mapper, BaseEntityProps, Entity, AggregateID } from "@shared";
import { MedicalRecordPersistenceType, MedicalRecordPersistenceRecordType } from "./../repositories/types";
import { MedicalRecordDto } from "./../dtos/MedicalRecordDto";

// id: AggregateID;
//   medicalStoryId: AggregateID;
//   foodStoryId: AggregateID;
//   foodDiaryIds: AggregateID[];
//   objectiveIds: AggregateID[];
//   patientMeasurementId: AggregateID;
//   personalAndSocialStorieId: AggregateID;
//   consultationInformationId: AggregateID;
//   status: "Active" | "New" | "Inactive";
//   eatingBehaviors: EatingBehavior[];
export class MedicalRecordMapper implements Mapper<MedicalRecord, MedicalRecordPersistenceType, MedicalRecordDto> {
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
   toDomain(record: MedicalRecordPersistenceType): MedicalRecord {}
   toResponse(entity: MedicalRecord): MedicalRecordDto {
     
   }
}
