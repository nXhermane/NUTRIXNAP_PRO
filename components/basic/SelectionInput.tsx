import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import { ThemeInterface, useTheme, useThemeStyles } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import Fuse from "fuse.js";
import React, { useState, useRef, useMemo, useCallback } from "react";
import TextInput from "./TextInput";
import GroupSelection from "./GroupSelection";
import SearchInput from "./../search/SearchInput";
import BottomSheet, {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
    onLongPress?:()=>void
}
const SelectionInput = (props: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    const {
        label = "Pays",
        isRequire = false,
        data = [],
        withSearch = false,
        onChange = () => {},
        unique = false,
        custormItem,
        searchFusejsKeys,
        value = "",
        selectedId,
        onLongPress
    } = props;
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectionData, setSelectionData] = React.useState<any[]>(data);
    const [searchResult, setSearchResult] = React.useState<any[]>([]);
    const [displayPopup, setDisplayPopup] = useState<boolean>(false);
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

    const bottomSheetRef = React.useRef<BottomSheet>(null);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => ["25%", "35%", "50%", "75%", "90%"], []);
    const index =
        data.length <= 5
            ? 0
            : data.length <= 7
            ? 1
            : data.length <= 10
            ? 2
            : data.length <= 15
            ? 3
            : 4;
    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

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
                onPress={() => {
                    setDisplayPopup((prev: boolean) => !prev);
                    handlePresentModalPress();
                }}
                onLongPress={onLongPress&&onLongPress}
                {...props}
            />
            {displayPopup && (
                <Modal
                    transparent
                    onRequestClose={() => {
                        setDisplayPopup((prev: boolean) => false);
                    }}
                    animationType={"slide"}
                    onShow={handlePresentModalPress}
                    statusBarTranslucent
                >
                    <Pressable
                        style={style.modalContainer}
                        onPress={() =>
                            setDisplayPopup((prev: boolean) => false)
                        }
                    >
                        <BottomSheetModalProvider>
                            <BottomSheetModal
                                ref={bottomSheetModalRef}
                                index={index}
                                snapPoints={snapPoints}
                                backgroundStyle={{
                                    backgroundColor: colors.bg.primary
                                }}
                                handleIndicatorStyle={{
                                    backgroundColor: colors.gray300
                                }}
                                onDismiss={() =>
                                    setDisplayPopup((prev: boolean) => false)
                                }
                            >
                                <GroupSelection
                                    data={
                                        searchValue.trim() != ""
                                            ? searchResult
                                            : data
                                    }
                                    unique={unique}
                                    selectedId={selectedId}
                                    onChange={(ids, data) => {
                                        onChange(ids, data);
                                    }}
                                    onPressItem={() => {
                                        setDisplayPopup(false);
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
                                                    placeholder={
                                                        "Rechercher..."
                                                    }
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
                            </BottomSheetModal>
                        </BottomSheetModalProvider>
                    </Pressable>
                </Modal>
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
        },
        bottomSheetStyle: {},
        modalContainer: {
            backgroundColor: colors.black + 40,
            height: size.height + size.s100,
            width: size.width
        }
    });
