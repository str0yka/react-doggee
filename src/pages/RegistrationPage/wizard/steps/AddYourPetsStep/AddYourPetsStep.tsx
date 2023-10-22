import { Link } from 'react-router-dom';

import { Button } from '~common/buttons';
import { DateInput, Input, Select } from '~common/fields';
import { ArrowIcon, KilogramIcon } from '~common/icons';
import { IntlText, useIntl } from '~features/intl';
import { ROUTES } from '~utils/consts';
import { useForm } from '~utils/hooks';

import { RegistrationWizardContainer } from '../../RegistrationWizardContainer/RegistrationWizardContainer';

import s from './AddYourPetsStep.module.scss';

type AddPetValues = {
  dogName: string;
  dogBreed: string;
  dogBirthdayDate: Date;
  dogWeight: number;
};

export const AddYourPetsStep = () => {
  const intl = useIntl();

  const { values, errors, handleSubmit, setFieldValue } = useForm<AddPetValues>({
    initialValues: {
      dogName: '',
      dogBreed: '',
      dogBirthdayDate: new Date(),
      dogWeight: 0
    },
    onSubmit: (val) => console.log('values: ', val)
  });

  return (
    <RegistrationWizardContainer
      activeStep={2}
      form={{
        title: <IntlText path='page.registration.letsFillYourProfile' />,
        content: (
          <form
            className={s.formContainer}
            onSubmit={handleSubmit}
          >
            <div>
              <Input
                label={intl.translateMessage('input.label.dogName')}
                value={values.dogName}
                onChange={(event) => setFieldValue('dogName', event.target.value)}
                {...(errors.dogName && { isError: !!errors.dogName, helperText: errors.dogName })}
              />
            </div>
            <div>
              <Select
                label={intl.translateMessage('input.label.breed')}
                value={values.dogBreed}
                options={[
                  { value: 'akita', label: 'Akita' },
                  { value: 'akita1', label: 'Akit2a' },
                  { value: 'akita2', label: 'Akita1' }
                ]}
                onSelect={(value) => setFieldValue('dogBreed', value)}
                {...(errors.dogBreed && {
                  isError: !!errors.dogBreed,
                  helperText: errors.dogBreed
                })}
              />
            </div>
            <div>
              <DateInput
                firstWeekDayNumber={2}
                label={intl.translateMessage('input.label.dogBirthday')}
                locale={intl.locale}
                selectDate={(date) => setFieldValue('dogBirthdayDate', date)}
                selectedDate={values.dogBirthdayDate}
                {...(errors.dogBirthdayDate && {
                  isError: !!errors.dogBirthdayDate,
                  helperText: errors.dogBirthdayDate
                })}
              />
            </div>
            <div>
              <Input
                indicator={<KilogramIcon />}
                label={intl.translateMessage('input.label.dogWeight')}
                mask={/^(\s*|\d+)$/}
                value={values.dogWeight}
                onChange={(event) => setFieldValue('dogWeight', Number(event.target.value))}
                {...(errors.dogWeight && {
                  isError: !!errors.dogWeight,
                  helperText: errors.dogWeight
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
        data: null,
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
