import { STEPS } from '../constants';

export const getNextAndPrevStep = (step: Step) => {
  const stepIndex = STEPS.findIndex((STEP) => STEP === step);

  const isLastStep = stepIndex === STEPS.length - 1;
  const isFirstStep = stepIndex === 0;

  return {
    nextStep: isLastStep ? null : STEPS[stepIndex + 1],
    prevStep: isFirstStep ? null : STEPS[stepIndex - 1],
  };
};
