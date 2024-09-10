import { PatientProfil } from "../../entities/PatientProfil";

export interface INutritionalNeedsCalculator {
   calculateBMR(patientProfil: PatientProfil, code?: string): Promise<{ bmr: number }>;
   calculateTDEE(patientProfil: PatientProfil, code?: string): Promise<{ tdee: number }>;
   calculateMacroNutrientProportion(patientProfil: PatientProfil): Promise<Map<string, { value: number; unit: string }>>;
   calculateMicroNutrientProportion(patientProfil: PatientProfil): Promise<Map<string, { value: number; unit: string }>>;
}
