import { Link } from 'react-router-dom';

import { Button, ThemeButton } from '~common/buttons';
import { DateInput, Input, PasswordInput } from '~common/fields';
import { api } from '~utils/api';
import { ROUTES } from '~utils/consts';
import { useForm, useMutation } from '~utils/hooks';
import { getClassName, setCookie } from '~utils/helpers';
import { useIntl, IntlText } from '~features/intl';

import { RulesList } from './RulesList/RulesList';
import s from './RegistrationPage.module.scss';
import { useState } from 'react';
import { Calendar } from '~common/Calendar/Calendar';

interface RegistrationFormValues {
  username: string;
  password: string;
  passwordAgain: string;
}

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

export const RegistrationPage = () => {
  const [step, setStep] = useState<'registration' | 'profile' | 'pets' | 'check'>('registration');

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

  if (step === 'registration') {
    return (
      <main className={s.page}>
        <ThemeButton className={s.themeButton} />
        <form
          className={s.formContainer}
          onSubmit={handleSubmit}
        >
          <h1 className={s.formTitle}>
            <IntlText path="page.registration.fillYourLoginData" />
          </h1>
          <Calendar
            locale="default"
            selectDate={(date) => console.log('date: ', date)}
            selectedDate={new Date()}
            firstWeekDayNumber={2}
          />
          <div className={s.inputContainer}>
            {/* <Input
              label={translateMessage('input.label.username')}
              isError={!!errors.username}
              helperText={errors.username || ''}
              disabled={registrationLoading}
              value={values.username}
              onChange={(event) => setFieldValue('username', event.target.value)}
            /> */}
            <DateInput label="Your birthday" />
          </div>
          <div className={s.inputContainer}>
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
          <div className={s.inputContainer}>
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
        <div className={s.panelContainer}>
          <div className={getClassName(s.headerContainer)}>DOGGEE</div>
          <div className={s.panelDataContainer}>
            <RulesList rulesList={rulesList} />
          </div>
          <div className={s.signInContainer}>
            <Link
              className={s.signInLink}
              to={ROUTES.LOGIN}
            >
              <IntlText path="page.registration.alreadyHaveAccount" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (step === 'profile') {
    return (
      <main className={s.page}>
        <ThemeButton className={s.themeButton} />
        <form
          className={s.formContainer}
          onSubmit={handleSubmit}
        >
          <h1 className={s.formTitle}>
            <IntlText path="page.registration.fillYourLoginData" />
          </h1>
          <div className={s.inputContainer}>
            <Input
              label={translateMessage('input.label.username')}
              isError={!!errors.username}
              helperText={errors.username || ''}
              disabled={registrationLoading}
              value={values.username}
              onChange={(event) => setFieldValue('username', event.target.value)}
            />
          </div>
          <div className={s.inputContainer}>
            <Input
              label={translateMessage('input.label.username')}
              isError={!!errors.username}
              helperText={errors.username || ''}
              disabled={registrationLoading}
              value={values.username}
              onChange={(event) => setFieldValue('username', event.target.value)}
            />
          </div>
          <div className={s.inputContainer}>
            <Input
              label={translateMessage('input.label.username')}
              isError={!!errors.username}
              helperText={errors.username || ''}
              disabled={registrationLoading}
              value={values.username}
              onChange={(event) => setFieldValue('username', event.target.value)}
            />
          </div>
          <Button
            isLoading={registrationLoading}
            type="submit"
          >
            <IntlText path="button.done" />
          </Button>
        </form>
        <div className={s.panelContainer}>
          <div className={getClassName(s.headerContainer)}>DOGGEE</div>
          <div className={s.panelDataContainer}>
            We want to know your address so that we can suggest good places for walks with your pet,
            the nearest veterinary clinics, etc.
          </div>
          <div className={s.signInContainer}>
            <Link
              className={s.signInLink}
              to={ROUTES.LOGIN}
            >
              <IntlText path="page.registration.alreadyHaveAccount" />
            </Link>
          </div>
        </div>
      </main>
    );
  }
};
