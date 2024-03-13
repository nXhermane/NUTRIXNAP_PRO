import { StyleSheet, Text, View, FlatList } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import SearchInput from "@comp/search/SearchInput";
import SearchFilter from "@comp/search/searchFilter";
import React, { useState, useReducer } from "react";
import PatientItem from "@comp/tabs/patient/PatientItem";
import DashBoardSection from "@comp/container/DashBoardSection";
import ToggleBtn from "@comp/basic/ToggleBtn";
import SearchPatientFilter, {
    searchFilterReducer,
    searchFilterInitialState
} from "@comp/search/SearchPatientFilter";
import { dataPatientList } from "@/data";
interface Props {
    // Define your props here
}

const searchPatient = (props: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    const [searchValue, setSearchValue] = useState("");
    const [selectedPatient, setSelectedPatient] = useState([]);
    const [searchFilterState, searchFilterDispatch] = useReducer(
        searchFilterReducer,
        searchFilterInitialState
    );
    return (
        <SafeAreaView
            style={{
                backgroundColor: colors.bg.secondary,
                flex: 1
            }}
        >
            <Stack.Screen
                options={{
                    headerShown: false
                }}
            />
            <View style={style.searchInputContainer}>
                <SearchInput
                    value={searchValue}
                    setValue={setSearchValue}
                    onChange={(value: string) => {
                        setSearchValue(value);
                    }}
                    withGoBack
                    placeholder={"Recherchez des patients"}
                />
            </View>
            <View style={style.searchQuickFilterContainer}>
                <SearchPatientFilter
                    state={searchFilterState}
                    dispatch={searchFilterDispatch}
                />
            </View>
            <View style={style.searchResultContainer}>
                <FlatList
                    data={dataPatientList}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        width: size.width,
                        // height: theme.size.height,
                        gap: size.s4
                    }}
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
                            searchItem
                        />
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView>
    );
};

export default searchPatient;

const styles = ({ colors, size }) =>
    StyleSheet.create({
        searchInputContainer: {
            height: size.s100 * 1.2,
            backgroundColor: colors.w,
            width: size.width,
            position: "absolute",
            paddingTop: size.s50
        },
        searchQuickFilterContainer: {
            height: size.s100 * 0.5,
            backgroundColor: colors.w,
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
            marginTop: size.s100 * 0.7
        },
        searchResultContainer: {
            marginTop: size.s100 * 0.1,

            maxHeight: size.height * 0.85
        }
    });
