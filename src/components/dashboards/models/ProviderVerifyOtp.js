import { yupResolver } from "@hookform/resolvers/yup";
import { memo, useEffect, useMemo, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import * as yup from "yup";
import LoadingButton from "@/components/shared/button/LoadingButton";
import OtpInput from "@/components/shared/inputs/otpInput";
import CustomModal from "@/components/shared/modal";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import {
  Button,
  FormGroup,
  Label,
  SitBackModalBodyWrapper,
} from "@/styles/global/main.style";
import axiosApiCall from "@/utils/axios";

import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const ProviderVerifyOtp = ({ show, onHide = () => { }, employeeData }) => {
  // state
  const [loading, setLoading] = useState(false);
  const [phNo, setPhNo] = useState({
    countryCode: "",
    number: "",
  });
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [seconds, setSeconds] = useState(60);
  // hooks
  const { toaster } = useToaster();
  const { t } = useTranslation();
  const formattedSeconds = seconds.toString().padStart(2, '0');
  const number = employeeData?.countrycode + employeeData?.phone;

  // Form Config
  const defaultValues = useMemo(
    () => ({
      phoneNumber: number || "",
    }),
    [employeeData]
  );

  const formSchema = useMemo(() => {
    return yup.object()
      .shape({
        phoneNumber: yup
          .string()
      })
  }, [employeeData]);

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
    if (show) {
      if (seconds <= 0) return;

      const intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000); // Update every 1 second

      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [seconds, show])

  useEffect(() => {
    if (show) {
      setPhNo({
        countryCode: employeeData?.countrycode,
        number: employeeData?.phone,
      })
    }
  }, [show, employeeData])

  const onSubmitForm = (formData) => {
    try {
      onSubmit(formData);
    } catch (error) {
      return error
    }
  };

  const onSubmit = async () => {
    try {

      if (!otpVerified) {
        const fData = new FormData();
        fData.append("id", employeeData?.id);
        fData.append("name", employeeData?.name?.trim());
        fData.append("phone", phNo?.number);
        fData.append("countrycode", `+${phNo?.countryCode}`);
        const res = await axiosApiCall.post(API_ROUTER?.UPDATE_EMPLOYEE, fData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (!res?.status) {
          return toaster(res?.message, TOAST_TYPES.ERROR);
        } else {
          verifyOtp();
          // onConfirm();
        }



        // return toaster('Need to verify phone number first', TOAST_TYPES.ERROR);
      } else {

        setLoading(true);
        const fData = new FormData();
        fData.append("id", employeeData?.id);
        fData.append("name", employeeData?.name?.trim());
        fData.append("phone", phNo?.number);
        fData.append("countrycode", `+${phNo?.countryCode}`);
        const res = await axiosApiCall.post(API_ROUTER?.UPDATE_EMPLOYEE, fData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (!res?.status) {
          return toaster(res?.message, TOAST_TYPES.ERROR);
        } else {
          toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
          cancel()
          // onConfirm();
        }
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const cancel = async () => {
    resetState();
    reset(defaultValues);
    setSeconds(60);
    setOtpVerified(false);
    setOtp('');
    onHide();
    // setEmployeeData(null)
  };

  const resetState = () => {
    setValue("name", "");
    setValue("email", "");
    setValue("image", null);
  };

  const resendOtp = async () => {
    try {
      let param = {
        phone: phNo?.number,
      };
      const res = await axiosApiCall.post(API_ROUTER?.PHONE_RESEND_OTP, param);
      if (!res?.status) {
        return res;
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        setSeconds(60)
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
      let param = {
        otp: otp,
        phone: phNo?.number,
      };
      const res = await axiosApiCall.post(API_ROUTER?.PHONE_VARIFY_OTP, param);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        if (res?.data?.data?.isPhoneVerified) {
          setOtpVerified(true);
          cancel()
        }
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  return (
    <CustomModal
      show={show}
      onHide={() => cancel()}
      aria-labelledby="example-modal-sizes-title-sm"
      centered
      className="sitback-modal-wrapper"
    >
      <Modal.Body>
        <SitBackModalBodyWrapper>
          <h3 className="modal-title-text">Verify employee Otp</h3>
          <Form onSubmit={handleSubmit(onSubmitForm)}>
            <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
              <Label>Phone #</Label>
              <PhoneInput
                placeholder={"01-000-0000"}
                specialLabel={"phonenumber"}
                name="phoneNumber"
                country={"us"}
                className="phone-number-input-wrapper"
                value={defaultValues?.phoneNumber.toString()}
                onChange={(phone, data, event, formattedValue, handleChange) => {
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
                    setError("phoneNumber", { message: "please enter valid phone number." });
                  } else {
                    clearErrors("phoneNumber");
                  }
                }}
              />
              <p className="text-danger phone_input">{errors?.phoneNumber?.message}</p>
            </FormGroup>

            <FormGroup controlId="formBasicEmail" className="mb-0">
              <Label>Otp</Label>
              <div>
                <OtpInput value={otp} onChange={(val) => setOtp(val)} />

                <div className="login-detail-text-wrapper resend-code-link">
                  {
                    seconds > 0 &&
                    <span>Code Expiry:{formattedSeconds}</span>
                  }
                  {
                    seconds <= 0 &&
                    <span onClick={() => resendOtp()}>Resend Code</span>
                  }
                </div>
              </div>
            </FormGroup>

            <div className="modal-footer-div mt-2">
              <LoadingButton
                type="submit"
                disabled={loading}
                label="Save"
                loadinglabel="Saving..."
                isLoading={loading}
                className="loading-btn-wrapper"
              />
              <Button variant="primary" type="reset" isBorderBtn={true} onClick={() => cancel()}>
                {t("cancel")}
              </Button>
            </div>
          </Form>
        </SitBackModalBodyWrapper>
      </Modal.Body>
    </CustomModal>
  );
};

export default memo(ProviderVerifyOtp);
