import { MedicalRecord } from "./../aggregates/MedicalRecord";
import {
  AggregateID,
  Time,
  GastrointestinalState,
  PittsburghSleepQuality,
  MaritalStatus,
  PhysicalActivityLevel,
  Ethnicity,
  Result,
  IQuantity,
  Quantity,
  RegistrationDate,
  DateManager,
  Image
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
import { FoodDiaryFoodItem } from "./../value-objects/FoodDiaryFoodItem"
import { FoodDiaryMealEntry } from "./../value-objects/FoodDiaryMealEntry"
import { IFoodRecipeServiceDataProvider } from "@foodAndRecipe"
type FoodItemProps = {
  foodId?: AggregateID;
  recipeId?: AggregateID;
  isRecipe: boolean;
  isHomeMade: boolean;
  quantity: IQuantity;
}
type FoodMealEntryProps = {
  withCompany: boolean;
  watchingTv: boolean;
  sittingAtTable: boolean;
  foodItems: FoodItemProps[];
  mealTypeId: AggregateID;
  description: string;
}
export type CreateFoodDiaryProps = {
  date: Date,
  meal: FoodMealEntryProps
  observation: string;
  images: string[];
}
export type CreateFoodStoryProps = {
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
export type CreateMedicalStoryProps = {
  pathologies?: string;
  drugie?: string;
  personalBackground?: string;
  familyBackgroun?: string;
  otherInformation?: string;
};
export type CreatePersonalAndSocialStoryProps = {
  gastrointestinalState?:
  | "Regular"
  | "Diarrhea"
  | "Constipation"
  | "Irregular";
  sleepQuality?: "Very good" | "Good" | "Fair" | "Poor" | "Very poor";
  isSmoker?: boolean;
  isAlcoholConsumer?: boolean;
  maritalStatus?: "Single" | "Married" | "Divorced" | "Widowed";
  physicalActivity?:
  | "Sedentary"
  | "Lightly Active"
  | "Moderately Active"
  | "Very Active"
  | "Extremely Active";
  ethnicity?: "Caucasian" | "Asian" | "Black";
  otherInformation?: string;
};
export type CreateConsultationInformationProps = {
  consultationMotive?: string;
  expectations?: string;
  clinicalObjective?: string;
  otherInformation?: string;
};
export type CreateMedicalRecordProps = {
  medicalStory?: CreateMedicalStoryProps;
  foodStory?: CreateFoodStoryProps;
  personalAndSocialStory?: CreatePersonalAndSocialStoryProps;
  consultationInformation?: CreateConsultationInformationProps;
};
export class MedicalRecordFactory {
  constructor(private foodAndRecipeDataProvider: IFoodRecipeServiceDataProvider) { }
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

  async createFoodStory(
    foodStory?: CreateFoodStoryProps
  ): Promise<Result<FoodStory>> {
    try {
      const foodIds: AggregateID[] = await this.foodAndRecipeDataProvider.getAllFoodIds();
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
  createMedicalStory(
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
  createPersonalAndSocialStory(
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
  createConsultationInformation(
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
  async createFoodDiary(foodDiary: CreateFoodDiaryProps): Promise<Result<FoodDiary>> {
    try {
      const mealTypeIds = await this.foodAndRecipeDataProvider.getAllMealTypeIds() 
      const foodIds = await  this.foodAndRecipeDataProvider.getAllFoodIds() 
      const recipeIds = await this.foodAndRecipeDataProvider.getAllRecipeIds() 
      const { date, meal, images, ...otherFoodDiaryProps } = foodDiary
      const { foodItems, ...othetMealProps } = meal
      const newFoodItems = foodItems.map((item: FoodItemProps) => {
        const { quantity, ...otherProps } = item
        const newQuantity = new Quantity(item.quantity)
        const newFoodItem = new FoodDiaryFoodItem({ ...otherProps, quantity: newQuantity })
        newFoodItem.validateFoodId(foodIds)
        newFoodItem.validateRecipeId(recipeIds)
        return newFoodItem
      })

      const newMeal = new FoodDiaryMealEntry({
        foodItems: newFoodItems,
        ...othetMealProps
      })
      newMeal.validateMealType(mealTypeIds)
      const newImages = images.map((uri: string) => new Image(uri))
      const newFoodDiary = new FoodDiary({
        props: {
          date: new RegistrationDate(DateManager.formatDate(date)),
          meal: newMeal,
          images: newImages,
          ...otherFoodDiaryProps
        }
      })
      return Result.ok<FoodDiary>(newFoodDiary)
    } catch (e: any) {
      return Result.fail<FoodDiary>(String(e))
    }
  }
}
