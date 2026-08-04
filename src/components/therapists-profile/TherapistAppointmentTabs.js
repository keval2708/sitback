"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import AppointmentAvailabilityForm from "./AppointmentAvailabilityForm";
import AddManageScheduleModal from "@/components/dashboards/models/AddManageScheduleModal";

export function AppointmentSetupTab({ therapist }) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <div className="tab-placeholder-card">
        <h3>{t("appointmentSetup")}</h3>
        <p>{t("appointmentSetupDescription")}</p>

      </div>

      <AddManageScheduleModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={() => setShowModal(false)}
        employeeData={therapist}
      />
    </>
  );
}

export function AppointmentAvailabilityTab({ therapist }) {
  if (!therapist) return null;

  return <AppointmentAvailabilityForm therapist={therapist} />;
}
