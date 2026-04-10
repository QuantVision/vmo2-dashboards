export type DateRange = { start: string; end: string };

export const toDate = (value: string) => new Date(`${value}T00:00:00`);

export const formatShortDate = (value: string) => {
  const date = toDate(value);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short"
  });
};

export const formatLongDate = (value: string) => {
  const date = toDate(value);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};

export const clampDateRange = (range: DateRange, min: string, max: string) => {
  const start = toDate(range.start) < toDate(min) ? min : range.start;
  const end = toDate(range.end) > toDate(max) ? max : range.end;
  return { start, end };
};

export const getDatesBetween = (start: string, end: string) => {
  const dates: string[] = [];
  const cursor = toDate(start);
  const last = toDate(end);
  while (cursor <= last) {
    dates.push(cursor.toISOString().slice(0, 10));
    cursor.setDate(cursor.getDate() + 1);
  }
  return dates;
};

export const isWithinRange = (value: string, range: DateRange) => {
  const date = toDate(value);
  return date >= toDate(range.start) && date <= toDate(range.end);
};
