import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import { router, Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
interface Props {
    // Define your props here
}

const PatientSection: React.FC = (props: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    return (
        <View style={style.serviceContainer}>
            {!props.header && (
                <View style={style.serviceHead}>
                    {props.title && (
                        <Text style={style.title}>{props.title}</Text>
                    )}
                    <View style={style.sectionHeaderRight}>
                        <Pressable>
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
                        <Pressable>
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
                    </View>
                </View>
            )}
            {props.body && (
                <View style={style.bodyContainer}>
                    {<Text style={style.body}>{props.body}</Text>}
                </View>
            )}
            {props.children && (
                <View style={style.serviceInner}>{props.children}</View>
            )}
        </View>
    );
};

export default PatientSection;

const styles = ({ size, colors }) =>
    StyleSheet.create({
        serviceContainer: {
            width: "95%",
            gap: size.s1,
            marginTop: size.s2,
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
            fontFamily: "inter_sb",
            color: colors.black300,
            fontSize: size.s4
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
        body: {
            fontFamily: "inter_m",
            fontSize: size.s3,
            color: colors.gray200
        },
        sectionHeaderRight: {
            justifyContent: "flex-end",
            flexDirection: "row",
            alignItems: "center",
            gap: size.s4
        }
    });
