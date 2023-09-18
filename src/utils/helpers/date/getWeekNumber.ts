export const getWeekNumber = (date: Date) => {
  const firstDayOfTheYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfTheYear.getTime()) / (1000 * 60 * 60 * 24);

  return Math.ceil((pastDaysOfYear + firstDayOfTheYear.getDay() + 1) / 7);
};
