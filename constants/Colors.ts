import { Appearance } from 'react-native';

interface ColorPalette {
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
   bg: BackgroundColors;
   text: TextColors;
   border: string;
}

interface ThemeConfig {
   light: ThemeColors;
   dark: ThemeColors;
}

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const theme: ThemeConfig = {
   light: {
      white: '#ffffff',
      blue: '#4563EA',
      tangerine: '#FF9A6C',
      yell_gre: '#B3D06A',
      gray: '#AFB2BF',
      black: '#000000',
      w: '#fff',
      b: '#000',
      blue100: '#eef5ff',
      blue200: '#d9e8ff',
      blue300: '#2970ff',
      purple100: '#f5f3ff',
      purple200: '#ede9fe',
      purple300: '#875bf7',
      yellow100: '#fffaeb',
      yellow200: '#ffefc6',
      yellow300: '#fdb022',
      red100: '#FCE4EC',
      red200: '#F8BBD0',
      red300: '#EC407A',
      green100: '#66BB6A',
      green200: '#43A047',
      green300: '#2E7D32',
      greenBg: '#f0fdf4',
      gray100: '#E0E0E0',
      gray200: '#9E9E9E',
      gray300: '#757575',
      black100: '#444444',
      black200: '#424242',
      black300: '#212121',
      w100: '#F6F6F6',
      w200: '#e7e7e7',
      w300: '#d1d1d1',
      bg: {
         primary: '#ffffff',
         secondary: '#E9EDF6',
         primaryH: '#2551eb',
         disable: '#e6e9ef',
         bg1: '#F1F2F6',
         bg2: '#FFFFFF',
      },
      text: {
         primary: '#050404',
         secondary: '#716969',
         placeholder: '#AFB2BF',
      },
      border: '#d9d9d9',
   },
   dark: {
      white: '#ffffff',
      blue: '#4563EA',
      tangerine: '#FF9A6C',
      yell_gre: '#B3D06A',
      gray: '#AFB2BF',
      black: '#000000',
      w: '#000',
      b: '#fff',
      blue100: '#eef5ff',
      blue200: '#d9e8ff',
      blue300: '#2970ff',
      purple100: '#f5f3ff',
      purple200: '#ede9fe',
      purple300: '#875bf7',
      yellow100: '#fffaeb',
      yellow200: '#ffefc6',
      yellow300: '#fdb022',
      red100: '#FCE4EC',
      red200: '#F8BBD0',
      red300: '#EC407A',
      green100: '#66BB6A',
      green200: '#43A047',
      green300: '#2E7D32',
      greenBg: '#f0fdf4',
      gray100: '#E0E0E0',
      gray200: '#9E9E9E',
      gray300: '#757575',
      black100: '#F5F5F5',
      black200: '#FAFAFA',
      black300: '#f1f1f1',
      w100: '#F6F6F6',
      w200: '#e7e7e7',
      w300: '#d1d1d1',
      bg: {
         primary: '#000000',
         secondary: '#1E1F21',
         primaryH: '#2551eb',
         disable: '#323338',
         bg1: '#18191B',
         bg2: '#333436',
      },
      text: {
         primary: '#EAEAEA',
         secondary: '#e6e9ef',
         placeholder: '#e3e3e3',
      },
      border: '#fbfbfb',
   },
};

export default theme;
