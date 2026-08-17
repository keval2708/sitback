"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
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
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { toaster } = useToaster();
  const [socketReady, setSocketReady] = useState(false);

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

  const connectSocket = () => {
    if (!token || !window.io?.socket) return;

    const spaId = login?.id;
    const socket = window.io.socket;

    socket.on("connect", function socketConnected() {
      console.log("socket connected", socket.id, "subscribeSpa", spaId);
      if (spaId) {
        socket.emit("subscribeSpa", spaId);
      }

      socket.emit(`/api/v2/chat/subscribeuser1`, function (resData, jwRes) {
        if (jwRes?.error) {
          console.log("subscribe user error", jwRes.statusCode);
        }
      });

      socket.emit(`/api/v2/adminchat/subscribeuser1`, function (resData, jwRes) {
        if (jwRes?.error) {
          console.log("subscribe user error admin....", jwRes);
        }
      });
    });

    socket.on("connect_error", (err) => {
      console.log("Socket.IO connect_error:", err?.message || err);
    });
  };

  useEffect(() => {
    if (!token) return;

    const socketUrl = (process.env.NEXT_PUBLIC_SOCKET_URL || process.env.SOCKET_URL || "").trim();

    const socket = io(socketUrl, {
      transports: ["websocket"],
      reconnection: true,
      auth: { token },
    });

    window.io = { socket };
    setSocketReady(true);
    window.dispatchEvent(new Event("sitback-socket-ready"));

    connectSocket();
    subScribeUser();

    return () => {
      setSocketReady(false);
      socket.removeAllListeners();
      socket.disconnect();
      if (window.io?.socket === socket) {
        window.io = undefined;
      }
    };
  }, [token, login?.id]);

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
  }, [window.io, socketReady]);

  useEffect(() => {
    dispatch(handleSpaCardExpired(!!login?.isSpaCardExpired));
  }, [login?.isSpaCardExpired]);

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

  return (
    <>
      <Layout>{children}</Layout>
      <SpaCardExpired show={isSpaCardExpired && !cardModal} />
    </>
  );
};

export default DashboardLayout;
