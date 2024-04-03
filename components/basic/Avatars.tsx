import {
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
    ViewStyle
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { ThemeInterface, useTheme, useThemeStyles } from "@/theme";
import Animated from "react-native-reanimated";
interface Props {
    s?: number;
    bg?: string;
    letter?: string;
    color?: string;
    image?: number;
    icon?: JSX.Element;
    r?: number;
    onLongPress?: () => void;
    st?: ViewStyle;
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

const Avatars = React.forwardRef((props: Props, ref) => {
    const theme = useTheme();
    const style = useThemeStyles(styles);
    const {
        s = theme.size.s100,
        bg = theme.colors.bg.secondary,
        letter,
        color = theme.colors.b,
        image,
        icon,
        r,
        onLongPress,
        st = {}
    } = props;
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
    return (
        <AnimatedPressable
            onLongPress={() => {
                onLongPress && onLongPress();
            }}
            style={[
                style.avatars,
                {
                    borderRadius: r || theme.size.width,
                    height: s,
                    width: s,
                    backgroundColor: bg
                },
                st
            ]}
        >
            {!icon && !image && letter && (
                <Text
                    style={[style.letter, { color, fontSize: (s * 0.8) / 2 }]}
                >
                    {letter}
                </Text>
            )}
            {!icon && letter && image && image?.uri != "" && (
                <Image
                    source={image}
                    style={{ height: s, width: s }}
                    resizeMode={"cover"}
                />
            )}
            {!icon && image && image?.uri == "" && letter && (
                <Text
                    style={[style.letter, { color, fontSize: (s * 0.8) / 2 }]}
                >
                    {letter}
                </Text>
            )}

            {!icon && !letter && image && (
                <Image
                    source={image}
                    style={{ height: s, width: s }}
                    resizeMode={"cover"}
                />
            )}
            {!letter && !image && icon && icon}
        </AnimatedPressable>
    );
});

export default Avatars;
