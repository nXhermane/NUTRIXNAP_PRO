import { Entity, CreateEntityProps } from "./Entity";

export abstract class AggregateRoot<EntityProps extends object> extends Entity<EntityProps> {
  private _eventHandlers: Array<() => void> = [];

  constructor(props: CreateEntityProps<EntityProps>, eventHandlers?: Array<() => void>) {
    super(props);
    if (eventHandlers) {
      this._eventHandlers.push(...eventHandlers);
    }
  }

  public publishEvents() {
    console.log(`Events published by: ${this.constructor.name}`);
    this._eventHandlers.forEach((handler) => handler());
  }

  public subscribe(handler: () => void) {
    this._eventHandlers.push(handler);
  }
}
