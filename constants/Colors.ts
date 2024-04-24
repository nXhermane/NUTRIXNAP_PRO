import { Appearance } from "react-native";

interface CommonColors {
  white: string;
  blue: string;
  tangerine: string;
  yell_gre: string;
  gray: string;
  black: string;
  w: string;
  b: string;
  blue100: string;
  blue200: string;
  blue300: string;
  purple100: string;
  purple200: string;
  purple300: string;
  yellow100: string;
  yellow200: string;
  yellow300: string;
  red100: string;
  red200: string;
  red300: string;
  green100: string;
  green200: string;
  green300: string;
  greenBg: string;
  gray100: string;
  gray200: string;
  gray300: string;
  black100: string;
  black200: string;
  black300: string;
  w100: string;
  w200: string;
  w300: string;
}

interface BackgroundColors {
  type: "background";
  primary: string;
  secondary: string;
  primaryH: string;
  disable: string;
  bg1: string;
  bg2: string;
}

interface TextColors {
  type: "text";
  primary: string;
  secondary: string;
  placeholder: string;
}

interface BorderColors {
  type: "border";
  border: string;
}

type ThemeColors = CommonColors & BackgroundColors & TextColors & BorderColors;

const colors: ThemeColors = {
  white: "#ffffff",
  blue: "#4563EA",
  tangerine: "#FF9A6C",
  yell_gre: "#B3D06A",
  gray: "#AFB2BF",
  black: "#000000",
  w: "#fff",
  b: "#000",
  blue100: "#eef5ff",
  blue200: "#d9e8ff",
  blue300: "#2970ff",
  purple100: "#f5f3ff",
  purple200: "#ede9fe",
  purple300: "#875bf7",
  yellow100: "#fffaeb",
  yellow200: "#ffefc6",
  yellow300: "#fdb022",
  red100: "#FCE4EC",
  red200: "#F8BBD0",
  red300: "#EC407A",
  green100: "#66BB6A",
  green200: "#43A047",
  green300: "#2E7D32",
  greenBg: "#f0fdf4",
  gray100: "#E0E0E0",
  gray200: "#9E9E9E",
  gray300: "#757575",
  black100: "#444444",
  black200: "#424242",
  black300: "#212121",
  w100: "#F6F6F6",
  w200: "#e7e7e7",
  w300: "#d1d1d1",
  type: "background",
  primary: "#ffffff",
  secondary: "#E9EDF6",
  primaryH: "#2551eb",
  disable: "#e6e9ef",
  bg1: "#F1F2F6",
  bg2: "#FFFFFF",
  type: "text",
  primary: "#050404",
  secondary: "#716969",
  placeholder: "#AFB2BF",
  type: "border",
  border: "#d9d9d9",
};

const theme: ThemeConfig = {
  light: colors,
  dark: {
    ...colors,
    primary: "#000000",
    secondary: "#1E1F21",
    primaryH: "#2551eb",
    disable: "#323338",
    bg1: "#18191B",
    bg2: "#333436",
    primary: "#EAEAEA",
    secondary: "#e6e9ef",
    placeholder: "#e3e3e3",
    border: "#fbfbfb",
  },
};

const appearance = Appearance.getColorScheme();

const currentTheme = theme[appearance];

Object.freeze(currentTheme);

export default currentTheme;
