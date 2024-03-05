import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import { days, month } from "../data/calendarData";
export type CalendarHeaderDay = { name: string }[];
export type CalendarEvent = { eventId: string; color: string };
export type CalendarDay = {
    name: number;
    dayId: string;
    isActive: boolean;
    events: CalendarEvent[];
};
export type CalendarWeek = { weekId: number; days: CalendarDay[] };
export type CalendarMonth = CalendarWeek[];
interface Props {
    dayName: CalendarHeaderDay;
    monthData: CalendarMonth;
    onPressDay: (day: CalendarDay) => void;
}

const MonthlyCalendar = ({
    dayName = days,
    monthData = month,
    onPressDay = () => {}
}: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    const [currentCalendarInfo, setCurrentCalendarInfo] = useState({
        activeDay: { name: 2, dayId: 4, weekId: 0 },
        selectDay: {
            name: 1,
            dayId: 0,
            weekId: 0
        }
    });

    return (
        <View style={style.calendarContainerInner}>
            <View style={style.calendarHeader}>
                {dayName.map((day, i) => (
                    <View key={day.name + i} style={style.cell}>
                        <Text
                            style={style.dayNameStyle(
                                currentCalendarInfo.activeDay.dayId === i
                            )}
                        >
                            {day.name}
                        </Text>
                    </View>
                ))}
            </View>
            <View style={style.calendarBody}>
                {monthData.map((week, i) => (
                    <View
                        key={String(i + week.weekId)}
                        style={style.calendarBodyWeek}
                    >
                        {week.days.map((day, index) => {
                            useEffect(() => {
                                if (day.isActive) {
                                    setCurrentCalendarInfo(prev => ({
                                        ...prev,
                                        activeDay: {
                                            name: day.name,
                                            dayId: day.dayId,
                                            weekId: day.weekId
                                        }
                                    }));
                                }
                            }, [day.isActive]);
                            const isSelect =
                                day.name === currentCalendarInfo.selectDay.name;
                            const isActive =
                                day.name === currentCalendarInfo.activeDay.name;
                            return (
                                <View key={index} style={style.cell}>
                                    <Pressable
                                        style={({ pressed }) =>
                                            style.daysPressable({
                                                isActive,
                                                isSelect
                                            })
                                        }
                                        onPress={() => {
                                          if(day.name===null) return 
                                            setCurrentCalendarInfo(prev => ({
                                                ...prev,
                                                selectDay: {
                                                    name: day.name,
                                                    dayId: day.dayId,
                                                    weekId: day.weekId
                                                }
                                            }));
                                            onPressDay({
                                                name: day.name,
                                                dayId: day.dayId,
                                                isActive: day.isActive,
                                                events: day.events
                                            });
                                        }}
                                    >
                                        {({ pressed }) => (
                                            <>
                                                <Text
                                                    style={style.daysNumberStyle(
                                                        {
                                                            isActive,
                                                            isSelect
                                                        }
                                                    )}
                                                >
                                                    {day.name}
                                                </Text>
                                                {(!isActive && !isSelect) && (
                                                    <View
                                                        style={
                                                            style.eventDotContainer
                                                        }
                                                    >
                                                        {day.events
                                                            .slice(0, 3)
                                                            .map(
                                                                (
                                                                    event,
                                                                    index
                                                                ) => (
                                                                    <View
                                                                        key={String(
                                                                            index
                                                                        )}
                                                                        style={style.eventDot(
                                                                            event.color
                                                                        )}
                                                                    />
                                                                )
                                                            )}
                                                    </View>
                                                )}
                                            </>
                                        )}
                                    </Pressable>
                                </View>
                            );
                        })}
                    </View>
                ))}
            </View>
        </View>
    );
};

export default MonthlyCalendar;

const styles = ({ colors, size }) =>
    StyleSheet.create({
        calendarContainerInner: {
            paddingVertical: size.s4,

            width: size.width * 0.9,
            //  justifyContent:'center',
            alignItems: "center"
        },
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
        calendarBody: {
            width: "100%",
            gap: size.s4,
            paddingTop: size.s3
        },
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
            flexDirection:'row',
            gap:size.s1
        }
    });
