import { useState } from 'react';

import { EyeCrossedIcon, EyeIcon } from '~common/icons';
import { getClassName } from '~utils/helpers';

import inputStyles from '../Input.module.scss';
import s from './PasswordInput.module.scss';

interface PasswordInputProps extends Omit<InputProps, 'type'> {}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  isError,
  helperText,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const showPasswordToggle = props.value;

  return (
    <>
      <label className={getClassName(inputStyles.inputContainer, isError && inputStyles.error)}>
        <input
          {...props}
          className={inputStyles.input}
          type={showPassword ? 'text' : 'password'}
        />
        <label className={inputStyles.inputLabel}>{label}</label>
        {showPasswordToggle && (
          <button
            className={s.passwordToggle}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeCrossedIcon /> : <EyeIcon />}
          </button>
        )}
      </label>
      {isError && helperText && <p className={inputStyles.helperText}>{helperText}</p>}
    </>
  );
};
