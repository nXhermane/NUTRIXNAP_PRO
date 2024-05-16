import { StyleSheet, View } from "react-native";
import Avatars from "@comp/basic/Avatars";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import DashBoardSection from "@comp/container/DashBoardSection";
import React from "react";
import { CoreContext } from "@/core/CoreProvider";
import Text from "@comp/basic/Text";
interface Props {
    // Define your props here
}

const Top = (props: Props) => {
    const theme = useTheme();
    const style = useThemeStyles(styles);
    const [date, setDate] = React.useState("");
    const [time, setTime] = React.useState("second");
    const core = React.useContext(CoreContext);

    React.useEffect(() => {
        const date = new Date();
        const options = {
            month: "long",
            day: "numeric",
            weekDay: "long",
            year: "numeric"
        };
        setDate(date.toLocaleDateString(undefined, options));
        setInterval(() => {
            const date = new Date();
            const options = {
                hour: "numeric",
                minute: "numeric",
                timeZoneName: "shortGeneric"
            };
            setTime(date.toLocaleTimeString(undefined, options));
        }, 600);
    });

    return (
        <DashBoardSection header>
            <View style={style.topContainer(props.st)}>
                <View style={style.userGreeting}>
                    <Avatars
                        image={{
                            uri: core.user?.profil_img
                        }}
                        letter={core.user?.name.slice(0, 1)}
                        r={theme.size.s10}
                        s={40}
                    />
                    <View style={style.userInfo}>
                        <Text type={"h3"}>
                            {"Hi, " + core.user?.firstname + "!"}
                        </Text>
                        <Text type={"p1"}>Welcome back for nutriXnap</Text>
                    </View>
                </View>
                <View style={style.dateContainer}>
                    <Text type={"p2"} align={"r"}>
                        {time}
                    </Text>
                    <Text type={"p2"} align="r">
                        {date}
                    </Text>
                </View>
                <View style={style.searchContainer}></View>
            </View>
        </DashBoardSection>
    );
};

export default Top;

const styles = theme =>
    StyleSheet.create({
        topContainer: st => ({
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: theme.size.s4,
            flexDirection: "row"
            // ...st
        }),
        searchContainer: {
            position: "absolute"
        },
        dateContainer: {},
        userGreeting: {
            gap: 5,
            flexDirection: "row",
            alignItems: "center"
        },
        userInfo: {
            gap: 1
        }
    });
