import { StyleSheet, Text, View } from 'react-native';
import useTheme from '@/theme/useTheme';
import useThemeStyles from '@/theme/useThemeStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
interface Props {
   // Define your props here
}

const search = (props: Props) => {
   const { colors, size } = useTheme();
   const style = useThemeStyles(styles);

   return (
      <SafeAreaView>
         <Text>Seach</Text>
      </SafeAreaView>
   );
};

export default search;

const styles = ({ colors, size }) => StyleSheet.create({});
