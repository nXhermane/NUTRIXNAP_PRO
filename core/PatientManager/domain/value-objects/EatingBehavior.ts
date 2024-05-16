import {
    ValueObject,
    RegistrationDate,
    Guard,
    EmptyStringError
} from "@shared";

export interface IEatingBehavior {
    date: RegistrationDate;
    eatingBehavior: string;
}

export class EatingBehavior extends ValueObject<IEatingBehavior> {
    get eatingBehavior(): string {
        return this.props.eatingBehavior;
    }
    get date(): string {
        return this.props.date.toString();
    }
    validate(props: IEatingBehavior): void {
        if (Guard.isEmpty(props.eatingBehavior)) throw new EmptyStringError();
    }
}
