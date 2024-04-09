import { FoodDiaryDTO } from "@/core/interfaces";
import useCore from "@/hooks/useCore";
import useCopyFoodDiaryImages from "./useCopyFoodDiaryImage";
import useUpdateImage from "./useUpdateFoodDiaryImage";
import { useAppAlert } from "@pack/AppAlert";
export default function useUpdateFoodDiary(patientUniqueId: number): (
    values: {
        images: {
            uri: string;
            type?: string;
            id: number;
        }[];
    } & Omit<FoodDiaryDTO, "images">,
    foodDiaryData: FoodDiaryDTO
) => Promise<boolean> {
    const core = useCore();
    const Alert = useAppAlert();
    const handleImagesProcess = useCopyFoodDiaryImages(patientUniqueId);
    const handleUpdateImaagePocess = useUpdateImage();
    const handleUpdateProcess = async (
        values: {
            images: {
                uri: string;
                type?: string;
                id: number;
            }[];
        } & Omit<FoodDiaryDTO, "images">,
        foodDiaryData: FoodDiaryDTO
    ): Promise<boolean> => {
        const mappedImage = values.images.map(item => item.uri);

        const imagesChanged =
            JSON.stringify(mappedImage) != JSON.stringify(foodDiaryData.images);
        const foodDiary = {
            id: foodDiaryData.id,
            ...(values.foodIds != foodDiaryData.foodIds && {
                foodIds: values.foodIds
            }),
            ...(values.foodQuantities != foodDiaryData.foodQuantities && {
                foodQuantities: values.foodQuantities
            }),
            ...(values.date != foodDiaryData.date && {
                date: values.date
            }),
            ...(values.meals != foodDiaryData.meals && {
                meals: values.meals
            }),
            ...(values.mealsType != foodDiaryData.mealsType && {
                mealsType: values.mealsType
            }),
            ...(values.observations != foodDiaryData.observations && {
                observations: values.observations
            }),
            ...(imagesChanged && {
                images: mappedImage
            })
        };
        return new Promise<boolean>((resolve, reject) => {
            Alert.confirm(
                "Voulez-vous vraiment mettre à jour ce journal ?"
            ).then((check: boolean) => {
                if (check) {
                    core.foodDiaryS
                        .updateFoodDiary(foodDiary)
                        .then(({ id }) => {
                            if (imagesChanged) {
                                handleImagesProcess(id, values.images)
                                    .then((values: { uri: string }[]) => {
                                        
                                        handleUpdateImaagePocess(
                                            id,
                                            values.map(img => img.uri)
                                        )
                                            .then((value: boolean) => {
                                                resolve(value);
                                            })
                                            .catch(() => {
                                              console.log('yello update ')
                                                reject(false);
                                            });
                                    })
                                    .catch(e => {
                                        console.log("ouiib rejesct catch");
                                        reject(false);
                                    });
                            } else {
                                resolve(true);
                            }
                        });
                }
            });
        });
    };

    return handleUpdateProcess;
}
