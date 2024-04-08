import "react-native-gesture-handler";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { ThemeProvider } from "./../theme/ThemeContext";
import { CoreProvider } from "./../core/CoreProvider";
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
import { AppAlertProvider } from "@pack/AppAlert";
import { PortalProvider } from "@gorhom/portal";
//import Database, { IDatabase } from "./../core/db/db.config";

export const unstable_settings = {
    initialRouteName: "index"
};
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        inter: require("../assets/fonts/Inter-VariableFont_slnt,wght.ttf"),
        inter_l: require("../assets/fonts/Inter-Light.ttf"),
        inter_r: require("../assets/fonts/Inter-Regular.ttf"),
        inter_m: require("../assets/fonts/Inter-Medium.ttf"),
        inter_sb: require("../assets/fonts/Inter-SemiBold.ttf"),
        inter_b: require("../assets/fonts/Inter-Bold.ttf"),
        inter_eb: require("../assets/fonts/Inter-ExtraBold.ttf"),
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
        <CoreProvider>
            <ThemeProvider>
                <AppAlertProvider>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <PortalProvider>
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
                                    options={{
                                        headerShown: false,
                                        animation: "slide_from_right"
                                    }}
                                />
                                <Stack.Screen
                                    name="search/search"
                                    options={{ headerShown: true }}
                                />
                                <Stack.Screen
                                    name="search/searchPatient"
                                    options={{
                                        headerShown: true,
                                        animation: "slide_from_right"
                                    }}
                                />
                                <Stack.Screen
                                    name="search/searchFoods"
                                    options={{
                                        headerShown: true,
                                        animation: "slide_from_right"
                                    }}
                                />
                                <Stack.Screen
                                    name={"details/patients/[patient_Id]"}
                                    //  getId={({ params }) => String(Date.now())}
                                    options={{
                                        headerShown: true,
                                        animation: "slide_from_bottom"
                                    }}
                                />
                                <Stack.Screen
                                    name={"details/foods/[food_id]"}
                                    getId={({ params }) => String(Date.now())}
                                    options={{
                                        headerShown: true,
                                        animation: "slide_from_bottom"
                                    }}
                                />
                                <Stack.Screen
                                    name={"forms/addFoodForm"}
                                    getId={({ params }) => String(Date.now())}
                                    options={{
                                        headerShown: true,
                                        animation: "fade_from_bottom"
                                    }}
                                />
                            </Stack>
                        </PortalProvider>
                    </GestureHandlerRootView>
                </AppAlertProvider>
            </ThemeProvider>
        </CoreProvider>
    );
}
