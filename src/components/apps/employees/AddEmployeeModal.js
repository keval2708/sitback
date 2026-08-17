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
  HrPermissionChip,
  HrPermissionsBlock,
  HrPermissionsList,
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

const DEFAULT_COUNTRY_CODE = "1";
const PHONE_DIGIT_LIMIT = 10;

const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const GENDER_OPTIONS = [
  { value: "", label: "Select Gender" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const SALARY_TYPE_OPTIONS = [
  { value: "monthly", label: "Monthly" },
  { value: "hourly", label: "Hourly" },
  // { value: "commission", label: "Commission" },
];

const normalizeSalaryType = (value) => {
  if (value == null || value === "") return "";
  const normalized = String(value).trim().toLowerCase();
  const matched = SALARY_TYPE_OPTIONS.find(
    (option) =>
      option.value === normalized || option.label.toLowerCase() === normalized
  );
  return matched?.value || "";
};

const normalizeGender = (value) => {
  if (value == null || value === "") return "";
  const normalized = String(value).trim().toLowerCase();
  const matched = GENDER_OPTIONS.find(
    (option) =>
      option.value &&
      (option.value === normalized || option.label.toLowerCase() === normalized)
  );
  return matched?.value || "";
};

const getNameParts = (employee = {}) => {
  const firstName = String(employee.firstName || employee.first_name || "").trim();
  const lastName = String(employee.lastName || employee.last_name || "").trim();
  if (firstName || lastName) {
    return { firstName, lastName };
  }

  const fullName = String(employee.name || employee.fullName || "").trim();
  if (!fullName) return { firstName: "", lastName: "" };

  const parts = fullName.split(/\s+/);
  return {
    firstName: parts[0] || "",
    lastName: parts.slice(1).join(" "),
  };
};

const toNationalPhone = (value, dialCode = DEFAULT_COUNTRY_CODE) => {
  let digits = String(value || "").replace(/\D/g, "");
  const code = String(dialCode || DEFAULT_COUNTRY_CODE).replace(/\D/g, "");
  if (code && digits.startsWith(code) && digits.length > PHONE_DIGIT_LIMIT) {
    digits = digits.slice(code.length);
  }
  if (digits.length > PHONE_DIGIT_LIMIT) {
    digits = digits.slice(-PHONE_DIGIT_LIMIT);
  }
  return digits.slice(0, PHONE_DIGIT_LIMIT);
};

const sanitizePhoneDigits = (value) =>
  String(value || "")
    .replace(/[^0-9]/g, "")
    .slice(0, PHONE_DIGIT_LIMIT);

const isValidMobileNumber = (value) => /^[0-9]{10}$/.test(String(value || ""));

const PHONE_ALLOWED_KEYS = [
  "Backspace",
  "Delete",
  "Tab",
  "Enter",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
];

const extractRows = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.list)) return payload.list;
  if (Array.isArray(payload?.rows)) return payload.rows;
  if (Array.isArray(payload?.roles)) return payload.roles;
  if (Array.isArray(payload?.permissions)) return payload.permissions;
  return [];
};

const mapRoleOption = (item = {}) => {
  const id = item.id ?? item._id ?? item.roleId ?? item.value;
  const name = item.name ?? item.roleName ?? item.label ?? item.title ?? "";
  if (id == null || !name) return null;
  return { id: String(id), name: String(name) };
};

const mapPermissionOption = (item = {}) => {
  const id = item.id ?? item._id ?? item.permissionId ?? item.value;
  const name =
    item.name ?? item.permissionName ?? item.label ?? item.title ?? item.key ?? "";
  if (id == null || !name) return null;
  return { id: String(id), name: String(name) };
};

const getInitialForm = (employee) => {
  if (!employee) {
    return {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      phone: "",
      countrycode: DEFAULT_COUNTRY_CODE,
      emergencyContact: "",
      emergencyCountrycode: DEFAULT_COUNTRY_CODE,
      role: "",
      employmentStatus: "",
      salaryType: "",
      salary: "",
      joiningDate: "",
      permissions: [],
    };
  }

  const roleValue =
    employee.roleId != null
      ? String(employee.roleId)
      : employee.role != null
        ? String(employee.role)
        : "";

  const permissionValues = Array.isArray(employee.permissionIds)
    ? employee.permissionIds.map(String)
    : Array.isArray(employee.permissions)
      ? employee.permissions.map((item) =>
          typeof item === "object"
            ? String(item.id ?? item._id ?? item.name ?? "")
            : String(item)
        )
      : [];

  const countrycode = String(
    employee.countrycode || employee.countryCode || DEFAULT_COUNTRY_CODE
  ).replace(/^\+/, "");
  const emergencyCountrycode = String(
    employee.emergencyCountrycode ||
      employee.emergencyCountryCode ||
      DEFAULT_COUNTRY_CODE
  ).replace(/^\+/, "");

  const rawStatus = employee.status || employee.employmentStatus || "";
  const employmentStatus =
    rawStatus === "onLeave" || rawStatus === "on_leave" ? "" : rawStatus;

  const { firstName, lastName } = getNameParts(employee);

  return {
    firstName,
    lastName,
    email: employee.email || "",
    gender: normalizeGender(employee.gender),
    phone: toNationalPhone(employee.phone, countrycode),
    countrycode: DEFAULT_COUNTRY_CODE,
    emergencyContact: toNationalPhone(
      employee.emergencyContact,
      emergencyCountrycode
    ),
    emergencyCountrycode: DEFAULT_COUNTRY_CODE,
    role: roleValue,
    employmentStatus,
    salaryType: normalizeSalaryType(employee.salaryType),
    salary: (() => {
      const salaryType = normalizeSalaryType(employee.salaryType);
      const salaryValue =
        employee.salary ??
        (salaryType === "hourly"
          ? employee.hourly ?? employee.hourlySalary
          : employee.monthly ?? employee.monthlySalary);
      return salaryValue === 0 || salaryValue ? String(salaryValue) : "";
    })(),
    joiningDate: employee.joiningDate || "",
    isAddedFromPayroll: true,
    permissions: permissionValues.filter(Boolean),
  };
};

const employeeValidationSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .required("First name is required")
    .max(15, "First name should be less than 15 characters"),
  lastName: yup
    .string()
    .trim()
    .required("Last name is required")
    .max(15, "Last name should be less than 15 characters"),
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Enter valid email address"
    ),
  gender: yup.string().required("Gender is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number should only contain digits")
    .test(
      "mobile-number",
      "Please enter a valid 10-digit phone number",
      isValidMobileNumber
    ),
  emergencyContact: yup
    .string()
    .trim()
    .nullable()
    .test(
      "valid-emergency-phone",
      "Please enter a valid 10-digit emergency contact",
      (value) => !value || isValidMobileNumber(value)
    ),
  role: yup.string().required("Role is required"),
  employmentStatus: yup.string().required("Employment status is required"),
  salaryType: yup
    .string()
    .required("Salary type is required")
    .oneOf(
      SALARY_TYPE_OPTIONS.map((option) => option.value),
      "Salary type is required"
    ),
  salary: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" || originalValue == null ? undefined : Number(originalValue)
    )
    .typeError("Salary must be a number")
    .required("Salary is required")
    .min(0, "Salary cannot be negative"),
  joiningDate: yup.string().required("Joining date is required"),
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
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toaster } = useToaster();

  const fetchRolesAndPermissions = useCallback(async () => {
    setOptionsLoading(true);
    try {
      const [rolesRes, permissionsRes] = await Promise.all([
        axiosApiCall.get(API_ROUTER?.SPA_ROLE_LIST),
        axiosApiCall.get(API_ROUTER?.SPA_PERMISSION_LIST),
      ]);

      const roleRows = extractRows(rolesRes?.data?.data ?? rolesRes?.data);
      const permissionRows = extractRows(
        permissionsRes?.data?.data ?? permissionsRes?.data
      );

      setRoles(roleRows.map(mapRoleOption).filter(Boolean));
      setPermissions(permissionRows.map(mapPermissionOption).filter(Boolean));
    } catch {
      setRoles([]);
      setPermissions([]);
    } finally {
      setOptionsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      setForm(getInitialForm(employee));
      setErrors({});
      fetchRolesAndPermissions();
    }
  }, [open, employee, fetchRolesAndPermissions]);

  useEffect(() => {
    if (!open) return undefined;

    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = documentElement.style.overflow;

    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";

    return () => {
      body.style.overflow = previousBodyOverflow;
      documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [open]);

  // Resolve edit role when options arrive (supports id or name from employee data)
  useEffect(() => {
    if (!open || !roles.length || !form.role) return;

    const matched = roles.find(
      (role) => role.id === String(form.role) || role.name === String(form.role)
    );
    if (matched && matched.id !== form.role) {
      setForm((prev) => ({ ...prev, role: matched.id }));
    }
  }, [open, roles, form.role]);

  // Resolve edit permissions when options arrive
  useEffect(() => {
    if (!open || !permissions.length || !form.permissions?.length) return;

    const resolved = form.permissions
      .map((value) => {
        const matched = permissions.find(
          (item) => item.id === String(value) || item.name === String(value)
        );
        return matched?.id;
      })
      .filter(Boolean);

    const same =
      resolved.length === form.permissions.length &&
      resolved.every((id, index) => id === form.permissions[index]);

    if (!same && resolved.length) {
      setForm((prev) => ({ ...prev, permissions: resolved }));
    }
  }, [open, permissions, form.permissions]);

  if (!open) return null;

  const updateField = (key) => (event) => {
    const value = event.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const updateSalary = (event) => {
    const value = event.target.value;
    if (value !== "" && Number(value) < 0) {
      setErrors((prev) => ({
        ...prev,
        salary: "Salary cannot be negative",
      }));
      return;
    }
    setForm((prev) => ({ ...prev, salary: value }));
    setErrors((prev) => ({ ...prev, salary: "" }));
  };

  const updateValue = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handlePhoneDigitsChange = (fieldKey) => (event) => {
    const value = sanitizePhoneDigits(event.target.value);
    setForm((prev) => ({
      ...prev,
      [fieldKey]: value,
      countrycode: DEFAULT_COUNTRY_CODE,
      emergencyCountrycode: DEFAULT_COUNTRY_CODE,
    }));
    setErrors((prev) => ({ ...prev, [fieldKey]: "" }));
  };

  const handlePhonePaste = (fieldKey) => (event) => {
    event.preventDefault();
    const value = sanitizePhoneDigits(event.clipboardData.getData("text"));
    setForm((prev) => ({
      ...prev,
      [fieldKey]: value,
      countrycode: DEFAULT_COUNTRY_CODE,
      emergencyCountrycode: DEFAULT_COUNTRY_CODE,
    }));
    setErrors((prev) => ({ ...prev, [fieldKey]: "" }));
  };

  const handlePhoneKeyDown = (event) => {
    if (
      !PHONE_ALLOWED_KEYS.includes(event.key) &&
      !/^[0-9]$/.test(event.key) &&
      !(event.ctrlKey || event.metaKey)
    ) {
      event.preventDefault();
    }
  };

  const togglePermission = (permissionId) => {
    const id = String(permissionId);
    setForm((prev) => {
      const exists = prev.permissions.includes(id);
      return {
        ...prev,
        permissions: exists
          ? prev.permissions.filter((item) => item !== id)
          : [...prev.permissions, id],
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
    if (!(await validate()) || submitting) return;

    const selectedRole = roles.find((role) => role.id === String(form.role));
    const selectedPermissions = permissions.filter((item) =>
      form.permissions.includes(item.id)
    );
    const permissionIds = selectedPermissions
      .map((item) => Number(item.id))
      .filter((id) => !Number.isNaN(id));

    const phone = sanitizePhoneDigits(form.phone);
    const emergencyContact = sanitizePhoneDigits(form.emergencyContact);
    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();

    const payload = {
      firstName,
      lastName,
      gender: form.gender,
      email: form.email.trim(),
      phone,
      countrycode: `+${DEFAULT_COUNTRY_CODE}`,
      roleId: Number(selectedRole?.id || form.role),
      emergencyContact,
      emergencyCountrycode: emergencyContact ? `+${DEFAULT_COUNTRY_CODE}` : "",
      employmentStatus: form.employmentStatus,
      salaryType: form.salaryType,
      salary: Number(form.salary),
      joiningDate: form.joiningDate,
      permissions: permissionIds,
    };

    const formForParent = {
      ...form,
      firstName,
      lastName,
      gender: form.gender,
      name: [firstName, lastName].filter(Boolean).join(" "),
      phone: payload.phone,
      countrycode: payload.countrycode,
      emergencyContact: payload.emergencyContact,
      emergencyCountrycode: payload.emergencyCountrycode,
      role: selectedRole?.name || form.role,
      roleId: selectedRole?.id || form.role,
      permissions: selectedPermissions.map((item) => item.name),
      permissionIds,
    };

    try {
      setSubmitting(true);

      if (isEdit) {
        const res = await axiosApiCall.post(API_ROUTER?.UPDATE_EMPLOYEE, {
          ...payload,
          id: employee?.id,
          isAddedFromPayroll: true,
        });
        if (!res?.data?.status) {
          toaster(
            res?.data?.message || res?.message || TOAST_ALERTS.GENERAL_ERROR,
            TOAST_TYPES.ERROR
          );
          return;
        }
        toaster(res?.data?.message || "Employee updated successfully", TOAST_TYPES.SUCCESS);
      } else {
        const res = await axiosApiCall.post(API_ROUTER?.ADD_EMPLOYEE, {
          ...payload,
          isAddedFromPayroll: true,
        });
        if (!res?.data?.status) {
          toaster(
            res?.data?.message || res?.message || TOAST_ALERTS.GENERAL_ERROR,
            TOAST_TYPES.ERROR
          );
          return;
        }
        toaster(res?.data?.message || "Employee added successfully", TOAST_TYPES.SUCCESS);
      }

      onSave?.(formForParent);
      onClose?.();
    } catch {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setSubmitting(false);
    }
  };

  const renderPhoneField = ({
    fieldKey,
    value,
    placeholder,
    ariaLabel,
    error,
    disabled = false,
  }) => (
    <HrField as="div">
      <div className="hr-phone-input has-value">
        <div className="country-code">
          <input
            type="text"
            value={`+${DEFAULT_COUNTRY_CODE}`}
            readOnly
            tabIndex={-1}
            aria-label="Country code"
            disabled={disabled}
          />
        </div>
        <div className="phone-digits">
          <input
            type="tel"
            inputMode="numeric"
            autoComplete="off"
            maxLength={PHONE_DIGIT_LIMIT}
            placeholder={placeholder}
            value={value}
            onChange={handlePhoneDigitsChange(fieldKey)}
            onPaste={handlePhonePaste(fieldKey)}
            onKeyDown={handlePhoneKeyDown}
            aria-label={ariaLabel}
            disabled={disabled || submitting}
            readOnly={disabled}
          />
        </div>
      </div>
      {error && <p className="error">{error}</p>}
    </HrField>
  );

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
                placeholder="First Name"
                value={form.firstName}
                onChange={updateField("firstName")}
                aria-label="First Name"
                maxLength={15}
              />
              {errors.firstName && <p className="error">{errors.firstName}</p>}
            </HrField>
            <HrField>
              <input
                type="text"
                placeholder="Last Name"
                value={form.lastName}
                onChange={updateField("lastName")}
                aria-label="Last Name"
                maxLength={15}
              />
              {errors.lastName && <p className="error">{errors.lastName}</p>}
            </HrField>
          </HrModalRow>

          <HrModalRow $cols="1fr 1fr">
            <HrField>
              <input
                type="string"
                placeholder="Email"
                value={form.email}
                onChange={updateField("email")}
                aria-label="Email"
                disabled={isEdit || submitting}
                readOnly={isEdit}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </HrField>
            <HrField>
              <select
                value={form.gender}
                onChange={updateField("gender")}
                aria-label="Gender"
              >
                {GENDER_OPTIONS.map((option) => (
                  <option key={option.value || "empty"} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="field-icon">
                <InlineSVG src={CHEVRON_ICON} />
              </span>
              {errors.gender && <p className="error">{errors.gender}</p>}
            </HrField>
          </HrModalRow>

          <HrModalRow $cols="1fr 1fr">
            {renderPhoneField({
              fieldKey: "phone",
              value: form.phone,
              placeholder: "Phone Number",
              ariaLabel: "Phone Number",
              error: errors.phone,
              disabled: isEdit,
            })}
            {renderPhoneField({
              fieldKey: "emergencyContact",
              value: form.emergencyContact,
              placeholder: "Emergency Contact",
              ariaLabel: "Emergency Contact",
              error: errors.emergencyContact,
            })}
          </HrModalRow>

          <HrModalRow $cols="1fr 1fr">
            <HrField>
              <select
                value={form.role}
                onChange={updateField("role")}
                aria-label="Role"
                disabled={optionsLoading}
              >
                <option value="">
                  {optionsLoading ? "Loading roles..." : "Role"}
                </option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
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
                  <option key={type.value} value={type.value}>
                    {type.label}
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
                placeholder={
                  form.salaryType === "hourly"
                    ? "Hourly Salary ($)"
                    : form.salaryType === "monthly"
                      ? "Monthly Salary ($)"
                      : "Salary ($)"
                }
                value={form.salary}
                onChange={updateSalary}
                onKeyDown={(event) => {
                  if (event.key === "-" || event.key === "e" || event.key === "E") {
                    event.preventDefault();
                  }
                }}
                aria-label="Salary"
              />
              {errors.salary && <p className="error">{errors.salary}</p>}
            </HrField>
          </HrModalRow>

          <HrModalRow>
            <HrField as="div" $empty={!form.joiningDate}>
              <ReactDatePicker
                selected={
                  form.joiningDate ? moment(form.joiningDate).toDate() : null
                }
                onChange={(date) => {
                  if (isEdit) return;
                  updateValue(
                    "joiningDate",
                    date ? moment(date).format("YYYY-MM-DD") : ""
                  );
                }}
                dateFormat="dd/MM/yyyy"
                placeholderText="Joining Date"
                onKeyDown={(event) => event.preventDefault()}
                shouldCloseOnSelect
                portalId="hr-datepicker-portal"
                popperClassName="hr-datepicker-portal-popper"
                popperProps={{ strategy: "fixed" }}
                disabled={isEdit}
                readOnly={isEdit}
                aria-label="Joining Date"
              />
              <span className="field-icon">
                <InlineSVG src={CALENDAR_ICON} />
              </span>
              {errors.joiningDate && (
                <p className="error">{errors.joiningDate}</p>
              )}
            </HrField>
          </HrModalRow>

          <HrPermissionsBlock>
            <h3 className="permissions-title">Assigned Permissions</h3>
            <HrPermissionsList>
              {optionsLoading ? (
                <p className="permissions-loading">Loading permissions...</p>
              ) : permissions.length === 0 ? (
                <p className="permissions-loading">No permissions available</p>
              ) : (
                permissions.map((permission) => (
                  <HrPermissionChip
                    key={permission.id}
                    type="button"
                    $active={form.permissions.includes(permission.id)}
                    onClick={() => togglePermission(permission.id)}
                  >
                    {permission.name}
                  </HrPermissionChip>
                ))
              )}
            </HrPermissionsList>
          </HrPermissionsBlock>

          <HrModalActions $center={!isEdit}>
            <HrSecondaryButton type="button" onClick={onClose} disabled={submitting}>
              Cancel
            </HrSecondaryButton>
            <HrModalPrimaryButton
              type="submit"
              disabled={optionsLoading || submitting}
            >
              {submitting
                ? isEdit
                  ? "Updating..."
                  : "Adding..."
                : isEdit
                  ? "Update Employee"
                  : "Add Employee"}
            </HrModalPrimaryButton>
          </HrModalActions>
        </HrModalForm>
      </HrModalCard>
    </HrModalOverlay>
  );
}
