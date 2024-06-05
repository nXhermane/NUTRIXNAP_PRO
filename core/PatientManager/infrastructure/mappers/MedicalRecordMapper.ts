import {
  MedicalRecord,
  EatingBehavior,
  FoodDiary,
  Objective,
  IObjective,
  FoodDiaryFoodItem,
  AnthropometricMeasurement,
  IAnthropometricMeasurement,
  BodyCompositionMeasurement,
  IBodyCompositionMeasurement,
  MedicalAnalysisResult,
  IMedicalAnalysisResult,
  FoodDiaryMealEntry,
  ConsultationInformation,
  FoodStory,
  FavoriteFood,
  IFavoriteFood,
  Aversion,
  IAversion,
  WaterConsumptionRange,
  IWaterConsumptionRange,
  MedicalStory,
  PersonalAndSocialStory,
  PatientMeasurements
} from "./../../domain";
import {
  Mapper,
  BaseEntityProps,
  Entity,
  ObjectiveType,
  RegistrationDate,
  Image,
  Time,
  AggregateID,
  PhysicalActivityLevel,
  MaritalStatus,
  GastrointestinalState,
  Ethnicity,
  PittsburghSleepQuality,
  Timeframe,
  ITimeframe,
  ObjectiveStatus,
  Quantity
} from "@shared";
import {
  MedicalRecordPersistenceType,
  FoodDiaryPersistenceType,
  ConsultationInformationPersistenceType,
  FoodStoryPersistenceType,
  MedicalStoryPersistenceType,
  ObjectivePersistenceType,
  PersonalAndSocialStoryPersistenceType,
  PatientMeasurementPersistenceType
} from "./../repositories/types";
import { MedicalRecordDto } from "./../dtos/MedicalRecordDto";
import { AnthropometricMeasurementDto } from "./../dtos/AnthropometricMeasurementDto";
import { BodyCompositionMeasurementDto } from "./../dtos/BodyCompositionMeasurementDto";
import { MedicalAnalysisResultDto } from "./../dtos/MedicalAnalysisResultDto";
import { FoodDiaryDto } from "./../dtos/FoodDiaryDto"
import { ConsultationInformationDto } from "./../dtos/ConsultationInformationDto"
import { FoodStoryDto } from "./../dtos/FoodStoryDto"
import { MedicalStoryDto } from "./../dtos/MedicalStoryDto"
import { PersonalAndSocialStoryDto } from "./../dtos/PersonalAndSocialStoryDto"
import { PatientMeasurementDto } from "./../dtos/PatientMeasurementDto"
import { EatingBehaviorDto } from "./../dtos/EatingBehaviorDto"
import { ObjectiveDto } from "./../dtos/ObjectiveDto"
export class MedicalRecordMapper
  implements
  Mapper<MedicalRecord, MedicalRecordPersistenceType, MedicalRecordDto>
{
  toPersistence(entity: MedicalRecord): MedicalRecordPersistenceType {
    const medicalRecordProps = entity.getProps();
    const medicalRecord = { createdAt: medicalRecordProps.createdAt, updatedAt: medicalRecordProps.updatedAt, id: medicalRecordProps.id, status: "Active", eatingBehaviors: JSON.stringify(medicalRecordProps.eatingBehaviors.map((eatBeh: EatingBehavior) => ({ date: eatBeh.date.toString(), eatingBehavior: eatBeh.eatingBehavior }))) };
    const foodDiaries = medicalRecordProps.foodDiaries.map((foodDiary: FoodDiary) => this.foodDiaryToPersistence(foodDiary, medicalRecordProps.id));
    const consultationInformation = this.consultationInformationToPersistence(medicalRecordProps.consultationInformation, medicalRecordProps.id)
    const foodStory = this.foodStpryToPersistence(medicalRecordProps.foodStory, medicalRecordProps.id)
    const medicalStory = this.medicalStoryToPersistence(medicalRecordProps.medicalStory, medicalRecordProps.id)
    const personalAndSocialStory = this.personalAndSocialStoryToPersistence(medicalRecordProps.personalAndSocialStory, medicalRecordProps.id)
    const patientMeasurement = this.patientMeasurementToPersistence(medicalRecordProps.measure, medicalRecordProps.id)
    const objectives = medicalRecordProps.objectives.map((obj: Objective) => this.objectiveToPersistence(obj, medicalRecordProps.id));
    return {
      medicalRecord,
      foodDiaries,
      consultationInformation,
      foodStory,
      medicalStory,
      personalAndSocialStory,
      patientMeasurement,
      objectives
    } as MedicalRecordPersistenceType;
  }
  toDomain(record: MedicalRecordPersistenceType): MedicalRecord {
    const { medicalRecord, foodDiaries, consultationInformation, foodStory, medicalStory, personalAndSocialStory, patientMeasurement, objectives } = record;
    const newFoodDiaries = foodDiaries.map((foodDiary: FoodDiaryPersistenceType) => this.foodDiaryToDomain(foodDiary));
    const newConsultationInformation = this.consultationInformationToDomain(consultationInformation);
    const newFoodStory = this.foodStoryToDomain(foodStory);
    const newMedicalStory = this.medicalStoryToDomain(medicalStory);
    const newPersonalAndSocialStory = this.personalAndSocialStoryToDomain(personalAndSocialStory);
    const measure = this.patientMeasurementToDomain(patientMeasurement)
    const newObjectives = objectives.map((obj: ObjectivePersistenceType) => this.objectiveToDomain(obj))
    const newEatingBehaviors = this.eatingBehaviorsToDomain(medicalRecord.eatingBehaviors)
    return new MedicalRecord({
      id: medicalRecord.id,
      createdAt: medicalRecord.createdAt,
      updatedAt: medicalRecord.updatedAt,
      props: {
        foodDiaries: newFoodDiaries,
        consultationInformation: newConsultationInformation,
        foodStory: newFoodStory,
        medicalStory: newMedicalStory,
        personalAndSocialStory: newPersonalAndSocialStory,
        measure,
        objectives: newObjectives,
        eatingBehaviors: newEatingBehaviors
      }
    })
  }
  toResponse(entity: MedicalRecord): MedicalRecordDto {
    const medicalRecordProps = entity.getProps();
    const foodDiaries = medicalRecordProps.foodDiaries.map((foodDiary: FoodDiary) => this.foodDiaryToResponse(foodDiary));
    const consultationInformation = this.consultationInformationToResponse(medicalRecordProps.consultationInformation)
    const foodStory = this.foodStoryToResponse(medicalRecordProps.foodStory)
    const medicalStory = this.medicalStoryToResponse(medicalRecordProps.medicalStory);
    const personalAndSocialStory = this.personalAndSocialStoryToResponse(medicalRecordProps.personalAndSocialStory)
    const eatingBehaviors = this.eatingBehaviorsToResponse(medicalRecordProps.eatingBehaviors)
    const objectives = medicalRecordProps.objectives.map((obj: Objective) => this.objectiveToResponse(obj));
    const measure = this.patientMeasurementToResponse(medicalRecordProps.measure)
    return {
      foodDiaries,
      foodStory,
      medicalStory,
      consultationInformation,
      personalAndSocialStory,
      eatingBehaviors,
      objectives,
      measure,
      id: medicalRecordProps.id,
      createdAt: medicalRecordProps.createdAt,
      updatedAt: medicalRecordProps.updatedAt
    } as MedicalRecordDto;
  }

  private foodDiaryToDomain(foodDiary: FoodDiaryPersistenceType): FoodDiary {
    const date = new RegistrationDate(foodDiary.date);
    const imageArray = JSON.parse(foodDiary.images) as string[];
    const images = imageArray.map((uri: string) => new Image(uri));
    const observation = foodDiary.observation;
    const mealData = JSON.parse(foodDiary.meal);
    const foodItems = mealData.foodItems.map((item: any) => new FoodDiaryFoodItem({
      foodId: item.foodId,
      recipeId: item.recipeId,
      isRecipe: item.isRecipe,
      isHomeMade: item.isHomeMade,
      quantity: new Quantity(item.quantity)
    })
    );
    const meal = new FoodDiaryMealEntry({
      foodItems,
      withCompany: mealData.withCompany,
      watchingTv: mealData.watchingTv,
      sittingAtTable: mealData.sittingAtTable,
      mealTypeId: mealData.mealTypeId,
      description: mealData.description
    });

    return new FoodDiary({
      id: foodDiary.id,
      createdAt: foodDiary.createdAt,
      updatedAt: foodDiary.updatedAt,
      props: { date, images, meal, observation }
    });
  }

  private consultationInformationToDomain(consultationInformation: ConsultationInformationPersistenceType): ConsultationInformation {
    const { id, createdAt, updatedAt, medicalRecordId, ...otherProps } = consultationInformation;
    return new ConsultationInformation({ id, createdAt, updatedAt, props: { ...otherProps } });
  }

  private foodStoryToDomain(foodStory: FoodStoryPersistenceType): FoodStory {
    const bedtime = new Time(foodStory.bedtime);
    const wakeUpTime = new Time(foodStory.wakeUpTime);
    const dietTypes = new Set(JSON.parse(foodStory.dietTypes) as AggregateID[]);
    const allergies = new Set(JSON.parse(foodStory.allergies) as AggregateID[]);
    const foodIntolerances = new Set(JSON.parse(foodStory.foodIntolerances) as AggregateID[]);
    const nutritionalDeficiencies = new Set(JSON.parse(foodStory.nutritionalDeficiencies) as AggregateID[]);
    const waterData = JSON.parse(foodStory.waterConsumption) as IWaterConsumptionRange;
    const waterConsumption = new WaterConsumptionRange(waterData);
    const numberOfMealsPerDay = foodStory.numberOfMealsPerDay;
    const otherInformation = foodStory.otherInformation;
    const favoriteFoodsData = JSON.parse(foodStory.favoriteFoods) as IFavoriteFood[];
    const favoriteFoods = favoriteFoodsData.map((favFood: IFavoriteFood) => new FavoriteFood(favFood));
    const foodAversionsData = JSON.parse(foodStory.foodAversions) as IAversion[];
    const foodAversions = foodAversionsData.map((foodAv: IAversion) => new Aversion(foodAv));
    const { id, createdAt, updatedAt } = foodStory;
    return new FoodStory({
      id,
      createdAt,
      updatedAt,
      props: { bedtime, wakeUpTime, dietTypes, allergies, foodIntolerances, nutritionalDeficiencies, waterConsumption, numberOfMealsPerDay, otherInformation, favoriteFoods, foodAversions }
    });
  }
  private medicalStoryToDomain(medicalStory: MedicalStoryPersistenceType): MedicalStory {
    const { id, createdAt, updatedAt, medicalRecordId, ...otherProps } = medicalStory;
    return new MedicalStory({ id, createdAt, updatedAt, props: { ...otherProps } });
  }
  private personalAndSocialStoryToDomain(personalAndSocialStory: PersonalAndSocialStoryPersistenceType): PersonalAndSocialStory {
    const { id, createdAt, updatedAt, medicalRecordId, ...otherProps } = personalAndSocialStory;
    return new PersonalAndSocialStory({
      id,
      createdAt,
      updatedAt,
      props: {
        gastrointestinalState: otherProps.gastrointestinalState as GastrointestinalState,
        sleepQuality: otherProps.sleepQuality as PittsburghSleepQuality,
        isSmoker: otherProps.isSmoker,
        isAlcoholConsumer: otherProps.isAlcoholConsumer,
        maritalStatus: otherProps.maritalStatus as MaritalStatus,
        physicalActivity: otherProps.physicalActivity as PhysicalActivityLevel,
        ethnicity: otherProps.ethnicity as Ethnicity,
        otherInformation: otherProps.otherInformation
      }
    });
  }
  private objectiveToDomain(objective: ObjectivePersistenceType): Objective {
    const type = objective.type as ObjectiveType;
    const timeframe = new Timeframe(JSON.parse(objective.timeframe) as ITimeframe);
    const body = JSON.parse(objective.body);
    const status = objective.status as ObjectiveStatus;
    const { id, createdAt, updatedAt } = objective;
    return new Objective({ id, createdAt, updatedAt, props: { type, timeframe, ...body, status } as IObjective });
  }
  private patientMeasurementToDomain(patientMeasurement: PatientMeasurementPersistenceType): PatientMeasurements {
    const anthropometricMeasurementsData = JSON.parse(patientMeasurement.anthropometricMeasurements) as (Omit<IAnthropometricMeasurement, 'date'> & { date: string })[]
    const anthropometricMeasurements = anthropometricMeasurementsData.map((anth: (Omit<IAnthropometricMeasurement, 'date'> & { date: string })) => new AnthropometricMeasurement({ date: new RegistrationDate(anth.date), measureTypeId: anth.measureTypeId, value: anth.value, unit: anth.unit }))
    const bodyCompositionMeasurementsData = JSON.parse(patientMeasurement.bodyCompositionMeasurements) as (Omit<IBodyCompositionMeasurement, 'date'> & { date: string })[]
    const bodyCompositionMeasurements = bodyCompositionMeasurementsData.map((body: (Omit<IBodyCompositionMeasurement, 'date'> & { date: string })) => new BodyCompositionMeasurement({ date: new RegistrationDate(body.date), measureTypeId: body.measureTypeId, value: body.value, unit: body.unit }))
    const medicalAnalysisResultsData = JSON.parse(patientMeasurement.medicalAnalysisResults) as (Omit<IMedicalAnalysisResult, 'date'> & { date: string })[]
    const medicalAnalysisResults = medicalAnalysisResultsData.map((meReAn: (Omit<IMedicalAnalysisResult, 'date'> & { date: string })) => new MedicalAnalysisResult({ date: new RegistrationDate(meReAn.date), measureTypeId: meReAn.measureTypeId, value: meReAn.value, unit: meReAn.unit }))
    const { id, createdAt, updatedAt } = patientMeasurement;
    return new PatientMeasurements({ id, createdAt, updatedAt, props: { anthropometricMeasurements, bodyCompositionMeasurements, medicalAnalysisResults } })
  }
  private eatingBehaviorsToDomain(eatingBehaviors: string): EatingBehavior[] {
    const eatingBehaviorData = JSON.parse(eatingBehaviors) as {
      date: string
      eatingBehavior: string
    }[]
    return eatingBehaviorData.map((eatBeh: {
      date: string;
      eatingBehavior: string
    }) => new EatingBehavior({
      date: new RegistrationDate(eatBeh.date),
      eatingBehavior: eatBeh.eatingBehavior
    })
    )
  }
  private foodStpryToPersistence(foodStory: FoodStory, medicalRecordId: AggregateID): FoodStoryPersistenceType {
    return {
      id: foodStory.id,
      bedtime: foodStory.bedtime,
      wakeUpTime: foodStory.wakeUpTime,
      dietTypes: JSON.stringify(foodStory.dietTypes),
      favoriteFoods: JSON.stringify(foodStory.favoriteFoods),
      foodAversions: JSON.stringify(foodStory.foodAversions),
      allergies: JSON.stringify(foodStory.allergies),
      foodIntolerances: JSON.stringify(foodStory.foodIntolerances),
      nutritionalDeficiencies: JSON.stringify(foodStory.nutritionalDeficiencies),
      waterConsumption: JSON.stringify(foodStory.waterConsumption),
      numberOfMealsPerDay: foodStory.numberOfMealsPerDay,
      otherInformation: foodStory.otherInformation,
      createdAt: foodStory.createdAt,
      updatedAt: foodStory.updatedAt,
      medicalRecordId
    } as FoodStoryPersistenceType
  }
  private consultationInformationToPersistence(consultationInformation: ConsultationInformation, medicalRecordId: AggregateID): ConsultationInformationPersistenceType {
    return {
      id: consultationInformation.id,
      consultationMotive: consultationInformation.consultationMotive,
      expectations: consultationInformation.expectations,
      clinicalObjective: consultationInformation.clinicalObjective,
      otherInformation: consultationInformation.otherInformation,
      createdAt: consultationInformation.createdAt,
      updatedAt: consultationInformation.updatedAt,
      medicalRecordId,
    } as ConsultationInformationPersistenceType
  }
  private foodDiaryToPersistence(foodDiary: FoodDiary, medicalRecordId: AggregateID): FoodDiaryPersistenceType {
    return {
      id: foodDiary.id,
      date: foodDiary.date,
      meal: JSON.stringify({
        withCompany: foodDiary.meal.withCompany,
        watchingTv: foodDiary.meal.watchingTv,
        sittingAtTable: foodDiary.meal.sittingAtTable,
        foodItems: foodDiary.meal.foodItems.map((foodItem: FoodDiaryFoodItem) => ({
          foodId: foodItem.foodId,
          recipeId: foodItem.recipeId,
          isRecipe: foodItem.isRecipe,
          isHomeMade: foodItem.isHomeMade,
          quantity: foodItem.quantity
        })
        ),
        mealTypeId: foodDiary.meal.mealTypeId,
        description: foodDiary.meal.description
      }),
      observation: foodDiary.observation,
      images: JSON.stringify(foodDiary.images),
      createdAt: foodDiary.createdAt,
      updatedAt: foodDiary.updatedAt,
      medicalRecordId
    } as FoodDiaryPersistenceType
  }
  private medicalStoryToPersistence(medicalStory: MedicalStory, medicalRecordId: AggregateID): MedicalStoryPersistenceType {
    return {
      ...medicalStory.getProps(),
      medicalRecordId
    }
  }
  private personalAndSocialStoryToPersistence(personalAndSocialStory: PersonalAndSocialStory, medicalRecordId: AggregateID): PersonalAndSocialStoryPersistenceType {
    return {
      ...personalAndSocialStory.getProps(),
      medicalRecordId
    }
  }
  private objectiveToPersistence(objective: Objective, medicalRecordId: AggregateID): ObjectivePersistenceType {
    return {
      id: objective.id,
      type: objective.type,
      timeframe: JSON.stringify({ start: objective.timeframe.start.toString(), end: objective.timeframe.end.toString() }),
      body: JSON.stringify(objective.isMeasure() ? { measureTypeId: objective.measureTypeId, value: objective.value, description: objective.description } : { description: objective.description }),
      status: objective.status,
      createdAt: objective.createdAt,
      updatedAt: objective.updatedAt,
      medicalRecordId
    }
  }
  private patientMeasurementToPersistence(patientMeasurement: PatientMeasurements, medicalRecordId: AggregateID): PatientMeasurementPersistenceType {
    return {
      id: patientMeasurement.id,
      anthropometricMeasurements: JSON.stringify(patientMeasurement.anthropometricMeasurements.map((anth: IAnthropometricMeasurement) => ({ date: anth.date.toString(), measureTypeId: anth.measureTypeId, value: anth.value, unit: anth.unit }))),
      bodyCompositionMeasurements: JSON.stringify(patientMeasurement.bodyCompositionMeasurements.map((body: IBodyCompositionMeasurement) => ({ date: body.date.toString(), measureTypeId: body.measureTypeId, value: body.value, unit: body.unit }))),
      medicalAnalysisResults: JSON.stringify(patientMeasurement.medicalAnalysisResults.map((meAnRe: IMedicalAnalysisResult) => ({ date: meAnRe.date.toString(), measureTypeId: meAnRe.measureTypeId, value: meAnRe.value, unit: meAnRe.unit }))),
      createdAt: patientMeasurement.createdAt,
      updatedAt: patientMeasurement.updatedAt,
      medicalRecordId
    }
  }
  private foodDiaryToResponse(foodDiary: FoodDiary): FoodDiaryDto {
    return {
      id: foodDiary.id,
      createdAt: foodDiary.createdAt,
      updatedAt: foodDiary.updatedAt,
      date: foodDiary.date,
      meal: {
        withCompany: foodDiary.meal.withCompany,
        watchingTv: foodDiary.meal.watchingTv,
        sittingAtTable: foodDiary.meal.sittingAtTable,
        foodItems: foodDiary.meal.foodItems.map((foodItem: FoodDiaryFoodItem) => ({
          foodId: foodItem.foodId,
          recipeId: foodItem.recipeId,
          isRecipe: foodItem.isRecipe,
          isHomeMade: foodItem.isHomeMade,
          quantity: foodItem.quantity
        })
        ),
        mealTypeId: foodDiary.meal.mealTypeId,
        description: foodDiary.meal.description
      },
      observation: foodDiary.observation,
      images: foodDiary.images
    }
  }
  private consultationInformationToResponse(consultationInformation: ConsultationInformation): ConsultationInformationDto {
    return {
      ...consultationInformation.getProps()
    }
  }
  private foodStoryToResponse(foodStory: FoodStory): FoodStoryDto {
    return {
      id: foodStory.id,
      createdAt: foodStory.createdAt,
      updatedAt: foodStory.updatedAt,
      bedtime: foodStory.bedtime,
      wakeUpTime: foodStory.wakeUpTime,
      dietTypes: foodStory.dietTypes,
      favoriteFoods: foodStory.favoriteFoods,
      foodAversions: foodStory.foodAversions,
      allergies: foodStory.allergies,
      foodIntolerances: foodStory.foodIntolerances,
      nutritionalDeficiencies: foodStory.nutritionalDeficiencies,
      waterConsumption: foodStory.waterConsumption,
      numberOfMealsPerDay: foodStory.numberOfMealsPerDay,
      otherInformation: foodStory.otherInformation
    }
  }
  private medicalStoryToResponse(medicalStory: MedicalStory): MedicalStoryDto {
    return { ...medicalStory.getProps() }
  }
  private personalAndSocialStoryToResponse(personalAndSocialStory: PersonalAndSocialStory): PersonalAndSocialStoryDto {
    return { ...personalAndSocialStory.getProps() }
  }
  private eatingBehaviorsToResponse(eatingBehaviors: EatingBehavior[]): EatingBehaviorDto[] {
    return eatingBehaviors.map((eatBeh: EatingBehavior) => ({ date: eatBeh.date, eatingBehavior: eatBeh.eatingBehavior }));
  }
  private objectiveToResponse(objective: Objective): ObjectiveDto {
    return {
      id: objective.id,
      createdAt: objective.createdAt,
      updatedAt: objective.updatedAt,
      type: objective.type,
      timeframe: { start: objective.timeframe.start.toString(), end: objective.timeframe.end.toString() },
      body: objective.isMeasure() ? { measureTypeId: objective.measureTypeId as string, value: objective.value as number, description: objective.description } : { description: objective.description },
      status: objective.status
    }
  }
  private patientMeasurementToResponse(patientMeasurement: PatientMeasurements): PatientMeasurementDto {
    return {
      anthropometricMeasurements:
        patientMeasurement.anthropometricMeasurements.map((anthM: IAnthropometricMeasurement) => ({
          date: anthM.date.toString(),
          measureTypeId: anthM.measureTypeId,
          value: anthM.value,
          unit: anthM.unit
        })) as AnthropometricMeasurementDto[],
      bodyCompositionMeasurements:
        patientMeasurement.bodyCompositionMeasurements.map((bodyM: IBodyCompositionMeasurement) => ({
          date: bodyM.date.toString(),
          measureTypeId: bodyM.measureTypeId,
          value: bodyM.value,
          unit: bodyM.unit
        })) as BodyCompositionMeasurementDto[],
      medicalAnalysisResults: patientMeasurement.medicalAnalysisResults.map((meReM: IMedicalAnalysisResult) => ({
        date: meReM.date.toString(),
        measureTypeId: meReM.measureTypeId,
        value: meReM.value,
        unit: meReM.unit
      })) as MedicalAnalysisResultDto[],
      id: patientMeasurement.id,
      createdAt: patientMeasurement.createdAt,
      updatedAt: patientMeasurement.updatedAt
    }
  }
}
