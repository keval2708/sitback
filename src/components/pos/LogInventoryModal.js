"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { API_ROUTER } from "@/services/apiRouter";
import {
  AddProductFooter,
  AddProductForm,
  AddProductModalHeader,
  FormField,
  LogInventoryTypeToggle,
  PosInventoryModalGlobalStyles,
} from "@/styles/pages/pos-inventory.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS } from "@/utils/constants";

const DEFAULT_FORM = {
  quantity: "",
  reason: "",
  notes: "",
};

const INCOMING_REASONS = [
  { value: "Purchase Order", label: "Purchase Order" },
  { value: "Return", label: "Return" },
  { value: "Adjustment", label: "Adjustment" },
  { value: "Transfer In", label: "Transfer In" },
];

const OUTGOING_REASONS = [
  { value: "Retail Sale", label: "Retail Sale" },
  { value: "Service Usage", label: "Service Usage" },
  { value: "Damaged", label: "Damaged" },
  { value: "Transfer Out", label: "Transfer Out" },
  { value: "Adjustment", label: "Adjustment" },
];

const LogInventoryModal = ({ show, product, onHide, onSuccess }) => {
  const [type, setType] = useState("in");
  const [form, setForm] = useState(DEFAULT_FORM);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (show) {
      setType("in");
      setForm(DEFAULT_FORM);
      setErrors({});
      setSaving(false);
    }
  }, [show, product?.id]);

  const reasonOptions = type === "in" ? INCOMING_REASONS : OUTGOING_REASONS;

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleTypeChange = (nextType) => {
    setType(nextType);
    setForm((prev) => ({ ...prev, reason: "" }));
    setErrors((prev) => ({ ...prev, reason: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    const qty = Number(form.quantity);

    if (!form.quantity || Number.isNaN(qty) || qty <= 0) {
      nextErrors.quantity = "Enter a valid quantity.";
    }

    if (!form.reason) {
      nextErrors.reason = "Please select a reason.";
    }

    if (type === "out" && product && qty > Number(product.stock || 0)) {
      nextErrors.quantity = "Quantity exceeds current stock.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate() || !product?.id) return;

    setSaving(true);
    try {
      const qty = Number(form.quantity);
      const payload = {
        productId: product.id,
        reason: form.reason,
        quantity: qty,
        inventoryType: type === "in" ? "IN" : "OUT",
        notes: form.notes?.trim() || "",
      };

      const res = await axiosApiCall.post(
        API_ROUTER?.POS_MANAGE_INVENTORY,
        payload
      );

      if (!res?.data?.status) {
        toast.error(res?.data?.message || TOAST_ALERTS.GENERAL_ERROR, {
          autoClose: 2000,
        });
        return;
      }

      const responseData = res?.data?.data || {};
      const signedQty = type === "in" ? qty : -qty;
      const currentStock = Number(product.stock || 0);
      const stockAfter = Number(
        responseData.currentStock ??
          responseData.productCurrentStock ??
          responseData.stockAfter ??
          responseData.stock ??
          currentStock + signedQty
      );

      onSuccess?.({
        productId: product.id,
        productName: product.name,
        type,
        qty: signedQty,
        reason: form.reason,
        stockAfter,
        notes: form.notes?.trim() || "",
      });

      toast.success(
        res?.data?.message ||
          (type === "in" ? "Incoming stock logged." : "Outgoing stock logged."),
        { autoClose: 1500 }
      );
      onHide?.();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || TOAST_ALERTS.GENERAL_ERROR,
        { autoClose: 2000 }
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PosInventoryModalGlobalStyles />
      <Modal
        show={show}
        onHide={onHide}
        centered
        className="sitback-modal-wrapper sitback-pos-add-product-modal"
      >
        <AddProductModalHeader>
          <h3>Log Inventory</h3>
          <button type="button" className="close-btn" onClick={onHide} aria-label="Close">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12.5" cy="12.5" r="12.5" fill="white" />
              <path
                d="M16.4027 6.38199C17.0155 5.76924 18.0067 5.76924 18.6195 6.38199C19.2321 6.99475 19.2322 7.98608 18.6195 8.59879L14.7162 12.5011L18.6195 16.4054C19.2319 17.0177 19.2319 18.008 18.6195 18.6203C18.3144 18.9273 17.9112 19.0802 17.5121 19.0802C17.1109 19.0802 16.7098 18.9274 16.4047 18.6203L12.5013 14.717L8.59801 18.6203C8.29276 18.9276 7.89103 19.0801 7.48961 19.0802C7.08823 19.0802 6.68651 18.9274 6.38121 18.6203C5.76844 18.0075 5.76844 17.0162 6.38121 16.4035L10.2845 12.5002L6.38024 8.59586C5.76824 7.98357 5.76799 6.99315 6.38024 6.38101C6.99467 5.76879 7.98575 5.76887 8.59606 6.38101L12.4994 10.2843L16.4027 6.38199Z"
                fill="#E32C1F"
              />
            </svg>
          </button>
        </AddProductModalHeader>

        <Modal.Body>
          <AddProductForm>
            <LogInventoryTypeToggle>
              <button
                type="button"
                className={type === "in" ? "active" : ""}
                onClick={() => handleTypeChange("in")}
              >
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.5 3.5L3.5 8.5M3.5 8.5H7.5M3.5 8.5V4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Incoming
              </button>
              <button
                type="button"
                className={type === "out" ? "active" : ""}
                onClick={() => handleTypeChange("out")}
              >
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Outgoing
              </button>
            </LogInventoryTypeToggle>

            <FormField>
              <input
                type="number"
                min="1"
                placeholder="Quantity"
                value={form.quantity}
                onChange={(e) => handleChange("quantity", e.target.value)}
              />
              {errors.quantity ? <p className="error">{errors.quantity}</p> : null}
            </FormField>

            <FormField>
              <select
                value={form.reason}
                onChange={(e) => handleChange("reason", e.target.value)}
              >
                <option value="">Reason</option>
                {reasonOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.reason ? <p className="error">{errors.reason}</p> : null}
            </FormField>

            <FormField>
              <textarea
                className="textarea"
                placeholder="Additional Notes..."
                value={form.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
              />
            </FormField>

            <AddProductFooter style={{ justifyContent: "flex-end" }}>
              <button type="button" className="cancel-btn" onClick={onHide} disabled={saving}>
                Cancel
              </button>
              <button
                type="button"
                className="submit-btn"
                onClick={handleSubmit}
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : type === "in"
                    ? "Log Incoming"
                    : "Log Outgoing"}
              </button>
            </AddProductFooter>
          </AddProductForm>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LogInventoryModal;
