import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import { ThemeInterface, useTheme, useThemeStyles } from '@/theme';
import React, { useState, useEffect, memo } from 'react';
import { BlurView } from 'expo-blur';
export interface ConfirmOption {
   confirmIsOpen: (value: boolean) => void;
   msg: string;
   onPress: (value: boolean) => void;
   custormMsgComponent?: (msg: string) => JSX.Element;
   custormBtn?: (btnMsg: { yes: string; no: string }, onPress: (value: boolean) => JSX.Element) => void;
   btnMsg?: { yes: string; no: string };
}

const Confrim = (props: ConfirmOption) => {
   const { colors, size, isLightTheme } = useTheme();
   const style = useThemeStyles(styles);
   const {
      confirmIsOpen,
      btnMsg = { yes: 'Oui', no: 'Annuler' },
      onPress = () => {},
      msg = 'Alert Messagae',
      custormMsgComponent,
      custormBtn,
   } = props;

   return (
      <Modal
         transparent
         onRequestClose={() => {
            onPress && onPress(false);
            confirmIsOpen(false);
         }}
         animationType={'slide'}
         statusBarTranslucent
      >
         <Pressable
            onPress={() => {
               onPress && onPress(false);

               confirmIsOpen(false);
            }}
            style={{
               width: size.width,
               height: size.height + size.s50,
            }}
         >
            <BlurView experimentalBlurMethod={'dimezisBlurView'} intensity={50} tint={isLightTheme ? 'light' : 'dark'} style={[style.alertContainer]}>
               <View style={style.alertInnerContainer}>
                  <View style={style.alertMsgContainer}>
                     {!custormMsgComponent && msg && <Text style={style.alertMsg}>{msg}</Text>}
                     {custormMsgComponent && custormMsgComponent(msg)}
                  </View>
                  <View style={style.alertBtnContainer}>
                     {!custormBtn && btnMsg && (
                        <>
                           <Pressable
                              style={style.alertBtn}
                              onPress={() => {
                                 onPress && onPress(false);
                                 confirmIsOpen(false);
                              }}
                           >
                              <Text style={style.alertBtnText}>{btnMsg?.no}</Text>
                           </Pressable>
                           <Pressable
                              style={style.alertBtn}
                              onPress={() => {
                                 onPress && onPress(true);
                                 confirmIsOpen(false);
                              }}
                           >
                              <Text style={style.alertBtnText}>{btnMsg?.yes}</Text>
                           </Pressable>
                        </>
                     )}
                     {custormBtn &&
                        custormMsgComponent(btnMsg, (value: boolean) => {
                           onPress && onPress(value);
                           confirmIsOpen(false);
                        })}
                  </View>
               </View>
            </BlurView>
         </Pressable>
      </Modal>
   );
};

export default memo(Confrim);

const styles = ({ colors, size }: ThemeInterface) =>
   StyleSheet.create({
      modalInner: {
         width: size.width,
         height: size.height,
         backgroundColor: 'transparent',
         justifyContent: 'center',
         alignItems: 'center',
      },
      alertContainer: {
         width: size.width,
         height: '100%',
      },
      alertInnerContainer: {
         position: 'absolute',
         bottom: size.s100 * 0.7,
         paddingHorizontal: size.s6,
         width: '100%',
      },
      alertMsgContainer: {
         justifyContent: 'flex-end',
         width: '100%',
      },
      alertMsg: {
         color: colors.b,
         fontFamily: 'inter_l',
         fontSize: size.s4,
      },
      alertBtnContainer: {
         flexDirection: 'row',
         justifyContent: 'flex-end',
         alignItems: 'center',
         gap: size.s50 * 0.7,
         marginTop: size.s50 * 0.8,
      },
      alertBtn: {},
      alertBtnText: {
         color: colors.b,
         fontFamily: 'inter_l',
         fontSize: size.s4,
      },
   });
