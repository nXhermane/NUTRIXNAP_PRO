import { FoodDiaryDTO } from "@/core/interfaces";
import useCore from "@/hooks/useCore";
import useCopyFoodDiaryImages from "./useCopyFoodDiaryImage";
import useUpdateImage from "./useUpdateFoodDiaryImage";
export default function useCreateFoodDiary(patientUniqueId: number): (
    values: {
        images: {
            uri: string;
            type?: string;
            id: number;
        }[];
    } & Omit<FoodDiaryDTO, "images">
) => Promise<boolean> {
    const core = useCore();
    const handleImagesProcess = useCopyFoodDiaryImages(patientUniqueId);
    const handleUpdateImaagePocess = useUpdateImage();
    const handleCreateProcess = async (
        values: {
            images: {
                uri: string;
                type?: string;
                id: number;
            }[];
        } & Omit<FoodDiaryDTO, "images">
    ): Promise<boolean> => {
        const foodDiary: FoodDiaryDTO = {
            patient_unique_id: patientUniqueId,
            foodIds: values.foodIds,
            foodQuantities: values.foodQuantities,
            date: values.date,
            meals: values.meals,
            mealsType: values.mealsType,
            observations: values.observations,
            images: values.images.map(item => item.uri)
        };
        return new Promise<boolean>((resolve, reject) => {
            core.foodDiaryS.createFoodDiary(foodDiary).then(({ id }) => {
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
                                reject(false);
                            });
                    })
                    .catch(async e => {
                        await core.foodDiaryS.deleteFoodDiary(id);
                        reject(false);
                    });
            });
        });
    };

    return handleCreateProcess;
}
