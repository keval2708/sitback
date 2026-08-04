import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import Calendar from "react-calendar";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ReactSelect, { components } from "react-select";
import * as yup from "yup";
import LoadingButton from "@/components/shared/button/LoadingButton";
import { handleStep, manageSchedulerResponse, schedulerSliceSelector } from "@/redux/scheduler";
import { FormGroup, Input, Label } from "@/styles/global/main.style";
import { SchedulerModalLayoutWrapper } from "@/styles/pages/scheduler.style";

const MainModal = () => {
  // const
  const { serviceData, schedulerResponse } = useSelector(schedulerSliceSelector);

  const { t } = useTranslation();
  const { SingleValue, Option } = components;

  const [guest, setGuest] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
  });
  const [selectedDate, setSelectedDate] = useState("");
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const calendarRef = useRef(null);

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
      {props.data.label} {props?.data?.calculatedTime}
    </SingleValue>
  );

  const IconOption = (props) => (
    <Option {...props}>
      <img src={props.data.image} style={{ height: "30px", width: "30px" }} alt="img-tag" />
      {props.data.label} {props?.data?.calculatedTime}
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
      setSelectedDate(moment(schedulerResponse?.date)?.format("YYYY-MM-DD"));
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

      if (schedulerResponse?.userInfo) {
        dispatch(manageSchedulerResponse({ userInfo: schedulerResponse?.userInfo, ...data }));
      } else {
        dispatch(manageSchedulerResponse(data));
      }
      dispatch(handleStep(2));
    } catch (error) {}
  };

  const handleCheck = (e, key, value) => {
    setGuest({ [key]: e?.target?.checked });
    if (e?.target?.checked) {
      setValue("guest", value);
    } else {
      setValue("guest", 0);
    }
  };

  return (
    <>
      <SchedulerModalLayoutWrapper>
        <Form onSubmit={handleSubmit(onSubmitForm)}>
          <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
            <Label>{t("selectGuest")}</Label>
            <div className="checkbox-list-wrapper available-times">
              <div className="checkbox-wrapper-div">
                <input
                  type="checkbox"
                  id="guest1"
                  name="guest1"
                  value="1"
                  checked={guest?.one ? true : false}
                  onChange={(e) => handleCheck(e, "one", 1)}
                />
                <label htmlFor={`guest1`}>
                  <p>{1}</p>
                </label>
              </div>
              <div className="checkbox-wrapper-div">
                <input
                  type="checkbox"
                  id="guest2"
                  name="guest2"
                  value="2"
                  checked={guest?.two ? true : false}
                  onChange={(e) => handleCheck(e, "two", 2)}
                />
                <label htmlFor={`guest2`}>
                  <p>{2}</p>
                </label>
              </div>
              <div className="checkbox-wrapper-div">
                <input
                  type="checkbox"
                  id="guest3"
                  name="guest3"
                  value="3"
                  checked={guest?.three ? true : false}
                  onChange={(e) => handleCheck(e, "three", 3)}
                />
                <label htmlFor={`guest3`}>
                  <p>{3}</p>
                </label>
              </div>
              <div className="checkbox-wrapper-div">
                <input
                  type="checkbox"
                  id="guest4"
                  name="guest4"
                  value="4"
                  checked={guest?.four ? true : false}
                  onChange={(e) => handleCheck(e, "four", 4)}
                />
                <label htmlFor={`guest4`}>
                  <p>{4}</p>
                </label>
              </div>
            </div>
            <p className="text-danger">{errors?.guest?.message}</p>
          </FormGroup>

          <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
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
            <p className="text-danger">{errors?.guestService1?.value?.message}</p>
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
            <p className="text-danger">{errors?.guestService2?.value?.message}</p>
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
            <p className="text-danger">{errors?.guestService3?.value?.message}</p>
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
            <p className="text-danger">{errors?.guestService4?.value?.message}</p>
          </FormGroup>
          <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper show-calendar">
            <Label>{t("bookingFor")}</Label>
            <Input
              type="text"
              // placeholder="1990-12-10"
              // placeholder={moment(new Date()).format("yyyy-MM-DD")}
              value={
                selectedDate
                  ? moment(selectedDate).format("yyyy-MM-DD")
                  : moment(new Date()).format("yyyy-MM-DD")
              }
              // value={selectedDate && moment(selectedDate).format("yyyy-MM-DD")}
              defaultValue={selectedDate && moment(selectedDate).format("yyyy-MM-DD")}
              onClick={() => setIsCalendarVisible(true)}
            />
            <div className="calendar-wrapper-div" ref={calendarRef}>
              {isCalendarVisible && (
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <Calendar
                      dateFormat="YYYY-MM-DD"
                      {...field}
                      value={field?.value ? field?.value : new Date()}
                      minDate={new Date()}
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
            <p className="text-danger">{errors?.date?.message}</p>
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
