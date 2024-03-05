import React, { createContext, useState } from "react";
import { Appearance } from "react-native";
import Colors, { ThemeColors } from "../constants/Colors";
import Size, { FontSizeConfig } from "../constants/Sizes";
import Shadow, { ShadowSizes } from "../constants/Shadows";
import typography, { TypographyType } from "./typography";
export interface ThemeInterface {
    colors: ThemeColors;
    isLight: (value: boolean) => void;
    toggleTheme: () => void;
    typo: TypographyType;
    size: FontSizeConfig;
    shadow: ShadowSizes;
    isLightTheme: boolean;
}
export const ThemeContext = createContext<ThemeInterface>({} as ThemeInterface);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const [isLightTheme, setLightTheme] = useState<boolean>(
        Appearance.getColorScheme() === "light"
    );
    const toggleTheme = () => setLightTheme(previousState => !previousState);

    const theme: ThemeInterface = {
        colors: isLightTheme ? Colors.light : Colors.dark,
        toggleTheme,
        isLight: (value: boolean) => setLightTheme(value),
        typo: typography,
        size: Size,
        shadow: Shadow,
        isLightTheme
    };
    return (
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
};
