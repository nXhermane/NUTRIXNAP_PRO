
import { ValueObject } from "./../ValueObject";
import { NegativeValueError } from "./../../exceptions";
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
        if (props.value <= 0) {
            throw new NegativeValueError(
                "La quantité ne peut pas être négative. Veuillez entrer une valeur supérieure à zéro."
            );
        }
    }
}
