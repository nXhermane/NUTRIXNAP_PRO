import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import { ThemeInterface, useTheme, useThemeStyles } from "@/theme";
import React, { useState, useEffect, memo } from "react";
import { BlurView } from "expo-blur";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    interpolate,
    withTiming,
    runOnJS
} from "react-native-reanimated";
export interface AlertOption {
    alertIsOpen: (value: boolean) => void;
    msg: string;
    onPress: (value: boolean) => void;
    custormMsgComponent?: (msg: string) => JSX.Element;
    custormBtn?: (
        btnMsg: { yes: string; no: string },
        onPress: (value: boolean) => JSX.Element
    ) => void;
    btnMsg?: { yes: string; no: string };
}

const Alert = (props: AlertOption) => {
    const { colors, size, isLightTheme } = useTheme();
    const style = useThemeStyles(styles);
    const {
        alertIsOpen,
        btnMsg = { yes: "Oui", no: "Annuler" },
        onPress = () => {},
<<<<<<< HEAD
        msg = "Aleert Messgae",
        custormMsgComponent,
        custormBtn
    } = props;
    const animValue = useSharedValue(0);

    const animStyle = useAnimatedStyle(() => ({
        position: "absolute",
        width: size.width,
        height: interpolate(animValue.value, [0, 1], [0, size.height]),
        bottom: 0,
        overflow: "hidden"
    }));
    const animation = (value: number) => {
        animValue.value = withTiming(value, { duration: 500 }, () => {
          ;
        });
    };
    useEffect(() => {
        animation(1);
    });

    return (
        <Modal
            tansparent
            onRequestClose={() => {
                onPress && onPress(false);
                
                animation(0);
                alertIsOpen(false)
            }}
=======
        msg = "Alert Messagae",
        custormMsgComponent,
        custormBtn
    } = props;

    return (
        <Modal
            transparent
            onRequestClose={() => {
                onPress && onPress(false);
                alertIsOpen(false);
            }}
            animationType={"slide"}
>>>>>>> 65fe56f (After .git remove)
        >
            <Pressable
                onPress={() => {
                    onPress && onPress(false);
<<<<<<< HEAD
                    animation(0);
                    alertIsOpen(false)
                }}
                style={{
                    backgroundColor: "transparent",
=======
                    alertIsOpen(false);
                }}
                style={{

>>>>>>> 65fe56f (After .git remove)
                    width: "100%",
                    height: "100%"
                }}
            >
<<<<<<< HEAD

                    <BlurView
                        experimentalBlurMethod={"dimezisBlurView"}
                        intensity={90}
                        tint={isLightTheme ? "light" : "dark"}
                        style={style.alertContainer}
                    >
                        <View style={style.alertInnerContainer}>
                            <View style={style.alertMsgContainer}>
                                {!custormMsgComponent && msg && (
                                    <Text style={style.alertMsg}>{msg}</Text>
                                )}
                                {custormMsgComponent &&
                                    custormMsgComponent(msg)}
                            </View>
                            <View style={style.alertBtnContainer}>
                                {!custormBtn && btnMsg && (
                                    <>
                                        <Pressable
                                            style={style.alertBtn}
                                            onPress={() => {
                                                onPress && onPress(false);
                                                animation(0);
                                                alertIsOpen(false)
                                            }}
                                        >
                                            <Text style={style.alertBtnText}>
                                                {btnMsg?.no}
                                            </Text>
                                        </Pressable>
                                        <Pressable
                                            style={style.alertBtn}
                                            onPress={() => {
                                                onPress && onPress(true);
                                                animation(0);
                                                alertIsOpen(false)
                                            }}
                                        >
                                            <Text style={style.alertBtnText}>
                                                {btnMsg?.yes}
                                            </Text>
                                        </Pressable>
                                    </>
                                )}
                                {custormBtn &&
                                    custormMsgComponent(
                                        btnMsg,
                                        (value: boolean) => {
                                            onPress && onPress(value);
                                            animation(0);
                                            alertIsOpen(false)
                                        }
                                    )}
                            </View>
                        </View>
                    </BlurView>

=======
                <BlurView
                    experimentalBlurMethod={"dimezisBlurView"}
                    intensity={50}
                    tint={isLightTheme ? "light" : "dark"}
                    style={[style.alertContainer]}
                >
                    <View style={style.alertInnerContainer}>
                        <View style={style.alertMsgContainer}>
                            {!custormMsgComponent && msg && (
                                <Text style={style.alertMsg}>{msg}</Text>
                            )}
                            {custormMsgComponent && custormMsgComponent(msg)}
                        </View>
                        <View style={style.alertBtnContainer}>
                            {!custormBtn && btnMsg && (
                                <>
                                    <Pressable
                                        style={style.alertBtn}
                                        onPress={() => {
                                            onPress && onPress(false);
                                            alertIsOpen(false);
                                        }}
                                    >
                                        <Text style={style.alertBtnText}>
                                            {btnMsg?.no}
                                        </Text>
                                    </Pressable>
                                    <Pressable
                                        style={style.alertBtn}
                                        onPress={() => {
                                            onPress && onPress(true);
                                            alertIsOpen(false);
                                        }}
                                    >
                                        <Text style={style.alertBtnText}>
                                            {btnMsg?.yes}
                                        </Text>
                                    </Pressable>
                                </>
                            )}
                            {custormBtn &&
                                custormMsgComponent(
                                    btnMsg,
                                    (value: boolean) => {
                                        onPress && onPress(value);
                                        alertIsOpen(false);
                                    }
                                )}
                        </View>
                    </View>
                </BlurView>
>>>>>>> 65fe56f (After .git remove)
            </Pressable>
        </Modal>
    );
};

export default Alert;

const styles = ({ colors, size }: ThemeInterface) =>
    StyleSheet.create({
        modalInner: {
            width: size.width,
            height: size.height,
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "center"
        },
        alertContainer: {
            width: size.width,
            height: size.height
        },
        alertInnerContainer: {
            position: "absolute",
            bottom: size.s100 * 0.7,
            paddingHorizontal: size.s6,
            width: "100%"
        },
        alertMsgContainer: {
            justifyContent: "flex-end",
            width: "100%"
        },
        alertMsg: {
            color: colors.b,
            fontFamily: "inter_l",
            fontSize: size.s4
        },
        alertBtnContainer: {
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: size.s50 * 0.7,
            marginTop: size.s50 * 0.8
        },
        alertBtn: {},
        alertBtnText: {
            color: colors.b,
            fontFamily: "inter_l",
            fontSize: size.s4
        }
    });
