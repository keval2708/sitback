"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import LoadingButton from "@/components/shared/button/LoadingButton";
import {
  FormProvider,
  RHFPasswordInput,
} from "@/components/shared/hook-form";
import { useToaster } from "@/hooks";
import { PATH_AUTH } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import {
  FormGroup,
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
  //state
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  // Form config
  const defaultValues = {
    password: "",
    confirm_password: "",
  };

  // validation
  const formSchema = yup
    .object()
    .shape({
      password: yup
        .string()
        .required(t('reqPassword'))
        .min(8, t('errMinPassword'))
        .max(12, t('errMaxPassword'))
        .trim(t('validPassword'))
        .matches(
          /^(?=.*[A-Za-z0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]+$/,
          t('errPassword')
        ),
      confirm_password: yup
        .string()
        .required(t('reqCfmPassword'))
        .oneOf(
          [yup.ref("password"), null],
          t('errCfmPassword')
        ),
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
    reset
  } = methods;
  let forgot_email = localStorage.getItem(STORAGE_KEYS?.FORGET_EMAIL) || "";

  // Handlers
  const submit = async (data) => {

    let changePasswordData = {
      email: forgot_email,
      password: data?.password,
    }
    try {
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.CHANGE_PASSWORD, changePasswordData);

      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        reset();
        push(PATH_AUTH?.resetPassword);
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
              <LoginTextTitle>{t('passwordTitle')}</LoginTextTitle>
              <p>{t('passwordValidate')}</p>
            </div>
            <FormProvider
              methods={methods}
              onSubmit={handleSubmit(submit)}
            >
              <FormGroup>
                <RHFPasswordInput
                  name="password"
                  id="password"
                  placeholder={t('enterPassword')}
                />
              </FormGroup>
              <FormGroup>
                <RHFPasswordInput
                  name="confirm_password"
                  id="confirm_password"
                  placeholder={t('passPlaceHolder')}
                />
              </FormGroup>
              <LoadingButton
                type="submit"
                disabled={loading}
                label={t('passLabel')}
                loadinglabel={`${t('passLabel')}...`}
                isLoading={loading}
                className="loading-btn-wrapper"
              />
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
              <div className="login-detail-text-wrapper">
                <h2 className="login-title-text lower-bottom-spacing">{t('passwordTitle')}</h2>
                <p className="para-login-text">{t('passwordValidate')}</p>
              </div>
              <FormProvider
                methods={methods}
                onSubmit={handleSubmit(submit)}
              >
                <FormGroup className="login-input-div">
                  <Label isLoginPageLableText={true}>New Password</Label>
                  <RHFPasswordInput
                    name="password"
                    id="password"
                    placeholder="Enter new password"
                  />
                </FormGroup>
                <FormGroup className="login-input-div">
                  <Label isLoginPageLableText={true}>Confirm Password</Label>
                  <RHFPasswordInput
                    name="confirm_password"
                    id="confirm_password"
                    placeholder="Enter new confirm password"
                  />
                </FormGroup>
                <LoadingButton
                  type="submit"
                  disabled={loading}
                  label={t('passLabel')}
                  loadinglabel={`${t('passLabel')}...`}
                  isLoading={loading}
                  className="mb-5 loading-btn-wrapper"
                />
              </FormProvider>
            </LoginFormWrapper>
          </div>
        </div>
      </section>
      </LoginLayoutUpdatedWrapper>
    </>
  )
}
