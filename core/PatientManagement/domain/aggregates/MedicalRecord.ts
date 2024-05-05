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
export interface IMedicalRecord {
    foodDiaries: FoodDiary[];
}

export class MedicalRecord extends AggregateRoot<IMedicalRecord> {
    constructor(createMediaclRecordProps: CreateEntityProps<IMedicalRecord>) {
        super(createMediaclRecordProps);
    }

    protected validate(): void {}
}
