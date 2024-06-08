import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import useTheme from '@/theme/useTheme';
import useThemeStyles from '@/theme/useThemeStyles';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { BlurView } from 'expo-blur';
interface Props {
   title: string;
   onPressSave: () => void;
}

const formScreenHeader = ({ title, onPressSave = function () {} }: Props) => {
   const { colors, size, isLightTheme } = useTheme();
   const style = useThemeStyles(styles);
   const navigation = useNavigation();
   return (
      <BlurView
         style={style.headerContainer}
         // experimentalBlurMethod={"dimezisBlurView"}
         //intensity={15}
         tint={isLightTheme ? 'light' : 'dark'}
      >
         <View style={style.headerRight}>
            <Pressable
               style={style.icon}
               onPress={() => {
                  navigation.goBack();
               }}
            >
               {({ pressed }) => <Ionicons name="close" size={size.s7} color={colors.black300} />}
            </Pressable>
         </View>
         <View style={style.headerCenter}>
            <Text style={style.title}>{title}</Text>
         </View>
         <View style={style.headerLeft}>
            <Pressable style={style.saveBtn} onPress={() => onPressSave()}>
               <React.Fragment>
                  <Ionicons name="save" size={size.s5} color={colors.black300} />
               </React.Fragment>
            </Pressable>
         </View>
      </BlurView>
   );
};

export default formScreenHeader;

const styles = ({ colors, size }) =>
   StyleSheet.create({
      headerContainer: {
         position: 'absolute',
         top: 0,
         right: 0,
         left: 0,
         height: size.s100,
         backgroundColor: colors.w,
         paddingTop: size.s50,
         paddingHorizontal: size.s3,
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
      },
      headerLeft: {
         flexDirection: 'row',
         justifyContent: 'flex-end',
         alignItems: 'center',
         flex: 1,
      },
      headerRight: {
         flexDirection: 'row',
         justifyContent: 'flex-start',
         alignItems: 'center',
         flex: 1,
      },

      headerCenter: {
         justifyContent: 'center',
         alignItems: 'center',
         flexDirection: 'row',
         flex: 6,
      },
      title: {
         fontSize: size.s5,
         fontFamily: 'inter_eb',
         textAlign: 'center',
         color: colors.black300,
         textTransform: 'uppercase',
      },
      saveBtn: {
         flexDirection: 'row',
         gap: size.s2,
         borderRadius: size.s2,
         paddingVertical: size.s1,
         paddingHorizontal: size.s3,
         //backgroundColor:colors.green300,
         alignItems: 'center',
      },
      saveBtnTitle: {
         fontFamily: 'inter_m',
         fontSize: size.s7,
         color: colors.blue300,
      },
   });
