"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Container, Form, Modal, Nav, Tab, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import InlineSVG from "svg-inline-react";
import * as yup from "yup";
import DashBoardHeader from "@/components/dashboardheader/page";
import { AddRemoveUser } from "@/components/newdashboards/addRemoveUser";
import { Addservices } from "@/components/newdashboards/addservices";
import { Appointment } from "@/components/newdashboards/appointment";
import { AvailabilityUpdates } from "@/components/newdashboards/availabilityUpdates";
import { Leads } from "@/components/newdashboards/leads";
import { Messages } from "@/components/newdashboards/messages";
import PastRequestDeclineModal from "@/components/newdashboards/modals/pastRequestDeclineModal";
import SuggestPastRequestModal from "@/components/newdashboards/modals/suggestPastRequestModal";
import { Showcase } from "@/components/newdashboards/showcase";
import { UpgradePlan } from "@/components/newdashboards/upgradePlan";
import VideoUpload from "@/components/newdashboards/videoUpload";
import CustomModal from "@/components/shared/modal";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector, loginDetail, setdeviceTokens } from "@/redux/authCheck";
import {chatHandle, messageCheckDashboardSliceSelector } from "@/redux/messageDashboard";
import {dtabHandle, handleProfileTab, messageCheckSliceSelector } from "@/redux/messageTab";
import { mySpaHeadStatusSearch, mySpaHeadTextSearch } from "@/redux/service";
import { NEW_DASHBOARD_PATH, PATH_AUTH, PATH_DASHBOARD } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import {
  MainLayoutWrapper,
  SitBackModalBodyWrapper,
} from '@/styles/global/main.style';
import {
} from '@/styles/pages/appointments.style';
import {
  InsightsDashboardMainTabWrapper,
  InsightsSitbackLayoutWrapper,
} from '@/styles/pages/insights.style';

import {
  AddRemoveUserIcon_icon,
  AddUpdateIcon_icon,
  AppointMentIcon_icon,
  AvailabilityIcon_icon,
  LeadBookingIcon_icon,
  LogOutIcon_icon,
  ShowCaseIcon_icon,
  SidebarMessageIcon_icon,
  UpgradePlanIcon_icon,
} from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { removeCookie } from "@/utils/cookie";




export default function Dashboard() {

  //hook
  const { t } = useTranslation();
  const { toaster } = useToaster();
  const { push } = useRouter();
  const dispatch = useDispatch();

  const { dactiveTab, isBlock } = useSelector(messageCheckSliceSelector);
  const { selectedChat } = useSelector(messageCheckDashboardSliceSelector);
  const { login,deviceTokens } = useSelector(authCheckSliceSelector);
  const [checkUserDetailModal, setCheckUserDetailModal] = useState(false);
  const [checkSubcriptionModal, setCheckSubcriptionModal] = useState(false);
  const [checkPastAppointmentModal, setCheckPastAppointmentModal] = useState(false);
  const [pastAppointmentData, setPastAppointmentData] = useState([]);
  const [isSpaDeny, setSpaDeny] = useState(false);
  const [activeTab, setActiveTab] = useState();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userPermissions, setUserPermission] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPastData, setLoadingPastData] = useState(false);
  const [unreadCount, setUnreadCount] = useState(null);
  const [confirmationStatusMap, setConfirmationStatusMap] = useState({});
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showSuggestModal, setSuggestShowModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [loadingStatusMap, setLoadingStatusMap] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmData, setConfirmData]  = useState(false);
  const [selectedSlot, setSelectedSlot] = useState();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const CustomFormSchema = yup
    .object()
    .shape()
    .strict(true);

  // Hooks
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(CustomFormSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {

    setTimeout(() => {
      // if(activeTab === 'dfirst') {
        getProfileInfo()
        getUnreadMsg();
      // }

    });
    // console.log("dactiveTab",dactiveTab);

      if (dactiveTab == "dfirst") {
        // dispatch(dtabHandle("dfirst"));
        // setActiveTab("dfirst"); // Default to the first tab when the component is loaded
      } else {
        dispatch(mySpaHeadTextSearch(null))
        dispatch(mySpaHeadStatusSearch(null))
        // dispatch(mySpaHeadSelectedDate(null))
      }

      if(login?.employeeType == null || login?.employeeType == "undefined" || login?.employeeType == "") {
        leave_room()
      }
      setTimeout(() => {
        hideAgentButton()
      }, 1000);


    }, []);

    const hideAgentButton = () => {
       const chatbotIcon = document.getElementById('chatbot-icon');
        if (chatbotIcon) {
          chatbotIcon.style.display = 'none';
        }
        const chatbotFrame = document.getElementById('chatbot-frame');
        if(chatbotFrame) {
          chatbotFrame.style.display = 'none';
        }
    }

    const handleLogoClick = () => {
      getProfileInfo()
    };

  useEffect(() => {
    if (dactiveTab == 'dfirst') {
      getProfileInfo()
    } else {
      dispatch(dtabHandle(dactiveTab));
      setActiveTab(dactiveTab);
    }
  }, [dactiveTab])

  // methods
  const getProfileInfo = async () => {
    try {
      setLoading(true)
      const res = await axiosApiCall.get(API_ROUTER?.GET_DETAILS);
      if (!res?.status) {
        return res
      } else {

        if(res?.data?.data?.employeeType == "spaemployee") {
          const permissions = res?.data?.data?.permissions;
          const permissionsArray = permissions?.split(',').map(item => item.trim());
          setUserPermission(permissionsArray)
          if(permissionsArray.includes("Approve/Deny Requests")) {
            dispatch(dtabHandle("dfirst"));
            setActiveTab("dfirst");
          } else if(permissionsArray.includes("Create New Service")) {
              dispatch(dtabHandle("dthird"));
              setActiveTab("dthird");
          } else if(permissionsArray.includes("Add Availability")) {
              dispatch(dtabHandle("dsecond"));
              setActiveTab("dsecond");
          } else if(permissionsArray.includes("Update Availability")) {
              dispatch(dtabHandle("dfourth"));
              setActiveTab("dfourth");
          } else if(permissionsArray.includes("Add/Remove User")) {
              dispatch(dtabHandle("dsevanth"));
              setActiveTab("dsevanth");
          } else if(permissionsArray.includes("Lead & Booking Tracking")) {
            dispatch(dtabHandle("dfifth"));
            setActiveTab("dfifth");
          }


        } else {
          if (dactiveTab == 'dfirst' || dactiveTab == null || dactiveTab == undefined) {
            dispatch(dtabHandle("dfirst"));
            setActiveTab("dfirst")
          }
        }
        dispatch(loginDetail(res?.data?.data));
        // console.log("9999",res?.data);
        if (res?.data?.data?.location == '' || res?.data?.data?.location == null || res?.data?.spaHoursAdded == false) {
          setCheckUserDetailModal(true)
        } else if(res?.data?.cancelBtnFlag) {
          setCheckSubcriptionModal(true)
        }

        if (res?.data?.data.isBlocked) {
          setCheckPastAppointmentModal(false)
          setSpaDeny(true)
          return
        }
        else {
          setSpaDeny(false)
        }

          if(!res?.data?.data.isBlocked && res?.data?.data?.isAcceptDeny){
            setCheckPastAppointmentModal(false)
            setSpaDeny(true)
          } else {
            setSpaDeny(false)
          }

        if (res?.data?.data?.isSubscribe == 1) {
          // if (res?.data?.data.planData?.status == 'canceled') {
          //   push(PATH_DASHBOARD?.subscriptions);
          // }
          if (res?.data?.data?.spa_type == "manual") {
            push(PATH_DASHBOARD?.serviceProvider);
          }
        }
        if (res?.data?.data?.isSubscribe == 0) {
          //push(PATH_DASHBOARD?.subscriptions);
        }
        if (res?.data?.data?.isSubscribe == 3) {
          if (res?.data?.data.planData?.status == 'canceled') {
            leave_room();
          }
        }

        if(!res?.data?.data.isBlocked && res?.data?.pendingAppointment == true &&  res?.data?.data?.employeeType == "spa") {
          setCheckPastAppointmentModal(true)
          checkPendingAppointment()
        } else if (!res?.data?.data.isBlocked && res?.data?.pendingAppointment == true && res?.data?.data?.employeeType == "spaemployee") {
          const permissions = res?.data?.data?.permissions;
          const permissionsArray = permissions?.split(',').map(item => item.trim());
          if(permissionsArray.includes("Approve/Deny Requests")) {
            setCheckPastAppointmentModal(true)
            checkPendingAppointment()
          }
        }
      }
    } catch (error) {
      // return error
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false)
    }
  };

  const leave_room = async () => {
    setIsLoggingOut(true);
    try {
      const res = await axiosApiCall.get(API_ROUTER?.USER_LEAVE_ROOM);
      if (!res?.status) {
        return res
      } else {
        //console.log("res", res);
        try {

          const res = await axiosApiCall.post(API_ROUTER?.LOGOUT, { id: login?.id,employeeType: login?.employeeType,deviceToken:deviceTokens });
          if (!res?.status) {
            setIsLoggingOut(false); // Set loading state back to false if error
            return toaster(res?.message, TOAST_TYPES.ERROR);
          } else {
            removeCookie('token');
            localStorage.clear();
            dispatch(setdeviceTokens(null));
            dispatch(chatHandle(null));
            //push(PATH_AUTH?.signIn);
            window.location.href = PATH_AUTH?.signIn;
            //dispatch(handleLoginTab('first'));
            // window.location.reload();
            return res
          }
        } catch (error) {
          setIsLoggingOut(false); // Set loading state back to false in case of error
          toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
        }
      }
    } catch (error) {
      // console.log("error",error);
      return error
    }
  };


  const handleTabChange = (val) => {
    // console.log("val",val);
    if (!isBlock) {
      if (val != 'deighth') {
        dispatch(chatHandle(null));
      }
      getUnreadMsg();
      dispatch(dtabHandle(val));
      setActiveTab(val);
      dispatch(mySpaHeadTextSearch(null))
      if(sidebarWrapper) {
      sidebarWrapper.classList.remove('sidebar-toggle-menu-open');
      }
    }
  };

  const getMatchingSlot = (slotTitle, timeSlots) => {
    return timeSlots.find(slot => {
        const [start] = slot.split(" - ");
        return start === slotTitle;
    });
};







// useEffect(() => {
//   dispatch(dtabHandle('dfirst'));
// }, []);

  // Select the toggle button and sidebar wrapper
  const toggleMenuButton = document.querySelector('.sitback-toggle-menu-wrapper');
  const closeMenuButton = document.querySelector('.sitback-toggle-close-menu-wrapper');
  const sidebarWrapper = document.querySelector('.sitback-left-dashboard-sidebar-wrapper');

  if (toggleMenuButton && sidebarWrapper) {
    // Add event listener to the toggle button to add class
    toggleMenuButton.addEventListener('click', () => {
      sidebarWrapper.classList.add('sidebar-toggle-menu-open');
    });
  }

  if (closeMenuButton && sidebarWrapper) {
    // Add event listener to the close button to remove class
    closeMenuButton.addEventListener('click', () => {
      sidebarWrapper.classList.remove('sidebar-toggle-menu-open');
    });
  }

  const goToPage = async () => {
    push(NEW_DASHBOARD_PATH?.profile);
    if(!login?.location) {
      dispatch(handleProfileTab('fourth'));
    } else {
      dispatch(handleProfileTab('fifth'));
    }
  };

  const goToPages = async () => {
    push(PATH_DASHBOARD?.subscriptions);
  };

  useEffect(() => {
    if (dactiveTab == 'deighth') {
      if (selectedChat != null) {
        getUnreadMsg();
      }
    }
  }, [dactiveTab, selectedChat])


  useEffect(() => {
      if (window.io) {
        hideAgentButton()
        if(login?.employeeType == "spa") {
            window.io.socket.on("serviceprovider", async (msg) => {
            if (msg?.action == "spa_ban_unban" || msg?.action == "updateVSSubscription") {
              getProfileInfo()
            }
            if (msg?.action == "AppointmentRequestUpdated") {
              checkPendingAppointment()
            }
          });

          window.io.socket.on("serviceprovider", async (msg) => {
            if (msg.action == "message_from_user_side" || msg.action == "message_from_admin_to_spa") {
              getUnreadMsg();
            }
          });

        } else if (login?.employeeType == "spaemployee") {

            window.io.socket.on("spaemployee", async (msg) => {
            if (msg?.action == "spa_ban_unban") {
              getProfileInfo()
            }
            if (msg?.action == "AppointmentRequestUpdated") {
              checkPendingAppointment()
            }
          });
        }

      }
    }, [window.io]);

  const getUnreadMsg = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.TOTAL_UNREAD_MSG);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setUnreadCount(res?.data?.count)
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const checkPendingAppointment = async () => {
    setLoadingPastData(true)
    try {
      const res = await axiosApiCall.get(API_ROUTER?.DASHBOARD_CHECK_PAST_APPOINTMENT);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        if(res?.data?.data?.length > 0) {
          setPastAppointmentData(res?.data?.data)
        } else{
          // getProfileInfo()
          setPastAppointmentData([])
          setCheckPastAppointmentModal(false)

        }
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoadingPastData(false);
    }
  }

  const handleConfirmationChange = (id, value) => {
    setConfirmationStatusMap((prev) => ({
      ...prev,
      [id]: value, // Set the selected status for the appointment
    }));
  };

  const editConformation = async (listData) => {

    setPastAppointmentData((prev) =>
      prev.map((appointment) =>
        appointment.id === listData?.id ? { ...appointment, confirmed_status: 'Pending', confirmed_bell_icon: 0, it_close_show: true, past_status:listData?.confirmed_status  } : appointment
      )
    );
  }

  const canApprove = userPermissions.includes("Approve/Deny Requests");
  const canCreatServices = userPermissions.includes("Create New Service");
  const canAddShowcase = userPermissions.includes("Add Availability");
  const canUpdateShowcase = userPermissions.includes("Update Availability");
  const canAddRemoveUser = userPermissions.includes("Add/Remove User");
  const canLeadsAndTrack = userPermissions.includes("Lead & Booking Tracking");

  const handleCloseSuggestModal = () => {
    setCheckPastAppointmentModal(true)
    setSuggestShowModal(false);
    setSelectedAppointment(null);
  };

  const handleDecline= (data) => {
    setSelectedAppointment(data);
    setShowDeclineModal(true)
    setCheckPastAppointmentModal(false)
  }

  const handleCloseDeclineModal = () => {
    setCheckPastAppointmentModal(true)
    setShowDeclineModal(false);
    setSelectedAppointment(null);
  };

  const handleConfirmModal = () => {
    setConfirmData()
    setShowConfirmModal(false);
    setCheckPastAppointmentModal(true)
  };

  const handleSaveConfirmation = async (info) => {
    const selectedStatus = confirmationStatusMap[info?.id] ? confirmationStatusMap[info?.id] : 'Confirmed';
    setLoadingStatusMap((prev) => ({ ...prev, [info?.id]: true }));


    try {
      const res = await axiosApiCall.post(API_ROUTER?.DASHBOARD_CONFIRMATION_STATUS_UPDATE, {
        bookingid: info?.id,
        confirmed_status: selectedStatus,
      });
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        if(res?.data?.bookedTimeSlot && res?.data?.bookedTimeSlot.length > 0) {

          const selectedTime = getMatchingSlot(info?.slot_title,res?.data?.bookedTimeSlot)
          if(selectedTime) {
            setSelectedSlot(selectedTime);
          } else {
            setSelectedSlot(res?.data?.bookedTimeSlot[0]);
          }

          setConfirmData(res?.data)
          setCheckPastAppointmentModal(false)
          setShowConfirmModal(true)

        } else {

          checkPendingAppointment();
          setSelectedSlot();
          setConfirmData();
          toaster("Status updated successfully", TOAST_TYPES.SUCCESS);
          setPastAppointmentData((prev) =>
            prev.map((appointment) =>
              appointment.id === info?.id ? { ...appointment, confirmed_status: selectedStatus, confirmed_bell_icon: 0, } : appointment
            )
          );
        }

      }
    } catch (error) {
      // console.error("Error updating confirmation:", error);
    } finally {
      // Reset loading state
      setLoadingStatusMap((prev) => ({ ...prev, [info?.id]: false }));
    }
  };

  const onSubmitForms = async () => {
    setConfirmLoading(true)
    const selectedStatus = 'Confirmed';

    try {
      const res = await axiosApiCall.post(API_ROUTER?.DASHBOARD_CONFIRMATION_STATUS_UPDATE, {
        bookingid: confirmData?.bookingid,
        confirmed_status: selectedStatus,
        finalslot:selectedSlot,
      });
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
          // callSomeFunction()
          checkPendingAppointment()
          handleConfirmModal()
          setSelectedSlot();
          setConfirmData()
          toaster("Status updated successfully", TOAST_TYPES.SUCCESS);
        }
      } catch (error) {
        // console.error("Error updating confirmation:", error);
      } finally {
        setConfirmLoading(false)
        // Reset loading state

      }
  };

  const callSomeFunction = async () => {
    checkPendingAppointment()
  }

  useEffect(() => {
  const handleSocketMessage = async (msg) => {
    // console.log("window.io", msg);
    if (msg.action === "booking_action") {
      callSomeFunction(msg?.message);
    }
  };



  if (window.io) {

    if(login?.employeeType == "spa") {
      window.io.socket.on("serviceprovider", handleSocketMessage);
    } else if (login?.employeeType == "spaemployee") {
      window.io.socket.on("spaemployee", handleSocketMessage);
    }
  }

  // Cleanup the old listener when headDate changes or component unmounts
  return () => {
    if (window.io) {
      if(login?.employeeType == "spa") {
        window.io.socket.off("serviceprovider", handleSocketMessage);
      } else if (login?.employeeType == "spaemployee") {
        window.io.socket.off("spaemployee", handleSocketMessage);
      }

    }
  };
}, [window.io]);
  return (
    <>
    <MainLayoutWrapper>
      <InsightsSitbackLayoutWrapper isNewDashboardInsightsSitbackWrapper={true}>
        <Container>
          <Tab.Container id="left-tabs-example"  activeKey={activeTab} onSelect={(val) => { handleTabChange(val) }} >
            <InsightsDashboardMainTabWrapper>
              <div className="sitback-left-dashboard-sidebar-wrapper">
                <a className="sitback-toggle-close-menu-wrapper" href="javascript:void(0);">
                  <img alt="sitback" src="/images/closeicon.svg" />
                </a>
                <div className="sitback-insights-tab-wrapper">
                  <a href="javascript:void(0);" className="sitback-logo-wrapper" onClick={() => {handleLogoClick()}}>
                    <img alt="sitback" src="/images/sitback-sidebar-logo.svg" />
                  </a>
                  {loading ?
                  <div className="sidebar-main-loader-div">
                   <div className="spinner-border text-info" role="status"></div>
                  </div> : <>

                  <Nav variant="pills">
                    {login?.employeeType == "spa" ?
                      <>
                        <Nav.Item>
                          <Nav.Link eventKey="dfirst" className="appointment-icon-link">
                            <div className="clearfix">
                              <InlineSVG src={AppointMentIcon_icon} className="global_laguage_icon" />
                            </div>
                            {t("appointmentRequestsText")}
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="dthird">
                            <div className="clearfix">
                              <InlineSVG src={AddUpdateIcon_icon} className="global_laguage_icon" />
                            </div>
                            {t("addAndUpdateServices")}
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                          <Nav.Link eventKey="dsecond">
                            <div className="clearfix">
                              <InlineSVG src={ShowCaseIcon_icon} className="global_laguage_icon" />
                            </div>
                            {t("showcaseAppointments")}
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                          <Nav.Link eventKey="dsevanth">
                            <div className="clearfix">
                              <InlineSVG src={AddRemoveUserIcon_icon} className="global_laguage_icon" />
                            </div>
                            {t("addRemoveUser")}
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                          <Nav.Link eventKey="dfourth">
                          <div className="clearfix">
                            <InlineSVG src={AvailabilityIcon_icon} className="global_laguage_icon" />
                          </div>
                            {t("availabilityUpdates")}
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                          <Nav.Link eventKey="dfifth">
                            <div className="clearfix">
                              <InlineSVG src={LeadBookingIcon_icon} className="global_laguage_icon lead-booking-icon" />
                            </div>
                            {t("leadAndBookingTracking")}
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                          <Nav.Link eventKey="deighth">
                            <div className="clearfix">
                              <InlineSVG src={SidebarMessageIcon_icon} className="global_laguage_icon sidebar-msg-icon" />
                            </div>
                            {t("clientMessagingText")}
                            {unreadCount && unreadCount > 0 ? (
                                <span className="unread-msg-count">{unreadCount}</span>
                              ) : (
                                <></>
                              )}
                          </Nav.Link>
                        </Nav.Item>
                        {login?.isOpenVideoFeatureMenu == true &&  (
                        <Nav.Item>
                          <Nav.Link eventKey="dninth">
                            <div className="clearfix">
                              <InlineSVG src={LeadBookingIcon_icon} className="global_laguage_icon lead-booking-icon" />
                            </div>
                            {t("yourUpgradesText")}
                          </Nav.Link>
                        </Nav.Item> )}
                        <Nav.Item>
                          <Nav.Link eventKey="dsixth">
                            <div className="clearfix">
                              <InlineSVG src={UpgradePlanIcon_icon} className="global_laguage_icon" />
                            </div>
                            {t("upgradePlan")}
                          </Nav.Link>
                        </Nav.Item>
                      </> :
                      <>
                        {canApprove ?
                          <>
                          <Nav.Item>
                          <Nav.Link eventKey="dfirst" className="appointment-icon-link">
                            <div className="clearfix">
                              <InlineSVG src={AppointMentIcon_icon} className="global_laguage_icon" />
                            </div>
                            {t("appointmentRequestsText")}
                          </Nav.Link>
                          </Nav.Item>
                          </> : <></> }
                        {canCreatServices ? <>
                        <Nav.Item>
                          <Nav.Link eventKey="dthird">
                            <div className="clearfix">
                              <InlineSVG src={AddUpdateIcon_icon} className="global_laguage_icon" />
                            </div>
                            {t("addAndUpdateServices")}
                          </Nav.Link>
                        </Nav.Item>
                          </> : <></> }
                        {canAddShowcase ? <>
                        <Nav.Item>
                          <Nav.Link eventKey="dsecond">
                            <div className="clearfix">
                              <InlineSVG src={ShowCaseIcon_icon} className="global_laguage_icon" />
                            </div>
                            {t("showcaseAppointments")}
                          </Nav.Link>
                        </Nav.Item>
                        </> : <></> }
                        {canAddRemoveUser ? <>
                          <Nav.Item>
                            <Nav.Link eventKey="dsevanth">
                              <div className="clearfix">
                                <InlineSVG src={AddRemoveUserIcon_icon} className="global_laguage_icon" />
                              </div>
                              {t("addRemoveUser")}
                            </Nav.Link>
                          </Nav.Item>
                        </> : <></> }
                          {canUpdateShowcase ? <>
                        <Nav.Item>
                          <Nav.Link eventKey="dfourth">
                          <div className="clearfix">
                            <InlineSVG src={AvailabilityIcon_icon} className="global_laguage_icon" />
                          </div>
                            {t("availabilityUpdates")}
                          </Nav.Link>
                        </Nav.Item>
                        </> : <></> }
                          {canLeadsAndTrack ? <>
                        <Nav.Item>
                          <Nav.Link eventKey="dfifth">
                            <div className="clearfix">
                              <InlineSVG src={LeadBookingIcon_icon} className="global_laguage_icon lead-booking-icon" />
                            </div>
                            {t("leadAndBookingTracking")}
                          </Nav.Link>
                        </Nav.Item>
                        </> : <></> }


                      </>
                    }
                  </Nav>
                  </>}
                </div>
                 <div className="sitback-logout-div" onClick={() => !isLoggingOut && leave_room()}>
                  <a className="logout-link" href="javascript:void(0);" style={{ pointerEvents: isLoggingOut ? 'none' : 'auto' }}>
                    <InlineSVG src={LogOutIcon_icon} className="global_laguage_icon" />
                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                  </a>
                </div>
              </div>
              <div className="sitback-right-dashboard-display-div">
                <DashBoardHeader />
                {loading ?
                <>

                </> : <>
                <Tab.Content>
                 <Tab.Pane eventKey="dfirst">
                    {activeTab === 'dfirst' && <Appointment />}
                  </Tab.Pane>
                  <Tab.Pane eventKey="dthird">
                    {activeTab === 'dthird' && <Addservices />}
                  </Tab.Pane>
                  <Tab.Pane eventKey="dsecond">
                    {activeTab === 'dsecond' && <Showcase />}
                  </Tab.Pane>
                  <Tab.Pane eventKey="dfourth">
                    {activeTab === 'dfourth' && <AvailabilityUpdates />}
                  </Tab.Pane>
                  <Tab.Pane eventKey="dfifth">
                    {activeTab === 'dfifth' && <Leads/>}
                  </Tab.Pane>
                  <Tab.Pane eventKey="dsixth">
                    {activeTab === 'dsixth' && <UpgradePlan/>}
                  </Tab.Pane>
                  <Tab.Pane eventKey="deighth">
                    <Messages setUnreadCount={setUnreadCount} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="dsevanth">
                    {activeTab === 'dsevanth' && <AddRemoveUser/>}
                  </Tab.Pane>

                  <Tab.Pane eventKey="dninth">
                    {activeTab === 'dninth' && <VideoUpload/>}
                  </Tab.Pane>


                </Tab.Content>
                </>}
              </div>
            </InsightsDashboardMainTabWrapper>
          </Tab.Container>
        </Container>
      </InsightsSitbackLayoutWrapper>
    </MainLayoutWrapper>
        <Modal
          show={checkUserDetailModal}
          aria-labelledby="example-modal-sizes-title-lg"
          centered
          className="sitback-modal-wrapper warning-modal-wrapper"
        >
          <Modal.Body>
            <div className="sitback-request-modal-wrapper">
              <h5>{t('warning')}</h5>
              <p>{t("youNeedToAddSpaModelText")}</p>
              <span onClick={() => goToPage()}>{t("addSpaDetails")}</span>
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          show={isSpaDeny}
          aria-labelledby="example-modal-sizes-title-lg"
          centered
          className="sitback-modal-wrapper warning-modal-wrapper"
        >
          <Modal.Body>
            <div className="sitback-request-modal-wrapper">
              <h5>{t('warning')}</h5>
              <p>{t("spaRestrictedByAdminText")}</p>
              <Button className="support-spa-btn" onClick={() => !isLoggingOut && leave_room()}>{t("ok")}</Button>

            </div>
          </Modal.Body>
        </Modal>

        <Modal
          show={checkSubcriptionModal}
          aria-labelledby="example-modal-sizes-title-lg"
          centered
          className="sitback-modal-wrapper warning-modal-wrapper"
        >
          <Modal.Body>
            <div className="sitback-request-modal-wrapper">
              <h5>{t('warning')}</h5>
              <p>{t("unlockSpaDashboardFeaturesText")}</p>
              <span onClick={() => goToPages()}>{t('purchaseSubscription')}</span>
            </div>
          </Modal.Body>
        </Modal>

         <Modal
          show={checkPastAppointmentModal}
          aria-labelledby="example-modal-sizes-title-lg"
          centered
          className="sitback-modal-wrapper warning-modal-wrapper sitback-appointment-table-modal-display-wrapper"
        >
          <Modal.Body>
            <div className="appointment-header-div">
                  <h4>{t('wait')}</h4>
                  <p>{t('PleaseUpdateAppointmentYesterdayText')}</p>
            </div>
            <div className="appointment-modal-table-div">
              <Table responsive striped>
                <tbody>
                    {pastAppointmentData.length > 0 ? (
                  pastAppointmentData.map((appointment) => (
                    <tr key={appointment.id} className={appointment?.confirmed_bell_icon ? 'notification-tr-display-wrapper' : ''}>
                      <td>
                        <p className="appointment-name-text">{appointment.username}</p>
                        <p className="mobile-number-text">{appointment?.countrycode} {appointment?.phone}</p>
                      </td>
                      <td>
                        <span className={`appointment-status ${appointment.status.charAt(0).toLowerCase() + appointment.status.slice(1)}`}>
                          {appointment?.status}
                        </span>
                      </td>
                      <td>
                        {appointment?.confirmed_bell_icon ?
                        <div className="notification-icon-wrapper">
                          <img alt="sitback" src="/images/notification-icon-ring-transparent.gif" />
                        </div>
                      : <></>}
                      </td>
                      <td>{moment(appointment?.date).format('DD MMMM YYYY')}</td>
                      <td>{appointment.slot_title}</td>
                      <td>{appointment.servicename}</td>

                      <td>
                        <div className="appoint-table-btn-div">
                          <div className="appointment-status-active-div">
                            <span className={`declined ${appointment.status === "Rejected" ? "" : "d-none"}`}>Declined</span>
                                {appointment.status === "Approved" && appointment.confirmed_status === "Pending" ?  (
                                  <div className="confirmation-select-wrapper">
                                    <Form.Select
                                      value={confirmationStatusMap[appointment.id] || ""}
                                      onChange={(e) => handleConfirmationChange(appointment.id, e.target.value)}
                                      className="confirmation-dropdown"
                                    >
                                      <option value="Confirmed" selected>{t("confirmText")}</option>
                                      <option value="Not Confirmed">{t("notConfirmText")}</option>
                                    </Form.Select>
                                    <Button
                                      variant="primary"
                                      size="sm"
                                      className="save-btn"
                                      onClick={() => handleSaveConfirmation(appointment)}
                                      disabled={loadingStatusMap[appointment.id]} // Disable if loading
                                    >
                                      {loadingStatusMap[appointment.id] ? "Saving..." : "Save"} {/* Change text while loading */}
                                    </Button>
                                  </div>
                                ) : <></>}


                                {appointment.status === "Approved" && appointment.confirmed_status === "Confirmed" ?  (
                                  <>
                                  <span className={`accepted ${appointment.status === "Approved" ? "" : "d-none"}`}>{t("confirmedText")}</span>
                                  {appointment?.isEditButton == 1 ?
                                  <Button onClick={() => editConformation(appointment)} className="edit-remove-btn-wrapper edit-pencil-icon">
                                    <img alt="sitback" src="/images/pencil-edit-icon.svg"/>
                                  </Button> : ''}
                                  </>
                                ): <></>}

                                {appointment.status === "Approved" && appointment.confirmed_status === "Not Confirmed" ? (
                                  <>
                                  <span className="declined not-confirmed-span-wrapper" >{t("notConfirmText")}</span>
                                  {appointment?.isEditButton == 1 ?
                                  <Button onClick={() => editConformation(appointment)} className="edit-remove-btn-wrapper edit-pencil-icon">
                                    <img alt="sitback" src="/images/pencil-edit-icon.svg"/>
                                  </Button> : ''}
                                  </>
                                ) : <></>}

                            <span className={`declined ${appointment.status === "Pastbooking" ? "" : "d-none"}`}>{t('expired')}</span>
                          </div>
                          {appointment.status === "Pending" && (
                            <>
                              {/* <button
                                onClick={() => handleAccept(appointment, 'Approved')}
                                className="btn-wrapper"
                              >
                                Accept
                              </button> */}
                              <div className={`accept-decline-icon-btn-div ${appointment.slot_id != null ? 'decline-btn-display-div' : 'decline-btn-display-div'}`}>

                                {appointment.slot_id != null ?
                                <>
                                {/* <a href="javascript:void(0);" className="accept-btn" onClick={() => handleAccept(appointment, 'Approved')}>
                                  <img alt="sitback" src="/images/accept-user-icon.svg" />
                                </a> */}
                                <a href="javascript:void(0);" className="decline-btn">
                                  <img alt="sitback" src="/images/decline-user-icon.svg" onClick={() => handleDecline(appointment, 'Rejected')} />
                                </a>
                                </> : <>  <a href="javascript:void(0);" className="decline-btn">
                                  <img alt="sitback" src="/images/decline-user-icon.svg" onClick={() => handleDecline(appointment, 'Rejected')} />
                                </a> </> }

                              </div>
                              {/* <a href="javascript:void(0)" onClick={() => handleDecline(appointment, 'Rejected')} className="btn-wrapper declined">Decline</a> */}

                              {/* <a href="javascript:void(0)"  className="btn-wrapper suggest-btn" onClick={() => handleAcceptDateGet(appointment, 'Approved')}>{t("suggest")}</a> */}



                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  !loadingPastData && (
                    <tr>
                      <td colSpan="6" className="text-center">
                        <p className="not-found-text-wrapper">{t("noAppointmentRequestText")}</p>
                      </td>
                    </tr>
                  )
                )}
                </tbody>
              </Table>
            </div>
          </Modal.Body>
        </Modal>

        <CustomModal
        show={showConfirmModal}
        onHide={() => handleConfirmModal()}
        aria-labelledby="delete-confirmation-modal"
        centered
        className="sitback-modal-wrapper sitback-edit-service-modal-wrapper sitback-modalv2-wrapper sitback-approve-req-modal-wrapper"
      >
        <Modal.Header closeButton className="red-close-icon">
          <Modal.Title>
            {t('slotConfirmation')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SitBackModalBodyWrapper>
            <p className="sit-date-data-wrapper">{t('date')}: <span>{moment(confirmData?.new_date).format('DD MMM YYYY')}</span></p>
          <Form onSubmit={handleSubmit(onSubmitForms)} className="sit-req-form-wrapper sit-approve-slot-display-div">
              <div className="slot-selection">
                  {confirmData && confirmData?.bookedTimeSlot.map((slot, index) => (
                    <div key={index} className="slot-option">
                    <Form.Check
                      type="radio"
                      id={`slot-${index}`}
                      name="timeSlot"
                      value={slot}
                      label={slot}
                      checked={selectedSlot === slot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      custom
                    />
                  </div>
                  ))}
              </div>
              <div className="approve-btn-modal-wrapper">
                <Button type="submit" className="submit-btn" disabled={confirmLoading} >{t('confirmText')}</Button>
              </div>
          </Form>
            </SitBackModalBodyWrapper>

        </Modal.Body>
        </CustomModal>

         <SuggestPastRequestModal
          show={showSuggestModal}
          handleClose={() => handleCloseSuggestModal()}
          data = {selectedAppointment}
          setItems = {setPastAppointmentData}
          checkPendingAppointment = {() => checkPendingAppointment()}
        />
        <PastRequestDeclineModal
          show={showDeclineModal}
          handleClose={() => handleCloseDeclineModal()}
          data = {selectedAppointment}
          setItems ={setPastAppointmentData}
          checkPendingAppointment = {() => checkPendingAppointment()}
        />
    </>
  );
}
