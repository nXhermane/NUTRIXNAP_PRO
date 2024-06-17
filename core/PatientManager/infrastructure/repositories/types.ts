import { AggregateID } from "@shared";
export interface Timestamps {
   createdAt: string;
   updatedAt: string;
}

export interface PatientPersistenceType extends Timestamps {
   id: AggregateID;
   name: string;
   gender: "M" | "F" | "O";
   contact: string;
   address: string;
   birthday: string;
   occupation: string;
   images: string;
   medicalRecordId: AggregateID;
}
