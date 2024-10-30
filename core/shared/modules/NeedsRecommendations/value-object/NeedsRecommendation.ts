import { ValueObject } from "@/core/shared/domain";
import { RecommendationPriority } from "../RecommendationPriority";
import { Guard } from "@/core/shared/core";
import { EmptyStringError, InvalidReference } from "@/core/shared/exceptions";

export interface INeedsRecommendation<T> {
   priority: RecommendationPriority;
   nutrientTagName: string;
   desciption: string;
   data: T;
}
export type NutrientNeedsValue = { value: number; unit: string };
export abstract class NeedsRecommendation<T> extends ValueObject<INeedsRecommendation<T>> {
   abstract apply(nutrientBasicValue: NutrientNeedsValue): NutrientNeedsValue;
   protected validate(props: INeedsRecommendation<T>): void {
      if (Guard.isEmpty(props.nutrientTagName).succeeded) throw new EmptyStringError("Le Nutriment que vous recommender doit etre indiquer.");
      if (!Object.values(RecommendationPriority).includes(props.priority))
         throw new InvalidReference("La priorité que vous donnez a cette recommendation n'est pas prise en charge pas ce systeme.");
   }
}
