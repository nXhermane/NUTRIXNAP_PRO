import { StyleSheet, Text, View, FlatList } from "react-native";

import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import { router, Link } from "expo-router";
import PatientSection from "@comp/container/PatientSection";
import PatientItem from "@comp/tabs/patient/PatientItem";
import SearchInput from "@comp/search/SearchInput";
import SearchPatientFilter, {
    searchFilterReducer,
    searchFilterInitialState
} from "@comp/search/SearchPatientFilter";
import { dataPatientList } from "@/data";
import React, { useState, useReducer } from "react";
interface Props {
    // Define your props here
}

const PatientsList = (props: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    const [selectedPatient, setSelectedPatient] = useState([]);
    const [searchIsActive, setSearchIsActive] = useState<boolean>(false);
    const [filterIsActive, setFilterIsActive] = useState<boolean>(false);
    const [searchFilterState, searchFilterDispatch] = useReducer(
        searchFilterReducer,
        searchFilterInitialState
    );
    const [searchValue, setSearchValue] = useState<string>("");
    return (
        <PatientSection
            title={"Liste des Patients"}
            body={
                "Recherchez des patient par nom,occupation,email,numéro de contact ou l'#id ou Filtrez les patients"
            }
            withRight
            withAddBtn
            withFilter
            withSearch
            header
            onPressFilter={() => {
                setFilterIsActive(prev => !prev);
            }}
            onPressAddBtn={() => {
                alert("add Patient");
            }}
            onPressSearch={() => {
                setSearchIsActive(prev => !prev);
            }}
        >
            <View style={style.container}>
                {searchIsActive && (
                    <View style={style.searchInputContainer}>
                        <SearchInput
                            value={searchValue}
                            setValue={setSearchValue}
                            placeholder={"Recherchez des patients"}
                        />
                    </View>
                )}
                {filterIsActive && (
                    <View style={style.searchFilterContainer}>
                        <SearchPatientFilter
                            state={searchFilterState}
                            dispatch={searchFilterDispatch}
                        />
                    </View>
                )}
                <FlatList
                    data={dataPatientList}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <PatientItem
                            statusCode={item.statusCode}
                            name={item.name}
                            occupation={item.occupation}
                            id={item.id}
                            lastActivity={item.lastActivity}
                            index={index}
                            setSelected={setSelectedPatient}
                            selected={selectedPatient}
                            sexe={item.sexe}
                        />
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        </PatientSection>
    );
};

export default PatientsList;

const styles = ({ colors, size }) =>
    StyleSheet.create({
        container: {
            marginTop: size.s1,
            maxHeight: size.height * 0.65
        },
        searchInputContainer: {
            paddingHorizontal: size.s2
        },
        searchFilterContainer: {
            paddingVertical: size.s2
        }
    });
