import { CalendarIcon } from '~common/icons';

import { Input } from '../Input/Input';
import s from './DateInput.module.scss';

interface DateInputProps extends Omit<InputProps, 'type'> {}

export const DateInput: React.FC<DateInputProps> = (props) => (
  <Input
    {...props}
    type="text"
    indicator={<CalendarIcon className={s.indicator} />}
  />
);
