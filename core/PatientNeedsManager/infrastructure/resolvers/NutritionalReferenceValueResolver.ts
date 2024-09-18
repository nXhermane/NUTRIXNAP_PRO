import { NutritionalReferenceValue } from "../../domain/entities/NutritionalReferenceValue";
import { IDataSourceResolver } from "./interfaces/IDataSourceResolver";

export class NutritionalReferenceValueResolver implements IDataSourceResolver {
   constructor(private context: NutritionalReferenceValue[]) {}
   resolve(variable: string) {
      const nutritionalReferenceValue = this.context.find((value) => value.tagnames === variable);
      if (!nutritionalReferenceValue) {
         throw new Error(`Nutritional reference value not found for tagname: ${variable}`);
      }
      return nutritionalReferenceValue;
   }
}
