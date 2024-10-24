import { AggregateID, IDomainEvent } from "@/core/shared";

export interface MedicalConditionRecommendationAddedObject {
   medicalConditionId: AggregateID;
   recommendations: string[];
}
export class MedicalConditionRecommendationAddedEvent implements IDomainEvent {
   dateTimeOccurred: Date;
   data: MedicalConditionRecommendationAddedObject;
   constructor(medicalConditionRecommendationAddedObject: MedicalConditionRecommendationAddedObject) {
      this.data = medicalConditionRecommendationAddedObject;
      this.dateTimeOccurred = new Date();
   }

   getAggregateId(): AggregateID {
      return this.data.medicalConditionId;
   }
}
