import { StyleSheet, Text, View, Pressable } from 'react-native';
import useTheme from '@/theme/useTheme';
import useThemeStyles from '@/theme/useThemeStyles';
import { Ionicons } from '@expo/vector-icons';
interface Props {
   // Define your props here
}

const CalendarHeader = ({ prevMonth, dateString, nextMonth }: Props) => {
   const { colors, size } = useTheme();
   const style = useThemeStyles(styles);
   return (
      <View style={style.calendarHeader}>
         <View style={style.navIconContainer}>
            <Pressable onPress={prevMonth}>
               {({ pressed }) => (
                  <Ionicons name={'caret-back-outline'} color={pressed ? colors.tangerine : colors.text.primary} size={pressed ? size.s4 : size.s6} />
               )}
            </Pressable>
         </View>
         <View style={style.currentDate}>
            <Text style={style.currentDateText}>{dateString}</Text>
         </View>
         <View style={style.navIconContainer}>
            <Pressable onPress={nextMonth}>
               {({ pressed }) => (
                  <Ionicons
                     name={'caret-forward-outline'}
                     color={pressed ? colors.tangerine : colors.text.primary}
                     size={pressed ? size.s4 : size.s6}
                  />
               )}
            </Pressable>
         </View>
      </View>
   );
};

export default CalendarHeader;

const styles = ({ colors, size }) =>
   StyleSheet.create({
      calendarHeader: {
         height: size.s100 * 0.6,
         width: size.width,
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
      },
      navIconContainer: {
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center',
      },
      currentDate: {
         flex: 8,
         justifyContent: 'center',
         alignItems: 'center',
      },
      currentDateText: {
         color: colors.text.primary,
         fontSize: size.s5,
         fontFamily: 'inter',
         fontWeight: 'bold',
         height: '100%',
         width: '100%',
         textAlign: 'center',
         textAlignVertical: 'center',
      },
   });
