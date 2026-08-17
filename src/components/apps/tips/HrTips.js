"use client";

import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import InlineSVG from "svg-inline-react";
import RecordTipModal from "@/components/apps/tips/RecordTipModal";
import RequestWithdrawalModal from "@/components/apps/tips/RequestWithdrawalModal";
import { API_ROUTER } from "@/services/apiRouter";
import {
  HrAvatar,
  HrEmployeeGrid,
  HrEmptyState,
  HrFilterTab,
  HrFilterTabs,
  HrHeaderActions,
  HrHeaderOutlineButton,
  HrMetricsGrid,
  HrNameCell,
  HrPageHeader,
  HrPageTitleBlock,
  HrPill,
  HrPrimaryButton,
  HrStatCard,
  HrTable,
  HrTableCard,
  HrTableWrap,
  HrTipTherapistCard,
  HrTipTherapistHeader,
  HrTipTherapistStats,
} from "@/styles/pages/hr-module.style";
import axiosApiCall from "@/utils/axios";

const PLUS_ICON = `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.33333 5.33333H5.33333V9.33333H4V5.33333H0V4H4V0H5.33333V4H9.33333V5.33333Z" fill="white"/></svg>`;

const WITHDRAW_ICON = `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.5 17C3.8 17 0 13.2 0 8.5C0 3.8 3.8 0 8.5 0C13.2 0 17 3.8 17 8.5C17 13.2 13.2 17 8.5 17ZM8.5 1C4.35 1 1 4.35 1 8.5C1 12.65 4.35 16 8.5 16C12.65 16 16 12.65 16 8.5C16 4.35 12.65 1 8.5 1Z" fill="#295086"/>
<path d="M12.6484 9.35078L8.49844 5.20078L4.34844 9.35078L3.64844 8.65078L8.49844 3.80078L13.3484 8.65078L12.6484 9.35078Z" fill="#295086"/>
<path d="M8 4.5H9V13H8V4.5Z" fill="#295086"/>
</svg>
`;

const STAT_ICONS = {
  total: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M20 14V26M23 17.5C23 16.12 21.657 15 20 15C18.343 15 17 16.12 17 17.5C17 18.88 18.343 20 20 20C21.657 20 23 21.12 23 22.5C23 23.88 21.657 25 20 25C18.343 25 17 23.88 17 22.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
<path d="M15 11.338C16.5194 10.4587 18.2445 9.99712 20 10C25.523 10 30 14.477 30 20C30 25.523 25.523 30 20 30C14.477 30 10 25.523 10 20C10 18.179 10.487 16.47 11.338 15" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,
  withdrawn: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M28.5 26.586V30.4407C28.5 30.589 28.4403 30.7313 28.334 30.8362C28.2278 30.9411 28.0836 31 27.9333 31C27.783 31 27.6389 30.9411 27.5326 30.8362C27.4264 30.7313 27.3667 30.589 27.3667 30.4407V26.586C27.3634 25.5325 27.1247 24.4928 26.6676 23.5408C26.2105 22.5888 25.5462 21.7481 24.7222 21.0786V26.9272C24.7215 27.0471 24.6818 27.1635 24.6089 27.2594C24.536 27.3553 24.4339 27.4256 24.3175 27.4598C24.2011 27.4941 24.0767 27.4905 23.9625 27.4497C23.8483 27.4088 23.7505 27.3329 23.6833 27.233L22.6747 25.7135C22.6688 25.7048 22.6634 25.6957 22.6586 25.6864C22.4849 25.3857 22.1973 25.1653 21.859 25.0739C21.5207 24.9825 21.1594 25.0274 20.8547 25.1989C20.55 25.3704 20.3268 25.6543 20.2342 25.9882C20.1415 26.3221 20.1871 26.6786 20.3608 26.9794L22.4556 30.134C22.5258 30.2574 22.5461 30.4025 22.5122 30.5401C22.4783 30.6777 22.3929 30.7974 22.273 30.8753C22.1532 30.9531 22.008 30.9832 21.8666 30.9594C21.7252 30.9357 21.5981 30.8599 21.5111 30.7474L19.4088 27.5779C19.4031 27.5686 19.3974 27.5602 19.3927 27.5508C19.0988 27.0038 19.0281 26.3664 19.1953 25.7695C19.3625 25.1726 19.7548 24.6615 20.2917 24.3411C20.8286 24.0208 21.4694 23.9154 22.0825 24.0466C22.6957 24.1779 23.2347 24.5358 23.5889 25.0469V14.0339C23.5889 13.9845 23.569 13.937 23.5336 13.9021C23.4981 13.8671 23.4501 13.8475 23.4 13.8475H21.8889C21.7386 13.8475 21.5945 13.7885 21.4882 13.6836C21.3819 13.5787 21.3222 13.4365 21.3222 13.2881C21.3222 13.1398 21.3819 12.9975 21.4882 12.8926C21.5945 12.7877 21.7386 12.7288 21.8889 12.7288H23.4C23.7507 12.7288 24.087 12.8663 24.335 13.1111C24.5829 13.3558 24.7222 13.6878 24.7222 14.0339V19.6914C25.8795 20.4436 26.8302 21.4669 27.4894 22.6699C28.1485 23.8729 28.4958 25.2183 28.5 26.586ZM14.9 13.2881C14.9 13.1398 14.8403 12.9975 14.734 12.8926C14.6278 12.7877 14.4836 12.7288 14.3333 12.7288H12.8222C12.4715 12.7288 12.1352 12.8663 11.8873 13.1111C11.6393 13.3558 11.5 13.6878 11.5 14.0339V26.7119C11.5 26.8602 11.5597 27.0025 11.666 27.1074C11.7722 27.2123 11.9164 27.2712 12.0667 27.2712C12.217 27.2712 12.3611 27.2123 12.4674 27.1074C12.5736 27.0025 12.6333 26.8602 12.6333 26.7119V14.0339C12.6333 13.9845 12.6532 13.937 12.6887 13.9021C12.7241 13.8671 12.7721 13.8475 12.8222 13.8475H14.3333C14.4836 13.8475 14.6278 13.7885 14.734 13.6836C14.8403 13.5787 14.9 13.4365 14.9 13.2881ZM21.5338 17.3675C21.4275 17.2627 21.2835 17.2039 21.1333 17.2039C20.9832 17.2039 20.8391 17.2627 20.7329 17.3675L18.6778 19.395V9.55932C18.6778 9.41098 18.6181 9.26871 18.5118 9.16382C18.4055 9.05893 18.2614 9 18.1111 9C17.9608 9 17.8167 9.05893 17.7104 9.16382C17.6041 9.26871 17.5444 9.41098 17.5444 9.55932V19.395L15.4893 17.3675C15.3819 17.2687 15.2398 17.2149 15.093 17.2174C14.9462 17.22 14.8062 17.2787 14.7023 17.3812C14.5985 17.4836 14.539 17.6219 14.5364 17.7668C14.5339 17.9117 14.5883 18.0519 14.6884 18.158L17.7107 21.141C17.8169 21.2458 17.9609 21.3046 18.1111 21.3046C18.2613 21.3046 18.4053 21.2458 18.5116 21.141L21.5338 18.158C21.6399 18.0531 21.6995 17.9109 21.6995 17.7627C21.6995 17.6145 21.6399 17.4723 21.5338 17.3675Z" fill="white"/>
</svg>`,
  available: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.9918 11.5H21.0314C22.8267 11.5 24.2488 11.5 25.3613 11.6486C26.5061 11.8021 27.433 12.1246 28.1646 12.8513C29.0671 13.7498 29.3553 14.9525 29.4598 16.5135C30.0233 16.7593 30.4492 17.281 30.4951 17.9415C30.5 18.0008 30.5 18.0639 30.5 18.1222V21.8778C30.5 21.9361 30.5 21.9992 30.4961 22.0575C30.4492 22.7181 30.0233 23.2407 29.4598 23.4874C29.3553 25.0475 29.0671 26.2502 28.1646 27.1487C27.433 27.8754 26.5061 28.1979 25.3613 28.3514C24.2479 28.5 22.8267 28.5 21.0314 28.5H17.9918C16.1966 28.5 14.7744 28.5 13.6619 28.3514C12.5172 28.1979 11.5902 27.8754 10.8587 27.1487C10.128 26.4211 9.80377 25.4993 9.64944 24.3607C9.5 23.2533 9.5 21.8399 9.5 20.0544V19.9456C9.5 18.1601 9.5 16.7457 9.64944 15.6393C9.80377 14.5007 10.128 13.5789 10.8587 12.8513C11.5902 12.1246 12.5172 11.8021 13.6619 11.6486C14.7754 11.5 16.1966 11.5 17.9918 11.5ZM27.978 23.6429H26.0851C23.99 23.6429 22.1967 22.0614 22.1967 20C22.1967 17.9386 23.99 16.3571 26.0841 16.3571H27.9771C27.8657 15.0545 27.6147 14.3657 27.1273 13.8819C26.7141 13.471 26.1476 13.2243 25.165 13.0931C24.1619 12.9591 22.8384 12.9571 20.9758 12.9571H18.0455C16.1829 12.9571 14.8604 12.9591 13.8553 13.0931C12.8737 13.2243 12.3072 13.471 11.894 13.8819C11.4808 14.2929 11.2337 14.8563 11.1019 15.8326C10.9671 16.8312 10.9651 18.1465 10.9651 19.999C10.9651 21.8515 10.9671 23.1678 11.1019 24.1665C11.2337 25.1427 11.4818 25.7062 11.895 26.1171C12.3081 26.528 12.8747 26.7747 13.8573 26.9059C14.8613 27.0399 16.1839 27.0419 18.0465 27.0419H20.9767C22.8394 27.0419 24.1629 27.0399 25.167 26.9059C26.1486 26.7747 26.7151 26.528 27.1283 26.1171C27.6157 25.6333 27.8667 24.9455 27.978 23.6419M13.407 16.1143C13.407 15.9211 13.4842 15.7357 13.6215 15.5991C13.7589 15.4625 13.9452 15.3857 14.1395 15.3857H18.0465C18.2408 15.3857 18.4271 15.4625 18.5645 15.5991C18.7019 15.7357 18.7791 15.9211 18.7791 16.1143C18.7791 16.3075 18.7019 16.4928 18.5645 16.6295C18.4271 16.7661 18.2408 16.8429 18.0465 16.8429H14.1395C13.9452 16.8429 13.7589 16.7661 13.6215 16.6295C13.4842 16.4928 13.407 16.3075 13.407 16.1143ZM28.7165 17.8143H26.0851C24.6942 17.8143 23.6618 18.843 23.6618 20C23.6618 21.157 24.6942 22.1857 26.0841 22.1857H28.7389C28.9401 22.1731 29.0271 22.0381 29.0339 21.9565V18.0435C29.0271 17.9619 28.9401 17.8269 28.7389 17.8153L28.7165 17.8143Z" fill="white"/>
</svg>`,
  pending: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M20 10C22.7848 10 25.4555 11.0536 27.4246 12.9289C29.3938 14.8043 30.5 17.3478 30.5 20C30.5 22.6522 29.3938 25.1957 27.4246 27.0711C25.4555 28.9464 22.7848 30 20 30C17.2152 30 14.5445 28.9464 12.5754 27.0711C10.6062 25.1957 9.5 22.6522 9.5 20C9.5 17.3478 10.6062 14.8043 12.5754 12.9289C14.5445 11.0536 17.2152 10 20 10ZM20 11.0526C17.5084 11.0526 15.1188 11.9953 13.3569 13.6733C11.5951 15.3512 10.6053 17.627 10.6053 20C10.6053 22.373 11.5951 24.6488 13.3569 26.3267C15.1188 28.0047 17.5084 28.9474 20 28.9474C21.2337 28.9474 22.4554 28.7159 23.5952 28.2663C24.735 27.8166 25.7707 27.1576 26.6431 26.3267C27.5155 25.4959 28.2075 24.5096 28.6796 23.424C29.1517 22.3385 29.3947 21.175 29.3947 20C29.3947 17.627 28.4049 15.3512 26.6431 13.6733C24.8812 11.9953 22.4916 11.0526 20 11.0526ZM19.4474 14.2105H20.5526V19.9158L25.7474 22.7684L25.1947 23.6842L19.4474 20.5263V14.2105Z" fill="white"/>
</svg>`,
};

const FILTER_KEYS = {
  summary: "summary",
  history: "history",
  withdrawals: "withdrawals",
};

const PAGE_LIMIT = 10;
const HISTORY_SCROLL_ID = "hr-tips-history-scroll";
const WITHDRAWALS_SCROLL_ID = "hr-tips-withdrawals-scroll";
const PAYOUT_STATUS = {
  withdrawals: "paid",
};
const AVATAR_COLORS = [
  "#295086",
  "#E8622C",
  "#12A150",
  "#9333EA",
  "#E5A50A",
  "#4F9CFF",
  "#3B67A3",
  "#C45C26",
];

const formatCurrency = (value) =>
  `$${Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;

const extractRows = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.list)) return payload.list;
  if (Array.isArray(payload?.rows)) return payload.rows;
  if (Array.isArray(payload?.employees)) return payload.employees;
  if (Array.isArray(payload?.therapists)) return payload.therapists;
  if (Array.isArray(payload?.summary)) return payload.summary;
  if (Array.isArray(payload?.tips)) return payload.tips;
  if (Array.isArray(payload?.history)) return payload.history;
  return [];
};

const formatDateValue = (value) => {
  if (!value) return "-";
  const parsed = moment(value);
  return parsed.isValid() ? parsed.format("YYYY-MM-DD") : String(value);
};

const capitalize = (value = "") => {
  const text = String(value).trim();
  if (!text) return "-";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const normalizeTipStatusTone = (value, isWithdrawal = false) => {
  const key = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");
  if (["paid", "processed", "withdrawn"].includes(key)) {
    return isWithdrawal ? "withdraw-processed" : "withdrawn";
  }
  if (key === "pending") return "pending";
  if (key === "available" || key === "unpaid") return "available";
  return key || (isWithdrawal ? "withdraw-processed" : "available");
};

const getEmployeeName = (item = {}) => {
  const employee =
    typeof item.employee === "object" && item.employee ? item.employee : null;
  return (
    item.employeeName ||
    item.employee_name ||
    item.therapistName ||
    item.therapist_name ||
    item.name ||
    item.fullName ||
    (typeof item.employee === "string" ? item.employee : "") ||
    employee?.name ||
    employee?.fullName ||
    [employee?.firstName, employee?.lastName].filter(Boolean).join(" ") ||
    item.therapist?.name ||
    "Therapist"
  );
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "T";

const normalizeTherapistSummary = (item = {}, index = 0) => {
  const id =
    item.id ??
    item._id ??
    item.employeeId ??
    item.employee_id ??
    item.employee?.id ??
    `therapist-${index}`;
  const name = getEmployeeName(item);

  return {
    id,
    name,
    initials: getInitials(name),
    avatarBg: AVATAR_COLORS[Number(id || index) % AVATAR_COLORS.length],
    tipCount: Number(item.totalTrips ?? item.tipCount ?? item.tipsCount ?? 0),
    totalTips: Number(
      item.totalEarnedTips ?? item.totalTips ?? item.totalTipAmount ?? 0
    ),
    withdrawn: Number(
      item.totalWithdrawnTips ?? item.withdrawn ?? item.withdrawnAmount ?? 0
    ),
    available: Number(
      item.availableTips ?? item.available ?? item.availableBalance ?? 0
    ),
  };
};

const normalizeTipHistoryRow = (item = {}, index = 0, isWithdrawal = false) => {
  const id = item.id ?? item._id ?? `tip-${index}`;
  const name = getEmployeeName(item);
  const methodValue = item.tipType || item.paymentMethod || item.method || "";
  const statusValue =
    item.payoutStatus || item.status || item.tipStatus || (isWithdrawal ? "paid" : "available");

  return {
    id,
    employeeId: item.employeeId ?? item.employee_id ?? item.employee?.id,
    employee: name,
    initials: getInitials(name),
    avatarBg: AVATAR_COLORS[Number(id || index) % AVATAR_COLORS.length],
    amount: Number(item.tipAmount ?? item.amount ?? 0),
    method: capitalize(methodValue),
    methodTone: String(methodValue || "").toLowerCase() || "card",
    date: formatDateValue(item.paidAt || item.tipDate || item.date),
    customer: item.customerName || item.customer || "-",
    payout: capitalize(item.payoutType || item.payoutOption || item.payout || "-"),
    status: capitalize(statusValue),
    statusTone: normalizeTipStatusTone(statusValue, isWithdrawal),
    requestDate: formatDateValue(
      item.requestDate || item.requestedAt || item.paidAt || item.createdAt
    ),
    processedDate: formatDateValue(
      item.processedDate || item.processedAt || item.paidAt || item.updatedAt
    ),
  };
};

export default function HrTips() {
  const [activeFilter, setActiveFilter] = useState(FILTER_KEYS.summary);
  const [tipHistory, setTipHistory] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [recordTipModalOpen, setRecordTipModalOpen] = useState(false);
  const [therapists, setTherapists] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listVersion, setListVersion] = useState(0);

  const appendRows = (setter, pageNum, list) => {
    setter((prev) => {
      if (pageNum === 1) return list;
      const existingIds = new Set(prev.map((row) => String(row.id)));
      return [
        ...prev,
        ...list.filter((row) => !existingIds.has(String(row.id))),
      ];
    });
  };

  const fetchTherapistSummary = useCallback(
    async (pageNum, isCancelled = () => false) => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.set("page", String(pageNum));
        params.set("limit", String(PAGE_LIMIT));

        const res = await axiosApiCall.get(
          `${API_ROUTER?.HR_EMPLOYEE_TIPS_SUMMARY}?${params.toString()}`
        );
        console.log("res summary", res);
        if (isCancelled()) return;

        const resData = res?.data ?? {};
        const list = extractRows(resData).map(normalizeTherapistSummary);
        appendRows(setTherapists, pageNum, list);
        setHasMore(Boolean(resData?.isNextPage ?? false));
      } catch {
        if (!isCancelled() && pageNum === 1) {
          setTherapists([]);
          setHasMore(false);
        }
      } finally {
        if (!isCancelled()) setLoading(false);
      }
    },
    []
  );

  const fetchTipsHistory = useCallback(
    async (pageNum, payoutStatus, isCancelled = () => false) => {
      const setter =
        payoutStatus === PAYOUT_STATUS.withdrawals
          ? setWithdrawals
          : setTipHistory;

      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.set("page", String(pageNum));
        params.set("limit", String(PAGE_LIMIT));
        if (payoutStatus) params.set("payoutStatus", payoutStatus);

        const res = await axiosApiCall.get(
          `${API_ROUTER?.HR_TIPS_HISTORY}?${params.toString()}`
        );
        console.log("res history", res);
        if (isCancelled()) return;

        const resData = res?.data ?? {};
        const isWithdrawal = payoutStatus === PAYOUT_STATUS.withdrawals;
        const list = extractRows(resData).map((item, index) =>
          normalizeTipHistoryRow(item, index, isWithdrawal)
        );
        appendRows(setter, pageNum, list);
        setHasMore(Boolean(resData?.isNextPage ?? false));
      } catch {
        if (!isCancelled() && pageNum === 1) {
          setter([]);
          setHasMore(false);
        }
      } finally {
        if (!isCancelled()) setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    let cancelled = false;

    if (activeFilter === FILTER_KEYS.summary) {
      fetchTherapistSummary(page, () => cancelled);
    } else if (activeFilter === FILTER_KEYS.history) {
      fetchTipsHistory(page, null, () => cancelled);
    } else if (activeFilter === FILTER_KEYS.withdrawals) {
      fetchTipsHistory(page, PAYOUT_STATUS.withdrawals, () => cancelled);
    }

    return () => {
      cancelled = true;
    };
  }, [activeFilter, fetchTherapistSummary, fetchTipsHistory, listVersion, page]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, loading]);

  const handleTabChange = (tabKey) => {
    if (tabKey === activeFilter) return;
    setActiveFilter(tabKey);
    setPage(1);
    setHasMore(false);
    if (tabKey === FILTER_KEYS.summary) setTherapists([]);
    if (tabKey === FILTER_KEYS.history) setTipHistory([]);
    if (tabKey === FILTER_KEYS.withdrawals) setWithdrawals([]);
  };

  const stats = useMemo(() => {
    const totalTips = therapists.reduce((sum, item) => sum + item.totalTips, 0);
    const withdrawn = therapists.reduce((sum, item) => sum + item.withdrawn, 0);
    const available = therapists.reduce((sum, item) => sum + item.available, 0);
    const pending = withdrawals.filter(
      (item) => item.statusTone === "pending"
    ).length;

    return [
      {
        label: "Total Tips",
        value: formatCurrency(totalTips),
        icon: STAT_ICONS.total,
      },
      {
        label: "Withdrawn",
        value: formatCurrency(withdrawn),
        icon: STAT_ICONS.withdrawn,
      },
      {
        label: "Available Balance",
        value: formatCurrency(available),
        icon: STAT_ICONS.available,
      },
      {
        label: "Pending Withdrawals",
        value: pending,
        icon: STAT_ICONS.pending,
      },
    ];
  }, [therapists, withdrawals]);

  const filterTabs = [
    { key: FILTER_KEYS.summary, label: "Therapist Summary" },
    { key: FILTER_KEYS.history, label: "Tip History" },
    { key: FILTER_KEYS.withdrawals, label: "Withdrawals" },
  ];

  const handleRecordTip = () => {
    setTipHistory([]);
    setActiveFilter(FILTER_KEYS.history);
    setPage(1);
    setListVersion((prev) => prev + 1);
  };

  const handleRequestWithdrawal = () => {
    setWithdrawals([]);
    setActiveFilter(FILTER_KEYS.withdrawals);
    setPage(1);
    setListVersion((prev) => prev + 1);
  };

  return (
    <>
      <HrPageHeader $inline $banded>
        <HrPageTitleBlock $inline>
          <h1>Tip Management</h1>
          <p>Track therapist tips, payouts, and withdrawals</p>
        </HrPageTitleBlock>
        <HrHeaderActions>
          <HrHeaderOutlineButton
            type="button"
            onClick={() => setWithdrawModalOpen(true)}
          >
            Request Withdraw
            <InlineSVG src={WITHDRAW_ICON} />
          </HrHeaderOutlineButton>
          <HrPrimaryButton
            type="button"
            onClick={() => setRecordTipModalOpen(true)}
          >
            <InlineSVG src={PLUS_ICON} />
            Add Tip
          </HrPrimaryButton>
        </HrHeaderActions>
      </HrPageHeader>

      <HrMetricsGrid>
        {stats.map((stat) => (
          <HrStatCard key={stat.label}>
            <div className="stat-top">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-icon">
                <InlineSVG src={stat.icon} />
              </span>
            </div>
            <span className="stat-value">{stat.value}</span>
          </HrStatCard>
        ))}
      </HrMetricsGrid>

      <HrFilterTabs>
        {filterTabs.map((tab) => (
          <HrFilterTab
            key={tab.key}
            type="button"
            $active={activeFilter === tab.key}
            onClick={() => handleTabChange(tab.key)}
          >
            {tab.label}
          </HrFilterTab>
        ))}
      </HrFilterTabs>

      {activeFilter === FILTER_KEYS.summary ? (
        <InfiniteScroll
          dataLength={therapists.length}
          next={loadMore}
          hasMore={hasMore}
          loader={
            <div
              style={{
                textAlign: "center",
                padding: "12px 0",
                color: "#8391A1",
              }}
            >
              Loading more...
            </div>
          }
        >
          <HrEmployeeGrid>
            {loading && page === 1 && !therapists.length
              ? Array.from({ length: 6 }).map((_, index) => (
                  <HrTipTherapistCard key={`skeleton-${index}`}>
                    <HrTipTherapistHeader>
                      <Skeleton circle width={48} height={48} />
                      <div style={{ flex: 1 }}>
                        <Skeleton width="60%" height={18} />
                        <Skeleton width="40%" height={14} />
                      </div>
                    </HrTipTherapistHeader>
                    <Skeleton height={14} style={{ marginBottom: 8 }} />
                    <Skeleton height={14} style={{ marginBottom: 8 }} />
                    <Skeleton height={14} />
                  </HrTipTherapistCard>
                ))
              : therapists.map((therapist) => (
                  <HrTipTherapistCard key={therapist.id}>
                    <HrTipTherapistHeader>
                      <HrAvatar $bg={therapist.avatarBg} $size="lg">
                        {therapist.initials}
                      </HrAvatar>
                      <div>
                        <h3 className="tip-name">{therapist.name}</h3>
                        <p className="tip-count">
                          {therapist.tipCount} tip(s) collected
                        </p>
                      </div>
                    </HrTipTherapistHeader>
                    <HrTipTherapistStats>
                      <div className="tip-stat-row">
                        <span className="tip-stat-label">Total Tips</span>
                        <span className="tip-stat-value">
                          {formatCurrency(therapist.totalTips)}
                        </span>
                      </div>
                      <div className="tip-stat-row">
                        <span className="tip-stat-label">Withdrawn</span>
                        <span className="tip-stat-value">
                          {formatCurrency(therapist.withdrawn)}
                        </span>
                      </div>
                      <div className="tip-stat-row">
                        <span className="tip-stat-label">Available</span>
                        <span className="tip-stat-value">
                          {formatCurrency(therapist.available)}
                        </span>
                      </div>
                    </HrTipTherapistStats>
                  </HrTipTherapistCard>
                ))}
            {!loading && !therapists.length && (
              <HrEmptyState>No therapist tip summaries found.</HrEmptyState>
            )}
          </HrEmployeeGrid>
        </InfiniteScroll>
      ) : null}

      {activeFilter === FILTER_KEYS.history ? (
        <HrTableCard>
          <HrTableWrap
            id={HISTORY_SCROLL_ID}
            style={{ maxHeight: "60vh", overflow: "auto" }}
          >
            <InfiniteScroll
              dataLength={tipHistory.length}
              next={loadMore}
              hasMore={hasMore}
              scrollableTarget={HISTORY_SCROLL_ID}
              loader={
                <div
                  style={{
                    textAlign: "center",
                    padding: "12px 0",
                    color: "#8391A1",
                  }}
                >
                  Loading more...
                </div>
              }
            >
              <HrTable>
                <thead>
                  <tr>
                    <th>Therapist</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Payout</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && page === 1 && !tipHistory.length
                    ? Array.from({ length: 6 }).map((_, index) => (
                        <tr key={`history-skeleton-${index}`}>
                          {Array.from({ length: 7 }).map((__, colIndex) => (
                            <td key={colIndex}>
                              <Skeleton width={colIndex === 0 ? 140 : 80} height={16} />
                            </td>
                          ))}
                        </tr>
                      ))
                    : tipHistory.map((row) => (
                        <tr key={row.id}>
                          <td>
                            <HrNameCell>
                              <HrAvatar $bg={row.avatarBg}>{row.initials}</HrAvatar>
                              {row.employee}
                            </HrNameCell>
                          </td>
                          <td>{formatCurrency(row.amount)}</td>
                          <td>
                            <HrPill $tone={row.methodTone}>{row.method}</HrPill>
                          </td>
                          <td>{row.date}</td>
                          <td>{row.customer}</td>
                          <td>{row.payout}</td>
                          <td>
                            <HrPill $tone={row.statusTone}>{row.status}</HrPill>
                          </td>
                        </tr>
                      ))}
                  {!loading && !tipHistory.length && (
                    <tr>
                      <td
                        colSpan={7}
                        style={{ textAlign: "center", color: "#8391A1" }}
                      >
                        No tip history found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </HrTable>
            </InfiniteScroll>
          </HrTableWrap>
        </HrTableCard>
      ) : null}

      {activeFilter === FILTER_KEYS.withdrawals ? (
        <HrTableCard>
          <HrTableWrap
            id={WITHDRAWALS_SCROLL_ID}
            style={{ maxHeight: "60vh", overflow: "auto" }}
          >
            <InfiniteScroll
              dataLength={withdrawals.length}
              next={loadMore}
              hasMore={hasMore}
              scrollableTarget={WITHDRAWALS_SCROLL_ID}
              loader={
                <div
                  style={{
                    textAlign: "center",
                    padding: "12px 0",
                    color: "#8391A1",
                  }}
                >
                  Loading more...
                </div>
              }
            >
              <HrTable>
                <thead>
                  <tr>
                    <th>Therapist</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Request Date</th>
                    <th>Processed Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && page === 1 && !withdrawals.length
                    ? Array.from({ length: 6 }).map((_, index) => (
                        <tr key={`withdraw-skeleton-${index}`}>
                          {Array.from({ length: 7 }).map((__, colIndex) => (
                            <td key={colIndex}>
                              <Skeleton width={colIndex === 0 ? 140 : 80} height={16} />
                            </td>
                          ))}
                        </tr>
                      ))
                    : withdrawals.map((row) => (
                        <tr key={row.id}>
                          <td>
                            <HrNameCell>
                              <HrAvatar $bg={row.avatarBg}>{row.initials}</HrAvatar>
                              {row.employee}
                            </HrNameCell>
                          </td>
                          <td>{formatCurrency(row.amount)}</td>
                          <td>
                            <HrPill $tone={row.methodTone}>{row.method}</HrPill>
                          </td>
                          <td>{row.requestDate}</td>
                          <td>{row.processedDate}</td>
                          <td>
                            <HrPill $tone={row.statusTone}>{row.status}</HrPill>
                          </td>
                          <td />
                        </tr>
                      ))}
                  {!loading && !withdrawals.length && (
                    <tr>
                      <td
                        colSpan={7}
                        style={{ textAlign: "center", color: "#8391A1" }}
                      >
                        No withdrawals found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </HrTable>
            </InfiniteScroll>
          </HrTableWrap>
        </HrTableCard>
      ) : null}

      <RecordTipModal
        open={recordTipModalOpen}
        onClose={() => setRecordTipModalOpen(false)}
        onSave={handleRecordTip}
      />

      <RequestWithdrawalModal
        open={withdrawModalOpen}
        onClose={() => setWithdrawModalOpen(false)}
        onSave={handleRequestWithdrawal}
      />
    </>
  );
}
