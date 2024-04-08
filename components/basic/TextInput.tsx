import {
    StyleSheet,
    Text,
    View,
    TextInput as RTtextInput,
    Pressable,
    Alert,
    Modal,
    KeyboardAvoidingView,
    PressEvent,
    ViewStyle,
    TextStyle
} from "react-native";
import React, { useState } from "react";
import { ThemeInterface, useTheme, useThemeStyles } from "@/theme";
import { Ionicons } from "@expo/vector-icons";

export interface Props {
    value: string;
    onChangeText?: (value: string) => void;
    inputType?: "numeric" | "default" | "password";
    inputMode?:
        | "numeric"
        | "decimal"
        | "none"
        | "tel"
        | "url"
        | "email"
        | "text";
    isPassword?: boolean;
    placeholder?: string;
    h?: number;
    r?: number;
    labelStyle?: TextStyle;
    inputContainerStyle?: ViewStyle;
    displayHelp?: boolean;
    help?: JSX.Element;
    isRequire?: boolean;
    label?: string;
    icon?: (colors: string, size: number) => JSX.Element;
    editable?: boolean;
    onPress?: (e: PressEvent) => void;
    rightIcon?: (colors: string, size: number) => JSX.Element;
    onPressRightIcon?: (e: PressEvent) => void;
    st?: ViewStyle;
    onLongPress?: () => void;
}

const TextInput = (props: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    const {
        isPassword = false,
        value,
        inputMode = "text",
        inputType = "default",
        onChangeText = (value: string) => {},
        placeholder,
        h,
        isRequire = false,
        displayHelp = false,
        help,
        label,
        icon,
        editable = true,
        onPress,
        rightIcon,
        onPressRightIcon,

        r,
        labelStyle = {},
        inputContainerStyle = {},
        st = inputContainerStyle.maxHeight || inputContainerStyle.minHeight
            ? {
                  maxHeight: inputContainerStyle?.maxHeight + size.s8,
                  minHeight: inputContainerStyle?.minHeight + size.s8
              }
            : {},
        onLongPress
    } = props;
    const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(true);
    return (
        <View style={[style.inputContainer, st]}>
            <View style={style.labelContainer}>
                {label && (
                    <Text style={[style.label, labelStyle]}>{label}</Text>
                )}
                {isRequire && (
                    <View style={style.isRequireIconContainer}>
                        <Text style={style.isRequireIcon}>*</Text>
                    </View>
                )}
            </View>
            <Pressable
                style={[style.textInputContainer(h, r), inputContainerStyle]}
                onPress={(e: PressEvent) => onPress && onPress(e)}
                onLongPress={onLongPress && onLongPress}
            >
                {icon && (
                    <View style={style.iconContainer}>
                        {icon(colors.black100, size.s5)}
                    </View>
                )}
                <RTtextInput
                    style={[
                        style.textInput,
                        props.multiline && {
                            textAlignVertical: "top",
                            paddingVertical: size.s2
                        }
                    ]}
                    secureTextEntry={isPassword && passwordIsVisible}
                    value={value}
                    inputMode={inputMode}
                    placeholder={placeholder}
                    placeholderTextColor={colors.gray200}
                    onChangeText={onChangeText}
                    editable={editable}
                    keyboardType={inputType}
                    cursorColor={colors.blue300}
                    selectionColor={colors.blue300}
                    {...props}
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
                {rightIcon && (
                    <Pressable
                        style={style.rightIconContainer}
                        onPress={(e: PressEvent) => {
                            if (onPressRightIcon) onPress(e);
                            else onPressRightIcon && onPressRightIcon(e);
                        }}
                    >
                        {rightIcon(colors.black200, size.s5)}
                    </Pressable>
                )}
            </Pressable>
            {displayHelp && <View style={style.helperTextContainer}></View>}
        </View>
    );
};

export default TextInput;

const styles = ({ colors, size }) =>
    StyleSheet.create({
        inputContainer: {
            gap: size.s2,
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
        textInputContainer: (h: number | string, r: number) => ({
            flexDirection: "row",
            justifyContent: "space-between",
            borderColor: colors.gray200,
            borderWidth: size.s1 / 10,
            borderRadius: r || size.s100,
            height: h || size.s50,
            paddingHorizontal: size.s4,
            backgroundColor: colors.bg.secondary,
            marginHorizontal: size.s1
        }),
        iconContainer: {
           // borderRightColor: colors.gray200,
            //borderRightWidth: size.s1 / 10,
            justifyContent: "center",
            alignItems: "flex-start",
            minWidth: size.s8,
            marginRight: size.s2,
            marginLeft: -size.s1
        },
        textInput: {
            flex: 10,
            width: "100%",
            height: "100%",
            fontFamily: "inter_r",
            color: colors.black200,
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
