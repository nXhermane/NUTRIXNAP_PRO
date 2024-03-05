import { StyleSheet, Text, View } from "react-native";
import Avatars from "@comp/basic/Avatars";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";

interface Props {
    // Define your props here
}

const Top = (props: Props) => {
    const theme = useTheme();
    const style = useThemeStyles(styles);
    return (
        <View style={style.topContainer(props.st)}>
            <View style={style.userGreeting}>
                <Avatars letter={"H"} r={theme.size.s2} s={40} />
                <View style={style.userInfo}>
                    <Text style={style.greeting}>Hi, Hermane!</Text>
                    <Text style={style.welcome}>
                        Welcome back for nutriXnap
                    </Text>
                </View>
            </View>
            <View style={style.dateContainer}>
                <Text style={style.time}>07h 58min</Text>
                <Text style={style.date}>1 Mars 2024</Text>
            </View>
            <View style={style.searchContainer}></View>
        </View>
    );
};

export default Top;

const styles = theme =>
    StyleSheet.create({
        topContainer:st=>( {
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: theme.size.s4,
            flexDirection: "row",
            ...st
        }),
        searchContainer:{
          position:'absolute',
        },
        dateContainer: {},
        userGreeting: {
          gap:5,
          flexDirection:'row',
          alignItems:'center'
        },
        userInfo: {
          gap:1
        },
        greeting: {
          fontFamily:'inter',
          fontSize:theme.size.s4,
          color:theme.colors.text.primary,
          fontWeight:'bold'
        },
        welcome: {
          fontFamily:'inter',
          fontSize:theme.size.s3,
          color:theme.colors.text.secondary
        },
        time: {
          fontFamily:'inter',
          fontSize:theme.size.s3,
          color:theme.colors.text.secondary,
          textAlign:'right',
          fontWeight:'500'
        },
        date: {
          fontFamily:'inter',
          fontSize:theme.size.s3,
          color:theme.colors.text.secondary,
          textAlign:'right',
          fontWeight:"700"
        }
    });
