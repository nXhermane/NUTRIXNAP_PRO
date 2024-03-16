import { StyleSheet, Text, View, Pressable } from "react-native";
import {ThemeInterface,useTheme,useThemeStyles} from "@/theme"
import React, { useState, useEffect } from "react";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
    withTiming
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
interface Props {
    h: number;
    w: number;
    s: number;
    r: number;
    onPress: () => void;
    icon: React.Node;
}

const FlotingBtn = ({
    s = 50,
    h = s,
    w = s,
    r = 500,
    onPress = () => {},
    icon = (
        <MaterialIcons name="add" size={s * 0.5} color={'white'} />
    )
}: Props) => {
    const theme = useTheme();
    const style = useThemeStyles(styles);

    return (
        <Pressable onPress={() => onPress()}>
            <Animated.View style={style.flotBtnContainer({ h, w, r })}>
                <LinearGradient
                    colors={[
                        theme.colors.blue,

                        "rgba(0,145,255,1)",
                        "rgba(17,199,255,1)"
                    ]}
                    start={[0.35, 0]}
                    end={[1, 0.65]}
                    locations={[0.01, 0.46, 1]}
                    style={style.gradient}
                >
                    {icon}
                </LinearGradient>
            </Animated.View>
        </Pressable>
    );
};

export default FlotingBtn;

const styles =( theme:ThemeInterface) =>
    StyleSheet.create({
        flotBtnContainer: ({ h, w, r }) => ({
            borderRadius: r || 500,
            width: w || theme.size.s100 * 0.8,
            height: h || theme.sizw.s100 * 0.8,
            elevation: 5,
            //shadowColor: theme.colors.b,
            shadowOpacity: 1,
            shadowRadius: 5,
            shadowOffset: {
                width: 0,
                height: 2
            },
            overflow: "hidden"
        }),
        gradient: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }
    });
