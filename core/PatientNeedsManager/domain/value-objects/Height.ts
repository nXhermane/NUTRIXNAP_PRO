import { ArgumentOutOfRangeException, DomainPrimitive, ExceptionBase, Result, ValueObject } from "@shared";

export class Height extends ValueObject<number> {
   static heightInfLimit = 20;
   static heightSupLimit = 350;

   protected validate(props: DomainPrimitive<number>): void {
      if (props.value < Height.heightInfLimit || props.value >= Height.heightSupLimit)
         throw new ArgumentOutOfRangeException(
            `Taille Invalide . La taille doit etre comprise entre ${Height.heightInfLimit} et ${Height.heightSupLimit}`,
         );
   }

   getValue(): number {
      return this.props.value;
   }
   toMeters(): number {
      return this.props.value / 100;
   }
   toString(): string {
      return this.props.value + " " + "cm";
   }

   static create(value: number): Result<Height> {
      try {
         const height = new Height({ value });
         return Result.ok<Height>(height);
      } catch (error) {
         return error instanceof ExceptionBase
            ? Result.fail<Height>(`[${error.code}]:${error.message}`)
            : Result.fail<Height>(`Erreur inattendue. ${Height?.constructor.name}`);
      }
   }
}
