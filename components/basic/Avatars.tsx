import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";

interface Props {
    // Define your props here
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
        icon
    } = props;
    return (
        <View
            style={[
                style.avatars,
                { height: s, width: s, backgroundColor: bg }
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

const styles = theme =>
    StyleSheet.create({
        avatars: {
            borderRadius: theme.size.width,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden"
        },
        letter: {
            fontFamily: "inter",
            fontWeight: "bold"
        }
    });
