import { Link } from 'react-router-dom';

import { Button } from '~common/buttons';
import { Input, PasswordInput } from '~common/fields';
import { IntlText, useIntl } from '~features/intl';
import { useForm, useMutation } from '~utils/hooks';
import { api } from '~utils/api';
import { ROUTES } from '~utils/consts';

import { useStep } from '../../../contexts';
import { RegistrationWizardContainer } from '../../RegistrationWizardContainer/RegistrationWizardContainer';
import { Rules } from './components';
import { PASSWORD_AGAIN_RULES, PASSWORD_RULES } from './constants';
import { validatePassword } from './helpers';
import s from './FillLoginDataStep.module.scss';

interface RegistrationValues {
  username: string;
  password: string;
  passwordAgain: string;
}

export const FillLoginDataStep = () => {
  const { toNextStep } = useStep();
  const intl = useIntl();

  const { mutation: registrationMutaion, isLoading: registrationLoading } = useMutation<
    ApiResponse<User>,
    Omit<RegistrationValues, 'passwordAgain'>
  >((values) => api.post('/registration', values));

  const { values, errors, handleSubmit, setFieldValue, setFieldError } =
    useForm<RegistrationValues>({
      initialValues: {
        username: '',
        password: '',
        passwordAgain: '',
      },
      onSubmit: async (values) => {
        try {
          const { passwordAgain, ...user } = values;
          const response = await registrationMutaion(user);
          if (response?.success) {
            toNextStep();
          }
        } catch (error) {}
      },
      validateSchema: {
        password: validatePassword,
      },
    });

  return (
    <RegistrationWizardContainer
      form={{
        title: <IntlText path="page.registration.fillYourLoginData" />,
        content: (
          <form
            className={s.formContainer}
            onSubmit={handleSubmit}>
            <div>
              <Input
                label={intl.translateMessage('input.label.username')}
                isError={!!errors.username}
                helperText={errors.username || ''}
                disabled={registrationLoading}
                value={values.username}
                onChange={(event) => setFieldValue('username', event.target.value)}
              />
            </div>
            <div>
              <PasswordInput
                label={intl.translateMessage('input.label.password')}
                disabled={registrationLoading}
                value={values.password}
                onChange={(event) => setFieldValue('password', event.target.value)}
                {...(errors.password && {
                  isError: !!errors.password,
                  helperText: errors.password,
                })}
              />
            </div>
            <div>
              <PasswordInput
                label={intl.translateMessage('input.label.passwordAgain')}
                disabled={registrationLoading}
                value={values.passwordAgain}
                onChange={(event) => {
                  setFieldValue('passwordAgain', event.target.value);
                  if (values.password !== event.target.value) {
                    setFieldError('passwordAgain', 'passwrods must match');
                  } else {
                    setFieldError('passwordAgain', null);
                  }
                }}
                {...(errors.passwordAgain && {
                  isError: !!errors.passwordAgain,
                  helperText: errors.passwordAgain,
                })}
              />
            </div>
            <Button
              isLoading={registrationLoading}
              type="submit">
              <IntlText path="button.done" />
            </Button>
          </form>
        ),
      }}
      panel={{
        data: (
          <>
            <Rules
              rules={PASSWORD_RULES(values.password)}
              titleIntlPath="page.registration.passwordRules.passwordMust"
            />
            <Rules rules={PASSWORD_AGAIN_RULES(values.password, values.passwordAgain)} />
          </>
        ),
        footer: (
          <Link to={ROUTES.LOGIN}>
            <IntlText path="page.registration.alreadyHaveAccount" />
          </Link>
        ),
      }}
    />
  );
};
