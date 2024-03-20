import { StyleSheet, Text, View } from "react-native";
import React, { useReducer, useState, useEffect } from "react";

import { useThemeStyles, useTheme, ThemeInterface } from "@/theme";
import PatientSection from "@comp/container/PatientSection";
import TextInput from "@comp/basic/TextInput";
import Avatars from "@comp/basic/Avatars";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import Countries from "@/data/worldcountry.json"
interface Props {
    // Define your props here
}
const initialeState = {
    name: "",
    sexe: { label: "", value: "", id: 1 },
    birthDay: "",
    occupancy: "",
    consultationLocation: { label: "", value: "", id: 1 },
    country: { label: "", value: "", id: 1 },
    postalCode: "",
    tel: "",
    email: "",
    image: { uri: "" }
};
const reducer = (state: typeof initialeState, action) => {
    switch (action.type) {
        case "name":
            return { ...state, name: action.payload };
        case "occupancy":
            return { ...state, occupancy: action.payload };
        case "sexe":
            return { ...state, sexe: action.payload };
        case "country":
            return { ...state, country: action.payload };
        case "email":
            return { ...state, email: action.payload };
        case "tel":
            return { ...state, tel: action.payload };
        case "birthday":
            return { ...state, birthDay: action.payload };
        case "consultationLocation":
            return { ...state, consultationLocation: action.payload };
        case "image":
            return { ...state, image: action.payload };
        case "postalCode":
            return { ...state, postalCode: action.payload };
        default:
            throw new Error("Erreur lors de la manipulation du tyoe d'action");
    }
};

const PatientForm = (props: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    const [state, dispatch] = useReducer(reducer, initialeState);
    const [image, setImage] = useState({ letter: state.name.slice(0, 1) });

    return (
        <View style={style.container}>
            <PatientSection
                body={
                    "Enregistrez votre patient et continuez la prise de rendez-vous"
                }
                centerBody
                contentContainerStyle={{
                    paddingHorizontal: size.s2,
                    paddingTop: size.s5,
                    gap: size.s4
                }}
            >
                <Avatars
                    image={state.image}
                    letter={state.name.slice(0, 1) || "P"}
                    st={{
                        alignSelf: "center",
                        borderWidth: size.s1,
                        borderColor: colors.yellow200
                    }}
                    bg={colors.yellow100}
                    color={colors.yellow300}
                    onLongPress={async () => {
                        const doc = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.All,
                            allowsEditing: true,
                            aspect: [4, 4],
                            quality: 1
                        });

                        dispatch({
                            type: "image",
                            payload: { uri: doc.assets[0].uri }
                        });
                    }}
                />

                <TextInput
                    value={state.name}
                    onChangeText={(val: string) => {
                        dispatch({ type: "name", payload: val });
                    }}
                    label={"Nom Complet"}
                    placeholder={"Ex: John Doe"}
                    isRequire
                />
                <TextInput
                    value={state.birthDay}
                    isSelection
                    label={"Date de naissance"}
                    placeholder={"DD/MM/YYYY"}
                    onChangePicker={(value: string) => {
                        dispatch({ type: "birthday", payload: value });
                    }}
                    isPicker
                    isRequire
                />

                <TextInput
                    value={state.sexe.label}
                    isSelection
                    label={"Sexe"}
                    placeholder={"Masculin"}
                    data={[
                        { id: 1, label: "Masculin", value: "M" },
                        { id: 2, label: "Féminin", value: "F" },
                        { id: 3, label: "Autre", value: "A" }
                    ]}
                    onChangeSelection={(valueId: number, item) => {
                        dispatch({
                            type: "sexe",
                            payload: item
                        });
                    }}
                    selectedId={state.sexe.id}
                    isRequire
                />
                <TextInput
                    value={state.country.label}
                    isSelection
                    label={"Pays de résidence"}
                    placeholder={"Masculin"}
                    data={Countries}
                    onChangeSelection={(valueId: number, item) => {
                        dispatch({
                            type: "country",
                            payload: item
                        });
                    }}
                    selectedId={state.country.id}
                    isRequire
                />

                <TextInput
                    value={state.consultationLocation.label}
                    isSelection
                    label={"Lieu de consultation"}
                    placeholder={""}
                    data={[
                        { id: 1, label: "En Ligne", value: "onLine" },
                        { id: 2, label: "Au Cabinet", value: "offline" }
                    ]}
                    onChangeSelection={(valueId: number, item) => {
                        dispatch({
                            type: "consultationLocation",
                            payload: item
                        });
                    }}
                    selectedId={state.country.id}
                    isRequire
                />
                <TextInput
                    value={state.occupancy}
                    onChangeText={(val: string) => {
                        dispatch({ type: "occupancy", payload: val });
                    }}
                    label={"Occupation"}
                    placeholder={"Ex: Ingenieur infomatique"}
                />
                <TextInput
                    value={state.postalCode}
                    onChangeText={(val: string) => {
                        dispatch({ type: "postalCode", payload: val });
                    }}
                    label={"Code Postal"}
                    placeholder={"Ex: 9056"}
                />
                <TextInput
                    value={state.tel}
                    onChangeText={(val: string) => {
                        dispatch({ type: "tel", payload: val });
                    }}
                    label={"Numéro de portable"}
                    placeholder={"Ex: +123456769"}
                />
                <TextInput
                    value={state.email}
                    onChangeText={(val: string) => {
                        dispatch({ type: "email", payload: val });
                    }}
                    label={"Adresse e-mail"}
                    placeholder={"Ex: johndoe@gmail.com"}
                />
            </PatientSection>
        </View>
    );
};

export default PatientForm;

const styles = ({ colors, size }: ThemeInterface) => StyleSheet.create({});
