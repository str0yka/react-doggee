import { useState, useRef } from 'react';

import { CalendarIcon } from '~common/icons';
import { Calendar } from '~common/Calendar/Calendar';
import { createDate, getClassName } from '~utils/helpers';
import { useOnClickOutside } from '~utils/hooks';

import { Input } from '../Input/Input';
import s from './DateInput.module.scss';

interface DateInputProps extends Omit<InputProps, 'type' | 'value'> {
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
  const dateInputContainerRef = useRef(null);

  useOnClickOutside(dateInputContainerRef, () => setIsCalendarVisible(false));

  const showCalendar = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsCalendarVisible(true);
  };

  return (
    <div
      ref={dateInputContainerRef}
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
