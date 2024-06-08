import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import useTheme from '@/theme/useTheme';
import useThemeStyles from '@/theme/useThemeStyles';
import MonthlyCalendarHeader from './MonthlyCalendarHeader';
import MonthlyCalendarWeek from './MonthlyCalendarWeek';
export type CalendarHeaderDay = string[];
type CalendarMarkerEvent = {
   eventId: number;
   color: string;
   markedDay: string;
};
export type CalendarDay = {
   value: number;
   dayId: string;
   isActive: boolean;
   events: CalendarMarkerEvent[];
   dateString: string;
};
export type CalendarWeek = { weekId: number; days: CalendarDay[] };
export type CalendarMonth = CalendarWeek[];
interface Props {
   daysName: CalendarHeaderDay;
   monthData: CalendarMonth;
   onPressDay: (day: CalendarDay) => void;
}

const MonthlyCalendar = ({ daysName, monthData, onPressDay = (param: CalendarDay) => {} }: Props) => {
   const { colors, size } = useTheme();
   const style = useThemeStyles(styles);
   const [currentCalendarInfo, setCurrentCalendarInfo] = useState({
      selectDay: {
         value: 1,
         dayId: 0,
         weekId: 0,
      },
   });
   const [activeDayName, setActiveDayName] = useState(null);

   return (
      <View style={style.monthLyCalendarContainer}>
         <View style={style.calendarContainerInner}>
            <MonthlyCalendarHeader activeDayName={activeDayName} daysName={daysName} />
            <View style={style.calendarBody}>
               {monthData.map((week, i) => (
                  <MonthlyCalendarWeek
                     key={String(i + week.weekId)}
                     weekData={week}
                     currentCalendarInfo={currentCalendarInfo}
                     setCurrentCalendarInfo={setCurrentCalendarInfo}
                     onPressDay={onPressDay}
                     setActiveDayName={setActiveDayName}
                  />
               ))}
            </View>
         </View>
      </View>
   );
};

export default MonthlyCalendar;

const styles = ({ colors, size }) =>
   StyleSheet.create({
      monthLyCalendarContainer: {
         width: size.width,
         justifyContent: 'center',
         alignItems: 'center',
         paddingHorizontal: size.width * 0.05,
      },
      calendarContainerInner: {
         paddingVertical: size.s4,
         width: '100%',
         alignItems: 'center',
      },
      calendarBody: {
         width: '100%',
         gap: size.s4,
         paddingTop: size.s1,
      },
   });
