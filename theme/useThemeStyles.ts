import useTheme from "./useTheme";
import { ThemeInterface } from "./ThemeContext";
export type StylesType = (theme: ThemeInterface) => any;
const useThemedStyles = (styles:StylesType) => {
    const theme: ThemeInterface = useTheme();
    return styles(theme);
};

export default useThemedStyles;
