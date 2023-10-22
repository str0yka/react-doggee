import { useStep } from '../../contexts';
import { AddYourPetsStep, FillLoginDataStep, FillProfileDataStep } from '../steps';

export const RegistrationSwitcher = () => {
  const { step } = useStep();

  return <AddYourPetsStep />;

  return (
    <>
      {step === 'registration' && <FillLoginDataStep />}
      {step === 'profile' && <FillProfileDataStep />}
      {step === 'pets' && <AddYourPetsStep />}
    </>
  );
};
