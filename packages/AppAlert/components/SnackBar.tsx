import { StyleSheet, Text, View } from "react-native";
import { ThemeInterface, useTheme, useThemeStyles } from "@/theme";

interface Props {
    // Define your props here
}

const SnackBar = (props: Props) => {
    const { colors, size, isLightTheme } = useTheme();
    const style = useThemeStyles(styles);
    return (
        <View style={[style.container, {
          backgroundColor:colors.green200
        }]}>
            <Text>FirstTab</Text>
        </View>
    );
};

export default SnackBar;

const styles = ({ colors, size }: ThemeInterface) =>
    StyleSheet.create({
        container: {
            position: "absolute",
            backgroundColor: colors.bg.primary,
            elevation: 5,
            height: size.s50,
            width: "90%",
            alignSelf: "center",
            bottom: size.s2,
            borderRadius: size.s3,
            paddingHorizontal: size.s2,
            justifyContent: "center",
            alignItems: "center"
        }
    });
