import { AggregateID } from "@/core/shared";
import { StandardMedicalCondition } from "../../domain/aggregate/StandardMedicalCondition";
import { StandardMedicalConditionRepository } from "./interfaces/StandardMedicalConditionRepository";

export class StandardMedicalConditionRepositoryImpl implements StandardMedicalConditionRepository {
    save(medicalCondition: StandardMedicalCondition): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getById(medicalConditionId: AggregateID): Promise<StandardMedicalCondition> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<StandardMedicalCondition[]> {
        throw new Error("Method not implemented.");
    }
    delete(medicalConditonId: AggregateID): Promise<void> {
        throw new Error("Method not implemented.");
    }

}