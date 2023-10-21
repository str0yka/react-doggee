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

export const FillProfileDataStep = () => {
  const { values, errors, handleSubmit, setFieldValue } = useForm<FillProfileValues>({
    initialValues: {
      name: '',
      address: '',
      birthdayDate: new Date(),
    },
    onSubmit: (values) => console.log('values: ', values),
  });

  const intl = useIntl();

  return (
    <RegistrationWizardContainer
      activeStep={1}
      form={{
        title: <IntlText path="page.registration.letsFillYourProfile" />,
        content: (
          <form
            className={s.formContainer}
            onSubmit={handleSubmit}>
            <div>
              <Input
                label={intl.translateMessage('input.label.name')}
                value={values.name}
                onChange={(event) => setFieldValue('name', event.target.value)}
                {...(errors.name && { isError: !!errors.name, helperText: errors.name })}
              />
            </div>
            <div>
              <Input
                label={intl.translateMessage('input.label.address')}
                value={values.address}
                onChange={(event) => setFieldValue('address', event.target.value)}
                {...(errors.address && { isError: !!errors.address, helperText: errors.address })}
              />
            </div>
            <div>
              <DateInput
                label={intl.translateMessage('input.label.yourBirthday')}
                selectedDate={values.birthdayDate}
                selectDate={(date) => setFieldValue('birthdayDate', date)}
                locale={intl.locale}
                firstWeekDayNumber={2}
                {...(errors.birthdayDate && {
                  isError: !!errors.birthdayDate,
                  helperText: errors.birthdayDate,
                })}
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
