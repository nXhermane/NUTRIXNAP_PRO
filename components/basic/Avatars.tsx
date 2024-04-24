import React, { forwardRef, useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
    ViewStyle,
    ImageSourcePropType,
    AccessibilityRole,
    AccessibilityLabel,
    AccessibilityState,
    TestID
} from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    Extrapolate
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import { ThemeInterface, useTheme, useThemeStyles } from "@/theme";

interface Props {
    size?: number;
    backgroundColor?: string;
    letter?: string;
    color?: string;
    image?: ImageSourcePropType | null;
    icon?: JSX.Element | null;
    borderRadius?: number;
    onLongPress?: () => void;
    style?: ViewStyle;
    accessibilityRole?: AccessibilityRole;
    accessibilityLabel?: AccessibilityLabel;
    accessibilityState?: AccessibilityState;
    testID?: TestID;
}

const styles = (theme: ThemeInterface) =>
    StyleSheet.create({
        avatars: {
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden"
        },
        letter: {
            fontFamily: "inter",
            fontWeight: "bold"
        }
    });

const Avatars = forwardRef((props: Props, ref) => {
    const theme = useTheme();
    const style = useThemeStyles(styles);
    const {
        size = theme.size.s100,
        backgroundColor = theme.colors.bg.secondary,
        letter,
        color = theme.colors.b,
        image = null,
        icon = null,
        borderRadius = theme.size.width,
        onLongPress,
        style: externalStyle,
        accessibilityRole,
        accessibilityLabel,
        accessibilityState,
        testID
    } = props;

    const animatedScale = useSharedValue(1);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ scale: animatedScale.value }]
        };
    });

    useEffect(() => {
        animatedScale.value = 1;
    }, [letter, image, icon]);

    const handleLongPress = () => {
        if (onLongPress) {
            onLongPress();
        }
    };

    return (
        <AnimatedPressable
            ref={ref}
            onLongPress={handleLongPress}
            style={[
                style.avatars,
              
