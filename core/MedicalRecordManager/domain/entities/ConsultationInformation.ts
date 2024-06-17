import { Entity, CreateEntityProps, Guard, ArgumentInvalidException, ArgumentOutOfRangeException, AggregateID } from "@shared";

export interface IConsultationInformation {
   consultationMotive: string;
   expectations: string;
   clinicalObjective: string;
   otherInformation: string;
}
export class ConsultationInformation extends Entity<IConsultationInformation> {
   constructor(createProps: CreateEntityProps<IConsultationInformation>) {
      super(createProps);
   }
   get consultationMotive(): string {
      return this.props.consultationMotive;
   }
   get expectations(): string {
      return this.props.expectations;
   }
   get clinicalObjective(): string {
      return this.props.clinicalObjective;
   }
   get otherInformation(): string {
      return this.props.otherInformation;
   }
   set consultationMotive(value: string) {
      this.props.consultationMotive = value;
   }
   set expectations(value: string) {
      this.props.expectations = value;
   }
   set clinicalObjective(value: string) {
      this.props.clinicalObjective = value;
   }
   set otherInformation(value: string) {
      this.props.otherInformation = value;
   }
   validate(): void {
      this._isValid = true;
   }
}
