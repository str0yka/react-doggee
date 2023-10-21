import { createContext } from 'react';

export interface StepState {
  step: Step;
  toNextStep: () => void;
  toPrevStep: () => void;
}

export const StepContext = createContext<StepState>({
  step: 'registration',
  toNextStep: () => {},
  toPrevStep: () => {},
});
