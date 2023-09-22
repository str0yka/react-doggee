import {
  checkDateIsEqual,
  checkIsToday,
  createDate,
  createMonth,
  getClassName,
} from '~utils/helpers';
import { ArrowIcon } from '~common/icons';

import s from './Calendar.module.scss';
import { useCalendar } from './hooks/useCalendar';

interface CalendarProps {
  locale?: string;
  firstWeekDayNumber?: number;
  selectedDate: Date;
  selectDate: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  locale = 'default',
  firstWeekDayNumber = 2,
  selectedDate: date,
  selectDate,
}) => {
  const { state, functions } = useCalendar({ locale, firstWeekDayNumber, selectedDate: date });

  return (
    <div className={s.calendarContainer}>
      <div className={s.calendarHeaderContainer}>
        <button
          className={getClassName(s.calendarHeaderArrow, s.calendarHeaderArrowLeft)}
          type="button"
          onClick={() => functions.onClickArrow('left')}
        >
          <ArrowIcon />
        </button>
        {state.mode === 'days' && (
          <button
            className={s.calendarHeaderTitle}
            type="button"
            onClick={() => functions.setMode('months')}
          >
            {state.selectedMonth.monthName} {state.selectedYear}
          </button>
        )}
        {state.mode === 'months' && (
          <button
            className={s.calendarHeaderTitle}
            type="button"
            onClick={() => functions.setMode('years')}
          >
            {state.selectedYear}
          </button>
        )}
        {state.mode === 'years' && (
          <button
            className={s.calendarHeaderTitle}
            type="button"
          >
            {state.selectedYearInterval[1]} - {state.selectedYearInterval[10]}
          </button>
        )}
        <button
          className={getClassName(s.calendarHeaderArrow, s.calendarHeaderArrowRight)}
          type="button"
          onClick={() => functions.onClickArrow('right')}
        >
          <ArrowIcon />
        </button>
      </div>
      <div className={s.calendarBodyContainer}>
        {state.mode === 'days' && (
          <>
            <ul className={s.calendarWeekDaysContainer}>
              {state.weekDaysNames.map((weekDay) => (
                <li
                  key={weekDay.day}
                  className={s.calendarWeekDayItem}
                >
                  <span className={s.calendarWeekDay}>{weekDay.dayShort}</span>
                </li>
              ))}
            </ul>
            <ul className={s.calendarDaysContainer}>
              {state.calendarDays.map((day) => {
                const isToday = checkIsToday(day.date);
                const isSelectedDay = checkDateIsEqual(day.date, state.selectedDay.date);
                const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;

                return (
                  <li
                    key={day.timestamp}
                    className={getClassName(
                      s.calendarItem,
                      s.calendarItemDay,
                      isToday && s.calendarItemToday,
                      isSelectedDay && s.calendarItemSelected,
                    )}
                    onClick={() => {
                      functions.setSelectedDay(createDate({ date: day.date, locale }));
                      selectDate(day.date);
                    }}
                  >
                    <span
                      className={getClassName(
                        s.calendarDay,
                        isAdditionalDay && s.caledarDayAdditional,
                      )}
                    >
                      {day.dayNumber}
                    </span>
                  </li>
                );
              })}
            </ul>
          </>
        )}
        {state.mode === 'months' && (
          <ul className={s.calendarMonthsContainer}>
            {state.monthsNames.map((monthsName) => {
              const isCurrentMonth =
                new Date().getMonth() === monthsName.monthIndex &&
                new Date().getFullYear() === state.selectedYear;
              const isSelectedMonth =
                state.selectedMonth.monthIndex === monthsName.monthIndex &&
                state.selectedYear === state.selectedDay.year;

              return (
                <li
                  key={monthsName.monthIndex}
                  className={getClassName(
                    s.calendarItem,
                    s.calendarItemMonth,
                    isCurrentMonth && s.calendarItemToday,
                    isSelectedMonth && s.calendarItemSelected,
                  )}
                  onClick={() => {
                    functions.setSelectedMonth(
                      createMonth({
                        date: new Date(state.selectedYear, monthsName.monthIndex),
                        locale,
                      }),
                    );
                    functions.setMode('days');
                  }}
                >
                  <span className={s.calendarMonth}>{monthsName.monthShort}</span>
                </li>
              );
            })}
          </ul>
        )}
        {state.mode === 'years' && (
          <ul className={s.calendarYearsContainer}>
            {state.selectedYearInterval.map((year) => {
              const isCurrentYear = new Date().getFullYear() === year;
              const isSelectedYear = state.selectedDay.year === year;
              const isAdditionalYear =
                Math.floor(year / 10) !== Math.floor(state.selectedYearInterval[1] / 10);

              return (
                <li
                  key={year}
                  className={getClassName(
                    s.calendarItem,
                    s.calendarItemMonth,
                    isCurrentYear && s.calendarItemToday,
                    isSelectedYear && s.calendarItemSelected,
                  )}
                  onClick={() => {
                    functions.setSelectedYear(year);
                    functions.setMode('months');
                  }}
                >
                  <span
                    className={getClassName(
                      s.calendarYear,
                      isAdditionalYear && s.caledarYearAdditional,
                    )}
                  >
                    {year}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
