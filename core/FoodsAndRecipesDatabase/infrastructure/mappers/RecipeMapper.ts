import { Mapper, BaseEntityProps } from "@shared";
import {Recipe} from './../../domain'

export class RecipeMapper implements Mapper<Recipe>{
  toPersistence(recipe:Recipe):any{
    
    
    
    
  }
  toDomain(record:any):Recipe{}
  toResponse(recipe:Recipe):any{}
}