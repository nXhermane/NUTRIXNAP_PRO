import { StyleSheet, Text, View, VirtualizedList, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useState, useLayoutEffect, useRef, useCallback, useMemo } from 'react';
import Animated, {
   useSharedValue,
   useAnimatedStyle,
   withTiming,
   useAnimatedScrollHandler,
   useAnimatedRef,
   useDerivedValue,
   scrollTo,
   runOnJS,
   runOnUI,
   useAnimatedReaction,
   SharedValue,
   AnimatedRef,
} from 'react-native-reanimated';
import useTheme from '@/theme/useTheme';
import useThemeStyles from '@/theme/useThemeStyles';
import AgendarColumn, { ColumnHeader } from './AgendarColumn';
import HourMark from './HourMark';
import { day } from '../data/agendarData';
import CalendarClass from '@pack/calendar/core/Calendar';
const calendarClass = new CalendarClass();
calendarClass.initCalendar();
interface Props {
   // Define your props here
}
let data = [];

for (let i = 0; i < 20; i++) {
   data.push({
      id: Math.random().toString(12).substring(0),
      title: 'lun',
      value: i,
      isActive: false,
   });
}
const getItem = (_data: unknown, index: number): ItemData => ({
   id: _data[index].id,
   title: _data[index].title,
   value: _data[index].value,
   isActive: _data[index].value,
});
const getItemCount = (_data: unknown) => _data.length;

const AgendarNew = (props: Props) => {
   const AnimatedVirtualList = Animated.createAnimatedComponent(VirtualizedList);
   const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
   const { colors, size } = useTheme();
   const style = useThemeStyles(styles);

   const scrollOffset = useSharedValue(0);
   const AgendarColumnWidth = useSharedValue(70);
   const cellHeight = useSharedValue(40);
   const translateX = useSharedValue(0);

   const headerVirtualizedListRef = useAnimatedRef();
   const bodyVirtualizedListRef = useAnimatedRef();

   const cellAnimatedStyle = useAnimatedStyle(() => {
      return {
         minHeight: cellHeight.value,
      };
   });
   const animation = () => {
      if (cellHeight.value === 40) {
         cellHeight.value = withTiming(100, { duration: 1000 });
      } else {
         cellHeight.value = withTiming(40, { duration: 1000 });
      }
   };
   const scrollHandleHeader = useAnimatedScrollHandler((event) => {
      translateX.value = event.contentOffset.x;
   });
   const scrollHandlerBody = useAnimatedScrollHandler((event) => {
      translateX.value = event.contentOffset.x;
   });
   useDerivedValue(() => {
      scrollTo(bodyVirtualizedListRef, translateX.value, 0, false);
      scrollTo(headerVirtualizedListRef, translateX.value, 0, false);
   });
   const ListViewabilityConfig = {
      minimumViewTime: 0,
      itemVisiblePercentThreshold: 60,
   };
   const onVisibleChangedHandler = (param) => {
      if (param.viewableItems[0] === undefined) return;
   };
   return (
      <View style={style.agendarContainer}>
         <View style={style.agendarHeader}>
            <View style={style.agendarHeaderOneDay}></View>
            <View style={style.agendarHeaderDays}>
               <AnimatedVirtualList
                  ref={headerVirtualizedListRef}
                  data={data}
                  initialNumToRender={4}
                  renderItem={({ item, index }) => <ColumnHeader index={index} data={item} width={AgendarColumnWidth} />}
                  keyExtractor={(item) => item.id}
                  getItemCount={getItemCount}
                  getItem={getItem}
                  horizontal
                  onViewableItemsChanged={onVisibleChangedHandler}
                  viewabilityConfig={ListViewabilityConfig}
                  onScroll={scrollHandleHeader}
                  showsHorizontalScrollIndicator={false}
               />
            </View>
         </View>
         <ScrollView>
            <View style={style.agendarBody}>
               <Animated.View style={[style.agendarBodyLateral]}>
                  {day.map((item, index) => (
                     <AnimatedPressable onPress={() => animation()} style={[style.hourCell, cellAnimatedStyle]} key={String(index)}>
                        <Text style={style.hourCellText}>{item.hour}</Text>
                     </AnimatedPressable>
                  ))}
               </Animated.View>
               <View style={style.agendarBodyGuide}>
                  <AnimatedVirtualList
                     ref={bodyVirtualizedListRef}
                     data={data}
                     initialNumToRender={4}
                     renderItem={({ item, index }) => <AgendarColumn index={index} data={item} cellHeight={cellHeight} width={AgendarColumnWidth} />}
                     keyExtractor={(item) => item.id}
                     getItemCount={getItemCount}
                     getItem={getItem}
                     horizontal
                     onViewableItemsChanged={onVisibleChangedHandler}
                     viewabilityConfig={ListViewabilityConfig}
                     onScroll={scrollHandlerBody}
                     showsHorizontalScrollIndicator={false}
                  />
               </View>
            </View>
         </ScrollView>
      </View>
   );
};

export default AgendarNew;

const styles = ({ colors, size }) =>
   StyleSheet.create({
      agendarContainer: {
         width: size.width,
         height: size.height * 0.8,
         backgroundColor: colors.bg.bg1,
         justifyContent: 'flex-start',
         alignItems: 'center',
      },
      agendarBody: {
         backgroundColor: colors.bg.bg2,
         width: size.width,
         // height: size.height * 0.9,
         flexDirection: 'row',
      },
      agendarBodyLateral: {
         width: size.width * 0.15,
         height: '100%',
         borderRightColor: colors.gray,
         borderRightWidth: size.s1 / 8,
      },
      agendarBodyGuide: {
         width: size.width * 0.85,
         height: '100%',
         backgroundColor: colors.bg.bg1,
         flexDirection: 'row',
      },
      hourCell: {
         flex: 1,
         alignItems: 'center',
      },
      hourCellText: {
         color: colors.text.primary,
         position: 'absolute',
         bottom: -9,
      },
      agendarHeader: {
         height: size.s100 * 0.8,
         width: size.width,
         backgroundColor: colors.bg.bg2,
         flexDirection: 'row',
      },
      agendarHeaderOneDay: {
         width: size.width * 0.15,
         height: '100%',
         backgroundColor: 'transparent',
         minWidth: size.s50,
         minHeight: size.s50,
         borderRightColor: colors.gray,
         borderRightWidth: size.s1 / 8,
      },
      agendarHeaderDays: {
         width: size.width * 0.85,
         height: '100%',
         backgroundColor: 'transparent',

         alignItems: 'center',
      },
   });
