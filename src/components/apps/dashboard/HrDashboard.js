"use client";

import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  DoughnutController,
  Filler,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import moment from "moment";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import InlineSVG from "svg-inline-react";
import { API_ROUTER } from "@/services/apiRouter";
import {
  HrAccentButton,
  HrActionButtons,
  HrAvatar,
  HrBottomGrid,
  HrCard,
  HrCardAmount,
  HrCardHeader,
  HrCardTitleBlock,
  HrChartWrap,
  HrMetricBottom,
  HrMetricCard,
  HrMetricLabel,
  HrMetricTop,
  HrMetricValue,
  HrMetricsGrid,
  HrMiddleGrid,
  HrNameCell,
  HrPageHeader,
  HrPageTitleBlock,
  HrPill,
  HrPrimaryButton,
  HrProgressRing,
  HrProgressWrap,
  HrTable,
  HrTableWrap,
  HrTipsChart,
  HrTipsHeader,
  HrTipsLegend,
  HrUpcomingCard,
  HrUpcomingFooter,
  HrUpcomingHeader,
  HrViewAllButton,
} from "@/styles/pages/hr-module.style";
import axiosApiCall from "@/utils/axios";

ChartJS.register(
  LineController,
  DoughnutController,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const PLUS_ICON = `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.33333 5.33333H5.33333V9.33333H4V5.33333H0V4H4V0H5.33333V4H9.33333V5.33333Z" fill="white"/>
</svg>
`;
const USERS_ICON = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M23.2 27.1999V25.5999C23.2 24.7513 22.8629 23.9373 22.2627 23.3372C21.6626 22.7371 20.8487 22.3999 20 22.3999H15.2C14.3513 22.3999 13.5374 22.7371 12.9373 23.3372C12.3371 23.9373 12 24.7513 12 25.5999V27.1999M23.2 12.9023C23.8862 13.0802 24.4939 13.481 24.9277 14.0416C25.3616 14.6022 25.597 15.2911 25.597 15.9999C25.597 16.7088 25.3616 17.3977 24.9277 17.9583C24.4939 18.5189 23.8862 18.9196 23.2 19.0975M28 27.1999V25.5999C27.9995 24.8909 27.7635 24.2022 27.3291 23.6418C26.8947 23.0814 26.2865 22.6812 25.6 22.5039" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.5984 19.2008C19.3657 19.2008 20.7984 17.7681 20.7984 16.0008C20.7984 14.2335 19.3657 12.8008 17.5984 12.8008C15.8311 12.8008 14.3984 14.2335 14.3984 16.0008C14.3984 17.7681 15.8311 19.2008 17.5984 19.2008Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const CALENDAR_ICON = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M25.8307 13.3346H24.1641V12.5013C24.1641 12.2803 24.0763 12.0683 23.92 11.912C23.7637 11.7558 23.5517 11.668 23.3307 11.668C23.1097 11.668 22.8978 11.7558 22.7415 11.912C22.5852 12.0683 22.4974 12.2803 22.4974 12.5013V13.3346H17.4974V12.5013C17.4974 12.2803 17.4096 12.0683 17.2533 11.912C17.097 11.7558 16.8851 11.668 16.6641 11.668C16.443 11.668 16.2311 11.7558 16.0748 11.912C15.9185 12.0683 15.8307 12.2803 15.8307 12.5013V13.3346H14.1641C13.501 13.3346 12.8651 13.598 12.3963 14.0669C11.9275 14.5357 11.6641 15.1716 11.6641 15.8346V25.8346C11.6641 26.4977 11.9275 27.1336 12.3963 27.6024C12.8651 28.0712 13.501 28.3346 14.1641 28.3346H25.8307C26.4938 28.3346 27.1297 28.0712 27.5985 27.6024C28.0673 27.1336 28.3307 26.4977 28.3307 25.8346V15.8346C28.3307 15.1716 28.0673 14.5357 27.5985 14.0669C27.1297 13.598 26.4938 13.3346 25.8307 13.3346ZM26.6641 25.8346C26.6641 26.0556 26.5763 26.2676 26.42 26.4239C26.2637 26.5802 26.0517 26.668 25.8307 26.668H14.1641C13.943 26.668 13.7311 26.5802 13.5748 26.4239C13.4185 26.2676 13.3307 26.0556 13.3307 25.8346V20.0013H26.6641V25.8346ZM26.6641 18.3346H13.3307V15.8346C13.3307 15.6136 13.4185 15.4017 13.5748 15.2454C13.7311 15.0891 13.943 15.0013 14.1641 15.0013H15.8307V15.8346C15.8307 16.0556 15.9185 16.2676 16.0748 16.4239C16.2311 16.5802 16.443 16.668 16.6641 16.668C16.8851 16.668 17.097 16.5802 17.2533 16.4239C17.4096 16.2676 17.4974 16.0556 17.4974 15.8346V15.0013H22.4974V15.8346C22.4974 16.0556 22.5852 16.2676 22.7415 16.4239C22.8978 16.5802 23.1097 16.668 23.3307 16.668C23.5517 16.668 23.7637 16.5802 23.92 16.4239C24.0763 16.2676 24.1641 16.0556 24.1641 15.8346V15.0013H25.8307C26.0517 15.0013 26.2637 15.0891 26.42 15.2454C26.5763 15.4017 26.6641 15.6136 26.6641 15.8346V18.3346Z" fill="white"/>
</svg>
`;

const CALENDAR_ICON_WHITE = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="white"/>
<path d="M25.8307 13.3346H24.1641V12.5013C24.1641 12.2803 24.0763 12.0683 23.92 11.912C23.7637 11.7558 23.5517 11.668 23.3307 11.668C23.1097 11.668 22.8978 11.7558 22.7415 11.912C22.5852 12.0683 22.4974 12.2803 22.4974 12.5013V13.3346H17.4974V12.5013C17.4974 12.2803 17.4096 12.0683 17.2533 11.912C17.097 11.7558 16.8851 11.668 16.6641 11.668C16.443 11.668 16.2311 11.7558 16.0748 11.912C15.9185 12.0683 15.8307 12.2803 15.8307 12.5013V13.3346H14.1641C13.501 13.3346 12.8651 13.598 12.3963 14.0669C11.9275 14.5357 11.6641 15.1716 11.6641 15.8346V25.8346C11.6641 26.4977 11.9275 27.1336 12.3963 27.6024C12.8651 28.0712 13.501 28.3346 14.1641 28.3346H25.8307C26.4938 28.3346 27.1297 28.0712 27.5985 27.6024C28.0673 27.1336 28.3307 26.4977 28.3307 25.8346V15.8346C28.3307 15.1716 28.0673 14.5357 27.5985 14.0669C27.1297 13.598 26.4938 13.3346 25.8307 13.3346ZM26.6641 25.8346C26.6641 26.0556 26.5763 26.2676 26.42 26.4239C26.2637 26.5802 26.0517 26.668 25.8307 26.668H14.1641C13.943 26.668 13.7311 26.5802 13.5748 26.4239C13.4185 26.2676 13.3307 26.0556 13.3307 25.8346V20.0013H26.6641V25.8346ZM26.6641 18.3346H13.3307V15.8346C13.3307 15.6136 13.4185 15.4017 13.5748 15.2454C13.7311 15.0891 13.943 15.0013 14.1641 15.0013H15.8307V15.8346C15.8307 16.0556 15.9185 16.2676 16.0748 16.4239C16.2311 16.5802 16.443 16.668 16.6641 16.668C16.8851 16.668 17.097 16.5802 17.2533 16.4239C17.4096 16.2676 17.4974 16.0556 17.4974 15.8346V15.0013H22.4974V15.8346C22.4974 16.0556 22.5852 16.2676 22.7415 16.4239C22.8978 16.5802 23.1097 16.668 23.3307 16.668C23.5517 16.668 23.7637 16.5802 23.92 16.4239C24.0763 16.2676 24.1641 16.0556 24.1641 15.8346V15.0013H25.8307C26.0517 15.0013 26.2637 15.0891 26.42 15.2454C26.5763 15.4017 26.6641 15.6136 26.6641 15.8346V18.3346Z" fill="#007BFF"/>
</svg>`;

const CLOCK_ICON = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M20 15V20H25M20 29C18.8181 29 17.6478 28.7672 16.5558 28.3149C15.4639 27.8626 14.4718 27.1997 13.636 26.364C12.8003 25.5282 12.1374 24.5361 11.6851 23.4442C11.2328 22.3522 11 21.1819 11 20C11 18.8181 11.2328 17.6478 11.6851 16.5558C12.1374 15.4639 12.8003 14.4718 13.636 13.636C14.4718 12.8003 15.4639 12.1374 16.5558 11.6851C17.6478 11.2328 18.8181 11 20 11C22.3869 11 24.6761 11.9482 26.364 13.636C28.0518 15.3239 29 17.6131 29 20C29 22.3869 28.0518 24.6761 26.364 26.364C24.6761 28.0518 22.3869 29 20 29Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const CHECK_ICON = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="14" cy="14" r="13" stroke="#295086" stroke-width="1.5"/>
<path d="M8.5 14.2L12.2 17.8L19.5 10.2" stroke="#295086" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const CROSS_ICON = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="14" cy="14" r="13" stroke="#FF0000" stroke-width="1.5"/>
<path d="M18.5 18.5L9.5 9.5M18.5 9.5L9.5 18.5" stroke="#FF0000" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

const PAYROLL_RING_ICON = `<svg width="136" height="136" viewBox="0 0 136 136" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.1" d="M132 68C132 32.6538 103.346 4 68 4C32.6538 4 4 32.6538 4 68C4 103.346 32.6538 132 68 132C103.346 132 132 103.346 132 68Z" stroke="white" stroke-width="8" stroke-linecap="round"/>
</svg>

`;
const DEFAULT_METRICS = [
  { label: "Total Employees", value: "0", icon: USERS_ICON },
  { label: "Active Employees", value: "0", icon: USERS_ICON },
  { label: "On Leave", value: "0", icon: CALENDAR_ICON },
  { label: "Present Today", value: "0", icon: CLOCK_ICON },
];

const TIPS_ICON = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M19.1667 22.5013H20.8333C21.2754 22.5013 21.6993 22.3257 22.0118 22.0131C22.3244 21.7006 22.5 21.2767 22.5 20.8346C22.5 20.3926 22.3244 19.9687 22.0118 19.6561C21.6993 19.3436 21.2754 19.168 20.8333 19.168H18.3333C17.8333 19.168 17.4167 19.3346 17.1667 19.668L12.5 24.168" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.8307 27.5032L17.1641 26.3365C17.4141 26.0032 17.8307 25.8365 18.3307 25.8365H21.6641C22.5807 25.8365 23.4141 25.5032 23.9974 24.8365L27.8307 21.1698C28.1523 20.8659 28.34 20.4467 28.3525 20.0045C28.365 19.5622 28.2013 19.1331 27.8974 18.8115C27.5935 18.4899 27.1743 18.3022 26.732 18.2897C26.2898 18.2772 25.8606 18.4409 25.5391 18.7448L22.0391 21.9948M11.6641 23.3365L16.6641 28.3365" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M23.3307 19.9193C24.6654 19.9193 25.7474 18.8373 25.7474 17.5026C25.7474 16.1679 24.6654 15.0859 23.3307 15.0859C21.996 15.0859 20.9141 16.1679 20.9141 17.5026C20.9141 18.8373 21.996 19.9193 23.3307 19.9193Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 16.668C16.3807 16.668 17.5 15.5487 17.5 14.168C17.5 12.7873 16.3807 11.668 15 11.668C13.6193 11.668 12.5 12.7873 12.5 14.168C12.5 15.5487 13.6193 16.668 15 16.668Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const DEFAULT_TIPS = [];

const DASHBOARD_LEAVE_LIMIT = 6;
const DASHBOARD_TIPS_LIMIT = 3;
const PENDING_LEAVE_STATUS = 3;

const LEAVE_STATUS_META = {
  1: { label: "Approved", tone: "approved" },
  2: { label: "Rejected", tone: "rejected" },
  3: { label: "Pending", tone: "pending" },
  approved: { label: "Approved", tone: "approved" },
  rejected: { label: "Rejected", tone: "rejected" },
  pending: { label: "Pending", tone: "pending" },
};

const TIP_COLORS = ["#295086", "#236AD1", "#007BFF", "#12A150", "#9333EA", "#E5A50A"];

const AVATAR_COLORS = [
  "#295086",
  "#4F9CFF",
  "#E8A05A",
  "#4A9D77",
  "#8B6FD4",
  "#D4B04A",
];

const formatMetricValue = (value) => {
  if (value == null || value === "") return "0";
  return String(value);
};

const formatCurrency = (value) =>
  `$${Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(Number(value)) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "?";

const normalizeStatusTone = (value) => {
  const key = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");
  if (key === "approved") return "approved";
  if (key === "rejected") return "rejected";
  if (key === "pending") return "pending";
  if (key === "paid") return "paid";
  if (key === "unpaid") return "unpaid";
  if (key === "casual") return "casual";
  return key || "pending";
};

const extractArray = (payload, keys = []) => {
  if (Array.isArray(payload)) return payload;
  for (const key of keys) {
    if (Array.isArray(payload?.[key])) return payload[key];
  }
  return [];
};

const getTherapistName = (item = {}) => {
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

const normalizeTipDistribution = (item = {}, index = 0) => {
  const id =
    item.id ??
    item._id ??
    item.employeeId ??
    item.employee_id ??
    item.employee?.id ??
    `tip-${index}`;
  const name = getTherapistName(item);

  return {
    id,
    name,
    amount: Number(
      item.totalEarnedTips ??
        item.totalTips ??
        item.totalTipAmount ??
        item.tipAmount ??
        item.highestTip ??
        item.highest_tip ??
        item.amount ??
        0
    ),
    color: TIP_COLORS[index % TIP_COLORS.length],
  };
};

const normalizeLeaveStatus = (value) => {
  if (value == null || value === "") {
    return LEAVE_STATUS_META.pending;
  }
  if (typeof value === "number" || /^\d+$/.test(String(value).trim())) {
    return LEAVE_STATUS_META[Number(value)] || LEAVE_STATUS_META.pending;
  }
  const key = String(value).trim().toLowerCase();
  return LEAVE_STATUS_META[key] || LEAVE_STATUS_META.pending;
};

const capitalize = (value = "") => {
  const text = String(value).trim();
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

const formatLeaveDates = (start, end) => {
  const startMoment = start ? moment(start) : null;
  const endMoment = end ? moment(end) : null;

  if (startMoment?.isValid() && endMoment?.isValid()) {
    if (startMoment.isSame(endMoment, "day")) {
      return startMoment.format("MMM D");
    }
    return `${startMoment.format("MMM D")} – ${endMoment.format("MMM D")}`;
  }

  if (startMoment?.isValid()) return startMoment.format("MMM D");
  return "-";
};

const formatLeaveDuration = (days) => {
  const count = Number(days) || 0;
  if (!count) return "-";
  return count === 1 ? "1 day" : `${count} days`;
};

const normalizeLeaveRequestRow = (item = {}, index = 0) => {
  const employee =
    typeof item.employee === "object" && item.employee ? item.employee : null;
  const employeeId =
    item.employeeId ??
    item.employee_id ??
    employee?.id ??
    employee?._id ??
    null;
  const name =
    item.employeeName ||
    item.employee_name ||
    item.name ||
    employee?.name ||
    employee?.fullName ||
    [employee?.firstName, employee?.lastName].filter(Boolean).join(" ") ||
    "Employee";
  const start =
    item.startDate || item.start_date || item.start || item.fromDate || "";
  const end = item.endDate || item.end_date || item.end || item.toDate || "";
  const startMoment = start ? moment(start) : null;
  const endMoment = end ? moment(end) : null;
  const computedDays =
    startMoment?.isValid() && endMoment?.isValid()
      ? endMoment.diff(startMoment, "days") + 1
      : 0;
  const statusMeta = normalizeLeaveStatus(
    item.leaveStatus ?? item.leave_status ?? item.status
  );
  const leaveType = item.leaveType || item.leave_type || item.type || "";

  return {
    id: item.id ?? item._id ?? item.leaveId ?? `leave-${index}`,
    name,
    initials: getInitials(name),
    avatarBg: AVATAR_COLORS[Number(employeeId || index) % AVATAR_COLORS.length],
    type: capitalize(leaveType) || "-",
    typeTone: normalizeStatusTone(leaveType),
    duration: formatLeaveDuration(
      item.days ?? item.totalDays ?? item.total_days ?? computedDays
    ),
    dates: formatLeaveDates(start, end),
    status: statusMeta.label,
    statusTone: statusMeta.tone,
  };
};

const normalizePayrollCycles = (summary = {}) => {
  const payrollSummary = summary.payrollSummary ?? summary.payroll_summary ?? {};
  const cycles = extractArray(payrollSummary, ["cycles", "cycleList", "cycle_list"]);

  return cycles.map((item) => ({
    month: item.month || item.label || item.period || "-",
    netSalary: Number(item.netSalary ?? item.net_salary ?? item.amount ?? 0),
    tips: Number(item.tips ?? item.tipAmount ?? item.totalTips ?? 0),
  }));
};

const buildMetrics = (summary = {}) => {
  const employeeSummary =
    summary.employeeSummary ?? summary.employee_summary ?? summary;

  return [
    {
      label: "Total Employees",
      value: formatMetricValue(employeeSummary.totalEmployees ?? 0),
      icon: USERS_ICON,
    },
    {
      label: "Active Employees",
      value: formatMetricValue(employeeSummary.activeEmployees ?? 0),
      icon: USERS_ICON,
    },
    {
      label: "On Leave",
      value: formatMetricValue(employeeSummary.onLeave ?? 0),
      icon: CALENDAR_ICON,
    },
    {
      label: "Present Today",
      value: formatMetricValue(employeeSummary.presentToday ?? 0),
      icon: CLOCK_ICON,
    },
  ];
};

const formatPayrollDate = (value) => {
  if (!value) return "-";
  const parsed = moment(value);
  return parsed.isValid() ? parsed.format("MMM D, YYYY") : String(value);
};

const PayrollLineChart = ({ cycles = [], loading = false }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const chartData = useMemo(
    () => ({
      labels: cycles.map((cycle) => cycle.month),
      datasets: [
        {
          label: "Net Salary",
          data: cycles.map((cycle) => cycle.netSalary),
          borderColor: "#295086",
          backgroundColor: "rgba(41, 80, 134, 0.08)",
          pointBackgroundColor: "#295086",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 3,
          fill: true,
          tension: 0.35,
        },

        {
          label: "Tips",
          data: cycles.map((cycle) => cycle.tips),
          borderColor: "#007BFF",
          backgroundColor: "transparent",
          pointBackgroundColor: "#007BFF",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 3,
          fill: false,
          tension: 0.35,
        },
      ],
    }),
    [cycles]
  );

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          display: true,
          position: "top",
          align: "end",
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            color: "#64748B",
            boxWidth: 8,
            boxHeight: 8,
            padding: 16,
          },
        },
        tooltip: {
          backgroundColor: "#ffffff",
          titleColor: "#295086",
          bodyColor: "#295086",
          borderColor: "#E6EEF7",
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: (context) =>
              `${context.dataset.label}: ${formatCurrency(context.parsed.y ?? 0)}`,
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: "#8391A1",
            font: {
              size: 11,
            },
          },
          border: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: "#F1F5F9",
          },
          ticks: {
            color: "#8391A1",
            font: {
              size: 11,
            },
            callback: (value) => `$${Number(value).toLocaleString("en-US")}`,
          },
          border: {
            display: false,
          },
        },
      },
    }),
    []
  );

  useEffect(() => {
    if (!canvasRef.current || loading) return;

    if (chartRef.current) {
      chartRef.current.data = chartData;
      chartRef.current.options = chartOptions;
      chartRef.current.update();
      return;
    }

    chartRef.current = new ChartJS(canvasRef.current, {
      type: "line",
      data: chartData,
      options: chartOptions,
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [chartData, chartOptions, loading]);

  if (loading) {
    return (
      <HrChartWrap>
        <Skeleton height={220} />
      </HrChartWrap>
    );
  }

  if (!cycles.length) {
    return (
      <HrChartWrap>
        <p style={{ color: "#8391A1", fontSize: 14, margin: 0 }}>
          No payroll chart data available.
        </p>
      </HrChartWrap>
    );
  }

  return (
    <HrChartWrap>
      <canvas ref={canvasRef} aria-label="Payroll summary chart" />
    </HrChartWrap>
  );
};

const TipsDoughnutChart = ({ tips = DEFAULT_TIPS, loading = false }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const chartData = useMemo(
    () => ({
      labels: tips.map((tip) => tip.name),
      datasets: [
        {
          data: tips.map((tip) => tip.amount),
          backgroundColor: tips.map((tip) => tip.color),
          borderWidth: 0,
          hoverOffset: 6,
        },
      ],
    }),
    [tips]
  );

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      cutout: "72%",
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "#ffffff",
          titleColor: "#295086",
          bodyColor: "#295086",
          borderColor: "#E6EEF7",
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: (context) =>
              `${context.label}: ${formatCurrency(context.parsed ?? 0)}`,
          },
        },
      },
    }),
    []
  );

  useEffect(() => {
    if (!canvasRef.current || loading) return;

    if (chartRef.current) {
      chartRef.current.data = chartData;
      chartRef.current.options = chartOptions;
      chartRef.current.update();
      return;
    }

    chartRef.current = new ChartJS(canvasRef.current, {
      type: "doughnut",
      data: chartData,
      options: chartOptions,
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [chartData, chartOptions, loading]);

  if (loading) {
    return <Skeleton circle width={180} height={180} />;
  }

  if (!tips.length) {
    return (
      <p style={{ color: "#8391A1", fontSize: 14, margin: 0 }}>
        No tips data available.
      </p>
    );
  }

  return <canvas ref={canvasRef} aria-label="Tips distribution chart" />;
};

export default function HrDashboard({ onOpenTab }) {
  const [dashboardSummary, setDashboardSummary] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leavesLoading, setLeavesLoading] = useState(true);
  const [tipsLoading, setTipsLoading] = useState(true);

  const fetchDashboardSummary = useCallback(async (isCancelled = () => false) => {
    try {
      setLoading(true);
      const res = await axiosApiCall.get(API_ROUTER?.HR_DASHBOARD_SUMMARY);
      if (isCancelled()) return;

      const summary = res?.data?.data ?? res?.data ?? null;
      setDashboardSummary(summary);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("HR dashboard summary error", error);
      if (!isCancelled()) setDashboardSummary(null);
    } finally {
      if (!isCancelled()) setLoading(false);
    }
  }, []);

  const fetchPendingLeaves = useCallback(async (isCancelled = () => false) => {
    try {
      setLeavesLoading(true);
      const params = new URLSearchParams();
      params.set("leaveStatus", String(PENDING_LEAVE_STATUS));
      params.set("page", "1");
      params.set("limit", String(DASHBOARD_LEAVE_LIMIT));

      const res = await axiosApiCall.get(
        `${API_ROUTER?.HR_LEAVE_LIST}?${params.toString()}`
      );
      if (isCancelled()) return;

      const responseBody = res?.data ?? {};
      const leaveData = responseBody?.data ?? {};
      const rawList = Array.isArray(leaveData?.list)
        ? leaveData.list
        : extractArray(leaveData);

      setLeaveRequests(
        rawList
          .slice(0, DASHBOARD_LEAVE_LIMIT)
          .map(normalizeLeaveRequestRow)
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("HR dashboard pending leaves error", error);
      if (!isCancelled()) setLeaveRequests([]);
    } finally {
      if (!isCancelled()) setLeavesLoading(false);
    }
  }, []);

  const fetchTipsSummary = useCallback(async (isCancelled = () => false) => {
    try {
      setTipsLoading(true);
      const res = await axiosApiCall.get(
        API_ROUTER?.HR_DASHBOARD_HIGHEST_TIP_EMPLOYEE
      );
      console.log("res fetchTipsSummary", res);
      if (isCancelled()) return;

      const responseBody = res?.data ?? {};
      const tipsData = responseBody?.data ?? responseBody;
      const rawList = Array.isArray(tipsData)
        ? tipsData
        : extractArray(tipsData, [
            "list",
            "employees",
            "therapists",
            "highestTipEmployees",
            "highest_tip_employees",
            "tips",
          ]);

      const looksLikeTipRow =
        !rawList.length &&
        tipsData &&
        typeof tipsData === "object" &&
        (tipsData.employeeName ||
          tipsData.employee_name ||
          tipsData.therapistName ||
          tipsData.name ||
          tipsData.employee ||
          tipsData.totalEarnedTips != null ||
          tipsData.totalTips != null ||
          tipsData.tipAmount != null);

      setTips(
        (rawList.length ? rawList : looksLikeTipRow ? [tipsData] : [])
          .filter((item) => item && typeof item === "object")
          .slice(0, DASHBOARD_TIPS_LIMIT)
          .map(normalizeTipDistribution)
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("HR dashboard highest tip employee error", error);
      if (!isCancelled()) setTips([]);
    } finally {
      if (!isCancelled()) setTipsLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchDashboardSummary(() => cancelled);
    return () => {
      cancelled = true;
    };
  }, [fetchDashboardSummary]);

  useEffect(() => {
    let cancelled = false;
    fetchPendingLeaves(() => cancelled);
    return () => {
      cancelled = true;
    };
  }, [fetchPendingLeaves]);

  useEffect(() => {
    let cancelled = false;
    fetchTipsSummary(() => cancelled);
    return () => {
      cancelled = true;
    };
  }, [fetchTipsSummary]);

  const metrics = useMemo(
    () => (dashboardSummary ? buildMetrics(dashboardSummary) : DEFAULT_METRICS),
    [dashboardSummary]
  );

  const payrollCycles = useMemo(
    () => normalizePayrollCycles(dashboardSummary || {}),
    [dashboardSummary]
  );

  const payrollSummary =
    dashboardSummary?.payrollSummary ?? dashboardSummary?.payroll_summary ?? {};

  const payrollTotal = formatCurrency(payrollSummary.totalPayrollNetSalary ?? 0);

  const upcomingPayroll =
    dashboardSummary?.upcomingPayroll ?? dashboardSummary?.upcoming_payroll ?? {};

  const daysLeft = upcomingPayroll.daysLeft ?? upcomingPayroll.days_left ?? 0;

  const nextPayrollDate = formatPayrollDate(upcomingPayroll.nextPayrollDate);

  return (
    <>
      <HrPageHeader>
        <HrPageTitleBlock>
          <h1>Dashboard</h1>
          <p>Welcome back — here&apos;s your spa&apos;s HR snapshot for today.</p>
        </HrPageTitleBlock>
        <HrPrimaryButton type="button" onClick={() => onOpenTab?.("employees")}>
          <InlineSVG src={PLUS_ICON} />
          Add Employee
        </HrPrimaryButton>
      </HrPageHeader>

      <HrMetricsGrid>
        {metrics.map((metric) => (
          <HrMetricCard key={metric.label}>
            <HrMetricTop>
              <HrMetricLabel>{metric.label}</HrMetricLabel>
              <InlineSVG src={metric.icon} />
            </HrMetricTop>
            <HrMetricBottom>
              <HrMetricValue>
                {loading ? <Skeleton width={48} height={28} /> : metric.value}
              </HrMetricValue>
            </HrMetricBottom>
          </HrMetricCard>
        ))}
      </HrMetricsGrid>

      <HrMiddleGrid>
        <HrCard>
          <HrCardHeader>
            <HrCardTitleBlock>
              <h3>Payroll Summary</h3>
              <p>Net salary paid over the last 6 cycles</p>
            </HrCardTitleBlock>
            <HrCardAmount>
              <span className="amount-label">Total</span>
              <span className="amount-value">
                {loading ? <Skeleton width={120} height={24} /> : payrollTotal}
              </span>
            </HrCardAmount>
          </HrCardHeader>
          <PayrollLineChart cycles={payrollCycles} loading={loading} />
        </HrCard>

        <HrUpcomingCard>
          <HrUpcomingHeader>
            <InlineSVG src={CALENDAR_ICON_WHITE} />
            Upcoming Payroll
          </HrUpcomingHeader>
          <HrProgressWrap>
            <HrProgressRing>
             <InlineSVG src={PAYROLL_RING_ICON} className="ring-svg" />
              <div className="ring-content">
                <span className="ring-days">
                  {loading ? <Skeleton width={24} height={28} /> : daysLeft}
                </span>
                <span className="ring-label">days left</span>
              </div>
            </HrProgressRing>
          </HrProgressWrap>
          <HrUpcomingFooter>
            <p className="next-label">Next payroll date</p>
            <p className="next-date">
              {loading ? <Skeleton width={120} height={20} /> : nextPayrollDate}
            </p>
            <HrAccentButton type="button" onClick={() => onOpenTab?.("payroll")}>
              Prepare Payroll ›
            </HrAccentButton>
          </HrUpcomingFooter>
        </HrUpcomingCard>
      </HrMiddleGrid>

      <HrBottomGrid>
        <HrCard>
          <HrTipsHeader>
            <div className="tips-header-left">
              <InlineSVG src={TIPS_ICON} />
              <HrCardTitleBlock>
                <h3>Tips Distributed</h3>
                <p>By therapist</p>
              </HrCardTitleBlock>
            </div>
            <HrViewAllButton type="button" onClick={() => onOpenTab?.("tips")}>
              View All
            </HrViewAllButton>
          </HrTipsHeader>
          <HrTipsChart>
            <div className="donut-wrap">
              <TipsDoughnutChart tips={tips} loading={tipsLoading} />
            </div>
            <HrTipsLegend>
              {!tipsLoading &&
                tips.map((tip) => (
                  <li key={tip.id}>
                    <span className="dot" style={{ background: tip.color }} />
                    <span className="name">{tip.name}</span>
                    <strong>{formatCurrency(tip.amount)}</strong>
                  </li>
                ))}
            </HrTipsLegend>
          </HrTipsChart>
        </HrCard>

        <HrCard $stretch>
          <HrCardHeader>
            <HrCardTitleBlock>
              <h3>Pending Leave Requests</h3>
            </HrCardTitleBlock>
            <HrViewAllButton type="button" onClick={() => onOpenTab?.("leaves")}>
              View All
            </HrViewAllButton>
          </HrCardHeader>
          <HrTableWrap
            $stretch
            $empty={!leavesLoading && leaveRequests.length === 0}
          >
            <HrTable>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Dates</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              {leavesLoading || leaveRequests.length > 0 ? (
                <tbody>
                  {leavesLoading
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <tr key={`leave-skeleton-${index}`}>
                          {Array.from({ length: 6 }).map((__, colIndex) => (
                            <td key={colIndex}>
                              <Skeleton
                                width={colIndex === 0 ? 140 : 70}
                                height={16}
                              />
                            </td>
                          ))}
                        </tr>
                      ))
                    : leaveRequests.map((row) => (
                        <tr key={row.id}>
                          <td>
                            <HrNameCell>
                              <HrAvatar $bg={row.avatarBg}>{row.initials}</HrAvatar>
                              {row.name}
                            </HrNameCell>
                          </td>
                          <td>
                            <HrPill $tone={row.typeTone}>{row.type}</HrPill>
                          </td>
                          <td>{row.duration}</td>
                          <td>{row.dates}</td>
                          <td>
                            <HrPill $tone={row.statusTone}>{row.status}</HrPill>
                          </td>
                          <td>
                            <HrActionButtons>
                              <button
                                type="button"
                                className="approve"
                                aria-label={`Approve ${row.name}`}
                              >
                                <InlineSVG src={CHECK_ICON} />
                              </button>
                              <button
                                type="button"
                                className="reject"
                                aria-label={`Reject ${row.name}`}
                              >
                                <InlineSVG src={CROSS_ICON} />
                              </button>
                            </HrActionButtons>
                          </td>
                        </tr>
                      ))}
                </tbody>
              ) : null}
            </HrTable>
            {!leavesLoading && leaveRequests.length === 0 ? (
              <div className="empty-state">No pending leave requests.</div>
            ) : null}
          </HrTableWrap>
        </HrCard>
      </HrBottomGrid>
    </>
  );
}
