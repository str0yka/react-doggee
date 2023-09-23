import { useState } from 'react';

import { FillLoginDataStep } from './wizard/steps/FillLoginDataStep/FillLoginDataStep';
import { FillProfileDataStep } from './wizard/steps/FillProfileDataStep/FillProfileDataStep';

export const RegistrationPage = () => {
  const [step, setStep] = useState<'registration' | 'profile' | 'pets' | 'check'>('registration');

  if (step === 'registration') {
    return <FillLoginDataStep setStep={setStep} />;
  }

  if (step === 'profile') {
    return <FillProfileDataStep setStep={setStep} />;
  }
};
