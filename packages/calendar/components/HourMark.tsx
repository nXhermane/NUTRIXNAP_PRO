import { StyleSheet, Text, View } from 'react-native';

import React, { useEffect, useState, useLayoutEffect } from 'react';
import useTheme from '@/theme/useTheme';
import useThemeStyles from '@/theme/useThemeStyles';
import Animated, { useAnimatedStyle, useAnimatedReaction, runOnJS } from 'react-native-reanimated';
import { hourCalculator } from './../utils';
interface Props {
   // Define your props here
}

const HourMark = (props: Props) => {
   const { colors, size } = useTheme();
   const style = useThemeStyles(styles);
   const { isActive = false, getHour = (val) => {} } = props;
   const graduiatorAnimatedStyle = useAnimatedStyle(() => ({
      transform: [
         {
            translateY: props.offset.value.y + (props.add ? props.add.value : 0) - size.s2,
         },
      ],
   }));
   const [Hour, setHour] = useState('00:00');
   useAnimatedReaction(
      () => props.offset.value,
      (val, prev) => {
         const y = val.y + (props.add ? props.add.value : 0);
         const H = hourCalculator(y, props.cell.value);

         runOnJS(setHour)(H);
      },
      [props.offset, props.cell],
   );
   useEffect(() => {
      getHour(Hour);
   }, [Hour]);

   return <Animated.View style={[style.graduiator, graduiatorAnimatedStyle]}>{isActive && <Text style={style.textHour}>{Hour}</Text>}</Animated.View>;
};

export default HourMark;

const styles = ({ colors, size }) =>
   StyleSheet.create({
      graduiator: {
         position: 'absolute',
         right: size.s4,
         height: size.s8,
         width: size.s10,
      },
      textHour: {
         fontFamily: 'inter',
         fontSize: size.s3 * 0.9,
         textAlign: 'center',
         color: colors.tangerine,
         fontWeight: '700',
      },
   });
