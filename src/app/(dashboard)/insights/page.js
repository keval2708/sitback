"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import InlineSVG from "svg-inline-react";
import { Analyrtics } from '@/components/insights/Analyrtics';
import { ClientAdd } from "@/components/insights/client/Add";
import { ClientEdit } from "@/components/insights/client/Edit";
import { HistoryList } from "@/components/insights/client/History/HistoryList";
import { ServiceHistoryList } from "@/components/insights/client/History/ServiceHistoryList";
import { ClientList } from "@/components/insights/client/List";
import { AddNote } from "@/components/insights/client/Notes/AddNote";
import { ListNote } from "@/components/insights/client/Notes/ListNote";
import { ReportHome } from "@/components/insights/client/Reports/ReportHome";
import { Message } from '@/components/insights/Message';
import { Payments } from '@/components/insights/Payments';
import { useToaster } from "@/hooks";
import { authCheckSliceSelector, loginDetail } from "@/redux/authCheck";
import { handleRedirect, insightCheckSliceSelector, saveClientData } from "@/redux/insightClient";
import { chatHandle, handleBlock, messageCheckSliceSelector, tabHandle } from "@/redux/messageTab";
import { NEW_DASHBOARD_PATH, PATH_AUTH, PATH_DASHBOARD } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import {
  MainLayoutWrapper,
} from '@/styles/global/main.style';
import {
} from '@/styles/pages/appointments.style';
import {
  InsightsSitbackLayoutWrapper,
} from '@/styles/pages/insights.style';
import {
  AnalyticUpdatedIcon_icon,
  ArrowDown_icon,
  ClientsUpdatedIcon_icon,
  MessageUpdatedIcon_icon,
  PayementUpdatedIcon_icon,
} from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { removeCookie } from "@/utils/cookie";


export default function ProfileServices() {

  //hook
  const { t } = useTranslation();
  const { toaster } = useToaster();
  const { push } = useRouter();
  const dispatch = useDispatch();

  const { activeTab, isBlock, selectedChat } = useSelector(messageCheckSliceSelector);
  const { selectClientPage } = useSelector(insightCheckSliceSelector);
  const { login } = useSelector(authCheckSliceSelector);
  const [unreadCount, setUnreadCount] = useState(null);
  const [show, setShow] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState(login);


  useEffect(() => {
    if (activeTab != 'third') {
      getProfileInfo();
      dispatch(chatHandle(null));
    }
    getUnreadMsg();
  }, [activeTab]);

  useEffect(() => {
    if (activeTab == 'third') {
      if (selectedChat != null) {
        getUnreadMsg();
      }
    }
  }, [activeTab, selectedChat])

  // methods
  const getProfileInfo = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.GET_DETAILS);
      if (!res?.status) {
        return res
      } else {
        dispatch(loginDetail(res?.data?.data));
        setSubscriptionData(res?.data?.data);
        if (res?.data?.data.isBlocked) {
          dispatch(handleBlock(res?.data?.data.isBlocked));
          push(PATH_DASHBOARD?.serviceProvider);
        }
        if (res?.data?.data?.isSubscribe == 1) {
          if (res?.data?.data.planData?.status == 'canceled') {
            push(PATH_DASHBOARD?.subscriptions);
          }
          if (res?.data?.data?.spa_type == "onlydashboard") {
            push(NEW_DASHBOARD_PATH?.dashboard);
          }
        }
        if (res?.data?.data?.isSubscribe == 0) {
          push(PATH_DASHBOARD?.subscriptions);
        }
        if (res?.data?.data?.isSubscribe == 3) {
          if (res?.data?.data.planData?.status == 'canceled') {
            leave_room();
          }
        }
      }
    } catch (error) {
      // return error
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const leave_room = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.USER_LEAVE_ROOM);
      if (!res?.status) {
        return res
      } else {
        try {
          const res = await axiosApiCall.post(API_ROUTER?.LOGOUT, { id: login?.id });
          if (!res?.status) {
            return toaster(res?.message, TOAST_TYPES.ERROR);
          } else {
            removeCookie('token');
            localStorage.clear();
            push(PATH_AUTH?.signIn);
            window.location.reload();
            return res
          }
        } catch (error) {
          toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
        }
      }
    } catch (error) {
      return error
    }
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

  const handleTabChange = (val) => {
    if (!isBlock) {
      dispatch(tabHandle(val));
      dispatch(saveClientData(null));
      dispatch(handleRedirect('list'));
      setShow(false)
    }
  };

  const handleReport = async (val) => {
    if (!isBlock) {
      dispatch(tabHandle(val));
      dispatch(saveClientData(null));
      dispatch(handleRedirect('list'));
      setShow(!show)
    }
  };

  const handleClickReportMenu = async () => {
    dispatch(handleRedirect('client-report'));
  };

  useEffect(() => {
    const handleMsg = async (msg) => {
      if (
        msg.action == "message_from_user_side" ||
        msg.action == "message_from_admin_to_spa" ||
        msg.action == "message_from_service_provider_side"
      ) {
        getUnreadMsg();
      }
    };

    const attach = () => {
      if (!window.io?.socket) return;
      window.io.socket.off("serviceprovider", handleMsg);
      window.io.socket.off("admin", handleMsg);
      window.io.socket.off("message", handleMsg);
      window.io.socket.on("serviceprovider", handleMsg);
      window.io.socket.on("admin", handleMsg);
      window.io.socket.on("message", handleMsg);
    };

    attach();
    window.addEventListener("sitback-socket-ready", attach);
    return () => {
      window.removeEventListener("sitback-socket-ready", attach);
      window.io?.socket?.off("serviceprovider", handleMsg);
      window.io?.socket?.off("admin", handleMsg);
      window.io?.socket?.off("message", handleMsg);
    };
  }, []);

  return (
    <MainLayoutWrapper>
      <InsightsSitbackLayoutWrapper className="sitback-updated-insights-layout-wrapper">
        <Container>
          <Tab.Container id="left-tabs-example" defaultActiveKey={activeTab}>
            <Row>
              <Col md={4} lg={3}>
                <div className="sitback-insights-tab-wrapper">
                  <Nav variant="pills">
                    {subscriptionData?.planData?.plan_id != 1 ? (
                      <Nav.Item onClick={() => handleTabChange("first")}>
                        <Nav.Link eventKey="first" disabled={isBlock}>
                          <InlineSVG src={AnalyticUpdatedIcon_icon} className="global_laguage_icon" />
                          {t("analytics")}
                        </Nav.Link>
                      </Nav.Item>
                    ) : (
                      <></>
                    )}
                    <Nav.Item onClick={() => handleTabChange("second")}>
                      <Nav.Link eventKey="second" disabled={isBlock}>
                        <InlineSVG src={PayementUpdatedIcon_icon} className="global_laguage_icon" />
                        {t("payments")}
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item onClick={() => handleTabChange("third")}>
                      <Nav.Link eventKey="third" disabled={isBlock}>
                        <InlineSVG src={MessageUpdatedIcon_icon} className="global_laguage_icon" />
                        {t("message")}
                        {unreadCount && unreadCount > 0 ? (
                          <span className="unread-msg-count">{unreadCount}</span>
                        ) : (
                          <></>
                        )}
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item className={show ? "client-report" : ""}>
                      <Nav.Link
                        eventKey="forth"
                        onClick={() => handleReport("forth")}
                        disabled={isBlock}
                      >
                        <InlineSVG src={ClientsUpdatedIcon_icon} className="global_laguage_icon" />
                        {t("clients")}
                        <div className="down-andup-arrow">
                          <InlineSVG src={ArrowDown_icon} className="global_laguage_icon" />
                        </div>
                      </Nav.Link>
                      <span className="client-reports-menu" onClick={() => handleClickReportMenu()}>
                        {t("clientReport")}
                      </span>
                    </Nav.Item>
                  </Nav>
                </div>
              </Col>
              <Col md={8} lg={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Analyrtics />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <Payments />
                  </Tab.Pane>

                  <Tab.Pane eventKey="third">
                    <Message setUnreadCount={setUnreadCount} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="forth">
                    {selectClientPage == "list" && <ClientList />}
                    {selectClientPage == "client-add" && <ClientAdd />}
                    {selectClientPage == "client-note-list" && <ListNote />}
                    {selectClientPage == "client-edit" && <ClientEdit />}
                    {selectClientPage == "history-list" && <HistoryList />}
                    {selectClientPage == "serviceHistory-list" && <ServiceHistoryList />}
                    {selectClientPage == "client-note-add" && <AddNote />}
                    {selectClientPage == "client-report" && <ReportHome />}
                  </Tab.Pane>
                  <Tab.Pane eventKey="1">
                    <ClientAdd />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </InsightsSitbackLayoutWrapper>
    </MainLayoutWrapper>
  );
}
