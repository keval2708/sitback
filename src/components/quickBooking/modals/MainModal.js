import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css"
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ReactSelect, { components } from "react-select";
import * as yup from "yup";
import * as gtag from "../../../lib/gtag";
import LoadingButton from "@/components/shared/button/LoadingButton";
import { trackBookingEvent } from "@/lib/gtag";
import {
  handleStep,
  manageSchedulerResponse,
  quickBookingSliceSelector,
} from "@/redux/quickBooking";
import { mySelectedServiceList, serviceSliceSelector } from "@/redux/service";
import { FormGroup, Image, Input, Label, } from "@/styles/global/main.style";
import { SchedulerModalLayoutWrapper } from "@/styles/pages/scheduler.style";

const MainModal = () => {
  // const

  const { serviceData, schedulerResponse,schedulerData } =
    useSelector(quickBookingSliceSelector);
  const {selectedService} = useSelector(serviceSliceSelector)
  const {dateSelected} = useSelector(serviceSliceSelector)

  const { t } = useTranslation();
  const { SingleValue, Option } = components;

  const [guest, setGuest] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
  });

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const calendarRef = useRef(null);

 const [selectedDate, setSelectedDate] = useState();

  const [currentMonth, setCurrentMonth] = useState();
  const [isDayPickerVisible, setIsDayPickerVisible] = useState(false);
  const dayPickerRef = useRef(null);
  // hooks
  const dispatch = useDispatch();

  // Form Config
  const defaultValues = useMemo(
    () => ({
      guest: 0,
      services: {
        value: "",
        label: "Select service",
      },
      guestService1: { value: "", label: "Select service" },
      guestService2: { value: "", label: "Select service" },
      guestService3: { value: "", label: "Select service" },
      guestService4: { value: "", label: "Select service" },
      date: new Date(),
    }),
    []
  );

  // validation
  const formSchema = yup.object().shape({
    guest: yup.number(),
    services: yup
      .object()
      .shape({
        value: yup.string().required("Please select service"),
      })
      .test("is-selected", "Please select any option", (value) => {
        return value && value.value !== undefined;
      }),
    guestService1: yup.object().when("guest", {
      is: (val) => val > 0,
      then: (schema) =>
        schema
          .shape({
            value: yup.string().required("Service for guest is required"),
          })
          .test("is-selected", "Please select any option", (value) => {
            return value && value.value !== undefined;
          }),
      otherwise: (schema) => schema.nullable(),
    }),
    guestService2: yup.object().when("guest", {
      is: (val) => val > 1,
      then: (schema) =>
        schema
          .shape({
            value: yup.string().required("Service for guest is required"),
          })
          .test("is-selected", "Please select any option", (value) => {
            return value && value.value !== undefined;
          }),
      otherwise: (schema) => schema.nullable(),
    }),
    guestService3: yup.object().when("guest", {
      is: (val) => val > 2,
      then: (schema) =>
        schema
          .shape({
            value: yup.string().required("Service for guest is required"),
          })
          .test("is-selected", "Please select any option", (value) => {
            return value && value.value !== undefined;
          }),
      otherwise: (schema) => schema.nullable(),
    }),
    guestService4: yup.object().when("guest", {
      is: (val) => val > 3,
      then: (schema) =>
        schema
          .shape({
            value: yup.string().required("Service for guest is required"),
          })
          .test("is-selected", "Please select any option", (value) => {
            return value && value.value !== undefined;
          }),
      otherwise: (schema) => schema.nullable(),
    }),
    date: yup.date().required("Please select a date"),
  });
  // .strict();

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
    formState: { errors },
  } = methods;
  const guestSelection = watch("guest");

  const IconSingleValue = (props) => (
    <SingleValue {...props}>
      <img src={props.data.image} style={{ height: "30px", width: "30px" }} alt="img-tag" />
      {props.data.label} {props?.data?.calculatedTime} - ${props?.data?.price}
    </SingleValue>
  );

  const IconOption = (props) => (
    <Option {...props}>
      <img src={props.data.image} style={{ height: "30px", width: "30px" }} alt="img-tag" />
      {props.data.label} {props?.data?.calculatedTime} - ${props?.data?.price}
    </Option>
  );


  useEffect(() => {
    if (schedulerResponse?.services && schedulerResponse?.services?.value != "") {
      setValue("services", {
        value: schedulerResponse?.services?.value,
        label: schedulerResponse?.services?.label,
        image: schedulerResponse?.services?.image,
        time: schedulerResponse?.services?.time,
        price: schedulerResponse?.services?.price,
        calculatedTime: schedulerResponse?.services?.calculatedTime,
      });
      setValue("date", schedulerResponse?.date);
      setSelectedDate(moment(schedulerResponse?.date)?.format("MM-DD-YYYY"));
      setValue("guest", schedulerResponse?.guest);
      if (schedulerResponse?.guest == 1) {
        setGuest({ one: true });
      }
      if (schedulerResponse?.guest == 2) {
        setGuest({ two: true });
      }
      if (schedulerResponse?.guest == 3) {
        setGuest({ three: true });
      }
      if (schedulerResponse?.guest == 4) {
        setGuest({ four: true });
      }
    }
    if (schedulerResponse?.guestService1 && schedulerResponse?.guestService1?.value != "") {
      setValue("guestService1", {
        value: schedulerResponse?.guestService1?.value,
        label: schedulerResponse?.guestService1?.label,
        image: schedulerResponse?.guestService1?.image,
        time: schedulerResponse?.guestService1?.time,
        price: schedulerResponse?.guestService1?.price,
        calculatedTime: schedulerResponse?.guestService1?.calculatedTime,
      });
    }
    if (schedulerResponse?.guestService2 && schedulerResponse?.guestService2?.value != "") {
      setValue("guestService2", {
        value: schedulerResponse?.guestService2?.value,
        label: schedulerResponse?.guestService2?.label,
        image: schedulerResponse?.guestService2?.image,
        time: schedulerResponse?.guestService2?.time,
        price: schedulerResponse?.guestService2?.price,
        calculatedTime: schedulerResponse?.guestService2?.calculatedTime,
      });
    }
    if (schedulerResponse?.guestService3 && schedulerResponse?.guestService3?.value != "") {
      setValue("guestService3", {
        value: schedulerResponse?.guestService3?.value,
        label: schedulerResponse?.guestService3?.label,
        image: schedulerResponse?.guestService3?.image,
        time: schedulerResponse?.guestService3?.time,
        price: schedulerResponse?.guestService3?.price,
        calculatedTime: schedulerResponse?.guestService3?.calculatedTime,
      });
    }
    if (schedulerResponse?.guestService4 && schedulerResponse?.guestService4?.value != "") {
      setValue("guestService4", {
        value: schedulerResponse?.guestService4?.value,
        label: schedulerResponse?.guestService4?.label,
        image: schedulerResponse?.guestService4?.image,
        time: schedulerResponse?.guestService4?.time,
        price: schedulerResponse?.guestService4?.price,
        calculatedTime: schedulerResponse?.guestService4?.calculatedTime,
      });
    }
  }, [schedulerResponse]);

  useEffect(() => {

    if (selectedService != null) {
      setValue("services", {
        value: selectedService.value,
        label: selectedService.label,
        image: selectedService.image,
        time: selectedService.time,
        price: selectedService.price,
        calculatedTime: selectedService.calculatedTime,
      });

    }
  }, [selectedService]);

  useEffect(() => {
     if (process.env.SERVER_TYPE == "production") {
      const handleRouteChange = () => {
      const url = window.location.href;
        gtag.pageview(url);
      };
      handleRouteChange();
    }
  }, []);



  useEffect(() => {
  if (dateSelected && dateSelected != null) {
    //console.log("dateSelected", dateSelected);

    // Parse the date with the correct format
    var selectedDates = moment(dateSelected, "MM-DD-YYYY").format("MM-DD-YYYY");
    //console.log("111", selectedDates);

    // Ensure the date is valid before converting
    if (moment(selectedDates, "MM-DD-YYYY", true).isValid()) {
      const dateObject = moment(selectedDates, "MM-DD-YYYY").toDate();
      //console.log("dateObject", dateObject);
      setCurrentMonth(dateObject)
      setValue("date", dateObject);
      setSelectedDate(selectedDates);
    } else {
      // console.error("Invalid date format:", selectedDates);
    }
  }
}, [dateSelected]);



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

  const onSubmitForm = async (formData) => {

    try {
      let data = {
        date: formData?.date,
        guest: formData?.guest,
        services: formData?.services,
      };
      // console.log("data",data);
      if (formData?.guest > 0) {
        data.guestService1 = formData?.guestService1;
      }
      if (formData?.guest > 1) {
        data.guestService2 = formData?.guestService2;
      }
      if (formData?.guest > 2) {
        data.guestService3 = formData?.guestService3;
      }
      if (formData?.guest > 3) {
        data.guestService4 = formData?.guestService4;
      }

      //return

      if (schedulerResponse?.userInfo) {

        dispatch(manageSchedulerResponse({ userInfo: schedulerResponse?.userInfo, ...data }));
      } else {
        if(schedulerResponse == null) {

              trackBookingEvent("start_booking", {
                label: schedulerData?.data?.username,
                url: window.location.href,
              });

              window.gtag('event', 'conversion', {'send_to': 'AW-11564679938/Jx8ZCOvgh6AaEIKGvIor'});

        }
        dispatch(manageSchedulerResponse(data));
      }
      dispatch(handleStep(2));
    } catch (error) {}
  };


  const handleDateSelect = (date) => {
    if(date) {
      setSelectedDate(moment(date)?.format("MM-DD-YYYY"));
      setCurrentMonth(date);
      setValue("date", date);
    }
    setIsDayPickerVisible(false);

  };

  useEffect(() => {
      const handleClickOutside = (event) => {
        if (dayPickerRef.current && !dayPickerRef.current.contains(event.target)) {
          setIsDayPickerVisible(false); // Close the datepicker when clicking outside
        }
      };

      if (isDayPickerVisible) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside); // Cleanup
      };
}, [isDayPickerVisible]);

  return (
    <>
      <SchedulerModalLayoutWrapper>
        <div className="sit-step-display-div">
          <h5>Step 1 of 4</h5>
          <div className="step-content-wrapper">
            <div className="step-note-div single-first-round-active">
              <div className="step-round-wrapper">
                <span className="number-text">1</span>
                <span className="checkmark-icon">
                   <Image isContainImg={true} alt="sitback" src="/images/white-checkmark-icon.svg" />
                </span>
              </div>
            </div>
            <div className="step-note-div">
              <div className="step-round-wrapper">
                <span className="number-text">2</span>
              </div>
            </div>
            <div className="step-note-div">
              <div className="step-round-wrapper">
                <span className="number-text">3</span>
              </div>
            </div>
            <div className="step-note-div">
              <div className="step-round-wrapper">
                <span className="number-text">4</span>
              </div>
            </div>
          </div>
        </div>
        <Form onSubmit={handleSubmit(onSubmitForm)}>


          <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper sitback-select-spa-service-wrapper">
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
                  onChange={(e) => {
                    field.onChange(e.target.value); // Update the field value
                    dispatch(mySelectedServiceList(null)); // Dispatch the action to reset the selected slot
                  }}

                  {...field}
                  // isMulti
                  isSearchable={true}
                  // allowSelectAll={true}
                />
              )}
            />
            <p className="text-danger mt-1">{errors?.services?.value?.message}</p>
          </FormGroup>
          <FormGroup
            controlId="formBasicEmail"
            className="marging-bottom-wrapper"
            hidden={guestSelection > 0 ? false : true}
          >
            <Label>{t("selectServiceGuest")} #1</Label>
            <Controller
              name="guestService1"
              control={control}
              render={({ field }) => (
                <ReactSelect
                  className="sitback-select2-container input-with-icon"
                  classNamePrefix="sitback-select-option"
                  placeholder="Select Service"
                  options={serviceData}
                  closeMenuOnSelect={true}
                  hideSelectedOptions={false}
                  components={{
                    ...(field?.value?.value ? { SingleValue: IconSingleValue } : {}),
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
            <p className="text-danger mt-1">{errors?.guestService1?.value?.message}</p>
          </FormGroup>
          <FormGroup
            controlId="formBasicEmail"
            className="marging-bottom-wrapper"
            hidden={guestSelection > 1 ? false : true}
          >
            <Label>{t("selectServiceGuest")} #2</Label>
            <Controller
              name="guestService2"
              control={control}
              render={({ field }) => (
                <ReactSelect
                  className="sitback-select2-container input-with-icon"
                  classNamePrefix="sitback-select-option"
                  placeholder="Select Service"
                  options={serviceData}
                  closeMenuOnSelect={true}
                  hideSelectedOptions={false}
                  components={{
                    ...(field?.value?.value ? { SingleValue: IconSingleValue } : {}),
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
            <p className="text-danger mt-1">{errors?.guestService2?.value?.message}</p>
          </FormGroup>
          <FormGroup
            controlId="formBasicEmail"
            className="marging-bottom-wrapper"
            hidden={guestSelection > 2 ? false : true}
          >
            <Label>{t("selectServiceGuest")} #3</Label>
            <Controller
              name="guestService3"
              control={control}
              render={({ field }) => (
                <ReactSelect
                  className="sitback-select2-container input-with-icon"
                  classNamePrefix="sitback-select-option"
                  placeholder="Select Service"
                  options={serviceData}
                  closeMenuOnSelect={true}
                  hideSelectedOptions={false}
                  components={{
                    ...(field?.value?.value ? { SingleValue: IconSingleValue } : {}),
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
            <p className="text-danger mt-1">{errors?.guestService3?.value?.message}</p>
          </FormGroup>
          <FormGroup
            controlId="formBasicEmail"
            className="marging-bottom-wrapper"
            hidden={guestSelection > 3 ? false : true}
          >
            <Label>{t("selectServiceGuest")} #4</Label>
            <Controller
              name="guestService4"
              control={control}
              render={({ field }) => (
                <ReactSelect
                  className="sitback-select2-container input-with-icon"
                  classNamePrefix="sitback-select-option"
                  placeholder="Select Service"
                  options={serviceData}
                  closeMenuOnSelect={true}
                  hideSelectedOptions={false}
                  components={{
                    ...(field?.value?.value ? { SingleValue: IconSingleValue } : {}),
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
            <p className="text-danger mt-1">{errors?.guestService4?.value?.message}</p>
          </FormGroup>
         <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper show-calendar">
          <Label>{t("quickBookingFor")}</Label>
          <Input
            value={selectedDate || moment(new Date()).format("MM-DD-yyyy")}
            onClick={() => setIsDayPickerVisible(true)}
            readOnly
          />
          {isDayPickerVisible && (
            <div className="calendarv2-wrapper-div" ref={dayPickerRef}>
              <Controller
                name="date"
                control={control}
                render={() => (
                 <DayPicker
                    mode="single"
                    captionLayout="dropdown"
                    fromYear={new Date().getFullYear()}
                    toYear={new Date().getFullYear() + 1}
                    selected={selectedDate ?  selectedDate : new Date()}
                    month={currentMonth}
                    onSelect={(date) => handleDateSelect(date)}
                    onMonthChange={(month) => setCurrentMonth(month)}
                    disabled={{
                      before: new Date(),
                    }}
                    styles={{
                      dropdown: {
                        backgroundColor: "#ffffff",
                        border: "none",
                        borderRadius: "5px",
                        padding: "10px",
                        overflow: "hidden",
                        minWidth: "70px",
                        color: "#295086",
                      },
                    }}
                  />
                )}
              />
            </div>
          )}
          <p className="text-danger mt-1">{errors?.date?.message}</p>
        </FormGroup>
          <LoadingButton
            type="submit"
            disabled={false}
            label={"Next"}
            loadinglabel={"Next"}
            isLoading={false}
            className="loading-btn-wrapper"
          />
        </Form>
      </SchedulerModalLayoutWrapper>
    </>
  );
};

export default memo(MainModal);
