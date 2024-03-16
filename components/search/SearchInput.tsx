import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { router, useNavigation } from "expo-router";
interface Props {
    value: string;
    onChange: (value: string) => void;
    onFilterPress?: () => void;
    placeholder: string;
    setValue: (value: string) => void;
    withFilter?: boolean;
    withGoBack?:boolean
}

const SearchInput = ({
    value,
    onChange,
    onFilterPress = () => {},
    placeholder,
    setValue,
    withFilter = false,
    withGoBack=false
}: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);

    const navigation = useNavigation();
    return (
        <View style={style.searchInputContainer}>
           {withGoBack&& <View style={style.goBackIconContainer}>
                <Pressable
                    style={style.goBackBtn}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name={"arrow-back"}
                        size={size.s5}
                        color={colors.black300}
                    />
                </Pressable>
            </View>}
            <View style={style.textInputContainer}>
            <Ionicons name={"search"} size={size.s5} color={colors.gray200} />
                <TextInput
                    placeholderTextColor={colors.gray300}
                    style={style.textInput}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={setValue}
                    onChange={onChange}
                />
                {value != "" && (
                    <Pressable
                        style={style.clearIconContainer}
                        onPress={() => setValue("")}
                    >
                        <Ionicons
                            name={"close"}
                            size={size.s4}
                            color={colors.gray300}
                        />
                    </Pressable>
                )}
            </View>
            {withFilter && (
                <View style={style.filterBtnContainer}>
                    <Pressable
                        style={style.filterBtn}
                        onPress={() => onFilterPress()}
                    >
                        <Ionicons
                            name={"filter"}
                            color={colors.black300}
                            size={size.s5}
                        />
                    </Pressable>
                </View>
            )}
        </View>
    );
};

export default SearchInput;

const styles = ({ colors, size }) =>
    StyleSheet.create({
        searchInputContainer: {
            flexDirection: "row",
            alignItems: "center",
            height: size.s100 * 0.7,
            gap: size.s1,
            paddingHorizontal: size.s1
        },
        goBackIconContainer: {
            justifyContent: "center",
            alignItems: "center",
            flex: 1
        },
        textInputContainer: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.bg.secondary,
            flex: 8,
            borderRadius: size.s100,
            height: "70%",
            overflow: "hidden",
            paddingHorizontal: size.s4,
            gap:size.s2
        },
        filterBtnContainer: {
            justifyContent: "center",
            alignItems: "center",
            flex: 1
        },
        textInput: {
            height: "100%",
            width: "100%",
            backgroundColor: colors.bg.secondary,
            fontFamily: "inter_m",
            fontSize: size.s4,
            color: colors.black200
        },
        clearIconContainer: {
            position: "absolute",
            right: size.s3,
            padding: size.s1,
            elevation: 1,
            backgroundColor: colors.w,
            borderRadius: size.s50
        },
        filterBtn: {
            padding: size.s2,
            borderRadius: size.s100
        },
        goBackBtn: {
            padding: size.s2,
            borderRadius: size.s100
        }
    });
