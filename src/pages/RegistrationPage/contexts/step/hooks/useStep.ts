import { useContext } from 'react';
import { StepContext } from '../StepContext';

export const useStep = () => useContext(StepContext);
