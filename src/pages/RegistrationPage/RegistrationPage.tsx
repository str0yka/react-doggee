import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Button, ThemeButton } from '~common/buttons';
import { Input, PasswordInput } from '~common/fields';
import { TickIcon, WarningIcon } from '~common/icons';
import { ROUTES } from '~utils/consts';
import { useForm } from '~utils/hooks';
import { getClassName } from '~utils/helpers';
import { useIntl, IntlText } from '~features/intl';

import s from './RegistrationPage.module.scss';

interface RegistrationFormValues {
  username: string;
  password: string;
  passwordAgain: string;
}

interface PasswordRulesProps {
  password: string;
  passwordAgain: string;
}

const PasswordRules: React.FC<PasswordRulesProps> = ({ password, passwordAgain }) => {
  const [rules, setRules] = useState({
    containNumber: false,
    containUppercase: false,
    containLowercase: false,
    contain8Characters: false,
    mustMatch: false,
  });

  useEffect(() => {
    if (password === password.replace(/[0-9]/g, '')) {
      setRules((prev) => ({ ...prev, containNumber: false }));
    } else {
      setRules((prev) => ({ ...prev, containNumber: true }));
    }

    if (password === password.toUpperCase()) {
      setRules((prev) => ({ ...prev, containLowercase: false }));
    } else {
      setRules((prev) => ({ ...prev, containLowercase: true }));
    }

    if (password === password.toLowerCase()) {
      setRules((prev) => ({ ...prev, containUppercase: false }));
    } else {
      setRules((prev) => ({ ...prev, containUppercase: true }));
    }

    if (password.length < 8) {
      setRules((prev) => ({ ...prev, contain8Characters: false }));
    } else {
      setRules((prev) => ({ ...prev, contain8Characters: true }));
    }

    if (password !== passwordAgain) {
      setRules((prev) => ({ ...prev, mustMatch: false }));
    } else {
      setRules((prev) => ({ ...prev, mustMatch: true }));
    }
  }, [password, passwordAgain]);

  return (
    <div className={s.passwordRulesContainer}>
      <ul className={s.passwordRulesList}>
        Password must:
        <li>
          {rules.containNumber ? <TickIcon /> : <WarningIcon />}
          <span>
            contain{' '}
            <span
              className={s[rules.containNumber ? 'passwordRuleSuccess' : 'passwordRuleFailure']}
            >
              numbers
            </span>
          </span>
        </li>
        <li>
          {rules.containUppercase ? <TickIcon /> : <WarningIcon />}
          <span>
            contain{' '}
            <span
              className={s[rules.containUppercase ? 'passwordRuleSuccess' : 'passwordRuleFailure']}
            >
              uppercase
            </span>{' '}
            letters
          </span>
        </li>
        <li>
          {rules.containLowercase ? <TickIcon /> : <WarningIcon />}
          <span>
            contain{' '}
            <span
              className={s[rules.containLowercase ? 'passwordRuleSuccess' : 'passwordRuleFailure']}
            >
              lowercase
            </span>{' '}
            letters
          </span>
        </li>
        <li>
          {rules.contain8Characters ? <TickIcon /> : <WarningIcon />}
          <span>
            contain at least{' '}
            <span
              className={
                s[rules.contain8Characters ? 'passwordRuleSuccess' : 'passwordRuleFailure']
              }
            >
              8
            </span>{' '}
            characters
          </span>
        </li>
      </ul>
      <ul className={s.passwordRulesList}>
        <li>
          {rules.mustMatch ? <TickIcon /> : <WarningIcon />}
          <span>
            Passwords must{' '}
            <span className={s[rules.mustMatch ? 'passwordRuleSuccess' : 'passwordRuleFailure']}>
              match
            </span>
          </span>
        </li>
      </ul>
    </div>
  );
};

const validatePassword = (value: string) => {
  if (value === value.replace(/[0-9]/g, '')) return 'password must contain numbers';
  if (value === value.toUpperCase()) return 'password must contain lowercase letters';
  if (value === value.toLowerCase()) return 'password must contain uppercase letters';
  if (value.length < 8) return 'password must contain at least 8 characters';
  return null;
};

export const RegistrationPage = () => {
  const { translateMessage } = useIntl();

  const { values, errors, setFieldValue, setFieldError } = useForm<RegistrationFormValues>({
    initialValues: {
      username: '',
      password: '',
      passwordAgain: '',
    },
    onSubmit: async (values) => console.log(values),
    validateSchema: {
      password: validatePassword,
    },
  });

  return (
    <main className={s.page}>
      <ThemeButton className={s.themeButton} />
      <form className={s.formContainer}>
        <h1 className={s.formTitle}>
          <IntlText path="page.registration.fillYourLoginData" />
        </h1>
        <div className={s.inputContainer}>
          <Input
            label={translateMessage('input.label.username')}
            isError={!!errors.username}
            helperText={errors.username || ''}
            value={values.username}
            onChange={(event) => setFieldValue('username', event.target.value)}
          />
        </div>
        <div className={s.inputContainer}>
          <PasswordInput
            label={translateMessage('input.label.password')}
            isError={!!errors.password}
            helperText={errors.password || ''}
            value={values.password}
            onChange={(event) => setFieldValue('password', event.target.value)}
          />
        </div>
        <div className={s.inputContainer}>
          <PasswordInput
            label={translateMessage('input.label.passwordAgain')}
            isError={!!errors.passwordAgain}
            helperText={errors.passwordAgain || ''}
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
        <Button type="submit">
          <IntlText path="button.done" />
        </Button>
      </form>
      <div className={s.panelContainer}>
        <div className={getClassName(s.headerContainer)}>DOGGEE</div>
        <PasswordRules
          password={values.password}
          passwordAgain={values.passwordAgain}
        />
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
};
