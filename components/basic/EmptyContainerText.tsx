import { StyleSheet, Text, View } from "react-native";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import React from "react";
interface Props {
    // Define your props here
}

const EmptyContainerText = (props: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    return (
        <View style={style.container}>
            <Text style={style.textStyle}>{props.children}</Text>
        </View>
    );
};



export default EmptyContainerText;

const styles = ({ size, colors }) =>
    StyleSheet.create({
        container: {
          
          justifyContent:'center',
          alignItems:'center',
          backgroundColor:'red'
          
        },
        textStyle:{
          fontSize:size.s4,
          fontFamily:'inter_b',
          color:colors.gray200,
          textAlign:'center',
          textAlignVertical:'center',
          
        }
    });
