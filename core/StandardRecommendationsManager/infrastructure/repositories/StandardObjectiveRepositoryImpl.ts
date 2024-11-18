import { AggregateID } from "@/core/shared";
import { StandardObjective } from "../../domain/aggregate/StandardObjective";
import { StandardObjectiveRepository } from "./interfaces/StandardObjectiveRepository";

export class StandardObjectiveRepositoryImpl implements StandardObjectiveRepository {
    save(objective: StandardObjective): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getById(objectiveId: AggregateID): Promise<StandardObjective> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<StandardObjective[]> {
        throw new Error("Method not implemented.");
    }
    delete(objectiveId: AggregateID): Promise<void> {
        throw new Error("Method not implemented.");
    }

}