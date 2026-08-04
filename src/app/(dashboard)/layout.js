"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import sailsIOClient from "sails.io.js";
import socketIOClient from "socket.io-client";
import SpaCardExpired from "@/components/shared/modal/SpaCardExpired";
import { useToaster } from "@/hooks";
import Layout from "@/layouts";
import { appointmentCheckSliceSelector, handleSpaCardExpired, handleSubscriptionFail } from "@/redux/appointment";
import { authCheckSliceSelector } from "@/redux/authCheck";
import { handleBlock, handleCardModal, messageCheckSliceSelector, tabHandle } from "@/redux/messageTab";
import { PATH_DASHBOARD } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const DashboardLayout = ({ children }) => {
  const { token, login } = useSelector(authCheckSliceSelector);
  const { isSpaCardExpired } = useSelector(appointmentCheckSliceSelector);
  const { cardModal } = useSelector(messageCheckSliceSelector);
  const { toaster } = useToaster();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { push } = useRouter();

  if (socketIOClient.sails) window.io = socketIOClient;
  else window.io = sailsIOClient(socketIOClient);

  window.io.sails.transports = ["websocket"];
  window.io.sails.url = process.env.SOCKET_URL;
  window.io.sails.reconnection = true;
  window.io.sails.headers = {
    Authorization: `Bearer ${token || null}`,
  };

  useEffect(() => {
    connectSocket();
    subScribeUser();
  }, [token]);

  useEffect(() => {

      dispatch(handleSpaCardExpired(!!login?.isSpaCardExpired));

  }, [login?.isSpaCardExpired,]);

  useEffect(() => {
    if (pathname != PATH_DASHBOARD?.insights) {
      dispatch(handleCardModal(false));
      if (login?.planData && login?.planData?.plan_id) {
        if (login?.planData?.plan_id != 1) {
          dispatch(tabHandle("first"));
        } else {
          dispatch(tabHandle("second"));
        }
      }
    }
    if (pathname != PATH_DASHBOARD?.subscriptions) {
      document.body.classList.remove("sitback-light-yellow-bg-wrapper");
    } else {
      // document.body.classList.add("sitback-light-yellow-bg-wrapper");
    }
  }, [pathname]);

  useEffect(() => {
    if (window.io) {
      window.io.socket.on("serviceprovider", async (msg) => {
        if (msg?.action == "subscriptionPaymentFailed") {
          dispatch(handleBlock(true));
          dispatch(handleSubscriptionFail(true));
          push(PATH_DASHBOARD?.serviceProvider);
        }
      });
    }
  }, [window.io]);

  const subScribeUser = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.SUBSCRIBE_USER);
      if (!res?.status) {
        return res;
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const connectSocket = async () => {
    if (token) {
      window.io.socket.on("connect", function socketConnected() {
        window.io.socket.get(`/api/v2/chat/subscribeuser1`, function (resData, jwRes) {
          // console.log("subscribeuser1", resData)
          if (jwRes.error) {
            // console.log("subscribe user error", jwRes.statusCode);
          }
        });

        window.io.socket.get(`/api/v2/adminchat/subscribeuser1`, function (resData, jwRes) {
          // console.log("Admin subscribeuser1....", resData)
          if (jwRes.error) {
            // console.log("subscribe user error admin....", jwRes);
          }
        });
      });
    }
  };

  return (
    <>
      <Layout>{children}</Layout>
      <SpaCardExpired show={isSpaCardExpired && !cardModal} />
    </>
  );
};

export default DashboardLayout;
