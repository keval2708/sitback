"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { Container, Dropdown, Modal } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import InlineSVG from "svg-inline-react";

import AddServicesModal from "@/components/dashboards/models/AddServicesModal";
import EditServicesModal from "@/components/dashboards/models/EditServicesModal";
import { Gallery } from "@/components/dashboards/profile-services/Gallery";
import { Hours } from "@/components/dashboards/profile-services/Hours";
import { Location } from "@/components/dashboards/profile-services/Location";
import { ProfileAmenities } from "@/components/dashboards/profile-services/ProfileAmenities";
import Review from "@/components/dashboards/profile-services/Review";
import { Rooms } from "@/components/dashboards/profile-services/Rooms";
import SpaDetails from "@/components/dashboards/profile-services/SpaDetails";
import {
  AmenitiesIcon,
  CogIcon,
  GalleryIcon,
  HoursIcon,
  LocationIcon,
  ReviewsIcon,
  RoomsIcon,
  SpaDetailsIcon,
} from "@/components/dashboards/profile-services/SpaTabIcons";
import { TherapistLeave } from "@/components/dashboards/profile-services/TherapistLeave";
import LoadingButton from "@/components/shared/button/LoadingButton";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { formatServiceDuration } from "@/components/therapists-profile/utils";
import "react-loading-skeleton/dist/skeleton.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useToaster } from "@/hooks";
import { authCheckSliceSelector, loginDetail } from "@/redux/authCheck";
import {
  handleBank,
  handleBlock,
  handleProfileTab,
  handleSubscribe,
  messageCheckSliceSelector,
  tabHandle,
} from "@/redux/messageTab";
import { NEW_DASHBOARD_PATH, PATH_AUTH, PATH_DASHBOARD, PATH_SCHEDULER } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { FormGroup, Input, MainLayoutWrapper } from "@/styles/global/main.style";
import { EmbedModalWrapper, SpaManagementLayoutWrapper, StyledEmbedModal } from "@/styles/pages/profile.style";
import { MoreOptionGrey_icon, camera_icon, download_icon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { removeCookie } from "@/utils/cookie";
import { setImageUpload } from "@/utils/helper";
const sign = require("jwt-encode");

const CloseModalIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#E32C1F' }}>
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return parts[0]?.substring(0, 2).toUpperCase() || "";
};

const TABS = [
  { key: "spaDetails", labelKey: "spaDetails", icon: SpaDetailsIcon },
  { key: "sixth", labelKey: "amenitiesText", icon: AmenitiesIcon },
  { key: "fifth", labelKey: "Hours & Holidays", icon: HoursIcon },
  { key: "second", labelKey: "gallery", icon: GalleryIcon },
  { key: "third", labelKey: "reviews", icon: ReviewsIcon },
  { key: "fourth", labelKey: "location", icon: LocationIcon },
  { key: "rooms", labelKey: "Rooms", icon: RoomsIcon },
  { key: "therapistLeave", labelKey: "Therapist Leave", icon: CogIcon },
];

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};


export default function ProfileServicesPage() {
  const { t } = useTranslation();
  const { login } = useSelector(authCheckSliceSelector);
  const { isProfileTab } = useSelector(messageCheckSliceSelector);
  const { push } = useRouter();
  const { toaster } = useToaster();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(
    isProfileTab && isProfileTab !== "first" ? isProfileTab : "spaDetails"
  );

  // Sidebar Edit Name & Avatar states
  const [editSpaName, setEditSpaName] = useState(false);
  const [editSpaLoading, setEditSpaLoading] = useState(false);
  const [img, setImg] = useState(null);
  const [name, setName] = useState("");
  const [error1, setError1] = useState({ nameValidate: null });

  // Iframe modal
  const [showEmbedModal, setShowEmbedModal] = useState(false);

  // Spa Services Section states
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [checkBankDetailModal, setCheckBankDetailModal] = useState(false);
  const [smShowServiceModal, setSmShowServiceModal] = useState(false);
  const [smShowEditServiceModal, setSmshowEditServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (login) {
      setName(login?.username || "");
    }
  }, [login]);

  useEffect(() => {
    if (isProfileTab) {
      if (isProfileTab === "first") {
        setActiveTab("spaDetails");
      } else {
        setActiveTab(isProfileTab);
      }
    }
  }, [isProfileTab]);

  const getProfileInfo = async () => {
    try {
      setLoading(true);
      const res = await axiosApiCall.get(API_ROUTER?.GET_DETAILS);
      if (!res?.status) {
        return res;
      }

      dispatch(handleBlock(res?.data?.data.isBlocked));
      dispatch(handleSubscribe(res?.data?.data.isSubscribe));
      dispatch(loginDetail(res?.data?.data));

      if (res?.data?.data.isBlocked) {
        push(PATH_DASHBOARD?.serviceProvider);
        return;
      }
      if (res?.data?.data?.isSubscribe == 1) {
        if (res?.data?.data.planData?.status == "canceled") {
          push(PATH_DASHBOARD?.subscriptions);
          return;
        }
        if (res?.data?.data?.spa_type == "onlydashboard") {
          push(NEW_DASHBOARD_PATH?.dashboard);
          return;
        }
        if (res?.data?.data.planData?.plan_id == 1) {
          dispatch(tabHandle("second"));
        }
      }
      if (res?.data?.data?.isSubscribe == 0) {
        push(PATH_DASHBOARD?.subscriptions);
        return;
      }
      if (res?.data?.data?.isSubscribe == 3) {
        if (res?.data?.data.planData?.status == "canceled") {
          leave_room();
          return;
        }
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
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

  // Services APIs
  const getServices = async () => {
    try {
      setServicesLoading(true);
      const res = await axiosApiCall.get(API_ROUTER?.GET_MY_SERVICES_LIST);
      if (res?.status) {
        setServices(res?.data?.data || []);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setServicesLoading(false);
    }
  };

  const checkBookableService = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.CHECK_BOOKABLE_SERVICE);
      if (res?.status) {
        setSubscriptionData(res?.data);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const checkBankDetails = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.CHECK_BANK_DETAILS);
      if (res) {
        return res?.data;
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const handleServiceModalOpen = async () => {
    if (login?.location == "" || login?.location == null) {
      toaster("Please enter location in personal information section.", TOAST_TYPES.ERROR);
    } else {
      let res = await checkBankDetails();
      if (res?.isBankDetailsAdded) {
        setSmShowServiceModal(true);
      } else {
        setCheckBankDetailModal(true);
      }
    }
  };

  const goToPage = async () => {
    dispatch(tabHandle("second"));
    dispatch(handleBank(true));
    push(PATH_DASHBOARD?.insights);
  };

  const deleteServices = async (serviceData) => {
    try {
      setActionLoading(true);
      const dltData = { serviceid: serviceData.id };
      const res = await axiosApiCall.post(API_ROUTER?.DELETE_SERVICE, dltData);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        getServices();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    getProfileInfo();
    getServices();
    checkBookableService();
  }, []);

  // Edit basic Spa Info / Name / Avatar
  const Field_Validate = () => {
    let is_error = false;
    const clonedError = { ...error1 };
    if (name && name.length > 40) {
      clonedError.nameValidate = t("errMaxNameLength");
      is_error = true;
    } else if (!name) {
      clonedError.nameValidate = "Name is required";
      is_error = true;
    } else {
      clonedError.nameValidate = null;
    }
    setError1(clonedError);
    return is_error;
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    const clonedError = { ...error1 };
    clonedError.nameValidate = null;
    setError1(clonedError);
  };

  const editSpa = async () => {
    const is_valid = Field_Validate();
    if (is_valid) return;

    try {
      setEditSpaLoading(true);
      const formData = new FormData();
      formData.append("username", name?.trim());
      if (img?.fileObj) {
        formData.append("image", img?.fileObj);
      }

      const res = await axiosApiCall.post(API_ROUTER?.UPDATE_SERVICE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.message, TOAST_TYPES.SUCCESS);
        dispatch(loginDetail(res?.data?.data));
        setImg(null);
        setEditSpaName(false);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setEditSpaLoading(false);
    }
  };

  const handleAvatarChange = (e) => {
    let uploadRes = setImageUpload(e);
    if (uploadRes?.fileObj) {
      setImg({ file: uploadRes.file, fileObj: uploadRes.fileObj });
    }
  };


  const handleChangeTab = (tabKey) => {
    setActiveTab(tabKey);
    dispatch(handleProfileTab(tabKey));
  };

  // Embed Modal functions
  const generateIframe = useMemo(() => {
    if (!login?.spaToken) return "";
    let link = `${window?.location?.origin}${PATH_SCHEDULER?.scheduler}/${sign(
      login?.spaToken,
      process.env.SECRET_KEY
    )}`;
    return `<a style="background: #295086;color: #fff;padding: 10px;text-decoration: none;text-transform: capitalize;border-radius: 5px;" href="${link}">book appointment</a>`;
  }, [login]);

  const handleDownloadEmbed = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${generateIframe}
      </head>
      <body>
      </body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = (login?.username || "spa") + ".html";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  // // Service helper utils
  // const formatServiceDuration = (service) => {
  //   const hrs = service?.hour || 0;
  //   const mins = service?.minutes || 0;
  //   if (hrs > 0) {
  //     return `${hrs} hr ${mins > 0 ? `${mins} min` : ""}`;
  //   }
  //   return `${mins} min`;
  // };

  const formatServicePrice = (price) => {
    return price ? `$${price}` : "$0";
  };

  return (
    <>
      <MainLayoutWrapper>
        <SpaManagementLayoutWrapper className="sitback-therapist-management-wrapper">
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
                  <section className="services-section">
                    <div className="services-section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Skeleton width={120} height={28} />
                      <Skeleton width={180} height={36} style={{ borderRadius: '100px' }} />
                    </div>
                    <div className="services-cards-row" style={{ display: 'flex', gap: '20px', overflow: 'hidden', width: '100%' }}>
                      {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="box-white" style={{ flex: '1', minWidth: '200px' }}>
                          <div className="service-card" style={{ padding: '16px' }}>
                            <Skeleton width="80%" height={18} style={{ marginBottom: '12px' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Skeleton circle width={48} height={48} />
                              <div style={{ width: '50%' }}>
                                <Skeleton width="100%" height={12} style={{ marginBottom: '8px' }} />
                                <Skeleton width="80%" height={12} />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="profile-settings-section" style={{ display: 'flex', gap: '24px', marginTop: '30px' }}>
                    <nav className="profile-subtabs-nav" style={{ flex: '0 0 250px' }}>
                      {TABS.map((tab) => (
                        <div key={tab.key} style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #f1f1f1' }}>
                          <Skeleton circle width={20} height={20} />
                          <Skeleton width={100} height={16} />
                        </div>
                      ))}
                    </nav>
                    <div className="profile-settings-content" style={{ flex: '1', background: '#fff', padding: '24px', borderRadius: '12px' }}>
                      <Skeleton count={5} height={35} style={{ marginBottom: '12px' }} />
                    </div>
                  </section>
                </div>
              </div>
            ) : (
              <div className="therapist-management-layout">
                {/* Left Sidebar */}
                <aside className="therapist-sidebar">
                  <div>
                    <div className="sidebar-top-row">
                      <span className="">
                        {/* {t("active")} */}
                      </span>
                      {!editSpaName && (
                        <button
                          type="button"
                          className="edit-photo-btn"
                          onClick={() => setEditSpaName(true)}
                          aria-label={t("editProfile")}
                        >
                          <img alt="edit" src="/images/Edit-icon.svg" />
                        </button>
                      )}
                    </div>

                    <div className="sidebar-avatar-wrap">
                      <div className="sidebar-avatar" style={{ position: "relative" }}>
                        <div className="profile-img">
                          {img?.file || login?.image ? (
                            <img
                              alt={login?.username}
                              src={img?.file || login?.image}
                              onError={(e) => {
                                e.target.src = "/images/profile-img.png";
                              }}
                            />
                          ) : login?.username ? (
                            <span className="sidebar-initials">{getInitials(login?.username)}</span>
                          ) : (
                            <img alt="profile" src="/images/profile-img.png" />
                          )}
                        </div>
                        {editSpaName && (
                          <div
                            className="edit-photo-btn"
                          >
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleAvatarChange}
                              style={{
                                position: "absolute",
                                opacity: 0,
                                width: "100%",
                                height: "100%",
                                cursor: "pointer",
                              }}
                            />
                            <InlineSVG src={camera_icon} style={{ width: "16px", height: "16px" }} />
                          </div>
                        )}
                      </div>
                    </div>

                    {editSpaName ? (
                      <div className="edit-profile-wrapper">
                        <FormGroup className="mb-2">
                          <Input
                            isSmallInputWrapper={true}
                            isTextCenter={true}
                            type="text"
                            placeholder="Spa Name"
                            onChange={handleNameChange}
                            value={name}
                          />
                          {error1.nameValidate && (
                            <p className="text-danger small mt-1">{error1.nameValidate}</p>
                          )}
                        </FormGroup>
                        <div className="edit-btn-wrapper">
                          <LoadingButton
                            disabled={editSpaLoading}
                            label={t("save")}
                            loadinglabel={t("saving")}
                            isLoading={editSpaLoading}
                            onClick={editSpa}
                            className="btn btn-sm membership-btn"
                          />
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => {
                              setName(login?.username || "");
                              setImg(null);
                              setEditSpaName(false);
                            }}
                          >
                            {t("cancel")}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <h2 className="sidebar-name">{login?.username}</h2>
                    )}

                    <div className="sidebar-details">
                      <div className="detail-row">
                        <label>Owner</label>
                        <div className="detail-value-row">
                          <span>{login?.spaOwnerName || "-"}</span>
                        </div>
                      </div>
                      <div className="detail-row">
                        <label>{t("emailAddress")}</label>
                        <div className="detail-value-row">
                          <span>{login?.email}</span>
                        </div>
                      </div>
                      <div className="detail-row">
                        <label>{t("phone")}</label>
                        <div className="detail-value-row">
                          <span>
                            ({"+1"}) {login?.phone || "-"}
                          </span>
                        </div>
                      </div>
                      <div className="detail-row">
                        <label>{t("location")}</label>
                        <div className="detail-value-row">
                          <span>{login?.location || "-"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sidebar-actions-wrap">
                    <Link href={PATH_DASHBOARD?.subscriptions} className="membership-btn">
                      {t("manageMembership")}
                    </Link>
                    {login?.spaToken && (
                      <button
                        type="button"
                        className="embed-btn"
                        onClick={() => setShowEmbedModal(true)}
                      >
                        {t("embeddedCode")}
                      </button>
                    )}
                  </div>
                </aside>

                {/* Right Main Content */}
                <div className="therapist-main-content">
                  {/* Top Services section */}
                  <div className="therapists-profile-wrapper">
                    <section className="services-section">
                      <div className="services-section-header">
                        <h2>{t("services")}</h2>
                        <button
                          type="button"
                          className="add-services-btn"
                          onClick={() => handleServiceModalOpen()}
                        >
                          <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="16" r="16" fill="#295086" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M15.9994 11.2432V20.7567V11.2432Z" fill="#295086" />
                            <path d="M15.9994 11.2432V20.7567" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M20.7568 16.0002H11.2433H20.7568Z" fill="#295086" />
                            <path d="M20.7568 16.0002H11.2433" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>

                          <span>{t("addMoreServices")}</span>
                        </button>
                      </div>

                      <div className="services-cards-row slick-slider-container">
                        {servicesLoading ? (
                          <div className="services-cards-row" style={{ display: 'flex', gap: '20px', overflow: 'hidden', width: '100%' }}>
                            {[1, 2, 3, 4].map((item) => (
                              <div key={item} className="box-white" style={{ flex: '1', minWidth: '200px' }}>
                                <div className="service-card" style={{ padding: '16px' }}>
                                  <Skeleton width="80%" height={18} style={{ marginBottom: '12px' }} />
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Skeleton circle width={48} height={48} />
                                    <div style={{ width: '50%' }}>
                                      <Skeleton width="100%" height={12} style={{ marginBottom: '8px' }} />
                                      <Skeleton width="80%" height={12} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : services.length === 0 ? (
                          <p className="services-empty">No services added yet.</p>
                        ) : (
                          <Slider {...sliderSettings}>
                            {services.map((service) => (
                              <div key={service.id} className="box-white">
                                <div className="service-card">
                                  <div className="user-detail-wrapper">
                                    <p className="service-name">{service?.name}</p>
                                    <div className="service-card-top">
                                      <div className="service-icon">
                                        <img
                                          alt={service?.name}
                                          src={service?.image || "/images/right-top-img-1.svg"}
                                        />
                                      </div>
                                      <Dropdown>
                                        <Dropdown.Toggle variant="link" className="service-menu-btn">
                                          <InlineSVG src={MoreOptionGrey_icon} />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                          <Dropdown.Item
                                            onClick={() => {
                                              setSelectedService(service);
                                              setSmshowEditServiceModal(true);
                                            }}
                                          >
                                            {t("update")}
                                          </Dropdown.Item>
                                          <Dropdown.Item
                                            onClick={() => {
                                              setDeleteTarget(service);
                                              setShowDeleteModal(true);
                                            }}
                                          >
                                            {t("delete")}
                                          </Dropdown.Item>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </div>
                                  </div>
                                  <div className="service-meta">
                                    <div className="time-price-wrapper">
                                      <i>
                                        <img alt="clock" src="/images/clock-icon.svg" />
                                      </i>
                                      <div className="meta-item">
                                        <span className="meta-label">{t("time")}</span>
                                        <span className="meta-value">
                                          {formatServiceDuration(service)}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="time-price-wrapper" style={{ justifyContent: "flex-end" }}>
                                      <i>
                                        <img alt="price" src="/images/dollar-icon.svg" />
                                      </i>
                                      <div className="meta-item">
                                        <span className="meta-label">{t("price")}</span>
                                        <span className="meta-value">
                                          {formatServicePrice(service?.price)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </Slider>
                        )}
                      </div>
                    </section>


                    {/* Vertical Settings Tabs Layout */}
                    <section className="profile-settings-section">
                      <nav className="profile-subtabs-nav">
                        {TABS.map((tab) => {
                          const IconComponent = tab.icon;
                          return (
                            <button
                              key={tab.key}
                              type="button"
                              className={`profile-subtab-btn ${activeTab === tab.key ? "active" : ""}`}
                              onClick={() => handleChangeTab(tab.key)}
                            >
                              <span className="subtab-icon">
                                <IconComponent />
                              </span>
                              {t(tab.labelKey)}
                            </button>
                          );
                        })}
                      </nav>

                      <div className="profile-settings-content">
                        {activeTab === "spaDetails" && <SpaDetails />}

                        {activeTab === "sixth" && <ProfileAmenities />}

                        {activeTab === "fifth" && <Hours />}

                        {activeTab === "second" && <Gallery />}

                        {activeTab === "third" && <Review />}

                        {activeTab === "fourth" && <Location />}

                        {activeTab === "rooms" && <Rooms />}

                        {activeTab === "therapistLeave" && <TherapistLeave />}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            )}
          </Container>
        </SpaManagementLayoutWrapper>
      </MainLayoutWrapper>

      {/* Embed Code Modal */}
      <StyledEmbedModal
        show={showEmbedModal}
        onHide={() => setShowEmbedModal(false)}
        centered
        className="sitback-modal-wrapper embed-modal-custom"
      >
        <Modal.Body>
          <EmbedModalWrapper>
            <button
              type="button"
              className="close-modal-btn"
              onClick={() => setShowEmbedModal(false)}
              aria-label="close"
            >
              <CloseModalIcon />
            </button>
            <h3 className="modal-title-text">{t("embeddedWeb")}</h3>
            <div className="copy-link-input-wrapper">
              <input type="text" value={generateIframe} disabled />
              <CopyToClipboard text={generateIframe}>
                <button type="button" className="copy-btn">
                  {t("copy")}
                </button>
              </CopyToClipboard>
            </div>
            <div className="download-btn-container">
              <button
                type="button"
                onClick={handleDownloadEmbed}
                className="download-btn"
              >
                Download
                <InlineSVG src={download_icon} className="global_laguage_icon" />
              </button>
            </div>
          </EmbedModalWrapper>
        </Modal.Body>
      </StyledEmbedModal>

      {/* Service Modals */}
      <AddServicesModal
        show={smShowServiceModal}
        subscriptionData={subscriptionData}
        onHide={() => setSmShowServiceModal(false)}
        onConfirm={() => {
          setSmShowServiceModal(false);
          getServices();
        }}
        getServices={getServices}
      />

      <EditServicesModal
        show={smShowEditServiceModal}
        onHide={() => setSmshowEditServiceModal(false)}
        onConfirm={() => {
          setSmshowEditServiceModal(false);
          getServices();
        }}
        serviceData={selectedService}
        getServices={getServices}
      />

      <DeleteModal
        show={showDeleteModal}
        disabled={actionLoading}
        messageBody={<>{t("deletemessage2")}</>}
        handleClose={() => setShowDeleteModal(false)}
        handleConfirmDelete={async () => {
          if (deleteTarget) {
            await deleteServices(deleteTarget);
            setShowDeleteModal(false);
          }
        }}
      />
      <Modal
        show={checkBankDetailModal}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
        className="sitback-modal-wrapper warning-modal-wrapper"
      >
        <Modal.Body>
          <div className="sitback-request-modal-wrapper">
            <h5>{t('warning')}</h5>
            <p>{t('addBankDetails')}</p>
            <span onClick={() => goToPage()}>{t('addBankDetailText')}</span>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
