"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Container, Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import InlineSVG from "svg-inline-react";
import AddManageScheduleModal from "@/components/dashboards/models/AddManageScheduleModal";
import AddProviderModal from "@/components/dashboards/models/AddProviderModal";
import EditProviderModal from "@/components/dashboards/models/EditProviderModal";
import ProviderVerifyOtp from "@/components/dashboards/models/ProviderVerifyOtp";
import TotalTipsModal from "@/components/dashboards/models/TotalTipsModal";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector, loginDetail } from "@/redux/authCheck";
import {
  handleBlock,
  handleSubscribe,
  tabHandle,
} from "@/redux/messageTab";
import { NEW_DASHBOARD_PATH, PATH_AUTH, PATH_DASHBOARD } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { MainLayoutWrapper } from "@/styles/global/main.style";
import { TherapistsProfileLayoutWrapper } from "@/styles/pages/therapists-profile.style";
import { MoreOptionGrey_icon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { removeCookie } from "@/utils/cookie";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return parts[0]?.substring(0, 2).toUpperCase() || "";
};

const getTherapistStatus = (therapist) => {
  if (
    therapist?.isActive === true
  ) {
    return "active";
  }
  return "inactive";
};

const getTherapistRole = (therapist) => {
  console.log("therapist", therapist);
  return (
    therapist?.roleName ||
    "Therapist"
  );
};


export default function TherapistsProfile() {
  const { t } = useTranslation();
  const { login } = useSelector(authCheckSliceSelector);
  const { push } = useRouter();
  const { toaster } = useToaster();
  const dispatch = useDispatch();

  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTherapistId, setSelectedTherapistId] = useState(null);
  const [providerColor, setProviderColor] = useState("");
  const [smShowProviderModal, setSmShowProviderModal] = useState(false);
  const [smShowEditProviderModal, setSmshowEditProviderModal] = useState(false);
  const [smShowScheduleServiceModal, setSmhowScheduleServiceModal] = useState(false);
  const [smShowTotalTipsModal, setTotalTipsModal] = useState(false);
  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [manageTarget, setManageTarget] = useState(null);
  const [showTipData, setShowTipData] = useState(null);
  const [showEmployeeDeleteModal, setShowEmployeeDeleteModal] = useState(false);
  const [deleteEmployeeTarget, setDeleteEmployeeTarget] = useState(null);
  const [employeeLoading, setEmployeeLoading] = useState(false);

  const getProfileInfo = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.GET_DETAILS);
      if (!res?.status) {
        return res;
      }

      dispatch(handleBlock(res?.data?.data.isBlocked));
      dispatch(handleSubscribe(res?.data?.data.isSubscribe));
      dispatch(loginDetail(res?.data?.data));

      if (res?.data?.data?.isSpaProfileCompleted === false) {
        push(PATH_DASHBOARD?.selectProfile + "?showWarning=true");
        return;
      }

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

  const getTherapists = async (loading = false) => {
    try {
      setLoading(loading);
      const res = await axiosApiCall.post(API_ROUTER?.EMPLOYEE_LIST);
      console.log("res", res);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      }
      setTherapists(res?.data?.data || []);
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (employee) => {
    try {
      setEmployeeLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.DELETE_EMPLOYEE, {
        employee_id: employee.id,
      });
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      }
      toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
      getTherapists(false);
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setEmployeeLoading(false);
    }
  };

  const handleAddTherapist = () => {
    if (login?.location == "" || login?.location == null) {
      toaster("Please enter location in personal information section.", TOAST_TYPES.ERROR);
      return;
    }
    setSmShowProviderModal(true);
  };

  const handleEditProviderModal = (target) => {
    setEditTarget(target);
    setSmshowEditProviderModal(true);
  };

  const handleTipsModal = (target) => {
    setShowTipData(target);
    setTotalTipsModal(true);
  };

  const handleManageScheduleModal = (target) => {
    setManageTarget(target);
    if (target?.isPhoneVerified == 0) {
      toaster("Please Verify Your Phone Number", TOAST_TYPES.ERROR);
    } else if (!target?.isVerified) {
      toaster("Please verify your email", TOAST_TYPES.ERROR);
    } else {
      setSmhowScheduleServiceModal(true);
    }
  };

  const handleShowEmployeeDeleteModal = (target) => {
    setDeleteEmployeeTarget(target);
    setShowEmployeeDeleteModal(true);
  };

  const handleCloseEmployeeDeleteModal = () => {
    setShowEmployeeDeleteModal(false);
    setDeleteEmployeeTarget(null);
  };

  const handleConfirmEmployeeDelete = async () => {
    if (deleteEmployeeTarget) {
      handleCloseEmployeeDeleteModal();
      await deleteEmployee(deleteEmployeeTarget);
    }
  };

  const generateUniqueColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.random() * 0.5;
    const lightness = 0.8 + Math.random() * 0.2;
    const color = `hsl(${hue}, ${saturation * 100}%, ${lightness * 100}%)`;
    const isUnique = !therapists?.some((therapist) => therapist.color === color);
    if (isUnique) {
      setProviderColor(color);
    }
  };

  useEffect(() => {
    getProfileInfo();
    getTherapists(true);
  }, []);

  useEffect(() => {
    generateUniqueColor();
  }, [therapists]);



  useEffect(() => {
    if (window.io) {
      window.io.socket.on("serviceprovider", async (msg) => {
        if (msg?.action == "employee_verify_email") {
          getTherapists(false);
        }
      });
    }
  }, []);

  const redirectTherapistProfile = (therapist) => {
    console.log("therapist", therapist);
    if (!therapist?.isVerified) {
      toaster("Please verify the email before proceed to manage therapist profile.", TOAST_TYPES.ERROR);
      return;
    }
    push(PATH_DASHBOARD?.therapistManagement.replace(":id", therapist.id));
  };

  const handleToggleActivateDeactivate = async (therapist) => {

    if (!therapist) return false;

    try {
      // setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.CHANGE_EMPLOYEE_STATUS + '/' + therapist.id);

      if (!res?.status) {
        toaster(res?.message, TOAST_TYPES.ERROR);
        return false;
      }
      await getTherapists(false)
      toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
      return true;
    } catch (error) {
      console.log("error", error);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      return false;
    } finally {
      // setLoading(false);
    }

  }

  const spaLocation = login?.city && login?.state
    ? `${login.city}, ${login.state}`
    : login?.location;

  return (
    <MainLayoutWrapper>
      <TherapistsProfileLayoutWrapper className="sitback-therapists-profile-wrapper">
        <Container>
          <div className="therapists-profile-content">
            <div className="therapists-profile-header">
              <div className="therapists-header-text">
                <h1>{t("therapistsTitle")}</h1>
                <p>{t("therapistsRegistered", { count: therapists.length })}</p>
              </div>
              <button
                type="button"
                className="add-therapist-btn"
                onClick={handleAddTherapist}
              >
                <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="#295086" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M15.9994 11.2432V20.7567V11.2432Z" fill="#295086" />
                  <path d="M15.9994 11.2432V20.7567" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M20.7568 16.0002H11.2433H20.7568Z" fill="#295086" />
                  <path d="M20.7568 16.0002H11.2433" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <span>{t("addTherapist")}</span>
              </button>
            </div>

            {loading ? (
              <div className="therapists-grid" style={{ cursor: 'default', pointerEvents: 'none' }}>
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="therapist-card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Skeleton width={60} height={18} borderRadius={50} />
                      <Skeleton circle width={24} height={24} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '16px 0' }}>
                      <div className="therapist-avatar" style={{ background: 'transparent' }}>
                        <Skeleton circle width={80} height={80} style={{ marginBottom: '12px' }} />
                      </div>
                      <Skeleton width={120} height={20} style={{ marginBottom: '6px' }} />
                      <Skeleton width={80} height={14} />
                    </div>
                    <div className="therapist-card-footer" style={{ borderTop: '1px solid #f1f1f1', paddingTop: '12px', marginTop: '12px' }}>
                      <div className="therapist-contact-item">
                        <Skeleton width={12} height={12} style={{ marginRight: '8px' }} />
                        <Skeleton width={140} height={14} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : therapists.length === 0 ? (
              <div className="therapists-empty-state">
                <p>{t("noTherapistsFound")}</p>
              </div>
            ) : (
              <div className="therapists-grid">
                {therapists.map((therapist) => {
                  const status = getTherapistStatus(therapist);
                  const avatarSrc = therapist?.image || therapist?.thumb_image;

                  return (
                    <div
                      key={therapist.id}
                      className={`therapist-card ${selectedTherapistId === therapist.id ? "" : ""}`}
                      onClick={() => redirectTherapistProfile(therapist)}
                    >
                      <div className="therapist-card-top">
                        <Dropdown onClick={(e) => e.stopPropagation()}>
                          <Dropdown.Toggle
                            variant="link"
                            className="therapist-menu-btn"
                            id={`therapist-menu-${therapist.id}`}
                          >
                            <InlineSVG src={MoreOptionGrey_icon} />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleTipsModal(therapist)}>
                              {t("totalTips")}
                            </Dropdown.Item>
                            {/* <Dropdown.Item onClick={() => handleManageScheduleModal(therapist)}>
                              {t("manageSchedule")}
                            </Dropdown.Item> */}
                            <Dropdown.Item onClick={() => handleEditProviderModal(therapist)}>
                              {t("editProfile")}
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleToggleActivateDeactivate(therapist)}>
                              {therapist?.isActive === true ? t("Deactivate") : t("Activate")}
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleShowEmployeeDeleteModal(therapist)}>
                              {t("delete")}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>

                        <span className={`therapist-status-badge ${status}`}>
                          {status === "active" ? t("active") : t("inactive")}
                        </span>
                      </div>

                      <div className="therapist-card-body">
                        <div className="therapist-avatar">
                          {avatarSrc ? (
                            <img alt={therapist.name} src={avatarSrc} />
                          ) : (
                            <span className="therapist-initials">
                              {getInitials(therapist?.name)}
                            </span>
                          )}
                        </div>
                        <h3>{therapist?.name}</h3>
                        <p className="therapist-role">{getTherapistRole(therapist)}</p>
                      </div>

                      <div className="therapist-card-footer">
                        <div className="therapist-contact-item">
                          {/* <img alt="email" src="/images/emailv6-icon.svg" /> */}
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.66667 3.33337H13.3333C13.7 3.33337 14 3.63337 14 4.00004V12C14 12.3667 13.7 12.6667 13.3333 12.6667H2.66667C2.3 12.6667 2 12.3667 2 12V4.00004C2 3.63337 2.3 3.33337 2.66667 3.33337Z" stroke="#295086" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 4.33337L8 8.00004L14 4.33337" stroke="#295086" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>

                          <span>{therapist?.email || "-"}</span>
                        </div>
                        {/* <div className="therapist-contact-item">
                          <img alt="location" src="/images/spa-map-pin-icon.svg" />
                          <span>{getTherapistLocation(therapist, spaLocation) || "-"}</span>
                        </div> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Container>
      </TherapistsProfileLayoutWrapper>

      <DeleteModal
        show={showEmployeeDeleteModal}
        disabled={employeeLoading}
        messageBody={<>{t("deleteTherapist")}</>}
        handleClose={handleCloseEmployeeDeleteModal}
        handleConfirmDelete={handleConfirmEmployeeDelete}
      />

      <AddManageScheduleModal
        show={smShowScheduleServiceModal}
        onHide={() => setSmhowScheduleServiceModal(false)}
        onConfirm={() => setSmhowScheduleServiceModal(false)}
        employeeData={manageTarget}
      />

      <ProviderVerifyOtp
        show={openVerifyModal}
        onHide={() => setOpenVerifyModal(false)}
        employeeData={manageTarget}
      />

      <EditProviderModal
        show={smShowEditProviderModal}
        onHide={() => setSmshowEditProviderModal(false)}
        onConfirm={() => {
          setSmshowEditProviderModal(false);
          getTherapists(false);
        }}
        provider={editTarget}
      />

      <TotalTipsModal
        show={smShowTotalTipsModal}
        onHide={() => setTotalTipsModal(false)}
        onConfirm={() => setTotalTipsModal(false)}
        showTipData={showTipData}
      />

      <AddProviderModal
        color={providerColor}
        show={smShowProviderModal}
        onHide={() => setSmShowProviderModal(false)}
        onConfirm={() => setSmShowProviderModal(false)}
        getTherapists={getTherapists}
      />
    </MainLayoutWrapper>
  );
}
