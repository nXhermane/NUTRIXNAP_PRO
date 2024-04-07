import {
    FoodDiaryEntity,
    FoodDiaryDTO,
    UpdateFoodDiaryDto,
    UpdateFoodDiaryType,
    CreateFoodDiaryType,
    IFoodDiaryMapper,
    FoodId,
    FoodQuantity
} from "@/core/interfaces";

export default class FoodDiaryMapper implements IFoodDiaryMapper {
    constructor() {}
    /**
     * Maps a FoodDiaryDTO object to a corresponding FoodDiaryEntity object.
     * This method creates a new FoodDiaryEntity-like object based on the provided DTO.
     * Note: This method is not fully implemented and returns an empty entity-like object.
     *
     * @param dto The FoodDiaryDTO object to be mapped to an entity.
     * @returns The mapped FoodDiaryEntity-like object.
     */
    mapDtoToEntity(dto: FoodDiaryDTO): FoodDiaryEntity {
        // TODO: Implement mapping logic to create a FoodDiaryEntity-like object from the DTO
        // Currently returning an empty entity-like object, update this implementation as needed
        return {} as FoodDiaryEntity;
    }

    mapDtoToCreateEntity(dto: FoodDiaryDTO): CreateFoodDiaryType {
        const createEntity: CreateFoodDiaryType = {
            patient_unique_id: dto.patient_unique_id,
            foodIds: this.convertFoodIdsToJsonStr(dto.foodIds),
            foodQuantities: this.convertFoodQuantitiesToJsonStr(
                dto.foodQuantities
            ),
            date: dto.date,
            meals: dto.meals,
            mealsType: dto.mealsType,
            observations: dto.observations,
            images: this.convertImagesToJsonStr(dto.images)
        };
        return createEntity;
    }

    mapUpdateDtoToUpdateEntity(dto: UpdateFoodDiaryDto): UpdateFoodDiaryType {
        const { id, images, foodIds, foodQuantities, ...remainingProps } = dto;
        const updateEntity: UpdateFoodDiaryType = {
            id,
            ...(images && { images: this.convertImagesToJsonStr(images) }),
            ...(foodIds && { foodIds: this.convertFoodIdsToJsonStr(foodIds) }),
            ...(foodQuantities && {
                foodQuantities:
                    this.convertFoodQuantitiesToJsonStr(foodQuantities)
            })
        };
        const mergedEntity: UpdateFoodDiaryType = {
            ...updateEntity,
            ...remainingProps
        };
        return mergedEntity;
    }

    mapEntityToDto(entity: FoodDiaryEntity): FoodDiaryDTO {
        const dto = {
            id: entity.id,
            patient_unique_id: entity.patient_unique_id,
            foodIds: this.convertJsonStrToFoodIds(entity.foodIds),
            foodQuantities: this.convertJsonStrToFoodQuantities(
                entity.foodQuantities
            ),
            date: entity.date,
            meals: entity.meals,
            mealsType: entity.mealsType,
            observations: entity.observations,
            images: this.convertJsonStrToImages(entity.images),
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt
        };
        return dto as FoodDiaryDTO;
    }

    private convertImagesToJsonStr(images: string[]): string {
        return String(JSON.stringify(images));
    }

    private convertFoodIdsToJsonStr(foodIds: FoodId[]): string {
        return String(JSON.stringify(foodIds));
    }

    private convertFoodQuantitiesToJsonStr(
        foodQuantities: FoodQuantity
    ): string {
        return JSON.stringify(Array.from(foodQuantities));
    }

    private convertJsonStrToImages(images: string): string[] {
        return JSON.parse(images);
    }

    private convertJsonStrToFoodIds(foodIds: string): FoodId[] {
        return JSON.parse(foodIds);
    }

    private convertJsonStrToFoodQuantities(
        foodQuantities: string
    ): FoodQuantity {
        return new Map(JSON.parse(foodQuantities));
    }
}
