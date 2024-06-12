import { UpdateFoodStoryError } from './UpdateFoodStoryError';
import { UpdateFoodStoryRequest } from './UpdateFoodStoryRequest';
import { UpdateFoodStoryResponse } from './UpdateFoodStoryResponse';
import {
   Patient,
   MedicalRecord,
   FoodStory,
   type CreateFoodStoryProps,
   FavoriteFood,
   IFavoriteFood,
   Aversion,
   IAversion,
   WaterConsumptionRange,
} from './../../../../domain';
import {
   PatientRepository,
   MedicalRecordRepository,
   PatientRepositoryError,
   MedicalRecordRepositoryError,
   FoodStoryDto,
   MedicalRecordDto,
   MedicalRecordPersistenceType,
} from './../../../../infrastructure';
import { UseCase, AggregateID, Time } from '@shared';

export class UpdateFoodStoryUseCase implements UseCase<UpdateFoodStoryRequest, UpdateFoodStoryResponse> {
   constructor(
      private patientRepo: PatientRepository,
      private medicalRecordRepo: MedicalRecordRepository,
   ) {}

   async execute(request: UpdateFoodStoryRequest): Promise<UpdateFoodStoryResponse> {
      try {
         const patient = await this.getPatient(request.patientId);
         const medicalRecord = await this.getMedicalRecord(patient.medicalRecordId);
         const foodStory = this.getFoodStoryFromMedicalRecord(medicalRecord);
         this.updateFoodStory(foodStory, request.data);
         this.updateMedicalRecord(medicalRecord, foodStory);
         await this.saveMedicalRecord(medicalRecord);
      } catch (e: any) {
         this.handleErrors(e, request);
      }
   }

   private async getPatient(patientId: AggregateID): Promise<Patient> {
      try {
         return await this.patientRepo.getById(patientId);
      } catch (e) {
         throw new UpdateFoodStoryError('Failed to retrieve patient.', e as Error);
      }
   }

   private async getMedicalRecord(medicalRecordId: AggregateID): Promise<MedicalRecord> {
      try {
         return await this.medicalRecordRepo.getById(medicalRecordId);
      } catch (e) {
         throw new UpdateFoodStoryError('Failed to retrieve medical record.', e as Error);
      }
   }

   private updateFoodStory(foodStory: FoodStory, data: Partial<CreateFoodStoryProps>) {
      if (data?.bedtime) foodStory.bedtime = new Time(data.bedtime);
      if (data?.wakeUpTime) foodStory.wakeUpTime = new Time(data.wakeUpTime);
      if (data?.numberOfMealsPerDay) foodStory.numberOfMealsPerDay = data.numberOfMealsPerDay;
      if (data?.otherInformation) foodStory.otherInformation = data.otherInformation;
      this.updateCollection(foodStory.dietTypes, data?.dietTypes, foodStory.addDietType.bind(foodStory), foodStory.removeDietType.bind(foodStory));
      this.updateCollection(foodStory.allergies, data?.allergies, foodStory.addAllergy.bind(foodStory), foodStory.removeAllergy.bind(foodStory));
      this.updateCollection(
         foodStory.foodIntolerances,
         data?.foodIntolerances,
         foodStory.addFoodIntolerance.bind(foodStory),
         foodStory.removeFoodIntolerance.bind(foodStory),
      );
      this.updateCollection(
         foodStory.nutritionalDeficiencies,
         data?.nutritionalDeficiencies,
         foodStory.addNutritionalDeficience.bind(foodStory),
         foodStory.removeNutritionalDeficience.bind(foodStory),
      );
      this.updateFavoriteFoods(foodStory, data?.foodAversions);
      this.updateFavoriteFoods(foodStory, data?.favoriteFoods);
      if (data?.waterConsumption) foodStory.waterConsumption = new WaterConsumptionRange(data.waterConsumption);
   }
   private updateCollection(
      currentCollection: AggregateID[],
      newCollection: AggregateID[] | undefined,
      addMethod: (item: AggregateID) => void,
      removeMethod: (item: AggregateID) => void,
   ) {
      if (!newCollection) return;

      const currentSet = new Set(currentCollection);
      const newSet = new Set(newCollection);

      newSet.forEach((item) => !currentSet.has(item) && addMethod(item));
      currentSet.forEach((item) => !newSet.has(item) && removeMethod(item));
   }
   private updateFavoriteFoods(foodStory: FoodStory, favoriteFoods: IFavoriteFood[] | undefined) {
      if (!favoriteFoods) return;

      const currentFavoriteFoods = new Set(foodStory.favoriteFoods.map((favFood: IFavoriteFood) => JSON.stringify(favFood)));
      const newFavoriteFoods = new Set(favoriteFoods.map((favFood: IFavoriteFood) => JSON.stringify(favFood)));

      newFavoriteFoods.forEach((favFoodStr: string) => {
         const favFood = new FavoriteFood(JSON.parse(favFoodStr) as IFavoriteFood);
         if (!currentFavoriteFoods.has(favFoodStr)) foodStory.addFavoriteFood(favFood);
      });

      currentFavoriteFoods.forEach((favFoodStr: string) => {
         const favFood = new FavoriteFood(JSON.parse(favFoodStr) as IFavoriteFood);
         if (!newFavoriteFoods.has(favFoodStr)) foodStory.removeFavoriteFood(favFood);
      });
   }

   private updateFoodAversions(foodStory: FoodStory, foodAversions: IAversion[] | undefined) {
      if (!foodAversions) return;

      const currentFoodAversions = new Set(foodStory.foodAversions.map((avFood: IAversion) => JSON.stringify(avFood)));
      const newFoodAversions = new Set(foodAversions.map((avFood: IAversion) => JSON.stringify(avFood)));

      newFoodAversions.forEach((avFoodStr: string) => {
         const avFood = new Aversion(JSON.parse(avFoodStr) as IAversion);
         if (!currentFoodAversions.has(avFoodStr)) foodStory.addFoodAversion(avFood);
      });

      currentFoodAversions.forEach((avFoodStr: string) => {
         const avFood = new Aversion(JSON.parse(avFoodStr) as IAversion);
         if (!newFoodAversions.has(avFoodStr)) foodStory.removeFoodAversion(avFood);
      });
   }
   private getFoodStoryFromMedicalRecord(medicalRecord: MedicalRecord): FoodStory {
      const medicalRecordProps = medicalRecord.getProps();
      return medicalRecordProps.foodStory;
   }

   private updateMedicalRecord(medicalRecord: MedicalRecord, foodStory: FoodStory) {
      medicalRecord.updateFoodStory(foodStory);
   }

   private async saveMedicalRecord(medicalRecord: MedicalRecord) {
      try {
         await this.medicalRecordRepo.save(medicalRecord);
      } catch (e) {
         throw new UpdateFoodStoryError('Failed to save medical record.', e as Error);
      }
   }

   private handleErrors(e: any, request: UpdateFoodStoryRequest): never {
      if (e instanceof PatientRepositoryError || e instanceof MedicalRecordRepositoryError) {
         throw new UpdateFoodStoryError(e.message, e as Error, e.metadata);
      }
      throw new UpdateFoodStoryError(`Unexpected error: ${e?.constructor.name}`, e as Error, request);
   }
}
