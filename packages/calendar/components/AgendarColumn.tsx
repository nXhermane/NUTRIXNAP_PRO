import { StyleSheet, Text, View, Pressable } from 'react-native';
import Animated, {
   useSharedValue,
   useAnimatedStyle,
   withTiming,
   useAnimatedScrollHandler,
   useAnimatedRef,
   useDerivedValue,
   scrollTo,
   runOnJS,
   runOnUI,
   useAnimatedReaction,
   SharedValue,
   AnimatedRef,
} from 'react-native-reanimated';
import useTheme from '@/theme/useTheme';
import useThemeStyles from '@/theme/useThemeStyles';
interface Props {
   data: {
      isActive: boolean;
      title: string;
      value: number;
   };
   scrollOffset: SharedValue;
   width: SharedValue;
   cellHeight: SharedValue;
   scrollRef: AnimatedRef;
   index: number;
}
const hoursData = Array(24).fill(0);
const AgendarColumn = ({ width, cellHeight, data, index }: Props) => {
   const { colors, size } = useTheme();
   const style = useThemeStyles(styles);
   const { isActive, title, value } = data;
   const widthAnimatedStyle = useAnimatedStyle(
      () => ({
         width: width.value,
      }),
      [width],
   );
   const AnimPressable = Animated.createAnimatedComponent(Pressable);
   const animtateCellStyle = useAnimatedStyle(
      () => ({
         height: cellHeight.value,
      }),
      [cellHeight],
   );
   return (
      <Animated.View style={widthAnimatedStyle}>
         <View style={style.columnBody}>
            {hoursData.map((item: any, index: number) => (
               <AnimPressable
                  key={index.toString() + item}
                  style={[animtateCellStyle, style.cell]}
                  onPress={() => alert('cell' + index)}
               ></AnimPressable>
            ))}
         </View>
      </Animated.View>
   );
};

export default AgendarColumn;
export const ColumnHeader = ({ width, data, index }) => {
   const { colors, size } = useTheme();
   const style = useThemeStyles(styles);
   const { isActive, title, value } = data;
   const widthAnimatedStyle = useAnimatedStyle(
      () => ({
         width: width.value,
      }),
      [width],
   );
   return (
      <Animated.View style={[widthAnimatedStyle, style.columnHeader]}>
         <Pressable style={style.columnInner}>
            <Text style={style.dayName(isActive)}>{title}</Text>
            <View style={style.dayValueContainer(isActive)}>
               <Text style={style.dayValue(isActive)}>{value.toString()}</Text>
            </View>
         </Pressable>
      </Animated.View>
   );
};
const styles = ({ colors, size }) =>
   StyleSheet.create({
      columnHeader: {
         height: '100%',
         backgroundColor: colors.purple100,
         justifyContent: 'center',
         alignItems: 'center',
      },
      columnInner: {
         alignItems: 'center',
         gap: 1,
      },
      dayName: (isActive) => ({
         fontFamily: 'inter',
         fontSize: size.s3,
         fontWeight: 'bold',
         color: isActive ? colors.blue300 : colors.black300,
      }),
      dayValueContainer: (isActive) => ({
         justifyContent: 'center',
         alignItems: 'center',
         height: size.s7,
         width: size.s7,
         backgroundColor: isActive ? colors.blue300 : 'transparent',
         borderRadius: size.s7 * 2,
      }),
      dayValue: (isActive) => ({
         fontFamily: 'inter',
         fontSize: size.s4,
         color: isActive ? colors.white : colors.black300,
      }),
      columnBody: {
         width: '100%',
      },
      cell: {
         width: '100%',
         height: size.s50,
         borderColor: colors.gray200,
         borderWidth: size.s1 / 16,
      },
   });
