import { AggregateRoot } from "@shared";
import { PatientProfil } from "../entities/PatientProfil";

export interface INutritionalProfil {
   patientProfil: PatientProfil;
   
}

export class NutritionalProfil extends AggregateRoot<INutritionalProfil> {
   public validate(): void {
      throw new Error("Method not implemented.");
   }
}