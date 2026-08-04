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
  const { SingleValue, Option } = components;
  const { t } = useTranslation();

  // const
  const [loading, setLoading] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const [employeeDataText, setEmployeeDataText] = useState(
    "Please select service see available provider list"
  );
  const [SlotList, setAvailableSlot] = useState([]);
  const [SlotLoader, setSlotLoader] = useState(false);
  const [employeeLoader, setEmployeeLoader] = useState(false);
  const [selectedG4Employee, setSelectedG4Employee] = useState(null);
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
      guest4provider: 0,
      guest4slots: "",
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
    guest4provider: yup.number(),
    guest4slots: yup.string(),
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
  const SelectedGuest4provider = watch("guest4provider");
  const SelectedGuest4service = watch("services");

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
        servicelist_id: SelectedGuest4service?.value || schedulerResponse?.guestService4?.value,
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
        if (schedulerResponse?.guestService4 == undefined) {
          setValue("guest4provider", 0);
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
        servicelist_id: SelectedGuest4service?.value || schedulerResponse?.guestService4?.value,
        date: moment(schedulerResponse?.date).format("YYYY-MM-DD"),
        employee_id: SelectedGuest4provider,
        sp_id: schedulerData?.sp_id,
        temp_guest_id: guestResponse?.guest4Res?.data?.id || 0,
        temp_main_id: 0,
      };
      const res = await axiosApiCall.post(API_ROUTER?.GET_SCHEDULAR_AVAILABLE_SLOT_LIST, slotParam);
      if (!res?.status) {
        setSlotLoader(false);
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        if (res?.data?.data?.length == 0) {
          if (SelectedGuest4provider == 0) {
            setAvailableSlotText(
              "Available slot list will be displayed once you select specialist for specific service."
            );
          } else {
            setAvailableSlotText("No appointments available for selected specialist.");
          }
        }
        if (schedulerResponse?.guestService1 == undefined) {
          setValue("guest4slots", "");
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
    if (formData?.guest4provider == 0) {
      if (employeeData?.length == 0) {
        return;
      }
      setError("guest4provider", { message: "Please select the provider." });
      return;
    }
    if (formData?.guest4slots == "") {
      if (SlotList?.length == 0) {
        return;
      }
      setError("guest4slots", { message: "Please select the slots." });
      return;
    }

    setLoading(true);
    const parsedTime = moment(formData?.guest4slots, "h:mm:ss a");
    let createParam = {
      book_id: guestResponse?.guest1Res?.data?.book_id,
      servicelist_id: SelectedGuest4service?.value || schedulerResponse?.guestService3?.value,
      employee_id: SelectedGuest4provider,
      date: moment(schedulerResponse?.date).format("YYYY-MM-DD"),
      slot_time: parsedTime.format("hh:mm:ss"),
      time_type: parsedTime.format("a").toLowerCase(),
      charges: formData?.services?.price,
      sp_id: schedulerData?.sp_id,
    };
    const guest4Detail = {
      services: formData?.services,
      slots: {
        slot_time: parsedTime.format("hh:mm:ss"),
        time_type: parsedTime.format("a").toLowerCase(),
      },
      employee: { id: SelectedGuest4provider, name: selectedG4Employee },
    };
    dispatch(manageSchedulerResponse({ ...schedulerResponse, guest4Detail: guest4Detail }));
    if (guestResponse?.guest4Res) {
      updateGuestData(createParam);
    } else {
      const res = await axiosApiCall.post(API_ROUTER?.TEMPBOOKAPPOINTMENT_BOOK_GUEST, createParam);
      if (!res?.status) {
        setLoading(false);
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        dispatch(manageGuestResponse({ ...guestResponse, guest4Res: res?.data }));
        if (schedulerResponse?.guest == 4) {
          setLoading(false);
          dispatch(handleStep(7));
        }
      }
    }
  };

  const updateGuestData = async (filledData) => {
    try {
      setLoading(true);
      let param = {
        id: guestResponse?.guest4Res?.data?.id,
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
        if (schedulerResponse?.guest == 4) {
          setLoading(false);
          dispatch(handleStep(7));
        }
      }
    } catch (error) {
      setLoading(false);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const goBack = () => {
    dispatch(handleStep(5));
  };

  useEffect(() => {
    if (schedulerResponse?.guestService4 && schedulerResponse?.guestService4?.value != "") {
      if (schedulerResponse?.guest4Detail) {
        setValue("services", {
          value: schedulerResponse?.guest4Detail?.services?.value,
          label: schedulerResponse?.guest4Detail?.services?.label,
          image: schedulerResponse?.guest4Detail?.services?.image,
          time: schedulerResponse?.guest4Detail?.services?.time,
          price: schedulerResponse?.guest4Detail?.services?.price,
          calculatedTime: schedulerResponse?.guest4Detail?.services?.calculatedTime,
        });
        setValue("guest4provider", schedulerResponse?.guest4Detail?.employee?.id);
        setValue(
          "guest4slots",
          `${schedulerResponse?.guest4Detail?.slots.slot_time} ${schedulerResponse?.guest4Detail?.slots?.time_type}`
        );
      } else {
        setValue("services", {
          value: schedulerResponse?.guestService4?.value,
          label: schedulerResponse?.guestService4?.label,
          image: schedulerResponse?.guestService4?.image,
          time: schedulerResponse?.guestService4?.time,
          price: schedulerResponse?.guestService4?.price,
          calculatedTime: schedulerResponse?.guestService4?.calculatedTime,
        });
      }
    }
  }, [schedulerResponse?.guestService4]);

  useEffect(() => {
    if (SelectedGuest4provider) {
      let emp_name = employeeData.filter((x) => x.id == SelectedGuest4provider)[0]?.name;
      if (emp_name) {
        setSelectedG4Employee(emp_name);
      }
    }
  }, [SelectedGuest4provider, employeeData]);

  useEffect(() => {
    if (SelectedGuest4service && SelectedGuest4service?.value != "") {
      getServiceEmployee();
    }
  }, [SelectedGuest4service]);

  useEffect(() => {
    if (SelectedGuest4provider && SelectedGuest4provider != 0) {
      getAvailableSlot();
    }
  }, [SelectedGuest4provider]);

  return (
    <>
      <SchedulerModalLayoutWrapper>
        <Form onSubmit={handleSubmit(onSubmitForm)}>
          <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
            <Label>{t("availableFor")}</Label>
          </FormGroup>
          <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
            <div className="yourself-guest-detail">
              <h6>{t("guest")} # 4</h6>
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
                name="guest4provider"
                control={control}
                render={({ field }) => (
                  <div className="checkbox-list-wrapper provider-appointment-section">
                    <Loader loading={employeeLoader} />
                    {employeeData?.length > 0 ? (
                      employeeData.map((employee, key) => (
                        <div className="checkbox-wrapper-div" key={key}>
                          <input
                            type="radio"
                            id={`guest4provider${key + 1}`}
                            name="guest4provider"
                            value={employee.id}
                            checked={field.value == employee.id}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              setSelectedG4Employee(employee?.name);
                            }}
                          />
                          <label htmlFor={`guest4provider${key + 1}`}>
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
            <p className="text-danger">{errors?.guest4provider?.message}</p>
          </FormGroup>

          <FormGroup controlId="formBasicEmail">
            <div className="box-wrapper-div">
              <Label>{t("availAppoint")}</Label>
              <Controller
                name="guest4slots"
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
                              id={`guest4slots${key + 1}`}
                              name="guest4slots"
                              value={slot}
                              checked={field.value == slot}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                            <label htmlFor={`guest4slots${key + 1}`}>
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
            <p className="text-danger">{errors?.guest4slots?.message}</p>
          </FormGroup>

          <LoadingButton
            type="submit"
            disabled={loading}
            label={`${t("confirmAndPay")}`}
            loadinglabel={`${t("confirmAndPay")}`}
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
