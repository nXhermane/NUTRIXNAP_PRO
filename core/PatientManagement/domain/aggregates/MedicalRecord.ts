import {
    AggregateRoot,
    CreateEntityProps,
    BaseEntityProps,
    AggregateID,
    InvalidReference,
    Guard,
    ArgumentInvalidException
} from "@shared";

export interface IMedicalRecord {}

export class MedicalRecord extends AggregateRoot<IMedicalRecord> {
    constructor(createMediaclRecordProps: CreateEntityProps<IMedicalRecord>) {
        super(createMediaclRecordProps);
    }

    protected validate(): void {}
}
