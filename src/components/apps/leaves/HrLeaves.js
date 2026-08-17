"use client";

import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import InlineSVG from "svg-inline-react";
import AddHolidayModal from "@/components/apps/leaves/AddHolidayModal";
import ApplyLeaveModal from "@/components/apps/leaves/ApplyLeaveModal";
import DeleteHolidayModal from "@/components/apps/leaves/DeleteHolidayModal";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import {
  HrActionButtons,
  HrAvatar,
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
} from "@/styles/pages/hr-module.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const PLUS_ICON = `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.33333 5.33333H5.33333V9.33333H4V5.33333H0V4H4V0H5.33333V4H9.33333V5.33333Z" fill="white"/></svg>`;

const CALENDAR_BTN_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6693 2.66536H11.3359V1.9987C11.3359 1.82189 11.2657 1.65232 11.1407 1.52729C11.0157 1.40227 10.8461 1.33203 10.6693 1.33203C10.4925 1.33203 10.3229 1.40227 10.1979 1.52729C10.0728 1.65232 10.0026 1.82189 10.0026 1.9987V2.66536H6.0026V1.9987C6.0026 1.82189 5.93237 1.65232 5.80734 1.52729C5.68232 1.40227 5.51275 1.33203 5.33594 1.33203C5.15913 1.33203 4.98956 1.40227 4.86453 1.52729C4.73951 1.65232 4.66927 1.82189 4.66927 1.9987V2.66536H3.33594C2.8055 2.66536 2.2968 2.87608 1.92172 3.25115C1.54665 3.62622 1.33594 4.13493 1.33594 4.66536V12.6654C1.33594 13.1958 1.54665 13.7045 1.92172 14.0796C2.2968 14.4547 2.8055 14.6654 3.33594 14.6654H12.6693C13.1997 14.6654 13.7084 14.4547 14.0835 14.0796C14.4586 13.7045 14.6693 13.1958 14.6693 12.6654V4.66536C14.6693 4.13493 14.4586 3.62622 14.0835 3.25115C13.7084 2.87608 13.1997 2.66536 12.6693 2.66536ZM13.3359 12.6654C13.3359 12.8422 13.2657 13.0117 13.1407 13.1368C13.0157 13.2618 12.8461 13.332 12.6693 13.332H3.33594C3.15913 13.332 2.98956 13.2618 2.86453 13.1368C2.73951 13.0117 2.66927 12.8422 2.66927 12.6654V7.9987H13.3359V12.6654ZM13.3359 6.66536H2.66927V4.66536C2.66927 4.48855 2.73951 4.31898 2.86453 4.19396C2.98956 4.06894 3.15913 3.9987 3.33594 3.9987H4.66927V4.66536C4.66927 4.84218 4.73951 5.01174 4.86453 5.13677C4.98956 5.26179 5.15913 5.33203 5.33594 5.33203C5.51275 5.33203 5.68232 5.26179 5.80734 5.13677C5.93237 5.01174 6.0026 4.84218 6.0026 4.66536V3.9987H10.0026V4.66536C10.0026 4.84218 10.0728 5.01174 10.1979 5.13677C10.3229 5.26179 10.4925 5.33203 10.6693 5.33203C10.8461 5.33203 11.0157 5.26179 11.1407 5.13677C11.2657 5.01174 11.3359 4.84218 11.3359 4.66536V3.9987H12.6693C12.8461 3.9987 13.0157 4.06894 13.1407 4.19396C13.2657 4.31898 13.3359 4.48855 13.3359 4.66536V6.66536Z" fill="#295086"/>
</svg>`;

const CHECK_ICON = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.0303 9.53025C17.1669 9.3888 17.2425 9.19935 17.2408 9.0027C17.239 8.80605 17.1602 8.61794 17.0211 8.47889C16.8821 8.33983 16.6939 8.26095 16.4973 8.25924C16.3007 8.25754 16.1112 8.33313 15.9697 8.46975L10.875 13.5645L8.40525 11.0948C8.2638 10.9581 8.07435 10.8825 7.8777 10.8842C7.68105 10.886 7.49294 10.9648 7.35389 11.1039C7.21483 11.2429 7.13595 11.4311 7.13424 11.6277C7.13254 11.8243 7.20813 12.0138 7.34475 12.1553L10.3448 15.1553C10.4854 15.2959 10.6761 15.3748 10.875 15.3748C11.0739 15.3748 11.2646 15.2959 11.4052 15.1553L17.0303 9.53025ZM12 1.5C6.201 1.5 1.5 6.201 1.5 12C1.5 17.799 6.201 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.201 17.799 1.5 12 1.5ZM3 12C3 7.02975 7.02975 3 12 3C16.9703 3 21 7.02975 21 12C21 16.9703 16.9703 21 12 21C7.02975 21 3 16.9703 3 12Z" fill="#295086"/>
</svg>
`;

const CROSS_ICON = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.81853 8.78452C9.67931 8.6548 9.49519 8.58418 9.30493 8.58753C9.11468 8.59089 8.93316 8.66796 8.79861 8.80251C8.66406 8.93706 8.58698 9.11859 8.58363 9.30884C8.58027 9.49909 8.65089 9.68322 8.78061 9.82243L10.7096 11.7514L8.78061 13.6804C8.70846 13.7476 8.65059 13.8287 8.61045 13.9187C8.57031 14.0088 8.54873 14.1061 8.54699 14.2047C8.54525 14.3033 8.56339 14.4012 8.60032 14.4927C8.63726 14.5841 8.69223 14.6672 8.76197 14.7369C8.8317 14.8066 8.91477 14.8616 9.00621 14.8986C9.09766 14.9355 9.1956 14.9536 9.29421 14.9519C9.39281 14.9501 9.49005 14.9286 9.58014 14.8884C9.67022 14.8483 9.7513 14.7904 9.81853 14.7183L11.7475 12.7893L13.6764 14.7183C13.8157 14.848 13.9998 14.9186 14.19 14.9153C14.3803 14.9119 14.5618 14.8348 14.6964 14.7003C14.8309 14.5657 14.908 14.3842 14.9113 14.1939C14.9147 14.0037 14.8441 13.8196 14.7144 13.6804L12.7854 11.7514L14.7144 9.82243C14.7865 9.7552 14.8444 9.67413 14.8845 9.58404C14.9247 9.49396 14.9462 9.39672 14.948 9.29811C14.9497 9.19951 14.9316 9.10156 14.8946 9.01012C14.8577 8.91868 14.8027 8.83561 14.733 8.76588C14.6633 8.69614 14.5802 8.64117 14.4888 8.60423C14.3973 8.56729 14.2994 8.54916 14.2008 8.5509C14.1022 8.55264 14.0049 8.57422 13.9148 8.61436C13.8248 8.65449 13.7437 8.71237 13.6764 8.78452L11.7475 10.7135L9.81853 8.78452Z" fill="#E32C1F" fill-opacity="0.8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.7526 1.47266C5.93929 1.47266 1.22656 6.18539 1.22656 11.9987C1.22656 17.812 5.93929 22.5247 11.7526 22.5247C17.5659 22.5247 22.2786 17.812 22.2786 11.9987C22.2786 6.18539 17.5659 1.47266 11.7526 1.47266ZM2.69531 11.9987C2.69531 9.59655 3.64956 7.2928 5.34813 5.59423C7.0467 3.89565 9.35046 2.94141 11.7526 2.94141C14.1547 2.94141 16.4585 3.89565 18.1571 5.59423C19.8556 7.2928 20.8099 9.59655 20.8099 11.9987C20.8099 14.4008 19.8556 16.7046 18.1571 18.4032C16.4585 20.1017 14.1547 21.056 11.7526 21.056C9.35046 21.056 7.0467 20.1017 5.34813 18.4032C3.64956 16.7046 2.69531 14.4008 2.69531 11.9987Z" fill="#E32C1F" fill-opacity="0.8"/>
</svg>
`;

const STAT_ICONS = {
  pending: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.5859 11.8337C13.5859 11.3473 13.7791 10.8809 14.123 10.5371C14.4669 10.1932 14.9333 10 15.4196 10H24.588C25.0744 10 25.5408 10.1932 25.8847 10.5371C26.2285 10.8809 26.4217 11.3473 26.4217 11.8337V13.539C26.4216 14.2937 26.2352 15.0367 25.879 15.702C25.5229 16.3673 25.0079 16.9345 24.3799 17.353L21.6569 19.1683L24.3799 20.9837C25.0079 21.4022 25.5229 21.9693 25.879 22.6347C26.2352 23.3 26.4216 24.043 26.4217 24.7977V26.503C26.4217 26.9893 26.2285 27.4557 25.8847 27.7996C25.5408 28.1435 25.0744 28.3367 24.588 28.3367H15.4196C14.9333 28.3367 14.4669 28.1435 14.123 27.7996C13.7791 27.4557 13.5859 26.9893 13.5859 26.503V24.7977C13.5859 24.0431 13.7722 23.3002 14.1282 22.6348C14.4842 21.9695 14.999 21.4023 15.6268 20.9837L18.3517 19.1683L15.6287 17.353C15.0005 16.9346 14.4854 16.3675 14.129 15.7021C13.7727 15.0368 13.5861 14.2937 13.5859 13.539V11.8337ZM20.0038 18.0663L23.3631 15.8265C23.7398 15.5754 24.0486 15.2353 24.2623 14.8363C24.476 14.4372 24.5879 13.9916 24.588 13.539V11.8337H15.4196V13.539C15.4198 13.9916 15.5317 14.4372 15.7454 14.8363C15.959 15.2353 16.2679 15.5754 16.6445 15.8265L20.0038 18.0663ZM20.0038 20.2704L16.6445 22.5102C16.2679 22.7613 15.959 23.1014 15.7454 23.5004C15.5317 23.8995 15.4198 24.3451 15.4196 24.7977V26.503H24.588V24.7977C24.5879 24.3451 24.476 23.8995 24.2623 23.5004C24.0486 23.1014 23.7398 22.7613 23.3631 22.5102L20.0038 20.2704Z" fill="white"/>
</svg>
`,
  approved: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M22.1664 27.3261C26.25 27.3261 28.2923 27.3261 29.5603 26.0569C30.8284 24.7878 30.8295 22.7466 30.8295 18.663C30.8295 14.5795 30.8295 12.5372 29.5603 11.2691C28.2912 10.0011 26.25 10 22.1664 10H17.8349C13.7514 10 11.7091 10 10.441 11.2691C9.17296 12.5383 9.17188 14.5795 9.17188 18.663C9.17188 22.7466 9.17187 24.7889 10.441 26.0569C11.1481 26.7651 12.0956 27.0781 13.5034 27.2156" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.75 18.6619L19.1865 20.8276L23.2473 16.4961" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22.1661 27.3274C20.8277 27.3274 19.3528 27.8689 18.0068 28.5673C15.8432 29.6903 14.7614 30.2523 14.2286 29.8939C13.6958 29.5354 13.7965 28.4266 13.999 26.2077L14.0445 25.7031" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>
`,
  rejected: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M20.6338 25.1417C20.8039 24.9689 20.8889 24.755 20.8889 24.5C20.8889 24.245 20.8036 24.0314 20.6329 23.8592C20.4622 23.687 20.2513 23.6006 20 23.6C19.7487 23.5994 19.5378 23.6858 19.3671 23.8592C19.1964 24.0326 19.1111 24.2462 19.1111 24.5C19.1111 24.7538 19.1964 24.9677 19.3671 25.1417C19.5378 25.3157 19.7487 25.4018 20 25.4C20.2513 25.3982 20.4625 25.3127 20.6338 25.1417ZM19.1111 21.8H20.8889V16.4H19.1111V21.8ZM13.7778 29C13.2889 29 12.8705 28.8239 12.5227 28.4717C12.1748 28.1195 12.0006 27.6956 12 27.2V14.6C12 14.105 12.1742 13.6814 12.5227 13.3292C12.8711 12.977 13.2895 12.8006 13.7778 12.8H17.5111C17.7037 12.26 18.0261 11.825 18.4782 11.495C18.9304 11.165 19.4376 11 20 11C20.5624 11 21.0699 11.165 21.5227 11.495C21.9754 11.825 22.2975 12.26 22.4889 12.8H26.2222C26.7111 12.8 27.1298 12.9764 27.4782 13.3292C27.8267 13.682 28.0006 14.1056 28 14.6V27.2C28 27.695 27.8261 28.1189 27.4782 28.4717C27.1304 28.8245 26.7117 29.0006 26.2222 29H13.7778ZM13.7778 27.2H26.2222V14.6H13.7778V27.2ZM20.4782 13.7342C20.6039 13.6064 20.6667 13.445 20.6667 13.25C20.6667 13.055 20.6036 12.8939 20.4773 12.7667C20.3511 12.6395 20.192 12.5756 20 12.575C19.808 12.5744 19.6489 12.6383 19.5227 12.7667C19.3964 12.8951 19.3333 13.0562 19.3333 13.25C19.3333 13.4438 19.3964 13.6052 19.5227 13.7342C19.6489 13.8632 19.808 13.9268 20 13.925C20.192 13.9232 20.3514 13.8602 20.4782 13.7342Z" fill="white"/>
</svg>
`,
  holidays: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M24 11C24.2449 11 24.4813 11.09 24.6644 11.2527C24.8474 11.4155 24.9643 11.6397 24.993 11.883L25 12V13H27C27.5046 12.9998 27.9906 13.1904 28.3605 13.5335C28.7305 13.8766 28.9572 14.3468 28.995 14.85L29 15V27C29.0002 27.5046 28.8096 27.9906 28.4665 28.3605C28.1234 28.7305 27.6532 28.9572 27.15 28.995L27 29H13C12.4954 29.0002 12.0094 28.8096 11.6395 28.4665C11.2695 28.1234 11.0428 27.6532 11.005 27.15L11 27V15C10.9998 14.4954 11.1904 14.0094 11.5335 13.6395C11.8766 13.2695 12.3468 13.0428 12.85 13.005L13 13H15V12C15.0003 11.7451 15.0979 11.5 15.2728 11.3146C15.4478 11.1293 15.687 11.0178 15.9414 11.0028C16.1958 10.9879 16.4464 11.0707 16.6418 11.2343C16.8373 11.3979 16.9629 11.6299 16.993 11.883L17 12V13H23V12C23 11.7348 23.1054 11.4804 23.2929 11.2929C23.4804 11.1054 23.7348 11 24 11ZM27 20H13V27H27V20ZM27 15H13V18H27V15Z" fill="white"/>
</svg>
`,
};

const DELETE_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.66406 14C4.2974 14 3.98362 13.8696 3.72273 13.6087C3.46184 13.3478 3.33118 13.0338 3.33073 12.6667V4C3.14184 4 2.98362 3.936 2.85606 3.808C2.72851 3.68 2.66451 3.52178 2.66406 3.33333C2.66362 3.14489 2.72762 2.98667 2.85606 2.85867C2.98451 2.73067 3.14273 2.66667 3.33073 2.66667H5.9974C5.9974 2.47778 6.0614 2.31956 6.1894 2.192C6.3174 2.06444 6.47562 2.00044 6.66406 2H9.33073C9.51962 2 9.67807 2.064 9.80607 2.192C9.93407 2.32 9.99784 2.47822 9.9974 2.66667H12.6641C12.853 2.66667 13.0114 2.73067 13.1394 2.85867C13.2674 2.98667 13.3312 3.14489 13.3307 3.33333C13.3303 3.52178 13.2663 3.68022 13.1387 3.80867C13.0112 3.93711 12.853 4.00089 12.6641 4V12.6667C12.6641 13.0333 12.5336 13.3473 12.2727 13.6087C12.0118 13.87 11.6978 14.0004 11.3307 14H4.66406ZM11.3307 4H4.66406V12.6667H11.3307V4ZM7.1394 11.142C7.26695 11.014 7.33073 10.8556 7.33073 10.6667V6C7.33073 5.81111 7.26673 5.65289 7.13873 5.52533C7.01073 5.39778 6.85251 5.33378 6.66406 5.33333C6.47562 5.33289 6.3174 5.39689 6.1894 5.52533C6.0614 5.65378 5.9974 5.812 5.9974 6V10.6667C5.9974 10.8556 6.0614 11.014 6.1894 11.142C6.3174 11.27 6.47562 11.3338 6.66406 11.3333C6.85251 11.3329 7.01095 11.2696 7.1394 11.142ZM9.80607 11.1413C9.93362 11.0142 9.9974 10.856 9.9974 10.6667V6C9.9974 5.81111 9.9334 5.65289 9.8054 5.52533C9.6774 5.39778 9.51918 5.33378 9.33073 5.33333C9.14229 5.33289 8.98407 5.39689 8.85607 5.52533C8.72807 5.65378 8.66407 5.812 8.66407 6V10.6667C8.66407 10.8556 8.72807 11.014 8.85607 11.142C8.98407 11.27 9.14229 11.3338 9.33073 11.3333C9.51918 11.3329 9.67762 11.2689 9.80607 11.1413Z" fill="#295086"/>
</svg>`;

const FILTER_KEYS = {
  all: "all",
  pending: "pending",
  approved: "approved",
  rejected: "rejected",
  holidays: "holidays",
};

/** API leaveStatus: 1 = Approved, 2 = Rejected, 3 = Pending */
const LEAVE_STATUS_PARAM = {
  [FILTER_KEYS.approved]: 1,
  [FILTER_KEYS.rejected]: 2,
  [FILTER_KEYS.pending]: 3,
};

const STATUS_META = {
  1: { label: "Approved", tone: "approved" },
  2: { label: "Rejected", tone: "rejected" },
  3: { label: "Pending", tone: "pending" },
  approved: { label: "Approved", tone: "approved" },
  rejected: { label: "Rejected", tone: "rejected" },
  pending: { label: "Pending", tone: "pending" },
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
];

const extractRows = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.list)) return payload.list;
  if (Array.isArray(payload?.rows)) return payload.rows;
  if (Array.isArray(payload?.leaves)) return payload.leaves;
  if (Array.isArray(payload?.holidays)) return payload.holidays;
  return [];
};

const formatHolidayDate = (item = {}) => {
  const start =
    item.startDate ||
    item.start_date ||
    item.holidayDate ||
    item.holiday_date ||
    item.date ||
    "";
  const end = item.endDate || item.end_date || "";
  const startMoment = start ? moment(start) : null;
  const endMoment = end ? moment(end) : null;

  if (startMoment?.isValid() && endMoment?.isValid()) {
    const startLabel = startMoment.format("YYYY-MM-DD");
    const endLabel = endMoment.format("YYYY-MM-DD");
    return startLabel === endLabel ? startLabel : `${startLabel} - ${endLabel}`;
  }
  if (startMoment?.isValid()) return startMoment.format("YYYY-MM-DD");
  return start || end || "-";
};

const normalizeHolidayRow = (item = {}, index = 0) => {
  const isClosed =
    item.isClosed === true ||
    item.isClosed === 1 ||
    item.isClosed === "1" ||
    item.is_closed === true ||
    item.is_closed === 1;

  return {
    id: item.id ?? item._id ?? `holiday-${index}`,
    name: item.holidayName || item.holiday_name || item.name || "Holiday",
    type: isClosed ? "Closed" : item.type || "Company",
    date: formatHolidayDate(item),
    description: item.description || item.notes || "-",
  };
};

const capitalize = (value = "") => {
  const text = String(value).trim();
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

const normalizeStatus = (value) => {
  if (value == null || value === "") {
    return STATUS_META.pending;
  }
  if (typeof value === "number" || /^\d+$/.test(String(value).trim())) {
    return STATUS_META[Number(value)] || STATUS_META.pending;
  }
  const key = String(value).trim().toLowerCase();
  return STATUS_META[key] || STATUS_META.pending;
};

const normalizeLeaveRow = (item = {}, index = 0) => {
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
  const statusMeta = normalizeStatus(
    item.leaveStatus ?? item.leave_status ?? item.status
  );
  const leaveType = item.leaveType || item.leave_type || item.type || "";

  return {
    id: item.id ?? item._id ?? item.leaveId ?? `${employeeId || "leave"}-${index}`,
    employeeId,
    name,
    initials: name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join(""),
    avatarBg: AVATAR_COLORS[Number(employeeId || index) % AVATAR_COLORS.length],
    type: capitalize(leaveType) || leaveType || "-",
    start: startMoment?.isValid() ? startMoment.format("YYYY-MM-DD") : start || "-",
    end: endMoment?.isValid() ? endMoment.format("YYYY-MM-DD") : end || "-",
    days: Number(item.days ?? item.totalDays ?? item.total_days ?? computedDays) || 0,
    reason: item.reason || item.notes || "-",
    status: statusMeta.label,
    statusTone: statusMeta.tone,
  };
};

export default function HrLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [activeFilter, setActiveFilter] = useState(FILTER_KEYS.all);
  const [loading, setLoading] = useState(true);
  const [holidaysLoading, setHolidaysLoading] = useState(true);
  const [deletingHoliday, setDeletingHoliday] = useState(false);
  const [deleteHolidayTarget, setDeleteHolidayTarget] = useState(null);
  const [counts, setCounts] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    holidays: 0,
  });
  const [countsLoading, setCountsLoading] = useState(true);
  const [applyLeaveOpen, setApplyLeaveOpen] = useState(false);
  const [addHolidayOpen, setAddHolidayOpen] = useState(false);
  const { toaster } = useToaster();

  const fetchLeaveCounts = useCallback(async (isCancelled = () => false) => {
    try {
      setCountsLoading(true);
      const res = await axiosApiCall.get(API_ROUTER?.HR_LEAVE_COUNT);
      console.log("leave counts", res);
      if (isCancelled()) return;

      const summary = res?.data?.data ?? {};

      setCounts({
        pending: Number(summary.pendingLeaveCount ?? 0),
        approved: Number(summary.approvedLeaveCount ?? 0),
        rejected: Number(summary.rejectedLeaveCount ?? 0),
        holidays: Number(summary.holidayCount ?? 0),
      });
    } catch {
      if (!isCancelled()) {
        setCounts({
          pending: 0,
          approved: 0,
          rejected: 0,
          holidays: 0,
        });
      }
    } finally {
      if (!isCancelled()) setCountsLoading(false);
    }
  }, []);

  const fetchHolidays = useCallback(async (isCancelled = () => false) => {
    try {
      setHolidaysLoading(true);
      const res = await axiosApiCall.get(API_ROUTER?.GET_HOLIDAYS);
      if (isCancelled()) return;

      const payload = res?.data?.data ?? res?.data;
      const list = extractRows(payload).map(normalizeHolidayRow);
      setHolidays(list);
    } catch {
      if (!isCancelled()) setHolidays([]);
    } finally {
      if (!isCancelled()) setHolidaysLoading(false);
    }
  }, []);

  const fetchLeaves = useCallback(async (filterKey, isCancelled = () => false) => {
    if (filterKey === FILTER_KEYS.holidays) return;

    try {
      setLoading(true);
      const params = new URLSearchParams();
      const leaveStatus = LEAVE_STATUS_PARAM[filterKey];
      if (leaveStatus != null) {
        params.set("leaveStatus", String(leaveStatus));
      }

      const query = params.toString();
      const res = await axiosApiCall.get(
        query
          ? `${API_ROUTER?.HR_LEAVE_LIST}?${query}`
          : API_ROUTER?.HR_LEAVE_LIST
      );
      if (isCancelled()) return;

      // Response shape: { status, message, data: { list, isNextPage } }
      const responseBody = res?.data ?? {};
      const leaveData = responseBody?.data ?? {};
      const rawList = Array.isArray(leaveData?.list)
        ? leaveData.list
        : extractRows(leaveData);
      const list = rawList.map(normalizeLeaveRow);
      setLeaves(list);
    } catch {
      if (!isCancelled()) setLeaves([]);
    } finally {
      if (!isCancelled()) setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchLeaveCounts(() => cancelled);
    return () => {
      cancelled = true;
    };
  }, [fetchLeaveCounts]);

  useEffect(() => {
    let cancelled = false;
    fetchHolidays(() => cancelled);
    return () => {
      cancelled = true;
    };
  }, [fetchHolidays]);

  useEffect(() => {
    if (activeFilter === FILTER_KEYS.holidays) {
      setLoading(false);
      return undefined;
    }

    let cancelled = false;
    fetchLeaves(activeFilter, () => cancelled);
    return () => {
      cancelled = true;
    };
  }, [activeFilter, fetchLeaves]);

  const stats = useMemo(
    () => [
      {
        label: "Pending",
        value: counts.pending,
        icon: STAT_ICONS.pending,
      },
      {
        label: "Approved",
        value: counts.approved,
        icon: STAT_ICONS.approved,
      },
      {
        label: "Rejected",
        value: counts.rejected,
        icon: STAT_ICONS.rejected,
      },
      {
        label: "Holidays",
        value: counts.holidays,
        icon: STAT_ICONS.holidays,
      },
    ],
    [counts]
  );

  const filterTabs = useMemo(
    () => [
      { key: FILTER_KEYS.all, label: "All" },
      {
        key: FILTER_KEYS.pending,
        label: `Pending (${counts.pending})`,
      },
      {
        key: FILTER_KEYS.approved,
        label: `Approved (${counts.approved})`,
      },
      {
        key: FILTER_KEYS.rejected,
        label: `Rejected (${counts.rejected})`,
      },
      {
        key: FILTER_KEYS.holidays,
        label: `Holidays (${counts.holidays})`,
      },
    ],
    [counts]
  );

  const showHolidays = activeFilter === FILTER_KEYS.holidays;
  const showActionsColumn =
    activeFilter !== FILTER_KEYS.approved &&
    activeFilter !== FILTER_KEYS.rejected;

  const handleApprove = (id) => {
    setLeaves((prev) =>
      prev.map((row) =>
        row.id === id
          ? { ...row, status: "Approved", statusTone: "approved" }
          : row
      )
    );
    fetchLeaveCounts();
  };

  const handleReject = (id) => {
    setLeaves((prev) =>
      prev.map((row) =>
        row.id === id
          ? { ...row, status: "Rejected", statusTone: "rejected" }
          : row
      )
    );
    fetchLeaveCounts();
  };

  const handleDeleteHoliday = async () => {
    if (!deleteHolidayTarget?.id || deletingHoliday) return;

    try {
      setDeletingHoliday(true);
      const res = await axiosApiCall.post(
        `${API_ROUTER?.DELETE_HOLIDAY}?id=${deleteHolidayTarget.id}`
      );

      if (!res?.data?.status) {
        toaster(
          res?.data?.message || res?.message || "Failed to delete holiday",
          TOAST_TYPES.ERROR
        );
        return;
      }

      toaster(
        res?.data?.message || "Holiday removed successfully",
        TOAST_TYPES.SUCCESS
      );
      setDeleteHolidayTarget(null);
      await Promise.all([fetchHolidays(), fetchLeaveCounts()]);
    } catch {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setDeletingHoliday(false);
    }
  };

  const handleApplyLeave = () => {
    setActiveFilter(FILTER_KEYS.pending);
    fetchLeaveCounts();
    if (activeFilter === FILTER_KEYS.pending) {
      fetchLeaves(FILTER_KEYS.pending);
    }
  };

  const handleAddHoliday = () => {
    setActiveFilter(FILTER_KEYS.holidays);
    fetchHolidays();
    fetchLeaveCounts();
  };

  return (
    <>
      <HrPageHeader $inline $banded>
        <HrPageTitleBlock $inline>
          <h1>Leave Management</h1>
          <p>Track check-in/out, working hours, and overtime</p>
        </HrPageTitleBlock>
        <HrHeaderActions>
          <HrHeaderOutlineButton
            type="button"
            onClick={() => setAddHolidayOpen(true)}
          >
            <InlineSVG src={CALENDAR_BTN_ICON} />
            Add Holidays
          </HrHeaderOutlineButton>
          <HrPrimaryButton
            type="button"
            onClick={() => setApplyLeaveOpen(true)}
          >
            <InlineSVG src={PLUS_ICON} />
            Apply Leave
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
            <span className="stat-value">
              {countsLoading ? (
                <Skeleton width={40} height={28} />
              ) : (
                stat.value
              )}
            </span>
          </HrStatCard>
        ))}
      </HrMetricsGrid>

      <HrFilterTabs>
        {filterTabs.map((tab) => (
          <HrFilterTab
            key={tab.key}
            type="button"
            $active={activeFilter === tab.key}
            onClick={() => setActiveFilter(tab.key)}
          >
            {tab.label}
          </HrFilterTab>
        ))}
      </HrFilterTabs>

      <HrTableCard>
        <HrTableWrap>
          {showHolidays ? (
            holidaysLoading ? (
              <HrTable>
                <thead>
                  <tr>
                    <th>Holiday</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th style={{ textAlign: "right" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <tr key={`holiday-skeleton-${index}`}>
                      <td>
                        <Skeleton width={120} height={14} />
                      </td>
                      <td>
                        <Skeleton width={70} height={14} />
                      </td>
                      <td>
                        <Skeleton width={100} height={14} />
                      </td>
                      <td>
                        <Skeleton width={140} height={14} />
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <Skeleton width={18} height={18} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </HrTable>
            ) : (
            <HrTable>
              <thead>
                <tr>
                  <th>Holiday</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th style={{ textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {holidays.map((row) => (
                  <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>{row.type}</td>
                    <td>{row.date}</td>
                    <td>{row.description}</td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        type="button"
                        aria-label={`Delete ${row.name}`}
                        onClick={() => setDeleteHolidayTarget(row)}
                        style={{
                          appearance: "none",
                          border: "none",
                          background: "transparent",
                          padding: 0,
                          cursor: "pointer",
                          lineHeight: 0,
                        }}
                      >
                        <InlineSVG src={DELETE_ICON} />
                      </button>
                    </td>
                  </tr>
                ))}
                {!holidays.length && (
                  <tr>
                    <td
                      colSpan={5}
                      style={{ textAlign: "center", color: "#8391A1" }}
                    >
                      No holidays added yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </HrTable>
            )
          ) : loading ? (
            <HrTable>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Type</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Days</th>
                  <th>Reason</th>
                  <th>Status</th>
                  {showActionsColumn ? <th>Actions</th> : null}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }).map((_, index) => (
                  <tr key={`leave-skeleton-${index}`}>
                    <td>
                      <HrNameCell>
                        <Skeleton circle width={36} height={36} />
                        <Skeleton width={120} height={14} />
                      </HrNameCell>
                    </td>
                    <td>
                      <Skeleton width={60} height={14} />
                    </td>
                    <td>
                      <Skeleton width={90} height={14} />
                    </td>
                    <td>
                      <Skeleton width={90} height={14} />
                    </td>
                    <td>
                      <Skeleton width={30} height={14} />
                    </td>
                    <td>
                      <Skeleton width={100} height={14} />
                    </td>
                    <td>
                      <Skeleton width={70} height={24} borderRadius={999} />
                    </td>
                    {showActionsColumn ? (
                      <td>
                        <Skeleton width={60} height={28} />
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </HrTable>
          ) : (
            <HrTable>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Type</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Days</th>
                  <th>Reason</th>
                  <th>Status</th>
                  {showActionsColumn ? <th>Actions</th> : null}
                </tr>
              </thead>
              <tbody>
                {leaves.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <HrNameCell>
                        <HrAvatar $bg={row.avatarBg}>{row.initials}</HrAvatar>
                        {row.name}
                      </HrNameCell>
                    </td>
                    <td>{row.type}</td>
                    <td>{row.start}</td>
                    <td>{row.end}</td>
                    <td>{row.days}</td>
                    <td>{row.reason}</td>
                    <td>
                      <HrPill $tone={row.statusTone}>{row.status}</HrPill>
                    </td>
                    {showActionsColumn ? (
                      <td>
                        {row.statusTone === "pending" ? (
                          <HrActionButtons>
                            <button
                              type="button"
                              className="approve"
                              aria-label={`Approve leave for ${row.name}`}
                              onClick={() => handleApprove(row.id)}
                            >
                              <InlineSVG src={CHECK_ICON} />
                            </button>
                            <button
                              type="button"
                              className="reject"
                              aria-label={`Reject leave for ${row.name}`}
                              onClick={() => handleReject(row.id)}
                            >
                              <InlineSVG src={CROSS_ICON} />
                            </button>
                          </HrActionButtons>
                        ) : null}
                      </td>
                    ) : null}
                  </tr>
                ))}
                {!leaves.length && (
                  <tr>
                    <td
                      colSpan={showActionsColumn ? 8 : 7}
                      style={{ textAlign: "center", color: "#8391A1" }}
                    >
                      No leave requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </HrTable>
          )}
        </HrTableWrap>
      </HrTableCard>

      <ApplyLeaveModal
        open={applyLeaveOpen}
        onClose={() => setApplyLeaveOpen(false)}
        onSave={handleApplyLeave}
      />

      <AddHolidayModal
        open={addHolidayOpen}
        onClose={() => setAddHolidayOpen(false)}
        onSave={handleAddHoliday}
      />

      <DeleteHolidayModal
        open={Boolean(deleteHolidayTarget)}
        holidayName={deleteHolidayTarget?.name || ""}
        loading={deletingHoliday}
        onClose={() => {
          if (!deletingHoliday) setDeleteHolidayTarget(null);
        }}
        onConfirm={handleDeleteHoliday}
      />
    </>
  );
}
