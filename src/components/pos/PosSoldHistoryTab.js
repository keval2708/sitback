"use client";

import React, { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";
import { API_ROUTER } from "@/services/apiRouter";
import {
  CustomerName,
  CustomerPhone,
  EmptyState,
  ItemList,
  ItemRow,
  MoreItemsTag,
  PaymentBadge,
  SoldHistoryContainer,
  SoldHistoryTable,
  SoldHistoryTableWrapper,
  TotalAmount,
  TransactionDate,
} from "@/styles/pages/pos-product-list.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS } from "@/utils/constants";

const PAGE_LIMIT = 10;
const VISIBLE_ITEMS = 2;

const extractRows = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.list)) return payload.list;
  if (Array.isArray(payload?.rows)) return payload.rows;
  if (Array.isArray(payload?.history)) return payload.history;
  if (Array.isArray(payload?.orders)) return payload.orders;
  return [];
};

const formatDate = (value) => {
  if (!value) return "-";
  if (typeof value === "string" && Number.isNaN(Number(value))) {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toLocaleString();
    }
    return value;
  }
  const num = Number(value);
  if (!Number.isFinite(num)) return String(value);
  const ms = String(Math.trunc(num)).length > 10 ? num : num * 1000;
  const date = new Date(ms);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString();
};

const normalizeSaleItem = (item = {}) => ({
  name:
    item.name ??
    item.productName ??
    item.product_name ??
    item.title ??
    "",
  qty: Number(item.qty ?? item.quantity ?? item.count ?? 1),
});

const normalizeSaleRow = (item = {}) => {
  const rawItems = Array.isArray(item.items)
    ? item.items
    : Array.isArray(item.products)
      ? item.products
      : Array.isArray(item.cartItems)
        ? item.cartItems
        : Array.isArray(item.orderItems)
          ? item.orderItems
          : [];

  const items = rawItems.map(normalizeSaleItem).filter((row) => row.name);
  const visibleItems = items.slice(0, VISIBLE_ITEMS);
  const moreItemsCount = Math.max(items.length - visibleItems.length, 0);

  const customer =
    item.customer ??
    item.customerName ??
    item.customer_name ??
    item.username ??
    item.name ??
    item.user?.username ??
    item.user?.name ??
    "-";

  const phone =
    item.phone ??
    item.customerPhone ??
    item.customer_phone ??
    item.mobile ??
    item.user?.phone ??
    "-";

  return {
    id: item.id ?? item.orderId ?? item.order_id ?? item._id ?? item.saleId,
    customer,
    phone,
    items: visibleItems,
    moreItemsCount,
    paymentMethod:
      item.payment_by  == "card" ? "Card" : item.payment_by  == "cash" ? "Cash" : item.payment_by  == "bank" ? "Bank" : item.payment_by  == "online" ? "Online" : "-",
    date: formatDate(
      item.createdAt ?? "-"
    ),
    total: Number(
      item.totalAmount  ?? 0
    ),
  };
};

const HistoryTableSkeleton = () => (
  <SoldHistoryTableWrapper>
    <SoldHistoryTable>
      <thead>
        <tr>
          <th>Customer</th>
          <th>Phone</th>
          <th>Items</th>
          <th>Payment</th>
          <th>Date</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 6 }).map((_, index) => (
          <tr key={`sold-history-skeleton-${index}`}>
            <td>
              <Skeleton width={120} height={14} />
            </td>
            <td>
              <Skeleton width={100} height={14} />
            </td>
            <td>
              <Skeleton width={160} height={14} />
            </td>
            <td>
              <Skeleton width={70} height={22} borderRadius={12} />
            </td>
            <td>
              <Skeleton width={130} height={14} />
            </td>
            <td>
              <Skeleton width={60} height={14} />
            </td>
          </tr>
        ))}
      </tbody>
    </SoldHistoryTable>
  </SoldHistoryTableWrapper>
);

export default function PosSoldHistoryTab({ searchProduct = "" }) {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchHistory = useCallback(
    async (pageNum, isCancelled = () => false) => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.set("page", String(pageNum));
        params.set("limit", String(PAGE_LIMIT));
        params.set("search", searchProduct?.trim() || "");

        const res = await axiosApiCall.get(
          `${API_ROUTER?.POS_SALES_HISTORY_LIST}?${params.toString()}`
        );
        console.log("sales history list", res);
        if (isCancelled()) return;

        if (!res?.data?.status) {
          if (pageNum === 1) {
            setRows([]);
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
          .map(normalizeSaleRow)
          .filter((row) => row.id != null);

        setRows((prev) => {
          if (pageNum === 1) return list;
          const ids = new Set(prev.map((row) => String(row.id)));
          return [...prev, ...list.filter((row) => !ids.has(String(row.id)))];
        });

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
      } catch {
        if (!isCancelled()) {
          toast.error(TOAST_ALERTS.GENERAL_ERROR, { autoClose: 2000 });
          setHasMore(false);
        }
      } finally {
        if (!isCancelled()) setLoading(false);
      }
    },
    [searchProduct]
  );

  useEffect(() => {
    setRows([]);
    setHasMore(true);
    setPage(1);
  }, [searchProduct]);

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

  return (
    <SoldHistoryContainer>
      {loading && rows.length === 0 ? (
        <HistoryTableSkeleton />
      ) : rows.length === 0 ? (
        <EmptyState>
          <p>No sold history records found matching your search.</p>
        </EmptyState>
      ) : (
        <InfiniteScroll
          dataLength={rows.length}
          next={loadMore}
          hasMore={hasMore}
          // loader={
          //   <div style={{ textAlign: "center", padding: "16px 0" }}>
          //     Loading more history...
          //   </div>
          // }
        >
          <SoldHistoryTableWrapper>
            <SoldHistoryTable>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Items</th>
                  <th>Payment</th>
                  <th>Date</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <CustomerName>{row.customer}</CustomerName>
                    </td>
                    <td>
                      <CustomerPhone>{row.phone}</CustomerPhone>
                    </td>
                    <td>
                      <ItemList>
                        {row.items.map((item, idx) => (
                          <ItemRow key={`${row.id}-item-${idx}`}>
                            {item.name} × {item.qty}
                          </ItemRow>
                        ))}
                        {row.moreItemsCount > 0 && (
                          <MoreItemsTag>+{row.moreItemsCount} more</MoreItemsTag>
                        )}
                      </ItemList>
                    </td>
                    <td>
                      <PaymentBadge>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.875 4.15625C0.875 3.63411 1.08242 3.13335 1.45163 2.76413C1.82085 2.39492 2.32161 2.1875 2.84375 2.1875H11.1562C11.6784 2.1875 12.1792 2.39492 12.5484 2.76413C12.9176 3.13335 13.125 3.63411 13.125 4.15625V9.84375C13.125 10.3659 12.9176 10.8667 12.5484 11.2359C12.1792 11.6051 11.6784 11.8125 11.1562 11.8125H2.84375C2.32161 11.8125 1.82085 11.6051 1.45163 11.2359C1.08242 10.8667 0.875 10.3659 0.875 9.84375V4.15625ZM2.84375 3.0625C2.55367 3.0625 2.27547 3.17773 2.07035 3.38285C1.86523 3.58797 1.75 3.86617 1.75 4.15625V4.8125H12.25V4.15625C12.25 3.86617 12.1348 3.58797 11.9296 3.38285C11.7245 3.17773 11.4463 3.0625 11.1562 3.0625H2.84375ZM1.75 9.84375C1.75 10.1338 1.86523 10.412 2.07035 10.6171C2.27547 10.8223 2.55367 10.9375 2.84375 10.9375H11.1562C11.4463 10.9375 11.7245 10.8223 11.9296 10.6171C12.1348 10.412 12.25 10.1338 12.25 9.84375V5.6875H1.75V9.84375ZM9.1875 8.3125H10.5C10.616 8.3125 10.7273 8.35859 10.8094 8.44064C10.8914 8.52269 10.9375 8.63397 10.9375 8.75C10.9375 8.86603 10.8914 8.97731 10.8094 9.05936C10.7273 9.14141 10.616 9.1875 10.5 9.1875H9.1875C9.07147 9.1875 8.96019 9.14141 8.87814 9.05936C8.79609 8.97731 8.75 8.86603 8.75 8.75C8.75 8.63397 8.79609 8.52269 8.87814 8.44064C8.96019 8.35859 9.07147 8.3125 9.1875 8.3125Z"
                            fill="#007BFF"
                          />
                        </svg>
                        {row.paymentMethod}
                      </PaymentBadge>
                    </td>
                    <td>
                      <TransactionDate>{row.date}</TransactionDate>
                    </td>
                    <td>
                      <TotalAmount>${Number(row.total || 0).toFixed(2)}</TotalAmount>
                    </td>
                  </tr>
                ))}
              </tbody>
            </SoldHistoryTable>
          </SoldHistoryTableWrapper>
        </InfiniteScroll>
      )}
    </SoldHistoryContainer>
  );
}
