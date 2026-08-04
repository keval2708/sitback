"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import {
  AddProductFooter,
  AddProductForm,
  AddProductModalHeader,
  FormField,
  FormRow,
  ImageUploadBox,
  PosInventoryModalGlobalStyles,
} from "@/styles/pages/pos-inventory.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const DEFAULT_FORM = {
  name: "",
  brand: "",
  category: "",
  description: "",
  retailPrice: "",
  costPrice: "",
  quantity: "",
  lowStockAt: "",
  unit: "",
  image: null,
};

const UNIT_OPTIONS = [
  { value: "pcs", label: "pcs" },
  { value: "ml", label: "ml" },
  { value: "oz", label: "oz" },
  { value: "box", label: "box" },
  { value: "bottle", label: "bottle" },
];

const normalizeCategory = (item = {}) => ({
  id: item.id ?? item._id ?? item.categoryId ?? item.category_id,
  name: item.name ?? item.categoryName ?? item.category_name ?? "",
  description: item.description ?? item.desc ?? "",
  color: item.color ?? item.colour ?? item.colorCode ?? item.color_code ?? "",
});

const resolveName = (...values) => {
  for (const value of values) {
    if (value == null || value === "") continue;
    if (typeof value === "string" || typeof value === "number") return String(value);
    if (typeof value === "object") {
      const name = value.name ?? value.categoryName ?? value.brandName ?? value.label;
      if (name != null && name !== "") return String(name);
    }
  }
  return "";
};

const resolveCategoryValue = (product, categoryOptions = []) => {
  if (!product) return "";

  const candidates = [
    product.categoryId,
    product.category_id,
    product.categoryValue,
    product.categoryIds?.[0],
    typeof product.category === "object" ? product.category?.id : product.category,
  ]
    .filter((value) => value !== undefined && value !== null && value !== "")
    .map(String);

  const byId = categoryOptions.find((c) => candidates.includes(String(c.id)));
  if (byId) return String(byId.id);

  const categoryName = resolveName(product.category, product.categories?.[0]);
  const brandName = resolveName(product.brand);
  const byName = categoryOptions.find(
    (c) =>
      c.name.toLowerCase() === categoryName.toLowerCase() ||
      c.name.toLowerCase() === brandName.toLowerCase()
  );
  return byName ? String(byName.id) : "";
};

const mapProductToForm = (product, categoryOptions = []) => {
  if (!product) return DEFAULT_FORM;
  return {
    name: product.name || "",
    brand: resolveName(product.brand),
    category: resolveCategoryValue(product, categoryOptions),
    description: product.description || "",
    retailPrice:
      product.retailPrice !== undefined && product.retailPrice !== null
        ? String(product.retailPrice)
        : product.price !== undefined && product.price !== null
          ? String(product.price)
          : "",
    costPrice:
      product.costPrice !== undefined && product.costPrice !== null
        ? String(product.costPrice)
        : "",
    quantity:
      product.quantity !== undefined && product.quantity !== null
        ? String(product.quantity)
        : product.stock !== undefined && product.stock !== null
          ? String(product.stock)
          : "",
    lowStockAt:
      product.lowStockAt !== undefined && product.lowStockAt !== null
        ? String(product.lowStockAt)
        : "",
    unit: product.unit || "",
    image: null,
  };
};

const normalizeCreatedProduct = (item = {}, fallback = {}) => ({
  id: item.id ?? item.productId ?? item.product_id ?? fallback.id,
  name: item.name ?? item.productName ?? item.product_name ?? fallback.name ?? "",
  brand: resolveName(item.brand, item.brandName, item.brand_name, fallback.brand),
  brandId: item.brandId ?? item.brand_id ?? item.brand?.id ?? fallback.brandId ?? null,
  category: resolveName(
    item.categories?.[0],
    item.categoryName,
    item.category_name,
    item.category,
    fallback.category
  ),
  categoryId:
    item.categoryId ??
    item.category_id ??
    item.categoryIds?.[0] ??
    item.categories?.[0]?.id ??
    fallback.categoryId ??
    null,
  categoryValue: String(
    item.categoryId ?? item.category_id ?? fallback.categoryValue ?? fallback.categoryId ?? ""
  ),
  description: item.description ?? item.desc ?? fallback.description ?? "",
  price: Number(item.price ?? item.retailPrice ?? item.retail_price ?? fallback.price ?? 0),
  retailPrice: Number(
    item.retailPrice ?? item.retail_price ?? item.price ?? fallback.retailPrice ?? fallback.price ?? 0
  ),
  costPrice: Number(item.costPrice ?? item.cost_price ?? fallback.costPrice ?? 0),
  stock: Number(
    item.remainstock ??
      item.remainStock ??
      item.stock ??
      item.quantity ??
      item.qty ??
      fallback.stock ??
      fallback.remainStock ??
      0
  ),
  remainStock: Number(
    item.remainstock ??
      item.remainStock ??
      item.stock ??
      item.quantity ??
      item.qty ??
      fallback.remainStock ??
      fallback.stock ??
      0
  ),
  quantity: Number(item.quantity ?? item.stock ?? item.qty ?? fallback.quantity ?? fallback.stock ?? 0),
  lowStockAt: Number(item.lowStockAt ?? item.low_stock_at ?? item.low_stock ?? fallback.lowStockAt ?? 5),
  status: item.status ?? item.stockStatus ?? fallback.status ?? "",
  unit: item.unit ?? item.unitName ?? fallback.unit ?? "pcs",
  image: item.image ?? item.imageUrl ?? item.productImage ?? fallback.image ?? "/images/productimg.svg",
});

const productValidationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .max(40, "Name must be at most 40 characters"),
  brand: yup
    .string()
    .trim()
    .required("Brand is required")
    .max(15, "Brand must be at most 15 characters"),
  description: yup
    .string()
    .trim()
    .max(100, "Description must be at most 100 characters"),
  category: yup
    .string()
    .test("category-available", function (value) {
      if (this.options.context?.hasCategories === false) {
        return this.createError({
          message: "No categories found. Please add a category first.",
        });
      }
      if (!value) {
        return this.createError({ message: "Category is required" });
      }
      return true;
    }),
  retailPrice: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" || originalValue == null ? undefined : value
    )
    .typeError("Retail price must be a number")
    .required("Retail price is required")
    .min(0, "Retail price must be a positive number"),
  costPrice: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" || originalValue == null ? undefined : value
    )
    .nullable()
    .typeError("Cost price must be a number")
    .min(0, "Cost price must be a positive number"),
  quantity: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" || originalValue == null ? undefined : value
    )
    .typeError("Quantity must be a whole number")
    .required("Quantity is required")
    .integer("Quantity must be a whole number")
    .min(0, "Quantity must be a positive number"),
  lowStockAt: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" || originalValue == null ? undefined : value
    )
    .typeError("Low stock at must be a whole number")
    .required("Low stock at is required")
    .integer("Low stock at must be a whole number")
    .min(0, "Low stock at must be a positive number")
    .test(
      "low-stock-vs-quantity",
      "Low stock at cannot be greater than quantity",
      function (value) {
        const quantity = Number(this.parent.quantity || 0);
        return value <= quantity;
      }
    ),
});

const AddProductModal = ({
  show,
  onHide = () => {},
  onSuccess = () => {},
  onCategoriesLoaded = () => {},
  product = null,
  categories: categoriesProp = [],
}) => {
  const isEdit = Boolean(product?.id);
  const fileInputRef = useRef(null);
  const onCategoriesLoadedRef = useRef(onCategoriesLoaded);
  const [form, setForm] = useState(DEFAULT_FORM);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const { toaster } = useToaster();

  useEffect(() => {
    onCategoriesLoadedRef.current = onCategoriesLoaded;
  }, [onCategoriesLoaded]);

  const fetchCategories = useCallback(async () => {
    try {
      setLoadingCategories(true);
      const res = await axiosApiCall.get(API_ROUTER?.POS_CATEGORY_LIST);
      if (!res?.data?.status) {
        toast.error(res?.data?.message || TOAST_ALERTS.GENERAL_ERROR, {
          autoClose: 2000,
        });
        setCategoryOptions([]);
        onCategoriesLoadedRef.current([]);
        return [];
      }

      const payload = res?.data?.data;
      const rows = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.list)
          ? payload.list
          : Array.isArray(payload?.categories)
            ? payload.categories
            : [];

      const list = rows.map(normalizeCategory).filter((item) => item.id != null && item.name);
      setCategoryOptions(list);
      onCategoriesLoadedRef.current(list);
      return list;
    } catch (err) {
      toast.error(TOAST_ALERTS.GENERAL_ERROR, { autoClose: 2000 });
      setCategoryOptions([]);
      onCategoriesLoadedRef.current([]);
      return [];
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  useEffect(() => {
    if (!show) {
      setForm(DEFAULT_FORM);
      setPreview(null);
      setErrors({});
      setSaving(false);
      setLoadingCategories(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    let cancelled = false;

    const init = async () => {
      if (Array.isArray(categoriesProp) && categoriesProp.length > 0) {
        setCategoryOptions(categoriesProp);
      }

      const list = await fetchCategories();
      if (cancelled) return;

      const options = list.length > 0 ? list : categoriesProp;
      if (product) {
        setForm(mapProductToForm(product, options));
        setPreview(product.image || null);
      } else {
        setForm(DEFAULT_FORM);
        setPreview(null);
      }
      setErrors({});
      setSaving(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    };

    init();

    return () => {
      cancelled = true;
    };
    // categoriesProp is only used as an initial seed when opening; fetch owns the source of truth
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, product, fetchCategories]);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const updatePositiveNumberField = (key, value) => {
    if (value === "") {
      updateField(key, "");
      return;
    }

    // Allow only digits and a single decimal point (no negatives)
    if (!/^\d*\.?\d*$/.test(value)) return;

    updateField(key, value);
  };

  const updatePositiveIntegerField = (key, value) => {
    if (value === "") {
      updateField(key, "");
      return;
    }

    // Whole numbers only
    if (!/^\d+$/.test(value)) return;

    updateField(key, value);
  };

  const blockInvalidNumberKeys = (event) => {
    if (["e", "E", "+", "-"].includes(event.key)) {
      event.preventDefault();
    }
  };

  const blockInvalidIntegerKeys = (event) => {
    if (["e", "E", "+", "-", ".", ","].includes(event.key)) {
      event.preventDefault();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    updateField("image", file);
    setPreview(URL.createObjectURL(file));
  };

  const hasCategories = categoryOptions.length > 0;
  const isCategoryDisabled = loadingCategories || !hasCategories;

  const validate = async () => {
    try {
      await productValidationSchema.validate(form, {
        abortEarly: false,
        context: { hasCategories },
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

  const handleSubmit = async () => {
    if (!(await validate())) return;

    try {
      setSaving(true);
      const selectedCategory = categoryOptions.find(
        (c) => String(c.id) === String(form.category)
      );
      const formData = new FormData();
      formData.append("name", form.name.trim());
      formData.append("categoryIds", JSON.stringify([Number(selectedCategory?.id ?? form.category)]));
      formData.append("retailPrice", String(form.retailPrice || 0));
      formData.append("brand", form.brand.trim());
      formData.append("description", form.description.trim());
      formData.append("costPrice", String(form.costPrice || 0));
      formData.append("quantity", String(form.quantity || 0));
      formData.append("lowStockAt", String(form.lowStockAt || 5));
      formData.append("unit", form.unit || "pcs");
      if (form.image) {
        formData.append("image", form.image);
      }

      if (isEdit) {
        const res = await axiosApiCall.post(
          `${API_ROUTER?.POS_PRODUCT_UPDATE}/${product.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (!res?.data?.status) {
          toast.error(res?.data?.message || TOAST_ALERTS.GENERAL_ERROR, {
            autoClose: 2000,
          });
          return;
        }

        const updatedProduct = normalizeCreatedProduct(res?.data?.data || {}, {
          id: product.id,
          name: form.name.trim(),
          brand: form.brand.trim(),
          category: selectedCategory?.name || form.category,
          categoryId: selectedCategory?.id ?? form.category,
          categoryValue: form.category,
          description: form.description.trim(),
          price: Number(form.retailPrice || 0),
          retailPrice: Number(form.retailPrice || 0),
          costPrice: Number(form.costPrice || 0),
          stock: Number(form.quantity || 0),
          remainStock: Number(form.quantity || 0),
          quantity: Number(form.quantity || 0),
          lowStockAt: Number(form.lowStockAt || 5),
          unit: form.unit || "pcs",
          image: preview || "/images/productimg.svg",
        });

        onSuccess(updatedProduct);
        toast.success(res?.data?.message || "Product updated successfully.", { autoClose: 2000 });
        onHide();
        return;
      }

      const res = await axiosApiCall.post(API_ROUTER?.POS_PRODUCT_CREATE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!res?.data?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      }

      const createdProduct = normalizeCreatedProduct(res?.data?.data || {}, {
        id: Date.now(),
        name: form.name.trim(),
        brand: form.brand.trim(),
        category: selectedCategory?.name || form.category,
        categoryId: selectedCategory?.id ?? form.category,
        categoryValue: form.category,
        description: form.description.trim(),
        price: Number(form.retailPrice || 0),
        retailPrice: Number(form.retailPrice || 0),
        costPrice: Number(form.costPrice || 0),
        stock: Number(form.quantity || 0),
        remainStock: Number(form.quantity || 0),
        quantity: Number(form.quantity || 0),
        lowStockAt: Number(form.lowStockAt || 5),
        unit: form.unit || "pcs",
        image: preview || "/images/productimg.svg",
      });

      onSuccess(createdProduct);
      toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
      onHide();
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
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
          <h3>{isEdit ? "Edit Product" : "Add New Product"}</h3>
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
            <ImageUploadBox>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {preview ? (
                <img className="preview" src={preview} alt="Product preview" />
              ) : (
                <div className="upload-placeholder">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M14.6666 21.334V10.4673L11.1999 13.934L9.33325 12.0007L15.9999 5.33398L22.6666 12.0007L20.7999 13.934L17.3333 10.4673V21.334H14.6666ZM7.99992 26.6673C7.26659 26.6673 6.63903 26.4064 6.11725 25.8847C5.59547 25.3629 5.33414 24.7349 5.33325 24.0007V20.0007H7.99992V24.0007H23.9999V20.0007H26.6666V24.0007C26.6666 24.734 26.4057 25.362 25.8839 25.8847C25.3621 26.4073 24.7341 26.6682 23.9999 26.6673H7.99992Z"
                      fill="#007BFF"
                    />
                  </svg>
                  <span>Click to upload</span>
                </div>
              )}
            </ImageUploadBox>

            <FormRow>
              <FormField>
                <input
                  type="text"
                  placeholder="Name"
                  maxLength={40}
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </FormField>
              <FormField>
                <input
                  type="text"
                  placeholder="Brand"
                  maxLength={15}
                  value={form.brand}
                  onChange={(e) => updateField("brand", e.target.value)}
                />
                {errors.brand && <p className="error">{errors.brand}</p>}
              </FormField>
            </FormRow>

            <FormField>
              <select
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                disabled={isCategoryDisabled}
                aria-disabled={isCategoryDisabled}
              >
                <option value="" disabled hidden>
                  {loadingCategories ? "Loading categories..." : "Select Category"}
                </option>
                {categoryOptions.map((opt) => (
                  <option key={opt.id} value={String(opt.id)}>
                    {opt.name}
                  </option>
                ))}
              </select>
              {(errors.category || (!loadingCategories && !hasCategories)) && (
                <p className="error">
                  {errors.category ||
                    "No categories found. Please add a category first."}
                </p>
              )}
            </FormField>

            <FormField>
              <textarea
                placeholder="Description"
                maxLength={100}
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                className="textarea"
              />
              {errors.description && (
                <p className="error">{errors.description}</p>
              )}
            </FormField>

            <FormRow>
              <FormField>
                <input
                  type="number"
                  min="0"
                  inputMode="decimal"
                  placeholder="Retail Price"
                  value={form.retailPrice}
                  onKeyDown={blockInvalidNumberKeys}
                  onChange={(e) =>
                    updatePositiveNumberField("retailPrice", e.target.value)
                  }
                />
                {errors.retailPrice && <p className="error">{errors.retailPrice}</p>}
              </FormField>
              <FormField>
                <input
                  type="number"
                  min="0"
                  inputMode="decimal"
                  placeholder="Cost Price"
                  value={form.costPrice}
                  onKeyDown={blockInvalidNumberKeys}
                  onChange={(e) =>
                    updatePositiveNumberField("costPrice", e.target.value)
                  }
                />
                {errors.costPrice && <p className="error">{errors.costPrice}</p>}
              </FormField>
            </FormRow>

            <FormRow>
              <FormField>
                <input
                  type="number"
                  min="0"
                  step="1"
                  inputMode="numeric"
                  placeholder="Quantity"
                  value={form.quantity}
                  onKeyDown={blockInvalidIntegerKeys}
                  onChange={(e) =>
                    updatePositiveIntegerField("quantity", e.target.value)
                  }
                />
                {errors.quantity && <p className="error">{errors.quantity}</p>}
              </FormField>
              <FormField>
                <input
                  type="number"
                  min="0"
                  step="1"
                  inputMode="numeric"
                  placeholder="Low stock at"
                  value={form.lowStockAt}
                  onKeyDown={blockInvalidIntegerKeys}
                  onChange={(e) =>
                    updatePositiveIntegerField("lowStockAt", e.target.value)
                  }
                />
                {errors.lowStockAt && <p className="error">{errors.lowStockAt}</p>}
              </FormField>
            </FormRow>

            <FormField>
              <select
                value={form.unit}
                onChange={(e) => updateField("unit", e.target.value)}
              >
                <option value="" disabled hidden>
                  Unit
                </option>
                {UNIT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </FormField>

            <AddProductFooter>
              <button type="button" className="cancel-btn" onClick={onHide}>
                Cancel
              </button>
              <button
                type="button"
                className="submit-btn"
                disabled={saving || loadingCategories}
                onClick={handleSubmit}
              >
                {saving ? "Saving..." : isEdit ? "Update Product" : "Add Product"}
              </button>
            </AddProductFooter>
          </AddProductForm>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddProductModal;
