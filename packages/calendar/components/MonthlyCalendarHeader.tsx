import { StyleSheet, Text, View } from "react-native";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";

interface Props {
    // Define your props here
}

const MonthlyCalendarHeader = ({ daysName, activeDayName }: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    return (
        <View style={style.calendarHeader}>
            {daysName.map((day, i) => (
                <View key={day + i} style={style.cell}>
                    <Text style={style.dayNameStyle(activeDayName === i)}>
                        {day}
                    </Text>
                </View>
            ))}
        </View>
    );
};

export default MonthlyCalendarHeader;

const styles = ({ colors, size }) =>
    StyleSheet.create({
        calendarHeader: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%"
        },
        dayNameStyle: isActive => ({
            fontFamily: "inter",
            fontSize: size.s3,
            color: !isActive ? colors.text.primary : colors.tangerine,
            fontWeight: "700"
        }),
        cell: {
            width: size.s10,
            height: size.s8,
            justifyContent: "center",
            alignItems: "center"
        }
    });
