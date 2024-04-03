import {
    StyleSheet,
    Text,
    View,
    Pressable,
    ScrollView,
    FlatList
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeInterface, useTheme, useThemeStyles } from "@/theme";
import Animated, {
    useAnimatedRef,
    useScrollViewOffset,
    useDerivedValue,
    useSharedValue,
    useAnimatedStyle,
    SharedValue,
    scrollTo
} from "react-native-reanimated";
import useCore from "@/hooks/useCore";
import { PatientEntity } from "@/core/interfaces";

import Avatars from "@comp/basic/Avatars";
import PatientDetailHeader from "./PatientDetailHeader";

const HeaderTitles = [
    "Informations",
    "Suivi",
    "Mesures",
    "Planification",
    "Plan Alimentaire",
    "Recommandations",
    "Analyse",
    "Documents"
];

interface Props {
    patientId: number;
}

const PatientDetail = ({ patientId }: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    const core = useCore();

    const scrollViewRef = useAnimatedRef();
    const headerScrollViewRef = useAnimatedRef();
    const bottomScrollViewRef = useAnimatedRef();

    const scrollY: SharedValue<number> = useScrollViewOffset(scrollViewRef);
    const headerScrollX: SharedValue<number> =
        useScrollViewOffset(headerScrollViewRef);
    const bottomScrollX: SharedValue<number> =
        useScrollViewOffset(bottomScrollViewRef);

    useEffect(() => {
        core.patientS
            .getPatientById(patientId)
            .then((patient: PatientEntity) => {
                setPatient(patient);
            });
    }, [core.patientS, patientId]);

    const [patient, setPatient] = useState<PatientEntity>({});
    return (
        <View style={style.container}>
            <PatientDetailHeader
                patient={patient}
                scrollY={scrollY}
                headerScrollRef={headerScrollViewRef}
                bottomScrollRef={bottomScrollViewRef}
                headerScrollX={headerScrollX}
                bottomScrollX={bottomScrollX}
            />
            <Animated.ScrollView
                decelerationRate={"fast"}
                ref={scrollViewRef}
                onScrollEndDrag={e => {
                    const scrollOffset = e.nativeEvent.contentOffset.y;
                    if (scrollOffset < 100) e.currentTarget.scrollTo({ y: 0 });
                    if (scrollOffset > 100 && scrollOffset < 200)
                        e.currentTarget.scrollTo({ y: 200 });
                }}
            >
                <View style={style.blanckBody}>
                    <Animated.ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        ref={bottomScrollViewRef}
                    >
                        {HeaderTitles.map((item: string, index) => (
                            <Item label={item} key={item} />
                        ))}
                    </Animated.ScrollView>
                </View>
            </Animated.ScrollView>
        </View>
    );
};
function Item({ label }) {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    return (
        <Animated.View style={style.item}>
            <Text style={style.txt}>{label}</Text>
        </Animated.View>
    );
}
export default PatientDetail;

const styles = ({ colors, size }: ThemeInterface) =>
    StyleSheet.create({
        container: {
            backgroundColor: colors.bg.secondary,
            flex: 1
        },

        blanckBody: {
            height: size.height * 1.6,
            backgroundColor: colors.green300
        },
        item: {
            height: "100%",
            width: size.width,
            //backgroundColor: "grey",
            // borderWidth: 5,
            // borderColor: "#fff",
            alignItems: "center",
            justifyContent: "center"
        }
    });
