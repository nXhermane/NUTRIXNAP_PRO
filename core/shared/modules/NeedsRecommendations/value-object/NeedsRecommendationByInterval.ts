import { INeedsRecommendation, NeedsRecommendation, NutrientNeedsValue } from "./NeedsRecommendation";


export interface INeedsRecommendationByInterval {
min: number
max: number 
unit: string
}

export class NeedsRecommendationByInterval extends NeedsRecommendation<INeedsRecommendationByInterval> {
    apply(nutrientBasicValue: NutrientNeedsValue): NutrientNeedsValue {
        throw new Error("Method not implemented.");
    }

}
