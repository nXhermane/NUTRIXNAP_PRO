import { StyleSheet, View,Text } from "react-native";
import { ThemeInterface, useTheme, useThemeStyles } from "@/theme";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import TextInput, { Props as TextInputProps } from "./TextInput";
import DateTimePicker, {
    DateTimePickerEvent
} from "@react-native-community/datetimepicker";
interface Props
    extends Omit<TextInputProps, "label" | "value" | "icon" | "placeholder"> {
    label: string;
    isRequire?: boolean;
    value: string;
    onChange: (date: Date) => void;

    datePlaceholder?: string;
    timePlaceholder?: string;
}
const DateTimeInput = (props: Props) => {
    const { colors, size, isLightTheme } = useTheme();
    const style = useThemeStyles(styles);
    const {
        label = "Date & Time",
        isRequire = false,
        onChange,
        placeholder = "YYYY-MM-DD",
        value = new Date(),
        r,
        timePlaceholder,
        datePlaceholder
    } = props;

    const [displayTimePopup, setDisplayTimePopup] = useState<boolean>(false);
    const [displayDatePopup, setDisplayDatePopup] = useState<boolean>(false);
    const [dateTime, setDateTime] = useState<Date>(new Date(value));

    //const [time, setTime] = useState(new Date(1598051730000));

    const onChangeDate = (event: DateTimePickerEvent, selectedDate: Date) => {
        setDisplayDatePopup(false);
        const currentDate = selectedDate;
        setDateTime(currentDate);
        onChange && onChange(currentDate);
    };
    const onChangeTime = (event: DateTimePickerEvent, selectedDate: Date) => {
        setDisplayTimePopup(false);
        const currentTime = selectedDate;
        setDateTime(currentTime);
        onChange && onChange(currentTime);
    };

    return (
        <View style={style.selectionInputContainer}>
            <View style={style.labelContainer}>
                {label && (
                    <Text style={[style.label, props.labelStyle]}>{label}</Text>
                )}
                {isRequire && (
                    <View style={style.isRequireIconContainer}>
                        <Text style={style.isRequireIcon}>*</Text>
                    </View>
                )}
            </View>
            <View style={style.datetimeInputContainer}>
                <TextInput
                    isRequire={isRequire}
                    value={dateTime.toLocaleDateString().split("/").join(".")}
                    editable={false}
                    placeholder={datePlaceholder}
                    onPress={() =>
                        setDisplayDatePopup((prev: boolean) => !prev)
                    }
                    rightIcon={(color, size) => (
                        <Ionicons
                            name={
                                displayDatePopup ? "chevron-up" : "chevron-down"
                            }
                            color={colors.black200}
                        />
                    )}
                    r={r && r}
                    icon={(color, size) => (
                        <Ionicons
                            name={"calendar-outline"}
                            color={colors.gray300}
                            size={size}
                        />
                    )}
                    st={{
                        width: "60%",
                        paddingHorizontal: 0
                    }}
                />
                <TextInput
                    isRequire={isRequire}
                    value={dateTime
                        .toLocaleTimeString()
                        .split(":")
                        .slice(0, -1)
                        .join(":")}
                    editable={false}
                    placeholder={timePlaceholder}
                    onPress={() =>
                        setDisplayTimePopup((prev: boolean) => !prev)
                    }
                    rightIcon={(color, size) => (
                        <Ionicons
                            name={
                                displayTimePopup ? "chevron-up" : "chevron-down"
                            }
                            color={colors.black200}
                        />
                    )}
                    r={r && r}
                    st={{
                        paddingHorizontal: 0,
                        width: "40%"
                    }}
                    icon={(color, size) => (
                        <SimpleLineIcons
                            name={"clock"}
                            color={colors.gray300}
                            size={size}
                        />
                    )}
                />
            </View>
            {displayDatePopup && (
                <DateTimePicker
                    testID="datePicker"
                    value={dateTime}
                    mode={"date"}
                    onChange={onChangeDate}
                    display={"calendar"}
                    themeVariant={isLightTheme ? "light" : "dark"}
                />
            )}
            {displayTimePopup && (
                <DateTimePicker
                    testID="TimePicker"
                    value={dateTime}
                    mode={"time"}
                    onChange={onChangeTime}
                    themeVariant={isLightTheme ? "light" : "dark"}
                />
            )}
        </View>
    );
};

export default DateTimeInput;

const styles = ({ colors, size }: ThemeInterface) =>
    StyleSheet.create({
        selectionInputContainer: {
            width: "100%",
            gap: size.s2,
            paddingHorizontal: size.s2
        },
        datetimeInputContainer: {
            flexDirection: "row"
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
    });
