import { useMemo, useState } from 'react';
import { createDate, createMonth, getMonthsNames, getWeekDaysNames } from '~utils/helpers';

interface UseCalendarParams {
  locale?: string;
  selectedDate: Date;
  firstWeekDayNumber?: number;
}

const DAYS_IN_WEEK = 7;
const TOTAL_CALENDAR_DAYS = 7 * 6; // 7 days in week * 6 rows in calendar

const getYearInterval = (year: number) => {
  const startYear = Math.floor(year / 10) * 10 - 1;
  return new Array(12).fill(null).map((_, i) => startYear + i);
};

export const useCalendar = ({
  locale = 'default',
  selectedDate: date,
  firstWeekDayNumber = 2,
}: UseCalendarParams) => {
  const [mode, setMode] = useState<'days' | 'months' | 'years'>('days');
  const [selectedDay, setSelectedDay] = useState(createDate({ date, locale }));
  const [selectedMonth, setSelectedMonth] = useState(
    createMonth({ date: new Date(selectedDay.year, selectedDay.monthIndex), locale }),
  );
  const [selectedYear, setSelectedYear] = useState(selectedDay.year);
  const [selectedYearInterval, setSelectedYearInterval] = useState(
    getYearInterval(selectedDay.year),
  );

  const monthsNames = useMemo(() => getMonthsNames(locale), []);
  const weekDaysNames = useMemo(() => getWeekDaysNames(firstWeekDayNumber, locale), []);

  const days = useMemo(() => selectedMonth.createMonthDays(), [selectedMonth, selectedYear]);

  const calendarDays = useMemo(() => {
    const prevMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex - 1),
      locale,
    }).createMonthDays();

    const nextMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex + 1),
      locale,
    }).createMonthDays();

    const firstDay = days[0];

    const numberOfPrevDays =
      firstDay.dayNumberInWeek - 2 < 0
        ? DAYS_IN_WEEK - firstDay.dayNumberInWeek - 1
        : firstDay.dayNumberInWeek - 2;

    const numberOfNextDays = TOTAL_CALENDAR_DAYS - days.length - numberOfPrevDays;

    const result = [];

    for (let i = 0; i < numberOfPrevDays; i++) {
      const inverted = numberOfPrevDays - i;
      result[i] = prevMonthDays[prevMonthDays.length - inverted];
    }

    for (let i = numberOfPrevDays; i < TOTAL_CALENDAR_DAYS - numberOfNextDays; i++) {
      result[i] = days[i - numberOfPrevDays];
    }

    for (let i = TOTAL_CALENDAR_DAYS - numberOfNextDays; i < TOTAL_CALENDAR_DAYS; i++) {
      result[i] = nextMonthDays[i - (TOTAL_CALENDAR_DAYS - numberOfNextDays)];
    }

    return result;
  }, [selectedMonth, selectedYear]);

  const setSelectedMonthByIndex = (monthIndex: number) => {
    setSelectedMonth(createMonth({ date: new Date(selectedYear, monthIndex) }));
  };

  const onClickArrow = (direction: 'left' | 'right') => {
    if (mode === 'years') {
      const newFirstYearOfInterval =
        direction === 'left' ? selectedYearInterval[1] - 10 : selectedYearInterval[1] + 10;
      setSelectedYearInterval(getYearInterval(newFirstYearOfInterval));
      return;
    }

    if (mode === 'months') {
      const newSelectedYear = direction === 'left' ? selectedYear - 1 : selectedYear + 1;
      if (!selectedYearInterval.includes(newSelectedYear)) {
        setSelectedYearInterval(getYearInterval(newSelectedYear));
      }
      setSelectedYear(newSelectedYear);
      return;
    }

    if (mode === 'days') {
      const newMonthIndex =
        direction === 'left' ? selectedMonth.monthIndex - 1 : selectedMonth.monthIndex + 1;

      if (newMonthIndex < 0) {
        const newSelectedYear = selectedYear - 1;
        const lastMonthIndex = 11;
        if (!selectedYearInterval.includes(newSelectedYear)) {
          setSelectedYearInterval(getYearInterval(newSelectedYear));
        }
        setSelectedYear(newSelectedYear);
        setSelectedMonth(createMonth({ date: new Date(newSelectedYear, lastMonthIndex), locale }));
        return;
      }

      if (newMonthIndex > 11) {
        const newSelectedYear = selectedYear + 1;
        const firstMonthIndex = 0;
        if (!selectedYearInterval.includes(newSelectedYear)) {
          setSelectedYearInterval(getYearInterval(newSelectedYear));
        }
        setSelectedYear(newSelectedYear);
        setSelectedMonth(createMonth({ date: new Date(newSelectedYear, firstMonthIndex), locale }));
        return;
      }

      setSelectedMonthByIndex(newMonthIndex);
    }
  };

  return {
    state: {
      mode,
      selectedDay,
      selectedMonth,
      selectedYear,
      selectedYearInterval,
      calendarDays,
      weekDaysNames,
      monthsNames,
    },
    functions: {
      onClickArrow,
      setMode,
      setSelectedDay,
      setSelectedMonth,
      setSelectedMonthByIndex,
      setSelectedYear,
    },
  };
};
