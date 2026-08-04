"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import {
  AddCategoryFooter,
  AddCategoryForm,
  CategoryColorsRow,
  CategoryModalHeader,
  CategoryToggle,
  ColorSwatch,
  FormField,
  NonRetailToggleRow,
  PosCategoriesModalGlobalStyles,
} from "@/styles/pages/pos-inventory.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

export const CATEGORY_COLORS = [
  "#2F80ED",
  "#6FCF97",
  "#BB6BD9",
  "#F2C94C",
  "#EB5757",
  "#56CCF2",
];

const DEFAULT_FORM = {
  name: "",
  description: "",
  color: CATEGORY_COLORS[0],
  nonRetail: false,
};

const normalizeCategory = (item = {}, fallback = {}) => ({
  id: item.id ?? item._id ?? item.categoryId ?? item.category_id ?? fallback.id,
  name: item.name ?? item.categoryName ?? item.category_name ?? fallback.name ?? "",
  description: item.description ?? item.desc ?? fallback.description ?? "",
  color: item.color ?? item.colour ?? item.colorCode ?? item.color_code ?? fallback.color ?? CATEGORY_COLORS[0],
  nonRetail: Boolean(
    item.nonRetail ?? item.non_retail ?? item.isNonRetail ?? item.is_non_retail ?? fallback.nonRetail
  ),
});

const AddCategoryModal = ({
  show,
  category = null,
  onHide = () => {},
  onSuccess = () => {},
}) => {
  const isEdit = Boolean(category?.id);
  const [form, setForm] = useState(DEFAULT_FORM);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const { toaster } = useToaster();

  useEffect(() => {
    if (!show) {
      setForm(DEFAULT_FORM);
      setError("");
      setSaving(false);
      return;
    }

    if (category) {
      setForm({
        name: category.name || "",
        description: category.description || "",
        color: category.color || CATEGORY_COLORS[0],
        nonRetail: Boolean(category.nonRetail),
      });
    } else {
      setForm(DEFAULT_FORM);
    }
    setError("");
    setSaving(false);
  }, [show, category]);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === "name") setError("");
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }

    const payload = {
      name: form.name.trim(),
      color: form.color,
      description: form.description.trim(),
    };

    try {
      setSaving(true);

      if (isEdit) {
        const res = await axiosApiCall.post(
          `${API_ROUTER?.POS_CATEGORY_UPDATE}/${category.id}`,
          payload
        );
        if (!res?.data?.status) {
          toast.error(res?.data?.message || TOAST_ALERTS.GENERAL_ERROR);
          return;
        }

        const updated = normalizeCategory(res?.data?.data || {}, {
          id: category.id,
          ...payload,
          nonRetail: form.nonRetail,
        });

        toast.success(res?.data?.message || "Category updated.", { autoClose: 1500 });
        onSuccess(updated);
        onHide();
        return;
      }

      const res = await axiosApiCall.post(API_ROUTER?.POS_CATEGORY_CREATE, payload);
      if (!res?.data?.status) {
       return toaster(res?.message, TOAST_TYPES.ERROR);
      }

      const created = normalizeCategory(res?.data?.data || {}, {
        ...payload,
        nonRetail: form.nonRetail,
      });

      toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
      onSuccess(created);
      onHide();
    } catch (err) {
      return toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PosCategoriesModalGlobalStyles />
      <Modal
        show={show}
        onHide={onHide}
        centered
        className="sitback-modal-wrapper sitback-pos-add-category-modal"
      >
        <CategoryModalHeader>
          <h3>{isEdit ? "Edit Category" : "Add Category"}</h3>
          <button type="button" className="close-btn" onClick={onHide} aria-label="Close">
             <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12.5" cy="12.5" r="12.5" fill="white"/>
              <path d="M16.4025 6.38199C17.0152 5.76924 18.0065 5.76924 18.6193 6.38199C19.2319 6.99475 19.232 7.98608 18.6193 8.59879L14.7159 12.5011L18.6193 16.4054C19.2316 17.0177 19.2316 18.008 18.6193 18.6203C18.3141 18.9273 17.911 19.0802 17.5118 19.0802C17.1106 19.0802 16.7095 18.9274 16.4044 18.6203L12.5011 14.717L8.59777 18.6203C8.29252 18.9276 7.89079 19.0801 7.48937 19.0802C7.08798 19.0802 6.68627 18.9274 6.38097 18.6203C5.7682 18.0075 5.7682 17.0162 6.38097 16.4035L10.2843 12.5002L6.37999 8.59586C5.76799 7.98357 5.76774 6.99315 6.37999 6.38101C6.99443 5.76879 7.98551 5.76887 8.59581 6.38101L12.4991 10.2843L16.4025 6.38199Z" fill="#E32C1F"/>
            </svg>
          </button>
        </CategoryModalHeader>

        <Modal.Body>
          <AddCategoryForm>
            <FormField>
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                maxLength={45}
              />
              {error && <p className="error">{error}</p>}
            </FormField>

            <FormField>
              <textarea
                className="textarea"
                placeholder="Description"
                value={form.description}
                maxLength={100}
                onChange={(e) => updateField("description", e.target.value)}
                rows={6}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                <span style={{ fontSize: "11px", color: form.description.length > 100 ? "#e53e3e" : "#7a869a" }}>
                  {form.description.length}/100
                </span>
              </div>
            </FormField>

            <CategoryColorsRow>
              <span className="colors-label">Colors</span>
              <div className="colors-list">
                {CATEGORY_COLORS.map((color) => (
                  <ColorSwatch
                    key={color}
                    type="button"
                    $color={color}
                    $active={form.color === color}
                    onClick={() => updateField("color", color)}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </CategoryColorsRow>

            <NonRetailToggleRow>
              <div className="toggle-row">
                <CategoryToggle
                  type="button"
                  $on={form.nonRetail}
                  onClick={() => updateField("nonRetail", !form.nonRetail)}
                  aria-pressed={form.nonRetail}
                >
                  <span />
                </CategoryToggle>
                <span className="toggle-label">Non-retail products</span>
              </div>
              <p className="toggle-help">
                Products will not be available during checkout, unless the staff member has the
                &apos;Can sell non-retail products&apos; permission enabled.
              </p>
            </NonRetailToggleRow>

            <AddCategoryFooter>
              <button type="button" className="cancel-btn" onClick={onHide}>
                Cancel
              </button>
              <button
                type="button"
                className="create-btn"
                disabled={saving}
                onClick={handleSubmit}
              >
                {saving ? "Saving..." : isEdit ? "Update" : "Create"}
              </button>
            </AddCategoryFooter>
          </AddCategoryForm>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddCategoryModal;
