import { Entity, CreateEntityProps, BaseEntityProps, EmptyStringError, NegativeValueError } from '@shared';
import {
   INVALID_NUTRIENT_VALUE_ERROR,
   INVALID_NUTRIENT_TAGNAME_ERROR,
   INVALID_NUTRIENT_CODE_ERROR,
   EMPTY_NUTRIENT_NAME_ERROR,
   INVALID_NUTRIENT_UNIT_ERROR,
   INVALID_NUTRIENT_DECIMALS_ERROR,
} from './../constants';
export interface INutrient {
   nutrientCode: string;
   nutrientINFOODSTagName: string;
   nutrientValue: number;
   nutrientName: string;
   nutrientUnit: string;
   nutrientDecimals: number;
   originalValue?: string;
   nutrientNameTranslate?: {
      inFrench?: string;
      inEnglish?: string;
   };
}

export class Nutrient extends Entity<INutrient> {
   constructor(createNutrient: CreateEntityProps<INutrient>) {
      super(createNutrient);
      this.validate();
   }
   get nutrientCode(): string {
      return this.props.nutrientCode;
   }
   get nutrientINFOODSTagName(): string {
      return this.props.nutrientINFOODSTagName;
   }
   get nutientNameF(): string {
      return this.props?.nutrientNameTranslate?.inFrench ?? this.props.nutrientName;
   }
   get nutrientNameE(): string {
      return this.props?.nutrientNameTranslate?.inEnglish ?? this.props.nutrientName;
   }
   set nutientNameF(value: string) {
      this.props.nutrientNameTranslate = {
         ...this.props.nutrientNameTranslate,
         inFrench: value,
      };
   }
   set nutientNameE(value: string) {
      this.props.nutrientNameTranslate = {
         ...this.props.nutrientNameTranslate,
         inEnglish: value,
      };
   }
   get nutrientUnit(): string {
      return this.props.nutrientUnit;
   }
   get originalValue(): string {
      return this.props?.originalValue || String(this.props.nutrientValue);
   }
   get nutrientValue(): number {
      return this.props.nutrientValue;
   }
   get nutrientDecimals(): number {
      return this.props.nutrientDecimals;
   }
   set nutrientValue(value: number) {
      this.props.nutrientValue = value;
      this.validate();
   }
   public equals(object: Nutrient) {
      return (
         super.equals(object) &&
         this.props.nutrientCode === object.nutrientCode &&
         this.props.nutrientINFOODSTagName === object.nutrientINFOODSTagName
      );
   }

   validate(): void {
      if (this.props.nutrientValue < 0) {
         throw new NegativeValueError(INVALID_NUTRIENT_VALUE_ERROR);
      }
      if (this.props.nutrientDecimals < 0) {
         throw new NegativeValueError(INVALID_NUTRIENT_DECIMALS_ERROR);
      }
      if (!this.props.nutrientINFOODSTagName || this.props.nutrientINFOODSTagName.trim() === '') {
         throw new EmptyStringError(INVALID_NUTRIENT_TAGNAME_ERROR);
      }
      if (!this.props.nutrientCode || this.props.nutrientCode.trim() === '') {
         throw new EmptyStringError(INVALID_NUTRIENT_CODE_ERROR);
      }
      if (!this.props.nutrientName || this.props.nutrientName.trim() === '') {
         throw new EmptyStringError(EMPTY_NUTRIENT_NAME_ERROR);
      }
      if (!this.props.nutrientUnit || this.props.nutrientUnit.trim() === '') {
         throw new EmptyStringError(INVALID_NUTRIENT_UNIT_ERROR);
      }
   }
}
