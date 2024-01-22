export function getDate(e: number) {
  const date = new Date(e);
  const addLeadingZero = (e: number) => {
    return e < 10 ? '0' + e : e;
  };
  const days = addLeadingZero(date.getDate());
  const month = addLeadingZero(date.getMonth());
  const years = addLeadingZero(date.getFullYear());
  const hours = addLeadingZero(date.getHours());
  const minutes = addLeadingZero(date.getMinutes());

  const timeString = `${days}.${month}.${years} - ${hours}:${minutes}`;

  return timeString;
}
