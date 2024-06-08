import { Entity, CreateEntityProps } from './Entity';

export abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {
   public publishEvents() {
      console.log('Event publier par: ', this.constructor.name);
   }
}
