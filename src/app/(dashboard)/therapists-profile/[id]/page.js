"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import AddManageScheduleModal from "@/components/dashboards/models/AddManageScheduleModal";
import "react-loading-skeleton/dist/skeleton.css";
import {
  AppointmentAvailabilityTab,
  AppointmentSetupTab,
} from "@/components/therapists-profile/TherapistAppointmentTabs";
import TherapistProfileTab from "@/components/therapists-profile/TherapistProfileTab";
import TherapistSidebar from "@/components/therapists-profile/TherapistSidebar";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector } from "@/redux/authCheck";
import { PATH_DASHBOARD } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { MainLayoutWrapper } from "@/styles/global/main.style";
import { TherapistManagementLayoutWrapper } from "@/styles/pages/therapist-management.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const MAIN_TABS = [
  { key: "therapistProfile", labelKey: "therapistProfileTab" },
  // { key: "appointmentSetup", labelKey: "appointmentSetup" },
  { key: "appointmentAvailability", labelKey: "appointmentAvailability" },
];

export default function TherapistProfilePage({ params }) {
  const { id } = params;
  const { t } = useTranslation();
  const { login } = useSelector(authCheckSliceSelector);
  const { push } = useRouter();
  const { toaster } = useToaster();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("therapistProfile");
  const [therapist, setTherapist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const spaLocation = useMemo(() => {
    if (login?.city && login?.state) {
      return `${login.city}, ${login.state}`;
    }
    return login?.location;
  }, [login]);

  const fetchTherapist = async () => {
    try {
      // setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.EMPLOYEE_LIST);
      if (!res?.status) {
        toaster(res?.message, TOAST_TYPES.ERROR);
        return;
      }

      const match = (res?.data?.data || []).find(
        (employee) => String(employee.id) === String(id)
      );

      if (!match?.isVerified) {
        toaster("Please verify the email before proceed to manage therapist profile.", TOAST_TYPES.ERROR);
        router.push(PATH_DASHBOARD?.therapistsProfile);
        return;
      }

      setTherapist(match || null);
    } catch (error) {
      console.log("error", error);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTherapist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDeactivate = async () => {

    if (!therapist) return false;

    try {
      setStatusLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.CHANGE_EMPLOYEE_STATUS + '/' + therapist.id);

      if (!res?.status) {
        toaster(res?.message, TOAST_TYPES.ERROR);
        return false;
      }

      toaster(res?.data?.message || t("therapistDeactivated"), TOAST_TYPES.SUCCESS);
      fetchTherapist();
      return true;
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      return false;
    } finally {
      setStatusLoading(false);
    }
  };

  const handleActivate = async () => {

    if (!therapist) return false;

    try {
      setStatusLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.CHANGE_EMPLOYEE_STATUS + '/' + therapist.id);

      if (!res?.status) {
        toaster(res?.message, TOAST_TYPES.ERROR);
        return false;
      }

      toaster(res?.data?.message || t("therapistActivated"), TOAST_TYPES.SUCCESS);
      fetchTherapist();
      return true;
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      return false;
    } finally {
      setStatusLoading(false);
    }
  };



  const renderMainTabContent = () => {
    if (!therapist) return null;

    switch (activeTab) {
      case "therapistProfile":
        return (
          <TherapistProfileTab
            therapist={therapist}
            onRefresh={fetchTherapist}
            onManageSchedule={() => setShowScheduleModal(true)}
          />
        );
      case "appointmentSetup":
        return <AppointmentSetupTab therapist={therapist} />;
      case "appointmentAvailability":
        return <AppointmentAvailabilityTab therapist={therapist} />;
      default:
        return null;
    }
  };

  return (
    <MainLayoutWrapper>
      <TherapistManagementLayoutWrapper className="sitback-therapist-management-wrapper">
        <Container>
          {loading ? (
            <div className="therapist-management-layout">
              {/* Left Sidebar Skeleton */}
              <aside className="therapist-sidebar" style={{ cursor: 'default', pointerEvents: 'none' }}>
                <div>
                  <div className="sidebar-top-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className=""></span>
                    <Skeleton circle width={32} height={32} />
                  </div>
                  <div className="sidebar-avatar-wrap" style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
                    <div className="sidebar-avatar" style={{ background: 'transparent' }}>
                      <Skeleton circle width={88} height={88} />
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Skeleton width={150} height={24} />
                  </div>
                  <div className="sidebar-details">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="detail-row" style={{ marginBottom: '15px' }}>
                        <Skeleton width={60} height={14} style={{ marginBottom: '5px' }} />
                        <Skeleton width={120} height={16} />
                      </div>
                    ))}
                  </div>
                </div>
                <Skeleton width="100%" height={40} style={{ borderRadius: '100px', marginTop: '20px' }} />
              </aside>

              {/* Right Content Skeleton */}
              <div className="therapist-main-content">
                <nav className="main-tabs-nav" style={{ display: 'flex', gap: '20px' }}>
                  {MAIN_TABS.map((tab) => (
                    <div key={tab.key} style={{ padding: '12px 16px' }}>
                      <Skeleton width={100} height={16} />
                    </div>
                  ))}
                </nav>
                <div className="therapists-profile-wrapper" style={{ flex: '1', background: '#fff', padding: '24px', borderRadius: '12px' }}>
                  <Skeleton count={5} height={35} style={{ marginBottom: '12px' }} />
                </div>
              </div>
            </div>
          ) : !therapist ? (
            <div className="not-found-state">
              <p>{t("therapistNotFound")}</p>
              <button
                type="button"
                className="primary-action-btn"
                style={{ marginTop: 16 }}
                onClick={() => push(PATH_DASHBOARD?.therapistsProfile)}
              >
                {t("backToTherapists")}
              </button>
            </div>
          ) : (
            <div className="therapist-management-layout">
              <TherapistSidebar
                therapist={therapist}
                spaLocation={spaLocation}
                onRefresh={fetchTherapist}
                onDeactivate={handleDeactivate}
                onActivate={handleActivate}
                statusLoading={statusLoading}
              />

              <div className="therapist-main-content">
                <nav className="main-tabs-nav">
                  {MAIN_TABS.map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      className={`main-tab-btn ${activeTab === tab.key ? "active" : ""}`}
                      onClick={() => setActiveTab(tab.key)}
                    >
                      {t(tab.labelKey)}
                    </button>
                  ))}
                </nav>
                <div className="therapists-profile-wrapper">
                  {renderMainTabContent()}
                </div>
              </div>
            </div>
          )}
        </Container>
      </TherapistManagementLayoutWrapper>

      <AddManageScheduleModal
        show={showScheduleModal}
        onHide={() => setShowScheduleModal(false)}
        onConfirm={() => setShowScheduleModal(false)}
        employeeData={therapist}
      />
    </MainLayoutWrapper>
  );
}
