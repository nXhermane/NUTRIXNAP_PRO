import { StyleSheet, Text, View } from 'react-native';
import useTheme from '@/theme/useTheme';
import useThemeStyles from '@/theme/useThemeStyles';
import SearchInput from '@comp/basic/SearchInput';
interface Props {
   // Define your props here
}

const addFoodForm = (props: Props) => {
   const { colors, size } = useTheme();
   const style = useThemeStyles(styles);
   return (
      <View>
         <Text>FirstTab</Text>
         <SearchInput />
      </View>
   );
};

export default addFoodForm;

const styles = ({ colors, size }) => StyleSheet.create({});
