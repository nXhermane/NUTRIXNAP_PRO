import { StyleSheet, Text, View, Pressable, FlatList, VirtualizedList, Animated, TextInput } from 'react-native';
import React, { useEffect, useState, useLayoutEffect, useRef, useCallback, useMemo } from 'react';
import useTheme from '@/theme/useTheme';
import useThemeStyles from '@/theme/useThemeStyles';
import ReAnimated, { useSharedValue, useAnimatedStyle, withTiming, SharedValue } from 'react-native-reanimated';
import MonthlyCalendar from './MonthlyCalendar';
import CalendarHeader from './CalendarHeader';
import useCalendarData from '@pack/calendar/hooks/useCalendarData';
import useCalendarInitialization from '@pack/calendar/hooks/useCalendarInitialization';
import { MaterialIcons } from '@expo/vector-icons';
import { fixFloot } from '../utils';
import { FlashList } from '@shopify/flash-list';
type CalendarMarkerEvent = {
   eventId: number;
   color: string;
   markedDay: string;
};
type OnPressDayParam = {
   dayId: number;
   value: number;
   events: CalendarMarkerEvent[];
   isActive: boolean;
   dateString: string;
};
interface Props {
   markedEvents: CalendarMarkerEvent[];
   hideBody: boolean;
   hideHeader: boolean;
   onPressDay: (param: OnPressDayParam) => void;
   onMonthChange: (monthKey: string) => void;
}
import CalendarClass from '@pack/calendar/core/Calendar';
const calendarClass = new CalendarClass();
calendarClass.initCalendar();
const currentYear = calendarClass.currentYear;
const currentMonth = calendarClass.currentMonth;
const currentDay = calendarClass.currentDay;
const DayInWeekName = calendarClass.getDayNames();
const maxYear = 2030;
const minYear = 2020;
const CALENDARDATA = calendarClass.generateDataForCalendarFromMaxAndMinYear(minYear, maxYear);
const CALENDARDATAKEYS = Object.keys(CALENDARDATA);
const Calendar = ({
   markedEvents,
   hideBody = false,
   hideHeader = false,
   onPressDay = (param: OnPressDayParam) => {},
   onMonthChange = (monthKey: string) => {},
}: Props) => {
   const { colors, size } = useTheme();
   const style = useThemeStyles(styles);
   const offsetX = useRef(new Animated.Value(0)).current;
   const virtualListRef = useRef(null);
   const virtualListContainerHeight = useSharedValue(size.height * 0.35);
   const virtualListContainerAnimtedStyle = useAnimatedStyle(() => ({
      height: virtualListContainerHeight.value,
   }));
   const [currentCalendarInfo, setCurrentCalendarInfo] = useState({
      activeDay: { value: 0, dayId: 0, weekId: 0 },
   });
   const initialScrollIndex = (currentYear - minYear) * 12 + currentMonth;
   const [currentDateString, setCurrentDateString] = useState<string>('');
   const navToIndex = (index: number) => {
      virtualListRef.current.scrollToIndex({
         index: index,
         animated: true,
      });
   };
   const nextMonth = () => {
      const offsetNumber = fixFloot(offsetX._value / size.width);
      if (offsetNumber >= CALENDARDATAKEYS.length - 1) return;
      setCurrentDateString(CALENDARDATA[CALENDARDATAKEYS[offsetNumber]].dateString);

      navToIndex(offsetNumber + 1);
   };
   const prevMonth = () => {
      const offsetNumber = fixFloot(offsetX._value / size.width);
      if (offsetNumber === 0) return;
      setCurrentDateString(CALENDARDATA[CALENDARDATAKEYS[offsetNumber]].dateString);

      navToIndex(offsetNumber - 1);
   };

   const scrollHandler = useCallback((event) => {
      offsetX.setValue(event.nativeEvent.contentOffset.x);
   });

   const ListViewabilityConfig = {
      minimumViewTime: 100,
      itemVisiblePercentThreshold: 75,
   };
   const onVisibleChangedHandler = useCallback((param) => {
      if (param.viewableItems[0] === undefined) return;
      setCurrentDateString(param.viewableItems[0].item.dateString);
      onMonthChange(param.viewableItems[0].item.key);
   });

   useEffect(() => {
      virtualListContainerHeight.value = withTiming(hideBody ? 0 : size.height * 0.33, { duration: 1000 });
   }, [hideBody]);

   return (
      <View style={style.calendarContainer}>
         {!hideHeader && <CalendarHeader dateString={currentDateString} prevMonth={prevMonth} nextMonth={nextMonth} />}
         <ReAnimated.View
            style={[
               virtualListContainerAnimtedStyle,
               {
                  width: size.width,
                  height: size.height * 0.35,
               },
            ]}
         >
            <VirtualizedList
               ref={virtualListRef}
               data={CALENDARDATAKEYS}
               renderItem={({ item, index }) => {
                  return (
                     <MonthlyCalendar
                        daysName={DayInWeekName}
                        monthData={item.weeks}
                        onPressDay={(param: OnPressDayParam) => {
                           onPressDay(param);
                        }}
                     />
                  );
               }}
               getItem={(_data: any, index: number) => ({
                  weeks: CALENDARDATA[_data[index]].weeks,
                  key: CALENDARDATA[_data[index]].key,
                  dateString: CALENDARDATA[_data[index]].dateString,
               })}
               getItemCount={(_data: any) => _data.length}
               horizontal
               contentContainerStyle={style.calendarMonthlyContainer}
               initialScrollIndex={initialScrollIndex}
               snapToInterval={size.width}
               scrollEventThrottle={16}
               pagingEnabled={true}
               bounces={false}
               bouncesZoom={false}
               initialNumToRender={3}
               maxToRenderPerBatch={20}
               decelerationRate={'fast'}
               disableIntervalMomentum={true}
               keyExtractor={(item) => item.key}
               onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: offsetX } } }], { listener: scrollHandler, useNativeDriver: false })}
               getItemLayout={(_data: any, index: number) => ({
                  length: size.width,
                  offset: size.width * index,
                  index: index,
               })}
               windowSize={21}
               showsHorizontalScrollIndicator={false}
               onViewableItemsChanged={onVisibleChangedHandler}
               viewabilityConfig={ListViewabilityConfig}
            />
         </ReAnimated.View>
      </View>
   );
};

export default Calendar;

const styles = ({ colors, size }) =>
   StyleSheet.create({
      calendarContainer: {
         width: size.width,
         backgroundColor: colors.purple100,
         justifyContent: 'center',
         alignItems: 'center',
      },
      calendarMonthlyContainer: {
         justifyContent: 'center',
         alignItems: 'flex-start',
      },
   });
