import { useState, useMemo } from 'react';
import {
  createMonth,
  createYear,
  getClassName,
  getMonthsNames,
  getWeekDaysNames,
} from '~utils/helpers';

import s from './Calendar.module.scss';
import { ArrowIcon } from '~common/icons';

const locale = 'ru-RU';

export const Caledar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const monthsNames = useMemo(() => getMonthsNames(locale), []);
  const weekDaysNames = useMemo(() => getWeekDaysNames(2, locale), []);
  const year = useMemo(
    () =>
      createYear({
        monthNumber: selectedDate.getMonth() + 1,
        year: selectedDate.getFullYear(),
        locale,
      }),
    [],
  );
  const months = useMemo(() => year.createYearMonths(), [year]);
  const month = useMemo(() => createMonth({ date: selectedDate, locale }), []);
  const days = useMemo(() => month.createMonthDays(), []);

  console.log('monthsNames: ', monthsNames);
  console.log('weekDaysNames: ', weekDaysNames);
  console.log('year: ', year);
  console.log('months: ', months);
  console.log('month: ', month);
  console.log('days: ', days);

  return (
    <div className={s.calendarContainer}>
      <div className={s.calendarHeaderContainer}>
        <button className={getClassName(s.calendarHeaderArrow, s.calendarHeaderArrowLeft)}>
          <ArrowIcon />
        </button>
        <button className={s.calendarHeaderTitle}>{month.monthName}</button>
        <button
          className={getClassName(getClassName(s.calendarHeaderArrow, s.calendarHeaderArrowRight))}
        >
          <ArrowIcon />
        </button>
      </div>
      <div className={s.calendarBodyContainer}>
        <ul className={s.calendarWeekDaysContainer}>
          {weekDaysNames.map((weekDay) => (
            <li
              key={weekDay.day}
              className={s.calendarWeekDayItem}
            >
              <span className={s.calendarWeekDay}>{weekDay.dayShort}</span>
            </li>
          ))}
        </ul>
        <ul className={s.calendarDaysContainer}>
          {days.map((day) => (
            <li
              key={day.timestamp}
              className={getClassName(
                s.calendarDayItem,
                day.dayNumber === new Date().getDate() && s.calendarDayItemToday, // TODO: сравнивается число, а не дата (21 сентября 2022 === 21 сентября 2023)
              )}
            >
              <span className={s.calendarDay}>{day.dayNumber}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
