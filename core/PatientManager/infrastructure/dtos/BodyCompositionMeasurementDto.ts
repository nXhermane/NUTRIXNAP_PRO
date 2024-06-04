import { AggregateID } from "@shared";

export interface BodyCompositionMeasurementDto {
    date: string;
    measureTypeId: AggregateID;
    value: number;
    unit: string;
}
