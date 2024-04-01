import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
    FlatList
} from "react-native";
import { ThemeInterface, useTheme, useThemeStyles } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import Fuse from "fuse.js";
import React, { useState } from "react";

import GroupSelection from "./GroupSelection";
import SearchInput from "./../search/SearchInput";

type Option = { label: string; id: string | number };
interface Props {
    label: string;
    isRequire?: boolean;
    data: Option[];
    unique?: boolean;
    value: string | JSX.Element;
    onChange: (
        ids: number | string | number[] | string[],
        data: Option | Option[]
    ) => void;
    withSearch?: boolean;
    custormItem?: (
        label: string,
        isSelected: boolean,
        onPress: () => void,
        props?: any
    ) => JSX.Element;
    searchFusejsKeys: string[];
    selectedId: number | string | number[] | string[];
}
const SelectionInput = (props: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    const {
        label = "Pays",
        isRequire = false,
        data = testData,
        withSearch = false,
        onChange = () => {},
        unique = false,
        custormItem,
        searchFusejsKeys,
        value = "",
        selectedId
    } = props;
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectionData, setSelectionData] = React.useState<any[]>(data);
    const [searchResult, setSearchResult] = React.useState<any[]>([]);
    const [displayPopup, setDisplayPopup] = useState<boolean>(true);
    const config = {
        keys: searchFusejsKeys || ["label"]
    };
    const fuse = new Fuse(selectionData, config);
    React.useEffect(() => {
        if (searchValue.trim() != "") {
            const result = fuse.search(searchValue);
            setSearchResult(result.map(item => item.item));
        }
    }, [searchValue]);
    React.useEffect(() => {
        setTimeout(() => {
            setDisplayPopup(false);
        }, 1);
    }, [data]);

    return (
        <View style={style.selectionInputContainer}>
            <View style={style.labelContainer}>
                {label && <Text style={style.label}>{label}</Text>}
                {isRequire && (
                    <View style={style.isRequireIconContainer}>
                        <Text style={style.isRequireIcon}>*</Text>
                    </View>
                )}
            </View>
            <Pressable
                style={style.inputContainer}
                onPress={() => setDisplayPopup((prev: boolean) => !prev)}
            >
                <TextInput
                    style={style.textInput}
                    value={value}
                    editable={false}
                />
                <Pressable
                    style={style.rightIconContainer}
                    onPress={() => setDisplayPopup((prev: boolean) => !prev)}
                >
                    <Ionicons
                        name={displayPopup ? "chevron-up" : "chevron-down"}
                        color={colors.black200}
                    />
                </Pressable>
            </Pressable>
            {displayPopup && (
                <View style={style.floatingSelectList}>
                    <GroupSelection
                        data={searchValue.trim() != "" ? searchResult : data}
                        unique={unique}
                        selectedId={selectedId}
                        onChange={(ids, data) => {
                            onChange(ids, data);
                        }}
                        custormItem={custormItem}
                        optionLabel={
                            <View style={style.searchContainer}>
                                {withSearch && (
                                    <SearchInput
                                        value={searchValue}
                                        onChange={(value: string) =>
                                            setSearchValue()
                                        }
                                        placeholder={"Rechercher..."}
                                        setValue={setSearchValue}
                                        st={{
                                            height: size.s50
                                        }}
                                        inputSt={{
                                            fontSize: size.s3
                                        }}
                                    />
                                )}
                            </View>
                        }
                    />
                </View>
            )}
        </View>
    );
};

export default SelectionInput;

const styles = ({ colors, size }: ThemeInterface) =>
    StyleSheet.create({
        selectionInputContainer: {
            width: "100%",
            gap: size.s2,
            paddingHorizontal: size.s2
        },
        labelContainer: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center"
        },
        label: {
            fontFamily: "inter_sb",
            fontSize: size.s3 * 1.2,
            color: colors.gray300
        },
        isRequireIconContainer: {
            marginLeft: size.s1 / 2
        },
        isRequireIcon: {
            fontFamily: "inter_sb",
            fontSize: size.s4,
            color: colors.green300,
            textAlignVertical: "top"
        },
        textInput: {
            flex: 10,
            width: "100%",
            height: "100%",
            fontFamily: "inter_r",
            color: colors.black200,
            fontSize: size.s3 * 1.1
        },
        rightIconContainer: {
            position: "absolute",
            right: size.s3,
            alignSelf: "center"
        },
        inputContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            borderColor: colors.gray200,
            borderWidth: size.s1 / 10,
            borderRadius: size.s100,
            height: size.s50 * 0.8,
            paddingHorizontal: size.s4,
            backgroundColor: colors.bg.secondary
        },
        floatingSelectList: {
             position: "absolute",
            top: "110%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            // height: size.s100,
            maxHeight: size.height / 2,
            backgroundColor: colors.w,
            zIndex: 20000,
            borderRadius: size.s2,
            elevation: 4,
            marginHorizontal: size.s2,
            borderWidth: size.s1 / 10,
            borderColor: colors.gray200
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
        itemFlag: {}
    });
