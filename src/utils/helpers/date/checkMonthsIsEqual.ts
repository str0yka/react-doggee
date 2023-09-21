export const checkMonthsIsEqual = (date1: Date, date2: Date) =>
  date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
