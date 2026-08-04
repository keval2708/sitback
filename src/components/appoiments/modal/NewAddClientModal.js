import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import Calendar from "react-calendar";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import * as yup from "yup";
import CustomModal from "@/components/shared/modal";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import { FormGroup } from "@/styles/global/main.style";
import { AddProviderModalWrapper } from "@/styles/pages/add-provider-modal.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import "react-calendar/dist/Calendar.css";

export const NewAddClientModal = ({ show, onHide = () => { }, onSuccess = () => { }, initialName = "" }) => {
  const { toaster } = useToaster();
  const { t } = useTranslation();
  const calendarRef = useRef(null);

  const [phNo, setPhNo] = useState({ countryCode: "+1", number: "" });
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [phoneInputKey, setPhoneInputKey] = useState(0);

  const defaultValues = {
    name: "",
    email: "",
    phoneNumber: "",
    birthDate: null,
  };

  const formSchema = yup
    .object()
    .shape({
      name: yup
        .string()
        .required("Username is required")
        .min(3, "Username is too short")
        .max(30, "Username is too long - should be at most 30 characters")
        .matches(/^[A-Za-z]+( [A-Za-z]+)*\s*$/, "Please Enter Valid UserName"),
      email: yup
        .string()
        .required(t("reqEmail"))
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          t("validEmailAddress")
        ),
      phoneNumber: yup
        .string()
        .required("Phone Number is required")
        .min(5, "Please enter a valid phone number"),
      birthDate: yup.date().required("Please select a date").nullable(),
    })
    .strict(true);

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    setError,
    clearErrors,
    register,
    watch,
    formState: { errors },
  } = methods;

  const phoneNumber = watch("phoneNumber");

  const CheckPhone = async (countrycode, phonenumber) => {
    const params = {
      phone: phonenumber,
      countrycode: `+${countrycode}`,
    };

    try {
      const res = await axiosApiCall.post(API_ROUTER?.CHECK_PHONE_NUMBER, params);
      if (res?.status) {
        if (res?.data?.status) {
          setErrorMsg("Phone number is already registered please use different number");
        } else {
          setErrorMsg(null);
        }
      }
    } catch (error) {
      setErrorMsg(null);
    }
  };

  const cancel = () => {
    reset();
    setPhNo({ countryCode: "+1", number: "" });
    setSelectedDate(null);
    setIsCalendarVisible(false);
    setErrorMsg(null);
    setPhoneInputKey((prev) => prev + 1);
    onHide();
  };

  const createClientData = async (formData) => {
    if (errorMsg) return;

    let date = moment(formData?.birthDate).format("YYYY-MM-DD");


    try {
      setLoading(true);
      const params = {
        name: formData?.name.trim(),
        birthday: date,
        phone: phNo?.number,
        countrycode: "+" + phNo?.countryCode,
        email: formData?.email,
      };

      const res = await axiosApiCall.post(API_ROUTER?.ADD_CLIENT_DATA_INSIGHTS, params);
      if (!res?.status) {
        toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        onSuccess(res?.data?.data || params);
        cancel();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitForm = (formData) => {
    createClientData(formData);
  };

  const handleSave = () => {
    handleSubmit((data) => onSubmitForm(data))();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarVisible(false);
      }
    };

    if (isCalendarVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarVisible]);

  useEffect(() => {
    if (show) {
      reset({
        ...defaultValues,
        name: initialName?.trim() || "",
      });
      clearErrors();
    }
  }, [show, initialName]);

  return (
    <CustomModal
      show={show}
      onHide={() => cancel()}
      aria-labelledby="add-client-modal"
      centered
      className="sitback-modal-wrapper sitback-therapist-modal-wrapper"
      dialogClassName="sitback-add-therapist-dialog"
    >
      <Modal.Header closeButton className="red-close-icon pb-2" />
      <Modal.Body>
        <AddProviderModalWrapper className="sitback-add-therapist-modal">
          <div className="add-therapist-modal-header">
            <h3>Add New Client</h3>
          </div>

          <Form className="add-therapist-form" onSubmit={(e) => e.preventDefault()}>
            <div className="add-therapist-form-row">
              <div className="add-therapist-form-group">
                <input
                  id="name"
                  type="text"
                  placeholder="Full Name"
                  {...register("name")}
                />
                {errors?.name && (
                  <p className="text-danger">{errors.name.message}</p>
                )}
              </div>
              <FormGroup
                className={`add-therapist-form-group ${isCalendarVisible ? "show-calendar" : ""}`}
                style={{ position: "relative", marginBottom: "18px", flex: 1, minWidth: 0 }}
              >
                <input
                  id="birthDate"
                  type="text"
                  placeholder="Birthday (YYYY-MM-DD)"
                  value={selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : ""}
                  onClick={() => setIsCalendarVisible(!isCalendarVisible)}
                  readOnly
                  style={{ cursor: "pointer" }}
                />
                <div className="calendar-wrapper-div" ref={calendarRef} style={{ top: "52px", bottom: "auto" }}>
                  <Calendar
                    maxDate={new Date()}
                    value={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      setValue("birthDate", date);
                      setIsCalendarVisible(false);
                      clearErrors("birthDate");
                    }}
                  />
                </div>
                {errors?.birthDate && (
                  <p className="text-danger">{errors.birthDate.message}</p>
                )}
              </FormGroup>
            </div>

            <div className="add-therapist-form-row">
              <div className="add-therapist-form-group add-therapist-email-field">
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                />
                {errors?.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </div>
              <div className="add-therapist-form-group add-therapist-phone-input">
                <PhoneInput
                  key={phoneInputKey}
                  placeholder="Enter phone number"
                  specialLabel=""
                  country="us"
                  className="phone-number-input-wrapper"
                  value={phoneNumber || ""}
                  onChange={(phone, data, event, formattedValue) => {
                    const countryCode = formattedValue.split(" ")[0];
                    const filedValue = formattedValue
                      ?.slice(countryCode.length + 1)
                      ?.replace(/[- )(]/g, "");
                    setPhNo({ countryCode: data?.dialCode, number: filedValue });
                    setValue("phoneNumber", formattedValue);
                    if (data?.dialCode && filedValue.toString().length === 10) {
                      CheckPhone(data?.dialCode, filedValue);
                    } else {
                      setErrorMsg(null);
                    }
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
                {errors?.phoneNumber && (
                  <p className="text-danger">{errors.phoneNumber.message}</p>
                )}
                {errorMsg && <p className="text-danger">{errorMsg}</p>}
              </div>
            </div>

            <div className="add-therapist-modal-footer">
              <button
                type="button"
                className="add-therapist-save-another-btn"
                onClick={cancel}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="button"
                className="add-therapist-save-btn"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Loading..." : "Save"}
              </button>
            </div>
          </Form>
        </AddProviderModalWrapper>
      </Modal.Body>
    </CustomModal>
  );
};

export default NewAddClientModal;
