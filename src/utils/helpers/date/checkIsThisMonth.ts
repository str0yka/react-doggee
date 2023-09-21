import { checkMonthsIsEqual } from './checkMonthsIsEqual';

export const checkIsThisMonth = (date: Date) => {
  const today = new Date();

  return checkMonthsIsEqual(today, date);
};
