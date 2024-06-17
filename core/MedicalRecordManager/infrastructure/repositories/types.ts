import { AggregateID } from "@shared";
export interface Timestamps {
   createdAt: string;
   updatedAt: string;
}
export interface FoodDiaryPersistenceType extends Timestamps {
   id: AggregateID;
   date: string;
   meal: string;
   observation: string;
   images: string;
   medicalRecordId: AggregateID;
}
export interface ConsultationInformationPersistenceType extends Timestamps {
   id: AggregateID;
   consultationMotive: string;
   expectations: string;
   clinicalObjective: string;
   otherInformation: string;
   medicalRecordId: AggregateID;
}
export interface FoodStoryPersistenceType extends Timestamps {
   id: AggregateID;
   bedtime: string;
   wakeUpTime: string;
   dietTypes: string;
   favoriteFoods: string;
   foodAversions: string;
   allergies: string;
   foodIntolerances: string;
   nutritionalDeficiencies: string;
   waterConsumption: string;
   numberOfMealsPerDay: number;
   otherInformation: string;
   medicalRecordId: AggregateID;
}
export interface MedicalStoryPersistenceType extends Timestamps {
   id: AggregateID;
   pathologies: string;
   drugie: string;
   personalBackground: string;
   familyBackground: string;
   otherInformation: string;
   medicalRecordId: AggregateID;
}
export interface ObjectivePersistenceType extends Timestamps {
   id: AggregateID;
   type: "Measure" | "General";
   timeframe: string;
   body: string;
   status: "InProgress" | "Achieved" | "NotAchieved";
   medicalRecordId: AggregateID;
}
export interface PersonalAndSocialStoryPersistenceType extends Timestamps {
   id: AggregateID;
   gastrointestinalState: "Regular" | "Diarrhea" | "Constipation" | "Irregular";
   sleepQuality: "Very good" | "Good" | "Fair" | "Poor" | "Very poor";
   isSmoker: boolean;
   isAlcoholConsumer: boolean;
   maritalStatus: "Single" | "Married" | "Divorced" | "Widowed";
   physicalActivity: "Sedentary" | "Lightly Active" | "Moderately Active" | "Very Active" | "Extremely Active";
   ethnicity: "Caucasian" | "Asian" | "Black";
   otherInformation: string;
   medicalRecordId: AggregateID;
}
export interface PatientMeasurementPersistenceType extends Timestamps {
   id: AggregateID;
   anthropometricMeasurements: string;
   bodyCompositionMeasurements: string;
   medicalAnalysisResults: string;
   medicalRecordId: AggregateID;
}
export interface MedicalRecordTableType extends Timestamps {
   id: AggregateID;
   status: "Active" | "New" | "Inactive";
   eatingBehaviors: string;
}
export interface MedicalRecordPersistenceType {
   medicalRecord: MedicalRecordTableType;
   foodDiaries: FoodDiaryPersistenceType[];
   consultationInformation: ConsultationInformationPersistenceType;
   foodStory: FoodStoryPersistenceType;
   medicalStory: MedicalStoryPersistenceType;
   objectives: ObjectivePersistenceType[];
   personalAndSocialStory: PersonalAndSocialStoryPersistenceType;
   patientMeasurement: PatientMeasurementPersistenceType;
}

export interface MeasurementTypePersistenceType extends Timestamps {
   id: AggregateID;
   name: string;
   nameF: string;
   measureCategory: "Antropometry" | "MedicalAnalysis" | "BodyCompositiona";
   measureCode: string;
   unit: string;
}
