import { useState } from 'react';

import { EyeCrossedIcon, EyeIcon } from '~common/icons';

import { Input } from '../Input/Input';
import s from './PasswordInput.module.scss';

interface PasswordInputProps extends Omit<InputProps, 'type'> {}

export const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const showPasswordToggle = props.value;

  return (
    <Input
      {...props}
      type={showPassword ? 'text' : 'password'}
      indicator={
        showPasswordToggle && (
          <button
            type="button"
            className={s.passwordToggle}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeCrossedIcon /> : <EyeIcon />}
          </button>
        )
      }
    />
  );
};
