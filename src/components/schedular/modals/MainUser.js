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
import { handleStep, manageSchedulerResponse, schedulerSliceSelector } from "@/redux/scheduler";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, FormGroup, Image, Label } from "@/styles/global/main.style";
import { SchedulerModalLayoutWrapper } from "@/styles/pages/scheduler.style";
import { StarV1_icon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const MainUser = () => {
  const { SingleValue, Option } = components;
  const { t } = useTranslation();

  // const
  const [loading, setLoading] = useState(false)
  const [selectedMainEmployee, setSelectedMainEmployee] = useState(null);
  const [employeeData, setEmployeeData] = useState([]);
  const [employeeLoader, setEmployeeLoader] = useState(false);
  const [employeeDataText, setEmployeeDataText] = useState('Please select service to see available provider list');
  const [SlotList, setAvailableSlot] = useState([]);
  const [SlotLoader, setSlotLoader] = useState(false);
  const [SlotListText, setAvailableSlotText] = useState('Available slot list will be displayed once you select specialist for specific service.');
  const { schedulerData, schedulerResponse, serviceData } = useSelector(schedulerSliceSelector);

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
  const formSchema = yup
    .object()
    .shape({
      services: yup
        .object()
        .shape({
          value: yup.string().required("Service value Is Required"),
        })
        .test("is-selected", "Please select any option", (value) => {
          return value && value.value !== undefined;
        }),
      provider: yup
        .number(),
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
  } = methods;
  const SelectedProvider = watch("provider");
  const SelectedService = watch("services");

  // functions

  const onSubmitForm = async (formData) => {
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
    setLoading(true);
    const parsedTime = moment(formData?.slots, "h:mm:ss a");

    let createParam = {
      servicelist_id: SelectedService?.value || schedulerResponse?.services?.value,
      employee_id: SelectedProvider,
      date: moment(schedulerResponse?.date).format('YYYY-MM-DD'),
      slot_time: parsedTime.format("hh:mm:ss"),
      time_type: parsedTime.format("a").toLowerCase(),
      charges: formData?.services?.price,
      total_guest: schedulerResponse?.guest,
      isguest: 1,
      sp_id: schedulerData?.sp_id,
    };
    const mainUser = {
      services: formData?.services,
      // slots: formData?.slots,
      slots: { slot_time: parsedTime.format("hh:mm:ss"), time_type: parsedTime.format("a").toLowerCase() },
      employee: { id: formData?.provider, name: selectedMainEmployee }
    };
    dispatch(manageSchedulerResponse({ ...schedulerResponse, mainUser: mainUser }))

    if (schedulerResponse?.tempBook) {
      updateMainData(createParam);
    } else {
      const res = await axiosApiCall.post(API_ROUTER?.TEMPBOOKAPPOINTMENT_CREATE, createParam);
      if (!res?.status) {
        setLoading(false);
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        dispatch(manageSchedulerResponse({ ...schedulerResponse, mainUser: mainUser, tempBook: res?.data }))
        if (schedulerResponse?.guest == 0) {
          setLoading(false);
          dispatch(handleStep(7))
        } else {
          setLoading(false);
          dispatch(handleStep(3))
        }
      }
    }
  }

  const updateMainData = async (filledData) => {
    try {
      setLoading(true);
      let param = {
        id: schedulerResponse?.tempBook?.data?.id,
        book_id: filledData?.book_id,
        servicelist_id: filledData?.servicelist_id,
        employee_id: filledData?.employee_id,
        date: filledData?.date,
        slot_time: filledData?.slot_time,
        time_type: filledData?.time_type,
        charges: filledData?.charges,
        sp_id: schedulerData?.sp_id,
        // name:
      };

      const res = await axiosApiCall.post(API_ROUTER?.TEMPBOOKAPPOINTMENT_UPDATE_MAIN_USER, param);

      if (!res?.status) {
        setLoading(false);
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {

        if (schedulerResponse?.guest == 0) {
          setLoading(false);
          dispatch(handleStep(7))
        } else {
          setLoading(false);
          dispatch(handleStep(3))
        }
      }
    } catch (error) {
      setLoading(false);
      return toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  }

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
    try {
      setEmployeeLoader(load)
      let serviceEmployee = {
        servicelist_id: SelectedService?.value || schedulerResponse?.services?.value,
        date: moment(schedulerResponse?.date).format('YYYY-MM-DD'),
        sp_id: schedulerData?.sp_id,
      };
      const res = await axiosApiCall.post(API_ROUTER?.GET_SCHEDULAR_SERVICE_EMPLOYEE_LIST, serviceEmployee);
      if (!res?.status) {
        setEmployeeLoader(false)
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        if (res?.data?.data?.length == 0) {
          setEmployeeDataText("No massage specialists available.")
        }
        if (schedulerResponse?.mainUser == undefined) {
          setValue('provider', 0);
          setAvailableSlot([]);
        }
        setEmployeeData(res?.data?.data);
        setEmployeeLoader(false);
        // removePendingPaymentData();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      setEmployeeLoader(false)
    }
  };

  const getAvailableSlot = async () => {
    try {
      setSlotLoader(true);
      let slotParam = {
        servicelist_id: SelectedService?.value || schedulerResponse?.services?.value,
        date: moment(schedulerResponse?.date).format('YYYY-MM-DD'),
        employee_id: SelectedProvider,
        sp_id: schedulerData?.sp_id,
        temp_guest_id: 0,
        temp_main_id: schedulerResponse?.tempBook?.data?.id || 0,
      };
      const res = await axiosApiCall.post(API_ROUTER?.GET_SCHEDULAR_AVAILABLE_SLOT_LIST, slotParam);
      if (!res?.status) {
        setSlotLoader(false);
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        if (res?.data?.data?.length == 0) {
          if (SelectedProvider == 0) {
            setAvailableSlotText("Available slot list will be displayed once you select specialist for specific service.")
          } else {
            setAvailableSlotText("No appointments available for selected specialist.")
          }
        }
        if (schedulerResponse?.mainUser == undefined) {
          setValue("slots", '');
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
    dispatch(handleStep(1))
  }

  useEffect(() => {
    if (schedulerResponse?.services && schedulerResponse?.services?.value != '') {
      if (schedulerResponse?.mainUser) {
        setValue('services', {
          value: schedulerResponse?.mainUser?.services?.value,
          label: schedulerResponse?.mainUser?.services?.label,
          image: schedulerResponse?.mainUser?.services?.image,
          time: schedulerResponse?.mainUser?.services?.time,
          price: schedulerResponse?.mainUser?.services?.price,
          calculatedTime: schedulerResponse?.mainUser?.services?.calculatedTime,
        });
        setValue('provider', schedulerResponse?.mainUser?.employee?.id);
        setValue('slots', `${schedulerResponse?.mainUser?.slots.slot_time} ${schedulerResponse?.mainUser?.slots?.time_type}`);
      } else {
        setValue('services', {
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
      let emp_name = employeeData.filter((x) => x.id == SelectedProvider)[0]?.name
      if (emp_name) {
        setSelectedMainEmployee(emp_name);
      }
    }
  }, [SelectedProvider, employeeData])

  useEffect(() => {
    if (SelectedService && SelectedService?.value != '') {
      getServiceEmployee();

    }
  }, [SelectedService])

  useEffect(() => {
    if (SelectedProvider && SelectedProvider != 0) {
      getAvailableSlot();
    }
  }, [SelectedProvider]);

  return (
    <>

      <SchedulerModalLayoutWrapper>
        <Form onSubmit={handleSubmit(onSubmitForm)}>
          <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
            <Label>{t('availableFor')} </Label>
          </FormGroup>
          <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
            <Label>{t('selectServiceText')}</Label>
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
                  // isMulti
                  isSearchable={true}
                // allowSelectAll={true}
                />
              )}
            />
            <p className="text-danger">{errors?.services?.value?.message}</p>
          </FormGroup>

          <FormGroup controlId="formBasicEmail" >
            <div className="box-wrapper-div">
              <Label>{t('provider')}</Label>
              <Controller
                name="provider"
                control={control}
                render={({ field }) => (
                  <div className="checkbox-list-wrapper provider-appointment-section">
                    <Loader loading={employeeLoader} />
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
                              setSelectedMainEmployee(employee?.name)
                            }}
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
                                  {employee?.employeeReview && employee?.employeeReview == "0" ? (
                                    "No Rating"
                                  ) : <h6 className="star-icon"><InlineSVG src={StarV1_icon} className="global_laguage_icon" />&nbsp;{employee?.employeeReview}</h6>}
                                </p>
                              </div>
                            </div>
                          </label>
                        </div>
                      ))
                    ) : (
                      <p className="data-text">
                        {!employeeLoader && employeeDataText}
                      </p>
                    )}
                  </div>
                )}
              />

            </div>
            <p className="text-danger">{errors?.provider?.message}</p>
          </FormGroup>

          <FormGroup controlId="formBasicEmail" >
            <div className="box-wrapper-div">
              <Label>{t('availAppoint')}</Label>
              <Controller
                name="slots"
                control={control}
                render={({ field }) => (
                  <div className="checkbox-list-wrapper available-appointments-section">
                    <Loader loading={SlotLoader} />
                    {SlotList.length > 0 ? (
                      SlotList?.map((slot, key) => {
                        return <div className="checkbox-wrapper-div" key={key}>
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
            <p className="text-danger">{errors?.slots?.message}</p>
          </FormGroup>

          <LoadingButton
            type="submit"
            disabled={loading}
            label={schedulerResponse?.guest == 0 ? `${t('confirmAndPay')}` : "Continue to Guest #1"}
            loadinglabel={schedulerResponse?.guest == 0 ? `${t('confirmAndPay')}` : "Continue to Guest #1"}
            isLoading={loading}
            className="loading-btn-wrapper"
          />
          <Button type="reset" isBorderBtn={true} onClick={() => goBack()}>{t('goBack')}</Button>
        </Form>
      </SchedulerModalLayoutWrapper>

    </>
  );

};

export default memo(MainUser);
