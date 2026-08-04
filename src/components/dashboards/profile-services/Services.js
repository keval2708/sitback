import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dropdown, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
// import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import InlineSVG from "svg-inline-react";
import AddManageScheduleModal from "../models/AddManageScheduleModal";
import AddProviderModal from "../models/AddProviderModal";
import AddServicesModal from "../models/AddServicesModal";
import EditProviderModal from "../models/EditProviderModal";
import EditServicesModal from "../models/EditServicesModal";
import ProviderVerifyOtp from "../models/ProviderVerifyOtp";
import TotalTipsModal from "../models/TotalTipsModal";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import Loader from "@/components/shared/spinner/loader";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector } from "@/redux/authCheck";
import { handleBank, tabHandle } from "@/redux/messageTab";
import { myServiceList } from "@/redux/service";
import { PATH_DASHBOARD } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { Image, SubTitleText16 } from "@/styles/global/main.style";
import { AddMoreBlue_icon, MoreOptionGrey_icon, StarV1_icon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

export const Services = () => {
  const { login } = useSelector(authCheckSliceSelector);
  // state
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [checkBankDetailModal, setCheckBankDetailModal] = useState(false);
  const [smShowServiceModal, setSmShowServiceModal] = useState(false);
  const [serviceDataLoaded, setServiceDataLoaded] = useState(false);
  const [smShowScheduleServiceModal, setSmhowScheduleServiceModal] = useState(false);
  const [openVerifyModal, setOpenVerifyModal] = useState(false);

  const [smShowProviderModal, setSmShowProviderModal] = useState(false);
  const [serviceData, setServiceData] = useState([]);

  const [providerData, setProviderData] = useState([]);
  const [Managearget, setManagearget] = useState(null);

  const [smShowEditProviderModal, setSmshowEditProviderModal] = useState(false);
  const [smShowTotalTipsModal, setTotalTipsModal] = useState(false);
  const [EditTarget, setEditTarget] = useState(null);
  const [showTipData, setShowTipData] = useState(null);

  //delete Service model
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loading, setLoading] = useState(false);

  //delete Employee model
  const [showEmployeeDeleteModal, setShowEmployeeDeleteModal] = useState(false);
  const [deleteEmployeeTarget, setDeleteEmployeeTarget] = useState(null);
  const [Employeeloading, setEmployeeLoading] = useState(false);
  const [providerColor, setProviderColor] = useState("");

  //Edit service modal
  const [smShowEditServiceModal, setSmshowEditServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // hooks
  const { toaster } = useToaster();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { push } = useRouter();

  function hslToHex(h, s, l) {
    // Convert hsl to rgb
    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    // Convert rgb to hex
    const toHex = (x) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  const generateUniqueColor = () => {
    let color;
    let isUnique = false;

    while (!isUnique) {
      const hue = Math.floor(Math.random() * 360);
      const saturation = Math.random() * 0.5;
      const lightness = 0.8 + Math.random() * 0.2;
      // const hslColor = `hsl(${hue}, ${saturation * 100}%, ${lightness * 100}%)`
      // const hexColor = hslToRgb(hue, saturation * 100, lightness * 100);
      color = hslToHex(hue / 360, saturation, lightness);
      isUnique = !providerData?.some((provider) => provider.color === color);
    }
    setProviderColor(color);
  };

  useEffect(() => {
    generateUniqueColor();
  }, [providerData]);

  // useEffect
  useEffect(() => {
    getServices();
    getProviderList();
    // checkBookableService();
  }, []);

  useEffect(() => {
    if (window.io) {
      window.io.socket.on("serviceprovider", async (msg) => {
        if (msg?.action == "employee_verify_email") {
          getEmployee();
        }
      });
    }
  }, [window.io]);

  useEffect(() => {
    getEmployee();
  }, [smShowProviderModal, smShowEditProviderModal, openVerifyModal]);

  const checkBookableService = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.CHECK_BOOKABLE_SERVICE);
      if (!res?.status) {
        return res;
      } else {
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

  // Service
  const getServices = async () => {
    try {
      setServiceDataLoaded(true);
      const res = await axiosApiCall.get(API_ROUTER?.GET_MY_SERVICES_LIST);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        dispatch(myServiceList(res?.data?.data));
        setServiceData(res?.data?.data);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setServiceDataLoaded(false);
    }
  };

  const getEmployee = async () => {
    try {
      const res = await axiosApiCall.post(API_ROUTER?.EMPLOYEE_LIST);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        // dispatch(myServiceList(res?.data?.data));
        setProviderData(res?.data?.data);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const deleteServices = async (serviceData) => {
    try {
      setLoading(true);

      const dltData = {
        serviceid: serviceData.id,
      };
      const res = await axiosApiCall.post(API_ROUTER?.DELETE_SERVICE, dltData);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        getServices();
        // checkBookableService();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (employee) => {
    try {
      setEmployeeLoading(true);

      const dltData = {
        employee_id: employee.id,
      };
      const res = await axiosApiCall.post(API_ROUTER?.DELETE_EMPLOYEE, dltData);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        getEmployee();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setEmployeeLoading(false);
    }
  };

  const handleEditProviderModal = (target) => {
    setEditTarget(target);
    setSmshowEditProviderModal(true);
  };
  const handleTipsModal = (target) => {
    setShowTipData(target);
    setTotalTipsModal(true);
  };

  const handleManageScheduleModal = async (target) => {
    setManagearget(target);
    if (target?.isPhoneVerified == 0) {
      toaster("Please Verify Your Phone Number", TOAST_TYPES.ERROR);
    } else if (!target?.isVerified) {
      toaster("Please verify your email", TOAST_TYPES.ERROR);
    } else {
      setSmhowScheduleServiceModal(true);
    }
  };

  //service
  const handleShowDeleteModal = (target) => {
    setDeleteTarget(target);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };

  const handleConfirmDelete = async () => {
    if (deleteTarget) {
      handleCloseDeleteModal();
      await deleteServices(deleteTarget);
    }
  };

  //Employee
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

  const handleShowEditModal = (service) => {
    setSelectedService(service);
    setSmshowEditServiceModal(true);
  };

  //provider
  const getProviderList = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.GET_MY_SERVICES_LIST);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        dispatch(myServiceList(res?.data?.data));
        setServiceData(res?.data?.data);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const resendOtp = async (arg) => {
    try {
      let param = {
        phone: arg?.phone,
      };
      const res = await axiosApiCall.post(API_ROUTER?.PHONE_RESEND_OTP, param);
      if (!res?.status) {
        return res;
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const formatName = (value) => {
    let name = value.split(" ");
    if (name[1]) return `${name[0]} ${name[1]?.charAt(0).toUpperCase()}`;
    else return `${name[0]}`;
  };

  const handleServiceModalOpen = async () => {
    if (login?.location == "" || login?.location == null) {
      toaster("Please enter location in personal information section.", TOAST_TYPES.ERROR);
    } else {
      let { isBankDetailsAdded } = await checkBankDetails();
      if (isBankDetailsAdded) {
        setSmShowServiceModal(true);
      } else {
        setCheckBankDetailModal(true);
      }
    }
  };

  const handleSpecialistModalOpen = () => {
    if (login?.location == "" || login?.location == null) {
      toaster("Please enter location in personal information section.", TOAST_TYPES.ERROR);
    } else {
      setSmShowProviderModal(true);
    }
  };

  const goToPage = async () => {
    dispatch(tabHandle("second"));
    dispatch(handleBank(true));
    push(PATH_DASHBOARD?.insights);
  };

  return (
    <div>
      <div className="services-category-wrapper sitback-updated-category-display-div">
        <Loader loading={serviceDataLoaded} className="sitback-loader" />
        <div className="services-category-list-wrapper services-category-main">
          {serviceData?.length > 0 &&
            serviceData?.map((service) => (
              <div key={service?.id} className="grid-cols">
                <div className="whitebox-wrapper sitback-white-box-updated-div">
                  <div className="">
                    <div className="sitback-dropdown-img-content-div">
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          <InlineSVG src={MoreOptionGrey_icon} className="global_laguage_icon" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => handleShowEditModal(service)}>
                            {t('update')}
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleShowDeleteModal(service)}>
                            {t("delete")}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <div className="icon-wrapper">
                        <Image
                          alt="sitback"
                          isContainImg={true}
                          src={
                            service?.image
                              ? service?.image
                              : "/images/right-top-img-1.svg"
                          }
                        />
                      </div>
                    </div>
                    <p className="paragraph-text">{service?.name}</p>
                  </div>
                  <div className="">
                    <div className="hour-text">
                      <p>Time: </p>
                      <p>{service?.hour * 60 + service?.minutes}min</p>
                    </div>
                     <div className="hour-text">
                      <p>Price:</p>
                      <p>${service?.price}</p>
                    </div>
                    {/* <SubTitleText18>${service?.price}</SubTitleText18> */}
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="services-category-list-wrapper added-iconbox">
          <div className="grid-cols">
            <div className="whitebox-wrapper addmore-servicebox grey-box-wrapper">
              <span className="add-icon-wrapper" onClick={() => handleServiceModalOpen()}>
                <InlineSVG src={AddMoreBlue_icon} className="global_laguage_icon" />
              </span>
              <p className="paragraph-text">
                {t("addmore")} <br />
                {t("services")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="massage-specialist-section sitback-updated-massage-specialist-section-wrapper">
        <SubTitleText16>Massage Specialist</SubTitleText16>
        <div className="services-category-wrapper">
          <div className="services-category-list-wrapper services-category-main">
            {providerData?.length > 0 &&
              providerData?.map((provider) => (
                <div key={provider?.id} className="grid-cols">
                  <div className="whitebox-wrapper sitback-white-box-updated-div">
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <InlineSVG src={MoreOptionGrey_icon} className="global_laguage_icon" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleTipsModal(provider)}>
                          {t('totalTips')}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleManageScheduleModal(provider)}>
                          {t('manageSchedule')}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleEditProviderModal(provider)}>
                          {t('editProfile')}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleShowEmployeeDeleteModal(provider)}>
                          {t("delete")}
                        </Dropdown.Item>

                      </Dropdown.Menu>
                    </Dropdown>
                    <div className="icon-wrapper">
                      <Image
                        alt="sitback"
                        className="provider-image"
                        src={
                          provider?.thumb_image
                            ? provider?.thumb_image
                            : "/images/right-top-img-1.svg"
                        }
                      />
                    </div>
                    <p className="paragraph-text mb-0">{formatName(provider?.name)}</p>
                    <div className="hour-text rating-text">
                      <p>
                        {provider?.employeeReview && provider?.employeeReview == "0" ? (
                          "No Rating"
                        ) : <span><InlineSVG src={StarV1_icon} className="global_laguage_icon" /> {provider?.employeeReview}</span>}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="services-category-list-wrapper added-iconbox">
            <div className="grid-cols">
              <div className="whitebox-wrapper addmore-servicebox grey-box-wrapper">
                <span className="add-icon-wrapper" onClick={() => handleSpecialistModalOpen()}>
                  <InlineSVG src={AddMoreBlue_icon} className="global_laguage_icon" />
                </span>
                <p className="paragraph-text">{t('addSpecialist')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteModal
        show={showDeleteModal}
        disabled={loading}
        messageBody={<>{t("deletemessage2")}</>}
        handleClose={handleCloseDeleteModal}
        handleConfirmDelete={handleConfirmDelete}
        getServices={getServices}
      />

      <DeleteModal
        show={showEmployeeDeleteModal}
        disabled={Employeeloading}
        messageBody={<>{t('deleteEmployee')}</>}
        handleClose={handleCloseEmployeeDeleteModal}
        handleConfirmDelete={handleConfirmEmployeeDelete}
      />

      {/* Add services model */}
      <AddServicesModal
        show={smShowServiceModal}
        subscriptionData={subscriptionData}
        onHide={() => setSmShowServiceModal(false)}
        onConfirm={() => setSmShowServiceModal(false)}
        getServices={getServices}
      />
      <AddManageScheduleModal
        show={smShowScheduleServiceModal}
        onHide={() => setSmhowScheduleServiceModal(false)}
        onConfirm={() => setSmhowScheduleServiceModal(false)}
        employeeData={Managearget}
      />

      <ProviderVerifyOtp
        show={openVerifyModal}
        onHide={() => setOpenVerifyModal(false)}
        // onConfirm={() => setSmhowScheduleServiceModal(false)}
        employeeData={Managearget}
      />

      <EditProviderModal
        show={smShowEditProviderModal}
        onHide={() => setSmshowEditProviderModal(false)}
        onConfirm={() => setSmshowEditProviderModal(false)}
        provider={EditTarget}
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
      />
      <EditServicesModal
        show={smShowEditServiceModal}
        onHide={() => setSmshowEditServiceModal(false)}
        onConfirm={() => setSmshowEditServiceModal(false)}
        serviceData={selectedService}
        getServices={getServices}
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
    </div>
  );
};
