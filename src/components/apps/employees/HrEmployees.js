"use client";

import moment from "moment";
import React, { useMemo, useState } from "react";
import InlineSVG from "svg-inline-react";
import AddEmployeeModal from "@/components/apps/employees/AddEmployeeModal";
import DeleteEmployeeModal from "@/components/apps/employees/DeleteEmployeeModal";
import EmployeeDetailsSidebar from "@/components/apps/employees/EmployeeDetailsSidebar";
import {
  HrAvatar,
  HrEmployeeCard,
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

const DEFAULT_PERMISSIONS = [
  "View Dashboard",
  "Approve Leaves",
  "Manage Attendance",
];

const DEFAULT_LEAVE = [
  { label: "Approved (days)", value: 6 },
  { label: "Approved (days)", value: 6 },
  { label: "Approved (days)", value: 6 },
];

const createEmployee = (data) => ({
  phone: "+1-555-0101",
  emergencyContact: "281-444-3289",
  address: "123 Harbor Street, Philadelphia, PA",
  bankAccount: "PKBAL03321004798563",
  salaryType: "Monthly",
  totalTips: 565,
  availableTips: 0,
  permissions: DEFAULT_PERMISSIONS,
  leaveBalances: DEFAULT_LEAVE,
  latestPayroll: {
    startDate: "2026-07-25",
    endDate: "2026-07-27",
    status: "Processed",
    workingDays: 0,
    overtimeHrs: 0,
    amount: data.monthly || 0,
  },
  ...data,
});

const INITIAL_EMPLOYEES = [
  createEmployee({
    id: "jr",
    name: "James Rodriguez",
    initial: "J",
    role: "Therapist",
    status: "active",
    statusLabel: "Active",
    monthly: 80,
    joined: "Nov 2024",
    joiningDate: "2024-11-01",
    email: "james@example.com",
  }),
  createEmployee({
    id: "sj",
    name: "Sarah Johnson",
    initial: "S",
    role: "Therapist",
    status: "active",
    statusLabel: "Active",
    monthly: 3500,
    joined: "Nov 2024",
    joiningDate: "2024-01-15",
    email: "sarah@example.com",
    totalTips: 565,
    latestPayroll: {
      startDate: "2026-07-25",
      endDate: "2026-07-27",
      status: "Processed",
      workingDays: 0,
      overtimeHrs: 0,
      amount: 3500,
    },
  }),
  createEmployee({
    id: "mc",
    name: "Michael Chen",
    initial: "M",
    role: "Receptionist",
    status: "active",
    statusLabel: "Active",
    monthly: 2800,
    joined: "Nov 2024",
    joiningDate: "2024-11-10",
    email: "michael@example.com",
    totalTips: 120,
  }),
  createEmployee({
    id: "om",
    name: "Olivia Martinez",
    initial: "O",
    role: "Therapist",
    status: "active",
    statusLabel: "Active",
    monthly: 3600,
    joined: "Nov 2024",
    joiningDate: "2024-11-05",
    email: "olivia@example.com",
    totalTips: 410,
  }),
  createEmployee({
    id: "la",
    name: "Lisa Anderson",
    initial: "L",
    role: "Manager",
    status: "active",
    statusLabel: "Active",
    monthly: 5200,
    joined: "Jun 2022",
    joiningDate: "2022-06-01",
    email: "lisa@example.com",
    totalTips: 0,
  }),
  createEmployee({
    id: "ew",
    name: "Emma Wilson",
    initial: "E",
    role: "Therapist",
    status: "active",
    statusLabel: "Active",
    monthly: 3800,
    joined: "Aug 2023",
    joiningDate: "2023-08-12",
    email: "emma@example.com",
    totalTips: 290,
  }),
];

const ROLE_OPTIONS = ["All Roles", "Therapist", "Receptionist", "Manager"];

const STATUS_LABELS = {
  active: "Active",
  onleave: "On Leave",
  inactive: "Inactive",
};

const formatCurrency = (value) =>
  `$${Number(value || 0).toLocaleString("en-US")}`;

const mapFormToEmployee = (form, existing = null) => {
  const name = form.fullName.trim();
  const status = form.employmentStatus || "active";
  const monthly = Number(form.monthlySalary || 0);

  return createEmployee({
    ...(existing || {}),
    id: existing?.id || `emp-${Date.now()}`,
    name,
    initial: name.charAt(0).toUpperCase(),
    role: form.role,
    status,
    statusLabel: STATUS_LABELS[status] || "Active",
    monthly,
    joined: form.joiningDate
      ? moment(form.joiningDate).format("MMM YYYY")
      : existing?.joined || "",
    joiningDate: form.joiningDate,
    email: form.email.trim(),
    phone: form.phone,
    emergencyContact: form.emergencyContact,
    address: form.address,
    bankAccount: form.bankAccount,
    salaryType: form.salaryType || "Monthly",
    permissions: form.permissions || [],
    latestPayroll: {
      ...(existing?.latestPayroll || {
        startDate: "2026-07-25",
        endDate: "2026-07-27",
        status: "Processed",
        workingDays: 0,
        overtimeHrs: 0,
      }),
      amount: monthly,
    },
  });
};

export default function HrEmployees() {
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);

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
    const therapists = employees.filter((employee) => employee.role === "Therapist").length;

    return [
      { label: "Total Staff", value: employees.length, icon: STAT_ICONS.staff },
      { label: "Active", value: active, icon: STAT_ICONS.active },
      { label: "On Leave", value: onLeave, icon: STAT_ICONS.leave },
      { label: "Therapists", value: therapists, icon: STAT_ICONS.therapists },
    ];
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    const query = search.trim().toLowerCase();

    return employees.filter((employee) => {
      const matchesRole =
        roleFilter === "All Roles" || employee.role === roleFilter;
      const matchesSearch =
        !query ||
        employee.name.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query);

      return matchesRole && matchesSearch;
    });
  }, [employees, search, roleFilter]);

  const handleSave = (form) => {
    if (editEmployee) {
      setEmployees((prev) =>
        prev.map((employee) =>
          employee.id === editEmployee.id
            ? mapFormToEmployee(form, employee)
            : employee
        )
      );
      setEditEmployeeId(null);
      return;
    }

    setEmployees((prev) => [mapFormToEmployee(form), ...prev]);
  };

  const handleDelete = () => {
    if (!deleteEmployeeId) return;
    setEmployees((prev) =>
      prev.filter((employee) => employee.id !== deleteEmployeeId)
    );
    if (selectedEmployeeId === deleteEmployeeId) {
      setSelectedEmployeeId(null);
    }
    setDeleteEmployeeId(null);
  };

  return (
    <>
      <HrPageHeader $inline>
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
            <span className="stat-value">{stat.value}</span>
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
            {ROLE_OPTIONS.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <span className="field-icon" aria-hidden="true">
            <InlineSVG src={CHEVRON_ICON} />
          </span>
        </HrFilterField>
      </HrToolbar>

      <HrEmployeeGrid>
        {filteredEmployees.map((employee) => (
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
                  <span className="meta-label">Monthly</span>
                  <span className="meta-value">
                    {formatCurrency(employee.monthly)}
                  </span>
                </HrEmployeeMetaItem>
                <HrEmployeeMetaItem>
                  <span className="meta-label">Joined</span>
                  <span className="meta-value">{employee.joined}</span>
                </HrEmployeeMetaItem>
              </div>
              <HrEmployeeMetaItem className="meta-contact">
                <span className="meta-label">Contact</span>
                <span className="meta-value meta-value--contact">
                  {employee.email}
                </span>
              </HrEmployeeMetaItem>
            </HrEmployeeMeta>
          </HrEmployeeCard>
        ))}

        {!filteredEmployees.length && (
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
        onClose={() => setDeleteEmployeeId(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}
