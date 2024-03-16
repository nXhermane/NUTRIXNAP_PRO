import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import {ThemeInterface,useTheme,useThemeStyles} from "@/theme"
import { MaterialIcons } from "@expo/vector-icons";
interface Props {
    // Define your props here
}

const SearchInput = (props: Props) => {
    const {
        onBlur = () => {},
        onFocus = () => {},
        isFocus = false,
        disableClearIcon = true,
        h,
        w,
        r,bw,
        st
    } = props;
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    return (
        <View style={style.search({h,w,r,bw,st})}>
            <View style={style.iconContainer}>
                <MaterialIcons name={"search"} size={24} color={colors.gray} />
            </View>
            <View style={style.textInputContainer}>
                <TextInput
                    style={style.textInput}
                    value={props.v}
                    onChangeText={props.onChange}
                    placeholder={props.p || "Search..."}
                    placeholderTextColor={props.pC}
                    autoCorrect={true}
                    // onSubmitEditing={({nativeEvent: {text, eventCount, target}})=>buttonPress()}
                    inputMode={props.iM || "text"}
                    ref={props.ref}
                    onBlur={() => onBlur()}
                    onFocus={() => {
                        onFocus();
                    }}
                />
            </View>
            {disableClearIcon && (
                <Pressable
                    style={style.iconContainer}
                    onPress={() => props.onClear()}
                >
                    <MaterialIcons
                        name={"clear"}
                        size={15}
                        color={colors.gray}
                    />
                </Pressable>
            )}
        </View>
    );
};

export default SearchInput;

const styles = ({ size, colors }:ThemeInterface) =>
    StyleSheet.create({
        search: ({ h, w, r, bw,st }) => ({
            width: w || size.width * 0.8,
            height: h || size.s50 * 0.9,
            borderRadius: r || size.s100 * 2,
            backgroundColor: colors.bg.bg2,
            //  borderWidth:bw|| size.s1/6,
            borderColor: colors.gray,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            overflow: "hidden",
            paddingHorizontal: size.s2,
            elevation:1,
            ...st
        }),
        textInputContainer: {
            flex: 8,
            height: "100%"
        },
        textInput: {
            height: "100%",
            fontFamily: "inter",
            fontSize: size.s3 * 1.1,
            fontWeight: "600",
            color: colors.text.primary+'95'
        },
        iconContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
        }
    });
