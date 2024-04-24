import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
    KeyboardAvoidingView,
    KeyboardTypeOptions,
    TextInputProps,
    ViewStyle
} from "react-native";

import { ThemeInterface, useTheme, useThemeStyles } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";

interface TelInputProps extends TextInputProps {
    value: string;
    label: string;
    isRequire?: boolean;
    tel: string | number;
    onChange: (value: string, tel?: string | number) => void;
    style?: ViewStyle;
}

const TelInput: React.FC<TelInputProps> = (props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);

    const {
        label,
        value,
        isRequire = false,
        tel = "",
        onChange = () => {},
        style: containerStyle,
        ...textInputProps
    } = props;

    const isNumber = typeof tel === "number";

    return (
        <KeyboardAvoidingView behavior={"position"} style={containerStyle}>
            <View style={style.selectionInputContainer}>
                <View style={style.labelContainer}>
                    {label && <Text style={style.label}>{label}</Text>}
                    {isRequire && (
                        <View style={style.isRequireIconContainer}>
                            <Text style={style.isRequireIcon}>*</Text>
                        </View>
                    )}
                </View>
                <View style={style.inputContainer}>
                    <View style={style.telCodeContainer}>
                        <Text style={style.telCode}>{tel}</Text>
                    </View>
                    <TextInput
                        keyboardType={isNumber ? "numeric" : "default"}
                        style={style.textInput}
                        value={value}
                        onChangeText={(value: string) => {
                            const interValue = Number(value);
                            if (!isNaN(interValue)) {
                                onChange(value, tel);
                            }
                        }}
                        onBlur={() => {}}
                        onFocus={() => {}}
                        autoCompleteType="tel"
                        maxLength={10}
                        placeholder="Enter phone number"
                        editable
                        clearButtonMode="while-editing"
                        selectionColor={colors.black200}
                        {...textInputProps}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = ({ colors, size }: ThemeInterface) =>
    StyleSheet.create({
        selectionInputContainer: {
            width: "100%",
            gap: size.s2,
            paddingHorizontal: size.s2
        },
        labelContainer: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center"
        },
        label: {
            fontFamily: "inter_sb",
            fontSize: size.s3 * 1.2,
            color: colors.gray300
        },
        isRequireIconContainer: {
            marginLeft: size.s1 / 2
        },
        isRequireIcon: {
            fontFamily: "inter_sb",
            fontSize: size.s4,
            color: colors.green300,
            textAlignVertical: "top"
        },
        textInput: {
            flex: 10,
            width: "100%",
            height: "100%",
            fontFamily: "inter_r",
            color: colors.black200,
            fontSize: size.s3 * 1.1
        },
        inputContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            borderColor: colors.gray200,
            borderWidth: size.s1 / 10,
            borderRadius: size.s100,
            height: size.s50,
            paddingHorizontal: size.s1,
            backgroundColor: colors.bg.secondary
        },
        telCodeContainer: {
            height: "100%",
            width: size.s100 * 0.5,
            borderRightColor: colors.gray300,
            borderRightWidth: size.s1 / 18,
            justifyContent: "center",
            alignItems: "center",
            marginRight: size.s1
        },
        telCode: {
            fontFamily: "inter_sb",
            fontSize: size.s3 * 1.2,
            color: colors.gray300
        }
    });

export default TelInput;
