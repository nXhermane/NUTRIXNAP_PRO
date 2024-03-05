import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import { router, Link } from "expo-router";
import { ServicesData } from "../../../data";
import DashBoardSection from "@comp/container/DashBoardSection";
interface Props {
    // Define your props here
}

const ServiceContainer = (props: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);

    return (
        <DashBoardSection
            title={"Ours Services"}
            linkTitle={"See All"}
            linkPath={"/"}
            style={style.serviceInner}
        >
            <FlatList
                data={ServicesData}
                renderItem={({ item }) => <ServiceItem data={item} />}
                horizontal
                keyExtractor={(_, index) => _.name}
                showsHorizontalScrollIndicator={false}
            />
        </DashBoardSection>
    );
};
const ServiceItem = ({ data }: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    return (
        <Pressable
            style={({ pressed }) =>
                style.serviceItemConatiner(data.color, pressed)
            }
            onPress={() => alert(data.name)}
        >
            {({ pressed }) => (
                <>
                    <View style={style.pressableIcon}></View>
                    <Text style={style.serviceText(data.textColor)}>
                        {data.name}
                    </Text>
                </>
            )}
        </Pressable>
    );
};
export default ServiceContainer;

const styles = ({ colors, size }) =>
    StyleSheet.create({
        
        serviceItemConatiner: (bg, pressed) => ({
            width: size.s100 * 1.2,
            height: size.s100 * 1.2,
            borderRadius: size.s3,
            backgroundColor: pressed ? bg.slice(0, -2) + "99" : colors.blue|| bg,
            justifyContent: "center",
            alignItems: "center",
            gap: size.s3,
            marginHorizontal: size.s3,
            elevation: 5
        }),
        serviceText: color => ({
            fontFamily: "inter",
            fontWeight: "700",
            color,
            fontSize: size.s2*1.2,
            textAlign: "center"
        }),
        pressableIcon: {
            width: '40%',
            height: '40%',

            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 600
        }
    });
