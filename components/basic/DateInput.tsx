import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
    FlatList,
    Modal
} from "react-native";
import { ThemeInterface, useTheme, useThemeStyles } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import Fuse from "fuse.js";
import React, { useState } from "react";
import DatePicker from "react-native-modern-datepicker";
interface Props {
    label: string;
    isRequire?: boolean;
    value: string | JSX.Element;
    onChange: (date: string) => void;
}
const SelectionInput = (props: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    const {
        label = "Pays",
        isRequire = false,
        onChange = () => {},
        unique = false,
        placeholder = "YYYY-MM-DD",
        value = ""
    } = props;

    const [displayPopup, setDisplayPopup] = useState<boolean>(false);

    return (
        <View style={style.selectionInputContainer}>
            <View style={style.labelContainer}>
                {label && <Text style={style.label}>{label}</Text>}
                {isRequire && (
                    <View style={style.isRequireIconContainer}>
                        <Text style={style.isRequireIcon}>*</Text>
                    </View>
                )}
            </View>
            <Pressable
                style={style.inputContainer}
                onPress={() => setDisplayPopup((prev: boolean) => !prev)}
            >
                <TextInput
                    style={style.textInput}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={colors.gray200}
                    editable={false}
                />
                <Pressable
                    style={style.rightIconContainer}
                    onPress={() => setDisplayPopup((prev: boolean) => !prev)}
                >
                    <Ionicons
                        name={displayPopup ? "chevron-up" : "chevron-down"}
                        color={colors.black200}
                    />
                </Pressable>
            </Pressable>
            {displayPopup && (
                <View style={style.floatingSelectList}>
                    <DatePicker
                        onDateChange={(date: string) => {
                            onChange && onChange(date.split("/").join("-"));
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
            )}
        </View>
    );
};

export default SelectionInput;

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
        rightIconContainer: {
            position: "absolute",
            right: size.s3,
            alignSelf: "center"
        },
        inputContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            borderColor: colors.gray200,
            borderWidth: size.s1 / 10,
            borderRadius: size.s100,
            height: size.s50 * 0.8,
            paddingHorizontal: size.s4,
            backgroundColor: colors.bg.secondary
        },
        floatingSelectList: {
            position: "absolute",
            top: "110%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            // height: size.s100,
            maxHeight: size.height / 2,
            backgroundColor: colors.w,
            zIndex: 20000,
            borderRadius: size.s2,
            elevation: 4,
            marginHorizontal: size.s2,
            borderWidth: size.s1 / 10,
            borderColor: colors.gray200
        },
        countryItem: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            height: size.s50,
            borderBottomWidth: size.s1 / 18,
            borderBottomColor: colors.gray100,
            paddingHorizontal: size.s4,
            gap: size.s5
        },
        itemLabel: {
            fontFamily: "inter_m",
            color: colors.black300,
            fontSize: size.s3
        },
        itemFlag: {}
    });
