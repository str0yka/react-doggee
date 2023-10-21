import { ThemeButton } from '~common/buttons';

import s from './RegistrationWizardContainer.module.scss';
import { Stepper } from '~common/wizard';
import { useIntl } from '~features/intl';

interface RegistrationWizardContainerProps {
  activeStep?: number;
  form: {
    title: React.ReactNode;
    content: React.ReactNode;
  };
  panel: {
    data: React.ReactNode;
    footer: React.ReactNode;
  };
}

export const RegistrationWizardContainer: React.FC<RegistrationWizardContainerProps> = ({
  activeStep,
  form,
  panel,
}) => {
  const intl = useIntl();

  return (
    <main className={s.page}>
      <ThemeButton className={s.themeButton} />
      <div className={s.formContainer}>
        <h1 className={s.formTitle}>{form.title}</h1>
        {activeStep && (
          <div className={s.stepperContainer}>
            <Stepper
              activeStep={activeStep}
              stepsLabels={[
                intl.translateMessage('page.registration.step.fillProfileData.label'),
                intl.translateMessage('page.registration.step.addYourPetsStep.label'),
                intl.translateMessage('page.registration.step.checkDataStep.label'),
              ]}
            />
          </div>
        )}
        {form.content}
      </div>
      <div className={s.panelContainer}>
        <div className={s.headerContainer}>DOGGEE</div>
        <div className={s.panelDataContainer}>{panel.data}</div>
        <div className={s.footerContainer}>
          <span className={s.signInLink}>{panel.footer}</span>
        </div>
      </div>
    </main>
  );
};
