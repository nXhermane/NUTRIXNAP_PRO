import { StyleSheet, Text, View, FlatList } from "react-native";

import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import { router, Link } from "expo-router";
import PatientSection from "@comp/container/PatientSection";
import FoodItem from "@comp/tabs/foods/FoodItem";
import SearchInput from "@comp/search/SearchInput";
import SearchPatientFilter, {
    searchFilterReducer,
    searchFilterInitialState
} from "@comp/search/SearchPatientFilter";
import { dataFoodList } from "@/data";
import React, { useState, useReducer } from "react";
interface Props {
    // Define your props here
}

const FoodsList = (props: Props) => {
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
            title={"Aliments"}
            body={
                "Recherchez, consultez et ajoutez de nouveaux aliments au système"
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
                router.navigate("forms/addFoodForm");
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
                            placeholder={"Recherchez des aliments"}
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
                    data={dataFoodList}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <FoodItem
                            name={item.name}
                            dbName={item.dbName}
                            data={item.data}
                            id={item.id}
                        />
                    )}
                    keyExtractor={(item, index) => item.name + index}
                />
            </View>
        </PatientSection>
    );
};

export default FoodsList;

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
