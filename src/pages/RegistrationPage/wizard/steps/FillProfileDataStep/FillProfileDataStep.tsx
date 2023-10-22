import { Link } from 'react-router-dom';

import { Button } from '~common/buttons';
import { DateInput, Input } from '~common/fields';
import { ArrowIcon } from '~common/icons';
import { IntlText, useIntl } from '~features/intl';
import { ROUTES } from '~utils/consts';
import { useForm } from '~utils/hooks';

import { useStep } from '../../../contexts';
import { RegistrationWizardContainer } from '../../RegistrationWizardContainer/RegistrationWizardContainer';

import s from './FillProfileDataStep.module.scss';

type FillProfileValues = {
  name: string;
  address: string;
  birthdayDate: Date;
};

export const FillProfileDataStep = () => {
  const { toNextStep } = useStep();

  const intl = useIntl();

  const { values, errors, handleSubmit, setFieldValue } = useForm<FillProfileValues>({
    initialValues: {
      name: '',
      address: '',
      birthdayDate: new Date()
    },
    onSubmit: (val) => {
      toNextStep();
    }
  });

  return (
    <RegistrationWizardContainer
      activeStep={1}
      form={{
        title: <IntlText path='page.registration.letsFillYourProfile' />,
        content: (
          <form
            className={s.formContainer}
            onSubmit={handleSubmit}
          >
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
                firstWeekDayNumber={2}
                label={intl.translateMessage('input.label.yourBirthday')}
                locale={intl.locale}
                selectDate={(date) => setFieldValue('birthdayDate', date)}
                selectedDate={values.birthdayDate}
                {...(errors.birthdayDate && {
                  isError: !!errors.birthdayDate,
                  helperText: errors.birthdayDate
                })}
              />
            </div>
            <Button type='submit'>
              <IntlText path='button.next' />
            </Button>
          </form>
        )
      }}
      panel={{
        data: (
          <span className={s.panelData}>
            <IntlText path='page.registration.addressInfo' />
          </span>
        ),
        footer: (
          <Link
            className={s.footerLink}
            to={ROUTES.HOME}
          >
            <IntlText path='page.registration.skipStep' />
            <ArrowIcon className={s.footerLinkIcon} />
          </Link>
        )
      }}
    />
  );
};
