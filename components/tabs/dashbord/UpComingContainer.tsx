import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import useTheme from '@/theme/useTheme';
import useThemeStyles from '@/theme/useThemeStyles';
import { router, Link } from 'expo-router';
import { ServicesData } from '../../../data';
import DashBoardSection from '@comp/container/DashBoardSection';
import EmptyContainerText from '@comp/basic/EmptyContainerText';
import Avatars from '@comp/basic/Avatars';
import { FontAwesome, Fontisto, MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';
import Animated, { withSpring, useSharedValue, useAnimatedStyle, interpolate, withDelay } from 'react-native-reanimated';
import React, { useState, useEffect } from 'react';
interface Props {
   // Define your props here
}

const UpComingContainer = (props: Props) => {
   const { colors, size } = useTheme();
   const style = useThemeStyles(styles);
   const [isConfirm, setisConfirm] = useState(null);
   return (
      <DashBoardSection title={'À venir'} linkTitle={'Voir plus'} linkPath={'/'} style={style.serviceInner}>
         <View style={style.container}>
            <UpcomingEvents
               title={'Consultation avec un Patient'}
               dateTime={'02 mars 2024 à 12h 30'}
               eventId={'12'}
               color={colors.green100}
               secondColor={colors.green300}
            />
            <UpcomingEvents
               title={'Consultation avec un Patient'}
               dateTime={'02 mars 2024 à 12h 30'}
               eventId={'12'}
               color={colors.purple100}
               secondColor={colors.purple300}
            />
            <UpcomingEvents
               title={'Consultation avec un Patient'}
               dateTime={'02 mars 2024 à 12h 30'}
               eventId={'12'}
               color={colors.yellow100}
               secondColor={colors.yellow300}
            />
         </View>
      </DashBoardSection>
   );
};

export default UpComingContainer;
const UpcomingEvents = ({ title, dateTime, eventId, color, secondColor }) => {
   const { colors, size } = useTheme();
   const style = useThemeStyles(styles);
   const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
   const sizes = useSharedValue(0);
   const containerStyle = useAnimatedStyle(() => ({
      width: interpolate(sizes.value, [0, 1], [size.width * 0.8, size.width * 0.9]),
      height: interpolate(sizes.value, [0, 1], [size.s100 * 0.7, size.s100 * 0.8]),
   }));
   useEffect(() => {
      sizes.value = withDelay(700, withSpring(1, { duration: 1000 }));
   });
   return (
      <Animated.View style={[containerStyle, { marginBottom: size.s4 }]}>
         <Pressable
            style={[style.upComingItem(secondColor)]}
            onPressIn={() => (sizes.value = withSpring(0, { duration: 1000 }))}
            onPressOut={() => {
               sizes.value = withSpring(1, { duration: 1000 });

               //alert("Go to detailPage")
            }}
         >
            <View style={style.eventTypeIconContainer(color)}></View>
            <View style={style.eventInfo}>
               <Text style={style.eventTitle}>{title}</Text>
               <Text style={style.eventType}>{dateTime}</Text>
            </View>
            <AnimatedPressable
               style={style.eventDateContainer(secondColor)}
               onPress={() => {
                  alert('Go to edit page');
               }}
            >
               <Feather name="edit" size={20} color={color} />
            </AnimatedPressable>
         </Pressable>
      </Animated.View>
   );
};
const styles = ({ colors, size }) =>
   StyleSheet.create({
      container: {
         width: size.width * 0.9,
         backgroundColor: colors.w,
         alignSelf: 'center',
         borderRadius: size.s1,
         gap: size.s1,
         //borderWidth: size.s1 / 8,
         borderColor: colors.gray100,
         marginTop: size.s3,
         // elevation: size.s1 / 2
      },
      upComingItem: (color) => ({
         height: size.s100 * 0.8,
         backgroundColor: colors.w,
         borderBottomColor: color,
         borderBottomWidth: size.s1,

         borderBottomLeftRadius: size.s4,
         borderBottomRightRadius: size.s4,
         flexDirection: 'row',
         gap: size.s1,
         paddingHorizontal: size.s2,
         paddingVertical: size.s2,
      }),
      eventTypeIconContainer: (bg) => ({
         height: size.s100 * 0.6,
         width: size.s100 * 0.6,
         backgroundColor: bg,
         borderRadius: 600,
         justifyContent: 'center',
         alignItems: 'center',
         overflow: 'hidden',
         alignSelf: 'center',
      }),
      eventInfo: {
         justifyContent: 'center',
      },
      eventTitle: {
         fontFamily: 'inter_b',
         fontSize: size.s4,
         color: colors.black300,
         marginBottom: size.s2,
      },
      eventType: {
         fontFamily: 'inter_sb',
         color: colors.gray200,
      },
      eventDateContainer: (bg) => ({
         position: 'absolute',
         top: -size.s1,
         right: -size.s1,
         backgroundColor: bg,
         padding: size.s2,
         borderRadius: size.s10 * 2,
      }),
   });
