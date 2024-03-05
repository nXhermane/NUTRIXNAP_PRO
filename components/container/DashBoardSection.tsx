import { StyleSheet, Text, View } from "react-native";
import React  from 'react'

import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import { router, Link } from "expo-router";
interface Props {
    // Define your props here
}

const DashBoardSection:React.FC = (props: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    return (
        <View style={style.serviceContainer}>
            <View style={style.serviceHead}>
                <Text style={style.title}>{props.title}</Text>
                <Link href={props.linkPath} style={style.link}>
                    <Text style={style.linkText}>{props.linkTitle}</Text>
                </Link>
            </View>
            <View style={style.serviceInner}>
            {props.children}
            </View>
        </View>
    );
};

export default DashBoardSection;

const styles = ({size,colors}) => StyleSheet.create({
  serviceContainer: {
            width: "100%",
            gap: size.s4,
            marginTop: size.s8
        },
        serviceHead: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: size.s5
        },
        title: {
            fontFamily: "inter",
            fontWeight: "700",
            color: colors.text.primary,
            fontSize: size.s5
        },
        link: {
            fontFamily: "inter"
        },
        linkText: {
            fontFamily: "inter",
            fontSize: size.s3,
            color: colors.blue,
            fontWeight: "600"
        },
        serviceInner:{
          
        }
});
