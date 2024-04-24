import { useEffect, useMemo } from "react";
import useCalendarInitialization from "./useCalendarInitialization";

type CalendarMethods = {
  generateCurrentMonthDataForCalendar: () => any;
  generateCurrentYearDataForCalendar: () => any;
  generateMonthDataForCalendar: (year: number, month: number) => any;
  generateYearDataForCalendar: (year: number) => any;
  generateDataForCalendarFromMaxAndMinYear: (minYear: number, maxYear: number) => any;
  getDayNames: () => any;
  getMonthNames: (localizedCode: any, monthNameType: any) => any;
  formatDate: (char: any, year: number, month: number) => any;
  getDateFromStringFormat: (dateString: string) => any;
};

type Calendar = CalendarMethods & { [key: string]: any };

const useCalendarData = (calendar: Calendar): [() => any, Calendar] => {
  const getData = useMemo(() => {
    if (
      !calendar ||
      !("generateCurrentMonthDataForCalendar" in calendar) ||
      !("generateCurrentYearDataForCalendar" in calendar) ||
      !("generateMonthDataForCalendar" in calendar) ||
      !("generateYearDataForCalendar" in calendar) ||
      !("generateDataForCalendarFromMaxAndMinYear" in calendar) ||
      !("getDayNames" in calendar) ||
      !("getMonthNames" in calendar) ||
      !("formatDate" in calendar
