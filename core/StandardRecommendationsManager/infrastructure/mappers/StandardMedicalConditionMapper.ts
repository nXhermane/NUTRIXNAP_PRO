import { Mapper } from "@/core/shared";
import { StandardMedicalCondition } from "../../domain/aggregate/StandardMedicalCondition";
import { StandardMedicalConditionDto } from "../dtos/StandardMedicalCondititonDto";
import { StandardMedicalConditionPersistenceType } from "../types";

export class StandardMedicalConditionMapper implements Mapper<StandardMedicalCondition, StandardMedicalConditionPersistenceType, StandardMedicalConditionDto> {
    toPersistence(entity: StandardMedicalCondition): StandardMedicalConditionPersistenceType {
        return {
            id: entity.id as string,
            name: entity.name,
            description: entity.description,
            criteria: entity.criteria,
            recommendations: entity.defaultRecommendation.map(recommendation => recommendation.unpack()),
            healthIndicators: entity.healthIndicators.map(healthIndicator => healthIndicator.unpack()),
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        } as StandardMedicalConditionPersistenceType;
    }
    toDomain(record: StandardMedicalConditionPersistenceType): StandardMedicalCondition {
        

        const standardCondition = new StandardMedicalCondition({
            id: record.id,
           props: {
            name: record.name,
            description: record.description,
            criteria: record.criteria,
            defaultRecommendation: record.recommendations.map(recommendation => NeedsRecommendation.create({
                recommendation: recommendation
            }).unwrap()),
            healthIndicators: record.healthIndicators.map(healthIndicator => HealthIndicator.create({
                healthIndicator: healthIndicator
            }).unwrap()),
           }
            createdAt: record.createdAt,
            updatedAt: record.updatedAt,
        })
    }
    toResponse(entity: StandardMedicalCondition): StandardMedicalConditionDto {
        throw new Error("Method not implemented.");
    }

}