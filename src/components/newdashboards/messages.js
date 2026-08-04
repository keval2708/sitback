"use client";
import EmojiPicker from "emoji-picker-react";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown, Tab } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import InlineSVG from "svg-inline-react";
// import SupportAdmin from "./message/SupportAdmin";
// import ChatReportModal from "./modal/ChatReportModal";
// import DeleteModal from "../shared/modal/DeleteModal";
import ChatReportModal from "../insights/modal/ChatReportModal";
import DeleteModal from "../shared/modal/DeleteModal";
import Loader from "../shared/spinner/loader";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector } from "@/redux/authCheck";
import {
  chatHandle,
  messageCheckDashboardSliceSelector,
  messageTabHandle,
} from "@/redux/messageDashboard";
import { PATH_AUTH } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { Image, Input } from "@/styles/global/main.style";
import { QuickChatBoxWrapper } from "@/styles/pages/appointments.style";
import { MessageLayoutWrapper } from "@/styles/pages/insights.style";
import { Search_icon, TimeCircle_icon_small, dots_icon, sendmsg_icon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { removeCookie } from "@/utils/cookie";
import { getSocketId } from "@/utils/helper";

export const Messages = ({ setUnreadCount }) => {
  const { t } = useTranslation();
  const { selectedChat } = useSelector(messageCheckDashboardSliceSelector);
  const { messageTab } = useSelector(messageCheckDashboardSliceSelector);

  //states
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [sending, setSending] = useState(false);
  const [userList, setUserList] = useState([]);
  const activeChat = useRef(selectedChat || null);
  const chatMessages = useRef([]);
  const chatContainerRef = useRef(null);
  const lastSocketActions = useRef(null);
  const [chatStatus, setChatStatus] = useState("offline");
  const [listDetail, setListDetail] = useState({
    page: 1,
    lastChatId: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [typingStatus, setTypingStatus] = useState(0);
  const [nextpage, setNextPage] = useState(null);
  const [isUserBlock, setIsUserBlock] = useState(null);
  const [livestatus, setLiveStatus] = useState();

  //delete model
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [isRead, setIsRead] = useState(false);

  //hooks
  const { toaster } = useToaster();
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { login } = useSelector(authCheckSliceSelector);

  const createChat = async () => {
    if (sending) return; // Prevent duplicate sends
    const socketId = getSocketId();

    setSending(true); // Mark sending as true

    const params = {
      mediaType: "text",
      fromUserId: login?.id,
      userId: activeChat?.current?.usernameID,
      mediaContent: messageText?.trim(),
      chatBy: "serviceprovider",
      socketId: socketId,

    };

    try {
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.CREATE_CHAT, params);
      if (!res?.status) {
        toaster(res?.data?.message, TOAST_TYPES.ERROR);
      } else {
        const newMessage = res?.data?.result;
        chatMessages.current = [...chatMessages.current, newMessage];
        setTypingStatus(0);
        getUserChatList(false);
        setMessageText(""); // Clear input after successful send
        setIsRead(false);
        setSendMessageClicked(false);
      }
    } catch (error) {
      // console.log("1",error);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setSendMessageClicked(false);
      setLoading(false);
      setSending(false); // Reset sending state
    }
  };

  const getChatList = async () => {
    setLoadingChat(true);
    const params = {
      page: listDetail?.page,
      fromUserId: login?.id,
      userId: activeChat?.current?.usernameID,
      lastChatId: listDetail?.lastChatId,
    };
    try {
      const res = await axiosApiCall.post(API_ROUTER?.CHAT_LIST, params);

      if (!res?.status) {
        return toaster(res?.data?.message, TOAST_TYPES.ERROR);
      } else {
        setIsUserBlock(res?.data?.isUserBlocked);
        setNextPage(res?.data?.isNextPage);
        if (res?.data?.data.length > 0) {
          //let msgSort = res?.data?.data?.sort((a, b) => a?.id - b?.id);
          // console.log("msgSort",msgSort);
          let msgSort = res?.data?.data;
          // chatMessages.current = [...msgSort, ...chatMessages.current];
          chatMessages.current = [...chatMessages.current, ...msgSort]
          chatMessages.current = _.uniqBy(chatMessages.current, "id");
          if (res?.data?.isNextPage) {
            setListDetail({
              page: listDetail?.page + 1,
              lastChatId: 0,
            });
          } else {
            setLoadingChat(false);
          }
        } else {
          scrollToBottom();
        }
      }
    } catch (error) {
      // console.log("2",error);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const getUserTyping = async () => {
    if(activeChat?.current?.usernameID == undefined) return;
    const params = {
      fromUserId: login?.id,
      userId: activeChat?.current?.usernameID || "",
      typingStatus: typingStatus,
    };
    try {
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.USER_TYPING, params);
      if (!res?.status) {
        return toaster(res?.data?.message, TOAST_TYPES.ERROR);
      }
    } catch (error) {
      // console.log("3",error);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const getReadMessage = async () => {
    const params = {
      fromUserId: activeChat?.current?.usernameID,
    };
    try {
      const res = await axiosApiCall.post(API_ROUTER?.READ_STATUS, params);
      if (!res?.status) {
        return res;
      } else {
        getUnreadMsg();
        // toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
      }
    } catch (error) {
      return error;
    }
  };

  const getUserChatList = async (load = true) => {
    setLoadingUser(load);
    const params = {
      page: 1,
      search: searchQuery,
      limit: 100,
    };
    try {
      const res = await axiosApiCall.post(API_ROUTER?.USER_CHAT_LIST, params);
      // console.log("res",res);
      if (!res?.status) {
        return toaster(res?.data?.message, TOAST_TYPES.ERROR);
      } else {
        setUserList(res?.data?.data);
      }
    } catch (error) {
      // console.log("4",error);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoadingUser(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const deleteChat = async () => {
    const currentTime = moment().format("YYYY-MM-DD HH:mm");
    const socketId = getSocketId();
    const params = {
      del_fromUserId: login?.id,
      del_userId: activeChat?.current?.usernameID,
      del_fromUserTime: currentTime,
      del_userTime: currentTime,
      socketId: socketId,
    };
    try {
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.DELETE_CHAT, params);
      if (!res?.status) {
        return toaster(res?.data?.message, TOAST_TYPES.ERROR);
      } else {
        activeChat.current = null;
        chatMessages.current = [];
        getChatList();
        getUserChatList(false);
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
      }
    } catch (error) {
      // console.log("5",error);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const getUnreadMsg = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.TOTAL_UNREAD_MSG);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setUnreadCount(res?.data?.count);
      }
    } catch (error) {
      // console.log("6",error);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const handleChatItemClick = (chatId) => {
    dispatch(chatHandle(chatId));
    activeChat.current = chatId;
    setNextPage(null);
    setListDetail({
      page: 1,
      lastChatId: 0,
    });
    chatMessages.current = [];
    getChatList();
    getUserChatList(false);
    getReadMessage();
  };

  const handleChange = (e) => {
    setMessageText(e.target.value);
    if (e.target.value.length > 0) {
      setTypingStatus(1);
    } else {
      setTypingStatus(0);
    }
  };

  const socketHandler = async (msg) => {
      lastSocketActions.current = msg.action; // Track the last action

    if (msg.action == "userReadMsg") {
      if (activeChat?.current) {
        setIsRead(true);
        // if (msg?.message?.fromUserId === activeChat?.current?.userId) {

        // }
      }
    }
    if (msg.action == "message_from_user_side") {

      if (activeChat?.current) {
        if (msg?.message?.fromUserId === parseInt(activeChat?.current?.usernameID)) {
          chatMessages.current = [...chatMessages.current, msg?.message];
        }
        getReadMessage();
      }
      await getUserChatList(false);
    }
    if(msg.action == "userDeleted") {
      if (activeChat?.current) {
        if (parseInt(msg?.message) == parseInt(activeChat?.current?.usernameID)) {
          activeChat.current = null;
          chatMessages.current = [];
        }
        getReadMessage();
      }
      getUnreadMsg()
      await getUserChatList(false);
    }
    if(msg.action == "adminBlockedYou") {
      if (activeChat?.current) {
        if (parseInt(msg?.message) == parseInt(activeChat?.current?.usernameID)) {
          setIsUserBlock(true);
        }
      }
    }
    if(msg.action == "adminUnBlockedYou") {
      if (activeChat?.current) {
        if (parseInt(msg?.message) == parseInt(activeChat?.current?.usernameID)) {
          setIsUserBlock(false);
        }
      }
    }

    if (msg.action == "booking_slot_updated") {
      if (activeChat?.current) {
        if (msg?.message?.fromUserId == activeChat?.current?.usernameID) {
          chatMessages.current = chatMessages.current.map((m) => {
            if (m.id === msg?.message?.id && m.type === "booking") {
              return {
                ...m,
                slot_title: msg?.message?.slot_title,
                date: msg?.message?.date,
                status: msg?.message?.status,
                confirmed_status: msg?.message?.confirmed_status,
              };
            }
            return m;
          });
        }
      }
    }

  };

  const scrollToBottom = () => {
    // if (!ref.current || !ref.current.scrollTop) {
    // ref.current?.scrollIntoView({ block: "end" });
    // }
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
    // ref.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  // // methods
  // const getProfileInfo = async () => {
  //   try {
  //     const res = await axiosApiCall.get(API_ROUTER?.GET_DETAILS);
  //     if (!res?.status) {
  //       return res;
  //     } else {
  //       if (res?.data?.data.isBlocked) {
  //         // dispatch(handleBlock(res?.data?.data.isBlocked));
  //         // push(PATH_DASHBOARD?.serviceProvider);
  //       }
  //       if (res?.data?.data?.isSubscribe == 1) {
  //         if (res?.data?.data.planData?.status == "canceled") {
  //           push(PATH_DASHBOARD?.subscriptions);
  //         }
  //       }
  //       if (res?.data?.data?.isSubscribe == 0) {
  //         push(PATH_DASHBOARD?.subscriptions);
  //       }
  //       if (res?.data?.data?.isSubscribe == 3) {
  //         if (res?.data?.data.planData?.status == "canceled") {
  //           leave_room();
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     // console.log("7",error);
  //     toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
  //   }
  // };

  const leave_room = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.USER_LEAVE_ROOM);
      if (!res?.status) {
        return res;
      } else {
        try {
          const res = await axiosApiCall.post(API_ROUTER?.LOGOUT, { id: login?.id });
          if (!res?.status) {
            return toaster(res?.message, TOAST_TYPES.ERROR);
          } else {
            removeCookie("token");
            localStorage.clear();
            push(PATH_AUTH?.signIn);
            window.location.reload();
            return res;
          }
        } catch (error) {
          // console.log("8",error);
          toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
        }
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
  // Only scroll to bottom if the last action wasn't booking_slot_updated
  if (lastSocketActions.current !== "booking_slot_updated") {
    scrollToBottom();
  }
  // Reset the action tracker
  lastSocketActions.current = "";
}, [chatMessages?.current]);

  useEffect(() => {
    if (messageTab == "second") {
      getUserChatList(true);
    }
  }, [searchQuery, messageTab]);

  useEffect(() => {
    if (messageTab == "second") {
      getUserTyping();
    }
  }, [typingStatus, messageTab]);


  useEffect(() => {
    if (activeChat?.current) {
      getChatList();
    }
  }, [listDetail]);

  useEffect(() => {
    if (activeChat?.current) {
      activeChat.current = selectedChat;
    }
  }, [selectedChat]);

  // useEffect(() => {
  //   if (messageTab == "second") {
  //     getProfileInfo();
  //   }
  // }, [messageTab]);

  useEffect(() => {
    if (window.io) {
      window.io.socket.on("serviceprovider", async (message) => {
        if (messageTab == "second" &&  message?.action != "spa_self_message") {
          setLiveStatus(message);
          await socketHandler(message);
        }


      });
    }
  }, [window.io, messageTab]);

  useEffect(() => {
    if (window.io) {
      window.io.socket.on("serviceprovider", async (message) => {

        if(message?.action == "spa_self_message") {

           const newMessage = message?.message;
           if(newMessage.userId == activeChat?.current?.usernameID) {
             chatMessages.current = [...chatMessages.current, newMessage];
              setTypingStatus(0);
              getUserChatList(false);
              setMessageText(""); // Clear input after successful send
              setIsRead(false);
              setSendMessageClicked(false);
              scrollToBottom();
            } else {
              getUserChatList(false);
            }
        }

      });
    }
  }, [window.io]);

  useEffect(() => {
    if (
      activeChat?.current?.chatBy === "user" &&
      activeChat?.current?.fromUserId === livestatus?.message
    ) {
      if (livestatus?.action === "userOnline") {
        setChatStatus("Online");
      } else if (livestatus?.action === "userOffline") {
        setChatStatus("Offline");
      } else if (livestatus?.action === "userTyping") {
        setChatStatus("Typing...");
      } else if (livestatus?.action === "userTypingStoped") {
        setChatStatus("Online");
      }
    } else {
      setChatStatus(activeChat?.current?.userOnStatus);
    }
  }, [livestatus, activeChat?.current]);

  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (event) => {
    setMessageText((prevInput) => prevInput + event.emoji);
    setShowPicker(false);
  };

  //delete modal
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    handleCloseDeleteModal();
    await deleteChat();
  };

  const handleSendButtonClick = () => {
    if (messageText.trim() !== "" && !sending) {
      createChat();
    }
  };
  const [sendMessageClicked, setSendMessageClicked] = useState(false);

  const handleTabChange = (val) => {
    dispatch(messageTabHandle(val));
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !sending) {
      e.preventDefault();
      if (!sendMessageClicked && messageText.trim() !== "") {
        setSendMessageClicked(true); // Prevent further submissions
        createChat();
      }
    }
  };

  const formatDuration = (hour, minutes) => {
    const totalMin = (hour || 0) * 60 + (minutes || 0);
    return `${totalMin} min`;
  };

  return (
    <>
      <div className="chatbox-wrapper-div dashboard-message-wrapper-div">
        <div className="sitback-supoort-and-user-tab-wrapper">
          <Tab.Container id="left-tabs-example" defaultActiveKey={messageTab}>
            {/* <div className="tab-end-wrapper">
              <Nav variant="pills">
                <Nav.Item onClick={() => handleTabChange("first")}>
                  <Nav.Link eventKey="first">{t("sitbackSup")}</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => handleTabChange("second")}>
                  <Nav.Link eventKey="second" disabled={isBlock}>
                    {t("user")}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div> */}
            <Tab.Content>
              <Tab.Pane eventKey="first">
                {/* <SupportAdmin setUnreadCount={setUnreadCount} /> */}
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <div className="search-input-wrapper">
                  <div className="search-input-icon-wrapper">
                    <Input
                      type="text"
                      placeholder={t('searchUser')}
                      className=""
                      onChange={handleSearchChange}
                      value={searchQuery}
                    />
                    <InlineSVG src={Search_icon} className="global_laguage_icon" />
                  </div>
                </div>
                <MessageLayoutWrapper className="message-updaed-layout">
                  <div className="userlist-boxwrapper">
                    <div className="box-wrapper-div">
                      {loadingUser ? (
                        <div className="user-notfound">
                          <div className="spinner-border text-info" role="status"></div>
                        </div>
                      ) : (
                        userList && userList.length > 0 ? (
                          userList.map((list, key) => (
                            <QuickChatBoxWrapper
                              className={`userlist-wrapper ${
                                activeChat?.current?.usernameID === list?.usernameID ? "active" : ""
                              }`}
                              onClick={() => handleChatItemClick(list)}
                              key={key}
                            >
                              <div className="quick-chat-list-wrapper">
                                <div className="userdetailwrapper">
                                  <div>
                                    <div className="user-img-wrapper">
                                      <Image
                                        radius={50}
                                        alt="sitback"
                                        src={list?.image || "/images/profile-img.png"}
                                        onError={(e) => {
                                          e.target.src = "/images/profile-img.png";
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="user-detail-wrapper">
                                    <h3>{list?.username}</h3>
                                    {isRead || list?.isRead === 1 ? (
                                      <p>{list?.mediaContent}</p>
                                    ) : (
                                      <p>
                                        {list?.chatBy == "serviceprovider" ? (
                                          <>{list?.mediaContent}</>
                                        ) : (
                                          <b>{list?.mediaContent}</b>
                                        )}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="counter-time">
                                <span className="timetext">
                                  {moment(list?.updatedAt).format("hh:mm A")}
                                </span>
                                {list?.currentUserMsgCount !== 0 && (
                                  <div className="unread-msg-count">
                                    <p className="msg-count">{list?.currentUserMsgCount}</p>
                                  </div>
                                )}
                              </div>
                            </QuickChatBoxWrapper>
                          ))
                        ) : (
                          <div className="user-notfound">
                            <p>{t("noUserAvail")}</p>
                          </div>
                        )
                      )}

                    </div>
                  </div>
                  <div className={`chatinnerbox-wrapper ${activeChat ? "active" : ""}`}>
                    {nextpage !== null && activeChat?.current && chatMessages?.current ? (
                      <>
                        <div className="chat-body-top-wrapper">
                          <QuickChatBoxWrapper className="chat-inner-headerbar mb-0">
                            <div className="quick-chat-list-wrapper">
                              <div className="userdetailwrapper">
                                <div>
                                  <div className="user-img-wrapper">
                                    <Image
                                      radius={50}
                                      alt="sitback"
                                      src={
                                        activeChat?.current?.thumb_image || "/images/profile-img.png"
                                      }
                                      onError={(e) => {
                                        e.target.src = "/images/profile-img.png";
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="user-detail-wrapper">
                                  <h3>{activeChat?.current?.username}</h3>
                                  <p className={`${chatStatus == "Offline" ? "offline" : ""}`}>
                                    {chatStatus}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <Dropdown>
                              <Dropdown.Toggle variant="success" id="dropdown-basic">
                                <InlineSVG src={dots_icon} className="global_laguage_icon" />
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item className="bg-white" onClick={setSmShow}> {t("report")}</Dropdown.Item>
                                <Dropdown.Item className="bg-white" onClick={() => handleShowDeleteModal()}>
                                  {t("delete")}
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </QuickChatBoxWrapper>
                          <div className="set-chat-body message" ref={chatContainerRef}>
                            <div className="user-chat-box-body-wrapper">
                               {loadingChat ? (
                                 <Loader loading={true} />
                              ) :
                              <>
                                {chatMessages?.current?.length > 0 &&
                                chatMessages?.current?.map((msg, key) => {
                                  // Track the previous message's timestamp for comparison
                                const nextMsg = chatMessages?.current[key + 1];
                                const showTime = key === chatMessages?.current.length - 1 || (msg?.chatBy !== nextMsg?.chatBy);


                                  return (
                                    <React.Fragment key={key}>
                                      {msg?.chatBy === "serviceprovider" ? (
                                        <div className="user-chat-box-list right-box">
                                          <div className="chatbox">
                                            <p>{msg?.mediaContent}</p>
                                          </div>
                                          {showTime && (
                                            <p className="msg-time-text">
                                              {msg?.createdAt ? moment(msg?.createdAt).fromNow() : ""}
                                            </p>
                                          )}
                                        </div>
                                      ) : (
                                        <div className="user-chat-box-list left-box">
                                          {msg?.type === "booking" ?
                                            <div className="service-booking-box">
                                                <div className="date-row">
                                                  <div>
                                                    <h6>{t('date')}</h6>
                                                    <p className="date-text">{moment(msg?.date).format("MMM D, YYYY")}</p>
                                                    {/* <p className="date-text">Nov 9, 2025</p> */}
                                                  </div>

                                                  <div className="service-time-pill">
                                                    <InlineSVG src={TimeCircle_icon_small} className="time-icon" />
                                                    <span className="time-text">{msg?.slot_title}</span>
                                                  </div>
                                                </div>
                                                <h6>{t('service')}</h6>
                                                <p className="date-text"> {`${msg?.servicename} (${formatDuration(msg?.hour, msg?.minutes)})`}</p>
                                                <p className="mt-3">
                                                  {msg?.status === "Approved" && msg?.confirmed_status === "Not Confirmed" ? (
                                                      <span className="appointment-status rejected">
                                                        {t("notConfirmText")}
                                                      </span>
                                                    ) : msg?.status === "Approved" && msg?.confirmed_status === "Confirmed" ? (
                                                      <span className="appointment-status approved">
                                                        {t("confirmedText")}
                                                      </span>
                                                    ) : (
                                                      <span
                                                        className={`appointment-status ${
                                                          msg.status.charAt(0).toLowerCase() + msg.status.slice(1)
                                                        }`}
                                                      >
                                                        {msg?.status}
                                                      </span>
                                                    )}

                                                </p>

                                            </div> :
                                            <div className="chatbox">
                                              <p>{msg?.mediaContent}</p>
                                            </div>
                                          }

                                          {showTime && (
                                            <p className="msg-time-text">
                                              {msg?.createdAt ? moment(msg?.createdAt).fromNow() : ""}
                                            </p>
                                          )}
                                        </div>
                                      )}
                                    </React.Fragment>
                                  );
                                })}
                                </> }


                            </div>
                          </div>
                        </div>
                        <div className="chat-footer-wrapper">
                          <div className="input-wrapper">
                          <textarea
                              placeholder={isUserBlock ? 'This user has been temporarily suspended by admin team.' : 'Type Your Message....'}
                              value={messageText}
                              disabled={isUserBlock}
                              onChange={(e) => {
                                setMessageText(e.target.value);
                                setTypingStatus(e.target.value.length > 0 ? 1 : 0);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  if (!sendMessageClicked && messageText.trim() !== "") {
                                    setSendMessageClicked(true);  // Prevent further submissions
                                    createChat();
                                  }
                                }
                              }}

                            />
                            <i className="emoji-smile">
                              {!isUserBlock &&
                                <img
                                  className="emoji-icon"
                                  src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                                  onClick={() => setShowPicker((val) => !val)}
                                  alt="emoji"
                                />
                              }
                            </i>

                          </div>

                          {showPicker && (
                            <EmojiPicker
                              pickerStyle={{ width: "100%" }}
                              onEmojiClick={(e) => onEmojiClick(e)}
                            />
                          )}
                          {!isUserBlock &&
                            <button
                              type="button"
                              className="send-icon"
                              disabled={loading || sending} // Disable button during sending
                              onClick={handleSendButtonClick}
                            >
                              <InlineSVG src={sendmsg_icon} className="global_laguage_icon" />
                            </button>
                          }

                        </div>
                      </>
                    ) : (
                      <Loader loading={nextpage === null && activeChat?.current} />
                    )}
                  </div>
                </MessageLayoutWrapper>

                <ChatReportModal
                  show={smShow}
                  onHide={() => setSmShow(false)}
                  onConfirm={() => setSmShow(false)}
                  activeChat={activeChat}
                />

                <DeleteModal
                  show={showDeleteModal}
                  disabled={loading}
                  messageBody={
                    <>
                      <h5>{t("deleteChatMsg")}</h5>
                    </>
                  }
                  handleClose={handleCloseDeleteModal}
                  handleConfirmDelete={handleConfirmDelete}
                />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </>
  );
};
