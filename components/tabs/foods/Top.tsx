import { StyleSheet, Text, View } from "react-native";
import Avatars from "@comp/basic/Avatars";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import DashBoardSection from "@comp/container/DashBoardSection";
import React from "react";

interface Props {
    title: string;
    body: string;
}

const Top = (props: Props) => {
    const { colors, size } = useTheme();

    return (
        <DashBoardSection
            title={props.title}
            body={props.body}
            style={styles(colors, size)}
        />
    );
};

export default Top;

const styles = (colors, size) => StyleSheet.create({
    section: {
        backgroundColor: colors.background,
        borderRadius: size.borderRadius,
        padding: size.spacing,
        marginBottom: size.spacing,
    },
    title: {
        color: colors.text,
        fontSize: size.fontSize,
        fontWeight: 'bold',
        marginBottom: size.spacing / 2,
    },
    body: {
        color: colors.text,
        fontSize: size.fontSize,
        lineHeight: size.lineHeight,
    },
});
