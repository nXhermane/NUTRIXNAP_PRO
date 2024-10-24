import { EmptyStringError, Entity, Guard } from "@/core/shared";

export type StandardMedicalConditionCriteria = {
   expression: string;
   variableMappingTable: { [variableName: string]: string };
};
export interface IStandardMedicalCondition {
   name: string;
   criteria: StandardMedicalConditionCriteria;
   defaultRecommendation: string[]; // TODO: doit etre remplacer par les classes de recommandation modeliser plustard
}

export class StandardMedicalCondition extends Entity<IStandardMedicalCondition> {
   get name(): string {
      return this.props.name;
   }
   set name(name: string) {
      this.props.name = name;
      this.validate();
   }
   get criteria(): StandardMedicalConditionCriteria {
      return this.props.criteria;
   }
   set criteria(criteria:StandardMedicalConditionCriteria){
    this.props.criteria = criteria
    this.validate()
   }
   addRecommendation(...recommendations:string[]){
    recommendations.forEach((recommendation:string)=> {
        this.props.defaultRecommendation.push(recommendation)
    })
    this.validate()
   }
   public validate(): void {
      this._isValid = false;
      if (Guard.isEmpty(this.props.name).succeeded) throw new EmptyStringError("La nom d'une condition medicale ne doit pas être vide.");
      this._isValid = true;
   }
}
