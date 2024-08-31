import { StyleSheet, Text, View, Pressable, ImageBackground, LayoutAnimation, PressEvent, Animated as ReactNativeAnimated } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ThemeInterface, useTheme, useThemeStyles } from '@/theme';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { FoodDiaryDTO } from '@/core/interfaces';
import image from './../../../../../assets/images/diet-week-plan-healthy-vegetables-background_23-2147885844.jpg';
interface Props {
   data: FoodDiaryDTO;
   onPress: (e: PressEvent) => void;
   onDelete: (e: PressEvent) => void;
}

const FoodDiaryItem = ({ data, onPress, onDelete }: Props) => {
   const { size, colors } = useTheme();
   const style = useThemeStyles(styles);
   const [open, setOpen] = useState(true);
   const realHeight = useRef(null);
   const [containerLayoutHeight, setContainerLayoutHeight] = useState<string>('65%');
   const height = useSharedValue(1);
   const animHeight = useDerivedValue(() => {
      return '' + height.value * 100 + '%';
   });
   const AnimtedPressable = Animated.createAnimatedComponent(Pressable);
   const pressabkeAnimatedStyle = useAnimatedStyle(() => ({
      height: animHeight.value,
   }));

   const dateInstance = new Date(data?.date);

   let date = dateInstance.toLocaleString().split(':').slice(0, -1).join(':');

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
               <Pressable style={style.deleteIcon} onPress={onDelete && onDelete}>
                  <Ionicons name="trash" size={size.s5} color={colors.red300} />
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
         <Animated.View style={style.diaryContainer}>
            <ImageBackground
               source={{ uri: data?.images[0] }}
               style={{
                  backgroundColor: colors.bg.secondary,
               }}
            >
               <LinearGradient
                  colors={[colors.bg.secondary, colors.bg.secondary + '50', colors.black + '10']}
                  start={[0.35, 0]}
                  end={[1, 0.65]}
                  locations={[0.01, 0.7, 0.9]}
               >
                  <AnimtedPressable style={[style.container]} onPress={onPress}>
                     <View style={style.diaryHeader}>
                        <View style={style.mealsType}>
                           <Text style={style.mealsTypeText}>{data?.mealsType}</Text>
                        </View>

                        <View style={style.date}>
                           <Text style={style.dateText}>{date}</Text>
                        </View>
                     </View>
                     <Animated.View
                        onLayout={(e: LayoutEvent) => {
                           e.persist();
                           realHeight.current = e.nativeEvent.layout.height;
                        }}
                        style={[style.diaryBody]}
                     >
                        <React.Fragment>{data?.meals && <Text style={style.mealsDetailText}>{data.meals}</Text>}</React.Fragment>
                        <React.Fragment>{data?.observations && <Text style={style.observationsText}>{data.observations}</Text>}</React.Fragment>
                     </Animated.View>
                     {open && (
                        <LinearGradient
                           colors={[colors.bg.secondary + '50', colors.bg.secondary]}
                           start={[0.1, 0.2]}
                           end={[0.1, 0.7]}
                           locations={[0, 1]}
                           style={style.flotingView}
                        >
                           <View>
                              <Pressable
                                 style={style.plusBtn}
                                 onPress={() => {
                                    LayoutAnimation.easeInEaseOut();
                                    setOpen(false);
                                    setContainerLayoutHeight('100%');
                                 }}
                              >
                                 <Ionicons name={'chevron-down-outline'} size={size.s5} color={colors.black100} />
                              </Pressable>
                           </View>
                        </LinearGradient>
                     )}
                  </AnimtedPressable>
               </LinearGradient>
            </ImageBackground>
         </Animated.View>
      </Swipeable>
   );
};

export default FoodDiaryItem;

const styles = ({ size, colors }: ThemeInterface) =>
   StyleSheet.create({
      diaryContainer: {
         overflow: 'hidden',
         elevation: 1,
         borderRadius: size.s2,
         borderColor: colors.gray100,
         borderWidth: size.s1 / 20,
         maxHeight: size.s100 * 2,
      },
      container: {
         width: '100%',
         backgroundColor: colors.bg.secondary + '70',
         paddingVertical: size.s2,
         overflow: 'hidden',
      },
      diaryHeader: {
         flexDirection: 'row',
         paddingHorizontal: size.s4,
         width: '100%',
         alignItems: 'center',
         justifyContent: 'space-between',
         paddingVertical: size.s1,
      },
      mealsTypeText: {
         fontFamily: 'inter_eb',
         fontSize: size.s3 * 1.2,
         color: colors.black300,
      },
      dateText: {
         fontFamily: 'inter_sb',
         fontSize: size.s3,
         color: colors.blue300,
         backgroundColor: colors.bg.primary + '70',
         paddingHorizontal: size.s2,
         paddingVertical: size.s1 / 4,
         borderRadius: size.s10,
      },
      diaryBody: {
         paddingHorizontal: size.s4,
         width: '100%',
         paddingVertical: size.s2,
         gap: size.s2,
      },
      mealsDetailText: {
         fontFamily: 'inter_sb',
         fontSize: size.s3,
         color: colors.black200,
         borderLeftColor: colors.blue300,
         borderLeftWidth: size.s1,
         paddingLeft: size.s3,
      },
      observationsText: {
         fontFamily: 'inter_m',
         fontSize: size.s3 * 0.9,
         color: colors.black200,
         borderLeftColor: colors.purple300,
         borderLeftWidth: size.s1,
         paddingLeft: size.s3,
      },
      flotingView: {
         position: 'absolute',
         bottom: -42,
         right: 0,
         left: 0,
         alignItems: 'center',
         justifyContent: 'center',
         height: size.s10 * 1.4,
         // backgroundColor: colors.w
      },
      plusBtn: {
         padding: size.s1,
         borderRadius: size.s10,
         backgroundColor: colors.bg.secondary,
      },
      rightAction: {
         width: size.s50,
         justifyContent: 'center',
         height: '100%',
         marginRight: size.s1,
         marginLeft: size.s2,
      },
      actionView: {
         backgroundColor: colors.bg.secondary,
         width: '100%',
         height: '100%',
         gap: size.s2,
         justifyContent: 'center',
         alignItems: 'center',
         borderRadius: size.s3,
         marginRight: size.s1,
      },
      deleteIcon: {
         padding: size.s2,
         backgroundColor: colors.w,
         borderRadius: size.s100,
      },
   });
