import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import Button from "@comp/basic/Button";
import Avatars from "@comp/basic/Avatars";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
interface Props {}

const logininfo = (props: Props) => {
    const theme = useTheme();
    const style = useThemeStyles(styles);
    const params = useLocalSearchParams();
    const { id, user } = params;
    const [userInfo, setUserInfo] = useState(JSON.parse(user));
    useEffect(() => {}, [user]);
    return (
        <View style={style.container}>
            <View style={style.getUserInfoContainer}>
                <TouchableOpacity
                    style={style.avatarsContainer}
                    underlayColor={theme.colors.bg.primary}
                    onPress={() => alert("change Profile image")}
                >
                    <Avatars
                        image={{ uri: userInfo.picture }}
                        color={theme.colors.text.primary}
                        bg={theme.colors.bg.disable}
                        s={theme.size.s100}
                    />
                </TouchableOpacity>
                <Text style={style.userInfoName}>{userInfo.name}</Text>
            </View>
            <View style={style.loginInfoContainer}></View>
        </View>
    );
};

export default logininfo;

const styles = theme =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.bg.secondary,
            flex: 1
        },
        getUserInfoContainer: {
            justifyContent: "center",
            alignItems: "center",
            height: theme.size.height * 0.2,
            marginTop: theme.size.s10,
            gap: theme.size.s5
        },
        userInfoName: {
            fontFamily: "inter",
            fontSize: theme.size.s5,
            fontWeight: "700",
            color: theme.colors.white
        },
        avatarsContainer: {
            borderRadius: 500
        },
        loginInfoContainer: {
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            width: "100%",
            height: theme.size.height * 0.8,
            backgroundColor: theme.colors.bg.primary,
            borderTopLeftRadius: theme.size.s5,
            borderTopRightRadius: theme.size.s5
        }
    });
