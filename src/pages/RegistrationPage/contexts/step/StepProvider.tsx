import { useState } from 'react';

import { StepContext } from './StepContext';
import { getNextAndPrevStep } from './helpers';

interface StepProviderProps {
  children: React.ReactNode;
}

export const StepProvider: React.FC<StepProviderProps> = ({ children }) => {
  const [step, setStep] = useState<Step>('registration');

  const toNextStep = () => {
    const { nextStep } = getNextAndPrevStep(step);

    if (!nextStep) return;

    setStep(nextStep);
  };

  const toPrevStep = () => {
    const { prevStep } = getNextAndPrevStep(step);

    if (!prevStep) return;

    setStep(prevStep);
  };

  return (
    <StepContext.Provider value={{ step, toNextStep, toPrevStep }}>{children}</StepContext.Provider>
  );
};
