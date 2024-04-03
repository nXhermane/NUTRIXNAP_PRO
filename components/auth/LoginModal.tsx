import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Modal,
<<<<<<< HEAD
    KeyboardAvoidingView
=======
    KeyboardAvoidingView,
    PressEvent
>>>>>>> 65fe56f (After .git remove)
} from "react-native";
import { ThemeInterface, useTheme, useThemeStyles } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useReducer, useContext } from "react";
import Avatars from "@comp/basic/Avatars";
import Button from "@comp/basic/Button";
import TextInput from "@comp/basic/TextInput";
import TelInput from "@comp/basic/TelInput";
import DateInput from "@comp/basic/DateInput";
import SelectionInput from "@comp/basic/SelectionInput";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    interpolate,
    withTiming,
    runOnJS
} from "react-native-reanimated";
import { continents, countries, languages } from "countries-list";
import {
    getCountryCode,
    getCountryData,
    getCountryDataList,
    getEmojiFlag
} from "countries-list";
import useImagePicker from "@/hooks/useImagePicker";
import useDownloadFile from "@/hooks/useDownloadFile";
<<<<<<< HEAD
=======
import useCopyFile from "@/hooks/useCopyFile";
>>>>>>> 65fe56f (After .git remove)
import { CoreContext } from "@/core/CoreProvider";
import { Asset } from "expo-asset";
import { router } from "expo-router";
const COUNTRYDATA = Object.keys(countries).map((countryCode, index) => {
    const country = getCountryData(countryCode);

    return {
        label: country.name,
        code: countryCode,
        id: index,
        flag: getEmojiFlag(countryCode),
        phone: country.phone[0]
    };
});
const SEXEDATA = [
    {
        id: 1,
        label: "Masculin",
        code: "M"
    },
    {
        id: 2,
        label: "Féminin",
        code: "F"
    },
    {
        id: 3,
        label: "Autre",
        code: "O"
    }
];
const PROFESSIONDATA = [
    {
        id: 1,
        label: "Nutritionniste",
        code: "M"
    },
    {
        id: 2,
        label: "Dietetiste",
        code: "F"
    },
    {
        id: 3,
        label: "Autre",
        code: "O"
    }
];

const initialState = {
    name: "",
    lastname: "",
    firtname: "",
    email: "",
    gender: "M",
    country: "FR",
    tel: "",
    birthday: "",
    profession: "",
    profil_img: ""
};

const reducer = (state: typeof initialState, action) => {
    switch (action.type) {
        case "name": {
            return { ...state, name: action.payload };
        }
        case "gender": {
            return { ...state, gender: action.payload };
        }
        case "country": {
            return { ...state, country: action.payload };
        }
        case "tel": {
            return { ...state, tel: action.payload };
        }
        case "birthday": {
            return { ...state, birthday: action.payload };
        }
        case "profession": {
            return { ...state, profession: action.payload };
        }
        case "profil_img": {
            return { ...state, profil_img: action.payload };
        }
    }
};

interface Props {
    // Define your props here
}

const LoginModal = (props: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    const core = useContext(CoreContext);
    const [formInfo, dispatch] = useReducer(reducer, initialState, () => ({
        name: props.userInfo.name,
        email: props.userInfo.email,
        profil_img: props.userInfo.picture,
        lastname: props.userInfo.family_name,
        firstname: props.userInfo.given_name,
        country: props.userInfo.locale
    }));
<<<<<<< HEAD
    const [download, downloadURI, isFinish] = useDownloadFile("profil/logo");
    const [pickImage] = useImagePicker((uri: string, type: string) => {
        if (uri != "") {
            dispatch({ type: "profil_img", payload: uri });
        }
    });
=======
    const [downloadImage] = useDownloadFile();
    const [pickImage, pickUri, pickType] = useImagePicker();
    const [copyImage] = useCopyFile();
>>>>>>> 65fe56f (After .git remove)
    const modalSize = useSharedValue(0);
    const position = useSharedValue(props.animatedData);
    const modalAnimatedStyle = useAnimatedStyle(() => {
        return {
            position: "absolute",
            top: position.value.y,
            left: position.value.x,
            width: interpolate(modalSize.value, [0, 1], [0, size.width]),
            height: interpolate(
                modalSize.value,
                [0, 0.5, 1],
                [0, size.width, size.height]
            ),
            borderRadius: interpolate(
                modalSize.value,
                [0, 0.5, 1],
                [1000, 4, 0]
            ),
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden"
        };
    });
    const animation = (value: number) => {
        if (value === 1) {
            modalSize.value = withTiming(1, { duration: 500 });
            position.value = withTiming({ x: 0, y: 0 }, { duration: 500 });
        } else {
            modalSize.value = withTiming(0, { duration: 500 });
            position.value = withTiming(
                { x: props.animatedData.x, y: props.animatedData.y },
                { duration: 500 },
                () => {
                    runOnJS(props.popupIsOpen)(false);
                }
            );
        }
    };
    React.useEffect(() => {
        animation(1);
    });
<<<<<<< HEAD
=======

    const onSubmit = (e: PressEvent) => {
        core.userS.createUser(formInfo).then(user => {
            let imageDownloadFunc;
            if (formInfo.profil_img.slice(0, 4).includes("http")) {
                imageDownloadFunc = downloadImage;
            } else {
                imageDownloadFunc = copyImage;
            }
            imageDownloadFunc(
                formInfo.profil_img,
                "users_" + formInfo.name.split(" ").join("").toLowerCase(),
                "profil_img." + pickType
            ).then(({ uri }) => {
                core.userS
                    .updateUser({ id: user.id, profil_img: uri })
                    .then(upUser => {
                        core.setUser(upUser);
                        console.log(upUser);
                        animation(0);
                        router.replace("(drawer)/(home)");
                    });
            });
        });
    };
>>>>>>> 65fe56f (After .git remove)
    return (
        <Modal
            transparent
            onRequestClose={() => {
                animation(0);
            }}
        >
            <Animated.View style={[modalAnimatedStyle]}>
                <View style={style.loginFormContainer}>
                    <View style={style.header}>
                        <Text style={style.formTitle}>
                            Mise à jour du profil
                        </Text>
                    </View>
                    <View style={style.formContainer}>
                        <View style={style.profilImgContainer}>
                            <Avatars
                                image={{ uri: formInfo.profil_img }}
                                letter={formInfo.name.slice(0, 1) || "P"}
                                bg={colors.yellow100}
                                color={colors.yellow300}
<<<<<<< HEAD
                                onLongPress={() => pickImage()}
=======
                                onLongPress={() =>
                                    pickImage().then(({ uri, type }) => {
                                        if (uri != "") {
                                            dispatch({
                                                type: "profil_img",
                                                payload: uri
                                            });
                                        }
                                    })
                                }
>>>>>>> 65fe56f (After .git remove)
                                st={{
                                    alignSelf: "center",
                                    borderWidth:
                                        formInfo.profil_img === ""
                                            ? size.s1
                                            : 0,
                                    borderColor: colors.yellow200
                                }}
                                s={size.s100 * 1.3}
                            />
                        </View>

                        <View style={style.formInputContainer}>
                            <TextInput
                                label={"Nom"}
                                value={formInfo.name}
                                onChangeText={(value: string) =>
                                    dispatch({
                                        type: "name",
                                        payload: value
                                    })
                                }
                                placeholder={"Ex: John Smith"}
                            />
                            <SelectionInput
                                label={"Sexe"}
                                unique
                                data={SEXEDATA}
                                custormItem={CountryItem}
                                value={
                                    SEXEDATA.find(
                                        item => item.code === formInfo.gender
                                    )?.label
                                }
                                selectedId={1}
                                onChange={(ids: number, data: any) => {
                                    dispatch({
                                        type: "gender",
                                        payload: data.code
                                    });
                                }}
                            />
                            <DateInput
                                label={"Date de naissance"}
                                value={formInfo.birthday}
                                onChange={(date: string) =>
                                    dispatch({
                                        type: "birthday",
                                        payload: date
                                    })
                                }
                                placeholder={"YYYY/MM/DD"}
                            />
                            <SelectionInput
                                label={"Pays"}
                                unique
                                data={COUNTRYDATA}
                                custormItem={CountryItem}
                                value={
                                    getEmojiFlag(formInfo.country) +
                                    "  " +
                                    getCountryData(formInfo.country)?.name
                                }
                                selectedId={1}
                                onChange={(ids: number, data: any) => {
                                    dispatch({
                                        type: "country",
                                        payload: data.code
                                    });
                                }}
                                withSearch
                            />
                            <TelInput
                                label={"Portable"}
                                value={formInfo.tel}
                                tel={
                                    "+" +
                                    getCountryData(formInfo.country)?.phone
                                }
                                onChange={(value: string) => {
                                    dispatch({
                                        type: "tel",
                                        payload: value
                                    });
                                }}
                            />

                            <SelectionInput
                                label={"Profession"}
                                unique
                                data={PROFESSIONDATA}
                                custormItem={CountryItem}
                                value={formInfo.profession}
                                selectedId={1}
                                onChange={(ids: number, data: any) => {
                                    dispatch({
                                        type: "profession",
                                        payload: data.label
                                    });
                                }}
                            />
                        </View>
                        <View style={style.formBtnContainer}>
                            <Button
                                title={"Continuer"}
                                gradient
                                h={size.s50 * 0.9}
                                w={size.width * 0.85}
                                r={size.s5 * 2}
                                ff={"inter"}
<<<<<<< HEAD
                                onPress={() => {
                                    core.userS
                                        .createUser(formInfo)
                                        .then(id => {});
                                    core.userS.getUser().then(user => {
                                        core.setUser(user);
                                        animation(0)
                                        router.replace("(drawer)/(home)");
                                    });
                                }}
=======
                                onPress={onSubmit}
>>>>>>> 65fe56f (After .git remove)
                            />
                        </View>
                    </View>
                </View>
            </Animated.View>
        </Modal>
    );
};

export default LoginModal;
const CountryItem = (label, isSelected, onPress, props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    return (
        <Pressable
            style={[
                {
                    backgroundColor: isSelected ? colors.bg.secondary : colors.w
                },
                style.countryItem
            ]}
            onPress={onPress}
        >
            <Text style={style.itemFlag}>{props.flag}</Text>
            <Text style={style.itemLabel}>{label}</Text>
        </Pressable>
    );
};
const styles = ({ colors, size }: ThemeInterface) =>
    StyleSheet.create({
        text: {
            color: colors.b
        },
        loginFormContainer: {
            width: size.width - size.s6,
            alignSelf: "center",
            height: size.height - size.s6,
            backgroundColor: colors.bg.secondary,
            borderRadius: size.s8,
            padding: size.s5
        },
        header: {
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: size.s8
        },
        formTitle: {
            color: colors.black300,
            fontFamily: "inter_b",
            fontSize: size.s5
        },
        formContainer: {
            alignItems: "center"
        },
        profilImgContainer: {
            width: "100%",
            height: size.s100 * 1.4,
            justifyContent: "center",
            alignItems: "center"
        },
        formInputContainer: {
            paddingVertical: size.s2,
            gap: size.s4,
            width: "100%",
            marginBottom: size.s50
        },
        countryItem: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            height: size.s50,
            borderBottomWidth: size.s1 / 18,
            borderBottomColor: colors.gray100,
            paddingHorizontal: size.s4,
            gap: size.s5
        },
        itemLabel: {
            fontFamily: "inter_m",
            color: colors.black300,
            fontSize: size.s3
        }
    });
