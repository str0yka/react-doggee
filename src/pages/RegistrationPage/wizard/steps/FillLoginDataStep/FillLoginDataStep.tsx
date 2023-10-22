import { Link } from 'react-router-dom';

import { Button } from '~common/buttons';
import { Input, PasswordInput } from '~common/fields';
import { IntlText, useIntl } from '~features/intl';
import { api } from '~utils/api';
import { ROUTES } from '~utils/consts';
import { useUser } from '~utils/contexts';
import { useForm, useMutation } from '~utils/hooks';

import { useStep } from '../../../contexts';
import { RegistrationWizardContainer } from '../../RegistrationWizardContainer/RegistrationWizardContainer';

import s from './FillLoginDataStep.module.scss';
import { Rules } from './components';
import { PASSWORD_AGAIN_RULES, PASSWORD_RULES } from './constants';
import { validatePassword } from './helpers';

type RegistrationValues = {
  username: string;
  password: string;
  passwordAgain: string;
};

export const FillLoginDataStep = () => {
  const { setUser } = useUser();
  const { toNextStep } = useStep();

  const intl = useIntl();

  const { mutation: registrationMutaion, isLoading: registrationLoading } = useMutation<
    ApiResponse<User>,
    Omit<RegistrationValues, 'passwordAgain'>
  >((values) => api.post('/registration', values));

  const { values, errors, handleSubmit, setFieldValue } = useForm<RegistrationValues>({
    initialValues: {
      username: '',
      password: '',
      passwordAgain: ''
    },
    onSubmit: async (val) => {
      try {
        const { passwordAgain, ...user } = val;
        const response = await registrationMutaion(user);
        if (response?.success) {
          setUser(response.data);
          toNextStep();
        }
      } catch (error) {
        console.log(error);
      }
    },
    validateSchema: {
      password: validatePassword,
      passwordAgain: (passwordAgain) => {
        if (passwordAgain !== values.password) return 'password must match';
        return null;
      }
    }
  });

  return (
    <RegistrationWizardContainer
      form={{
        title: <IntlText path='page.registration.fillYourLoginData' />,
        content: (
          <form
            className={s.formContainer}
            onSubmit={handleSubmit}
          >
            <div>
              <Input
                disabled={registrationLoading}
                helperText={errors.username || ''}
                isError={!!errors.username}
                label={intl.translateMessage('input.label.username')}
                value={values.username}
                onChange={(event) => setFieldValue('username', event.target.value)}
              />
            </div>
            <div>
              <PasswordInput
                disabled={registrationLoading}
                label={intl.translateMessage('input.label.password')}
                value={values.password}
                onChange={(event) => setFieldValue('password', event.target.value)}
                {...(errors.password && {
                  isError: !!errors.password,
                  helperText: errors.password
                })}
              />
            </div>
            <div>
              <PasswordInput
                disabled={registrationLoading}
                label={intl.translateMessage('input.label.passwordAgain')}
                value={values.passwordAgain}
                onChange={(event) => setFieldValue('passwordAgain', event.target.value)}
                {...(errors.passwordAgain && {
                  isError: !!errors.passwordAgain,
                  helperText: errors.passwordAgain
                })}
              />
            </div>
            <Button
              isLoading={registrationLoading}
              type='submit'
            >
              <IntlText path='button.done' />
            </Button>
          </form>
        )
      }}
      panel={{
        data: (
          <>
            <Rules
              rules={PASSWORD_RULES(values.password)}
              titleIntlPath='page.registration.passwordRules.passwordMust'
            />
            <Rules rules={PASSWORD_AGAIN_RULES(values.password, values.passwordAgain)} />
          </>
        ),
        footer: (
          <Link to={ROUTES.LOGIN}>
            <IntlText path='page.registration.alreadyHaveAccount' />
          </Link>
        )
      }}
    />
  );
};
