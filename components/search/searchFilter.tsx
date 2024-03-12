import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import { Ionicons } from "@expo/vector-icons";
interface Props {
    // Define your props here
}

const searchFilter = (props: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

    return (
       <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={[500]}
        style={style.bottomSheet}
        backgroundStyle={{
          backgroundColor:'red',
          
        }}
        handleStyle={{
          backgroundColor:'yellow'
        }}
        handleIndicatorStyle={{
          backgroundColor:'green'
        }}
      >
        <BottomSheetView style={style.bottomSheet}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    );
};

export default searchFilter;

const styles = ({ colors, size }) => StyleSheet.create({
  bottomSheet:{
    backgroundColor:colors.w,
    
    
  }
});
