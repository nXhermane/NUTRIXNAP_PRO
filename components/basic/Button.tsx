import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    StyleProps
} from "react-native";
import React, { useState, useEffect } from "react";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
    withTiming
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";

type iconFun = { style: { color: string; size: number } };
interface ButtonProps {
    w: number;
    h: number;
    fs: number;
    ff: string;
    fc: string;
    c: string;
    r: number;
    bw: number;
    ph: number;
    phc: number;
    outlinedBgColor: string;
    gradient: boolean;
    outlined: boolean;
    iconStart: (confih: iconFun) => React.Nodes;
    iconEnd: (config: iconFun) => React.Nodes;
    upper: boolean;
    title: string;
    disableBorder: boolean;
    onPress: () => void;
    st: StyleProps;
    sc: StyleProps;
}
const Button: React.FC<ButtonProps> = props => {
    const theme = useTheme();
    const {
        title = "",
        gradient = false,
        outlined = false,
        onPress = () => {}
    } = props;
    const styles = theme =>
        StyleSheet.create({
            btnContainer: {
                width: props.w || theme.size.s100 * 3,
                height: props.h || theme.size.s50,
                borderRadius: props.r || 30,
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                padding: outlined
                    ? props.disableBorder
                        ? 0
                        : theme.size.s1 / 2
                    : 0,
                backgroundColor: gradient ? "transparent" : theme.colors.blue,
                ...props.sc
            },
            btnContainerHight: {
                flex: 1,
                width: "100%",
                height: "100%"
            },

            gradient: {
                borderRadius: props.r || theme.size.s8 - theme.size.s1 / 2
            },
            btnSectionContainer: {
                flex: 1,
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: props.r || theme.size.s8 - theme.size.s1 / 2,
                backgroundColor: outlined
                    ? props.outlinedBgColor || theme.colors.w
                    : "transparent",
                paddingHorizontal: props.ph || theme.size.s5
            },
            iconContainer: {
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                // flex: 1,
                maxWidth: props.h || theme.size.s50
            },
            centerContainer: {
                height: "100%",
                //flex: 4,
                paddingHorizontal: props.phc || theme.size.s5,
                justifyContent: "center",
                alignItems: "center"
            },
            btnText: {
                color: !outlined
                    ? props.fc || theme.colors.white
                    : props.fc || theme.colors.blue,
                fontSize: props.props || theme.size.s5,
                fontFamily: props.ff || "satochi_bold",
                fontWeight: "bold",
                textTransform: props.upper ? "uppercase" : "none",
                ...props.st
            }
        });
    const style = useThemeStyles(styles);
    const width = useSharedValue(0);
    const animateWidthStyle = useAnimatedStyle(() => ({
        width: interpolate(
            width.value,
            [0, 1],
            [
                props.w || theme.size.s100 * 3,
                props.w - theme.size.s5 || theme.size.s100 * 3 - theme.size.s5
            ]
        ),
        transform: [{ scale: interpolate(width.value, [0, 1], [1, 0.9]) }]
    }));
    const onPressOut = () => {
        width.value = withSpring(0);
    };
    const onPressIn = () => {
        width.value = withSpring(1);
    };

    const ButtonContainer: React.FC = ({ gradient, children }) => {
        return (
            <>
                {gradient ? (
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
                        {children}
                    </LinearGradient>
                ) : (
                    <>{children}</>
                )}
            </>
        );
    };

    return (
        <Animated.View style={[animateWidthStyle, style.btnContainer]}>
            <ButtonContainer gradient={gradient}>
                <Animated.View style={[style.btnContainer]}>
                    <TouchableHighlight
                        style={style.btnContainerHight}
                        onPress={onPress}
                        onPressIn={onPressIn}
                        onPressOut={onPressOut}
                        underlayColor={theme.colors.blue}
                    >
                        <View style={style.btnSectionContainer}>
                            {props.iconStart && (
                                <View style={style.iconContainer}>
                                    {props.iconStart({
                                        style: {
                                            color: outlined
                                                ? theme.colors.blue
                                                : theme.colors.white,
                                            size: theme.size.s6
                                        }
                                    })}
                                </View>
                            )}
                            <View style={style.centerContainer}>
                                <Text style={style.btnText} numberOfLines={1}>
                                    {title}
                                </Text>
                            </View>
                            {props.iconEnd && (
                                <View style={style.iconContainer}>
                                    {props.iconEnd({
                                        style: {
                                            color: outlined
                                                ? theme.colors.blue
                                                : theme.colors.white,
                                            size: theme.size.s6
                                        }
                                    })}
                                </View>
                            )}
                        </View>
                    </TouchableHighlight>
                </Animated.View>
            </ButtonContainer>
        </Animated.View>
    );
};

export default Button;
