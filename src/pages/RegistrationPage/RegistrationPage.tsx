import { useState } from 'react';

import { FillLoginDataStep, FillProfileDataStep } from './wizard/steps';

export const RegistrationPage = () => {
  const [step, setStep] = useState<'registration' | 'profile' | 'pets' | 'check'>('registration');

  if (step === 'registration') {
    return <FillLoginDataStep setStep={setStep} />;
  }

  if (step === 'profile') {
    return <FillProfileDataStep setStep={setStep} />;
  }
};
