import useCalendarInitialization from "./useCalendarInitialization";
import React, { useEffect } from "react";
const useCalendarData = calendar => {
    const getData = {
        CM: () => calendar.generateCurrentMonthDataForCalendar(),
        CY: () => calendar.generateCurrentYearDataForCalendar(),
        M: (year, month) => calendar.generateMonthDataForCalendar(),
        Y: year => calendar.generateYearDataForCalendar(year),
        WDN: () => calendar.getDayNames(),
        MN: (localizedCode, monthNameType) =>
            calendar.getMonthNames(localizedCode, monthNameType),
        FDate: (char, year, month) => calendar.formatDate(char, year, month),
        DateFromString: dateString =>
            calendar.getDateFromStringFormat(dateString)
    };
    return [getData, calendar];
};

export default useCalendarData;
