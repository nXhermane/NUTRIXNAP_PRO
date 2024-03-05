import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
    withTiming
} from "react-native-reanimated";
import { days, month } from "../data/calendarData";
import MonthlyCalendar from "./MonthlyCalendar";
interface Props {}
const Calendar = (props: Props) => {
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
    const [calendarData, setCalendarData] = useState(
        Array(12).fill({ days, month })
    );

    return (
        <View style={style.calendarContainer}>
            <FlatList
                data={calendarData}
                renderItem={({ day, months }) => (
                    <MonthlyCalendar dayName={day} monthData={months}
                    onPressDay={(pressedDay)=>{
                      
                      
                    }} />
                )}
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
                keyExtractor={(item, index) => String(index)}
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
        }
    });
