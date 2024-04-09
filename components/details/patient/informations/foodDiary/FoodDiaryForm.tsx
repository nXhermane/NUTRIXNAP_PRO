import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import Button from "@comp/basic/Button";
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
    BottomSheetView
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "@pack/KeyboardAware";
import FoodDiaryFormBody from "./FoodDiaryFormBody";
import useFoodDiaryForm from "./useFoodDiaryForm";
import { FoodDiaryDTO } from "@/core/interfaces";

import { useAppAlert } from "@pack/AppAlert";
import useCopyFile from "@/hooks/useCopyFile";
interface Props {
    onClose: () => void;
    patientUniqueId: string;
    foodDiaryData?: FoodDiaryDTO;
    isUpdate?: boolean;
}

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

    const { values, onSubmit, onChange, errors, isSubmitting, isValid } =
        useFoodDiaryForm(patientUniqueId, onClose, foodDiaryData, isUpdate);

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
                                <FoodDiaryFormBody
                                    onChangeValue={onChange}
                                    values={values}
                                />
                                <View style={style.formBtn}>
                                    <Button
                                        r={size.s3}
                                        title={
                                            !isUpdate
                                                ? "Enregistrer"
                                                : "Mettre à jour"
                                        }
                                        h={size.s10}
                                        w={size.width * 0.85}
                                        onPress={onSubmit}
                                        st={{
                                            alignSelf: "center"
                                        }}
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
            gap: size.s4,
            alignItems: "center"
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
        formBtn: {
            flex: 1,
            gap: size.s4,
            alignItems: "center",
            paddingTop: size.s5
        }
    });
