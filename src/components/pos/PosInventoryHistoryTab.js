"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";
import LogInventoryModal from "@/components/pos/LogInventoryModal";
import { API_ROUTER } from "@/services/apiRouter";
import {
  EmptyInventory,
  HistoryDateCell,
  HistoryMutedCell,
  HistoryNotesCell,
  HistoryProductName,
  HistoryQtyCell,
  HistoryRow,
  HistoryTable,
  HistoryTypeBadge,
  InventoryDetailActions,
  InventoryDetailBackBtn,
  InventoryDetailCard,
  InventoryDetailHistoryHeader,
  InventoryDetailIconBtn,
  InventoryDetailImage,
  InventoryDetailInfo,
  InventoryDetailMeta,
  InventoryDetailMetric,
  InventoryDetailMetrics,
  InventoryDetailPage,
  InventoryDetailTopBar,
  InventoryDetailTotals,
  InventoryHistoryCard,
  InventoryTableWrap,
  ManageStockButton,
} from "@/styles/pages/pos-inventory.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS } from "@/utils/constants";

const PAGE_LIMIT = 10;

const formatHistoryQty = (qty) => {
  const value = Number(qty || 0);
  return value > 0 ? `+${value}` : `${value}`;
};

const getProductMargin = (product) => {
  const price = Number(product?.price || 0);
  const cost = Number(product?.costPrice || 0);
  if (!price) return "0.0%";
  return `${(((price - cost) / price) * 100).toFixed(1)}%`;
};

const toDateInput = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const getDateRangeFromTimeFilter = (timeFilter = "all") => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (timeFilter === "today") {
    const value = toDateInput(today);
    return { startDate: value, endDate: value };
  }

  if (timeFilter === "week") {
    const start = new Date(today);
    const day = start.getDay();
    const diff = day === 0 ? 6 : day - 1;
    start.setDate(start.getDate() - diff);
    return { startDate: toDateInput(start), endDate: toDateInput(today) };
  }

  if (timeFilter === "month") {
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    return { startDate: toDateInput(start), endDate: toDateInput(today) };
  }

  return { startDate: "", endDate: "" };
};

const formatHistoryDate = (value) => {
  if (!value) return "-";
  if (typeof value === "string" && value.includes("|")) return value;

  let date;
  if (value instanceof Date) {
    date = value;
  } else if (typeof value === "string" && Number.isNaN(Number(value))) {
    date = new Date(value);
  } else {
    const num = Number(value);
    if (!Number.isFinite(num)) return String(value);
    const ms = String(Math.trunc(num)).length > 10 ? num : num * 1000;
    date = new Date(ms);
  }

  if (Number.isNaN(date.getTime())) return String(value);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${month} ${day}, ${year} | ${hours}:${minutes} ${ampm}`;
};

const extractRows = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.list)) return payload.list;
  if (Array.isArray(payload?.rows)) return payload.rows;
  if (Array.isArray(payload?.history)) return payload.history;
  return [];
};

const normalizeHistoryEntry = (item = {}) => {
  const typeRaw = String(
    item.inventoryType ?? item.type ?? item.movementType ?? item.stockType ?? ""
  ).toLowerCase();
  const qtyRaw = Number(item.quantity ?? item.qty ?? item.change ?? 0);
  let type = typeRaw.includes("out") ? "out" : typeRaw.includes("in") ? "in" : "";
  if (!type) type = qtyRaw < 0 ? "out" : "in";

  const qty =
    type === "out"
      ? -Math.abs(qtyRaw || 0)
      : Math.abs(qtyRaw || 0);

  return {
    id: item.id ?? item._id ?? item.historyId ?? item.inventoryHistoryId,
    productId:
      item.productId ??
      item.product_id ??
      item.product?.id ??
      null,
    date: formatHistoryDate(
      item.createdAt ??
        item.date ??
        item.created_at ??
        item.createdAtTimestamp ??
        item.loggedAt ??
        item.updatedAt
    ),
    type,
    productName:
      item.productName ??
      item.product_name ??
      item.product?.name ??
      item.name ??
      "-",
    qty,
    reason: item.reason ?? item.reasonType ?? item.action ?? "-",
    stockAfter: Number(
      item.currentStock ??
        item.productCurrentStock ??
        item.stockAfter ??
        item.stock_after ??
        item.remainstock ??
        item.remainingStock ??
        item.stock ??
        0
    ),
    notes:
      item.notes ??
      item.ref ??
      item.reference ??
      item.additionalNotes ??
      item.remark ??
      "",
  };
};

const renderHistoryTypeBadge = (type) => (
  <HistoryTypeBadge $type={type}>
    {type === "out" ? (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9L9 3M9 7.5V3H4.5" stroke="#E32C1F" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) : (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 3L3 9M3 4.5V9H7.5" stroke="#0FB95C" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )}
    {type === "out" ? "Out" : "In"}
  </HistoryTypeBadge>
);

const renderHistoryTotals = (totals) => (
  <InventoryDetailTotals>
    <span className="total-item total-in">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.5 3.5L3.5 8.5M3.5 8.5H7.5M3.5 8.5V4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Total In: {totals.totalIn}
    </span>
    <span className="total-item total-out">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Total Out: {totals.totalOut}
    </span>
  </InventoryDetailTotals>
);

const HistoryTableSkeleton = () => (
  <InventoryTableWrap>
    <HistoryTable>
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Product Name</th>
          <th>Qty</th>
          <th>Reason</th>
          <th>Stock After</th>
          <th>Ref / Notes</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 6 }).map((_, index) => (
          <tr key={`inventory-history-skeleton-${index}`}>
            <td><Skeleton width={140} height={14} /></td>
            <td><Skeleton width={50} height={22} borderRadius={12} /></td>
            <td><Skeleton width={160} height={14} /></td>
            <td><Skeleton width={40} height={14} /></td>
            <td><Skeleton width={100} height={14} /></td>
            <td><Skeleton width={50} height={14} /></td>
            <td><Skeleton width={120} height={14} /></td>
          </tr>
        ))}
      </tbody>
    </HistoryTable>
  </InventoryTableWrap>
);

export default function PosInventoryHistoryTab({
  products = [],
  search = "",
  typeFilter = "all",
  timeFilter = "all",
  onProductsChange,
  onEditProduct,
  onDeleteProduct,
  onDetailOpenChange,
}) {
  const [detailProductId, setDetailProductId] = useState(null);
  const [showLogInventoryModal, setShowLogInventoryModal] = useState(false);
  const [historyRows, setHistoryRows] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const buildQuery = useCallback(
    (pageNum) => {
      const params = new URLSearchParams();
      params.set("page", String(pageNum));
      params.set("limit", String(PAGE_LIMIT));
      if (search?.trim()) params.set("search", search.trim());

      const { startDate, endDate } = getDateRangeFromTimeFilter(timeFilter);
      if (startDate) params.set("startDate", startDate);
      if (endDate) params.set("endDate", endDate);

      if (typeFilter === "in" || typeFilter === "out") {
        params.set("inventoryType", typeFilter === "in" ? "IN" : "OUT");
      }

      return params.toString();
    },
    [search, timeFilter, typeFilter]
  );

  const fetchHistory = useCallback(
    async (pageNum, isCancelled = () => false) => {
      try {
        setLoading(true);
        const res = await axiosApiCall.get(
          `${API_ROUTER?.POS_INVENTORY_HISTORY_LIST}?${buildQuery(pageNum)}`
        );
        if (isCancelled()) return;

        if (!res?.data?.status) {
          if (pageNum === 1) {
            setHistoryRows([]);
            setHasMore(false);
          }
          toast.error(res?.data?.message || TOAST_ALERTS.GENERAL_ERROR, {
            autoClose: 2000,
          });
          return;
        }

        const resData = res?.data;
        const payload = resData?.data;
        const list = extractRows(payload)
          .map(normalizeHistoryEntry)
          .filter((row) => row.id != null);

        setHistoryRows((prev) => {
          if (pageNum === 1) return list;
          const ids = new Set(prev.map((row) => String(row.id)));
          return [...prev, ...list.filter((row) => !ids.has(String(row.id)))];
        });

        if (typeof resData?.isNextPage === "boolean") {
          setHasMore(resData.isNextPage);
        } else if (typeof payload?.isNextPage === "boolean") {
          setHasMore(payload.isNextPage);
        } else {
          const pagination =
            resData?.pagination ??
            (Array.isArray(payload) ? undefined : payload?.pagination) ??
            {};
          const total = Number(pagination?.total ?? resData?.total ?? 0);
          const totalPages = Number(pagination?.totalPages ?? 0);
          const loadedCount = (pageNum - 1) * PAGE_LIMIT + list.length;

          if (totalPages > 0) {
            setHasMore(pageNum < totalPages);
          } else if (total > 0) {
            setHasMore(loadedCount < total);
          } else {
            setHasMore(list.length >= PAGE_LIMIT);
          }
        }
      } catch {
        if (!isCancelled()) {
          toast.error(TOAST_ALERTS.GENERAL_ERROR, { autoClose: 2000 });
          setHasMore(false);
        }
      } finally {
        if (!isCancelled()) setLoading(false);
      }
    },
    [buildQuery]
  );

  useEffect(() => {
    setHistoryRows([]);
    setHasMore(true);
    setPage(1);
  }, [search, typeFilter, timeFilter]);

  useEffect(() => {
    let cancelled = false;
    fetchHistory(page, () => cancelled);
    return () => {
      cancelled = true;
    };
  }, [page, fetchHistory]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [loading, hasMore]);

  const refreshHistory = useCallback(() => {
    setHistoryRows([]);
    setHasMore(true);

    if (page === 1) {
      fetchHistory(1);
      return;
    }

    setPage(1);
  }, [fetchHistory, page]);

  const inventoryDetailProduct = useMemo(() => {
    if (!detailProductId) return null;
    return products.find((item) => item.id === detailProductId) || null;
  }, [products, detailProductId]);

  useEffect(() => {
    if (detailProductId && !inventoryDetailProduct) {
      setDetailProductId(null);
      setShowLogInventoryModal(false);
      onDetailOpenChange?.(false);
      refreshHistory();
    }
  }, [detailProductId, inventoryDetailProduct, onDetailOpenChange, refreshHistory]);

  const productHistory = useMemo(() => {
    if (!inventoryDetailProduct) return [];
    return historyRows.filter(
      (entry) =>
        String(entry.productId) === String(inventoryDetailProduct.id) ||
        entry.productName === inventoryDetailProduct.name
    );
  }, [historyRows, inventoryDetailProduct]);

  const productHistoryTotals = useMemo(() => {
    return productHistory.reduce(
      (acc, entry) => {
        const qty = Number(entry.qty || 0);
        if (qty > 0) acc.totalIn += qty;
        if (qty < 0) acc.totalOut += Math.abs(qty);
        return acc;
      },
      { totalIn: 0, totalOut: 0 }
    );
  }, [productHistory]);

  const openDetail = (productId) => {
    setDetailProductId(productId);
    onDetailOpenChange?.(true);
  };

  const closeDetail = () => {
    setDetailProductId(null);
    setShowLogInventoryModal(false);
    onDetailOpenChange?.(false);
    refreshHistory();
  };

  const handleHistoryRowClick = (entry) => {
    const matchedProduct =
      products.find((item) => String(item.id) === String(entry.productId)) ||
      products.find((item) => item.name === entry.productName);

    if (!matchedProduct) {
      toast.info("Product details not found.", { autoClose: 1500 });
      return;
    }

    openDetail(matchedProduct.id);
  };

  const handleLogInventorySuccess = (entry) => {
    onProductsChange?.((prev) =>
      prev.map((item) =>
        item.id === entry.productId ? { ...item, stock: entry.stockAfter } : item
      )
    );

    setHistoryRows((prev) => [
      {
        id: Date.now(),
        productId: entry.productId,
        date: formatHistoryDate(new Date()),
        type: entry.inventoryType,
        productName: entry.productName,
        qty: entry.qty,
        reason: entry.reason,
        stockAfter: entry.stockAfter,
        notes: entry.notes || entry.reference || entry.additionalNotes || "",
      },
      ...prev,
    ]);
  };

  const renderHistoryTableRows = (entries, { clickable = false } = {}) =>
    entries.map((entry) => {
      const cells = (
        <>
          <td>
            <HistoryDateCell>{entry.date}</HistoryDateCell>
          </td>
          <td>{renderHistoryTypeBadge(entry.type)}</td>
          <td>
            <HistoryProductName>{entry.productName}</HistoryProductName>
          </td>
          <td>
            <HistoryQtyCell $positive={entry.qty > 0}>
              {formatHistoryQty(entry.qty)}
            </HistoryQtyCell>
          </td>
          <td>
            <HistoryMutedCell>{entry.reason}</HistoryMutedCell>
          </td>
          <td>
            <HistoryMutedCell>{entry.stockAfter}</HistoryMutedCell>
          </td>
          <td>
            <HistoryNotesCell>{entry.notes}</HistoryNotesCell>
          </td>
        </>
      );

      if (clickable) {
        return (
          <HistoryRow key={entry.id} onClick={() => handleHistoryRowClick(entry)}>
            {cells}
          </HistoryRow>
        );
      }

      return <tr key={entry.id}>{cells}</tr>;
    });

  if (inventoryDetailProduct) {
    const sku = `SKN-${String(inventoryDetailProduct?.id).padStart(3, "0")}`;
    return (
      <>
        <InventoryDetailPage>
          <InventoryDetailTopBar>
            <InventoryDetailBackBtn type="button" onClick={closeDetail}>
             <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_313_1839)">
                <path d="M6.85714 10.8588L4 8.00167L6.85714 5.14453M4 8.00167L12 8.00167" stroke="#295086" strokeWidth="1.14286" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2.74735 13.2536C1.35422 11.8605 0.571568 9.97102 0.571568 8.00084C0.571568 6.03066 1.35422 4.14117 2.74735 2.74804C4.14047 1.35492 6.02996 0.572266 8.00014 0.572266C9.97032 0.572266 11.8598 1.35492 13.2529 2.74804C14.6461 4.14117 15.4287 6.03066 15.4287 8.00084C15.4287 9.97102 14.6461 11.8605 13.2529 13.2536C11.8598 14.6468 9.97032 15.4294 8.00014 15.4294C6.02996 15.4294 4.14047 14.6468 2.74735 13.2536Z" stroke="#295086" strokeWidth="1.14286" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_313_1839">
                <rect width="16" height="16" fill="white" transform="translate(16) rotate(90)"/>
                </clipPath>
                </defs>
              </svg>

              Back to Inventory
            </InventoryDetailBackBtn>
          </InventoryDetailTopBar>

          <InventoryDetailCard>
            <InventoryDetailInfo>
              <InventoryDetailImage>
                <img
                  src={inventoryDetailProduct.image || "/images/productimg.svg"}
                  alt={inventoryDetailProduct.name}
                />
              </InventoryDetailImage>

              <InventoryDetailMeta>
                <span className="detail-category">
                  {typeof inventoryDetailProduct.category === "object"
                    ? inventoryDetailProduct.category?.name
                    : inventoryDetailProduct.category ||
                      (typeof inventoryDetailProduct.brand === "object"
                        ? inventoryDetailProduct.brand?.name
                        : inventoryDetailProduct.brand) ||
                      "-"}
                </span>
                <h2 className="detail-name">{inventoryDetailProduct.name}</h2>
                <span className="detail-brand">
                  {typeof inventoryDetailProduct.brand === "object"
                    ? inventoryDetailProduct.brand?.name || "-"
                    : inventoryDetailProduct.brand || "-"}
                </span>

                <span className="detail-sku">
                  SKU: {sku || "-"}
                </span>
                <p className="detail-description">
                  {inventoryDetailProduct.description || "No description available."}
                </p>
              </InventoryDetailMeta>

              <InventoryDetailActions>
                <ManageStockButton
                  type="button"
                  onClick={() => setShowLogInventoryModal(true)}
                >
                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M4.842 2.17398C4.88148 1.80599 5.05561 1.46559 5.3309 1.21823C5.6062 0.970863 5.96323 0.834011 6.33333 0.833984H9.66667C10.0368 0.834011 10.3938 0.970863 10.6691 1.21823C10.9444 1.46559 11.1185 1.80599 11.158 2.17398C11.6673 2.18465 12.1067 2.21065 12.4827 2.27998C12.988 2.37332 13.418 2.54932 13.768 2.89998C14.1693 3.30065 14.3413 3.80665 14.4227 4.40665C14.5 4.98398 14.5 5.71932 14.5 6.63065V10.704C14.5 11.6153 14.5 12.3507 14.4227 12.9287C14.3413 13.5287 14.1693 14.034 13.768 14.4353C13.3667 14.8367 12.8613 15.0087 12.2613 15.09C11.6833 15.1673 10.948 15.1673 10.0367 15.1673H5.96333C5.052 15.1673 4.31667 15.1673 3.73867 15.09C3.13867 15.0087 2.63333 14.8367 2.232 14.4353C1.83067 14.034 1.65867 13.5287 1.578 12.9287C1.5 12.3507 1.5 11.6153 1.5 10.704V6.63065C1.5 5.71932 1.5 4.98398 1.578 4.40598C1.658 3.80598 1.83133 3.30065 2.232 2.89932C2.582 2.54932 3.012 2.37265 3.51733 2.27998C3.89333 2.21065 4.33333 2.18465 4.842 2.17398ZM4.84333 3.17398C4.36467 3.18465 3.99533 3.20865 3.698 3.26332C3.32067 3.33265 3.10133 3.44465 2.93933 3.60665C2.75467 3.79132 2.63467 4.04998 2.56867 4.53998C2.50133 5.04265 2.5 5.71065 2.5 6.66732V10.6673C2.5 11.624 2.50133 12.2913 2.56867 12.7953C2.63467 13.2847 2.75533 13.5433 2.93933 13.728C3.124 13.9127 3.38267 14.0327 3.87267 14.0987C4.37533 14.166 5.04333 14.1673 6 14.1673H10C10.9567 14.1673 11.624 14.166 12.128 14.0987C12.6173 14.0327 12.876 13.912 13.0607 13.728C13.2453 13.5433 13.3653 13.2847 13.4313 12.7947C13.4987 12.2913 13.5 11.624 13.5 10.6673V6.66732C13.5 5.71065 13.4987 5.04265 13.4313 4.53932C13.3653 4.04998 13.2447 3.79132 13.0607 3.60665C12.898 3.44465 12.6793 3.33332 12.302 3.26332C12.0047 3.20865 11.6353 3.18465 11.1567 3.17465C11.114 3.53988 10.9387 3.87673 10.664 4.12118C10.3893 4.36564 10.0344 4.50068 9.66667 4.50065H6.33333C5.96552 4.50066 5.61051 4.36553 5.33581 4.12094C5.0611 3.87634 4.88584 3.53934 4.84333 3.17398ZM6.33333 1.83398C6.20073 1.83398 6.07355 1.88666 5.97978 1.98043C5.88601 2.0742 5.83333 2.20138 5.83333 2.33398V3.00065C5.83333 3.27665 6.05733 3.50065 6.33333 3.50065H9.66667C9.79928 3.50065 9.92645 3.44797 10.0202 3.3542C10.114 3.26044 10.1667 3.13326 10.1667 3.00065V2.33398C10.1667 2.20138 10.114 2.0742 10.0202 1.98043C9.92645 1.88666 9.79928 1.83398 9.66667 1.83398H6.33333ZM4.16667 7.00065C4.16667 6.86804 4.21935 6.74087 4.31311 6.6471C4.40688 6.55333 4.53406 6.50065 4.66667 6.50065H5C5.13261 6.50065 5.25979 6.55333 5.35355 6.6471C5.44732 6.74087 5.5 6.86804 5.5 7.00065C5.5 7.13326 5.44732 7.26044 5.35355 7.3542C5.25979 7.44797 5.13261 7.50065 5 7.50065H4.66667C4.53406 7.50065 4.40688 7.44797 4.31311 7.3542C4.21935 7.26044 4.16667 7.13326 4.16667 7.00065ZM6.5 7.00065C6.5 6.86804 6.55268 6.74087 6.64645 6.6471C6.74022 6.55333 6.86739 6.50065 7 6.50065H11.3333C11.4659 6.50065 11.5931 6.55333 11.6869 6.6471C11.7807 6.74087 11.8333 6.86804 11.8333 7.00065C11.8333 7.13326 11.7807 7.26044 11.6869 7.3542C11.5931 7.44797 11.4659 7.50065 11.3333 7.50065H7C6.86739 7.50065 6.74022 7.44797 6.64645 7.3542C6.55268 7.26044 6.5 7.13326 6.5 7.00065ZM4.16667 9.33398C4.16667 9.20138 4.21935 9.0742 4.31311 8.98043C4.40688 8.88666 4.53406 8.83398 4.66667 8.83398H5C5.13261 8.83398 5.25979 8.88666 5.35355 8.98043C5.44732 9.0742 5.5 9.20138 5.5 9.33398C5.5 9.46659 5.44732 9.59377 5.35355 9.68754C5.25979 9.78131 5.13261 9.83398 5 9.83398H4.66667C4.53406 9.83398 4.40688 9.78131 4.31311 9.68754C4.21935 9.59377 4.16667 9.46659 4.16667 9.33398ZM6.5 9.33398C6.5 9.20138 6.55268 9.0742 6.64645 8.98043C6.74022 8.88666 6.86739 8.83398 7 8.83398H11.3333C11.4659 8.83398 11.5931 8.88666 11.6869 8.98043C11.7807 9.0742 11.8333 9.20138 11.8333 9.33398C11.8333 9.46659 11.7807 9.59377 11.6869 9.68754C11.5931 9.78131 11.4659 9.83398 11.3333 9.83398H7C6.86739 9.83398 6.74022 9.78131 6.64645 9.68754C6.55268 9.59377 6.5 9.46659 6.5 9.33398ZM4.16667 11.6673C4.16667 11.5347 4.21935 11.4075 4.31311 11.3138C4.40688 11.22 4.53406 11.1673 4.66667 11.1673H5C5.13261 11.1673 5.25979 11.22 5.35355 11.3138C5.44732 11.4075 5.5 11.5347 5.5 11.6673C5.5 11.7999 5.44732 11.9271 5.35355 12.0209C5.25979 12.1146 5.13261 12.1673 5 12.1673H4.66667C4.53406 12.1673 4.40688 12.1146 4.31311 12.0209C4.21935 11.9271 4.16667 11.7999 4.16667 11.6673ZM6.5 11.6673C6.5 11.5347 6.55268 11.4075 6.64645 11.3138C6.74022 11.22 6.86739 11.1673 7 11.1673H11.3333C11.4659 11.1673 11.5931 11.22 11.6869 11.3138C11.7807 11.4075 11.8333 11.5347 11.8333 11.6673C11.8333 11.7999 11.7807 11.9271 11.6869 12.0209C11.5931 12.1146 11.4659 12.1673 11.3333 12.1673H7C6.86739 12.1673 6.74022 12.1146 6.64645 12.0209C6.55268 11.9271 6.5 11.7999 6.5 11.6673Z" fill="white"/>
                  </svg>

                  Manage Stock
                </ManageStockButton>

                <InventoryDetailIconBtn
                  type="button"
                  aria-label="Edit product"
                  title="Edit"
                  onClick={() => onEditProduct?.(inventoryDetailProduct)}
                >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2.5H4.16667C3.72464 2.5 3.30072 2.67559 2.98816 2.98816C2.67559 3.30072 2.5 3.72464 2.5 4.16667V15.8333C2.5 16.2754 2.67559 16.6993 2.98816 17.0118C3.30072 17.3244 3.72464 17.5 4.16667 17.5H15.8333C16.2754 17.5 16.6993 17.3244 17.0118 17.0118C17.3244 16.6993 17.5 16.2754 17.5 15.8333V10" stroke="#295086" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.3123 2.18769C15.6438 1.85617 16.0934 1.66992 16.5623 1.66992C17.0311 1.66992 17.4807 1.85617 17.8123 2.18769C18.1438 2.51921 18.33 2.96885 18.33 3.43769C18.33 3.90653 18.1438 4.35617 17.8123 4.68769L10.3014 12.1994C10.1035 12.3971 9.85909 12.5418 9.59059 12.6202L7.19642 13.3202C7.12471 13.3411 7.0487 13.3424 6.97634 13.3238C6.90399 13.3053 6.83794 13.2676 6.78512 13.2148C6.73231 13.162 6.69466 13.096 6.67612 13.0236C6.65758 12.9512 6.65884 12.8752 6.67975 12.8035L7.37975 10.4094C7.45852 10.1411 7.60353 9.8969 7.80142 9.69936L15.3123 2.18769Z" stroke="#295086" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>

                </InventoryDetailIconBtn>

                <InventoryDetailIconBtn
                  type="button"
                  aria-label="Delete product"
                  title="Delete"
                  onClick={() => onDeleteProduct?.(inventoryDetailProduct)}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.83301 17.5C5.37468 17.5 4.98246 17.3369 4.65634 17.0108C4.33023 16.6847 4.1669 16.2922 4.16634 15.8333V5C3.93023 5 3.73246 4.92 3.57301 4.76C3.41357 4.6 3.33357 4.40222 3.33301 4.16667C3.33246 3.93111 3.41246 3.73333 3.57301 3.57333C3.73357 3.41333 3.93134 3.33333 4.16634 3.33333H7.49968C7.49968 3.09722 7.57968 2.89944 7.73968 2.74C7.89968 2.58056 8.09746 2.50056 8.33301 2.5H11.6663C11.9025 2.5 12.1005 2.58 12.2605 2.74C12.4205 2.9 12.5002 3.09778 12.4997 3.33333H15.833C16.0691 3.33333 16.2672 3.41333 16.4272 3.57333C16.5872 3.73333 16.6669 3.93111 16.6663 4.16667C16.6658 4.40222 16.5858 4.60028 16.4263 4.76083C16.2669 4.92139 16.0691 5.00111 15.833 5V15.8333C15.833 16.2917 15.67 16.6842 15.3438 17.0108C15.0177 17.3375 14.6252 17.5006 14.1663 17.5H5.83301ZM14.1663 5H5.83301V15.8333H14.1663V5ZM8.92718 13.9275C9.08662 13.7675 9.16634 13.5694 9.16634 13.3333V7.5C9.16634 7.26389 9.08634 7.06611 8.92634 6.90667C8.76634 6.74722 8.56857 6.66722 8.33301 6.66667C8.09746 6.66611 7.89968 6.74611 7.73968 6.90667C7.57968 7.06722 7.49968 7.265 7.49968 7.5V13.3333C7.49968 13.5694 7.57968 13.7675 7.73968 13.9275C7.89968 14.0875 8.09746 14.1672 8.33301 14.1667C8.56857 14.1661 8.76662 14.0869 8.92718 13.9275ZM12.2605 13.9267C12.42 13.7678 12.4997 13.57 12.4997 13.3333V7.5C12.4997 7.26389 12.4197 7.06611 12.2597 6.90667C12.0997 6.74722 11.9019 6.66722 11.6663 6.66667C11.4308 6.66611 11.233 6.74611 11.073 6.90667C10.913 7.06722 10.833 7.265 10.833 7.5V13.3333C10.833 13.5694 10.913 13.7675 11.073 13.9275C11.233 14.0875 11.4308 14.1672 11.6663 14.1667C11.9019 14.1661 12.1 14.0861 12.2605 13.9267Z" fill="#295086"/>
                    </svg>

                </InventoryDetailIconBtn>
              </InventoryDetailActions>
            </InventoryDetailInfo>

            <InventoryDetailMetrics>
              <InventoryDetailMetric>
                <span className="metric-label">Retail Price</span>
                <span className="metric-value">
                  ${Number(inventoryDetailProduct.price || 0).toFixed(2)}
                </span>
              </InventoryDetailMetric>
              <InventoryDetailMetric>
                <span className="metric-label">Cost Price</span>
                <span className="metric-value">
                  ${Number(inventoryDetailProduct.costPrice || 0).toFixed(2)}
                </span>
              </InventoryDetailMetric>
              <InventoryDetailMetric>
                <span className="metric-label">Current Stock</span>
                <span className="metric-value">
                  {Number(inventoryDetailProduct.stock || 0)}{" "}
                  {inventoryDetailProduct.unit || "units"}
                </span>
              </InventoryDetailMetric>
              <InventoryDetailMetric>
                <span className="metric-label">Margin</span>
                <span className="metric-value">
                  {getProductMargin(inventoryDetailProduct)}
                </span>
              </InventoryDetailMetric>
            </InventoryDetailMetrics>

            <InventoryDetailHistoryHeader>
              <div className="history-header-left">
                <h3>Inventory History</h3>
                {renderHistoryTotals(productHistoryTotals)}
              </div>
            </InventoryDetailHistoryHeader>

            <InventoryTableWrap>
              {productHistory.length === 0 ? (
                <EmptyInventory>No inventory history for this product.</EmptyInventory>
              ) : (
                <HistoryTable>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Product Name</th>
                      <th>Qty</th>
                      <th>Reason</th>
                      <th>Stock After</th>
                      <th>Ref / Notes</th>
                    </tr>
                  </thead>
                  <tbody>{renderHistoryTableRows(productHistory)}</tbody>
                </HistoryTable>
              )}
            </InventoryTableWrap>
          </InventoryDetailCard>
        </InventoryDetailPage>

        <LogInventoryModal
          show={showLogInventoryModal}
          product={inventoryDetailProduct}
          onHide={() => setShowLogInventoryModal(false)}
          onSuccess={handleLogInventorySuccess}
        />
      </>
    );
  }

  return (
    <InventoryHistoryCard>
      {loading && historyRows.length === 0 ? (
        <HistoryTableSkeleton />
      ) : historyRows.length === 0 ? (
        <InventoryTableWrap>
          <EmptyInventory>No inventory history found.</EmptyInventory>
        </InventoryTableWrap>
      ) : (
        <InfiniteScroll
          dataLength={historyRows.length}
          next={loadMore}
          hasMore={hasMore}
          // loader={
          //   <div style={{ textAlign: "center", padding: "16px 0" }}>
          //     Loading more history...
          //   </div>
          // }
        >
          <InventoryTableWrap>
            <HistoryTable>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Product Name</th>
                  <th>Qty</th>
                  <th>Reason</th>
                  <th>Stock After</th>
                  <th>Ref / Notes</th>
                </tr>
              </thead>
              <tbody>
                {renderHistoryTableRows(historyRows, { clickable: true })}
              </tbody>
            </HistoryTable>
          </InventoryTableWrap>
        </InfiniteScroll>
      )}
    </InventoryHistoryCard>
  );
}
