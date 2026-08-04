import moment from "moment";
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import BookedAppointmentDetails from "./BookedAppointmentDetails";
import EditAppointmentSidebar from "./EditAppointmentSidebar";
import NewAppointmentSidebar from "./NewAppointmentSidebar";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import {
  CalendarContainer,
  CalendarLayoutWrapper,
  CalendarMainArea,
  MonthDropdownButton,
  MonthDropdownContainer,
  MonthDropdownItem,
  MonthDropdownMenu,
  NavButton,
  NavButtonGroup,
  TherapistAvatar,
  TherapistDropdownButton,
  TherapistDropdownContainer,
  TherapistDropdownItem,
  TherapistDropdownMenu,
  TherapistName,
  TodayButton,
  ToolbarLeft,
  ToolbarRight,
  ToolbarWrapper,
  ViewModeButton,
  ViewModeToggleContainer,
} from "@/styles/pages/new-custom-calendar.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_TYPES } from "@/utils/constants";

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);
const DEFAULT_SLOT_MINUTES = 15;



const isPastSlot = (date) => moment(date).isBefore(moment());

const MONTH_OPTIONS_COUNT = 6;

const getMonthOptions = () =>
  Array.from({ length: MONTH_OPTIONS_COUNT }, (_, index) => {
    const monthDate = moment().startOf("month").add(index, "months");
    return {
      key: monthDate.format("YYYY-MM"),
      label: monthDate.format("MMMM YYYY").toUpperCase(),
      date: monthDate.toDate(),
    };
  });

const getVisibleDateRange = (date, view) => {
  const current = moment(date);

  if (view === "day") {
    const day = current.format("YYYY-MM-DD");
    return { start_date: day, end_date: day };
  }

  return {
    start_date: current.clone().startOf("week").format("YYYY-MM-DD"),
    end_date: current.clone().endOf("week").format("YYYY-MM-DD"),
  };
};

const getNextHalfHourSlot = (fromDate = moment()) => {
  const current = moment(fromDate).seconds(0).milliseconds(0);
  const remainder = current.minutes() % 30;

  if (remainder === 0) {
    return current;
  }

  return current.clone().add(30 - remainder, "minutes");
};

const getStatusClass = (rawSlot) => {
  if (!rawSlot) return "status-confirmed";
  const bookingstatus = Number(rawSlot.bookingstatus ?? 0);
  const checkinstatus = Number(rawSlot.checkinstatus ?? 0);

  if (bookingstatus === 0) return "status-confirmed";
  if (bookingstatus === 1) return "status-cancelled";
  if (bookingstatus === 2) return "status-noshow";
  if (bookingstatus === 3) return "status-completed";
  if (bookingstatus === 4) return "status-inprogress";
  if (bookingstatus === 5) return "status-ready";
};

const parseCalendarTime = (dateKey, timeStr) =>
  moment(`${dateKey} ${timeStr}`, [
    "YYYY-MM-DD hh:mm A",
    "YYYY-MM-DD hh:mm:ss A",
    "YYYY-MM-DD hh:mm a",
    "YYYY-MM-DD hh:mm:ss a",
  ]);

const isAppointmentDraggable = (rawSlot) => {
  if (!rawSlot) return false;
  const bookingStatus = Number(rawSlot.bookingstatus ?? 0);
  const checkInStatus = Number(rawSlot.checkinstatus ?? 0);
  return bookingStatus === 0 && checkInStatus === 0;
};

const applyBookingMoveToSummary = (summary, bookingId, dropDate, updatedSlot) => {
  if (!summary?.data || bookingId == null || bookingId === "") return summary;

  const nextData = { ...summary.data };
  Object.keys(nextData).forEach((dateStr) => {
    const dayData = nextData[dateStr];
    if (!dayData?.bookedSlots) return;
    const filtered = dayData.bookedSlots.filter(
      (slot) => String(slot.bookingId || slot.id) !== String(bookingId)
    );
    if (filtered.length !== dayData.bookedSlots.length) {
      nextData[dateStr] = { ...dayData, bookedSlots: filtered };
    }
  });

  if (nextData[dropDate]) {
    nextData[dropDate] = {
      ...nextData[dropDate],
      bookedSlots: [...(nextData[dropDate].bookedSlots || []), updatedSlot],
    };
  }

  return { ...summary, data: nextData };
};

const NewCustomCalender = forwardRef(({ provider, setSelectedId, currentUser }, ref) => {
  const { toaster } = useToaster();
  const [calenderDate, setCalenderDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("week");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [providers, setProviders] = useState([]);
  const [scheduleSummary, setScheduleSummary] = useState(null);
  const [selectedBookedSlot, setSelectedBookedSlot] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFromDragDrop, setEditFromDragDrop] = useState(false);
  const isEditingRef = useRef(false);
  const suppressEventSelectRef = useRef(false);
  const pendingDragMoveRef = useRef(null);

  useEffect(() => {
    isEditingRef.current = isEditing;
  }, [isEditing]);

  const getScheduleSummary = useCallback(async () => {
    const { start_date, end_date } = getVisibleDateRange(calenderDate, currentView);
    try {
      let url = `${API_ROUTER?.GET_SUMMARY_LIST_BY_DATE_RANGE}?fromDate=${start_date}&toDate=${end_date}`;
      if (currentUser !== undefined && currentUser !== null) {
        url += `&employeeId=${currentUser}`;
      }
      const res = await axiosApiCall.get(url);
      if (res?.status) {
        console.log("getScheduleSummary", res?.data);
        let summaryData = res?.data;

        // Keep dragged ticket at the new slot while Edit Appointment is open
        const pending = pendingDragMoveRef.current;
        if (pending && isEditingRef.current) {
          summaryData = applyBookingMoveToSummary(
            summaryData,
            pending.bookingId,
            pending.dropDate,
            pending.updatedSlot
          );
        }

        setScheduleSummary(summaryData);

        setSelectedBookedSlot((current) => {
          if (!current) return current;
          const currentId = current.bookingId || current.id;
          if (!currentId || !summaryData?.data) return current;

          let matched = null;
          Object.entries(summaryData.data).forEach(([dateStr, dayData]) => {
            (dayData?.bookedSlots || []).forEach((slot) => {
              if ((slot.bookingId || slot.id) == currentId) {
                matched = { ...slot, date: dateStr };
              }
            });
          });

          if (!matched) return current;

          const nextBookingStatus = Number(matched.bookingstatus ?? 0);
          const currBookingStatus = Number(current.bookingstatus ?? 0);
          const nextCheckInStatus = Number(matched.checkinstatus ?? 0);
          const currCheckInStatus = Number(current.checkinstatus ?? 0);

          // Prefer status 5 from socket/optimistic update if API is still lagging
          let bookingstatus = nextBookingStatus || currBookingStatus;
          if (currBookingStatus === 5 && nextBookingStatus !== 3 && nextBookingStatus !== 1 && nextBookingStatus !== 2) {
            bookingstatus = 5;
          } else if (nextBookingStatus === 5) {
            bookingstatus = 5;
          }

          // While editing (e.g. after drag-drop), keep the user-selected date/time
          if (isEditingRef.current) {
            return {
              ...current,
              ...matched,
              bookingstatus,
              checkinstatus: nextCheckInStatus || currCheckInStatus,
              date: current.date || matched.date,
              orderDate: current.orderDate || current.date || matched.date,
              start_time: current.start_time || matched.start_time,
              end_time: current.end_time || matched.end_time,
            };
          }

          return {
            ...current,
            ...matched,
            bookingstatus,
            checkinstatus: nextCheckInStatus || currCheckInStatus,
            date: matched.date || current.date,
          };
        });
      }
    } catch (error) {
      console.error("Error fetching schedule summary:", error);
    }
  }, [calenderDate, currentView, currentUser]);

  const applyBookingStatus = useCallback((bookingId, bookingstatus = 5) => {
    if (bookingId == null || bookingId === "") return;

    setSelectedBookedSlot((current) => {
      if (!current) return current;
      const currentId = current.bookingId || current.id;
      if (currentId == bookingId) {
        return { ...current, bookingstatus };
      }
      return current;
    });

    setScheduleSummary((prev) => {
      if (!prev?.data) return prev;
      const nextData = { ...prev.data };
      Object.keys(nextData).forEach((dateStr) => {
        const dayData = nextData[dateStr];
        if (!dayData?.bookedSlots) return;
        nextData[dateStr] = {
          ...dayData,
          bookedSlots: dayData.bookedSlots.map((slot) =>
            (slot.bookingId || slot.id) == bookingId
              ? { ...slot, bookingstatus }
              : slot
          ),
        };
      });
      return { ...prev, data: nextData };
    });
  }, []);

  const refreshScheduleSummary = useCallback(
    async ({ bookingId, bookingstatus = 5 } = {}) => {
      if (bookingId != null && bookingId !== "") {
        applyBookingStatus(bookingId, bookingstatus);
      }
      await getScheduleSummary();
    },
    [applyBookingStatus, getScheduleSummary]
  );

  const updateSelectedBookedSlotStatus = useCallback((updates = {}) => {
    setSelectedBookedSlot((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  useEffect(() => {
    getScheduleSummary();
  }, [getScheduleSummary]);

  const parseTimeStringToDate = (timeStr, defaultHour) => {
    if (!timeStr) return new Date(0, 0, 0, defaultHour, 0, 0);
    const parsed = moment(timeStr, "hh:mm A");
    if (!parsed.isValid()) return new Date(0, 0, 0, defaultHour, 0, 0);
    return new Date(0, 0, 0, parsed.hours(), parsed.minutes(), 0);
  };

  const calendarMinTime = useMemo(() => {
    return parseTimeStringToDate(scheduleSummary?.minStartTime, 7);
  }, [scheduleSummary]);

  const calendarMaxTime = useMemo(() => {
    return parseTimeStringToDate(scheduleSummary?.maxEndTime, 22);
  }, [scheduleSummary]);

  const isSlotAllowed = useCallback((date) => {
    if (isPastSlot(date)) return false;
    if (!scheduleSummary || !scheduleSummary.data) return true;

    const dateKey = moment(date).format("YYYY-MM-DD");
    const dayData = scheduleSummary.data[dateKey];

    if (!dayData) return false;
    if (dayData.isLeave || dayData.isOpen === false) return false;

    const slotTime = moment(date);
    const dayStart = moment(dateKey + " " + dayData.startTime, "YYYY-MM-DD hh:mm A");
    const dayEnd = moment(dateKey + " " + dayData.endTime, "YYYY-MM-DD hh:mm A");

    if (slotTime.isBefore(dayStart) || slotTime.isAfter(dayEnd)) {
      return false;
    }

    const leaveHours = Array.isArray(dayData.leaveHours)
      ? dayData.leaveHours
      : dayData.leaveHours
        ? [dayData.leaveHours]
        : [];

    if (leaveHours.length > 0) {
      for (const leave of leaveHours) {
        if (leave && leave.startTime && leave.endTime) {
          const leaveStart = moment(dateKey + " " + leave.startTime, "YYYY-MM-DD hh:mm A");
          const leaveEnd = moment(dateKey + " " + leave.endTime, "YYYY-MM-DD hh:mm A");
          if (slotTime.isSameOrAfter(leaveStart) && slotTime.isBefore(leaveEnd)) {
            return false;
          }
        }
      }
    }

    if (dayData.bookedSlots && Array.isArray(dayData.bookedSlots)) {
      for (const slot of dayData.bookedSlots) {
        if (slot && slot.start_time && slot.end_time) {
          const bookedStart = moment(dateKey + " " + slot.start_time, "YYYY-MM-DD hh:mm A");
          const bookedEnd = moment(dateKey + " " + slot.end_time, "YYYY-MM-DD hh:mm A");
          if (slotTime.isSameOrAfter(bookedStart) && slotTime.isBefore(bookedEnd)) {
            return false;
          }
        }
      }
    }

    return true;
  }, [scheduleSummary]);

  const isEventMoveAllowed = useCallback((event, nextStart, nextEnd) => {
    if (!event?.rawSlot || !scheduleSummary?.data) return false;
    if (isPastSlot(nextStart)) return false;

    const dateKey = moment(nextStart).format("YYYY-MM-DD");
    const dayData = scheduleSummary.data[dateKey];
    if (!dayData || dayData.isLeave || dayData.isOpen === false) return false;

    const slotStart = moment(nextStart);
    const slotEnd = moment(nextEnd);
    const dayStart = parseCalendarTime(dateKey, dayData.startTime);
    const dayEnd = parseCalendarTime(dateKey, dayData.endTime);

    if (!dayStart.isValid() || !dayEnd.isValid()) return false;
    if (slotStart.isBefore(dayStart) || slotEnd.isAfter(dayEnd)) return false;

    const leaveHours = Array.isArray(dayData.leaveHours)
      ? dayData.leaveHours
      : dayData.leaveHours
        ? [dayData.leaveHours]
        : [];

    for (const leave of leaveHours) {
      if (!leave?.startTime || !leave?.endTime) continue;
      const leaveStart = parseCalendarTime(dateKey, leave.startTime);
      const leaveEnd = parseCalendarTime(dateKey, leave.endTime);
      if (slotStart.isBefore(leaveEnd) && slotEnd.isAfter(leaveStart)) {
        return false;
      }
    }

    const currentBookingId = event.rawSlot.bookingId || event.rawSlot.id;
    for (const slot of dayData.bookedSlots || []) {
      const slotBookingId = slot.bookingId || slot.id;
      if (String(slotBookingId) === String(currentBookingId)) continue;
      if (!slot?.start_time || !slot?.end_time) continue;

      const bookedStart = parseCalendarTime(dateKey, slot.start_time);
      const bookedEnd = parseCalendarTime(dateKey, slot.end_time);
      if (slotStart.isBefore(bookedEnd) && slotEnd.isAfter(bookedStart)) {
        return false;
      }
    }

    return true;
  }, [scheduleSummary]);

  const [serviceOptions, setServiceOptions] = useState([
    { value: "", label: "Select Services", duration: DEFAULT_SLOT_MINUTES }
  ]);

  const getServiceDuration = (serviceValue) =>
    serviceOptions.find((option) => option.value === serviceValue)?.duration || DEFAULT_SLOT_MINUTES;

  const getActiveProviders = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.ACTIVE_EMPLOYEE_LIST);
      console.log("providers", res?.data?.data);

      if (res?.status) {
        setProviders(res?.data?.data || []);
        return;
      }
    } catch (error) {
      console.warn("POST to active-employee-list failed, trying GET...", error);
    }

    try {
      const res = await axiosApiCall.get(API_ROUTER?.ACTIVE_EMPLOYEE_LIST);
      if (res?.status) {
        setProviders(res?.data?.data || []);
      }
    } catch (error) {
      console.error("Error fetching active employees:", error);
    }
  };

  const getServices = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.GET_MY_SERVICES_LIST);
      if (res?.status) {
        const options = [];
        res?.data?.data?.forEach((s) => {
          options.push({
            value: String(s?.id),
            label: s?.name,
            image: s?.image,
            price: s?.price,
            time: { hour: s?.hour, minute: s?.minutes },
            calculatedTime: `(${s?.hour * 60 + s?.minutes} min)`,
            duration: (s?.hour || 0) * 60 + (s?.minutes || 0)
          });
        });
        setServiceOptions(options);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    getActiveProviders();
    getServices();
  }, []);

  const providerList = providers.length > 0 ? providers : (provider || []);

  const buildSlotEnd = (start, serviceValue) =>
    moment(start).add(getServiceDuration(serviceValue), "minutes").toDate();

  const handleSelectSlot = (slotInfo) => {
    if (!isSlotAllowed(slotInfo.start)) {
      toaster("This slot is not available for booking.", TOAST_TYPES.ERROR);
      return;
    }

    const start = slotInfo.start;
    setSelectedService("");
    setSelectedSlot({ start, end: buildSlotEnd(start, "") });
    setSelectedBookedSlot(null);
    setEditFromDragDrop(false);
    setIsEditing(false);
    setShowSidebar(true);
  };

  const handleSelecting = (range) => isSlotAllowed(range.start);

  const slotPropGetter = (date) => {
    if (isPastSlot(date)) {
      return { className: "rbc-slot-past" };
    }
    if (!isSlotAllowed(date)) {
      return { className: "rbc-slot-disabled" };
    }
    return {};
  };

  const dayPropGetter = (date) => {
    if (moment(date).isBefore(moment(), "day")) {
      return { className: "rbc-past-day" };
    }
    if (scheduleSummary && scheduleSummary.data) {
      const dateKey = moment(date).format("YYYY-MM-DD");
      const dayData = scheduleSummary.data[dateKey];
      if (dayData && (dayData.isLeave || dayData.isOpen === false)) {
        return { className: "rbc-disabled-day" };
      }
    }
    return {};
  };

  const handleServiceChange = (serviceValue) => {
    setSelectedService(serviceValue);
    setSelectedSlot((currentSlot) => {
      if (!currentSlot) return currentSlot;
      return {
        start: currentSlot.start,
        end: buildSlotEnd(currentSlot.start, serviceValue),
      };
    });
  };

  const handleSlotChange = (start) => {
    if (!moment(start).isSame(calenderDate, "day")) {
      setCalenderDate(start);
    }
    setSelectedSlot({
      start,
      end: buildSlotEnd(start, selectedService),
    });
  };

  const handleEventDrop = ({ event, start, end }) => {
    if (!event?.isBookedSlot || !event?.rawSlot) return;

    if (!isAppointmentDraggable(event.rawSlot)) {
      toaster("Only confirmed appointments can be moved.", TOAST_TYPES.ERROR);
      return;
    }

    if (!isEventMoveAllowed(event, start, end)) {
      toaster("This slot is not available for moving the appointment.", TOAST_TYPES.ERROR);
      return;
    }

    const bookingId = event.rawSlot.bookingId || event.rawSlot.id || event.rawSlot.booking_id;
    const dropDate = moment(start).format("YYYY-MM-DD");
    const dropStartTime = moment(start).format("h:mm A");
    const dropEndTime = moment(end).format("h:mm A");

    const updatedSlot = {
      ...event.rawSlot,
      date: dropDate,
      orderDate: dropDate,
      start_time: dropStartTime,
      end_time: dropEndTime,
    };

    const serviceId = String(
      updatedSlot.servicelist_id ||
      updatedSlot.service?.serviceListId ||
      updatedSlot.service?.serviceslistId ||
      updatedSlot.service?.serviceslist_id ||
      updatedSlot.service?.servicelist_id ||
      updatedSlot.service?.id ||
      updatedSlot.service_id ||
      updatedSlot.service?.serviceId ||
      ""
    );

    // Move the ticket immediately; Edit Appointment still confirms via Save Changes
    pendingDragMoveRef.current = {
      bookingId,
      dropDate,
      updatedSlot,
      previousSummary: scheduleSummary,
    };
    setScheduleSummary((prev) =>
      applyBookingMoveToSummary(prev, bookingId, dropDate, updatedSlot)
    );

    // Prevent drop from also triggering onSelectEvent (opens View Appointment)
    suppressEventSelectRef.current = true;
    isEditingRef.current = true;

    if (!moment(start).isSame(calenderDate, "day")) {
      setCalenderDate(start);
    }
    setSelectedService(serviceId);
    setSelectedBookedSlot(updatedSlot);
    setSelectedSlot(null);
    setEditFromDragDrop(true);
    setIsEditing(true);
    setShowSidebar(true);

    window.setTimeout(() => {
      suppressEventSelectRef.current = false;
    }, 100);
  };

  const handleDragEditSuccess = useCallback(async () => {
    pendingDragMoveRef.current = null;
    await getScheduleSummary();
  }, [getScheduleSummary]);

  const handleCloseSidebar = () => {
    if (pendingDragMoveRef.current?.previousSummary) {
      setScheduleSummary(pendingDragMoveRef.current.previousSummary);
    }
    pendingDragMoveRef.current = null;

    setShowSidebar(false);
    setSelectedSlot(null);
    setSelectedBookedSlot(null);
    setSelectedService("");
    setIsEditing(false);
    setEditFromDragDrop(false);
    setSelectedId?.(0);
  };

  const openNewAppointment = useCallback(async () => {
    const currentDate = moment().format("YYYY-MM-DD");

    let start = getNextHalfHourSlot().toDate();

    try {
      const url = `${API_ROUTER?.GET_SCHEDULES}?date=${currentDate}`;
      const res = await axiosApiCall.get(url);
      console.log("res openNewAppointment", res);
      if (res?.status) {
        const payload = res?.data?.data ?? res?.data;
        if (payload && payload.date && payload.firstSlot) {
          const combined = moment(`${payload.date} ${payload.firstSlot}`, [
            "YYYY-MM-DD hh:mm:ss A",
            "YYYY-MM-DD hh:mm A",
            "YYYY-MM-DD HH:mm:ss",
            "YYYY-MM-DD HH:mm",
          ]);
          if (combined.isValid()) {
            start = combined.toDate();
          }
        } else {
          const candidates = [];

          const pushCandidate = (item) => {
            if (!item || typeof item !== "object" || Array.isArray(item)) return;
            const dateStr =
              item.date ||
              item.startDate ||
              item.start_date ||
              item.orderDate ||
              item.suggestedDate ||
              item.availableDate;
            const timeStr =
              item.time ||
              item.start_time ||
              item.startTime ||
              item.slot_time ||
              item.suggestedTime ||
              item.availableTime;
            const timeType = item.time_type || item.start_type || item.timeType || "";
            if (!dateStr) return;

            const dateKey = moment(dateStr).isValid()
              ? moment(dateStr).format("YYYY-MM-DD")
              : String(dateStr);

            let parsed = null;
            if (timeStr) {
              parsed = moment(
                `${dateKey} ${timeStr} ${timeType}`.trim(),
                [
                  "YYYY-MM-DD hh:mm A",
                  "YYYY-MM-DD hh:mm:ss A",
                  "YYYY-MM-DD hh:mm a",
                  "YYYY-MM-DD hh:mm:ss a",
                  "YYYY-MM-DD HH:mm:ss",
                  "YYYY-MM-DD HH:mm",
                ],
                true
              );
              if (!parsed.isValid()) {
                parsed = moment(`${dateKey} ${timeStr}`, [
                  "YYYY-MM-DD hh:mm A",
                  "YYYY-MM-DD hh:mm:ss A",
                  "YYYY-MM-DD hh:mm a",
                  "YYYY-MM-DD hh:mm:ss a",
                  "YYYY-MM-DD HH:mm:ss",
                  "YYYY-MM-DD HH:mm",
                ]);
              }
            } else {
              parsed = moment(dateKey, "YYYY-MM-DD");
            }

            if (parsed?.isValid()) candidates.push(parsed);
          };

          const walk = (value) => {
            if (!value) return;
            if (Array.isArray(value)) {
              value.forEach(walk);
              return;
            }
            if (typeof value !== "object") return;
            pushCandidate(value);
            ["data", "schedules", "slots", "list", "availableSlots", "nextSlot"].forEach((key) => {
              if (value[key] != null) walk(value[key]);
            });
          };

          walk(payload);
          if (candidates.length) {
            candidates.sort((a, b) => a.valueOf() - b.valueOf());
            const upcoming = candidates.find((item) => item.isSameOrAfter(moment(), "minute"));
            start = (upcoming || candidates[0]).toDate();
          }
        }
      }
    } catch {
      // Fall back to next half-hour slot
    }

    setCalenderDate(start);
    setSelectedService("");
    setSelectedSlot({ start, end: buildSlotEnd(start, "") });
    setSelectedBookedSlot(null);
    setEditFromDragDrop(false);
    setIsEditing(false);
    setShowSidebar(true);
  }, [currentUser]);

  const handlePaymentSuccessFromParent = useCallback(async () => {
    handleCloseSidebar();
    await getScheduleSummary();
  }, [getScheduleSummary]);

  useImperativeHandle(ref, () => ({
    openNewAppointment,
    refreshScheduleSummary,
    onPaymentSuccess: handlePaymentSuccessFromParent,
  }));

  const handleCalendarNavigate = (date, _view, action) => {
    setCalenderDate(date);
    handleCloseSidebar();
  };

  const events = useMemo(() => {
    const calendarEvents = [];

    if (scheduleSummary && scheduleSummary.data) {
      Object.entries(scheduleSummary.data).forEach(([dateStr, dayData]) => {
        if (dayData && dayData.bookedSlots && Array.isArray(dayData.bookedSlots)) {
          dayData.bookedSlots.forEach((slot, index) => {
            if (slot.start_time && slot.end_time) {
              const startStr = `${dateStr} ${slot.start_time}`;
              const endStr = `${dateStr} ${slot.end_time}`;
              const start = moment(startStr, "YYYY-MM-DD hh:mm A").toDate();
              const end = moment(endStr, "YYYY-MM-DD hh:mm A").toDate();

              let title = "Already Booked";
              if (slot.service && slot.service.serviceName) {
                const hour = slot.service.hour || 0;
                const minutes = slot.service.minutes || 0;
                const duration = hour * 60 + minutes;
                title = `${slot.service.serviceName} (${duration} min)`;
              }
              if (slot.client && (slot.client.clientName || slot.client.name)) {
                const name = slot.client.clientName || slot.client.name;
                title += ` - ${name}`;
              }

              calendarEvents.push({
                id: `booked-slot-${dateStr}-${index}`,
                start,
                end,
                title,
                isBookedSlot: true,
                rawSlot: { ...slot, date: dateStr },
              });
            }
          });
        }
      });
    }

    if (!selectedSlot || selectedBookedSlot) return calendarEvents;

    return [
      ...calendarEvents,
      {
        id: "new-appointment-preview",
        start: selectedSlot.start,
        end: selectedSlot.end,
        title: "New Appointment",
        isPreview: true,
      },
    ];
  }, [selectedSlot, selectedBookedSlot, scheduleSummary]);

  const CustomWeekHeader = ({ date }) => {
    const dayName = moment(date).format("ddd").toUpperCase();
    const dayNum = moment(date).format("D");
    const isToday = moment(date).isSame(moment(), "day");

    return (
      <div className={`custom-day-header ${isToday ? "is-today" : ""}`}>
        <span className="day-name">{dayName}</span>
        <span className="day-number">{dayNum}</span>
      </div>
    );
  };

  const CustomEvent = ({ event }) => {
    if (event.isBookedSlot) {
      const statusClass = getStatusClass(event.rawSlot);
      return (
        <div className={`custom-calendar-event event-booked ${statusClass}`} title={event.title}>
          <div className="event-title">{event.title}</div>
          <div className="event-time">
            {moment(event.start).format("h:mm a")} - {moment(event.end).format("h:mm a")}
          </div>
        </div>
      );
    }

    if (!event.isPreview) return null;

    const expandedClass = selectedService ? " event-preview-expanded" : "";

    return (
      <div className={`custom-calendar-event event-preview${expandedClass}`}>
        <div className="event-title">New Appointment</div>
        <div className="event-time">{moment(event.start).format("h:mm a")}</div>
      </div>
    );
  };

  return (
    <CalendarLayoutWrapper>
      <CalendarMainArea>
        <CalendarContainer>
          <DragAndDropCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            view={currentView}
            views={["week", "day"]}
            dayLayoutAlgorithm="no-overlap"
            onView={(view) => {
              setCurrentView(view);
              handleCloseSidebar();
            }}
            date={calenderDate}
            onNavigate={handleCalendarNavigate}
            step={30}
            timeslots={2}
            min={calendarMinTime}
            max={calendarMaxTime}
            selectable
            draggableAccessor={(event) =>
              Boolean(event?.isBookedSlot && isAppointmentDraggable(event?.rawSlot))
            }
            resizable={false}
            onEventDrop={handleEventDrop}
            onSelectSlot={handleSelectSlot}
            onSelecting={handleSelecting}
            slotPropGetter={slotPropGetter}
            dayPropGetter={dayPropGetter}
            onSelectEvent={(event) => {
              // Ignore only the select that follows a successful drop
              if (suppressEventSelectRef.current) {
                suppressEventSelectRef.current = false;
                return;
              }
              if (event.isBookedSlot && event.rawSlot) {
                setSelectedBookedSlot(event.rawSlot);
                setSelectedSlot(null);
                setEditFromDragDrop(false);
                setIsEditing(false);
                setShowSidebar(true);
              }
            }}
            eventPropGetter={(event) => {
              if (event.isBookedSlot) {
                const statusClass = getStatusClass(event.rawSlot);
                return {
                  className: `event-booked-slot ${statusClass}-slot`,
                };
              }
              if (event.isPreview) {
                return {
                  className: `event-preview-slot${selectedService ? " event-preview-expanded" : ""
                    }`,
                };
              }
              return {};
            }}
            formats={{
              timeGutterFormat: (date, culture, localizer) =>
                localizer.format(date, "h A", culture),
            }}
            components={{
              toolbar: (props) => (
                <CustomToolbar
                  {...props}
                  provider={providerList}
                  currentUser={currentUser}
                  handleUserClick={setSelectedId}
                />
              ),
              week: {
                header: CustomWeekHeader,
              },
              day: {
                header: CustomWeekHeader,
              },
              event: CustomEvent,
            }}
          />
        </CalendarContainer>
      </CalendarMainArea>

      {showSidebar && selectedSlot && !selectedBookedSlot && (
        <NewAppointmentSidebar
          selectedSlot={selectedSlot}
          onClose={handleCloseSidebar}
          selectedService={selectedService}
          onServiceChange={handleServiceChange}
          onSlotChange={handleSlotChange}
          serviceOptions={serviceOptions}
          scheduleSummary={scheduleSummary}
          selectedProvider={providerList.find((u) => u.id === currentUser)}
          setSelectedId={setSelectedId}
          onSuccess={getScheduleSummary}
        />
      )}

      {showSidebar && selectedBookedSlot && !isEditing && (
        <BookedAppointmentDetails
          bookedAppointment={selectedBookedSlot}
          onClose={handleCloseSidebar}
          setIsEditing={(value) => {
            setEditFromDragDrop(false);
            setIsEditing(value);
          }}
          onSuccess={getScheduleSummary}
          onStatusUpdate={updateSelectedBookedSlotStatus}
          scheduleSummary={scheduleSummary}
        />
      )}

      {showSidebar && selectedBookedSlot && isEditing && (
        <EditAppointmentSidebar
          key={`edit-${selectedBookedSlot.bookingId || selectedBookedSlot.id}-${selectedBookedSlot.start_time}-${selectedBookedSlot.date}`}
          bookedAppointment={selectedBookedSlot}
          onClose={handleCloseSidebar}
          setIsEditing={setIsEditing}
          fromDragDrop={editFromDragDrop}
          selectedService={selectedService}
          onServiceChange={handleServiceChange}
          onSlotChange={handleSlotChange}
          serviceOptions={serviceOptions}
          scheduleSummary={scheduleSummary}
          selectedProvider={providerList.find((u) => u.id === currentUser)}
          setSelectedId={setSelectedId}
          onSuccess={handleDragEditSuccess}
        />
      )}
    </CalendarLayoutWrapper>
  );
});

NewCustomCalender.displayName = "NewCustomCalender";

const CustomToolbar = ({ date, view, onNavigate, onView, provider, currentUser, handleUserClick }) => {
  const [therapistDropdownOpen, setTherapistDropdownOpen] = useState(false);
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);
  const [failedImageIds, setFailedImageIds] = useState(new Set());
  const therapistDropdownRef = useRef(null);
  const monthDropdownRef = useRef(null);
  const monthOptions = useMemo(() => getMonthOptions(), []);

  const handleImageError = (id) => {
    setFailedImageIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const getInitials = (u) => {
    if (!u) return "";
    const firstName = u.firstName || u.first_name || "";
    const lastName = u.lastName || u.last_name || "";
    if (firstName || lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }
    if (u.name) {
      const parts = u.name.trim().split(/\s+/);
      if (parts.length > 1) {
        return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
      }
      return parts[0].substring(0, 2).toUpperCase();
    }
    return "";
  };

  const renderAvatar = (u) => {
    if (u?.image && !failedImageIds.has(u.id)) {
      return (
        <TherapistAvatar
          src={u.image}
          onError={() => handleImageError(u.id)}
        />
      );
    }
    return (
      <div
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          backgroundColor: "#004D87",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "11px",
          fontWeight: "700",
          textTransform: "uppercase",
          flexShrink: 0,
        }}
      >
        {getInitials(u)}
      </div>
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (therapistDropdownRef.current && !therapistDropdownRef.current.contains(event.target)) {
        setTherapistDropdownOpen(false);
      }
      if (monthDropdownRef.current && !monthDropdownRef.current.contains(event.target)) {
        setMonthDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formattedMonth = moment(date).format("MMMM YYYY").toUpperCase();
  const selectedUser = provider?.find((u) => u.id === currentUser);

  const handleMonthSelect = (monthDate) => {
    const targetDate = moment(monthDate).startOf("month").toDate();
    onNavigate("DATE", targetDate);
    setMonthDropdownOpen(false);
  };

  return (
    <ToolbarWrapper>
      <ToolbarLeft>
        <TodayButton onClick={() => onNavigate("TODAY")}>TODAY</TodayButton>
        <NavButtonGroup>
          <NavButton onClick={() => onNavigate("PREV")}>
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 9L1 5L5 1" stroke="#7A869A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </NavButton>
          <NavButton onClick={() => onNavigate("NEXT")}>
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 9L5 5L1 1" stroke="#7A869A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </NavButton>
        </NavButtonGroup>
        <MonthDropdownContainer ref={monthDropdownRef}>
          <MonthDropdownButton type="button" onClick={() => setMonthDropdownOpen(!monthDropdownOpen)}>
            {formattedMonth}
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="#004D87" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MonthDropdownButton>

          {monthDropdownOpen && (
            <MonthDropdownMenu>
              {monthOptions.map((option) => (
                <MonthDropdownItem
                  key={option.key}
                  type="button"
                  active={moment(date).isSame(option.date, "month")}
                  onClick={() => handleMonthSelect(option.date)}
                >
                  {option.label}
                </MonthDropdownItem>
              ))}
            </MonthDropdownMenu>
          )}
        </MonthDropdownContainer>
      </ToolbarLeft>

      <ToolbarRight>
        <TherapistDropdownContainer ref={therapistDropdownRef}>
          <TherapistDropdownButton onClick={() => setTherapistDropdownOpen(!therapistDropdownOpen)}>
            {selectedUser ? (
              <>
                {renderAvatar(selectedUser)}
                <TherapistName>{selectedUser.name}</TherapistName>
              </>
            ) : (
              <>
                <TherapistAvatar src="/images/profile-icon.svg" />
                <TherapistName>All Therapists</TherapistName>
              </>
            )}
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "4px" }}>
              <path d="M1 1L5 5L9 1" stroke="#7A869A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </TherapistDropdownButton>

          {therapistDropdownOpen && (
            <TherapistDropdownMenu>
              <TherapistDropdownItem
                onClick={() => {
                  handleUserClick(0);
                  setTherapistDropdownOpen(false);
                }}
              >
                <TherapistAvatar src="/images/profile-icon.svg" />
                <TherapistName>All Therapists</TherapistName>
              </TherapistDropdownItem>
              {provider?.map((prov) => (
                <TherapistDropdownItem
                  key={prov.id}
                  onClick={() => {
                    handleUserClick(prov.id);
                    setTherapistDropdownOpen(false);
                  }}
                >
                  {renderAvatar(prov)}
                  <TherapistName>{prov.name}</TherapistName>
                </TherapistDropdownItem>
              ))}
            </TherapistDropdownMenu>
          )}
        </TherapistDropdownContainer>

        <ViewModeToggleContainer>
          <ViewModeButton active={view === "day"} onClick={() => onView("day")}>
            DAY
          </ViewModeButton>
          <ViewModeButton active={view === "week"} onClick={() => onView("week")}>
            WEEK
          </ViewModeButton>
        </ViewModeToggleContainer>
      </ToolbarRight>
    </ToolbarWrapper>
  );
};

export default NewCustomCalender;
