"use client";

import { jsPDF } from "jspdf";
import React from "react";
import InlineSVG from "svg-inline-react";
import {
  HrModalClose,
  HrModalHeader,
  HrModalOverlay,
  HrSlipDetailList,
  HrSlipExportButton,
  HrSlipModalCard,
  HrSlipSummaryBox,
  HrSlipTotalRow,
} from "@/styles/pages/hr-module.style";

const CLOSE_ICON = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12.5" cy="12.5" r="12.5" fill="white"/>
<path d="M16.4034 6.38199C17.0162 5.76924 18.0075 5.76924 18.6202 6.38199C19.2329 6.99475 19.233 7.98608 18.6202 8.59879L14.7169 12.5011L18.6202 16.4054C19.2326 17.0177 19.2326 18.008 18.6202 18.6203C18.3151 18.9273 17.9119 19.0802 17.5128 19.0802C17.1116 19.0802 16.7105 18.9274 16.4054 18.6203L12.5021 14.717L8.59874 18.6203C8.29349 18.9276 7.89176 19.0801 7.49034 19.0802C7.08896 19.0802 6.68724 18.9274 6.38195 18.6203C5.76917 18.0075 5.76917 17.0162 6.38195 16.4035L10.2853 12.5002L6.38097 8.59586C5.76897 7.98357 5.76872 6.99315 6.38097 6.38101C6.99541 5.76879 7.98649 5.76887 8.59679 6.38101L12.5001 10.2843L16.4034 6.38199Z" fill="#E32C1F"/>
</svg>
`;

const formatCurrency = (value) =>
  `$${Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(Number(value)) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;

export default function SalarySlipModal({ open, slip, onClose }) {
  if (!open || !slip) return null;

  const handleExportPdf = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const cardX = 30;
    const cardY = 28;
    const cardWidth = pageWidth - 60;
    const cardHeight = pageHeight - 56;
    const leftX = cardX + 28;
    const rightX = cardX + cardWidth - 28;

    doc.setFillColor(248, 250, 252);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    doc.setFillColor(255, 255, 255);
    doc.roundedRect(cardX, cardY, cardWidth, cardHeight, 18, 18, "F");
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(cardX, cardY, cardWidth, cardHeight, 18, 18, "S");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(41, 80, 134);
    doc.text("Salary Slip", pageWidth / 2, cardY + 38, { align: "center" });

    doc.setFillColor(240, 247, 255);
    doc.roundedRect(cardX + 26, cardY + 58, cardWidth - 52, 98, 12, 12, "F");

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(41, 80, 134);

    const summaryRows = [
      ["Slip #", slip.slipNumber],
      ["Employee Name", slip.name],
      ["Period", `${slip.periodStart} -> ${slip.periodEnd}`],
    ];

    summaryRows.forEach(([label, value], index) => {
      const y = cardY + 88 + index * 29;
      doc.text(label, leftX + 18, y);
      doc.setFont("helvetica", "bold");
      doc.text(String(value || "-"), rightX - 18, y, { align: "right" });
      doc.setFont("helvetica", "normal");
    });

    const detailRows = [
      ["Base Salary", formatCurrency(slip.baseSalary)],
      ["Overtime", formatCurrency(slip.overtimeAmount)],
      ["Tips", formatCurrency(slip.tips)],
      ["Deductions", `-${formatCurrency(slip.deductions)}`],
    ];

    detailRows.forEach(([label, value], index) => {
      const y = cardY + 190 + index * 36;
      doc.setTextColor(label === "Deductions" ? 227 : 41, label === "Deductions" ? 44 : 80, label === "Deductions" ? 31 : 134);
      doc.setFont("helvetica", "normal");
      doc.text(label, leftX, y);
      doc.setFont("helvetica", "bold");
      doc.text(value, rightX, y, { align: "right" });
    });

    doc.setDrawColor(226, 232, 240);
    doc.line(leftX, cardY + 350, rightX, cardY + 350);

    doc.setTextColor(41, 80, 134);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Net Salary", leftX, cardY + 388);
    doc.text(formatCurrency(slip.netSalary), rightX, cardY + 388, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(
      `Generated on ${new Date().toLocaleDateString("en-US")}`,
      leftX,
      cardY + 414
    );

    const safeSlipNumber = String(slip.slipNumber || "salary-slip")
      .replace(/[^a-z0-9-_]+/gi, "-")
      .toLowerCase();

    doc.save(`${safeSlipNumber}.pdf`);
  };

  return (
    <HrModalOverlay
      role="dialog"
      aria-modal="true"
      aria-labelledby="salary-slip-title"
      onClick={onClose}
    >
      <HrSlipModalCard onClick={(event) => event.stopPropagation()}>
        <HrModalHeader>
          <h2 id="salary-slip-title">Salary Slip</h2>
          <HrModalClose type="button" aria-label="Close" onClick={onClose}>
            <InlineSVG src={CLOSE_ICON} />
          </HrModalClose>
        </HrModalHeader>

        <HrSlipSummaryBox>
          <div className="summary-row">
            <span className="summary-label">Slip #</span>
            <span className="summary-value">{slip.slipNumber}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Employee Name</span>
            <span className="summary-value">{slip.name}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Period</span>
            <span className="summary-value">
              {slip.periodStart} {"->"} {slip.periodEnd}
            </span>
          </div>
        </HrSlipSummaryBox>

        <HrSlipDetailList>
          <div className="detail-row">
            <span className="detail-label">Base Salary</span>
            <span className="detail-value">
              {formatCurrency(slip.baseSalary)}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Overtime</span>
            <span className="detail-value">
              {formatCurrency(slip.overtimeAmount)}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Tips</span>
            <span className="detail-value">{formatCurrency(slip.tips)}</span>
          </div>
          <div className="detail-row is-deduction">
            <span className="detail-label">Deductions</span>
            <span className="detail-value">
              -{formatCurrency(slip.deductions)}
            </span>
          </div>
        </HrSlipDetailList>

        <HrSlipTotalRow>
          <span className="total-label">Net Salary</span>
          <span className="total-value">{formatCurrency(slip.netSalary)}</span>
        </HrSlipTotalRow>

        <HrSlipExportButton type="button" onClick={handleExportPdf}>
          Export as PDF
        </HrSlipExportButton>
      </HrSlipModalCard>
    </HrModalOverlay>
  );
}
