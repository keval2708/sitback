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
  // const
  const { SingleValue, Option } = components;
  const { t } = useTranslation();

  // state
  const [loading, setLoading] = useState(false);
  const [selectedG3Employee, setSelectedG3Employee] = useState(null);
  const [employeeData, setEmployeeData] = useState([]);
  const [SlotLoader, setSlotLoader] = useState(false);
  const [employeeLoader, setEmployeeLoader] = useState(false);
  const [employeeDataText, setEmployeeDataText] = useState(
    "Please select service to see available provider list"
  );
  const [SlotList, setAvailableSlot] = useState([]);
  const [SlotListText, setAvailableSlotText] = useState(
    "Available slot list will be displayed once you select specialist for specific service."
  );
  const { schedulerData, schedulerResponse, guestResponse, serviceData } =
    useSelector(quickBookingSliceSelector);

  // hooks
  const { toaster } = useToaster();
  const dispatch = useDispatch();

  // Form Config
  const defaultValues = useMemo(
    () => ({
      services: { value: "", label: "Select service" },
      guest3provider: 0,
      guest3slots: "",
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
    guest3provider: yup.number(),
    guest3slots: yup.string(),
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
  const SelectedGuest3provider = watch("guest3provider");
  const SelectedGuest3service = watch("services");

  // functions

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
        servicelist_id: SelectedGuest3service?.value || schedulerResponse?.guestService3?.value,
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
        if (schedulerResponse?.guestService3 == undefined) {
          setValue("guest3provider", 0);
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
        servicelist_id: SelectedGuest3service?.value || schedulerResponse?.guestService3?.value,
        date: moment(schedulerResponse?.date).format("YYYY-MM-DD"),
        employee_id: SelectedGuest3provider,
        sp_id: schedulerData?.sp_id,
        temp_guest_id: guestResponse?.guest3Res?.data?.id || 0,
        temp_main_id: 0,
      };
      const res = await axiosApiCall.post(API_ROUTER?.GET_SCHEDULAR_AVAILABLE_SLOT_LIST, slotParam);
      if (!res?.status) {
        setSlotLoader(false);
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        if (res?.data?.data?.length == 0) {
          if (SelectedGuest3provider == 0) {
            setAvailableSlotText(
              "Available slot list will be displayed once you select specialist for specific service."
            );
          } else {
            setAvailableSlotText("No appointments available for selected specialist.");
          }
        }
        if (schedulerResponse?.guestService1 == undefined) {
          setValue("guest3slots", "");
        }
        setAvailableSlot(res?.data?.data);
        setSlotLoader(false);
      }
    } catch (error) {
      setSlotLoader(false);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const onSubmitForm = async (formData) => {
    if (formData?.guest3provider == 0) {
      if (employeeData?.length == 0) {
        return;
      }
      setError("guest3provider", { message: "Please select the provider." });
      return;
    }
    if (formData?.guest3slots == "") {
      if (SlotList?.length == 0) {
        return;
      }
      setError("guest3slots", { message: "Please select the slots." });
      return;
    }

    setLoading(true);
    const parsedTime = moment(formData?.guest3slots, "h:mm:ss a");
    let createParam = {
      book_id: guestResponse?.guest1Res?.data?.book_id,
      servicelist_id: SelectedGuest3service?.value || schedulerResponse?.guestService3?.value,
      employee_id: SelectedGuest3provider,
      date: moment(schedulerResponse?.date).format("YYYY-MM-DD"),
      slot_time: parsedTime.format("hh:mm:ss"),
      time_type: parsedTime.format("a").toLowerCase(),
      charges: formData?.services?.price,
      sp_id: schedulerData?.sp_id,
    };
    const guest3Detail = {
      services: formData?.services,
      slots: {
        slot_time: parsedTime.format("hh:mm:ss"),
        time_type: parsedTime.format("a").toLowerCase(),
      },
      employee: { id: SelectedGuest3provider, name: selectedG3Employee },
    };
    dispatch(manageSchedulerResponse({ ...schedulerResponse, guest3Detail: guest3Detail }));
    if (guestResponse?.guest3Res) {
      updateGuestData(createParam);
    } else {
      const res = await axiosApiCall.post(API_ROUTER?.TEMPBOOKAPPOINTMENT_BOOK_GUEST, createParam);
      if (!res?.status) {
        setLoading(false);
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        dispatch(manageGuestResponse({ ...guestResponse, guest3Res: res?.data }));
        if (schedulerResponse?.guest == 3) {
          setLoading(false);
          dispatch(handleStep(7));
        } else if (schedulerResponse?.guest > 3) {
          setLoading(false);
          dispatch(handleStep(6));
        }
      }
    }
  };

  const updateGuestData = async (filledData) => {
    try {
      setLoading(true);
      let param = {
        id: guestResponse?.guest3Res?.data?.id,
        book_id: filledData.book_id,
        servicelist_id: filledData.servicelist_id,
        employee_id: filledData.employee_id,
        date: filledData.date,
        slot_time: filledData.slot_time,
        time_type: filledData.time_type,
        charges: filledData.charges,
        sp_id: schedulerData?.sp_id,
      };

      const res = await axiosApiCall.post(API_ROUTER?.TEMPBOOKAPPOINTMENT_update_book_guest, param);
      if (!res?.status) {
        setLoading(false);
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        if (schedulerResponse?.guest == 3) {
          setLoading(false);
          dispatch(handleStep(7));
        } else if (schedulerResponse?.guest > 3) {
          setLoading(false);
          dispatch(handleStep(6));
        }
      }
    } catch (error) {
      setLoading(false);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  useEffect(() => {
    if (schedulerResponse?.guestService3 && schedulerResponse?.guestService3?.value != "") {
      if (schedulerResponse?.guest3Detail) {
        setValue("services", {
          value: schedulerResponse?.guest3Detail?.services.value,
          label: schedulerResponse?.guest3Detail?.services.label,
          image: schedulerResponse?.guest3Detail?.services.image,
          time: schedulerResponse?.guest3Detail?.services.time,
          price: schedulerResponse?.guest3Detail?.services.price,
          calculatedTime: schedulerResponse?.guest3Detail?.services?.calculatedTime,
        });
        setValue("guest3provider", schedulerResponse?.guest3Detail?.employee?.id);
        setValue(
          "guest3slots",
          `${schedulerResponse?.guest3Detail?.slots.slot_time} ${schedulerResponse?.guest3Detail?.slots?.time_type}`
        );
      } else {
        setValue("services", {
          value: schedulerResponse?.guestService3?.value,
          label: schedulerResponse?.guestService3?.label,
          image: schedulerResponse?.guestService3?.image,
          time: schedulerResponse?.guestService3?.time,
          price: schedulerResponse?.guestService3?.price,
          calculatedTime: schedulerResponse?.guestService3?.calculatedTime,
        });
      }
    }
  }, [schedulerResponse?.guestService3]);

  useEffect(() => {
    if (SelectedGuest3provider) {
      let emp_name = employeeData.filter((x) => x.id == SelectedGuest3provider)[0]?.name;
      if (emp_name) {
        setSelectedG3Employee(emp_name);
      }
    }
  }, [SelectedGuest3provider, employeeData]);

  useEffect(() => {
    if (SelectedGuest3service && SelectedGuest3service?.value != "") {
      getServiceEmployee();
    }
  }, [SelectedGuest3service, SelectedGuest3provider]);

  useEffect(() => {
    if (SelectedGuest3provider && SelectedGuest3provider != 0) {
      getAvailableSlot();
    }
  }, [SelectedGuest3provider]);

  const goBack = () => {
    dispatch(handleStep(4));
  };

  return (
    <>
      <SchedulerModalLayoutWrapper>
        <Form onSubmit={handleSubmit(onSubmitForm)}>
          <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
            <Label>{t("availableFor")}</Label>
          </FormGroup>
          <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
            <div className="yourself-guest-detail">
              <h6>{t("guest")} # 3</h6>
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
                name="guest3provider"
                control={control}
                render={({ field }) => (
                  <div className="checkbox-list-wrapper provider-appointment-section">
                    <Loader loading={employeeLoader} />
                    {employeeData?.length > 0 ? (
                      employeeData.map((employee, key) => (
                        <div className="checkbox-wrapper-div" key={key}>
                          <input
                            type="radio"
                            id={`guest3provider${key + 1}`}
                            name="guest3provider"
                            value={employee.id}
                            checked={field.value == employee.id}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              setSelectedG3Employee(employee?.name);
                            }}
                          />
                          <label htmlFor={`guest3provider${key + 1}`}>
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
            <p className="text-danger">{errors?.guest3provider?.message}</p>
          </FormGroup>

          <FormGroup controlId="formBasicEmail">
            <div className="box-wrapper-div">
              <Label>{t("availAppoint")}</Label>
              <Controller
                name="guest3slots"
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
                              id={`guest3slots${key + 1}`}
                              name="guest3slots"
                              value={slot}
                              checked={field.value == slot}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                            <label htmlFor={`guest3slots${key + 1}`}>
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
            <p className="text-danger">{errors?.guest3slots?.message}</p>
          </FormGroup>

          <LoadingButton
            type="submit"
            disabled={loading}
            label={schedulerResponse?.guest == 3 ? `${t("confirmAndPay")}` : "Continue to Guest #4"}
            loadinglabel={
              schedulerResponse?.guest == 3 ? `${t("confirmAndPay")}` : "Continue to Guest #4"
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
