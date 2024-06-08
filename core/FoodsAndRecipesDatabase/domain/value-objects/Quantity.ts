import { INVALID_QUANTITY_UNIT_ERROR, NEGATIVE_QUANTITY_ERROR } from './../constants';
import { ValueObject, FoodQuantityUnits } from '@shared';

export interface IQuantity {
   value: number;
   unit: string;
}
export class Quantity extends ValueObject<IQuantity> {
   constructor(props: IQuantity) {
      super(props);
      this.validate(props);
   }

   validate(props: IQuantity): void {
      if (!FoodQuantityUnits.includes(props.unit)) throw new Error(INVALID_QUANTITY_UNIT_ERROR(FoodQuantityUnits.join(',')));

      if (props.value <= 0) {
         throw new Error(NEGATIVE_QUANTITY_ERROR);
      }
   }
}
