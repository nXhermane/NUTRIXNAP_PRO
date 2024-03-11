import { StyleSheet, Text, View } from "react-native";
import Avatars from "@comp/basic/Avatars";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles"
import DashBoardSection from '@comp/container/DashBoardSection';
import React from "react";
interface Props {
    // Define your props here
}

const Top = (props: Props) => {
    const theme = useTheme();
    const style = useThemeStyles(styles);
    const [date, setDate] = React.useState("");
    const [time, setTime] = React.useState("second");
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
                        uri: "https://lh3.googleusercontent.com/a/ACg8ocL10GHjCILxoFxiWqckBVP5kUiUJ9jq7I0W20vUMk6r=s96-c"
                    }}
                    r={theme.size.s10}
                    s={40}
                />
                <View style={style.userInfo}>
                    <Text style={style.greeting}>Hi, Hermane!</Text>
                    <Text style={style.welcome}>
                        Welcome back for nutriXnap
                    </Text>
                </View>
            </View>
            <View style={style.dateContainer}>
                <Text style={style.time}>{time}</Text>
                <Text style={style.date}>{date}</Text>
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
            flexDirection: "row",
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
        },
        greeting: {
            fontFamily: "inter_b",
            fontSize: theme.size.s4,
            color: theme.colors.black300,
        },
        welcome: {
            fontFamily: "inter_m",
            fontSize: theme.size.s3,
            color: theme.colors.black200
        },
        time: {
            fontFamily: "inter_sb",
            fontSize: theme.size.s3,
            color: theme.colors.black300,
            textAlign: "right",
            
        },
        date: {
            fontFamily: "inter_m",
            fontSize: theme.size.s3,
            color: theme.colors.black200,
            textAlign: "right",
            
        }
    });
