import { NeedsRecommendation, NeedsRecommendationContext, NutrientNeedsValue } from "./NeedsRecommendation"

export interface INeedsRecommendationBySubtition {
    value: number
    unit: string
}
export class NeedsRecommendationBySubtition extends NeedsRecommendation<INeedsRecommendationBySubtition> {
    protected _apply(nutrientBasicValue: NutrientNeedsValue, context: NeedsRecommendationContext): NutrientNeedsValue {
        return this.props.data
    }

}