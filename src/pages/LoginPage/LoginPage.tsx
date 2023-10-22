import { Link } from 'react-router-dom';

import { Button, ThemeButton } from '~common/buttons';
import { Input, PasswordInput, Checkbox } from '~common/fields';
import { IntlText, useIntl } from '~features/intl';
import { useTheme } from '~features/theming';
import { createAuth } from '~utils/api';
import { ROUTES } from '~utils/consts';
import { getClassName, setCookie } from '~utils/helpers';
import { useForm, useMutation } from '~utils/hooks';

import s from './LoginPage.module.scss';

type LoginFormValues = {
  username: string;
  password: string;
  notMyComputer: boolean;
};

export const LoginPage = () => {
  const { theme } = useTheme();
  const intl = useIntl();

  const {
    mutation: authMutaion,
    isLoading: authLoading,
    isError: authError
  } = useMutation<ApiResponse<User>, LoginFormValues>(createAuth);

  const { values, errors, setFieldValue, handleSubmit } = useForm<LoginFormValues>({
    initialValues: {
      username: '',
      password: '',
      notMyComputer: false
    },
    onSubmit: async (val) => {
      try {
        const response = await authMutaion(val);
        if (!response?.success) return;

        if (val.notMyComputer) {
          setCookie('doggee-not-my-device', Date.now() + 1000 * 60);
        }
      } catch (error) {
        console.log(error);
      }
    }
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
              disabled={authLoading}
              helperText={errors.username || ''}
              isError={!!errors.username}
              label={intl.translateMessage('input.label.username')}
              value={values.username}
              onChange={(event) => setFieldValue('username', event.target.value)}
            />
          </div>
          <div className={s.inputContainer}>
            <PasswordInput
              disabled={authLoading}
              helperText={errors.password || ''}
              isError={!!errors.password}
              label={intl.translateMessage('input.label.password')}
              value={values.password}
              onChange={(event) => setFieldValue('password', event.target.value)}
            />
          </div>
          <div>
            <Checkbox
              checked={values.notMyComputer}
              disabled={authLoading}
              label={intl.translateMessage('input.label.notMyDevice')}
              onChange={(event) => setFieldValue('notMyComputer', event.target.checked)}
            />
          </div>
          <Button
            isLoading={authLoading}
            type='submit'
          >
            <IntlText path='button.signIn' />
          </Button>
        </form>
        <div className={s.signUpContainer}>
          <Link
            className={s.signUpLink}
            to={ROUTES.REGISTRATION}
          >
            <IntlText path='page.login.createNewAccount' />
          </Link>
        </div>
      </section>
    </main>
  );
};
