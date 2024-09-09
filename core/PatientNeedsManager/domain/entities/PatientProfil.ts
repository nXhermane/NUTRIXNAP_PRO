import { AggregateID, BaseEntityProps, Entity, ExceptionBase, Gender, Guard, PhysicalActivityLevel, Result } from "@shared";
import { Age } from "../value-objects/Age";
import { Height } from "../value-objects/Height";
import { Weight } from "../value-objects/Weight";
import { IMedicalCondition, MedicalCondition } from "./MedicalCondition";
import { CurrentGoal, ICurrentGoal } from "../value-objects/CurrentGoal";
import { CreateMedicalConditionProps, CreatePatientProfilProps } from "../types";
import { PatientApi } from "@patientManager/application/api";

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
   static async create(createPatientProfilProps: CreatePatientProfilProps): Promise<Result<PatientProfil>> {
      try {
         const patientId = createPatientProfilProps.patientId;
         const patientResult = await (await PatientApi.getInstance()).getPatientInfoById(createPatientProfilProps.patientId);
         if (patientResult.isFailure) return Result.fail<PatientProfil>(`[Erreur]: ${(patientResult.err as any)?.toJSON() || patientResult.err}`);
         const physicalActivityLevel = createPatientProfilProps.physicalActivityLevel as PhysicalActivityLevel;
         const ageResult = Age.create(createPatientProfilProps.age);
         const genderResult = Gender.create(createPatientProfilProps.gender);
         const heightResult = Height.create(createPatientProfilProps.height);
         const weightResult = Weight.create(createPatientProfilProps.weight);
         const currentGoalResult = CurrentGoal.create(createPatientProfilProps?.currrentGoal || { goalId: "", goalRules: [] }); // TODO : cette partir est a revoir a cause du default Goal
         const medicalConditionResult = createPatientProfilProps.medicalCondition?.map((medicalCondition: CreateMedicalConditionProps) =>
            MedicalCondition.create(medicalCondition),
         );
         const validateResult = Result.combine([ageResult, genderResult, heightResult, weightResult, currentGoalResult, ...medicalConditionResult]);
         if (validateResult.isFailure) return Result.fail<PatientProfil>(`[Erreur]: ${(validateResult.err as any)?.toJSON() || validateResult.err}`);

         const patientProfil = new PatientProfil({
            props: {
               patientId,
               physicalActivityLevel,
               age: ageResult.val,
               gender: genderResult.val,
               height: heightResult.val,
               weight: weightResult.val,
               currentGoal: currentGoalResult.val,
               medicalCondition: medicalConditionResult.map((medicalCondResult: Result<MedicalCondition>) => medicalCondResult.val),
            },
         });
         return Result.ok<PatientProfil>(patientProfil);
      } catch (error) {
         return error instanceof ExceptionBase
            ? Result.fail<PatientProfil>(`[${error.code}]:${error.message}`)
            : Result.fail<PatientProfil>(`Erreur inattendue. ${PatientProfil?.constructor.name}`);
      }
   }
}
