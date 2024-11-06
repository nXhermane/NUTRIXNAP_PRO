import { nutritionFormulars } from "@/core/PatientNeedsManager/infrastructure/database/patientNeeds";
import { INeedsRecommendation, NeedsRecommendation, NeedsRecommendationContext, NutrientNeedsValue } from "./NeedsRecommendation";


export interface INeedsRecommendationByInterval {
    min: number
    max: number
    unit: string
}

export class NeedsRecommendationByInterval extends NeedsRecommendation<INeedsRecommendationByInterval> {
    protected _apply(nutrientBasicValue: NutrientNeedsValue, context: NeedsRecommendationContext): NutrientNeedsValue {
        const nutrientBaseValueIsLowerToMinValue = nutrientBasicValue.value < this.props.data.min
        if (nutrientBaseValueIsLowerToMinValue) return { value: this.props.data.min, unit: this.props.data.unit }
        const nutrientBaseValueIsSuperiorToMaxValue = nutrientBasicValue.value > this.props.data.max
        if (nutrientBaseValueIsSuperiorToMaxValue) return { value: this.props.data.max, unit: this.props.data.unit }
        return nutrientBasicValue
    }

}
