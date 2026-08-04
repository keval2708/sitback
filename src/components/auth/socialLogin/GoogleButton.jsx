import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import React from "react";
import InlineSVG from "svg-inline-react";
import { useToaster } from "@/hooks";
import {
  UpdatedGoogleIcon_icon,
} from "@/styles/svgs";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const GoogleButton = ({ setAppleData, loginType }) => {
  // Hooks
  const { toaster } = useToaster();

  // Methods
  // const onGoogleLoginSuccess = async ({ credential }) => {
  //   try {
  //     const user = jwtDecode(credential);
  //     const signInData = {
  //       email: user?.email,
  //       ...(isSignUp
  //         ? {
  //           username: user?.name,
  //         }
  //         : {}),
  //       loginType: "google",
  //       loginUid: user?.sub,
  //     };
  //     const res = await axiosApiCall.post(
  //       isSignUp ? API_ROUTER?.SIGNUP : API_ROUTER?.LOGIN,
  //       signInData
  //     );
  //     if (!res?.status) {
  //       return toaster(`${res?.message}`, isSignUp ? TOAST_TYPES.INFO : TOAST_TYPES.ERROR);
  //     } else {
  //       if (isSignUp) {
  //         toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
  //       } else {
  //         toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
  //         dispatch(storeToken(res?.data?.token));
  //         dispatch(loginDetail(res?.data?.data));
  //         dispatch(handleSubscribe(res?.data?.data.isSubscribe));
  //         setCookie("token", res?.data.token);
  //         window.localStorage.setItem("token", res?.data?.token)
  //         if (res?.data?.data?.isBlocked == true) {
  //           push(PATH_DASHBOARD?.serviceProvider);
  //         } else if (res?.data?.data?.isSubscribe == 1) {
  //           if (res?.data?.data?.planData?.status == "canceled") push(PATH_DASHBOARD?.subscriptions);
  //           else {
  //             push(PATH_DASHBOARD?.serviceProvider);
  //           }
  //         } else {
  //           push(PATH_DASHBOARD?.subscriptions);
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     return toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
  //   }
  // };

  const onGoogleLoginSuccess = async ({ credential }) => {
    try {
      const user = jwtDecode(credential);
      setAppleData({ ...user, loginType: loginType });
    } catch (error) {
      return toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  // Handlers
  const onGoogleLogin = async (result, isError = false) => {
    try {
      if (isError) {
        return toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      } else {
        await onGoogleLoginSuccess(result);
      }
    } catch (error) {
      return toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };
  return (
    <li>
      <InlineSVG
        src={UpdatedGoogleIcon_icon}
        className="google-icon"
      />
      <GoogleLogin
        logo_alignment="center"
        // size="large"
        // shape="rectangular"
        className="border-remove"
        type="icon"
        onSuccess={(res) => onGoogleLogin(res)}
        onError={(err) => onGoogleLogin(err, true)}
      />
    </li>
  );
};

export default GoogleButton;
