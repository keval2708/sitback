"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";
import { CATEGORY_COLORS } from "@/components/pos/AddCategoryModal";
import { API_ROUTER } from "@/services/apiRouter";
import {
  AddCategoryBtn,
  AddCategoryFooter,
  AddCategoryForm,
  CategoryColorsRow,
  CategoryList,
  CategoryListItem,
  CategoryListItemSkeleton,
  CategoryModalHeader,
  CategoryToggle,
  ColorSwatch,
  FormField,
  NonRetailToggleRow,
  PosCategoriesModalGlobalStyles,
} from "@/styles/pages/pos-inventory.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS } from "@/utils/constants";

const DEFAULT_FORM = {
  name: "",
  description: "",
  color: CATEGORY_COLORS[0],
  nonRetail: false,
};

const CATEGORY_SKELETON_ROWS = 5;

const CategorySkeletonList = () => (
  <>
    {Array.from({ length: CATEGORY_SKELETON_ROWS }).map((_, index) => (
      <CategoryListItemSkeleton key={`category-skeleton-${index}`}>
        <Skeleton circle width={12} height={12} baseColor="#e8eef5" highlightColor="#f7fafc" />
        <div className="skeleton-info">
          <Skeleton width="42%" height={14} borderRadius={4} baseColor="#e8eef5" highlightColor="#f7fafc" />
          <Skeleton width="68%" height={12} borderRadius={4} baseColor="#e8eef5" highlightColor="#f7fafc" />
        </div>
        <div className="skeleton-actions">
          <Skeleton width={28} height={28} borderRadius={6} baseColor="#e8eef5" highlightColor="#f7fafc" />
          <Skeleton width={28} height={28} borderRadius={6} baseColor="#e8eef5" highlightColor="#f7fafc" />
        </div>
      </CategoryListItemSkeleton>
    ))}
  </>
);

const normalizeCategory = (item = {}) => ({
  id: item.id ?? item._id ?? item.categoryId ?? item.category_id,
  name: item.name ?? item.categoryName ?? item.category_name ?? "",
  description: item.description ?? item.desc ?? "",
  color: item.color ?? item.colour ?? item.colorCode ?? item.color_code ?? CATEGORY_COLORS[0],
  nonRetail: Boolean(
    item.nonRetail ?? item.non_retail ?? item.isNonRetail ?? item.is_non_retail
  ),
  raw: item,
});

const ManageCategoriesModal = ({
  show,
  categories: categoriesProp = [],
  refreshKey = 0,
  onHide = () => {},
  onAddCategory = () => {},
  onUpdateCategory = () => {},
  onDeleteCategory = () => {},
  onCategoriesLoaded = () => {},
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form, setForm] = useState(DEFAULT_FORM);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const onCategoriesLoadedRef = useRef(onCategoriesLoaded);

  useEffect(() => {
    onCategoriesLoadedRef.current = onCategoriesLoaded;
  }, [onCategoriesLoaded]);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosApiCall.get(API_ROUTER?.POS_CATEGORY_LIST);
      if (!res?.data?.status) {
        toast.error(res?.data?.message || TOAST_ALERTS.GENERAL_ERROR, {
          autoClose: 2000,
        });
        setCategories([]);
        onCategoriesLoadedRef.current([]);
        return;
      }

      const payload = res?.data?.data;
      const rows = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.list)
          ? payload.list
          : Array.isArray(payload?.categories)
            ? payload.categories
            : [];

      const list = rows.map(normalizeCategory).filter((item) => item.id != null);
      setCategories(list);
      onCategoriesLoadedRef.current(list);
    } catch (err) {
      console.error("Error fetching category list", err);
      toast.error(TOAST_ALERTS.GENERAL_ERROR, { autoClose: 2000 });
      setCategories([]);
      onCategoriesLoadedRef.current([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!show) {
      setEditingCategory(null);
      setForm(DEFAULT_FORM);
      setError("");
      setSaving(false);
      setLoading(false);
      return;
    }

    fetchCategories();
  }, [show, refreshKey, fetchCategories]);

  useEffect(() => {
    if (!show) return;
    setCategories(Array.isArray(categoriesProp) ? categoriesProp : []);
  }, [categoriesProp, show]);

  useEffect(() => {
    if (!editingCategory) {
      setForm(DEFAULT_FORM);
      setError("");
      return;
    }

    setForm({
      name: editingCategory.name || "",
      description: editingCategory.description || "",
      color: editingCategory.color || CATEGORY_COLORS[0],
      nonRetail: Boolean(editingCategory.nonRetail),
    });
    setError("");
  }, [editingCategory]);

  const handleClose = () => {
    setEditingCategory(null);
    setForm(DEFAULT_FORM);
    setError("");
    onHide();
  };

  const handleStartEdit = (category) => {
    setEditingCategory(category);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setForm(DEFAULT_FORM);
    setError("");
  };

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === "name") setError("");
  };

  const handleUpdate = async () => {
    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }

    if (!editingCategory?.id) {
      toast.error(TOAST_ALERTS.GENERAL_ERROR, { autoClose: 2000 });
      return;
    }

    const payload = {
      name: form.name.trim(),
      color: form.color,
      description: form.description.trim(),
    };

    try {
      setSaving(true);
      const res = await axiosApiCall.post(
        `${API_ROUTER?.POS_CATEGORY_UPDATE}/${editingCategory.id}`,
        payload
      );

      if (!res?.data?.status) {
        toast.error(res?.data?.message || TOAST_ALERTS.GENERAL_ERROR, {
          autoClose: 2000,
        });
        return;
      }

      const updated = {
        ...editingCategory,
        ...payload,
        nonRetail: form.nonRetail,
        ...(res?.data?.data || {}),
        id: editingCategory.id,
      };

      onUpdateCategory(updated);
      toast.success(res?.data?.message || "Category updated.", { autoClose: 1500 });
      setEditingCategory(null);
      setForm(DEFAULT_FORM);
    } catch (err) {
      console.error("Error updating category", err);
      toast.error(TOAST_ALERTS.GENERAL_ERROR, { autoClose: 2000 });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PosCategoriesModalGlobalStyles />
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="sitback-modal-wrapper sitback-pos-manage-categories-modal"
      >
        <CategoryModalHeader>
          <h3>Manage Categories</h3>
          <button type="button" className="close-btn" onClick={handleClose} aria-label="Close">
           <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12.5" cy="12.5" r="12.5" fill="white"/>
            <path d="M16.4025 6.38199C17.0152 5.76924 18.0065 5.76924 18.6193 6.38199C19.2319 6.99475 19.232 7.98608 18.6193 8.59879L14.7159 12.5011L18.6193 16.4054C19.2316 17.0177 19.2316 18.008 18.6193 18.6203C18.3141 18.9273 17.911 19.0802 17.5118 19.0802C17.1106 19.0802 16.7095 18.9274 16.4044 18.6203L12.5011 14.717L8.59777 18.6203C8.29252 18.9276 7.89079 19.0801 7.48937 19.0802C7.08798 19.0802 6.68627 18.9274 6.38097 18.6203C5.7682 18.0075 5.7682 17.0162 6.38097 16.4035L10.2843 12.5002L6.37999 8.59586C5.76799 7.98357 5.76774 6.99315 6.37999 6.38101C6.99443 5.76879 7.98551 5.76887 8.59581 6.38101L12.4991 10.2843L16.4025 6.38199Z" fill="#E32C1F"/>
            </svg>

          </button>
        </CategoryModalHeader>

        <Modal.Body>
          <CategoryList $compact={Boolean(editingCategory)}>
            {loading ? (
              <CategorySkeletonList />
            ) : categories.length === 0 ? (
              <p style={{ textAlign: "center", color: "#8fa0b8", margin: "24px 0" }}>
                No categories found.
              </p>
            ) : (
              categories.map((category) => (
                <CategoryListItem
                  key={category.id}
                  $color={category.color}
                  $active={editingCategory?.id === category.id}
                >
                  <span className="color-dot" />
                  <div className="category-info">
                    <span className="category-name">{category.name}</span>
                    <span className="category-desc">{category.description}</span>
                  </div>
                  <div className="category-actions">
                    <button
                      type="button"
                      className="category-action-btn"
                      aria-label="Edit category"
                      title="Edit"
                      onClick={() => handleStartEdit(category)}
                    >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 2.5H4.16667C3.72464 2.5 3.30072 2.67559 2.98816 2.98816C2.67559 3.30072 2.5 3.72464 2.5 4.16667V15.8333C2.5 16.2754 2.67559 16.6993 2.98816 17.0118C3.30072 17.3244 3.72464 17.5 4.16667 17.5H15.8333C16.2754 17.5 16.6993 17.3244 17.0118 17.0118C17.3244 16.6993 17.5 16.2754 17.5 15.8333V10" stroke="#295086" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15.3127 2.18769C15.6443 1.85617 16.0939 1.66992 16.5627 1.66992C17.0316 1.66992 17.4812 1.85617 17.8127 2.18769C18.1443 2.51921 18.3305 2.96885 18.3305 3.43769C18.3305 3.90653 18.1443 4.35617 17.8127 4.68769L10.3019 12.1994C10.104 12.3971 9.85958 12.5418 9.59107 12.6202L7.19691 13.3202C7.1252 13.3411 7.04919 13.3424 6.97683 13.3238C6.90447 13.3053 6.83843 13.2676 6.78561 13.2148C6.7328 13.162 6.69515 13.096 6.67661 13.0236C6.65807 12.9512 6.65933 12.8752 6.68024 12.8035L7.38024 10.4094C7.45901 10.1411 7.60402 9.8969 7.80191 9.69936L15.3127 2.18769Z" stroke="#295086" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>

                    </button>
                    <button
                      type="button"
                      className="category-action-btn"
                      aria-label="Delete category"
                      title="Delete"
                      onClick={() => onDeleteCategory(category)}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.8335 17.5C5.37517 17.5 4.98294 17.3369 4.65683 17.0108C4.33072 16.6847 4.16739 16.2922 4.16683 15.8333V5C3.93072 5 3.73294 4.92 3.5735 4.76C3.41405 4.6 3.33405 4.40222 3.3335 4.16667C3.33294 3.93111 3.41294 3.73333 3.5735 3.57333C3.73405 3.41333 3.93183 3.33333 4.16683 3.33333H7.50017C7.50017 3.09722 7.58017 2.89944 7.74017 2.74C7.90017 2.58056 8.09794 2.50056 8.3335 2.5H11.6668C11.9029 2.5 12.101 2.58 12.261 2.74C12.421 2.9 12.5007 3.09778 12.5002 3.33333H15.8335C16.0696 3.33333 16.2677 3.41333 16.4277 3.57333C16.5877 3.73333 16.6674 3.93111 16.6668 4.16667C16.6663 4.40222 16.5863 4.60028 16.4268 4.76083C16.2674 4.92139 16.0696 5.00111 15.8335 5V15.8333C15.8335 16.2917 15.6704 16.6842 15.3443 17.0108C15.0182 17.3375 14.6257 17.5006 14.1668 17.5H5.8335ZM14.1668 5H5.8335V15.8333H14.1668V5ZM8.92767 13.9275C9.08711 13.7675 9.16683 13.5694 9.16683 13.3333V7.5C9.16683 7.26389 9.08683 7.06611 8.92683 6.90667C8.76683 6.74722 8.56905 6.66722 8.3335 6.66667C8.09794 6.66611 7.90017 6.74611 7.74017 6.90667C7.58017 7.06722 7.50017 7.265 7.50017 7.5V13.3333C7.50017 13.5694 7.58017 13.7675 7.74017 13.9275C7.90017 14.0875 8.09794 14.1672 8.3335 14.1667C8.56905 14.1661 8.76711 14.0869 8.92767 13.9275ZM12.261 13.9267C12.4204 13.7678 12.5002 13.57 12.5002 13.3333V7.5C12.5002 7.26389 12.4202 7.06611 12.2602 6.90667C12.1002 6.74722 11.9024 6.66722 11.6668 6.66667C11.4313 6.66611 11.2335 6.74611 11.0735 6.90667C10.9135 7.06722 10.8335 7.265 10.8335 7.5V13.3333C10.8335 13.5694 10.9135 13.7675 11.0735 13.9275C11.2335 14.0875 11.4313 14.1672 11.6668 14.1667C11.9024 14.1661 12.1004 14.0861 12.261 13.9267Z" fill="#295086"/>
                        </svg>

                    </button>
                  </div>
                </CategoryListItem>
              ))
            )}
          </CategoryList>

          {editingCategory ? (
            <AddCategoryForm className="inline-edit-form">
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
                <button type="button" className="cancel-btn" onClick={handleCancelEdit}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="create-btn"
                  disabled={saving}
                  onClick={handleUpdate}
                >
                  {saving ? "Saving..." : "Update"}
                </button>
              </AddCategoryFooter>
            </AddCategoryForm>
          ) : (
            <AddCategoryBtn type="button" onClick={onAddCategory} disabled={loading}>
              + Add Category
            </AddCategoryBtn>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ManageCategoriesModal;
