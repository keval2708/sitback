"use client";

import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import InlineSVG from "svg-inline-react";
import * as yup from "yup";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import {
  HrField,
  HrModalActions,
  HrModalCard,
  HrModalClose,
  HrModalForm,
  HrModalHeader,
  HrModalOverlay,
  HrModalPrimaryButton,
  HrModalRow,
  HrSecondaryButton,
} from "@/styles/pages/hr-module.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const CLOSE_ICON = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12.5" cy="12.5" r="12.5" fill="white"/>
<path d="M16.4034 6.38199C17.0162 5.76924 18.0075 5.76924 18.6202 6.38199C19.2329 6.99475 19.233 7.98608 18.6202 8.59879L14.7169 12.5011L18.6202 16.4054C19.2326 17.0177 19.2326 18.008 18.6202 18.6203C18.3151 18.9273 17.9119 19.0802 17.5128 19.0802C17.1116 19.0802 16.7105 18.9274 16.4054 18.6203L12.5021 14.717L8.59874 18.6203C8.29349 18.9276 7.89176 19.0801 7.49034 19.0802C7.08896 19.0802 6.68724 18.9274 6.38195 18.6203C5.76917 18.0075 5.76917 17.0162 6.38195 16.4035L10.2853 12.5002L6.38097 8.59586C5.76897 7.98357 5.76872 6.99315 6.38097 6.38101C6.99541 5.76879 7.98649 5.76887 8.59679 6.38101L12.5001 10.2843L16.4034 6.38199Z" fill="#E32C1F"/>
</svg>
`;
const CHEVRON_ICON = `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const CALENDAR_ICON = `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.667 2.667h-1.334V2a.667.667 0 1 0-1.333 0v.667H6V2a.667.667 0 1 0-1.333 0v.667H3.333A1.333 1.333 0 0 0 2 4v8a1.333 1.333 0 0 0 1.333 1.333h9.334A1.333 1.333 0 0 0 14 12V4a1.333 1.333 0 0 0-1.333-1.333Zm0 9.333H3.333V6.667h9.334v5.333Z" fill="currentColor"/></svg>`;
const CLOCK_ICON = `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 4.667V8h2.667M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const TIME_FORMAT = "hh:mm A";
const API_TIME_FORMAT = "HH:mm";

const toApiTime = (value) => {
  if (!value) return "";
  const parsed = moment(value, TIME_FORMAT, true);
  return parsed.isValid() ? parsed.format(API_TIME_FORMAT) : value;
};

const getInitialForm = (defaultDate) => ({
  employeeId: "",
  date: defaultDate || moment().format("YYYY-MM-DD"),
  status: "",
  checkIn: "",
  checkOut: "",
  breakMinutes: "",
  overtimeMinutes: "",
  notes: "",
});

const attendanceValidationSchema = yup.object({
  employeeId: yup.string().required("Employee is required"),
  date: yup.string().required("Date is required"),
  status: yup.string().required("Status is required"),
  checkIn: yup
    .string()
    .required("Check in is required")
    .test("valid-time", "Enter a valid check in time", (value) =>
      value ? moment(value, TIME_FORMAT, true).isValid() : false
    ),
  checkOut: yup
    .string()
    .required("Check out is required")
    .test("valid-time", "Enter a valid check out time", (value) =>
      value ? moment(value, TIME_FORMAT, true).isValid() : false
    )
    .test(
      "after-checkin",
      "Check out must be after check in",
      function (value) {
        const { checkIn } = this.parent;
        if (!value || !checkIn) return true;
        return moment(value, TIME_FORMAT, true).isAfter(
          moment(checkIn, TIME_FORMAT, true)
        );
      }
    ),
  breakMinutes: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" || originalValue == null ? undefined : value
    )
    .nullable()
    .min(0, "Break duration cannot be negative")
    .typeError("Break duration must be a number"),
  overtimeMinutes: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" || originalValue == null ? undefined : value
    )
    .nullable()
    .min(0, "Overtime hours cannot be negative")
    .typeError("Overtime hours must be a number"),
  notes: yup.string().nullable(),
});

export default function RecordAttendanceModal({
  open,
  onClose,
  employees = [],
  defaultDate,
  onSave,
}) {
  const [form, setForm] = useState(() => getInitialForm(defaultDate));
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [timeFieldsKey, setTimeFieldsKey] = useState(0);
  const { toaster } = useToaster();

  useEffect(() => {
    if (open) {
      setForm(getInitialForm(defaultDate || moment().format("YYYY-MM-DD")));
      setErrors({});
      setSubmitting(false);
      // Remount DateTime inputs so previous check-in/out times do not stick
      setTimeFieldsKey((prev) => prev + 1);
    }
  }, [open, defaultDate]);

  useEffect(() => {
    if (!open) return undefined;

    const keepTimePickerFocus = (event) => {
      if (event.target.closest(".rdtPicker")) {
        event.preventDefault();
      }
    };

    document.addEventListener("mousedown", keepTimePickerFocus);
    return () => {
      document.removeEventListener("mousedown", keepTimePickerFocus);
    };
  }, [open]);

  if (!open) return null;

  const updateField = (key) => (event) => {
    const value = event.target.value;
    setForm((prev) => {
      if (prev[key] === value) return prev;
      return { ...prev, [key]: value };
    });
    setErrors((prev) => {
      if (!prev[key]) return prev;
      return { ...prev, [key]: "" };
    });
  };

  const updateNumberField = (key) => (event) => {
    const value = event.target.value;
    if (value !== "" && Number(value) < 0) return;

    setForm((prev) => {
      if (prev[key] === value) return prev;
      return { ...prev, [key]: value };
    });
    setErrors((prev) => {
      if (!prev[key]) return prev;
      return { ...prev, [key]: "" };
    });
  };

  const updateValue = (key, value) => {
    setForm((prev) => {
      if (prev[key] === value) return prev;
      return { ...prev, [key]: value };
    });
    setErrors((prev) => {
      if (!prev[key]) return prev;
      return { ...prev, [key]: "" };
    });
  };

  const handleTimeChange = (key) => (time) => {
    if (moment.isMoment(time) && time.isValid()) {
      updateValue(key, time.format(TIME_FORMAT));
      return;
    }
    if (typeof time === "string") {
      updateValue(key, time);
    }
  };

  const validate = async () => {
    try {
      await attendanceValidationSchema.validate(form, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      const next = {};
      if (error?.inner?.length) {
        error.inner.forEach((item) => {
          if (item.path && !next[item.path]) {
            next[item.path] = item.message;
          }
        });
      } else if (error?.path) {
        next[error.path] = error.message;
      }
      setErrors(next);
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!(await validate()) || submitting) return;

    const payload = {
      employeeId: Number(form.employeeId),
      date: form.date,
      status: form.status,
      checkIn: toApiTime(form.checkIn),
      checkOut: toApiTime(form.checkOut),
      breakDuration: Number(form.breakMinutes || 0),
      overtimeHours: Number(form.overtimeMinutes || 0),
      notes: form.notes?.trim() || "",
    };

    try {
      setSubmitting(true);
      const res = await axiosApiCall.post(
        API_ROUTER?.HR_ATTENDANCE_CREATE,
        payload
      );

      if (!res?.data?.status) {
        toaster(
          res?.data?.message || res?.message || TOAST_ALERTS.GENERAL_ERROR,
          TOAST_TYPES.ERROR
        );
        return;
      }

      toaster(
        res?.data?.message || "Attendance recorded successfully",
        TOAST_TYPES.SUCCESS
      );
      onSave?.(payload);
      onClose?.();
    } catch {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <HrModalOverlay
      role="dialog"
      aria-modal="true"
      aria-labelledby="record-attendance-title"
      onClick={submitting ? undefined : onClose}
    >
      <HrModalCard onClick={(event) => event.stopPropagation()}>
        <HrModalHeader>
          <h2 id="record-attendance-title">Record Attendance</h2>
          <HrModalClose
            type="button"
            aria-label="Close"
            onClick={onClose}
            disabled={submitting}
          >
            <InlineSVG src={CLOSE_ICON} />
          </HrModalClose>
        </HrModalHeader>

        <HrModalForm onSubmit={handleSubmit}>
          <HrModalRow>
            <HrField>
              <select
                value={form.employeeId}
                onChange={updateField("employeeId")}
                aria-label="Employee"
                disabled={submitting}
              >
                <option value="">Select Employee</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
              <span className="field-icon">
                <InlineSVG src={CHEVRON_ICON} />
              </span>
              {errors.employeeId && <p className="error">{errors.employeeId}</p>}
            </HrField>
          </HrModalRow>

          <HrModalRow $cols="1fr 1fr">
            <HrField $empty={!form.date}>
              {!form.date && <span className="placeholder">Date</span>}
              <ReactDatePicker
                selected={form.date ? moment(form.date).toDate() : null}
                onChange={(date) => {
                  updateValue(
                    "date",
                    date ? moment(date).format("YYYY-MM-DD") : ""
                  );
                }}
                dateFormat="dd/MM/yyyy"
                placeholderText="Date"
                onKeyDown={(event) => event.preventDefault()}
                aria-label="Date"
                disabled={submitting}
              />
              <span className="field-icon">
                <InlineSVG src={CALENDAR_ICON} />
              </span>
              {errors.date && <p className="error">{errors.date}</p>}
            </HrField>
            <HrField>
              <select
                value={form.status}
                onChange={updateField("status")}
                aria-label="Status"
                disabled={submitting}
              >
                <option value="">Status</option>
                <option value="present">Present</option>
                <option value="halfDay">Half Day</option>
                <option value="late">Late</option>
              </select>
              <span className="field-icon">
                <InlineSVG src={CHEVRON_ICON} />
              </span>
              {errors.status && <p className="error">{errors.status}</p>}
            </HrField>
          </HrModalRow>

          <HrModalRow $cols="1fr 1fr">
            <HrField as="div" $empty={!form.checkIn}>
              <DateTime
                key={`check-in-${timeFieldsKey}`}
                dateFormat={false}
                timeFormat={TIME_FORMAT}
                closeOnSelect={false}
                value={form.checkIn || ""}
                onChange={handleTimeChange("checkIn")}
                inputProps={{
                  placeholder: "Check In",
                  "aria-label": "Check In",
                  readOnly: true,
                  disabled: submitting,
                  autoComplete: "off",
                }}
              />
              <span className="field-icon">
                <InlineSVG src={CLOCK_ICON} />
              </span>
              {errors.checkIn && <p className="error">{errors.checkIn}</p>}
            </HrField>
            <HrField as="div" $empty={!form.checkOut}>
              <DateTime
                key={`check-out-${timeFieldsKey}`}
                dateFormat={false}
                timeFormat={TIME_FORMAT}
                closeOnSelect={false}
                value={form.checkOut || ""}
                onChange={handleTimeChange("checkOut")}
                inputProps={{
                  placeholder: "Check Out",
                  "aria-label": "Check Out",
                  readOnly: true,
                  disabled: submitting,
                  autoComplete: "off",
                }}
              />
              <span className="field-icon">
                <InlineSVG src={CLOCK_ICON} />
              </span>
              {errors.checkOut && <p className="error">{errors.checkOut}</p>}
            </HrField>
          </HrModalRow>

          <HrModalRow $cols="1fr 1fr">
            <HrField as="div">
              <input
                type="number"
                min="0"
                inputMode="numeric"
                autoComplete="off"
                placeholder="Break Duration (min)"
                value={form.breakMinutes}
                onChange={updateNumberField("breakMinutes")}
                onKeyDown={(event) => {
                  if (
                    event.key === "-" ||
                    event.key === "e" ||
                    event.key === "E" ||
                    event.key === "+"
                  ) {
                    event.preventDefault();
                  }
                }}
                onWheel={(event) => event.currentTarget.blur()}
                disabled={submitting}
              />
              {errors.breakMinutes && (
                <p className="error">{errors.breakMinutes}</p>
              )}
            </HrField>
            <HrField as="div">
              <input
                type="number"
                min="0"
                inputMode="numeric"
                autoComplete="off"
                placeholder="Overtime (hrs)"
                value={form.overtimeMinutes}
                onChange={updateNumberField("overtimeMinutes")}
                onKeyDown={(event) => {
                  if (
                    event.key === "-" ||
                    event.key === "e" ||
                    event.key === "E" ||
                    event.key === "+"
                  ) {
                    event.preventDefault();
                  }
                }}
                onWheel={(event) => event.currentTarget.blur()}
                disabled={submitting}
              />
              {errors.overtimeMinutes && (
                <p className="error">{errors.overtimeMinutes}</p>
              )}
            </HrField>
          </HrModalRow>

          <HrModalRow>
            <HrField>
              <textarea
                placeholder="Notes"
                value={form.notes}
                onChange={updateField("notes")}
                className="resize-none"
                disabled={submitting}
              />
            </HrField>
          </HrModalRow>

          <HrModalActions>
            <HrSecondaryButton
              type="button"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </HrSecondaryButton>
            <HrModalPrimaryButton type="submit" disabled={submitting}>
              {submitting ? "Saving..." : "Save"}
            </HrModalPrimaryButton>
          </HrModalActions>
        </HrModalForm>
      </HrModalCard>
    </HrModalOverlay>
  );
}
