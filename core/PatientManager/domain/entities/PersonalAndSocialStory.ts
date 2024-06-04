import {
    Entity,
    CreateEntityProps,
    Guard,
    ArgumentOutOfRangeException,
    AggregateID,
    MaritalStatus,
    PhysicalActivityLevel,
    Ethnicity,
    GastrointestinalState,
    PittsburghSleepQuality
} from "@shared";

export interface IPersonalAndSocialStory {
    gastrointestinalState: GastrointestinalState;
    sleepQuality: PittsburghSleepQuality;
    isSmoker: boolean;
    isAlcoholConsumer: boolean;
    maritalStatus: MaritalStatus;
    physicalActivity: PhysicalActivityLevel;
    ethnicity: Ethnicity;
    otherInformation: string;
}

export class PersonalAndSocialStory extends Entity<IPersonalAndSocialStory> {
    constructor(createProps: CreateEntityProps<IPersonalAndSocialStory>) {
        if (Guard.isEmpty(createProps.props.isSmoker))
            createProps.props.isSmoker = false;
        if (Guard.isEmpty(createProps.props.isAlcoholConsumer))
            createProps.props.isAlcoholConsumer = false;
        super(createProps);
    }
    get gastrointestinalState(): GastrointestinalState {
        return this.props.gastrointestinalState;
    }
    get sleepQuality(): PittsburghSleepQuality {
        return this.props.sleepQuality;
    }
    get isSmoker(): boolean {
        return this.props.isSmoker;
    }
    get isAlcoholConsumer(): boolean {
        return this.props.isAlcoholConsumer;
    }
    get maritalStatus(): MaritalStatus {
        return this.props.maritalStatus;
    }
    get physicalActivity(): PhysicalActivityLevel {
        return this.props.physicalActivity;
    }
    get ethnicity(): Ethnicity {
        return this.props.ethnicity;
    }
    get otherInformation(): string {
        return this.props.otherInformation;
    }
    set gastrointestinalState(value: GastrointestinalState) {
        this.props.gastrointestinalState = value;
    }
    set sleepQuality(value: PittsburghSleepQuality) {
        this.props.sleepQuality = value;
    }
    set maritalStatus(value: MaritalStatus) {
        this.props.maritalStatus = value;
    }
    set physicalActivity(value: PhysicalActivityLevel) {
        this.props.physicalActivity = value;
    }
    set ethnicity(value: Ethnicity) {
        this.props.ethnicity = value;
    }
    set otherInformation(value: string) {
        this.props.otherInformation = value;
    }
    set isSmoker(value: boolean) {
        this.props.isSmoker = value;
    }
    set isAlcoholConsumer(value: boolean) {
        this.props.isAlcoholConsumer = value;
    }
    validate(): void {
        if (
            !Object.values(GastrointestinalState).includes(
                this.props.gastrointestinalState as GastrointestinalState
            )
        ) {
            throw new ArgumentOutOfRangeException(
                "Invalid gastrointestinal state."
            );
        }
        if (
            !Object.values(PittsburghSleepQuality).includes(
                this.props.sleepQuality as PittsburghSleepQuality
            )
        ) {
            throw new ArgumentOutOfRangeException("Invalid sleep quality.");
        }
        if (!Object.values(MaritalStatus).includes(this.props.maritalStatus)) {
            throw new ArgumentOutOfRangeException("Invalid marital status.");
        }
        if (
            !Object.values(PhysicalActivityLevel).includes(
                this.props.physicalActivity
            )
        ) {
            throw new ArgumentOutOfRangeException(
                "Invalid physical activity level."
            );
        }
        if (!Object.values(Ethnicity).includes(this.props.ethnicity)) {
            throw new ArgumentOutOfRangeException("Invalid ethnicity.");
        }
        this._isValid = true;
    }
}
