"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import Calendar from "react-calendar";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import * as yup from "yup";
import LoadingButton from "@/components/shared/button/LoadingButton";
import CustomModal from "@/components/shared/modal";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import { FormGroup, Input, Label } from "@/styles/global/main.style";
import { ClientAddLayoutTableWrapper } from "@/styles/pages/client.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import "react-calendar/dist/Calendar.css";

export const AddClientModal = ({ show, onHide = () => {} }) => {
  // hooks

  const { toaster } = useToaster();
  const { t } = useTranslation();
  const calendarRef = useRef(null);

  //states
  const [phNo, setPhNo] = useState({
    countryCode: "",
    number: "",
  });
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

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
        // .email("Enter valid email address")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          t("validEmailAddress")
        ),
      phoneNumber: yup
        .string()
        .required("Phone Number is required")
        .min(5, "Please enter a valid phone number"),
      birthDate: yup.date().required("Please select a date"),
    })
    .strict(true);

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  const CheckPhone = async (countrycode, phonenumber) => {
    const params = {
      phone: phonenumber,
      countrycode: `+${countrycode}`,
    };

    try {
      const res = await axiosApiCall.post(API_ROUTER?.CHECK_PHONE_NUMBER, params);
      if (!res?.status) {
        setError(null);
        return res?.status;
      } else {
        if (res?.data?.status) {
          setErrorMsg("Phone number is already registered please use different number");
        } else {
          setError(null);
        }
      }
    } catch (error) {
      setError(null);
      return error;
    }
  };

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    setError,
    clearErrors,
    register,
    formState: { errors },
  } = methods;

  const cancel = async () => {
    reset();
    setPhNo("");
    setValue("phoneNumber", null);
    setSelectedDate(null);
    setErrorMsg(null);
    onHide();
  };

  const onSubmitForm = (formData) => {
    try {
      createClientData(formData);
    } catch (error) {}
  };

  const createClientData = async (formData) => {
    let date = moment(formData?.birthDate).format("YYYY-MM-DD");
    if (errorMsg) {
      return;
    }

    try {
      setLoading(true);
      const params = {
            name: formData?.name.trim(),
            birthday: date,
            phone: phNo?.number,
            countrycode: `+${phNo?.countryCode}`,
            // address: "4735 N Scottsdale Rd",
            email: formData?.email,

      };
      const res = await axiosApiCall.post(API_ROUTER?.ADD_CLIENT_DATA_INSIGHTS, params);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        // getClients();
        cancel();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="">
      <CustomModal
        show={show}
        onHide={() => cancel()}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
        className="sitback-modal-wrapper sitbackmodalwrapper"
      >
        <Modal.Header
          closeButton
          className="red-close-icon "
          onClick={() => onHide()}
        ></Modal.Header>
        <Modal.Body className="stripe-card">
          <ClientAddLayoutTableWrapper>
            <div className="select-reports-box-wrapper sibback-insights-add-clients">
              <Form onSubmit={handleSubmit(onSubmitForm)}>
                <Row>
                  <Col sm={6}>
                    <FormGroup className="white-input-wrapper">
                      <Label>{t("phonenumber")}</Label>
                      <PhoneInput
                        placeholder="Enter phone number"
                        specialLabel={t("phonenumber")}
                        name="phoneNumber"
                        country={"us"}
                        className="phone-number-input-wrapper"
                        // value={`${profileData?.countryCode} ${profileData?.phoneNumber}`}
                        // value="+919913478156"
                        value={defaultValues?.phoneNumber.toString()}
                        onChange={(phone, data, event, formattedValue) => {
                          let countryCode = formattedValue.split(" ")[0];
                          // setPhNoLength(data?.format?.replace(/[- )(]/g, "").length - (countryCode.length - 1));
                          let filedValue = formattedValue
                            ?.slice(countryCode.length + 1)
                            ?.replace(/[- )(]/g, "");
                          setPhNo({ countryCode: data?.dialCode, number: filedValue });
                          if (data?.dialCode && filedValue.toString().length === 10) {
                            CheckPhone(data?.dialCode, filedValue);
                          } else {
                            setErrorMsg(null);
                          }
                          setValue("phoneNumber", formattedValue);
                          if (
                            !(
                              data?.format?.replace(/[- )(]/g, "").length - countryCode.length ==
                              filedValue.length
                            )
                          ) {
                            setError("phoneNumber", {
                              message: "please enter valid phone number.",
                            });
                          } else {
                            clearErrors("phoneNumber");
                          }
                        }}
                      />
                      <p className="text-danger">{errors ? errors?.phoneNumber?.message : ""}</p>
                      <p className="text-danger">{errorMsg}</p>{" "}
                    </FormGroup>
                  </Col>
                  <Col sm={6}>
                    <FormGroup className="white-input-wrapper">
                      <Label>{t("fullName")}</Label>
                      <Input
                        type="text"
                        placeholder="Will smith"
                        className=""
                        {...register("name")}
                      />
                      <p className="text-danger">{errors?.name?.message}</p>
                    </FormGroup>
                  </Col>
                  <Col sm={6}>
                    <FormGroup className="white-input-wrapper">
                      <Label>{t("email")}</Label>
                      <Input
                        type="text"
                        placeholder="willsmith112@gmail.com"
                        className=""
                        {...register("email")}
                      />
                      <p className="text-danger">{errors?.email?.message}</p>
                    </FormGroup>
                  </Col>

                  <Col sm={6}>
                    <FormGroup
                      className={`white-input-wrapper  ${isCalendarVisible ? "show-calendar" : ""}`}
                    >
                      <Label>{t("birthDay")}</Label>
                      <Input
                        type="text"
                        placeholder="Select Birth date"
                        className=""
                        value={selectedDate && moment(selectedDate).format("yyyy-MM-DD")}
                        onClick={() => setIsCalendarVisible(true)}
                      />
                      <div className="calendar-wrapper-div" ref={calendarRef}>
                        {isCalendarVisible && (
                          <Controller
                            name="birthDate"
                            control={control}
                            render={({ field }) => (
                              <Calendar
                                dateFormat="YYYY-MM-DD"
                                {...field}
                                value={field?.value && field?.value}
                                maxDate={new Date()}
                                onChange={(e) => {
                                  field.onChange(e);
                                  setSelectedDate(e);
                                  setIsCalendarVisible(false);
                                }}
                              />
                            )}
                          />
                        )}
                      </div>
                      <p className="text-danger">{errors?.birthDate?.message}</p>
                    </FormGroup>
                  </Col>
                </Row>
                <div className="save-btn-wrapper">
                  <LoadingButton
                    type="submit"
                    disabled={loading}
                    label={t("save")}
                    loadinglabel={t("saving")}
                    isLoading={loading}
                    className="loading-btn-wrapper"
                  />
                </div>
              </Form>
            </div>
          </ClientAddLayoutTableWrapper>
        </Modal.Body>
      </CustomModal>
    </div>
  );
};
