import { ValueObject, ValueObjectProps } from './../ValueObject';
import { InvalidArgumentFormatError } from './../../exceptions';
export class Email extends ValueObject<string> {
   private static isValidEmailFormat(value: string): boolean {
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      return emailRegex.test(value);
   }

   protected validate(props: ValueObjectProps<string>): void {
      if (!Email.isValidEmailFormat(props.value)) {
         throw new InvalidArgumentFormatError("Le format de l'adresse email est invalide.");
      }
   }

   static create(value: string): Email {
      return new Email({ value });
   }

   getValue(): string {
      return this.props.value;
   }
}
