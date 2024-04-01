import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import API from "@/constants/api";
import COLORS from "@/constants/Colors";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import Button from "@comp/basic/Button";
import Logo from "@comp/basic/Logo";
import { AntDesign } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useContext } from "react";
import { router } from "expo-router";
import { CoreContext } from "@/core/CoreProvider";
interface Props {}
WebBrowser.maybeCompleteAuthSession();
const index = (props: Props) => {
    const theme = useTheme();
    const style = useThemeStyles(styles);
    const core = useContext(CoreContext);
    const [userInfo, setUserInfo] = React.useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest(
        API.googleAuth
    );
    const redirectUri = makeRedirectUri({
        scheme: "nutriXnap",
        path: "auth/logininfo"
        // queryParams: userInfo
    });
    const signInWithGoogle = async () => {
        try {
            // Attempt to retrieve user information from AsyncStorage
            const userJSON = await AsyncStorage.getItem("user");

            if (userJSON) {
                // If user information is found in AsyncStorage, parse it and set it in the state
                setUserInfo(JSON.parse(userJSON));
            } else if (response?.type === "success") {
                // If no user information is found and the response type is "success" (assuming response is defined),
                // call getUserInfo with the access token from the response
                getUserInfo(response.authentication.accessToken);
            }
        } catch (error) {
            // Handle any errors that occur during AsyncStorage retrieval or other operations
            console.error(
                "Error retrieving user data from AsyncStorage:",
                error
            );
        }
    };
    const getUserInfo = async token => {
        //absent token
        if (!token) return;
        //present token
        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            const user = await response.json();
            //store user information  in Asyncstorage
            await AsyncStorage.setItem("user", JSON.stringify(user));
            setUserInfo(user);
        } catch (error) {
            console.error(
                "Failed to fetch user data:",
                response.status,
                response.statusText
            );
        }
    };
    

    useEffect(() => {
        signInWithGoogle();
        if (userInfo != null) {
            router.navigate({
                pathname: "./logininfo",
                params: {
                    user: JSON.stringify(userInfo)
                }
            });
        }
    }, [response]);
    return (
        <View style={style.container}>
            <View style={style.getStartedContainer}>
                <View style={style.getStartedLogo}>
                    <Logo s={theme.size.s100 * 1.5} />
                </View>
                <View style={style.getStartedBody}>
                    <Text style={style.getStartedBodyTitle}>Commençons!</Text>
                    <Text style={style.getStartedBodyParagraph}>
                        Prêt à commencer ? Connectez-vous pour profiter de
                        NutriXnap: l'application qui vous simplifie la vie de
                        diététicien.
                    </Text>
                </View>
                <View style={style.getStartedAction}>
                    <Button
                        gradient
                        h={theme.size.s50 * 0.9}
                        w={theme.size.width * 0.85}
                        r={theme.size.s5 * 2}
                        title={"Connectez-vous"}
                        ff="inter"
                        onPress={() => {
                            //promptAsync({ redirectUri });
                            router.navigate({
                                pathname: "./logininfo",
                                params: {
                                    user: JSON.stringify({
                                        id: "105049269041464607468",
                                        email: "hermanoricoby@gmail.com",
                                        verified_email: true,
                                        name: "Hermano Dossou",
                                        given_name: "Hermano",
                                        family_name: "Dossou",
                                        picture:
                                            "https://lh3.googleusercontent.com/a/ACg8ocL10GHjCILxoFxiWqckBVP5kUiUJ9jq7I0W20vUMk6r=s96-c",
                                        locale: "fr"
                                    })
                                }
                            });
                        }}
                    />
                    <Button
                        onPress={() => alert("fonctionnalite non inplementer")}
                        gradient={false}
                        outlined
                        ff="inter"
                        h={theme.size.s50 * 0.9}
                        w={theme.size.width * 0.85}
                        r={theme.size.s5 * 2}
                        title={"Inscrivez-vous"}
                        outlinedBgColor={theme.colors.bg.bg1}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = theme =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.w,
            justifyContent: "center",
            alignItems: "center",
            flex: 1
        },
        text: {
            color: theme.colors.b,
            fontSize: theme.size.s9,

            fontWeight: "bold",
            fontFamily: "inter"
        },
        getStartedContainer: {
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            gap: theme.size.s50
        },
        getStartedLogo: {
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            gap: theme.size.s1
        },
        getStartedBody: {
            width: "85%",
            gap: theme.size.s4
        },
        getStartedBodyTitle: {
            fontFamily: "inter",
            textAlign: "center",
            fontWeight: "700",
            fontSize: theme.size.s6,
            color: theme.colors.text.primary
        },
        getStartedBodyParagraph: {
            fontFamily: "inter",
            textAlign: "center",
            fontSize: theme.size.s4,
            color: theme.colors.text.secondary,
            lineHeight: theme.size.s6
        },
        getStartedAction: {
            gap: theme.size.s5,
            alignItems: "center",
            justifyContent: "center"
        }
    });
export default index;
