export function daysInMonth(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const current = new Date(year, month, 0).getDate();
  const previous = new Date(year, month - 1, 0).getDate();
  const next = new Date(year, month + 1, 0).getDate();
  return { current, next, previous };
}