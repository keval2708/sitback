import { yupResolver } from "@hookform/resolvers/yup";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import * as yup from "yup";
import OtpInput from "@/components/shared/inputs/otpInput";
import CustomModal from "@/components/shared/modal";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import { AddProviderModalWrapper } from "@/styles/pages/add-provider-modal.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const GENDER_OPTIONS = [
  { value: "", label: "Select Gender" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const ROLE_OPTIONS = [
  { value: "", label: "Select Role" },
  { value: "Therapist", label: "Therapist" },
  { value: "Lead Therapist", label: "Lead Therapist" },
  { value: "Senior Therapist", label: "Senior Therapist" },
];

const AddProviderModal = ({ show, onHide = () => { }, color, getTherapists }) => {
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [phNo, setPhNo] = useState({ countryCode: "1", number: "" });
  const [otp, setOtp] = useState("");
  const [otpTextView, setOtpTextView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditPhNo, setIsEditPhNo] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const otpVerified = useRef(false);
  const disable = useRef(false);
  const [seconds, setSeconds] = useState(120);
  const [employeeData, setEmployeeData] = useState(null);
  const [btnText, setBtnText] = useState("SAVE");
  // Add this state for forcing PhoneInput re-render
  const [phoneInputKey, setPhoneInputKey] = useState(0);

  const { toaster } = useToaster();
  const { t } = useTranslation();
  const formattedSeconds = seconds.toString().padStart(2, "0");

  const defaultValues = useMemo(
    () => ({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      gender: "",
      role: "",
    }),
    []
  );

  const formSchema = useMemo(
    () =>
      yup.object().shape({
        firstName: yup
          .string()
          .required("First name is required")
          .max(15, "First name should be less than 15 characters"),
        lastName: yup
          .string()
          .required("Last name is required")
          .max(15, "Last name should be less than 15 characters"),
        email: yup
          .string()
          .required(t("reqEmail"))
          .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Please enter a valid email address"),
        phoneNumber: yup
          .string()
          .required("Phone Number is required")
          .min(5, "Please enter a valid phone number"),
        gender: yup.string().required("Gender is required"),
        role: yup.string().required("Role is required"),
      }),
    [t]
  );

  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = methods;

  const email = watch("email");
  const phoneNumber = watch("phoneNumber");

  useEffect(() => {
    if (employeeData) {
      if (seconds <= 0) return;

      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [seconds, show, employeeData]);

  useEffect(() => {
    if (otp?.length > 3) {
      disable.current = false;
    }
  }, [show, otpTextView, otp]);

  const resetFormState = () => {
    reset(defaultValues);
    setPhNo({ countryCode: "1", number: "" });
    setOtp("");
    setOtpTextView(false);
    setIsEdit(false);
    setIsEditPhNo(false);
    setIsEditEmail(false);
    setSeconds(120);
    setBtnText("SAVE");
    otpVerified.current = false;
    disable.current = false;
    setEmployeeData(null);
    // Reset phone input value and force re-render
    setValue("phoneNumber", "");
    // Increment key to force PhoneInput to re-render with default country
    setPhoneInputKey(prev => prev + 1);
  };

  const cancel = () => {
    resetFormState();
    onHide(); // Uncomment this if you want to close the modal on cancel
  };

  const resetFormForAnother = () => {
    resetFormState();
  };

  const createEmployee = async (data) => {
    const fData = new FormData();
    fData.append("color", color);
    fData.append("firstName", data?.firstName);
    fData.append("lastName", data?.lastName);
    fData.append("email", data?.email);
    fData.append("phone", phNo?.number);
    fData.append("countrycode", `+${phNo?.countryCode}`);
    if (data?.gender) fData.append("gender", data.gender);
    if (data?.role) fData.append("role", data.role);

    const res = await axiosApiCall.post(API_ROUTER?.ADD_EMPLOYEE, fData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (!res?.status) {
      toaster(res?.message, TOAST_TYPES.ERROR);
      return null;
    }

    setOtpTextView(true);
    setIsEditEmail(true);
    setIsEditPhNo(true);
    setBtnText("Verify");
    disable.current = true;
    setSeconds(120);
    setEmployeeData(res?.data?.data);
    return res?.data?.data;
  };

  const onSubmit = async (data, stayOpen = false) => {
    try {
      if (employeeData) {
        if (isEdit) {
          await update(data);
          return;
        }
        if (!otpVerified.current) {
          await verifyOtp(stayOpen);
        } else if (stayOpen) {
          resetFormForAnother();
        } else {
          cancel();
          getTherapists(true);
        }
        return;
      }

      setLoading(true);
      await createEmployee(data);
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    const isValid = await methods.trigger([
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "gender",
      "role",
    ]);
    if (!isValid) return;

    try {
      setSendingOtp(true);

      if (employeeData) {
        if (isEdit) {
          await update(methods.getValues());
        } else {
          await resendOtp();
        }
        return;
      }

      await createEmployee(methods.getValues());
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setSendingOtp(false);
    }
  };

  const resendOtp = async () => {
    try {
      const res = await axiosApiCall.post(API_ROUTER?.PHONE_RESEND_OTP, {
        phone: phNo?.number,
      });
      if (!res?.status) {
        return res;
      }
      setSeconds(120);
      setOtp("");
      disable.current = true;
      toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const verifyOtp = async (stayOpen = false) => {
    try {
      if (!otp) {
        return toaster("OTP is required", TOAST_TYPES.ERROR);
      }

      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.PHONE_VARIFY_OTP, {
        otp,
        phone: phNo?.number,
      });

      if (!res?.status) {
        setOtp("");
        disable.current = true;
        return toaster(res?.message, TOAST_TYPES.ERROR);
      }

      if (res?.data?.data?.isPhoneVerified) {
        otpVerified.current = true;
        disable.current = false;
        setBtnText("SAVE");
        toaster("Therapist added successfully.", TOAST_TYPES.SUCCESS);
        if (stayOpen) {
          getTherapists(true);
          resetFormForAnother();
        } else {
          cancel();
          getTherapists(true);
        }
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const update = async (data) => {
    try {
      setLoading(true);
      const param = {
        id: employeeData?.id,
        firstName: data?.firstName || employeeData?.firstName,
        lastName: data?.lastName || employeeData?.lastName,
        phone: phNo?.number,
        countrycode: `+${phNo?.countryCode}`,
        email,
      };

      const res = await axiosApiCall.post(API_ROUTER?.UPDATE_EMPLOYEE, param);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      }

      setIsEdit(false);
      setIsEditEmail(true);
      setIsEditPhNo(true);
      setOtpTextView(true);
      setBtnText("VERIFY");
      disable.current = true;
      setSeconds(120);
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    handleSubmit((data) => onSubmit(data, false))();
  };

  const handleSaveAndAddAnother = () => {
    handleSubmit((data) => onSubmit(data, true))();
  };

  return (
    <CustomModal
      show={show}
      onHide={() => cancel()}
      aria-labelledby="add-therapist-modal"
      centered
      className="sitback-modal-wrapper sitback-therapist-modal-wrapper"
      dialogClassName="sitback-add-therapist-dialog"
    >
      <Modal.Header closeButton className="red-close-icon pb-2" />
      <Modal.Body>
        <AddProviderModalWrapper className="sitback-add-therapist-modal">
          <div className="add-therapist-modal-header">
            <h3>{t("addNewTherapist")}</h3>
          </div>

          <Form className="add-therapist-form" onSubmit={(e) => e.preventDefault()}>
            <div className="add-therapist-form-row">
              <div className="add-therapist-form-group">
                <input
                  id="firstName"
                  type="text"
                  placeholder={t("firstNameLabel")}
                  {...register("firstName")}
                />
                {errors?.firstName && (
                  <p className="text-danger">{errors.firstName.message}</p>
                )}
              </div>
              <div className="add-therapist-form-group">
                <input
                  id="lastName"
                  type="text"
                  placeholder={t("lastNameLabel")}
                  {...register("lastName")}
                />
                {errors?.lastName && (
                  <p className="text-danger">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="add-therapist-form-row">
              <div className="add-therapist-form-group">
                <select id="gender" {...register("gender")}>
                  {GENDER_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors?.gender && (
                  <p className="text-danger">{errors.gender.message}</p>
                )}
              </div>
              <div className="add-therapist-form-group">
                <select id="role" {...register("role")}>
                  {ROLE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors?.role && (
                  <p className="text-danger">{errors.role.message}</p>
                )}
              </div>
            </div>

            <div className="add-therapist-form-row full-width">
              <div className="add-therapist-form-group add-therapist-email-field">
                <input
                  id="email"
                  type="email"
                  placeholder={t("email")}
                  disabled={isEditEmail}
                  {...register("email")}
                />
                {errors?.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="add-therapist-form-row full-width">
              <div className="add-therapist-form-group add-therapist-phone-input">
                <div className="phone-number-send-input">
                  <PhoneInput
                    key={phoneInputKey} // Add this key prop to force re-render
                    disabled={isEditPhNo}
                    placeholder=""
                    specialLabel=""
                    country="us"
                    className="phone-number-input-wrapper"
                    value={phoneNumber?.toString() || ""}
                    onChange={(phone, data, event, formattedValue) => {
                      const countryCode = formattedValue.split(" ")[0];
                      const filedValue = formattedValue
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
                        setError("phoneNumber", {
                          message: "Please enter a valid phone number.",
                        });
                      } else {
                        clearErrors("phoneNumber");
                      }
                    }}
                  />
                  <button
                    type="button"
                    className={`add-therapist-send-otp-btn ${phoneNumber && !errors?.phoneNumber ? "is-bold" : ""}`}
                    onClick={handleSendOtp}
                    disabled={sendingOtp || isEditPhNo}
                  >
                    <i>
                      <img alt="send" src="/images/send-email-icon.svg" />
                    </i>
                    {sendingOtp ? t("loading") : t("sendOtp")}
                  </button>
                </div>
                {errors?.phoneNumber && (
                  <p className="text-danger">{errors.phoneNumber.message}</p>
                )}
              </div>
            </div>

            {otpTextView && (
              <div className="add-therapist-otp-section">
                <p>
                  {t("enterOtpVerify")} <strong>{phoneNumber}</strong>
                </p>
                <OtpInput value={otp} onChange={(val) => setOtp(val)} />
                <div className="add-therapist-resend-text">
                  {seconds > 0 ? (
                    <span>
                      {t("resendCodeIn")} {formattedSeconds} {t("seconds")}
                    </span>
                  ) : (
                    <span className="pointer" onClick={() => resendOtp()}>
                      {t("resendCode")}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="add-therapist-modal-footer">
              <button
                type="button"
                className="add-therapist-save-another-btn"
                onClick={handleSaveAndAddAnother}
                disabled={disable.current || loading || sendingOtp}
              >
                {t("saveAndAddAnother")}
              </button>
              <button
                type="button"
                className="add-therapist-save-btn"
                onClick={handleSave}
                disabled={disable.current || loading || sendingOtp}
              >
                {loading ? t("loading") : employeeData && otpTextView ? btnText : t("save")}
              </button>
            </div>
          </Form>
        </AddProviderModalWrapper>
      </Modal.Body>
    </CustomModal>
  );
};

export default memo(AddProviderModal);