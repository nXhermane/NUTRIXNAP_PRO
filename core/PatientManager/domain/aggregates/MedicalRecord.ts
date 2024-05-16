import {
    AggregateRoot,
    CreateEntityProps,
    BaseEntityProps,
    AggregateID,
    InvalidReference,
    Guard,
    ArgumentInvalidException
} from "@shared";
import { FoodDiary } from "./../entities/FoodDiary";
import { AnthropometricMeasurement } from "./../value-objects/AnthropometricMeasurement";
export interface IMedicalRecord {
    foodDiaries: FoodDiary[];
    anthropometricData: AnthropometricMeasurement[];
}

export class MedicalRecord extends AggregateRoot<IMedicalRecord> {
    constructor(createMediaclRecordProps: CreateEntityProps<IMedicalRecord>) {
        super(createMediaclRecordProps);
    }

    protected validate(): void {}
}
