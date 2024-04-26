import { ValueObject } from "@shared";

export interface IMealsCategory {
    categoryId: number;
    name: string;
    nameF: string;
}
export class MealsCategory extends ValueObject<IMealsCategory> {
    constructor(props: IMealsCategory) {
        super(props);
        this.validate(props);
    }

    validate(props: IMealsCategory): void {}
}
