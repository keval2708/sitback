"use client";

import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
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
  HrPermissionChip,
  HrPermissionsBlock,
  HrPermissionsList,
  HrSecondaryButton,
} from "@/styles/pages/hr-module.style";

const CLOSE_ICON = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12.5" cy="12.5" r="12.5" fill="white"/>
<path d="M16.4034 6.38199C17.0162 5.76924 18.0075 5.76924 18.6202 6.38199C19.2329 6.99475 19.233 7.98608 18.6202 8.59879L14.7169 12.5011L18.6202 16.4054C19.2326 17.0177 19.2326 18.008 18.6202 18.6203C18.3151 18.9273 17.9119 19.0802 17.5128 19.0802C17.1116 19.0802 16.7105 18.9274 16.4054 18.6203L12.5021 14.717L8.59874 18.6203C8.29349 18.9276 7.89176 19.0801 7.49034 19.0802C7.08896 19.0802 6.68724 18.9274 6.38195 18.6203C5.76917 18.0075 5.76917 17.0162 6.38195 16.4035L10.2853 12.5002L6.38097 8.59586C5.76897 7.98357 5.76872 6.99315 6.38097 6.38101C6.99541 5.76879 7.98649 5.76887 8.59679 6.38101L12.5001 10.2843L16.4034 6.38199Z" fill="#E32C1F"/>
</svg>
`;
const CHEVRON_ICON = `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const CALENDAR_ICON = `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.667 2.667h-1.334V2a.667.667 0 1 0-1.333 0v.667H6V2a.667.667 0 1 0-1.333 0v.667H3.333A1.333 1.333 0 0 0 2 4v8a1.333 1.333 0 0 0 1.333 1.333h9.334A1.333 1.333 0 0 0 14 12V4a1.333 1.333 0 0 0-1.333-1.333Zm0 9.333H3.333V6.667h9.334v5.333Z" fill="currentColor"/></svg>`;

const PERMISSION_OPTIONS = [
  "View Dashboard",
  "Process Payroll",
  "Approve Leaves",
  "Manage Employees",
  "Manage Tips",
  "View Reports",
  "Manage Attendance",
];

const ROLE_OPTIONS = ["Therapist", "Receptionist", "Manager"];
const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "onleave", label: "On Leave" },
  { value: "inactive", label: "Inactive" },
];
const SALARY_TYPE_OPTIONS = ["Monthly", "Hourly", "Commission"];


const getInitialForm = (employee) => {
  if (!employee) {
    return {
      fullName: "",
      email: "",
      phone: "",
      emergencyContact: "",
      address: "",
      role: "",
      employmentStatus: "",
      salaryType: "",
      monthlySalary: "",
      joiningDate: "",
      bankAccount: "",
      permissions: [...PERMISSION_OPTIONS],
    };
  }

  return {
    fullName: employee.name || "",
    email: employee.email || "",
    phone: employee.phone || "",
    emergencyContact: employee.emergencyContact || "",
    address: employee.address || "",
    role: employee.role || "",
    employmentStatus: employee.status || "",
    salaryType: employee.salaryType || "Monthly",
    monthlySalary:
      employee.monthly === 0 || employee.monthly
        ? String(employee.monthly)
        : "",
    joiningDate: employee.joiningDate || "",
    bankAccount: employee.bankAccount || "",
    permissions: employee.permissions?.length
      ? [...employee.permissions]
      : ["View Dashboard", "Approve Leaves", "Manage Attendance"],
  };
};

const employeeValidationSchema = yup.object({
  fullName: yup.string().trim().required("Full name is required"),
    email: yup
        .string()
        .required("Email is required")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          ("Enter valid email address")
        ),
  phone: yup.string().trim().required("Phone number is required"),
  emergencyContact: yup.string().trim().nullable(),
  address: yup.string().trim().required("Address is required"),
  role: yup.string().required("Role is required"),
  employmentStatus: yup.string().required("Employment status is required"),
  salaryType: yup.string().required("Salary type is required"),
  monthlySalary: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" || originalValue == null ? undefined : Number(originalValue)
    )
    .typeError("Monthly salary must be a number")
    .required("Monthly salary is required")
    .min(0, "Monthly salary cannot be negative"),
  joiningDate: yup.string().required("Joining date is required"),
  bankAccount: yup.string().trim().nullable(),
  permissions: yup.array().of(yup.string()).nullable(),
});

export default function AddEmployeeModal({
  open,
  onClose,
  onSave,
  employee = null,
}) {
  const isEdit = Boolean(employee?.id);
  const [form, setForm] = useState(() => getInitialForm(employee));
  const [errors, setErrors] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    if (open) {
      setForm(getInitialForm(employee));
      setErrors({});
    }
  }, [open, employee]);

  if (!open) return null;

  const updateField = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const updateSalary = (event) => {
    const value = event.target.value;
    if (value !== "" && Number(value) < 0) {
      setErrors((prev) => ({
        ...prev,
        monthlySalary: "Monthly salary cannot be negative",
      }));
      return;
    }
    setForm((prev) => ({ ...prev, monthlySalary: value }));
    setErrors((prev) => ({ ...prev, monthlySalary: "" }));
  };

  const updateValue = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const togglePermission = (permission) => {
    setForm((prev) => {
      const exists = prev.permissions.includes(permission);
      return {
        ...prev,
        permissions: exists
          ? prev.permissions.filter((item) => item !== permission)
          : [...prev.permissions, permission],
      };
    });
  };

  const validate = async () => {
    try {
      await employeeValidationSchema.validate(form, { abortEarly: false });
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
      aria-labelledby="add-employee-title"
      onClick={onClose}
    >
      <HrModalCard $wide onClick={(event) => event.stopPropagation()}>
        <HrModalHeader>
          <h2 id="add-employee-title">
            {isEdit ? "Edit Employee" : "Add Employee"}
          </h2>
          <HrModalClose type="button" aria-label="Close" onClick={onClose}>
            <InlineSVG src={CLOSE_ICON} />
          </HrModalClose>
        </HrModalHeader>

        <HrModalForm onSubmit={handleSubmit}>
          <HrModalRow $cols="1fr 1fr">
            <HrField>
              <input
                type="text"
                placeholder="Full Name"
                value={form.fullName}
                onChange={updateField("fullName")}
                aria-label="Full Name"
              />
              {errors.fullName && <p className="error">{errors.fullName}</p>}
            </HrField>
            <HrField>
              <input
                type="string"
                placeholder="Email"
                value={form.email}
                onChange={updateField("email")}
                aria-label="Email"
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </HrField>
          </HrModalRow>

          <HrModalRow $cols="1fr 1fr">
            <HrField>
              <input
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={updateField("phone")}
                aria-label="Phone Number"
              />
              {errors.phone && <p className="error">{errors.phone}</p>}
            </HrField>
            <HrField>
              <input
                type="tel"
                placeholder="Emergency Contact"
                value={form.emergencyContact}
                onChange={updateField("emergencyContact")}
                aria-label="Emergency Contact"
              />
              {errors.emergencyContact && (
                <p className="error">{errors.emergencyContact}</p>
              )}
            </HrField>
          </HrModalRow>

          <HrModalRow>
            <HrField>
              <input
                type="text"
                placeholder="Address"
                value={form.address}
                onChange={updateField("address")}
                aria-label="Address"
              />
              {errors.address && <p className="error">{errors.address}</p>}
            </HrField>
          </HrModalRow>

          <HrModalRow $cols="1fr 1fr">
            <HrField>
              <select
                value={form.role}
                onChange={updateField("role")}
                aria-label="Role"
              >
                <option value="">Role</option>
                {ROLE_OPTIONS.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <span className="field-icon">
                <InlineSVG src={CHEVRON_ICON} />
              </span>
              {errors.role && <p className="error">{errors.role}</p>}
            </HrField>
            <HrField>
              <select
                value={form.employmentStatus}
                onChange={updateField("employmentStatus")}
                aria-label="Employment Status"
              >
                <option value="">Employment Status</option>
                {STATUS_OPTIONS.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
              <span className="field-icon">
                <InlineSVG src={CHEVRON_ICON} />
              </span>
              {errors.employmentStatus && (
                <p className="error">{errors.employmentStatus}</p>
              )}
            </HrField>
          </HrModalRow>

          <HrModalRow $cols="1fr 1fr">
            <HrField>
              <select
                value={form.salaryType}
                onChange={updateField("salaryType")}
                aria-label="Salary Type"
              >
                <option value="">Salary Type</option>
                {SALARY_TYPE_OPTIONS.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <span className="field-icon">
                <InlineSVG src={CHEVRON_ICON} />
              </span>
              {errors.salaryType && (
                <p className="error">{errors.salaryType}</p>
              )}
            </HrField>
            <HrField>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="Monthly Salary ($)"
                value={form.monthlySalary}
                onChange={updateSalary}
                onKeyDown={(event) => {
                  if (event.key === "-" || event.key === "e" || event.key === "E") {
                    event.preventDefault();
                  }
                }}
                aria-label="Monthly Salary"
              />
              {errors.monthlySalary && (
                <p className="error">{errors.monthlySalary}</p>
              )}
            </HrField>
          </HrModalRow>

          <HrModalRow $cols="1fr 1fr">
            <HrField $empty={!form.joiningDate}>

              <ReactDatePicker
                selected={
                  form.joiningDate ? moment(form.joiningDate).toDate() : null
                }
                onChange={(date) => {
                  updateValue(
                    "joiningDate",
                    date ? moment(date).format("YYYY-MM-DD") : ""
                  );
                }}
                dateFormat="dd/MM/yyyy"
                placeholderText="Joining Date"
                onKeyDown={(event) => event.preventDefault()}
                aria-label="Joining Date"
              />
              <span className="field-icon">
                <InlineSVG src={CALENDAR_ICON} />
              </span>
              {errors.joiningDate && (
                <p className="error">{errors.joiningDate}</p>
              )}
            </HrField>
            <HrField>
              <input
                type="text"
                placeholder="Bank Account"
                value={form.bankAccount}
                onChange={updateField("bankAccount")}
                aria-label="Bank Account"
              />
              {errors.bankAccount && (
                <p className="error">{errors.bankAccount}</p>
              )}
            </HrField>
          </HrModalRow>

          <HrPermissionsBlock>
            <h3 className="permissions-title">Assigned Permissions</h3>
            <HrPermissionsList>
              {PERMISSION_OPTIONS.map((permission) => (
                <HrPermissionChip
                  key={permission}
                  type="button"
                  $active={form.permissions.includes(permission)}
                  onClick={() => togglePermission(permission)}
                >
                  {permission}
                </HrPermissionChip>
              ))}
            </HrPermissionsList>
          </HrPermissionsBlock>

          <HrModalActions $center={!isEdit}>
            <HrSecondaryButton type="button" onClick={onClose}>
              Cancel
            </HrSecondaryButton>
            <HrModalPrimaryButton type="submit">
              {isEdit ? "Update Employee" : "Add Employee"}
            </HrModalPrimaryButton>
          </HrModalActions>
        </HrModalForm>
      </HrModalCard>
    </HrModalOverlay>
  );
}
