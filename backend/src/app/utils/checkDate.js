import {
  isAfter,
  setHours,
  setMinutes,
  setSeconds,
  isWithinInterval,
} from 'date-fns';

export function checkHourInterval(date) {
  const hourStart = setSeconds(setMinutes(setHours(date, 8), 0), 0);
  const hourEnd = setSeconds(setMinutes(setHours(date, 18), 0), 0);

  return isWithinInterval(date, { start: hourStart, end: hourEnd });
}

export function checkPastDate(start_date, end_date) {
  return isAfter(start_date, end_date);
}
