import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import React, {
    useEffect,
    useState,
    useCallback,
    useMemo,
    useRef
} from "react";
import { ThemeInterface, useTheme, useThemeStyles } from "@/theme";
import BottomSheet, {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
    useBottomSheet
} from "@gorhom/bottom-sheet";
import SelectionInput from "@comp/basic/SelectionInput";
import TextInput from "@comp/basic/TextInput";
import Button from "@comp/basic/Button";
import DateTimeInput from "@comp/basic/DateTimeInput";
import ImagePicker, {
    ImagePickerItemType as ImageItemType
} from "@comp/basic/ImagePicker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "@pack/KeyboardAware";
import { MealsTypes } from "@/data";
import { useFormik } from "formik";
import { Ionicons } from "@expo/vector-icons";

import { DateManipulator } from "@/utils";
import { FoodDiaryDTO } from "@/core/interfaces";
import useCore from "@/hooks/useCore";
import { useAppAlert } from "@pack/AppAlert";
import useCopyFile from "@/hooks/useCopyFile";
interface Props {
    onClose: () => void;
    patientUniqueId: string;
    foodDiaryData?: FoodDiaryDTO;
    isUpdate?: boolean;
}

/**
 * Au niveau de ce composant fomik genere d'erreur lors de padseage d'un
 * Array a images alors j'ai utiliser JSON pour faire des transformation .
 * Apres je vais fixer l'erreur
 */
const FoodDiaryForm = ({
    onClose,
    patientUniqueId,
    foodDiaryData,
    isUpdate = false
}: Props) => {
    const { size, colors } = useTheme();
    const style = useThemeStyles(styles);
    const [custormMealsType, setCustormMealsType] = useState<boolean>(false);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            onClose && onClose();
        }
    }, []);
    const Alert = useAppAlert();
    const [copyImage] = useCopyFile();
    const core = useCore();
    const onSubmit = (values: typeof initialState) => {
        const images = JSON.parse(values.images);
        const foodDiariesDirectory =
            "patients_" + patientUniqueId + "/food_diaries";
        if (!isUpdate) {
            const foodDiary = {
                patient_unique_id: patientUniqueId,
                foodIds: values.foodIds,
                foodQuantities: values.foodQuantities,
                date: values.date,
                meals: values.meals,
                mealsType: values.mealsType,
                observations: values.observations,
                images: images.map(item => item.uri)
            };

            core.foodDiaryS.createFoodDiary(foodDiary).then(({ id }) => {
                let CopyImagePromises = [];
                images.forEach(image => {
                    const imageFileName =
                        "food_diary_img_" +
                        id +
                        "_" +
                        Date.now() +
                        "." +
                        image.type;
                    const copy = copyImage(
                        image.uri,
                        foodDiariesDirectory,
                        imageFileName
                    );
                    CopyImagePromises.push(copy);
                });
                Promise.all(CopyImagePromises)
                    .then((values: { uri: string }[]) => {
                        core.foodDiaryS
                            .updateFoodDiary({
                                id,
                                images: values.map(img => img.uri)
                            })
                            .then(fooddiarie => {
                                onClose && onClose();
                            });
                    })
                    .catch(async e => {
                        console.log("Erreur lor du copy", e);
                        await core.foodDiaryS.deleteFoodDiary(id);
                    });
            });
        } else {
            const mappedImage = images.map(item => item.uri);

            const imagesChanged =
                JSON.stringify(mappedImage) !=
                JSON.stringify(foodDiaryData.images);
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
            Alert.confirm(
                "Voulez-vous vraiment mettre à jour ce journal ?"
            ).then((check: boolean) => {
                if (check) {
                    core.foodDiaryS
                        .updateFoodDiary(foodDiary)
                        .then(({ id }) => {
                            if (imagesChanged) {
                                let CopyImagePromises = [];
                                images.forEach(image => {
                                    if (
                                        !image.uri.includes(
                                            foodDiariesDirectory
                                        )
                                    ) {
                                        const imageFileName =
                                            "food_diary_img_" +
                                            id +
                                            "_" +
                                            Date.now() +
                                            "." +
                                            image.type;
                                        const copy = copyImage(
                                            image.uri,
                                            foodDiariesDirectory,
                                            imageFileName
                                        );
                                        CopyImagePromises.push(copy);
                                    } else {
                                        CopyImagePromises.push(
                                            new Promise<{ uri: string }>(res =>
                                                res({ uri: image.uri })
                                            )
                                        );
                                    }
                                });
                                Promise.all(CopyImagePromises)
                                    .then((values: { uri: string }[]) => {
                                        core.foodDiaryS
                                            .updateFoodDiary({
                                                id,
                                                images: values.map(
                                                    img => img.uri
                                                )
                                            })
                                            .then(fooddiarie => {
                                                onClose && onClose();
                                            });
                                    })
                                    .catch(async e => {
                                        console.log("Erreur lor du copy", e);
                                        await core.foodDiaryS.deleteFoodDiary(
                                            id
                                        );
                                    });
                            } else {
                                onClose && onClose();
                            }
                        });
                }
            });
        }
    };
    const food_diary_data = {
        mealsType: foodDiaryData?.mealsType || "",
        meals: foodDiaryData?.meals || "",
        observations: foodDiaryData?.observations,
        date:
            foodDiaryData?.date ||
            DateManipulator.dateToDateTimeString(new Date()),
        images: JSON.stringify(
            foodDiaryData?.images?.map((item, index) => ({
                uri: item,
                id: index,
                type: item.split(".")[item.split(".").length - 1]
            })) || []
        ),
        foodIds: foodDiaryData?.foodIds || [],
        foodQuantities: foodDiaryData?.foodQuantities || new Map()
    };

    const formik = useFormik({
        initialValues: food_diary_data,
        onSubmit
    });
    const {
        values,
        touched,
        handleSubmit,
        handleChange,
        errors,
        isSubmitting,
        isValid
    } = formik;

    return (
        <Modal
            transparent
            onRequestClose={() => {
                onClose && onClose();
            }}
            statusBarTranslucent
        >
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Pressable style={style.modalContentContainer}>
                    <BottomSheet
                        ref={bottomSheetRef}
                        onChange={handleSheetChanges}
                        snapPoints={["80%", "90%"]}
                        enablePanDownToClose
                        backgroundStyle={{
                            backgroundColor: colors.bg.primary
                        }}
                        handleIndicatorStyle={{
                            backgroundColor: colors.gray100,
                            width: "10%"
                        }}
                        style={{
                            elevation: 5
                        }}
                    >
                        <BottomSheetView style={style.container}>
                            <View style={style.foodDiaryFormHeader}>
                                <Text style={style.foodDiaryFormTitle}>
                                    Journal{" "}
                                    <Text style={{ color: colors.blue300 }}>
                                        Alimentaire
                                    </Text>
                                </Text>
                                <Text style={style.foodDiaryFormSubTitle}>
                                    {!isUpdate ? "Emregistrer" : "Consultez"} le
                                    journal alimentaire de votre patient
                                </Text>
                            </View>
                            <KeyboardAwareScrollView>
                                <View style={style.foodDiaryFormBody}>
                                    <DateTimeInput
                                        label={
                                            "Date et heure de consommation du repas"
                                        }
                                        value={values.date}
                                        r={size.s3}
                                        icon={(color, size) => (
                                            <Ionicons
                                                name={"calendar-outline"}
                                                color={colors.gray300}
                                                size={size}
                                            />
                                        )}
                                        onChange={(date: Date) => {
                                            handleChange("date")(
                                                DateManipulator.dateToDateTimeString(
                                                    date
                                                )
                                            );
                                        }}
                                    />
                                    <SelectionInput
                                        r={size.s3}
                                        label={"Type de Repas"}
                                        data={MealsTypes}
                                        value={values.mealsType}
                                        editable={custormMealsType}
                                        onChange={(
                                            ids: number,
                                            data: { label: string; id: number }
                                        ) => {
                                            handleChange("mealsType")(
                                                data?.label || values.mealsType
                                            );
                                            //setCustormMealsType(prev=>!prev)
                                        }}
                                        onChangeText={(value: string) => {
                                            handleChange("mealsType")(value);
                                        }}
                                        //withSearch
                                        unique
                                        onLongPress={() => {
                                            setCustormMealsType(prev => !prev);
                                        }}
                                        enterKeyHint={"next"}
                                        placeholder={"Ex: Petit-déjeuner"}
                                    />
                                    <TextInput
                                        label={"Repas"}
                                        value={values.meals}
                                        r={size.s3}
                                        //h={size.s100}
                                        multiline
                                        numberOfLines={4}
                                        inputContainerStyle={{
                                            minHeight: size.s100,
                                            maxHeight: size.s100 * 1.5
                                        }}
                                        rows={10}
                                        onChangeText={(value: string) => {
                                            handleChange("meals")(value);
                                        }}
                                        placeholder={
                                            "Ex: Omelette aux légumes, pain complet, jus d'orange"
                                        }
                                    />
                                    <TextInput
                                        label={"Observations"}
                                        value={values.observations}
                                        r={size.s3}
                                        //h={size.s100}
                                        multiline
                                        numberOfLines={4}
                                        inputContainerStyle={{
                                            minHeight: size.s100,
                                            maxHeight: size.s100 * 1.5
                                        }}
                                        rows={10}
                                        onChangeText={(value: string) => {
                                            handleChange("observations")(value);
                                        }}
                                        placeholder={
                                            "Ex: Était fatigué et stressé avant le petit-déjeuner, mais s'est senti plus énergique après avoir consommé un bol de flocons d'avoine avec des fruits frais et un verre de jus d'orange."
                                        }
                                    />
                                    <ImagePicker
                                        label={"Image associée au repas"}
                                        placeholder={
                                            "Télécharger une photo du repas"
                                        }
                                        value={JSON.parse(values.images)}
                                        onChange={(images: ImageItemType) => {
                                            handleChange("images")(
                                                JSON.stringify(images)
                                            );
                                        }}
                                        withPreview
                                        numberOfImages={3}
                                    />
                                    <Button
                                        r={size.s3}
                                        title={
                                            !isUpdate
                                                ? "Enregistrer"
                                                : "Mettre à jour"
                                        }
                                        h={size.s10}
                                        w={size.width * 0.85}
                                        onPress={handleSubmit}
                                    />
                                </View>
                            </KeyboardAwareScrollView>
                        </BottomSheetView>
                    </BottomSheet>
                </Pressable>
            </GestureHandlerRootView>
        </Modal>
    );
};

export default FoodDiaryForm;

const styles = ({ size, colors }: ThemeInterface) =>
    StyleSheet.create({
        modalContentContainer: {
            flex: 1,
            height: "100%",
            width: "100%",
            backgroundColor: colors.black + "40"
        },
        container: {
            paddingHorizontal: size.s4,
            flex: 1,
            gap: size.s4
        },
        foodDiaryFormHeader: {
            width: "100%",
            alignContent: "center",
            justifyContent: "center"
        },
        foodDiaryFormTitle: {
            textAlign: "center",
            fontFamily: "inter_b",
            fontSize: size.s5,
            color: colors.black300
        },
        foodDiaryFormSubTitle: {
            textAlign: "center",
            fontFamily: "inter_m",
            fontSize: size.s3 * 1.2,
            color: colors.gray300
        },
        foodDiaryFormBody: {
            flex: 1,
            gap: size.s4,
            alignItems: "center"
        }
    });
