import useCore from "@/hooks/useCore";

export default function useUpdateImage(): (
    id: number,
    values: string[]
) => Promise<boolean> {
    const core = useCore();

    const handleUpdateProcess = (
        id: number,
        values: string[]
    ): Promise<boolean> => {
        return new Promise<boolean>((resolve, reject) => {
            core.foodDiaryS
                .updateFoodDiary({
                    id,
                    images: values
                })
                .then(fooddiarie => {
                    resolve(true);
                })
                .catch(() => {
                    reject(false);
                });
        });
    };

    return handleUpdateProcess;
}
