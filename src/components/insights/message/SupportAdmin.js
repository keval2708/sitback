import EmojiPicker from "emoji-picker-react";
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import InlineSVG from "svg-inline-react";
import ChatReportModal from "../modal/ChatReportModal";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import Loader from "@/components/shared/spinner/loader";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector } from "@/redux/authCheck";
import { messageCheckSliceSelector } from "@/redux/messageTab";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, Image } from "@/styles/global/main.style";
import { QuickChatBoxWrapper } from "@/styles/pages/appointments.style";
import { MessageLayoutWrapper } from "@/styles/pages/insights.style";
import { sendmsg_icon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const SupportAdmin = ({ setUnreadCount }) => {
  //States
  const [messageText, setMessageText] = useState("");
  const [listDetail, setListDetail] = useState({ page: 1, lastChatId: 0 });
  const [chatStatus, setChatStatus] = useState("Offline");
  const [typingStatus, setTypingStatus] = useState(0);
  const [nextpage, setNextPage] = useState();
  const [userList, setUserList] = useState([]);
  const [livestatus, setLiveStatus] = useState();
  //Chat_ServiceModal
  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msgloading, setMsgLoading] = useState(false);
  const [sendMessageClicked, setSendMessageClicked] = useState(false);

  //delete model
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [deleteTarget, setDeleteTarget] = useState(null);

  //Hooks
  const { toaster } = useToaster();
  const { t } = useTranslation();
  const { login } = useSelector(authCheckSliceSelector);
  const { messageTab } = useSelector(messageCheckSliceSelector);
  const chatMessages = useRef([]);
  const chatContainerRef = useRef(null);
  const lastMessageRef = useRef(null);
  const typingStopTimer = useRef(null);

  const createChat = async (textValue) => {
    const text = (textValue || "").trim();
    if (!text || msgloading) return;

    setMsgLoading(true);
    setSendMessageClicked(true);
    setMessageText("");
    setTypingStatus(0);
    if (typingStopTimer.current) {
      clearTimeout(typingStopTimer.current);
      typingStopTimer.current = null;
    }
    await useTypingStatus(0);

    const params = {
      mediaType: "text",
      fromUserId: login?.id,
      userId: 1, //admin_id
      mediaContent: text,
      chatBy: "serviceprovider",
    };

    try {
      const res = await axiosApiCall.post(API_ROUTER?.CREATE_ADMIN_CHAT, params);

      if (!res?.status) {
        toaster(res?.data?.message, TOAST_TYPES.ERROR);
        setMessageText(text);
      } else {
        const newMessage = res?.data?.result;
        chatMessages.current = [...chatMessages.current, newMessage];
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      setMessageText(text);
    } finally {
      setMsgLoading(false);
      setSendMessageClicked(false);
    }
  };

  const readMessageStatusUpdate = async () => {
    const params = {
      fromUserId: login?.id,
    };
    try {
      const res = await axiosApiCall.post(API_ROUTER?.READ_ADMIN_CHAT, params);
      if (!res?.status) {
        return toaster(res?.data?.message, TOAST_TYPES.ERROR);
      } else {
        getUnreadMsg();
        // setMessages(res?.data?.data);
        // toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const useTypingStatus = async (status = typingStatus) => {
    const params = {
      fromUserId: login?.id,
      userId: 1,
      typingStatus: status,
    };
    try {
      const res = await axiosApiCall.post(API_ROUTER?.TYPING_ADMIN_CHAT, params);
      if (!res?.status) {
        return toaster(res?.data?.message, TOAST_TYPES.ERROR);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const getUserChatList = async (searchQuery) => {
    setLoading(true);
    const params = {
      page: 1,
      search: searchQuery,
    };
    try {
      const res = await axiosApiCall.post(API_ROUTER?.ADMIN_USER_CHAT_LIST, params);
      if (!res?.status) {
        return toaster(res?.data?.message, TOAST_TYPES.ERROR);
      } else {
        setUserList(res?.data?.data);
        setChatStatus(res?.data?.data[0]?.userOnStatus || "Offline")
        // setCallSocket(true);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const getChatList = async () => {
    const params = {
      page: listDetail?.page,
      fromUserId: login?.id, //your_id
      userId: 1, //admin_id
      lastChatId: listDetail?.lastChatId,
    };
    try {
      const res = await axiosApiCall.post(API_ROUTER?.LIST_ADMIN_CHAT, params);
      if (!res?.status) {
        return toaster(res?.data?.message, TOAST_TYPES.ERROR);
      } else {
        // setMessages(res?.data?.data);
        setNextPage(res?.data?.isNextPage)
        let msgSort = res?.data?.data?.sort((a, b) => a?.id - b?.id);
        chatMessages.current = [...msgSort, ...chatMessages.current];
        if (res?.data?.isNextPage) {
          setListDetail({
            page: listDetail?.page + 1,
            lastChatId: res?.data?.data[0]?.id,
          });
        } else {
          scrollToBottom();
        }
        readMessageStatusUpdate();
        // toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const deleteChat = async () => {
    const currentTime = moment().format("YYYY-MM-DD HH:mm");
    const params = {
      del_fromUserId: login?.id, //Your_id
      del_userId: 1, //admin_id
      del_fromUserTime: currentTime, //current Time
      del_userTime: currentTime,
    };
    try {
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.DELETE_ADMIN_CHAT, params);
      if (!res?.status) {
        return toaster(res?.data?.message, TOAST_TYPES.ERROR);
      } else {
        getChatList();
        getUserChatList();
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const socketHandler = async (msg) => {
    if (msg.action == "userTyping" || msg.action == "userTypingStoped") {
      return;
    }
    if (msg.action == "message_from_admin_to_spa") {
      chatMessages.current = [...chatMessages.current, msg?.message];
      chatMessages.current = _.uniqBy(chatMessages.current, "id");
      readMessageStatusUpdate();
    }
    await getUserChatList("");
  };

  const scrollToBottom = () => {
    // if (sendMessageClicked && lastMessageRef.current) {
    //   lastMessageRef.current.scrollIntoView({ behavior: "auto", block: "start",inline: 'start' });
    //   setSendMessageClicked(false);
    // }

    // lastMessageRef?.current?.scrollIntoView({ behavior: "auto", block: "start",inline: 'start' });

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }

    // ref.current.scrollTo({
    //   block: "end"
    // });

    // if (ref.current) {
    //   ref.current.scrollTop = ref.current.scrollHeight;
    // }
  };

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

  const handleSubmitButton = (e) => {
    e.preventDefault();
    if (!sendMessageClicked && messageText.trim() !== "") {
      setSendMessageClicked(true);  // Prevent further submissions
      createChat(messageText);
    }
  };

  useLayoutEffect(() => {
    scrollToBottom();
  }, [chatMessages.current, sendMessageClicked]);

  useEffect(() => {
    if (livestatus === 'adminOnline') {
      setChatStatus('Online')
    } else if (livestatus === 'adminOffline') {
      setChatStatus('Offline')
    } else if (livestatus === 'userTyping') {
      setChatStatus("Typing...")
    } else if (livestatus === 'userTypingStoped' || livestatus === 'adminTypingStoped') {
      setChatStatus("Online")
    }
  }, [livestatus, chatStatus]);

  useEffect(() => {
    if (messageTab == 'first') {
      getUserChatList();
      getChatList();
    }
  }, [listDetail, messageTab]);

  const handleTyping = (e) => {
    const value = e.target.value;
    setMessageText(value);

    if (typingStopTimer.current) {
      clearTimeout(typingStopTimer.current);
      typingStopTimer.current = null;
    }

    if (value.trim()) {
      setTypingStatus(1);
      useTypingStatus(1);
      typingStopTimer.current = setTimeout(() => {
        setTypingStatus(0);
        useTypingStatus(0);
      }, 2000);
    } else {
      setTypingStatus(0);
      useTypingStatus(0);
    }
  };

  useEffect(() => {
    return () => {
      if (typingStopTimer.current) {
        clearTimeout(typingStopTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleSocketMessage = async (message) => {
      if (messageTab != "first") return;
      setLiveStatus(message?.action);
      await socketHandler(message);
    };

    const attach = () => {
      if (!window.io?.socket) return;
      window.io.socket.off("serviceprovider", handleSocketMessage);
      window.io.socket.off("message", handleSocketMessage);
      window.io.socket.on("serviceprovider", handleSocketMessage);
      window.io.socket.on("message", handleSocketMessage);
    };

    attach();
    window.addEventListener("sitback-socket-ready", attach);

    return () => {
      window.removeEventListener("sitback-socket-ready", attach);
      window.io?.socket?.off("serviceprovider", handleSocketMessage);
      window.io?.socket?.off("message", handleSocketMessage);
    };
  }, [messageTab]);

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    // setDeleteTarget(null);
  };

  const handleConfirmDelete = async () => {
    handleCloseDeleteModal();
    await deleteChat();
    // if (deleteTarget) {
    //   handleCloseDeleteModal();
    //   await deleteChat(deleteTarget);
    // }
  };
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (event) => {
    setMessageText((prevInput) => prevInput + event.emoji);
    setShowPicker(false);
  };

  //console.log('chatStatus', chatStatus)

  return (
    <>
      <MessageLayoutWrapper className="sitback-updated-message-layout-div">
        <div className="chatinnerbox-wrapper">
          <>
            <QuickChatBoxWrapper className="chat-inner-headerbar mb-0">
              <div className="quick-chat-list-wrapper">
                <div className="userdetailwrapper">
                  <div>
                    <div className="user-img-wrapper">
                      <Image radius={50} alt="sitback" src="https://sitback-media-dev.dryrun.click/serviceprovider-profile/adminLogoUrl.png" />
                    </div>
                  </div>
                  <div className="user-detail-wrapper">
                    <React.Fragment >
                      <h3 >Super User</h3>
                      <p>{chatStatus}</p>
                    </React.Fragment>
                  </div>
                </div>
              </div>
            </QuickChatBoxWrapper>
            <div className="set-chat-body" ref={chatContainerRef}>
              <div className="user-chat-box-body-wrapper">
                {!nextpage ? chatMessages?.current?.map((msg, key) => (
                  <React.Fragment key={key}>
                    {msg?.chatBy === "serviceprovider" ? (
                      <div className="user-chat-box-list right-box" key={key} >
                        <div className="chatbox" ref={key === chatMessages.current.length - 1 ? lastMessageRef : null}>
                          <p> {msg?.mediaContent}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="user-chat-box-list left-box" key={key}>
                        <div className="chatbox">
                          <p>{msg?.mediaContent}</p>
                        </div>
                      </div>
                    )}

                  </React.Fragment>
                )) : <Loader loading={nextpage} />}
              </div>
            </div>
            <Form onSubmit={(e) => handleSubmitButton(e)}>
              <div className="chat-footer-wrapper">
                <div className="input-wrapper">
                  <textarea
                    placeholder="Type messages..."
                    value={messageText}
                    onChange={(e) => handleTyping(e)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (!sendMessageClicked && messageText.trim() !== "") {
                          setSendMessageClicked(true);  // Prevent further submissions
                          createChat(messageText);
                        }
                      }
                    }}
                  />
                  <i className="emoji-smile">
                    <img
                      className="emoji-icon"
                      src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                      onClick={() => setShowPicker((val) => !val)}
                      alt="emoji"
                    />
                  </i>
                </div>
                {showPicker && (
                  <EmojiPicker
                    pickerStyle={{ width: "100%" }}
                    onEmojiClick={(e) => onEmojiClick(e)}
                  />
                )}
                <button
                  type="submit"
                  className="send-icon"
                  disabled={msgloading}
                >
                  <InlineSVG src={sendmsg_icon} className="global_laguage_icon" />
                </button>
              </div>
            </Form>
          </>
        </div>
      </MessageLayoutWrapper>

      <ChatReportModal
        show={smShow}
        onHide={() => setSmShow(false)}
        onConfirm={() => setSmShow(false)}
      />

      <Modal
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
        className="sitback-modal-wrapper sitback-modalv2-wrapper"
      >
        <Modal.Header closeButton className="red-close-icon"></Modal.Header>
        <Modal.Body>
          <div className="sitback-request-modal-wrapper report-submitted-modal-wrapper" style={{ minHeight: "auto" }}>
            <h5>{t('reportSubmit')}</h5>
            <p>{t('reportText1')}</p>
            <Button className="mb-2">{t('done')}</Button>
          </div>
        </Modal.Body>
      </Modal>

      <DeleteModal
        show={showDeleteModal}
        disabled={loading}
        messageBody={
          <>
            <h5>{t('deleteChat')}</h5>
          </>
        }
        handleClose={handleCloseDeleteModal}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
};

export default SupportAdmin;
