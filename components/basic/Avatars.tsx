import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { ThemeInterface, useTheme, useThemeStyles } from "@/theme";

interface Props {
    s: number;
    bg: string;
    letter: string;
    color: string;
    image: number;
    icon: JSX.Element;
    r: number;
}

const Avatars = (props: Props) => {
    const theme = useTheme();
    const style = useThemeStyles(styles);
    const {
        s = theme.size.s100,
        bg = theme.colors.bg.secondary,
        letter,
        color = theme.colors.b,
        image,
        icon,
        r
    } = props;
    return (
        <View
            style={[
                style.avatars,
                {
                    borderRadius: r || theme.size.width,
                    height: s,
                    width: s,
                    backgroundColor: bg
                }
            ]}
        >
            {!icon && !image && letter && (
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
        </View>
    );
};

export default Avatars;

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
