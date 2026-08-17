"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
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

const METHOD_OPTIONS = [
  { value: "cash", label: "Cash" },
  { value: "bank", label: "Bank" },
];

const getInitialForm = () => ({
  employeeId: "",
  tipAmount: "",
  tipType: "",
});

const extractRows = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.list)) return payload.list;
  if (Array.isArray(payload?.rows)) return payload.rows;
  if (Array.isArray(payload?.employees)) return payload.employees;
  if (Array.isArray(payload?.therapists)) return payload.therapists;
  return [];
};

const formatCurrency = (value) =>
  `$${Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;

const normalizeTherapistOption = (item = {}) => {
  const id = item.id ?? item._id ?? item.employeeId;
  const name =
    item.name ||
    item.fullName ||
    item.employeeName ||
    [item.firstName, item.lastName].filter(Boolean).join(" ") ||
    "";
  if (id == null || !name) return null;

  return {
    id,
    name,
    availableTips: Number(item.availableTips ?? item.available ?? 0),
  };
};

const NO_TIPS_MESSAGE = "There is no tips to withdraw";

const getWithdrawalSchema = (availableTips) =>
  yup.object({
    employeeId: yup.string().required("Therapist is required"),
    tipAmount: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" || originalValue == null
          ? undefined
          : Number(originalValue)
      )
      .typeError("Amount must be a number")
      .required("Amount is required")
      .moreThan(0, "Amount must be greater than 0")
      .test(
        "has-available-tips",
        NO_TIPS_MESSAGE,
        () => availableTips > 0
      )
      .max(
        availableTips > 0 ? availableTips : Number.MAX_SAFE_INTEGER,
        `Amount cannot exceed available tips (${formatCurrency(availableTips)})`
      ),
    tipType: yup
      .string()
      .required("Withdrawal method is required")
      .oneOf(
        METHOD_OPTIONS.map((option) => option.value),
        "Select a valid withdrawal method"
      ),
  });

export default function RequestWithdrawalModal({ open, onClose, onSave }) {
  const [form, setForm] = useState(getInitialForm);
  const [errors, setErrors] = useState({});
  const [therapists, setTherapists] = useState([]);
  const [therapistsLoading, setTherapistsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toaster } = useToaster();

  const selectedTherapist = useMemo(
    () =>
      therapists.find(
        (therapist) => String(therapist.id) === String(form.employeeId)
      ),
    [form.employeeId, therapists]
  );
  const availableTips = Number(selectedTherapist?.availableTips ?? 0);

  const fetchTherapists = useCallback(async () => {
    try {
      setTherapistsLoading(true);
      const res = await axiosApiCall.get(API_ROUTER?.HR_EMPLOYEE_TIPS_SUMMARY);
      const rowsData = extractRows(res?.data ?? {});
      setTherapists(rowsData.map(normalizeTherapistOption).filter(Boolean));
    } catch {
      setTherapists([]);
    } finally {
      setTherapistsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    setForm(getInitialForm());
    setErrors({});
    setSubmitting(false);
    fetchTherapists();
  }, [fetchTherapists, open]);

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

  const validate = async () => {
    try {
      await getWithdrawalSchema(availableTips).validate(form, {
        abortEarly: false,
      });
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
    if (submitting) return;

    if (form.employeeId && availableTips <= 0) {
      setErrors((prev) => ({
        ...prev,
        tipAmount: NO_TIPS_MESSAGE,
      }));
      // toaster(NO_TIPS_MESSAGE, TOAST_TYPES.ERROR);
      return;
    }

    if (!(await validate())) return;

    const payload = {
      employeeId: Number(form.employeeId),
      tipAmount: Number(form.tipAmount),
      tipType: form.tipType,
      payoutType: "instant",
    };

    try {
      setSubmitting(true);
      const res = await axiosApiCall.post(
        API_ROUTER?.HR_ADD_EMPLOYEE_TIPS,
        payload
      );

      if (!res?.data?.status) {
        const apiMessage =
          res?.data?.message || res?.message || TOAST_ALERTS.GENERAL_ERROR;
        const isNoTipsError =
          availableTips <= 0 ||
          /no.*(tip|available)|insufficient|not enough/i.test(
            String(apiMessage)
          );
        toaster(
          isNoTipsError ? NO_TIPS_MESSAGE : apiMessage,
          TOAST_TYPES.ERROR
        );
        return;
      }

      toaster(
        res?.data?.message || "Withdrawal requested successfully",
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
      aria-labelledby="request-withdrawal-title"
      onClick={submitting ? undefined : onClose}
    >
      <HrModalCard onClick={(event) => event.stopPropagation()}>
        <HrModalHeader>
          <h2 id="request-withdrawal-title">Request Withdrawal</h2>
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
                disabled={therapistsLoading || submitting}
              >
                <option value="">
                  {therapistsLoading
                    ? "Loading therapists..."
                    : "Select Therapist"}
                </option>
                {therapists.map((therapist) => (
                  <option key={therapist.id} value={therapist.id}>
                    {therapist.name}
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
              {selectedTherapist ? (
                <p className="hint" style={{ margin: "6px 0 0", color: "#8391A1", fontSize: 12 }}>
                  Available: {formatCurrency(availableTips)}
                </p>
              ) : null}
              {errors.tipAmount && <p className="error">{errors.tipAmount}</p>}
            </HrField>
            <HrField>
              <select
                value={form.tipType}
                onChange={updateField("tipType")}
                aria-label="Withdrawal Method"
                disabled={submitting}
              >
                <option value="">Withdrawal Method</option>
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
