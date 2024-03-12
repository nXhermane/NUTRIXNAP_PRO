import { StyleSheet, Text, View, Pressable } from "react-native";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
interface Props {
    icon: (color: string, size: number) => React.ReactNode;
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
    label: string;
}

const ToggleBtn = (props: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);

    const {
        icon = (color, size) => (
            <Ionicons name={"person"} color={color} size={size} />
        ),
        setValue,
        value = false,
        label
    } = props;
    return (
        <Pressable
            style={style.toggleBtnContainer(value)}
            onPress={() => {
                setValue(!value);
            }}
        >
            {({ pressed }) => {
                return (
                    <>
                        {value ? (
                            <Ionicons
                                name={"checkmark-outline"}
                                size={size.s4}
                                color={colors.white}
                            />
                        ) : (
                            icon(colors.black200, size.s3)
                        )}
                        <Text style={style.toggleBtnText(value)}>{label}</Text>
                    </>
                );
            }}
        </Pressable>
    );
};

export default ToggleBtn;

const styles = ({ colors, size }) =>
    StyleSheet.create({
        toggleBtnContainer: pressed => ({
            paddingVertical: size.s1,
            paddingHorizontal: size.s2,
            borderWidth: size.s1 / 4,
            borderColor: colors.gray300,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: pressed ? colors.blue300 : colors.bg.secondary,
            gap: size.s1,
            borderRadius: size.s1
        }),
        toggleBtnText: pressed => ({
            fontFamily: "inter_m",
            fontSize: size.s3,
            color: pressed ? colors.white : colors.black300
        })
    });
