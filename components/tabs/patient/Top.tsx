import { StyleSheet, Text, View } from "react-native";
import Avatars from "@comp/basic/Avatars";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import DashBoardSection from "@comp/container/DashBoardSection";
import React from "react";
interface Props {
    // Define your props here
}

const Top = (props: Props) => {
    const {colors,size} = useTheme();
    const style = useThemeStyles(styles);

    return (
        <DashBoardSection
            title={"Vos Patients"}
            body={"Consultez les informations de vos Patients"}
        />
        
    );
};

export default Top;

const styles = ({ colors, size }) => StyleSheet.create({});
