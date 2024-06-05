import {
  Entity,
  CreateEntityProps,
  Guard,
  ArgumentInvalidException,
  ArgumentNotProvidedException,
  NegativeValueError,
  EmptyStringError,
  Timeframe,
  ITimeframe,
  ObjectiveType,
  ObjectiveStatus,
  AggregateID
} from "@shared";

export interface IObjective {
  type: ObjectiveType;
  timeframe: Timeframe;
  measureTypeId?: AggregateID;
  value?: number;
  description?: string;
  status: ObjectiveStatus;
}
export class Objective extends Entity<IObjective> {
  constructor(createObjective: CreateEntityProps<IObjective>) {
    super(createObjective);
  }
  get type(): ObjectiveType {
    return this.props.type;
  }
  get timeframe(): ITimeframe {
    return this.props.timeframe.unpack();
  }
  get measureTypeId(): AggregateID | undefined {
    return this.props?.measureTypeId;
  }
  get value(): number | undefined {
    return this.props?.value;
  }
  get description(): string {
    return this.props.description || "";
  }
  get status(): ObjectiveStatus {
    if (
      this.props.timeframe.isExpire &&
      this.props.status === ObjectiveStatus.InProgress
    ) {
      return ObjectiveStatus.NotAchieved;
    } else {
      return this.props.status;
    }
  }
  set type(type: ObjectiveType) {
    this.props.type = type;
    if (this.isMeasure()) {
      if (Guard.isEmpty(this.props.value)) this.props.value = 1;
      if (Guard.isEmpty(this.props.measureTypeId))
        this.props.measureTypeId = 2;
    }
    this.validate();
  }
  set status(status: ObjectiveStatus) {
    if (
      this.props.timeframe.isExpire &&
      status === ObjectiveStatus.InProgress
    ) {
      this.props.status = ObjectiveStatus.NotAchieved;
    } else {
      this.props.status = status as ObjectiveStatus;
    }
  }
  set description(val: string) {
    this.props.description = val;
  }
  set value(val: number | undefined) {
    this.props.value = val;
    this.validate();
  }
  set measureTypeId(typeId: AggregateID) {
    this.props.measureTypeId = typeId;
    this.validate();
  }
  set timeframe(frame: Timeframe) {
    this.props.timeframe = frame;
    this.status = ObjectiveStatus.InProgress;
  }
  isMeasure(): boolean {
    return this.props.type === ObjectiveType.Measure
  }
  validate(): void {
    if (Guard.isEmpty(this.props.type))
      throw new ArgumentNotProvidedException(
        "Le type d'objective doit etre fournit."
      );
    if (this.props.type === ObjectiveType.Measure) {
      const isValidMeasureObjective =
        !Guard.isEmpty(this.props.value) ||
        !Guard.isEmpty(this.props.measureTypeId);
      if (!isValidMeasureObjective) {
        throw new ArgumentNotProvidedException(
          "Pour un objective de type Measure , la valeur et le type de mesure doit etre fournir."
        );
        if ((this.props.value as number) < 0)
          throw new NegativeValueError(
            "La valeur du measure ne peut etre inferieur a zéro."
          );
      }
    } else if (this.props.type === ObjectiveType.General) {
      const isValidGeneralObjectie =
        !Guard.isEmpty(this.props.description) &&
        Guard.isEmpty(this.props.value) &&
        Guard.isEmpty(this.props.measureTypeId);
      if (!isValidGeneralObjectie)
        throw new EmptyStringError(
          "Pour un objective de type Generale , la description doit etre fournir."
        );
    } else {
      throw new ArgumentInvalidException(
        "Le type d'objective est invalide ou non prise en charge."
      );
    }
  }
}
