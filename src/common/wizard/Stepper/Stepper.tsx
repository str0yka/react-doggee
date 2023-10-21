import React from 'react';

import { getClassName } from '~utils/helpers';
import { TickIcon } from '~common/icons';

import s from './Stepper.module.scss';

interface StepperProps {
  activeStep: number;
  stepsLabels: string[];
}

export const Stepper: React.FC<StepperProps> = ({ activeStep, stepsLabels }) => (
  <div className={s.stepsContainer}>
    {stepsLabels.map((stepLabel, index) => {
      const step = index + 1;
      const isActiveStep = step === activeStep;
      const isLastStep = step === stepsLabels.length;
      const isPrevStep = step < activeStep;

      return (
        <React.Fragment key={index}>
          <div className={getClassName(s.stepContainer, isActiveStep && s.active)}>
            <div className={getClassName(s.stepCircle, (isActiveStep || isPrevStep) && s.active)}>
              {isLastStep ? <TickIcon className={s.lastStepIcon} /> : step}
            </div>
            <span className={s.stepLabel}>{stepLabel}</span>
          </div>
          {!isLastStep && <div className={getClassName(s.stepLine, isPrevStep && s.active)} />}
        </React.Fragment>
      );
    })}
  </div>
);
