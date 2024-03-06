export default class Calendar {
    monthInYear = 11;
    weekInMonth = 5;
    daysInWeek = 6;
    Date = null;
    currentMonth = null;
    currentYear = null;
    currentDay = null;

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
            let countDays = 0;
            while (countDays <= this.daysInWeek) {
                const localCurrentDay = new Date().toDateString();
                const currentDate = new Date(
                    year,
                    month,
                    currentDay
                ).toDateString();

                let day = {
                    dayId: countDays,
                    value: null,
                    isActive: false,

                    events: []
                };
                if (localCurrentDay === currentDate) {
                    day.isActive = true;
                    isActive = true;
                }
                if (countDays === firstDayType && firstPassage) {
                    day.value = currentDay;
                    firstPassage = false;
                    currentDay++;
                } else if (!firstPassage && currentDay <= lastDay) {
                    day.value = currentDay;
                    currentDay++;
                }
                week.days.push(day);
                countDays++;
            }
            monthDataArray.push(week);
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
        const yearDataArray = {};

        let currentMonth = 0;
        while (currentMonth <= this.monthInYear) {
            const [monthArray, isActive] = this.generateMonthDataForCalendar(
                year,
                currentMonth
            );
            const month = {
                monthId: currentMonth,
                weeks: monthArray,
                isActive: isActive
            };
            yearDataArray[year + "-" + currentMonth] = month;
            currentMonth++;
        }
        return yearDataArray;
    }
    generateCurrentYearDataForCalendar() {
        return this.generateYearDataForCalendar(this.currentYear);
    }
    getDateFromStringFormat(dateString) {
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
            date.setMonth(month - 1);
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
