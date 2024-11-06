import { NeedsRecommendation, NeedsRecommendationContext, NutrientNeedsValue } from "./NeedsRecommendation"

export interface INeedsRecommendationByExclusion {
  attribuateValue?: number  // La valeur par defaut est zéro 
  unit?: string
}
export class NeedsRecommendationByExclusion extends NeedsRecommendation<INeedsRecommendationByExclusion> {
  protected _apply(nutrientBasicValue: NutrientNeedsValue, context: NeedsRecommendationContext): NutrientNeedsValue {
    return {
      value: this.props.data.attribuateValue || 0,
      unit: this.props.data.unit || nutrientBasicValue.unit
    }
  }

}