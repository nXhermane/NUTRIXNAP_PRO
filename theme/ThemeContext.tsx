import React, { createContext, useState } from "react";
import { Appearance } from "react-native";
import Colors from "../constants/Colors";
import Size, { adjustedSizes } from "../constants/Sizes";
import Shadow from "../constants/Shadows";
import typography from "./typography";
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isLightTheme, setLightTheme] = useState(
        Appearance.getColorScheme() === "light"
    );
    const toggleTheme = () => setLightTheme(previousState => !previousState);

    const theme = {
        colors: isLightTheme ? Colors.light : Colors.dark,
        toggleTheme,
        isLight: value => setLightTheme(value),
        typo: typography,
        size: Size,
        shadow: Shadow,
        isLightTheme
    };
    return (
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
};
