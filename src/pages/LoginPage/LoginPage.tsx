import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '~common/buttons';
import { Input, PasswordInput, Checkbox } from '~common/fields';
import { api } from '~utils/api';
import { getClassName, setCookie } from '~utils/helpers';
import { useMutation } from '~utils/hooks';
import { IntlText, useIntl } from '~features/intl';
import { useTheme } from '~features/theming';

import s from './LoginPage.module.scss';

interface LoginCredentials {
  username: string;
  password: string;
  notMyComputer: boolean;
}

const validateIsEmpty = (value: string) => {
  if (!value) return 'field required';
  return null;
};

const validateUsername = (value: string) => {
  return validateIsEmpty(value);
};

const validatePassword = (value: string) => {
  return validateIsEmpty(value);
};

const loginFormValidateSchema: Record<
  keyof Omit<LoginCredentials, 'notMyComputer'>,
  (value: string) => string | null
> = {
  username: validateUsername,
  password: validatePassword,
};

const validateLoginForm = (name: keyof Omit<LoginCredentials, 'notMyComputer'>, value: string) => {
  return loginFormValidateSchema[name](value);
};

type ApiSuccessResponse<T> = {
  data: T;
  success: true;
};

type ApiFailedResponse = {
  data: { message: string };
  success: false;
};

type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailedResponse;

interface User {
  id: string;
  username: string;
  password: string;
}

export const LoginPage = () => {
  const { theme, changeTheme } = useTheme();
  const { translateMessage } = useIntl();
  const [formValues, setFormValues] = useState<LoginCredentials>({
    username: '',
    password: '',
    notMyComputer: false,
  });

  const [formErrors, setFormErrors] = useState<
    Record<keyof Omit<LoginCredentials, 'notMyComputer'>, null | string>
  >({
    username: null,
    password: null,
  });

  const {
    mutation: authMutaion,
    isLoading: authLoading,
    isError: authError,
  } = useMutation<ApiResponse<User>, LoginCredentials>((values) => api.post('/auth', values));

  const getFieldProps = (field: keyof Omit<LoginCredentials, 'notMyComputer'>) => {
    const value = formValues[field];
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const error = validateLoginForm(field, event.target.value);
      setFormErrors((prev) => ({ ...prev, [field]: error }));
      setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
    };

    return { value, onChange };
  };

  return (
    <main className={s.page}>
      <button onClick={() => changeTheme(theme === 'light' ? 'dark' : 'light')}>
        CHANGE THEME
      </button>
      <section className={s.container}>
        <div className={getClassName(s.headerContainer, s[theme])}>DOGGEE</div>
        <form
          className={s.formContainer}
          onSubmit={async (event) => {
            event.preventDefault();
            const response = await authMutaion(formValues);
            console.log(formValues);
            if (response?.success) {
              setCookie(
                'doggee-not-my-device',
                formValues.notMyComputer ? Date.now() + 1000 * 60 : Date.now() + 1000 * 60 * 30,
              );
            }
          }}
        >
          {authError && <span>erorr: {authError}</span>}
          <div className={s.inputContainer}>
            <Input
              label={translateMessage('input.label.username')}
              disabled={authLoading}
              {...getFieldProps('username')}
              {...(formErrors.username && {
                isError: !!formErrors.username,
                helperText: formErrors.username,
              })}
            />
          </div>
          <div className={s.inputContainer}>
            <PasswordInput
              label={translateMessage('input.label.password')}
              disabled={authLoading}
              {...getFieldProps('password')}
              {...(formErrors.password && {
                isError: !!formErrors.password,
                helperText: formErrors.password,
              })}
            />
          </div>
          <div>
            <Checkbox
              label={translateMessage('input.label.notMyDevice')}
              disabled={authLoading}
              checked={formValues.notMyComputer}
              onChange={(event) =>
                setFormValues((prev) => ({ ...prev, notMyComputer: event.target.checked }))
              }
            />
          </div>
          <Button
            isLoading={authLoading}
            type="submit"
          >
            <IntlText path="button.signIn" />
          </Button>
        </form>
        <div className={s.signUpContainer}>
          <Link
            className={s.signUpLink}
            to="/registration"
          >
            <IntlText path="page.login.createNewAccount" />
          </Link>
        </div>
      </section>
    </main>
  );
};
