import {
    Entity,
    CreateEntityProps,
    Guard,
    EmptyStringError,
    AggregateID,
    PatientMeasurementCategory,
    ArgumentOutOfRangeException
} from "@shared";

export interface IMeasurementType {
    name: string;
    unit: string;
    measureCategory: PatientMeasurementCategory;
    code: string;
    nameTranslate?: {
        inFrench?: string;
        inEnglish?: string;
    };
}

export class MeasurementType extends Entity<IMeasurementType> {
    constructor(createMeasureType: CreateEntityProps<IMeasurementType>) {
        super(createMeasureType);
    }
    get name(): string {
        return this.props.name;
    }
    get unit(): string {
        return this.props.unit;
    }
    get code(): string {
        return this.props.code;
    }
    get measureCategory(): PatientMeasurementCategory {
        return this.props.measureCategory;
    }
    get nameF(): string {
        return this.props?.nameTranslate?.inFrench || this.props.name;
    }
    get nameE(): string {
        return this.props?.nameTranslate?.inEnglish || this.props.name;
    }
    set nameF(value: string) {
        this.props.nameTranslate = {
            ...this.props?.nameTranslate,
            inFrench: value
        };
    }
    set nameE(value: string) {
        this.props.nameTranslate = {
            ...this.props?.nameTranslate,
            inEnglish: value
        };
    }
    validate(): void {
        if (Guard.isEmpty(this.props.name))
            throw new EmptyStringError(
                "Le nom du tyoe de mesure ne peut etre vide"
            );
        if (Guard.isEmpty(this.props.unit))
            throw new EmptyStringError(
                "L'unité du type de mesure ne peut etre vide"
            );
        if (
            !Object.values(PatientMeasurementCategory).includes(
                this.props.measureCategory as PatientMeasurementCategory
            )
        )
            throw new ArgumentOutOfRangeException(
                "Cette categorie de mesure du patient n'est pas prise en charge"
            );
        this._isValid = true;
    }
}
