import { PatientProfil } from "../entities/PatientProfil";
import { INutritionalNeedsCalculator } from "./interfaces/NutritionalNeedsCalculator";

export class NutritionalNeedsCalculator implements INutritionalNeedsCalculator {
   calculateBMR(patientProfil: PatientProfil, code?: string): Promise<{ bmr: number }> {
      throw new Error("Method not implemented.");
   }
   calculateTDEE(patientProfil: PatientProfil, code?: string): Promise<{ tdee: number }> {
      throw new Error("Method not implemented.");
   }
   calculateMacroNutrientProportion(patientProfil: PatientProfil): Promise<Map<string, { value: number; unit: string }>> {
      throw new Error("Method not implemented.");
   }
   calculateMicroNutrientProportion(patientProfil: PatientProfil): Promise<Map<string, { value: number; unit: string }>> {
      throw new Error("Method not implemented.");
   }
}
