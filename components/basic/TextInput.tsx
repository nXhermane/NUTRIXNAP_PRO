import {
    StyleSheet,
    Text,
    View,
    TextInput as RTtextInput,
    Pressable
} from "react-native";
import { ThemeInterface, useTheme, useThemeStyles } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
interface Props {
    value: string;
    onChange: (value: string) => void;
    inputType: "numeric" | "text" | "password";
    inputMode:
        | "numeric"
        | "decimal"
        | "none"
        | "tel"
        | "url"
        | "email"
        | "text";
    isPassword?: boolean;
    placeholder?: string;
    h: number;
    displayHelp?: boolean;
    help?: JSX.Element;
    isRequire?: boolean;
    label?: string;
}

const TextInput = (props: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    const {
        isPassword = false,
        value = "",
        inputMode = "none",
        onChange = (value: string) => {},
        placeholder = "",
        h,
        isRequire = false,
        displayHelp = false,
        help,
        label
    } = props;
    const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(true);
    return (
        <View style={style.inputContainer}>
            <View style={style.labelContainer}>
                {label && <Text style={style.label}>{label}</Text>}
                {isRequire && (
                    <View style={style.isRequireIconContainer}>
                        <Text style={style.isRequireIcon}>*</Text>
                    </View>
                )}
            </View>
            <View style={style.textInputContainer(h)}>
                <RTtextInput
                    style={style.textInput}
                    secureTextEntry={isPassword && passwordIsVisible}
                    value={value}
                    inputMode={inputMode}
                    placeholder={placeholder}
                    placeholderTextColor={colors.gray200}
                    onChange={onChange}
                />
                {isPassword && (
                    <Pressable
                        style={style.rightIconContainer}
                        onPress={() => setPasswordIsVisible(prev => !prev)}
                    >
                        <Ionicons
                            name={passwordIsVisible ? "eye" : "eye-off"}
                            size={size.s5}
                            color={colors.gray300}
                        />
                    </Pressable>
                )}
            </View>
            {displayHelp && (
                <View style={style.helperTextContainer}>
                    <Text style={style.helperText}>{help}</Text>
                </View>
            )}
        </View>
    );
};

export default TextInput;

const styles = ({ colors, size }) =>
    StyleSheet.create({
        inputContainer: {
            gap: size.s1,
            width: "100%",
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
        textInputContainer: (h: number | string) => ({
            flexDirection: "row",
            justifyContent: "space-between",
            borderColor: colors.gray200,
            borderWidth: size.s1 / 10,
            borderRadius: size.s100,
            height: h || size.s50 * 0.8,
            paddingHorizontal: size.s4,
            backgroundColor: colors.bg.secondary
        }),
        textInput: {
            flex: 1,
            width: "100%",
            height: "100%",
            fontFamily: "inter_r",
            color: colors.gray300,
            fontSize: size.s3 * 1.1
        },
        rightIconContainer: {
            position: "absolute",
            right: size.s3,
            alignSelf: "center"
        },
        helperTextContainer: {
            flexDirection: "row",
            gap: size.s1,
            alignItems: "center"
        },
        helperText: {
            fontFamily: "inter_m",
            fontSize: size.s3,
            color: colors.gray300
        }
    });
