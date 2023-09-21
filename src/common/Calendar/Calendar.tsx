import { useState, useMemo } from 'react';
import {
  checkDateIsEqual,
  checkIsThisMonth,
  checkIsToday,
  checkMonthsIsEqual,
  createDate,
  createMonth,
  getClassName,
  getMonthNumberOfDays,
  getMonthsNames,
  getWeekDaysNames,
} from '~utils/helpers';
import { ArrowIcon } from '~common/icons';

import s from './Calendar.module.scss';

const locale = 'ru-RU';

export const Caledar = () => {
  const [mode, setMode] = useState<'days' | 'months' | 'years'>('days');

  const [selectedDate, setSelectedDate] = useState(createDate());
  const [selectedMonth, setSelectedMonth] = useState(
    createDate({ date: selectedDate.date, locale }),
  );
  const [selectedYear, setSelectedYear] = useState(selectedDate.year);
  const monthsNames = getMonthsNames(locale);
  const weekDaysNames = useMemo(() => getWeekDaysNames(2, locale), []);
  const month = useMemo(() => createMonth({ date: selectedMonth.date, locale }), [selectedMonth]);
  const days = useMemo(() => month.createMonthDays(), [month]);

  console.log('monthsNames: ', monthsNames);

  const calendarDays = useMemo(() => {
    const prevMonth = createMonth({
      date: new Date(selectedMonth.year, selectedMonth.monthIndex - 1, 1),
      locale,
    });
    const nextMonth = createMonth({
      date: new Date(selectedMonth.year, selectedMonth.monthIndex + 1, 1),
      locale,
    });

    const countOfDaysInPrevMonth = getMonthNumberOfDays(prevMonth.monthIndex, prevMonth.year);

    const firstDayInCurrentMonth = days[0];

    const calendarTotalCountOfDays = 7 * 6;

    const countOfPrevMonthDays =
      firstDayInCurrentMonth.dayNumberInWeek - 2 < 0
        ? 7 - firstDayInCurrentMonth.dayNumberInWeek - 1
        : firstDayInCurrentMonth.dayNumberInWeek - 2;
    const countOfPNextMonthDays = calendarTotalCountOfDays - (countOfPrevMonthDays + days.length);

    const prevMonthDays = prevMonth
      .createMonthDays()
      .slice(countOfDaysInPrevMonth - 1 - countOfPrevMonthDays, -1);
    const nextMonthDays = nextMonth.createMonthDays().slice(0, countOfPNextMonthDays);

    return [prevMonthDays, days, nextMonthDays].flat();
  }, [selectedMonth]);

  return (
    <div className={s.calendarContainer}>
      <div className={s.calendarHeaderContainer}>
        <button
          className={getClassName(s.calendarHeaderArrow, s.calendarHeaderArrowLeft)}
          type="button"
          onClick={() =>
            setSelectedMonth((prev) =>
              createDate({ date: new Date(prev.year, prev.monthIndex - 1, 1) }),
            )
          }
        >
          <ArrowIcon />
        </button>
        {mode === 'days' && (
          <button
            className={s.calendarHeaderTitle}
            type="button"
            onClick={() => setMode('months')}
          >
            {month.monthName} {month.year}
          </button>
        )}
        {mode === 'months' && (
          <button
            className={s.calendarHeaderTitle}
            type="button"
            onClick={() => setMode('years')}
          >
            {month.year}
          </button>
        )}
        {mode === 'years' && (
          <button
            className={s.calendarHeaderTitle}
            type="button"
          >
            {month.year}
          </button>
        )}
        <button
          className={getClassName(getClassName(s.calendarHeaderArrow, s.calendarHeaderArrowRight))}
          type="button"
          onClick={() =>
            setSelectedMonth((prev) =>
              createDate({ date: new Date(prev.year, prev.monthIndex + 1, 1) }),
            )
          }
        >
          <ArrowIcon />
        </button>
      </div>
      <div className={s.calendarBodyContainer}>
        {mode === 'days' && (
          <>
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
              {calendarDays.map((day) => (
                <li
                  key={day.timestamp}
                  className={getClassName(
                    s.calendarItem,
                    s.calendarItemDay,
                    checkIsToday(day.date) && s.calendarItemToday,
                    checkDateIsEqual(selectedDate.date, day.date) && s.calendarItemSelected,
                  )}
                  onClick={() => setSelectedDate(createDate({ date: day.date, locale }))}
                >
                  <span
                    className={getClassName(
                      s.calendarDay,
                      !checkMonthsIsEqual(day.date, selectedMonth.date) && s.caledarDayAdditional,
                    )}
                  >
                    {day.dayNumber}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
        {mode === 'months' && (
          <ul className={s.calendarMonthsContainer}>
            {monthsNames.map((month) => (
              <li
                key={month.monthIndex}
                className={getClassName(
                  s.calendarItem,
                  s.calendarItemMonth,
                  checkIsThisMonth(month.date) && s.calendarItemToday,
                  checkMonthsIsEqual(month.date, selectedDate.date) && s.calendarItemSelected,
                )}
                onClick={() => {
                  setMode('days');
                  setSelectedMonth(createDate({ date: month.date, locale }));
                }}
              >
                <span className={s.calendarMonth}>{month.monthShort}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
