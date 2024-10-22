import { AggregateID } from "@shared";
import { ICurrentGoal } from "./value-objects/CurrentGoal";
import { IMedicalCondition } from "./entities/MedicalCondition";

export interface CreatePatientProfilProps {
   patientId: AggregateID;
   age: number;
   gender: "M" | "F" | "O";
   height: number;
   weight: number;
   physicalActivityLevel: "Sedentary" | "Lightly Active" | "Moderately Active" | "Very Active" | "Extremely Active";
   currrentGoal?: ICurrentGoal;
   medicalCondition: CreateMedicalConditionProps[];
}
export interface CreateMedicalConditionProps extends Omit<IMedicalCondition, "severity"> {
   severity: "light" | "moderate" | "severe";
}

export type CreateIntakeDataProps = {
   date: string;
   foodOrRecipeId: AggregateID;
   isRecipe: boolean;
   nutrients: {
      value: number;
      tagname: string;
      unit: string;
   }[];
};
