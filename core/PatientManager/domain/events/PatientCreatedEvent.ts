import { IDomainEvent, AggregateID } from "@shared";

export class PatientCreatedEvent implements IDomainEvent {
   public dateTimeOccurred: Date;
   public data: any;
   constructor(patientId: AggregateID) {
      this.dateTimeOccurred = new Date();
      this.data = { patientId };
   }
   getAggregateId(): AggregateID {
      return this.data.patientId;
   }
}