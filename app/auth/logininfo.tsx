import { StyleSheet, Text, View, TouchableOpacity,PressEvent } from "react-native";

import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import Button from "@comp/basic/Button";
import Avatars from "@comp/basic/Avatars";
import React, { useEffect, useState, useContext } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { CoreContext } from "@/core/CoreProvider";
import { UserEntity } from "@/core/interfaces";
import LoginModal from "@comp/auth/LoginModal";
interface Props {}

const logininfo = (props: Props) => {
    const theme = useTheme();
    const style = useThemeStyles(styles);
    const core = useContext(CoreContext);
    const params = useLocalSearchParams();
    const { id, user } = params;
    const [userInfo, setUserInfo] = useState(JSON.parse(user));
    const [displayLoginModal, setDisplayLoginModal] = useState<boolean>(false);
    const [modalAninatedData, setModalAninatedData] = useState({})
    const saveUser = async () => {
        let user: UserEntity = {
            name: userInfo.name,
            email: userInfo.email,
            profil_img: userInfo.picture,
            lastname: userInfo.family_name,
            firstname: userInfo.given_name,
            country: userInfo.locale
        };
        const checkIfUserExist = await core.userS.checkIfUserExist();
        if (!checkIfUserExist) {
            const createUser = await core.userS.createUser(user);
            core.setUser(createUser);
        }
    };
    useEffect(() => {}, [user]);
    return (
        <View style={style.container}>
            <View style={style.getUserInfoContainer}>
                <View style={style.topTextContainer}>
                    <Text style={style.topText}>
                        {"Continuer en tant que " + userInfo.given_name + " ?"}
                    </Text>
                </View>
                <View>
                    <TouchableOpacity
                        style={style.avatarsContainer}
                        underlayColor={theme.colors.bg.primary}
                        onPress={() => alert("change Profile image")}
                    >
                        <Avatars
                            image={{ uri: userInfo.picture }}
                            color={theme.colors.text.primary}
                            bg={theme.colors.bg.disable}
                            s={theme.size.s100 * 1.5}
                        />
                    </TouchableOpacity>
                </View>
                <View style={style.textInfoContainer}>
                    <Text style={style.userInfoName}>{userInfo.name}</Text>
                    <Text style={style.userInfoEmail}>{userInfo.email}</Text>
                </View>
                <View style={style.loginInfoActionBtnContainer}>
                    <Button
                        title={"Continuer"}
                        gradient
                        h={theme.size.s50 * 0.9}
                        w={theme.size.width * 0.85}
                        r={theme.size.s5 * 2}
                        ff={"inter"}
                        onPress={(e:PressEvent) => {
                            //  saveUser()
                            //router.navigate("./../(drawer)/(home)");
                            
                            setModalAninatedData({
                              x:e.nativeEvent.pageX,
                              y:e.nativeEvent.pageY
                            })
                            setDisplayLoginModal((prev: boolean) => !prev);
                        }}
                    />
                    {displayLoginModal && (
                        <LoginModal
                            popupIsOpen={(val: boolean) =>
                                setDisplayLoginModal(val)
                            }
                            animatedData={modalAninatedData}
                            userInfo={userInfo}
                        />
                    )}
                    <Button
                        title={"Se connecter a un autre compte"}
                        outlined
                        outlinedBgColor={theme.colors.bg.bg1}
                        // c={theme.colors.gray}
                        //fc={theme.colors.b}
                        h={theme.size.s50 * 0.9}
                        w={theme.size.width * 0.85}
                        r={theme.size.s5 * 2}
                        ff={"inter"}
                    />
                </View>
            </View>
        </View>
    );
};

export default logininfo;

const styles = theme =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.w,
            flex: 1
        },
        getUserInfoContainer: {
            justifyContent: "center",
            alignItems: "center",
            height: theme.size.height,
            marginTop: theme.size.s10,
            gap: theme.size.s5
        },
        topTextContainer: {
            justifyContent: "center",
            alignItems: "center",
            padding: theme.size.s4
        },
        topText: {
            fontFamily: "inter",
            fontSize: theme.size.s6,
            fontWeight: "700",
            color: theme.colors.text.primary
        },
        textInfoContainer: {
            justifyContent: "center",
            alignItems: "center",
            padding: theme.size.s3
        },
        userInfoName: {
            fontFamily: "inter",
            fontSize: theme.size.s6,
            fontWeight: "700",
            color: theme.colors.text.primary
        },
        userInfoEmail: {
            fontFamily: "inter",
            fontSize: theme.size.s3,
            fontWeight: "700",
            color: theme.colors.text.primary
        },
        avatarsContainer: {
            borderRadius: 500,
            borderWidth: theme.size.s2 * 0.9,
            borderColor: theme.colors.bg.bg2,
            justifyContent: "center",
            alignItems: "center",
            elevation: 20,
            shadowColor: theme.colors.b,
            shadowOffset: { height: 0, weight: 0 },
            shadowOpacity: 1,
            shadowRadius: 20
        },
        loginInfoActionBtnContainer: {
            width: theme.size.width,
            gap: theme.size.s4,
            justifyContent: "center",
            alignItems: "center"
        }
    });
