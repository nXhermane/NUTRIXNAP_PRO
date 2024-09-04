import { EmptyStringError, Entity, ExceptionBase, Guard, MedicalConditionSeverity, Result, ValueObject } from "@shared";
import { CreateMedicalConditionProps } from "../types";

export interface IMedicalCondition {
   name: string;
   severity: MedicalConditionSeverity;
   recommendation: string[]; // TODO: the type of recommandation can be define and implement later
}

export class MedicalCondition extends Entity<IMedicalCondition> {
   get name(): string {
      return this.props.name;
   }
   set name(value: string) {
      this.props.name = value;
      this.validate();
   }
   get severity(): "light" | "moderate" | "severe" {
      return this.props.severity;
   }
   set severity(value: "light" | "moderate" | "severe") {
      this.props.severity = value as MedicalConditionSeverity;
   }
   get recommendation(): string[] {
      return this.props.recommendation;
   }
   addRecommandation(...recommandations: string[]) {
      this.props.recommendation.push(...recommandations);
      this.validate();
   }
   set recommandation(recommandations: string[]) {
      this.props.recommendation = recommandations;
      this.validate();
   }
   public validate(): void {
      this._isValid = false;
      if (Guard.isEmpty(this.props.name).succeeded) throw new EmptyStringError("Le nom d'un condition médicalud ne doit etre vide");
      this._isValid = true;
   }
   static create(props: CreateMedicalConditionProps): Result<MedicalCondition> {
      try {
         const medicalCond = new MedicalCondition({
            props: { name: props.name, severity: props.severity as MedicalConditionSeverity, recommendation: props.recommendation },
         });
         return Result.ok<MedicalCondition>(medicalCond);
      } catch (error) {
         return error instanceof ExceptionBase
            ? Result.fail<MedicalCondition>(`[${error.code}]:${error.message}`)
            : Result.fail<MedicalCondition>(`Erreur inattendue. ${MedicalCondition?.constructor.name}`);
      }
   }
}
