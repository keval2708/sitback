"use client";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { theme } from "../global/theme";
import { mediaQueries } from "@/utils/mediaQuery";

const hrScrollbarStyles = css`
  scrollbar-width: thin;
  scrollbar-color: #295086 #e9dede;

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #e9dede;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #295086;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #1f3d66;
  }
`;

export const HrPage = styled.div`
  background: #f5f8fc;
  min-height: calc(100vh - 80px);
  color: ${theme.color.secondary};
  ${hrScrollbarStyles}

  * {
    scrollbar-width: thin;
    scrollbar-color: #295086 #e9dede;
  }

  *::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  *::-webkit-scrollbar-track {
    background: #e9dede;
    border-radius: 6px;
  }

  *::-webkit-scrollbar-thumb {
    background: #295086;
    border-radius: 6px;
  }

  *::-webkit-scrollbar-thumb:hover {
    background: #1f3d66;
  }
`;

export const HrSubNav = styled.nav`
  background: ${theme.color.white};
  border-bottom: 1px solid ${theme.color.border};
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  ${hrScrollbarStyles}

  ${mediaQueries("sm")`
    padding: 0 12px;
  `}
`;

export const HrModuleLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 14px 14px;
  color: ${theme.color.secondary};
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;

  svg {
    width: 18px;
    height: 18px;
    display: block;
  }
`;

export const HrTabButton = styled.button`
  appearance: none;
  border: none;
  background: transparent;
  padding: 16px 14px 14px;
  color: ${theme.color.grayv2};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  position: relative;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: color 0.15s ease;

  svg {
    width: 18px;
    height: 18px;
    display: block;
    flex-shrink: 0;
  }

  &:hover {
    color: ${theme.color.secondary};
  }

  ${(props) =>
    props.$active &&
    `
    color: ${theme.color.secondary};
    font-weight: 600;

    &::after {
      content: "";
      position: absolute;
      left: 10px;
      right: 10px;
      bottom: 0;
      height: 3px;
      border-radius: 3px 3px 0 0;
      background: ${theme.color.secondary};
    }
  `}
`;

export const HrContent = styled.div`
  padding: 28px 32px 48px;
  max-width: 1440px;
  margin: 0 auto;

  ${mediaQueries("lg")`
    padding: 24px 20px 40px;
  `}

  ${mediaQueries("sm")`
    padding: 20px 14px 32px;
  `}
`;

export const HrPageHeader = styled.div`
  display: flex;
  align-items: ${(props) => (props.$inline ? "center" : "flex-start")};
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;

  ${(props) =>
    props.$banded &&
    `
    background: #F5FBFF;
    border-bottom: 1px solid #d2e3f0;
    margin: -28px -32px 24px;
    padding: 18px 32px;
    width: calc(100% + 64px);
    box-sizing: border-box;

    ${mediaQueries("lg")`
      margin: -24px -20px 24px;
      padding: 16px 20px;
      width: calc(100% + 40px);
    `}
  `}
`;

export const HrPageTitleBlock = styled.div`
  ${(props) =>
    props.$inline
      ? `
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 10px 14px;
    min-width: 0;

    h1 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: ${theme.color.secondary};
      white-space: nowrap;
    }

    p {
      margin: 0;
      color: ${theme.color.secondary};
      font-size: 13px;
      font-weight: 400;
    }
  `
      : `
    h1 {
      margin: 0 0 6px;
      font-size: 24px;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: ${theme.color.secondary};
    }

    p {
      margin: 0;
      color: ${theme.color.secondary};
      font-size: 12px;
      font-weight: 500;
    }
  `}
`;

export const HrPrimaryButton = styled.button`
  appearance: none;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 42px;
  padding: 10px 18px;
  border-radius: 100px;
  background: ${theme.color.secondary};
  color: ${theme.color.white};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.03em;
  cursor: pointer;

`;

export const HrMetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 20px;

  ${mediaQueries("lg")`
    grid-template-columns: repeat(2, minmax(0, 1fr));
  `}

  ${mediaQueries("sm")`
    grid-template-columns: 1fr;
  `}
`;

export const HrMetricCard = styled.div`
  background: ${theme.color.white};
  border: 1px solid #e8eef6;
  border-radius: 12px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: 0 2px 10px rgba(41, 80, 134, 0.04);
  min-height: 125px;
`;

export const HrMetricTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const HrMetricLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${theme.color.secondary};
  line-height: 1.3;
`;

export const HrMetricBottom = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
`;

export const HrMetricValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${theme.color.secondary};
  line-height: 1;
`;

export const HrMetricIcon = styled.div`



`;

export const HrMetricTrend = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-height: 28px;
  padding: 4px 10px;
  border-radius: 999px;
  background: #DFECF9;
  color: #007BFF;
  font-size: 10px;
  font-weight: 400;
  white-space: nowrap;
`;

export const HrMiddleGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(260px, 1fr);
  gap: 16px;
  margin-bottom: 20px;
  align-items: stretch;

  ${mediaQueries("lg")`
    grid-template-columns: 1fr;
  `}
`;

export const HrCard = styled.div`
  background: ${theme.color.white};
  border: 1px solid #e8eef6;
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(41, 80, 134, 0.04);
  ${(props) =>
    props.$stretch
      ? `
    height: 100%;
    display: flex;
    flex-direction: column;
  `
      : ""}
`;

export const HrCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

export const HrCardTitleBlock = styled.div`
  h3 {
    margin: 0 0 4px;
    font-size: 18px;
    font-weight: 500;
    color: ${theme.color.secondary};
  }

  p {
    margin: 0;
    font-size: 12px;
    font-weight: 500;
    color: #94A3B8;
  }
`;

export const HrCardAmount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  text-align: right;

  .amount-label {
    font-size: 12px;
    font-weight: 700;
    color: #94A3B8;
    line-height: 1.2;
  }

  .amount-value {
    font-size: 18px;
    font-weight: 700;
    color: ${theme.color.secondary};
    white-space: nowrap;
    line-height: 1.2;
  }
`;

export const HrChartWrap = styled.div`
  width: 100%;
  min-height: 220px;
  position: relative;

  svg,
  canvas {
    width: 100%;
    height: 270px;
    display: block;
  }

  svg {
    height: auto;
  }
`;

export const HrUpcomingCard = styled.div`
  background: #25416C;
  border-radius: 16px;
  padding: 28px 24px 24px;
  color: ${theme.color.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 100%;
  box-shadow: 0 8px 24px rgba(41, 80, 134, 0.18);
`;

export const HrUpcomingHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: left;

  svg {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
  }
`;

export const HrProgressWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 4px 0 28px;
`;

export const HrProgressRing = styled.div`
  width: 135px;
  height: 135px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .ring-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .ring-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1.1;
  }

  .ring-days {
    font-size: 34px;
    font-weight: 700;
    color: ${theme.color.white};
  }

  .ring-label {
    font-size: 12px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.78);
    margin-top: 4px;
  }
`;

export const HrUpcomingFooter = styled.div`
  width: 100%;
  margin-top: auto;
  text-align: center;

  .next-label {
    margin: 0 0 6px;
    font-size: 13px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.72);
  }

  .next-date {
    margin: 0 0 20px;
    font-size: 20px;
    font-weight: 700;
    color: ${theme.color.white};
    line-height: 1.3;
  }
`;

export const HrAccentButton = styled.button`
  appearance: none;
  width: 100%;
  border: none;
  min-height: 48px;
  border-radius: 14px;
  background: #007BFF;
  color: ${theme.color.white};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: background 0.15s ease;

  &:hover {
    background: #3f8ef0;
  }
`;

export const HrBottomGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(260px, 0.85fr) minmax(0, 1.6fr);
  gap: 16px;

  ${mediaQueries("lg")`
    grid-template-columns: 1fr;
  `}
`;

export const HrTipsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;

  .tips-header-left {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  svg {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
  }
`;

export const HrTipsChart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  .donut-wrap {
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .donut-wrap svg,
  .donut-wrap canvas {
    width: 100%;
    height: 100%;
  }

  .donut-wrap svg {
    height: 100%;
  }
`;

export const HrTipsLegend = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    font-weight: 500;
    color: #64748b;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .name {
    flex: 1;
    min-width: 0;
  }

  strong {
    font-weight: 700;
    color: ${theme.color.secondary};
  }
`;

export const HrTableWrap = styled.div`
  width: 100%;
  overflow-x: auto;
  ${hrScrollbarStyles}
  ${(props) =>
    props.$empty
      ? `
    flex: 1;
    min-height: 180px;
    display: flex;
    flex-direction: column;
  `
      : props.$stretch
        ? `
    flex: 1;
  `
        : ""}

  .empty-state {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 13px;
    font-weight: 500;
    color: #8391a1;
    padding: 24px 12px;
  }
`;

export const HrTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: ${(props) => props.$minWidth || "720px"};

  th {
    text-align: left;
    font-size: 14px;
    font-weight: 500;
    color: ${theme.color.secondary};
    padding: 0 10px 12px;
    border-bottom: 1px solid #eef2f7;
    white-space: nowrap;
  }

  td {
    padding: 14px 10px;
    border-bottom: 1px solid #f1f5f9;
    font-size: 13px;
    color: rgba(41, 80, 134, 0.8);
    vertical-align: middle;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

export const HrNameCell = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
`;

export const HrAvatar = styled.span`
  width: ${(props) => (props.$size === "lg" ? "44px" : "32px")};
  height: ${(props) => (props.$size === "lg" ? "44px" : "32px")};
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => (props.$size === "lg" ? "16px" : "11px")};
  font-weight: 700;
  color: ${theme.color.white};
  background: ${(props) => props.$bg || theme.color.secondary};
  flex-shrink: 0;
`;

export const HrPill = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 400;
  white-space: nowrap;

  ${(props) => {
    switch (props.$tone) {
      case "present":
        return `background: #e7f7ef; color: ${theme.color.lightGreen};`;
      case "halfday":
        return `background: #e8f1fb; color: ${theme.color.secondary};`;
      case "late":
        return `background: #fdeceb; color: #d6453d;`;
      case "paid":
        return `background: #0FB95C33; color: #10B981;`;
      case "unpaid":
        return `background: #fff1e8; color: #c45c26;`;
      case "casual":
        return `background: #eef6ff; color: #3b7ddd;`;
      case "pending":
        return `background: #e8f1fb; color: ${theme.color.secondary};`;
      case "processed":
        return `background: #DFECF9; color: #295086CC;`;
      case "payroll-paid":
        return `background: #e7f7ef; color: ${theme.color.lightGreen};`;
      case "approved":
        return `background: #e7f7ef; color: ${theme.color.lightGreen};`;
      case "generated":
        return `background: #10B98133; color: ${theme.color.lightGreen2};`;
      case "card":
        return `background: #D9F6FB; color: #12A6C0;`;
      case "cash":
        return `background: #D9F8E7; color: #10B981;`;
      case "withdrawn":
        return `background: #F1F3F6; color: #8391A1;`;
      case "available":
        return `background: #D9F8E7; color: #10B981;`;
      case "withdraw-processed":
        return `background: #E8F9DF; color: #328629CC;`;
      case "rejected":
        return `background: #fdeceb; color: #d6453d;`;
      case "active":
        return `background: #e7f7ef; color: ${theme.color.lightGreen};`;
      case "onleave":
        return `background: #fff1e8; color: #c45c26;`;
      case "inactive":
        return `background: #f1f5f9; color: ${theme.color.grayv2};`;
      default:
        return `background: #f1f5f9; color: ${theme.color.grayv2};`;
    }
  }}
`;

export const HrActionButtons = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;

  button {
    appearance: none;
    border-radius: 50%;
    border: none;
    background: transparent;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
    width: 28px;
    height: 28px;
    line-height: 0;

    svg {
      display: block;
    }
  }
`;

export const HrViewAllButton = styled.button`
  appearance: none;
  border: none;
  background: ${theme.color.secondary};
  color: ${theme.color.white};
  min-height: 34px;
  padding: 8px 14px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  cursor: pointer;
`;

export const HrPlaceholder = styled.div`
  background: ${theme.color.white};
  border: 1px solid #e8eef6;
  border-radius: 14px;
  padding: 48px 24px;
  text-align: center;
  color: ${theme.color.grayv2};
  box-shadow: 0 2px 10px rgba(41, 80, 134, 0.04);

  h2 {
    margin: 0 0 8px;
    color: ${theme.color.secondary};
    font-size: 22px;
  }

  p {
    margin: 0;
    font-size: 14px;
  }
`;

export const HrHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const HrDateField = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 42px;
  min-width: ${(props) => (props.$wide ? "170px" : "145px")};
  border-radius: 100px;
  border: 1px solid #d7e2ef;
  background: none;

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container {
    width: 100%;
  }

  .react-datepicker-popper {
    z-index: 20;
  }

  input {
    width: 100%;
    min-height: 42px;
    border: none;
    background: transparent;
    padding: 0 ${(props) => (props.$clearable ? "58px" : "42px")} 0 14px;
    font-size: 13px;
    font-weight: 500;
    color: ${theme.color.secondary};
    outline: none;
    cursor: pointer;
     &::placeholder {
      color: ${theme.color.secondary} !important;
    }
  }

  .clear-btn {
    appearance: none;
    border: none;
    background: transparent;
    position: absolute;
    right: 34px;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${theme.color.grayv2};
    z-index: 2;
    line-height: 0;

    &:hover {
      color: #e32c1f;
    }

    svg {
      display: block;
      width: 12px;
      height: 12px;
    }
  }

  .field-icon {
    position: absolute;
    right: 14px;
    top: 42%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    pointer-events: none;
    color: ${theme.color.grayv2};
    z-index: 1;
  }
`;

export const HrStatCard = styled.div`
  background: ${theme.color.white};
  border: 1px solid #e8eef6;
  border-radius: 12px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  box-shadow: 0 2px 10px rgba(41, 80, 134, 0.04);
  min-height: 110px;

  .stat-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .stat-label {
    font-size: 14px;
    font-weight: 500;
    color: ${theme.color.secondary};
    line-height: 1.3;
  }

  .stat-icon {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    display: inline-flex;

    svg {
      width: 40px;
      height: 40px;
      display: block;
    }
  }

  .stat-value {
    font-size: 20px;
    font-weight: 600;
    line-height: 1;
    color: ${theme.color.secondary};
  }
`;

export const HrTableCard = styled.div`
  background: none;
  border: 1px solid #e8eef6;
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(41, 80, 134, 0.04);
`;

export const HrModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1100;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  overflow: hidden;
  overscroll-behavior: contain;
`;

export const HrModalCard = styled.div`
  width: 100%;
  max-width: ${(props) => (props.$wide ? "720px" : "560px")};
  max-height: calc(100vh - 48px);
  overflow: auto;
  overscroll-behavior: contain;
  background: ${theme.color.white};
  border-radius: 16px;
  padding: 28px 28px 24px;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.2);
  position: relative;
  ${hrScrollbarStyles}
`;

export const HrModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 24px;

  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    color: ${theme.color.secondary};
    text-align: center;
  }
`;

export const HrModalClose = styled.button`
  appearance: none;
  border: none;
  background: transparent;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #e11d48;
  padding: 0;
  line-height: 0;

  svg {
    display: block;
    width: 24px;
    height: 24px;
  }
`;

export const HrModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const HrModalRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$cols || "1fr"};
  gap: 14px;

  ${mediaQueries("sm")`
    grid-template-columns: 1fr;
  `}
`;

export const HrField = styled.label`
  display: block;
  position: relative;
  width: 100%;

  .placeholder {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    font-weight: 500;
    color: ${theme.color.secondary};
    pointer-events: none;
    z-index: 1;
  }

  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    width: 100%;
    display: block;
  }

  .react-datepicker-popper {
    z-index: 30;
  }

  .react-datepicker-popper.hr-datepicker-portal-popper {
    z-index: 9999;
  }

  .hr-phone-input {
    display: flex;
    align-items: center;
    width: 100%;
    border: 1px solid #d7e2ef;
    background: ${theme.color.white};
    border-radius: 100px;
    min-height: 48px;
    overflow: hidden;
    transition: border-color 0.15s ease;

    &:focus-within {
      border-color: ${theme.color.secondary};
    }

    .phone-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      flex-shrink: 0;
      padding-left: 8px;

      img {
        width: 18px;
        height: 18px;
        object-fit: contain;
      }
    }

    .country-code {
      width: 35px;
      flex-shrink: 0;

      input {
        width: 100%;
        min-height: 46px;
        border: none !important;
        border-radius: 0 !important;
        padding: 12px 0 12px 16px !important;
        background: transparent;
        pointer-events: none;
      }
    }

    .phone-digits {
      flex: 1;
      min-width: 0;

      input {
        width: 100%;
        min-height: 46px;
        border: none !important;
        border-radius: 0 !important;
        padding: 12px 20px 12px 8px !important;
        background: transparent;
      }
    }

    &:not(.has-value) .phone-digits input {
      padding-left: 4px !important;
    }
  }

  .phone-number-input-wrapper {
    width: 100%;
    display: block;

    &.react-tel-input {
      width: 100%;
    }

    .form-control {
      width: 100% !important;
      appearance: none;
      border: 1px solid #d7e2ef !important;
      background: ${theme.color.white} !important;
      border-radius: 100px !important;
      min-height: 48px !important;
      height: 48px !important;
      padding: 12px 20px 12px 52px !important;
      font-size: 14px !important;
      font-weight: 500 !important;
      color: ${theme.color.secondary} !important;
      outline: none !important;
      box-shadow: none !important;

      &::placeholder {
        color: ${theme.color.secondary} !important;
      }

      &:focus {
        border-color: ${theme.color.secondary} !important;
      }
    }

    .flag-dropdown {
      border: none !important;
      background: transparent !important;
      border-radius: 100px 0 0 100px !important;
      padding-left: 8px;
    }

    .selected-flag {
      background: transparent !important;
      border-radius: 100px 0 0 100px !important;
      padding-left: 12px !important;
      width: 44px !important;

      &:hover,
      &:focus,
      &.open {
        background: transparent !important;
      }
    }

    .country-list {
      border-radius: 12px;
      margin-top: 4px;
    }
  }

  .rdt {
    width: 100%;
    position: relative;
  }

  .rdtPicker {
    z-index: 40;
  }

  .rdt > input {
    transition: none;
  }

  .rdt.rdtOpen > input,
  .rdt > input:focus {
    border-color: ${theme.color.secondary};
    background: ${theme.color.white};
    background-color: ${theme.color.white};
    box-shadow: none;
  }

  .rdtPicker {
    .rdtBtn {
      user-select: none;
    }
  }

  select,
  input,
  textarea,
  .rdt > input {
    width: 100%;
    appearance: none;
    border: 1px solid #d7e2ef;
    background: ${theme.color.white};
    background-color: ${theme.color.white};
    border-radius: 100px;
    min-height: 48px;
    padding: 12px 42px 12px 20px;
    font-size: 14px;
    font-weight: 500;
    color: ${theme.color.secondary};
    outline: none;
    transition: border-color 0.15s ease;
    &.resize-none {
       border-radius: 12px;
    }
    &::placeholder {
      color: ${theme.color.secondary} !important;
    }
    &:disabled {
      background-color: #f3f5f8 !important;
      cursor: not-allowed;
    }

    &:focus,
    &:active {
      background: ${theme.color.white};
      background-color: ${theme.color.white};
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-text-fill-color: ${theme.color.secondary} !important;
      caret-color: ${theme.color.secondary};
      transition: background-color 99999s ease-in-out 0s;
      box-shadow: 0 0 0 1000px ${theme.color.white} inset !important;
      -webkit-box-shadow: 0 0 0 1000px ${theme.color.white} inset !important;
    }
  }

  .error {
    margin: 6px 0 0 15px;
    padding: 0 4px;
    font-size: 12px;
    font-weight: 500;
    color: #DC3545;
    line-height: 1.3;
  }

  select:invalid {
    color: transparent;
  }

  select:invalid:focus {
    color: ${theme.color.secondary};
  }

  input[type="time"] {
    color: ${(props) => (props.$empty ? "transparent" : theme.color.secondary)};

    &::-webkit-calendar-picker-indicator {
      opacity: 0;
      position: absolute;
      right: 0;
      width: 42px;
      height: 100%;
      cursor: pointer;
    }
  }

  input[type="number"] {
    appearance: textfield;
    -moz-appearance: textfield;
    background: ${theme.color.white};
    background-color: ${theme.color.white};

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &:focus,
    &:active,
    &:hover {
      background: ${theme.color.white};
      background-color: ${theme.color.white};
    }
  }

  select {
    cursor: pointer;
    background-image: none;
  }

  textarea {
    min-height: 110px;
    resize: vertical;
    padding-right: 14px;
  }

  .field-icon {
    position: absolute;
    right: 14px;
    top: 24px;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    pointer-events: none;
    color: #94a3b8;
    z-index: 2;
  }

  textarea ~ .field-icon,
  textarea ~ .placeholder {
    display: none;
  }
`;

export const HrSecondaryButton = styled.button`
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  min-width: 120px;
  padding: 10px 28px;
  border-radius: 100px;
  border: 1.5px solid ${theme.color.secondary};
  background: none;
  color: ${theme.color.secondary};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0;
  text-transform: none;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #f5f8fc;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const HrFilterTabs = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
  margin-bottom: 18px;
  background: none;
  border: 1px solid #d7e2ef;
  border-radius: 100px;
  max-width: 100%;
`;

export const HrFilterTab = styled.button`
  appearance: none;
  border: none;
  background: ${(props) => (props.$active ? theme.color.secondary : "transparent")};
  color: ${(props) => (props.$active ? theme.color.white : theme.color.secondary)};
  min-height: 36px;
  padding: 8px 18px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;


`;

export const HrHeaderOutlineButton = styled(HrSecondaryButton)`
  min-height: 42px;
  min-width: 0;
  /* padding: 10px 18px; */
  font-size: 12px;
  font-weight: 500;
`;

export const HrModalPrimaryButton = styled(HrPrimaryButton)`
  min-height: 44px;
  min-width: 120px;
  padding: 10px 40px;
  border: 1.5px solid ${theme.color.secondary};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0;
  text-transform: none;
`;

export const HrModalActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$center ? "center" : "flex-end")};
  gap: 12px;
  margin-top: 16px;
`;

export const HrPermissionsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 4px;

  .permissions-title {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: ${theme.color.darkblue};
  }
`;

export const HrPermissionsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const HrPermissionChip = styled.button`
  appearance: none;
  border: 1px solid
    ${(props) => (props.$active ? theme.color.secondary : "#9eb6d4")};
  background: ${(props) =>
    props.$active ? theme.color.secondary : "#e8f1fb"};
  color: ${(props) =>
    props.$active ? theme.color.white : theme.color.secondary};
  border-radius: 100px;
  min-height: 36px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;

  &:hover {
    border-color: ${theme.color.secondary};
    background: ${(props) =>
      props.$active ? "#23426f" : "#dce8f6"};
  }
`;

export const HrDangerButton = styled.button`
  appearance: none;
  min-height: 44px;
  min-width: 120px;
  padding: 10px 28px;
  border-radius: 100px;
  border: none;
  background: #e32c1f;
  color: ${theme.color.white};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #c8251a;
  }
`;

export const HrConfirmModalCard = styled(HrModalCard)`
  max-width: 480px;
  padding: 40px 28px 28px;
  text-align: center;

  .confirm-close {
    top: 14px;
    right: 14px;
    transform: none;
  }

  .confirm-title {
    margin: 0 0 10px;
    font-size: 18px;
    font-weight: 700;
    color: ${theme.color.secondary};
    line-height: 1.35;
    padding: 0 24px;
  }

  .confirm-text {
    margin: 0 0 24px;
    font-size: 14px;
    font-weight: 500;
    color: ${theme.color.grayv2};
    line-height: 1.45;
  }
`;

export const HrDrawerOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1040;
  background: rgba(15, 23, 42, 0.35);
`;

export const HrDrawerPanel = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1050;
  width: min(420px, 100vw);
  height: 100vh;
  background: ${theme.color.white};
  box-shadow: -12px 0 40px rgba(15, 23, 42, 0.18);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const HrDrawerHeader = styled.div`
  background: ${theme.color.secondary};
  padding: 22px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;

  .drawer-avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #7ba3d4;
    color: ${theme.color.white};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-weight: 700;
    flex-shrink: 0;
  }

  .drawer-info {
    flex: 1;
    min-width: 0;
  }

  .drawer-name {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: ${theme.color.white};
    line-height: 1.25;
  }

  .drawer-role {
    margin: 2px 0 0;
    font-size: 12px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.85);
  }

  .drawer-status {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 26px;
    padding: 4px 12px;
    border-radius: 999px;
    background: #BFD3E7;
    color: ${theme.color.secondary};
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
    flex-shrink: 0;
  }
`;

export const HrDrawerBody = styled.div`
  flex: 1;
  overflow: auto;
  padding: 18px 18px 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #F5FBFF;
  ${hrScrollbarStyles}
`;

export const HrDrawerActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  button {
    appearance: none;
    min-height: 42px;
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    background: none;
  }

  .edit-btn {
    border: 1px solid #004D8733;
    color: #004D87;
    border-radius: 100px;

    svg {
      width: 15px;
      height: 15px;
    }
  }

  .delete-btn {
    border: 1px solid #004D8733;
    color: #e32c1f;
    border-radius: 100px;

    svg {
      width: 15px;
      height: 15px;
    }
  }
`;

export const HrDrawerSection = styled.section`
  .section-title {
    margin: 0 0 12px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #99A1AF;
  }
`;

export const HrDetailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const HrDetailItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;

  .detail-icon {
    width: 18px;
    height: 18px;
    margin-top: 2px;
    color: #99A1AF;
    flex-shrink: 0;
    display: inline-flex;

    svg {
      width: 13px;
      height: 13px;
    }
  }

  .detail-content {
    min-width: 0;
  }

  .detail-label {
    display: block;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #99A1AF;
  }

  .detail-value {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: #6C7C93;
    line-height: 1.35;
    word-break: break-word;
  }
`;

export const HrLeaveGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
`;

export const HrMiniStatCard = styled.div`
  border: 1px solid #DFECF9;
  border-radius: 12px;
  padding: 14px 10px;
  text-align: center;
  background: ${theme.color.white};

  .mini-value {
    display: block;
    margin-bottom: 4px;
    font-size: 14px;
    font-weight: 600;
    text-align: left;
    color: ${theme.color.secondary};
    line-height: 1.1;
  }

  .mini-label {
    display: block;
    font-size: 9px;
    font-weight: 500;
    text-align: left;
    color: #99A1AF;
    line-height: 1.3;
  }
`;

export const HrPayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
`;

export const HrPayCard = styled.div`
  border: 1px solid #DFECF9;
  border-radius: 12px;
  padding: 14px;
  background: ${theme.color.white};

  .pay-value {
    display: block;
    margin-bottom: 4px;
    font-size: 14px;
    font-weight: 600;
    color: ${theme.color.secondary};
    line-height: 1.2;
  }

  .pay-label {
    display: block;
    font-size: 9px;
    font-weight: 500;
    color: #99A1AF;
  }
`;

export const HrPayrollCard = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 14px;
  background: none;

  .payroll-left {
    flex: 1;
    min-width: 0;
  }

  .payroll-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
    flex-shrink: 0;
  }

  .payroll-label {
    margin: 0 0 8px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #99a1af;
    line-height: 1.2;
  }

  .payroll-dates {
    margin: 0 0 4px;
    font-size: 12px;
    font-weight: 500;
    color: ${theme.color.secondary};
    line-height: 1.3;
  }

  .payroll-meta {
    margin: 0;
    font-size: 12px;
    font-weight: 500;
    color: #99a1af;
    line-height: 1.3;
  }

  .payroll-amount {
    margin: 0;
    text-align: right;
    font-size: 16px;
    font-weight: 700;
    color: ${theme.color.secondary};
    line-height: 1;
  }

  .payroll-status {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 26px;
    padding: 4px 12px;
    border-radius: 999px;
    background: #DFECF9;
    color: ${theme.color.secondary};
    font-size: 10px;
    font-weight: 400;
    white-space: nowrap;
    flex-shrink: 0;
  }
`;

export const HrToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const HrSearchField = styled.label`
  position: relative;
  flex: 1;
  min-width: 220px;

  .search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    color: ${theme.color.grayv2};
    pointer-events: none;
    display: inline-flex;
  }

  input {
    width: 100%;
    appearance: none;
    border: 1px solid #d7e2ef;
    background: ${theme.color.white};
    border-radius: 100px;
    min-height: 46px;
    padding: 12px 16px 12px 42px;
    font-size: 14px;
    font-weight: 400;
    color: ${theme.color.secondary};
    outline: none;

    &::placeholder {
      color: ${theme.color.secondary};
    }

    &:focus {
      border-color: ${theme.color.secondary};
    }
  }
`;

export const HrFilterField = styled.label`
  position: relative;
  min-width: 160px;
  flex-shrink: 0;

  select {
    width: 100%;
    appearance: none;
    border: 1px solid #d7e2ef;
    background: ${theme.color.white};
    border-radius: 100px;
    min-height: 46px;
    padding: 12px 42px 12px 16px;
    font-size: 14px;
    font-weight: 500;
    color: ${theme.color.secondary};
    outline: none;
    cursor: pointer;

    &:focus {
      border-color: ${theme.color.secondary};
    }
  }

  .field-icon {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    pointer-events: none;
    color: ${theme.color.grayv2};
  }
`;

export const HrEmployeeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;

  ${mediaQueries("lg")`
    grid-template-columns: repeat(2, minmax(0, 1fr));
  `}

  ${mediaQueries("sm")`
    grid-template-columns: 1fr;
  `}
`;

export const HrEmployeeCard = styled.article`
  background: ${theme.color.white};
  border: 1px solid #e8eef6;
  border-radius: 16px;
  padding: 24px;
  height: 246px;
  box-shadow: 0 2px 10px rgba(41, 80, 134, 0.04);
  display: flex;
  flex-direction: column;
  gap: 28px;
  cursor: pointer;
  transition: box-shadow 0.15s ease, border-color 0.15s ease;
  box-sizing: border-box;

  &:hover {
    border-color: #c5d5e8;
    box-shadow: 0 6px 18px rgba(41, 80, 134, 0.08);
  }
`;

export const HrEmployeeCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

export const HrEmployeeInfo = styled.div`
  flex: 1;
  min-width: 0;
  padding-top: 2px;

  .employee-name {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: ${theme.color.secondary};
    line-height: 1.25;
  }

  .employee-role {
    margin: 4px 0 0;
    font-size: 13px;
    font-weight: 500;
    color: ${theme.color.grayv2};
    line-height: 1.3;
  }
`;

export const HrEmployeeMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  flex: 1;

  .meta-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .meta-contact {
    min-width: 0;
  }

  .meta-contact-row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 12px;
  }
`;

export const HrEmployeeCardActionButton = styled.button`
  appearance: none;
  flex-shrink: 0;
  align-self: flex-end;
  min-height: 34px;
  padding: 8px 14px;
  border-radius: 100px;
  border: 1.5px solid ${theme.color.secondary};
  background: ${theme.color.white};
  color: ${theme.color.secondary};
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #f5f8fc;
  }
`;

export const HrEmployeeMetaItem = styled.div`
  min-width: 0;

  .meta-label {
    display: block;
    margin-bottom: 6px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${theme.color.grayv2};
  }

  .meta-value {
    display: block;
    font-size: 18px;
    font-weight: 500;
    color: ${theme.color.secondary};
    line-height: 1.2;
    word-break: break-word;
  }

  .meta-value--contact {
    font-size: 14px;
    font-weight: 600;
  }
`;

export const HrEmptyState = styled.div`
  grid-column: 1 / -1;
  background: ${theme.color.white};
  border: 1px solid #e8eef6;
  border-radius: 14px;
  padding: 40px 20px;
  text-align: center;
  color: ${theme.color.grayv2};
  font-size: 14px;
  font-weight: 500;
`;

export const HrTipTherapistCard = styled.article`
  background: ${theme.color.white};
  border: 1px solid #e8eef6;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(41, 80, 134, 0.04);
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const HrTipTherapistHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  .tip-name {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: ${theme.color.secondary};
    line-height: 1.25;
  }

  .tip-count {
    margin: 4px 0 0;
    font-size: 14px;
    font-weight: 400;
    color: ${theme.color.secondary};
    line-height: 1.3;
  }
`;

export const HrTipTherapistStats = styled.div`
  display: flex;
  flex-direction: column;

  .tip-stat-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid #eef2f7;
  }

  .tip-stat-row:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .tip-stat-row:first-child {
    padding-top: 0;
  }

  .tip-stat-label {
    font-size: 14px;
    font-weight: 500;
    color: ${theme.color.secondary};
  }

  .tip-stat-value {
    font-size: 14px;
    font-weight: 700;
    color: ${theme.color.secondary};
  }
`;

export const HrSettingsSection = styled.div`
  background: ${theme.color.white};
  border: 1px solid #e8eef6;
  border-radius: 14px;
  padding: 14px 16px;
  box-shadow: 0 2px 10px rgba(41, 80, 134, 0.04);
  margin-bottom: 16px;

  .section-title {
    margin: 0 0 14px;
    font-size: 14px;
    font-weight: 700;
    color: ${theme.color.secondary};
  }
`;

export const HrSettingsFields = styled.div`
  .settings-row {
    gap: 10px;
    margin-bottom: 10px;
  }

  .settings-row:last-of-type {
    margin-bottom: 0;
  }

  .settings-field {
    .field-label {
      display: block;
      margin: 0 0 6px 4px;
      font-size: 12px;
      font-weight: 600;
      color: ${theme.color.secondary};
      line-height: 1.2;
    }

    .field-control {
      position: relative;
      width: 100%;
    }

    select,
    input,
    .rdt > input {
      min-height: 40px;
      padding: 9px 36px 9px 12px;
      font-size: 12px;
      border-color: #e3ebf5;
    }

    .field-icon {
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      width: 14px;
      height: 14px;
      color: #295086;
    }
  }
`;

export const HrToggleCard = styled.div`
  background: #f5f9ff;
  border-radius: 12px;
  padding: 13px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;

  .toggle-title {
    margin: 0 0 4px;
    font-size: 13px;
    font-weight: 700;
    color: ${theme.color.secondary};
  }

  .toggle-description {
    margin: 0;
    font-size: 12px;
    font-weight: 500;
    color: ${theme.color.grayv2};
  }
`;

export const HrToggleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const HrSwitch = styled.button`
  appearance: none;
  border: none;
  width: 38px;
  height: 20px;
  border-radius: 999px;
  background: ${(props) => (props.$active ? "#295086" : "#c9d8ea")};
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s ease;

  &::after {
    content: "";
    position: absolute;
    top: 2px;
    left: ${(props) => (props.$active ? "20px" : "2px")};
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #ffffff;
    transition: left 0.15s ease;
  }
`;

export const HrRadioCard = styled.label`
  background: #f5f9ff;
  border-radius: 12px;
  padding: 13px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  cursor: pointer;
  position: relative;
  border: 1px solid ${(props) => (props.$active ? "#295086" : "transparent")};
  transition: border-color 0.15s ease;

  .toggle-title {
    margin: 0 0 4px;
    font-size: 13px;
    font-weight: 700;
    color: ${theme.color.secondary};
  }

  .toggle-description {
    margin: 0;
    font-size: 12px;
    font-weight: 500;
    color: ${theme.color.grayv2};
  }

  input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
`;

export const HrRadioMark = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${(props) => (props.$active ? "#295086" : "#c9d8ea")};
  background: ${theme.color.white};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: border-color 0.15s ease;

  &::after {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${(props) => (props.$active ? "#295086" : "transparent")};
    transition: background 0.15s ease;
  }
`;

export const HrSlipModalCard = styled(HrModalCard)`
  max-width: 520px;
  padding: 28px 28px 24px;
`;

export const HrSlipSummaryBox = styled.div`
  background: #eaf3fb;
  border-radius: 12px;
  padding: 16px 18px;
  margin-bottom: 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .summary-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }

  .summary-label {
    font-size: 13px;
    font-weight: 500;
    color: ${theme.color.secondary};
  }

  .summary-value {
    font-size: 13px;
    font-weight: 600;
    color: ${theme.color.secondary};
    text-align: right;
  }
`;

export const HrSlipDetailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 18px;

  .detail-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .detail-label {
    font-size: 14px;
    font-weight: 500;
    color: ${theme.color.secondary};
  }

  .detail-value {
    font-size: 14px;
    font-weight: 600;
    color: ${theme.color.secondary};
  }

  .detail-row.is-deduction .detail-label,
  .detail-row.is-deduction .detail-value {
    color: #e32c1f;
  }
`;

export const HrSlipTotalRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid #e8eef6;
  margin-bottom: 22px;

  .total-label,
  .total-value {
    font-size: 18px;
    font-weight: 700;
    color: ${theme.color.secondary};
  }
`;

export const HrSlipExportButton = styled(HrPrimaryButton)`
  width: 100%;
  justify-content: center;
  min-height: 46px;
  font-size: 14px;
  font-weight: 600;
`;
