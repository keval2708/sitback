"use client";

import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactDatePicker from "react-datepicker";
import ReactSelect from "react-select";
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
const METHOD_OPTIONS = [
  { value: "cash", label: "Cash" },
  { value: "bank", label: "Bank" },
];

const CUSTOMER_SELECT_STYLES = {
  control: (base, state) => ({
    ...base,
    minHeight: 48,
    height: 48,
    borderRadius: 100,
    borderColor: state.isFocused ? "#295086" : "#d7e2ef",
    boxShadow: "none",
    "&:hover": {
      borderColor: state.isFocused ? "#295086" : "#d7e2ef",
    },
    paddingLeft: 4,
    paddingRight: 36,
  }),
  valueContainer: (base) => ({
    ...base,
    height: 46,
    padding: "0 14px",
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  }),
  placeholder: (base) => ({
    ...base,
    margin: 0,
    position: "absolute",
    left: 14,
    top: "50%",
    transform: "translateY(-50%)",
    color: "#295086",
    fontWeight: 500,
    fontSize: 14,
  }),
  singleValue: (base) => ({
    ...base,
    margin: 0,
    color: "#295086",
    fontWeight: 500,
    fontSize: 14,
  }),
  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
    color: "#295086",
    fontWeight: 500,
    fontSize: 14,
  }),
  indicatorsContainer: (base) => ({
    ...base,
    height: 46,
  }),
  clearIndicator: (base) => ({
    ...base,
    padding: 6,
    marginRight: 18,
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: () => ({
    display: "none",
  }),
  loadingIndicator: (base) => ({
    ...base,
    padding: 6,
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 12,
    overflow: "hidden",
    zIndex: 20,
  }),
  menuList: (base) => ({
    ...base,
    maxHeight: 200,
    paddingTop: 4,
    paddingBottom: 4,
  }),
  option: (base, state) => ({
    ...base,
    fontSize: 14,
    fontWeight: 500,
    backgroundColor: state.isSelected
      ? "#295086"
      : state.isFocused
        ? "#DFECF9"
        : "#fff",
    color: state.isSelected ? "#fff" : "#295086",
  }),
};

const getInitialForm = () => ({
  employeeId: "",
  tipAmount: "",
  tipType: "",
  paidAt: "",
  customerId: "",
});

const extractRows = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.list)) return payload.list;
  if (Array.isArray(payload?.rows)) return payload.rows;
  if (Array.isArray(payload?.employees)) return payload.employees;
  if (Array.isArray(payload?.users)) return payload.users;
  if (Array.isArray(payload?.clients)) return payload.clients;
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

const normalizeCustomerOption = (item = {}) => {
  const id = item.userId ?? item.id ?? item._id ?? item.customerId;
  const name =
    item.username ||
    item.name ||
    item.fullName ||
    [item.firstName, item.lastName].filter(Boolean).join(" ") ||
    "";
  if (id == null || !name) return null;

  const phone = item.phone || item.phoneNumber || "";
  const label = phone ? `${name} (${phone})` : name;

  return {
    value: String(id),
    label,
    name,
    phone,
    email: item.email || "",
  };
};

const tipValidationSchema = yup.object({
  employeeId: yup.string().required("Therapist is required"),
  tipAmount: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" || originalValue == null ? undefined : Number(originalValue)
    )
    .typeError("Amount must be a number")
    .required("Amount is required")
    .moreThan(0, "Amount must be greater than 0"),
  tipType: yup
    .string()
    .required("Payment method is required")
    .oneOf(
      METHOD_OPTIONS.map((option) => option.value),
      "Select a valid payment method"
    ),
  paidAt: yup
    .string()
    .required("Tip date is required")
    .test("valid-date", "Enter a valid tip date", (value) =>
      value ? moment(value, DATE_FORMAT, true).isValid() : false
    ),
  customerId: yup.string().required("Customer is required"),
});

export default function RecordTipModal({ open, onClose, onSave }) {
  const [form, setForm] = useState(getInitialForm);
  const [errors, setErrors] = useState({});
  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [employeesLoading, setEmployeesLoading] = useState(false);
  const [customersLoading, setCustomersLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toaster } = useToaster();

  const customerOptions = useMemo(
    () => customers.map(normalizeCustomerOption).filter(Boolean),
    [customers]
  );

  const selectedCustomer = useMemo(
    () =>
      customerOptions.find(
        (option) => String(option.value) === String(form.customerId)
      ) || null,
    [customerOptions, form.customerId]
  );

  const fetchEmployees = useCallback(async () => {
    try {
      setEmployeesLoading(true);
      const res = await axiosApiCall.get(API_ROUTER?.HR_EMPLOYEE_NAME_LIST);
      const rowsData = extractRows(res?.data?.data ?? res?.data);
      setEmployees(rowsData.map(normalizeEmployeeOption).filter(Boolean));
    } catch {
      setEmployees([]);
    } finally {
      setEmployeesLoading(false);
    }
  }, []);

  const fetchCustomers = useCallback(async () => {
    try {
      setCustomersLoading(true);
      const res = await axiosApiCall.get(API_ROUTER?.POST_ADD_CLIENT);
      const rowsData = extractRows(res?.data?.data ?? res?.data);
      setCustomers(rowsData);
    } catch {
      setCustomers([]);
    } finally {
      setCustomersLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    setForm(getInitialForm());
    setErrors({});
    setSubmitting(false);
    fetchEmployees();
    fetchCustomers();
  }, [open, fetchEmployees, fetchCustomers]);

  if (!open) return null;

  const updateField = (key) => (event) => {
    let value = event.target.value;
    if (key === "tipAmount") {
      if (value === "") {
        setForm((prev) => ({ ...prev, tipAmount: "" }));
        setErrors((prev) => ({ ...prev, tipAmount: "" }));
        return;
      }
      if (Number(value) < 0 || String(value).includes("-")) return;
    }
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const updateValue = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = async () => {
    try {
      await tipValidationSchema.validate(form, { abortEarly: false });
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
      tipAmount: Number(form.tipAmount),
      tipType: form.tipType,
      paidAt: form.paidAt,
      customerId: Number(form.customerId),
      customerName: selectedCustomer?.name || selectedCustomer?.label || "",
    };

    try {
      setSubmitting(true);
      const res = await axiosApiCall.post(
        API_ROUTER?.HR_ADD_EMPLOYEE_TIPS,
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
        res?.data?.message || "Tip recorded successfully",
        TOAST_TYPES.SUCCESS
      );
      onSave?.({
        ...payload,
        therapistId: payload.employeeId,
        amount: payload.tipAmount,
        method: form.tipType,
        tipDate: payload.paidAt,
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
      aria-labelledby="record-tip-title"
      onClick={submitting ? undefined : onClose}
    >
      <HrModalCard onClick={(event) => event.stopPropagation()}>
        <HrModalHeader>
          <h2 id="record-tip-title">Record Tip</h2>
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
                aria-label="Select Therapist"
                disabled={employeesLoading || submitting}
              >
                <option value="">
                  {employeesLoading
                    ? "Loading therapists..."
                    : "Select Therapist"}
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
            <HrField as="div">
              <ReactSelect
                classNamePrefix="hr-customer-select"
                placeholder={
                  customersLoading ? "Loading customers..." : "Select Customer"
                }
                options={customerOptions}
                value={selectedCustomer}
                onChange={(option) => {
                  updateValue(
                    "customerId",
                    option?.value ? String(option.value) : ""
                  );
                }}
                isClearable
                isSearchable
                isLoading={customersLoading}
                isDisabled={customersLoading || submitting}
                styles={CUSTOMER_SELECT_STYLES}
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }}
                filterOption={(option, inputValue) => {
                  const query = String(inputValue || "").trim().toLowerCase();
                  if (!query) return true;
                  const label = String(option?.label || "").toLowerCase();
                  const name = String(option?.data?.name || "").toLowerCase();
                  const phone = String(option?.data?.phone || "").toLowerCase();
                  const email = String(option?.data?.email || "").toLowerCase();
                  return (
                    label.includes(query) ||
                    name.includes(query) ||
                    phone.includes(query) ||
                    email.includes(query)
                  );
                }}
                noOptionsMessage={() =>
                  customersLoading ? "Loading..." : "No customers found"
                }
                aria-label="Select Customer"
              />
              <span className="field-icon">
                <InlineSVG src={CHEVRON_ICON} />
              </span>
              {errors.customerId && (
                <p className="error">{errors.customerId}</p>
              )}
            </HrField>
          </HrModalRow>

          <HrModalRow $cols="1fr 1fr">
            <HrField>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Amount ($)"
                value={form.tipAmount}
                onChange={updateField("tipAmount")}
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
                aria-label="Amount"
                disabled={submitting}
              />
              {errors.tipAmount && <p className="error">{errors.tipAmount}</p>}
            </HrField>
            <HrField>
              <select
                value={form.tipType}
                onChange={updateField("tipType")}
                aria-label="Payment Method"
                disabled={submitting}
              >
                <option value="">Payment Method</option>
                {METHOD_OPTIONS.map((method) => (
                  <option key={method.value} value={method.value}>
                    {method.label}
                  </option>
                ))}
              </select>
              <span className="field-icon">
                <InlineSVG src={CHEVRON_ICON} />
              </span>
              {errors.tipType && <p className="error">{errors.tipType}</p>}
            </HrField>
          </HrModalRow>

          <HrModalRow>
            <HrField $empty={!form.paidAt}>
              <ReactDatePicker
                selected={form.paidAt ? moment(form.paidAt).toDate() : null}
                onChange={(date) => {
                  updateValue(
                    "paidAt",
                    date ? moment(date).format(DATE_FORMAT) : ""
                  );
                }}
                dateFormat="dd/MM/yyyy"
                placeholderText="Tip Date"
                onKeyDown={(event) => event.preventDefault()}
                aria-label="Tip Date"
                portalId="hr-datepicker-portal"
                popperClassName="hr-datepicker-portal-popper"
                popperProps={{ strategy: "fixed" }}
                disabled={submitting}
              />
              <span className="field-icon">
                <InlineSVG src={CALENDAR_ICON} />
              </span>
              {errors.paidAt && <p className="error">{errors.paidAt}</p>}
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
              {submitting ? "Saving..." : "Request"}
            </HrModalPrimaryButton>
          </HrModalActions>
        </HrModalForm>
      </HrModalCard>
    </HrModalOverlay>
  );
}
