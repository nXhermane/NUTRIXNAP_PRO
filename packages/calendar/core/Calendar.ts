type CalendarMarkerEvent = {
    eventId: string;
    color: string;
    markedDay: string;
};

export default class Calendar {
    private monthInYear: number = 11;
    private weekInMonth: number = 5;
    private daysInWeek: number = 6;
    public Date = null;
    public currentMonth = null;
    public currentYear = null;
    public currentDay = null;
    private eventsMarkerArray: CalendarMarkerEvent[] = [];
    constructor() {
        this.initCalendar();
    }
    getLastDayInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    getDaysInMonth(year, month) {
        const daysArray = [];
        const lastDay = this.getLastDayInMonth(year, month);
        let count = 1;
        while (count <= lastDay) {
            daysArray.push(count);
            count++;
        }
        return daysArray;
    }
    getYearDaysPerMonth(year) {
        const daysPerMonthArray = [];
        let countMonth = 0;
        while (countMonth <= this.monthInYear) {
            const daysInMonthArray = this.getDaysInMonth(year, countMonth);
            daysPerMonthArray.push({
                monthId: countMonth,
                days: daysInMonthArray
            });
            countMonth++;
        }
        return daysPerMonthArray;
    }
    getDayType(year, month, day) {
        return new Date(year, month, day).getDay();
    }
    initCalendar(year) {
        if (year) {
            this.Date = new Date(year, 0, 1);
        } else {
            this.Date = new Date();
        }
        this.currentYear = this.Date.getFullYear();
        this.currentMonth = this.Date.getMonth();
        this.currentDay = this.Date.getDate();
    }

    update() {
        this.currentYear = this.Date.getFullYear();
        this.currentMonth = this.Date.getMonth();
        this.currentDay = this.Date.getDate();
    }

    nextDay() {
        this.Date.setDate(this.currentDay + 1);
        this.update();
    }
    prevDay() {
        this.Date.setDate(this.currentDay - 1);
        this.update();
    }
    nextMonth(month) {
        if (!month) {
            this.Date.setMonth(this.currentMonth + 1);
        } else if (month >= 0 && month <= 11) {
            this.Date.setMonth(month);
        } else {
            this.Date.setMonth(this.currentMonth + 1);
        }

        this.update();
    }
    prevMonth(month) {
        if (!month) {
            this.Date.setMonth(this.currentMonth - 1);
        } else if (month >= 0 && month <= 11) {
            this.Date.setMonth(month);
        } else {
            this.Date.setMonth(this.currentMonth - 1);
        }
        this.update();
    }
    nextYear(year) {
        if (year) {
            this.Date.setFullYear(year);
        } else {
            this.Date.setFullYear(this.currentYear + 1);
        }
        this.Date.setMonth(0);
        this.Date.setDate(1);
        this.update();
    }
    prevYear(year) {
        if (year) {
            this.Date.setFullYear(year);
        } else {
            this.Date.setFullYear(this.currentYear + 1);
        }
        this.Date.setMonth(11);
        this.Date.setDate(1);
        this.update();
    }

    getCurrentYearDays() {
        return this.getYearDaysPerMonth(this.currentYear);
    }
    getCurrentMonthDays() {
        return this.getDaysInMonth(this.currentYear, this.currentMonth);
    }
    setEventMarkerArray(eventsMarkerArray: CalendarMarkerEvent[]) {
        this.eventsMarkerArray = eventsMarkerArray;
    }
    generateMonthDataForCalendar(year, month) {
        const date = new Date(year, month, 1);
        const firstDay = date.getDate();
        const firstDayType = date.getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();
        let currentDay = firstDay;
        let monthDataArray = [];
        let isActive = false;
        let countWeek = 0;
        let firstPassage = true;
        while (countWeek <= this.weekInMonth) {
            let week = {
                weekId: countWeek,
                days: []
            };
            let weekIsNotAllNullDay = false;
            let countDays = 0;
            while (countDays <= this.daysInWeek) {
                const localCurrentDay = new Date().toDateString();
                const currentDate = new Date(
                    year,
                    month,
                    currentDay
                ).toDateString();
                let dateString =
                    year +
                    "-" +
                    (month < 10 ? "0" : "") +
                    month +
                    "-" +
                    (currentDay < 10 ? "0" : "") +
                    currentDay;
                let day = {
                    dayId: countDays,
                    value: null,
                    isActive: false,
                    dateString: dateString,
                    events: this.eventsMarkerArray.filter(
                        (item: CalendarMarkerEvent) =>
                            item.markedDay === dateString
                    )
                };
                if (localCurrentDay === currentDate) {
                    day.isActive = true;
                    isActive = true;
                }
                if (countDays === firstDayType && firstPassage) {
                    day.value = currentDay;
                    weekIsNotAllNullDay = true;
                    firstPassage = false;
                    currentDay++;
                } else if (!firstPassage && currentDay <= lastDay) {
                    day.value = currentDay;
                    weekIsNotAllNullDay = true;
                    currentDay++;
                }
                week.days.push(day);
                countDays++;
            }
            if (weekIsNotAllNullDay) monthDataArray.push(week);
            countWeek++;
        }
        return [monthDataArray, isActive];
    }
    generateCurrentMonthDataForCalendar() {
        return this.generateMonthDataForCalendar(
            this.currentYear,
            this.currentMonth
        );
    }
    generateYearDataForCalendar(year) {
        const yearData = {};
        let currentMonth = 0;
        while (currentMonth <= this.monthInYear) {
            const [monthArray, isActive] = this.generateMonthDataForCalendar(
                year,
                currentMonth
            );
            const month = {
                monthId: currentMonth,
                weeks: monthArray,
                isActive: isActive,
                key: year + "-" + currentMonth,
                dateString: this.getMonthNames()[currentMonth] + " " + year
            };
            yearData[year + "-" + currentMonth] = month;
            currentMonth++;
        }

        return yearData;
    }
    generateDataForCalendarFromMaxAndMinYear(minYear, maxYear) {
        const start = Date.now();
        let data = {};

        while (minYear <= maxYear) {
            const yearData = this.generateYearDataForCalendar(minYear);

            data = { ...data, ...yearData };

            minYear++;
        }
        const end = Date.now();
        console.log('CALENDARDATA EsT Generer',end - start, "ms");
        return data;
    }
    generateCurrentYearDataForCalendar() {
        return this.generateYearDataForCalendar(this.currentYear);
    }
    getDateFromStringFormat(dateString) {
        "worklet";
        const date = dateString.split("-");
        return date.map(item => Number(item));
    }

    formatDate(charater, year, month) {
        return year + charater + month;
    }
    getMonthNames(localizedCode, monthNameType = "long") {
        const date = new Date();
        const options = { month: monthNameType };
        const months = [];
        for (let month = 0; month <= this.monthInYear; month++) {
            date.setMonth(month);
            months.push(date.toLocaleDateString(localizedCode, options));
        }
        return months;
    }
    getDayNames() {
        const daysInWeek = [
            { name: "Dim" },
            { name: "Lun" },
            { name: "Mar" },
            { name: "Mer" },
            { name: "Jeu" },
            { name: "Ven" },
            { name: "Sam" }
        ];

        return daysInWeek.map(item => item.name);
    }
}
