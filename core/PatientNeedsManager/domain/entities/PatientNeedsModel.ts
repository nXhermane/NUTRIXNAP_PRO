import { Entity, ExceptionBase, Result } from "@/core/shared";

type Energy = {
   tdee: string;
};
type Macronutrients = {
   PROCNT: string;
   FAT: string;
   CHOCDF: string;
};
type Micronutrients = {};
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
