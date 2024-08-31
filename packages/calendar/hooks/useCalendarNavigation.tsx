import useCalendarInitialization from './useCalendarInitialization';
import React, { useEffect } from 'react';
const useCalendarNavigation = (calendar) => {
   const navigationFunctions = {
      nD: () => calendar.nextDay(),
      pD: () => calendar.prevDay(),
      nM: (customMonth) => calendar.nextMonth(customMonth),
      pM: (customMonth) => calendar.prevMonth(customMonth),
      nY: (custormYear) => calendar.nextYear(custormYear),
      pY: (custormYear) => calendar.prevYear(custormYear),
   };

   return [navigationFunctions, calendar];
};

export default useCalendarNavigation;
