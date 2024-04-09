import { StyleSheet, Text, View, Button, Modal } from "react-native";
import React, {
    useEffect,
    useState,
    useCallback,
    useMemo,
    useRef
} from "react";
import { ThemeInterface, useTheme, useThemeStyles } from "@/theme";
import SectionContainer from "@comp/details/patient/informations/SectionContainer";
import FoodDiaryItem from "./FoodDiaryItem";
import FoodDiaryForm from "./FoodDiaryForm";
import useCore from "@/hooks/useCore";
import { useAppAlert } from "@pack/AppAlert";

import { FoodDiaryDTO } from "@/core/interfaces";
interface Props {
    patientUniqueId: string;
}

const FoodDiary = ({ patientUniqueId }: Props) => {
    const { size, colors } = useTheme();
    const style = useThemeStyles(styles);
    const [openFoodDiaryForm, setOpenFoodDiaryForm] = useState(false);
    const [lastFoodDiaries, setLastFoodDiaries] = useState<FoodDiaryDTO[]>([]);
    const [currentFoodDiary, setCurrentFoodDiary] = useState<FoodDiaryDTO>({});
    const [forceUpdate, updateId] = useForceUpdate();
    const core = useCore();
    const Alert = useAppAlert();
    useEffect(() => {
        if (patientUniqueId != undefined)
            core.foodDiaryS
                .getFoodDiaryByPatientUniqueId(patientUniqueId)
                .then((foodDiaries: FoodDiaryDTO[]) => {
                    const data = foodDiaries.filter(
                        (item, index) => index > foodDiaries.length - 4
                    );
                    setLastFoodDiaries(data);
                });
    }, [core.foodDiaryS, patientUniqueId, updateId]);

    return (
        <SectionContainer
            title={"Journal Alimentaire"}
            header
            withAddIcon
            onPressAddIcon={() => {
                setCurrentFoodDiary({});
                setOpenFoodDiaryForm(true);
            }}
            contentContainerStyle={{
                marginTop: size.s2
            }}
        >
            <View style={style.container}>
                {lastFoodDiaries.map(data => {
                    return (
                        <FoodDiaryItem
                            data={data}
                            onPress={e => {
                                setCurrentFoodDiary(data);
                                setOpenFoodDiaryForm(true);
                            }}
                            onDelete={() => {
                                const inter = data.createdAt.trim().split(" ");
                                Alert.confirm(
                                    `Voulez-vous vraiment supprimer le journal Alimentaire  ajouté le ${inter[0]} à ${inter[1]} ?`
                                ).then((check: boolean) => {
                                    if (check) {
                                        core.foodDiaryS
                                            .deleteFoodDiary(data.id)
                                            .then(() => {
                                                forceUpdate();
                                            });
                                    }
                                });
                            }}
                            key={data?.id}
                        />
                    );
                })}
            </View>
            {openFoodDiaryForm && (
                <FoodDiaryForm
                    onClose={() => {
                        setOpenFoodDiaryForm(false);
                        setCurrentFoodDiary({});
                        forceUpdate();
                    }}
                    patientUniqueId={patientUniqueId}
                    foodDiaryData={currentFoodDiary}
                    isUpdate={currentFoodDiary?.id}
                />
            )}
        </SectionContainer>
    );
};

export default FoodDiary;
function useForceUpdate(): [() => void, number] {
    const [value, setValue] = useState(0);
    return [() => setValue(value + 1), value];
}
const styles = ({ size, colors }: ThemeInterface) =>
    StyleSheet.create({
        container: {
            gap: size.s2
        }
    });
