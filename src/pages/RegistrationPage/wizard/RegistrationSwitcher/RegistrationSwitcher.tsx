import { useStep } from '../../contexts';
import { FillLoginDataStep, FillProfileDataStep } from '../steps';

export const RegistrationSwitcher = () => {
  const { step } = useStep();

  console.log(step);

  return (
    <>
      {step === 'registration' && <FillLoginDataStep />}
      {step === 'profile' && <FillProfileDataStep />}
    </>
  );
};
