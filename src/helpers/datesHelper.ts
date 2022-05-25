export function formatDate(date: Date): string {
  const year = date.getFullYear().toString().slice(-2);
  return `${date.getDate()}.${date.getMonth() + 1}.${year}`;
}

export function getWeekDays(
  date = '',
  week: 'current' | 'next' | 'previous' = 'current'
): Date[] {
  const curr = date ? new Date(date) : new Date();
  const days = [];

  if (week === 'next') {
    curr.setDate(curr.getDate() + 7);
  } else if (week === 'previous') {
    curr.setDate(curr.getDate() - 7);
  }

  for (let i = 1; i <= 7; i += 1) {
    const first = curr.getDate() - curr.getDay() + i;
    const day = new Date(curr.setDate(first));
    days.push(day);
  }

  return days;
}

export function dateInInterval(
  date: Date,
  intervalStart: Date,
  intervalEnd: Date
): boolean {
  return (
    intervalStart.toISOString().substring(0, 10) <=
      date.toISOString().substring(0, 10) &&
    date.toISOString().substring(0, 10) <=
      intervalEnd.toISOString().substring(0, 10)
  );
}

export function getDateEnd(
  oldStartDate: string,
  oldEndDate: string,
  newStartDate: string
): string {
  const dateDiff =
    new Date(oldEndDate).getTime() - new Date(oldStartDate).getTime();
  return new Date(new Date(newStartDate).getTime() + dateDiff).toISOString();
}
