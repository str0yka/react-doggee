import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Input, PasswordInput, Checkbox } from '~common/fields';
import { Button } from '~common/buttons';
import { useMutation, useQueryLazy } from '~utils/hooks';

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
    status: authStatus,
  } = useMutation<ApiResponse<User>, LoginCredentials>(`${import.meta.env.VITE_API_URL}/auth`, {
    method: 'POST',
  });

  const { query, isLoading, isError, status } = useQueryLazy<ApiResponse<User[]>>(
    `${import.meta.env.VITE_API_URL}/users?q=${formValues.username}`,
    {
      dependencies: [formValues.username],
    },
  );

  console.log('isLoading: ', isLoading);
  console.log('isError: ', isError);
  console.log('status: ', status);

  useEffect(() => {
    console.log('changed');
    if (formValues.username === 'qwe') {
      query().then((res) => console.log('response :', res));
    }
  }, [formValues.username]);

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
        <form
          className={s.formContainer}
          onSubmit={async (event) => {
            event.preventDefault();
            const response = await authMutaion(formValues);
            console.log('response: ', response);
          }}
        >
          {authError && (
            <span>
              {authStatus}: {authError}
            </span>
          )}
          <div className={s.inputContainer}>
            <Input
              label="Username"
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
              label="Password"
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
              label="This is not my device"
              disabled={authLoading}
              checked={formValues.notMyComputer}
              onChange={(event) =>
                setFormValues((prev) => ({ ...prev, notMyComputer: event.target.checked }))
              }
            />
          </div>
          <Button
            disabled={authLoading}
            isLoading={authLoading}
            type="submit"
          >
            Sign in
          </Button>
        </form>
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
