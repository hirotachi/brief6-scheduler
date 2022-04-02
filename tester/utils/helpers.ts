export function daysInMonth(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const current = new Date(year, month, 0).getDate();
  const previous = new Date(year, month - 1, 0).getDate();
  const next = new Date(year, month + 1, 0).getDate();
  return { current, next, previous };
}

export function genID() {
  return (
    Math.random().toString(36).slice(2) + new Date().getTime().toString(36)
  );
}

export function formatDate(date: Date) {
  return date.toJSON().slice(0, 10);
}