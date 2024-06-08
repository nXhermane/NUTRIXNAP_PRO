import { Mapper, Contact, Email, PhoneNumber, Sexe, Address, IAddress, Gender, Birthday, HumanName, Image } from '@shared';
import { PatientDto } from './../dtos/PatientDto';
import { Patient } from './../../domain';
import { PatientPersistenceType } from './../repositories/types';
export class PatientMapper implements Mapper<Patient, PatientPersistenceType, PatientDto> {
   toPersistence(entity: Patient): PatientPersistenceType {
      return {
         id: entity.id,
         name: entity.name,
         gender: entity.gender,
         contact: JSON.stringify(entity.contact),
         address: JSON.stringify(entity.address),
         birthday: entity.birthday,
         occupation: entity.occupation as string,
         images: JSON.stringify(entity.images),
         medicalRecordId: entity.medicalRecordId,
         createdAt: entity.createdAt,
         updatedAt: entity.updatedAt,
      };
   }
   toDomain(record: PatientPersistenceType): Patient {
      const contactData = JSON.parse(record.contact);
      const contact = new Contact({
         email: new Email(contactData.email),
         phoneNumber: new PhoneNumber(contactData.phoneNumber),
      });
      const addressData = JSON.parse(record.address);
      const address = new Address(addressData as IAddress);
      const gender = new Gender(record.gender as Sexe);
      const name = new HumanName(record.name);
      const birthday = new Birthday(record.birthday);
      const imagesData = JSON.parse(record.images) as string[];
      const images = imagesData.map((uri: string) => new Image(uri));
      const { occupation, createdAt, updatedAt, id, medicalRecordId } = record;
      return new Patient({
         id,
         createdAt,
         updatedAt,
         props: {
            name,
            contact,
            address,
            gender,
            birthday,
            occupation,
            medicalRecordId,
            images,
         },
      });
   }
   toResponse(entity: Patient): PatientDto {
      return {
         id: entity.id,
         name: entity.name,
         gender: entity.gender,
         contact: entity.contact,
         address: entity.address,
         birthday: entity.birthday,
         occupation: entity.occupation,
         images: entity.images,
         medicalRecordId: entity.medicalRecordId,
         createdAt: entity.createdAt,
         updatedAt: entity.updatedAt,
      };
   }
}
