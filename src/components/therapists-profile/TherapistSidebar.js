"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import TherapistStatusModal from "./TherapistStatusModal";
import {
  formatGender,
  getInitials,
  getTherapistRole,
  getTherapistStatus,
} from "./utils";
import EditProviderModal from "@/components/dashboards/models/EditProviderModal";

export default function TherapistSidebar({
  therapist,
  spaLocation,
  onRefresh,
  onDeactivate,
  onActivate,
  statusLoading,
}) {
  const { t } = useTranslation();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showActivateModal, setShowActivateModal] = useState(false);

  if (!therapist) return null;

  const status = getTherapistStatus(therapist);
  console.log("status",status);
  const isActive = status === "active";
  const avatarSrc =  therapist?.image || therapist?.thumb_image ;

  const handleConfirmDeactivate = async () => {
    const success = await onDeactivate?.();
    if (success) {
      setShowDeactivateModal(false);
    }
  };

  const handleConfirmActivate = async () => {
    const success = await onActivate?.();
    if (success) {
      setShowActivateModal(false);
    }
  };

  return (
    <>
      <aside className="therapist-sidebar">
        <div>
          <div>
            <div className="sidebar-top-row">
              <span className={`therapist-status-badge ${status}`}>
                {isActive ? t("active") : t("inactive")}
              </span>
              <button
                type="button"
                className="edit-photo-btn"
                onClick={() => setShowEditModal(true)}
                aria-label={t("editProfile")}
              >
                <img alt="edit" src="/images/Edit-icon.svg" />
              </button>
            </div>
            <div className="sidebar-avatar-wrap">
              <div className="sidebar-avatar">
                <div className="profile-img">
                  {avatarSrc ? (
                    <img alt={therapist.name} src={avatarSrc} />
                  ) : (
                    <span className="sidebar-initials">{getInitials(therapist?.name)}</span>
                  )}
                  </div>
                </div>
              </div>
            <h2 className="sidebar-name">{therapist?.name}</h2>
          </div>
          <div className="sidebar-details">
            <div className="detail-row">
              <label>{t("role")}</label>
              <div className="detail-value-row">
                <span>{getTherapistRole(therapist)}</span>
              </div>
            </div>

            <div className="detail-row">
              <label>{t("emailAddress")}</label>
              <div className="detail-value-row">
                <span>{therapist?.email || "-"}</span>
                {/* <button type="button" className="edit-login-link">
                  {t("editLogin")}
                </button> */}
              </div>
            </div>

            <div className="detail-row">
              <label>{t("gender")}</label>
              <div className="detail-value-row">
                <span>{formatGender(therapist?.gender)}</span>
              </div>
            </div>

            <div className="detail-row">
              <label>{t("phone")}</label>
              <div className="detail-value-row">
                <span>(+1) {(therapist?.phone)}</span>
              </div>
            </div>

            {/* <div className="detail-row">
              <label>{t("birthDay")}</label>
              <div className="detail-value-row">
                <span>{formatBirthday(therapist?.birthday || therapist?.birth_date)}</span>
              </div>
            </div>

            <div className="detail-row">
              <label>{t("location")}</label>
              <div className="detail-value-row">
                <span>{getTherapistLocation(therapist, spaLocation)}</span>
              </div>
            </div> */}
          </div>
        </div>
        {isActive ? (
          <button
            type="button"
            className="deactivate-btn"
            onClick={() => setShowDeactivateModal(true)}
            disabled={statusLoading}
          >
            {t("deactivateTherapist")}
          </button>
        ) : (
          <button
            type="button"
            className="activate-btn"
            onClick={() => setShowActivateModal(true)}
            disabled={statusLoading}
          >
            {t("activateTherapist")}
          </button>
        )}
      </aside>

      <EditProviderModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        onConfirm={() => {
          setShowEditModal(false);
          onRefresh?.();
        }}
        provider={therapist}
      />

      <TherapistStatusModal
        show={showDeactivateModal}
        type="deactivate"
        onHide={() => setShowDeactivateModal(false)}
        onConfirm={handleConfirmDeactivate}
        loading={statusLoading}
      />

      <TherapistStatusModal
        show={showActivateModal}
        type="activate"
        onHide={() => setShowActivateModal(false)}
        onConfirm={handleConfirmActivate}
        loading={statusLoading}
      />
    </>
  );
}
