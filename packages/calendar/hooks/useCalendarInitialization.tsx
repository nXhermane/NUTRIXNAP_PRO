import React, { useRef } from 'react';
import Calendar from '../core/Calendar.ts';

const useCalendarInitialization = (initialYear) => {
  const calendar = useRef(new Calendar(initialYear));
  const initializeCalendar = () => {
    calendar.current.initCalendar(initialYear);
  };

  return [initializeCalendar, calendar.current];
};

export default useCalendarInitialization;