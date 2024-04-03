import { StyleSheet, Text, View } from "react-native";
import { ThemeInterface, useTheme, useThemeStyles } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import Fuse from "fuse.js";
import React, { useState } from "react";
import TextInput from "./TextInput";
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
            <TextInput
                value={value}
                isRequire={isRequire}
                label={label}
                editable={false}
                st={{
                    paddingHorizontal: 0
                }}
                rightIcon={(color, size) => (
                    <Ionicons
                        name={displayPopup ? "chevron-up" : "chevron-down"}
                        color={color}
                    />
                )}
                onPress={() => setDisplayPopup((prev: boolean) => !prev)}
            />
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
        }
    });
