import React, { useState, useEffect, memo } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeInterface, useTheme, useThemeStyles } from "@/theme";

export type Option = Required<Omit<SelectionItemProps, "selectedId" | "setSelectedId">>;

interface Props {
  unique: boolean;
  data: Option[];
  selectedId: number;
  onChange?: (value: number | number[]) => void;
  optionLabel: JSX.Element;
}

const GroupSelection = ({ unique, data, selectedId, onChange, optionLabel }: Props) => {
  const { colors, size } = useTheme();
  const style = useThemeStyles(styles);
  const [selectedIds, setSelectedIds] = useState<number | number[]>(unique ? selectedId : [selectedId]);

  useEffect(() => {
    const selectedData = unique
      ? data.find((item: Option) => item.id === selectedIds)
      : data.filter((item: Option) => selectedIds.includes(item.id));
    onChange && onChange(selectedIds, selectedData);
  }, [selectedIds]);

  return (
    <View style={style.groupSelectionContainer}>
      {optionLabel && (
        <View style={style.groupSelectionLabel}>
          <Text style={style.groupLabel}>{optionLabel}</Text>
        </View>
      )}
      <ScrollView>
        {data.map((item) => (
          <SelectionItem
            key={item.id}
            {...item}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default memo(GroupSelection);

export type SelectionItemProps = {
  label: string;
  id: number;
  value: string;
  selectedIds: number | number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number | number[]>>;
};

const SelectionItem = memo(({
  label,
  id,
  selectedIds,
  setSelectedIds,
}: SelectionItemProps) => {
  const { colors, size } = useTheme();
  const style = useThemeStyles(styles);
  const isSelected = typeof selectedIds === "object"
    ? selectedIds.includes(id)
    : selectedIds === id;

  return (
    <Pressable
      style={style.selectionItemContainer(isSelected)}
      onPress={() => {
        setSelectedIds((prev: number | number[]) => {
          if (typeof prev === "object") {
            return isSelected
              ? prev.filter((item: number) => item !== id)
              : [...prev, id];
          } else {
            return  id;
          }
        });
      }}
    >
      <View style={style.selectionLabelContainer}>
        <Text style={style.label}>{label}</Text>
        {isSelected && (
          <Ionicons
            name={"checkmark-outline"}
            color={colors.green200}
            size={size.s5}
          />
        )}
      </View>
    </Pressable>
  );
});

const styles = ({ colors, size }: ThemeInterface) =>
  StyleSheet.create({
    groupSelectionContainer: {
      backgroundColor: colors.w,
      width: "85%",
      paddingVertical: size.s5,
      paddingHorizontal: size.s3,
      borderRadius: size.s2,
      maxHeight: size.s100 * 5,
    },
    selectionItemContainer: (active: boolean) => ({
      width: "100%",
      backgroundColor: active ? colors.bg.secondary : colors.w,
      paddingVertical: size.s3,
      borderTopColor: colors.gray200,
      borderBottomColor: colors.gray200,
      borderTopWidth: size.s1 / 10,
      borderBottomWidth: size.s1 / 10,
    }),
    selectionLabelContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: size.s4,
    },
    label: {
      fontFamily: "inter_m",
      fontSize: size.s4,
      color: colors.black300,
    },
    groupLabel: {
      fontFamily: "inter_sb",
      fontSize: size.s4,
      color: colors.black300,
      textAlign: "center",
    },
    groupSelectionLabel: {
      marginBottom: size.s4,
    },
  });