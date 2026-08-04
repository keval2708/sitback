"use client";

import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import InlineSVG from "svg-inline-react";
import * as yup from "yup";
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

const CLOSE_ICON = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12.5" cy="12.5" r="12.5" fill="white"/>
<path d="M16.4034 6.38199C17.0162 5.76924 18.0075 5.76924 18.6202 6.38199C19.2329 6.99475 19.233 7.98608 18.6202 8.59879L14.7169 12.5011L18.6202 16.4054C19.2326 17.0177 19.2326 18.008 18.6202 18.6203C18.3151 18.9273 17.9119 19.0802 17.5128 19.0802C17.1116 19.0802 16.7105 18.9274 16.4054 18.6203L12.5021 14.717L8.59874 18.6203C8.29349 18.9276 7.89176 19.0801 7.49034 19.0802C7.08896 19.0802 6.68724 18.9274 6.38195 18.6203C5.76917 18.0075 5.76917 17.0162 6.38195 16.4035L10.2853 12.5002L6.38097 8.59586C5.76897 7.98357 5.76872 6.99315 6.38097 6.38101C6.99541 5.76879 7.98649 5.76887 8.59679 6.38101L12.5001 10.2843L16.4034 6.38199Z" fill="#E32C1F"/>
</svg>
`;
const CHEVRON_ICON = `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const CALENDAR_ICON = `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.667 2.667h-1.334V2a.667.667 0 1 0-1.333 0v.667H6V2a.667.667 0 1 0-1.333 0v.667H3.333A1.333 1.333 0 0 0 2 4v8a1.333 1.333 0 0 0 1.333 1.333h9.334A1.333 1.333 0 0 0 14 12V4a1.333 1.333 0 0 0-1.333-1.333Zm0 9.333H3.333V6.667h9.334v5.333Z" fill="currentColor"/></svg>`;
const CLOCK_ICON = `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 4.667V8h2.667M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const TIME_FORMAT = "hh:mm A";

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
    .min(0, "Overtime minutes cannot be negative")
    .typeError("Overtime minutes must be a number"),
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

  useEffect(() => {
    if (open) {
      setForm(getInitialForm(defaultDate || moment().format("YYYY-MM-DD")));
      setErrors({});
    }
  }, [open, defaultDate]);

  if (!open) return null;

  const updateField = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const updateValue = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
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
    if (!(await validate())) return;
    onSave?.(form);
    onClose?.();
  };

  return (
    <HrModalOverlay
      role="dialog"
      aria-modal="true"
      aria-labelledby="record-attendance-title"
      onClick={onClose}
    >
      <HrModalCard onClick={(event) => event.stopPropagation()}>
        <HrModalHeader>
          <h2 id="record-attendance-title">Record Attendance</h2>
          <HrModalClose type="button" aria-label="Close" onClick={onClose}>
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
              >
                <option value="">Status</option>
                <option value="present">Present</option>
                <option value="halfday">Half Day</option>
                <option value="late">Late</option>
              </select>
              <span className="field-icon">
                <InlineSVG src={CHEVRON_ICON} />
              </span>
              {errors.status && <p className="error">{errors.status}</p>}
            </HrField>
          </HrModalRow>

          <HrModalRow $cols="1fr 1fr">
            <HrField $empty={!form.checkIn}>
              <DateTime
                dateFormat={false}
                timeFormat={TIME_FORMAT}
                closeOnSelect
                value={form.checkIn || ""}
                onChange={handleTimeChange("checkIn")}
                inputProps={{
                  placeholder: "Check In",
                  "aria-label": "Check In",
                  readOnly: true,
                }}
              />
              <span className="field-icon">
                <InlineSVG src={CLOCK_ICON} />
              </span>
              {errors.checkIn && <p className="error">{errors.checkIn}</p>}
            </HrField>
            <HrField $empty={!form.checkOut}>
              <DateTime
                dateFormat={false}
                timeFormat={TIME_FORMAT}
                closeOnSelect
                value={form.checkOut || ""}
                onChange={handleTimeChange("checkOut")}
                inputProps={{
                  placeholder: "Check Out",
                  "aria-label": "Check Out",
                  readOnly: true,
                }}
              />
              <span className="field-icon">
                <InlineSVG src={CLOCK_ICON} />
              </span>
              {errors.checkOut && <p className="error">{errors.checkOut}</p>}
            </HrField>
          </HrModalRow>

          <HrModalRow $cols="1fr 1fr">
            <HrField>
              <input
                type="number"
                min="0"
                placeholder="Break Duration (min)"
                value={form.breakMinutes}
                onChange={updateField("breakMinutes")}
              />
              {errors.breakMinutes && (
                <p className="error">{errors.breakMinutes}</p>
              )}
            </HrField>
            <HrField>
              <input
                type="number"
                min="0"
                placeholder="Overtime (min)"
                value={form.overtimeMinutes}
                onChange={updateField("overtimeMinutes")}
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
              />
            </HrField>
          </HrModalRow>

          <HrModalActions>
            <HrSecondaryButton type="button" onClick={onClose}>
              Cancel
            </HrSecondaryButton>
            <HrModalPrimaryButton type="submit">Save</HrModalPrimaryButton>
          </HrModalActions>
        </HrModalForm>
      </HrModalCard>
    </HrModalOverlay>
  );
}
