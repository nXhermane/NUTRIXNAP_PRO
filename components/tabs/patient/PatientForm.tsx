import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Modal,
    KeyboardAvoidingView,
    ScrollView,
    Keyboard,
    PressEvent
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

import { continents, countries, languages,getCountryCode,
    getCountryData,
    getCountryDataList,
    getEmojiFlag } from "countries-list";


import useImagePicker from "@/hooks/useImagePicker";
import useDownloadFile from "@/hooks/useDownloadFile";
import useCopyFile from "@/hooks/useCopyFile";
import { CoreContext } from "@/core/CoreProvider";
import { Asset } from "expo-asset";
import { router } from "expo-router";
import { useAppAlert } from "@pack/AppAlert";

import screenCenter from "./../../../utils/screenCenterPosition";
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

const LOCTIONDATA = [
    { id: 1, label: "En Ligne", value: "onLine" },
    { id: 2, label: "Au Cabinet", value: "offline" }
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
    gender: "M",
    birthday: "",
    occupancy: "",
    consultationLocation: "",
    country: "",
    tel: "",
    email: "",
    profil_img: ""
};
const reducer = (state: typeof initialState, action) => {
    switch (action.type) {
        case "name":
            return { ...state, name: action.payload };
        case "occupancy":
            return { ...state, occupancy: action.payload };
        case "gender":
            return { ...state, gender: action.payload };
        case "country":
            return { ...state, country: action.payload };
        case "email":
            return { ...state, email: action.payload };
        case "tel":
            return { ...state, tel: action.payload };
        case "birthday":
            return { ...state, birthday: action.payload };
        case "consultationLocation":
            return { ...state, consultationLocation: action.payload };
        case "profil_img":
            return { ...state, profil_img: action.payload };

        default:
            throw new Error("Erreur lors de la manipulation du tyoe d'action");
    }
};

interface Props {
    // Define your props here
}

const PatientForm = (props: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    const core = useContext(CoreContext);
    const Alert = useAppAlert();
    const { patientInfo = {}, isUpdate = false } = props;

    const [formInfo, dispatch] = useReducer(reducer, initialState, () =>
        isUpdate ? patientInfo : initialState
    );
    const [displayHeader, setDisplayHeader] = useState<boolean>(true);
    const [copyImage] = useCopyFile();
    const [pickImage, pickUri, pickType] = useImagePicker();

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
                [1000, 100, 0]
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
            modalSize.value = withTiming(0, { duration: 600 });
            position.value = withTiming(
                // screenCenter(size.width, size.height),
                props.animatedData,
                { duration: 600 },
                () => {
                    runOnJS(props.popupIsOpen)(false);
                }
            );
        }
    };


    const onSubmit = (e: PressEvent) => {
        if (isUpdate) {
            Alert.confirm(
                "Voulez-vous vraiment mettre à jour ce patient ?"
            ).then((check: boolean) => {
                if (check) {
                    core.patientS.updatePatient(formInfo).then(patient => {
                        let existType = formInfo.profil_img.split(".");
                        existType = existType[existType.length - 1];
                        existType =
                            pickType.trim() === "" ? existType : pickType;
                        copyImage(
                            formInfo.profil_img,
                            "patients_" +
                                formInfo.name.split(" ").join("").toLowerCase(),
                            "profil_img." + existType
                        ).then(({ uri: copyUri }) => {
                            core.patientS
                                .updatePatient({
                                    id: patient.id,
                                    profil_img: copyUri
                                })
                                .then(() => {
                                    animation(0);
                                });
                        });
                    });
                }
            });
        } else {
            core.patientS.createPatient(formInfo).then(patient => {
                copyImage(
                    formInfo.profil_img,
                    "patients_" +
                        formInfo.name.split(" ").join("").toLowerCase(),
                    "profil_img." + pickType
                ).then(({ uri: copyUri }) => {
                    core.patientS
                        .updatePatient({ id: patient.id, profil_img: copyUri })
                        .then(() => {
                            animation(0);
                        });
                });
            });
        }
    };

    React.useEffect(() => {
        animation(1);
    });
    Keyboard.addListener("keyboardDidShow", () => {
        setDisplayHeader(false);
    });
    Keyboard.addListener("keyboardDidHide", () => {
        setDisplayHeader(true);
    });
    return (
        <Modal
            transparent
            onRequestClose={() => {
                animation(0);
            }}
        >
            <Animated.View style={[modalAnimatedStyle]}>
                <View style={style.loginFormContainer}>
                    <View style={style.submitBtn}>
                        <Pressable
                            style={{
                                padding: size.s3,
                                borderColor: colors.blue200,
                                borderWidth: size.s1 / 8,
                                borderRadius: 500
                            }}

                            
                            onPress={onSubmit}
                        >
                            <Ionicons
                                name="save"
                                size={size.s5}
                                color={colors.blue100}
                            />
                        </Pressable>
                    </View>
                    {displayHeader && (
                        <View style={style.header}>
                            <Text style={style.formTitle}>{props.title}</Text>
                        </View>
                    )}
                    <View style={style.formContainer}>
                        {displayHeader && (
                            <View style={style.profilImgContainer}>
                                <Avatars
                                    image={{ uri: formInfo.profil_img }}
                                    letter={formInfo.name?.slice(0, 1) || "P"}
                                    bg={colors.yellow100}
                                    color={colors.yellow300}
                                    onLongPress={() =>
                                        pickImage().then(({ uri, type }) => {
                                            dispatch({
                                                type: "profil_img",
                                                payload: uri
                                            });
                                        })
                                    }
                                    st={{
                                        alignSelf: "center",
                                        borderWidth:
                                            formInfo.image === "" ? size.s1 : 0,
                                        borderColor: colors.yellow200
                                    }}
                                    s={size.s100 * 1.1}
                                />
                            </View>
                        )}

                        <View style={style.formInputContainer}>
                            <TextInput
                                label={"Nom Complet"}
                                isRequire
                                value={formInfo.name}
                                onChangeText={(value: string) =>
                                    dispatch({
                                        type: "name",
                                        payload: value
                                    })
                                }
                                placeholder={"Ex: John Smith"}
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
                                isRequire
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
                                isRequire
                            />
                            <SelectionInput
                                label={"Pays de résidence"}
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
                                isRequire
                            />
                            <TextInput
                                label={"Occupation"}
                                isRequire
                                value={formInfo.occupancy}
                                onChangeText={(value: string) =>
                                    dispatch({
                                        type: "occupancy",
                                        payload: value
                                    })
                                }
                                placeholder={"Ex: Ingenieur"}
                            />
                            <SelectionInput
                                label={"Lieu de Consultation"}
                                unique
                                data={LOCTIONDATA}
                                custormItem={CountryItem}
                                value={formInfo.consultationLocation}
                                selectedId={1}
                                onChange={(ids: number, data: any) => {
                                    dispatch({
                                        type: "consultationLocation",
                                        payload: data.label
                                    });
                                }}
                                isRequire
                            />
                            <TelInput
                                label={"Numéro de portable"}
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
                            <TextInput
                                value={formInfo.email}
                                onChangeText={(val: string) => {

                                    dispatch({ type: "email", payload: val });

                                }}
                                label={"Adresse e-mail"}
                                placeholder={"Ex: johndoe@gmail.com"}
                            />
                        </View>
                    </View>
                </View>
            </Animated.View>
        </Modal>
    );
};

export default PatientForm;
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
            backgroundColor: colors.w,
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
        },
        submitBtn: {
            position: "absolute",
            right: -size.s2,
            top: -size.s2,
            backgroundColor: colors.blue300,

            borderRadius: 500
        }
    });
