import { NeedsRecommendation, NeedsRecommendationContext, NutrientNeedsValue } from "./NeedsRecommendation"

export interface INeedsRecommendationByCycle<T> {
    startDate: Date
    endDate: Date
    recommendation: NeedsRecommendation<T>
}
export class NeedsRecommendationByCycle<T> extends NeedsRecommendation<INeedsRecommendationByCycle<T>> {
    apply(nutrientBasicValue: NutrientNeedsValue,context:NeedsRecommendationContext): NutrientNeedsValue {
        throw new Error("Method not implemented.")
    }

}