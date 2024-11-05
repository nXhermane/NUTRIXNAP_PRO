import { NeedsRecommendation, NeedsRecommendationContext, NutrientNeedsValue } from "./NeedsRecommendation"

export interface INeedsRecommendationBySubtition {
    value: string
    unit: string
}
export class NeedsRecommendationBySubtition extends NeedsRecommendation<INeedsRecommendationBySubtition> {
    apply(nutrientBasicValue: NutrientNeedsValue, context: NeedsRecommendationContext): NutrientNeedsValue {
        throw new Error("Method not implemented.")
    }

}