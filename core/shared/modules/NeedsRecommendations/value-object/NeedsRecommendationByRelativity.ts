import { NeedsRecommendation, NutrientNeedsValue } from "./NeedsRecommendation";

export interface INeedsRecommendationByRelativity {
    percentage:number 
}
export class NeedsRecommendationByRelativity extends NeedsRecommendation<INeedsRecommendationByRelativity> {
    apply(nutrientBasicValue: NutrientNeedsValue): NutrientNeedsValue {
        throw new Error("Method not implemented.");
    }
    
}