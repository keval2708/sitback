"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import * as yup from "yup";
import LoadingButton from "@/components/shared/button/LoadingButton";
import OtpInput from "@/components/shared/inputs/otpInput";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import { FormGroup, Image, Label, LoginTextTitle } from "@/styles/global/main.style";
import { LoginFormWrapper, LoginLayoutWrapper } from "@/styles/pages/signup.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const DeleteUser = ({ show, onHide = () => {} }) => {
  // state
  const [loading, setLoading] = useState(false);
  const [phNo, setPhNo] = useState({
    countryCode: "",
    number: "",
  });
  const [otp, setOtp] = useState("");
  const [otpTextView, setOtpTextView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditPhNo, setIsEditPhNo] = useState(false);
  const otpVerified = useRef(false);
  const disable = useRef(false);
  const [seconds, setSeconds] = useState(120);
  const [userData, setUserData] = useState(null);
  // hooks
  const { toaster } = useToaster();
  const { t } = useTranslation();
  const [btnText, setBtnText] = useState("SAVE");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  const number = userData?.countrycode + userData?.phone;
  // Form Config
  const defaultValues = useMemo(
    () => ({
      phoneNumber: number || "+1",
    }),
    [userData]
  );

  // validation
  const formSchema = yup
    .object()
    .shape({
      phoneNumber: yup
        .string()
        .required("Phone Number is required")
        .min(5, "Please enter a valid phone number"),
    })
    .strict();

  // Hooks
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (userData) {
      if (seconds <= 0) return;

      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000); // Update every 1 second

      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [seconds, show, userData]);

  const onSubmitForm = (formData) => {
    try {
      onSubmit(formData);
    } catch (error) {
      return error;
    }
  };

  const onSubmit = async () => {
    try {
      if (userData) {
        if (isEdit) {
          await update();
          return;
        }
        if (!otpVerified?.current) {
          await verifyOtp();
        } else {
          cancel();
        }
      } else {
        const fData = new FormData();

        fData.append("phone", phNo?.number);
        fData.append("countrycode", `+${phNo?.countryCode}`);

        setLoading(true);
        const res = await axiosApiCall.post(API_ROUTER?.SEND_DELETE_USER_OTP, fData);
        if (!res?.status) {
          return toaster(res?.message, TOAST_TYPES.ERROR);
        } else {
          setOtpTextView(true);
          setIsEditPhNo(true);
          setBtnText("VERIFY & DELETE");
          disable.current = true;
          setSeconds(120);
          setUserData(res?.data?.data);
        }
      }
      // cancel()
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const cancel = async () => {
    resetState();
    reset(defaultValues);
    setSeconds(120);
    setBtnText("SAVE");
    otpVerified.current = false;
    disable.current = false;
    setOtpTextView(false);
    setIsEditPhNo(false);
    setOtp("");
    onHide();
    setUserData(null);
  };

  const changeOtp = (value) => {
    setOtp(value);
  };

  const resetState = () => {
    // Reset the form and clear the phoneNumber field
    reset({
      phoneNumber: "", // Explicitly clear the phone number field
    });
    setPhNo({ countryCode: "+1", number: "" }); // Clear phone number state
  };

  const resendOtp = async () => {
    try {
      let param = {
        countrycode: `+${phNo?.countryCode}`,
        phone: phNo?.number,
      };
      const res = await axiosApiCall.post(API_ROUTER?.SEND_DELETE_USER_OTP, param);
      if (!res?.status) {
        return res;
      } else {
        setSeconds(120);
        setOtp("");
        disable.current = true;
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const verifyOtp = async () => {
    try {
      if (!otp) {
        return toaster("OTP is required", TOAST_TYPES.ERROR);
      }
      setLoading(true);

      let param = {
        otp: otp,
        userid: userData?.id,
      };
      const res = await axiosApiCall.post(API_ROUTER?.VERIFY_DELETE_USER_OTP, param);
      if (!res?.status) {
        setOtp("");
        disable.current = true;
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        if (res?.data?.data?.phone) {
          toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
          disable.current = false;
          setBtnText(t("saveCaps"));
          cancel();
        }
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const update = async () => {
    try {
      setLoading(true);
      let param = {
        phone: phNo?.number,
        countrycode: `+${phNo?.countryCode}`,
      };

      const res = await axiosApiCall.post(API_ROUTER?.UPDATE_EMPLOYEE, param);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setIsEdit(false);
        setIsEditPhNo(true);
        setOtpTextView(true);
        setBtnText(t("verifyAndDelete"));
        disable.current = true;
        setSeconds(120);
        // verifyOtp();
        // onConfirm();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (otp?.length > 3) {
      disable.current = false;
    }
  }, [show, otpTextView, otp]);

  return (
    <LoginLayoutWrapper className="privacy-layout-footer">
      <div className="right-top-img-div">
        <Image alt="sitback" src="/images/right-top-img-1.svg" />
      </div>
      <div className="right-top-img-div left-top-img-div">
        <Image alt="sitback" src="/images/right-top-img-1.svg" />
      </div>
      <Container>
        <LoginFormWrapper>
          <div className="login-detail-text-wrapper">
            <LoginTextTitle>{t("deleteUser")}</LoginTextTitle>
          </div>
          <Form className="delete-user-input-wrapper" onSubmit={handleSubmit(onSubmitForm)}>
            <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
              <Label>{t("phone")} #</Label>
              <div className="edit-number-and-email-input">
                <PhoneInput
                  disabled={isEditPhNo}
                  placeholder={"01-000-0000"}
                  specialLabel={"phonenumber"}
                  name="phoneNumber"
                  country={"us"}
                  className="phone-number-input-wrapper"
                  value={defaultValues?.phoneNumber.toString()}
                  onChange={(phone, data, event, formattedValue) => {
                    let countryCode = formattedValue.split(" ")[0];
                    let filedValue = formattedValue
                      ?.slice(countryCode.length + 1)
                      ?.replace(/[- )(]/g, "");
                    setPhNo({ countryCode: data?.dialCode, number: filedValue });
                    setValue("phoneNumber", formattedValue);
                    if (
                      !(
                        data?.format?.replace(/[- )(]/g, "").length - countryCode.length ==
                        filedValue.length
                      )
                    ) {
                      setError("phoneNumber", { message: "Please enter valid phone number." });
                    } else {
                      clearErrors("phoneNumber");
                    }
                  }}
                />
              </div>
              <p className="text-danger phone_input">{errors?.phoneNumber?.message}</p>
            </FormGroup>
            {otpTextView && (
              <FormGroup controlId="formBasicEmail" className="mb-0 otp-box-wrapper">
                <Label className="TickSquareicon">
                  {t("otp")}
                  {otpVerified?.current && (
                    <span className="TickSquareicon">
                      <i>
                        <Image alt="sitback" isContainImg={true} src="/images/TickSquare.svg" />
                      </i>
                      {t("verified")}
                    </span>
                  )}{" "}
                </Label>
                <div>
                  <OtpInput value={otp} onChange={(val) => changeOtp(val)} />

                  <div className="login-detail-text-wrapper resend-code-link">
                    {seconds > 0 && (
                      <span>
                        ={t("Resendcodeins")} {formattedSeconds} {t("seconds")}
                      </span>
                    )}
                    {seconds <= 0 && (
                      <span className="pointer" onClick={() => resendOtp()}>
                        {t("resendCode")}
                      </span>
                    )}
                  </div>
                </div>
                <div className="user-detaildiv">
                  <p className="mt-3">
                    {t("email")}: {userData?.email}
                  </p>
                  <p className="mt-3">
                    {t("name")}: {userData?.username}
                  </p>
                </div>
              </FormGroup>
            )}

            <div className="modal-footer-div mt-1">
              <LoadingButton
                type="submit"
                disabled={disable?.current || loading}
                label={btnText}
                loadinglabel={btnText}
                isLoading={loading}
                className="loading-btn-wrapper"
              />
            </div>
          </Form>
        </LoginFormWrapper>
      </Container>
    </LoginLayoutWrapper>
  );
};

export default memo(DeleteUser);
