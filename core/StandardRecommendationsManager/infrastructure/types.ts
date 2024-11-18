import { IHealthIndicator, ITimeframe } from "@/core/shared";
import { RecommendationPriority } from "@/core/shared/modules/NeedsRecommendations/RecommendationPriority";
export interface Timestamps {
    createdAt: string;
    updatedAt: string;
}
export type RecommendationPersistenceType = {
    priority: RecommendationPriority;
    nutrientTagName: string;
    desciption: string;
    data: any;
    startDate?: string
    endDate?: string;
    condition?: ExpressionPersistenceType
}

export type ExpressionPersistenceType = {
    expression: string;
    variableMappingTable: { [variableName: string]: string };
}

export interface StandardMedicalConditionPersistenceType extends Timestamps {
    id: string
    name: string;
    description: string;
    criteria: ExpressionPersistenceType;
    recommendations: RecommendationPersistenceType[];
    healthIndicators: IHealthIndicator[]
}
export interface StandardObjectivePersistenceType extends Timestamps {
    id: string;
    name: string;
    type: "General" | "Measure"
    recommendations: RecommendationPersistenceType[]
    timeframe: ITimeframe;
    measureCode?: string;
    initialValue?: number // Valeur initiale standard
    targetValue?: number // Valeur a atteindre standard
    unit?: string;
    description: string;
} 