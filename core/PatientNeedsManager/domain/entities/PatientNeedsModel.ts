import { Entity, ExceptionBase, IQuantity, Result } from "@/core/shared";

 export type NutrientNeedsCalculationModel= {
   isFormular:boolean,
   value:string,
   variables:{[key:string]:string}
}
export type Energy = {
  
}
export type Macronutrients = {
   PROCNT: NutrientNeedsCalculationModel;
   FAT: NutrientNeedsCalculationModel;
   CHOCDF: NutrientNeedsCalculationModel;
};
type Micronutrients = Map<string,NutrientNeedsCalculationModel>;
export interface IPatientNeedsModel {
   energy: Energy;
   macronutrients: Macronutrients;
   micronutrients: Micronutrients;
}

export class PatientNeedsModel extends Entity<IPatientNeedsModel> {
   public validate(): void {
      this._isValid = true;
   }
   static create(props: IPatientNeedsModel): Result<PatientNeedsModel> {
      try {
         const patientNeedsModel = new PatientNeedsModel({ props: props });
         return Result.ok<PatientNeedsModel>(patientNeedsModel);
      } catch (error) {
         return error instanceof ExceptionBase
            ? Result.fail<PatientNeedsModel>(`[${error.code}]:${error.message}`)
            : Result.fail<PatientNeedsModel>(`Erreur inattendue. ${PatientNeedsModel?.constructor.name}`);
      }
   }
}
