import "react-native-gesture-handler";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { ThemeProvider } from "./../theme/ThemeContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useColorScheme } from "@comp/useColorScheme";
export { ErrorBoundary } from "expo-router";
import { Text, Appearance } from "react-native";
import Colors from "./../constants/Colors";
import useTheme from "@/theme/useTheme";
export const unstable_settings = {
    initialRouteName: "index"
};
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        satochi_regular: require("../assets/fonts/Satoshi-Regular.ttf"),
        satochi_variable: require("../assets/fonts/Satoshi-Variable.ttf"),
        satochi_bold: require("../assets/fonts/Satoshi-Bold.ttf"),
        satochi_light: require("../assets/fonts/Satoshi-Light.ttf"),
        satochi_medium: require("../assets/fonts/Satoshi-Medium.ttf"),
        beau: require("../assets/fonts/BeauRivage-Regular.ttf"),
        great: require("../assets/fonts/GreatVibes-Regular.ttf"),
        inter: require("../assets/fonts/Inter-VariableFont_slnt,wght.ttf"),
        ...FontAwesome.font
    });

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    return (
        <ThemeProvider>
            <GestureHandlerRootView style={{flex:1}}>
                <Stack>
                    <Stack.Screen
                        name="index"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="auth"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="(drawer)"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="search"
                        options={{ headerShown: true }}
                    />
                </Stack>
            </GestureHandlerRootView>
        </ThemeProvider>
    );
}
