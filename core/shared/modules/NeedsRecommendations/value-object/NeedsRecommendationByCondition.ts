import { NeedsRecommendation, NeedsRecommendationContext, NutrientNeedsValue } from "./NeedsRecommendation";


type Condition =  {
    expression: string;
    variableTable: { [variableAlias: string]: string }
}
export interface INeedsRecommendationByCondition <T> {
    condition:Condition 
    recommendation: NeedsRecommendation<T> 
}
export class NeedsRecommendationByCondition<T> extends NeedsRecommendation<INeedsRecommendationByCondition<T>> {
    apply(nutrientBasicValue: NutrientNeedsValue,context: NeedsRecommendationContext): NutrientNeedsValue {
        throw new Error("Method not implemented.");
    }

}