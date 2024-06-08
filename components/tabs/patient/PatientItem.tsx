import { StyleSheet, Text, View, Pressable, Animated as ReactNativeAnimated, PressEvent } from 'react-native';
import useTheme from '@/theme/useTheme';
import useThemeStyles from '@/theme/useThemeStyles';
import Avatars from '@comp/basic/Avatars';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolate } from 'react-native-reanimated';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { CoreContext } from '@/core/CoreProvider';
interface Props {
   // Define your props here
}

const PatientItem = (props: Props) => {
   const { colors, size } = useTheme();
   const style = useThemeStyles(styles);
   const core = React.useContext(CoreContext);
   const {
      statusCode = 1,
      name = 'John Doe',
      occupation = 'Obesity',
      id = '1234',
      lastActivity = '02/03/2024',
      uri,
      index = 1,
      setSelected,
      sexe = 'M',
      searchItem = false,
      onDelete = () => {},
      onEdit = () => {},
   } = props;
   let statusColor = [colors.w300, colors.w100];
   if (statusCode === 1) statusColor = [colors.yellow300, colors.yellow100];
   if (statusCode === 2) statusColor = [colors.green200, colors.greenBg];
   if (statusCode === 0) statusColor = [colors.red300, colors.red100];
   const [isSelected, setIsSelected] = React.useState(false);
   const s = useSharedValue(0);
   const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

   const AnimatedPressableStyle = useAnimatedStyle(() => ({
      tansform: [
         {
            scaleZ: interpolate(s.value, [0, 1], [1, 0.7]),
         },
      ],
      opacity: interpolate(s.value, [0, 1], [0.9, 1]),
   }));

   React.useEffect(() => {
      s.value = withSpring(1, { duration: index * 700 });
   });
   const deletePatient = () => {
      onDelete();
   };
   const editPatient = (e: PressEvent) => {
      onEdit(e, id);
   };
   const renderRightActions = (progress, dragX) => {
      const trans = dragX.interpolate({
         inputRange: [0, 50, 100, 101],
         outputRange: [0, 0, 0, 1],
      });
      return (
         <View style={[style.rightAction, searchItem ? { width: size.s100 } : {}]} onPress={() => alert('press')}>
            <ReactNativeAnimated.View
               style={[
                  style.actionView,
                  {
                     transform: [{ translateX: trans }],
                  },
                  searchItem
                     ? {
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                          height: size.s100 * 0.6,
                       }
                     : {},
               ]}
            >
               <Pressable style={style.deleteIcon} onPress={deletePatient}>
                  <Ionicons name="trash" size={size.s5} color={colors.red300} />
               </Pressable>
               <Pressable style={style.deleteIcon} onPress={editPatient}>
                  <Ionicons name="create" size={size.s5} color={colors.blue300} />
               </Pressable>
            </ReactNativeAnimated.View>
         </View>
      );
   };
   return (
      <Swipeable
         renderRightActions={searchItem ? null : renderRightActions}
         friction={searchItem ? 1000 : 1}
         containerStyle={{
            marginVertical: size.s2,
         }}
      >
         <AnimatedPressable
            style={[AnimatedPressableStyle, searchItem ? style.containerForSearchItem(isSelected) : style.container(statusColor[0], isSelected)]}
            onPressIn={() => (s.value = withSpring(0, { duration: 500 }))}
            onPressOut={() => (s.value = withSpring(1, { duration: 500 }))}
            onPress={() => {
               router.navigate({
                  pathname: 'details/patients/[patient_id]',
                  params: {
                     patient_id: id,
                  },
               });
            }}
            onLongPress={() => {
               if (isSelected) {
                  setSelected((prev: string[]) => {
                     let inter: string[] = prev;
                     const index = inter.indexOf(id);
                     inter.splice(index, 1);
                     return inter;
                  });
                  setIsSelected(false);
               } else {
                  setSelected((prev: string[]) => {
                     prev.push(id);
                     return prev;
                  });
                  setIsSelected(true);
               }
            }}
         >
            <View style={searchItem ? style.patientInfoForSearchItem : style.patientInfo}>
               <View style={style.patientImage}>
                  {uri ? (
                     <Avatars image={{ uri: uri }} s={searchItem ? size.s100 * 0.4 : size.s100 * 0.6} />
                  ) : (
                     <Avatars
                        letter={name.slice(0, 1)}
                        bg={statusColor[1]}
                        color={statusColor[0]}
                        s={searchItem ? size.s100 * 0.4 : size.s100 * 0.6}
                     />
                  )}
               </View>
               <View style={style.patientPersonalInfo}>
                  <View style={style.infoText}>
                     <Text style={style.patientName}>
                        {name} <Ionicons name={sexe === 'M' ? 'man' : 'woman'} size={size.s4} color={statusColor[0]} />
                     </Text>

                     <Text style={style.patientOccupation}>{occupation}</Text>
                  </View>
                  {!searchItem && (
                     <View style={style.systemeInfo}>
                        <View style={style.systemeIdContainer}>
                           <Text style={style.id}>#ID: {id}</Text>
                        </View>
                        <View style={style.systemeLastVisitContainer}>
                           <Text style={style.lastVisit}>Last activity: {'02/03/2024'}</Text>
                        </View>
                        <View style={style.sexeContainer}>
                           <Text style={style.sexeLabel}>Age: </Text>
                           <Text style={style.sexeValue}>28ans</Text>
                        </View>
                     </View>
                  )}
               </View>
            </View>
            {
               //<View style={style.statusColor(statusColor[0])}></View>
            }
            {
               // <View style={style.optionsConatiner}>
               //     <View style={style.sexeContainer}>
               //         <Text style={style.sexeLabel}>Sexe: </Text>
               //         <Text style={style.sexeValue}>M</Text>
               //     </View>
               //     <View style={style.sexeContainer}>
               //         <Text style={style.sexeLabel}>Age: </Text>
               //         <Text style={style.sexeValue}>28ans</Text>
               //     </View>
               // </View>
            }
         </AnimatedPressable>
      </Swipeable>
   );
};

export default PatientItem;

const styles = ({ colors, size }) =>
   StyleSheet.create({
      container: (border, isSelected) => ({
         width: size.width * 0.9,
         backgroundColor: isSelected ? colors.bg.secondary : colors.w,
         alignSelf: 'center',
         height: size.s100 * 0.9,
         flexDirection: 'row',
         alignContent: 'center',
         borderRadius: size.s3,
         elevation: size.s1,
         paddingHorizontal: size.s2,

         borderWidth: size.s1 / 20,
         borderBottomColor: border,
         borderBottomWidth: size.s1,
         borderTopColor: colors.gray300,
         borderRightColor: colors.gray300,
         borderLeftColor: colors.gray300,
      }),
      containerForSearchItem: (isSelected) => ({
         width: '100%',
         height: size.s100 * 0.6,
         paddingHorizontal: size.s8,
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: isSelected ? colors.w : 'transparent',
      }),
      rightAction: {
         width: size.s50,

         justifyContent: 'center',
         alignItems: 'center',
         height: '100%',
         marginRight: size.s3,
      },
      patientInfo: {
         flexDirection: 'row',
         gap: size.s1,
         justifyContent: 'flex-start',
         alignItems: 'center',
         width: '100%',
         overflow: 'hidden',
         //backgroundColor: "red"
      },
      patientInfoForSearchItem: {
         flexDirection: 'row',
         gap: size.s3,
         justifyContent: 'flex-start',
         alignItems: 'center',
         width: '100%',
         overflow: 'hidden',
      },
      optionsConatiner: {
         justifyContent: 'center',
         gap: size.s1,
         alignItems: 'center',

         flexGrow: 1,
      },
      statusColor: (bg) => ({
         backgroundColor: bg,
         height: size.s4,
         width: size.s4,
         borderRadius: size.s50,
         position: 'absolute',
         top: -size.s1,
         right: -size.s1,
      }),
      status: {
         fontFamily: 'inter_sb',
         color: colors.gray200,
         fontSize: size.s3 * 0.9,
         textDecorationStyle: 'solid',
         textDecorationColor: colors.gray200,
         textDecorationLine: 'underline',
         marginBottom: size.s3,
         textAlign: 'center',
      },
      statusText: {
         fontFamily: 'inter_sb',
         color: colors.gray200,
         fontSize: size.s3 * 0.7,
         textAlign: 'center',
      },
      patientImage: {},
      patientPersonalInfo: {
         justifyContent: 'center',
         gap: size.s2,
      },
      patientName: {
         color: colors.black300,
         fontSize: size.s4,
         fontFamily: 'inter_b',
      },
      patientOccupation: {
         color: colors.gray200,
         fontSize: size.s3,
         fontFamily: 'inter_sb',
      },
      systemeInfo: {
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'flex-start',
         gap: size.s1,
      },
      systemeIdContainer: {
         backgroundColor: colors.purple100,
         borderWidth: size.s1 / 2,
         borderColor: colors.purple200,
         paddingHorizontal: size.s2,
         borderRadius: size.s1,
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
      },
      id: {
         fontFamily: 'inter_sb',
         color: colors.purple300,
         fontSize: size.s2 * 1.1,
      },
      systemeLastVisitContainer: {
         backgroundColor: colors.red100,
         borderWidth: size.s1 / 2,
         borderColor: colors.red200,
         paddingHorizontal: size.s2,
         borderRadius: size.s1,
      },
      lastVisit: {
         fontFamily: 'inter_sb',
         color: colors.red300,
         fontSize: size.s2 * 1.1,
      },
      infoText: {
         paddingHorizontal: size.s1,
      },
      sexeContainer: {
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: colors.blue100,
         borderWidth: size.s1 / 2,
         borderColor: colors.blue200,
         paddingHorizontal: size.s2,
         borderRadius: size.s1,
      },
      sexeLabel: {
         fontFamily: 'inter_sb',
         fontSize: size.s3 * 0.8,
         color: colors.blue300,
      },
      sexeValue: {
         fontFamily: 'inter_m',
         fontSize: size.s3 * 0.8,
         color: colors.blue300,
      },
      deleteIcon: {
         padding: size.s2,
         backgroundColor: colors.w,
         borderRadius: size.s100,
      },

      actionView: {
         gap: size.s2,
         backgroundColor: colors.bg.secondary,
         borderRadius: size.s4,
         justifyContent: 'center',
         alignItems: 'center',
         width: '100%',
         height: '100%',
      },
   });
