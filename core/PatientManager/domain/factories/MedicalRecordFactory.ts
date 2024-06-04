import { MedicalRecord } from "./../aggregates/MedicalRecord";
import {
    AggregateID,
    Time,
    GastrointestinalState,
    PittsburghSleepQuality,
    MaritalStatus,
    PhysicalActivityLevel,
    Ethnicity,
    Result
} from "@shared";
import { MedicalStory } from "./../entities/MedicalStory";
import { FoodStory } from "./../entities/FoodStory";
import { ConsultationInformation } from "./../entities/ConsultationInformation";
import { PatientMeasurements } from "./../entities/PatientMeasurements";
import { PersonalAndSocialStory } from "./../entities/PersonalAndSocialStory";
import { FoodDiary } from "./../entities/FoodDiary";
import { Objective } from "./../entities/Objective";
import { EatingBehavior } from "./../value-objects/EatingBehavior";
import { WaterConsumptionRange } from "./../value-objects/WaterConsumptionRange";
import { FavoriteFood, IFavoriteFood } from "./../value-objects/FavoriteFood";
import { Aversion, IAversion } from "./../value-objects/Aversion";
type CreateFoodStoryProps = {
    bedtime?: string;
    wakeUpTime?: string;
    dietTypes?: AggregateID[];
    favoriteFoods?: { name: string; foodId: AggregateID }[];
    foodAversions?: { name: string; foodId: AggregateID }[];
    allergies?: AggregateID[];
    foodIntolerances?: AggregateID[];
    nutritionalDeficiencies?: AggregateID[];
    waterConsumption?: {
        lowerBound: number;
        upperBound: number | null;
    };
    numberOfMealsPerDay?: number;
    otherInformation?: string;
};
type CreateMedicalStoryProps = {
    pathologies?: string;
    drugie?: string;
    personalBackground?: string;
    familyBackgroun?: string;
    otherInformation?: string;
};
type CreatePersonalAndSocialStoryProps = {
    gastrointestinalState:
        | "Regular"
        | "Diarrhea"
        | "Constipation"
        | "Irregular";
    sleepQuality: "Very good" | "Good" | "Fair" | "Poor" | "Very poor";
    isSmoker: boolean;
    isAlcoholConsumer: boolean;
    maritalStatus: "Single" | "Married" | "Divorced" | "Widowed";
    physicalActivity:
        | "Sedentary"
        | "Lightly Active"
        | "Moderately Active"
        | "Very Active"
        | "Extremely Active";
    ethnicity: "Caucasian" | "Asian" | "Black";
    otherInformation: string;
};
type CreateConsultationInformationProps = {
    consultationMotive: string;
    expectations: string;
    clinicalObjective: string;
    otherInformation: string;
};
export type CreateMedicalRecordProps = {
    patientId: AggregateID;
    medicalStory?: CreateMedicalStoryProps;
    foodStory?: CreateFoodStoryProps;
    personalAndSocialStory?: CreatePersonalAndSocialStoryProps;
    consultationInformation?: CreateConsultationInformationProps;
};
export class MedicalRecordFactory {
    constructor() {}
    async create(
        createMedicalRecordProps: CreateMedicalRecordProps
    ): Promise<Result<MedicalRecord>> {
        try {
            const medicalStoryResult = this.createMedicalStory(
                createMedicalRecordProps?.medicalStory
            );
            if (medicalStoryResult.isFailure)
                throw new Error(String(medicalStoryResult.err));
            const medicalStory = medicalStoryResult.val;
            const foodStoryResult = await this.createFoodStory(
                createMedicalRecordProps?.foodStory
            );
            if (foodStoryResult.isFailure) throw new Error(String(foodStoryResult.err));
            const foodStory = foodStoryResult.val;
            const consultationInfoResult = this.createConsultationInformation(
                createMedicalRecordProps?.consultationInformation
            );
            if (consultationInfoResult.isFailure)
                throw new Error(String(consultationInfoResult.err));
            const consultationInformation = consultationInfoResult.val;
            const measure = new PatientMeasurements({
                props: {
                    anthropometricMeasurements: [],
                    bodyCompositionMeasurements: [],
                    medicalAnalysisResults: []
                }
            });
            const personalAndSocialStoryResult =
                this.createPersonalAndSocialStory(
                    createMedicalRecordProps?.personalAndSocialStory
                );
            if (personalAndSocialStoryResult.isFailure)
                throw new Error(String(personalAndSocialStoryResult.err));
            const personalAndSocialStory = personalAndSocialStoryResult.val;
            const medicalRecordProps = {
                patientId: createMedicalRecordProps.patientId,
                foodDiaries: [] as FoodDiary[],
                objectives: [] as Objective[],
                eatingBehaviors: [] as EatingBehavior[],
                medicalStory,
                consultationInformation,
                measure,
                personalAndSocialStory,
                foodStory
            };
            const medicalRecord = new MedicalRecord({
                props: medicalRecordProps
            });
            return Result.ok<MedicalRecord>(medicalRecord);
        } catch (e: any) {
            return Result.fail<MedicalRecord>(String(e));
        }
    }

    private async createFoodStory(
        foodStory?: CreateFoodStoryProps
    ): Promise<Result<FoodStory>> {
        try {
            const foodIds:AggregateID[] = [];
            const newfoodStory = new FoodStory({
                props: {
                    bedtime: new Time(foodStory?.bedtime || "22:30"),
                    wakeUpTime: new Time(foodStory?.wakeUpTime || "06:00"),
                    dietTypes: new Set<AggregateID>(foodStory?.dietTypes || []),
                    favoriteFoods:
                        foodStory?.favoriteFoods?.map((favFood: any) => {
                            const newFavFood = new FavoriteFood(favFood);
                            newFavFood.validateFoodId(foodIds);
                            return newFavFood;
                        }) || [],
                    foodAversions:
                        foodStory?.foodAversions?.map((aveFood: IAversion) => {
                            const newAver = new Aversion(aveFood);
                            newAver.validateFoodId(foodIds);
                            return newAver;
                        }) || [],
                    allergies: new Set<AggregateID>(foodStory?.allergies || []),
                    foodIntolerances: new Set<AggregateID>(
                        foodStory?.foodIntolerances || []
                    ),
                    nutritionalDeficiencies: new Set<AggregateID>(
                        foodStory?.nutritionalDeficiencies || []
                    ),
                    waterConsumption: new WaterConsumptionRange(
                        foodStory?.waterConsumption || {
                            lowerBound: 1.5,
                            upperBound: 2
                        }
                    ),
                    numberOfMealsPerDay: foodStory?.numberOfMealsPerDay || 3,
                    otherInformation: foodStory?.otherInformation || ""
                }
            });
            return Result.ok<FoodStory>(newfoodStory);
        } catch (e: any) {
            return Result.fail<FoodStory>(String(e));
        }
    }
    private createMedicalStory(
        medicalStory?: CreateMedicalStoryProps
    ): Result<MedicalStory> {
        try {
            const newMedicalStory = new MedicalStory({
                props: {
                    pathologies: medicalStory?.pathologies || "",
                    drugie: medicalStory?.drugie || "",
                    personalBackground: medicalStory?.personalBackground || "",
                    familyBackground: medicalStory?.familyBackgroun || "",
                    otherInformation: medicalStory?.otherInformation || ""
                }
            });
            return Result.ok<MedicalStory>(newMedicalStory);
        } catch (e: any) {
            return Result.fail<MedicalStory>(String(e));
        }
    }
    private createPersonalAndSocialStory(
        personalAndSocialStory?: CreatePersonalAndSocialStoryProps
    ): Result<PersonalAndSocialStory> {
        try {
            const newPersAndSocStory = new PersonalAndSocialStory({
                props: {
                    gastrointestinalState:
                        (personalAndSocialStory?.gastrointestinalState as GastrointestinalState) ||
                        GastrointestinalState.Regular,
                    sleepQuality:
                        (personalAndSocialStory?.sleepQuality as PittsburghSleepQuality) ||
                        PittsburghSleepQuality.Good,
                    isSmoker: personalAndSocialStory?.isSmoker || false,
                    isAlcoholConsumer:
                        personalAndSocialStory?.isAlcoholConsumer || false,
                    maritalStatus:
                        (personalAndSocialStory?.maritalStatus as MaritalStatus) ||
                        MaritalStatus.Single,
                    physicalActivity:
                        (personalAndSocialStory?.physicalActivity as PhysicalActivityLevel) ||
                        PhysicalActivityLevel.Sedentary,
                    ethnicity:
                        (personalAndSocialStory?.ethnicity as Ethnicity) ||
                        Ethnicity.Caucasian,
                    otherInformation:
                        personalAndSocialStory?.otherInformation || ""
                }
            });
            return Result.ok<PersonalAndSocialStory>(newPersAndSocStory);
        } catch (e: any) {
            return Result.fail<PersonalAndSocialStory>(String(e));
        }
    }
    private createConsultationInformation(
        consultationInformation?: CreateConsultationInformationProps
    ): Result<ConsultationInformation> {
        try {
            const newConsultInfo = new ConsultationInformation({
                props: {
                    consultationMotive:
                        consultationInformation?.consultationMotive || "",
                    expectations: consultationInformation?.expectations || "",
                    clinicalObjective:
                        consultationInformation?.clinicalObjective || "",
                    otherInformation:
                        consultationInformation?.otherInformation || ""
                }
            });
            return Result.ok<ConsultationInformation>(newConsultInfo);
        } catch (e: any) {
            return Result.fail<ConsultationInformation>(String(e));
        }
    }
}
