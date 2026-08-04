import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import DateTime from "react-datetime";
import ReactDatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "react-datetime/css/react-datetime.css";
import Switch from "react-switch";
import EditableHours, {
  validateEndTimeGreaterThanStartTime,
  validateTimeFormat,
} from "./EditableHours";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { useToaster } from "@/hooks";
import { handleBank, tabHandle } from "@/redux/messageTab";
import { PATH_DASHBOARD } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import {
  FormGroup,
} from "@/styles/global/main.style";
import { HoursModalWrapper, StyledHoursModal } from "@/styles/pages/profile.style";

const CloseModalIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#E32C1F' }}>
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { getSocketId } from "@/utils/helper";

const STATIC_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const EmptyStateIcon = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#8fb1d6' }}>
    <rect x="15" y="15" width="30" height="30" rx="4" stroke="currentColor" strokeWidth="2.5" />
    <path d="M15 24H45" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="23" cy="32" r="2" fill="currentColor" />
    <circle cx="30" cy="32" r="2" fill="currentColor" />
    <circle cx="37" cy="32" r="2" fill="currentColor" />
    <circle cx="23" cy="39" r="2" fill="currentColor" />
    <circle cx="30" cy="39" r="2" fill="currentColor" />
    <circle cx="37" cy="39" r="2" fill="currentColor" />
    <path d="M22 11V15M38 11V15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

function SetForAllDaysModal({
  show,
  onHide,
  days,
  defaultStart,
  defaultEnd,
  onConfirm,
  saving,
}) {
  const [errors, setErrors] = useState({});
  const [selectedDays, setSelectedDays] = useState([]);
  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      startTime: defaultStart || "09:00 AM",
      endTime: defaultEnd || "06:00 PM",
    },
  });

  useEffect(() => {
    if (show) {
      setErrors({});
      setSelectedDays(days && days.length > 0 ? days : STATIC_DAYS);
      reset({
        startTime: defaultStart || "09:00 AM",
        endTime: defaultEnd || "06:00 PM",
      });
    }
  }, [show, defaultStart, defaultEnd, reset, days]);

  const onSubmit = (data) => {
    const newErrors = {};
    if (!data.startTime || !validateTimeFormat(data.startTime)) {
      newErrors.startTime = "Start time required";
    }
    if (!data.endTime || !validateTimeFormat(data.endTime)) {
      newErrors.endTime = "End time required";
    }
    if (
      data.startTime &&
      data.endTime &&
      !validateEndTimeGreaterThanStartTime(data.startTime, data.endTime)
    ) {
      newErrors.endTime = "End time must be later than start time";
    }
    if (selectedDays.length === 0) {
      newErrors.selectedDays = "At least one day must be selected";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const payload = selectedDays.map((day) => ({
      day,
      start_time: data.startTime,
      end_time: data.endTime,
    }));
    onConfirm(payload);
  };

  return (
    <StyledHoursModal
      show={show}
      onHide={onHide}
      centered
      className="sitback-modal-wrapper hours-modal-custom"
      backdrop={saving ? "static" : true}
      keyboard={!saving}
    >
      <Modal.Body>
        <HoursModalWrapper>
          <button
            type="button"
            className="close-modal-btn"
            onClick={onHide}
            disabled={saving}
            aria-label="close"
          >
            <CloseModalIcon />
          </button>
          <h3 className="modal-title-text">Set for all days</h3>
          <p className="set-all-days-modal-intro">
            Choose a start and end time to apply to all days in your schedule.
          </p>

          <div className="selected-days-chips-container">
            {selectedDays.map((day) => {
              const shortDay = day.substring(0, 3);
              return (
                <div className="day-chip" key={day}>
                  <span>{shortDay}</span>
                  <button
                    type="button"
                    className="remove-day-btn"
                    disabled={selectedDays.length <= 1}
                    onClick={() => {
                      if (selectedDays.length <= 1) return;
                      setSelectedDays((prev) => {
                        const updated = prev.filter((d) => d !== day);
                        if (updated.length > 0) {
                          setErrors((err) => {
                            const next = { ...err };
                            delete next.selectedDays;
                            return next;
                          });
                        }
                        return updated;
                      });
                    }}
                    aria-label={`Remove ${day}`}
                  >
                    &times;
                  </button>
                </div>
              );
            })}
          </div>
          {errors.selectedDays ? (
            <p className="text-danger text-center mb-3">{errors.selectedDays}</p>
          ) : null}

          <Form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="set-all-days-modal-row">
              <FormGroup>
                <label htmlFor="set-all-days-start">
                  Start Time
                </label>
                <Controller
                  control={control}
                  name="startTime"
                  render={({ field }) => (
                    <DateTime
                      {...field}
                      timeFormat="hh:mm A"
                      dateFormat={false}
                      closeOnSelect
                      focusOnOpen={false}
                      inputProps={{
                        id: "set-all-days-start",
                        disabled: Boolean(saving),
                        className: "form-control set-all-days-time-input",
                        "aria-label": "Start time",
                      }}
                      value={field.value || defaultStart}
                      onChange={(date) => {
                        if (date) {
                          const formatted = moment(date).format("hh:mm A");
                          setValue("startTime", formatted);
                          setErrors((prev) => {
                            const next = { ...prev };
                            delete next.startTime;
                            return next;
                          });
                        } else {
                          setValue("startTime", "");
                        }
                      }}
                    />
                  )}
                />
                {errors.startTime ? (
                  <p className="text-danger mt-1">{errors.startTime}</p>
                ) : null}
              </FormGroup>

              <FormGroup>
                <label htmlFor="set-all-days-end">
                  End Time
                </label>
                <Controller
                  control={control}
                  name="endTime"
                  render={({ field }) => (
                    <DateTime
                      {...field}
                      timeFormat="hh:mm A"
                      dateFormat={false}
                      closeOnSelect
                      focusOnOpen={false}
                      inputProps={{
                        id: "set-all-days-end",
                        disabled: Boolean(saving),
                        className: "form-control set-all-days-time-input",
                        "aria-label": "End time",
                      }}
                      value={field.value || defaultEnd}
                      onChange={(date) => {
                        if (date) {
                          const formatted = moment(date).format("hh:mm A");
                          setValue("endTime", formatted);
                          setErrors((prev) => {
                            const next = { ...prev };
                            delete next.endTime;
                            return next;
                          });
                        } else {
                          setValue("endTime", "");
                        }
                      }}
                    />
                  )}
                />
                {errors.endTime ? (
                  <p className="text-danger mt-1">{errors.endTime}</p>
                ) : null}
              </FormGroup>
            </div>

            <div className="modal-buttons-row">
              <button
                type="button"
                className="cancel-btn"
                onClick={onHide}
                disabled={saving}
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="submit-btn"
                disabled={saving}
              >
                {saving ? "SAVING…" : "SAVE"}
              </button>
            </div>
          </Form>
        </HoursModalWrapper>
      </Modal.Body>
    </StyledHoursModal>
  );
}

export const Hours = () => {
  // hooks
  const { toaster } = useToaster();
  const { t } = useTranslation();
  const { push } = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [spaWorkingHours, setSpaWorkingHours] = useState([]);
  const [checkBankDetailModal, setCheckBankDetailModal] = useState(false);
  const [showSetAllDaysModal, setShowSetAllDaysModal] = useState(false);
  const [bulkSaving, setBulkSaving] = useState(false);

  // Week navigation state (defaulting to current date to prevent past weeks selection)
  const [currentDate, setCurrentDate] = useState(moment());

  // Holiday schedule states
  const [holidays, setHolidays] = useState([]);
  const [newHolidayName, setNewHolidayName] = useState("");
  const [newHolidayDate, setNewHolidayDate] = useState("");
  const [newHolidayIsClosed, setNewHolidayIsClosed] = useState(true);
  const [newHolidayStart, setNewHolidayStart] = useState("10:00 AM");
  const [newHolidayEnd, setNewHolidayEnd] = useState("02:00 PM");
  const [addingHoliday, setAddingHoliday] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deletingHoliday, setDeletingHoliday] = useState(false);

  const startOfWeek = useMemo(() => moment(currentDate).startOf("week"), [currentDate]);
  const endOfWeek = useMemo(() => moment(currentDate).endOf("week"), [currentDate]);

  const allDayKeys = useMemo(
    () => (spaWorkingHours || []).map(({ day }) => day),
    [spaWorkingHours]
  );
  const firstHoursRow = spaWorkingHours?.[0];

  const dayOffsets = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6
  };

  const fetchHolidays = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.GET_HOLIDAYS);
      console.log("holidays", res)
      if (res?.status) {
        const list = res?.data?.data || [];
        const mapped = list.map((h) => ({
          id: h?.id,
          name: h?.holidayName || "",
          date: h?.holidayDate || "",
          isOpen: h?.isClosed == 0,
          start_time: h?.startTime || "",
          end_time: h?.endTime || ""
        }));
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

  const checkBankDetails = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.CHECK_BANK_DETAILS);
      if (res) {
        return res?.data;
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const listSpaHours = async (loading = true) => {
    try {
      setLoading(loading);
      const startStr = startOfWeek.format("YYYY-MM-DD");
      const endStr = endOfWeek.format("YYYY-MM-DD");
      const res = await axiosApiCall.get(
        `${API_ROUTER?.GET_LIST_SPA_HOURS_SERVICE_PROVIDER}?fromDate=${startStr}&toDate=${endStr}`
      );
      console.log("listSpaHours res", res);
      if (!res?.status) {
        toaster(res?.message, TOAST_TYPES.ERROR);
        setLoading(false);
      } else {
        let isBankDetailsAdded = await checkBankDetails();
        if (isBankDetailsAdded) {
          setCheckBankDetailModal(false);
        } else {
          setCheckBankDetailModal(true);
        }
        const transformedList = (res?.data?.data?.scheduleList || []).map((item) => {
          const hasPartialLeave = item?.isPartialLeave || item?.holiday?.isPartialLeave;
          if (hasPartialLeave) {
            return {
              ...item,
              isOpen: true,
              isPartialLeave: true,
              start_time: item?.holiday?.startTime || item?.start_time,
              end_time: item?.holiday?.endTime || item?.end_time,
            };
          }
          return item;
        });
        setSpaWorkingHours(transformedList);
        setLoading(false);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      setLoading(false);
    }
  };

  const saveSpaHourOnce = async ({ day, start_time, end_time, scheduleDate, isRepeating }) => {
    const socketId = getSocketId();
    return axiosApiCall.post(API_ROUTER?.ADD_EDIT_SPAHOURS_SERVICE_PROVIDER, {
      day,
      start_time,
      end_time,
      scheduleDate,
      isRepeating,
      socketId,
    });
  };

  const saveSpaHourOnceSchedule = async ({ day, start_time, end_time, scheduleDate, isRepeating }) => {
    const socketId = getSocketId();
    return axiosApiCall.post(API_ROUTER?.ADD_EDIT_DATE_SCHEDULE, {
      day,
      start_time,
      end_time,
      scheduleDate,
      isRepeating,
      socketId,
    });
  };

  const handleSave = async (day, times, option, dateStr) => {
    try {
      setLoading(true);

      const transformedData = {
        day: day,
        start_time: times?.startTime,
        end_time: times?.endTime,
        scheduleDate: dateStr,
        isRepeating: option === "repeating" ? true : false,
      };

      // console.log("Transformed Data:", transformedData);
      // return;

      const res = await saveSpaHourOnceSchedule(transformedData);
      if (!res?.status) {
        setLoading(false);
        return toaster(res?.message, TOAST_TYPES.ERROR);
      }
      listSpaHours();
    } catch (error) {
      setLoading(false);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const handleSaveAllDays = async (rows) => {
    const transformedData = {
      day: rows.map(row => row.day),
      start_time: rows[0]?.start_time,
      end_time: rows[0]?.end_time
    };

    try {
      setBulkSaving(true);
      const res = await saveSpaHourOnce(transformedData);
      if (!res?.status) {
        toaster(res?.message, TOAST_TYPES.ERROR);
        return;
      }
      setShowSetAllDaysModal(false);
      await listSpaHours();
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setBulkSaving(false);
    }
  };

  const handleAddHoliday = async (e) => {
    e.preventDefault();
    if (!newHolidayName.trim()) {
      return toaster("Holiday name is required", TOAST_TYPES.ERROR);
    }
    if (!newHolidayDate) {
      return toaster("Leave date is required", TOAST_TYPES.ERROR);
    }

    if (!newHolidayIsClosed) {
      if (!newHolidayStart || !validateTimeFormat(newHolidayStart)) {
        return toaster("Start time required", TOAST_TYPES.ERROR);
      }
      if (!newHolidayEnd || !validateTimeFormat(newHolidayEnd)) {
        return toaster("End time required", TOAST_TYPES.ERROR);
      }
      if (!validateEndTimeGreaterThanStartTime(newHolidayStart, newHolidayEnd)) {
        return toaster("End time must be later than start time", TOAST_TYPES.ERROR);
      }
      const isTodayHoliday = newHolidayDate ? moment(newHolidayDate).isSame(moment(), 'day') : false;
      if (isTodayHoliday) {
        const selectedStartMoment = moment(`${newHolidayDate} ${newHolidayStart}`, 'YYYY-MM-DD hh:mm A');
        if (selectedStartMoment.isBefore(moment())) {
          return toaster("Start time cannot be in the past for today", TOAST_TYPES.ERROR);
        }
      }
    }

    const payload = {
      holidayName: newHolidayName.trim(),
      holidayDate: moment(newHolidayDate).format("YYYY-MM-DD"),
      isClosed: newHolidayIsClosed ? 1 : 0
    };

    if (!newHolidayIsClosed) {
      payload.startTime = newHolidayStart;
      payload.endTime = newHolidayEnd;
    }

    try {
      setAddingHoliday(true);
      const res = await axiosApiCall.post(API_ROUTER?.CREATE_HOLIDAY, payload);
      if (res?.status) {
        toaster("Holiday added successfully", TOAST_TYPES.SUCCESS);
        // Reset Form
        setNewHolidayName("");
        setNewHolidayDate("");
        setNewHolidayIsClosed(true);
        await Promise.all([fetchHolidays(), listSpaHours(false)]);
      } else {
        setNewHolidayName("");
        setNewHolidayDate(null);
        setNewHolidayIsClosed(true);
        toaster(res?.message || "Failed to add holiday", TOAST_TYPES.ERROR);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setAddingHoliday(false);
    }
  };

  const handleDeleteHoliday = async (id) => {
    if (!id) return;
    try {
      setDeletingHoliday(true);
      const res = await axiosApiCall.post(`${API_ROUTER?.DELETE_HOLIDAY}?id=${id}`);
      if (res?.status) {
        toaster("Holiday removed successfully", TOAST_TYPES.SUCCESS);
        setShowDeleteModal(false);
        setDeleteTarget(null);
        await Promise.all([fetchHolidays(), listSpaHours(false)]);
      } else {
        toaster(res?.message || "Failed to delete holiday", TOAST_TYPES.ERROR);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setDeletingHoliday(false);
    }
  };


  const handlePrevWeek = () => {
    const prevWeek = currentDate.clone().subtract(1, "week");
    if (prevWeek.isBefore(moment(), "week")) {
      return;
    }
    setCurrentDate(prevWeek);
  };

  const handleNextWeek = () => {
    setCurrentDate((prev) => prev.clone().add(1, "week"));
  };

  useEffect(() => {
    listSpaHours();
  }, [currentDate]);

  useEffect(() => {
    if (window.io) {
      window.io.socket.on("serviceprovider", async (msg) => {
        if (msg?.action == "spaHoursUpdate") {
          listSpaHours();
        }
      });
    }
  }, [window.io]);

  const goToPage = async () => {
    dispatch(tabHandle("second"));
    dispatch(handleBank(true));
    push(PATH_DASHBOARD?.subscriptions);
  };

  const weekRangeText = useMemo(() => {
    return `${startOfWeek.format("MMMM D")} - ${endOfWeek.format("MMMM D, YYYY")}`;
  }, [startOfWeek, endOfWeek]);

  return (
    <div className="profile-subtab-panel">
      <div className="hours-main-display-div">
        {/* Opening Hours Section Header */}
        <div className="hours-header-flex">
          <div className="hours-header-left">
            <h3>Opening Hours</h3>
            <span className="hours-date-range">{weekRangeText}</span>
            <div className="hours-nav-arrows">

              <button
                type="button"
                onClick={handlePrevWeek}
                title="Previous week"
                disabled={currentDate.clone().subtract(1, "week").isBefore(moment(), "week")}
                style={{
                  opacity: currentDate.clone().subtract(1, "week").isBefore(moment(), "week") ? 0.5 : 1,
                  cursor: currentDate.clone().subtract(1, "week").isBefore(moment(), "week") ? "not-allowed" : "pointer"
                }}
              >
                &lt;
              </button>
              <button type="button" onClick={handleNextWeek} title="Next week">&gt;</button>
            </div>

          </div>


          <button
            type="button"
            className="hours-apply-all-btn"
            onClick={() => setShowSetAllDaysModal(true)}
          >
            Apply to all days
          </button>

        </div>

        {/* Days Rows */}
        {loading ? (
          <div style={{ cursor: 'default', pointerEvents: 'none', padding: '10px 0' }}>
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '14px' }}>
                <Skeleton width={100} height={20} />
                <Skeleton width={80} height={20} />
                <Skeleton width={120} height={35} />
                <Skeleton width={120} height={35} />
                <Skeleton circle width={24} height={24} />
              </div>
            ))}
          </div>
        ) : spaWorkingHours?.length > 0 ? (
          spaWorkingHours?.map(({ date, day, start_time, end_time, isOpen, source, holiday, isPartialLeave }) => {
            const dayDate = date ? moment(date) : startOfWeek.clone().add(dayOffsets[day.toLowerCase()] || 0, "days");
            const formattedDate = dayDate.format("M/D");
            return (
              <EditableHours
                key={day}
                day={day}
                formattedDate={formattedDate}
                dayDate={dayDate}
                defaultStart={start_time}
                defaultEnd={end_time}
                onSave={handleSave}
                listSpaHours={listSpaHours}
                isOpen={isOpen}
                source={source}
                holiday={holiday}
                isPartialLeave={isPartialLeave}
              />
            );
          })
        ) : (
          <div className="empty-state-card-view">
            <div className="empty-state-icon-box">
              <EmptyStateIcon />
            </div>
            <p className="empty-state-text">
              {t("No opening hours details yet.") || "No opening hours details yet."}
            </p>
            <button
              type="button"
              className="empty-state-add-btn"
              onClick={() => setShowSetAllDaysModal(true)}
            >
              + {t("Setup Hours") || "Setup Hours"}
            </button>
          </div>
        )}

        {/* Holiday Schedule Section */}
        <div className="holiday-schedule-section">
          <div className="holiday-section-header">
            <h3>Holiday Schedule</h3>

            <p>{holidays?.length == 0 ? "No" : holidays?.length} holidays configured</p>
          </div>

          {/* Add Holiday Form Card */}
          <form onSubmit={handleAddHoliday} className="holiday-add-form-card">
            <div className="form-group-item">
              <label>Holiday Name</label>
              <input
                type="text"
                placeholder="e.g. Thanksgiving"
                className="form-control"
                maxLength={50}
                value={newHolidayName}
                onChange={(e) => setNewHolidayName(e.target.value)}
              />
            </div>

            <div className="form-group-item date-picker-item">
              <label>Date</label>
              <div className="react-datetime-picker">
                <ReactDatePicker
                  key={newHolidayDate || "empty"}
                  placeholderText="YYYY-MM-DD"
                  className="form-control"
                  selected={newHolidayDate ? moment(newHolidayDate).toDate() : null}
                  onChange={(date) => {
                    if (date) {
                      setNewHolidayDate(moment(date).format("YYYY-MM-DD"));
                    } else {
                      setNewHolidayDate("");
                    }
                  }}
                  minDate={moment().startOf("day").toDate()}
                  dateFormat="yyyy-MM-dd"
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                />
                <span className="calendar-icon-indicator">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 15" style={{ width: '16px', height: '16px' }}>
                    <path fill="currentColor" d="M12.75 2.377h-2.625v-1A.125.125 0 0 0 10 1.252h-.875A.125.125 0 0 0 9 1.377v1H5v-1a.125.125 0 0 0-.125-.125H4a.125.125 0 0 0-.125.125v1H1.25a.5.5 0 0 0-.5.5v10.375a.5.5 0 0 0 .5.5h11.5a.5.5 0 0 0 .5-.5V2.877a.5.5 0 0 0-.5-.5Zm-.625 10.25H1.875V6.689h10.25v5.938Zm-10.25-7V3.502h2v.75c0 .069.056.125.125.125h.875A.125.125 0 0 0 5 4.252v-.75h4v.75c0 .069.056.125.125.125H10a.125.125 0 0 0 .125-.125v-.75h2v2.125H1.875Z" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="toggle-group-item">
              <Switch
                onChange={(checked) => setNewHolidayIsClosed(checked)}
                checked={newHolidayIsClosed}
                offColor="#C5CAD3"
                onColor="#295086"
                uncheckedIcon={false}
                checkedIcon={false}
                height={20}
                width={40}
                handleDiameter={16}
              />
              <span>Full Day</span>
            </div>

            {!newHolidayIsClosed && (
              <>
                <div className="form-group-item date-picker-item">
                  <label>Start</label>
                  <DateTime
                    dateFormat={false}
                    timeFormat="hh:mm A"
                    closeOnSelect={true}
                    value={newHolidayStart}
                    onChange={(time) => {
                      if (time) {
                        setNewHolidayStart(moment(time).format("hh:mm A"));
                      }
                    }}
                    inputProps={{
                      className: "form-control"
                    }}
                  />
                </div>
                <div className="form-group-item date-picker-item">
                  <label>End</label>
                  <DateTime
                    dateFormat={false}
                    timeFormat="hh:mm A"
                    closeOnSelect={true}
                    value={newHolidayEnd}
                    onChange={(time) => {
                      if (time) {
                        setNewHolidayEnd(moment(time).format("hh:mm A"));
                      }
                    }}
                    inputProps={{
                      className: "form-control"
                    }}
                  />
                </div>
              </>
            )}

            <div className="submit-group-item">
              <button type="submit" className="add-holiday-btn" disabled={addingHoliday}>
                {addingHoliday ? "+ ADDING....." : "+ ADD HOLIDAY"}
              </button>
            </div>
          </form>

          {/* Holiday Cards List */}
          <div className="holiday-list-container">
            {holidays.map((holiday) => {
              const hDate = moment(holiday.date);
              const monthStr = hDate.format("MMM");
              const dayStr = hDate.format("D");
              const fullDateStr = hDate.format("dddd, MMMM D, YYYY");

              return (
                <div key={holiday.id} className="holiday-card">
                  <div className="holiday-card-left">
                    <div className="holiday-date-block">
                      <span className="holiday-month">{monthStr}</span>
                      <span className="holiday-day">{dayStr}</span>
                    </div>
                    <div className="holiday-info-block">
                      <h4>{holiday.name}</h4>
                      <p>{fullDateStr}</p>
                    </div>
                  </div>

                  <div className="holiday-card-right">
                    {holiday.isOpen ? (
                      <span className="holiday-status-badge open">
                        {holiday.start_time} - {holiday.end_time}
                      </span>
                    ) : (
                      <span className="holiday-status-badge closed">Closed</span>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setDeleteTarget(holiday.id);
                        setShowDeleteModal(true);
                      }}
                      className="holiday-delete-btn"
                      title="Delete holiday"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 16">
                        <path fill="#E32C1F" fillRule="evenodd" d="M13.215 2.932c.292 0 .535.242.535.55v.286c0 .3-.243.55-.535.55H.785a.547.547 0 0 1-.535-.55v-.285c0-.309.243-.55.535-.55h2.187c.444 0 .831-.317.93-.762l.115-.512C4.195.963 4.781.5 5.451.5H8.55a1.49 1.49 0 0 1 1.426 1.123l.123.547a.96.96 0 0 0 .93.762h2.187Zm-1.11 10.418c.228-2.127.627-7.182.627-7.233a.559.559 0 0 0-.135-.419.544.544 0 0 0-.393-.175H1.801a.53.53 0 0 0-.392.175.593.593 0 0 0-.143.419l.04.485c.106 1.322.403 5.006.595 6.748.135 1.284.978 2.091 2.198 2.12.942.022 1.912.03 2.904.03.934 0 1.883-.008 2.854-.03 1.263-.021 2.104-.814 2.247-2.12Z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Save Footer */}
        {/* <div className="hours-save-schedule-footer">
            <button
              type="button"
              className="save-schedule-btn"
              onClick={handleSaveSchedule}
            >
              Save Schedule
            </button>
          </div> */}
        <SetForAllDaysModal
          show={showSetAllDaysModal}
          onHide={() => setShowSetAllDaysModal(false)}
          days={allDayKeys}
          defaultStart={firstHoursRow?.start_time}
          defaultEnd={firstHoursRow?.end_time}
          onConfirm={handleSaveAllDays}
          saving={bulkSaving}
        />
        <Modal
          show={checkBankDetailModal}
          aria-labelledby="example-modal-sizes-title-lg"
          centered
          className="sitback-modal-wrapper warning-modal-wrapper"
        >
          <Modal.Body>
            <div className="sitback-request-modal-wrapper">
              <h5>{t("warning")}</h5>
              <p>{t("addBankDetails")}</p>
              <span onClick={() => goToPage()}>{t("addBankDetailText")}</span>
            </div>
          </Modal.Body>
        </Modal>
        <DeleteModal
          show={showDeleteModal}
          disabled={deletingHoliday}
          messageBody={<>{t("Are you sure you want to delete this holiday?") || "Are you sure you want to delete this holiday?"}</>}
          handleClose={() => {
            setShowDeleteModal(false);
            setDeleteTarget(null);
          }}
          handleConfirmDelete={() => handleDeleteHoliday(deleteTarget)}
        />
      </div>
    </div>
  );
};
