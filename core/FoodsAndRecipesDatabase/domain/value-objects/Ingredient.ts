import { INVALID_FOOD_REFERENCE_ERROR, EMPTY_FOOD_REFERENCE_ERROR } from "./../constants";
import { ValueObject, InvalidReference, Guard } from "@shared";
import { Quantity, IQuantity } from "./Quantity";
import { AggregateID, EmptyStringError } from "@shared";
export interface IIngredient {
   name: string;
   quantity: Quantity;
   foodId: AggregateID;
}
export class Ingredient extends ValueObject<IIngredient> {
   constructor(props: IIngredient) {
      super(props);
   }
   get name(): string {
      return this.props.name;
   }
   get foodId(): AggregateID {
      return this.props.foodId;
   }
   get quantity(): IQuantity {
      return this.props.quantity.unpack();
   }

   validateIngredient(foodIds: AggregateID[]): void {
      if (!foodIds.includes(this.props.foodId)) {
         throw new InvalidReference(INVALID_FOOD_REFERENCE_ERROR);
      }
   }
   validate(props: IIngredient) {
      if (Guard.isEmpty(props.foodId).succeeded) {
         throw new EmptyStringError(EMPTY_FOOD_REFERENCE_ERROR);
      }
   }
}
