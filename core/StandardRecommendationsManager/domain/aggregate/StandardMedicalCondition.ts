import { AggregateRoot, EmptyStringError, Guard, HealthIndicator, NeedsRecommendation } from "@/core/shared";
import SmartCalc from "smartcal";
import { MedicalConditionRecommendationAddedEvent } from "../events/MedicalConditionRecommendationAddedEvent";
import { MedicalConditionRecommendationRemovedEvent } from "../events/MedicalConditionRecommendationRemovedEvent";
import { MedicalConditionHealthIndicatorAddedEvent } from "../events/MedicalConditionHealthIndicatorAddedEvent";

export type StandardMedicalConditionCriteria = {
   expression: string;
   variableMappingTable: { [variableName: string]: string };
};
export interface IStandardMedicalCondition {
   name: string;
   description: string;
   criteria: StandardMedicalConditionCriteria;
   defaultRecommendation: NeedsRecommendation[];
   healthIndicators: HealthIndicator[]
}

export class StandardMedicalCondition extends AggregateRoot<IStandardMedicalCondition> {
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
   set criteria(criteria: StandardMedicalConditionCriteria) {
      this.props.criteria = criteria;
      this.validate();
   }

   get defaultRecommendation(): NeedsRecommendation[] {
      return this.props.defaultRecommendation;
   }
   get healthIndicators(): HealthIndicator[] {
      return this.props.healthIndicators
   }
   addHealthIndicator(healthIndicator: HealthIndicator) {
      this.props.healthIndicators.push(healthIndicator);
      this.validate();
      this.addDomainEvent(new MedicalConditionHealthIndicatorAddedEvent({
         medicalConditionId: this.id,
         healthIndicator: healthIndicator,
      }))
   }

   addRecommendation(...recommendations: NeedsRecommendation[]) {
      recommendations.forEach((recommendation: NeedsRecommendation) => {
         this.props.defaultRecommendation.push(recommendation);
      });
      this.validate();
      this.addDomainEvent(new MedicalConditionRecommendationAddedEvent({
         medicalConditionId: this.id,
         recommendations: recommendations
      }))
   }
   removeHealthIndicator(healthIndicator: HealthIndicator): void {
      const index = this.props.healthIndicators.findIndex((val) => val.equals(healthIndicator));
      if (index !== -1) this.props.healthIndicators.splice(index, 1);
      this.validate();
      this.addDomainEvent(new MedicalConditionHealthIndicatorAddedEvent({
         medicalConditionId: this.id,
         healthIndicator: healthIndicator,
      }))
   }
   removeRecommendation(...recommendations: NeedsRecommendation[]) {
      recommendations.forEach((recommendation: NeedsRecommendation) => {
         const index = this.props.defaultRecommendation.findIndex((val) => val.equals(recommendation));
         if (index !== -1) this.props.defaultRecommendation.splice(index, 1);
      });
      this.validate();
      this.addDomainEvent(new MedicalConditionRecommendationRemovedEvent({
         medicalConditionId: this.id,
         recommendations: recommendations
      }))
   }

   getCriteriaMappingTable(): { [variableName: string]: string } {
      return this.props.criteria.variableMappingTable;
   }
   checkAndAssignMedicalCondition(context: { [key: string]: any }): boolean {
      const expression = this.props.criteria.expression;
      const result = SmartCalc(expression, context);
      return result === 1;
   }

   public validate(): void {
      this._isValid = false;
      if (Guard.isEmpty(this.props.name).succeeded) throw new EmptyStringError("Le nom d'une condition medicale ne doit pas être vide.");
      this._isValid = true;
   }
}
