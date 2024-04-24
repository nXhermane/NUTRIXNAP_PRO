import { StyleSheet, Text, View, Link as LinkComponent } from "react-native";
import React from "react";
import { ThemeInterface } from "@/theme";
import { useTheme, useThemeStyles } from "@/theme";
import { router } from "expo-router";

type LinkProps = React.ComponentProps<typeof LinkComponent>;

interface Props {
    linkPath?: LinkProps["href"];
    linkTitle?: string;
    header?: boolean;
    title?: string;
    body?: string;
    children?: JSX.Element;
    linkText?: string;
}

const DashBoardSection: React.FC<Props> = (props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    return (
        <View style={style.serviceContainer}>
            {!props.header && (
                <View style={style.serviceHead}>
                    {props.title && (
                        <Text style={[style.title, { marginBottom: size.s1 }]}>
                            {props.title}
                        </Text>
                    )}
                    {props.linkPath && (
                        <LinkComponent href={props.linkPath} style={style.link}>
                            <Text style={style.linkText}>
                                {props.linkTitle}
                            </Text>
                        </LinkComponent>
                    )}
                </View>
            )}
            {props.body && (
                <View style={style.bodyContainer}>
                    {<Text style={style.body}>{props.body}</Text>}
                </View>
            )}
            {props.children && (
                <View style={[style.serviceInner, { flex: 1 }]}>
                    {props.children}
                </View>
            )}
        </View>
    );
};

export default DashBoardSection;

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
            fontFamily: "inter_eb",
            color: colors.black300,
            fontSize: size.s5
        },
        link: {
            fontFamily: "inter",
            color: colors.blue300,
            textDecorationLine: 'underline'
        },
        linkText: {
            fontFamily: "inter_r",
            fontSize: size.s3
        },
        serviceInner: {
            flex: 1,
            justifyContent: 'center'
        },
        body: {
            fontFamily: "inter_m",
            fontSize: size.s3,
            color: colors.gray200
        }
    });
