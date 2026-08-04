"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LoadingButton from "@/components/shared/button/LoadingButton";
import OtpInput from "@/components/shared/inputs/otpInput";
import { useToaster } from "@/hooks";
import { PATH_AUTH } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import {
  Image,
} from '@/styles/global/main.style';
import {
  LoginFormWrapper,
  LoginLayoutUpdatedWrapper,
} from '@/styles/pages/signup.style';
import axiosApiCall from "@/utils/axios";
import { STORAGE_KEYS, TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

export default function SignUp() {

  // Constants
  let forgot_email = localStorage.getItem(STORAGE_KEYS?.FORGET_EMAIL) || "";

  // states
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(120);
  const [loading, setLoading] = useState(false);

  // Hooks

  const { push } = useRouter();
  const { toaster } = useToaster();
  const { t } = useTranslation();
  const formattedSeconds = seconds.toString().padStart(2, '0');

  // useEffects

  useEffect(() => {
    if (seconds <= 0) return;

    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000); // Update every 1 second

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [seconds])

  // Handlers
  const submit = async () => {
    if (otp?.length < 3) {
        return toaster("OTP is required", TOAST_TYPES.ERROR);
      }
    let forgotData = {
      otp: otp,
      email: forgot_email,
    }

    try {
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.VARIFY_OTP, forgotData);

      if (!res?.status) {
        setOtp("");
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        push(PATH_AUTH?.resetNewPassword);
      }

    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    let forgotData = {
      email: forgot_email,
    }
    try {
      const res = await axiosApiCall.post(API_ROUTER?.FORGOT_PASSWORD, forgotData);

      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        setSeconds(120)
      }

    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  }

  return (
    <>
      {/* <LoginLayoutWrapper>
        <div className="right-top-img-div">
          <Image alt="sitback" src="/images/right-top-img-1.svg" />
        </div>
        <div className="right-top-img-div left-top-img-div">
          <Image alt="sitback" src="/images/right-top-img-1.svg" />
        </div>
        <Container>
          <LoginFormWrapper className="otp-layout-wrapper">
            <div className="login-detail-text-wrapper">
              <LoginTextTitle>{t('verifyTextO1')}</LoginTextTitle>
              <p>{t('verifyText02')}</p>
            </div>
            <OtpInput value={otp} onChange={(val) => setOtp(val)} onSubmit={() => submit()}/>
            <LoadingButton
              type="submit"
              disabled={loading}
              label={t('verifyCode')}
              loadinglabel={`${t('verifyCode')}...`}
              isLoading={loading}
              className="loading-btn-wrapper"
              onClick={() => {
                submit();
              }}
            />
            <div className="login-detail-text-wrapper resend-code-link">
              {
                seconds > 0 &&
                <p>{t('codeExpiry')}:{formattedSeconds}</p>
              }
              {
                seconds <= 0 &&
                <span onClick={() => resendOtp()}>{t('resendCode')}</span>
              }
            </div>
          </LoginFormWrapper>
        </Container>
        <div className="right-top-img-div right-button-img-div">
          <Image alt="sitback" src="/images/right-top-img-1.svg" />
        </div>
      </LoginLayoutWrapper> */}
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
            <LoginFormWrapper className="login-updated-form-wrapper otp-layout-wrapper">
              <div className="sitback-updated-signup-title-div">
                <Link href="/" className="logo-main-wrapper">
                  <Image alt="sitback" src="/images/sitback-logo.svg" />
                </Link>
              </div>
              <div className="login-detail-text-wrapper">
                <h2 className="login-title-text lower-bottom-spacing">{t('verifyTextO1')}</h2>
                <p className="para-login-text">{t('verifyText02')}</p>
              </div>
              <OtpInput value={otp} onChange={(val) => setOtp(val)} onSubmit={() => submit()}/>
              <LoadingButton
                type="submit"
                disabled={loading}
                label={t('verifyCode')}
                loadinglabel={`${t('verifyCode')}...`}
                isLoading={loading}
                className="loading-btn-wrapper"
                onClick={() => {
                  submit();
                }}
              />
              <div className="login-detail-text-wrapper resend-code-link">
                {
                  seconds > 0 &&
                  <p className="code-expire-text">{t('codeExpiry')}:{formattedSeconds}</p>
                }
                {
                  seconds <= 0 &&
                  <span onClick={() => resendOtp()}>{t('resendCode')}</span>
                }
              </div>
            </LoginFormWrapper>
          </div>
        </div>
      </section>
      </LoginLayoutUpdatedWrapper>
    </>
  )
}
