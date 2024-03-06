import {
    StyleSheet,
    Text,
    View,
    Pressable,
    FlatList,
    ScrollView
} from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
    withTiming,
    useAnimatedScrollHandler,
    useAnimatedRef,
    useDerivedValue,
    scrollTo,
    runOnJS,
    runOnUI,
    useAnimatedReaction
} from "react-native-reanimated";
import {
    GestureDetector,
    Gesture,
    GestureHandlerRootView
} from "react-native-gesture-handler";
import useCalendarData from "@pack/calendar/hooks/useCalendarData";
import useCalendarNavigation from "@pack/calendar/hooks/useCalendarNavigation";
import useCalendarInitialization from "@pack/calendar/hooks/useCalendarInitialization";
import { day } from "../data/agendarData";
import { days, month } from "../data/calendarData";
import MonthlyCalendar from "./MonthlyCalendar";
import HourMark from "./HourMark";
import DynamicGestorSelectorManager from "./DynamicGestorSelectorManager";
import { selectorTapPositionCalculator } from "./../utils";
interface Props {}

const Agendar = (props: Props) => {
    const [init, calendar] = useCalendarInitialization();
    const [nav] = useCalendarNavigation(calendar);
    const [getData] = useCalendarData(calendar);
    const [Month, isActive] = getData["CM"]();

    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    const [Changed, setChanged] = useState(true);
    const [format, setFormat] = useState(7);
    const demoRef = React.useRef(null);
    const [selectorIsVisible, setSelectorIsVisible] = useState(false);
    const [selectorWidth, setSelectorWidth] = useState("100%");
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
    const translateX = useSharedValue(0);
    const cellHeight = useSharedValue(40);
    const selectorOffset = useSharedValue({ x: 0, y: 0 });
    const selectorStart = useSharedValue({ x: 0, y: 0 });
    const selectorIsPressed = useSharedValue(false);
    const selectorHeight = useSharedValue(cellHeight.value);
    const selectorHeightStart = useSharedValue(cellHeight.value);
    const selectorTopDist = useSharedValue(0);
    const cellAnimatedStyle = useAnimatedStyle(() => {
        return {
            minHeight: cellHeight.value
        };
    });

    const [scrollViewVisibleContentWidth, setScrollViewVisibleContentWidth] =
        useState(0);
    const scrollViewVisibleContentHeight = useDerivedValue(
        () => cellHeight.value * 24
    );
    const [selectorArray, setSelectorArray] = useState([]);
    const addMewSelector = () => {};
    const headerFlatListRef = useAnimatedRef();
    const bodyFlatListRef = useAnimatedRef();
    useAnimatedReaction(
        () => cellHeight.value,
        (val, prev) => {
            if (val === prev || prev === null) return;
            const ratio = val / prev;
            selectorHeight.value = selectorHeight.value * ratio;
            selectorOffset.value = {
                x: selectorOffset.value.x,
                y: selectorOffset.value.y * ratio
            };
            selectorStart.value = {
                x: selectorStart.value.x,
                y: selectorStart.value.y * ratio
            };

            selectorTopDist.value = selectorTopDist.value * ratio;
            selectorHeightStart.value = selectorHeight.value;
        },
        [cellHeight]
    );
    const animation = () => {
        if (cellHeight.value === 40) {
            cellHeight.value = withTiming(100, { duration: 1000 });
        } else {
            cellHeight.value = withTiming(40, { duration: 1000 });
        }
    };
    const scrollHandler = useAnimatedScrollHandler(event => {
        translateX.value = event.contentOffset.x;
    });
    const scrollHandler2 = useAnimatedScrollHandler(event => {
        translateX.value = event.contentOffset.x;
    });
    useDerivedValue(() => {
        scrollTo(bodyFlatListRef, translateX.value, 0, false);
        scrollTo(headerFlatListRef, translateX.value, 0, false);
    });
    const tapGesture = Gesture.Tap()
        .onBegin(() => {})
        .onStart(e => {
            let xPosition = selectorTapPositionCalculator({
                tapValue: e.x,
                globSize: scrollViewVisibleContentWidth,
                format: format
            });
            const yPosition = selectorTapPositionCalculator({
                tapValue: e.y,
                globSize: scrollViewVisibleContentHeight.value,
                format: 24 * 4
            });
            selectorOffset.value = {
                x: translateX.value + xPosition,
                y: yPosition
            };
            selectorStart.value = {
                x: selectorOffset.value.x,
                y: selectorOffset.value.y
            };
        });
    const handleLayout = e => {
        e.persist();

        requestAnimationFrame(() => {
            setScrollViewVisibleContentWidth(e.nativeEvent.layout.width);
        });
    };
    useEffect(() => {
        console.log("Month Update");
    }, [Month]);
    return (
        <View style={style.agendarContainer}>
            <View style={style.agendarHeader}>
                <View style={style.agendarHeaderOneDay}></View>
                <Animated.FlatList
                    onScroll={scrollHandler}
                    ref={headerFlatListRef}
                    horizontal
                    initialScrollIndex={0}
                    snapToInterval={size.width * 0.85}
                    scrollEventThrottle={32}
                    pagingEnabled={true}
                    bounces={false}
                    bouncesZoom={false}
                    initialNumToRender={1}
                    keyExtractor={(item, index) => String(index + item.weekId)}
                    data={Month}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <View style={style.agendarHeaderDays}>
                                {item.days.slice(0, format).map(day => (
                                    <Pressable style={[style.dayCell]}>
                                        <Text style={style.dayCellTitle}>
                                            {days[day.dayId].name}
                                        </Text>
                                        <View
                                            style={style.dayCellValueContainer}
                                        >
                                            <Text style={style.dayCellValue}>
                                                {day.value}
                                            </Text>
                                        </View>
                                    </Pressable>
                                ))}
                            </View>
                        );
                    }}
                />
            </View>
            <ScrollView>
                <View style={style.agendarBody}>
                    <Animated.View style={[style.agendarBodyLateral]}>
                        {day.map((item, index) => (
                            <AnimatedPressable
                                onPress={() => animation()}
                                style={[style.hourCell, cellAnimatedStyle]}
                                key={String(index)}
                            >
                                <Text style={style.hourCellText}>
                                    {item.hour}
                                </Text>
                            </AnimatedPressable>
                        ))}
                        <HourMark
                            offset={selectorOffset}
                            cell={cellHeight}
                            //getHour={(val)=>console.log(val)}

                            isActive
                        />
                        <HourMark
                            offset={selectorOffset}
                            cell={cellHeight}
                            add={selectorHeight}
                        />
                    </Animated.View>
                    <View>
                        <GestureDetector gesture={tapGesture}>
                            <Animated.ScrollView
                                horizontal
                                ref={bodyFlatListRef}
                                onScroll={scrollHandler2}
                                initialScrollIndex={0}
                                snapToInterval={size.width * 0.85}
                                scrollEventThrottle={32}
                                pagingEnabled={true}
                                bounces={false}
                                bouncesZoom={false}
                                initialNumToRender={1}
                                contentContainerStyle={{
                                    flexGrow: 1
                                }}
                                showsHorizontalScrollIndicator={false}
                            >
                                {Month.map((item, n) => {
                                    return (
                                        <View
                                            key={item.weekId + "" + n}
                                            style={[style.agendarBodyGuide]}
                                            onLayout={handleLayout}
                                        >
                                            {Array(format)
                                                .fill(0)
                                                .map((i, index) => (
                                                    <View
                                                        onLayout={e => {
                                                            setSelectorWidth(
                                                                e.nativeEvent
                                                                    .layout
                                                                    .width
                                                            );
                                                        }}
                                                        style={style.dayColumn}
                                                        key={
                                                            i.dayId + "" + index
                                                        }
                                                    >
                                                        {day.map((item, u) => (
                                                            <AnimatedPressable
                                                                style={[
                                                                    style.dayRow,
                                                                    cellAnimatedStyle
                                                                ]}
                                                                key={String(u)}
                                                                onPress={() =>
                                                                    setSelectorIsVisible(
                                                                        true
                                                                    )
                                                                }
                                                            ></AnimatedPressable>
                                                        ))}
                                                    </View>
                                                ))}
                                        </View>
                                    );
                                })}
                                {selectorIsVisible && (
                                    <DynamicGestorSelectorManager
                                        selectorOffset={selectorOffset}
                                        selectorStart={selectorStart}
                                        selectorIsPressed={selectorIsPressed}
                                        selectorHeight={selectorHeight}
                                        selectorHeightStart={
                                            selectorHeightStart
                                        }
                                        selectorTopDist={selectorTopDist}
                                        cellHeight={cellHeight}
                                        selectorWidth={selectorWidth}
                                        scrollViewVisibleContentWidth={
                                            scrollViewVisibleContentWidth
                                        }
                                        format={format}
                                    />
                                )}
                            </Animated.ScrollView>
                        </GestureDetector>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Agendar;

const styles = ({ colors, size }) =>
    StyleSheet.create({
        agendarContainer: {
            width: size.width,
            height: size.height,
            backgroundColor: colors.bg.bg1,
            justifyContent: "flex-start",
            alignItems: "center"
        },
        agendarHeader: {
            height: size.s100 * 0.8,
            width: size.width,
            backgroundColor: colors.bg.bg2,
            flexDirection: "row"
        },
        agendarHeaderOneDay: {
            width: size.width * 0.15,
            height: "100%",
            backgroundColor: "transparent",
            minWidth: size.s50,
            minHeight: size.s50,
            borderRightColor: colors.gray,
            borderRightWidth: size.s1 / 8
        },
        agendarHeaderDays: {
            width: size.width * 0.85,
            height: "100%",
            backgroundColor: "transparent",
            flexDirection: "row",
            alignItems: "center"
        },
        dayCell: {
            flex: 1,
            height: "100%",
            justifyContent: "center",
            alignItems: "center"
            // borderWidth:size.s1/16,
            // borderColor:colors.gray
        },
        dayCellTitle: {
            fontFamily: "inter",
            fontWeight: "700",
            fontSize: size.s3 * 0.8,
            color: colors.text.primary
        },
        dayCellValueContainer: {
            // backgroundColor: "red",
            width: size.s10 * 0.9,
            height: size.s10 * 0.9,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 500
        },
        dayCellValue: {
            fontFamily: "inter",
            fontWeight: "700",
            fontSize: size.s4,
            color: colors.text.primary
        },
        agendarBody: {
            backgroundColor: colors.bg.bg2,
            width: size.width,
            // height: size.height * 0.9,
            flexDirection: "row"
        },
        agendarBodyLateral: {
            width: size.width * 0.15,
            height: "100%",
            borderRightColor: colors.gray,
            borderRightWidth: size.s1 / 8
        },
        agendarBodyGuide: {
            width: size.width * 0.85,
            height: "100%",
            backgroundColor: colors.bg.bg1,
            flexDirection: "row"
        },
        hourCell: {
            flex: 1,
            alignItems: "center"
        },
        hourCellText: {
            color: colors.text.primary,
            position: "absolute",
            bottom: -9
        },
        dayColumn: {
            flex: 1
        },
        dayRow: {
            flex: 1,
            alignItems: "center",
            borderColor: colors.gray,
            borderWidth: 0.5
        },
        selector: width => ({
            position: "absolute",
            // height: 200,
            width: width,
            borderRadius: size.s3,
            borderColor: colors.tangerine,
            borderWidth: size.s1 / 2
        }),
        selectorBtnTop: {
            position: "absolute",
            width: size.s2 + size.s1,
            height: size.s2 + size.s1,
            backgroundColor: colors.tangerine,
            borderRadius: size.s5,
            borderWidth: size.s1,
            borderColor: colors.bg.bg2,
            top: -(size.s2 + size.s1) / 2,
            left: "15%"
        },
        selectorBtnBottom: {
            position: "absolute",
            width: size.s2 + size.s1,
            height: size.s2 + size.s1,
            backgroundColor: colors.tangerine,
            borderRadius: size.s5,
            borderWidth: size.s1,
            borderColor: colors.bg.bg2,
            bottom: -(size.s2 + size.s1) / 2,
            right: "15%"
        }
    });
