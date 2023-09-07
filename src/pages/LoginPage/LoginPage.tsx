import { Link } from 'react-router-dom';

import { Button } from '~common/buttons';
import { Input, PasswordInput, Checkbox } from '~common/fields';
import { MoonIcon, SunIcon } from '~common/icons';
import { api } from '~utils/api';
import { getClassName, setCookie } from '~utils/helpers';
import { useForm, useMutation } from '~utils/hooks';
import { IntlText, useIntl } from '~features/intl';
import { useTheme } from '~features/theming';

import s from './LoginPage.module.scss';

interface LoginValues {
  username: string;
  password: string;
  notMyComputer: boolean;
}

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

  const {
    mutation: authMutaion,
    isLoading: authLoading,
    isError: authError,
  } = useMutation<ApiResponse<User>, LoginValues>((values) => api.post('/auth', values));

  const { values, errors, setFieldValue, handleSubmit } = useForm<LoginValues>({
    initialValues: {
      username: '',
      password: '',
      notMyComputer: false,
    },
    onSubmit: async (values) => {
      try {
        const response = await authMutaion(values);
        if (!response?.success) return;

        if (values.notMyComputer) {
          setCookie('doggee-not-my-device', Date.now() + 1000 * 60);
        }
      } catch (error) {}
    },
    validateSchema: {
      username: (value) => (value === 'nikita' ? 'bad name bro' : null),
      password: (value) => (value === 'warface12' ? 'bad password bro' : null),
    },
  });

  console.log('values: ', values);
  console.log('errors: ', errors);

  return (
    <main className={s.page}>
      <button
        className={s.themeButton}
        onClick={() => changeTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? <SunIcon /> : <MoonIcon />}
      </button>
      <section className={s.container}>
        <div className={getClassName(s.headerContainer, s[theme])}>DOGGEE</div>
        <form
          className={s.formContainer}
          onSubmit={handleSubmit}
        >
          {authError && <span>erorr: {authError}</span>}
          <div className={s.inputContainer}>
            <Input
              label={translateMessage('input.label.username')}
              disabled={authLoading}
              isError={!!errors.username}
              helperText={errors.username || ''}
              value={values.username}
              onChange={(event) => setFieldValue('username', event.target.value)}
            />
          </div>
          <div className={s.inputContainer}>
            <PasswordInput
              label={translateMessage('input.label.password')}
              disabled={authLoading}
              isError={!!errors.password}
              helperText={errors.password || ''}
              value={values.password}
              onChange={(event) => setFieldValue('password', event.target.value)}
            />
          </div>
          <div>
            <Checkbox
              label={translateMessage('input.label.notMyDevice')}
              disabled={authLoading}
              checked={values.notMyComputer}
              onChange={(event) => setFieldValue('notMyComputer', event.target.checked)}
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
