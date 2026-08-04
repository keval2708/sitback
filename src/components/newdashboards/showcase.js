import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import TimePicker from "rc-time-picker";
import { useEffect, useMemo, useState } from "react";
import { Form, } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ReactSelect, { components } from "react-select";
import * as yup from "yup";
import AddCustomShowCaseModal from "./modals/addCustomShowCaseModal";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector } from "@/redux/authCheck";
import { API_ROUTER } from "@/services/apiRouter";
import {
  Button,
  FormGroup,
  Label,
} from '@/styles/global/main.style';
import {
  ShowCaseAppointmentDetailDiv,
} from '@/styles/pages/insights.style';
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { getSocketId } from "@/utils/helper";

export const Showcase = () => {


  //hooks
  const { SingleValue, Option } = components;
  const { login } = useSelector(authCheckSliceSelector);
  const { t } = useTranslation();
  const [loadingApi, setLoadingApi] = useState(false);
  const [loadingListGet, setLoadingListGet] = useState(false);
  const { toaster } = useToaster()
  const [selectedStartDate, setSelectedStartDate] = useState(null)
  const [serviceData, setServiceData] = useState([]);
  const [tempShowcaseData, setTempShowcaseData] = useState([]);
  const [loadingButtons, setLoadingButtons] = useState({});
  const [systemGeneratedData, setSystemGeneratedData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);


  const closeModal = async (dataId) => {
    setIsModalOpen(false);
    if(dataId){
      const deleteData = {
       id:dataId
      };
      const res = await axiosApiCall.post(API_ROUTER?.DASHBOARD_DELETE_TEMP_SHOWCASE, deleteData);
    }

  }

  // Form Config
  const defaultValues = useMemo(
    () => ({
       services: [],
      // provider: 0,
      // slots: "",
    }),
    []
  );

  // validation
  const CustomformSchema = yup
    .object()
    .shape({
      services: yup
              .array()
              .min(1, "Please select at least one service")
              .required("Please select at least one service"),
      starttime: yup
        .mixed()
        .required("Start time is required")
        .test("is-valid-time", "Start time cannot be greater than end time", function (value) {
          const { endtime } = this.parent;
          if (value && endtime) {
            return moment(value).isSameOrBefore(endtime);
          } else if (!value) {
            return this.createError({
              message: "StartTime is Required",
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
              message: "EndTime is required",
            });
          }
          return true;
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
      date: yup.date().required("Please select a date"),

    })
    .strict(true);

  // Form Hooks
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(CustomformSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    setError,
    trigger,
    reset,
    formState: { errors },
  } = methods;

   const IconSingleValue = (props) => (
    <SingleValue {...props}>
      <img src={props.data.image} style={{ height: "30px", width: "30px" }} alt="img-tag" />
      {props.data.label}
    </SingleValue>
  );

  const IconOption = (props) => (
    <Option {...props}>
      <img src={props.data.image} style={{ height: "30px", width: "30px" }} alt="img-tag" />
      {props.data.label}
    </Option>
  );

  const getServices = async () => {
    try {
      let options = [];
      const res = await axiosApiCall.get(API_ROUTER?.GET_MY_SERVICES_LIST);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        res?.data?.data &&
          res?.data?.data?.map((s) => {
            options.push({
            value: String(s?.id),
            label: s?.name + ` (${s?.hour * 60 + s?.minutes} min)`,
            image: s?.image,
            price: s?.price,
            time: { hour: s?.hour, minute: s?.minutes },
            calculatedTime: `(${s?.hour * 60 + s?.minutes} min)`,
          });
          });
        setServiceData(options);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const listShowcaseTemp = async () => {

    try {

      setLoadingListGet(true)
      const res = await axiosApiCall.get(API_ROUTER?.LIST_SHOWCASE_TEMP);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        //
        setTempShowcaseData(res?.data?.data)
        setLoadingListGet(false)
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  }

  const onSubmitForm = async (formData) => {
    // console.log("formData",formData);
    // return

    const dt = formData.services.map((data) => data.value);
    const service_ids = dt.join(",");
    let currentDate = moment().format("YYYY-MM-DD");
    let startDate = formData?.date ? moment(formData?.date).format("YYYY-MM-DD") : "";

    // Check if date is today
    if (startDate === currentDate) {
      const now = moment(); // current time
      const selectedStart = moment(formData?.starttime, "hh:mm A");

      // Ensure both are on the same date for proper diff
      selectedStart.set({
        year: now.year(),
        month: now.month(),
        date: now.date()
      });

      const diffInMinutes = selectedStart.diff(now, "minutes");
      //console.log("diffInMinutes",diffInMinutes);

      if (diffInMinutes < 120) {

        return toaster("Start time must be at least 2 hour from now.", TOAST_TYPES.ERROR);
      }
    }

    try {
    setLoadingApi(true);
      const socketId = getSocketId();
      const serviceData = {
        serviceids: service_ids,
        date: startDate,
        start_time: formData?.starttime.format("hh:mm:00"),
        end_time: formData?.endtime.format("hh:mm:00"),
        start_type: formData?.starttime.format("hh:mm:ss a").split(" ")[1],
        end_type: formData?.endtime.format("hh:mm:ss a").split(" ")[1],
        slot_generation: "system",
        socketId: socketId,
      };

      const res = await axiosApiCall.post(API_ROUTER?.ADD_SHOWCASE_TEMP, serviceData);

      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        if(res?.data?.data?.slot_generation == "manual") {
          reset();
          openModal()
          setSystemGeneratedData(res?.data?.data)

        } else {
        reset();
        listShowcaseTemp();
        setSystemGeneratedData()
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        }

      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoadingApi(false);  // Set loading to false once the submission process is done
    }

  };

  const format = "h:mm a";
  const example = "time-picker";

   // useEffect
  useEffect(() => {
    getServices();
    listShowcaseTemp();
  }, []);

  const onIndividualSubmit = async (tempDataId) => {
    setLoadingButtons((prev) => ({ ...prev, [tempDataId]: true }));
    const socketId = getSocketId();

    try {
      const res = await axiosApiCall.post(API_ROUTER.ADD_SHOWCASE_SUBMIT, {
        tempshowcase_id: tempDataId,
        socketId: socketId,
      });
      // console.log("res",res);

      if (!res?.status) {
        toaster(res?.message, TOAST_TYPES.ERROR);
        listShowcaseTemp(); // reload after successful submission
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        listShowcaseTemp(); // reload after successful submission
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoadingButtons((prev) => ({ ...prev, [tempDataId]: false }));
    }
  };

 const cancel = async () => {
    reset(defaultValues);
    // onHide();
  };

  useEffect(() => {
    if (window.io) {
      if(login?.employeeType == "spa") {
          window.io.socket.on("serviceprovider", async (msg) => {
          if (msg?.action == "new_temp_showcase" || msg?.action == "showCaseUpdate") {
            listShowcaseTemp()
          }
        });
      } else if (login?.employeeType == "spaemployee") {

          window.io.socket.on("spaemployee", async (msg) => {
          if (msg?.action == "new_temp_showcase") {
            listShowcaseTemp()
          }
        });
      }

    }
  }, [window.io]);
  return (
    <>
      <ShowCaseAppointmentDetailDiv>
        <Form onSubmit={handleSubmit(onSubmitForm)}>
          <FormGroup isNewDashboardInsightsSitbackFormGroup={true}>
            <Label isNewDashboardInsightsSitbackLabel={true}>Select Services</Label>
             <Controller
                  name="services"
                  control={control}
                  render={({ field }) => (
                    // <ReactSelect
                    //   className="sitback-select2-container input-with-icon Select-Service-checkbox-wrapper"
                    //   classNamePrefix="sitback-select-option"
                    //   placeholder={t("selectservice")}
                    //   options={serviceData}
                    //   closeMenuOnSelect={true}
                    //   hideSelectedOptions={false}
                    //   components={{
                    //     ...(field.value.value ? { SingleValue: IconSingleValue } : {}),
                    //     Option: IconOption,
                    //   }}
                    //   onChange={(e) => field.onChange(e.target.value)}
                    //   {...field}
                    //   isSearchable={true}
                    // />
                    <ReactSelect
                      className="sitback-select2-container input-with-icon Select-Service-checkbox-wrapper"
                      classNamePrefix="sitback-select-option"
                      placeholder={t("selectServicesText")}
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
            <p className="text-danger mt-1">{errors?.services?.message}</p>
          </FormGroup>

          <div className="date-input-wrapper">

            <FormGroup isNewDashboardInsightsSitbackFormGroup={true}>
              <Label isNewDashboardInsightsSitbackLabel={true}>Date</Label>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <ReactDatePicker
                    className="datepicker-input"
                    placeholderText={t("selectStartDateText")}
                    dateFormat="MM/dd/yyyy"
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
              <p className="text-danger mt-1">{errors?.date?.message}</p>
            </FormGroup>
          </div>
          <div className="time-display-div">
            <FormGroup isNewDashboardInsightsSitbackFormGroup={true}>
              <Label isNewDashboardInsightsSitbackLabel={true}>Time</Label>
              <div className="time-appointment-display-div" id={example}>
                <div className="time-left-div">
                  <FormGroup controlId="formBasicEmail" className="datepicker-inner-formgroup-wrapper">
                    <Controller
                      name="starttime"
                      control={control}
                      render={({ field }) => (
                        <TimePicker
                          showSecond={false}
                          {...field}
                          placeholder={t("selectStartTimeText")}
                          className="time-addinput-wrapper"
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                          minuteStep={15}
                          format={format}
                          getPopupContainer={() => document.getElementById(example)}
                          use12Hours
                          inputReadOnly
                          hideDisabledOptions={true}
                          disabledHours={() => {
                            if (
                              moment(selectedStartDate).isSame(moment(), "day")
                            ) {
                              const now = moment().add(2, 'hour');
                              const disableUntilHour = now.hour();
                              return Array.from({ length: disableUntilHour }, (_, i) => i);
                            }
                            return [];
                          }}
                          disabledMinutes={(selectedHour) => {
                            if (
                              moment(selectedStartDate).isSame(moment(), "day")
                            ) {
                              const now = moment().add(2, 'hour');
                              const disableUntilHour = now.hour();
                              const disableUntilMinute = now.minute();

                              if (selectedHour === disableUntilHour) {
                                return Array.from({ length: disableUntilMinute }, (_, i) => i);
                              }
                            }
                            return [];
                          }}
                        />
                      )}
                    />
                  </FormGroup>
                  <p className="text-danger mt-1">{errors?.starttime?.message}</p>
                </div>
                <p>to</p>
                <div className="time-right-div" id={example}>
                  <div className="">
                    <FormGroup controlId="formBasicEmail" className="datepicker-inner-formgroup-wrapper">
                     <Controller
                        name="endtime"
                        control={control}
                        render={({ field }) => (
                          <TimePicker
                            showSecond={false}
                            {...field}
                            placeholder={t('selectEndTimeText')}                            className="time-addinput-wrapper"
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                            format={format}
                            minuteStep={15}
                            getPopupContainer={() => document.getElementById(example)}
                            use12Hours
                            onBlur={() => trigger("time")}
                            inputReadOnly
                            hideDisabledOptions={true}
                            disabledHours={() => {
                              if (
                                selectedStartDate &&
                                moment(selectedStartDate).isSame(moment(), "day")
                              ) {
                                const now = moment().add(2, 'hour');
                                const disableUntilHour = now.hour();
                                return Array.from({ length: disableUntilHour }, (_, i) => i);
                              }
                              return [];
                            }}
                            disabledMinutes={(selectedHour) => {
                              if (
                                selectedStartDate &&
                                moment(selectedStartDate).isSame(moment(), "day")
                              ) {
                                const now = moment().add(2, 'hour');
                                const disableUntilHour = now.hour();
                                const disableUntilMinute = now.minute();

                                if (selectedHour === disableUntilHour) {
                                  return Array.from({ length: disableUntilMinute }, (_, i) => i);
                                }
                              }
                              return [];
                            }}
                          />
                        )}
                      />

                    </FormGroup>
                    <p className="text-danger mt-1">{errors?.endtime?.message}</p>
                  </div>
                </div>
              </div>
            </FormGroup>
{/*
            <FormGroup isNewDashboardInsightsSitbackFormGroup={true}>
              <Label isNewDashboardInsightsSitbackLabel={true}>Slot Selection Type</Label>
              <Controller
                name="appointmentType"
                control={control}
                defaultValue="system" // Default selected value
                render={({ field }) => (
                  <div className="appointment-type-radio-btn-wrapper">
                     <Form.Check
                      {...field}
                      type="radio"
                      label="System Generated"
                      value="system"
                      id="systemRadio"
                      checked={field.value === "system"}
                      onChange={() => field.onChange("system")}
                    />
                    <Form.Check
                      {...field}
                      type="radio"
                      label="Manual"
                      value="manual"
                      id="manualRadio"
                      checked={field.value === "manual"}
                      onChange={() => field.onChange("manual")}
                    />

                  </div>
                )}
              />
              <p className="text-danger mt-1">{errors?.appointmentType?.message}</p>
            </FormGroup> */}
          </div>

          <div className="showcase-btn-div">
            <Button
            type="submit"
            className="add-appointment-btn css-sqzo6j"
            disabled={loadingApi}  // Disable button while submitting
          >
            {loadingApi ? "Submitting..." : t('addAppointment')}  {/* Display loading text while submitting */}
          </Button>

            <Button
              isBorderBtn={true}
              className="cancel-btn-wrapper"
              onClick={() => cancel()}  // Reset the form when the cancel button is clicked
              type="reset"
            >
              {t("cancel")}
            </Button>

          </div>
        </Form>
        {/* <button onClick={() => openModal()}>Open Modal</button> */}
          {loadingListGet ?
            <>
              <div className="appointment-submit-main-div">
                  <div className="text-center">
                    <div className="spinner-border text-info" role="status">
                    </div>
                  </div>
              </div>
            </>  :
            <>
            <div className="appointment-submit-main-div">
              {tempShowcaseData &&
                  tempShowcaseData?.length > 0 &&
                    tempShowcaseData.map((tempData, key) => (
                    <div key={key} className="appointment-box-wrapper">
                       <div className="appointment-detail-content-div appointment-first-detail-div">
                        <ul className="appointment-list-display-wrapper">
                          {tempData?.name
                            ?.split(',')
                            .map((item, index) => (
                              <li key={index}>
                                {item.trim()}
                                <br />
                              </li>
                            ))}
                        </ul>
                      </div>

                      <div className="appointment-detail-content-div">
                        <p>{moment(tempData?.date).format("MM/DD/YYYY") }</p>
                      </div>
                      <div className="appointment-detail-content-div">
                        <p>{tempData?.timeRange}</p>
                      </div>
                      <div className="appointment-detail-content-div"><p className="appointment-name-text">{tempData?.addedbyname}</p></div>
                      <div className="appointment-detail-content-div">
                        <Button
                          type="button"
                          className="add-appointment-btn"
                          onClick={() => onIndividualSubmit(tempData.id)}
                          disabled={loadingButtons[tempData.id]}
                        >
                          {loadingButtons[tempData.id] ? "SUBMITTING..." : "SUBMIT"}
                        </Button>
                      </div>

                    </div>
                ))}
            </div>
            </>
          }


      </ShowCaseAppointmentDetailDiv>
      <AddCustomShowCaseModal
        show={isModalOpen}
        handleClose={(id) => closeModal(id)}
        data = {systemGeneratedData}
        listShowcaseTemp = {() => listShowcaseTemp()}
      />
      {/* <CustomModal
                  show={isModalOpen}
                  onConfirm={() => closeModal()}
                  aria-labelledby="example-modal-sizes-title-sm"
                  centered
                  className="sitback-modal-wrapper"
                >
                  <Modal.Body>

                  </Modal.Body>
                </CustomModal> */}
    </>
  );
};
