import { AggregateID } from '@shared';
export interface MeasurementDto {
   measurementCategory: 'Antropometry' | 'MedicalAnalysis' | 'BodyComposition';
   date: string;
   measureTypeId: AggregateID;
   value: number;
   unit: string;
}
