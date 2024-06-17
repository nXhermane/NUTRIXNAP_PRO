import { AggregateID } from "./../Entity";
export interface IDomainEvent {
   dateTimeOccurred: Date;
   getAggregateId(): AggregateID;
}
