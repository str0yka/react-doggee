import { Link } from 'react-router-dom';

import { Button, ThemeButton } from '~common/buttons';
import { Input, PasswordInput, Checkbox } from '~common/fields';
import { api } from '~utils/api';
import { ROUTES } from '~utils/consts';
import { getClassName, setCookie } from '~utils/helpers';
import { useForm, useMutation } from '~utils/hooks';
import { IntlText, useIntl } from '~features/intl';
import { useTheme } from '~features/theming';

import s from './LoginPage.module.scss';

interface LoginFormValues {
  username: string;
  password: string;
  notMyComputer: boolean;
}

interface User {
  id: string;
  username: string;
  password: string;
}

export const LoginPage = () => {
  const { theme } = useTheme();
  const { translateMessage } = useIntl();

  const {
    mutation: authMutaion,
    isLoading: authLoading,
    isError: authError,
  } = useMutation<ApiResponse<User>, LoginFormValues>((values) => api.post('/auth', values));

  const { values, errors, setFieldValue, handleSubmit } = useForm<LoginFormValues>({
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

  return (
    <main className={s.page}>
      <ThemeButton className={s.themeButton} />
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
            to={ROUTES.REGISTRATION}
          >
            <IntlText path="page.login.createNewAccount" />
          </Link>
        </div>
      </section>
    </main>
  );
};
