import { PatientProfil } from "../../domain/entities/PatientProfil";
import { IDataSourceResolver } from "./interfaces/IDataSourceResolver";

export class PatientResolver implements IDataSourceResolver {
   constructor(private context: PatientProfil) {}
   resolve(variable: string): any {
      switch (variable) {
         case "patientId":
            return this.context.patientId;
         case "patientSexe":
            return this.context.gender;
         case "patientAge":
            return this.context.age;
         case "patientAgeYears":
            return this.context.ageYears;
         case "patientAgeMonths":
            return this.context.ageMonths;
         case "patientHeight":
            return this.context.height;
         case "patientHeightInFeet":
            return this.context.heightInFeet;
         case "patientHeightInInches":
            return this.context.heightInInches;
         case "patientWeight":
            return this.context.weight;
         case "patientWeightInPounds":
            return this.context.weightInPounds;
         case "patientWeightInKilograms":
            return this.context.weight;
         case "patientPhysicalActivityLevel":
            return this.context.physicalActivityLevel;
         case "patientMedicalConditions":
            return this.context.medicalCondition.map((condition) => condition.name);
         default:
            return null;
      }
   }
}
