import {
    Entity,
    CreateEntityProps,
    BaseEntityProps,
    RegistrationDate,
    Image,
    Guard,
    ArgumentInvalidException
} from "@shared";

import {
    FoodDiaryMealEntry,
    IFoodDiaryMealEntry
} from "./../value-objects/FoodDiaryMealEntry";

export interface IFoodDiary {
    date: RegistrationDate;
    meal: FoodDiaryMealEntry;
    observation: string;
    images: Image[];
}

export class FoodDiary extends Entity<IFoodDiary> {
    constructor(createFoodDiaryProps: CreateEntityProps<IFoodDiary>) {
        super(createFoodDiaryProps);
    }

    set date(date: RegistrationDate) {
        this.props.date = date;
    }
    get date(): string {
        return this.props.date.toString();
    }
    get meal(): IFoodDiaryMealEntry {
        return this.props.meal.unpack();
    }
    get observation(): string {
        return this.props.observation;
    }
    get images(): string[] {
        return this.props.images.map((img: Image) => img.uri);
    }
    set meal(meal: FoodDiaryMealEntry) {
        this.props.meal = meal;
        this.validate();
    }
    protected validate(): void {
        if (Guard.isEmpty(this.props.meal))
            throw new ArgumentInvalidException(
                "Lr repas consommée ne doit pas etre vide."
            );
        this._isValid = true;
    }
}
