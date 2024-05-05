import {
    Entity,
    CreateEntityProps,
    BaseEntityProps,
    RegistrationDate
} from "@shared";

export interface IEatingBehavior {}
export class EatingBehavior extends Entity<IEatingBehavior> {
    constructor(createProps: CreateEntityProps<IEatingBehavior>) {
        super(createProps);
    }

    protected validate(): void {}
}
