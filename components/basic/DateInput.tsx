import { StyleSheet, View } from "react-native";
import { ThemeInterface, useTheme, useThemeStyles } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import TextInput from "./TextInput";
import DatePicker from "react-native-modern-datepicker";
interface Props {
    label: string;
    isRequire?: boolean;
    value: string | JSX.Element;
    onChange: (date: string) => void;
    placeholder?: string;
}
const DateInput = (props: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    const {
        label = "Pays",
        isRequire = false,
        onChange = () => {},
        placeholder = "YYYY-MM-DD",
        value = ""
    } = props;

    const [displayPopup, setDisplayPopup] = useState<boolean>(false);

    return (
        <View style={style.selectionInputContainer}>
            <TextInput
                label={label}
                isRequire={isRequire}
                value={value}
                editable={false}
                placeholder={placeholder}
                onPress={() => setDisplayPopup((prev: boolean) => !prev)}
                rightIcon={(color, size) => (
                    <Ionicons
                        name={displayPopup ? "chevron-up" : "chevron-down"}
                        color={colors.black200}
                    />
                )}
                st={{
                    paddingHorizontal: 0
                }}
            />
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

export default DateInput;

const styles = ({ colors, size }: ThemeInterface) =>
    StyleSheet.create({
        selectionInputContainer: {
            width: "100%",
            gap: size.s2,
            paddingHorizontal: size.s2
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
        }
    });
