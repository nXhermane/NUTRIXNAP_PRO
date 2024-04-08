import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Modal,
    KeyboardAvoidingView,
    ScrollView,
    Keyboard,
    PressEvent,
    findNodeHandle,
    UIManager
} from "react-native";
import { ThemeInterface, useTheme, useThemeStyles } from "@/theme";
import { PatientEntity } from "@/core/interfaces";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useReducer } from "react";
import Avatars from "@comp/basic/Avatars";
import Button from "@comp/basic/Button";
import TextInput from "@comp/basic/TextInput";
import TelInput from "@comp/basic/TelInput";
import DateInput from "@comp/basic/DateInput";
import SelectionInput from "@comp/basic/SelectionInput";
import { useFormik } from "formik";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    interpolate,
    withTiming,
    runOnJS
} from "react-native-reanimated";

import {
    continents,
    countries,
    languages,
    getCountryCode,
    getCountryData,
    getCountryDataList,
    getEmojiFlag
} from "countries-list";

import useImagePicker from "@/hooks/useImagePicker";
import useDownloadFile from "@/hooks/useDownloadFile";
import useCopyFile from "@/hooks/useCopyFile";
import useCore from "@/hooks/useCore";
import { Asset } from "expo-asset";
import { router } from "expo-router";
import { useAppAlert } from "@pack/AppAlert";
import { KeyboardAwareScrollView } from "@pack/KeyboardAware";
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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

const initialState: PatientEntity = {
    name: "",
    gender: "M",
    birthday: "",
    occupancy: "",
    consultationLocation: LOCTIONDATA[0].label,
    country: "FR",
    tel: "",
    email: "",
    profil_img: ""
};

interface Props {
    patientInfo?: PatientEntity;
    isUpdate?: boolean;
}

const PatientForm = (props: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    const core = useCore();
    const Alert = useAppAlert();
    const { patientInfo = {}, isUpdate = false } = props;

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
            borderRadius: interpolate(modalSize.value, [0, 1], [1000, 0]),
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
                props.animatedData,
                { duration: 600 },
                () => {
                    runOnJS(props.popupIsOpen)(false);
                }
            );
        }
    };

    const onSubmit = values => {
        if (isUpdate) {
            Alert.confirm(
                "Voulez-vous vraiment mettre à jour ce patient ?"
            ).then((check: boolean) => {
                if (check) {
                    core.patientS.updatePatient(values).then(patient => {
                        let existType = values.profil_img.split(".");
                        existType = existType[existType.length - 1];
                        existType =
                            pickType.trim() === "" ? existType : pickType;
                        if (pickUri != "") {
                            copyImage(
                                values.profil_img,
                                "patients_" + patient.unique_id,
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
                        } else {
                            animation(0);
                        }
                    });
                }
            });
        } else {
            core.patientS.createPatient(values).then(patient => {
                if (pickUri != "") {
                    copyImage(
                        values.profil_img,
                        "patients_" + patient.unique_id,
                        "profil_img." + pickType
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
                } else animation(0);
            });
        }
    };
    const formik = useFormik({
        initialValues: isUpdate ? patientInfo : initialState,
        onSubmit
    });
    const {
        values,
        touched,
        handleSubmit,
        handleChange,
        errors,
        isSubmitting,
        isValid
    } = formik;
    React.useEffect(() => {
        animation(1);
    });
    Keyboard.addListener("keyboardDidShow", () => {
        // setDisplayHeader(false);
    });
    Keyboard.addListener("keyboardDidHide", () => {
        // setDisplayHeader(true);
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
                            onPress={handleSubmit}
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
                                    image={{ uri: values.profil_img }}
                                    letter={values.name?.slice(0, 1) || "P"}
                                    bg={colors.yellow100}
                                    color={colors.yellow300}
                                    onLongPress={() => {
                                        pickImage().then(([{ uri, type }]) => {
                                            handleChange("profil_img")(uri);
                                        });
                                    }}
                                    st={{
                                        alignSelf: "center",
                                        borderWidth:
                                            values.image === "" ? size.s1 : 0,
                                        borderColor: colors.yellow200
                                    }}
                                    s={size.s100}
                                />
                            </View>
                        )}

                        <KeyboardAwareScrollView>
                            <View style={style.formInputContainer}>
                                <TextInput
                                    label={"Nom Complet"}
                                    isRequire
                                    value={values.name}
                                    onChangeText={(value: string) => {
                                        handleChange("name")(value);
                                    }}
                                    placeholder={"Ex: John Smith"}
                                />
                                <DateInput
                                    label={"Date de naissance"}
                                    value={values.birthday}
                                    onChange={(date: string) => {
                                        handleChange("birthday")(date);
                                    }}
                                    placeholder={"YYYY/MM/DD"}
                                    isRequire
                                />
                                <SelectionInput
                                    label={"Sexe"}
                                    unique
                                    data={SEXEDATA}
                                    value={
                                        SEXEDATA.find(
                                            item => item.code === values.gender
                                        )?.label
                                    }
                                    selectedId={
                                        SEXEDATA.find(
                                            item => item.code === values.gender
                                        )?.id
                                    }
                                    onChange={(ids: number, data: any) => {
                                        handleChange("gender")(data.code);
                                    }}
                                    isRequire
                                />
                                <SelectionInput
                                    label={"Pays de résidence"}
                                    unique
                                    data={COUNTRYDATA}
                                    custormItem={CountryItem}
                                    value={
                                        getEmojiFlag(values.country) +
                                        "  " +
                                        getCountryData(values.country)?.name
                                    }
                                    selectedId={COUNTRYDATA.findIndex(
                                        item => item.code === values.country
                                    )}
                                    onChange={(ids: number, data: any) => {
                                        handleChange("country")(data.code);
                                    }}
                                    withSearch
                                    isRequire
                                />
                                <TextInput
                                    label={"Occupation"}
                                    isRequire
                                    value={values.occupancy}
                                    onChangeText={(value: string) => {
                                        handleChange("occupancy")(value);
                                    }}
                                    placeholder={"Ex: Ingenieur"}
                                />
                                <SelectionInput
                                    label={"Lieu de Consultation"}
                                    unique
                                    data={LOCTIONDATA}
                                    value={values.consultationLocation}
                                    selectedId={1}
                                    onChange={(ids: number, data: any) => {
                                        handleChange("consultationLocation")(
                                            data.label
                                        );
                                    }}
                                    isRequire
                                />
                                <TelInput
                                    label={"Numéro de portable"}
                                    value={values.tel}
                                    tel={
                                        "+" +
                                        getCountryData(values.country)?.phone
                                    }
                                    onChange={(value: string) => {
                                        handleChange("tel")(value);
                                    }}
                                />
                                <TextInput
                                    value={values.email}
                                    onChangeText={(value: string) => {
                                        handleChange("email")(value);
                                    }}
                                    label={"Adresse e-mail"}
                                    placeholder={"Ex: johndoe@gmail.com"}
                                />
                            </View>
                        </KeyboardAwareScrollView>
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
            maxHeight: size.height - size.s6,
            backgroundColor: colors.w,
            borderRadius: size.s8,
            padding: size.s5
        },
        header: {
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: size.s3
        },
        formTitle: {
            color: colors.black300,
            fontFamily: "inter_b",
            fontSize: size.s5
        },
        formContainer: {
            width: "100%",
            height: "100%"
        },
        profilImgContainer: {
            width: "100%",
            height: size.s100 * 1.2,
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
