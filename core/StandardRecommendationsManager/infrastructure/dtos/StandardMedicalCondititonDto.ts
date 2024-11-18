import { AggregateID, IHealthIndicator } from "@/core/shared";
import { ExpressionPersistenceType, RecommendationPersistenceType } from "../types";

export interface StandardMedicalConditionDto {
    id: AggregateID
    name: string;
    description: string;
    criteria: ExpressionPersistenceType;
    recommendations: RecommendationPersistenceType[];
    healthIndicators: IHealthIndicator[]
}