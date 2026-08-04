"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import Apple from "@/components/auth/socialLogin/Apple";
import GoogleButton from "@/components/auth/socialLogin/GoogleButton";
import LoadingButton from "@/components/shared/button/LoadingButton";
import { FormProvider, RHFPasswordInput, RHFTextInput } from "@/components/shared/hook-form";
import { useToaster } from "@/hooks";
import useFcmToken from "@/hooks/useFcmToken";
import { handleUpcomingData } from "@/redux/appointment";
import { authCheckSliceSelector, loginDetail, setdeviceTokens, storeToken } from "@/redux/authCheck";
import { dtabHandle, handleSubscribe } from "@/redux/messageTab";
import { myHeadDateRange, mySpaHeadSelectedDate, mySpaHeadSelectedEndDate, mySpaHeadSelectedStartDate, mySpaHeadSelectedType, mySpaHeadTextSearch } from "@/redux/service";
import { NEW_DASHBOARD_PATH, PATH_AUTH, PATH_DASHBOARD } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import {
  FormGroup,
  Image,
  Label,
  SocialLoginIconsWrapper,
} from "@/styles/global/main.style";
import { LoginFormWrapper, LoginLayoutUpdatedWrapper, } from "@/styles/pages/signup.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { setCookie } from "@/utils/cookie";
const sign = require("jwt-encode");

export default function SignUp() {
  const { fcmToken } = useFcmToken();
  const { t } = useTranslation();
  const { loginTab } = useSelector(authCheckSliceSelector);

  // Form config
  const defaultValues = {
    email: "",
    password: "",
  };

  // states
  const [appleData, setAppleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [docUploaded, setDocUploaded] = useState(false);

  // validation
  const formSchema = yup
    .object()
    .shape({
      email: yup.string().required(t("reqEmail")).email(t("validEmailAddress")),
      password: yup.string().required(t("reqPassword")),
    })
    .strict();

  // Hooks
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { toaster } = useToaster();

  // Constants
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (appleData) {
      submit();
    }
  }, [appleData]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(mySpaHeadTextSearch(null))
    dispatch(mySpaHeadSelectedDate(null))
    dispatch(mySpaHeadSelectedStartDate(null));
    dispatch(mySpaHeadSelectedEndDate(null));
    dispatch(mySpaHeadSelectedType(null));
    dispatch(myHeadDateRange(null));
    }, 500);

  }, []);

  // Handlers
  const submit = async (data) => {
    let signInData = {};

    if (appleData) {
      signInData.email = appleData?.email;
      signInData.loginType = appleData?.loginType;
      signInData.loginUid = appleData?.sub;
    } else {
      signInData.email = data?.email;
      signInData.password = sign(data?.password, process.env.SECRET_KEY);
      signInData.loginType = "normal";
    }
    signInData.deviceToken = fcmToken;

    try {
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.LOGIN, signInData);
      if (!res?.status) {
        // if (res?.isdocuploaded == false) {
        //   setPopUpOpen(true);
        //   setDocUploaded(res?.isdocuploaded);
        //   return;
        // }
        // if (res?.isdocuploaded == true) {
        //   setPopUpOpen(true);
        //   setDocUploaded(res?.isdocuploaded);
        //   return;
        // }
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        // console.log("kevsl",res);
        reset();
        dispatch(handleUpcomingData([]));
        dispatch(storeToken(res?.data?.token));

        dispatch(setdeviceTokens(res?.data?.data?.setdeviceToken));
        dispatch(loginDetail(res?.data?.data));
        dispatch(handleSubscribe(res?.data?.data.isSubscribe));
        setCookie("token", res?.data.token);
        window.localStorage.setItem("token", res?.data?.token);
        if (res?.data?.data?.isBlocked == true) {
           push(NEW_DASHBOARD_PATH?.dashboard);
        } else if (res?.data?.data?.isSubscribe == 1) {
          if (res?.data?.data?.planData?.status == "canceled") {
            push(PATH_DASHBOARD?.subscriptions);
          } else if (res?.data?.data?.spa_type == "onlydashboard") {
              dispatch(dtabHandle("dfirst"));
              push(NEW_DASHBOARD_PATH?.dashboard);
          }
          else {
            push(PATH_DASHBOARD?.serviceProvider);
          }
        } else {
          push(PATH_DASHBOARD?.subscriptions);
          //  dispatch(dtabHandle("dfirst"));
          //     push(NEW_DASHBOARD_PATH?.dashboard);
        }
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setPopUpOpen(false);
  };

  // const handleTabChange = (val) => {
  //   dispatch(handleLoginTab(val));
  // };

  return (
    <>
      <LoginLayoutUpdatedWrapper className="sitback-updated-signup-display-div">
          <section className="login-main-wrapper">
          <div className="login-inner-div">
          <div className="login-left-div">
              <div className="login-left-image-div">
                <Image alt="sitback" src="/images/login-left-image.png" />
                <div className="login-above-image-div">
                  <Link href="/" className="login-logo-div">
                    <Image alt="sitback" src="/images/sitback-login-logo.svg" />
                  </Link>
                </div>
              </div>
            </div>

          <div className="login-right-div">
              <LoginFormWrapper className="spaloginbook-appointment login-updated-form-wrapper">
                <div className="sitback-updated-signup-title-div">
                  <Link href="/" className="logo-main-wrapper">
                    <Image alt="sitback" src="/images/sitback-logo.svg" />
                  </Link>
                </div>
                {loginTab == 'first' &&
                  <h2 className="login-title-text">{t("loginText")}</h2>
                }
                <FormProvider methods={methods} onSubmit={handleSubmit(submit)}>
                  <FormGroup className="login-input-div">
                    <Label isLoginPageLableText={true}>{t('emailAddress')}*</Label>
                    <RHFTextInput
                      name="email"
                      autoComplete="off"
                      placeholder={t("enterEmail")}
                      id="email"
                      type="email"
                    />
                  </FormGroup>
                  <FormGroup className="login-input-div password-input-spacing">
                    <Label isLoginPageLableText={true}>{t('enterYourPassword')}*</Label>

                    <RHFPasswordInput
                      name="password"
                      autoComplete="off"
                      id="password"
                      placeholder={t("enterPassword")}
                    />
                    <div className="forgot-linktext">
                      <Link href={PATH_AUTH?.forgotPassword} className="">
                        {t("forgotPassword")}
                      </Link>
                    </div>
                  </FormGroup>
                  <LoadingButton
                    type="submit"
                    disabled={loading}
                    label={t("login")}
                    loadinglabel={`${t("login")}...`}
                    isLoading={loading}
                    className="loading-btn-wrapper"
                  />
                  <div className="account-text-link">
                    <h5>
                      {t("dontHaveAcc")}{" "}
                      <Link href={PATH_AUTH?.signUp} className="">
                        {t("registerNow")}
                      </Link>
                    </h5>
                  </div>
                  <div className="social-login-wrapper">
                    <div className="login-text">
                      <span>{t("orLoginWith")}</span>
                    </div>
                    <SocialLoginIconsWrapper>
                    <li>
                        <Apple setAppleData={setAppleData} loginType={"apple"} />
                      </li>
                      <GoogleButton
                        setAppleData={setAppleData}
                        isSignUp={false}
                        loginType={"google"}
                      />
                    </SocialLoginIconsWrapper>
                  </div>
                  <div className="policy-text">
                    <Link href={PATH_AUTH?.privacyPolicy} className="">
                      {t('footerPageText4')}
                    </Link>
                  </div>
                </FormProvider>
              </LoginFormWrapper>
            </div>
            </div>
            </section>

        {/* modal */}
        <Modal
          show={popUpOpen}
          onHide={() => {
            push(PATH_AUTH?.signIn);
          }}
          aria-labelledby="example-modal-sizes-title-lg"
          centered
          className="sitback-modal-wrapper sitback-modalv2-wrapper"
        >
          <Modal.Header className="text-right" onClick={() => handleClose()}>
            logout
          </Modal.Header>
          <Modal.Body>
            <div className="sitback-request-modal-wrapper">
              <div className="sitback-request-img">
                <Image isContainImg={true} alt="sitback" src="/images/request-time-img.svg" />
              </div>
              {!docUploaded ? (
                <h5>{t("uploadVerifyText")}</h5>
              ) : (
                <>
                  <h5>{t("verifyMText")}</h5>
                  <p>{t("verifyMText1")}</p>
                  <p>{t("verifyMText2")}</p>
                </>
              )}
            </div>
          </Modal.Body>
        </Modal>
      </LoginLayoutUpdatedWrapper>

    </>
  );
}
