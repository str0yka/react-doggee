import { useState, useEffect } from 'react';

import { CalendarIcon } from '~common/icons';
import { Calendar } from '~common/Calendar/Calendar';

import { Input } from '../Input/Input';
import s from './DateInput.module.scss';
import { createDate, getClassName } from '~utils/helpers';

interface DateInputProps extends Omit<InputProps, 'type'> {
  locale?: string;
  firstWeekDayNumber?: number;
  selectedDate: Date;
  selectDate: (date: Date) => void;
}

export const DateInput: React.FC<DateInputProps> = ({
  locale = 'default',
  firstWeekDayNumber = 2,
  selectedDate,
  selectDate,
  ...props
}) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [date, setDate] = useState(selectedDate);
  const d = createDate({ date, locale });

  const showCalendar = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsCalendarVisible(true);
  };

  useEffect(() => {
    const hideCalendar = () => setIsCalendarVisible(false);

    window.addEventListener('click', hideCalendar);

    return () => {
      window.removeEventListener('click', hideCalendar);
    };
  }, []);

  return (
    <div
      className={s.dateInputContainer}
      onClick={showCalendar}
    >
      <Input
        {...props}
        type="text"
        value={`${d.dayNumber} ${d.monthShort} ${d.year}`}
        indicator={<CalendarIcon className={s.indicator} />}
      />
      <div
        className={getClassName(s.calendarContainer, !isCalendarVisible && s.calendarContainerHide)}
      >
        <Calendar
          locale={locale}
          firstWeekDayNumber={firstWeekDayNumber}
          selectDate={(date) => {
            setDate(date);
            selectDate(date);
          }}
          selectedDate={date}
        />
      </div>
    </div>
  );
};
