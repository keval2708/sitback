import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import { default as ReactSelect, components } from "react-select";
import CreatableSelect from "react-select/creatable";
import InlineSVG from "svg-inline-react";
import * as yup from "yup";
import LoadingButton from "@/components/shared/button/LoadingButton";
import CustomModal from "@/components/shared/modal";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";

import {
  FormGroup,
  Image,
  Input,
  Label,
  SitBackModalBodyWrapper,
} from "@/styles/global/main.style";
import { StarV1_icon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const AddAppointmentsFromCalenderModal = ({
  show,
  onHide = () => { },
  setAppointmentDate,
  appointmentDate,
  setOnlineCardModal,
  setOfflineCardModal,
}) => {
  // constant
  const { SingleValue, Option } = components;
  // state
  const [loading, setLoading] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const [employeeDataText, setEmployeeDataText] = useState(
    "Please select service and date in order to see available provider list"
  );
  const [SlotList, setAvailableSlot] = useState([]);
  const [SlotListText, setAvailableSlotText] = useState(
    "Available slot list will be displayed once you select specialist for specific service and date."
  );
  const [phNo, setPhNo] = useState({
    countryCode: "",
    number: "",
  });

  const [stopEditEmail, setStopEditEmail] = useState(false);
  const [stopEditName, setStopEditName] = useState(false);
  const [stopEditPhone, setStopEditPhone] = useState(false);
  const [client, seClient] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedPhn, setSelectedPhn] = useState(null);
  const [onlyPhnNumber, setOnlyPhnNumber] = useState(null);
  const [onlyCountryCode, setOnlyCountryCode] = useState(null);

  // hooks
  const { toaster } = useToaster();
  const { t } = useTranslation();
  const [serviceData, setServiceData] = useState([]);

  const today = useRef(new Date());

  // methods
  const cancel = async () => {
    resetState();
    onHide();
    setSelectedUser(null);
  };

  const resetState = () => {
    reset(defaultValues);
    setValue("clientName", "");
    setValue("phoneNumber");
    setValue("email", "");
    setValue("services", { value: "", label: "Select Service" });
    setValue("date", new Date());
    setValue("provider", 0);
    setEmployeeData([]);
    setAvailableSlot([]);
    setValue("slots", "");
    setOnlyPhnNumber(null);
    setOnlyCountryCode(null);
    setAppointmentDate(null);
    setStopEditName(false);
    setStopEditEmail(false);
    setStopEditPhone(false);
    setSelectedPhn(null);
  };

  useEffect(() => {
    resetState();
  }, [show]);

  const IconSingleValue = (props) => (
    <SingleValue {...props}>
      <img src={props.data.image} style={{ height: "30px", width: "30px" }} alt="img-tag" />
      {props.data.label} {props?.data?.time}
    </SingleValue>
  );

  const IconOption = (props) => (
    <Option {...props}>
      <img src={props.data.image} style={{ height: "30px", width: "30px" }} alt="img-tag" />
      {props.data.label} {props?.data?.time}
    </Option>
  );

  // const PastSingleValue = (props) => (
  //   <SingleValue {...props}>
  //     <div className="past-appointment-wrapper">
  //       <p>Thu, Jul 25, 2024</p>
  //       <div className="past-appointment-detail">
  //         <p className="service">{props.data.label}-Karin dew</p>
  //       </div>
  //       <div className="past-appointment-detail">
  //         <p className="service">{props?.data?.time}</p>
  //         <p className="service">$20</p>
  //       </div>
  //     </div>
  //   </SingleValue>
  // );

  // const PastOption = (props) => (
  //   <Option {...props}>
  //     <div className="past-appointment-wrapper">
  //       <p>Thu, Jul 25, 2024</p>
  //       <div className="past-appointment-detail">
  //         <p className="service">{props.data.label}-Karin dew</p>
  //       </div>
  //       <div className="past-appointment-detail">
  //         <p className="service">{props?.data?.time}</p>
  //         <p className="service">$20</p>
  //       </div>
  //     </div>
  //   </Option>
  // );

  useEffect(() => {
    getServices();
    getClients();
  }, []);

  const RemoveSlots = async () => {
    try {
      const res = await axiosApiCall.post(API_ROUTER?.CLICK_ON_CREATE);
      if (!res?.status) {
        return res;
      } else {
        // setServiceData(res?.data?.data);
        // formatServiceData(res?.data?.data);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (show) {
      RemoveSlots();
    }
  }, [show]);

  // methods
  const formatServiceData = async (services) => {
    let options = [];
    services?.length &&
      services?.map((s) => {
        options.push({
          value: s?.id,
          label: s?.name,
          image: s?.image,
          price: s?.price,
          time: `(${s?.hour * 60 + s?.minutes} min)`,
        });
      });
    setServiceData(options);
  };

  // Form Config
  const defaultValues = useMemo(
    () => ({
      clientName: "",
      phoneNumber: selectedPhn ? selectedPhn : "",
      email: "",
      services: { value: "", label: "Select Service" },
      // pastAppoint: { value: "", label: "Select Service" },
      date: new Date(),
      provider: 0,
      slots: "",
      note: "",
      info: false,
    }),
    [selectedPhn]
  );

  // validation
  const formSchema = yup.object().shape({
    services: yup
      .object()
      .shape({
        value: yup.string().required("Service is required"),
      })
      .test("is-selected", "Please select any option", (value) => {
        return value && value.value !== undefined;
      }),
    // pastAppoint: yup
    //   .object()
    //   .shape({
    //     value: yup.string(),
    //   }),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .min(5, "Please enter a valid phone number"),
    email: yup
      .string()
      .required("Please enter email address")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Invalid email format."),
    provider: yup.number(),
    clientName: yup
      .string()
      .required("Client is required")
      .min(3, "Client is too short")
      .max(30, "Client is too long - should be at most 30 characters")
      .matches(/^[A-Za-z]+( [A-Za-z]+)*\s*$/, "Only letters are allowed in client name"),
    date: yup.date().required("Please select a date"),
    slots: yup.string(),
    note: yup
      .string()
      .notRequired()
      .nullable()
      .test("is-not-number", "Note must be a valid string, not a number", (value) => {
        if (value == "") {
          return true;
        } else if (/^[0-9]+$/.test(value)) {
          return false;
        } else if (/^[a-zA-Z0-9]+$/.test(value)) {
          return true;
        } else {
          return true;
        }
      }),
    info: yup.boolean().oneOf([true], "You must check this box to proceed"),
  });

  // Hooks
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    clearErrors,
    control,
    watch,
    formState: { errors },
  } = methods;

  const SelectedDate = watch("date");
  const SelectedService = watch("services");
  const SelectedProvider = watch("provider");

  const onSubmitForm = async (formData) => {
    const parsedTime = moment(formData?.slots, "h:mm:ss a");

    if (formData?.provider == 0) {
      if (employeeData?.length == 0) {
        return;
      }
      setError("provider", { message: "please select the provider." });
      return;
    }
    if (formData?.slots == "") {
      if (SlotList?.length == 0) {
        return;
      }
      setError("slots", { message: "please select the slots." });
      return;
    }

    try {
      setLoading(true);
      // onSubmit(formData);
      let bookAppointmentSpa = {
        servicelist_id: SelectedService.value,
        employee_id: SelectedProvider,
        date: SelectedDate && moment(SelectedDate).format("YYYY-MM-DD"),
        slot_time: parsedTime.format("hh:mm:ss"),
        time_type: parsedTime.format("a").toLowerCase(),
        charges: formData?.services?.price,
        total_charge_amount: formData?.services?.price,
        client_name: formData?.clientName,
        client_email: formData?.email,
        payment_by: "card",
        phone: phNo?.number ? phNo?.number : onlyPhnNumber,
        countrycode: `+${phNo?.countryCode ? phNo?.countryCode : onlyCountryCode}`,
        notes: formData?.note ? formData?.note : "",
      };

      if (appointmentDate) {
        updateManualAppointment(bookAppointmentSpa);
      } else {
        const res = await axiosApiCall.post(API_ROUTER?.BOOK_APPOINTMENT_SPA, bookAppointmentSpa);
        if (!res?.status) {
          setLoading(false);
          return toaster(res?.message, TOAST_TYPES.ERROR);
        } else {
          if (bookAppointmentSpa?.payment_by == "card") {
            setOnlineCardModal(true);
          } else if (bookAppointmentSpa?.payment_by == "cash") {
            setOfflineCardModal(true);
          }
          setAppointmentDate({ ...res?.data?.data, clientName: formData?.clientName });
          // cancel();
          setLoading(false);
          getClients();
          // setValue('providerName', res?.data?.data);
          // setEmployeeData(res?.data?.data);
        }
      }
    } catch (error) { }
  };

  const updateManualAppointment = async (filledData) => {
    try {
      setLoading(true);
      let bookAppointmentSpa = {
        id: appointmentDate?.id,
        servicelist_id: filledData?.servicelist_id,
        employee_id: filledData?.employee_id,
        date: filledData?.date,
        slot_time: filledData?.slot_time,
        time_type: filledData?.time_type,
        charges: filledData?.charges,
        total_charge_amount: filledData?.total_charge_amount,
        client_name: filledData?.client_name,
        client_email: filledData?.client_email,
        payment_by: filledData?.payment_by,
        user_id: appointmentDate?.user_id,
        isSlot_updated: false,
        slot_id: appointmentDate?.slot_id,
        notes: filledData?.notes ? filledData?.notes : "",
      };
      if (
        appointmentDate?.employee_id !== filledData?.employee_id ||
        appointmentDate?.servicelist_id !== filledData?.servicelist_id
      ) {
        if (appointmentDate?.slotData?.slot_time !== filledData?.slot_time) {
          bookAppointmentSpa.isSlot_updated = true;
        }
      }
      const res = await axiosApiCall.post(
        API_ROUTER?.UPDATE_BOOK_APPOINTMENT_SPA,
        bookAppointmentSpa
      );
      if (!res?.status) {
        setLoading(false);
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        if (bookAppointmentSpa?.payment_by == "card") {
          setOnlineCardModal(true);
        } else if (bookAppointmentSpa?.payment_by == "cash") {
          setOfflineCardModal(true);
        }
        getClients();
        setLoading(false);
      }
    } catch (error) { }
  };

  const getServiceEmployee = async () => {
    try {
      let serviceEmployee = {
        servicelist_id: SelectedService.value,
        date: moment(SelectedDate).format("YYYY-MM-DD"),
      };
      const res = await axiosApiCall.post(API_ROUTER?.GET_SERVICE_EMPLOYEE_LIST, serviceEmployee);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        // setValue('providerName', res?.data?.data);
        if (res?.data?.data?.length == 0) {
          setEmployeeDataText("No massage specialists available.");
          setAvailableSlotText(
            "Available slot list will be displayed once you select specialist for specific service and date."
          );
        }
        setEmployeeData(res?.data?.data);
        setValue("slots", "");
        setAvailableSlot([]);
        return res?.data?.data;
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const getAvailableSlot = async () => {
    try {
      let slotParam = {
        servicelist_id: SelectedService.value,
        date: moment(SelectedDate).format("YYYY-MM-DD"),
        employee_id: SelectedProvider,
      };
      const res = await axiosApiCall.post(API_ROUTER?.GET_AVAILABLE_SLOT_LIST, slotParam);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setAvailableSlot(res?.data?.data);
        return res?.data?.data;
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const getServices = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.GET_SERVICE_LIST);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        formatServiceData(res?.data?.data);
        setValue("provider", 0);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  useEffect(() => {
    if (SelectedService?.value && SelectedDate) {
      // fetchSlots();
      getServiceEmployee();
    } else {
      setAvailableSlotText(
        "Available slot list will be displayed once you select specialist for specific service and date."
      );
    }
  }, [SelectedDate, SelectedService]);

  useEffect(() => {
    setValue("provider", 0);
  }, [SelectedService, SelectedDate]);

  useEffect(() => {
    if (SelectedProvider != 0) {
      getAvailableSlot();
    }
  }, [SelectedProvider]);

  useEffect(() => {
    if (selectedUser?.__isNew__) {
      setStopEditName(true);
      setValue("clientName", selectedUser?.value);
      setStopEditEmail(false);
      setValue("email", "");
      setStopEditPhone(false);
      setSelectedPhn(null);
      setValue("phoneNumber", "");
      setOnlyPhnNumber(null);
      setOnlyCountryCode(null);
    } else {
      if (selectedUser?.value) {
        getClientDetail();
      }
    }
  }, [selectedUser]);

  const getClients = async () => {
    try {
      setLoading(true);
      const res = await axiosApiCall.get(API_ROUTER?.POST_ADD_CLIENT);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        let options = [];
        res?.data?.data.length &&
          res?.data?.data?.map((s) => {
            options.push({
              value: s?.userId,
              label: s?.username,
              phNo: s?.phone,
              code: s?.countrycode,
            });
          });
        seClient(options);
        // seClient(res?.data?.data)
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const getClientDetail = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.POS_USER_DETAIL + `${selectedUser?.value}`);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        if (!res?.data?.data?.email) {
          setStopEditEmail(false);
          setValue("email", "");
        } else {
          setStopEditEmail(true);
          setValue("email", res?.data?.data?.email);
          clearErrors("email");
        }

        if (!res?.data?.data?.username) {
          setStopEditName(false);
          setValue("clientName", "");
        } else {
          setStopEditName(true);
          setValue("clientName", res?.data?.data?.username);
          clearErrors("clientName");
        }
        if (!res?.data?.data?.countrycode && !res?.data?.data?.phone) {
          setStopEditPhone(false);
          setSelectedPhn(null);
          setValue("phoneNumber", "");
          setOnlyPhnNumber(null);
          setOnlyCountryCode(null);
        } else {
          setStopEditPhone(true);

          setValue("phoneNumber", res?.data?.data?.countrycode + res?.data?.data?.phone);
          setSelectedPhn(res?.data?.data?.countrycode + res?.data?.data?.phone);
          setOnlyPhnNumber(res?.data?.data?.phone);
          setOnlyCountryCode(res?.data?.data?.countrycode.slice(1));
          clearErrors("phoneNumber");
        }
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const IconSingleValue1 = (props) => (
    <SingleValue {...props}>
      <div className="user-name-number-text">
        {" "}
        <p>{props.data.label}</p>{" "}
        {props?.data?.code && (
          <p className="phone">
            ({props.data.code}) {props.data.phNo}
          </p>
        )}
      </div>
    </SingleValue>
  );

  const IconOption1 = (props) => (
    <Option {...props}>
      <div className="user-name-number-text">
        {" "}
        <p>{props.data.label}</p>{" "}
        {props?.data?.code && (
          <p className="phone">
            ({props.data.code}) {props.data.phNo}
          </p>
        )}
      </div>
    </Option>
  );

  const CheckPhone = async (countrycode, phonenumber) => {
    const params = {
      phone: phonenumber,
      countrycode: `+${countrycode}`,
    };

    try {
      const res = await axiosApiCall.post(API_ROUTER?.CHECK_PHONE_NUMBER, params);
      if (!res?.data?.status) {
        if (!res?.data?.data?.email) {
          setStopEditEmail(false);
          // setValue("email", "");
        } else {
          setStopEditEmail(true);
          // setValue("email", res?.data?.data?.email);
        }

        if (!res?.data?.data?.username) {
          setStopEditName(false);
          // setValue("clientName", "");
        } else {
          setStopEditName(true);
          // setValue("clientName", res?.data?.data?.username);
        }
        return res?.status;
      } else {
        if (res?.data?.status) {
          if (!res?.data?.data?.email) {
            setStopEditEmail(false);
            setValue("email", "");
          } else {
            setStopEditEmail(true);
            setValue("email", res?.data?.data?.email);
          }

          if (!res?.data?.data?.username) {
            setStopEditName(false);
            setValue("clientName", "");
          } else {
            setStopEditName(true);
            setValue("clientName", res?.data?.data?.username);
          }
          // setValue('email', res?.data?.data?.email)
        }
      }
    } catch (error) {
      return error;
    }
  };

  const handleSelectChange = (e) => {
    setSelectedUser(e);

    setTimeout(() => {
      setSelectedUser(null);
    }, 100);
  };

  return (
    <div>
      <CustomModal
        show={show}
        onHide={() => cancel()}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
        className="sitback-modal-wrapper sitbackmodalwrapper modal sitback-updated-payment-modal-wrapper sitback-new-appointment-modal-wrapper"
      >
        <Modal.Header
          closeButton
          className="red-close-icon"
          style={{ zIndex: 9 }}
          onClick={() => cancel()}
        ></Modal.Header>
        <Modal.Body className="pt-0">
          <SitBackModalBodyWrapper className="new-appointment-details">
            <h3 className="modal-title-text">{t("newAppointment")}</h3>
            <Form onSubmit={handleSubmit(onSubmitForm)}>
              <FormGroup controlId="formBasicEmail">
                {/* <div className="search-input-icon-wrapper"> */}
                {/* <Input
                    type="text"
                    placeholder="Search user"
                    value={searchInput}
                    onChange={(e) => handleSearch(e)}
                    className="search-input"
                    onKeyPress={(e) => searchInput && handleKeyPress(e)}
                  /> */}
                {/* <InlineSVG
                    src={Search_icon}
                    className="global_laguage_icon"
                    onClick={(e) => handleSearch(e)}
                  /> */}
                {/* </div> */}
                {/* {searchInput && (
                  <ul className="search-results">
                    {filteredClients?.map((option) => (
                      <li key={option.value} onClick={() => handleSelectUser(option)}>
                        {option.label} ({option.phNo})
                      </li>
                    ))}
                  </ul>
                )} */}
                <CreatableSelect
                  className="sitback-select2-container input-with-icon Select-Service-checkbox-wrapper"
                  classNamePrefix="sitback-select-option"
                  placeholder="Search user"
                  options={client}
                  closeMenuOnSelect={true}
                  isSearchable={true}
                  components={{
                    SingleValue: IconSingleValue1,
                    Option: IconOption1,
                  }}
                  value={selectedUser}
                  onChange={handleSelectChange}
                />
              </FormGroup>
              <FormGroup controlId="formBasicEmail">
                <Label>{t("cName")}</Label>
                <Input
                  type="text"
                  placeholder="Enter client name"
                  {...register("clientName")}
                  disabled={stopEditName ? true : false}
                />
                <p className="text-danger">{errors?.clientName?.message}</p>
              </FormGroup>
              <FormGroup controlId="formBasicEmail">
                <Label>{t("cPhoneNumber")}</Label>
                <PhoneInput
                  placeholder={t("enterphoneNumber")}
                  specialLabel={t("phonenumber")}
                  name="phoneNumber"
                  country={"us"}
                  disabled={stopEditPhone ? true : false}
                  className="phone-number-input-wrapper"
                  value={defaultValues && defaultValues?.phoneNumber.toString()}
                  // value={clientDetail ? clientDetail?.countrycode + clientDetail?.phone : ""}
                  onChange={(phone, data, event, formattedValue) => {
                    let countryCode = formattedValue.split(" ")[0];
                    let filedValue = formattedValue
                      ?.slice(countryCode.length + 1)
                      ?.replace(/[- )(]/g, "");
                    setPhNo({ countryCode: data?.dialCode, number: filedValue });
                    if (data?.dialCode && filedValue.toString().length === 10) {
                      CheckPhone(data?.dialCode, filedValue);
                    }
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
                {errors.phoneNumber && (
                  <p className="text-danger phone_input">{errors.phoneNumber.message}</p>
                )}
              </FormGroup>

              <FormGroup controlId="formBasicEmail">
                <Label>{t("cEmail")}</Label>
                <Input
                  type="text"
                  placeholder="Enter email address"
                  // {...register("email")}
                  {...register("email")}
                  disabled={stopEditEmail ? true : false}
                />
                {errors.email && <p className="text-danger">{errors.email.message}</p>}
                {/* <p className="text-danger">{errors?.email?.message}</p> */}
              </FormGroup>
              <FormGroup controlId="formBasicEmail">
                <Label>{t("selectservice")}</Label>
                <Controller
                  name="services"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      className="sitback-select2-container input-with-icon Select-Service-checkbox-wrapper"
                      classNamePrefix="sitback-select-option"
                      placeholder={t("selectservice")}
                      options={serviceData}
                      closeMenuOnSelect={true}
                      hideSelectedOptions={false}
                      components={{
                        ...(field.value.value ? { SingleValue: IconSingleValue } : {}),
                        Option: IconOption,
                      }}
                      onChange={(e) => field.onChange(e.target.value)}
                      {...field}
                      isSearchable={true}
                    />
                  )}
                />
                <p className="text-danger">{errors?.services?.value?.message}</p>
              </FormGroup>
              <FormGroup controlId="formBasicEmail">
                <Label>{t("dos")}</Label>
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <ReactDatePicker
                      placeholderText="Select date"
                      selected={field?.value ? field?.value : new Date()}
                      onChange={(date) => {
                        field.onChange(date);
                      }}
                      // value={field?.value ? field?.value : new Date()}
                      // {...field}
                      filterDate={(date) =>
                        date > moment(today.current).subtract(1, "day").toDate()
                      }
                      autoComplete="off"
                      openToDate={null}
                      dateFormat="MMMM dd"
                    />
                  )}
                />
                <p className="text-danger">{errors?.date?.message}</p>
              </FormGroup>

              <FormGroup controlId="formBasicEmail">
                <div className="box-wrapper-div">
                  <Label>{t("provider")}</Label>
                  <Controller
                    name="provider"
                    control={control}
                    render={({ field }) => (
                      <div className="checkbox-list-wrapper provider-appointment-section">
                        {employeeData?.length > 0 ? (
                          employeeData.map((employee, key) => (
                            <div className="checkbox-wrapper-div" key={key}>
                              <input
                                type="radio"
                                id={`provider${key + 1}`}
                                name="provider"
                                value={employee.id}
                                checked={field.value == employee.id}
                                onChange={(e) => field.onChange(e.target.value)}
                              />
                              <label htmlFor={`provider${key + 1}`}>
                                <span></span>
                                <div className="">
                                  <div className="user-img-wrapper">
                                    <Image
                                      alt="sitback"
                                      src={
                                        employee?.image
                                          ? employee?.image
                                          : "/images/sitback-relax-logo.svg"
                                      }
                                    />
                                  </div>
                                  <h6>{employee?.name}</h6>
                                  <div className="hour-text rating-text">
                                    <p>
                                      {employee?.employeeReview &&
                                        employee?.employeeReview === "0" ? (
                                        "No Rating"
                                      ) : (
                                        <h5 className="star-icon">
                                          {" "}
                                          <InlineSVG
                                            src={StarV1_icon}
                                            className="global_laguage_icon"
                                          />{" "}
                                          {employee?.employeeReview}
                                        </h5>
                                      )}
                                    </p>
                                  </div>
                                  {/* <p>
                                  <i>
                                    <Image isContainImg={true} alt="sitback" src="/images/star-Iconv3.svg" />
                                  </i>
                                  4.9
                                </p> */}
                                </div>
                              </label>
                            </div>
                          ))
                        ) : (
                          <p className="data-text">{employeeDataText}</p>
                        )}
                      </div>
                    )}
                  />
                </div>
                <p className="text-danger">
                  {SelectedService.value !== 0 && SelectedDate && employeeData.length > 0 ? (
                    errors?.provider?.message
                  ) : (
                    <></>
                  )}
                </p>
              </FormGroup>
              <FormGroup controlId="formBasicEmail">
                <div className="box-wrapper-div">
                  <Label>{t("availAppoint")}</Label>
                  <Controller
                    name="slots"
                    control={control}
                    render={({ field }) => (
                      <div className="checkbox-list-wrapper available-appointments-section">
                        {SlotList.length > 0 ? (
                          SlotList?.map((slot, key) => {
                            return (
                              <div className="checkbox-wrapper-div available-appointment-modal-wrapper" key={key}>
                                <input
                                  type="radio"
                                  id={`slots${key + 1}`}
                                  name="slots"
                                  value={slot}
                                  checked={field.value == slot}
                                  onChange={(e) => field.onChange(e.target.value)}
                                />
                                <label htmlFor={`slots${key + 1}`}>
                                  <span></span>
                                  <p>{slot && moment(slot, "HH:mm:ss a").format("h:mm A")}</p>
                                </label>
                              </div>
                            );
                          })
                        ) : (
                          <p style={{ width: "90%" }} className="data-text">{SlotListText}</p>
                        )}
                      </div>
                    )}
                  />
                </div>
                <p className="text-danger">
                  {SelectedService.value !== 0 &&
                    SelectedDate &&
                    SlotList.length > 0 &&
                    SelectedProvider !== 0 ? (
                    errors?.slots?.message
                  ) : (
                    <></>
                  )}
                </p>
              </FormGroup>
              <FormGroup className="formBasicEmail">
                <Label>Special Requests:</Label>
                <Input
                  type="text"
                  placeholder="Allergy with palm oil, nuts oil"
                  className=""
                  as="textarea"
                  rows={5}
                  {...register("note")}
                />
                <p className="text-danger">{errors?.note?.message}</p>
              </FormGroup>
              <FormGroup controlId="formBasicEmail">
                <div className="checkbox-wrapperv5">
                  <input
                    type="checkbox"
                    id="info"
                    name="info"
                    {...register("info")}
                    className="form -check-input"
                  // onChange={(e) => handleCheckAddTip(e)}
                  />
                  <p className="checkbox-wrapperv5-text">
                    I agree to receive OTP on the provided contact number.
                  </p>
                </div>
                <p className="text-danger">{errors?.info?.message}</p>
              </FormGroup>

              <div className="modal-footer-div">
                <LoadingButton
                  type="submit"
                  disabled={loading}
                  label={t("bookAppointmentText")}
                  loadinglabel={t("saving")}
                  isLoading={loading}
                  className="loading-btn-wrapper"
                />
              </div>
            </Form>
          </SitBackModalBodyWrapper>
        </Modal.Body>
      </CustomModal>
    </div>
  );
};

export default memo(AddAppointmentsFromCalenderModal);
