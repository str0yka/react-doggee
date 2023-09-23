import { DateInput, Input } from '~common/fields';
import { Button } from '~common/buttons';
import { IntlText, useIntl } from '~features/intl';
import { useForm } from '~utils/hooks';

import { RegistrationWizardContainer } from '../../RegistrationWizardContainer/RegistrationWizardContainer';
import s from './FillProfileDataStep.module.scss';

interface FillProfileValues {
  name: string;
  address: string;
  birthdayDate: Date;
}

interface FillProfileDataStepProps {
  setStep: (step: 'registration' | 'profile' | 'pets' | 'check') => void; // FIXME
}

export const FillProfileDataStep: React.FC<FillProfileDataStepProps> = () => {
  const { values, errors, handleSubmit, setFieldValue } = useForm<FillProfileValues>({
    initialValues: {
      name: '',
      address: '',
      birthdayDate: new Date(),
    },
    onSubmit: (values) => console.log('values: ', values),
  });

  const { locale, translateMessage } = useIntl();

  return (
    <RegistrationWizardContainer
      form={{
        title: <IntlText path="page.registration.letsFillYourProfile" />,
        content: (
          <form
            className={s.formContainer}
            onSubmit={handleSubmit}
          >
            <div className={s.inputContainer}>
              <Input
                label={translateMessage('input.label.name')}
                isError={!!errors.name}
                helperText={errors.name || ''}
                value={values.name}
                onChange={(event) => setFieldValue('name', event.target.value)}
              />
            </div>
            <div className={s.inputContainer}>
              <Input
                label={translateMessage('input.label.address')}
                isError={!!errors.address}
                helperText={errors.address || ''}
                value={values.address}
                onChange={(event) => setFieldValue('address', event.target.value)}
              />
            </div>
            <div className={s.inputContainer}>
              <DateInput
                label={translateMessage('input.label.yourBirthday')}
                isError={!!errors.birthdayDate}
                helperText={errors.birthdayDate || ''}
                selectedDate={values.birthdayDate}
                selectDate={(date) => setFieldValue('birthdayDate', date)}
                locale={locale}
                firstWeekDayNumber={2}
              />
            </div>
            <Button type="submit">
              <IntlText path="button.next" />
            </Button>
          </form>
        ),
      }}
      panel={{
        data: (
          <span className={s.panelData}>
            <IntlText path="page.registration.addressInfo" />
          </span>
        ),
        footer: <IntlText path="page.registration.alreadyHaveAccount" />,
      }}
    />
  );
};
