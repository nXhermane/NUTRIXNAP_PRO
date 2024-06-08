import React, { useState, useEffect, memo } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Alert, FlatList, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeInterface, useTheme, useThemeStyles } from '@/theme';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
export type Option = Required<Omit<SelectionItemProps, 'selectedId' | 'setSelectedId' | 'custormItem'>>;

interface Props {
   unique: boolean;
   data: Option[];
   selectedId: number;
   onChange?: (value: number | number[], data: Option | Option[]) => void;
   optionLabel: JSX.Element;
   custormItem?: (label: string, isSelected: boolean, onPress: () => void, props?: any) => JSX.Element;
   st?: ViewStyle;
   onPressItem?: () => void;
}

const GroupSelection = ({ unique, data, selectedId, onChange, optionLabel, custormItem, st = {}, onPressItem }: Props) => {
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
      <View style={[style.groupSelectionContainer, st]}>
         {optionLabel && (
            <View style={style.groupSelectionLabel}>
               {typeof optionLabel === 'string' ? <Text style={style.groupLabel}>{optionLabel}</Text> : optionLabel}
            </View>
         )}
         <FlatList
            data={data}
            renderItem={({ item, index }) => {
               return (
                  <SelectionItem
                     {...item}
                     selectedIds={selectedIds}
                     setSelectedIds={setSelectedIds}
                     custormItem={custormItem}
                     onPressItem={() => {
                        if (onPressItem && unique) {
                           setTimeout(() => {
                              onPressItem();
                           }, 100);
                        }
                     }}
                  />
               );
            }}
            keyExtractor={(item) => item.id.toString()}
         />
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
   custormItem?: (label: string, isSelected: boolean, onPress: () => void, props?: any) => JSX.Element;
   onPressItem?: () => void;
};

const SelectionItem = memo((props: SelectionItemProps) => {
   const { colors, size } = useTheme();
   const style = useThemeStyles(styles);
   const { label, id, selectedIds, setSelectedIds, custormItem, onPressItem } = props;
   const isSelected = typeof selectedIds === 'object' ? selectedIds.includes(id) : selectedIds === id;
   const onPress = () => {
      setSelectedIds((prev: number | number[]) => {
         if (typeof prev === 'object') {
            return isSelected ? prev.filter((item: number) => item !== id) : [...prev, id];
         } else {
            return id;
         }
      });

      onPressItem && onPressItem();
   };
   if (custormItem) {
      return custormItem(label, isSelected, onPress, { ...props });
   }
   return (
      <Pressable
         style={style.selectionItemContainer(isSelected)}
         onPress={() => {
            onPress();
         }}
      >
         <View style={style.selectionLabelContainer}>
            <Text style={style.label}>{label}</Text>
         </View>
         {isSelected && <Ionicons name={'checkmark-outline'} color={colors.green200} size={size.s5} />}
      </Pressable>
   );
});

const styles = ({ colors, size }: ThemeInterface) =>
   StyleSheet.create({
      groupSelectionContainer: {
         backgroundColor: colors.w,
         width: '100%',
         paddingVertical: size.s5,
         paddingHorizontal: size.s3,
         borderRadius: size.s2,
         //maxHeight: size.s100 * 5
      },
      selectionItemContainer: (active: boolean) => ({
         backgroundColor: active ? colors.bg.secondary : colors.w,
         width: '100%',
         flexDirection: 'row',
         alignItems: 'center',

         height: size.s50,
         borderBottomWidth: size.s1 / 18,
         borderBottomColor: colors.gray100,
         paddingHorizontal: size.s4,
         gap: size.s5,

         justifyContent: 'space-between',
      }),
      selectionLabelContainer: {},
      label: {
         fontFamily: 'inter_m',
         color: colors.black300,
         fontSize: size.s3,
      },
      groupLabel: {
         fontFamily: 'inter_sb',
         fontSize: size.s4,
         color: colors.black300,
         textAlign: 'center',
      },
      groupSelectionLabel: {
         marginBottom: size.s2,
      },
      countryItem: {
         width: '100%',
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'flex-start',
         height: size.s50,
         borderBottomWidth: size.s1 / 18,
         borderBottomColor: colors.gray100,
         paddingHorizontal: size.s4,
         gap: size.s5,
      },
   });
