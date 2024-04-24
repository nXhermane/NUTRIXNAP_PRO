import {
    INVALID_FOOD_REFERENCE_ERROR,
    EMPTY_FOOD_REFERENCE_ERROR
} from "./../constants";
import { ValueObject } from "@shared";
import { Quantity, IQuantity } from "./Quantity";
import { AggregateID } from "@shared";
export interface IIngredient {
    name: string;
    quantity: Quantity;
    foodId: AggregateID;
}
export class Ingredient extends ValueObject<IIngredient> {
    constructor(props: IIngredient) {
        super(props);
    }
    get name():string{
      return this.props.name
    }
    get foodId(): AggregateID {
        return this.props.foodId;
    }
    get quantity(): IQuantity {
        return this.props.quantity.unpack();
    }
    
    validateIngredient(foodIds: AggregateID[]): void {
        if (!foodIds.includes(this.props.foodId)) {
            throw new Error(INVALID_FOOD_REFERENCE_ERROR);
        }
    }
    validate(props: IIngredient) {
        if (String(props.foodId).trim() === "" || !props.foodId) {
            throw new Error(EMPTY_FOOD_REFERENCE_ERROR);
        }
    }
}
