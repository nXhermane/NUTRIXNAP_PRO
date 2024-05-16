import { StyleSheet, Text as RNText, View, TextStyle } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemeInterface, useTheme, useThemeStyles } from "@/theme";
interface Props {
    type?: "h1" | "h2" | "h3" | "h4" | "p1" | "p2" | "b1" | "b2" | "small";
    style?: TextStyle;
    color?: string;
    font?: string;
    size?: string;
    upper?: boolean | "none" | "capitalize";
    align?: "r" | "l" | "c";
}

const Typography = ({ size, colors }: ThemeInterface) => ({
    h1: {
        size: size.s5,
        color: colors.black300,
        font: "inter_b"
    },
    h2: {
        size: size.s5 * 0.9,
        color: colors.black300,
        font: "inter_b"
    },
    h3: {
        size: size.s4,
        color: colors.black300,
        font: "inter_b"
    },
    h4: {
        size: size.s4 * 0.9,
        color: colors.black300,
        font: "inter_b"
    },
    p1: {
        size: size.s3 * 1.2,
        color: colors.black200,
        font: "inter_l"
    },
    p2: {
        size: size.s3,
        color: colors.black200,
        font: "inter_l"
    },
    b1: {
        size: size.s3,
        color: colors.gray300,
        font: "inter_b"
    },
    b2: {
        size: size.s3 * 0.8,
        color: colors.gray200,
        font: "inter_m"
    },
    small: {
        size: size.s2 * 0.9,
        color: colors.gray200,
        font: "inter_m"
    }
});
const textAlign = {
    r: "right",
    l: "left",
    c: "center"
};
const Text = React.forwardRef((props: React.PropsWithChildren<Props>, ref) => {
    const {
        type = "h1",
        style,
        color,
        font,
        size,
        upper = "none",
        align="l",
        ...otherProps
    } = props;
    const theme = useTheme();
    const Style = useThemeStyles(styles);
    const typograthy = Typography(theme)[type] || Typography(theme)["p1"];
    return (
        <RNText
            ref={ref}
            style={Style.text(
                {
                    ...typograthy,
                    ...(color && { color }),
                    ...(font && { font }),
                    ...(size && { size })
                },
                {
                    textTransform:
                        upper === true
                            ? "uppercase"
                            : upper === false
                            ? "lowercase"
                            : upper,
                    textAlign:textAlign[align],
                    ...style
                }
            )}
            {...otherProps}
        >
            {otherProps.children}
        </RNText>
    );
});

export default Text;
const styles = ({ colors, size }: ThemeInterface) =>
    StyleSheet.create({
        text: (
            typo: { size: number; color: string; font: string },
            style: TextStyle = {}
        ) => ({
            fontFamily: typo.font || "inter",
            fontSize: typo.size || size.s4,
            color: typo.color || colors.black300,
            ...style
        })
    });
