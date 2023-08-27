import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Input, PasswordInput, Checkbox } from '~common/fields';
import { Button } from '~common/buttons';

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

export const LoginPage = () => {
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
      <section className={s.container}>
        <div className={s.headerContainer}>DOGGEE</div>
        <div className={s.formContainer}>
          <div className={s.inputContainer}>
            <Input
              label="Username"
              {...getFieldProps('username')}
              {...(formErrors.username && {
                isError: !!formErrors.username,
                helperText: formErrors.username,
              })}
            />
          </div>
          <div className={s.inputContainer}>
            <PasswordInput
              label="Password"
              {...getFieldProps('password')}
              {...(formErrors.password && {
                isError: !!formErrors.password,
                helperText: formErrors.password,
              })}
            />
          </div>
          <div>
            <Checkbox
              label="This is not my device"
              checked={formValues.notMyComputer}
              onChange={(event) =>
                setFormValues((prev) => ({ ...prev, notMyComputer: event.target.checked }))
              }
            />
          </div>
          <Button isLoading={true}>Sign in</Button>
        </div>
        <div className={s.signUpContainer}>
          <Link
            className={s.signUpLink}
            to="/registration"
          >
            Create new account
          </Link>
        </div>
      </section>
    </main>
  );
};
