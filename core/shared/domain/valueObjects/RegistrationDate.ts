import { ArgumentInvalidException } from '../../exceptions';
import { CDate } from './Date';
export class RegistrationDate extends CDate {
   constructor(date: string) {
      super(date);
   }

   protected validate(props: { value: string }): void {
      super.validate(props);
      if (!this.isValideRegistrationDate(props)) {
         throw new ArgumentInvalidException("Date d'enregistrement invalide. Assurez-vous que la date n'est pas dans le future.");
      }
   }
   public isValideRegistrationDate(props?: { value: string }): boolean {
      const currentDate = new Date();
      const registrationDate = new Date(this.props.value || (props as { value: string }).value);
      return currentDate >= registrationDate;
   }
   toString(): string {
      return super.date;
   }
}
