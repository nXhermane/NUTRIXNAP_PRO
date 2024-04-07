import {
    FoodDiaryEntity,
    FoodDiaryDTO,
    UpdateFoodDiaryDto,
    UpdateFoodDiaryType,
    CreateFoodDiaryType
} from "@/core/interfaces";

export default interface FoodDiaryMapper {
    mapDtoToEntity(dto: FoodDiaryDTO): FoodDiaryEntity;
    mapDtoToCreateEntity(dto: FoodDiaryDTO): CreateFoodDiaryType;
    mapUpdateDtoToUpdateEntity(dto: UpdateFoodDiaryDto): UpdateFoodDiaryType;
    mapEntityToDto(entity: FoodDiaryEntity): FoodDiaryDTO;
}
