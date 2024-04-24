import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import SearchInput from "@comp/basic/SearchInput";

interface Props {
  // Define your props here
}

const AddFoodForm = (props: Props) => {
  const { colors, size } = useTheme();
  const { width } = useWindowDimensions();
  const style = useThemeStyles(styles(width, colors, size));

  return (
    <View style={style.container}>
      <Text style={style.title}>FirstTab</Text>
      <SearchInput style={style.searchInput} />
    </View>
  );
};

export default AddFoodForm;

const styles = (width: number, colors: any, size: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: size.padding,
    },
    title: {
      fontSize: size.fontSize * 1.5,
      fontWeight: "bold",
      color: colors.text,
    },
    searchInput: {
      marginBottom: size.padding,
    },
  });
