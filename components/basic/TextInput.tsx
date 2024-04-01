import  DatePicker from "react-native-modern-datepicker";
import {
    StyleSheet,
    Text,
    View,
    TextInput as RTtextInput,
    Pressable,
    Alert,
    Modal
} from "react-native";
import React, { useState } from "react";
import { ThemeInterface, useTheme, useThemeStyles } from "@/theme";
import { Ionicons } from "@expo/vector-icons";


import GroupSelection, {
    Option as SelectionItem
} from "@comp/basic/GroupSelection";
interface Props {
    value: string;
    onChangeText?: (value: string) => void;
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
    h?: number;
    displayHelp?: boolean;
    help?: JSX.Element;
    isRequire?: boolean;
    label?: string;
    isSelection?: boolean;
    data?: SelectionItem[];
    onChangeSelection?: (
        value: number | number[],
        item: SelectionItem | SelectionItem[]
    ) => void;
    selectionLabel?: JSX.Element;
    multipleSelect?: boolean;
    selectedId?: number | number[];
    icon?: (colors: string, size: number) => JSX.Element;
    isPicker?: boolean;
    onChangePicker?: (value: string) => void;
}

const TextInput = (props: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    const {
        isPassword = false,
        value,
        inputMode = "text",
        onChangeText = (value: string) => {},
        placeholder,
        h,
        isRequire = false,
        displayHelp = false,
        help,
        label,
        isSelection = false,
        data = [],
        onChangeSelection = () => {},
        selectionLabel = "",
        multipleSelect = false,
        selectedId = 1,
        icon,
        isPicker = false,
        onChangePicker = () => {}
    } = props;
    const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(true);
    const [popupIsVisible, setPopupIsVisible] = useState<boolean>(false);

    return (
        <>
            <View style={style.inputContainer}>
                <View style={style.labelContainer}>
                    {label && <Text style={style.label}>{label}</Text>}
                    {isRequire && (
                        <View style={style.isRequireIconContainer}>
                            <Text style={style.isRequireIcon}>*</Text>
                        </View>
                    )}
                </View>
                <Pressable
                    style={style.textInputContainer(h)}
                    onPress={() => isSelection&&setPopupIsVisible(true)}
                >
                    {icon && (
                        <View style={style.iconContainer}>
                            {icon(colors.black100, size.s5)}
                        </View>
                    )}
                    <RTtextInput
                        style={style.textInput}
                        secureTextEntry={isPassword && passwordIsVisible}
                        value={value}
                        inputMode={inputMode}
                        placeholder={placeholder}
                        placeholderTextColor={colors.gray200}
                        onChangeText={onChangeText}
                        editable={!isSelection}
                    ></RTtextInput>
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
                    {isSelection && (
                        <Pressable
                            style={style.rightIconContainer}
                            onPress={() => setPopupIsVisible(prev => !prev)}
                        >
                            <Ionicons
                                name={
                                    !popupIsVisible
                                        ? "chevron-down"
                                        : "chevron-up"
                                }
                                size={size.s5}
                                color={colors.gray300}
                            />
                        </Pressable>
                    )}
                </Pressable>
                {popupIsVisible && (
                    <Modal
                        transparent
                        onRequestClose={() => {
                            setPopupIsVisible(false);
                        }}
                    >
                        <Pressable
                            style={style.modalInner}
                            onPress={() => setPopupIsVisible(false)}
                        >
                            {isPicker ? (
                                <View style={style.pickerContainer}>
                                    <DatePicker
                                        onDateChange={(date: string) => {
                                            props.onChangePicker &&
                                                props.onChangePicker(date);
                                        }}
                                        mode="calendar"
                                        minuteInterval={30}
                                        style={{ borderRadius: size.s3 }}
                                        options={{
                                            backgroundColor: colors.w,
                                            textHeaderColor: colors.green300,
                                            textDefaultColor: colors.black200,
                                            selectedTextColor: colors.purple300,
                                            mainColor: colors.black300,
                                            textSecondaryColor: colors.blue300,
                                            borderColor: colors.gray100 + "00",
                                            defaultFont: "inter_m",
                                            headerFont: "inter_sb",
                                            textFontSize: size.s3 * 1.3,
                                            textHeaderFontSize: size.s5
                                        }}
                                    />
                                </View>
                            ) : (
                                <GroupSelection
                                    data={data}
                                    onChange={(
                                        value: number | number[],
                                        item: SelectionItem | SelectionItem[]
                                    ) => {
                                        onChangeSelection &&
                                            onChangeSelection(value, item);
                                    }}
                                    optionLabel={selectionLabel}
                                    unique={!multipleSelect}
                                    selectedId={selectedId}
                                />
                            )}
                        </Pressable>
                    </Modal>
                )}

                {displayHelp && <View style={style.helperTextContainer}></View>}
            </View>
        </>
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
        iconContainer: {
            borderRightColor: colors.gray200,
            borderRightWidth: size.s1 / 10,
            justifyContent: "center",
            alignItems: "center",
            minWidth: size.s8,
            marginRight: size.s2,
            marginLeft: -size.s3
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
        },
        modalView: {
            backgroundColor: colors.w,
            borderRadius: size.s2,
            alignItems: "center",
            shadowColor: colors.b,
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: size.s1 / 2,
            width: "100%",
            // position: "absolute",
            zIndex: 10000
        },
        modalInner: {
            backgroundColor: "rgba(0,0,0,0.7)",
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        },
        pickerContainer: {
            width: "85%"
        }
    });
