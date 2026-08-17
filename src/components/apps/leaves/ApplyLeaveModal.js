"use client";

import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
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

const DATE_FORMAT = "YYYY-MM-DD";

const LEAVE_TYPES = [
  { value: "paid", label: "Paid" },
  { value: "unpaid", label: "Unpaid" },
  // { value: "casual", label: "Casual" },
];

const getInitialForm = () => ({
  employeeId: "",
  leaveType: "",
  startDate: "",
  endDate: "",
  reason: "",
});

const extractRows = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.list)) return payload.list;
  if (Array.isArray(payload?.rows)) return payload.rows;
  if (Array.isArray(payload?.employees)) return payload.employees;
  return [];
};

const normalizeEmployeeOption = (item = {}) => {
  const id = item.id ?? item._id ?? item.employeeId;
  const name =
    item.name ||
    item.fullName ||
    [item.firstName, item.lastName].filter(Boolean).join(" ") ||
    "";
  if (id == null || !name) return null;
  return { id, name };
};

const leaveValidationSchema = yup.object({
  employeeId: yup.string().required("Employee is required"),
  leaveType: yup
    .string()
    .required("Leave type is required")
    .oneOf(
      LEAVE_TYPES.map((type) => type.value),
      "Select a valid leave type"
    ),
  startDate: yup
    .string()
    .required("Start date is required")
    .test("valid-date", "Enter a valid start date", (value) =>
      value ? moment(value, DATE_FORMAT, true).isValid() : false
    ),
  endDate: yup
    .string()
    .required("End date is required")
    .test("valid-date", "Enter a valid end date", (value) =>
      value ? moment(value, DATE_FORMAT, true).isValid() : false
    )
    .test(
      "after-start",
      "End date must be on or after start date",
      function (value) {
        const { startDate } = this.parent;
        if (!value || !startDate) return true;
        return !moment(value, DATE_FORMAT, true).isBefore(
          moment(startDate, DATE_FORMAT, true),
          "day"
        );
      }
    ),
  reason: yup
    .string()
    .trim()
    .required("Reason is required")
    .max(250, "Reason must be 250 characters or less"),
});

export default function ApplyLeaveModal({ open, onClose, onSave }) {
  const [form, setForm] = useState(getInitialForm);
  const [errors, setErrors] = useState({});
  const [employees, setEmployees] = useState([]);
  const [employeesLoading, setEmployeesLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toaster } = useToaster();

  const fetchEmployees = useCallback(async () => {
    try {
      setEmployeesLoading(true);
      const res = await axiosApiCall.get(API_ROUTER?.HR_EMPLOYEE_NAME_LIST);
      console.log("res data in apply leave modal", res);
      const rowsData = extractRows(res?.data?.data ?? res?.data);
      setEmployees(rowsData.map(normalizeEmployeeOption).filter(Boolean));
    } catch {
      setEmployees([]);
    } finally {
      setEmployeesLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    setForm(getInitialForm());
    setErrors({});
    setSubmitting(false);
    fetchEmployees();
  }, [open, fetchEmployees]);

  if (!open) return null;

  const updateField = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const updateValue = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = async () => {
    try {
      await leaveValidationSchema.validate(form, { abortEarly: false });
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

    const selectedEmployee = employees.find(
      (employee) => String(employee.id) === String(form.employeeId)
    );

    const payload = {
      employeeId: Number(form.employeeId),
      startDate: form.startDate,
      endDate: form.endDate,
      leaveType: form.leaveType,
      reason: form.reason?.trim() || "",
    };

    try {
      setSubmitting(true);
      const res = await axiosApiCall.post(
        API_ROUTER?.HR_LEAVE_CREATE || API_ROUTER?.ADD_EMPLOYEE_LEAVE_SCHEDULE,
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
        res?.data?.message || "Leave request submitted successfully",
        TOAST_TYPES.SUCCESS
      );
      onSave?.({
        ...payload,
        employeeName: selectedEmployee?.name || "",
      });
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
      aria-labelledby="apply-leave-title"
      onClick={submitting ? undefined : onClose}
    >
      <HrModalCard onClick={(event) => event.stopPropagation()}>
        <HrModalHeader>
          <h2 id="apply-leave-title">Apply For Leave</h2>
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
                aria-label="Select Employee"
                disabled={employeesLoading || submitting}
              >
                <option value="">
                  {employeesLoading ? "Loading employees..." : "Select Employee"}
                </option>
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

          <HrModalRow>
            <HrField>
              <select
                value={form.leaveType}
                onChange={updateField("leaveType")}
                aria-label="Leave Type"
                disabled={submitting}
              >
                <option value="">Leave Type</option>
                {LEAVE_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <span className="field-icon">
                <InlineSVG src={CHEVRON_ICON} />
              </span>
              {errors.leaveType && <p className="error">{errors.leaveType}</p>}
            </HrField>
          </HrModalRow>

          <HrModalRow $cols="1fr 1fr">
            <HrField $empty={!form.startDate}>
              <ReactDatePicker
                selected={form.startDate ? moment(form.startDate).toDate() : null}
                onChange={(date) => {
                  updateValue(
                    "startDate",
                    date ? moment(date).format(DATE_FORMAT) : ""
                  );
                }}
                dateFormat="dd/MM/yyyy"
                placeholderText="Start Date"
                onKeyDown={(event) => event.preventDefault()}
                aria-label="Start Date"
                portalId="hr-datepicker-portal"
                popperClassName="hr-datepicker-portal-popper"
                popperProps={{ strategy: "fixed" }}
                disabled={submitting}
              />
              <span className="field-icon">
                <InlineSVG src={CALENDAR_ICON} />
              </span>
              {errors.startDate && <p className="error">{errors.startDate}</p>}
            </HrField>
            <HrField $empty={!form.endDate}>
              <ReactDatePicker
                selected={form.endDate ? moment(form.endDate).toDate() : null}
                onChange={(date) => {
                  updateValue(
                    "endDate",
                    date ? moment(date).format(DATE_FORMAT) : ""
                  );
                }}
                dateFormat="dd/MM/yyyy"
                placeholderText="End Date"
                minDate={
                  form.startDate ? moment(form.startDate).toDate() : undefined
                }
                onKeyDown={(event) => event.preventDefault()}
                aria-label="End Date"
                portalId="hr-datepicker-portal"
                popperClassName="hr-datepicker-portal-popper"
                popperProps={{ strategy: "fixed" }}
                disabled={submitting}
              />
              <span className="field-icon">
                <InlineSVG src={CALENDAR_ICON} />
              </span>
              {errors.endDate && <p className="error">{errors.endDate}</p>}
            </HrField>
          </HrModalRow>

          <HrModalRow>
            <HrField>
              <textarea
                placeholder="Reason"
                value={form.reason}
                onChange={updateField("reason")}
                className="resize-none"
                aria-label="Reason"
                disabled={submitting}
              />
              {errors.reason && <p className="error">{errors.reason}</p>}
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
              {submitting ? "Submitting..." : "Submit Request"}
            </HrModalPrimaryButton>
          </HrModalActions>
        </HrModalForm>
      </HrModalCard>
    </HrModalOverlay>
  );
}
