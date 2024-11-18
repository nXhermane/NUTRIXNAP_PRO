import { Mapper } from "@/core/shared";
import { StandardObjective } from "../../domain/aggregate/StandardObjective";
import { StandardObjectivePersistenceType } from "../types";
import { StandardObjectiveDto } from "../dtos/StandardObjectiveDto";

export class StandardObjectiveMapper implements Mapper<StandardObjective,StandardObjectivePersistenceType,StandardObjectiveDto>{
    toPersistence(entity: StandardObjective): StandardObjectivePersistenceType {
        throw new Error("Method not implemented.");
    }
    toDomain(record: any): StandardObjective {
        throw new Error("Method not implemented.");
    }
    toResponse(entity: StandardObjective): StandardObjectiveDto {
        throw new Error("Method not implemented.");
    }

}