"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import LoadingButton from "@/components/shared/button/LoadingButton";
import {
  FormProvider,
  RHFTextInput
} from "@/components/shared/hook-form";
import { useToaster } from "@/hooks";
import { PATH_AUTH } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import {
  Image,
  Label,
} from '@/styles/global/main.style';
import {
  LoginFormWrapper,
  LoginLayoutUpdatedWrapper,
} from '@/styles/pages/signup.style';
import axiosApiCall from "@/utils/axios";
import { STORAGE_KEYS, TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

export default function SignUp() {

  const { t } = useTranslation();

  // Form config
  const defaultValues = {
    email: "",
    password: "",
  };

  // validation
  const formSchema = yup
    .object()
    .shape({
        email: yup
        .string()
        .required(t('reqEmail'))
        // .email("Enter valid email address")
        .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, t('validEmailAddress')),
    })
    .strict();

  // Hooks
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });
  const { push } = useRouter();
  const { toaster } = useToaster();

  // Constants
  const {
    handleSubmit,
  } = methods;

  //states
  const [loading, setLoading] = useState(false);

  // Handlers
  const submit = async (data) => {

    let forgotData = {
      email: data?.email,
    }
    try {
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.FORGOT_PASSWORD, forgotData);

      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        localStorage.setItem(STORAGE_KEYS?.FORGET_EMAIL, data?.email);
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        push(PATH_AUTH?.otp);
      }

    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

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
          <LoginFormWrapper>
            <div className="login-detail-text-wrapper">
              <LoginTextTitle>{t('fgtPwdText')}</LoginTextTitle>
              <p>{t('fgtPwdSubText')}</p>
              <p>{t('fgtPwdSubText1')}</p>
            </div>
            <FormProvider
              methods={methods}
              onSubmit={handleSubmit(submit)}
            >
              <RHFTextInput
                name="email"
                placeholder={t('enterEmail')}
                id="email"
                type="email"
              />
              <LoadingButton
                type="submit"
                disabled={loading}
                label={t('sendCode')}
                loadinglabel={`${t('sendCode')}...`}
                isLoading={loading}
                className="loading-btn-wrapper"
              />
              <div className="account-text-link">
                <h5>{t('alreadyAccount')} <Link href={PATH_AUTH?.signIn} className="">{t('login')}</Link></h5>
              </div>
            </FormProvider>
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
          <LoginFormWrapper className="login-updated-form-wrapper">
            <div className="sitback-updated-signup-title-div">
              <Link href="/" className="logo-main-wrapper">
                <Image alt="sitback" src="/images/sitback-logo.svg" />
              </Link>
            </div>
            <div className="login-detail-text-wrapper login-spacing-detail-div">
              <h2 className="login-title-text lower-bottom-spacing">{t('fgtPwdText')}</h2>
              <p className="para-login-text">{t('fgtPwdSubText')}</p>
              <p className="para-login-text forgot-pw-text">{t('fgtPwdSubText1')}</p>
            </div>
            <FormProvider
              methods={methods}
              onSubmit={handleSubmit(submit)}
            >
              <FormGroup className="login-input-div">
                <Label isLoginPageLableText={true}>{t('emailAddress')}*</Label>

                <RHFTextInput
                  name="email"
                  placeholder={t('enterEmail')}
                  id="email"
                  type="email"
                />
              </FormGroup>
              <LoadingButton
                type="submit"
                disabled={loading}
                label={t('sendCode')}
                loadinglabel={`${t('sendCode')}...`}
                isLoading={loading}
                className="loading-btn-wrapper"
              />
              <div className="account-text-link">
                {/* <h5>{t('alreadyAccount')} <Link href={PATH_AUTH?.signIn} className="">{t('login')}</Link></h5> */}
                <h5>{t("dontHaveAcc")}{" "}
                      <Link href={PATH_AUTH?.signUp} className="">
                        {t("registerNow")}
                      </Link>
                </h5>
              </div>
            </FormProvider>
          </LoginFormWrapper>
          </div>
        </div>
      </section>
      </LoginLayoutUpdatedWrapper>
    </>
  )
}
