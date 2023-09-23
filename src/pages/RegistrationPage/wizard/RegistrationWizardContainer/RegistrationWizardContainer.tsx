import { ThemeButton } from '~common/buttons';

import s from './RegistrationWizardContainer.module.scss';

interface RegistrationWizardContainerProps {
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
  form,
  panel,
}) => {
  return (
    <main className={s.page}>
      <ThemeButton className={s.themeButton} />
      <div className={s.formContainer}>
        <h1 className={s.formTitle}>{form.title}</h1>
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
