import { NeedsRecommendation, NeedsRecommendationContext, NutrientNeedsValue } from "./NeedsRecommendation";

export interface INeedsRecommendationByFormular {
    formular: string
    variables: { [variableAliasName: string]: string } // Table associant les variables avec les alias 
}
export class NeedsRecommendationByFormular extends NeedsRecommendation<INeedsRecommendationByFormular> {
    apply(nutrientBasicValue: NutrientNeedsValue, context: NeedsRecommendationContext): NutrientNeedsValue {
        throw new Error("Method not implemented.");
    }
}