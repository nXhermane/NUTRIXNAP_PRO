import { StyleSheet, Text, Image, View } from "react-native";
import React, { useEffect, useState } from "react";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import logoDark from "@/assets/images/logo/nutriXcupDark.webp";
import logo from "@/assets/images/logo/nutriXcup.webp";
import logoDarkAnimate from "@/assets/images/logo/logonutrixnapDark.gif";
import logoAnimate from "@/assets/images/logo/logonutrixnap.gif";
import logoAnimateWName from "@/assets/images/logo/logonutrixnapWName.gif";
import logoAnimateWNameDark from "@/assets/images/logo/logonutrixnapWNameDark.gif";
import logoWName from "@/assets/images/logo/nutriXcupWname.webp";
import logoWNameDark from "@/assets/images/logo/nutriXcupWnameDark.webp";
interface Props {
    // Define your props here
}

const Logo = (props: Props) => {
    const theme = useTheme();
    const style = useThemeStyles(styles);
    const {
        s = theme.size.s100 ,
        animated = false,
        withName = false
    } = props;
    return (
        <View style={{ ...style.logoContainer, height: s, width: s }}>
            <Image
                source={
                    theme.isLightTheme
                        ? animated
                            ? withName
                                ? logoAnimateWName
                                : logoAnimate
                            : withName
                            ? logoWName
                            : logo
                        : animated
                        ? withName
                            ? logoAnimateWNameDark
                            : logoDarkAnimate
                        : withName
                        ? logoWNameDark
                        : logoDark
                }
                style={{ ...style.logo, height: s, width: s }}
            />
        </View>
    );
};

export default Logo;

const styles = theme =>
    StyleSheet.create({
        logo: {
            resizeMode: "contain"
        },
        logoContainer: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent"
        }
    });
