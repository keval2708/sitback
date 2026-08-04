"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useEffect, useMemo, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Calendar from "react-calendar";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import LoadingButton from "@/components/shared/button/LoadingButton";
import Loader from "@/components/shared/spinner/loader";
import { useToaster } from "@/hooks";
import { handleRedirect, insightCheckSliceSelector } from "@/redux/insightClient";
import { API_ROUTER } from "@/services/apiRouter";
import { FormGroup, Input, Label } from "@/styles/global/main.style";
import { ClientAddLayoutTableWrapper } from "@/styles/pages/client.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

export const ClientEdit = () => {
  // hooks

  const { toaster } = useToaster();
  const { t } = useTranslation();
  const { selectedClient } = useSelector(insightCheckSliceSelector);
  const dispatch = useDispatch();
  const calendarRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState();
  const [prevData, setPrevData] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  //states
  // const [phNo, setPhNo] = useState({
  //   countryCode: "",
  //   number: "",
  // });
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required("Username is required")
      .min(3, "Username is too short")
      .max(30, "Username is too long - should be at most 30 characters")
      .matches(/^[A-Za-z]+( [A-Za-z]+)*\s*$/, "Please Enter Valid UserName"),

    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Please Enter Email Address"),
    phoneNumber: yup
      .string()
      .required("Phone Number is required")
      .min(2, "Please enter a valid phone number"),
    birthDate: yup.date().required("Please select a date"),
  });

  const defaultValues = useMemo(() => {
    return {
      name: prevData?.username ? prevData?.username : "",
      email: prevData?.email ? prevData?.email : "",
      phoneNumber: prevData?.phone ? prevData?.countrycode + prevData?.phone : null,
      // phoneNumber: "12323123231",
      birthDate: prevData?.dob ? new Date(prevData?.dob) : null,
    };
  }, [prevData]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

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
    register,
    formState: { errors },
  } = methods;

  const cancel = async () => {
    reset();
    // setPhNo("");
    setValue("phoneNumber", null);
  };

  useEffect(() => {
    if (selectedClient?.userId) {
      GetClientDetail();
    }
  }, [selectedClient?.userId]);

  const CheckPhone = async (countrycode, phonenumber) => {
    const params = {
      phone: phonenumber,
      countrycode: `+${countrycode}`,
    };

    try {
      const res = await axiosApiCall.post(API_ROUTER?.CHECK_PHONE_NUMBER, params);
      if (!res?.status) {
        return res?.status;
      } else {
        if (res?.data?.status) {
          setErrorMsg("Phone number is already registered please use different number");
        }
      }
    } catch (error) {

      return error;
    }
  };

  const GetClientDetail = async () => {
    try {
      setDataLoading(true);
      const res = await axiosApiCall.get(
        API_ROUTER?.GET_CLIENT_DETAIL + `/${selectedClient?.userId}`
      );
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setPrevData(res?.data?.data);
        setSelectedDate(res?.data?.data?.dob);
        // setPhNo({
        //   "countryCode": res?.data?.data?.countrycode ? res?.data?.data?.countrycode : '',
        //   "number": res?.data?.data?.phone ? res?.data?.data?.phone : ''
        // });
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setDataLoading(false);
    }
  };

  const onSubmitForm = (formData) => {
    try {
      editClientData(formData);
    } catch (error) { }
  };

  const editClientData = async (formData) => {
    let country;
    let phoneNo;
    let date = moment(formData?.birthDate).format("YYYY-MM-DD");

    if (formData?.country_Code) {
      country = formData?.country_Code;
      const detail = formData?.phoneNumber.indexOf(formData?.country_Code);
      phoneNo = formData?.phoneNumber.substr(
        detail + formData?.country_Code.length,
        formData?.phoneNumber.length
      );
    } else {
      country = prevData?.countrycode;
      phoneNo = prevData?.phone;
    }

    // return;
    try {
      setLoading(true);
      const params = {
        name: formData?.name.trim(),
        birthday: date,
        phone: phoneNo,
        countryCode: country,
        // address: "4735 N Scottsdale Rd",
        email: formData?.email,
      };
      const res = await axiosApiCall.post(
        API_ROUTER?.EDIT_CLIENT_DATA + `/${selectedClient?.userId}`,
        params
      );
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        cancel();
        handleChange();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = () => {
    dispatch(handleRedirect("list"));
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
      <ClientAddLayoutTableWrapper className="sitback-updated-client-add-layout-div">
        <Loader loading={dataLoading} />
        <div className="select-reports-box-wrapper sibback-insights-add-clients">
          <Form onSubmit={handleSubmit(onSubmitForm)}>
            <Row>
              <Col sm={6}>
                <FormGroup className="white-input-wrapper">
                  <Label>{t("phonenumber")}</Label>
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <PhoneInput
                        placeholder={t("enterphoneNumber")}
                        specialLabel={t("phonenumber")}
                        className="phone-number-input-wrapper"
                        value={field?.value}
                        onChange={(data, formattedValue) => {
                          field.onChange(data);
                          setValue("country_Code", formattedValue?.dialCode);
                          let filedValue = data
                            ?.slice(formattedValue?.dialCode.length)
                            ?.replace(/[- )(]/g, "");
                          if (formattedValue?.dialCode && data.toString().length > 10) {
                            CheckPhone(formattedValue?.dialCode, filedValue);
                          } else {
                            setErrorMsg(null);
                          }
                        }}
                      />
                    )}
                  />
                  <p className="text-danger">{errors?.phoneNumber?.message}</p>
                  <p className="text-danger">{errorMsg}</p>
                </FormGroup>
              </Col>
              <Col sm={6}>
                <FormGroup className="white-input-wrapper">
                  <Label>{t("fullName")}</Label>
                  <Input type="text" placeholder="Will Smith" className="" {...register("name")} />
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
                    placeholder="Select birth date"
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
                className="loading-btn-wrapper sitback-updated-insight-btn-wrapper"
              />
            </div>
          </Form>
        </div>
      </ClientAddLayoutTableWrapper>
    </div>
  );
};
