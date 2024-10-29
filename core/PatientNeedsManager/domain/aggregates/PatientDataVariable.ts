import { AggregateID, AggregateRoot, EmptyStringError, ExceptionBase, Result } from "@/core/shared";
import { CreatePatientDataVariable } from "../types";

/**
 * Représente un ensemble de variables dynamiques associées à un patient spécifique.
 */
export interface IPatientDataVariable {
   patientId: AggregateID; // L'identifiant unique du patient.
   variables: Record<string, string>; // Clé-valeur pour le nom et le chemin de la variable.
}

export class PatientDataVariable extends AggregateRoot<IPatientDataVariable> {
   get patientId(): AggregateID {
      return this.props.patientId;
   }
   get variables(): Record<string, string> {
      return this.props.variables;
   }
   updateVariable(variableName: string, value: string): void {
      this.props.variables[variableName] = value;
   }
   deleteVariable(variableName: string): void {
      if (this.props.variables.hasOwnProperty(variableName)) delete this.props.variables[variableName];
      this.validate();
   }

   public validate(): void {
      if (this.props.patientId === undefined) throw new EmptyStringError("Patient ID is required.");
      this._isValid = true;
   }
   public static create(props: CreatePatientDataVariable): Result<PatientDataVariable> {
      try {
         const patientDataVariable = new PatientDataVariable({ props });
         return Result.ok<PatientDataVariable>(patientDataVariable);
      } catch (error) {
         return error instanceof ExceptionBase
            ? Result.fail<PatientDataVariable>(`[${error.code}]:${error.message}`)
            : Result.fail<PatientDataVariable>(`Erreur inattendue. ${PatientDataVariable?.constructor.name}`);
      }
   }
}
