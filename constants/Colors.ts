import { Appearance } from "react-native";

interface ColorPalette {
  white: string;
  blue: string;
  tangerine: string;
  yell_gre: string;
  gray: string;
  black: string;
  w: string;
  b: string;
}

interface BackgroundColors {
  primary: string;
  secondary: string;
  primaryH: string;
  disable: string;
  bg1: string;
  bg2: string;
}

interface TextColors {
  primary: string;
  secondary: string;
  placeholder: string;
}

export interface ThemeColors {
  white: string;
  blue: string;
  tangerine: string;
  yell_gre: string;
  gray: string;
  black: string;
  w: string;
  b: string;
  bg: BackgroundColors;
  text: TextColors;
  border: string;
}

 interface ThemeConfig {
  light: ThemeColors;
  dark: ThemeColors;
}

const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

const theme: ThemeConfig = {
  light: {
    white: "#ffffff",
    blue: "#4563EA",
    tangerine: "#FF9A6C",
    yell_gre: "#B3D06A",
    gray: "#AFB2BF",
    black: "#000000",
    w: "#fff",
    b: "#000",
    bg: {
      primary: "#ffffff",
      secondary: "#3e69fe",
      primaryH: "#2551eb",
      disable: "#e6e9ef",
      bg1: "#F1F2F6",
      bg2: '#FFFFFF',
    },
    text: {
      primary: "#050404",
      secondary: "#716969",
      placeholder: '#AFB2BF',
    },
    border: "#d9d9d9",
  },
  dark: {
    white: "#ffffff",
    blue: "#4563EA",
    tangerine: "#FF9A6C",
    yell_gre: "#B3D06A",
    gray: "#AFB2BF",
    black: "#000000",
    w: "#000",
    b: "#fff",
    bg: {
      primary: "#000000",
      secondary: "#3e69fe",
      primaryH: "#2551eb",
      disable: "#323338",
      bg1: '#18191B',
      bg2: '#333436',
    },
    text: {
      primary: "#EAEAEA",
      secondary: "#e6e9ef",
      placeholder: '#e3e3e3',
    },
    border: "#fbfbfb",
  },
};

export default theme;