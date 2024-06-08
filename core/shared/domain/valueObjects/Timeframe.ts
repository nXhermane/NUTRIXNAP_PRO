import { ValueObject } from './../ValueObject';
import { Guard } from './../../core';
import { ArgumentNotProvidedException, ArgumentInvalidException } from '../../exceptions';
import { CDate } from './Date';

export interface ITimeframe {
   start: CDate;
   end: CDate;
}
export class Timeframe extends ValueObject<ITimeframe> {
   constructor(props: ITimeframe) {
      super(props);
   }
   validate(props: ITimeframe): void {
      if (Guard.isEmpty(props.start) || Guard.isEmpty(props.end))
         throw new ArgumentNotProvidedException('La date de debut et la date de fin doit etre fournir.');

      if (!props.start.isBefore(props.end)) throw new ArgumentInvalidException('La date de début doit etre inferieur a la date de fin ou égale');
   }

   get isExpire(): boolean {
      const date = new CDate();
      return date.isAfter(date);
   }
}
