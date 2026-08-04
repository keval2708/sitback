import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { memo, useEffect, useMemo, useState } from "react";
import { Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ReactSelect, { components } from "react-select";
import InlineSVG from "svg-inline-react";
import * as yup from "yup";
import LoadingButton from "@/components/shared/button/LoadingButton";
import Loader from "@/components/shared/spinner/loader";
import { useToaster } from "@/hooks";
import {
  handleStep,
  manageGuestResponse,
  manageSchedulerResponse,
  quickBookingSliceSelector,
} from "@/redux/quickBooking";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, FormGroup, Image, Label } from "@/styles/global/main.style";
import { SchedulerModalLayoutWrapper } from "@/styles/pages/scheduler.style";
import { StarV1_icon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const GuestOne = () => {
  // state
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { SingleValue, Option } = components;

  // const
  const [loading, setLoading] = useState(false);
  const [employeeLoader, setEmployeeLoader] = useState(false);
  const [SlotLoader, setSlotLoader] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedG1Employee, setSelectedG1Employee] = useState(null);
  const [employeeDataText, setEmployeeDataText] = useState(
    "Please select service to see available provider list"
  );
  const [SlotList, setAvailableSlot] = useState([]);
  const [SlotListText, setAvailableSlotText] = useState(
    "Available slot list will be displayed once you select specialist for specific service."
  );
  const { schedulerData, schedulerResponse, serviceData, guestResponse } =
    useSelector(quickBookingSliceSelector);

  // hooks
  const { toaster } = useToaster();

  // Form Config
  const defaultValues = useMemo(
    () => ({
      services: { value: "", label: "Select service" },
      guest1Provider: 0,
      guest1slots: "",
    }),
    []
  );

  // validation
  const formSchema = yup.object().shape({
    services: yup
      .object()
      .shape({
        value: yup.string().required("Service value Is Required"),
      })
      .test("is-selected", "Please select any option", (value) => {
        return value && value.value !== undefined;
      }),
    guest1Provider: yup.number(),
    guest1slots: yup.string(),
  });

  // Form Hooks
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = methods;
  const SelectedGuest1Provider = watch("guest1Provider");
  const SelectedGuest1Service = watch("services");

  // functions

  const onSubmitForm = async (formData) => {
    if (formData?.guest1Provider == 0) {
      if (employeeData?.length == 0) {
        return;
      }
      setError("guest1Provider", { message: "Please select the provider." });
      return;
    }
    if (formData?.guest1slots == "") {
      if (SlotList?.length == 0) {
        return;
      }
      setError("guest1slots", { message: "Please select the slots." });
      return;
    }
    setLoading(true);
    const parsedTime = moment(formData?.guest1slots, "h:mm:ss a");
    let createParam = {
      book_id: schedulerResponse?.tempBook?.data?.id,
      servicelist_id: SelectedGuest1Service?.value || schedulerResponse?.services?.value,
      employee_id: SelectedGuest1Provider,
      date: moment(schedulerResponse?.date).format("YYYY-MM-DD"),
      slot_time: parsedTime.format("hh:mm:ss"),
      time_type: parsedTime.format("a").toLowerCase(),
      charges: formData?.services?.price,
      sp_id: schedulerData?.sp_id,
    };
    const guest1Detail = {
      services: formData?.services,
      slots: {
        slot_time: parsedTime.format("hh:mm:ss"),
        time_type: parsedTime.format("a").toLowerCase(),
      },
      employee: { id: SelectedGuest1Provider, name: selectedG1Employee },
    };
    dispatch(manageSchedulerResponse({ ...schedulerResponse, guest1Detail: guest1Detail }));
    if (guestResponse?.guest1Res) {
      updateGuestData(createParam);
    } else {
      const res = await axiosApiCall.post(API_ROUTER?.TEMPBOOKAPPOINTMENT_BOOK_GUEST, createParam);
      if (!res?.status) {
        setLoading(false);
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        dispatch(manageGuestResponse({ guest1Res: res?.data }));
        if (schedulerResponse?.guest == 1) {
          setLoading(false);
          dispatch(handleStep(7));
        } else if (schedulerResponse?.guest > 1) {
          setLoading(false);
          dispatch(handleStep(4));
        }
      }
    }
  };

  const updateGuestData = async (filledData) => {
    try {
      setLoading(true);
      let param = {
        id: guestResponse?.guest1Res?.data?.id,
        book_id: filledData?.book_id,
        servicelist_id: filledData?.servicelist_id,
        employee_id: filledData?.employee_id,
        date: filledData?.date,
        slot_time: filledData?.slot_time,
        time_type: filledData?.time_type,
        charges: filledData?.charges,
        sp_id: schedulerData?.sp_id,
      };

      const res = await axiosApiCall.post(API_ROUTER?.TEMPBOOKAPPOINTMENT_update_book_guest, param);
      if (!res?.status) {
        setLoading(false);
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        if (schedulerResponse?.guest == 1) {
          setLoading(false);
          dispatch(handleStep(7));
        } else if (schedulerResponse?.guest > 1) {
          setLoading(false);
          dispatch(handleStep(4));
        }
      }
    } catch (error) {
      setLoading(false);
      return toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const IconSingleValue = (props) => (
    <SingleValue {...props}>
      <img src={props.data.image} style={{ height: "30px", width: "30px" }} alt="img-tag" />
      {props.data.label} {props?.data?.calculatedTime}
    </SingleValue>
  );

  const IconOption = (props) => (
    <Option {...props}>
      <img src={props.data.image} style={{ height: "30px", width: "30px" }} alt="img-tag" />
      {props.data.label} {props?.data?.calculatedTime}
    </Option>
  );

  const getServiceEmployee = async () => {
    try {
      setEmployeeLoader(true);
      let serviceEmployee = {
        servicelist_id: SelectedGuest1Service?.value || schedulerResponse?.guestService1?.value,
        date: moment(schedulerResponse?.date).format("YYYY-MM-DD"),
        sp_id: schedulerData?.sp_id,
      };
      const res = await axiosApiCall.post(
        API_ROUTER?.GET_SCHEDULAR_SERVICE_EMPLOYEE_LIST,
        serviceEmployee
      );
      if (!res?.status) {
        setEmployeeLoader(false);
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        if (res?.data?.data?.length == 0) {
          setEmployeeDataText("No massage specialists available.");
        }
        if (schedulerResponse?.guestService1 == undefined) {
          setValue("guest1Provider", 0);
          setAvailableSlot([]);
        }
        setEmployeeData(res?.data?.data);
        setEmployeeLoader(false);
      }
    } catch (error) {
      setEmployeeLoader(false);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const getAvailableSlot = async () => {
    try {
      setSlotLoader(true);
      let slotParam = {
        servicelist_id: SelectedGuest1Service?.value || schedulerResponse?.guestService1?.value,
        date: moment(schedulerResponse?.date).format("YYYY-MM-DD"),
        employee_id: SelectedGuest1Provider,
        sp_id: schedulerData?.sp_id,
        temp_guest_id: guestResponse?.guest1Res?.data?.id || 0,
        temp_main_id: 0,
      };
      const res = await axiosApiCall.post(API_ROUTER?.GET_SCHEDULAR_AVAILABLE_SLOT_LIST, slotParam);
      if (!res?.status) {
        setSlotLoader(false);
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        if (res?.data?.data?.length == 0) {
          if (SelectedGuest1Provider == 0) {
            setAvailableSlotText(
              "Available slot list will be displayed once you select specialist for specific service."
            );
          } else {
            setAvailableSlotText("No appointments available for selected specialist.");
          }
        }
        if (schedulerResponse?.guestService1 == undefined) {
          setValue("guest1slots", "");
        }
        setAvailableSlot(res?.data?.data);
        setSlotLoader(false);
      }
    } catch (error) {
      setSlotLoader(false);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const goBack = () => {
    dispatch(handleStep(2));
  };

  useEffect(() => {
    if (schedulerResponse?.guestService1 && schedulerResponse?.guestService1?.value != "") {
      if (schedulerResponse?.guest1Detail) {
        setValue("services", {
          value: schedulerResponse?.guest1Detail?.services?.value,
          label: schedulerResponse?.guest1Detail?.services?.label,
          image: schedulerResponse?.guest1Detail?.services?.image,
          time: schedulerResponse?.guest1Detail?.services?.time,
          price: schedulerResponse?.guest1Detail?.services?.price,
          calculatedTime: schedulerResponse?.guest1Detail?.services?.calculatedTime,
        });
        setValue("guest1Provider", schedulerResponse?.guest1Detail?.employee?.id);
        setValue(
          "guest1slots",
          `${schedulerResponse?.guest1Detail?.slots.slot_time} ${schedulerResponse?.guest1Detail?.slots?.time_type}`
        );
      } else {
        setValue("services", {
          value: schedulerResponse?.guestService1?.value,
          label: schedulerResponse?.guestService1?.label,
          image: schedulerResponse?.guestService1?.image,
          time: schedulerResponse?.guestService1?.time,
          price: schedulerResponse?.guestService1?.price,
          calculatedTime: schedulerResponse?.guestService1?.calculatedTime,
        });
      }
    }
  }, [schedulerResponse?.guestService1]);

  useEffect(() => {
    if (SelectedGuest1Service && SelectedGuest1Service?.value != "") {
      getServiceEmployee();
    }
  }, [SelectedGuest1Service]);

  useEffect(() => {
    if (SelectedGuest1Provider && SelectedGuest1Provider != 0) {
      getAvailableSlot();
    }
  }, [SelectedGuest1Provider]);

  useEffect(() => {
    if (SelectedGuest1Provider) {
      let emp_name = employeeData.filter((x) => x.id == SelectedGuest1Provider)[0]?.name;
      if (emp_name) {
        setSelectedG1Employee(emp_name);
      }
    }
  }, [SelectedGuest1Provider, employeeData]);

  return (
    <>
      <SchedulerModalLayoutWrapper>
        <Form onSubmit={handleSubmit(onSubmitForm)}>
          <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
            <Label>{t("availableFor")} </Label>
          </FormGroup>
          <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
            <div className="yourself-guest-detail">
              <h6>{t("guest")} # 1</h6>
            </div>
            <Controller
              name="services"
              control={control}
              render={({ field }) => (
                <ReactSelect
                  className="sitback-select2-container input-with-icon"
                  classNamePrefix="sitback-select-option"
                  placeholder="Select service"
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
            <div className="box-wrapper-div">
              <Label>{t("provider")}</Label>
              <Controller
                name="guest1Provider"
                control={control}
                render={({ field }) => (
                  <div className="checkbox-list-wrapper provider-appointment-section">
                    <Loader loading={employeeLoader} />
                    {employeeData?.length > 0 ? (
                      employeeData.map((employee, key) => (
                        <div className="checkbox-wrapper-div" key={key}>
                          <input
                            type="radio"
                            id={`guest1Provider${key + 1}`}
                            name="guest1Provider"
                            value={employee.id}
                            checked={field.value == employee.id}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              setSelectedG1Employee(employee?.name);
                            }}
                          />
                          <label htmlFor={`guest1Provider${key + 1}`}>
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
                                  {employee?.employeeReview && employee?.employeeReview == "0" ? (
                                    "No Rating"
                                  ) : (
                                    <h6 className="star-icon">
                                      <InlineSVG
                                        src={StarV1_icon}
                                        className="global_laguage_icon"
                                      />
                                      &nbsp;{employee?.employeeReview}
                                    </h6>
                                  )}
                                </p>
                              </div>
                            </div>
                          </label>
                        </div>
                      ))
                    ) : (
                      <p className="data-text">{!employeeLoader && employeeDataText}</p>
                    )}
                  </div>
                )}
              />
            </div>
            <p className="text-danger">{errors?.guest1Provider?.message}</p>
          </FormGroup>

          <FormGroup controlId="formBasicEmail">
            <div className="box-wrapper-div">
              <Label>{t("availAppoint")}</Label>
              <Controller
                name="guest1slots"
                control={control}
                render={({ field }) => (
                  <div className="checkbox-list-wrapper available-appointments-section">
                    <Loader loading={SlotLoader} />
                    {SlotList.length > 0 ? (
                      SlotList?.map((slot, key) => {
                        return (
                          <div className="checkbox-wrapper-div" key={key}>
                            <input
                              type="radio"
                              id={`guest1slots${key + 1}`}
                              name="guest1slots"
                              value={slot}
                              checked={field.value == slot}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                            <label htmlFor={`guest1slots${key + 1}`}>
                              <span></span>
                              <p>{slot && moment(slot, "HH:mm:ss a").format("h:mm A")}</p>
                            </label>
                          </div>
                        );
                      })
                    ) : (
                      <p className="data-text">{!SlotLoader && SlotListText}</p>
                    )}
                  </div>
                )}
              />
            </div>
            <p className="text-danger">{errors?.guest1slots?.message}</p>
          </FormGroup>

          <LoadingButton
            type="submit"
            disabled={loading}
            label={schedulerResponse?.guest == 1 ? `${t("confirmAndPay")}` : "Continue to Guest #2"}
            loadinglabel={
              schedulerResponse?.guest == 1 ? `${t("confirmAndPay")}` : "Continue to Guest #2"
            }
            isLoading={loading}
            className="loading-btn-wrapper"
          />
          <Button isBorderBtn={true} type="reset" onClick={() => goBack()}>
            {t("goBack")}
          </Button>
        </Form>
      </SchedulerModalLayoutWrapper>
    </>
  );
};

export default memo(GuestOne);
