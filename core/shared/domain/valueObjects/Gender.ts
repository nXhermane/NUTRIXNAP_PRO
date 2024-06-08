import { ValueObject } from './../ValueObject';
import { Guard } from './../../core';
import { ArgumentInvalidException } from '../../exceptions';
export enum Sexe {
   MALE = 'M',
   FEMALE = 'F',
   OTHER = 'O',
}

export class Gender extends ValueObject<Sexe> {
   constructor(sexe: Sexe) {
      super({ value: sexe });
   }

   protected validate(props: { value: Sexe }): void {
      if (!Object.values(Sexe).includes(props.value)) {
         throw new ArgumentInvalidException('Sexe invalide.');
      }
   }

   public isMale(): boolean {
      return this.props.value === Sexe.MALE;
   }

   public isFemale(): boolean {
      return this.props.value === Sexe.FEMALE;
   }

   public isOther(): boolean {
      return this.props.value === Sexe.OTHER;
   }
   get sexe(): 'M' | 'F' | 'O' {
      return this.props.value;
   }
   public toString(): string {
      switch (this.props.value) {
         case Sexe.MALE:
            return 'Masculin';
         case Sexe.FEMALE:
            return 'Féminin';
         case Sexe.OTHER:
            return 'Autre';
         default:
            return 'Inconnu';
      }
   }
}
