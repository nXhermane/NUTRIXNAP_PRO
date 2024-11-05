import { NeedsRecommendation, NeedsRecommendationContext, NutrientNeedsValue } from "./NeedsRecommendation";

export interface INeedsRecommendationByRelativity {
    percentage: number
}
export class NeedsRecommendationByRelativity extends NeedsRecommendation<INeedsRecommendationByRelativity> {
    apply(nutrientBasicValue: NutrientNeedsValue, conext: NeedsRecommendationContext): NutrientNeedsValue {
        throw new Error("Method not implemented.");
    }

}