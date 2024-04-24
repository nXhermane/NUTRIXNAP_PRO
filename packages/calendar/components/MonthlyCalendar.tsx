import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import React, { useEffect, useState, useLayoutEffect, useCallback, useMemo } from "react";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import MonthlyCalendarHeader from "./MonthlyCalendarHeader";
import MonthlyCalendarWeek from "./MonthlyCalendarWeek";

export type CalendarHeaderDay = string[];
export type CalendarMarkerEvent = {
    eventId: number;
    color: string;
    markedDay: string;
};
export type CalendarDay = {
    value: number;
    dayId: string;
    isActive: boolean;
    events: CalendarMarkerEvent[];
    dateString: string;
};
export type CalendarWeek = { weekId: number; days: CalendarDay[] };
export type CalendarMonth = CalendarWeek[];

interface Props<T> {
    daysName: CalendarHeaderDay;
    monthData: CalendarMonth;
    onPressDay: (day: CalendarDay) => void;
}

const MonthlyCalendar = <T extends {}>({
    daysName,
    monthData,
    onPressDay = (param: CalendarDay) => {}
}: Props<T>) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    const [currentCalendarInfo, setCurrentCalendarInfo] = useState<T>({
        selectDay: {
            value: 1,
            dayId: 0,
            weekId: 0
        }
    });
    const [activeDayName, setActiveDayName] = useState<string | null>(null);

    const handlePressDay = useCallback((day: CalendarDay) => {
        onPressDay(day);
        setCurrentCalendarInfo((prev) => ({ ...prev, selectDay: day }));
    }, [onPressDay]);

    const handleSetActiveDayName = useCallback((name: string | null) => {
        if (name === null || name === activeDayName) return;
        setActiveDayName(name);
    }, [activeDayName]);

    const memoizedMonthData = useMemo(() => monthData, [monthData]);

    return (
        <View style={style.monthLyCalendarContainer}>
            <View style={style.calendarContainerInner}>
                <MonthlyCalendarHeader
                    activeDayName={activeDayName}
                    daysName={daysName}
                />
                <View style={style.calendarBody}>
                    {memoizedMonthData.map((week, i) => (
                        <MonthlyCalendarWeek
                            key={String(i + week.weekId)}
                            weekData={week}
                            currentCalendarInfo={currentCalendarInfo}
                            setCurrentCalendarInfo={setCurrentCalendarInfo}
                            onPressDay={handlePressDay}
                            setActiveDayName={handleSetActiveDayName}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
};

export default MonthlyCalendar;

const styles = ({ colors, size }) =>
    StyleSheet.create({
        monthLyCalendarContainer: {
            width: size.width,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: size.width * 0.05,
        },
        calendarContainerInner: {
            paddingVertical: size.s4,
            width: "100%",
            alignItems: "center"
        },
        calendarBody: {
            width: "100%",
            gap: size.s4,
            paddingTop: size.s1
        }
    });
