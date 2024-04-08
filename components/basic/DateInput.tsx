import { StyleSheet, View } from "react-native";
import { ThemeInterface, useTheme, useThemeStyles } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import TextInput from "./TextInput";
import DateTimePicker, {
    DateTimePickerEvent
} from "@react-native-community/datetimepicker";
interface Props {
    label: string;
    isRequire?: boolean;
    value: string | JSX.Element;
    onChange: (date: string) => void;
    placeholder?: string;
}
const DateInput = (props: Props) => {
    const { colors, size, isLightTheme } = useTheme();
    const style = useThemeStyles(styles);
    const {
        label = "Date",
        isRequire = false,
        onChange = () => {},
        placeholder = "YYYY-MM-DD",
        value = ""
    } = props;

    const [displayPopup, setDisplayPopup] = useState<boolean>(false);
    const [date, setDate] = useState(new Date(1598051730000));

    const onChangeDate = (event: DateTimePickerEvent, selectedDate: Date) => {
        setDisplayPopup(false);
        const currentDate = selectedDate;
        onChange && onChange(selectedDate.toLocaleDateString());
        setDate(currentDate);
    };

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
                icon={(color, size) => (
                    <Ionicons
                        name={"calendar-outline"}
                        color={colors.gray300}
                        size={size}
                    />
                )}
                {...props}
            />
            {displayPopup && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={"date"}
                    
                    onChange={onChangeDate}
                    display={"calendar"}
                    themeVariant={isLightTheme ? "light" : "dark"}
                />
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
