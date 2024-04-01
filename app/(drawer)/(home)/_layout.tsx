import { Link, Tabs } from "expo-router";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { MaterialIcons,MaterialCommunityIcons } from "@expo/vector-icons";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
interface Props {
    // Define your props here
}
const _layout = (props: Props) => {
    const theme = useTheme();
    const style = useThemeStyles(styles);

    return (
        <Tabs
        sceneContainerStyle={{
          backgroundColor:theme.colors.bg.bg1
        }}
            screenOptions={{
                tabBarStyle: {
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    left: 0,
                    elevation: 5,
                    height: theme.size.s50 * 1.2,
                    backgroundColor: theme.colors.bg.bg2,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    opacity: 0.9,
                    borderTopColor:'transparent'
                },
                tabBarButton: props => {
                    const { children, onPress, focused } = props;
                    return (
                        <Pressable
                            style={[
                                style.tabBarButtonStyle,
                                {
                                    backgroundColor: focused
                                        ? theme.colors.tangerine + "50"
                                        : "transparent"
                                }
                            ]}
                            onPress={onPress}
                        >
                            {children}
                        </Pressable>
                    );
                },
                tabBarLabelStyle: {
                    fontFamily: "inter",
                    fontWeight: 700
                },
                tabBarActiveTintColor: theme.colors.blue,
                tabBarInactiveTintColor: theme.colors.gray,
            
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Dashbord",
                    tabBar: ({}) => <Text>Hellk</Text>,
                    headerShown: true,
                    tabBarIcon: ({ color, size, focused }) => (
                        <MaterialIcons
                            name="space-dashboard"
                            color={color}
                            size={focused ? theme.size.s7 : size}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="patient"
                options={{
                    title: "Patient",
                    headerShown: true,
                    tabBarIcon: ({ color, size, focused }) => (
                        <MaterialIcons
                            name="group"
                            color={color}
                            size={focused ? theme.size.s7 : size}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="food"
                options={{
                    title: "Food",
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        <MaterialCommunityIcons
                            name="food-apple"
                            color={color}
                            size={focused ? theme.size.s7 : size}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="agenda"
                options={{
                    title: "Agenda",
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        <MaterialIcons
                            name="calendar-month"
                            color={color}
                            size={focused ? theme.size.s7 : size}
                        />
                    )
                }}
            />
        </Tabs>
    );
};

export default _layout;

const styles = theme =>
    StyleSheet.create({
        tabBarButtonStyle: {
            flex: 1,
            height: "80%",
            alignSelf: "center",
            borderRadius: theme.size.s5
        }
    });
