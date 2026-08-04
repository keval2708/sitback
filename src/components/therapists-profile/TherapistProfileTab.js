"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  NOTIFICATION_DEFAULTS,
  NOTIFICATION_SECTIONS,
  PERMISSION_DEFAULTS,
  PERMISSION_SECTIONS,
} from "./profileTabOptions";
import { TherapistServicesWithModal } from "./TherapistServices";
import {
  MyDetailsIcon,
  NotificationsIcon,
  PermissionsIcon,
  WorkHoursIcon,
} from "./TherapistTabIcons";
import ToggleOptionsPanel from "./ToggleOptionsPanel";
import WorkHoursPanel from "./WorkHoursPanel";
import LoadingButton from "@/components/shared/button/LoadingButton";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const PROFILE_SUBTABS = [
  { key: "myDetails", icon: MyDetailsIcon },
  { key: "notifications", icon: NotificationsIcon },
  { key: "permissions", icon: PermissionsIcon },
  { key: "workHours", icon: WorkHoursIcon },
];

function MyDetailsPanel({ therapist, onSaved }) {
  const { t } = useTranslation();
  const { toaster } = useToaster();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    street: "",
    city: "",
    postalCode: "",
    state: "",
    privateNotes: "",
  });

  useEffect(() => {
    if (!therapist?.id) return;
    setFormData({
      email: therapist?.email || "",
      phone: therapist?.phone || "",
      street: therapist?.street || therapist?.location || "",
      city: therapist?.city || "",
      postalCode: therapist?.postal_code || therapist?.zip || "",
      state: therapist?.state || "",
      privateNotes: therapist?.private_notes || therapist?.notes || "",
    });
  }, [therapist?.id]);

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSave = async () => {
    try {
      // setLoading(true);
      const payload = new FormData();
      payload.append("id", therapist.id);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("location", formData.street);
      payload.append("city", formData.city);
      payload.append("state", formData.state);
      payload.append("postal_code", formData.postalCode);
      payload.append("private_notes", formData.privateNotes);

      const res = await axiosApiCall.post(API_ROUTER?.UPDATE_EMPLOYEE, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      }

      toaster(res?.data?.message || t("profileUpdated"), TOAST_TYPES.SUCCESS);
      onSaved?.();
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-subtab-panel">
      <p className="panel-section-title">{t("contact")}</p>
      <div className="form-row-grid">
        <div className="form-field">

          {/* <input type="email" value={formData?.email} onChange={handleChange("email")} /> */}
          <input type="email" value={formData?.email} disabled />
        </div>
        <div className="form-field">
          <div className="phone-number-input-div">
            <div className="country-code-input">
              <input
                type="text"
                className="input-add-employee-wrapper css-7n8efy"
                disabled
                name="countryCode"
                value="+1"
                aria-label="Country code"
              />
            </div>
            <div className="phone-divider"></div>
            <div className="mobile-number-input">
              <input
                type="tel"
                placeholder="Enter 10-digit mobile number"
                autoComplete="off"
                id="mobileNumber"
                maxLength="10"
                className="css-7n8efy"
                name="mobileNumber"
                value={formData?.phone}
                disabled
              />
            </div>
          </div>


        </div>
      </div>

      <p className="panel-section-title">{t("privateNotes")}</p>
      <div className="form-row-grid full-width">
        <div className="form-field">
          <textarea value={formData.privateNotes} onChange={handleChange("privateNotes")} />
        </div>
      </div>

      <LoadingButton
        type="button"
        className="save-btn"
        onClick={handleSave}
        disabled={loading}
        label={t("saveCaps")}
        loadinglabel={t("saving")}
        isLoading={loading}
      />
    </div>
  );
}

export default function TherapistProfileTab({ therapist, onRefresh, onManageSchedule }) {
  const { t } = useTranslation();
  const [activeSubTab, setActiveSubTab] = useState("myDetails");

  const renderSubTabPanel = () => {
    switch (activeSubTab) {
      case "myDetails":
        return <MyDetailsPanel therapist={therapist} onSaved={onRefresh} />;
      case "notifications":
        return (
          <ToggleOptionsPanel
            sections={NOTIFICATION_SECTIONS}
            defaults={NOTIFICATION_DEFAULTS}
            variant="notification"
          />
        );
      case "permissions":
        return (
          <ToggleOptionsPanel
            sections={PERMISSION_SECTIONS}
            defaults={PERMISSION_DEFAULTS}
            variant="permission"
          />
        );
      case "workHours":
        return (
          <WorkHoursPanel therapist={therapist} />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <TherapistServicesWithModal therapist={therapist} />

      <section className="profile-settings-section">
        <nav className="profile-subtabs-nav">
          {PROFILE_SUBTABS.map(({ key, icon: Icon }) => (
            <button
              key={key}
              type="button"
              className={`profile-subtab-btn ${activeSubTab === key ? "active" : ""}`}
              onClick={() => setActiveSubTab(key)}
            >
              <span className="subtab-icon">
                <Icon />
              </span>
              {t(key)}
            </button>
          ))}
        </nav>

        {renderSubTabPanel()}
      </section>
    </>
  );
}
