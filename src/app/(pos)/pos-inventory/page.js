"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import AddProductModal from "@/components/pos/AddProductModal";
import DeleteProductModal from "@/components/pos/DeleteProductModal";
import InventoryFiltersSidebar, {
  DEFAULT_INVENTORY_FILTERS,
} from "@/components/pos/InventoryFiltersSidebar";
import PosInventoryHistoryTab from "@/components/pos/PosInventoryHistoryTab";
import PosManageCategoriesTab from "@/components/pos/PosManageCategoriesTab";
import PosProductsTab from "@/components/pos/PosProductsTab";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import {
  FiltersButton,
  HistoryFilterSelect,
  InventoryActions,
  InventoryContainer,
  InventoryHeader,
  InventoryHeaderInner,
  InventoryPageWrapper,
  InventorySearchInput,
  InventorySearchWrap,
  InventoryTabButton,
  InventoryTitle,
} from "@/styles/pages/pos-inventory.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const PAGE_LIMIT = 10;

const buildProductListQuery = (page, search, filters = DEFAULT_INVENTORY_FILTERS) => {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(PAGE_LIMIT));

  if (search?.trim()) params.set("search", search.trim());
  if (filters.categoryId) params.set("categoryId", String(filters.categoryId));
  if (filters.brandId) params.set("brandId", String(filters.brandId));
  if (filters.status) params.set("status", filters.status);

  if (filters.minPrice !== "" && filters.minPrice != null) {
    params.set("minPrice", String(filters.minPrice));
  }
  if (filters.maxPrice !== "" && filters.maxPrice != null) {
    params.set("maxPrice", String(filters.maxPrice));
  }

  return params.toString();
};

/** API may return brand/category as string or `{ id, name }` — always renderable string. */
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

const normalizeProduct = (item = {}) => {
  const categoryIds = Array.isArray(item.categoryIds) ? item.categoryIds : [];
  const categories = Array.isArray(item.categories) ? item.categories : [];
  const firstCategory = categories[0] || {};

  return {
  id: item.id ?? item.productId ?? item.product_id ?? item._id,
  name: item.name ?? item.productName ?? item.product_name ?? "",
  brand: resolveName(item.brand, item.brandName, item.brand_name),
  brandId: item.brandId ?? item.brand_id ?? item.brand?.id ?? null,
  category: resolveName(
    firstCategory,
    item.categoryName,
    item.category_name,
    item.category,
    item.categoryTitle,
    item.category_title
  ),
  categoryId:
    item.categoryId ??
    item.category_id ??
    item.catId ??
    categoryIds[0] ??
    firstCategory.id ??
    null,
  categoryIds,
  categories,
  sku: item.sku ?? item.skuCode ?? item.sku_code ?? "",
  unit: item.unit ?? item.unitName ?? item.unit_name ?? "pcs",
  description: item.description ?? item.desc ?? "",
  price: Number(item.price ?? item.retailPrice ?? item.retail_price ?? 0),
  retailPrice: Number(item.retailPrice ?? item.retail_price ?? item.price ?? 0),
  costPrice: Number(item.costPrice ?? item.cost_price ?? item.purchaseCost ?? 0),
  stock: Number(
    item.remainstock ??
      item.remainStock ??
      item.remainingStock ??
      item.stock ??
      item.quantity ??
      item.qty ??
      0
  ),
  remainStock: Number(
    item.remainstock ??
      item.remainStock ??
      item.remainingStock ??
      item.stock ??
      item.quantity ??
      item.qty ??
      0
  ),
  quantity: Number(item.quantity ?? item.stock ?? item.qty ?? 0),
  lowStockAt: Number(item.lowStockAt ?? item.low_stock ?? item.low_stock_at ?? 5),
  status: item.status ?? item.stockStatus ?? item.stock_status ?? "",
  chargeTax: Boolean(item.chargeTax ?? item.charge_tax ?? false),
  assignStaffToSale: Boolean(item.assignStaffToSale ?? item.assign_staff_to_sale ?? false),
  autoAddToNewSales: Boolean(item.autoAddToNewSales ?? item.auto_add_to_new_sales ?? false),
  image:
    item.image ??
    item.imageUrl ??
    item.productImage ??
    item.thumb ??
    firstCategory.image ??
    "/images/productimg.svg",
  raw: item,
  };
};

const extractListRows = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.list)) return payload.list;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.brands)) return payload.brands;
  if (Array.isArray(payload?.categories)) return payload.categories;
  if (Array.isArray(payload?.products)) return payload.products;
  if (Array.isArray(payload?.rows)) return payload.rows;
  return [];
};

const extractPagination = (responseData, payload) => (
  payload?.pagination ??
  responseData?.pagination ??
  {}
);

const extractHasMore = (responseData, payload, page, pageSize, loadedCount, pageCount) => {
  const pagination = extractPagination(responseData, payload);
  if (typeof responseData?.isNextPage === "boolean") return responseData.isNextPage;
  if (typeof payload?.isNextPage === "boolean") return payload.isNextPage;
  if (payload?.nextPage != null) return Boolean(payload.nextPage);
  if (responseData?.nextPage != null) return Boolean(responseData.nextPage);

  const total =
    Number(
      pagination?.total ??
      payload?.totalRecords ??
      payload?.total ??
      responseData?.totalRecords ??
      responseData?.total
    );
  if (Number.isFinite(total) && total > 0) {
    return loadedCount < total;
  }

  const totalPages = Number(
    pagination?.totalPages ??
    payload?.totalPages ??
    payload?.lastPage ??
    responseData?.totalPages
  );
  if (Number.isFinite(totalPages) && totalPages > 0) {
    return page < totalPages;
  }

  return pageCount >= pageSize;
};

export default function PosInventoryPage() {
  const [activeTab, setActiveTab] = useState("product");
  const [search, setSearch] = useState("");
  const [historySearch, setHistorySearch] = useState("");
  const [historyTimeFilter, setHistoryTimeFilter] = useState("all");
  const [historyTypeFilter, setHistoryTypeFilter] = useState("all");
  const [products, setProducts] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [deletingProductLoading, setDeletingProductLoading] = useState(false);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [showManageCategoriesModal, setShowManageCategoriesModal] = useState(false);
  const [showFiltersSidebar, setShowFiltersSidebar] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_INVENTORY_FILTERS);
  const [showInventoryDetail, setShowInventoryDetail] = useState(false);
  const [productPage, setProductPage] = useState(1);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingMoreProducts, setLoadingMoreProducts] = useState(false);
  const [productCount, setProductCount] = useState(0);
  const { toaster } = useToaster();

  const fetchProducts = useCallback(
    async (page = 1, isCancelled = () => false) => {
      try {
        if (page === 1) {
          setLoadingProducts(true);
        } else {
          setLoadingMoreProducts(true);
        }

        const query = buildProductListQuery(page, search, filters);
        const res = await axiosApiCall.get(`${API_ROUTER?.POS_PRODUCT_LIST}?${query}`);
        if (isCancelled()) return;

        if (!res?.status) {
          toast.error(res?.message || TOAST_ALERTS.GENERAL_ERROR, {
            autoClose: 2000,
          });
          if (page === 1) {
            setProducts([]);
            setProductCount(0);
            setHasMoreProducts(false);
          }
          return;
        }

        const payload = res?.data?.data;
        const rows = extractListRows(payload);
        const normalizedRows = rows
          .map(normalizeProduct)
          .filter((item) => item.id !== undefined && item.id !== null);

        if (isCancelled()) return;

        setProducts((prev) => {
          if (page === 1) return normalizedRows;

          const merged = [...prev];
          normalizedRows.forEach((nextItem) => {
            const index = merged.findIndex((item) => String(item.id) === String(nextItem.id));
            if (index >= 0) merged[index] = { ...merged[index], ...nextItem };
            else merged.push(nextItem);
          });
          return merged;
        });

        const nextLoadedCount = (page - 1) * PAGE_LIMIT + normalizedRows.length;
        const pagination = extractPagination(res?.data, payload);
        const total =
          Number(
            pagination?.total ??
              payload?.totalRecords ??
              payload?.total ??
              payload?.count ??
              res?.data?.totalRecords ??
              res?.data?.total
          ) || 0;
        setProductCount((prev) =>
          total || (page === 1 ? normalizedRows.length : Math.max(prev, nextLoadedCount))
        );
        setHasMoreProducts(
          extractHasMore(res?.data, payload, page, PAGE_LIMIT, nextLoadedCount, normalizedRows.length)
        );
      } catch (error) {
        if (!isCancelled()) {
          toast.error(TOAST_ALERTS.GENERAL_ERROR, { autoClose: 2000 });
        }
      } finally {
        if (!isCancelled()) {
          setLoadingProducts(false);
          setLoadingMoreProducts(false);
        }
      }
    },
    [search, filters]
  );

  // Search / filters are applied via API — reset to page 1 when they change
  useEffect(() => {
    setProducts([]);
    setHasMoreProducts(true);
    setProductPage(1);
  }, [search, filters]);

  useEffect(() => {
    if (activeTab !== "product") return undefined;

    let cancelled = false;
    fetchProducts(productPage, () => cancelled);

    return () => {
      cancelled = true;
    };
  }, [activeTab, fetchProducts, productPage]);

  const fetchFilterOptions = useCallback(async () => {
    try {
      const [categoryRes, brandRes] = await Promise.all([
        axiosApiCall.get(API_ROUTER?.POS_CATEGORY_LIST),
        axiosApiCall.get(API_ROUTER?.POS_BRAND_LIST),
      ]);

      if (categoryRes?.data?.status) {
        const rows = extractListRows(categoryRes?.data?.data);
        setCategories(
          rows
            .map((item) => ({
              id: item.id ?? item._id ?? item.categoryId ?? item.category_id,
              name: item.name ?? item.categoryName ?? item.category_name ?? "",
              color: item.color ?? item.colour ?? "",
              description: item.description ?? "",
            }))
            .filter((item) => item.id != null && item.name)
        );
      }

      if (brandRes?.data?.status) {
        const rows = extractListRows(brandRes?.data?.data);
        setBrands(
          rows
            .map((item) => ({
              id: item.id ?? item._id ?? item.brandId ?? item.brand_id,
              name: item.name ?? item.brandName ?? item.brand_name ?? "",
            }))
            .filter((item) => item.id != null && item.name)
        );
      }
    } catch (error) {
      toast.error(TOAST_ALERTS.GENERAL_ERROR, { autoClose: 2000 });
    }
  }, []);

  useEffect(() => {
    fetchFilterOptions();
  }, [fetchFilterOptions]);

  const handleLoadMoreProducts = useCallback(() => {
    if (loadingProducts || loadingMoreProducts || !hasMoreProducts) return;
    setProductPage((prev) => prev + 1);
  }, [hasMoreProducts, loadingMoreProducts, loadingProducts]);

  const activeViewProduct = useMemo(() => {
    if (!viewingProduct?.id) return null;
    return products.find((item) => item.id === viewingProduct.id) || null;
  }, [products, viewingProduct]);

  const isInventoryTab = activeTab === "inventory";

  const handleTabClick = (tab) => {
    if (tab === "manage_categories") {
      setShowManageCategoriesModal(true);
      return;
    }

    setShowInventoryDetail(false);
    if (tab === "product") {
      setProductPage(1);
    }
    setActiveTab(tab);
  };

  const handleCloseProductModal = () => {
    setShowProductModal(false);
    setEditingProduct(null);
  };

  const handleView = (product) => {
    setViewingProduct(product);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  const handleDeleteClick = (product) => {
    setDeletingProduct(product);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    if (deletingProductLoading) return;
    setShowDeleteModal(false);
    setDeletingProduct(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingProduct?.id) {
      handleCloseDeleteModal();
      return;
    }

    try {
      setDeletingProductLoading(true);
      const res = await axiosApiCall.delete(
        `${API_ROUTER?.POS_DELETE_PRODUCT}/${deletingProduct.id}`
      );

      if (!res?.data?.status) {
       return toaster(res?.message, TOAST_TYPES.ERROR);
      }

      setProducts((prev) => prev.filter((item) => item.id !== deletingProduct.id));
      setProductCount((prev) => Math.max(prev - 1, 0));
      if (viewingProduct?.id === deletingProduct.id) {
        setViewingProduct(null);
      }
      toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
      setShowDeleteModal(false);
      setDeletingProduct(null);
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setDeletingProductLoading(false);
    }
  };

  const handleProductSave = (product) => {
    const normalized = normalizeProduct(product);
    if (editingProduct?.id) {
      setProducts((prev) =>
        prev.map((item) => (item.id === normalized.id ? { ...item, ...normalized } : item))
      );
      if (viewingProduct?.id === normalized.id) {
        setViewingProduct(normalized);
      }
    } else {
      setProducts((prev) => [normalized, ...prev]);
      setProductCount((prev) => prev + 1);
    }
    setEditingProduct(null);
  };

  const openAddProduct = () => {
    setEditingProduct(null);
    setShowProductModal(true);
  };

  return (
    <InventoryPageWrapper>
      {!showInventoryDetail && (
        <InventoryHeader>
          <InventoryHeaderInner>
            <InventoryTitle>
              {isInventoryTab ? (
                <span className="title-main">INVENTORY HISTORY</span>
              ) : (
                <>
                  <span className="title-main">PRODUCTS</span>
                  <span className="title-count">({productCount || products.length} Products)</span>
                </>
              )}
            </InventoryTitle>

            <InventorySearchWrap>
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.86518 0C3.5219 0 0 3.5202 0 7.86348C0 12.2068 3.5219 15.727 7.86518 15.727C9.73064 15.7309 11.5361 15.0681 12.9559 13.858L15.9157 16.817C15.9741 16.8797 16.0445 16.9299 16.1227 16.9648C16.201 16.9996 16.2854 17.0184 16.371 17.0199C16.4567 17.0214 16.5417 17.0057 16.6211 16.9736C16.7005 16.9415 16.7727 16.8938 16.8332 16.8332C16.8938 16.7727 16.9415 16.7005 16.9736 16.6211C17.0057 16.5417 17.0214 16.4567 17.0199 16.371C17.0184 16.2854 16.9996 16.201 16.9648 16.1227C16.9299 16.0445 16.8797 15.9741 16.817 15.9157L13.858 12.9567C15.0699 11.5368 15.734 9.73024 15.7304 7.86348C15.7304 3.5202 12.2085 0 7.86518 0ZM1.27543 7.86348C1.27589 6.11606 1.97036 4.44037 3.20613 3.20492C4.4419 1.96948 6.11777 1.27543 7.86518 1.27543C8.73924 1.26139 9.60736 1.42142 10.419 1.74619C11.2306 2.07097 11.9694 2.554 12.5925 3.16715C13.2156 3.7803 13.7104 4.51131 14.0482 5.31759C14.386 6.12387 14.5599 6.98931 14.5599 7.86348C14.5599 8.73765 14.386 9.60309 14.0482 10.4094C13.7104 11.2156 13.2156 11.9467 12.5925 12.5598C11.9694 13.173 11.2306 13.656 10.419 13.9808C9.60736 14.3055 8.73924 14.4656 7.86518 14.4515C6.11777 14.4515 4.4419 13.7575 3.20613 12.522C1.97036 11.2866 1.27589 9.61089 1.27543 7.86348Z"
                  fill="#295086"
                />
              </svg>
              <InventorySearchInput
                type="text"
                placeholder={
                  isInventoryTab
                    ? "Search product, ref, notes..."
                    : "Search products by name or brand..."
                }
                value={isInventoryTab ? historySearch : search}
                onChange={(e) =>
                  isInventoryTab
                    ? setHistorySearch(e.target.value)
                    : setSearch(e.target.value)
                }
              />
            </InventorySearchWrap>

            <InventoryActions>
              {isInventoryTab ? (
                <>
                  <HistoryFilterSelect
                    value={historyTimeFilter}
                    onChange={(e) => setHistoryTimeFilter(e.target.value)}
                    aria-label="Filter by time"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </HistoryFilterSelect>

                  <HistoryFilterSelect
                    value={historyTypeFilter}
                    onChange={(e) => setHistoryTypeFilter(e.target.value)}
                    aria-label="Filter by type"
                  >
                    <option value="all">All Types</option>
                    <option value="in">In</option>
                    <option value="out">Out</option>
                  </HistoryFilterSelect>
                </>
              ) : (
                <FiltersButton type="button" onClick={() => setShowFiltersSidebar(true)}>
                  <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.23438 8.5C6.90371 8.49977 7.55327 8.72694 8.07658 9.14425C8.59989 9.56156 8.96592 10.1443 9.11466 10.7969H17.7188C17.8928 10.7969 18.0597 10.866 18.1828 10.9891C18.3059 11.1122 18.375 11.2791 18.375 11.4531C18.375 11.6272 18.3059 11.7941 18.1828 11.9172C18.0597 12.0402 17.8928 12.1094 17.7188 12.1094H9.11466C8.96565 12.7618 8.59955 13.3443 8.07629 13.7616C7.55303 14.1788 6.90362 14.406 6.23438 14.406C5.56513 14.406 4.91572 14.1788 4.39246 13.7616C3.8692 13.3443 3.5031 12.7618 3.35409 12.1094H0.65625C0.482202 12.1094 0.315282 12.0402 0.192211 11.9172C0.0691404 11.7941 0 11.6272 0 11.4531C0 11.2791 0.0691404 11.1122 0.192211 10.9891C0.315282 10.866 0.482202 10.7969 0.65625 10.7969H3.35409C3.50283 10.1443 3.86886 9.56156 4.39217 9.14425C4.91548 8.72694 5.56504 8.49977 6.23438 8.5ZM6.23438 9.8125C5.79925 9.8125 5.38195 9.98535 5.07428 10.293C4.7666 10.6007 4.59375 11.018 4.59375 11.4531C4.59375 11.8882 4.7666 12.3055 5.07428 12.6132C5.38195 12.9209 5.79925 13.0938 6.23438 13.0938C6.6695 13.0938 7.0868 12.9209 7.39447 12.6132C7.70215 12.3055 7.875 11.8882 7.875 11.4531C7.875 11.018 7.70215 10.6007 7.39447 10.293C7.0868 9.98535 6.6695 9.8125 6.23438 9.8125ZM12.1406 1.681e-07C12.81 -0.000225583 13.4595 0.226936 13.9828 0.64425C14.5061 1.06157 14.8722 1.64428 15.0209 2.29688H17.7188C17.8928 2.29688 18.0597 2.36602 18.1828 2.48909C18.3059 2.61216 18.375 2.77908 18.375 2.95313C18.375 3.12717 18.3059 3.29409 18.1828 3.41716C18.0597 3.54023 17.8928 3.60938 17.7188 3.60938H15.0209C14.8719 4.26182 14.5058 4.84434 13.9825 5.26158C13.4593 5.67881 12.8099 5.90603 12.1406 5.90603C11.4714 5.90603 10.822 5.67881 10.2987 5.26158C9.77545 4.84434 9.40935 4.26182 9.26034 3.60938H0.65625C0.482202 3.60938 0.315282 3.54023 0.192211 3.41716C0.0691404 3.29409 0 3.12717 0 2.95313C0 2.77908 0.0691404 2.61216 0.192211 2.48909C0.315282 2.36602 0.482202 2.29688 0.65625 2.29688H9.26034C9.40908 1.64428 9.77511 1.06157 10.2984 0.64425C10.8217 0.226936 11.4713 -0.000225583 12.1406 1.681e-07ZM12.1406 1.3125C11.7055 1.3125 11.2882 1.48535 10.9805 1.79303C10.6729 2.1007 10.5 2.518 10.5 2.95313C10.5 3.38825 10.6729 3.80555 10.9805 4.11322C11.2882 4.4209 11.7055 4.59375 12.1406 4.59375C12.5757 4.59375 12.993 4.4209 13.3007 4.11322C13.6084 3.80555 13.7812 3.38825 13.7812 2.95313C13.7812 2.518 13.6084 2.1007 13.3007 1.79303C12.993 1.48535 12.5757 1.3125 12.1406 1.3125Z" fill="#295086"/>
                  </svg>
                  FILTERS
                </FiltersButton>
              )}

              <InventoryTabButton
                type="button"
                $active={activeTab === "inventory"}
                onClick={() => handleTabClick("inventory")}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.3333 11.416L13.6333 8.11602C13.7556 7.99379 13.9111 7.93268 14.1 7.93268C14.2889 7.93268 14.4444 7.99379 14.5667 8.11602C14.6889 8.23824 14.75 8.39379 14.75 8.58268C14.75 8.77157 14.6889 8.92713 14.5667 9.04935L10.8 12.816C10.6667 12.9493 10.5111 13.016 10.3333 13.016C10.1556 13.016 10 12.9493 9.86667 12.816L7.96667 10.916C7.84444 10.7938 7.78333 10.6382 7.78333 10.4493C7.78333 10.2605 7.84444 10.1049 7.96667 9.98268C8.08889 9.86046 8.24444 9.79935 8.43333 9.79935C8.62222 9.79935 8.77778 9.86046 8.9 9.98268L10.3333 11.416ZM3.33333 13.9993C2.96667 13.9993 2.65289 13.8689 2.392 13.608C2.13111 13.3471 2.00044 13.0331 2 12.666V3.33268C2 2.96602 2.13067 2.65224 2.392 2.39135C2.65333 2.13046 2.96711 1.99979 3.33333 1.99935H6.11667C6.23889 1.61046 6.47778 1.29113 6.83333 1.04135C7.18889 0.791571 7.57778 0.66646 8 0.666016C8.44444 0.666016 8.84178 0.791127 9.192 1.04135C9.54222 1.29157 9.77822 1.6109 9.9 1.99935H12.6667C13.0333 1.99935 13.3473 2.13002 13.6087 2.39135C13.87 2.65268 14.0004 2.96646 14 3.33268V5.99935C14 6.18824 13.936 6.34668 13.808 6.47468C13.68 6.60268 13.5218 6.66646 13.3333 6.66602C13.1449 6.66557 12.9867 6.60157 12.8587 6.47402C12.7307 6.34646 12.6667 6.18824 12.6667 5.99935V3.33268H11.3333V4.66602C11.3333 4.8549 11.2693 5.01335 11.1413 5.14135C11.0133 5.26935 10.8551 5.33313 10.6667 5.33268H5.33333C5.14444 5.33268 4.98622 5.26868 4.85867 5.14068C4.73111 5.01268 4.66711 4.85446 4.66667 4.66602V3.33268H3.33333V12.666H6.66667C6.85556 12.666 7.014 12.73 7.142 12.858C7.27 12.986 7.33378 13.1442 7.33333 13.3327C7.33289 13.5211 7.26889 13.6796 7.14133 13.808C7.01378 13.9365 6.85556 14.0002 6.66667 13.9993H3.33333ZM8.47533 3.14068C8.60289 3.01313 8.66667 2.8549 8.66667 2.66602C8.66667 2.47713 8.60267 2.3189 8.47467 2.19135C8.34667 2.06379 8.18844 1.99979 8 1.99935C7.81156 1.9989 7.65333 2.0629 7.52533 2.19135C7.39733 2.31979 7.33333 2.47802 7.33333 2.66602C7.33333 2.85402 7.39733 3.01246 7.52533 3.14135C7.65333 3.27024 7.81156 3.33402 8 3.33268C8.18844 3.33135 8.34689 3.26735 8.47533 3.14068Z" fill="currentColor"/>
                </svg>
                Inventory
              </InventoryTabButton>

              <InventoryTabButton
                type="button"
                $active={activeTab === "manage_categories"}
                onClick={() => handleTabClick("manage_categories")}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.66663 2.66602H6.66663V6.66602H2.66663V2.66602ZM9.33329 2.66602H13.3333V6.66602H9.33329V2.66602ZM2.66663 9.33268H6.66663V13.3327H2.66663V9.33268ZM9.33329 11.3327C9.33329 11.8631 9.54401 12.3718 9.91908 12.7469C10.2942 13.122 10.8029 13.3327 11.3333 13.3327C11.8637 13.3327 12.3724 13.122 12.7475 12.7469C13.1226 12.3718 13.3333 11.8631 13.3333 11.3327C13.3333 10.8022 13.1226 10.2935 12.7475 9.91847C12.3724 9.5434 11.8637 9.33268 11.3333 9.33268C10.8029 9.33268 10.2942 9.5434 9.91908 9.91847C9.54401 10.2935 9.33329 10.8022 9.33329 11.3327Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Manage Categories
              </InventoryTabButton>

              <InventoryTabButton
                type="button"
                $active={activeTab === "product"}
                onClick={() => handleTabClick("product")}
              >
                Products
              </InventoryTabButton>
            </InventoryActions>
          </InventoryHeaderInner>
        </InventoryHeader>
      )}

      <InventoryContainer>
        {isInventoryTab ? (
          <PosInventoryHistoryTab
            products={products}
            search={historySearch}
            typeFilter={historyTypeFilter}
            timeFilter={historyTimeFilter}
            onProductsChange={setProducts}
            onEditProduct={handleEdit}
            onDeleteProduct={handleDeleteClick}
            onDetailOpenChange={setShowInventoryDetail}
          />
        ) : (
          <PosProductsTab
            products={products}
            loading={loadingProducts}
            hasMore={hasMoreProducts}
            onLoadMore={handleLoadMoreProducts}
            activeViewProduct={activeViewProduct}
            onAddProduct={openAddProduct}
            onViewProduct={handleView}
            onEditProduct={handleEdit}
            onDeleteProduct={handleDeleteClick}
            onCloseSidebar={() => setViewingProduct(null)}
          />
        )}
      </InventoryContainer>

      <PosManageCategoriesTab
        show={showManageCategoriesModal}
        categories={categories}
        onHide={() => setShowManageCategoriesModal(false)}
        onCategoriesChange={setCategories}
      />

      <InventoryFiltersSidebar
        show={showFiltersSidebar}
        onHide={() => setShowFiltersSidebar(false)}
        filters={filters}
        categories={categories}
        brands={brands}
        onBrandsLoaded={setBrands}
        onApply={setFilters}
        onClear={() => setFilters(DEFAULT_INVENTORY_FILTERS)}
      />

      <AddProductModal
        show={showProductModal}
        product={editingProduct}
        categories={categories}
        onHide={handleCloseProductModal}
        onSuccess={handleProductSave}
        onCategoriesLoaded={setCategories}
      />

      <DeleteProductModal
        show={showDeleteModal}
        productName={deletingProduct?.name || ""}
        deleting={deletingProductLoading}
        onHide={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </InventoryPageWrapper>
  );
}
