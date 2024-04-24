import { useColorScheme as useColorSchemeFromReactNative } from 'react-native';

export function useColorScheme() {
  const colorScheme = useColorSchemeFromReactNative();
  // Add any additional logic or modifications to the color scheme here if needed
  return colorScheme;
}
