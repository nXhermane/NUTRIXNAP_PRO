import { AggregateRoot, NeedsRecommendation, ObjectiveStatus, ObjectiveType, Timeframe } from "@/core/shared";
/**
 *  Objectif Nutritionnel 
  * Type d'objectif: modification d'un indicateur de santé ou Objectif général 
  * Timeframe : Plage de temps dans laquelle on doit atteindre cet objectif
  * Description de l'objectif (optionnel)
  * Recommandations 
  * State de l'objectif : en cours..., ended, 
  * si c'est de type mesure ou indicateur de santé , on aura les propriétés suivantes:
          - code du mesure 
    - valeur a laquelle on veut ramener cet  indicateur de santé | ici on peut au lieu de donner juste la valeur a atteindre , on prends une intervalle avec au borne inferieur la valeur actuelle et au borne superieure la valeur a atteindre . cela va permettre d'utiliser la variable temps dans les recommandations de l'objectif 
    - measure unit : unité du mesure 
Ex: augmentation du poids dans une periode de deux semaines 
type : measure
timeframe: deux 
code de mesure : poids 
valeur: [50,54] 
unit: Kg

Analyse : 
    Cela veut dire qu'on doit augmenter le poids de 4kg en deux semaines .
    Augmentation journaliere de 4/14 = augmentation de 0.285kg tous les jours 
    Mais avec cette valeur journaliere on n'est pas sur d'atteindre cet objectif, ce qui necessite un check journalier de l'augmentation du poids et un recalcul automatique des appors alors a la fin du j0  

Ici nous sommes dans le cas des objectifs standard ou les parametres doivent etre modifier avant d'etre appliquer au patient cible 
 Donc les recommandations ici sont variables en fonction du timeframe , de la valeur de l'indicateur de santé 
 Les recommandations par formules speciales vont prendre leurs importances ici  
 */
export interface IStandardObjective {
    name: string;
    type: ObjectiveType
    defaultRecommendation: NeedsRecommendation[]
    timeframe: Timeframe; 
    measureCode: string;
    initialValue: number
    targetValue: number
    unit: string;
    description: string;
    state: ObjectiveStatus
}
export class StandardObjective extends AggregateRoot<IStandardObjective> {
    public validate(): void {
        throw new Error("Method not implemented.");
    }

}