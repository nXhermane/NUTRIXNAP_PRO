import { Contact, Address, HumanName, Result, Birthday, Sexe, Gender, Email, PhoneNumber, AggregateID, Image } from "@shared";
import { Patient } from "./../aggregates/Patient";
export type CreatePatientProps = {
   name: string;
   gender: "M" | "F" | "O";
   contact: { email: string; tel: string };
   address: {
      street?: string;
      city?: string;
      postalCode?: string;
      country: string;
   };
   birthday: string;
   occupation?: string;
   images: string[];
};

export class PatientFactory {
   constructor() {}
   create(createPatientProps: CreatePatientProps): Result<Patient> {
      try {
         const name = new HumanName(createPatientProps.name);
         const gender = new Gender(createPatientProps.gender as Sexe);
         const contact = new Contact({
            email: Email.create(createPatientProps.contact.email).val,
            phoneNumber: new PhoneNumber(createPatientProps.contact.tel),
         });
         const address = new Address({ ...createPatientProps.address });
         const birthday = new Birthday(createPatientProps.birthday);
         const occupation = createPatientProps?.occupation || "";
         const images = createPatientProps.images.map((uri: string) => new Image(uri));
         const newPatient = new Patient({
            props: {
               name,
               gender,
               contact,
               address,
               birthday,
               occupation,
               images,
            },
         });
         return Result.ok<Patient>(newPatient);
      } catch (e: any) {
         return Result.fail<Patient>(String(e));
      }
   }
}
