"use client";

import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import InlineSVG from "svg-inline-react";
import * as yup from "yup";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector } from "@/redux/authCheck";
import { API_ROUTER } from "@/services/apiRouter";
import {
  HrField,
  HrMetricsGrid,
  HrModalActions,
  HrModalPrimaryButton,
  HrModalRow,
  HrPageHeader,
  HrPageTitleBlock,
  HrRadioCard,
  HrRadioMark,
  HrSecondaryButton,
  HrSettingsFields,
  HrSettingsSection,
  HrStatCard,
  HrSwitch,
  HrToggleCard,
  HrToggleList,
} from "@/styles/pages/hr-module.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const CHEVRON_ICON = `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const CALENDAR_ICON = `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.667 2.667h-1.334V2a.667.667 0 1 0-1.333 0v.667H6V2a.667.667 0 1 0-1.333 0v.667H3.333A1.333 1.333 0 0 0 2 4v8a1.333 1.333 0 0 0 1.333 1.333h9.334A1.333 1.333 0 0 0 14 12V4a1.333 1.333 0 0 0-1.333-1.333Zm0 9.333H3.333V6.667h9.334v5.333Z" fill="currentColor"/></svg>`;

const STAT_ICONS = {
  payrollType: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M20.2821 16.8461C20.1554 16.4856 19.9196 16.1734 19.6075 15.9528C19.2954 15.7323 18.9224 15.6143 18.5403 15.6152H17.1113C16.7045 15.6146 16.3118 15.7644 16.0088 16.036C15.7059 16.3075 15.5141 16.6816 15.4705 17.0861C15.4268 17.4906 15.5343 17.8969 15.7723 18.2269C16.0104 18.5568 16.362 18.7871 16.7596 18.8732L18.9349 19.3495C19.3796 19.4471 19.7726 19.7055 20.0385 20.0751C20.3043 20.4447 20.4243 20.8995 20.3754 21.3522C20.3265 21.8048 20.1121 22.2235 19.7734 22.5277C19.4347 22.832 18.9956 23.0005 18.5403 23.0008H17.3107C16.9284 23.0016 16.5553 22.8834 16.2431 22.6626C15.931 22.4418 15.6954 22.1293 15.5689 21.7685M17.9255 15.6152V13.7695M17.9255 24.8465V23.0008" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M26.9231 11H13.7692C13.0348 11 12.3304 11.2918 11.8111 11.8111C11.2918 12.3304 11 13.0348 11 13.7692V29L14.4615 26.9231L17.9231 29L21.3846 26.9231L24.8462 29V13.0769C24.8462 12.5261 25.065 11.9978 25.4545 11.6083C25.844 11.2188 26.3722 11 26.9231 11ZM26.9231 11C27.4739 11 28.0022 11.2188 28.3917 11.6083C28.7812 11.9978 29 12.5261 29 13.0769V17.9231H24.8462" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  cycle: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23.5671 16.0271C23.7022 16.1021 23.8211 16.2029 23.9172 16.3238C24.0133 16.4447 24.0846 16.5834 24.1271 16.7319C24.1696 16.8804 24.1824 17.0358 24.1648 17.1892C24.1472 17.3427 24.0995 17.4912 24.0245 17.6262L20.7582 23.5051C20.6831 23.6401 20.5822 23.7589 20.4613 23.8549C20.3403 23.9508 20.2016 24.022 20.0531 24.0644C19.7532 24.15 19.4316 24.1129 19.1591 23.9613C19.0241 23.8863 18.9053 23.7854 18.8093 23.6644C18.7134 23.5434 18.6422 23.4048 18.5998 23.2563C18.5143 22.9564 18.5513 22.6348 18.7029 22.3623L21.968 16.4833C22.0431 16.3484 22.144 16.2295 22.2649 16.1335C22.3859 16.0376 22.5246 15.9664 22.6731 15.924C22.8216 15.8817 22.977 15.869 23.1304 15.8866C23.2838 15.9043 23.4322 15.9521 23.5671 16.0271Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.5482 19.5854C15.743 19.3421 16.0265 19.1861 16.3362 19.1517C16.646 19.1173 16.9568 19.2073 17.2002 19.4019L20.4665 22.0145C20.5871 22.111 20.6875 22.2304 20.762 22.3657C20.8365 22.501 20.8836 22.6496 20.9006 22.8031C20.9177 22.9566 20.9043 23.112 20.8613 23.2603C20.8183 23.4087 20.7465 23.5471 20.65 23.6677C20.5535 23.7883 20.4341 23.8887 20.2988 23.9632C20.1635 24.0377 20.0149 24.0848 19.8614 24.1018C19.7079 24.1188 19.5525 24.1055 19.4042 24.0624C19.2558 24.0194 19.1174 23.9476 18.9968 23.8511L15.7305 21.2385C15.6098 21.142 15.5094 21.0227 15.4349 20.8874C15.3604 20.7521 15.3133 20.6035 15.2962 20.4499C15.2792 20.2964 15.2926 20.1411 15.3356 19.9927C15.3787 19.8444 15.4517 19.7059 15.5482 19.5854Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.547 12.5776C20.4017 12.4332 20.2051 12.3522 20.0003 12.3522C19.7955 12.3522 19.5989 12.4332 19.4536 12.5776C18.3871 13.6428 16.6799 14.2989 15.1784 14.2237C15.0701 14.2172 14.9616 14.2339 14.8603 14.2726C14.7589 14.3113 14.6669 14.3712 14.5905 14.4482C14.5166 14.5216 14.4584 14.6093 14.4196 14.7059C14.3808 14.8026 14.3621 14.9061 14.3647 15.0103C14.3812 15.8568 14.1684 16.7022 13.8886 17.3971C13.6087 18.0932 13.176 18.8492 12.5776 19.4488C12.4332 19.5942 12.3522 19.7908 12.3522 19.9956C12.3522 20.2004 12.4332 20.397 12.5776 20.5423C13.6275 21.5935 14.3342 23.2478 14.3647 24.7352C14.3679 24.9346 14.4489 25.1249 14.5905 25.2655C14.7255 25.4018 14.9068 25.4824 15.0984 25.4912C15.9274 25.5324 16.7516 25.7769 17.4418 26.0826C18.1331 26.3895 18.8668 26.8363 19.4524 27.423C19.5977 27.5674 19.7943 27.6483 19.9991 27.6483C20.204 27.6483 20.4005 27.5674 20.5459 27.423C21.1326 26.8363 21.8663 26.3895 22.5565 26.0826C23.2478 25.7769 24.0732 25.5324 24.8998 25.4912C25.0914 25.4824 25.2728 25.4018 25.4077 25.2655C25.5497 25.1251 25.6312 24.9348 25.6347 24.7352C25.6652 23.2478 26.3719 21.5935 27.4219 20.5423C27.5662 20.397 27.6472 20.2004 27.6472 19.9956C27.6472 19.7908 27.5662 19.5942 27.4219 19.4488C26.8222 18.8492 26.3907 18.0932 26.1109 17.3971C25.831 16.7022 25.617 15.8568 25.6347 15.0103C25.6372 14.9061 25.6183 14.8024 25.5793 14.7058C25.5403 14.6091 25.4819 14.5215 25.4077 14.4482C25.3315 14.3711 25.2398 14.3112 25.1387 14.2722C25.0375 14.2333 24.9292 14.2164 24.821 14.2225C23.3184 14.2989 21.6111 13.6428 20.547 12.5776ZM12.0143 15.0561C12.032 15.9485 11.5464 17.1549 10.915 17.7851C10.3291 18.3716 10 19.1666 10 19.9956C10 20.8246 10.3291 21.6196 10.915 22.2061C11.5382 22.8269 11.9967 23.9039 12.0143 24.7834C12.0308 25.5618 12.3353 26.3354 12.9291 26.928C13.4769 27.477 14.2098 27.8019 14.9844 27.8393C15.9144 27.8863 17.1326 28.4272 17.791 29.0856C18.3774 29.6711 19.1722 30 20.0009 30C20.8296 30 21.6244 29.6711 22.2108 29.0856C22.8692 28.4272 24.0873 27.8863 25.0174 27.8393C25.792 27.8019 26.5248 27.477 27.0727 26.928C27.6432 26.3583 27.9707 25.5896 27.9862 24.7834C28.0051 23.9039 28.4636 22.8269 29.0856 22.2049C29.6711 21.6185 30 20.8237 30 19.995C30 19.1663 29.6711 18.3715 29.0856 17.7851C28.4554 17.1549 27.9686 15.9485 27.9874 15.0573C27.9963 14.6365 27.9198 14.2183 27.7626 13.8278C27.6053 13.4374 27.3706 13.0829 27.0727 12.7857C26.7638 12.476 26.3932 12.2348 25.985 12.0778C25.5769 11.9208 25.1402 11.8515 24.7034 11.8744C23.8639 11.9168 22.8045 11.5099 22.2108 10.915C21.6243 10.3291 20.8293 10 20.0003 10C19.1713 10 18.3763 10.3291 17.7898 10.915C17.1972 11.5088 16.1367 11.9168 15.2971 11.8744C14.8606 11.8517 14.4242 11.9211 14.0162 12.0781C13.6082 12.2351 13.2378 12.4762 12.9291 12.7857C12.6313 13.0828 12.3967 13.4371 12.2394 13.8273C12.0822 14.2175 12.0057 14.6355 12.0143 15.0561Z" fill="white"/>
</svg>
`,
  paidSalary: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M19.1 27H20.85V25.75C21.6833 25.6 22.4 25.275 23 24.775C23.6 24.275 23.9 23.5333 23.9 22.55C23.9 21.85 23.7 21.2083 23.3 20.625C22.9 20.0417 22.1 19.5333 20.9 19.1C19.9 18.7667 19.2083 18.475 18.825 18.225C18.4417 17.975 18.25 17.6333 18.25 17.2C18.25 16.7667 18.4043 16.425 18.713 16.175C19.0217 15.925 19.4673 15.8 20.05 15.8C20.5833 15.8 21 15.929 21.3 16.187C21.6 16.445 21.8167 16.766 21.95 17.15L23.55 16.5C23.3667 15.9167 23.0293 15.4083 22.538 14.975C22.0467 14.5417 21.5007 14.3 20.9 14.25V13H19.15V14.25C18.3167 14.4333 17.6667 14.8 17.2 15.35C16.7333 15.9 16.5 16.5167 16.5 17.2C16.5 17.9833 16.7293 18.6167 17.188 19.1C17.6467 19.5833 18.3673 20 19.35 20.35C20.4 20.7333 21.1293 21.075 21.538 21.375C21.9467 21.675 22.1507 22.0667 22.15 22.55C22.15 23.1 21.9543 23.5043 21.563 23.763C21.1717 24.0217 20.7007 24.1507 20.15 24.15C19.5993 24.1493 19.1117 23.9787 18.687 23.638C18.2623 23.2973 17.95 22.7847 17.75 22.1L16.1 22.75C16.3333 23.55 16.696 24.196 17.188 24.688C17.68 25.18 18.3173 25.5173 19.1 25.7V27ZM20 30C18.6167 30 17.3167 29.7373 16.1 29.212C14.8833 28.6867 13.825 27.9743 12.925 27.075C12.025 26.1757 11.3127 25.1173 10.788 23.9C10.2633 22.6827 10.0007 21.3827 10 20C9.99933 18.6173 10.262 17.3173 10.788 16.1C11.314 14.8827 12.0263 13.8243 12.925 12.925C13.8237 12.0257 14.882 11.3133 16.1 10.788C17.318 10.2627 18.618 10 20 10C21.382 10 22.682 10.2627 23.9 10.788C25.118 11.3133 26.1763 12.0257 27.075 12.925C27.9737 13.8243 28.6863 14.8827 29.213 16.1C29.7397 17.3173 30.002 18.6173 30 20C29.998 21.3827 29.7353 22.6827 29.212 23.9C28.6887 25.1173 27.9763 26.1757 27.075 27.075C26.1737 27.9743 25.1153 28.687 23.9 29.213C22.6847 29.739 21.3847 30.0013 20 30ZM20 28C22.2333 28 24.125 27.225 25.675 25.675C27.225 24.125 28 22.2333 28 20C28 17.7667 27.225 15.875 25.675 14.325C24.125 12.775 22.2333 12 20 12C17.7667 12 15.875 12.775 14.325 14.325C12.775 15.875 12 17.7667 12 20C12 22.2333 12.775 24.125 14.325 25.675C15.875 27.225 17.7667 28 20 28Z" fill="white"/>
</svg>
`,
  salary: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M26.5002 15.0001V12C26.5002 11.7348 26.3948 11.4804 26.2073 11.2929C26.0197 11.1054 25.7654 11 25.5002 11H12.5C11.9696 11 11.4609 11.2107 11.0858 11.5858C10.7107 11.9609 10.5 12.4696 10.5 13.0001C10.5 13.5305 10.7107 14.0392 11.0858 14.4143C11.4609 14.7894 11.9696 15.0001 12.5 15.0001H27.5002C27.7654 15.0001 28.0198 15.1055 28.2073 15.293C28.3948 15.4806 28.5002 15.7349 28.5002 16.0001V20.0003M28.5002 20.0003H25.5002C24.9697 20.0003 24.461 20.211 24.0859 20.5861C23.7109 20.9611 23.5001 21.4699 23.5001 22.0003C23.5001 22.5308 23.7109 23.0395 24.0859 23.4146C24.461 23.7896 24.9697 24.0004 25.5002 24.0004H28.5002C28.7654 24.0004 29.0198 23.895 29.2073 23.7075C29.3948 23.5199 29.5002 23.2656 29.5002 23.0003V21.0003C29.5002 20.7351 29.3948 20.4807 29.2073 20.2932C29.0198 20.1056 28.7654 20.0003 28.5002 20.0003Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5 13V27.0004C10.5 27.5308 10.7107 28.0396 11.0858 28.4147C11.4609 28.7897 11.9696 29.0005 12.5 29.0005H27.5002C27.7654 29.0005 28.0198 28.8951 28.2073 28.7076C28.3948 28.52 28.5002 28.2656 28.5002 28.0004V24.0003" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
};

const DEFAULT_SETTINGS = {
  spaName: "",
  payrollType: "",
  workingHoursPerDay: "",
  payrollCycle: "",
  overtimeCalculationRate: "",
  payrollStartDate: "",
  paidLeavePerMonth: "",
  includeTips: true,
  tipPayoutMethod: "monthly",
};

const TIP_PAYOUT_OPTIONS = [

  {
    value: "daily",
    title: "Daily Payout",
    description: "Tips are settled at end of each day",
  },
  {
    value: "monthly",
    title: "Monthly Along with Payroll",
    description: "Tips distributed with monthly payroll cycle",
  },
];

const normalizePayrollChoice = (value) => {
  if (!value) return "";

  switch (String(value).trim().toLowerCase()) {
    case "hourly":
      return "hourly";
    case "daily":
      return "daily";
    case "monthly":
      return "monthly";
    default:
      return "";
  }
};

const normalizeTipPayoutMethod = (value) => {
  if (!value) return DEFAULT_SETTINGS.tipPayoutMethod;

  switch (String(value).trim().toLowerCase()) {
    case "daily":
      return "daily";
    case "monthly":
    case "monthly_along_with_payroll":
    case "monthlyalongwithpayroll":
      return "monthly";
    default:
      return DEFAULT_SETTINGS.tipPayoutMethod;
  }
};

const normalizePayrollCycle = (value) => {
  if (!value) return "";

  switch (String(value).trim().toLowerCase()) {
    case "weekly":
      return "weekly";
    case "bi-weekly":
    case "biweekly":
      return "biweekly";
    case "semi-monthly":
    case "semimonthly":
      return "semimonthly";
    case "monthly":
      return "monthly";
    default:
      return "";
  }
};

const normalizeOvertimeRate = (value) => {
  if (value == null || value === "") return "";
  return String(value).trim().toLowerCase().replace(/x$/, "");
};

const normalizeSettings = (settings = {}) => ({
  ...DEFAULT_SETTINGS,
  ...settings,
  workingHoursPerDay:
    settings?.workingHoursPerDay === 0 || settings?.workingHoursPerDay
      ? String(settings.workingHoursPerDay)
      : "",
  paidLeavePerMonth:
    settings?.paidLeavePerMonth === 0 || settings?.paidLeavePerMonth
      ? String(settings.paidLeavePerMonth)
      : "",
});

const mapPayrollConfigToSettings = (config = {}, spaName = "") =>
  normalizeSettings({
    spaName: config?.spaName || spaName,
    payrollType: normalizePayrollChoice(config?.payrollType),
    payrollCycle: normalizePayrollCycle(config?.payrollCycle),
    workingHoursPerDay: config?.workingHoursPerDay ?? "",
    overtimeCalculationRate: normalizeOvertimeRate(
      config?.overtimeRate ?? config?.overtimeCalculationRate
    ),
    payrollStartDate: config?.payrollStartDate
      ? moment(config.payrollStartDate).format("YYYY-MM-DD")
      : "",
    paidLeavePerMonth:
      config?.paidLeavePerMonth ??
      config?.paid_leave_per_month ??
      config?.perMonthPaidLeave ??
      "",
    includeTips:
      config?.includeTipsInPayroll ?? config?.includeTips ?? DEFAULT_SETTINGS.includeTips,
    tipPayoutMethod: normalizeTipPayoutMethod(config?.tipPayoutMethod),
  });

const formatPayrollTypeLabel = (value) => {
  switch (value) {
    case "hourly":
      return "Hourly";
    case "daily":
      return "Daily";
    case "monthly":
      return "Monthly";
    default:
      return "";
  }
};

const formatPayrollCycleLabel = (value) => {
  switch (value) {
    case "weekly":
      return "Weekly";
    case "biweekly":
      return "Biweekly";
    case "semimonthly":
      return "Semi-Monthly";
    case "monthly":
      return "Monthly";
    default:
      return "";
  }
};

const formatOvertimeRateLabel = (value) => (value ? `${value}x` : "");

const payrollSettingsSchema = yup.object({
  spaName: yup.string().trim().required("Spa name is required"),
  payrollType: yup.string().required("Payroll type is required"),
  workingHoursPerDay: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" || originalValue == null ? undefined : Number(originalValue)
    )
    .typeError("Working hours per day must be a number")
    .moreThan(0, "Working hours per day must be greater than 0")
    .max(24, "Working hours per day cannot exceed 24")
    .required("Working hours per day is required"),
  payrollCycle: yup.string().required("Payroll cycle is required"),
  overtimeCalculationRate: yup.string().required("Overtime calculation rate is required"),
  payrollStartDate: yup.string().required("Payroll start date is required"),
  paidLeavePerMonth: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" || originalValue == null ? undefined : Number(originalValue)
    )
    .typeError("Paid leave per month must be a number")
    .min(0, "Paid leave per month cannot be negative")
    .max(31, "Paid leave per month cannot exceed 31 days")
    .required("Paid leave per month is required"),
});

export default function HrSettings({ initialSettings = DEFAULT_SETTINGS, onUpdate }) {
  const { login } = useSelector(authCheckSliceSelector);
  const { toaster } = useToaster();

  const [settings, setSettings] = useState(() => normalizeSettings(initialSettings));
  const [savedSettings, setSavedSettings] = useState(() => normalizeSettings(initialSettings));
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingConfig, setIsLoadingConfig] = useState(false);

  useEffect(() => {
    const normalized = normalizeSettings(initialSettings);
    setSettings(normalized);
    setSavedSettings(normalized);
    setErrors({});
  }, [initialSettings]);

  useEffect(() => {
    if (!login?.username) return;

    setSettings((prev) => (prev.spaName ? prev : { ...prev, spaName: login.username }));
    setSavedSettings((prev) => (prev.spaName ? prev : { ...prev, spaName: login.username }));
  }, [login?.username]);

  useEffect(() => {
    let isMounted = true;

    const fetchPayrollConfiguration = async () => {
      try {
        setIsLoadingConfig(true);
        const res = await axiosApiCall.get(API_ROUTER?.GET_PAYROLL_CONFIGURATION);
        console.log("payroll configuration", res);

        if (!isMounted) return;

        if (!res?.status) {
          return toaster(res?.message || "Failed to fetch payroll configuration", TOAST_TYPES.ERROR);
        }

        const payrollConfig = res?.data?.data || res?.data || {};
        const mappedSettings = mapPayrollConfigToSettings(payrollConfig, login?.username || "");

        setSettings(mappedSettings);
        setSavedSettings(mappedSettings);
        setErrors({});
      } catch (error) {
        if (isMounted) {
          toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
        }
      } finally {
        if (isMounted) {
          setIsLoadingConfig(false);
        }
      }
    };

    fetchPayrollConfiguration();

    return () => {
      isMounted = false;
    };
  }, [login?.username]);

  const hasChanges = useMemo(
    () => JSON.stringify(settings) !== JSON.stringify(savedSettings),
    [savedSettings, settings]
  );

  const stats = useMemo(
    () => [
      {
        label: "Payroll Type",
        value: formatPayrollTypeLabel(settings.payrollType),
        icon: STAT_ICONS.payrollType,
      },
      {
        label: "Payroll Cycle",
        value: formatPayrollCycleLabel(settings.payrollCycle),
        icon: STAT_ICONS.cycle,
      },
      {
        label: "Paid Salary",
        value: formatOvertimeRateLabel(settings.overtimeCalculationRate),
        icon: STAT_ICONS.paidSalary,
      },
      {
        label: "Hours / Day Salary",
        value: settings.workingHoursPerDay || "",
        icon: STAT_ICONS.salary,
      },
    ],
    [settings.overtimeCalculationRate, settings.payrollCycle, settings.payrollType, settings.workingHoursPerDay]
  );

  const updateField = (key) => (event) => {
    setSettings((prev) => ({ ...prev, [key]: event.target.value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const toggleField = (key) => () => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const updateWorkingHours = (event) => {
    const value = event.target.value;

    if (value !== "" && !/^\d*\.?\d*$/.test(value)) {
      return;
    }

    setSettings((prev) => ({ ...prev, workingHoursPerDay: value }));
    setErrors((prev) => ({ ...prev, workingHoursPerDay: "" }));
  };

  const updatePaidLeavePerMonth = (event) => {
    const value = event.target.value;

    if (value !== "" && !/^\d*\.?\d*$/.test(value)) {
      return;
    }

    setSettings((prev) => ({ ...prev, paidLeavePerMonth: value }));
    setErrors((prev) => ({ ...prev, paidLeavePerMonth: "" }));
  };

  const updatePayrollStartDate = (date) => {
    setSettings((prev) => ({
      ...prev,
      payrollStartDate: date ? moment(date).format("YYYY-MM-DD") : "",
    }));
    setErrors((prev) => ({ ...prev, payrollStartDate: "" }));
  };

  const validate = async () => {
    try {
      await payrollSettingsSchema.validate(settings, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      const nextErrors = {};

      if (error?.inner?.length) {
        error.inner.forEach((item) => {
          if (item.path && !nextErrors[item.path]) {
            nextErrors[item.path] = item.message;
          }
        });
      } else if (error?.path) {
        nextErrors[error.path] = error.message;
      }

      setErrors(nextErrors);
      return false;
    }
  };

  const handleReset = () => {
    setSettings(savedSettings);
    setErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!(await validate())) return;

    try {
      setIsSubmitting(true);
      const payload = {
        payrollType: settings.payrollType,
        payrollCycle: settings.payrollCycle,
        workingHoursPerDay: Number(settings.workingHoursPerDay),
        overtimeRate: Number(settings.overtimeCalculationRate),
        payrollStartDate: settings.payrollStartDate || null,
        paidLeavePerMonth: Number(settings.paidLeavePerMonth),
        includeTipsInPayroll: settings.includeTips,
        tipPayoutMethod: settings.tipPayoutMethod,
      };

      const res = await axiosApiCall.post(
        API_ROUTER?.ADD_EDIT_PAYROLL_CONFIGURATION,
        payload
      );

      if (!res?.status) {
        return toaster(
          res?.message || "Failed to save payroll configuration",
          TOAST_TYPES.ERROR
        );
      }

      if (onUpdate) {
        await onUpdate(settings, payload, res);
      }
      setSavedSettings(settings);
      toaster(
        res?.data?.message || "Payroll configuration updated successfully",
        TOAST_TYPES.SUCCESS
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <HrPageHeader $inline $banded>
        <HrPageTitleBlock $inline>
          <h1>Payroll Processing</h1>
          <p>Auto-generate payroll using attendance, leaves, overtime, and tips</p>
        </HrPageTitleBlock>
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

      <HrSettingsSection>
        <h3 className="section-title">Payroll Type</h3>
        <HrSettingsFields>
          <HrModalRow $cols="1fr 1fr" className="settings-row">
            <HrField as="div" className="settings-field">
              <span className="field-label">Spa Name</span>
              <div className="field-control">
                <input
                  type="text"
                  value={settings.spaName}
                  onChange={updateField("spaName")}
                  placeholder="Spa Name"
                  aria-label="Spa Name"
                  disabled
                />
              </div>
              {errors.spaName && <p className="error">{errors.spaName}</p>}
            </HrField>
            <HrField as="div" className="settings-field">
              <span className="field-label">Payroll Type</span>
              <div className="field-control">
                <select
                  value={settings.payrollType}
                  onChange={updateField("payrollType")}
                  aria-label="Payroll Type"
                >
                  <option value="">Payroll Type</option>
                  <option value="monthly">Monthly</option>
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                </select>
                <span className="field-icon">
                  <InlineSVG src={CHEVRON_ICON} />
                </span>
              </div>
              {errors.payrollType && <p className="error">{errors.payrollType}</p>}
            </HrField>
          </HrModalRow>
        </HrSettingsFields>
      </HrSettingsSection>

      <HrSettingsSection>
        <h3 className="section-title">Payroll Configuration</h3>
        <HrSettingsFields>
          <HrModalRow $cols="1fr 1fr" className="settings-row">
            <HrField as="div" className="settings-field">
              <span className="field-label">Working Hours Per Day</span>
              <div className="field-control">
                <input
                  type="number"
                  min="0"
                  value={settings.workingHoursPerDay}
                  onChange={updateWorkingHours}
                  placeholder="Working Hours Per Day"
                  aria-label="Working Hours Per Day"
                />
              </div>
              {errors.workingHoursPerDay && (
                <p className="error">{errors.workingHoursPerDay}</p>
              )}
            </HrField>
            <HrField as="div" className="settings-field">
              <span className="field-label">Payroll Cycle</span>
              <div className="field-control">
                <select
                  value={settings.payrollCycle}
                  onChange={updateField("payrollCycle")}
                  aria-label="Payroll Cycle"
                >
                  <option value="">Payroll Cycle</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Biweekly</option>
                  <option value="semimonthly">Semi-Monthly</option>
                  <option value="monthly">Monthly</option>
                </select>
                <span className="field-icon">
                  <InlineSVG src={CHEVRON_ICON} />
                </span>
              </div>
              {errors.payrollCycle && <p className="error">{errors.payrollCycle}</p>}
            </HrField>
          </HrModalRow>

          <HrModalRow $cols="1fr 1fr" className="settings-row">
            <HrField as="div" className="settings-field">
              <span className="field-label">Overtime Calculation Rate</span>
              <div className="field-control">
                <select
                  value={settings.overtimeCalculationRate}
                  onChange={updateField("overtimeCalculationRate")}
                  aria-label="Overtime Calculation Rate"
                >
                  <option value="">Overtime Calculation Rate</option>
                  <option value="1">1x</option>
                  <option value="1.25">1.25x</option>
                  <option value="1.5">1.5x</option>
                  <option value="2">2x</option>
                </select>
                <span className="field-icon">
                  <InlineSVG src={CHEVRON_ICON} />
                </span>
              </div>
              {errors.overtimeCalculationRate && (
                <p className="error">{errors.overtimeCalculationRate}</p>
              )}
            </HrField>

            <HrField
              as="div"
              className="settings-field"
              $empty={!settings.payrollStartDate}
            >
              <span className="field-label">Payroll Start Date</span>
              <div className="field-control">
                <ReactDatePicker
                  selected={
                    settings.payrollStartDate
                      ? moment(settings.payrollStartDate).toDate()
                      : null
                  }
                  onChange={updatePayrollStartDate}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Payroll Start Date"
                  onKeyDown={(event) => event.preventDefault()}
                  aria-label="Payroll Start Date"
                />
                <span className="field-icon">
                  <InlineSVG src={CALENDAR_ICON} />
                </span>
              </div>
              {errors.payrollStartDate && <p className="error">{errors.payrollStartDate}</p>}
            </HrField>
          </HrModalRow>

          <HrModalRow $cols="1fr 1fr" className="settings-row">
            <HrField as="div" className="settings-field">
              <span className="field-label">Paid Leave Days Per Month</span>
              <div className="field-control">
                <input
                  type="number"
                  min="0"
                  max="31"
                  step="any"
                  value={settings.paidLeavePerMonth}
                  onChange={updatePaidLeavePerMonth}
                  onKeyDown={(event) => {
                    if (event.key === "-" || event.key === "e" || event.key === "E" || event.key === "+") {
                      event.preventDefault();
                    }
                  }}
                  placeholder="Paid Leave Days Per Month"
                  aria-label="Paid Leave Days Per Month"
                />
              </div>
              {errors.paidLeavePerMonth && (
                <p className="error">{errors.paidLeavePerMonth}</p>
              )}
            </HrField>
          </HrModalRow>

          <HrToggleCard style={{ marginTop: "8px" }}>
            <div>
              <p className="toggle-title">Include Tips in Payroll</p>
              <p className="toggle-description">
                Add collected tips to payroll calculation
              </p>
            </div>
            <HrSwitch
              type="button"
              $active={settings.includeTips}
              onClick={toggleField("includeTips")}
              aria-label="Toggle include tips in payroll"
            />
          </HrToggleCard>
        </HrSettingsFields>
      </HrSettingsSection>

      {!settings.includeTips ? (
        <HrSettingsSection>
          <h3 className="section-title">Payroll Configuration</h3>
          <HrToggleList>
            {TIP_PAYOUT_OPTIONS.map((option) => {
              const isActive = settings.tipPayoutMethod === option.value;

              return (
                <HrRadioCard
                  key={option.value}
                  $active={isActive}
                  aria-label={option.title}
                >
                  <div>
                    <p className="toggle-title">{option.title}</p>
                    <p className="toggle-description">{option.description}</p>
                  </div>
                  <input
                    type="radio"
                    name="tipPayoutMethod"
                    value={option.value}
                    checked={isActive}
                    onChange={updateField("tipPayoutMethod")}
                  />
                  <HrRadioMark $active={isActive} aria-hidden="true" />
                </HrRadioCard>
              );
            })}
          </HrToggleList>
        </HrSettingsSection>
      ) : null}

      <HrModalActions>
        <HrSecondaryButton
          type="button"
          onClick={handleReset}
          disabled={!hasChanges || isSubmitting || isLoadingConfig}
        >
          Reset
        </HrSecondaryButton>
        <HrModalPrimaryButton type="submit" disabled={isSubmitting || isLoadingConfig}>
          {isSubmitting ? "Updating..." : "Update"}
        </HrModalPrimaryButton>
      </HrModalActions>
    </form>
  );
}
