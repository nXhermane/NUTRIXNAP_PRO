import { StyleSheet, Text, View, Pressable, ViewStyle } from "react-native";
import React from "react";

import { ThemeInterface, useTheme, useThemeStyles } from "@/theme";
import { router, Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
interface Props {
    withRight?: boolean;
    withFilter?: boolean;
    onPressFilter?: () => void;
    withAddBtn?: boolean;
    onPressAddBtn?: () => void;
    withSearch?: boolean;
    onPressSearch?: () => void;
    title?: string;
    body?: string;
    header?: boolean;
    children?: React.ReactNode;
    contentContainerStyle: ViewStyle;
    centerBody?: boolean;
}

const PatientSection: React.FC<Props> = ({
    withRight = false,
    withFilter = false,
    withAddBtn = false,
    withSearch = false,
    onPressFilter = () => {},
    onPressAddBtn = () => {},
    onPressSearch = () => {},
    title,
    body,
    header = false,
    children,
    contentContainerStyle = {},
    centerBody = false
}) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    return (
        <View style={style.serviceContainer}>
            {header && (
                <View style={style.serviceHead}>
                    {title && <Text style={style.title}>{title}</Text>}
                    {withRight && (
                        <View style={style.sectionHeaderRight}>
                            {withAddBtn && (
                                <Pressable onPress={onPressAddBtn}>
                                    {({ pressed }) => (
                                        <Ionicons
                                            name={"add-outline"}
                                            color={
                                                pressed
                                                    ? colors.purple300
                                                    : colors.black300
                                            }
                                            size={pressed ? size.s4 : size.s5}
                                        />
                                    )}
                                </Pressable>
                            )}
                            {withSearch && (
                                <Pressable onPress={onPressSearch}>
                                    {({ pressed }) => (
                                        <Ionicons
                                            name={"search"}
                                            color={
                                                pressed
                                                    ? colors.purple300
                                                    : colors.black300
                                            }
                                            size={pressed ? size.s4 : size.s5}
                                        />
                                    )}
                                </Pressable>
                            )}
                            {withFilter && (
                                <Pressable onPress={onPressFilter}>
                                    {({ pressed }) => (
                                        <Ionicons
                                            name={"filter"}
                                            color={
                                                pressed
                                                    ? colors.purple300
                                                    : colors.black300
                                            }
                                            size={pressed ? size.s4 : size.s5}
                                        />
                                    )}
                                </Pressable>
                            )}
                        </View>
                    )}
                </View>
            )}
            {body && (
                <View style={style.bodyContainer}>
                    {<Text style={style.body(centerBody)}>{body}</Text>}
                </View>
            )}
            {children && (
                <View style={[style.serviceInner, contentContainerStyle]}>
                    {children}
                </View>
            )}
        </View>
    );
};

export default PatientSection;

const styles = ({ size, colors }: ThemeInterface) =>
    StyleSheet.create({
        serviceContainer: {
            width: "95%",
            gap: size.s1,
            marginTop: size.s8,
            backgroundColor: colors.w,
            paddingVertical: size.s4,
            alignSelf: "center",
            borderRadius: size.s4,
            elevation: 1
        },
        serviceHead: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: size.s5
        },
        bodyContainer: {
            paddingHorizontal: size.s5,
            marginBottom: size.s1
        },
        title: {
            fontFamily: "inter_b",
            color: colors.black300,
            fontSize: size.s5
        },
        link: {
            fontFamily: "inter"
        },
        linkText: {
            fontFamily: "inter_r",
            fontSize: size.s3,
            color: colors.blue300
        },
        serviceInner: {},
        body: (centerBody: boolean) => ({
            fontFamily: "inter_m",
            fontSize: size.s3,
            color: colors.gray200,
            textAlign: centerBody ? "center" : "auto"
        }),
        sectionHeaderRight: {
            justifyContent: "flex-end",
            flexDirection: "row",
            alignItems: "center",
            gap: size.s4
        }
    });
