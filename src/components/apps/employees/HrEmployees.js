"use client";

import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import InlineSVG from "svg-inline-react";
import AddEmployeeModal from "@/components/apps/employees/AddEmployeeModal";
import DeleteEmployeeModal from "@/components/apps/employees/DeleteEmployeeModal";
import EmployeeDetailsSidebar from "@/components/apps/employees/EmployeeDetailsSidebar";
import BankDetailModal from "@/components/insights/modal/BankDetailModal";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import {
  HrAvatar,
  HrEmployeeCard,
  HrEmployeeCardActionButton,
  HrEmployeeCardHeader,
  HrEmployeeGrid,
  HrEmployeeInfo,
  HrEmployeeMeta,
  HrEmployeeMetaItem,
  HrEmptyState,
  HrFilterField,
  HrHeaderActions,
  HrMetricsGrid,
  HrPageHeader,
  HrPageTitleBlock,
  HrPill,
  HrPrimaryButton,
  HrSearchField,
  HrStatCard,
  HrToolbar,
} from "@/styles/pages/hr-module.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const PLUS_ICON = `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.33333 5.33333H5.33333V9.33333H4V5.33333H0V4H4V0H5.33333V4H9.33333V5.33333Z" fill="white"/></svg>`;
const SEARCH_ICON = `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.8333 15L8.58333 9.75C8.16667 10.0833 7.6875 10.3472 7.14583 10.5417C6.60417 10.7361 6.02778 10.8333 5.41667 10.8333C3.90278 10.8333 2.62153 10.309 1.57292 9.26042C0.524305 8.21181 0 6.93056 0 5.41667C0 3.90278 0.524305 2.62153 1.57292 1.57292C2.62153 0.524305 3.90278 0 5.41667 0C6.93056 0 8.21181 0.524305 9.26042 1.57292C10.309 2.62153 10.8333 3.90278 10.8333 5.41667C10.8333 6.02778 10.7361 6.60417 10.5417 7.14583C10.3472 7.6875 10.0833 8.16667 9.75 8.58333L15 13.8333L13.8333 15ZM5.41667 9.16667C6.45833 9.16667 7.34375 8.80208 8.07292 8.07292C8.80208 7.34375 9.16667 6.45833 9.16667 5.41667C9.16667 4.375 8.80208 3.48958 8.07292 2.76042C7.34375 2.03125 6.45833 1.66667 5.41667 1.66667C4.375 1.66667 3.48958 2.03125 2.76042 2.76042C2.03125 3.48958 1.66667 4.375 1.66667 5.41667C1.66667 6.45833 2.03125 7.34375 2.76042 8.07292C3.48958 8.80208 4.375 9.16667 5.41667 9.16667Z" fill="#004D87"/>
</svg>
`;
const CHEVRON_ICON = `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const STAT_ICONS = {
  staff: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M23.2 27.1999V25.5999C23.2 24.7513 22.8629 23.9373 22.2627 23.3372C21.6626 22.7371 20.8487 22.3999 20 22.3999H15.2C14.3513 22.3999 13.5374 22.7371 12.9373 23.3372C12.3371 23.9373 12 24.7513 12 25.5999V27.1999M23.2 12.9023C23.8862 13.0802 24.4939 13.481 24.9277 14.0416C25.3616 14.6022 25.597 15.2911 25.597 15.9999C25.597 16.7088 25.3616 17.3977 24.9277 17.9583C24.4939 18.5189 23.8862 18.9196 23.2 19.0975M28 27.1999V25.5999C27.9995 24.8909 27.7635 24.2022 27.3291 23.6418C26.8947 23.0814 26.2865 22.6812 25.6 22.5039" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.5984 19.2008C19.3657 19.2008 20.7984 17.7681 20.7984 16.0008C20.7984 14.2335 19.3657 12.8008 17.5984 12.8008C15.8311 12.8008 14.3984 14.2335 14.3984 16.0008C14.3984 17.7681 15.8311 19.2008 17.5984 19.2008Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  active: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M23.2 27.1999V25.5999C23.2 24.7513 22.8629 23.9373 22.2627 23.3372C21.6626 22.7371 20.8487 22.3999 20 22.3999H15.2C14.3513 22.3999 13.5374 22.7371 12.9373 23.3372C12.3371 23.9373 12 24.7513 12 25.5999V27.1999M23.2 12.9023C23.8862 13.0802 24.4939 13.481 24.9277 14.0416C25.3616 14.6022 25.597 15.2911 25.597 15.9999C25.597 16.7088 25.3616 17.3977 24.9277 17.9583C24.4939 18.5189 23.8862 18.9196 23.2 19.0975M28 27.1999V25.5999C27.9995 24.8909 27.7635 24.2022 27.3291 23.6418C26.8947 23.0814 26.2865 22.6812 25.6 22.5039" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.5984 19.2008C19.3657 19.2008 20.7984 17.7681 20.7984 16.0008C20.7984 14.2335 19.3657 12.8008 17.5984 12.8008C15.8311 12.8008 14.3984 14.2335 14.3984 16.0008C14.3984 17.7681 15.8311 19.2008 17.5984 19.2008Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  leave: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M25.8307 13.3346H24.1641V12.5013C24.1641 12.2803 24.0763 12.0683 23.92 11.912C23.7637 11.7558 23.5517 11.668 23.3307 11.668C23.1097 11.668 22.8978 11.7558 22.7415 11.912C22.5852 12.0683 22.4974 12.2803 22.4974 12.5013V13.3346H17.4974V12.5013C17.4974 12.2803 17.4096 12.0683 17.2533 11.912C17.097 11.7558 16.8851 11.668 16.6641 11.668C16.443 11.668 16.2311 11.7558 16.0748 11.912C15.9185 12.0683 15.8307 12.2803 15.8307 12.5013V13.3346H14.1641C13.501 13.3346 12.8651 13.598 12.3963 14.0669C11.9275 14.5357 11.6641 15.1716 11.6641 15.8346V25.8346C11.6641 26.4977 11.9275 27.1336 12.3963 27.6024C12.8651 28.0712 13.501 28.3346 14.1641 28.3346H25.8307C26.4938 28.3346 27.1297 28.0712 27.5985 27.6024C28.0673 27.1336 28.3307 26.4977 28.3307 25.8346V15.8346C28.3307 15.1716 28.0673 14.5357 27.5985 14.0669C27.1297 13.598 26.4938 13.3346 25.8307 13.3346ZM26.6641 25.8346C26.6641 26.0556 26.5763 26.2676 26.42 26.4239C26.2637 26.5802 26.0517 26.668 25.8307 26.668H14.1641C13.943 26.668 13.7311 26.5802 13.5748 26.4239C13.4185 26.2676 13.3307 26.0556 13.3307 25.8346V20.0013H26.6641V25.8346ZM26.6641 18.3346H13.3307V15.8346C13.3307 15.6136 13.4185 15.4017 13.5748 15.2454C13.7311 15.0891 13.943 15.0013 14.1641 15.0013H15.8307V15.8346C15.8307 16.0556 15.9185 16.2676 16.0748 16.4239C16.2311 16.5802 16.443 16.668 16.6641 16.668C16.8851 16.668 17.097 16.5802 17.2533 16.4239C17.4096 16.2676 17.4974 16.0556 17.4974 15.8346V15.0013H22.4974V15.8346C22.4974 16.0556 22.5852 16.2676 22.7415 16.4239C22.8978 16.5802 23.1097 16.668 23.3307 16.668C23.5517 16.668 23.7637 16.5802 23.92 16.4239C24.0763 16.2676 24.1641 16.0556 24.1641 15.8346V15.0013H25.8307C26.0517 15.0013 26.2637 15.0891 26.42 15.2454C26.5763 15.4017 26.6641 15.6136 26.6641 15.8346V18.3346Z" fill="white"/>
</svg>`,
  therapists: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M28.3333 18.3H24.4444L20 17.1667L15.5556 19.4333L16.6667 22.8333M20 17.1667V25.1M15.5556 28.5H23.3333L24.4444 23.9667L28.8889 21.7M26.6667 28.5H30M10 27.3667C10 27.6672 10.1171 27.9555 10.3254 28.1681C10.5338 28.3806 10.8164 28.5 11.1111 28.5C11.4058 28.5 11.6884 28.3806 11.8968 28.1681C12.1052 27.9555 12.2222 27.6672 12.2222 27.3667C12.2222 27.0661 12.1052 26.7778 11.8968 26.5653C11.6884 26.3527 11.4058 26.2333 11.1111 26.2333C10.8164 26.2333 10.5338 26.3527 10.3254 26.5653C10.1171 26.7778 10 27.0661 10 27.3667ZM18.8889 12.6333C18.8889 12.9339 19.006 13.2222 19.2143 13.4347C19.4227 13.6473 19.7053 13.7667 20 13.7667C20.2947 13.7667 20.5773 13.6473 20.7857 13.4347C20.994 13.2222 21.1111 12.9339 21.1111 12.6333C21.1111 12.3328 20.994 12.0445 20.7857 11.8319C20.5773 11.6194 20.2947 11.5 20 11.5C19.7053 11.5 19.4227 11.6194 19.2143 11.8319C19.006 12.0445 18.8889 12.3328 18.8889 12.6333Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
};

const STATUS_LABELS = {
  active: "Active",
  onleave: "On Leave",
  onLeave: "On Leave",
  inactive: "Inactive",
};

const formatCurrency = (value) =>
  `$${Number(value || 0).toLocaleString("en-US")}`;

const extractRows = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.list)) return payload.list;
  if (Array.isArray(payload?.rows)) return payload.rows;
  if (Array.isArray(payload?.employees)) return payload.employees;
  if (Array.isArray(payload?.roles)) return payload.roles;
  return [];
};

const mapRoleOption = (item = {}) => {
  const id = item.id ?? item._id ?? item.roleId ?? item.value;
  const name = item.name ?? item.roleName ?? item.label ?? item.title ?? "";
  if (id == null || !name) return null;
  return { id: String(id), name: String(name) };
};

const normalizeStatus = (value) => {
  const raw = String(value || "active").trim();
  const key = raw.toLowerCase().replace(/\s+/g, "");
  if (key === "onleave") return "onleave";
  if (key === "inactive") return "inactive";
  if (key === "active") return "active";
  return raw || "active";
};

const normalizeLatestPayroll = (payroll, monthly = 0) => {
  const source =
    payroll && typeof payroll === "object" && !Array.isArray(payroll)
      ? payroll
      : {};

  return {
    startDate:
      source.startDate ||
      source.start_date ||
      source.fromDate ||
      source.from_date ||
      source.payrollStartDate ||
      source.payroll_start_date ||
      source.start ||
      "",
    endDate:
      source.endDate ||
      source.end_date ||
      source.toDate ||
      source.to_date ||
      source.payrollEndDate ||
      source.payroll_end_date ||
      source.end ||
      "",
    status: source.status || source.payrollStatus || source.payroll_status || "",
    workingDays: Number(
      source.workingDays ?? source.working_days ?? source.workingDay ?? 0
    ),
    overtimeHrs: Number(
      source.overtimeHrs ??
        source.overtime_hrs ??
        source.overtimeHours ??
        source.overtime ??
        0
    ),
    amount: Number(
      source.amount ?? source.totalAmount ?? source.total_amount ?? monthly ?? 0
    ),
  };
};

const normalizeEmployee = (item = {}) => {
  const name =
    item.name ||
    item.fullName ||
    [item.firstName, item.lastName].filter(Boolean).join(" ") ||
    "";
  const status = normalizeStatus(
    item.employmentStatus ?? item.status ?? item.employeeStatus
  );
  const joiningDate =
    item.joiningDate || item.joinDate || item.joinedDate || "";
  const roleName =
    (typeof item.role === "object" ? item.role?.name : item.role) ||
    item.roleName ||
    "";
  const roleId =
    item.roleId ??
    (typeof item.role === "object" ? item.role?.id : null) ??
    null;
  const salaryType = String(item.salaryType || "")
    .trim()
    .toLowerCase();
  const salary = Number(
    item.salary ??
      (salaryType === "hourly"
        ? item.hourlySalary ?? item.hourly
        : item.monthlySalary ?? item.monthly) ??
      0
  );
  const monthly = salary;
  const hourlySalary = salaryType === "hourly" ? salary : Number(item.hourlySalary ?? item.hourly ?? 0);

  return {
    id: item.id ?? item._id ?? item.employeeId,
    name,
    firstName: item.firstName || item.first_name || "",
    lastName: item.lastName || item.last_name || "",
    gender: item.gender || "",
    initial: name ? name.charAt(0).toUpperCase() : "?",
    role: roleName,
    roleId: roleId != null ? String(roleId) : "",
    status,
    statusLabel: STATUS_LABELS[status] || status,
    monthly,
    salary,
    hourlySalary,
    hourly: hourlySalary,
    joined: joiningDate
      ? moment(joiningDate).isValid()
        ? moment(joiningDate).format("MMM YYYY")
        : joiningDate
      : item.joined || "",
    joiningDate,
    email: item.email || "",
    phone: item.phone || item.phoneNumber || "",
    countrycode: item.countrycode || item.countryCode || "",
    emergencyContact: item.emergencyContact || "",
    emergencyCountrycode:
      item.emergencyCountrycode || item.emergencyCountryCode || "",
    address: item.address || "",
    salaryType,
    permissions: Array.isArray(item.permissions)
      ? item.permissions.map((p) =>
          typeof p === "object" ? p.name || p.label || String(p.id) : String(p)
        )
      : [],
    permissionIds: Array.isArray(item.permissions)
      ? item.permissions
          .map((p) => (typeof p === "object" ? p.id : p))
          .filter((id) => id != null)
          .map(String)
      : Array.isArray(item.permissionIds)
        ? item.permissionIds.map(String)
        : [],
    totalTips: Number(item.totalTips ?? 0),
    availableTips: Number(item.availableTips ?? 0),
    isBankDetailsAdded:
      item.isBankDetailsAdded === true ||
      item.isBankDetailsAdded === 1 ||
      item.isBankDetailsAdded === "1" ||
      item.isBankDetailsAdded === "true",
    bankDetails: item.bankDetails || item.bank_details || null,
    accountNumber:
      item.bankDetails?.account_number ||
      item.bank_details?.account_number ||
      item.account_number ||
      "",
    leaveBalances: item.leaveBalances || item.leave_balances || [],
    latestPayroll: normalizeLatestPayroll(
      item.latestPayroll ||
        item.latest_payroll ||
        item.lastPayroll ||
        item.last_payroll ||
        item.payroll ||
        {
          startDate: item.payrollStartDate || item.payroll_start_date,
          endDate: item.payrollEndDate || item.payroll_end_date,
          status: item.payrollStatus || item.payroll_status,
          workingDays: item.workingDays || item.working_days,
          overtimeHrs: item.overtimeHrs || item.overtime_hrs,
          amount: item.payrollAmount || item.payroll_amount,
        },
      monthly
    ),
    raw: item,
  };
};

const EmployeeCardSkeleton = () => (
  <HrEmployeeCard style={{ cursor: "default", pointerEvents: "none" }}>
    <HrEmployeeCardHeader>
      <Skeleton circle width={56} height={56} />
      <HrEmployeeInfo style={{ flex: 1 }}>
        <Skeleton width="70%" height={18} style={{ marginBottom: 8 }} />
        <Skeleton width="45%" height={14} />
      </HrEmployeeInfo>
      <Skeleton width={70} height={28} borderRadius={999} />
    </HrEmployeeCardHeader>
    <HrEmployeeMeta>
      <div className="meta-stats">
        <HrEmployeeMetaItem>
          <Skeleton width={50} height={12} style={{ marginBottom: 6 }} />
          <Skeleton width={70} height={16} />
        </HrEmployeeMetaItem>
        <HrEmployeeMetaItem>
          <Skeleton width={50} height={12} style={{ marginBottom: 6 }} />
          <Skeleton width={70} height={16} />
        </HrEmployeeMetaItem>
      </div>
      <HrEmployeeMetaItem className="meta-contact">
        <Skeleton width={50} height={12} style={{ marginBottom: 6 }} />
        <Skeleton width="80%" height={16} />
      </HrEmployeeMetaItem>
    </HrEmployeeMeta>
  </HrEmployeeCard>
);

export default function HrEmployees() {
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [bankDetailsModalOpen, setBankDetailsModalOpen] = useState(false);
  const [bankDetailsEmployee, setBankDetailsEmployee] = useState(null);
  const { toaster } = useToaster();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchRoles = useCallback(async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.SPA_ROLE_LIST);
      const rows = extractRows(res?.data?.data ?? res?.data);
      setRoles(rows.map(mapRoleOption).filter(Boolean));
    } catch {
      setRoles([]);
    }
  }, []);

  const fetchEmployees = useCallback(async (searchTerm = "") => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.set("search", searchTerm);

      const url = params.toString()
        ? `${API_ROUTER?.HR_EMPLOYEE_LIST}?${params.toString()}`
        : API_ROUTER?.HR_EMPLOYEE_LIST;

      const res = await axiosApiCall.get(url);
      console.log("res fetchEmployees", res);
      const payload = res?.data?.data ?? res?.data;
      const rows = extractRows(payload);
      setEmployees(rows.map(normalizeEmployee).filter((item) => item.id != null));
    } catch {
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  useEffect(() => {
    fetchEmployees(debouncedSearch);
  }, [debouncedSearch, fetchEmployees]);

  const selectedEmployee = useMemo(
    () => employees.find((employee) => employee.id === selectedEmployeeId) || null,
    [employees, selectedEmployeeId]
  );

  const editEmployee = useMemo(
    () => employees.find((employee) => employee.id === editEmployeeId) || null,
    [employees, editEmployeeId]
  );

  const stats = useMemo(() => {
    const active = employees.filter((employee) => employee.status === "active").length;
    const onLeave = employees.filter((employee) => employee.status === "onleave").length;
    const therapists = employees.filter((employee) =>
      String(employee.role || "")
        .toLowerCase()
        .includes("therapist")
    ).length;

    return [
      { label: "Total Staff", value: employees.length, icon: STAT_ICONS.staff },
      { label: "Active", value: active, icon: STAT_ICONS.active },
      { label: "On Leave", value: onLeave, icon: STAT_ICONS.leave },
      { label: "Therapists", value: therapists, icon: STAT_ICONS.therapists },
    ];
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    if (roleFilter === "all") return employees;

    return employees.filter((employee) => {
      return (
        String(employee.roleId) === String(roleFilter) ||
        String(employee.role) === String(roleFilter)
      );
    });
  }, [employees, roleFilter]);

  const handleSave = () => {
    setAddModalOpen(false);
    setEditEmployeeId(null);
    fetchEmployees(debouncedSearch);
  };

  const handleDelete = async () => {
    if (!deleteEmployeeId || deleting) return;

    try {
      setDeleting(true);
      const res = await axiosApiCall.post(API_ROUTER?.DELETE_EMPLOYEE, {
        employee_id: deleteEmployeeId,
        isAddedFromPayroll:true,
      });

      if (!res?.data?.status) {
        toaster(
          res?.data?.message || res?.message || TOAST_ALERTS.GENERAL_ERROR,
          TOAST_TYPES.ERROR
        );
        return;
      }

      toaster(
        res?.data?.message || "Employee deleted successfully",
        TOAST_TYPES.SUCCESS
      );

      if (selectedEmployeeId === deleteEmployeeId) {
        setSelectedEmployeeId(null);
      }
      setDeleteEmployeeId(null);
      fetchEmployees(debouncedSearch);
    } catch {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setDeleting(false);
    }
  };

  const handleOpenBankDetails = (event, employee) => {
    event.preventDefault();
    event.stopPropagation();
    setBankDetailsEmployee(employee);
    setBankDetailsModalOpen(true);
  };

  const handleCloseBankDetails = () => {
    setBankDetailsModalOpen(false);
    setBankDetailsEmployee(null);
  };

  return (
    <>
      <HrPageHeader $inline $banded>
        <HrPageTitleBlock $inline>
          <h1>Employee Management</h1>
          <p>Manage your spa staff and their details</p>
        </HrPageTitleBlock>
        <HrHeaderActions>
          <HrPrimaryButton type="button" onClick={() => setAddModalOpen(true)}>
            <InlineSVG src={PLUS_ICON} />
            Add Employee
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
              {loading ? <Skeleton width={40} height={28} /> : stat.value}
            </span>
          </HrStatCard>
        ))}
      </HrMetricsGrid>

      <HrToolbar>
        <HrSearchField>
          <span className="search-icon" aria-hidden="true">
            <InlineSVG src={SEARCH_ICON} />
          </span>
          <input
            type="search"
            placeholder="Search by name or email.."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search employees"
          />
        </HrSearchField>
        <HrFilterField>
          <select
            value={roleFilter}
            onChange={(event) => setRoleFilter(event.target.value)}
            aria-label="Filter by role"
          >
            <option value="all">All Roles</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          <span className="field-icon" aria-hidden="true">
            <InlineSVG src={CHEVRON_ICON} />
          </span>
        </HrFilterField>
      </HrToolbar>

      <HrEmployeeGrid>
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <EmployeeCardSkeleton key={`employee-skeleton-${index}`} />
          ))
        ) : filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee) => (
            <HrEmployeeCard
              key={employee.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedEmployeeId(employee.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedEmployeeId(employee.id);
                }
              }}
            >
              <HrEmployeeCardHeader>
                <HrAvatar $bg="#295086" $size="lg">
                  {employee.initial}
                </HrAvatar>
                <HrEmployeeInfo>
                  <h3 className="employee-name">{employee.name}</h3>
                  <p className="employee-role">{employee.role}</p>
                </HrEmployeeInfo>
                <HrPill $tone={employee.status}>{employee.statusLabel}</HrPill>
              </HrEmployeeCardHeader>

              <HrEmployeeMeta>
                <div className="meta-stats">
                  <HrEmployeeMetaItem>
                    <span className="meta-label">
                      {employee.salaryType === "hourly" ? "Hourly" : "Monthly"}
                    </span>
                    <span className="meta-value">
                      {formatCurrency(employee.monthly)}
                    </span>
                  </HrEmployeeMetaItem>
                  <HrEmployeeMetaItem>
                    <span className="meta-label">Joined</span>
                    <span className="meta-value">{employee.joined || "-"}</span>
                  </HrEmployeeMetaItem>
                </div>
                <div className="meta-contact-row">
                  <HrEmployeeMetaItem className="meta-contact">
                    <span className="meta-label">Contact</span>
                    <span className="meta-value meta-value--contact">
                      {employee.email || "-"}
                    </span>
                  </HrEmployeeMetaItem>
                  {!employee.isBankDetailsAdded && (
                    <HrEmployeeCardActionButton
                      type="button"
                      aria-label={`Add bank details for ${employee.name}`}
                      onClick={(event) => handleOpenBankDetails(event, employee)}
                    >
                      Add Bank Details
                    </HrEmployeeCardActionButton>
                  )}
                </div>
              </HrEmployeeMeta>
            </HrEmployeeCard>
          ))
        ) : (
          <HrEmptyState>No employees match your search.</HrEmptyState>
        )}
      </HrEmployeeGrid>

      <AddEmployeeModal
        open={addModalOpen || Boolean(editEmployee)}
        employee={editEmployee}
        onClose={() => {
          setAddModalOpen(false);
          setEditEmployeeId(null);
        }}
        onSave={handleSave}
      />

      <EmployeeDetailsSidebar
        open={Boolean(selectedEmployee)}
        employee={selectedEmployee}
        onClose={() => setSelectedEmployeeId(null)}
        onEdit={() => {
          if (!selectedEmployee) return;
          setEditEmployeeId(selectedEmployee.id);
        }}
        onDelete={() => {
          if (!selectedEmployee) return;
          setDeleteEmployeeId(selectedEmployee.id);
        }}
      />

      <DeleteEmployeeModal
        open={Boolean(deleteEmployeeId)}
        onClose={() => {
          if (deleting) return;
          setDeleteEmployeeId(null);
        }}
        onConfirm={handleDelete}
        loading={deleting}
      />

      <BankDetailModal
        lgShow={bankDetailsModalOpen}
        setLgShow={(open) => {
          if (!open) handleCloseBankDetails();
          else setBankDetailsModalOpen(true);
        }}
        employee={
          bankDetailsEmployee
            ? {
                id: bankDetailsEmployee.id,
                name: bankDetailsEmployee.name,
                email: bankDetailsEmployee.email,
              }
            : null
        }
        onSuccess={() => fetchEmployees(debouncedSearch)}
      />
    </>
  );
}
