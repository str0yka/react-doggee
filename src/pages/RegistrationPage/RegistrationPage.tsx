import { StepProvider } from './contexts';
import { RegistrationSwitcher } from './wizard/RegistrationSwitcher/RegistrationSwitcher';

export const RegistrationPage = () => (
  <StepProvider>
    <RegistrationSwitcher />
  </StepProvider>
);
