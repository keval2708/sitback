"use client";

import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import LeaveScheduleTab from "./LeaveScheduleTab";
import LunchBlockTab from "./LunchBlockTab";
import { useWorkHoursEditFlow } from "./WorkHoursEditFlow";
import {
  buildWeekDays,
  canNavigateToPreviousWeek,
  formatDayLabel,
  formatWeekRangeLabel,
  getScheduleHoursForDate,
  getWeekStartSunday,
} from "./workHoursUtils";

import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

export default function WorkHoursPanel({ therapist }) {
  const { t } = useTranslation();
  const { toaster } = useToaster();

  const today = useMemo(() => dayjs().startOf("day"), []);
  const currentWeekStart = useMemo(() => getWeekStartSunday(today), [today]);

  const [viewWeekStart, setViewWeekStart] = useState(currentWeekStart);
  const [baseSchedule, setBaseSchedule] = useState(null);
  const [weekScheduleMap, setWeekScheduleMap] = useState({});
  const [loading, setLoading] = useState(true);

  // Holiday / Leave / Lunch state
  const [holidays, setHolidays] = useState([]);
  const [activeTab, setActiveTab] = useState("leave");
  const [lunchBlocksCount, setLunchBlocksCount] = useState(0);

  const filteredLeaves = useMemo(() => {
    return holidays.filter((h) => h.name !== "Lunch Block");
  }, [holidays]);

  const fetchHolidays = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.GET_EMPLOYEE_LEAVE_SCHEDULE + `?employeeId=` + therapist?.id);

      if (res?.status) {
        const list = res?.data?.data?.leaveList || [];
        const mapped = list.map((h) => {
          const isRepeatingVal = h?.isRepeating === true || h?.isRepeating === "true" || h?.isRepeating === 1 || h?.isRepeating === "1";
          return {
            id: h?.id,
            name: h?.reason || "",
            date: h?.leaveDate || "",
            isOpen: h?.leaveType === "full_day" ? false : Boolean(h?.start_time && h?.end_time),
            start_time: h?.start_time || "",
            end_time: h?.end_time || "",
            isRepeating: isRepeatingVal,
            days: h?.days || "",
          };
        });
        setHolidays(mapped);
      } else {
        toaster(res?.message || "Failed to fetch holidays", TOAST_TYPES.ERROR);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const visibleDays = useMemo(
    () => buildWeekDays(viewWeekStart, null),
    [viewWeekStart]
  );

  const weekRangeLabel = useMemo(
    () => formatWeekRangeLabel(viewWeekStart),
    [viewWeekStart]
  );

  const canGoPrevious = canNavigateToPreviousWeek(viewWeekStart, today);

  const fetchWorkHours = async (showLoading = true) => {
    if (!therapist?.id) return;

    const weekEnd = dayjs(viewWeekStart).add(6, "day");

    try {
      if (showLoading) setLoading(true);
      const res = await axiosApiCall.get(API_ROUTER?.GET_EMPLOYEE_SCHEDULE, {
        params: {
          employeeId: therapist.id,
          fromDate: viewWeekStart.format("YYYY-MM-DD"),
          toDate: weekEnd.format("YYYY-MM-DD"),
        },
      });

      const responseData = res?.data || res || {};
      const nestedData = responseData?.data || {};

      const scheduleList = responseData?.scheduleList || nestedData?.scheduleList || [];

      const weekMap = {};
      if (Array.isArray(scheduleList)) {
        scheduleList.forEach((entry) => {
          if (!entry?.date) return;
          const formattedDate = dayjs(entry.date).format("YYYY-MM-DD");
          weekMap[formattedDate] = entry;
        });
      }

      setWeekScheduleMap(weekMap);

      if (scheduleList.length > 0) {
        setBaseSchedule(scheduleList[0]);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkHours();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [therapist?.id, viewWeekStart]);

  const getHoursForDay = (date) => {
    const dateKey = date.format("YYYY-MM-DD");
    const weekEntry = weekScheduleMap[dateKey];

    if (weekEntry) {
      const isLeave = weekEntry.isLeave === true || weekEntry.isLeave === "true" || weekEntry.isLeave === 1 || weekEntry.isLeave === "1";
      const isPartialLeave = weekEntry.isPartialLeave === true || weekEntry.isPartialLeave === "true" || weekEntry.isPartialLeave === 1 || weekEntry.isPartialLeave === "1";

      if (isLeave) {
        if (isPartialLeave) {
          const uSlot = weekEntry.unavailableSlots;
          const reason = uSlot?.reason || uSlot?.slotTitle || weekEntry?.holiday?.holidayName || "Leave";
          const startTime = uSlot?.start_time || uSlot?.startTime;
          const endTime = uSlot?.end_time || uSlot?.endTime;
          const displayStr = startTime && endTime ? `${reason}: ${startTime} - ${endTime}` : reason;
          return { text: displayStr, isRed: false, isLeave: true };
        } else {
          const uSlot = weekEntry.unavailableSlots;
          const reason = uSlot?.reason || uSlot?.slotTitle || weekEntry?.holiday?.holidayName || "Leave";
          return { text: reason, isRed: true, isLeave: true };
        }
      } else if (isPartialLeave) {
        const reason = weekEntry?.holiday?.holidayName || "Leave";
        const startTime = weekEntry?.holiday?.startTime;
        const endTime = weekEntry?.holiday?.endTime;
        const displayStr = startTime && endTime ? `${reason}: ${startTime} - ${endTime}` : reason;
        return { text: displayStr, isRed: false, isLeave: true };
      }

      const isUnavailable = weekEntry.isUnavailable === true || weekEntry.isUnavailable === "true" || weekEntry.isUnavailable === 1 || weekEntry.isUnavailable === "1";
      if (isUnavailable) {
        return { text: t("Unavailable") || "Unavailable", isRed: false };
      }

      const isOpen = weekEntry.isOpen === true || weekEntry.isOpen === "true" || weekEntry.isOpen === 1 || weekEntry.isOpen === "1";
      if (!isOpen) {
        return { text: t("Closed") || "Closed", isRed: true, isLeave: true };
      }

      const isSpaScheduleVal = weekEntry.isSpaSchedule;
      const isSpaSchedule = isSpaScheduleVal === true || isSpaScheduleVal === "true" || isSpaScheduleVal === 1 || isSpaScheduleVal === "1";

      if (!isSpaSchedule && Array.isArray(weekEntry.slots) && weekEntry.slots.length > 0) {
        const slotStrings = weekEntry.slots.map(slot => {
          const sTime = slot.start_time || slot.startTime;
          const eTime = slot.end_time || slot.endTime;
          return sTime && eTime ? `${sTime} - ${eTime}` : "";
        }).filter(Boolean);
        if (slotStrings.length > 0) {
          return { text: slotStrings.join(", "), isRed: false };
        }
      }

      const startTime = weekEntry.start_time || weekEntry.startTime;
      const endTime = weekEntry.end_time || weekEntry.endTime;

      if (startTime && endTime) {
        return { text: `${startTime} - ${endTime}`, isRed: false };
      }
      return { text: t("Closed") || "Closed", isRed: false };
    }

    return { text: getScheduleHoursForDate(date, baseSchedule) || t("notScheduled"), isRed: false };
  };

  const handlePreviousWeek = () => {
    if (!canGoPrevious) return;
    setViewWeekStart((prev) => prev.subtract(7, "day"));
  };

  const handleNextWeek = () => {
    setViewWeekStart((prev) => prev.add(7, "day"));
  };

  const handleSaveWorkHours = async (saveData) => {
    if (!therapist?.id) return;

    try {
      const isRepeating = saveData.type === "repeating";
      const payload = {
        employeeId: therapist.id,
        scheduleDate: dayjs(saveData.date).format("YYYY-MM-DD"),
        isRepeating: isRepeating,
        isWorking: !saveData.notWorking,
        day: dayjs(saveData.date).format("dddd"),
        slots: (saveData.shifts || []).map((shift) => ({
          start_time: moment(shift.startTime, "h:mm A").format("hh:mm A"),
          end_time: moment(shift.endTime, "h:mm A").format("hh:mm A"),
          slotTitle: "Working Hours",
        })),
      };

      const res = await axiosApiCall.post(
        API_ROUTER?.ADD_EDIT_EMPLOYEE_SCHEDULE,
        payload
      );

      if (!res?.status) {
        toaster(res?.message || t("failedToSaveWorkHours"), TOAST_TYPES.ERROR);
        return;
      }

      await fetchWorkHours();
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const { openEditFlow, modals } = useWorkHoursEditFlow({
    baseSchedule,
    weekScheduleMap,
    onSaved: handleSaveWorkHours,
  });

  return (
    <>
      <div className="profile-subtab-panel work-hours-panel">
        <div className="work-hours-header">
          <h3>{t("workHours")}</h3>
          <div className="work-hours-week-nav">
            <span className="work-hours-range">{weekRangeLabel}</span>
            <button
              type="button"
              className="week-nav-btn"
              onClick={handlePreviousWeek}
              disabled={!canGoPrevious}
              aria-label={t("previousWeek")}
            >
              <img alt="" src="/images/calender-arrow.svg" />
            </button>
            <button
              type="button"
              className="week-nav-btn next"
              onClick={handleNextWeek}
              aria-label={t("nextWeek")}
            >
              <img alt="" src="/images/calender-arrow.svg" />
            </button>
          </div>
        </div>

        <div className="work-hours-list">
          {loading ? (
            <div style={{ cursor: 'default', pointerEvents: 'none', padding: '10px 0' }}>
              {[1, 2, 3].map((item) => (
                <div key={item} className="work-hours-row" style={{ display: 'flex', gap: '20px', marginBottom: '12px' }}>
                  <div className="work-hours-day" style={{ flex: '0 0 100px' }}>
                    <Skeleton width={50} height={14} style={{ marginBottom: '4px' }} />
                    <Skeleton width={70} height={16} />
                  </div>
                  <div className="work-hours-slot" style={{ flex: '1' }}>
                    <div className="work-hours-bar">
                      <Skeleton width={150} height={20} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : visibleDays.length === 0 ? (
            <p className="work-hours-empty">{t("noUpcomingWorkHours")}</p>
          ) : (
            visibleDays.map((date) => {
              const { day, date: dateLabel } = formatDayLabel(date);
              const hours = getHoursForDay(date);
              const isCurrentOrFuture = date.isSame(today, 'day') || date.isAfter(today, 'day');

              return (
                <div key={date.format("YYYY-MM-DD")} className="work-hours-row">
                  <div className="work-hours-day">
                    <span className="day-name">{day}</span>
                    <span className="day-date">{dateLabel}</span>
                  </div>

                  <div className="work-hours-slot">
                    <div className="work-hours-bar">
                      <span style={hours?.isRed ? { color: '#E32C1F' } : {}}>{hours?.text || t("notScheduled")}</span>
                      {isCurrentOrFuture && !hours?.isLeave && (
                        <button
                          type="button"
                          className="work-hours-edit-btn"
                          onClick={() => openEditFlow(date)}
                          aria-label={t("editWorkHours")}
                        >
                          <img alt="" src="/images/Edit-icon.svg" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Holiday Schedule Section */}
        <div className="holiday-schedule-section">
          {/* Sub-tabs Navigation */}
          <div className="holiday-tabs-nav">
            <button
              type="button"
              className={`holiday-tab-btn ${activeTab === "leave" ? "active" : ""}`}
              onClick={() => setActiveTab("leave")}
            >
              Time Block
            </button>
            <button
              type="button"
              className={`holiday-tab-btn ${activeTab === "lunch" ? "active" : ""}`}
              onClick={() => setActiveTab("lunch")}
            >
              Lunch Block
            </button>
          </div>

          <div className="holiday-section-header d-flex justify-content-between align-items-center">
            <div>
              <h3>{activeTab === "lunch" ? "Lunch Block" : "Time Block"}</h3>
              <p>
                {activeTab === "lunch"
                  ? `${lunchBlocksCount === 0 ? "No" : lunchBlocksCount
                  } lunch ${lunchBlocksCount < 2 ? "block" : "blocks"} configured`
                  : `${filteredLeaves?.length === 0 ? "No" : filteredLeaves?.length
                  } time ${filteredLeaves?.length < 2 ? "block" : "block"} configured`}
              </p>
            </div>
          </div>

          {activeTab === "leave" ? (
            <LeaveScheduleTab
              therapist={therapist}
              holidays={holidays}
              fetchHolidays={fetchHolidays}
              fetchWorkHours={fetchWorkHours}
            />
          ) : (
            <LunchBlockTab
              therapist={therapist}
              fetchWorkHours={fetchWorkHours}
              onLunchBlocksCountChange={setLunchBlocksCount}
            />
          )}
        </div>
      </div>
      {modals}
    </>
  );
}
