import { INeedsRecommendation, NeedsRecommendation, NeedsRecommendationContext, NutrientNeedsValue } from "./NeedsRecommendation";


export interface INeedsRecommendationByInterval {
    min: number
    max: number
    unit: string
}

export class NeedsRecommendationByInterval extends NeedsRecommendation<INeedsRecommendationByInterval> {
    apply(nutrientBasicValue: NutrientNeedsValue, context: NeedsRecommendationContext): NutrientNeedsValue {
        throw new Error("Method not implemented.");
    }

}
