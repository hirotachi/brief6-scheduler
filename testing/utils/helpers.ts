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

export function objToFormData<T extends object>(data: T) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, val]) => {
    formData.append(key, val);
  });
  return formData;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");
  if (!token) return;
  return `Bearer ${token}`;
}

export function getHeaders() {
  return {
    Authorization: getAuthToken(),
    "Content-Type": "application/json",
  };
}

export function unCamelCase(str) {
  return str.replace(/[A-Z][a-z]*/g, (v) => ` ${v.toLowerCase()}`);
}
