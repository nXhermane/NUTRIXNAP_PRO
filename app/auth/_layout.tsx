import { StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';

export const unstable_settings = {
   initialRouteName: 'index',
};
const _layout = (props: Props) => {
   return (
      <Stack>
         <Stack.Screen name={'index'} options={{ headerShown: false }} />
         <Stack.Screen name={'logininfo'} options={{ headerShown: false }} />
      </Stack>
   );
};

export default _layout;

const styles = StyleSheet.create({});
