import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { memo, useEffect, useMemo, useState } from "react";
import { Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ReactSelect, { components } from "react-select";
import * as yup from "yup";
import * as gtag from "../../../lib/gtag";
import LoadingButton from "@/components/shared/button/LoadingButton";
import Loader from "@/components/shared/spinner/loader";
import { useToaster } from "@/hooks";
import {
  handleStep,
  manageSchedulerResponse,
  quickBookingSliceSelector,
} from "@/redux/quickBooking";
import { mySelectedDate, mySelectedServiceList, mySelectedSlot, mySelectedSpecialist, serviceSliceSelector } from "@/redux/service";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, FormGroup, Image, Label } from "@/styles/global/main.style";
import { SchedulerModalLayoutWrapper } from "@/styles/pages/scheduler.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const MainUser = () => {
  const { SingleValue, Option } = components;
  const { t } = useTranslation();
  // const pathname = usePathname();

  // const
  const [loading, setLoading] = useState(false);
  const [disableSlot, setDisableSlot] = useState(false);
  const [selectedMainEmployee, setSelectedMainEmployee] = useState(null);
  const [employeeData, setEmployeeData] = useState([]);
  const [employeeLoader, setEmployeeLoader] = useState(false);
  const [employeeDataText, setEmployeeDataText] = useState(
    "Please select service to see available provider list"
  );
  const [SlotList, setAvailableSlot] = useState([]);
  const [availableSpecificSlot, setAvailableSpecificSlot] = useState([]);
  const [SlotLoader, setSlotLoader] = useState(false);
  const [SlotListText, setAvailableSlotText] = useState(
    "Available slot list will be displayed once you select specialist for specific service."
  );
  const { schedulerData, schedulerResponse, serviceData } = useSelector(quickBookingSliceSelector);
  const {selectedSlot} = useSelector(serviceSliceSelector)
  const {selectedSpecialist} = useSelector(serviceSliceSelector)

  // hooks
  const { toaster } = useToaster();
  const dispatch = useDispatch();

  // Form Config
  const defaultValues = useMemo(
    () => ({
      services: { value: "", label: "Select service" },
      provider: 0,
      slots: "",
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
    provider: yup
    .number()
    .transform((value) => (isNaN(value) || value === "" ? undefined : Number(value)))
    .nullable()
    .required("Please select a provider"),
    slots: yup.string(),
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
    clearErrors,
  } = methods;
  const SelectedProvider = watch("provider");
  const SelectedService = watch("services");
  const SelectedSlots = watch("slots");
  const SelectedTimeSlots = watch("availableSlots");
  const [shouldFetchEmployees, setShouldFetchEmployees] = useState(true);
  const [shouldFetchSpecificSlot, setShouldFetchSpecificSlot] = useState(false);


  // functions
  const onSubmitForm = async (formData) => {
    // console.log("formData",formData);
    // return;

    if (formData?.provider == 0) {
      if (employeeData?.length == 0) {
        return;
      }
      setError("provider", { message: "Please select the provider." });
      return;
    }
    if (formData?.slots == '') {
      if (SlotList?.length == 0) {
        return;
      }
      setError("slots", { message: "Please select the slots." });
      return;
    }
    if (availableSpecificSlot?.length > 0 && formData?.availableSlots == '') {
      setError("availableSlots", { message: "Please select the slots." });
      return;
    }


  setShouldFetchEmployees(false); // Prevent API call during form submission

  setLoading(true);
  let createParam = {
    servicelist_id: SelectedService?.value || schedulerResponse?.services?.value,
    employee_id: SelectedProvider,
    date: moment(schedulerResponse?.date).format("YYYY-MM-DD"),
    slot_title: formData?.slots,
    charges: formData?.services?.price,
    total_guest: schedulerResponse?.guest,
    isguest: 1,
    sp_id: schedulerData?.sp_id,
  };

  const mainUser = {
    services: formData?.services,
    slots: { slot_title: formData?.slots },
    employee: { id: formData?.provider, name: selectedMainEmployee },
  };

  if(availableSpecificSlot?.length > 0) {
    if (formData?.availableSlots == "Request Any") {
        createParam.selectAny = formData?.availableSlots;
        mainUser.availableSlots = formData?.availableSlots;
    } else {
      createParam.slotstring = formData?.availableSlots;
      mainUser.availableSlots = formData?.availableSlots;
    }
    // else {
    //   const parsedTime = moment(formData?.availableSlots, "h:mm:ss a");
    //   createParam.slot_time = parsedTime.format("hh:mm:ss");
    //   createParam.time_type = parsedTime.format("a").toLowerCase();
    //   mainUser.availableSlots =  { slot_time: parsedTime.format("hh:mm:ss"), time_type: parsedTime.format("a").toLowerCase() };
    // }
  }

  dispatch(manageSchedulerResponse({ ...schedulerResponse, mainUser }));

  if (schedulerResponse?.tempBook) {
    updateMainData(createParam);
  } else {

    const res = await axiosApiCall.post(API_ROUTER?.TEMPBOOKAPPOINTMENT_QUICK_CREATE, createParam);
    if (!res?.status) {
      setLoading(false);
      return toaster(res?.message, TOAST_TYPES.ERROR);
    } else {
      if (process.env.SERVER_TYPE == "production") {
        gtag.trackBookingEvent("step-2", {
          label: schedulerData?.data?.username,
          url: `${window.location.href}/step-2`,
        });
        window.gtag('event', 'conversion', {'send_to': 'AW-11564679938/dWANCJ22_qgaEIKGvIor'});
      }
      dispatch(manageSchedulerResponse({ ...schedulerResponse, mainUser, tempBook: res?.data }));
      setShouldFetchEmployees(true); // Re-enable fetching if needed
      setLoading(false);
      dispatch(handleStep(schedulerResponse?.guest == 0 ? 7 : 3));
    }
  }
};


  const updateMainData = async (filledData) => {
    setShouldFetchEmployees(false);
    try {
      setLoading(true);
      let param = {
        id: schedulerResponse?.tempBook?.data?.id,
        book_id: filledData?.book_id,
        servicelist_id: filledData?.servicelist_id,
        employee_id: filledData?.employee_id,
        date: filledData?.date,
        slot_title: filledData?.slot_title,
        time_type: filledData?.time_type,
        charges: filledData?.charges,
        sp_id: schedulerData?.sp_id,
        // name:
      };
      if(availableSpecificSlot?.length > 0) {
        if(filledData?.selectAny == "Request Any") {
          param.selectAny = filledData?.selectAny;
        } else {
          // param.slot_time = filledData?.slot_time;
          // param.time_type = filledData?.time_type;
          param.slotstring = filledData?.slotstring;
        }

      }

      const res = await axiosApiCall.post(API_ROUTER?.TEMPBOOKAPPOINTMENT_QUICK_UPDATE_MAIN_USER, param);

      if (!res?.status) {
        setLoading(false);
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        if (schedulerResponse?.guest == 0) {
          setLoading(false);
          dispatch(handleStep(7));
        } else {
          setLoading(false);
          dispatch(handleStep(3));
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

  const getServiceEmployee = async (load = true) => {
    setDisableSlot(false)
    try {
      setEmployeeLoader(load);
      let serviceEmployee = {
        servicelist_id: SelectedService?.value || schedulerResponse?.services?.value,
        date: moment(schedulerResponse?.date).format("YYYY-MM-DD"),
        sp_id: schedulerData?.sp_id,
      };
      const res = await axiosApiCall.post(
        API_ROUTER?.GET_QUICK_SERVICE_EMPLOYEE_LIST,
        serviceEmployee
      );
      if (!res?.status) {
        setEmployeeLoader(false);
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        if (res?.data?.data?.length == 0) {
          setEmployeeDataText("No massage specialists available.");
        }
        if (schedulerResponse?.mainUser == undefined) {
          setValue("provider", 0);
          setAvailableSlot([]);
        }
        let specialists = res?.data?.data || [];

        if (selectedSpecialist != null) {
            if (res?.data?.data.some((specialist) => specialist.id === selectedSpecialist)) {
              setValue("provider", selectedSpecialist); // Update the provider field
            } else {
              setValue("provider", ""); // Reset the value if the provider is not available
            }
        } else {
          if (schedulerResponse?.mainUser == undefined) {
                if (specialists.length > 0) {
                  setValue("provider", specialists[0].id);
                }
              }

      }

        setEmployeeData(res?.data?.data);
        setEmployeeLoader(false);
        // removePendingPaymentData();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      setEmployeeLoader(false);
    }
  };

  const getAvailableSlot = async () => {
    setDisableSlot(false)
    try {
      setSlotLoader(true);
      let slotParam = {
        servicelist_id: SelectedService?.value || schedulerResponse?.services?.value,
        date: moment(schedulerResponse?.date).format("YYYY-MM-DD"),
        employee_id: SelectedProvider,
        sp_id: schedulerData?.sp_id,
        temp_guest_id: 0,
        temp_main_id: schedulerResponse?.tempBook?.data?.id || 0,
      };
      // const res = await axiosApiCall.post(API_ROUTER?.GET_QUICK_AVAILABLE_SLOT_LIST, slotParam);
      const res = await axiosApiCall.post(API_ROUTER?.GET_FIXED_AVAILABLE_SLOT_LIST, slotParam)
      if (!res?.status) {
        setSlotLoader(false);
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        if (res?.data?.data?.length == 0) {
          if (SelectedProvider == 0) {
            setAvailableSlotText(
              "Available slot list will be displayed once you select specialist for specific service."
            );
          } else {
            setAvailableSlotText("No appointments available for selected specialist.");
          }
        }

        if (schedulerResponse?.mainUser == undefined) {
          setValue("slots", "");
          setValue("availableSlots", "");
        }

        setShouldFetchSpecificSlot (res?.data?.is_slot_list_avaliable)
        //  setShouldFetchSpecificSlot (true)

        if (selectedSlot != null) {
            if (res?.data?.data.some((slot) => slot.slot_title === selectedSlot)) {
              setValue("slots", selectedSlot); // Update the slots field
            } else {
              setValue("slots", ""); // Reset the value if the slot is not available
              setValue("availableSlots", "");
            }
        } else {
          if (res?.data?.data.length > 0) {
             if (schedulerResponse?.mainUser == undefined || schedulerResponse?.mainUser?.slots?.slot_title != SelectedSlots) {
                let timeSlots = res?.data?.data || [];
                setValue("slots", res?.data?.data.length > 0 ? timeSlots[0]?.slot_title : ""); // Reset the value if the slots is not
              }

            setAvailableSpecificSlot([])
          }
        }

        setAvailableSlot(res?.data?.data);
        setSlotLoader(false);
      }
    } catch (error) {
      setSlotLoader(false);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };
  const getAvailableSpecificSlot = async () => {
    // console.log("SelectedSlots",SelectedSlots);
    // console.log("schedulerResponse?.mainUser?.slots?.slot_title",schedulerResponse?.mainUser?.slots?.slot_title);
    // console.log("SelectedTimeSlots",SelectedTimeSlots);
    if (schedulerResponse?.mainUser == undefined || schedulerResponse?.mainUser?.slots?.slot_title !=  SelectedSlots) {
      setValue("availableSlots", "");
      clearErrors("availableSlots");
    }
    setDisableSlot(false)
    try {
      setSlotLoader(true);
      let slotParam = {
        servicelist_id: SelectedService?.value || schedulerResponse?.services?.value,
        date: moment(schedulerResponse?.date).format("YYYY-MM-DD"),
        employee_id: SelectedProvider,
        sp_id: schedulerData?.sp_id,
        temp_guest_id: 0,
        temp_main_id: schedulerResponse?.tempBook?.data?.id || 0,
        slot_title: SelectedSlots,
      };
       const res = await axiosApiCall.post(API_ROUTER?.GET_QUICK_AVAILABLE_SLOT_LIST, slotParam);
      //const res = await axiosApiCall.post(API_ROUTER?.GET_FIXED_AVAILABLE_SLOT_LIST, slotParam);

      if (!res?.status) {
        setSlotLoader(false);
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        if (res?.data?.data?.length == 0) {
          // if (SelectedProvider == 0) {
          //   setAvailableSlotText(
          //     "Available slot list will be displayed once you select specialist for specific service."
          //   );
          // } else {
          //   setAvailableSlotText("No appointments available for selected specialist.");
          // }
        } else {
          if (SelectedTimeSlots != null && SelectedTimeSlots != '') {
            if (res?.data?.data.some((timeList) => timeList === SelectedTimeSlots)) {
              setValue("availableSlots", SelectedTimeSlots); // Update the availableSlots field
            } else {
              //setValue("availableSlots", ""); // Reset the value if the availableSlots is not

              let timeSlot = res?.data?.data || [];

              if (timeSlot.length > 0) {
                setValue("availableSlots", timeSlot[0]);
              }

            }
          }  else {

              let timeSlot = res?.data?.data || [];
              if (schedulerResponse?.mainUser == undefined || schedulerResponse?.mainUser?.slots?.slot_title != SelectedSlots) {
                if (timeSlot.length > 0) {
                  setValue("availableSlots", timeSlot[0]);
                }
              }
          }

        }

        setAvailableSpecificSlot(res?.data?.data);
        setSlotLoader(false);
      }
    } catch (error) {
      setSlotLoader(false);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  }

  const goBack = () => {
     dispatch(mySelectedServiceList(null)); // Dispatch the action to reset the selected slot
    dispatch(mySelectedDate(null))
    dispatch(handleStep(1));
  };

  useEffect(() => {
    if (schedulerResponse?.services && schedulerResponse?.services?.value != "") {
      if (schedulerResponse?.mainUser) {
        setValue("services", {
          value: schedulerResponse?.mainUser?.services?.value,
          label: schedulerResponse?.mainUser?.services?.label,
          image: schedulerResponse?.mainUser?.services?.image,
          time: schedulerResponse?.mainUser?.services?.time,
          price: schedulerResponse?.mainUser?.services?.price,
          calculatedTime: schedulerResponse?.mainUser?.services?.calculatedTime,
        });
        setValue("provider", schedulerResponse?.mainUser?.employee?.id);
        setValue(
          "slots",
          `${schedulerResponse?.mainUser?.slots.slot_title}`
        );
        // if(schedulerResponse?.mainUser?.availableSlots?.slot_time) {
        //    setValue('availableSlots', `${schedulerResponse?.mainUser?.availableSlots.slot_time} ${schedulerResponse?.mainUser?.availableSlots?.time_type}`);
        // } else if(schedulerResponse?.mainUser?.availableSlots == "Request Any") {
        //   setValue('availableSlots', `${schedulerResponse?.mainUser?.availableSlots}`);
        // }
        if(schedulerResponse?.mainUser?.availableSlots) {
          setValue('availableSlots', `${schedulerResponse?.mainUser?.availableSlots}`);
        }

      } else {
        setValue("services", {
          value: schedulerResponse?.services?.value,
          label: schedulerResponse?.services?.label,
          image: schedulerResponse?.services?.image,
          time: schedulerResponse?.services?.time,
          price: schedulerResponse?.services?.price,
          calculatedTime: schedulerResponse?.services?.calculatedTime,
        });
      }
    }
  }, [schedulerResponse]);

  useEffect(() => {
    if (SelectedProvider) {
      let emp_name = employeeData.filter((x) => x.id == SelectedProvider)[0]?.name;
      if (emp_name) {
        setSelectedMainEmployee(emp_name);
      }
    }
  }, [SelectedProvider, employeeData]);

  useEffect(() => {
    if (!shouldFetchEmployees) return; // Prevent API call if not needed

    dispatch(mySelectedServiceList(null));
    if (SelectedService && SelectedService?.value != "") {
      getServiceEmployee();
    }
  }, [SelectedService, shouldFetchEmployees]);


  useEffect(() => {
    if (!shouldFetchEmployees) return; // Prevent API call if not needed
      if (SelectedProvider && SelectedProvider != 0) {
        setShouldFetchSpecificSlot(false)
        getAvailableSlot();
      }
  }, [SelectedProvider,shouldFetchEmployees]);

  useEffect(() => {
    if (!shouldFetchSpecificSlot) return; // Prevent API call if not needed
      if (SelectedSlots && SelectedSlots != undefined) {
        getAvailableSpecificSlot();
      }
  }, [SelectedSlots,shouldFetchSpecificSlot]);




  useEffect(() => {
    if (process.env.SERVER_TYPE == "production") {
      const handleRouteChange = () => {
      const url = `${window.location.href}/step-2`;
        gtag.pageview(url);
      };
      handleRouteChange();
    }
  }, []);

  // useEffect(() => {

  // }, [selectedSlot]);

  return (
    <>
      <SchedulerModalLayoutWrapper className="mobile-width-wrapper">
      <div className="sit-step-display-div">
          <h5>Step 2 of 4</h5>
          <div className="step-content-wrapper">
            <div className="step-note-div active">
              <div className="step-round-wrapper">
                <span className="number-text">1</span>
                <span className="checkmark-icon">
                   <Image isContainImg={true} alt="sitback" src="/images/white-checkmark-icon.svg" />
                </span>
              </div>
            </div>
            <div className="step-note-div single-first-round-active">
              <div className="step-round-wrapper">
                <span className="number-text">2</span>
                <span className="checkmark-icon">
                   <Image isContainImg={true} alt="sitback" src="/images/white-checkmark-icon.svg" />
                </span>
              </div>
            </div>
            <div className="step-note-div">
              <div className="step-round-wrapper">
                <span className="number-text">3</span>
                <span className="checkmark-icon">
                   <Image isContainImg={true} alt="sitback" src="/images/white-checkmark-icon.svg" />
                </span>
              </div>
            </div>
            <div className="step-note-div">
              <div className="step-round-wrapper">
                <span className="number-text">4</span>
                <span className="checkmark-icon">
                   <Image isContainImg={true} alt="sitback" src="/images/white-checkmark-icon.svg" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <Form onSubmit={handleSubmit(onSubmitForm)}>
          <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
            {/* <Label>{t("availableFor")} </Label> */}

          </FormGroup>
          <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper d-none">
            <Label>{t("selectServiceText")}</Label>
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
                  onChange={(selected) => {
                    field.onChange(selected); // Update form state
                    dispatch(mySelectedSpecialist(null)); // Reset selected specialist
                    setValue("provider", ""); // Reset provider selection
                    setError("slots", { message: "" });
                  }}
                  value={field.value}

                  // isMulti
                  isSearchable={true}
                  // allowSelectAll={true}
                />
              )}
            />
            <p className="text-danger mt-1">{errors?.services?.value?.message}</p>
          </FormGroup>

           <FormGroup controlId="formBasicEmail">
            <div className="box-wrapper-div">
              <div className="text-center mb-3">
                <Label className="appointment-updated-text" style={{fontWeight: '600'}}>I’d like an appointment sometime in the... (Select One)</Label>
              </div>
              <Controller
                name="slots"
                control={control}
                render={({ field }) => (
                  <div className="checkbox-list-wrapper available-appointments-section checkbox-color-change sit-time-display-data-div">
                    <Loader loading={SlotLoader} />
                   {SlotList.length > 0 ? (
                      SlotList.filter(slot => slot.isShow).map((slot, key) => {
                        return (
                          <div className="checkbox-wrapper-div booking-radio-lable-wrapper" key={key}>
                            <input
                              type="radio"
                              id={`slots${key + 1}`}
                              name="slots"
                              value={slot?.slot_title}
                              checked={field.value == slot?.slot_title}
                              onChange={(e) => {
                                field.onChange(e.target.value); // Update the field value
                                dispatch(mySelectedSlot(null)); // Dispatch the action to reset the selected slot
                              }}
                            />
                            <label htmlFor={`slots${key + 1}`} className="appointment-label">
                              <span></span>
                              <div className="appointment-detail-display-div">
                                <p style={{fontWeight: '600'}} className="appointment-top-para-text">{slot?.slot_title}</p>
                                <p className="timetext">{slot?.description}</p>
                              </div>
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
            <p className="text-danger mt-1">{errors?.slots?.message}</p>
          </FormGroup>

            {availableSpecificSlot.length > 0 ?
            <>
              <FormGroup controlId="formBasicEmail" >
                <div className="box-wrapper-div time-slot-checkbox-main-wrapper">

                  <Controller
                    name="availableSlots"
                    control={control}
                    render={({ field }) => (
                      <div className="checkbox-list-wrapper available-appointments-section">
                        <Loader loading={SlotLoader} />
                        {availableSpecificSlot.length > 0 ? (
                          availableSpecificSlot?.map((slot, key) => {
                            return <div className="checkbox-wrapper-div" key={key}>
                              <input
                                type="radio"
                                id={`availableSlots${key + 1}`}
                                name="availableSlots"
                                value={slot}
                                checked={field.value == slot}
                                onChange={(e) => field.onChange(e.target.value)}
                              />
                              <label htmlFor={`availableSlots${key + 1}`}>
                                <span></span>
                                {slot == "Request Any" ? <p> {slot}</p> :
                                <p>{slot}</p> }
                              </label>
                            </div>;
                          })
                        ) : (
                          <p className="data-text">
                            {!SlotLoader && SlotListText}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
                <p className="text-danger">{errors?.availableSlots?.message}</p>
              </FormGroup>
            </> : '' }

          <FormGroup controlId="formBasicEmail">
            <div className="box-wrapper-div">
              <div className="text-center mb-3">
              <Label className="pb-1 appointment-updated-text" style={{fontWeight: '600'}}>With a...</Label>
              </div>
              <Controller
                name="provider"
                control={control}
                render={({ field }) => (
                  <div className="checkbox-list-wrapper provider-appointment-section checkbox-color-change provider-checkbox-main-user-div">
                    {/* <Loader loading={employeeLoader} /> */}
                     <Loader loading={SlotLoader} />

                    {employeeData?.length > 0 ? (
                      employeeData.map((employee, key) => (
                        <div className="checkbox-wrapper-div" key={key}>
                          <input
                            type="radio"
                            id={`provider${key + 1}`}
                            name="provider"
                            value={employee.id}
                            checked={field.value == employee.id}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              setSelectedMainEmployee(employee?.name);
                               dispatch(mySelectedSpecialist(null));
                            }}
                          />
                          <label htmlFor={`provider${key + 1}`}>
                            <span></span>
                            <div className="user-gender-div">
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
                              {/* <div className="hour-text rating-text">
                                <p>
                                  {employee?.employeeReview && employee?.employeeReview == "0" ? (
                                    ""
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
                              </div> */}
                            </div>
                          </label>
                        </div>
                      ))
                    ) : (
                      <p className="data-text" style={{ justifyContent: "flex-start" }}>{!employeeLoader && employeeDataText}</p>
                    )}
                  </div>
                )}
              />
            </div>
            <p className="text-danger mt-1">{errors?.provider?.message}</p>
          </FormGroup>
          <div className="footer-btns-wrapper-new-flow booking-step-btn-div">
            <LoadingButton
              type="submit"
              disabled={loading || disableSlot}
              label={schedulerResponse?.guest == 0 ? `Next` : "Next"}
              loadinglabel={
                schedulerResponse?.guest == 0 ? `Next` : "Next"
              }
              isLoading={loading}
              className="loading-btn-wrapper"
            />
            <Button type="reset" isBorderBtn={true} onClick={() => goBack()} className="go-back-btn">
             Go Back
            </Button>
          </div>
        </Form>
      </SchedulerModalLayoutWrapper>
    </>
  );
};

export default memo(MainUser);
