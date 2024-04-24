/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from './useColorScheme';

type ThemeProps = {
  lightColor?: string | null;
  darkColor?: string | null;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function useThemeColor<T extends keyof typeof Colors.light & keyof typeof Colors.dark>(
  props: { light?: string; dark?: string } | undefined,
  colorName: T
): typeof Colors.light[T] | typeof Colors.dark[T] {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props?.[theme];

  if (colorFromProps !== undefined && colorFromProps !== null) {
    return colorFromProps as typeof Colors.light[T] | typeof Colors.dark[T];
  } else {
    return (Colors as any)[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text') || 'black';

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props:
