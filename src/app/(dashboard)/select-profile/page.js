"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Container, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector, loginDetail } from "@/redux/authCheck";
import {
  handleBlock,
  handleSubscribe,
  tabHandle,
  handleProfileTab,
} from "@/redux/messageTab";
import { NEW_DASHBOARD_PATH, PATH_AUTH, PATH_DASHBOARD } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { MainLayoutWrapper } from "@/styles/global/main.style";
import { ProfileServicesLayoutWrapper } from "@/styles/pages/select-profile.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { removeCookie } from "@/utils/cookie";

export default function SelectProfile() {
  const { t } = useTranslation();
  const { login } = useSelector(authCheckSliceSelector);
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const showWarning = searchParams.get("showWarning");
  const { toaster } = useToaster();
  const dispatch = useDispatch();

  const [showSetupModal, setShowSetupModal] = useState(false);

  useEffect(() => {
    if (showWarning === "true") {
      setShowSetupModal(true);
    }
  }, [showWarning]);

  const getProfileInfo = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.GET_DETAILS);
      if (!res?.status) {
        return res;
      }

      dispatch(handleBlock(res?.data?.data.isBlocked));
      dispatch(handleSubscribe(res?.data?.data.isSubscribe));
      dispatch(loginDetail(res?.data?.data));

      if (res?.data?.data.isBlocked) {
        push(PATH_DASHBOARD?.serviceProvider);
      }
      if (res?.data?.data?.isSubscribe == 1) {
        if (res?.data?.data.planData?.status == "canceled") {
          push(PATH_DASHBOARD?.subscriptions);
        }
        if (res?.data?.data?.spa_type == "onlydashboard") {
          push(NEW_DASHBOARD_PATH?.dashboard);
        }
        if (res?.data?.data.planData?.plan_id == 1) {
          dispatch(tabHandle("second"));
        }
      }
      if (res?.data?.data?.isSubscribe == 0) {
        push(PATH_DASHBOARD?.subscriptions);
      }
      if (res?.data?.data?.isSubscribe == 3) {
        if (res?.data?.data.planData?.status == "canceled") {
          leave_room();
        }
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const leave_room = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.USER_LEAVE_ROOM);
      if (!res?.status) {
        return res;
      }

      const logoutRes = await axiosApiCall.post(API_ROUTER?.LOGOUT, { id: login?.id });
      if (!logoutRes?.status) {
        return toaster(logoutRes?.message, TOAST_TYPES.ERROR);
      }

      removeCookie("token");
      localStorage.clear();
      push(PATH_AUTH?.signIn);
      window.location.reload();
      return logoutRes;
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const handleViewTherapists = () => {
    if (login?.isSpaProfileCompleted === false) {
      setShowSetupModal(true);
    } else {
      push(PATH_DASHBOARD?.therapistsProfile);
    }
  };

  const handleViewServices = () => {
    push(PATH_DASHBOARD?.profileService);
  };

  const handleGoToSpaProfileHours = () => {
    setShowSetupModal(false);
    dispatch(handleProfileTab("fifth"));
    push(PATH_DASHBOARD?.profileService);
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  // console.log("login", login);

  return (
    <MainLayoutWrapper>
      <ProfileServicesLayoutWrapper className="sitback-updated-profile-services-wrapper">
        <Container>
          <div className="select-profile-content">
            <div className="select-profile-header">
              <h1>{t("spaManagementTitle")}</h1>
              <p>{t("spaManagementSubtitle")}</p>
            </div>

            <div className="select-profile-cards">
              <div className="select-profile-card">
                <div className="select-profile-card-icon">
                  <img
                    alt="spa"
                    src="/images/select-profile-spa-icon.svg"
                  />
                </div>
                <h2>{t("forSpaTitle")}</h2>
                <p>{t("forSpaDescription")}</p>
                <button
                  type="button"
                  className="select-profile-card-btn"
                  onClick={handleViewServices}
                >
                  {t("viewServices")}
                </button>
              </div>
              <div className="select-profile-card">
                <div className="select-profile-card-icon">
                  <img
                    alt="therapist"
                    src="/images/select-profile-therapist-icon.svg"
                  />
                </div>
                <h2>{t("forTherapistTitle")}</h2>
                <p>{t("forTherapistDescription")}</p>
                <button
                  type="button"
                  className="select-profile-card-btn"
                  onClick={handleViewTherapists}
                >
                  {t("viewTherapists")}
                </button>
              </div>


            </div>
          </div>
        </Container>
      </ProfileServicesLayoutWrapper>
      <Modal
        show={showSetupModal}
        onHide={() => setShowSetupModal(false)}
        centered
        dialogClassName="modal-dialog-centered"
        contentClassName="border-0 rounded-4"
        style={{ zIndex: 1050 }}
      >
        <Modal.Body className="p-5 text-center">
          <div className="mb-4">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#E32C1F' }}>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M12 8V13M12 16H12.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="mb-3" style={{ color: '#295086', fontWeight: 600 }}>Spa Profile Incomplete</h3>
          <p className="text-muted mb-4" style={{ fontSize: '15px', lineHeight: '1.6' }}>
            To add therapists, please complete your spa profile by adding services and working hours.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <button
              type="button"
              className="btn btn-outline-secondary px-4 py-2"
              style={{ borderRadius: '100px', fontWeight: 500 }}
              onClick={() => setShowSetupModal(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn px-4 py-2"
              style={{
                borderRadius: '100px',
                fontWeight: 500,
                backgroundColor: '#295086',
                color: '#fff',
                border: 'none'
              }}
              onClick={handleGoToSpaProfileHours}
            >
              Complete Spa Profile
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </MainLayoutWrapper>
  );
}
