import { StyleSheet, Text, View, Pressable, Animated as ReactNativeAnimated } from 'react-native';
import useTheme from '@/theme/useTheme';
import useThemeStyles from '@/theme/useThemeStyles';
import Animated, { useSharedValue, SharedValue, useAnimatedProps } from 'react-native-reanimated';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
type NutrientType = {
   value: string;
   unit: string;
};
type FoodData = {
   energy: NutrientType;
   carbs: NutrientType;
   fats: NutrientType;
   proteins: NutrientType;
};
interface Props {
   name: string;
   dbName: string;
   data: FoodData;
   id: number;
}

const FoodItem: React.FC<Props> = ({ name, dbName, data, id }) => {
   const { colors, size } = useTheme();
   const style = useThemeStyles(styles);
   const [isSelected, setIsSelected] = useState<boolean>(false);
   const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

   //  Render the Right Action
   const renderRightActions = (progress, dragX) => {
      const trans = dragX.interpolate({
         inputRange: [0, 50, 100, 101],
         outputRange: [0, 0, 0, 1],
      });

      return (
         <View style={style.rightAction} onPress={() => alert('press')}>
            <ReactNativeAnimated.View
               style={[
                  style.actionView,
                  {
                     transform: [{ translateX: trans }],
                  },
               ]}
            >
               <Pressable
                  style={style.deleteIcon}
                  onPress={() => {
                     alert('Delete  this food ' + id);
                  }}
               >
                  <Ionicons name="trash" size={size.s5} color={colors.red300} />
               </Pressable>
               <Pressable
                  style={style.deleteIcon}
                  onPress={() => {
                     alert('Copy to edit this food ' + id);
                  }}
               >
                  <Ionicons name="copy" size={size.s5} color={colors.green200} />
               </Pressable>
            </ReactNativeAnimated.View>
         </View>
      );
   };

   return (
      <Swipeable
         renderRightActions={renderRightActions}
         containerStyle={{
            marginVertical: size.s2,
         }}
         childrenContainerStyle={{}}
      >
         <AnimatedPressable
            style={[
               style.foodItemContainer,
               isSelected && {
                  backgroundColor: colors.bg.secondary,
               },
            ]}
            onPress={() => {
               router.navigate({
                  pathname: 'details/foods/[food_id]',
                  params: {
                     food_id: id,
                  },
               });
            }}
            onLongPress={() => {
               setIsSelected((prev) => !prev);
            }}
         >
            <View style={style.foodTextInfo}>
               <Text style={style.foodName}>{name}</Text>
               <Text style={style.foodDbName}>{dbName}</Text>
            </View>
            <View style={style.foodNutritionValue}>
               <View style={style.nutrientContainer}>
                  <Text style={style.nutrientLabel(colors.yellow300)}>Energy</Text>
                  <View style={style.nutrientValueConatiner}>
                     <Text style={style.nutrientValue}>{data.energy.value}</Text>
                     <Text style={style.nutrientUnit}>{data.energy.unit}</Text>
                  </View>
               </View>
               <View style={style.nutrientContainer}>
                  <Text style={style.nutrientLabel(colors.green200)}>Carbs</Text>
                  <View style={style.nutrientValueConatiner}>
                     <Text style={style.nutrientValue}>{data.carbs.value}</Text>
                     <Text style={style.nutrientUnit}>{data.carbs.unit}</Text>
                  </View>
               </View>
               <View style={style.nutrientContainer}>
                  <Text style={style.nutrientLabel(colors.purple300)}>Fats</Text>
                  <View style={style.nutrientValueConatiner}>
                     <Text style={style.nutrientValue}>{data.fats.value}</Text>
                     <Text style={style.nutrientUnit}>{data.fats.unit}</Text>
                  </View>
               </View>
               <View style={style.nutrientContainer}>
                  <Text style={style.nutrientLabel(colors.red300)}>Proteins</Text>
                  <View style={style.nutrientValueConatiner}>
                     <Text style={style.nutrientValue}>{data.proteins.value}</Text>
                     <Text style={style.nutrientUnit}>{data.proteins.unit}</Text>
                  </View>
               </View>
            </View>
         </AnimatedPressable>
         <AnimatedPressable style={style.addBtn} onPress={() => alert('add food ' + id)}>
            <Ionicons name={'add-circle-outline'} color={colors.purple300} size={size.s7} />
         </AnimatedPressable>
      </Swipeable>
   );
};

export default FoodItem;

const styles = ({ colors, size }) =>
   StyleSheet.create({
      foodItemContainer: {
         width: '95%',

         backgroundColor: colors.w,
         elevation: size.s1,
         paddingHorizontal: size.s3,
         justifyContent: 'center',
         borderRadius: size.s2,

         paddingVertical: size.s2,
         alignSelf: 'center',
         alignContent: 'center',
         borderWidth: size.s1 / 20,
         borderBottomColor: colors.green300,
         borderBottomWidth: size.s1,
         borderTopColor: colors.gray300,
         borderRightColor: colors.gray300,
         borderLeftColor: colors.gray300,
      },
      foodTextInfo: {
         gap: size.s1,
         alignItems: 'flex-start',
         maxWidth: '95%',
      },
      foodName: {
         fontSize: size.s4,
         fontFamily: 'inter_b',
         color: colors.black300,
      },
      foodDbName: {
         fontSize: size.s3,
         fontFamily: 'inter_r',
         color: colors.gray300,
      },
      foodNutritionValue: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         gap: size.s2,
         // alignItems: "center",
      },
      nutrientContainer: {
         flexDirection: 'column',

         // paddingHorizontal: size.s2,
         paddingVertical: size.s1,
         borderRadius: size.s2,
         alignItems: 'center',
      },
      nutrientValueConatiner: {
         flexDirection: 'row',
         alignItems: 'flex-end',
      },
      nutrientLabel: (color) => ({
         color: color,
         fontFamily: 'inter_sb',
         fontSize: size.s3 * 1.3,
      }),
      nutrientValue: {
         color: colors.black200,
         fontFamily: 'inter_b',
         fontSize: size.s3 * 1.3,
      },
      nutrientUnit: {
         color: colors.black200,
         fontFamily: 'inter_sb',
         fontSize: size.s3,
      },
      rightAction: {
         width: size.s50,
         justifyContent: 'center',
         height: '100%',
         marginRight: size.s3,
      },
      actionView: {
         backgroundColor: colors.bg.secondary,
         width: '100%',
         height: '100%',
         gap: size.s2,
         justifyContent: 'center',
         alignItems: 'center',
         borderRadius: size.s3,
         marginRight: size.s2,
      },
      deleteIcon: {
         padding: size.s2,
         backgroundColor: colors.w,
         borderRadius: size.s100,
      },
      addBtn: {
         position: 'absolute',

         right: size.s4,
         top: size.s1,
      },
   });
