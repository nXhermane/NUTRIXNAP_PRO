import { INVALID_FOOD_GROUP_CODE_ERROR, EMPTY_FOOD_GROUP_NAME_ERROR } from './../constants';
import { Entity, CreateEntityProps, EmptyStringError } from '@shared';

export interface IFoodGroup {
   foodGroupCode: string;
   foodGroupName: string;
   foodGroupNameF: string;
   foodGroupDescription?: string;
}

export class FoodGroup extends Entity<IFoodGroup> {
   constructor(foodGroupCreate: CreateEntityProps<IFoodGroup>) {
      super(foodGroupCreate);
      this.validate();
   }
   get foodGroupCode(): string {
      return this.props.foodGroupCode;
   }
   get foodGroupName(): string {
      return this.props.foodGroupName;
   }
   get foodGroupNameF(): string {
      return this.props.foodGroupNameF;
   }
   get foodGroupDescription(): string {
      return this.props?.foodGroupDescription || '';
   }
   set foodGroupDescription(foodGroupDescription: string) {
      this.props.foodGroupDescription = foodGroupDescription;
   }

   validate(): void {
      if (!this.props.foodGroupCode || this.props.foodGroupCode.trim() === '') {
         throw new EmptyStringError(INVALID_FOOD_GROUP_CODE_ERROR);
      }
      if (!this.props.foodGroupName || this.props.foodGroupName.trim() === '') {
         throw new EmptyStringError(EMPTY_FOOD_GROUP_NAME_ERROR);
      }
   }
}
