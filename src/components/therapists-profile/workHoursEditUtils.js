import dayjs from "dayjs";
import moment from "moment";

export const WEEKDAY_FULL_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const getWeekdayFullName = (date) => WEEKDAY_FULL_NAMES[dayjs(date).day()];

export const getWeekdayPluralName = (date) => {
  const name = getWeekdayFullName(date);
  return name.endsWith("s") ? name : `${name}s`;
};

export const formatChoiceDate = (date) => dayjs(date).format("MMMM D, YYYY");

export const formatEditDayTitle = (date) =>
  `${getWeekdayFullName(date)}. ${dayjs(date).format("D MMMM, YYYY")}`;

export const buildTimeOptions = () => {
  const options = [];

  for (let hour = 0; hour < 24; hour += 1) {
    [0, 15, 30, 45].forEach((minute) => {
      options.push(
        moment({ hour, minute }).format("h:mm A")
      );
    });
  }

  return options;
};

export const createDefaultShift = (startTime = "10:00 AM", endTime = "6:00 PM") => ({
  id: `${Date.now()}-${Math.random()}`,
  startTime,
  endTime,
});

export const parseScheduleToShifts = (schedule) => {
  const isSpaScheduleVal = schedule?.isSpaSchedule;
  const isSpaSchedule = isSpaScheduleVal === true || isSpaScheduleVal === "true" || isSpaScheduleVal === 1 || isSpaScheduleVal === "1";

  if (!isSpaSchedule && Array.isArray(schedule?.slots) && schedule.slots.length > 0) {
    const shifts = schedule.slots.map((slot) => {
      const startTime = slot.start_time || slot.startTime;
      const endTime = slot.end_time || slot.endTime;
      if (startTime && endTime) {
        const start = moment(startTime, ["HH:mm:ss", "hh:mm:ss", "hh:mm A", "h:mm A"]).format("h:mm A");
        const end = moment(endTime, ["HH:mm:ss", "hh:mm:ss", "hh:mm A", "h:mm A"]).format("h:mm A");
        return createDefaultShift(start, end);
      }
      return null;
    }).filter(Boolean);

    if (shifts.length > 0) {
      return shifts;
    }
  }

  const startTime = schedule?.start_time || schedule?.startTime;
  const endTime = schedule?.end_time || schedule?.endTime;

  if (!startTime || !endTime) {
    return [createDefaultShift()];
  }

  const start = moment(startTime, ["HH:mm:ss", "hh:mm:ss", "hh:mm A", "h:mm A"]).format("h:mm A");
  const end = moment(endTime, ["HH:mm:ss", "hh:mm:ss", "hh:mm A", "h:mm A"]).format("h:mm A");

  return [createDefaultShift(start, end)];
};

export const isScheduleNotWorking = (schedule) => {
  if (!schedule) return true;

  const isLeave = schedule.isLeave === true || schedule.isLeave === "true" || schedule.isLeave === 1 || schedule.isLeave === "1";
  if (isLeave) return true;

  const isUnavailable = schedule.isUnavailable === true || schedule.isUnavailable === "true" || schedule.isUnavailable === 1 || schedule.isUnavailable === "1";
  if (isUnavailable) return true;

  const isOpen = schedule.isOpen !== undefined ? (schedule.isOpen === true || schedule.isOpen === "true" || schedule.isOpen === 1 || schedule.isOpen === "1") : null;
  if (isOpen === false) return true;

  const isAvailableVal = schedule?.isAvailable !== undefined ? schedule?.isAvailable : schedule?.isAvaliable;
  if (isAvailableVal === 0 || isAvailableVal === "0" || isAvailableVal === false || isAvailableVal === "false") {
    return true;
  }

  return false;
};

export const toMinutes = (timeStr) => {
  const m = moment(timeStr, "h:mm A");
  return m.hours() * 60 + m.minutes();
};

export const checkShiftsOverlap = (shifts) => {
  const parsedShifts = shifts.map((shift) => ({
    start: toMinutes(shift.startTime),
    end: toMinutes(shift.endTime),
  }));

  for (let i = 0; i < parsedShifts.length; i++) {
    for (let j = i + 1; j < parsedShifts.length; j++) {
      const a = parsedShifts[i];
      const b = parsedShifts[j];
      if (!(a.end <= b.start || b.end <= a.start)) {
        return true;
      }
    }
  }
  return false;
};

export const checkInvalidDuration = (shifts) => {
  for (const shift of shifts) {
    const start = toMinutes(shift.startTime);
    const end = toMinutes(shift.endTime);
    if (start >= end) {
      return true;
    }
  }
  return false;
};

