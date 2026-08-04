"use client";

import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import DashBoardHeader from "@/components/dashboardheader/page";
import Loader from "@/components/shared/spinner/loader";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector, loginDetail, setdeviceTokens } from "@/redux/authCheck";
import { chatHandle, dtabHandle, messageTabHandle } from "@/redux/messageTab";
import { NEW_DASHBOARD_PATH, PATH_AUTH, PATH_DASHBOARD } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, Image, MainLayoutWrapper } from "@/styles/global/main.style";
import { ProfileServicesLayoutWrapper, } from "@/styles/pages/profile.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { removeCookie } from "@/utils/cookie";

export default function ProfileServices() {
  //hooks
  const { toaster } = useToaster();
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("notification");
  const { login,deviceTokens} = useSelector(authCheckSliceSelector);
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [notificationPage, setNotificationPage] = useState(1);
  const [pageNotificationResponse, setNotificationPageResponse] = useState(null);

  const [msgPage, setMsgPage] = useState(1);
  const [pageMessageResponse, setMessagePageResponse] = useState(null);

  // const messageObj = useMemo(() => {
  //   if (notifications?.length > 0) {
  //     return Object.groupBy(notifications, ({ createdAt }) => {
  //       const setDate = moment(new Date(createdAt));
  //       if (setDate.isSame(moment(), "day")) {
  //         return "aToday";
  //       } else if (setDate.isSame(moment().subtract(1, "days"), "day")) {
  //         return `bYesterday, ${moment((createdAt)).format("DD MMMM YYYY")}`;
  //       } else {
  //         return `c${moment((createdAt)).format("DD MMMM YYYY")}`;
  //       }
  //     });
  //   } else {
  //     return null;
  //   }
  // }, [notifications]);

  // const chatObj = useMemo(() => {
  //   if (messages?.length > 0) {
  //     return Object.groupBy(messages, ({ createdAt }) => {
  //       const setDate = moment(new Date(createdAt));
  //       if (setDate.isSame(moment(), "day")) {
  //         return "aToday";
  //       } else if (setDate.isSame(moment().subtract(1, "days"), "day")) {
  //         return `bYesterday, ${moment((createdAt)).format("DD MMMM YYYY")}`;
  //       } else {
  //         return `c${moment((createdAt)).format("DD MMMM YYYY")}`;
  //       }
  //     });
  //   } else {
  //     return null;
  //   }
  // }, [messages]);

   const groupBy = (array, keyGetter) => {
  const map = new Map();
  array.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return Object.fromEntries(map);
};

  const messageObj = useMemo(() => {
  if (notifications?.length > 0) {
    return groupBy(notifications, ({ createdAt }) => {
      const setDate = moment(new Date(createdAt));
      if (setDate.isSame(moment(), "day")) {
        return "aToday";
      } else if (setDate.isSame(moment().subtract(1, "days"), "day")) {
        return `bYesterday, ${moment(createdAt).format("DD MMMM YYYY")}`;
      } else {
        return `c${moment(createdAt).format("DD MMMM YYYY")}`;
      }
    });
  } else {
    return null;
  }
}, [notifications]);

  const chatObj = useMemo(() => {
  if (messages && messages.length > 0) {
    return groupBy(messages, ({ createdAt }) => {
      const setDate = moment(new Date(createdAt));
      if (setDate.isSame(moment(), "day")) {
        return "aToday";
      } else if (setDate.isSame(moment().subtract(1, "days"), "day")) {
        return `bYesterday, ${moment(createdAt).format("DD MMMM YYYY")}`;
      } else {
        return `c${moment(createdAt).format("DD MMMM YYYY")}`;
      }
    });
  } else {
    return null;
  }
}, [messages]);

  useEffect(() => {
    getNotification(1);
    getMessage(1);
    getProfileInfo();
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

  useEffect(() => {

    if (window.io) {
      if (window?.location?.pathname.includes("notifications")) {
        window.io.socket.on("serviceprovider", async (msg) => {
          if (msg.action == "new_booking_from_user" || msg.action == "new_booking_from_quick" || msg.action == "new_review_from_user") {
            getNotification(1);
          }
          getMessage(1);
        });
      }
    }
  }, [window.io]);

  const getProfileInfo = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.GET_DETAILS);
      if (!res?.status) {
        return res;
      } else {
        dispatch(loginDetail(res?.data?.data));
        if (res?.data?.data.isBlocked) {
          //push(PATH_DASHBOARD?.serviceProvider);
        }
        if (res?.data?.data?.isSubscribe == 1) {
          if (res?.data?.data.planData?.status == "canceled") {
            push(PATH_DASHBOARD?.subscriptions);
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
      } else {
        try {
           const res = await axiosApiCall.post(API_ROUTER?.LOGOUT, { id: login?.id,employeeType: login?.employeeType,deviceToken:deviceTokens });
          if (!res?.status) {
            return toaster(res?.message, TOAST_TYPES.ERROR);
          } else {
            dispatch(setdeviceTokens(null));
            removeCookie("token");
            localStorage.clear();
            push(PATH_AUTH?.signIn);
            window.location.reload();
            return res;
          }
        } catch (error) {
          toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
        }
      }
    } catch (error) {
      return error;
    }
  };

  const getNotification = async (page = 1) => {
    try {
      if (window?.location?.pathname.includes("notification")) {
        setLoading(true);
        const params = {
          page : page,
          limit: 10
        }
        const res = await axiosApiCall.post(API_ROUTER?.NOTIFICATION_LIST,params);
        if (!res?.status) {
          return toaster(res?.message, TOAST_TYPES.ERROR);
        } else {
          let data = [];
          res?.data?.data.map((d) => {
            if (d?.notification_type == "Reviewreplyaddedbyuser") {
              if (Object?.keys(d?.userdata).length && Object?.keys(d?.reviewdata).length) {
                data.push({ ...d });
              }
            }
            if (d?.notification_type == "Reviewaddedbyuser") {
              if (Object?.keys(d?.userdata).length && Object?.keys(d?.reviewdata).length) {
                data.push({ ...d });
              }
            }
            if (d?.notification_type == "Bookappointmentbyuser") {
              if (d?.userdata && Object?.keys(d?.userdata).length && d?.bookappoinment && Object?.keys(d?.bookappoinment).length) {
                data.push({ ...d });
              }
            }
            if (d?.notification_type == "Bookappointmentbyspa") {
              if (d?.userdata && Object?.keys(d?.userdata).length && d?.bookappoinment && Object?.keys(d?.bookappoinment).length) {
                data.push({ ...d });
              }
            }
            if (d?.notification_type == "Cancelappointmentbyuser") {
              if (d?.userdata && Object?.keys(d?.userdata).length && d?.bookappoinment && Object?.keys(d?.bookappoinment).length) {
                data.push({ ...d });
              }
            }
            if (d?.notification_type == "Cancelguestappointmentbyuser") {
              if (d?.userdata && Object?.keys(d?.userdata).length && d?.bookappoinment && Object?.keys(d?.bookappoinment).length) {
                data.push({ ...d });
              }
            }
            if (d?.notification_type == "Cancellationchargealertmainuser") {
              data.push({ ...d });
            }
            if (d?.notification_type == "Cancellationchargealertguest") {
              data.push({ ...d });
            }
            if (d?.notification_type == "Bookguestappointmentbyspa") {
              if (d?.userdata && Object?.keys(d?.userdata).length && d?.bookappoinment && Object?.keys(d?.bookappoinment).length) {
                data.push({ ...d });
              }
            }
            if (d?.notification_type == "Bookguestappointmentbyuser") {
              if (d?.userdata && Object?.keys(d?.userdata).length && d?.bookappoinment && Object?.keys(d?.bookappoinment).length) {
                data.push({ ...d });
              }
            }
            if (d?.notification_type == "cashPaymentMainAdminCharge") {
              data.push({ ...d });
            }
             if (d?.notification_type == "Bookingconfirmedbyuser") {
              data.push({ ...d });
            }


            return d;
          });

          const newnotiData = data;

          setNotifications((prevData) => (page == 1 ? newnotiData : [...prevData, ...newnotiData]));
          setNotificationPageResponse(res?.data);

          // setNotifications(data);
          getProfileInfo();
          // toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        }
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const getMessage = async (page = 1) => {
    const params = {
      page: page,
      search: "",
      limit:3
    };
    try {
      const res = await axiosApiCall.post(API_ROUTER?.USER_CHAT_LIST, params);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        const newmsgData = res?.data?.data;
        setMessages((prevData) => (page == 1 ? newmsgData : [...prevData, ...newmsgData]));
        setMessagePageResponse(res?.data);
        // setMessages(res.data.data);
        // toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleRedirect = (msg) => {
    dispatch(dtabHandle("deighth"));
    dispatch(messageTabHandle("second"));
    dispatch(chatHandle(msg));
    push(NEW_DASHBOARD_PATH?.dashboard)
  };

  function convertTimestampToHourMinute(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  const handleNextNotification = async () => {
    setNotificationPage((prev) => prev + 1);
    setNotificationPageResponse(null);
    if (pageNotificationResponse?.isNextPage) {
      await getNotification(notificationPage + 1);
    }
  };

  const handleNextMessage = async () => {
    setMsgPage((prev) => prev + 1);
    setMessagePageResponse(null);
    if (pageMessageResponse?.isNextPage) {
      await getMessage(msgPage + 1);
    }
  };

  // console.log("messageObj",messageObj);

  return (
    <>
     <MainLayoutWrapper>
            <ProfileServicesLayoutWrapper isDashboardProfileServiceLayoutWrapper={true}>
              <Container>
                <DashBoardHeader />
                <div className="sitback-updated-notification-div">
                  <div className="sitback-notification-header">
                    <h5>{t('notification')}</h5>
                    <div className="sitback-general-messages-btns">
                      <Button
                        onClick={() => handleTabClick("notification")}
                        isActive={activeTab === "notification"}
                        isBorderBtn={activeTab !== "notification"}
                      >
                        {t('notification')}
                      </Button>
                      {(login?.employeeType == "spa") ?
                      <>
                      <Button
                        onClick={() => handleTabClick("message")}
                        isActive={activeTab === "message"}
                        isBorderBtn={activeTab !== "message"}
                      >
                        {t('messages')}
                      </Button>
                      </> : <></>}
                    </div>
                  </div>
                  <div className="sitback-notification-wrapper">
                    {/* <Loader loading={loading} /> */}
                    {activeTab === "notification" && (
                      <div className="sitback-notification-list-wrapper">
                        <InfiniteScroll
                          className="pageScroll"
                          dataLength={notifications?.length || 0}
                          next={() => handleNextNotification()}
                          hasMore={pageNotificationResponse?.isNextPage || false}
                          loader={<div style={{ visibility: "hidden" }}>{t('done')}</div>}
                          height={600}
                          scrollableTarget= "sitback-notification-list-wrapper"
                        >
                          {loading && pageNotificationResponse === 1 ? <Loader loading={loading} /> :messageObj &&
                            Object.keys(messageObj).map((key, index) => (
                              <div key={index}>
                                <h6>{key.substring(1)}</h6>
                                {messageObj[key] &&
                                  messageObj[key]?.length > 0 &&
                                  messageObj[key]?.map((notification) => {
                                    return <div className="sitback-notification-list" key={notification?.id}>
                                      {notification?.notification_type ==
                                        "Bookappointmentbyuser" && (
                                          <>
                                            {notification?.bookappoinment?.guestcount != 0 ?
                                              <>
                                                {/* <p>{`${notification?.userdata?.username} has booked appointment for ${notification?.bookappoinment?.servicename
                                                  } using mobile app.`}
                                                </p> */}
                                                 <div className="notification-detail-desc-text">
                                                  <p className="notification-title-text">{notification?.title}</p>
                                                  <p className="notification-desc-text">{notification?.body}</p>
                                                </div>
                                              </> :
                                              <>
                                                {/* <p>{`${notification?.userdata?.username} has booked appointment for ${notification?.bookappoinment?.servicename
                                                  } using mobile app.`}
                                                </p> */}
                                                 <div className="notification-detail-desc-text">
                                                  <p className="notification-title-text">{notification?.title}</p>
                                                  <p className="notification-desc-text">{notification?.body}</p>
                                                </div>
                                              </>}
                                            <span>
                                              {convertTimestampToHourMinute(notification?.createdAt)}
                                            </span>
                                          </>
                                        )}
                                      {notification?.notification_type ==
                                        "Bookappointmentbyspa" && (
                                          <>

                                            {notification?.bookappoinment?.guestcount != 0 ?
                                              <>
                                                 <div className="notification-detail-desc-text">
                                                  <p className="notification-title-text">{notification?.title}</p>
                                                  <p className="notification-desc-text">{notification?.body}</p>
                                                </div>
                                                {/* <p>{`${notification?.userdata?.username} has booked appointment for ${notification?.bookappoinment?.servicename
                                                  } using scheduler.`}
                                                </p> */}
                                              </> :
                                              <>
                                               <div className="notification-detail-desc-text">
                                                <p className="notification-title-text">{notification?.title}</p>
                                                <p className="notification-desc-text">{notification?.body}</p>
                                               </div>
                                                {/* <p>{`${notification?.userdata?.username} has booked appointment for ${notification?.bookappoinment?.servicename
                                                  } using  ${notification?.bookappoinment?.bookingtype == "bookingbyspa" ? "walk in" : "scheduler"}.`}
                                                </p> */}
                                              </>}
                                            <span>
                                              {convertTimestampToHourMinute(notification?.createdAt)}
                                            </span>
                                          </>
                                        )}
                                      {notification?.notification_type ==
                                        "Reviewaddedbyuser" && (
                                          <>
                                            {/* <p>{`${notification?.userdata?.username} Added review.`}</p> */}
                                             <div className="notification-detail-desc-text">
                                                <p className="notification-title-text">{notification?.title}</p>
                                                <p className="notification-desc-text">{notification?.body}</p>
                                               </div>
                                            <span>
                                              {convertTimestampToHourMinute(notification?.createdAt)}
                                            </span>
                                          </>
                                        )}
                                      {notification?.notification_type ==
                                        "Reviewreplyaddedbyuser" && (
                                          <>
                                            {/* <p>{`${notification?.userdata?.username} Added review reply.`}</p> */}
                                             <div className="notification-detail-desc-text">
                                                <p className="notification-title-text">{notification?.title}</p>
                                                <p className="notification-desc-text">{notification?.body}</p>
                                               </div>
                                            <span>
                                              {convertTimestampToHourMinute(notification?.createdAt)}
                                            </span>
                                          </>
                                        )}
                                      {notification?.notification_type ==
                                        "Cancelappointmentbyuser" && (
                                          <>
                                            <p>{`${notification?.userdata?.username} has cancelled the appointment.`}</p>
                                            <span>
                                              {convertTimestampToHourMinute(notification?.createdAt)}
                                            </span>
                                          </>
                                        )}
                                      {notification?.notification_type ==
                                        "Cancelguestappointmentbyuser" && (
                                          <>
                                            <p>{`${notification?.userdata?.username} has cancelled ${notification?.bookappoinment?.servicename} for the guest appointment.`}</p>
                                            <span>
                                              {convertTimestampToHourMinute(notification?.createdAt)}
                                            </span>
                                          </>
                                        )}
                                      {notification?.notification_type ==
                                        "Cancellationchargealertmainuser" && (
                                          <>
                                            <p>{notification?.msg}</p>
                                            <span>
                                              {convertTimestampToHourMinute(notification?.createdAt)}
                                            </span>
                                          </>
                                        )}
                                      {notification?.notification_type ==
                                        "Cancellationchargealertguest" && (
                                          <>
                                            <p>{notification?.msg}</p>
                                            <span>
                                              {convertTimestampToHourMinute(notification?.createdAt)}
                                            </span>
                                          </>
                                        )}
                                        {notification?.notification_type ==
                                        "cashPaymentMainAdminCharge" && (
                                          <>
                                            <p>{notification?.msg}</p>
                                            <span>
                                              {convertTimestampToHourMinute(notification?.createdAt)}
                                            </span>
                                          </>
                                        )}
                                        {notification?.notification_type ==
                                        "Bookingconfirmedbyuser" && (
                                          <>
                                             <div className="notification-detail-desc-text">
                                                <p className="notification-title-text">{notification?.title}</p>
                                                <p className="notification-desc-text">{notification?.body}</p>
                                               </div>

                                            <span>
                                              {convertTimestampToHourMinute(notification?.createdAt)}
                                            </span>
                                          </>
                                        )}
                                      {notification?.notification_type ==
                                        "Bookguestappointmentbyuser" && (
                                          <>
                                              <p>{`${notification?.userdata?.username} has booked appointment for ${notification?.bookappoinment?.servicename
                                                  } as a guest using mobile app.`}
                                                </p>
                                            <span>
                                              {convertTimestampToHourMinute(notification?.createdAt)}
                                            </span>
                                          </>
                                        )}
                                        {notification?.notification_type ==
                                        "Bookguestappointmentbyspa" && (
                                          <>

                                            {notification?.bookappoinment?.guestcount != 0 ?
                                              <>
                                                <p>{`${notification?.userdata?.username} has booked appointment for ${notification?.bookappoinment?.servicename
                                                  } as a guest using ${notification?.bookappoinment?.bookingtype == "bookingbyspa" ? "walk in" : "scheduler"}.`}
                                                </p>
                                              </> :
                                              <>
                                                <p>{`${notification?.userdata?.username} has booked ${notification?.bookappoinment?.servicename
                                                  } the appointment using scheduler.`}
                                                </p>
                                              </>}
                                            <span>
                                              {convertTimestampToHourMinute(notification?.createdAt)}
                                            </span>
                                          </>
                                        )}
                                    </div>
                                  }
                                  )}
                              </div>
                            ))}
                          {pageNotificationResponse?.totalCount === 0 ?
                          <p className="notes-available-text">{t('noRecNotificationAvail')}</p> : null
                      }
                        </InfiniteScroll>
                      </div>
                    )}
                    {activeTab === "message" && (
                      <div className="sitback-notification-list-wrapper">
                        <InfiniteScroll
                          className="pageScroll"
                          dataLength={messages?.length || 0}
                          next={() => handleNextMessage()}
                          hasMore={pageMessageResponse?.isNextPage || false}
                          loader={<div style={{ visibility: "hidden" }}>{t('done')}</div>}
                          height={600}
                          scrollableTarget= "sitback-notification-list-wrapper"
                        >
                        {loading && pageMessageResponse === 1 ? <Loader loading={loading} /> : chatObj && Object.keys(chatObj).map((key, index) => (
                          <div key={index}>
                            <h6>{key.substring(1)}</h6>
                            {chatObj[key].map((message, idx) => (
                              <div
                                className="sitback-notification-list"
                                key={idx}
                                onClick={() => handleRedirect(message)}
                              >
                                <div className="user-details">
                                  <div>
                                    <div className="user-img-wrapper">
                                    <Image
                                      radius={50}
                                      alt="sitback"
                                      src={message?.image}
                                      onError={(e) => {
                                          e.target.src = "/images/profile-img.png";
                                        }}
                                    />
                                    </div>
                                  </div>
                                  <div className="user-detail-wrapper">
                                    <h3>{message.username}</h3>
                                    <p>{message.mediaContent}</p>
                                  </div>
                                </div>
                                <span>{convertTimestampToHourMinute(message?.createdAt)}</span>
                              </div>
                            ))}
                          </div>
                        ))}
                          {pageMessageResponse?.data?.length < 1 ?
                          <p className="notes-available-text">{t('noRecMessagesAvail')}</p> : null}
                        </InfiniteScroll>
                      </div>
                    )}
                  </div>
                </div>
                </Container>
            </ProfileServicesLayoutWrapper>
        </MainLayoutWrapper>
    </>
  );
}
