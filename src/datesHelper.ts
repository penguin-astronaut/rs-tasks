export function formatDate(date: Date): string {
  const year = date.getFullYear().toString().slice(-2);
  return `${date.getDate()}.${date.getMonth()}.${year}`;
}

export function getWeekDays(): Date[] {
  const curr = new Date();
  const week = [];

  for (let i = 1; i <= 7; i += 1) {
    const first = curr.getDate() - curr.getDay() + i;
    const day = new Date(curr.setDate(first));
    week.push(day);
  }

  return week;
}

export function dateInInterval(
  date: Date,
  intervalStart: Date,
  intervalEnd: Date
) {
  return (
    intervalStart.toISOString().substring(0, 10) <=
      date.toISOString().substring(0, 10) &&
    date.toISOString().substring(0, 10) <=
      intervalEnd.toISOString().substring(0, 10)
  );
}
