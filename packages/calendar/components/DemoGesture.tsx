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
    useAnimatedReaction,
    scrollTo,
    runOnJS,
    runOnUI
} from "react-native-reanimated";
import {
    GestureDetector,
    Gesture,
    GestureHandlerRootView
} from "react-native-gesture-handler";
import { selectorTapPositionCalculator } from "./../utils";
interface Props {
    // Define your props here
}

const GestureSelector = (props: Props) => {
    const {
        selectorWidth,
        selectorOffset,
        selectorStart,
        selectorIsPressed,
        selectorHeight,
        selectorHeightStart,
        selectorTopDist,
        cellHeight,
        scrollViewVisibleContentWidth,
        format
    } = props;

    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);

    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
    const selectorAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: selectorOffset.value.y -(selectorHeight.value *1)},
            { translateX: selectorOffset.value.x - (selectorWidth* -1)}
        ],
        height: selectorHeight.value,
        backgroundColor: selectorIsPressed.value
            ? colors.blue + "20"
            : "transparent"
    }));
    const gesture = Gesture.Pan()
        .onBegin(() => {
            selectorIsPressed.value = true;
        })
        .onUpdate(e => {
            const ecart = cellHeight.value / 4;
            const step = Math.floor(
                (e.translationY + selectorStart.value.y) / ecart
            );
            const ecartX = selectorWidth;
            const stepX = Math.floor(
                (e.translationX + selectorStart.value.x + ecartX) / ecartX
            );

            const x = selectorTapPositionCalculator({
                tapValue: e.translationX + selectorStart.value.x,
                globSize: scrollViewVisibleContentWidth,
                format: format
            });

            if (
                selectorOffset.value.y >= 0 &&
                selectorOffset.value.y <=
                    cellHeight.value * 24 - selectorHeight.value
            ) {
                selectorOffset.value = {
                    y: step * ecart,
                    x: stepX * ecartX
                };
            } else {
                if (selectorOffset.value.y < 0) {
                    //  console.log(-step * 10 - selectorHeight.value);
                    // selectorOffset.value = {
                    //                         y: -step * 10 - selectorHeight.value,
                    //                         x:
                    //                             e.translationX +
                    //                             selectorStart.value.x +
                    //                             selectorWidth
                    //                     };
                } else
                    selectorOffset.value = {
                        y: cellHeight.value * 24 - selectorHeight.value,
                        x: e.translationX + selectorStart.value.x
                    };
            }
        })
        .onEnd(() => {
            selectorStart.value = {
                y: selectorOffset.value.y,
                x: selectorOffset.value.x
            };
        })
        .onFinalize(() => {
            selectorIsPressed.value = false;
        });
    const pointTopGesture = Gesture.Pan()
        .onBegin(() => {
            selectorTopDist.value =
                selectorOffset.value.y + selectorHeight.value;
        })
        .onUpdate(e => {
            const ecart = cellHeight.value / 4;
            const step = Math.floor(
                (-e.translationY + selectorHeightStart.value) / ecart
            );

            selectorHeight.value =
                step * ecart || -e.translationY + selectorHeightStart.value;
            selectorOffset.value = {
                y: selectorTopDist.value - selectorHeight.value,
                x: selectorOffset.value.x
            };
        })
        .onEnd(() => {
            selectorHeightStart.value = selectorHeight.value;
            selectorStart.value = {
                y: selectorOffset.value.y,
                x: selectorOffset.value.x
            };
        })
        .onFinalize(() => {});
    const pointBottomGesture = Gesture.Pan()
        .onBegin(() => {})
        .onUpdate(e => {
            const ecart = cellHeight.value / 4;
            const step = Math.floor(
                (e.translationY + selectorHeightStart.value) / ecart
            );

            selectorHeight.value =
                step * ecart || e.translationY + selectorHeightStart.value;
        })
        .onEnd(() => {
            selectorHeightStart.value = selectorHeight.value;
        })
        .onFinalize(() => {});

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View
                style={[style.selector(selectorWidth), selectorAnimatedStyle]}
                collapsable={false}
            >
                <Text style={{ color: "white", alignSelf: "center" }}>
                    Demo Gesture
                </Text>
                <GestureDetector gesture={pointTopGesture}>
                    <AnimatedPressable
                        style={style.selectorBtnTop}
                    ></AnimatedPressable>
                </GestureDetector>
                <GestureDetector gesture={pointBottomGesture}>
                    <AnimatedPressable
                        style={style.selectorBtnBottom}
                    ></AnimatedPressable>
                </GestureDetector>
            </Animated.View>
        </GestureDetector>
    );
};

export default GestureSelector;

const styles = ({ colors, size }) =>
    StyleSheet.create({
        selector: width => ({
            position: "absolute",
            // height: 200,
            width: width,
            borderRadius: size.s2,
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
