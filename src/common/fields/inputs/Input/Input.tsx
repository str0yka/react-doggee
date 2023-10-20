import { forwardRef } from 'react';

import { getClassName } from '~utils/helpers';

import s from './Input.module.scss';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, isError, helperText, mask, onChange, indicator, ...props }, ref) => (
    <>
      <label
        aria-disabled={props.disabled}
        className={getClassName(s.inputContainer, isError && s.error)}>
        <input
          {...props}
          ref={ref}
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
  ),
);

interface InputWrapperProps {
  children: React.ReactNode;
}

export const InputWrapper: React.FC<InputWrapperProps> = ({ children }) => (
  <div className={s.inputWrapper}>{children}</div>
);
