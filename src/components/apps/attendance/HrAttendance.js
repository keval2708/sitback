"use client";

import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactDatePicker from "react-datepicker";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import InlineSVG from "svg-inline-react";
import RecordAttendanceModal from "@/components/apps/attendance/RecordAttendanceModal";
import { API_ROUTER } from "@/services/apiRouter";
import {
  HrAvatar,
  HrDateField,
  HrHeaderActions,
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
} from "@/styles/pages/hr-module.style";
import axiosApiCall from "@/utils/axios";

const PLUS_ICON = `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.33333 5.33333H5.33333V9.33333H4V5.33333H0V4H4V0H5.33333V4H9.33333V5.33333Z" fill="white"/></svg>`;
const CALENDAR_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6693 2.66536H11.3359V1.9987C11.3359 1.82189 11.2657 1.65232 11.1407 1.52729C11.0157 1.40227 10.8461 1.33203 10.6693 1.33203C10.4925 1.33203 10.3229 1.40227 10.1979 1.52729C10.0728 1.65232 10.0026 1.82189 10.0026 1.9987V2.66536H6.0026V1.9987C6.0026 1.82189 5.93237 1.65232 5.80734 1.52729C5.68232 1.40227 5.51275 1.33203 5.33594 1.33203C5.15913 1.33203 4.98956 1.40227 4.86453 1.52729C4.73951 1.65232 4.66927 1.82189 4.66927 1.9987V2.66536H3.33594C2.8055 2.66536 2.2968 2.87608 1.92172 3.25115C1.54665 3.62622 1.33594 4.13493 1.33594 4.66536V12.6654C1.33594 13.1958 1.54665 13.7045 1.92172 14.0796C2.2968 14.4547 2.8055 14.6654 3.33594 14.6654H12.6693C13.1997 14.6654 13.7084 14.4547 14.0835 14.0796C14.4586 13.7045 14.6693 13.1958 14.6693 12.6654V4.66536C14.6693 4.13493 14.4586 3.62622 14.0835 3.25115C13.7084 2.87608 13.1997 2.66536 12.6693 2.66536ZM13.3359 12.6654C13.3359 12.8422 13.2657 13.0117 13.1407 13.1368C13.0157 13.2618 12.8461 13.332 12.6693 13.332H3.33594C3.15913 13.332 2.98956 13.2618 2.86453 13.1368C2.73951 13.0117 2.66927 12.8422 2.66927 12.6654V7.9987H13.3359V12.6654ZM13.3359 6.66536H2.66927V4.66536C2.66927 4.48855 2.73951 4.31898 2.86453 4.19396C2.98956 4.06894 3.15913 3.9987 3.33594 3.9987H4.66927V4.66536C4.66927 4.84218 4.73951 5.01174 4.86453 5.13677C4.98956 5.26179 5.15913 5.33203 5.33594 5.33203C5.51275 5.33203 5.68232 5.26179 5.80734 5.13677C5.93237 5.01174 6.0026 4.84218 6.0026 4.66536V3.9987H10.0026V4.66536C10.0026 4.84218 10.0728 5.01174 10.1979 5.13677C10.3229 5.26179 10.4925 5.33203 10.6693 5.33203C10.8461 5.33203 11.0157 5.26179 11.1407 5.13677C11.2657 5.01174 11.3359 4.84218 11.3359 4.66536V3.9987H12.6693C12.8461 3.9987 13.0157 4.06894 13.1407 4.19396C13.2657 4.31898 13.3359 4.48855 13.3359 4.66536V6.66536Z" fill="#295086"/>
</svg>
`;

const TODAY = moment().format("YYYY-MM-DD");
const PAGE_LIMIT = 10;
const ATTENDANCE_SCROLL_ID = "hr-attendance-scroll";

const STAT_ICONS = {
  employees: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M23.2 27.1999V25.5999C23.2 24.7513 22.8629 23.9373 22.2627 23.3372C21.6626 22.7371 20.8487 22.3999 20 22.3999H15.2C14.3513 22.3999 13.5374 22.7371 12.9373 23.3372C12.3371 23.9373 12 24.7513 12 25.5999V27.1999M23.2 12.9023C23.8862 13.0802 24.4939 13.481 24.9277 14.0416C25.3616 14.6022 25.597 15.2911 25.597 15.9999C25.597 16.7088 25.3616 17.3977 24.9277 17.9583C24.4939 18.5189 23.8862 18.9196 23.2 19.0975M28 27.1999V25.5999C27.9995 24.8909 27.7635 24.2022 27.3291 23.6418C26.8947 23.0814 26.2865 22.6812 25.6 22.5039" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.5984 19.2008C19.3657 19.2008 20.7984 17.7681 20.7984 16.0008C20.7984 14.2335 19.3657 12.8008 17.5984 12.8008C15.8311 12.8008 14.3984 14.2335 14.3984 16.0008C14.3984 17.7681 15.8311 19.2008 17.5984 19.2008Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  present: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M28.2488 20C28.3973 19.9997 28.5425 20.0415 28.6661 20.12C28.7897 20.1984 28.886 20.3101 28.9428 20.4408C28.9997 20.5714 29.0146 20.7153 28.9855 20.854C28.9565 20.9927 28.8848 21.1201 28.7797 21.22L24.4993 25.2957V27.5C24.4993 28.163 24.2228 28.7989 23.7306 29.2678C23.2384 29.7366 22.5708 30 21.8747 30H18.1253C17.4292 30 16.7616 29.7366 16.2694 29.2678C15.7772 28.7989 15.5007 28.163 15.5007 27.5V25.2957L11.2203 21.22C11.1152 21.1201 11.0435 20.9927 11.0145 20.854C10.9854 20.7153 11.0003 20.5714 11.0572 20.4408C11.114 20.3101 11.2103 20.1984 11.3339 20.12C11.4575 20.0415 11.6027 19.9997 11.7512 20H28.2488ZM16.7815 24.4943C16.8511 24.5607 16.9062 24.6396 16.9438 24.7264C16.9814 24.8132 17.0006 24.9061 17.0004 25V27.5C17.0004 28.0914 17.5044 28.5714 18.1253 28.5714H21.8747C22.173 28.5714 22.4591 28.4585 22.6701 28.2576C22.881 28.0567 22.9996 27.7842 22.9996 27.5V25C22.9994 24.9061 23.0186 24.8132 23.0562 24.7264C23.0938 24.6396 23.1489 24.5607 23.2185 24.4943L26.44 21.4286H13.5615L16.7815 24.4943ZM22.6246 17.1429C23.6715 17.1429 24.5713 17.7286 24.9943 18.5714H15.0057C15.4287 17.7286 16.3285 17.1429 17.3754 17.1429H22.6246ZM20 10C20.7955 10 21.5585 10.301 22.121 10.8368C22.6835 11.3727 22.9996 12.0994 22.9996 12.8571C22.9996 13.6149 22.6835 14.3416 22.121 14.8774C21.5585 15.4133 20.7955 15.7143 20 15.7143C19.2045 15.7143 18.4415 15.4133 17.879 14.8774C17.3165 14.3416 17.0004 13.6149 17.0004 12.8571C17.0004 12.0994 17.3165 11.3727 17.879 10.8368C18.4415 10.301 19.2045 10 20 10ZM20 11.4286C19.6022 11.4286 19.2208 11.5791 18.9395 11.847C18.6582 12.1149 18.5002 12.4783 18.5002 12.8571C18.5002 13.236 18.6582 13.5994 18.9395 13.8673C19.2208 14.1352 19.6022 14.2857 20 14.2857C20.3978 14.2857 20.7792 14.1352 21.0605 13.8673C21.3418 13.5994 21.4998 13.236 21.4998 12.8571C21.4998 12.4783 21.3418 12.1149 21.0605 11.847C20.7792 11.5791 20.3978 11.4286 20 11.4286Z" fill="white"/>
</svg>
`,
  late: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M20.6338 25.1417C20.8039 24.9689 20.8889 24.755 20.8889 24.5C20.8889 24.245 20.8036 24.0314 20.6329 23.8592C20.4622 23.687 20.2513 23.6006 20 23.6C19.7487 23.5994 19.5378 23.6858 19.3671 23.8592C19.1964 24.0326 19.1111 24.2462 19.1111 24.5C19.1111 24.7538 19.1964 24.9677 19.3671 25.1417C19.5378 25.3157 19.7487 25.4018 20 25.4C20.2513 25.3982 20.4625 25.3127 20.6338 25.1417ZM19.1111 21.8H20.8889V16.4H19.1111V21.8ZM13.7778 29C13.2889 29 12.8705 28.8239 12.5227 28.4717C12.1748 28.1195 12.0006 27.6956 12 27.2V14.6C12 14.105 12.1742 13.6814 12.5227 13.3292C12.8711 12.977 13.2895 12.8006 13.7778 12.8H17.5111C17.7037 12.26 18.0261 11.825 18.4782 11.495C18.9304 11.165 19.4376 11 20 11C20.5624 11 21.0699 11.165 21.5227 11.495C21.9754 11.825 22.2975 12.26 22.4889 12.8H26.2222C26.7111 12.8 27.1298 12.9764 27.4782 13.3292C27.8267 13.682 28.0006 14.1056 28 14.6V27.2C28 27.695 27.8261 28.1189 27.4782 28.4717C27.1304 28.8245 26.7117 29.0006 26.2222 29H13.7778ZM13.7778 27.2H26.2222V14.6H13.7778V27.2ZM20.4782 13.7342C20.6039 13.6064 20.6667 13.445 20.6667 13.25C20.6667 13.055 20.6036 12.8939 20.4773 12.7667C20.3511 12.6395 20.192 12.5756 20 12.575C19.808 12.5744 19.6489 12.6383 19.5227 12.7667C19.3964 12.8951 19.3333 13.0562 19.3333 13.25C19.3333 13.4438 19.3964 13.6052 19.5227 13.7342C19.6489 13.8632 19.808 13.9268 20 13.925C20.192 13.9232 20.3514 13.8602 20.4782 13.7342Z" fill="white"/>
</svg>
`,
  overtime: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M20 15V20H25M20 29C18.8181 29 17.6478 28.7672 16.5558 28.3149C15.4639 27.8626 14.4718 27.1997 13.636 26.364C12.8003 25.5282 12.1374 24.5361 11.6851 23.4442C11.2328 22.3522 11 21.1819 11 20C11 18.8181 11.2328 17.6478 11.6851 16.5558C12.1374 15.4639 12.8003 14.4718 13.636 13.636C14.4718 12.8003 15.4639 12.1374 16.5558 11.6851C17.6478 11.2328 18.8181 11 20 11C22.3869 11 24.6761 11.9482 26.364 13.636C28.0518 15.3239 29 17.6131 29 20C29 22.3869 28.0518 24.6761 26.364 26.364C24.6761 28.0518 22.3869 29 20 29Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
};

const STATUS_LABELS = {
  present: "Present",
  halfday: "Half Day",
  late: "Late",
  absent: "Absent",
};

const AVATAR_COLORS = [
  "#4F9CFF",
  "#E8A05A",
  "#8B6FD4",
  "#4A9D77",
  "#D4B04A",
  "#295086",
  "#3B67A3",
  "#C45C26",
  "#007BFF",
  "#6B7280",
];

const extractRows = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.list)) return payload.list;
  if (Array.isArray(payload?.rows)) return payload.rows;
  if (Array.isArray(payload?.attendance)) return payload.attendance;
  if (Array.isArray(payload?.employees)) return payload.employees;
  return [];
};

const normalizeStatusTone = (value) => {
  const key = String(value || "present")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");
  if (key === "halfday" || key === "half-day") return "halfday";
  if (key === "late") return "late";
  if (key === "absent") return "absent";
  return "present";
};

const formatDisplayTime = (value) => {
  if (!value) return "-";
  const parsed = moment(value, ["HH:mm", "HH:mm:ss", "hh:mm A"], true);
  return parsed.isValid() ? parsed.format("HH:mm") : String(value);
};

const normalizeAttendanceRow = (item = {}, index = 0) => {
  const employee =
    typeof item.employee === "object" && item.employee ? item.employee : null;
  const employeeId =
    item.employeeId ??
    item.employee_id ??
    employee?.id ??
    employee?._id ??
    null;
  const employeeName =
    item.employeeName ||
    item.employee_name ||
    employee?.name ||
    employee?.fullName ||
    [employee?.firstName, employee?.lastName].filter(Boolean).join(" ") ||
    "";
  const statusTone = normalizeStatusTone(item.status);
  const name = employeeName || "Employee";

  return {
    id: item.id ?? item._id ?? `${employeeId || "row"}-${item.date || index}`,
    employeeId,
    employeeName: name,
    initials: name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join(""),
    avatarBg: AVATAR_COLORS[Number(employeeId || index) % AVATAR_COLORS.length],
    date: item.date || "",
    checkIn: formatDisplayTime(item.checkIn || item.check_in),
    checkOut: formatDisplayTime(item.checkOut || item.check_out),
    workingHrs: Number(
      item.workingHrs ?? item.workingHours ?? item.working_hours ?? 0
    ),
    breakMin: Number(
      item.breakMin ?? item.breakDuration ?? item.break_duration ?? 0
    ),
    overtime: Number(
      item.overtime ?? item.overtimeHours ?? item.overtime_hours ?? 0
    ),
    status: STATUS_LABELS[statusTone] || item.status || "Present",
    statusTone,
  };
};

const normalizeEmployeeOption = (item = {}, index = 0) => {
  const id = item.id ?? item._id ?? item.employeeId;
  const name =
    item.name ||
    item.fullName ||
    [item.firstName, item.lastName].filter(Boolean).join(" ") ||
    "";
  if (id == null || !name) return null;
  return {
    id,
    name,
    initials: name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join(""),
    avatarBg: AVATAR_COLORS[Number(id || index) % AVATAR_COLORS.length],
  };
};

const applyPagination = (resData, payload, pageNum, loadedCount, pageCount) => {
  const pagination =
    resData?.pagination ??
    (Array.isArray(payload) ? undefined : payload?.pagination) ??
    {};
  const total = Number(pagination?.total ?? resData?.total ?? 0);
  const totalPages = Number(pagination?.totalPages ?? pagination?.total_pages ?? 0);

  if (totalPages > 0) return pageNum < totalPages;
  if (total > 0) return loadedCount < total;
  return pageCount >= PAGE_LIMIT;
};

export default function HrAttendance() {
  const [selectedDate, setSelectedDate] = useState(TODAY);
  const [rows, setRows] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [stats, setStats] = useState({
    employees: 0,
    present: 0,
    late: 0,
    overtime: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  const fetchEmployees = useCallback(async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.HR_EMPLOYEE_NAME_LIST);
      const rowsData = extractRows(res?.data?.data ?? res?.data);
      setEmployees(
        rowsData.map(normalizeEmployeeOption).filter(Boolean)
      );
    } catch {
      setEmployees([]);
    }
  }, []);

  const fetchSummary = useCallback(async (isCancelled = () => false) => {
    try {
      setStatsLoading(true);
      const params = new URLSearchParams();
      if (selectedDate) params.set("date", selectedDate);

      const res = await axiosApiCall.get(
        `${API_ROUTER?.HR_ATTENDANCE_SUMMARY}?${params.toString()}`
      );
      if (isCancelled()) return;

      const payload = res?.data?.data ?? res?.data ?? {};
      const summary =
        payload?.summary ||
        payload?.stats ||
        (typeof payload === "object" && !Array.isArray(payload) ? payload : {});

      setStats({
        employees: Number(
          summary.employees ??
            summary.totalEmployees ??
            summary.total_employees ??
            summary.employeeCount ??
            summary.total ??
            0
        ),
        present: Number(summary.present ?? summary.presentCount ?? 0),
        late: Number(summary.late ?? summary.lateCount ?? 0),
        overtime: Number(
          summary.overtimeMins ??
            summary.overtime_mins ??
            summary.overtimeMinutes ??
            summary.overtime ??
            summary.overtimeHours ??
            0
        ),
      });
    } catch {
      if (!isCancelled()) {
        setStats({
          employees: 0,
          present: 0,
          late: 0,
          overtime: 0,
        });
      }
    } finally {
      if (!isCancelled()) setStatsLoading(false);
    }
  }, [selectedDate]);

  const fetchAttendance = useCallback(
    async (pageNum, isCancelled = () => false, { silent = false } = {}) => {
      try {
        if (!silent) setLoading(true);

        const params = new URLSearchParams();
        params.set("page", String(pageNum));
        params.set("limit", String(PAGE_LIMIT));
        if (selectedDate) params.set("startDate", selectedDate);
        if (selectedDate) params.set("endDate", selectedDate);

        const res = await axiosApiCall.get(
          `${API_ROUTER?.HR_ATTENDANCE_LIST}?${params.toString()}`
        );
        if (isCancelled()) return;

        const resData = res?.data;
        const payload = resData?.data ?? resData;
        const list = extractRows(payload).map(normalizeAttendanceRow);

        setRows((prev) => {
          if (pageNum === 1) return list;
          const existingIds = new Set(prev.map((row) => String(row.id)));
          return [
            ...prev,
            ...list.filter((row) => !existingIds.has(String(row.id))),
          ];
        });

        const loadedCount = (pageNum - 1) * PAGE_LIMIT + list.length;
        setHasMore(
          applyPagination(resData, payload, pageNum, loadedCount, list.length)
        );
      } catch {
        if (!isCancelled() && pageNum === 1) {
          setRows([]);
          setHasMore(false);
        }
      } finally {
        if (!silent && !isCancelled()) setLoading(false);
      }
    },
    [selectedDate]
  );

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  useEffect(() => {
    setRows([]);
    setHasMore(true);
    setPage(1);
  }, [selectedDate]);

  useEffect(() => {
    let cancelled = false;
    fetchAttendance(page, () => cancelled);
    return () => {
      cancelled = true;
    };
  }, [page, fetchAttendance]);

  useEffect(() => {
    let cancelled = false;
    fetchSummary(() => cancelled);
    return () => {
      cancelled = true;
    };
  }, [fetchSummary]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [loading, hasMore]);

  const metricCards = useMemo(
    () => [
      {
        label: "Employees",
        value: stats.employees,
        icon: STAT_ICONS.employees,
      },
      {
        label: "Present",
        value: stats.present,
        icon: STAT_ICONS.present,
      },
      {
        label: "Late",
        value: stats.late,
        icon: STAT_ICONS.late,
      },
      {
        label: "Overtime Mins",
        value: Math.round(stats.overtime),
        icon: STAT_ICONS.overtime,
      },
    ],
    [stats]
  );

  const handleSave = () => {
    setModalOpen(false);
    setRows([]);
    setHasMore(true);
    fetchSummary();
    if (page === 1) {
      fetchAttendance(1);
    } else {
      setPage(1);
    }
  };

  return (
    <>
      <HrPageHeader $inline $banded>
        <HrPageTitleBlock $inline>
          <h1>Attendance Management</h1>
          <p>Track check-in/out, working hours, and overtime</p>
        </HrPageTitleBlock>
        <HrHeaderActions>
          <HrDateField>
            <ReactDatePicker
              selected={selectedDate ? moment(selectedDate).toDate() : null}
              onChange={(date) => {
                if (date) {
                  setSelectedDate(moment(date).format("YYYY-MM-DD"));
                }
              }}
              dateFormat="dd/MM/yyyy"
              placeholderText="DD/MM/YYYY"
              onKeyDown={(event) => event.preventDefault()}
              aria-label="Attendance date"
            />
            <span className="field-icon" aria-hidden="true">
              <InlineSVG src={CALENDAR_ICON} />
            </span>
          </HrDateField>
          <HrPrimaryButton type="button" onClick={() => setModalOpen(true)}>
            <InlineSVG src={PLUS_ICON} />
            Record Attendance
          </HrPrimaryButton>
        </HrHeaderActions>
      </HrPageHeader>

      <HrMetricsGrid>
        {metricCards.map((stat) => (
          <HrStatCard key={stat.label}>
            <div className="stat-top">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-icon">
                <InlineSVG src={stat.icon} />
              </span>
            </div>
            <span className="stat-value">
              {statsLoading ? (
                <Skeleton width={40} height={28} />
              ) : (
                stat.value
              )}
            </span>
          </HrStatCard>
        ))}
      </HrMetricsGrid>

      <HrTableCard>
        <HrTableWrap
          id={ATTENDANCE_SCROLL_ID}
          style={{ maxHeight: "60vh", overflow: "auto" }}
        >
          {loading && page === 1 && rows.length === 0 ? (
            <HrTable>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Working Hrs</th>
                  <th>Break (min)</th>
                  <th>Overtime</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }).map((_, index) => (
                  <tr key={`attendance-skeleton-${index}`}>
                    <td>
                      <HrNameCell>
                        <Skeleton circle width={36} height={36} />
                        <Skeleton width={120} height={14} />
                      </HrNameCell>
                    </td>
                    <td>
                      <Skeleton width={90} height={14} />
                    </td>
                    <td>
                      <Skeleton width={50} height={14} />
                    </td>
                    <td>
                      <Skeleton width={50} height={14} />
                    </td>
                    <td>
                      <Skeleton width={40} height={14} />
                    </td>
                    <td>
                      <Skeleton width={40} height={14} />
                    </td>
                    <td>
                      <Skeleton width={40} height={14} />
                    </td>
                    <td>
                      <Skeleton width={70} height={24} borderRadius={999} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </HrTable>
          ) : (
            <InfiniteScroll
              dataLength={rows.length}
              next={loadMore}
              hasMore={hasMore}
              scrollableTarget={ATTENDANCE_SCROLL_ID}
              loader={
                <div style={{ textAlign: "center", padding: "12px 0", color: "#8391A1" }}>
                  Loading more...
                </div>
              }
            >
              <HrTable>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Working Hrs</th>
                    <th>Break (min)</th>
                    <th>Overtime (hrs)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <HrNameCell>
                          <HrAvatar $bg={row.avatarBg}>
                            {row.initials || "E"}
                          </HrAvatar>
                          {row.employeeName}
                        </HrNameCell>
                      </td>
                      <td>{row.date || "-"}</td>
                      <td>{row.checkIn}</td>
                      <td>{row.checkOut}</td>
                      <td>{row.workingHrs}</td>
                      <td>{row.breakMin}</td>
                      <td>{row.overtime}</td>
                      <td>
                        <HrPill $tone={row.statusTone}>{row.status}</HrPill>
                      </td>
                    </tr>
                  ))}
                  {!loading && rows.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        style={{ textAlign: "center", color: "#8391A1" }}
                      >
                        No attendance records for this date.
                      </td>
                    </tr>
                  )}
                </tbody>
              </HrTable>
            </InfiniteScroll>
          )}
        </HrTableWrap>
      </HrTableCard>

      <RecordAttendanceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        employees={employees}
        defaultDate={selectedDate}
        onSave={handleSave}
      />
    </>
  );
}
