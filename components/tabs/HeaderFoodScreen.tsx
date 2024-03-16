import { StyleSheet, Text, View, Pressable } from "react-native";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, router } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import AddFoodIcon from "./../../assets/images/noun-grocery-2157313.svg";
interface Props {
    // Define your props here
}

const HeaderFoodScreen = (props: Props) => {
    const { colors, size, isLightTheme } = useTheme();
    const style = useThemeStyles(styles);
    const navigation = useNavigation();
    return (
        <BlurView
            experimentalBlurMethod={"dimezisBlurView"}
            intensity={15}
            tint={isLightTheme ? "light" : "dark"}
            style={style.container}
        >
            <View style={style.headerRight}>
                <Pressable
                    style={style.icon}
                    onPress={() => {
                        navigation.openDrawer();
                    }}
                >
                    {({ pressed }) => (
                        <Feather
                            style={{
                                transform: [{ rotateZ: "90deg" }]
                            }}
                            name="bar-chart-2"
                            size={size.s7}
                            color={pressed ? colors.blue : colors.b}
                        />
                    )}
                </Pressable>
            </View>
            <View style={style.headerCenter}>
                <Text style={style.headerTitle}>Foods</Text>
            </View>
            <View style={style.headerRight}>
                <Pressable
                    // style={({ pressed }) =>
                    //     style.icon(colors.w, colors.b, pressed)
                    // }
                    onPress={() => {
                        router.navigate("search/searchFoods");
                    }}
                >
                    {({ pressed }) => (
                        <Ionicons
                            name="search-sharp"
                            size={size.s5}
                            color={
                                colors.b
                            }
                        />
                    )}
                </Pressable>
                <Pressable
                    // style={({ pressed }) =>
                    //   // style.icon(colors.yellow100, colors.yellow300, pressed)
                    // }
                    onPress={() => {
                        navigation.openDrawer();
                    }}
                >
                    {({ pressed }) => (
                        <AddFoodIcon
                            width={size.s8}
                            height={size.s8}
                            fill={colors.b}
                        />
                    )}
                </Pressable>
            </View>
        </BlurView>
    );
};

export default HeaderFoodScreen;

const styles = ({ colors, size }) =>
    StyleSheet.create({
        container: {
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            height: size.s100,
            backgroundColor: colors.bg.bg2 + "98",
            paddingTop: size.s50,
            paddingHorizontal: size.s3,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        headerRight: {
            flexDirection: "row",
            gap: size.s5,
            justifyContent: "flex-end",
            alignItems: "center"
        },
        headerLeft: {
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center"
        },
        pressable: {
            width: size.s50,
            height: size.s50,
            backgroundColor: colors.bg.bg2,
            borderRadius: 500,
            borderColor: colors.gray,
            borderWidth: size.s1 / 4,
            justifyContent: "center",
            alignItems: "center"
        },
        headerCenter: {
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row"
        },
        headerTitle: {
            fontFamily: "inter_b",
            fontSize: size.s4 * 1.2,
            padding: size.s2,

            color: colors.black300,
            textTransform: "uppercase"
        },
        icon: (b1, b2, pressed) => ({
            padding: size.s2,
            backgroundColor: pressed ? b2 : b1,
            borderRadius: 500
        })
    });
