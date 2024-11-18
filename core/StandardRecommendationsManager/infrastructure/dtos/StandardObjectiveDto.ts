import { AggregateID, ITimeframe } from "@/core/shared";
import { RecommendationPersistenceType } from "../types";

export interface StandardObjectiveDto {
    id: AggregateID;
    name: string;
    type: "General"| "Measure"
    recommendations: RecommendationPersistenceType[]
    timeframe: ITimeframe;
    measureCode?: string;
    initialValue?: number // Valeur initiale standard
    targetValue?: number // Valeur a atteindre standard
    unit?: string;
    description: string;
}