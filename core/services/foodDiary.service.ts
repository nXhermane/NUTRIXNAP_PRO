import { FoodDiaryEntity, FoodDiaryDTO, UpdateFoodDiaryDto, IFoodDiaryService, IFoodDiaryRepository, IFoodDiaryMapper } from "@/core/interfaces";

export default class FoodDiaryService implements IFoodDiaryService {
   constructor(
      private repository: IFoodDiaryRepository,
      private mapper: IFoodDiaryMapper,
   ) {}

   async createFoodDiary(foodDiary: FoodDiaryDTO): Promise<FoodDiaryDTO> {
      const createFoodDiary = this.mapper.mapDtoToCreateEntity(foodDiary);
      const id = await this.repository.create(createFoodDiary);
      const foodDiaryEntity = (await this.repository.findById(id as number)) as FoodDiaryEntity;
      return this.mapper.mapEntityToDto(foodDiaryEntity);
   }

   async getFoodDiaryById(id: number): Promise<FoodDiaryDTO | null> {
      const foodDiary = (await this.repository.findById(id)) as FoodDiaryEntity;
      return this.mapper.mapEntityToDto(foodDiary);
   }

   async getFoodDiaryByPatientUniqueId(unique_id: string): Promise<FoodDiaryDTO[]> {
      const foodDiaries = (await this.repository.findByPatientUniqueId(unique_id)) as FoodDiaryEntity[];
      const foodDairiesDto = foodDiaries.map((entity: FoodDiaryEntity) => this.mapper.mapEntityToDto(entity));
      return foodDairiesDto;
   }

   async updateFoodDiary(foodDiary: UpdateFoodDiaryDto): Promise<FoodDiaryDTO> {
      const updatedEntity = this.mapper.mapUpdateDtoToUpdateEntity(foodDiary);
      const result = await this.repository.update(updatedEntity);
      return this.mapper.mapEntityToDto(result);
   }

   async deleteFoodDiary(id: number): Promise<void> {
      await this.repository.delete(id);
   }
}
