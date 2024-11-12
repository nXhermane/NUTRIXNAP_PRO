import { AggregateRoot, ObjectiveType } from "@/core/shared";

export interface IStandardObjective {
type: ObjectiveType

}
export class StandardObjective extends AggregateRoot<IStandardObjective> {
    public validate(): void {
        throw new Error("Method not implemented.");
    }
    
}