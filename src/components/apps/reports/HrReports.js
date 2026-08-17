"use client";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactDatePicker from "react-datepicker";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import InlineSVG from "svg-inline-react";
import * as XLSX from "xlsx";
import { API_ROUTER } from "@/services/apiRouter";
import {
  HrAvatar,
  HrDateField,
  HrFilterField,
  HrHeaderActions,
  HrHeaderOutlineButton,
  HrMetricsGrid,
  HrNameCell,
  HrPageHeader,
  HrPageTitleBlock,
  HrPill,
  HrStatCard,
  HrTable,
  HrTableCard,
  HrTableWrap,
} from "@/styles/pages/hr-module.style";
import axiosApiCall from "@/utils/axios";

const CHEVRON_ICON = `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const CALENDAR_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6693 2.66536H11.3359V1.9987C11.3359 1.82189 11.2657 1.65232 11.1407 1.52729C11.0157 1.40227 10.8461 1.33203 10.6693 1.33203C10.4925 1.33203 10.3229 1.40227 10.1979 1.52729C10.0728 1.65232 10.0026 1.82189 10.0026 1.9987V2.66536H6.0026V1.9987C6.0026 1.82189 5.93237 1.65232 5.80734 1.52729C5.68232 1.40227 5.51275 1.33203 5.33594 1.33203C5.15913 1.33203 4.98956 1.40227 4.86453 1.52729C4.73951 1.65232 4.66927 1.82189 4.66927 1.9987V2.66536H3.33594C2.8055 2.66536 2.2968 2.87608 1.92172 3.25115C1.54665 3.62622 1.33594 4.13493 1.33594 4.66536V12.6654C1.33594 13.1958 1.54665 13.7045 1.92172 14.0796C2.2968 14.4547 2.8055 14.6654 3.33594 14.6654H12.6693C13.1997 14.6654 13.7084 14.4547 14.0835 14.0796C14.4586 13.7045 14.6693 13.1958 14.6693 12.6654V4.66536C14.6693 4.13493 14.4586 3.62622 14.0835 3.25115C13.7084 2.87608 13.1997 2.66536 12.6693 2.66536ZM13.3359 12.6654C13.3359 12.8422 13.2657 13.0117 13.1407 13.1368C13.0157 13.2618 12.8461 13.332 12.6693 13.332H3.33594C3.15913 13.332 2.98956 13.2618 2.86453 13.1368C2.73951 13.0117 2.66927 12.8422 2.66927 12.6654V7.9987H13.3359V12.6654ZM13.3359 6.66536H2.66927V4.66536C2.66927 4.48855 2.73951 4.31898 2.86453 4.19396C2.98956 4.06894 3.15913 3.9987 3.33594 3.9987H4.66927V4.66536C4.66927 4.84218 4.73951 5.01174 4.86453 5.13677C4.98956 5.26179 5.15913 5.33203 5.33594 5.33203C5.51275 5.33203 5.68232 5.26179 5.80734 5.13677C5.93237 5.01174 6.0026 4.84218 6.0026 4.66536V3.9987H10.0026V4.66536C10.0026 4.84218 10.0728 5.01174 10.1979 5.13677C10.3229 5.26179 10.4925 5.33203 10.6693 5.33203C10.8461 5.33203 11.0157 5.26179 11.1407 5.13677C11.2657 5.01174 11.3359 4.84218 11.3359 4.66536V3.9987H12.6693C12.8461 3.9987 13.0157 4.06894 13.1407 4.19396C13.2657 4.31898 13.3359 4.48855 13.3359 4.66536V6.66536Z" fill="#295086"/>
</svg>`;
const CLEAR_ICON = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 3L3 9M3 3l6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
const EXPORT_CSV_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.3538 5.14625L9.85375 1.64625C9.80728 1.59983 9.75212 1.56303 9.69143 1.53793C9.63073 1.51284 9.56568 1.49995 9.5 1.5H3.5C3.23478 1.5 2.98043 1.60536 2.79289 1.79289C2.60536 1.98043 2.5 2.23478 2.5 2.5V13.5C2.5 13.7652 2.60536 14.0196 2.79289 14.2071C2.98043 14.3946 3.23478 14.5 3.5 14.5H12.5C12.7652 14.5 13.0196 14.3946 13.2071 14.2071C13.3946 14.0196 13.5 13.7652 13.5 13.5V5.5C13.5001 5.43432 13.4872 5.36927 13.4621 5.30858C13.437 5.24788 13.4002 5.19272 13.3538 5.14625ZM10 3.20688L11.7931 5H10V3.20688ZM12.5 13.5H3.5V2.5H9V5.5C9 5.63261 9.05268 5.75979 9.14645 5.85355C9.24021 5.94732 9.36739 6 9.5 6H12.5V13.5ZM9.85375 9.64625C9.90024 9.69269 9.93712 9.74783 9.96228 9.80853C9.98744 9.86923 10.0004 9.93429 10.0004 10C10.0004 10.0657 9.98744 10.1308 9.96228 10.1915C9.93712 10.2522 9.90024 10.3073 9.85375 10.3538L8.35375 11.8538C8.30731 11.9002 8.25217 11.9371 8.19147 11.9623C8.13077 11.9874 8.06571 12.0004 8 12.0004C7.93429 12.0004 7.86923 11.9874 7.80853 11.9623C7.74783 11.9371 7.69269 11.9002 7.64625 11.8538L6.14625 10.3538C6.05243 10.2599 5.99972 10.1327 5.99972 10C5.99972 9.86732 6.05243 9.74007 6.14625 9.64625C6.24007 9.55243 6.36732 9.49972 6.5 9.49972C6.63268 9.49972 6.75993 9.55243 6.85375 9.64625L7.5 10.2931V7.5C7.5 7.36739 7.55268 7.24021 7.64645 7.14645C7.74021 7.05268 7.86739 7 8 7C8.13261 7 8.25979 7.05268 8.35355 7.14645C8.44732 7.24021 8.5 7.36739 8.5 7.5V10.2931L9.14625 9.64625C9.19269 9.59976 9.24783 9.56288 9.30853 9.53772C9.36923 9.51256 9.43429 9.49961 9.5 9.49961C9.56571 9.49961 9.63077 9.51256 9.69147 9.53772C9.75217 9.56288 9.80731 9.59976 9.85375 9.64625Z" fill="#295086"/>
</svg>
`;

const EXPORT_EXCEL_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.3531 4.50938L9.99063 1.14688C9.89688 1.05313 9.77031 1 9.6375 1H3C2.72344 1 2.5 1.22344 2.5 1.5V14.5C2.5 14.7766 2.72344 15 3 15H13C13.2766 15 13.5 14.7766 13.5 14.5V4.86406C13.5 4.73125 13.4469 4.60313 13.3531 4.50938ZM12.3469 5.09375H9.40625V2.15313L12.3469 5.09375ZM12.375 13.875H3.625V2.125H8.34375V5.5C8.34375 5.67405 8.41289 5.84097 8.53596 5.96404C8.65903 6.08711 8.82595 6.15625 9 6.15625H12.375V13.875ZM8.03281 9.06406L7.06719 7.46406C7.03281 7.40781 6.97188 7.37344 6.90625 7.37344H6.30625C6.27031 7.37344 6.23594 7.38281 6.20625 7.40312C6.11875 7.45781 6.09219 7.57344 6.14844 7.6625L7.43437 9.7L6.13125 11.775C6.11354 11.8035 6.10376 11.8361 6.10292 11.8696C6.10208 11.9031 6.1102 11.9363 6.12645 11.9656C6.1427 11.9949 6.16649 12.0193 6.19535 12.0364C6.22422 12.0534 6.25711 12.0624 6.29063 12.0625H6.82969C6.89531 12.0625 6.95469 12.0281 6.98906 11.9734L7.96875 10.3875L8.94219 11.9719C8.97656 12.0281 9.0375 12.0609 9.10156 12.0609H9.6875C9.72344 12.0609 9.75781 12.05 9.78906 12.0312C9.87656 11.975 9.90156 11.8594 9.84531 11.7719L8.53281 9.73438L9.86563 7.66406C9.88367 7.63569 9.89377 7.60299 9.89489 7.56939C9.89601 7.53578 9.88811 7.50249 9.87199 7.47298C9.85588 7.44346 9.83215 7.41881 9.80328 7.40158C9.7744 7.38435 9.74144 7.37517 9.70781 7.375H9.15C9.08437 7.375 9.02344 7.40937 8.98906 7.46562L8.03281 9.06406Z" fill="#295086"/>
</svg>
`;

const EXPORT_PDF_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.30156 8.975L8.30625 8.95312C8.39687 8.57969 8.51094 8.11406 8.42188 7.69219C8.3625 7.35938 8.11719 7.22969 7.90781 7.22031C7.66094 7.20937 7.44063 7.35 7.38594 7.55469C7.28281 7.92969 7.375 8.44219 7.54375 9.09531C7.33125 9.60156 6.99219 10.3375 6.74375 10.775C6.28125 11.0141 5.66094 11.3828 5.56875 11.8484C5.55 11.9344 5.57187 12.0437 5.62344 12.1422C5.68125 12.2516 5.77344 12.3359 5.88125 12.3766C5.92812 12.3937 5.98438 12.4078 6.05 12.4078C6.325 12.4078 6.77031 12.1859 7.36406 11.1672C7.45469 11.1375 7.54844 11.1062 7.63906 11.075C8.06406 10.9312 8.50469 10.7812 8.90312 10.7141C9.34375 10.95 9.84531 11.1016 10.1859 11.1016C10.5234 11.1016 10.6562 10.9016 10.7063 10.7812C10.7937 10.5703 10.7516 10.3047 10.6094 10.1625C10.4031 9.95938 9.90156 9.90625 9.12031 10.0031C8.73594 9.76875 8.48438 9.45 8.30156 8.975ZM6.5875 11.3484C6.37031 11.6641 6.20625 11.8219 6.11719 11.8906C6.22187 11.6984 6.42656 11.4953 6.5875 11.3484ZM7.95625 7.66875C8.0375 7.80781 8.02656 8.22813 7.96406 8.44063C7.8875 8.12969 7.87656 7.68906 7.92188 7.6375C7.93437 7.63906 7.94531 7.64844 7.95625 7.66875ZM7.93125 9.55156C8.09844 9.84062 8.30938 10.0891 8.54219 10.2734C8.20469 10.35 7.89687 10.4766 7.62187 10.5891C7.55625 10.6156 7.49219 10.6422 7.42969 10.6672C7.6375 10.2906 7.81094 9.86406 7.93125 9.55156ZM10.3625 10.575C10.3641 10.5781 10.3656 10.5828 10.3562 10.5891H10.3531L10.35 10.5938C10.3375 10.6016 10.2094 10.6766 9.65781 10.4594C10.2922 10.4297 10.3609 10.5734 10.3625 10.575ZM13.3531 4.50938L9.99063 1.14688C9.89688 1.05313 9.77031 1 9.6375 1H3C2.72344 1 2.5 1.22344 2.5 1.5V14.5C2.5 14.7766 2.72344 15 3 15H13C13.2766 15 13.5 14.7766 13.5 14.5V4.86406C13.5 4.73125 13.4469 4.60313 13.3531 4.50938ZM12.3469 5.09375H9.40625V2.15313L12.3469 5.09375ZM12.375 13.875H3.625V2.125H8.34375V5.5C8.34375 5.67405 8.41289 5.84097 8.53596 5.96404C8.65903 6.08711 8.82595 6.15625 9 6.15625H12.375V13.875Z" fill="#295086"/>
</svg>
`;

const STAT_ICONS = {
  payroll: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M26.5002 15.0001V12C26.5002 11.7348 26.3948 11.4804 26.2073 11.2929C26.0197 11.1054 25.7654 11 25.5002 11H12.5C11.9696 11 11.4609 11.2107 11.0858 11.5858C10.7107 11.9609 10.5 12.4696 10.5 13.0001C10.5 13.5305 10.7107 14.0392 11.0858 14.4143C11.4609 14.7894 11.9696 15.0001 12.5 15.0001H27.5002C27.7654 15.0001 28.0198 15.1055 28.2073 15.293C28.3948 15.4806 28.5002 15.7349 28.5002 16.0001V20.0003M28.5002 20.0003H25.5002C24.9697 20.0003 24.461 20.211 24.0859 20.5861C23.7109 20.9611 23.5001 21.4699 23.5001 22.0003C23.5001 22.5308 23.7109 23.0395 24.0859 23.4146C24.461 23.7896 24.9697 24.0004 25.5002 24.0004H28.5002C28.7654 24.0004 29.0198 23.895 29.2073 23.7075C29.3948 23.5199 29.5002 23.2656 29.5002 23.0003V21.0003C29.5002 20.7351 29.3948 20.4807 29.2073 20.2932C29.0198 20.1056 28.7654 20.0003 28.5002 20.0003Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5 13V27.0004C10.5 27.5308 10.7107 28.0396 11.0858 28.4147C11.4609 28.7897 11.9696 29.0005 12.5 29.0005H27.5002C27.7654 29.0005 28.0198 28.8951 28.2073 28.7076C28.3948 28.52 28.5002 28.2656 28.5002 28.0004V24.0003" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  attendance: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M12.4817 29.5122C11.9368 29.5122 11.4704 29.3213 11.0826 28.9395C10.6949 28.5577 10.5007 28.0982 10.5 27.561V13.9024C10.5 13.3659 10.6942 12.9067 11.0826 12.5249C11.4711 12.1431 11.9374 11.9519 12.4817 11.9512H13.4726V10H15.4544V11.9512H23.3814V10H25.3631V11.9512H26.354C26.899 11.9512 27.3657 12.1424 27.7541 12.5249C28.1425 12.9073 28.3364 13.3665 28.3357 13.9024V20.122L26.354 22.0732V17.8049H12.4817V27.561H18.6252L20.6069 29.5122H12.4817ZM12.4817 15.8537H26.354V13.9024H12.4817V15.8537ZM23.9263 30L20.4087 26.5366L21.796 25.1707L23.9016 27.2439L28.1128 23.0976L29.5 24.4878L23.9263 30Z" fill="white"/>
</svg>
`,
  leave: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M19.5 29H13C12.4696 29 11.9609 28.7893 11.5858 28.4142C11.2107 28.0391 11 27.5304 11 27V15C11 14.4696 11.2107 13.9609 11.5858 13.5858C11.9609 13.2107 12.4696 13 13 13H25C25.5304 13 26.0391 13.2107 26.4142 13.5858C26.7893 13.9609 27 14.4696 27 15V23M23 11V15M15 11V15M11 19H27M23 27H29" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  tips: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M19.1667 22.5013H20.8333C21.2754 22.5013 21.6993 22.3257 22.0118 22.0131C22.3244 21.7006 22.5 21.2767 22.5 20.8346C22.5 20.3926 22.3244 19.9687 22.0118 19.6561C21.6993 19.3436 21.2754 19.168 20.8333 19.168H18.3333C17.8333 19.168 17.4167 19.3346 17.1667 19.668L12.5 24.168" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.8307 27.5032L17.1641 26.3365C17.4141 26.0032 17.8307 25.8365 18.3307 25.8365H21.6641C22.5807 25.8365 23.4141 25.5032 23.9974 24.8365L27.8307 21.1698C28.1523 20.8659 28.34 20.4467 28.3525 20.0045C28.365 19.5622 28.2013 19.1331 27.8974 18.8115C27.5935 18.4899 27.1743 18.3022 26.732 18.2897C26.2898 18.2772 25.8606 18.4409 25.5391 18.7448L22.0391 21.9948M11.6641 23.3365L16.6641 28.3365" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M23.3307 19.9193C24.6654 19.9193 25.7474 18.8373 25.7474 17.5026C25.7474 16.1679 24.6654 15.0859 23.3307 15.0859C21.996 15.0859 20.9141 16.1679 20.9141 17.5026C20.9141 18.8373 21.996 19.9193 23.3307 19.9193Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 16.668C16.3807 16.668 17.5 15.5487 17.5 14.168C17.5 12.7873 16.3807 11.668 15 11.668C13.6193 11.668 12.5 12.7873 12.5 14.168C12.5 15.5487 13.6193 16.668 15 16.668Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
};

const REPORT_OPTIONS = [
  "Employee Payroll Report",
  "Attendance Report",
  "Leave Report",
  "Overtime Report",
  "Tip Report",
  "Salary Summary",
];

const REPORT_CONFIG = {
  "Employee Payroll Report": {
    heading: "Payroll Report",
    count: 0,
  },
  "Attendance Report": {
    heading: "Attendance Report",
    count: 0,
  },
  "Leave Report": {
    heading: "Leave Report",
    count: 0,
  },
  "Overtime Report": {
    heading: "Overtime Report",
    count: 0,
  },
  "Tip Report": {
    heading: "Tip Report",
    count: 0,
  },
  "Salary Summary": {
    heading: "Salary Summary",
    count: 0,
  },
};

const PAGE_LIMIT = 10;
const REPORTS_SCROLL_ID = "hr-reports-scroll";

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

const API_REPORT_ENDPOINTS = {
  "Employee Payroll Report": "HR_PAYROLL_REPORT",
  "Attendance Report": "HR_ATTENDANCE_REPORT",
  "Leave Report": "HR_LEAVE_REPORT",
  "Overtime Report": "HR_OVERTIME_REPORT",
  "Tip Report": "HR_TIPS_HISTORY",
  "Salary Summary": "HR_SALARY_REPORT",
};

const extractRows = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.list)) return payload.list;
  if (Array.isArray(payload?.rows)) return payload.rows;
  if (Array.isArray(payload?.reports)) return payload.reports;
  if (Array.isArray(payload?.attendance)) return payload.attendance;
  if (Array.isArray(payload?.leaves)) return payload.leaves;
  if (Array.isArray(payload?.overtime)) return payload.overtime;
  if (Array.isArray(payload?.tips)) return payload.tips;
  if (Array.isArray(payload?.history)) return payload.history;
  if (Array.isArray(payload?.payrolls)) return payload.payrolls;
  if (Array.isArray(payload?.payroll)) return payload.payroll;
  if (Array.isArray(payload?.salaries)) return payload.salaries;
  if (Array.isArray(payload?.salary)) return payload.salary;
  return [];
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
    (typeof item.employee === "string" ? item.employee : "") ||
    employee?.name ||
    employee?.fullName ||
    [employee?.firstName, employee?.lastName].filter(Boolean).join(" ") ||
    item.therapist?.name ||
    "Employee"
  );
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "E";

const normalizeStatusTone = (value) => {
  const key = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");
  if (key === "halfday" || key === "half-day") return "halfday";
  if (key === "late") return "late";
  if (key === "absent") return "absent";
  if (key === "approved") return "approved";
  if (key === "rejected") return "rejected";
  if (key === "pending") return "pending";
  if (key === "paid" || key === "payroll-paid" || key === "payrollpaid") {
    return "payroll-paid";
  }
  if (key === "processed") return "processed";
  if (key === "present") return "present";
  if (key === "available") return "available";
  if (key === "withdrawn") return "withdrawn";
  return key || "present";
};

const formatDateValue = (value) => {
  if (!value) return "-";
  const parsed = moment(value);
  return parsed.isValid() ? parsed.format("YYYY-MM-DD") : String(value);
};

const formatDateTimeValue = (value) => {
  if (!value) return "-";
  const parsed = moment(value);
  return parsed.isValid() ? parsed.format("YYYY-MM-DD HH:mm:ss") : String(value);
};

const formatTimeValue = (value) => {
  if (!value) return "-";
  const parsed = moment(value, ["HH:mm", "HH:mm:ss", "hh:mm A", moment.ISO_8601], true);
  if (parsed.isValid()) return parsed.format("HH:mm");
  const asDate = moment(value);
  return asDate.isValid() ? asDate.format("HH:mm") : String(value);
};

const capitalize = (value = "") => {
  const text = String(value).trim();
  if (!text) return "-";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const formatMoney = (value) => {
  if (value == null || value === "") return "$0";
  if (typeof value === "string" && value.trim().startsWith("$")) return value;
  const amount = Number(value);
  if (Number.isNaN(amount)) return String(value);
  return `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
};

const withEmployeeMeta = (item = {}, index = 0) => {
  const employeeId =
    item.employeeId ??
    item.employee_id ??
    item.employee?.id ??
    item.employee?._id ??
    index;
  const employee = getEmployeeName(item);
  return {
    employeeId,
    employee,
    initials: getInitials(employee),
    avatarBg: AVATAR_COLORS[Number(employeeId || index) % AVATAR_COLORS.length],
  };
};

const normalizeAttendanceReportRow = (item = {}, index = 0) => {
  const status = item.status || item.attendanceStatus || "Present";
  return {
    id: item.id ?? item._id ?? `attendance-${index}`,
    ...withEmployeeMeta(item, index),
    date: formatDateValue(item.date || item.attendanceDate),
    notes: item.notes || item.note || "-",
    overtimeHrs: Number(item.overtimeHrs ?? item.overtimeHours ?? item.overtime ?? 0),
    checkInTime: formatTimeValue(item.checkInTime || item.checkIn || item.check_in),
    workingDays: Number(item.workingDays ?? item.working_days ?? 0),
    checkOutTime: formatTimeValue(item.checkOutTime || item.checkOut || item.check_out),
    breakDuration: Number(
      item.breakDuration ?? item.breakMin ?? item.break_duration ?? 0
    ),
    status: capitalize(status),
    statusTone: normalizeStatusTone(status),
    createdDate: formatDateTimeValue(
      item.createdDate || item.createdAt || item.created_at
    ),
  };
};

const normalizeLeaveReportRow = (item = {}, index = 0) => {
  const status = item.status || item.leaveStatus || "Pending";
  const statusLabel =
    typeof status === "number"
      ? ({ 1: "Approved", 2: "Rejected", 3: "Pending" }[status] || "Pending")
      : capitalize(status);

  return {
    id: item.id ?? item._id ?? `leave-${index}`,
    ...withEmployeeMeta(item, index),
    endDate: formatDateValue(item.endDate || item.end_date || item.end),
    reason: item.reason || item.notes || "-",
    approvedBy: item.approvedBy || item.approved_by || item.approverName || "-",
    leaveType: capitalize(item.leaveType || item.leave_type || item.type || "-"),
    numberOfDays: Number(
      item.numberOfDays ??
        item.days ??
        item.totalDays ??
        item.total_days ??
        0
    ),
    appliedDate: formatDateValue(
      item.appliedDate || item.applied_date || item.createdAt
    ),
    startDate: formatDateValue(item.startDate || item.start_date || item.start),
    status: statusLabel,
    statusTone: normalizeStatusTone(statusLabel),
    createdDate: formatDateTimeValue(
      item.createdDate || item.createdAt || item.created_at
    ),
  };
};

const normalizeOvertimeReportRow = (item = {}, index = 0) => {
  const status = item.status || "Approved";
  return {
    id: item.id ?? item._id ?? `overtime-${index}`,
    ...withEmployeeMeta(item, index),
    date: formatDateValue(item.date || item.overtimeDate || item.attendanceDate),
    overtimeHrs: Number(
      item.overtimeHrs ?? item.overtimeHours ?? item.overtime ?? 0
    ),
    overtimeAmount:
      item.overtimeAmount ||
      item.overtime_amount ||
      item.amount ||
      "$0",
    checkInTime: formatTimeValue(item.checkInTime || item.checkIn || item.check_in),
    checkOutTime: formatTimeValue(
      item.checkOutTime || item.checkOut || item.check_out
    ),
    notes: item.notes || item.note || "-",
    workingDays: Number(item.workingDays ?? item.working_days ?? 0),
    status: capitalize(status),
    statusTone: normalizeStatusTone(status),
    createdDate: formatDateTimeValue(
      item.createdDate || item.createdAt || item.created_at
    ),
  };
};

const normalizeTipReportRow = (item = {}, index = 0) => {
  const status = item.status || item.tipStatus || "Available";
  return {
    id: item.id ?? item._id ?? `tip-${index}`,
    ...withEmployeeMeta(item, index),
    date: formatDateValue(item.date || item.paidAt || item.tipDate),
    payoutOption: capitalize(
      item.payoutOption || item.payoutType || item.payout || "-"
    ),
    notes: item.notes || item.note || "-",
    customerName: item.customerName || item.customer || "-",
    tipDate: formatDateValue(item.tipDate || item.paidAt || item.date),
    paymentMethod: capitalize(
      item.paymentMethod || item.tipType || item.method || "-"
    ),
    status: capitalize(status),
    statusTone: normalizeStatusTone(status),
    createdDate: formatDateTimeValue(
      item.createdDate || item.createdAt || item.created_at
    ),
  };
};

const normalizePayrollReportRow = (item = {}, index = 0, prefix = "payroll") => {
  const status = item.status || item.payrollStatus || "Processed";
  const paidLeave = Number(item.paidLeave ?? item.paid_leave ?? 0);
  const unpaidLeave = Number(item.unpaidLeave ?? item.unpaid_leave ?? 0);

  return {
    id: item.id ?? item._id ?? `${prefix}-${index}`,
    ...withEmployeeMeta(item, index),
    netSalary: formatMoney(item.netSalary ?? item.net_salary),
    workingDays: Number(item.workingDays ?? item.working_days ?? 0),
    overtimeHrs: Number(
      item.overtimeHrs ?? item.overtimeHours ?? item.overtime ?? 0
    ),
    paidUnpaidLeave:
      item.paidUnpaidLeave ||
      item.paid_unpaid_leave ||
      `${paidLeave}/${unpaidLeave}`,
    deductions: formatMoney(item.deductions ?? item.deduction ?? 0),
    tips: formatMoney(item.tips ?? item.tipAmount ?? 0),
    periodEnd: formatDateValue(
      item.periodEndDate || item.periodEnd || item.endDate
    ),
    baseSalary: formatMoney(item.baseSalary ?? item.base_salary),
    periodStart: formatDateValue(
      item.periodStartDate || item.periodStart || item.startDate
    ),
    overtimeAmount: formatMoney(
      item.overtimeAmount ?? item.overtime_amount ?? 0
    ),
    salaryType: capitalize(
      item.salaryType || item.salary_type || item.payType || "-"
    ),
    status: capitalize(status),
    statusTone: normalizeStatusTone(status),
    createdDate: formatDateTimeValue(
      item.createdDate || item.createdAt || item.created_at
    ),
  };
};

const normalizeReportRows = (reportType, list = []) => {
  if (reportType === "Attendance Report") {
    return list.map(normalizeAttendanceReportRow);
  }
  if (reportType === "Leave Report") {
    return list.map(normalizeLeaveReportRow);
  }
  if (reportType === "Overtime Report") {
    return list.map(normalizeOvertimeReportRow);
  }
  if (reportType === "Tip Report") {
    return list.map(normalizeTipReportRow);
  }
  if (reportType === "Employee Payroll Report") {
    return list.map((item, index) =>
      normalizePayrollReportRow(item, index, "payroll")
    );
  }
  if (reportType === "Salary Summary") {
    return list.map((item, index) =>
      normalizePayrollReportRow(item, index, "salary")
    );
  }
  return list;
};

const getColumnsForReport = (reportType) => {
  switch (reportType) {
    case "Attendance Report":
      return {
        minWidth: "1100px",
        columns: [
          { key: "date", label: "Date" },
          { key: "notes", label: "Notes" },
          { key: "overtimeHrs", label: "Overtime Hrs" },
          { key: "checkInTime", label: "Check In Time" },
          { key: "workingDays", label: "Working Days" },
          { key: "checkOutTime", label: "Check Out Time" },
          { key: "employee", label: "Employee", type: "employee" },
          { key: "breakDuration", label: "Break Duration" },
          { key: "status", label: "Status", type: "status" },
          { key: "createdDate", label: "Created Date" },
        ],
      };
    case "Leave Report":
      return {
        minWidth: "1200px",
        columns: [
          { key: "endDate", label: "End Date" },
          { key: "reason", label: "Reason" },
          { key: "approvedBy", label: "Approved By" },
          { key: "leaveType", label: "Leave Type" },
          { key: "numberOfDays", label: "Number Of Days" },
          { key: "employee", label: "Employee", type: "employee" },
          { key: "appliedDate", label: "Applied Date" },
          { key: "startDate", label: "Start Date" },
          { key: "status", label: "Status", type: "status" },
          { key: "createdDate", label: "Created Date" },
        ],
      };
    case "Overtime Report":
      return {
        minWidth: "1100px",
        columns: [
          { key: "date", label: "Date" },
          { key: "employee", label: "Employee", type: "employee" },
          { key: "overtimeHrs", label: "Overtime Hrs" },
          { key: "overtimeAmount", label: "Overtime Amount" },
          { key: "checkInTime", label: "Check In Time" },
          { key: "checkOutTime", label: "Check Out Time" },
          { key: "notes", label: "Notes" },
          { key: "status", label: "Status", type: "status" },
          { key: "createdDate", label: "Created Date" },
        ],
      };
    case "Tip Report":
      return {
        minWidth: "1200px",
        columns: [
          { key: "date", label: "Date" },
          { key: "payoutOption", label: "Payout Option" },
          { key: "notes", label: "Notes" },
          { key: "employee", label: "Employee", type: "employee" },
          { key: "customerName", label: "Customer Name" },
          { key: "tipDate", label: "Tip Date" },
          { key: "paymentMethod", label: "Payment Method" },
          { key: "status", label: "Status", type: "status" },
          { key: "createdDate", label: "Created Date" },
        ],
      };
    case "Salary Summary":
    case "Employee Payroll Report":
    default:
      return {
        minWidth: "1250px",
        columns: [
          { key: "netSalary", label: "Net Salary" },
          { key: "workingDays", label: "Working Days" },
          { key: "overtimeHrs", label: "Overtime Hrs" },
          { key: "employee", label: "Employee", type: "employee" },
          { key: "paidUnpaidLeave", label: "Paid/Unpaid Leave" },
          { key: "deductions", label: "Deductions", type: "negative" },
          { key: "tips", label: "Tips" },
          { key: "periodEnd", label: "Period End" },
          { key: "baseSalary", label: "Base Salary" },
          { key: "periodStart", label: "Period Start" },
          { key: "overtimeAmount", label: "Overtime Amount" },
          { key: "salaryType", label: "Salary Type" },
          { key: "status", label: "Status", type: "status" },
          { key: "createdDate", label: "Created Date" },
        ],
      };
  }
};

export default function HrReports() {
  const [reportType, setReportType] = useState("Employee Payroll Report");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [statsCounts, setStatsCounts] = useState({
    payroll: 0,
    attendance: 0,
    leave: 0,
    tip: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  const isApiReport = Boolean(API_REPORT_ENDPOINTS[reportType]);

  const startDateValue = startDate
    ? moment(startDate).format("YYYY-MM-DD")
    : "";
  const endDateValue = endDate ? moment(endDate).format("YYYY-MM-DD") : "";

  const fetchReportsCount = useCallback(
    async (isCancelled = () => false) => {
      try {
        setStatsLoading(true);
        const params = new URLSearchParams();
        if (startDateValue) params.set("startDate", startDateValue);
        if (endDateValue) params.set("endDate", endDateValue);

        const query = params.toString();
        const res = await axiosApiCall.get(
          query
            ? `${API_ROUTER?.HR_REPORTS_COUNT}?${query}`
            : API_ROUTER?.HR_REPORTS_COUNT
        );
        if (isCancelled()) return;

        const summary = res?.data?.data ?? res?.data ?? {};
        setStatsCounts({
          payroll: Number(
            summary.payrollCount ??
              summary.payrollRecords ??
              summary.payroll ??
              0
          ),
          attendance: Number(
            summary.attendanceCount ??
              summary.attendanceRecords ??
              summary.attendance ??
              0
          ),
          leave: Number(
            summary.leaveCount ??
              summary.leaveRequests ??
              summary.leave ??
              0
          ),
          tip: Number(
            summary.tipCount ?? summary.tipRecords ?? summary.tips ?? 0
          ),
        });
      } catch {
        if (!isCancelled()) {
          setStatsCounts({
            payroll: 0,
            attendance: 0,
            leave: 0,
            tip: 0,
          });
        }
      } finally {
        if (!isCancelled()) setStatsLoading(false);
      }
    },
    [endDateValue, startDateValue]
  );

  useEffect(() => {
    let cancelled = false;
    fetchReportsCount(() => cancelled);
    return () => {
      cancelled = true;
    };
  }, [fetchReportsCount]);

  const reportMeta = useMemo(() => {
    const base =
      REPORT_CONFIG[reportType] || REPORT_CONFIG["Employee Payroll Report"];
    return {
      ...base,
      count: isApiReport ? totalCount : base.count,
    };
  }, [isApiReport, reportType, totalCount]);

  const columnConfig = useMemo(
    () => getColumnsForReport(reportType),
    [reportType]
  );

  const tableRows = rows;

  const handleDateRangeChange = (dates) => {
    const [start, end] = dates || [null, null];
    setStartDate(start);
    setEndDate(end);
  };

  const handleClearDateRange = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const hasDateRange = Boolean(startDate || endDate);

  const fetchReport = useCallback(
    async (pageNum, isCancelled = () => false) => {
      const endpointKey = API_REPORT_ENDPOINTS[reportType];
      if (!endpointKey) return;

      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.set("page", String(pageNum));
        params.set("limit", String(PAGE_LIMIT));
        if (startDateValue) params.set("startDate", startDateValue);
        if (endDateValue) params.set("endDate", endDateValue);

        const res = await axiosApiCall.get(
          `${API_ROUTER?.[endpointKey]}?${params.toString()}`
        );
        console.log("res report", res);
        if (isCancelled()) return;

        const resData = res?.data ?? {};
        const payload = resData?.data ?? resData;
        const rawList = extractRows(payload);
        const list = normalizeReportRows(reportType, rawList);

        setRows((prev) => {
          if (pageNum === 1) return list;
          const existingIds = new Set(prev.map((row) => String(row.id)));
          return [
            ...prev,
            ...list.filter((row) => !existingIds.has(String(row.id))),
          ];
        });

        const isNextPage = Boolean(
          payload?.isNextPage ?? resData?.isNextPage ?? false
        );
        const total = Number(
          payload?.total ??
            payload?.pagination?.total ??
            resData?.total ??
            0
        );

        if (total > 0) {
          setTotalCount(total);
        } else if (pageNum === 1) {
          setTotalCount(list.length);
        } else {
          setTotalCount((prev) => prev + list.length);
        }

        setHasMore(isNextPage);
      } catch {
        if (!isCancelled() && pageNum === 1) {
          setRows([]);
          setHasMore(false);
          setTotalCount(0);
        }
      } finally {
        if (!isCancelled()) setLoading(false);
      }
    },
    [endDateValue, reportType, startDateValue]
  );

  useEffect(() => {
    if (!isApiReport) {
      setRows([]);
      setHasMore(false);
      setLoading(false);
      return undefined;
    }

    setRows([]);
    setHasMore(true);
    setPage(1);
    setTotalCount(0);
  }, [isApiReport, reportType, startDateValue, endDateValue]);

  useEffect(() => {
    if (!isApiReport) return undefined;

    let cancelled = false;
    fetchReport(page, () => cancelled);
    return () => {
      cancelled = true;
    };
  }, [fetchReport, isApiReport, page]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore && isApiReport) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, isApiReport, loading]);

  const stats = [
    {
      label: "Payroll Records",
      value: statsCounts.payroll,
      icon: STAT_ICONS.payroll,
    },
    {
      label: "Attendance Records",
      value: statsCounts.attendance,
      icon: STAT_ICONS.attendance,
    },
    {
      label: "Leave Requests",
      value: statsCounts.leave,
      icon: STAT_ICONS.leave,
    },
    {
      label: "Tip Records",
      value: statsCounts.tip,
      icon: STAT_ICONS.tips,
    },
  ];

  const exportFileName = useMemo(() => {
    const base = String(reportMeta.heading || reportType)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return `${base || "hr-report"}-${Date.now()}`;
  }, [reportMeta.heading, reportType]);

  const getExportMatrix = useCallback(() => {
    const headers = columnConfig.columns.map((column) => column.label);
    const exportRows = tableRows.map((row) =>
      columnConfig.columns.map((column) => {
        const value = row[column.key];
        return value == null ? "" : String(value);
      })
    );
    return { headers, rows: exportRows };
  }, [columnConfig.columns, tableRows]);

  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleExportCsv = () => {
    const { headers, rows: exportRows } = getExportMatrix();
    const escapeCell = (value) => {
      const text = String(value ?? "");
      if (/[",\n]/.test(text)) {
        return `"${text.replace(/"/g, '""')}"`;
      }
      return text;
    };

    const csvContent = [headers, ...exportRows]
      .map((line) => line.map(escapeCell).join(","))
      .join("\n");

    downloadBlob(
      new Blob([csvContent], { type: "text/csv;charset=utf-8;" }),
      `${exportFileName}.csv`
    );
  };

  const handleExportExcel = () => {
    const { headers, rows: exportRows } = getExportMatrix();
    const sheetData = [headers, ...exportRows];
    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, `${exportFileName}.xlsx`);
  };

  const handleExportPdf = () => {
    const { headers, rows: exportRows } = getExportMatrix();
    const doc = new jsPDF({
      orientation: headers.length > 6 ? "landscape" : "portrait",
      unit: "pt",
      format: "a4",
    });

    doc.setFontSize(14);
    doc.text(reportMeta.heading || reportType, 40, 36);

    autoTable(doc, {
      head: [headers],
      body: exportRows,
      startY: 50,
      styles: {
        fontSize: 8,
        cellPadding: 4,
      },
      headStyles: {
        fillColor: [41, 80, 134],
        textColor: 255,
      },
      margin: { left: 24, right: 24 },
    });

    doc.save(`${exportFileName}.pdf`);
  };

  const renderTableBody = () => {
    if (loading && page === 1 && tableRows.length === 0) {
      return Array.from({ length: 6 }).map((_, index) => (
        <tr key={`report-skeleton-${index}`}>
          {columnConfig.columns.map((column) => (
            <td key={column.key}>
              {column.type === "employee" ? (
                <HrNameCell>
                  <Skeleton circle width={36} height={36} />
                  <Skeleton width={120} height={14} />
                </HrNameCell>
              ) : (
                <Skeleton width={80} height={14} />
              )}
            </td>
          ))}
        </tr>
      ));
    }

    if (!tableRows.length) {
      return (
        <tr>
          <td
            colSpan={columnConfig.columns.length}
            style={{ textAlign: "center", color: "#8391A1" }}
          >
            No report records found.
          </td>
        </tr>
      );
    }

    return tableRows.map((row) => (
      <tr key={row.id}>
        {columnConfig.columns.map((column) => {
          if (column.type === "employee") {
            return (
              <td key={column.key}>
                <HrNameCell>
                  <HrAvatar $bg={row.avatarBg}>{row.initials}</HrAvatar>
                  {row.employee}
                </HrNameCell>
              </td>
            );
          }

          if (column.type === "status") {
            return (
              <td key={column.key}>
                <HrPill $tone={row.statusTone}>{row.status}</HrPill>
              </td>
            );
          }

          if (column.type === "negative") {
            return (
              <td key={column.key} style={{ color: "#E86D4D" }}>
                {row[column.key]}
              </td>
            );
          }

          return <td key={column.key}>{row[column.key]}</td>;
        })}
      </tr>
    ));
  };

  return (
    <>
      <HrPageHeader $inline $banded>
        <HrPageTitleBlock $inline>
          <h1>Reports</h1>
          <p>Generate and export HR reports</p>
        </HrPageTitleBlock>
        <HrHeaderActions>
          <HrFilterField style={{ minWidth: "200px" }}>
            <select
              value={reportType}
              onChange={(event) => setReportType(event.target.value)}
              aria-label="Report Type"
            >
              {REPORT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="field-icon" aria-hidden="true">
              <InlineSVG src={CHEVRON_ICON} />
            </span>
          </HrFilterField>
          <HrDateField $wide $clearable={hasDateRange} style={{ minWidth: "200px" }}>
            <ReactDatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={handleDateRangeChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select date range"
              onKeyDown={(event) => event.preventDefault()}
              portalId="hr-datepicker-portal"
              popperClassName="hr-datepicker-portal-popper"
              popperProps={{ strategy: "fixed" }}
              aria-label="Report date range"
            />
            {hasDateRange ? (
              <button
                type="button"
                className="clear-btn"
                aria-label="Clear date range"
                onClick={handleClearDateRange}
              >
                <InlineSVG src={CLEAR_ICON} />
              </button>
            ) : null}
            <span className="field-icon" aria-hidden="true">
              <InlineSVG src={CALENDAR_ICON} />
            </span>
          </HrDateField>

          <HrHeaderOutlineButton type="button" onClick={handleExportCsv}>
            <InlineSVG src={EXPORT_CSV_ICON} />
            Export CSV
          </HrHeaderOutlineButton>
          <HrHeaderOutlineButton type="button" onClick={handleExportExcel}>
            <InlineSVG src={EXPORT_EXCEL_ICON} />
            Export Excel
          </HrHeaderOutlineButton>
          <HrHeaderOutlineButton type="button" onClick={handleExportPdf}>
            <InlineSVG src={EXPORT_PDF_ICON} />
            Export PDF
          </HrHeaderOutlineButton>
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
              {statsLoading ? (
                <Skeleton width={48} height={28} />
              ) : (
                stat.value
              )}
            </span>
          </HrStatCard>
        ))}
      </HrMetricsGrid>

      <HrTableCard>
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "baseline",
            gap: "8px",
            color: "#295086",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "16px",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            {reportMeta.heading}
          </h3>
          <span style={{ fontSize: "11px", color: "#8391A1", fontWeight: 600 }}>
            ({reportMeta.count} RECORDS)
          </span>
        </div>

        <HrTableWrap
          id={REPORTS_SCROLL_ID}
          style={
            isApiReport
              ? { maxHeight: "60vh", overflow: "auto" }
              : undefined
          }
        >
          {isApiReport ? (
            <InfiniteScroll
              dataLength={tableRows.length}
              next={loadMore}
              hasMore={hasMore}
              scrollableTarget={REPORTS_SCROLL_ID}
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
              <HrTable $minWidth={columnConfig.minWidth}>
                <thead>
                  <tr>
                    {columnConfig.columns.map((column) => (
                      <th key={column.key}>{column.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>{renderTableBody()}</tbody>
              </HrTable>
            </InfiniteScroll>
          ) : (
            <HrTable $minWidth={columnConfig.minWidth}>
              <thead>
                <tr>
                  {columnConfig.columns.map((column) => (
                    <th key={column.key}>{column.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>{renderTableBody()}</tbody>
            </HrTable>
          )}
        </HrTableWrap>
      </HrTableCard>
    </>
  );
}
