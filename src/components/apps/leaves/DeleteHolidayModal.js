"use client";

import React from "react";
import InlineSVG from "svg-inline-react";
import {
  HrConfirmModalCard,
  HrDangerButton,
  HrModalActions,
  HrModalClose,
  HrModalOverlay,
  HrSecondaryButton,
} from "@/styles/pages/hr-module.style";

const CLOSE_ICON = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12.5" cy="12.5" r="12.5" fill="white"/>
<path d="M16.4034 6.38199C17.0162 5.76924 18.0075 5.76924 18.6202 6.38199C19.2329 6.99475 19.233 7.98608 18.6202 8.59879L14.7169 12.5011L18.6202 16.4054C19.2326 17.0177 19.2326 18.008 18.6202 18.6203C18.3151 18.9273 17.9119 19.0802 17.5128 19.0802C17.1116 19.0802 16.7105 18.9274 16.4054 18.6203L12.5021 14.717L8.59874 18.6203C8.29349 18.9276 7.89176 19.0801 7.49034 19.0802C7.08896 19.0802 6.68724 18.9274 6.38195 18.6203C5.76917 18.0075 5.76917 17.0162 6.38195 16.4035L10.2853 12.5002L6.38097 8.59586C5.76897 7.98357 5.76872 6.99315 6.38097 6.38101C6.99541 5.76879 7.98649 5.76887 8.59679 6.38101L12.5001 10.2843L16.4034 6.38199Z" fill="#E32C1F"/>
</svg>
`;

export default function DeleteHolidayModal({
  open,
  onClose,
  onConfirm,
  holidayName = "",
  loading = false,
}) {
  if (!open) return null;

  return (
    <HrModalOverlay
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-holiday-title"
      onClick={loading ? undefined : onClose}
    >
      <HrConfirmModalCard onClick={(event) => event.stopPropagation()}>
        <HrModalClose
          type="button"
          className="confirm-close"
          aria-label="Close"
          onClick={onClose}
          disabled={loading}
        >
          <InlineSVG src={CLOSE_ICON} />
        </HrModalClose>
        <h2 id="delete-holiday-title" className="confirm-title">
          Are You Sure You Want To Delete This Holiday?
        </h2>
        <p className="confirm-text">
          {holidayName
            ? `Are you sure you want to delete "${holidayName}"? This action cannot be undone.`
            : "Are you sure you want to delete this holiday? This action cannot be undone."}
        </p>
        <HrModalActions $center>
          <HrSecondaryButton type="button" onClick={onClose} disabled={loading}>
            Cancel
          </HrSecondaryButton>
          <HrDangerButton type="button" onClick={onConfirm} disabled={loading}>
            {loading ? "Deleting..." : "Delete Holiday"}
          </HrDangerButton>
        </HrModalActions>
      </HrConfirmModalCard>
    </HrModalOverlay>
  );
}
