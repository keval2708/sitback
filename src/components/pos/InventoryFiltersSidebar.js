"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { toast } from "react-toastify";
import { API_ROUTER } from "@/services/apiRouter";
import {
  FilterClearAllBtn,
  FilterField,
  FilterSidebarBody,
  FilterSidebarCancelBtn,
  FilterSidebarHeader,
  PosInventoryFiltersGlobalStyles,
} from "@/styles/pages/pos-inventory.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS } from "@/utils/constants";

export const DEFAULT_INVENTORY_FILTERS = {
  categoryId: "",
  brandId: "",
  status: "",
  minPrice: "",
  maxPrice: "",
};

const normalizeBrand = (item = {}) => ({
  id: item.id ?? item._id ?? item.brandId ?? item.brand_id,
  name: item.name ?? item.brandName ?? item.brand_name ?? "",
});

const extractListRows = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.list)) return payload.list;
  if (Array.isArray(payload?.brands)) return payload.brands;
  if (Array.isArray(payload?.rows)) return payload.rows;
  return [];
};

const InventoryFiltersSidebar = ({
  show,
  onHide = () => {},
  filters = DEFAULT_INVENTORY_FILTERS,
  onApply = () => {},
  onClear = () => {},
  categories = [],
  brands = [],
  onBrandsLoaded = () => {},
}) => {
  const [draft, setDraft] = useState(filters);
  const [brandList, setBrandList] = useState(brands);
  const onBrandsLoadedRef = useRef(onBrandsLoaded);

  useEffect(() => {
    onBrandsLoadedRef.current = onBrandsLoaded;
  }, [onBrandsLoaded]);

  useEffect(() => {
    if (show) {
      setDraft(filters);
    }
  }, [show, filters]);

  useEffect(() => {
    setBrandList(brands);
  }, [brands]);

  const fetchBrands = useCallback(async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.POS_BRAND_LIST);
      if (!res?.data?.status) {
        toast.error(res?.data?.message || TOAST_ALERTS.GENERAL_ERROR, {
          autoClose: 2000,
        });
        return;
      }

      const list = extractListRows(res?.data?.data)
        .map(normalizeBrand)
        .filter((item) => item.id != null && item.name);

      setBrandList(list);
      onBrandsLoadedRef.current(list);
    } catch (error) {
      toast.error(TOAST_ALERTS.GENERAL_ERROR, { autoClose: 2000 });
    }
  }, []);

  useEffect(() => {
    if (show) {
      fetchBrands();
    }
  }, [show, fetchBrands]);

  const categoryOptions = useMemo(
    () =>
      categories
        .map((c) => ({
          id: c.id ?? c._id ?? c.categoryId ?? c.category_id,
          name: c.name ?? c.categoryName ?? c.category_name ?? "",
        }))
        .filter((c) => c.id != null && c.name),
    [categories]
  );

  const brandOptions = useMemo(
    () =>
      brandList
        .map(normalizeBrand)
        .filter((b) => b.id != null && b.name),
    [brandList]
  );

  const handleCancel = () => {
    setDraft(filters);
    onHide();
  };

  const handleClearAll = () => {
    setDraft(DEFAULT_INVENTORY_FILTERS);
    onClear();
  };

  const handleChangeAndApply = (key, value) => {
    const next = { ...draft, [key]: value };
    setDraft(next);
    onApply(next);
  };

  return (
    <>
      <PosInventoryFiltersGlobalStyles />
      <Offcanvas
        show={show}
        onHide={handleCancel}
        placement="end"
        className="sitback-pos-inventory-filters-sidebar"
      >
        <FilterSidebarHeader>
          <h3>Options</h3>
          <FilterSidebarCancelBtn type="button" onClick={handleCancel}>
            Cancel
          </FilterSidebarCancelBtn>
        </FilterSidebarHeader>

        <Offcanvas.Body>
          <FilterSidebarBody>
            <div className="filter-section">
              <FilterField>
                <select
                  value={draft.categoryId}
                  onChange={(e) => handleChangeAndApply("categoryId", e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categoryOptions.map((cat) => (
                    <option key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </FilterField>

              <FilterField>
                <select
                  value={draft.brandId}
                  onChange={(e) => handleChangeAndApply("brandId", e.target.value)}
                >
                  <option value="">Select brands</option>
                  {brandOptions.map((brand) => (
                    <option key={brand.id} value={String(brand.id)}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </FilterField>

              <FilterField>
                <select
                  value={draft.status}
                  onChange={(e) => handleChangeAndApply("status", e.target.value)}
                >
                  <option value="">Select status</option>
                  <option value="inStock">In Stock</option>
                  <option value="lowStock">Low Stock</option>
                  <option value="outOfStock">Out of Stock</option>
                </select>
              </FilterField>

              <FilterField>
                <input
                  type="number"
                  placeholder="Min Price"
                  value={draft.minPrice}
                  onChange={(e) => handleChangeAndApply("minPrice", e.target.value)}
                  min="0"
                />
              </FilterField>

              <FilterField>
                <input
                  type="number"
                  placeholder="Max Price"
                  value={draft.maxPrice}
                  onChange={(e) => handleChangeAndApply("maxPrice", e.target.value)}
                  min="0"
                />
              </FilterField>
            </div>

            {/* <FilterExportSection>
              <h4>Export</h4>
            </FilterExportSection> */}
          </FilterSidebarBody>

          <FilterClearAllBtn type="button" onClick={handleClearAll}>
            Clear All
          </FilterClearAllBtn>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default InventoryFiltersSidebar;
