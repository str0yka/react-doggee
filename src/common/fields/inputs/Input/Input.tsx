import { getClassName } from '~utils/helpers';

import s from './Input.module.scss';

export const Input: React.FC<InputProps> = ({
  label,
  isError,
  helperText,
  mask,
  onChange,
  indicator,
  ...props
}) => (
  <>
    <label
      aria-disabled={props.disabled}
      className={getClassName(s.inputContainer, isError && s.error)}
    >
      <input
        {...props}
        className={s.input}
        onChange={(event) => {
          if (!onChange || (mask && !mask.test(event.target.value))) return;
          onChange(event);
        }}
      />
      <label className={s.label}>{label}</label>
      {indicator}
    </label>
    {isError && helperText && <p className={s.helperText}>{helperText}</p>}
  </>
);
