import React, { useState, useRef, useMemo, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TextInput
} from "react-native";
import { ThemeInterface, useTheme, useThemeStyles } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import Fuse from "fuse.js";
import GroupSelection from "./GroupSelection";
import SearchInput from "./../search/SearchInput";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider
} from "@gorhom/bottom-sheet";

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
  onLongPress?: () => void;
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

  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

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

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    setDisplayPopup(false);
    bottomSheetModalRef.current?.dismiss();
  }, []);

  React.useEffect(() => {
    if (searchValue.trim() != "") {
      const result = fuse.search(searchValue);
      setSearchResult(result.map(item => item.item));
    } else {
      setSearchResult([]);
    }
  }, [searchValue]);

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
        onLongPress={onLongPress}
      />
      {displayPopup && (
        <Modal
          transparent
          onRequestClose={handleCloseModalPress}
          animationType={"slide"}
          onShow={handlePresentModalPress}
          statusBarTranslucent
        >
          <Pressable
            style={style.modalContainer}
            onPress={handleCloseModalPress}
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
                onDismiss={handleCloseModalPress}
              >
                <GroupSelection
                  data={
                    searchValue.trim() != ""
                      ? searchResult
                      : selectionData
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
                            setSearchValue(value)
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
              </BottomSheetModal>
            </BottomSheetModalProvider>
          </Pressable>
        </Modal>
      )
