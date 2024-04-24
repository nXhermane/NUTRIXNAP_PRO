import {
    StyleSheet,
    Text,
    View,
    Pressable,
    FlatList,
    ScrollView,
    GestureDetector,
    Gesture
} from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
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
import useCalendarData from "@pack/calendar/hooks/useCalendarData";
import useCalendarNavigation from "@pack/calendar/hooks/useCalendarNavigation";
import useCalendarInitialization from "@pack/calendar/hooks/useCalendarInitialization";
import { day } from "../data/agendarData";
import { days, month } from "../data/calendarData";
import MonthlyCalendar from "./MonthlyCalendar";
import HourMark from "./HourMark";
import DynamicGestorSelectorManager from "./DynamicGestorSelectorManager";
import { selectorTapPositionCalculator } from "./../utils";

type Props = {};

const Agendar: React.FC<Props> = (props: Props) => {
    const [init, calendar] = useCalendarInitialization();
    const [nav] = useCalendarNavigation(calendar);
    const [getData] = useCalendarData(calendar);
    const [Month, isActive] = getData["CM"]();

    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    const [Changed, setChanged] = useState(true);
    const [format, setFormat] = useState(7);
    const demoRef = React.useRef<ScrollView>(null);
    const [selectorIsVisible, setSelectorIsVisible] = useState(false);
    const [selectorWidth, setSelectorWidth] = useState("100%");
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
    const translateX = useSharedValue<number>(0);
    const cellHeight = useSharedValue<number>(40);
    const selectorOffset = useSharedValue({ x: 0, y: 0 });
    const selectorStart = useSharedValue({ x: 0, y: 0 });
    const selectorIsPressed = useSharedValue(false);
    const selectorHeight = useSharedValue<number>(cellHeight.value);
    const selectorHeightStart = useSharedValue<number>(cellHeight.value);
    const selectorTopDist = useSharedValue<number>(0);
    const cellAnimatedStyle = useAnimatedStyle(() => {
        return {
            minHeight: cellHeight.value
        };
    });

    const [scrollViewVisibleContentWidth, setScrollViewVisibleContentWidth] =
        useState<number>(0);
    const scrollViewVisibleContentHeight = useDerivedValue(
        () => cellHeight.value * 24
    );
    const [selectorArray, setSelectorArray] = useState<number[]>([]);
    const addMewSelector = () => {};
    const headerFlatListRef = useAnimatedRef<FlatList>();
    const bodyFlatListRef = useAnimatedRef<FlatList>();
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
    const tapGesture = Gesture
