import { Macronutrients, PatientNeedsModel } from "../entities/PatientNeedsModel";
import { PatientProfil } from "../entities/PatientProfil";
import { INutritionalNeedsCalculator } from "./interfaces/NutritionalNeedsCalculator";

export class NutritionalNeedsCalculator implements INutritionalNeedsCalculator {
   generatePatientNeeds(patientProfil: PatientProfil, patientNeedsModel: PatientNeedsModel): Promise<void> {
      const patientNeedsModelProps = patientNeedsModel.getProps();
      const patientData = patientProfil.getProps();
      this.calculateMacroNutrientProportion(patientProfil, patientNeedsModelProps.macronutrients);

      throw new Error("Method not implemented.");
   }
   private calculateMacroNutrientProportion(
      patientProfil: PatientProfil,
      macronutrientsModel: Macronutrients,
   ): Promise<Map<string, { value: number; unit: string }>> {
      const keys = Object.keys(macronutrientsModel);
      const values = Object.values(macronutrientsModel);
      for (let index = 0; index < keys.length; index++) {
         const nutrientFormular = values[index];
         const nutrientTagname = keys[index];
         if (nutrientFormular.isFormular) {
            // si c'est une formule , j'utilise l'autre smart cal pour calculer si non je recupere le nutriment depuis et on va recuperer la vleur de reference dns la base afin de verifier les conditions et recuper la valeur finale
         } else {
         }
      }
      throw new Error("Method not implemented.");
   }
   private getNeedsDataForCalcul(variables: { [key: string]: string },patientProfil:PatientProfil) {
      
for (const [variableAlias,variableName] of Object.entries(variables)) {
   if(this.isFormularVar(variableAlias)){
      const formularName=variableAlias.replace("formular_",'').trim()


   } else if(this.isPatientVar(variableAlias)){

   }else{
      throw new Error()
   }
}

   }
   private isPatientVar(variableAlias:string):boolean{
      const regex=/patient_[\w]/
      return regex.test(variableAlias)

   }
   private isFormularVar(variableAlias:string):boolean{
      const regex=/formular_[\w]/
      return regex.test(variableAlias) 
   }

private getFormularFromRepo(formularName:string){
   
} 

private calculateMicroNutrientProportion(patientProfil: PatientProfil): Promise<Map<string, { value: number; unit: string }>> {
      throw new Error("Method not implemented.");
   }
}
