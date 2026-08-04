"use client";

import React from "react";
import InlineSVG from "svg-inline-react";
import {
  HrDetailItem,
  HrDetailList,
  HrDrawerActions,
  HrDrawerBody,
  HrDrawerHeader,
  HrDrawerOverlay,
  HrDrawerPanel,
  HrDrawerSection,
  HrLeaveGrid,
  HrMiniStatCard,
  HrPayCard,
  HrPayGrid,
  HrPayrollCard,
} from "@/styles/pages/hr-module.style";

const EDIT_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 2H3.33333C2.97971 2 2.64057 2.14048 2.39052 2.39052C2.14048 2.64057 2 2.97971 2 3.33333V12.6667C2 13.0203 2.14048 13.3594 2.39052 13.6095C2.64057 13.8595 2.97971 14 3.33333 14H12.6667C13.0203 14 13.3594 13.8595 13.6095 13.6095C13.8595 13.3594 14 13.0203 14 12.6667V8" stroke="#295086" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.2475 1.75015C12.5127 1.48493 12.8724 1.33594 13.2475 1.33594C13.6225 1.33594 13.9822 1.48493 14.2475 1.75015C14.5127 2.01537 14.6617 2.37508 14.6617 2.75015C14.6617 3.12522 14.5127 3.48493 14.2475 3.75015L8.23879 9.75948C8.08049 9.91765 7.88493 10.0334 7.67012 10.0962L5.75479 10.6562C5.69743 10.6729 5.63662 10.6739 5.57873 10.6591C5.52084 10.6442 5.46801 10.6141 5.42576 10.5719C5.3835 10.5296 5.35338 10.4768 5.33855 10.4189C5.32372 10.361 5.32473 10.3002 5.34146 10.2428L5.90146 8.32748C5.96448 8.11285 6.08048 7.91752 6.23879 7.75948L12.2475 1.75015Z" stroke="#295086" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const DELETE_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.66406 14C4.2974 14 3.98362 13.8696 3.72273 13.6087C3.46184 13.3478 3.33118 13.0338 3.33073 12.6667V4C3.14184 4 2.98362 3.936 2.85606 3.808C2.72851 3.68 2.66451 3.52178 2.66406 3.33333C2.66362 3.14489 2.72762 2.98667 2.85606 2.85867C2.98451 2.73067 3.14273 2.66667 3.33073 2.66667H5.9974C5.9974 2.47778 6.0614 2.31956 6.1894 2.192C6.3174 2.06444 6.47562 2.00044 6.66406 2H9.33073C9.51962 2 9.67807 2.064 9.80607 2.192C9.93407 2.32 9.99784 2.47822 9.9974 2.66667H12.6641C12.853 2.66667 13.0114 2.73067 13.1394 2.85867C13.2674 2.98667 13.3312 3.14489 13.3307 3.33333C13.3303 3.52178 13.2663 3.68022 13.1387 3.80867C13.0112 3.93711 12.853 4.00089 12.6641 4V12.6667C12.6641 13.0333 12.5336 13.3473 12.2727 13.6087C12.0118 13.87 11.6978 14.0004 11.3307 14H4.66406ZM11.3307 4H4.66406V12.6667H11.3307V4ZM7.1394 11.142C7.26695 11.014 7.33073 10.8556 7.33073 10.6667V6C7.33073 5.81111 7.26673 5.65289 7.13873 5.52533C7.01073 5.39778 6.85251 5.33378 6.66406 5.33333C6.47562 5.33289 6.3174 5.39689 6.1894 5.52533C6.0614 5.65378 5.9974 5.812 5.9974 6V10.6667C5.9974 10.8556 6.0614 11.014 6.1894 11.142C6.3174 11.27 6.47562 11.3338 6.66406 11.3333C6.85251 11.3329 7.01095 11.2696 7.1394 11.142ZM9.80607 11.1413C9.93362 11.0142 9.9974 10.856 9.9974 10.6667V6C9.9974 5.81111 9.9334 5.65289 9.8054 5.52533C9.6774 5.39778 9.51918 5.33378 9.33073 5.33333C9.14229 5.33289 8.98407 5.39689 8.85607 5.52533C8.72807 5.65378 8.66407 5.812 8.66407 6V10.6667C8.66407 10.8556 8.72807 11.014 8.85607 11.142C8.98407 11.27 9.14229 11.3338 9.33073 11.3333C9.51918 11.3329 9.67762 11.2689 9.80607 11.1413Z" fill="#E86D4D"/>
</svg>
`;
const EMAIL_ICON = `<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 5.25h12a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5H3A1.5 1.5 0 0 1 1.5 14.25v-7.5A1.5 1.5 0 0 1 3 5.25Z" stroke="currentColor" stroke-width="1.3"/><path d="m2.25 6.75 6.75 4.5 6.75-4.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const PHONE_ICON = `<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.3 3.75H4.65A1.65 1.65 0 0 0 3 5.4c0 6.075 4.875 10.95 10.95 10.95a1.65 1.65 0 0 0 1.65-1.65v-1.65l-2.888-.722a1.35 1.35 0 0 0-1.372.405l-.87.87a8.55 8.55 0 0 1-3.998-3.997l.87-.87a1.35 1.35 0 0 0 .405-1.373L6.3 3.75Z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const LOCATION_ICON = `<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 9.75a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" stroke="currentColor" stroke-width="1.3"/><path d="M9 2.25a5.25 5.25 0 0 1 5.25 5.25c0 3.938-5.25 8.25-5.25 8.25S3.75 11.438 3.75 7.5A5.25 5.25 0 0 1 9 2.25Z" stroke="currentColor" stroke-width="1.3"/></svg>`;
const USER_ICON = `<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.75 15a5.25 5.25 0 0 1 10.5 0" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`;
const CALENDAR_ICON = `<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.25 3.75h-1.5V3a.75.75 0 1 0-1.5 0v.75h-4.5V3a.75.75 0 0 0-1.5 0v.75h-1.5A1.5 1.5 0 0 0 2.25 5.25v9a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5v-9a1.5 1.5 0 0 0-1.5-1.5Zm0 10.5H3.75V7.5h10.5v6.75Z" fill="currentColor"/></svg>`;
const BANK_ICON = `<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7.5h12M4.5 7.5V13.5M7.5 7.5V13.5M10.5 7.5V13.5M13.5 7.5V13.5M2.25 13.5h13.5M9 3l6.75 4.5H2.25L9 3Z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const formatCurrency = (value) =>
  `$${Number(value || 0).toLocaleString("en-US")}`;

const formatJoiningDate = (value) => {
  if (!value) return "-";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-");
    return `${day}/${month}/${year}`;
  }
  return value;
};

export default function EmployeeDetailsSidebar({
  employee,
  open,
  onClose,
  onEdit,
  onDelete,
}) {
  if (!open || !employee) return null;

  const leaveBalances = employee.leaveBalances || [
    { label: "Approved (days)", value: 6 },
    { label: "Approved (days)", value: 6 },
    { label: "Approved (days)", value: 6 },
  ];

  const payroll = employee.latestPayroll || {
    startDate: "2026-07-25",
    endDate: "2026-07-27",
    status: "Processed",
    workingDays: 0,
    overtimeHrs: 0,
    amount: employee.monthly || 0,
  };

  const details = [
    { icon: EMAIL_ICON, label: "Email", value: employee.email || "-" },
    { icon: PHONE_ICON, label: "Phone", value: employee.phone || "-" },
    { icon: LOCATION_ICON, label: "Address", value: employee.address || "-" },
    {
      icon: USER_ICON,
      label: "Emergency Contact",
      value: employee.emergencyContact || "-",
    },
    {
      icon: CALENDAR_ICON,
      label: "Joining Date",
      value: formatJoiningDate(employee.joiningDate || employee.joined),
    },
    {
      icon: BANK_ICON,
      label: "Bank Account",
      value: employee.bankAccount || "-",
    },
  ];

  return (
    <>
      <HrDrawerOverlay onClick={onClose} aria-hidden="true" />
      <HrDrawerPanel
        role="dialog"
        aria-modal="true"
        aria-label="Employee details"
      >
        <HrDrawerHeader>
          <span className="drawer-avatar">{employee.initial}</span>
          <div className="drawer-info">
            <h2 className="drawer-name">{employee.name}</h2>
            <p className="drawer-role">{employee.role}</p>
          </div>
          <span className="drawer-status">{employee.statusLabel}</span>
        </HrDrawerHeader>

        <HrDrawerBody>
          <HrDrawerActions>
            <button type="button" className="edit-btn" onClick={onEdit}>
              <InlineSVG src={EDIT_ICON} />
              Edit
            </button>
            <button type="button" className="delete-btn" onClick={onDelete}>
              <InlineSVG src={DELETE_ICON} />
              Delete
            </button>
          </HrDrawerActions>

          <HrDrawerSection>
            <h3 className="section-title">Employee Details</h3>
            <HrDetailList>
              {details.map((item) => (
                <HrDetailItem key={item.label}>
                  <span className="detail-icon" aria-hidden="true">
                    <InlineSVG src={item.icon} />
                  </span>
                  <div className="detail-content">
                    <span className="detail-label">{item.label}</span>
                    <span className="detail-value">{item.value}</span>
                  </div>
                </HrDetailItem>
              ))}
            </HrDetailList>
          </HrDrawerSection>

          <HrDrawerSection>
            <h3 className="section-title">Leave Balance</h3>
            <HrLeaveGrid>
              {leaveBalances.map((item, index) => (
                <HrMiniStatCard key={`${item.label}-${index}`}>
                  <span className="mini-value">{item.value}</span>
                  <span className="mini-label">{item.label}</span>
                </HrMiniStatCard>
              ))}
            </HrLeaveGrid>
          </HrDrawerSection>

          <HrDrawerSection>
            <h3 className="section-title">Pay Details</h3>
            <HrPayGrid>
              <HrPayCard>
                <span className="pay-value">
                  {employee.salaryType || "Monthly"}
                </span>
                <span className="pay-label">Salary Type</span>
              </HrPayCard>
              <HrPayCard>
                <span className="pay-value">
                  {formatCurrency(employee.monthly)}
                </span>
                <span className="pay-label">Salary Amount</span>
              </HrPayCard>
              <HrPayCard>
                <span className="pay-value">
                  {formatCurrency(employee.totalTips ?? 565)}
                </span>
                <span className="pay-label">Total Tips</span>
              </HrPayCard>
              <HrPayCard>
                <span className="pay-value">
                  {formatCurrency(employee.availableTips ?? 0)}
                </span>
                <span className="pay-label">Available Tips</span>
              </HrPayCard>
            </HrPayGrid>
          </HrDrawerSection>


            <HrPayrollCard>
              <div className="payroll-left">
                <h3 className="payroll-label">Latest Payroll</h3>
                <p className="payroll-dates">
                  {payroll.startDate} → {payroll.endDate}
                </p>
                <p className="payroll-meta">
                  {payroll.workingDays} working days · {payroll.overtimeHrs}{" "}
                  Overtime hrs
                </p>
              </div>
              <div className="payroll-right">
                <span className="payroll-status">{payroll.status}</span>
                <p className="payroll-amount">
                  {formatCurrency(payroll.amount)}
                </p>
              </div>
            </HrPayrollCard>

        </HrDrawerBody>
      </HrDrawerPanel>
    </>
  );
}
