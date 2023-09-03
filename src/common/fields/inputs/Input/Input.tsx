import { getClassName } from '~utils/helpers';

import s from '../Input.module.scss';

export const Input: React.FC<InputProps> = ({ isError, helperText, label, ...props }) => (
  <>
    <label
      aria-disabled={props.disabled}
      className={getClassName(s.inputContainer, isError && s.error)}
    >
      <input
        {...props}
        className={s.input}
      />
      <label className={s.label}>{label}</label>
    </label>
    {isError && helperText && <p className={s.helperText}>{helperText}</p>}
  </>
);
