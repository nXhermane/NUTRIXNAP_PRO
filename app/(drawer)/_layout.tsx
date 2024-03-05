import { View, Text } from "react-native";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface Props {
    // Define your props here
}

const _layout = (props: Props) => {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer>
            <Drawer.Screen name={"index"} options={{ headerShown: false }} />
            <Drawer.Screen name={"(home)"} options={{ headerShown: false }}/>
            <Drawer.Screen name={"notification"} options={{ headerShown: true }}/>
            
        </Drawer>
        </GestureHandlerRootView>
    );
};

export default _layout;
