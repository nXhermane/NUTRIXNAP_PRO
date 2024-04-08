import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeInterface, useTheme, useThemeStyles } from "@/theme";
import FoodDiary from "./foodDiary/FoodDiary";
interface Props {
    patientId: number;
    patientUniqueId: string;
}

const Informations = ({ patientId, patientUniqueId }: Props) => {
    const { size, colors } = useTheme();
    const style = useThemeStyles(styles);
    return (
        <View style={style.container}>
            <FoodDiary patientUniqueId={patientUniqueId} />
        </View>
    );
};

export default Informations;

const styles = ({ size, colors }: ThemeInterface) =>
    StyleSheet.create({
        container: {
            backgroundColor: colors.bg.secondary,
            width: size.width,
            gap: size.s4,
            alignItems: "center"
        }
    });
