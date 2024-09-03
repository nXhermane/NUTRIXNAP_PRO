import { AggregateID, ValueObject } from "@shared";

export interface IMealsType {
   typeId: AggregateID;
   name: string;
   nameF: string;
}
export class MealsType extends ValueObject<IMealsType> {
   constructor(props: IMealsType) {
      super(props);
      this.validate(props);
   }
   validate(props: IMealsType): void {}
}
