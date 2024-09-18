import { NutritionFormular } from "../../domain/entities/NutritionFormular";
import { IDataSourceResolver } from "./interfaces/IDataSourceResolver";

export class FormularResolver implements IDataSourceResolver {
   constructor(private context: NutritionFormular[]) {}
   resolve(variable: string): any {
      const index = this.context.findIndex((formular) => formular.name === variable);
      if (index >= 0) return this.context[index].getProps();
      return null;
   }
}
