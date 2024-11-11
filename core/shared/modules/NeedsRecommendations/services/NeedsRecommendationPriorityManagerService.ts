import { NeedsRecommendation, NeedsRecommendationContext, NutrientNeedsValue } from "../value-object/NeedsRecommendation";
import { INeedsRecommendationPriorityManagerService } from "./interfaces/NeedsRecommendationPriorityManagerService";

export class NeedsRecommendationPriorityManagerService implements INeedsRecommendationPriorityManagerService {

    private sortRecommendationByPriority(recommendations: NeedsRecommendation<any>[]): NeedsRecommendation<any>[] {
        return recommendations.sort((a, b) => a.unpack().priority - a.unpack().priority);
    }
    resolve(nutirentBasicValue: NutrientNeedsValue, context: NeedsRecommendationContext, recommendations: NeedsRecommendation<any>[]): NutrientNeedsValue {
        const sortedRecommendations = this.sortRecommendationByPriority(recommendations)
        let maxNutrientValue: NutrientNeedsValue
        for (let i = 0; i < sortedRecommendations.length; i++) {
            const currentRecommendation = sortedRecommendations[i]
            if (i === 0) { // If is the hight priority recommendation 
                const recommendationResult = currentRecommendation.apply(nutirentBasicValue, context)
                maxNutrientValue = recommendationResult
                continue
            }
        }
        throw new Error()
    }

}