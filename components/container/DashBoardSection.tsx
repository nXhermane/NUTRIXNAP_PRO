import { StyleSheet, Text, View } from "react-native";
import React from "react";

import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import { router, Link } from "expo-router";
interface Props {
    // Define your props here
}

const DashBoardSection: React.FC = (props: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    return (
        <View style={style.serviceContainer}>
            {!props.header && (
                <View style={style.serviceHead}>
                    {props.title && (
                        <Text style={style.title}>{props.title}</Text>
                    )}
                    {props.linkPath && (
                        <Link href={props.linkPath} style={style.link}>
                            <Text style={style.linkText}>
                                {props.linkTitle}
                            </Text>
                        </Link>
                    )}
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

export default DashBoardSection;

const styles = ({ size, colors }) =>
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
            fontFamily: "inter_eb",
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
        serviceInner: {
          
        },
        body: {
            fontFamily: "inter_m",
            fontSize: size.s3,
            color: colors.gray200
        }
    });
