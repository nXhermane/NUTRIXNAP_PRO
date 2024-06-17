import {
   AggregateRoot,
   CreateEntityProps,
   BaseEntityProps,
   HumanName,
   Gender,
   Contact,
   Address,
   Birthday,
   AggregateID,
   InvalidReference,
   Guard,
   ArgumentInvalidException,
   IAddress,
   EmptyStringError,
   Image,
} from "@shared";

export interface IPatient {
   name: HumanName;
   gender: Gender;
   contact: Contact;
   address: Address;
   birthday: Birthday;
   occupation?: string;
   medicalRecordId: AggregateID;
   images: Image[];
}
export class Patient extends AggregateRoot<IPatient> {
   constructor(createProps: CreateEntityProps<IPatient>) {
      super(createProps);
   }
   get name(): string {
      return this.props.name.fullName;
   }

   set name(name: HumanName) {
      this.props.name = name;
   }

   get gender(): "M" | "F" | "O" {
      return this.props.gender.sexe;
   }

   set gender(gender: Gender) {
      this.props.gender = gender;
   }

   get contact(): { email: string; phoneNumber: string } {
      return {
         email: this.props.contact.email.getValue(),
         phoneNumber: this.props.contact.phoneNumber.toString(),
      };
   }

   set contact(contact: Contact) {
      this.props.contact = contact;
   }

   get address(): IAddress {
      return this.props.address.unpack();
   }

   set address(address: Address) {
      this.props.address = address;
   }

   get birthday(): string {
      return this.props.birthday.birthday;
   }

   set birthday(birthday: Birthday) {
      this.props.birthday = birthday;
   }

   get occupation(): string | undefined {
      return this.props.occupation;
   }

   set occupation(occupation: string | undefined) {
      this.props.occupation = occupation;
   }

   get medicalRecordId(): AggregateID {
      return this.props.medicalRecordId;
   }

   get images(): string[] {
      return this.props.images.map((img: Image) => img.uri);
   }

   set images(images: Image[]) {
      this.props.images = images;
   }

   getImage(): Image[] {
      return this.props.images;
   }

   isMale(): boolean {
      return this.props.gender.isMale();
   }

   isFemale(): boolean {
      return this.props.gender.isFemale();
   }
   get age(): number {
      return this.props.birthday.age;
   }
   validate(): void {
      if (Guard.isEmpty(this.props.medicalRecordId).succeeded) throw new EmptyStringError("L'id du dossier medicale ne doit pas etre vide.");
      if (!this.props.name.isValid()) throw new ArgumentInvalidException("Le nom du patient doit etre valide");
      if (!this.props.gender.isValid()) throw new ArgumentInvalidException("Le genre du patient doit etre valide");
      if (!this.props.contact.isValid()) throw new ArgumentInvalidException("Le contact du patient doit etre valide");
      if (!this.props.address.isValid()) throw new ArgumentInvalidException("L'address du patient doit etre valide");
      if (!this.props.birthday.isValid() || this.props.birthday.age < 5)
         throw new ArgumentInvalidException("La date de naissance du patient doit etre valide ou l'age doit au moins 5 ans");
   }
}
