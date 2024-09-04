import { AggregateID, BaseEntityProps, Entity, Gender, PhysicalActivityLevel, Result } from "@shared";
import { Age } from "../value-objects/Age";
import { Height } from "../value-objects/Height";
import { Weight } from "../value-objects/Weight";
import { IMedicalCondition, MedicalCondition } from "./MedicalCondition";
import { CurrentGoal, ICurrentGoal } from "../value-objects/CurrentGoal";

export interface IPatientProfil {
   patientId: AggregateID;
   gender: Gender;
   age: Age;
   height: Height;
   weight: Weight;
   physicalActivityLevel: PhysicalActivityLevel;
   medicalCondition: MedicalCondition[];
   currentGoal: CurrentGoal;
}

export class PatientProfil extends Entity<IPatientProfil> {
   public validate(): void {
      this._isValid = true;
   }
   get patientId(): AggregateID {
      return this.props.patientId;
   }
   get gender(): "M" | "F" | "O" {
      return this.props.gender.sexe;
   }
   set gender(gender: Gender) {
      this.props.gender = gender;
   }
   get age(): number {
      return this.props.age.getValue();
   }
   set age(age: Age) {
      this.props.age = age;
   }
   get height(): number {
      return this.props.height.getValue();
   }
   set height(height: Height) {
      this.props.height = height;
   }
   get weight(): number {
      return this.props.weight.getValue();
   }
   set weight(weight: Weight) {
      this.props.weight = weight;
   }
   get physicalActivityLevel(): "Sedentary" | "Lightly Active" | "Moderately Active" | "Very Active" | "Extremely Active" {
      return this.props.physicalActivityLevel;
   }
   set physicalActivityLevel(physicalActivityLevel: "Sedentary" | "Lightly Active" | "Moderately Active" | "Very Active" | "Extremely Active") {
      this.props.physicalActivityLevel = physicalActivityLevel as PhysicalActivityLevel;
   }

   get medicalCondition(): (IMedicalCondition & BaseEntityProps)[] {
      return this.props.medicalCondition.map((value: MedicalCondition) => value.getProps());
   }
   get currentGoal(): ICurrentGoal {
      return this.props.currentGoal.unpack();
   }
   set currentGoal(currentGoal: CurrentGoal) {
      this.props.currentGoal = currentGoal;
   }
   addMedicalCondition(...medicalConditions: MedicalCondition[]) {
      medicalConditions.forEach((value: MedicalCondition) => {
         const index = this.props.medicalCondition.findIndex((val: MedicalCondition) => val.equals(value));
         if (index != -1) {
            this.props.medicalCondition[index] = value;
         } else {
            this.props.medicalCondition.push(value);
         }
      });
   }
   removeMedicalCondition(medicalconditionId: AggregateID) {
      const index = this.props.medicalCondition.findIndex((medicalCond: MedicalCondition) => medicalCond.id === medicalconditionId);
      if (index != -1) this.props.medicalCondition.splice(index, 1);
   }
   static create(createPatientProfilProps: any): Result<PatientProfil> {
      try {
         
      } catch (error) {
         
      }
      throw new Error();
   }
}
