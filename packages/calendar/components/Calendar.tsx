import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
    withTiming,
    useAnimatedScrollHandler
} from "react-native-reanimated";
import MonthlyCalendar from "./MonthlyCalendar";
import useCalendarData from "@pack/calendar/hooks/useCalendarData";
import useCalendarNavigation from "@pack/calendar/hooks/useCalendarNavigation";
import useCalendarInitialization from "@pack/calendar/hooks/useCalendarInitialization";
import { MaterialIcons } from "@expo/vector-icons";
interface Props {}

const Calendar = (props: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    const translateX = useSharedValue(0);
    const [init, calendar] = useCalendarInitialization();
    const [nav] = useCalendarNavigation(calendar);
    const [getData] = useCalendarData(calendar);
    const DayInWeekName = getData["WDN"]();
    const MonthName = getData["MN"]();
    const [currentYear, setCurrentYear] = useState(calendar.currentYear);
    const [currentMonth, setCurrentMonth] = useState(calendar.currentMonth);
    const [currentDay, setCurrentDay] = useState(calendar.currentDay);

    const [calendaData, setCalendaData] = useState(getData["Y"](currentYear));
    const [calendarDataKeys, setCalendarDataKeys] = useState(
        Object.keys(calendaData)
    );
    const [currentCalendarInfo, setCurrentCalendarInfo] = useState({
        activeDay: { value: 0, dayId: 0, weekId: 0 }
    });
    useEffect(() => {
      console.log("calendarDATA UPDATE")
        setCalendarDataKeys(Object.keys(calendaData));
    }, [calendaData]);
    const nextMonth = () => {
        const yearMonth = Object.keys(calendaData);
        const firstEl = yearMonth[0];
        const firstElDFormat = getData["DateFromString"](firstEl);
        const lastEl = yearMonth[yearMonth.length - 1];
        const lastElDFormat = getData["DateFromString"](lastEl);

        const newMonth = [
            lastElDFormat[1] === 11 ? lastElDFormat[0] + 1 : lastElDFormat[0],
            lastElDFormat[1] === 11 ? 0 : lastElDFormat[1] + 1
        ];
        const [month, isActive] = getData["M"](newMonth[0], newMonth[1]);
        const newMonthData = {
            weeks: month,
            isActive: isActive,
            monthId: newMonth[1]
        };
        const newMonthKey = getData["FDate"]("-", newMonth[0], newMonth[1]);

        setCalendaData(prev => {
            const data = prev;
            data[newMonthKey] = newMonthData;
            return data;
        });
    };
    const prevMonth = () => {
        const yearMonth = Object.keys(calendaData);
        console.log(yearMonth);
    };
    const scrollHandler = useAnimatedScrollHandler(event => {
        translateX.value = event.contentOffset.x;
        //console.log(event);
    });

    return (
        <View style={style.calendarContainer}>
            <View style={style.calendarHeader}>
                <View style={style.navIconContainer}>
                    <Pressable onPress={prevMonth}>
                        {({ pressed }) => (
                            <MaterialIcons
                                name={"arrow-left"}
                                color={
                                    pressed
                                        ? colors.tangerine
                                        : colors.text.primary
                                }
                                size={pressed ? size.s5 : size.s8}
                            />
                        )}
                    </Pressable>
                </View>
                <View style={style.currentDate}>
                    <Text style={style.currentDateText}>
                        {MonthName[currentMonth] + " " + String(currentYear)}
                    </Text>
                </View>
                <View style={style.navIconContainer}>
                    <Pressable onPress={nextMonth}>
                        {({ pressed }) => (
                            <MaterialIcons
                                name={"arrow-right"}
                                color={
                                    pressed
                                        ? colors.tangerine
                                        : colors.text.primary
                                }
                                size={pressed ? size.s5 : size.s8}
                            />
                        )}
                    </Pressable>
                </View>
            </View>
            <Animated.FlatList
                data={calendarDataKeys}
                renderItem={({ item }) => {
                        //                   <MonthlyCalendar
                        //     daysName={DayInWeekName}
                        //     monthData={calendaData[item].weeks}
                        //     onPressDay={pressedDay => {}}
                        // />
                        
                        console.log(item)
                    return (
<Text style={{color:'white',
  fontSize:size.s50
}}>{item}</Text>
                    );
                }}
                horizontal
                contentContainerStyle={style.calendarMonthlyContainer}
                ItemSeparatorComponent={() => (
                    <View
                        style={{
                            width: size.width * 0.1
                        }}
                    ></View>
                )}
                ListHeaderComponent={() => (
                    <View
                        style={{
                            width: size.width * 0.05
                        }}
                    ></View>
                )}
                ListFooterComponent={() => (
                    <View
                        style={{
                            width: size.width * 0.05
                        }}
                    ></View>
                )}
                initialScrollIndex={0}
                snapToInterval={size.width}
                scrollEventThrottle={32}
                pagingEnabled={true}
                bounces={false}
                bouncesZoom={false}
                initialNumToRender={1}
                keyExtractor={item => item}
                onScroll={scrollHandler}
            />
        </View>
    );
};

export default Calendar;

const styles = ({ colors, size }) =>
    StyleSheet.create({
        calendarContainer: {
            width: size.width,
            backgroundColor: colors.bg.bg2,
            justifyContent: "center",
            alignItems: "center"
        },
        calendarMonthlyContainer: {
            justifyContent: "center",
            alignItems: "center"
        },
        calendarHeader: {
            height: size.s100 * 0.6,
            width: size.width,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        navIconContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        },
        currentDate: {
            flex: 8,
            justifyContent: "center",
            alignItems: "center"
        },
        currentDateText: {
            color: colors.text.primary,
            fontSize: size.s5,
            fontFamily: "inter",
            fontWeight: "bold"
        }
    });
