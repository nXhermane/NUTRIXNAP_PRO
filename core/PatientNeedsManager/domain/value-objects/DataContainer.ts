import { ValueObject } from "@/core/shared";
import { INutritionFormular } from "../entities/NutritionFormular";
import { INutritionalReferenceValue } from "../entities/NutritionalReferenceValue";
import { PatientProfil } from "../entities/PatientProfil";

export interface IDataContainer {
   formular: (name: string) => Promise<INutritionFormular>;
   anref: (tagname: string, origin: string) => Promise<INutritionalReferenceValue>;
   patient: {
    profil: PatientProfil
   };
}

export class DataContainer extends ValueObject<IDataContainer> {
   protected validate(props: IDataContainer): void {
      throw new Error("Method not implemented.");
   }
}
