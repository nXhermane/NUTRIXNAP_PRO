import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import { Ionicons } from "@expo/vector-icons";
interface Props {
    // Define your props here
}

const searchFilter = (props: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    const bottomSheetRef = useRef<BottomSheet>(null);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log("handleSheetChanges", index);
    }, []);

    return <View></View>;
};

export default searchFilter;

const styles = ({ colors, size }) =>
    StyleSheet.create({
        bottomSheet: {
            backgroundColor: colors.w
        }
    });
