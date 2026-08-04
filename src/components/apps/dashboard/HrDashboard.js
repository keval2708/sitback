"use client";

import React from "react";
import InlineSVG from "svg-inline-react";
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
  HrMetricTrend,
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
const SPARKLINE = `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.78906 2.5H9.64621V5.35714" stroke="#007BFF" stroke-width="0.714286" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.64509 2.5L5.60938 6.53571C5.54261 6.60115 5.45286 6.63781 5.35938 6.63781C5.26589 6.63781 5.17614 6.60115 5.10938 6.53571L3.46652 4.89286C3.39976 4.82742 3.31 4.79077 3.21652 4.79077C3.12303 4.79077 3.03328 4.82742 2.96652 4.89286L0.359375 7.5" stroke="#007BFF" stroke-width="0.714286" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const CHECK_ICON = `<svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.75 5.59848L4.99242 9.84091L13.4773 0.75" stroke="#295086" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const CROSS_ICON = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.447 10.447L0.75 0.75M10.447 0.75L0.75 10.447" stroke="#FF0000" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

const PAYROLL_RING_ICON = `<svg width="136" height="136" viewBox="0 0 136 136" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.1" d="M132 68C132 32.6538 103.346 4 68 4C32.6538 4 4 32.6538 4 68C4 103.346 32.6538 132 68 132C103.346 132 132 103.346 132 68Z" stroke="white" stroke-width="8" stroke-linecap="round"/>
</svg>

`;
const PAYROLL_RING_ICON_WHITE = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="white"/>
<path d="M20 15V20H25M20 29C18.8181 29 17.6478 28.7672 16.5558 28.3149C15.4639 27.8626 14.4718 27.1997 13.636 26.364C12.8003 25.5282 12.1374 24.5361 11.6851 23.4442C11.2328 22.3522 11 21.1819 11 20C11 18.8181 11.2328 17.6478 11.6851 16.5558C12.1374 15.4639 12.8003 14.4718 13.636 13.636C14.4718 12.8003 15.4639 12.1374 16.5558 11.6851C17.6478 11.2328 18.8181 11 20 11C22.3869 11 24.6761 11.9482 26.364 13.636C28.0518 15.3239 29 17.6131 29 20C29 22.3869 28.0518 24.6761 26.364 26.364C24.6761 28.0518 22.3869 29 20 29Z" stroke="#007BFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const METRICS = [
  { label: "Total Employees", value: "6", icon: USERS_ICON },
  { label: "Active Employees", value: "5", icon: USERS_ICON },
  { label: "On Leave", value: "4", icon: CALENDAR_ICON },
  { label: "Present Today", value: "7", icon: CLOCK_ICON },
];

const TIPS_ICON = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M19.1667 22.5013H20.8333C21.2754 22.5013 21.6993 22.3257 22.0118 22.0131C22.3244 21.7006 22.5 21.2767 22.5 20.8346C22.5 20.3926 22.3244 19.9687 22.0118 19.6561C21.6993 19.3436 21.2754 19.168 20.8333 19.168H18.3333C17.8333 19.168 17.4167 19.3346 17.1667 19.668L12.5 24.168" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.8307 27.5032L17.1641 26.3365C17.4141 26.0032 17.8307 25.8365 18.3307 25.8365H21.6641C22.5807 25.8365 23.4141 25.5032 23.9974 24.8365L27.8307 21.1698C28.1523 20.8659 28.34 20.4467 28.3525 20.0045C28.365 19.5622 28.2013 19.1331 27.8974 18.8115C27.5935 18.4899 27.1743 18.3022 26.732 18.2897C26.2898 18.2772 25.8606 18.4409 25.5391 18.7448L22.0391 21.9948M11.6641 23.3365L16.6641 28.3365" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M23.3307 19.9193C24.6654 19.9193 25.7474 18.8373 25.7474 17.5026C25.7474 16.1679 24.6654 15.0859 23.3307 15.0859C21.996 15.0859 20.9141 16.1679 20.9141 17.5026C20.9141 18.8373 21.996 19.9193 23.3307 19.9193Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 16.668C16.3807 16.668 17.5 15.5487 17.5 14.168C17.5 12.7873 16.3807 11.668 15 11.668C13.6193 11.668 12.5 12.7873 12.5 14.168C12.5 15.5487 13.6193 16.668 15 16.668Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const TIPS = [
  { name: "Sarah Johnson", amount: 565, color: "#295086" },
  { name: "Emma Wilson", amount: 80, color: "#236AD1" },
  { name: "Olivia Martinez", amount: 35, color: "#007BFF" },
];

const PAYROLL_RING_R = 74;
const PAYROLL_RING_CIRC = 2 * Math.PI * PAYROLL_RING_R;
const PAYROLL_RING_PROGRESS = 0.74;

const LEAVE_REQUESTS = [
  {
    id: 1,
    name: "Emma Wilson",
    initials: "EW",
    avatarBg: "#4F9CFF",
    type: "Paid",
    typeTone: "paid",
    duration: "3 days",
    dates: "Jul 28 – Jul 30",
    status: "Pending",
    statusTone: "pending",
  },
  {
    id: 2,
    name: "Olivia Martinez",
    initials: "OM",
    avatarBg: "#E8A05A",
    type: "Unpaid",
    typeTone: "unpaid",
    duration: "1 day",
    dates: "Jul 29",
    status: "Approved",
    statusTone: "approved",
  },
  {
    id: 3,
    name: "James Rodriguez",
    initials: "JR",
    avatarBg: "#4A9D77",
    type: "Casual",
    typeTone: "casual",
    duration: "2 days",
    dates: "Aug 1 – Aug 2",
    status: "Pending",
    statusTone: "pending",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    initials: "SJ",
    avatarBg: "#8B6FD4",
    type: "Paid",
    typeTone: "paid",
    duration: "5 days",
    dates: "Aug 4 – Aug 8",
    status: "Rejected",
    statusTone: "rejected",
  },
  {
    id: 5,
    name: "Maria Christopher",
    initials: "MC",
    avatarBg: "#D4B04A",
    type: "Paid",
    typeTone: "paid",
    duration: "1 day",
    dates: "Aug 10",
    status: "Pending",
    statusTone: "pending",
  },
  {
    id: 6,
    name: "Alex Harper",
    initials: "AH",
    avatarBg: "#295086",
    type: "Casual",
    typeTone: "casual",
    duration: "2 days",
    dates: "Aug 12 – Aug 13",
    status: "Approved",
    statusTone: "approved",
  },
];

const PayrollLineChart = () => (
  <HrChartWrap>
    <svg viewBox="0 0 640 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Payroll summary chart">
      <line x1="40" y1="200" x2="620" y2="200" stroke="#E6EEF7" />
      <line x1="40" y1="150" x2="620" y2="150" stroke="#F1F5F9" />
      <line x1="40" y1="100" x2="620" y2="100" stroke="#F1F5F9" />
      <line x1="40" y1="50" x2="620" y2="50" stroke="#F1F5F9" />
      <path
        d="M40 160 C110 150, 150 120, 210 130 C270 140, 310 80, 370 90 C430 100, 470 60, 530 70 C570 76, 600 90, 620 95"
        stroke="#95CCD5"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M40 170 C110 165, 150 145, 210 150 C270 155, 310 110, 370 105 C430 100, 470 55, 530 50 C570 48, 600 70, 620 78"
        stroke="#295086"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="470" cy="55" r="6" fill="#295086" />
      <rect x="390" y="12" width="120" height="34" rx="8" fill="#fff" stroke="#E6EEF7" />
      <text x="450" y="34" textAnchor="middle" fill="#295086" fontSize="12" fontWeight="600">
        $20,000 Net Salary
      </text>
      <text x="40" y="224" fill="#8391A1" fontSize="11">Jan 26</text>
      <text x="150" y="224" fill="#8391A1" fontSize="11">Feb 26</text>
      <text x="260" y="224" fill="#8391A1" fontSize="11">Mar 26</text>
      <text x="370" y="224" fill="#8391A1" fontSize="11">Apr 26</text>
      <text x="480" y="224" fill="#8391A1" fontSize="11">May 26</text>
      <text x="575" y="224" fill="#8391A1" fontSize="11">Jul 26</text>
    </svg>
  </HrChartWrap>
);

const TipsDonut = () => {
  const total = TIPS.reduce((sum, tip) => sum + tip.amount, 0);
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const gap = 6;
  let offset = 0;

  return (
    <svg viewBox="0 0 180 180" role="img" aria-label="Tips distribution">
      {TIPS.map((tip) => {
        const rawLength = (tip.amount / total) * circumference;
        const length = Math.max(rawLength - gap, 1);
        const dashOffset = -offset;
        offset += rawLength;
        return (
          <circle
            key={tip.name}
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke={tip.color}
            strokeWidth="22"
            strokeLinecap="butt"
            strokeDasharray={`${length} ${circumference - length}`}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 90 90)"
          />
        );
      })}
    </svg>
  );
};

export default function HrDashboard({ onOpenTab }) {
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
        {METRICS.map((metric) => (
          <HrMetricCard key={metric.label}>
            <HrMetricTop>
              <HrMetricLabel>{metric.label}</HrMetricLabel>

                <InlineSVG src={metric.icon} />

            </HrMetricTop>
            <HrMetricBottom>
              <HrMetricValue>{metric.value}</HrMetricValue>
              <HrMetricTrend>
                <InlineSVG src={SPARKLINE} />
                +12%
              </HrMetricTrend>
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
              <span className="amount-value">$49,057.01</span>
            </HrCardAmount>
          </HrCardHeader>
          <PayrollLineChart />
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
                <span className="ring-days">8</span>
                <span className="ring-label">days left</span>
              </div>
            </HrProgressRing>
          </HrProgressWrap>
          <HrUpcomingFooter>
            <p className="next-label">Next payroll date</p>
            <p className="next-date">Aug 1, 2026</p>
            <HrAccentButton type="button" onClick={() => onOpenTab?.("payroll")}>
              Prepare Payroll ›
            </HrAccentButton>
          </HrUpcomingFooter>
        </HrUpcomingCard>
      </HrMiddleGrid>

      <HrBottomGrid>
        <HrCard>
          <HrTipsHeader>
            <InlineSVG src={TIPS_ICON} />
            <HrCardTitleBlock>
              <h3>Tips Distributed</h3>
              <p>By therapist</p>
            </HrCardTitleBlock>
          </HrTipsHeader>
          <HrTipsChart>
            <div className="donut-wrap">
              <TipsDonut />
            </div>
            <HrTipsLegend>
              {TIPS.map((tip) => (
                <li key={tip.name}>
                  <span className="dot" style={{ background: tip.color }} />
                  <span className="name">{tip.name}</span>
                  <strong>${tip.amount}</strong>
                </li>
              ))}
            </HrTipsLegend>
          </HrTipsChart>
        </HrCard>

        <HrCard>
          <HrCardHeader>
            <HrCardTitleBlock>
              <h3>Pending Leave Requests</h3>
            </HrCardTitleBlock>
            <HrViewAllButton type="button" onClick={() => onOpenTab?.("leaves")}>
              View All
            </HrViewAllButton>
          </HrCardHeader>
          <HrTableWrap>
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
              <tbody>
                {LEAVE_REQUESTS.map((row) => (
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
                        <button type="button" className="approve" aria-label={`Approve ${row.name}`}>
                          <InlineSVG src={CHECK_ICON} />
                        </button>
                        <button type="button" className="reject" aria-label={`Reject ${row.name}`}>
                          <InlineSVG src={CROSS_ICON} />
                        </button>
                      </HrActionButtons>
                    </td>
                  </tr>
                ))}
              </tbody>
            </HrTable>
          </HrTableWrap>
        </HrCard>
      </HrBottomGrid>
    </>
  );
}
