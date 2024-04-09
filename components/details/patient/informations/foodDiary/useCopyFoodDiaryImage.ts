import useCopyFile from "@/hooks/useCopyFile";

export default function useCopyFoodDiaryImages(patientUniqueId) {
    const [copyImage] = useCopyFile();
    const handleImagesSavingProccess = async (
        id: number,
        images: { uri: string; type?: string; id?: number }[]
    ): Promise<{ uri: string }[]> => {
        const foodDiariesDirectory =
            "patients_" + patientUniqueId + "/food_diaries";
        let CopyImagePromises = [];
        images.forEach(image => {
            if (!image.uri.includes(foodDiariesDirectory)) {
                const imageFileName =
                    "food_diary_img_" +
                    id +
                    "_" +
                    Date.now() +
                    "." +
                    (image.type || "jpg");
                const copy = copyImage(
                    image.uri,
                    foodDiariesDirectory,
                    imageFileName
                );
                CopyImagePromises.push(copy);
            } else {
                CopyImagePromises.push(Promise.resolve({ uri: image.uri }));
            }
        });

        return Promise.all(CopyImagePromises);
    };

    return handleImagesSavingProccess;
}
