import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";

type CalendarMarkerEvent = {
    eventId: number;
    color: string;
    markedDay: string;
};
type CalendarDay = {
    value: number;
    dayId: string;
    isActive: boolean;
    events: CalendarMarkerEvent[];
    dateString: string;
};
type CalendarWeek = { weekId: number; days: CalendarDay[] };
type CalendarMonth = CalendarWeek[];
interface Props {
    weekData: CalendarWeek[];
    currentCalendarInfo: any;
    setCurrentCalendarInfo: (value: any) => void;
    onPressDay: (day: CalendarDay) => void;
    setActiveDayName: (value: string) => void;
}

const MonthlyCalendarWeek = ({
    weekData,
    currentCalendarInfo,
    setCurrentCalendarInfo,
    onPressDay,
    setActiveDayName
}: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    return (
        <View style={style.calendarBodyWeek}>
            {weekData.days.map((day, index) => {
                React.useEffect(() => {
                    if (day.isActive) {
                        setActiveDayName(day.dayId);
                    }
                }, [day.isActive]);
                const isSelect =
                    day.value === currentCalendarInfo.selectDay.value;
                return (
                    <View key={index} style={style.cell}>
                        <Pressable
                            style={({ pressed }) =>
                                style.daysPressable({
                                    isActive: day.isActive,
                                    isSelect
                                })
                            }
                            onPress={() => {
                                if (day.value === null) return;
                                setCurrentCalendarInfo(prev => ({
                                    selectDay: {
                                        value: day.value,
                                        dayId: day.dayId,
                                        weekId: day.weekId
                                    }
                                }));
                                onPressDay({
                                    value: day.value,
                                    dayId: day.dayId,
                                    isActive: day.isActive,
                                    events: day.events,
                                    dateString: day.dateString
                                });
                            }}
                        >
                            {({ pressed }) => (
                                <>
                                    <Text
                                        style={style.daysNumberStyle({
                                            isActive: day.isActive,
                                            isSelect
                                        })}
                                    >
                                        {day.value}
                                    </Text>
                                    {!day.isActive && !isSelect && (
                                        <View style={style.eventDotContainer}>
                                            {day.events
                                                .slice(0, 3)
                                                .map((event, index) => (
                                                    <View
                                                        key={String(index)}
                                                        style={style.eventDot(
                                                            event.color
                                                        )}
                                                    />
                                                ))}
                                        </View>
                                    )}
                                </>
                            )}
                        </Pressable>
                    </View>
                );
            })}
        </View>
    );
};

export default MonthlyCalendarWeek;

const styles = ({ colors, size }) =>
    StyleSheet.create({
        calendarBodyWeek: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: size.s8
        },
        daysPressable: ({ isActive, isSelect }) => ({
            backgroundColor: isActive
                ? colors.tangerine
                : isSelect
                ? colors.yell_gre
                : "transparent",
            width: size.s7,
            height: size.s7,
            borderRadius: 500,
            justifyContent: "center",
            alignItems: "center"
        }),
        daysNumberStyle: ({ isActive, isSelect }) => ({
            fontFamily: "inter",
            fontSize: size.s3,
            color: isActive
                ? colors.text.primary
                : isSelect
                ? colors.blue
                : colors.text.primary,
            fontWeight: "700"
        }),
        cell: {
            width: size.s10,
            height: size.s10,
            justifyContent: "center",
            alignItems: "center"
        },
        eventDot: color => ({
            width: size.s1,
            height: size.s1,
            borderRadius: size.s1 * 4,
            backgroundColor: color
        }),
        eventDotContainer: {
            position: "absolute",
            bottom: 0,
            flexDirection: "row",
            gap: size.s1
        }
    });
