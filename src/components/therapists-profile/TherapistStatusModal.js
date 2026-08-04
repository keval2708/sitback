"use client";

import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import LoadingButton from "@/components/shared/button/LoadingButton";
import CustomModal from "@/components/shared/modal";
import {
  TherapistStatusDialogClass,
  TherapistStatusModalWrapper,
} from "@/styles/pages/therapist-status-modal.style";

export default function TherapistStatusModal({
  show,
  type = "deactivate",
  onHide = () => {},
  onConfirm = () => {},
  loading = false,
}) {
  const { t } = useTranslation();
  const isDeactivate = type === "deactivate";

  return (
    <CustomModal
      show={show}
      onHide={onHide}
      centered
      className="sitback-modal-wrapper sitback-therapist-modal-wrapper"
      dialogClassName={TherapistStatusDialogClass}
    >
      <Modal.Header closeButton className="red-close-icon pb-2" />
      <Modal.Body>
        <TherapistStatusModalWrapper className="sitback-therapist-status-modal">
          <h3>{t(isDeactivate ? "deactivateTherapist" : "activateTherapist")}</h3>

          <p className="status-modal-question">
            {t(isDeactivate ? "deactivateTherapistQuestion" : "activateTherapistQuestion")}
          </p>

          <p className="status-modal-description">
            {t(isDeactivate ? "deactivateTherapistDescription" : "activateTherapistDescription")}
          </p>

          <div className="status-modal-footer">
            <button type="button" className="status-cancel-btn" onClick={onHide}>
              {t("cancel")}
            </button>
            <LoadingButton
              type="button"
              className={`status-action-btn ${isDeactivate ? "deactivate" : "activate"}`}
              onClick={onConfirm}
              disabled={loading}
              label={t(isDeactivate ? "deactivateTherapistConfirm" : "activateTherapistConfirm")}
              loadinglabel={t("saving")}
              isLoading={loading}
            />
          </div>
        </TherapistStatusModalWrapper>
      </Modal.Body>
    </CustomModal>
  );
}
