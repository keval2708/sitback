import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import TimePicker from "rc-time-picker";
import { memo, useEffect, useMemo, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { default as ReactSelect, components } from "react-select";
import * as yup from "yup";
import LoadingButton from "@/components/shared/button/LoadingButton";
import CustomModal from "@/components/shared/modal";
import { useToaster } from "@/hooks";
import { serviceSliceSelector } from "@/redux/service";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, FormGroup, Label, SitBackModalBodyWrapper } from "@/styles/global/main.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const AddManageScheduleModal = ({
  show,
  onHide = () => { },
  onConfirm = () => { },
  employeeData,
}) => {
  // hooks
  const { toaster } = useToaster();
  const { t } = useTranslation();

  // constant
  const { SingleValue, Option } = components;
  const format = "h:mm a";
  const { serviceList } = useSelector(serviceSliceSelector);

  // state
  const [serviceData, setServiceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prevData, setPrevData] = useState();
  const [currentData, setCurrentData] = useState(null);
  const [oldData, setOldData] = useState(null);
  const [openLoading, setOpenLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const weekdays = [
    { value: "Sun", label: "Sunday" },
    { value: "Mon", label: "Monday" },
    { value: "Tue", label: "Tuesday" },
    { value: "Wed", label: "Wednesday" },
    { value: "Thu", label: "Thursday" },
    { value: "Fri", label: "Friday" },
    { value: "Sat", label: "Saturday" },
  ];

  const filteredWeekdays = weekdays?.filter((day) => day.value !== "Sun" && day.value !== "Sat");
  const val = filteredWeekdays?.map((day) => day.value);
  const defweekdays = val?.join(",");

  const DateRangeData = [
    { value: "", label: "Select Date Range", isDisabled: true },
    { value: "Ongoing", label: "Ongoing" },
    { value: "Custom", label: "Custom Dates" },
  ];

  const scheduleRangeData = [
    { value: "", label: "Select schedule Range", isDisabled: true },
    { value: "3", label: "3 month" },
    { value: "6", label: "6 month" },
  ];

  const staffAvailableData = [
    { value: "", label: "Select Staff Availability", isDisabled: true },
    { value: "1", label: "Available" },
    { value: "0", label: "Not Available" },
  ];

  const employeeScheduleList = async () => {
    try {
      // setOpenLoading(true);
      let data = { employee_id: employeeData?.id };
      const res = await axiosApiCall.post(API_ROUTER?.EMPLOYEE_SCHEDULE_DETAIL, data);
      if (!res?.status) {
        return res;
      } else {
        setPrevData(res?.data?.data);
      }
    } catch (error) {
      return error;
    } finally {
      // setOpenLoading(false);
    }
  };
  // methods
  useEffect(() => {
    formatServiceData();
  }, [serviceList]);

  // methods
  const formatServiceData = async () => {
    let options = [];
    serviceList?.length &&
      serviceList?.map((s) => {
        options.push({
          value: s?.id,
          label: s?.name,
          image: s?.image,
          // time: s?.serviceData?.hour * 60 + s?.serviceData?.minute,
          time: `(${s?.hour * 60 + s?.minutes} min)`,
        });
      });
    setServiceData(options);
  };

  useEffect(() => {
    if (show) {
      employeeScheduleList();
    }
  }, [employeeData, show]);

  const defaultValuess = useMemo(() => {
    //startTime
    const startPreType = prevData?.getDaterange[0]?.start_type;
    const startPreTime = moment(prevData?.getDaterange[0]?.start_time, "HH:mm:ss").format("h:mm");

    const st = `${startPreTime} ${startPreType}`;

    //EndTime
    const endPreType = prevData?.getDaterange[0]?.end_type;
    const endPreTime = moment(prevData?.getDaterange[0]?.end_time, "HH:mm:ss").format("h:mm");
    const et = `${endPreTime} ${endPreType}`;

    //weekdays
    const prevDays = prevData?.getDaterange[0]?.days?.split(",");
    const tempDays = weekdays?.map((day) => prevDays?.includes(day?.value));

    //dateRange
    const dateRangeLabel =
      DateRangeData?.find((item) => item.value === prevData?.getDaterange[0]?.dateRangeType)
        ?.label || "";

    //service
    let Chekedoption = [];
    prevData?.getDaterange[0]?.servicelist?.map((item) => {
      serviceData?.map((dt) => {
        if (item?.service_id == dt?.value) {
          Chekedoption.push({
            value: dt.value,
            label: dt.label,
            image: dt.image,
          });
        }
      });
    });

    //Staff
    const selectedStaffLabel =
      staffAvailableData?.find((item) => item.value === prevData?.getDaterange[0]?.isAvaliable)
        ?.label || "";
    return {
      service: prevData ? Chekedoption : [],
      staff: prevData
        ? { value: prevData.getDaterange[0]?.isAvaliable, label: selectedStaffLabel }
        : null,
      startdate:
        prevData?.getDaterange[0]?.dateRangeType === "Custom" && prevData?.getDaterange[0]
          ? new Date(prevData?.getDaterange[0]?.start_date)
          : null,
      enddate:
        prevData?.getDaterange[0]?.dateRangeType === "Custom" && prevData?.getDaterange[0]
          ? new Date(prevData?.getDaterange[0]?.end_date)
          : null,
      date: prevData
        ? { value: prevData.getDaterange[0]?.dateRangeType, label: dateRangeLabel }
        : null,
      days: prevData ? tempDays : [false, false, false, false, false, false, false],
      starttime: prevData?.getDaterange[0] ? moment(st, format) : null,
      endtime: prevData?.getDaterange[0] ? moment(et, format) : null,
    };
  }, [prevData]);

  const defaultValues = {
    service: [],
    staff: { value: "", label: "Select staff availability" },
    startdate: null,
    enddate: null,
    date: { value: "", label: "Select date range" },
    schedule: { value: "", label: "Select schedule range" },
    days: [false, false, false, false, false, false, false],
    starttime: "",
    endtime: "",
    note: false,
  };

  // useEffect(() => {
  //   reset(defaultValues);
  // }, [defaultValues]);

  // useEffect(() => {
  //   if (selectedStartDate && moment(selectedStartDate).isSame(moment(), 'day')) {
  //     setValue("starttime", currentStartTime);
  //     setValue("endtime", currentEndTime);
  //   }
  // }, [selectedStartDate, selectedEndDate]);

  // useEffect(() => {
  //   if (defaultValues.startdate && moment(defaultValues.startdate).isSame(moment(), 'day')) {
  //     setValue("starttime", moment());
  //   } else {
  //     setValue("starttime", defaultValues.starttime);
  //   }

  //   if (defaultValues.enddate && moment(defaultValues.enddate).isSame(moment(), 'day')) {
  //     setValue("endtime", moment());
  //   } else {
  //     setValue("endtime", defaultValues.endtime);
  //   }
  // }, [defaultValues]);

  // validation

  const CustomformSchema = yup
    .object()
    .shape({
      service: yup
        .array()
        .min(1, "Please select at least one service")
        .required("Please select at least one service"),
      staff: yup
        .object()
        .shape({
          value: yup.string().required("Staff availability is required"),
        })
        .test("is-selected", "Please select any option", (value) => {
          return value && value.value !== undefined;
        }),
      date: yup
        .object()
        .shape({
          value: yup.string().required("Date range is required"),
        })
        .test("is-selected", "Please select any option", (value) => {
          return value && value.value !== undefined;
        }),
      schedule: yup.object().when("date", {
        is: (val) => val.value == "Ongoing",
        then: (schema) =>
          schema.shape({
            value: yup.string().required("Schedule range is required"),
          }),
        otherwise: (schema) => schema.nullable(),
      }),

      startdate: yup.mixed().when("date", {
        is: (val) => val.value == "Custom",
        then: (schema) => schema.required("Start Date is required"),
        otherwise: (schema) => schema.nullable(),
      }),
      enddate: yup.mixed().when("date", {
        is: (val) => val.value == "Custom",
        then: (schema) =>
          schema
            .required("End date is required")
            .test("is-valid-date", "End date cannot be less than start date", function (value) {
              const { startdate } = this.parent;
              if (value && startdate) {
                return moment(value).isSameOrAfter(startdate);
              }
              return true;
            }),
        otherwise: (schema) => schema.nullable(),
      }),
      finaldate: yup.string().when("date", {
        is: (val) => val.value == "Custom",
        then: (schema) =>
          schema.test("date-validation", "Date range is invalid", function (value) {
            const { startdate, enddate } = this.parent;
            if (!startdate || !enddate) {
              return true;
            }
            if (moment(startdate).isSameOrBefore(enddate)) {
              return true;
            } else {
              return this.createError({
                message: "End date cannot be earlier than Start date",
              });
            }
          }),
        otherwise: (schema) => schema,
      }),
      starttime: yup
        .mixed()
        .required("Start time is required")
        .test("is-valid-time", "Start time cannot be greater than end time", function (value) {
          const { endtime } = this.parent;
          if (value && endtime) {
            return moment(value).isSameOrBefore(endtime);
          } else if (!value) {
            return this.createError({
              message: "Start time is required",
            });
          }
          return true;
        }),
      endtime: yup
        .mixed()
        .required("End time is required")
        .test("is-valid-time", "End time cannot be less than start time", function (value) {
          const { starttime } = this.parent;
          if (value && starttime) {
            return moment(value).isSameOrAfter(starttime);
          } else if (!value) {
            return this.createError({
              message: "End time is required",
            });
          }
          return true;
        }),
      days: yup.array().when("date", {
        is: (val) => val.value == "Ongoing",
        then: (schema) =>
          schema.test("at-least-one-day", "Please select at least one day", function (value) {
            return value.some((day) => day === true);
          }),
        otherwise: (schema) => schema,
      }),

      time: yup.string().test("time-validation", "Time range is invalid", function (value) {
        const { starttime, endtime } = this.parent;
        if (!starttime && !endtime) {
          return this.createError({
            message: "Please select start-time and end-time",
          });
        } else if (!starttime) {
          return this.createError({
            message: "Start-time is required",
          });
        } else if (!endtime) {
          return this.createError({
            message: "End-time is required",
          });
        } else {
          return moment(starttime).isSameOrBefore(endtime);
        }
      }),
      note: yup.boolean().when("staff", {
        is: (val) => val.value == "0",
        then: (schema) => schema.oneOf([true], "You must check this box to proceed"),
        otherwise: (schema) => schema.nullable(),
      }),
    })
    .strict(true);

  // Hooks
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(CustomformSchema),
    defaultValues,
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = methods;

  const valueCustom = watch("date");
  const staffAvailability = watch("staff");

  const cancel = async () => {
    resetState();
    reset();
    onHide();
  };

  const IconSingleValue = (props) => (
    <SingleValue {...props} key={props.data.value}>
      <input type="checkbox" checked={props?.isSelected} />
      <img src={props.data.image} style={{ height: "30px", width: "30px" }} alt="img-tag" />
      {props.data.label} {props?.data?.time}
    </SingleValue>
  );

  const IconOption = (props) => (
    <Option {...props} key={props.data.value}>
      <input type="checkbox" checked={props?.isSelected} />
      <img src={props.data.image} style={{ height: "30px", width: "30px" }} alt="img-tag" />
      {props.data.label} {props?.data?.time}
    </Option>
  );

  const onSubmitForm = (formData) => {
    try {
      onSubmit(formData);
    } catch (error) { }
  };

  const onSubmit = async (formData) => {
    const dt = formData.service.map((data) => data.value);
    const label = formData.service.map((data) => data.label);
    const service_ids = dt.join(",");
    let currentDate = moment().format("YYYY-MM-DD");

    const selectedDays = [];
    formData.days.forEach((isSelected, index) => {
      if (isSelected) {
        selectedDays.push(weekdays[index].value);
      }
    });
    const selected_days = selectedDays.join(",");

    let serviceData = {
      employee_id: employeeData?.id,
      isAvaliable: formData?.staff?.value,
      dateRangeType: formData?.date.value,
      serviceids: service_ids,
      days: formData?.date.value === "Ongoing" ? selected_days : "Sun,Mon,Tue,Wed,Thu,Fri,Sat", //defweekdays
      start_date:
        formData?.date.value == "Custom"
          ? moment(formData?.startdate).format("YYYY-MM-DD")
          : currentDate || "",
      end_date:
        formData?.date.value == "Custom"
          ? moment(formData?.enddate).format("YYYY-MM-DD")
          : moment().add(formData?.schedule?.value, "M").format("YYYY-MM-DD") || "",
      start_time: formData?.starttime.format("hh:mm:00"),
      end_time: formData?.endtime.format("hh:mm:00"),
      start_type: formData?.starttime.format("hh:mm:ss a").split(" ")[1],
      end_type: formData?.endtime.format("hh:mm:ss a").split(" ")[1],
    };
    try {
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.MANAGE_EMPLOYEE_SCHEDULE, serviceData);
      setCurrentData({ ...serviceData, servicename: label?.join(",") });
      if (!res?.status) {
        setIsPopupOpen(res?.isPopOpen);
        if (res?.oldData) {
          setOldData({ ...res?.oldData[0], replacenewentry: res?.replacenewentry });
          return true;
        }
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        cancel();
        onConfirm();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const updateDateRange = async () => {
    try {
      setOpenLoading(true);
      let serviceData = {
        old_id: oldData?.id,
        employee_id: oldData?.employee_id,
        isAvaliable: currentData?.isAvaliable,
        dateRangeType: currentData?.dateRangeType,
        serviceids: currentData?.serviceids,
        days:
          currentData?.dateRangeType === "Ongoing"
            ? currentData?.days
            : "Sun,Mon,Tue,Wed,Thu,Fri,Sat", //defweekdays
        start_date: currentData?.start_date,
        end_date: currentData?.end_date,
        start_time: currentData?.start_time,
        end_time: currentData?.end_time,
        start_type: currentData?.start_type,
        end_type: currentData?.end_type,
        replacenewentry: oldData?.replacenewentry,
      };
      const res = await axiosApiCall.post(API_ROUTER?.UPDATE_NEW_DATERANGE, serviceData);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        cancelUpdate();
        // cancel();
        // onConfirm();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setOpenLoading(false);
    }
  };

  const cancelUpdate = () => {
    setIsPopupOpen(false);
    cancel();
    onConfirm();
  };

  const popupClose = () => {
    setIsPopupOpen(false);
  };

  const resetState = () => {
    setValue("service", [] || null);
    setValue("staff", {} || null);
    setValue("date", {} || null);
    setValue("days", [false, false, false, false, false, false, false]);
    setValue("starttime", null);
    setValue("endtime", null);
    setValue("startdate", null);
    setValue("enddate", null);
    setValue("note", false);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    // setPrevData(null);
  };

  const example = "time-picker";

  return (
    <>
      <CustomModal
        show={show}
        onHide={() => cancel()}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
        className="sitback-modal-wrapper sitback-updated-profile-service-modal"
      >
        <Modal.Body>
          <SitBackModalBodyWrapper>
            <h3 className="modal-title-text">{employeeData?.name}</h3>
            <Form onSubmit={handleSubmit(onSubmitForm)} className="mange-schedule-form">
              <FormGroup controlId="formBasicEmail">
                <Label>{t("staffAvail")}</Label>
                <Controller
                  name="staff"
                  placeholder="Select staff availability"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      isMulti={false}
                      className="sitback-select2-container input-with-icon"
                      classNamePrefix="sitback-select-option"
                      placeholder="Select staff availability"
                      options={staffAvailableData}
                      closeMenuOnSelect={true}
                      hideSelectedOptions={false}
                      isSearchable={true}
                      {...field}
                    />
                  )}
                />
                <p className="text-danger mt-1">{errors?.staff?.value?.message}</p>
              </FormGroup>

              <FormGroup controlId="formBasicservice">
                <Label>Select Services</Label>
                <Controller
                  name="service"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      className="sitback-select2-container input-with-icon Select-Service-checkbox-wrapper"
                      classNamePrefix="sitback-select-option"
                      placeholder="Select Services"
                      options={serviceData}
                      closeMenuOnSelect={false}
                      hideSelectedOptions={false}
                      components={{
                        SingleValue: IconSingleValue,
                        Option: IconOption,
                      }}
                      {...field}
                      isMulti
                      isSearchable={true}
                      allowSelectAll={true}
                    />
                  )}
                />

                <p className="text-danger mt-1">{errors?.service?.message}</p>
              </FormGroup>

              <FormGroup controlId="formBasicEmail">
                <Label htmlFor="dob">{t("dateRange")}</Label>
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      placeholder="Select date range"
                      className="sitback-select2-container input-with-icon"
                      classNamePrefix="sitback-select-option"
                      options={DateRangeData}
                      closeMenuOnSelect={true}
                      hideSelectedOptions={false}
                      isSearchable={true}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setValue("starttime", null);
                        setValue("endtime", null);
                      }}
                    />
                  )}
                />
                <p className="text-danger mt-1">{errors?.date?.value?.message}</p>
              </FormGroup>

              <div
                className="date-input-wrappper"
                hidden={valueCustom?.value === "Custom" ? false : true}
              >
                <Label htmlFor="dob">Date</Label>
                <div className="row-grid">
                  <div className="col-grid">
                    <FormGroup controlId="formBasicEmail">
                      <Controller
                        name="startdate"
                        control={control}
                        render={({ field }) => (
                          <ReactDatePicker
                            className="datepicker-input"
                            placeholderText="Select start date"
                            dateFormat="MMMM,dd,yyyy"
                            selected={field?.value}
                            minDate={new Date()}
                            onChange={(date) => {
                              setSelectedStartDate(date);
                              field.onChange(date);
                              setValue("starttime", null);
                              setValue("endtime", null);
                            }}
                          />
                        )}
                      />
                    </FormGroup>
                    <p className="text-danger mt-1">{errors?.startdate?.message}</p>
                  </div>
                  <div className="totext-center">
                    <h6>To</h6>
                  </div>
                  <div className="col-grid">
                    <FormGroup controlId="formBasicEmail">
                      <Controller
                        name="enddate"
                        control={control}
                        render={({ field }) => {
                          return (
                            <ReactDatePicker
                              className="datepicker-input"
                              dateFormat="MMMM,dd,yyyy"
                              placeholderText="Select end date"
                              selected={field?.value}
                              minDate={new Date()}
                              onChange={(date) => {
                                setSelectedEndDate(date);
                                field.onChange(date);
                                setValue("starttime", null);
                                setValue("endtime", null);
                              }}
                            />
                          );
                        }}
                      />
                    </FormGroup>
                    <p className="text-danger mt-1">{errors?.enddate?.message}</p>
                  </div>
                  <p className="text-danger mt-1">{errors?.finaldate?.message}</p>
                </div>
              </div>

              <FormGroup
                controlId="formBasicEmail"
                hidden={valueCustom?.value === "Ongoing" ? false : true}
              >
                <Label htmlFor="schedule">{t("scheduleRange")}</Label>
                <Controller
                  name="schedule"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      placeholder="Select schedule range"
                      className="sitback-select2-container input-with-icon"
                      classNamePrefix="sitback-select-option"
                      options={scheduleRangeData}
                      closeMenuOnSelect={true}
                      hideSelectedOptions={false}
                      isSearchable={true}
                      {...field}
                    />
                  )}
                />
                <p className="text-danger mt-1">{errors?.schedule?.value?.message}</p>
              </FormGroup>

              <FormGroup
                controlId="formBasicEmail"
                hidden={valueCustom?.value === "Ongoing" ? false : true}
              >
                <Label>Select Days</Label>
                <div className="checkbox-list-wrapper available-times">
                  {weekdays.map((day, index) => {
                    return (
                      <Controller
                        key={index}
                        name={`days[${index}]`}
                        control={control}
                        render={({ field }) => (
                          <Form.Check
                            key={index}
                            label={day.label}
                            type="checkbox"
                            multiple
                            id={`inline-checkbox-${index}`}
                            className="checkbox-wrapper-div"
                            checked={field.value}
                            value={day.value}
                            {...field}
                          // disabled={disableDay}
                          />
                        )}
                      />
                    );
                  })}
                </div>
                <p className="text-danger mt-1">{errors?.days?.message}</p>
              </FormGroup>

              <div className="date-input-wrappper">
                <Label htmlFor="dob">Time</Label>
                <div className="row-grid">
                  <div className="col-grid" id={example}>
                    <FormGroup controlId="formBasicEmail">
                      <Controller
                        name="starttime"
                        control={control}
                        render={({ field }) => (
                          <TimePicker
                            showSecond={false}
                            {...field}
                            placeholder="Select start time"
                            className="time-addinput-wrapper"
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                            minuteStep={15}
                            // hourStep={1}
                            format={format}
                            getPopupContainer={(node) => {
                              return document.getElementById(example);
                            }}
                            use12Hours
                            inputReadOnly
                            // defaultTime={}
                            hideDisabledOptions={true}
                            disabledHours={() => {
                              if (
                                moment(selectedStartDate).isBefore(moment()) &&
                                moment(selectedEndDate).isSame(moment(), "day")
                              ) {
                                const currentHour = moment().hour();
                                // if (selectedStartDate && moment(selectedStartDate).isSame(moment(), 'day')) {
                                //   return Array.from({ length: currentHour }, (_, i) => i);
                                // }
                                return Array.from({ length: currentHour }, (_, i) => i);
                              }
                              return [];
                            }}
                            disabledMinutes={(selectedHour) => {
                              if (
                                moment(selectedStartDate).isBefore(moment()) &&
                                moment(selectedEndDate).isSame(moment(), "day")
                              ) {
                                const currentHour = moment().hour();
                                const currentMinute = moment().minute();
                                // if (selectedStartDate && moment(selectedStartDate).isSame(moment(), 'day')) {
                                //   if (selectedHour === currentHour) {
                                //     return Array.from({ length: currentMinute }, (_, i) => i);
                                //   }
                                // }
                                if (selectedHour === currentHour) {
                                  return Array.from({ length: currentMinute }, (_, i) => i);
                                }
                                return [];
                              }
                            }}
                          />
                        )}
                      />
                    </FormGroup>
                    <p className="text-danger">{errors?.starttime?.message}</p>
                  </div>
                  <div className="totext-center">
                    <h6>To</h6>
                  </div>
                  <div className="col-grid" id={example}>
                    <FormGroup controlId="formBasicEmail">
                      <Controller
                        name="endtime"
                        control={control}
                        render={({ field }) => (
                          <TimePicker
                            showSecond={false}
                            {...field}
                            placeholder="Select end time"
                            className="time-addinput-wrapper"
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                            format={format}
                            minuteStep={15}
                            getPopupContainer={(node) => {
                              return document.getElementById(example);
                            }}
                            use12Hours
                            onBlur={() => trigger("time")}
                            inputReadOnly
                            hideDisabledOptions={true}
                            disabledHours={() => {
                              if (
                                selectedEndDate &&
                                moment(selectedEndDate).isAfter(moment(), "day")
                              ) {
                                return [];
                              }
                              const currentHour = moment().hour();
                              if (
                                selectedEndDate &&
                                moment(selectedEndDate).isSame(moment(), "day")
                              ) {
                                return Array.from({ length: currentHour }, (_, i) => i);
                              }
                            }}
                            disabledMinutes={(selectedHour) => {
                              if (
                                selectedEndDate &&
                                moment(selectedEndDate).isAfter(moment(), "day")
                              ) {
                                return [];
                              }
                              const currentHour = moment().hour();
                              const currentMinute = moment().minute();
                              if (
                                selectedEndDate &&
                                moment(selectedEndDate).isSame(moment(), "day")
                              ) {
                                if (selectedHour === currentHour) {
                                  return Array.from({ length: currentMinute }, (_, i) => i);
                                }
                              }
                              return [];
                            }}
                          />
                        )}
                      />
                    </FormGroup>
                    <p className="text-danger">{errors?.endtime?.message}</p>
                  </div>
                </div>
              </div>

              <FormGroup
                controlId="formBasicEmail"
                hidden={staffAvailability?.value === "0" ? false : true}
              >
                <div className="checkbox-wrapperv5">
                  <input
                    type="checkbox"
                    id="note"
                    name="note"
                    {...register("note")}
                    className="form-check-input"
                  />

                  <p className="checkbox-wrapperv5-text">
                    This schedule overwrite is permanent and cannot be changed once you submit
                  </p>
                </div>
                <p className="text-danger mt-1">{errors?.note?.message}</p>
              </FormGroup>

              <div className="modal-footer-div mt-2">
                <LoadingButton
                  type="submit"
                  disabled={loading}
                  label="SAVE CHANGES"
                  loadinglabel="Saving..."
                  isLoading={loading}
                  className="loading-btn-wrapper"
                />
                <Button variant="primary" type="reset" isBorderBtn={true} onClick={() => cancel()} className="sitback-updated-cancel-btn-wrapper">
                  {t("cancelCaps")}
                </Button>
              </div>
            </Form>
          </SitBackModalBodyWrapper>
        </Modal.Body>
      </CustomModal>

      <Modal
        show={isPopupOpen}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
        className="sitback-modal-wrapper changethe-slottime-modal"
      >
        <Modal.Header
          closeButton
          className="red-close-icon"
          onClick={() => popupClose()}
        ></Modal.Header>
        <Modal.Body>
          <div className="sitback-request-modal-wrapper">
            <h3>{t("changeDataText")}</h3>
            <div className="box-wrapper">
              <div className="greybox-wrapper">
                <div className="boxwhite">
                  <h6>{t("oldData")}</h6>
                  <ul>
                    <li>
                      Selected {oldData?.isAvaliable == 0 ? "unAvailable" : "available"}:{" "}
                      {oldData?.dateRangeType}
                    </li>
                    {oldData?.isAvaliable == 0 ? <li>Selected days: {oldData?.days}</li> : <></>}
                    <li>
                      {t("selectedService")}: {oldData?.servicename}
                    </li>
                    <li>
                      {t("selectedDateRange")} : {moment(oldData?.start_date).format("DD-MM-YYYY")}{" "}
                      To {moment(oldData?.end_date).format("DD-MM-YYYY")}
                    </li>
                    <li>
                      {t("selectedTimeRange")}: {oldData?.start_time} {oldData?.start_type} To{" "}
                      {oldData?.end_time} {oldData?.end_type}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="greybox-wrapper">
                <div className="boxwhite">
                  <h6>{t("newData")}</h6>
                  <ul>
                    <li>
                      Selected {currentData?.isAvaliable == 0 ? "unAvailable" : "available"}:{" "}
                      {currentData?.dateRangeType}
                    </li>
                    {oldData?.isAvaliable == 0 ? (
                      <li>Selected days: {currentData?.days}</li>
                    ) : (
                      <></>
                    )}
                    <li>
                      {t("selectedService")}: {currentData?.servicename}
                    </li>
                    <li>
                      {t("selectedDateRange")} :{" "}
                      {moment(currentData?.start_date).format("DD-MM-YYYY")} To{" "}
                      {moment(currentData?.end_date).format("DD-MM-YYYY")}
                    </li>
                    <li>
                      {t("selectedTimeRange")}: {currentData?.start_time} {currentData?.start_type}{" "}
                      To {currentData?.end_time} {currentData?.end_type}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="btn-wrapper">
              <LoadingButton
                type="submit"
                disabled={openLoading}
                label={"submit"}
                loadinglabel={"submit"}
                isLoading={openLoading}
                className="loading-btn-wrapper"
                onClick={() => updateDateRange()}
              />
              <Button onClick={() => popupClose()} className="text-btn">
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default memo(AddManageScheduleModal);
