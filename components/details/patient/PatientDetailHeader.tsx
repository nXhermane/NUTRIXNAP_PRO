import { StyleSheet, Text, View, Pressable, ScrollView, FlatList, PressEvent, LayoutEvent } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeInterface, useTheme, useThemeStyles } from '@/theme';
import Animated, {
   useSharedValue,
   useAnimatedStyle,
   useAnimatedRef,
   useAnimatedProps,
   useDerivedValue,
   interpolate,
   SharedValue,
   AnimatedRef,
   AnimatedScrollView,
   Extrapolation,
   interpolateColor,
   scrollTo,
   runOnJS,
} from 'react-native-reanimated';
import useCore from '@/hooks/useCore';
import { useNavigation } from 'expo-router';
import { PatientEntity } from '@/core/interfaces';

import Avatars from '@comp/basic/Avatars';

const HeaderTitles = ['Informations', 'Suivi', 'Mesures', 'Planification', 'Plan Alimentaire', 'Recommandations', 'Analyse', 'Documents'];
const getHeaderWidths = () => {
   const obj = {};
   HeaderTitles.forEach((x, i) => {
      obj[i] = 0;
   });
   return obj;
};

type PatientDetailHeaderProps = {
   patient: PatientEntity;
   scrollY: SharedValue<number>;
   headerScrollRef: AnimatedRef<AnimatedScrollView>;
   bottomScrollRef: AnimatedRef<AnimatedScrollView>;
   bottomScrollX: SharedValue<number>;
   headerScrollX: SharedValue<number>;
};

const PatientDetailHeader = ({ patient, scrollY, headerScrollRef, bottomScrollRef, bottomScrollX, headerScrollX }: PatientDetailHeaderProps) => {
   const { colors, size } = useTheme();
   const style = useThemeStyles(styles);

   let headerWidths = getHeaderWidths();
   const [HeaderWidths, setHeaderWidths] = useState(headerWidths);
   const Navigation = useNavigation();
   const AnimatableAvatars = Animated.createAnimatedComponent(Avatars);
   const [currentIndex, setcurrentIndex] = useState<number>(2);

   const headerTopAvatarsStyle = useAnimatedStyle(() => ({
      height: interpolate(scrollY.value, [0, 200], [0, size.s10 * 0.9], Extrapolation.CLAMP),
      width: interpolate(scrollY.value, [0, 200], [0, size.s10 * 0.9], Extrapolation.CLAMP),
   }));
   const headerBodyAvatarsStyle = useAnimatedStyle(() => ({
      height: interpolate(scrollY.value, [0, 150, 200], [size.s100 * 0.9, 0, 0], Extrapolation.CLAMP),
      width: interpolate(scrollY.value, [0, 150, 200], [size.s100 * 0.9, 0, 0], Extrapolation.CLAMP),
   }));
   const headerBodyStyle = useAnimatedStyle(() => ({
      height: interpolate(scrollY.value, [0, 200], [size.s100 * 2, 0], Extrapolation.CLAMP),
      opacity: interpolate(scrollY.value, [0, 150, 200], [1, 0, 0], Extrapolation.CLAMP),
   }));
   const headerContainerStyle = useAnimatedStyle(() => ({
      backgroundColor: interpolateColor(scrollY.value, [0, 200], [colors.bg.primary + '10', colors.bg.secondary]),
      shadowColor: interpolateColor(scrollY.value, [0, 200], [colors.w, colors.b]),
   }));
   const scroll1: SharedValue<number> = useSharedValue(0);
   useDerivedValue(() => {
      runOnJS(setcurrentIndex)(scroll1.value);
      scrollTo(bottomScrollRef, scroll1.value * size.width, 0, true);
   });
   const scroll2: SharedValue<number> = useSharedValue(0);
   useDerivedValue(() => {
      scrollTo(headerScrollRef, scroll2.value, 0, true);
   });
   const barWidthStyle = useAnimatedStyle(() => {
      const input = [];
      const output1 = [];
      const output2 = [];
      let sumWidth = 0;
      const keys = Object.keys(HeaderWidths);
      keys.map((key, index) => {
         input.push(size.width * index);
         const cellWidth = HeaderWidths[key];
         output1.push(cellWidth - size.s4 * 2);
         output2.push(sumWidth + size.s4);
         sumWidth += cellWidth;
      });
      const moveValue = interpolate(bottomScrollX.value, input, output2);
      const barWidth = interpolate(bottomScrollX.value, input, output1);
      scroll2.value = moveValue + barWidth / 2 - size.width / 2;
      const newArray = output2.filter((item) => item + 1 >= moveValue);
      runOnJS(setcurrentIndex)(output2.length - newArray.length);
      return {
         width: barWidth,
         transform: [
            {
               translateX: moveValue,
            },
         ],
      };
   });
   const barMovingStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: -headerScrollX.value }],
   }));
   const onPressHeader = (index) => {
      scroll1.value = index;
   };
   return (
      <Animated.View style={[style.headerContainer, headerContainerStyle]}>
         <View style={style.headerTop}>
            <View style={style.headerTopLeft}>
               <Pressable onPress={(e: PressEvent) => Navigation.goBack()}>
                  <Ionicons name={'chevron-back-outline'} color={colors.black200} size={size.s5} />
               </Pressable>
            </View>
            <View style={style.headerTopCenter}>
               <Text style={style.headerTopTitle}>
                  Profil du <Text style={style.headerTopTitleHight}>Patient</Text>
               </Text>
            </View>
            <View style={style.headerTopRight}>
               <Pressable>
                  <Ionicons name={'search'} color={colors.black200} size={size.s5} />
               </Pressable>
               <View style={style.headerTopRightAvatartsContainer}>
                  <AnimatableAvatars
                     letter={patient?.name?.slice(0, 1)}
                     image={{ uri: patient?.profil_img }}
                     bg={colors.yellow100}
                     color={colors.yellow300}
                     s={size.s10 * 0.9}
                     st={headerTopAvatarsStyle}
                  />
               </View>
            </View>
         </View>
         <Animated.View style={[style.headerBody, headerBodyStyle]}>
            <View
               style={{
                  justifyContent: 'center',
                  alignItems: 'center',
               }}
            >
               <AnimatableAvatars
                  letter={patient?.name?.slice(0, 1)}
                  image={{ uri: patient?.profil_img }}
                  bg={colors.yellow100}
                  color={colors.yellow300}
                  s={size.s100 * 0.9}
                  st={headerBodyAvatarsStyle}
               />
            </View>
            <View style={style.headerBodyTextContainer}>
               <Text style={style.headerBodyPatientName}>{patient.name}</Text>
               <Text style={style.headerBodyPatientOccupancy}>{patient.occupancy}</Text>
            </View>
         </Animated.View>
         <View style={style.headerBottom}>
            <Animated.ScrollView ref={headerScrollRef} horizontal showsHorizontalScrollIndicator={false}>
               {HeaderTitles.map((item: string, index) => (
                  <HeaderTitle
                     onLayout={(e: LayoutEvent) => {
                        e.persist();
                        setHeaderWidths((prev) => {
                           let obj = { ...prev };
                           obj[index] = e.nativeEvent.layout.width;
                           return obj;
                        });
                     }}
                     isActive={index === currentIndex}
                     title={item}
                     key={index.toString()}
                     onPress={(e: PressEvent) => onPressHeader(index)}
                  />
               ))}
            </Animated.ScrollView>
            <Animated.View style={[style.bar, barWidthStyle, { width: size.s100 * 2 }]}>
               <Animated.View style={[style.barInner, barMovingStyle]} />
            </Animated.View>
         </View>
      </Animated.View>
   );
};
type HeaderTitleProps = {
   isActive?: boolean;
   title: string;
   key?: string;
   onPress: (e: PressEvent) => void;
   onLayout: (e: LayoutEvent) => void;
};
const HeaderTitle = ({ title, isActive = false, onPress, onLayout }: HeaderTitleProps) => {
   const { colors, size } = useTheme();
   const style = useThemeStyles(styles);

   return (
      <Pressable onLayout={onLayout && onLayout} style={style.headerTitleContainer} onPress={onPress && onPress}>
         <Text style={[style.headerTitle, isActive && { color: colors.blue300 }]}>{title}</Text>
      </Pressable>
   );
};

export default PatientDetailHeader;
const styles = ({ colors, size }: ThemeInterface) =>
   StyleSheet.create({
      headerContainer: {
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 1,
         shadowRadius: 4,
         //position:'absolute'
      },
      headerTop: {
         flexDirection: 'row',
         paddingHorizontal: size.s2,
         justifyContent: 'space-between',
         alignItems: 'center',
         height: size.s50,
      },
      headerTopTitle: {
         fontFamily: 'inter_m',
         fontSize: size.s5,
         color: colors.b,
      },
      headerTopTitleHight: {
         fontFamily: 'inter_sb',
         color: colors.blue300,
         fontSize: size.s5 * 1.09,
      },
      headerTopLeft: {
         width: '20%',
         alignItems: 'flex-start',
      },
      headerTopRight: {
         width: '20%',
         flexDirection: 'row',
         justifyContent: 'flex-end',
         alignItems: 'center',
         gap: size.s5,
         paddingRight: size.s2,
      },
      headerTopCenter: {
         width: '60%',
         alignItems: 'center',
         justifyContent: 'center',
      },
      headerBody: {
         paddingVertical: size.s4,
         justifyContent: 'center',
         alignItems: 'center',
         gap: size.s2,
         height: size.s100 * 2,
      },
      headerBodyTextContainer: {
         justifyContent: 'center',
         alignItems: 'center',
         height: size.s50,
      },
      headerBodyPatientName: {
         fontFamily: 'inter_m',
         fontSize: size.s6,
         color: colors.black300,
      },
      headerBodyPatientOccupancy: {
         fontFamily: 'inter_r',
         fontSize: size.s4,
         color: colors.black100,
      },
      headerBottom: {
         paddingVertical: size.s2,
      },
      headerTitleContainer: {
         //marginHorizontal: size.s4,
         justifyContent: 'center',
         alignItems: 'center',
         height: size.s8,
      },
      headerTitle: {
         fontFamily: 'inter_m',
         color: colors.black200,
         fontSize: size.s3 * 1.2,
         marginHorizontal: size.s4,
      },
      bar: {
         alignSelf: 'flex-start',
         height: size.s1,
         borderRadius: size.s10,
      },
      barInner: {
         backgroundColor: colors.blue300,
         ...StyleSheet.absoluteFill,
      },
   });
