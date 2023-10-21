import { useStep } from '../../contexts';
import { FillLoginDataStep, FillProfileDataStep } from '../steps';

export const RegistrationSwitcher = () => {
  const { step } = useStep();

  return (
    <>
      {step === 'registration' && <FillLoginDataStep />}
      {step === 'profile' && <FillProfileDataStep />}
    </>
  );
};
