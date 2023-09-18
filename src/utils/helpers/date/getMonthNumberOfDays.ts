export const getMonthNumberOfDays = (monthIndex: number, yearNumber: number) =>
  new Date(yearNumber, monthIndex + 1, 0).getDate();
