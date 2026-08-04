import dayjs from "dayjs";
import moment from "moment";

export const getWeekStartSunday = (date = dayjs()) =>
  dayjs(date).subtract(dayjs(date).day(), "day").startOf("day");

export const buildWeekDays = (weekStart, today = dayjs().startOf("day")) => {
  const days = [];

  for (let i = 0; i < 7; i += 1) {
    const date = dayjs(weekStart).add(i, "day");
    if (!date.isBefore(today, "day")) {
      days.push(date);
    }
  }

  return days;
};

export const formatWeekRangeLabel = (weekStart) => {
  const weekEnd = dayjs(weekStart).add(6, "day");
  return `${weekStart.format("MMM D")} – ${weekEnd.format("MMM D, YYYY")}`;
};

export const canNavigateToPreviousWeek = (weekStart, today = dayjs().startOf("day")) => {
  const previousWeekEnd = dayjs(weekStart).subtract(1, "day");
  return !previousWeekEnd.isBefore(today, "day");
};

export const formatDayLabel = (date) => ({
  day: date.format("ddd"),
  date: date.format("M/D"),
});

export const formatScheduleTime = (startTime, startType, endTime, endType) => {
  if (!startTime || !endTime) return null;

  const start = moment(startTime, ["HH:mm:ss", "hh:mm:ss"]).format("h:mm");
  const end = moment(endTime, ["HH:mm:ss", "hh:mm:ss"]).format("h:mm");
  const startMeridiem = (startType || "am").toLowerCase();
  const endMeridiem = (endType || "pm").toLowerCase();

  return `${start} ${startMeridiem} - ${end} ${endMeridiem}`;
};

export const getWeekdayKey = (date) => {
  const keys = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return keys[dayjs(date).day()];
};

export const isDateInScheduleRange = (date, schedule) => {
  if (!schedule) return false;

  const current = dayjs(date).startOf("day");
  const start = schedule?.start_date ? dayjs(schedule.start_date).startOf("day") : null;
  const end = schedule?.end_date ? dayjs(schedule.end_date).startOf("day") : null;

  if (start && current.isBefore(start, "day")) return false;
  if (end && current.isAfter(end, "day")) return false;

  return true;
};

export const isWeekdayScheduled = (date, schedule) => {
  if (!schedule?.days) return true;

  const weekday = getWeekdayKey(date);
  return schedule.days.split(",").map((d) => d.trim()).includes(weekday);
};

export const getScheduleHoursForDate = (date, schedule) => {
  if (!schedule || schedule?.isAvaliable === 0 || schedule?.isAvaliable === "0") {
    return null;
  }

  if (!isDateInScheduleRange(date, schedule)) return null;
  if (!isWeekdayScheduled(date, schedule)) return null;

  return formatScheduleTime(
    schedule?.start_time,
    schedule?.start_type,
    schedule?.end_time,
    schedule?.end_type
  );
};
