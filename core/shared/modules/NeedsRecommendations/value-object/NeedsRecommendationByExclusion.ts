import { NeedsRecommendation, NeedsRecommendationContext, NutrientNeedsValue } from "./NeedsRecommendation"

export interface INeedsRecommendationByExclusion {
  attribuateValue: number 
  unit: string  
}
export class NeedsRecommendationByExclusion extends NeedsRecommendation<INeedsRecommendationByExclusion> {
    apply(nutrientBasicValue: NutrientNeedsValue,context:NeedsRecommendationContext): NutrientNeedsValue {
        throw new Error("Method not implemented.")
    }
    
}