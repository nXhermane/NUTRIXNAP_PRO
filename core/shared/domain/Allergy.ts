import {
    Entity,
    CreateEntityProps,
    BaseEntityProps,
    Guard,
    AggregateID,
    EmptyStringError
} from "@shared";

export interface IAllergy {
    name: string;
    avoidedFoods: Set<AggregateID>;
    description?: string;
    nameTranslate?: {
        inFrench?: string;
        inEnglish?: string;
    };
}

export class Allergy extends Entity<IAllergy> {
    constructor(createAllergyProps: CreateEntityProps<IAllergy>) {
        super(createAllergyProps);
    }
    get name(): string {
        return this.props.name;
    }
    get avoidedFoods(): AggregateID[] {
        return Array.from(this.props.avoidedFoods);
    }
    get description(): string {
        return this.props?.description || "";
    }
    get nameF(): string {
        return this.props?.nameTranslate?.inFrench || this.props.name;
    }
    get nameE(): string {
        return this.props?.nameTranslate?.inEnglish || this.props.name;
    }
    addAvoidedFood(foodId: AggregateID): void {
        if (!this.props.avoidedFoods.has(foodId)) {
            this.props.avoidedFoods.add(foodId);
            this._isValid = false;
        }
    }
    removeAvoidedFood(foodId: AggregateID): void {
        if (this.props.avoidedFoods.has(foodId))
            this.props.avoidedFoods.delete(foodId);
    }
    protected validate(): void {
        if (Guard.isEmpty(this.props.name))
            throw new EmptyStringError(
                "Le nom de l'alergie ne doit pas être vide."
            );
        this._isValid = true;
    }
}
