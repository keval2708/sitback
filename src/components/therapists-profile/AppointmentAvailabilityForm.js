"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import TimePicker from "rc-time-picker";
import { useEffect, useMemo, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import DateTime from "react-datetime";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ReactSelect from "react-select";
import Switch from "react-switch";
import * as yup from "yup";
import {
  validateEndTimeGreaterThanStartTime,
  validateTimeFormat,
} from "@/components/dashboards/profile-services/EditableHours";
import LoadingButton from "@/components/shared/button/LoadingButton";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import { Button } from "@/styles/global/main.style";
import { AppointmentAvailabilityWrapper } from "@/styles/pages/appointment-availability.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";


const WEEKDAYS = [
  { value: "Sun", label: "Sun" },
  { value: "Mon", label: "Mon" },
  { value: "Tue", label: "Tue" },
  { value: "Wed", label: "Wed" },
  { value: "Thu", label: "Thu" },
  { value: "Fri", label: "Fri" },
  { value: "Sat", label: "Sat" },
];

const DATE_RANGE_OPTIONS = [
  // { value: "", label: "Select Date Range", isDisabled: true },
  { value: "Ongoing", label: "Ongoing" },
  { value: "Custom", label: "Custom dates" },
];

const SCHEDULE_RANGE_OPTIONS = [
  // { value: "", label: "Select schedule Range", isDisabled: true },
  { value: "3", label: "3 month" },
  { value: "6", label: "6 month" },
  { value: "12", label: "1 year" },
  { value: "Custom", label: "Custom date" },
];

const DEFAULT_FORM_VALUES = {
  staff: "1",
  startdate: null,
  enddate: null,
  date: null,
  schedule: null,
  days: [false, false, false, false, false, false, false],
  starttime: null,
  endtime: null,
  note: false,
};

const parseScheduleTime = (timeValue, typeValue) => {
  if (!timeValue) return null;

  const timeStr = String(timeValue).trim();
  const typeStr = typeValue ? String(typeValue).trim() : "";

  if (/[ap]\.?m\.?/i.test(timeStr)) {
    const parsed = moment(timeStr, ["hh:mm A", "h:mm A", "hh:mm:ss A", "h:mm:ss A"], true);
    if (parsed.isValid()) return parsed;
  }

  if (typeStr) {
    const combined = moment(
      `${timeStr} ${typeStr}`,
      ["hh:mm:ss a", "h:mm:ss a", "hh:mm a", "h:mm a"],
      true
    );
    if (combined.isValid()) return combined;
  }

  const as24 = moment(timeStr, ["HH:mm:ss", "HH:mm"], true);
  return as24.isValid() ? as24 : null;
};

const buildValidationSchema = () =>
  yup
    .object()
    .shape({
      staff: yup.string().required("Staff availability is required"),
      date: yup
        .object()
        .shape({
          value: yup.string().required("Date range is required"),
        })
        .test("is-selected", "Please select any option", (value) => value && value.value),
      schedule: yup.object().when("date", {
        is: (val) => val?.value === "Ongoing",
        then: (schema) =>
          schema
            .nullable()
            .test("schedule-required", "Schedule range is required", (value) => {
              return value && value.value && value.value !== "";
            }),
        otherwise: (schema) => schema.nullable(),
      }),
      startdate: yup.mixed().when(["date", "schedule"], ([date, schedule], schema) => {
        if (date?.value === "Custom" || (date?.value === "Ongoing" && schedule?.value === "Custom")) {
          return schema.required("Start Date is required");
        }
        return schema.nullable();
      }),
      enddate: yup.mixed().when(["date", "schedule"], ([date, schedule], schema) => {
        if (date?.value === "Custom" || (date?.value === "Ongoing" && schedule?.value === "Custom")) {
          return schema
            .required("End date is required")
            .test("is-valid-date", "End date cannot be less than start date", function (value) {
              const { startdate } = this.parent;
              if (value && startdate) {
                return moment(value).isSameOrAfter(startdate);
              }
              return true;
            });
        }
        return schema.nullable();
      }),
      starttime: yup
        .mixed()
        .required("Start time is required")
        .test("is-valid-time", "Start time cannot be greater than end time", function (value) {
          const { endtime } = this.parent;
          if (value && endtime) {
            return moment(value).isSameOrBefore(endtime);
          }
          return !!value;
        }),
      endtime: yup
        .mixed()
        .required("End time is required")
        .test("is-valid-time", "End time cannot be less than start time", function (value) {
          const { starttime } = this.parent;
          if (value && starttime) {
            return moment(value).isSameOrAfter(starttime);
          }
          return !!value;
        }),
      days: yup.array().test("at-least-one-day", "Please select at least one day", (value) =>
        value?.some((day) => day === true)
      ),
      note: yup.boolean().when("staff", {
        is: (val) => val === "0",
        then: (schema) => schema.oneOf([true], "You must check this box to proceed"),
        otherwise: (schema) => schema.nullable(),
      }),
    })
    .strict(true);

export default function AppointmentAvailabilityForm({ therapist }) {
  const { t } = useTranslation();
  const { toaster } = useToaster();
  const timeFormat = "h:mm a";
  const timePickerId = "appointment-availability-time-picker";

  const [loading, setLoading] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [oldData, setOldData] = useState(null);
  const [openLoading, setOpenLoading] = useState(false);

  // Holiday/Leave schedule states
  const [holidays, setHolidays] = useState([]);
  const [newHolidayName, setNewHolidayName] = useState("");
  const [newHolidayDate, setNewHolidayDate] = useState("");
  const [newHolidayLeaveType, setNewHolidayLeaveType] = useState("paid");
  const [newHolidayIsClosed, setNewHolidayIsClosed] = useState(true);
  const [newHolidayStart, setNewHolidayStart] = useState("10:00 AM");
  const [newHolidayEnd, setNewHolidayEnd] = useState("02:00 PM");
  const [addingHoliday, setAddingHoliday] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deletingHoliday, setDeletingHoliday] = useState(false);

  // Manage Availability states
  const [schedules, setSchedules] = useState([]);
  const [fetchingSchedules, setFetchingSchedules] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [selectedScheduleForEdit, setSelectedScheduleForEdit] = useState(null);
  const [showDeleteScheduleModal, setShowDeleteScheduleModal] = useState(false);
  const [deleteScheduleTarget, setDeleteScheduleTarget] = useState(null);
  const [deletingSchedule, setDeletingSchedule] = useState(false);

  const fetchSchedules = async () => {
    if (!therapist?.id) return;
    try {
      setFetchingSchedules(true);
      const res = await axiosApiCall.get(`${API_ROUTER?.GET_EMPLOYEE_DATE_RANGE}?employeeId=${therapist?.id}`);
      // console.log("res", res?.data?.data);
      //return
      if (res?.status) {
        setSchedules(res?.data?.data?.schedules || []);
      }
    } catch (error) {
      console.log("error fetching schedules", error);
    } finally {
      setFetchingSchedules(false);
    }
  };

  const fetchHolidays = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.GET_EMPLOYEE_LEAVE_SCHEDULE + `?employeeId=` + therapist?.id);
      console.log("res", res?.data?.data);
      if (res?.status) {
        const list = res?.data?.data?.leaveList || [];
        const mapped = list.map((h) => ({
          id: h?.id,
          name: h?.reason || "",
          date: h?.leaveDate || "",
          isOpen: h?.leaveType === "full_day" ? false : Boolean(h?.start_time && h?.end_time),
          start_time: h?.start_time || "",
          end_time: h?.end_time || "",
        }));
        setHolidays(mapped);
      } else {
        toaster(res?.message || "Failed to fetch holidays", TOAST_TYPES.ERROR);
      }
    } catch (error) {
      console.log("error", error);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  useEffect(() => {
    if (therapist?.id) {
      fetchHolidays();
      fetchSchedules();
    }
  }, [therapist?.id]);

  const handleAddHoliday = async (e) => {
    e.preventDefault();
    if (!newHolidayName.trim()) {
      return toaster("Time block reason is required", TOAST_TYPES.ERROR);
    }
    if (!newHolidayDate) {
      return toaster("Time block date is required", TOAST_TYPES.ERROR);
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
      reason: newHolidayName.trim(),
      leaveDate: moment(newHolidayDate).format("YYYY-MM-DD"),
      leaveType: newHolidayLeaveType || "paid",
      employeeId: therapist?.id,
    };

    if (!newHolidayIsClosed) {
      payload.start_time = newHolidayStart;
      payload.end_time = newHolidayEnd;
    }

    try {
      setAddingHoliday(true);
      const res = await axiosApiCall.post(API_ROUTER?.ADD_EMPLOYEE_LEAVE_SCHEDULE, payload);
      if (res?.status) {
        toaster("Leave added successfully", TOAST_TYPES.SUCCESS);
        // Reset Form
        setNewHolidayName("");
        setNewHolidayDate("");
        setNewHolidayLeaveType("paid");
        setNewHolidayIsClosed(true);
        await fetchHolidays();
      } else {
        setNewHolidayName("");
        setNewHolidayDate(null);
        setNewHolidayLeaveType("paid");
        setNewHolidayIsClosed(true);
        toaster(res?.message || "Failed to add leave", TOAST_TYPES.ERROR);
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
      const res = await axiosApiCall.delete(`${API_ROUTER?.DELETE_EMPLOYEE_LEAVE_SCHEDULE}?employeeId=${therapist?.id}&leaveScheduleId=${id}`);
      if (res?.status) {
        toaster("Leave removed successfully", TOAST_TYPES.SUCCESS);
        setShowDeleteModal(false);
        setDeleteTarget(null);
        await fetchHolidays();
      } else {
        toaster(res?.message || "Failed to delete holiday", TOAST_TYPES.ERROR);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setDeletingHoliday(false);
    }
  };

  const handleDeleteSchedule = async (id) => {
    if (!id) return;
    try {
      setDeletingSchedule(true);
      const res = await axiosApiCall.post(`${API_ROUTER?.REMOVE_EMPLOYEE_SCHEDULE}`, { scheduleId: id, employeeId: therapist?.id });
      if (res?.status) {
        toaster("Schedule removed successfully", TOAST_TYPES.SUCCESS);
        setShowDeleteScheduleModal(false);
        setDeleteScheduleTarget(null);
        await fetchSchedules();
      } else {
        toaster(res?.message || "Failed to delete schedule", TOAST_TYPES.ERROR);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setDeletingSchedule(false);
    }
  };

  const handleEditScheduleClick = (schedule) => {
    setSelectedScheduleForEdit(schedule);
    setEditModalShow(true);
  };

  const handleDeleteScheduleClick = (id) => {
    setDeleteScheduleTarget(id);
    setShowDeleteScheduleModal(true);
  };

  const validationSchema = useMemo(() => buildValidationSchema(), []);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const dateRange = watch("date");
  const scheduleValue = watch("schedule");
  const staffValue = watch("staff");
  const daysValue = watch("days");

  const resetForm = () => {
    reset(DEFAULT_FORM_VALUES);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  const buildPayload = (formData) => {
    const selectedDays = [];
    formData.days.forEach((isSelected, index) => {
      if (isSelected) {
        selectedDays.push(WEEKDAYS[index].value);
      }
    });

    const currentDate = moment().format("YYYY-MM-DD");

    return {
      employeeId: therapist?.id,
      isAvailable: formData.staff,
      dateRangeType: formData.date.value,
      days: selectedDays.join(",") || "Sun,Mon,Tue,Wed,Thu,Fri,Sat",
      startDate:
        (formData.date.value === "Custom" || (formData.date.value === "Ongoing" && formData.schedule?.value === "Custom"))
          ? moment(formData.startdate).format("YYYY-MM-DD")
          : currentDate,
      endDate:
        (formData.date.value === "Custom" || (formData.date.value === "Ongoing" && formData.schedule?.value === "Custom"))
          ? moment(formData.enddate).format("YYYY-MM-DD")
          : moment().add(formData.schedule?.value, "M").format("YYYY-MM-DD"),
      startTime: formData.starttime.format("hh:mm:00"),
      endTime: formData.endtime.format("hh:mm:00"),
      startType: formData.starttime.format("hh:mm:ss a").split(" ")[1],
      endType: formData.endtime.format("hh:mm:ss a").split(" ")[1],
    };
  };

  const submitAvailability = async (formData) => {
    const payload = buildPayload(formData);

    try {
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.ADD_EMPLOYEE_SCHEDULE, payload);
      // console.log("res", res);
      // return

      if (!res?.status) {
        setIsPopupOpen(res?.isPopOpen);
        if (res?.oldData) {
          setOldData({ ...res.oldData[0], replacenewentry: res?.replacenewentry });
          setCurrentData(payload);
        }
        toaster(res?.message, TOAST_TYPES.ERROR);
        return false;
      }

      toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
      fetchSchedules();
      return true;
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (formData) => {
    const success = await submitAvailability(formData);
    if (success) {
      resetForm();
    }
  };

  const handleSaveAndAddNext = handleSubmit(async (formData) => {
    const success = await submitAvailability(formData);
    if (success) {
      resetForm();
    }
  });

  const updateDateRange = async () => {
    try {
      setOpenLoading(true);
      const payload = {
        old_id: oldData?.id,
        employeeId: oldData?.employeeId,
        isAvailable: currentData?.isAvailable,
        dateRangeType: currentData?.dateRangeType,
        days: currentData?.days,
        startDate: currentData?.startDate,
        endDate: currentData?.endDate,
        startTime: currentData?.startTime,
        endTime: currentData?.endTime,
        startType: currentData?.startType,
        endType: currentData?.endType,
        replacenewentry: oldData?.replacenewentry,
      };

      const res = await axiosApiCall.post(API_ROUTER?.UPDATE_NEW_DATERANGE, payload);
      if (!res?.status) {
        toaster(res?.message, TOAST_TYPES.ERROR);
        return;
      }

      toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
      setIsPopupOpen(false);
      resetForm();
      fetchSchedules();
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setOpenLoading(false);
    }
  };

  const toggleDay = (index) => {
    const updated = [...daysValue];
    updated[index] = !updated[index];
    setValue("days", updated, { shouldValidate: true });
  };

  console.log("errors", errors);

  return (
    <>
      <AppointmentAvailabilityWrapper className="sitback-appointment-availability-panel">
        <h2 className="availability-page-title">{t("addAvailability")}</h2>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <section className="availability-section">
            <div className="availability-section-header">
              <span>{t("whatSection")}</span>
            </div>
            <div className="availability-field">
              {/* <label>{t("s")}</label> */}
              <div className="staff-status-toggle">
                <button
                  type="button"
                  className={staffValue === "1" ? "active" : ""}
                  onClick={() => setValue("staff", "1", { shouldValidate: true })}
                >
                  <span className="radio-circle"></span>
                  {t("available")}
                </button>
                <button
                  type="button"
                  className={staffValue === "0" ? "active" : ""}
                  onClick={() => setValue("staff", "0", { shouldValidate: true })}
                >
                  <span className="radio-circle"></span>
                  {t("unavailable")}
                </button>
              </div>
            </div>
          </section>

          {staffValue === "1" ? (
            <>
              <section className="availability-section">
                <div className="availability-section-header">
                  <span>{t("whenSection")}</span>
                </div>
                <div className="availability-field">
                  <Row>
                    <Col md={6}>
                      <label>{t("dateRange")}</label>
                      <Controller
                        name="date"
                        control={control}
                        render={({ field }) => (
                          <ReactSelect
                            placeholder="Select date range"
                            className="sitback-select2-container input-with-icon"
                            classNamePrefix="sitback-select-option"
                            options={DATE_RANGE_OPTIONS}
                            closeMenuOnSelect
                            isSearchable={false}
                            {...field}
                            onChange={(option) => {
                              field.onChange(option);
                              setValue("schedule", null);
                              setValue("startdate", null);
                              setValue("enddate", null);
                              setValue("starttime", null);
                              setValue("endtime", null);
                            }}
                          />
                        )}
                      />
                      <p className="text-danger">{errors?.date?.value?.message || errors?.date?.message === "date cannot be null" ? "Date range is required" : ""}</p>
                    </Col>
                    <Col md={6}>
                      {dateRange?.value === "Custom" && (
                        <div>
                          <label>{t("date")}</label>
                          <div className="date-input-row">
                            <Controller
                              name="startdate"
                              control={control}
                              render={({ field }) => (
                                <ReactDatePicker
                                  className="datepicker-input"
                                  placeholderText="YYYY-MM-DD"
                                  dateFormat="yyyy-MM-dd"
                                  selected={field.value}
                                  minDate={new Date()}
                                  onChange={(date) => {
                                    setSelectedStartDate(date);
                                    field.onChange(date);
                                    setValue("starttime", null);
                                    setValue("endtime", null);
                                  }}
                                />
                              )}
                            />
                            <span className="to-label">{t("to")}</span>
                            <Controller
                              name="enddate"
                              control={control}
                              render={({ field }) => (
                                <ReactDatePicker
                                  className="datepicker-input"
                                  placeholderText="YYYY-MM-DD"
                                  dateFormat="yyyy-MM-dd"
                                  selected={field.value}
                                  minDate={new Date()}
                                  onChange={(date) => {
                                    setSelectedEndDate(date);
                                    field.onChange(date);
                                    setValue("starttime", null);
                                    setValue("endtime", null);
                                  }}
                                />
                              )}
                            />
                          </div>
                          <p className="text-danger">{errors?.startdate?.message || errors?.enddate?.message}</p>
                        </div>
                      )}
                    </Col>
                  </Row>
                  {dateRange?.value === "Ongoing" && (
                    <div className="availability-field0 mb-3">
                      <label>{t("scheduleRange")}</label>
                      <Controller
                        name="schedule"
                        control={control}
                        render={({ field }) => (
                          <ReactSelect
                            placeholder="Select schedule range"
                            className="sitback-select2-container input-with-icon"
                            classNamePrefix="sitback-select-option"
                            options={SCHEDULE_RANGE_OPTIONS}
                            closeMenuOnSelect
                            isSearchable={false}
                            {...field}
                            onChange={(option) => {
                              field.onChange(option);
                              setValue("startdate", null);
                              setValue("enddate", null);
                            }}
                          />
                        )}
                      />
                      <p className="text-danger">{errors?.schedule?.message || errors?.schedule?.value?.message}</p>
                      {scheduleValue?.value === "Custom" && (
                        <div className="mt-3">
                          <label>{t("date")}</label>
                          <div className="date-input-row">
                            <Controller
                              name="startdate"
                              control={control}
                              render={({ field }) => (
                                <ReactDatePicker
                                  className="datepicker-input"
                                  placeholderText="YYYY-MM-DD"
                                  dateFormat="yyyy-MM-dd"
                                  selected={field.value}
                                  minDate={new Date()}
                                  onChange={(date) => {
                                    setSelectedStartDate(date);
                                    field.onChange(date);
                                    setValue("starttime", null);
                                    setValue("endtime", null);
                                  }}
                                />
                              )}
                            />
                            <span className="to-label">{t("to")}</span>
                            <Controller
                              name="enddate"
                              control={control}
                              render={({ field }) => (
                                <ReactDatePicker
                                  className="datepicker-input"
                                  placeholderText="YYYY-MM-DD"
                                  dateFormat="yyyy-MM-dd"
                                  selected={field.value}
                                  minDate={new Date()}
                                  onChange={(date) => {
                                    setSelectedEndDate(date);
                                    field.onChange(date);
                                    setValue("starttime", null);
                                    setValue("endtime", null);
                                  }}
                                />
                              )}
                            />
                          </div>
                          <p className="text-danger">{errors?.startdate?.message || errors?.enddate?.message}</p>
                        </div>
                      )}
                    </div>
                  )}
                  <Row className="days-time-row">
                    <Col md={6}>
                      <label>{t("days")}</label>
                      <div className="days-pill-row">
                        {WEEKDAYS.map((day, index) => (
                          <button
                            key={day.value}
                            type="button"
                            className={`day-pill ${daysValue?.[index] ? "active" : ""}`}
                            onClick={() => toggleDay(index)}
                          >
                            {day.label}
                          </button>
                        ))}
                      </div>
                      <p className="text-danger">{errors?.days?.message}</p>
                    </Col>
                    <Col md={6}>
                      <label>{t("time")}</label>
                      <div className="time-input-row" id={timePickerId}>
                        <Controller
                          name="starttime"
                          control={control}
                          render={({ field }) => (
                            <TimePicker
                              showSecond={false}
                              {...field}
                              placeholder="Select start time"
                              className="time-addinput-wrapper"
                              minuteStep={15}
                              format={timeFormat}
                              use12Hours
                              inputReadOnly
                              getPopupContainer={() => document.getElementById(timePickerId)}
                              onChange={(value) => field.onChange(value)}
                            />
                          )}
                        />
                        <span className="to-label">{t("to")}</span>
                        <Controller
                          name="endtime"
                          control={control}
                          render={({ field }) => (
                            <TimePicker
                              showSecond={false}
                              {...field}
                              placeholder="Select end time"
                              className="time-addinput-wrapper"
                              minuteStep={15}
                              format={timeFormat}
                              use12Hours
                              inputReadOnly
                              getPopupContainer={() => document.getElementById(timePickerId)}
                              onChange={(value) => field.onChange(value)}
                            />
                          )}
                        />
                      </div>
                      <p className="text-danger">{errors?.starttime?.message || errors?.endtime?.message}</p>
                    </Col>
                  </Row>
                </div>
              </section>

              <div className="availability-footer">
                <button type="button" className="availability-cancel-btn" onClick={resetForm}>
                  {t("cancel")}
                </button>
                <LoadingButton
                  type="submit"
                  className="availability-action-btn"
                  disabled={loading}
                  label={t("add")}
                  loadinglabel={t("saving")}
                  isLoading={loading}
                />
                {/* <LoadingButton
                  type="button"
                  className="availability-action-btn"
                  disabled={loading}
                  onClick={handleSaveAndAddNext}
                  label={t("saveAndAddNext")}
                  loadinglabel={t("saving")}
                  isLoading={loading}
                /> */}
              </div>
            </>
          ) : (
            <section className="availability-section holiday-schedule-section" style={{ borderTop: "none", marginTop: "0", paddingTop: "0" }}>
              <div className="availability-section-header">
                <span>Time Block Schedule</span>
              </div>
              <div className="availability-field">
                {/* Add Holiday Form Card */}
                <div className="holiday-add-form-card">
                  <div className="holiday-form-row">
                    <div className="form-group-item">
                      <label>Time Block Reason:</label>
                      <input
                        type="text"
                        placeholder="e.g. Personal leave"
                        className="form-control"
                        maxLength={50}
                        value={newHolidayName}
                        onChange={(e) => setNewHolidayName(e.target.value)}
                      />
                    </div>

                    <div className="form-group-item">
                      <label>Leave Type</label>
                      <select
                        className="form-control"
                        value={newHolidayLeaveType}
                        onChange={(e) => setNewHolidayLeaveType(e.target.value)}
                        aria-label="Leave Type"
                      >
                        <option value="paid">Paid</option>
                        <option value="unpaid">Unpaid</option>
                      </select>
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

                    {newHolidayIsClosed && (
                      <div className="submit-group-item">
                        <button type="button" onClick={handleAddHoliday} className="add-holiday-btn" disabled={addingHoliday}>
                          {addingHoliday ? "+ ADDING....." : "+ ADD TIME BLOCK"}
                        </button>
                      </div>
                    )}
                  </div>

                  {!newHolidayIsClosed && (
                    <div className="holiday-form-row">
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
                      <div className="submit-group-item">
                        <button type="button" onClick={handleAddHoliday} className="add-holiday-btn" disabled={addingHoliday}>
                          {addingHoliday ? "+ ADDING....." : "+ ADD TIME BLOCK"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

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
                              {holiday.start_time && holiday.end_time
                                ? `${holiday.start_time} - ${holiday.end_time}`
                                : "Open"}
                            </span>
                          ) : (
                            <span className="holiday-status-badge closed">
                              Closed
                            </span>
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
            </section>
          )}
        </Form>

        {staffValue === "1" && (
          <section className="availability-section mt-4">
            <div className="availability-section-header">
              <span>{t("manageAvailability") || "Manage Availability"}</span>
            </div>
            <div className="availability-field">
              {fetchingSchedules ? (
                <div style={{ cursor: 'default', pointerEvents: 'none', padding: '10px 0' }}>
                  <Skeleton count={3} height={35} style={{ marginBottom: '8px' }} />
                </div>
              ) : schedules.length === 0 ? (
                <p className="text-center my-3 no-availability-field">{t("noSchedules") || "No availability schedules configured."}</p>
              ) : (
                <div className="table-responsive">
                  <table className="availability-table">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Available Days</th>
                        <th>Date Range</th>
                        <th>Time</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedules.map((item) => {

                        const formattedStartTime = item?.start_time || "";
                        const formattedEndTime = item?.end_time || "";



                        return (
                          <tr key={item.id}>
                            <td>
                              {item.dateRangeType === "Custom" ? "Custom" : "Ongoing"}
                            </td>
                            <td className="days-cell">
                              {item.days || "Sun, Mon, Tue, Wed, Thu, Fri, Sat"}
                            </td>
                            <td>
                              {moment(item.startDate).format("YYYY-MM-DD")} to {moment(item.endDate).format("YYYY-MM-DD")}
                            </td>
                            <td>
                              {formattedStartTime} to {formattedEndTime}
                            </td>
                            <td className="actions-cell">
                              <button
                                type="button"
                                className="action-btn edit-btn"
                                onClick={() => handleEditScheduleClick(item)}
                                title="Edit schedule"
                              >
                                <img alt="Edit" src="/images/Edit-icon.svg" />
                              </button>
                              <button
                                type="button"
                                className="action-btn delete-btn"
                                onClick={() => handleDeleteScheduleClick(item.id)}
                                title="Delete schedule"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 16" width="16" height="16">
                                  <path fill="#E32C1F" fillRule="evenodd" d="M13.215 2.932c.292 0 .535.242.535.55v.286c0 .3-.243.55-.535.55H.785a.547.547 0 0 1-.535-.55v-.285c0-.309.243-.55.535-.55h2.187c.444 0 .831-.317.93-.762l.115-.512C4.195.963 4.781.5 5.451.5H8.55a1.49 1.49 0 0 1 1.426 1.123l.123.547a.96.96 0 0 0 .93.762h2.187Zm-1.11 10.418c.228-2.127.627-7.182.627-7.233a.559.559 0 0 0-.135-.419.544.544 0 0 0-.393-.175H1.801a.53.53 0 0 0-.392.175.593.593 0 0 0-.143.419l.04.485c.106 1.322.403 5.006.595 6.748.135 1.284.978 2.091 2.198 2.12.942.022 1.912.03 2.904.03.934 0 1.883-.008 2.854-.03 1.263-.021 2.104-.814 2.247-2.12Z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        )}
      </AppointmentAvailabilityWrapper>

      <Modal
        show={isPopupOpen}
        centered
        className="sitback-modal-wrapper changethe-slottime-modal"
        onHide={() => setIsPopupOpen(false)}
      >
        <Modal.Header closeButton className="red-close-icon" onClick={() => setIsPopupOpen(false)} />
        <Modal.Body>
          <div className="sitback-request-modal-wrapper">
            <h3>{t("changeDataText")}</h3>
            <div className="box-wrapper">
              <div className="greybox-wrapper">
                <div className="boxwhite">
                  <h6>{t("oldData")}</h6>
                  <ul>
                    <li>
                      Selected {oldData?.isAvailable == 0 ? "unAvailable" : "available"}:{" "}
                      {oldData?.dateRangeType}
                    </li>
                    <li>
                      {t("selectedDateRange")}: {moment(oldData?.startDate).format("DD-MM-YYYY")} To{" "}
                      {moment(oldData?.endDate).format("DD-MM-YYYY")}
                    </li>
                    <li>
                      {t("selectedTimeRange")}: {oldData?.startTime} {oldData?.startType} To{" "}
                      {oldData?.endTime} {oldData?.endType}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="greybox-wrapper">
                <div className="boxwhite">
                  <h6>{t("newData")}</h6>
                  <ul>
                    <li>
                      Selected {currentData?.isAvailable == 0 ? "unAvailable" : "available"}:{" "}
                      {currentData?.dateRangeType}
                    </li>
                    <li>
                      {t("selectedDateRange")}: {moment(currentData?.startDate).format("DD-MM-YYYY")}{" "}
                      To {moment(currentData?.endDate).format("DD-MM-YYYY")}
                    </li>
                    <li>
                      {t("selectedTimeRange")}: {currentData?.startTime} {currentData?.startType}{" "}
                      To {currentData?.endTime} {currentData?.endType}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="modal-footer-div mt-2">
              <LoadingButton
                type="button"
                disabled={openLoading}
                label={t("update")}
                loadinglabel={t("saving")}
                isLoading={openLoading}
                onClick={updateDateRange}
              />
              <Button isBorderBtn onClick={() => setIsPopupOpen(false)}>
                {t("cancel")}
              </Button>
            </div>
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
      <DeleteModal
        show={showDeleteScheduleModal}
        disabled={deletingSchedule}
        messageBody={<>{t("Are you sure you want to delete this availability schedule?") || "Are you sure you want to delete this availability schedule?"}</>}
        handleClose={() => {
          setShowDeleteScheduleModal(false);
          setDeleteScheduleTarget(null);
        }}
        handleConfirmDelete={() => handleDeleteSchedule(deleteScheduleTarget)}
      />
      <EditAvailabilityModal
        show={editModalShow}
        onHide={() => {
          setEditModalShow(false);
          setSelectedScheduleForEdit(null);
        }}
        schedule={selectedScheduleForEdit}
        therapist={therapist}
        onSaved={fetchSchedules}
      />
    </>
  );
}

function EditAvailabilityModal({ show, onHide, schedule, therapist, onSaved }) {
  const { t } = useTranslation();
  const { toaster } = useToaster();
  const timeFormat = "h:mm a";
  const editTimePickerId = "edit-availability-time-picker";

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(buildValidationSchema()),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const staffValue = watch("staff");
  const dateRange = watch("date");
  const scheduleValue = watch("schedule");
  const daysValue = watch("days") || [];

  // When schedule changes, reset the form values
  useEffect(() => {
    if (schedule) {
      const isAvailable = (schedule.isAvailable !== undefined ? schedule.isAvailable : schedule.isAvaliable)?.toString() || "1";
      const dateVal = DATE_RANGE_OPTIONS.find(opt => opt.value === schedule.dateRangeType) || null;
      console.log("dateVal", dateVal);
      console.log("schedule", schedule);

      // Determine schedule range based on date difference
      let schedVal = null;
      if (schedule.dateRangeType === "Ongoing") {
        const diffMonths = moment(schedule.end_date).diff(moment(schedule.start_date), "months");
        if (diffMonths === 3 || diffMonths === 6 || diffMonths === 12) {
          schedVal = SCHEDULE_RANGE_OPTIONS.find(opt => opt.value === diffMonths.toString()) || null;
        } else {
          schedVal = SCHEDULE_RANGE_OPTIONS.find(opt => opt.value === "Custom") || null;
        }
      }

      const prevDays = schedule.days?.split(",") || [];
      const daysArray = WEEKDAYS.map((day) => prevDays.includes(day.value));

      const sDate = schedule.startDate ? moment(schedule.startDate).toDate() : null;
      const eDate = schedule.endDate ? moment(schedule.endDate).toDate() : null;

      reset({
        staff: isAvailable,
        date: dateVal,
        schedule: schedVal,
        startdate: sDate,
        enddate: eDate,
        days: daysArray,
        starttime: parseScheduleTime(
          schedule.start_time || schedule.startTime,
          schedule.start_type || schedule.startType
        ),
        endtime: parseScheduleTime(
          schedule.end_time || schedule.endTime,
          schedule.end_type || schedule.endType
        ),
        note: false,
      });
    }
  }, [schedule, reset]);

  const toggleDay = (index) => {
    const updated = [...daysValue];
    updated[index] = !updated[index];
    setValue("days", updated, { shouldValidate: true });
  };

  const onSubmit = async (formData) => {
    const selectedDays = [];
    formData.days.forEach((isSelected, index) => {
      if (isSelected) {
        selectedDays.push(WEEKDAYS[index].value);
      }
    });

    const currentDate = moment().format("YYYY-MM-DD");

    const payload = {
      scheduleId: schedule.id,
      employeeId: therapist?.id,
      isAvailable: 1,
      dateRangeType: formData.date.value,
      days: selectedDays.join(",") || "Sun,Mon,Tue,Wed,Thu,Fri,Sat",
      startDate:
        (formData.date.value === "Custom" || (formData.date.value === "Ongoing" && formData.schedule?.value === "Custom"))
          ? moment(formData.startdate).format("YYYY-MM-DD")
          : currentDate,
      endDate:
        (formData.date.value === "Custom" || (formData.date.value === "Ongoing" && formData.schedule?.value === "Custom"))
          ? moment(formData.enddate).format("YYYY-MM-DD")
          : moment().add(formData.schedule?.value, "M").format("YYYY-MM-DD"),
      startTime: formData.starttime.format("hh:mm:00"),
      endTime: formData.endtime.format("hh:mm:00"),
      startType: formData.starttime.format("hh:mm:ss a").split(" ")[1],
      endType: formData.endtime.format("hh:mm:ss a").split(" ")[1],
    };

    // console.log("payload", payload);
    // return

    try {
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.UPDATE_EMPLOYEE_SCHEDULE, payload);
      console.log("res", res);
      if (!res?.status) {
        toaster(res?.message || "Failed to update schedule", TOAST_TYPES.ERROR);
        return;
      }
      toaster(res?.data?.message || "Schedule updated successfully", TOAST_TYPES.SUCCESS);
      onSaved();
      onHide();
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" className="sitback-modal-wrapper sitback-updated-profile-service-modal edit-availability-modal-wrapper">
      <Modal.Header closeButton className="red-close-icon" onClick={onHide}>
        <Modal.Title className="modal-title-text" style={{ color: "#295086", fontWeight: "700" }}>
          Edit Availability
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "24px" }}>
        <AppointmentAvailabilityWrapper className="sitback-appointment-availability-panel">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <section className="availability-section">
              <div className="availability-section-header">
                <span>{t("whenSection") || "When"}</span>
              </div>
              <div className="availability-field">
                {/* Date Range & Custom Dates */}
                <Row className="mb-3">
                  <Col md={6}>
                    <label>{t("dateRange")}</label>
                    <Controller
                      name="date"
                      control={control}
                      render={({ field }) => (
                        <ReactSelect
                          placeholder="Select date range"
                          className="sitback-select2-container input-with-icon"
                          classNamePrefix="sitback-select-option"
                          options={DATE_RANGE_OPTIONS}
                          closeMenuOnSelect
                          isSearchable={false}
                          isDisabled={dateRange?.value === "Custom" || dateRange?.value === "Ongoing"}
                          {...field}
                          onChange={(option) => {
                            field.onChange(option);
                            setValue("schedule", null);
                            setValue("startdate", null);
                            setValue("enddate", null);
                            setValue("starttime", null);
                            setValue("endtime", null);
                          }}
                        />
                      )}
                    />
                    <p className="text-danger">{errors?.date?.value?.message || errors?.date?.message}</p>
                  </Col>
                  <Col md={6}>
                    {dateRange?.value === "Custom" && (
                      <div>
                        <label>{t("date")}</label>
                        <div className="date-input-row">
                          <Controller
                            name="startdate"
                            control={control}
                            render={({ field }) => (
                              <ReactDatePicker
                                className="datepicker-input"
                                placeholderText="YYYY-MM-DD"
                                dateFormat="yyyy-MM-dd"
                                selected={field.value}
                                minDate={new Date()}
                                onChange={(date) => {
                                  field.onChange(date);
                                  setValue("starttime", null);
                                  setValue("endtime", null);
                                }}
                              />
                            )}
                          />
                          <span className="to-label">{t("to")}</span>
                          <Controller
                            name="enddate"
                            control={control}
                            render={({ field }) => (
                              <ReactDatePicker
                                className="datepicker-input"
                                placeholderText="YYYY-MM-DD"
                                dateFormat="yyyy-MM-dd"
                                selected={field.value}
                                minDate={new Date()}
                                onChange={(date) => {
                                  field.onChange(date);
                                  setValue("starttime", null);
                                  setValue("endtime", null);
                                }}
                              />
                            )}
                          />
                        </div>
                        <p className="text-danger">{errors?.startdate?.message || errors?.enddate?.message}</p>
                      </div>
                    )}
                  </Col>
                </Row>

                {/* Schedule Range (for Ongoing) */}
                {dateRange?.value === "Ongoing" && (

                  <div className="availability-field0 mb-3">
                    <label>{t("scheduleRange")}</label>
                    <Controller
                      name="schedule"
                      control={control}
                      render={({ field }) => (
                        <ReactSelect
                          placeholder="Select schedule range"
                          className="sitback-select2-container input-with-icon"
                          classNamePrefix="sitback-select-option"
                          options={SCHEDULE_RANGE_OPTIONS}
                          closeMenuOnSelect
                          isSearchable={false}
                          isDisabled={dateRange?.value === "Ongoing"}
                          {...field}
                          onChange={(option) => {
                            field.onChange(option);
                            setValue("startdate", null);
                            setValue("enddate", null);
                          }}
                        />
                      )}
                    />
                    <p className="text-danger">{errors?.schedule?.message || errors?.schedule?.value?.message}</p>

                    {scheduleValue?.value === "Custom" && (
                      <div className="mt-3">
                        <label>{t("date")}</label>
                        <div className="date-input-row">
                          <Controller
                            name="startdate"
                            control={control}
                            render={({ field }) => (
                              <ReactDatePicker
                                className="datepicker-input"
                                placeholderText="YYYY-MM-DD"
                                dateFormat="yyyy-MM-dd"
                                selected={field.value}
                                minDate={new Date()}
                                disabled={dateRange?.value === "Ongoing"}
                                onChange={(date) => {
                                  field.onChange(date);
                                  setValue("starttime", null);
                                  setValue("endtime", null);
                                }}
                              />
                            )}
                          />
                          <span className="to-label">{t("to")}</span>
                          <Controller
                            name="enddate"
                            control={control}
                            render={({ field }) => (
                              <ReactDatePicker
                                className="datepicker-input"
                                placeholderText="YYYY-MM-DD"
                                dateFormat="yyyy-MM-dd"
                                selected={field.value}
                                minDate={new Date()}
                                disabled={dateRange?.value === "Ongoing"}
                                onChange={(date) => {
                                  field.onChange(date);
                                  setValue("starttime", null);
                                  setValue("endtime", null);
                                }}
                              />
                            )}
                          />
                        </div>
                        <p className="text-danger">{errors?.startdate?.message || errors?.enddate?.message}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Days and Time Row */}
                <Row className="days-time-row mb-3">
                  <Col md={6}>
                    <label>{t("days")}</label>
                    <div className="days-pill-row">
                      {WEEKDAYS.map((day, index) => (
                        <button
                          key={day.value}
                          type="button"
                          className={`day-pill ${daysValue?.[index] ? "active" : ""}`}
                          onClick={() => toggleDay(index)}
                        >
                          {day.label}
                        </button>
                      ))}
                    </div>
                    <p className="text-danger">{errors?.days?.message}</p>
                  </Col>
                  <Col md={6}>
                    <label>{t("time")}</label>
                    <div className="time-input-row" id={editTimePickerId}>
                      <Controller
                        name="starttime"
                        control={control}
                        render={({ field }) => (
                          <TimePicker
                            showSecond={false}
                            {...field}
                            placeholder="Select start time"
                            className="time-addinput-wrapper"
                            minuteStep={15}
                            format={timeFormat}
                            use12Hours
                            inputReadOnly
                            getPopupContainer={() => document.getElementById(editTimePickerId)}
                            onChange={(value) => field.onChange(value)}
                          />
                        )}
                      />
                      <span className="to-label">{t("to")}</span>
                      <Controller
                        name="endtime"
                        control={control}
                        render={({ field }) => (
                          <TimePicker
                            showSecond={false}
                            {...field}
                            placeholder="Select end time"
                            className="time-addinput-wrapper"
                            minuteStep={15}
                            format={timeFormat}
                            use12Hours
                            inputReadOnly
                            getPopupContainer={() => document.getElementById(editTimePickerId)}
                            onChange={(value) => field.onChange(value)}
                          />
                        )}
                      />
                    </div>
                    <p className="text-danger">{errors?.starttime?.message || errors?.endtime?.message}</p>
                  </Col>
                </Row>

                {/* Note checkbox (only when unavailable is selected) */}
                {staffValue === "0" && (
                  <div className="unavailable-note mb-3 d-flex align-items-start gap-2" style={{ borderTop: "1px solid #EEF5FC", paddingTop: "15px", marginTop: "15px" }}>
                    <Controller
                      name="note"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          id="edit-unavailable-note-check"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          style={{ marginTop: "4px", cursor: "pointer" }}
                        />
                      )}
                    />
                    <label htmlFor="edit-unavailable-note-check" style={{ color: "#4D6B93", fontSize: "14px", cursor: "pointer", userSelect: "none", fontWeight: "normal", display: "inline" }}>
                      {t("unavailableNote") || "Check this box to acknowledge that editing this will overwrite any active bookings during this period."}
                    </label>
                    <p className="text-danger">{errors?.note?.message}</p>
                  </div>
                )}
              </div>
            </section>

            {/* Modal Footer / Action Buttons */}
            <div className="availability-footer" style={{ borderTop: "none", paddingTop: "0", marginTop: "20px" }}>
              <button
                type="button"
                className="availability-cancel-btn"
                onClick={onHide}
              >
                {t("cancel")}
              </button>
              <LoadingButton
                type="submit"
                className="availability-action-btn"
                disabled={loading}
                label={t("save") || "Save"}
                loadinglabel={t("saving")}
                isLoading={loading}
              />
            </div>
          </Form>
        </AppointmentAvailabilityWrapper>
      </Modal.Body>
    </Modal>
  );
}
