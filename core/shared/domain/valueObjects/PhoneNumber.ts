import { ValueObject } from './../ValueObject';
import { Guard } from './../../core';
import { ArgumentNotProvidedException } from './../../exceptions';
export class PhoneNumber extends ValueObject<string> {
   constructor(numero: string) {
      super({ value: numero });
   }

   protected validate(props: { value: string }): void {
      if (Guard.isEmpty(props.value)) {
         throw new ArgumentNotProvidedException('Le numéro de téléphone ne peut pas être vide.');
      }
   }

   public isValidFormat(): boolean {
      // Expression régulière pour valider un numéro de téléphone au format XXX-XXX-XXXX ou XXXXXXXXXX
      const phoneNumberRegex = /^(\d{3}-\d{3}-\d{4}|\d{10})$/;
      return phoneNumberRegex.test(this.props.value);
   }

   public getAreaCode(): string {
      // Récupérer le code de zone du numéro de téléphone
      const areaCode = this.props.value.replace(/\D/g, '').slice(0, 3);
      return areaCode;
   }

   public getFormattedNumber(): string {
      // Formater le numéro de téléphone en XXX-XXX-XXXX
      const digits = this.props.value.replace(/\D/g, '');
      return digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
   }

   public toString(): string {
      return this.props.value;
   }
}
