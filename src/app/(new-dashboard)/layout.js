"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import sailsIOClient from "sails.io.js";
import socketIOClient from "socket.io-client";
import { useToaster } from "@/hooks";
import Layout from "@/layouts";
import { handleSubscriptionFail } from "@/redux/appointment";
import { authCheckSliceSelector, setdeviceTokens } from "@/redux/authCheck";
import { handleBlock } from "@/redux/messageTab";
import { PATH_AUTH, PATH_DASHBOARD } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { removeCookie } from "@/utils/cookie";

const NewDashBoardLayout = ({ children }) => {
  const { token, login, deviceTokens } = useSelector(authCheckSliceSelector);
  const { toaster } = useToaster();
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
  }, [token]);

  // useEffect(() => {
  //   if (pathname != PATH_DASHBOARD?.insights) {
  //     if (login?.planData && login?.planData?.plan_id) {
  //       if (login?.planData?.plan_id != 1) {
  //         dispatch(tabHandle("first"));
  //       } else {
  //         dispatch(tabHandle("second"));
  //       }
  //     }
  //   }
  // }, [pathname]);

   const leave_room = async () => {

      try {
        const res = await axiosApiCall.get(API_ROUTER?.USER_LEAVE_ROOM);
        if (!res?.status) {
          return res
        } else {
          //console.log("res", res);
          try {
           const res = await axiosApiCall.post(API_ROUTER?.LOGOUT, { id: login?.id,employeeType: login?.employeeType,deviceToken:deviceTokens });
            if (!res?.status) {

              return toaster(res?.message, TOAST_TYPES.ERROR);
            } else {
              dispatch(setdeviceTokens(null));
              removeCookie('token');
              localStorage.clear();
              // push(PATH_AUTH?.signIn);
              window.location.href = PATH_AUTH?.signIn;

              //dispatch(handleLoginTab('first'));
              // window.location.reload();
              return res
            }
          } catch (error) {

            toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
          }
        }
      } catch (error) {
        // console.log("error",error);
        return error
      }
    };

  useEffect(() => {

    if (window.io) {
      if(login?.employeeType == "spa") {

          window.io.socket.on("serviceprovider", async (msg) => {
          if (msg?.action == "subscriptionPaymentFailed") {
            dispatch(handleBlock(true));
            dispatch(handleSubscriptionFail(true));
            push(PATH_DASHBOARD?.serviceProvider);
          }
          if (msg?.action == "logout_spaemployee") {
            leave_room()
          }
        });
      } else if (login?.employeeType == "spaemployee") {

           window.io.socket.on("spaemployee", async (msg) => {
          if (msg?.action == "subscriptionPaymentFailed") {
            dispatch(handleBlock(true));
            dispatch(handleSubscriptionFail(true));
            push(PATH_DASHBOARD?.serviceProvider);
          }
          if (msg?.action == "logout_spaemployee") {
            leave_room()
          }
        });
      }

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
          subScribeUser();
          if (jwRes.error) {
             console.log("subscribe user error", jwRes.statusCode);
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
      <Layout variant="new-dashboard">{children}</Layout>
      {/* <SubscriptionPayment
        show={true}
      /> */}
    </>
  );
};

export default NewDashBoardLayout;
