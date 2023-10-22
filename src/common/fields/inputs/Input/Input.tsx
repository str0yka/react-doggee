import { forwardRef, useId } from 'react';

import { getClassName } from '~utils/helpers';

import s from './Input.module.scss';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, isError, helperText, mask, onChange, indicator, ...props }, ref) => {
    const id = useId();

    return (
      <>
        <label
          aria-disabled={props.disabled}
          className={getClassName(s.inputContainer, isError && s.error)}
          htmlFor={id}
        >
          <input
            {...props}
            ref={ref}
            className={s.input}
            id={id}
            onChange={(event) => {
              if (!onChange || (mask && !mask.test(event.target.value))) return;
              onChange(event);
            }}
          />
          <label
            className={s.label}
            htmlFor={id}
          >
            {label}
          </label>
          <div className={s.indicatorContainer}>{indicator}</div>
        </label>
        {isError && helperText && <p className={s.helperText}>{helperText}</p>}
      </>
    );
  }
);

interface InputWrapperProps {
  children: React.ReactNode;
}

export const InputWrapper: React.FC<InputWrapperProps> = ({ children }) => (
  <div className={s.inputWrapper}>{children}</div>
);
