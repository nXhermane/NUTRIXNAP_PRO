import { StyleSheet, Text, View, Pressable, ViewStyle, PressEvent } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ThemeInterface, useTheme, useThemeStyles } from '@/theme';
import { useAnimatedStyle, interpolate } from 'react-ntaive-reanimated';
interface Props {
   title?: string;
   body?: string;
   withFilter?: boolean;
   withAddIcon?: boolean;
   header?: boolean;
   onPressFilter?: (e: PressEvent) => void;
   onPressAddIcon?: (e: PressEvent) => void;
   contentContainerStyle?: ViewStyle;
}

const SectionContainer = ({
   title,
   body,
   header,
   withFilter,
   withAddIcon,
   children,
   onPressFilter,
   onPressAddIcon,
   contentContainerStyle = {},
}: React.PropsWithChildren<Props>) => {
   const { size, colors } = useTheme();
   const style = useThemeStyles(styles);
   return (
      <View style={style.sectionContainer}>
         {header && (
            <View style={style.sectionHead}>
               {title && (
                  <View style={style.sectionLeftHeader}>
                     <Text style={style.title}>{title}</Text>
                  </View>
               )}
               {(withAddIcon || withFilter) && (
                  <View style={style.sectionRightHeader}>
                     {withFilter && (
                        <Pressable onPress={onPressFilter && onPressFilter}>
                           {({ pressed }) => (
                              <Ionicons name={'filter'} color={pressed ? colors.purple300 : colors.black300} size={pressed ? size.s4 : size.s5} />
                           )}
                        </Pressable>
                     )}
                     {withAddIcon && (
                        <Pressable onPress={onPressAddIcon && onPressAddIcon}>
                           {({ pressed }) => (
                              <Ionicons name={'add-outline'} color={pressed ? colors.blue300 : colors.black300} size={pressed ? size.s4 : size.s5} />
                           )}
                        </Pressable>
                     )}
                  </View>
               )}
            </View>
         )}
         {body && (
            <View style={style.sectionBody}>
               <Text style={style.body}>{body}</Text>
            </View>
         )}
         {children && <View style={[style.sectionContentContainerm, contentContainerStyle]}>{children}</View>}
      </View>
   );
};

export default SectionContainer;

const styles = ({ size, colors }: ThemeInterface) =>
   StyleSheet.create({
      sectionContainer: {
         backgroundColor: colors.bg.primary,
         width: size.width * 0.95,
         paddingHorizontal: size.s2,
         borderRadius: size.s3,
         paddingVertical: size.s3,
      },
      sectionHead: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         width: '100%',
         paddingHorizontal: size.s2,
      },
      title: {
         color: colors.black300,
         fontFamily: 'inter_b',
         fontSize: size.s4,
      },
      sectionRightHeader: {
         flexDirection: 'row',
         gap: size.s4,
         justifyContent: 'flex-end',
      },
      sectionBody: {
         paddingVertical: size.s1,
         marginBottom: size.s3,
         paddingHorizontal: size.s2,
      },
      body: {
         fontFamily: 'inter_m',
         color: colors.gray300,
         fontSize: size.s3 * 1.1,
      },
      sectionContentContainerm: {},
   });
