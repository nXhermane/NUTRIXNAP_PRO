import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import DashBoardSection from "../container/DashBoardSection";
interface Props {
    // Define your props here
}

const SearchBtn = ({ placeholder, searchPageLink }: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    return (
        <Link href={searchPageLink || "search/search"} asChild>
            <TouchableHighlight
                style={style.seachBtn}
                underlayColor={colors.blue100}
            >
                <>
                    <Ionicons
                        name="search"
                        size={size.s6}
                        color={colors.black100}
                    />
                    <Text style={style.textSeachBtn}>
                        {placeholder || "Reachercher..."}
                    </Text>
                </>
            </TouchableHighlight>
        </Link>
    );
};

export default SearchBtn;

const styles = ({ colors, size }) =>
    StyleSheet.create({
        seachBtn: {
            width: size.width * 0.9,
            height: size.s50,
            backgroundColor: colors.bg.secondary,
            alignSelf: "center",
            borderRadius: size.s100,
            elevation: size.s1 / 4,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: size.s5,
            paddingHorizontal: size.s5
        },
        textSeachBtn: {
            fontFamily: "inter_r",
            color: colors.gray300,
            fontSize: size.s4
        }
    });
