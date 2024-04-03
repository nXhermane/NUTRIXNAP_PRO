import {
    StyleSheet,
    Text,
    View,
    Image,
    useColorScheme,
    Appearance
} from "react-native";
import React, { useEffect, useState } from "react";
import { ThemeContext } from "@react-navigation/native";
import SIZES from "@/constants/Sizes";
import COLORS from "@/constants/Colors";
import { router } from "expo-router";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import Logo from "@comp/basic/Logo";
import useCore from "@/hooks/useCore";

import { useAppAlert } from "@pack/AppAlert";
interface Props {
    // Define your props here
}

const index = (props: Props) => {
    const theme = useTheme();
    const style = useThemeStyles(styles);
    const Core = useCore();
    Appearance.addChangeListener(({ colorScheme }) => {
        theme.isLight(colorScheme === "light");
    });

    useEffect(() => {
        setTimeout(() => {
            if (Core.user === null) router.replace("auth");
            else router.replace("(drawer)/(home)");
        }, 1000);
    });

    return (
        <View style={[style.container, {}]}>
            {/*<Image
                source={require("./../../assets/images/logoNutriXnap.webp")}
                style={style.logo}
            />*/}
            <Logo />
        </View>
    );
};

export default index;

const styles = theme =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.w
        },
        logo: {
            width: SIZES.s100 * 1.2,
            height: SIZES.s100 * 1.2
        }
    });
