import { StyleSheet, Text, View, Pressable, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import useTheme from '@/theme/useTheme';
import useThemeStyles from '@/theme/useThemeStyles';
import Animated, {
   useSharedValue,
   useAnimatedStyle,
   withSpring,
   interpolate,
   withTiming,
   useAnimatedScrollHandler,
   useAnimatedRef,
   useDerivedValue,
   useAnimatedReaction,
   scrollTo,
   runOnJS,
   runOnUI,
} from 'react-native-reanimated';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import { selectorTapPositionCalculator } from './../utils';
interface Props {
   // Define your props here
}

const GestureSelector = (props: Props) => {
   const {
      selectorWidth,
      selectorOffset,
      selectorStart,
      selectorIsPressed,
      selectorHeight,
      selectorHeightStart,
      selectorTopDist,
      cellHeight,
      scrollViewVisibleContentWidth,
      format,
   } = props;
   const sOffset = useDerivedValue(() => {
      return selectorOffset.value;
   });
   useAnimatedReaction(
      () => sOffset.value,
      (val, prev) => {
         if (val === prev || prev === null) return;
         let inter = { ...val };
         selectorOffset.value = val;
      },
      [sOffset],
   );
   const sStart = useDerivedValue(() => {
      return selectorStart.value;
   });
   useAnimatedReaction(
      () => sStart.value,
      (val, prev) => {
         if (val === prev || prev === null) return;
         selectorStart.value = val;
      },
      [sStart],
   );
   const sIsPressed = useDerivedValue(() => {
      return selectorIsPressed.value;
   });
   useAnimatedReaction(
      () => sIsPressed.value,
      (val, prev) => {
         if (val === prev || prev === null) return;
         selectorIsPressed.value = val;
      },
      [sIsPressed],
   );
   const sHeight = useDerivedValue(() => {
      return selectorHeight.value;
   });
   useAnimatedReaction(
      () => sHeight.value,
      (val, prev) => {
         if (val === prev || prev === null) return;
         selectorHeight.value = val;
      },
      [sHeight],
   );
   const sTopDist = useDerivedValue(() => {
      return selectorTopDist.value;
   });
   useAnimatedReaction(
      () => sTopDist.value,
      (val, prev) => {
         if (val === prev || prev === null) return;
         selectorTopDist.value = val;
      },
      [sTopDist],
   );

   const sHeightStart = useDerivedValue(() => {
      return selectorHeightStart.value;
   });
   useAnimatedReaction(
      () => sHeightStart.value,
      (val, prev) => {
         if (val === prev || prev === null) return;

         selectorHeightStart.value = val;
      },
      [sHeightStart],
   );
   const { colors, size } = useTheme();
   const style = useThemeStyles(styles);

   const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
   const selectorAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: selectorOffset.value.y }, { translateX: selectorOffset.value.x }],
      height: selectorHeight.value,
      backgroundColor: sIsPressed.value ? colors.blue + '20' : 'transparent',
   }));
   const gesture = Gesture.Pan()
      .onBegin(() => {
         sIsPressed.value = true;
      })
      .onUpdate((e) => {
         const ecart = cellHeight.value / 4;
         const step = Math.floor((e.translationY + sStart.value.y) / ecart);
         const ecartX = selectorWidth;
         const stepX = Math.floor((e.translationX + sStart.value.x + ecartX) / ecartX);

         const x = selectorTapPositionCalculator({
            tapValue: e.translationX + sStart.value.x,
            globSize: scrollViewVisibleContentWidth,
            format: format,
         });

         if (sOffset.value.y >= 0 && sOffset.value.y <= cellHeight.value * 24 - sHeight.value) {
            sOffset.value = {
               y: step * ecart,
               x: stepX * ecartX,
            };
         } else {
            if (sOffset.value.y < 0) {
               //  console.log(-step * 10 - selectorHeight.value);
               // selectorOffset.value = {
               //                         y: -step * 10 - selectorHeight.value,
               //                         x:
               //                             e.translationX +
               //                             selectorStart.value.x +
               //                             selectorWidth
               //                     };
            } else
               sOffset.value = {
                  y: cellHeight.value * 24 - sHeight.value,
                  x: e.translationX + sStart.value.x,
               };
         }
      })
      .onEnd(() => {
         sStart.value = {
            y: sOffset.value.y,
            x: sOffset.value.x,
         };
      })
      .onFinalize(() => {
         sIsPressed.value = false;
      });
   const pointTopGesture = Gesture.Pan()
      .onBegin(() => {
         sTopDist.value = sOffset.value.y + sHeight.value;
      })
      .onUpdate((e) => {
         const ecart = cellHeight.value / 4;
         const step = Math.floor((-e.translationY + sHeightStart.value) / ecart);

         sHeight.value = step * ecart || -e.translationY + sHeightStart.value;
         sOffset.value = {
            y: sTopDist.value - sHeight.value,
            x: sOffset.value.x,
         };
      })
      .onEnd(() => {
         sHeightStart.value = sHeight.value;
         sStart.value = {
            y: sOffset.value.y,
            x: sOffset.value.x,
         };
      })
      .onFinalize(() => {});
   const pointBottomGesture = Gesture.Pan()
      .onBegin(() => {})
      .onUpdate((e) => {
         const ecart = cellHeight.value / 4;
         const step = Math.floor((e.translationY + sHeightStart.value) / ecart);

         sHeight.value = step * ecart || e.translationY + sHeightStart.value;
      })
      .onEnd(() => {
         sHeightStart.value = sHeight.value;
      })
      .onFinalize(() => {});

   return (
      <GestureDetector gesture={gesture}>
         <Animated.View style={[style.selector(selectorWidth), selectorAnimatedStyle]} collapsable={false}>
            <GestureDetector gesture={pointTopGesture}>
               <AnimatedPressable style={style.selectorBtnTop}></AnimatedPressable>
            </GestureDetector>
            <Text style={{ color: 'white', alignSelf: 'center', paddingVertical: 50 }}> GestureSelector</Text>
            <GestureDetector gesture={pointBottomGesture}>
               <AnimatedPressable style={style.selectorBtnBottom}></AnimatedPressable>
            </GestureDetector>
         </Animated.View>
      </GestureDetector>
   );
};

export default GestureSelector;

const styles = ({ colors, size }) =>
   StyleSheet.create({
      selector: (width) => ({
         position: 'absolute',
         // height: 200,
         width: width,
         borderRadius: size.s2,
         borderColor: colors.tangerine,
         borderWidth: size.s1 / 2,
      }),

      selectorBtnTop: {
         position: 'absolute',
         width: size.s2 + size.s1,
         height: size.s2 + size.s1,
         backgroundColor: colors.tangerine,
         borderRadius: size.s5,
         borderWidth: size.s1,
         borderColor: colors.bg.bg2,
         top: -(size.s2 + size.s1) / 2,
         left: '15%',
      },
      selectorBtnBottom: {
         position: 'absolute',
         width: size.s2 + size.s1,
         height: size.s2 + size.s1,
         backgroundColor: colors.tangerine,
         borderRadius: size.s5,
         borderWidth: size.s1,
         borderColor: colors.bg.bg2,
         bottom: -(size.s2 + size.s1) / 2,
         right: '15%',
      },
   });
