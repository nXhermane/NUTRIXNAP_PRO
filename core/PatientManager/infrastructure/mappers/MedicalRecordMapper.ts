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
  PatientMeasurements,

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
export class MedicalRecordMapper
  implements
  Mapper<MedicalRecord, MedicalRecordPersistenceType, MedicalRecordDto>
{
  toPersistence(entity: MedicalRecord): MedicalRecordPersistenceType {
    const medicalRecordProps = entity.getProps();
    const medicalRecord = {
      id: medicalRecordProps.id,
      status: "Active",
      eatingBehaviors: JSON.stringify(medicalRecordProps.eatingBehaviors.map((eatBeh: EatingBehavior) => ({
        date: eatBeh.date.toString(),
        eatingBehavior: eatBeh.eatingBehavior
      })
      )
      )
    };
    const foodDiaries: FoodDiaryPersistenceType[] = medicalRecordProps.foodDiaries.map((foodDiary: FoodDiary) => ({
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
      medicalRecordId: medicalRecordProps.id,
      createdAt: foodDiary.createdAt,
      updatedAt: foodDiary.updatedAt
    }) as FoodDiaryPersistenceType
    );
    const consultationInformation: ConsultationInformationPersistenceType = {
      id: medicalRecordProps.consultationInformation.id,
      consultationMotive: medicalRecordProps.consultationInformation.consultationMotive,
      expectations: medicalRecordProps.consultationInformation.expectations,
      clinicalObjective: medicalRecordProps.consultationInformation.clinicalObjective,
      otherInformation: medicalRecordProps.consultationInformation.otherInformation,
      medicalRecordId: medicalRecordProps.id,
      createdAt: medicalRecordProps.consultationInformation.createdAt,
      updatedAt: medicalRecordProps.consultationInformation.updatedAt
    };

    const foodStory: FoodStoryPersistenceType = {
      id: medicalRecordProps.foodStory.id,
      bedtime: medicalRecordProps.foodStory.bedtime,
      wakeUpTime: medicalRecordProps.foodStory.wakeUpTime,
      dietTypes: JSON.stringify(medicalRecordProps.foodStory.dietTypes),
      favoriteFoods: JSON.stringify(medicalRecordProps.foodStory.favoriteFoods),
      foodAversions: JSON.stringify(medicalRecordProps.foodStory.foodAversions),
      allergies: JSON.stringify(medicalRecordProps.foodStory.allergies),
      foodIntolerances: JSON.stringify(medicalRecordProps.foodStory.foodIntolerances),
      nutritionalDeficiencies: JSON.stringify(medicalRecordProps.foodStory.nutritionalDeficiencies),
      waterConsumption: JSON.stringify(medicalRecordProps.foodStory.waterConsumption),
      numberOfMealsPerDay: medicalRecordProps.foodStory.numberOfMealsPerDay,
      otherInformation: medicalRecordProps.foodStory.otherInformation,
      medicalRecordId: medicalRecordProps.id,
      createdAt: medicalRecordProps.foodStory.createdAt,
      updatedAt: medicalRecordProps.foodStory.updatedAt
    };
    const medicalStory: MedicalStoryPersistenceType = {
      ...medicalRecordProps.medicalStory.getProps(),
      medicalRecordId: medicalRecordProps.id
    };
    const personalAndSocialStory = {
      ...medicalRecordProps.personalAndSocialStory.getProps(),
      medicalRecordId: medicalRecordProps.id
    };
    const patientMeasurement = {
      id: medicalRecordProps.measure.id,
      anthropometricMeasurements: JSON.stringify(medicalRecordProps.measure.anthropometricMeasurements),
      bodyCompositionMeasurements: JSON.stringify(medicalRecordProps.measure.bodyCompositionMeasurements),
      medicalAnalysisResults: JSON.stringify(medicalRecordProps.measure.medicalAnalysisResults),
      medicalRecordId: medicalRecordProps.id
    };
    const objectives: ObjectivePersistenceType[] = medicalRecordProps.objectives.map((obj: Objective) =>
      ({
        id: obj.id,
        type: obj.type,
        timeframe: JSON.stringify({ start: obj.timeframe.start.toString(), end: obj.timeframe.end.toString() }),
        body: JSON.stringify({ measureTypeId: obj.measureTypeId, value: obj.value, description: obj.description }),
        status: obj.status,
        medicalRecordId: medicalRecordProps.id
      }) as ObjectivePersistenceType
    );
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
    const foodDiaries = medicalRecordProps.foodDiaries.map((foodDiary: FoodDiary) => ({
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
    })
    );
    const consultationInformation = { ...medicalRecordProps.consultationInformation.getProps() };
    const foodStory = {
      id: medicalRecordProps.foodStory.id,
      createdAt: medicalRecordProps.foodStory.createdAt,
      updatedAt: medicalRecordProps.foodStory.updatedAt,
      bedtime: medicalRecordProps.foodStory.bedtime,
      wakeUpTime: medicalRecordProps.foodStory.wakeUpTime,
      dietTypes: medicalRecordProps.foodStory.dietTypes,
      favoriteFoods: medicalRecordProps.foodStory.favoriteFoods,
      foodAversions: medicalRecordProps.foodStory.foodAversions,
      allergies: medicalRecordProps.foodStory.allergies,
      foodIntolerances: medicalRecordProps.foodStory.foodIntolerances,
      nutritionalDeficiencies: medicalRecordProps.foodStory.nutritionalDeficiencies,
      waterConsumption: medicalRecordProps.foodStory.waterConsumption,
      numberOfMealsPerDay: medicalRecordProps.foodStory.numberOfMealsPerDay,
      otherInformation: medicalRecordProps.foodStory.otherInformation
    };
    const medicalStory = { ...medicalRecordProps.medicalStory.getProps() };
    const personalAndSocialStory = { ...medicalRecordProps.personalAndSocialStory.getProps() };
    const eatingBehaviors = medicalRecordProps.eatingBehaviors.map((eatBeh: EatingBehavior) => ({ date: eatBeh.date, eatingBehavior: eatBeh.eatingBehavior }));
    const objectives = medicalRecordProps.objectives.map((obj: Objective) => ({
      id: obj.id,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt,
      type: obj.type,
      timeframe: { start: obj.timeframe.start.toString(), end: obj.timeframe.end.toString() },
      body: obj.type === ObjectiveType.Measure ? { measureTypeId: obj.measureTypeId, value: obj.value, description: obj.description } : { description: obj.description },
      status: obj.status
    })
    );
    const measure = {
      anthropometricMeasurements:
        medicalRecordProps.measure.anthropometricMeasurements.map((anthM: IAnthropometricMeasurement) => ({
          date: anthM.date.toString(),
          measureTypeId: anthM.measureTypeId,
          value: anthM.value,
          unit: anthM.unit
        })) as AnthropometricMeasurementDto[],
      bodyCompositionMeasurements:
        medicalRecordProps.measure.bodyCompositionMeasurements.map((bodyM: IBodyCompositionMeasurement) => ({
          date: bodyM.date.toString(),
          measureTypeId: bodyM.measureTypeId,
          value: bodyM.value,
          unit: bodyM.unit
        })) as BodyCompositionMeasurementDto[],
      medicalAnalysisResults: medicalRecordProps.measure.medicalAnalysisResults.map((meReM: IMedicalAnalysisResult) => ({
        date: meReM.date.toString(),
        measureTypeId: meReM.measureTypeId,
        value: meReM.value,
        unit: meReM.unit
      })) as MedicalAnalysisResultDto[],
      id: medicalRecordProps.measure.id,
      createdAt: medicalRecordProps.measure.createdAt,
      updatedAt: medicalRecordProps.measure.updatedAt
    };
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
}
