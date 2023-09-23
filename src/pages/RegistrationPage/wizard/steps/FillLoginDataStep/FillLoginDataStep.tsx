import { Link } from 'react-router-dom';

import { Button } from '~common/buttons';
import { Input, PasswordInput, Select } from '~common/fields';
import { IntlText, useIntl } from '~features/intl';
import { useForm, useMutation } from '~utils/hooks';
import { api } from '~utils/api';
import { ROUTES } from '~utils/consts';

import { RegistrationWizardContainer } from '../../RegistrationWizardContainer/RegistrationWizardContainer';
import { RulesList } from '../../../RulesList/RulesList';
import s from './FillLoginDataStep.module.scss';

interface User {
  id: string;
  username: string;
  password: string;
}

const validatePassword = (value: string) => {
  if (value === value.replace(/[0-9]/g, '')) return 'password must contain numbers';
  if (value === value.toUpperCase()) return 'password must contain lowercase letters';
  if (value === value.toLowerCase()) return 'password must contain uppercase letters';
  if (value.length < 8) return 'password must contain at least 8 characters';
  return null;
};

interface FillLoginDataStepProps {
  setStep: (step: 'registration' | 'profile' | 'pets' | 'check') => void; // FIXME
}

const OPTIONS = [
  { label: 'Акита Ину', value: 1, option: 1 },
  { label: 'Мопс', value: 2, option: 2 },
  { label: 'Лабрадор', value: 3, option: 3 },
  { label: 'Такса', value: 4, option: 4 },
  { label: 'Чихуахуа', value: 5, option: 5 },
];

interface RegistrationFormValues {
  username: string;
  password: string;
  passwordAgain: string;
  dogBree: (typeof OPTIONS)[number]['option'];
}

export const FillLoginDataStep: React.FC<FillLoginDataStepProps> = ({ setStep }) => {
  const { translateMessage } = useIntl();

  const { mutation: registrationMutaion, isLoading: registrationLoading } = useMutation<
    ApiResponse<User>,
    Omit<RegistrationFormValues, 'passwordAgain'>
  >((values) => api.post('/registration', values));

  const { values, errors, handleSubmit, setFieldValue, setFieldError } =
    useForm<RegistrationFormValues>({
      initialValues: {
        username: '',
        password: '',
        passwordAgain: '',
        dogBree: 3,
      },
      onSubmit: async (values) => {
        try {
          const { passwordAgain, ...user } = values;
          const response = await registrationMutaion(user);
          if (response?.success) {
            setStep('profile');
          }
        } catch (error) {}
      },
      validateSchema: {
        password: validatePassword,
      },
    });

  const rulesList: RulesList = [
    {
      title: 'page.registration.passwordRules.passwordMust',
      rules: [
        {
          title: 'page.registration.passwordRules.containNumbers',
          isCorrect: values.password !== values.password.replace(/[0-9]/g, ''),
        },
        {
          title: 'page.registration.passwordRules.containUppercase',
          isCorrect: values.password !== values.password.toLowerCase(),
        },
        {
          title: 'page.registration.passwordRules.containLowercase',
          isCorrect: values.password !== values.password.toUpperCase(),
        },
        {
          title: 'page.registration.passwordRules.containAtLeast8Characters',
          isCorrect: values.password.length >= 8,
        },
      ],
    },
    {
      rules: [
        {
          title: 'page.registration.passwordRules.mustMatch',
          isCorrect: values.password === values.passwordAgain,
        },
      ],
    },
  ];

  return (
    <RegistrationWizardContainer
      form={{
        title: <IntlText path="page.registration.fillYourLoginData" />,
        content: (
          <form
            className={s.formContainer}
            onSubmit={handleSubmit}
          >
            <Select
              label="Dog's breed"
              options={OPTIONS}
              option={OPTIONS.find((option) => option.value === values.dogBree)!}
              onChange={(option) => setFieldValue('dogBree', option.option)}
            />
            <div>
              <Input
                label={translateMessage('input.label.username')}
                isError={!!errors.username}
                helperText={errors.username || ''}
                disabled={registrationLoading}
                value={values.username}
                onChange={(event) => setFieldValue('username', event.target.value)}
              />
            </div>
            <div>
              <PasswordInput
                label={translateMessage('input.label.password')}
                isError={!!errors.password}
                helperText={errors.password || ''}
                mask={/^[a-zA-Z0-9!;,.]+$/g}
                disabled={registrationLoading}
                value={values.password}
                onChange={(event) => setFieldValue('password', event.target.value)}
              />
            </div>
            <div>
              <PasswordInput
                label={translateMessage('input.label.passwordAgain')}
                isError={!!errors.passwordAgain}
                helperText={errors.passwordAgain || ''}
                mask={/^[a-zA-Z0-9!;,.]+$/g}
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
              />
            </div>
            <Button
              isLoading={registrationLoading}
              type="submit"
            >
              <IntlText path="button.done" />
            </Button>
          </form>
        ),
      }}
      panel={{
        data: <RulesList rulesList={rulesList} />,
        footer: (
          <Link to={ROUTES.LOGIN}>
            <IntlText path="page.registration.alreadyHaveAccount" />
          </Link>
        ),
      }}
    />
  );
};
