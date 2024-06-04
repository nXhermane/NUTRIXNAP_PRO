import {
    Contact,
    Address,
    HumanName,
    Result,
    Birthday,
    Sexe,
    Gender,
    Email,
    PhoneNumber,
    AggregateID
} from "@shared";
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
    medicalRecordId: AggregateID;
};

export class PatientFactory {
    constructor() {}
    create(createPatientProps: CreatePatientProps): Result<Patient> {
        try {
            const name = new HumanName(createPatientProps.name);
            const gender = new Gender(createPatientProps.gender as Sexe);
            const contact = new Contact({
                email:  Email.create(createPatientProps.contact.email),
                phoneNumber: new PhoneNumber(createPatientProps.contact.tel)
            });
            const address = new Address({ ...createPatientProps.address });
            const birthday = new Birthday(createPatientProps.birthday);
            const occupation = createPatientProps?.occupation || "";
            const newPatient = new Patient({
                props: {
                    name,
                    gender,
                    contact,
                    address,
                    birthday,
                    occupation,
                    medicalRecordId: createPatientProps.medicalRecordId
                }
            });
            return Result.ok<Patient>(newPatient);
        } catch (e: any) {
            return Result.fail<Patient>(String(e));
        }
    }
}
