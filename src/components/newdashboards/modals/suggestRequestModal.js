import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { default as ReactSelect, components } from "react-select";
import * as yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import CustomModal from "@/components/shared/modal";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import { FormGroup, Label, SitBackModalBodyWrapper, } from "@/styles/global/main.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_TYPES } from "@/utils/constants";
import { getSocketId } from "@/utils/helper";

const SuggestRequestModal = ({ show, handleClose,data,setItems }) => {

  const { SingleValue, Option } = components;
  const [serviceTimes, setServiceTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toaster } = useToaster();
  const { t } = useTranslation();
 // Can be dynamically set


 const [selectedStartDate, setSelectedStartDate] = useState(null)
 const [slotTypeData, setSlotTypeData] = useState([])
 const [acceptData, setAcceptData] = useState([]);
 const [serviceData, setServiceData] = useState([]);
 const [slotTypeLoading, setSlotTypeLoading] = useState(false);
 const [serviceDataLoading, setServiceDataLoading] = useState(false);
 const [manualDataLoading, setManualDataLoading] = useState(false);
 const [spaCloseMsg, setSpaCloseMsg] = useState();
 const [spaCloseMsgManual, setSpaCloseMsgManual] = useState();
 const [manualSuggestData,setManualSuggestData] = useState();
 const [slotLoading, setSlotLoading] = useState(true);


  useEffect(() => {
    if(data) {
    const date = new Date(data?.date + 'T00:00:00');
    if (isNaN(date.getTime())) {
      return; // If invalid date, do nothing or handle appropriately
    }

    setSelectedStartDate(date);

    // const startTime = timeStringToDate(data?.start)


    // setServiceTimes([{
    //   serviceName: data?.servicename,

    //     id: data?.id,
    //     times:  [], // Initialize times as an empty array if not provided
    //     input: "", // Initialize with the default input time
    //     error: data?.error || "", // Initialize with an empty error message
    //     duration:  0, // Set the duration or default to 0

    // }]);

  }

  }, [data]);

  useEffect(() => {
    setSlotLoading(true)
    setError("slots", { message: "" });
    setValue('slots',[]);
    setServiceData([])
    setError("slottype", { message: "" });
    // getSlotType(selectedStartDate)
    if(appointmentType == "manual") {
      getManualSlotData()
    }
  }, [selectedStartDate]);

  // Function to convert time string to Date object
  const timeStringToDate = (timeString) => {
    if(timeString) {
      const [time, period] = timeString.split(" ");
      const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
      const date = new Date();
      date.setHours(period === "PM" && hours !== 12 ? hours + 12 : hours); // Adjust for PM times
      date.setMinutes(minutes);
      date.setSeconds(0);
      date.setMilliseconds(0);
      return date;
    } else {
      return '';
    }

  };

  // Dynamically set min and max times based on the input
    const minAllowedTime = useMemo(() => timeStringToDate(manualSuggestData?.start), [manualSuggestData?.start]);
    const maxAllowedTime = useMemo(() => timeStringToDate(manualSuggestData?.end), [manualSuggestData?.end]);

    // Generate an array of times to include, based on 15-minute intervals
    const includedTimes = useMemo(() => {
      const times = [];
      const startMoment = moment(minAllowedTime);
      const endMoment = moment(maxAllowedTime);
      let currentMoment = startMoment.clone();

      while (currentMoment.isSameOrBefore(endMoment)) {
        times.push(currentMoment.toDate());
        currentMoment.add(5, 'minutes');
      }
      return times;
    }, [minAllowedTime, maxAllowedTime]);

    // const getSlotType = async (date) => {
    //   setSlotLoading(true)
    //   if (date) {
    //     setSlotTypeLoading(true); // Set loading to true when the API call starts

    //     let param = {
    //       date: date ? moment(date, "MM-DD-YYYY").format("YYYY-MM-DD") : '',
    //     };

    //     try {
    //       const res = await axiosApiCall.post(API_ROUTER?.DASHBOARD_BOOKING_FIXED_SLOT_LIST, param);
    //       console.log("res",res);
    //       if (!res?.status) {
    //         return toaster(res?.message, TOAST_TYPES.ERROR);
    //       } else {
    //         if (res?.data?.data.length > 0) {
    //           setSpaCloseMsg('')
    //           const bookingData = res?.data?.data;

    //           getSlot(bookingData[0]?.slot_title);

    //           let options = [];
    //           bookingData?.length &&
    //             bookingData?.map((s) => {
    //               options.push({
    //                 value: s?.slot_title,
    //                 label: s?.slot_title,
    //               });
    //             });
    //           setSlotTypeData(options);
    //           setValue('slottype', bookingData[0]?.slot_title);
    //         } else {
    //           setSlotTypeData([]);
    //           setValue('slottype', '');
    //           setSpaCloseMsg(res?.data?.spaClosedMessage)
    //           setSlotLoading(false)
    //         }
    //       }
    //     } catch (error) {
    //       console.error("Error fetching data:", error);
    //     } finally {
    //       setSlotTypeLoading(false); // Set loading to false when the API call is complete
    //     }
    //   }
    // };

    // const getSlot = async (slotType) => {
    //   if(slotType){


    //   let param = {
    //     date:  selectedStartDate ? moment(selectedStartDate, "MM-DD-YYYY").format("YYYY-MM-DD") : '',
    //     slot_title: slotType,
    //     book_id: data?.id,
    //   };

    //   try {
    //   setSlotLoading(true);
    //   const res = await axiosApiCall.post(API_ROUTER?.DASHBOARD_BOOKING_SLOT_LIST, param);
    //   console.log("555",res);


    //   if (!res?.status) {
    //     return toaster(res?.message, TOAST_TYPES.ERROR);
    //   } else {
    //     if(res?.data?.data?.length > 0) {
    //       const bookingData = res?.data?.data;

    //       let options = [];
    //         bookingData?.length &&
    //           bookingData?.map((s) => {
    //             options.push({
    //               value: s,
    //               label: s,
    //             });
    //           });
    //       setServiceData(options);
    //       setSlotLoading(false)
    //     } else {
    //       setServiceData([]);
    //       setSlotLoading(false)
    //     }
    //   }
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   } finally {
    //     //setSlotLoading(false);
    //     // setLoading(false);
    //     // setShowModal(true);
    //   }

    //   }


    // }



    const IconSingleValues = (props) => {
      return <SingleValue {...props}>{props?.data?.label}</SingleValue>;
    };

    const IconOptions = (props) => (
      <Option {...props}>
        {props?.data?.label}
      </Option>
    );

    const IconSingleValue = (props) => (
      <SingleValue {...props} key={props.data.value}>
        <div className="checkbox-wrapper-div">
          {props.data.label}
          <input type="checkbox" className="form-check-input" checked={props?.isSelected} />
        </div>
      </SingleValue>
    );

    const IconOption = (props) => (
      <Option {...props} key={props.data.value}>
        <div className="checkbox-wrapper-div">
          {props.data.label}
          <input type="checkbox" className="form-check-input" checked={props?.isSelected} />
        </div>
      </Option>
    );




  // Form Config (rest of your form config and validation)
  const defaultValues = useMemo(
    () => ({
      slots: [],
    }),
    []
  );

  // Validation schema
  const CustomformSchema = yup
    .object()
    .strict(true);

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(CustomformSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    watch,
    setError,
    reset,
    control,
    formState: { errors },
  } = methods;

  const appointmentType =  "manual";
  const slottype = watch("slottype");



    useEffect(() => {

      if(appointmentType == "manual") {
        getManualSlotData()
      }
    }, [appointmentType]);

    const getManualSlotData = async () => {
      if(selectedStartDate) {
      setManualDataLoading(true)
      const socketId = getSocketId();

      let param = {
        date:  selectedStartDate ? moment(selectedStartDate, "MM-DD-YYYY").format("YYYY-MM-DD") : '',
        book_id: data?.id,
        slot_generation : 'manual',
        socketId: socketId,
      };

      try {
        const res = await axiosApiCall.post(API_ROUTER?.DASHBOARD_BOOKING_MANUAL_SLOT_DATA, param);


        if (!res?.status) {
          return toaster(res?.message, TOAST_TYPES.ERROR);
        } else {
          if (res?.data?.data.start_time) {
            setSpaCloseMsgManual('')
            const manualData = res?.data?.data
            setManualSuggestData(manualData)
            const startTime = timeStringToDate(manualData?.start)

            setServiceTimes([{
              serviceName: data?.servicename,

                id: data?.id,
                times:  [], // Initialize times as an empty array if not provided
                input: startTime, // Initialize with the default input time
                error: data?.error || "", // Initialize with an empty error message
                duration:  manualData?.duration, // Set the duration or default to 0

            }]);
          } else {
            setServiceTimes([])
            setSpaCloseMsgManual(res?.data?.spaClosedMessage)
          }
        }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setManualDataLoading(false);

        }

      }


    }

    useEffect(() => {
      setError("slots", { message: "" });
      setValue('slots',[]);
      setServiceData([])
      // if(slottype?.value) {
      //   getSlot(slottype?.value)
      // }
    }, [slottype]);

  const formatPhoneNumber = (phone) => {
    const cleaned = ('' + phone).replace(/\D/g, ''); // Remove non-digit characters
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/); // Match the format
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`; // Format the phone number
    }
    return phone; // Return the phone number as is if it doesn't match the pattern
  };

  const handleTimeChange = (index, date) => {
    const updated = [...serviceTimes];
    updated[index].input = date;
    updated[index].error = ""; // Clear the error message when the input is changed
    setServiceTimes(updated);
  };

  const onSubmitForm = async (formData) => {
    if(appointmentType === "system") {
      if(slotTypeData.length > 0){
        if(formData.slottype === '') {
          setError("slottype", { message: "Please select the slots type." });
          return;
        }

      }
      if ((formData?.slots.length === 0)) {
        setError("slots", { message: "Please select the slots." });
        return;
      }

      setLoading(true);
      const dt = formData?.slots?.map((data) => data.value);
      const service_ids = dt?.join(",");
      const socketId = getSocketId();

      let param = {
        bookingid: data?.id,
        bookedTimeSlot: service_ids,
        new_date:  selectedStartDate ? moment(selectedStartDate, "MM-DD-YYYY").format("YYYY-MM-DD") : '',
        new_slot_tile: formData?.slottype,
        socketId: socketId,
      };
      const res = await axiosApiCall.post(API_ROUTER?.DASHBOARD_FINAL_BOOKING_APPROVED, param);

      if (!res?.status) {
        setLoading(false)
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setItems((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === data?.id ? { ...appointment, status: 'Approved' } : appointment
          )
        );
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        handleModalClose()
        reset();
        setServiceData([])
        setLoading(false)

      }

    } else {

      let hasError = false;
      const updatedServiceTimes = [...serviceTimes];

      updatedServiceTimes.forEach((service, index) => {
        if (service.times.length === 0) {
          updatedServiceTimes[index].error = `Please add at least one time for ${service.serviceName}`;
          hasError = true;
          return "";
        }
      });

      if (hasError) {
        setServiceTimes(updatedServiceTimes);
        return;
      }

      const allData = {
      slot_list_data: serviceTimes?.map((service) => ({
      service_id: service.id,
      times: service.times,
      })),
      temp_showcase_id:data?.id
      };

      if(allData) {
        setLoading(true)
        const service_ids =  serviceTimes[0]?.times?.join(",");
        const socketId = getSocketId();

        let param = {
          bookingid: data?.id,
          bookedTimeSlot: service_ids,
          new_date:  selectedStartDate ? moment(selectedStartDate, "MM-DD-YYYY").format("YYYY-MM-DD") : '',
          socketId: socketId,
        };
        const res = await axiosApiCall.post(API_ROUTER?.DASHBOARD_FINAL_BOOKING_APPROVED, param);

      if (!res?.status) {
        setLoading(false)
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setItems((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === data?.id ? { ...appointment, status: 'Approved' } : appointment
          )
        );
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        handleModalClose()
        reset();
        setServiceData([])
        setLoading(false)

      }


      }
    }
  }

  const handleModalClose = () => {
    setServiceData([])
    reset();
    handleClose()
    setValue('slottype', '');
    setServiceTimes([])
  }

  const handleSaveTime = (index,duration) => {
    const updated = [...serviceTimes];
    const inputDate = updated[index].input;

    if (!inputDate) {
      updated[index].error = "Time cannot be empty.";
    } else {
      const formattedTime = moment(inputDate).format("hh:mm A");
      const time = moment(formattedTime, "hh:mm A"); // Use hh:mm A for AM/PM format
      const newAddTime = time.add(duration, 'minutes');
      const addTime = newAddTime.format("hh:mm A")

      const newTime = formattedTime +' - '+ addTime;
      const selectedMoment = moment(inputDate);
      const minMoment = moment(minAllowedTime);
      const maxMoment = moment(maxAllowedTime);

      if (selectedMoment.isBefore(minMoment, 'minute') || selectedMoment.isAfter(maxMoment, 'minute')) {
          updated[index].error = `Please select a time between ${moment(minAllowedTime).format('h:mm A')} and ${moment(maxAllowedTime).format('h:mm A')}.`;
          setServiceTimes(updated);
          return; // Stop the save process
      }

      if (updated[index].times.includes(newTime)) {
        updated[index].error = "This time is already added.";
      } else {
        updated[index].times.push(newTime);
        updated[index].input = minAllowedTime; // Set input back to minAllowedTime after saving
        updated[index].error = "";
      }
    }
    setServiceTimes(updated);
  };

  const handleRemoveTime = (serviceIndex, timeIndex) => {
    const updated = [...serviceTimes];
    updated[serviceIndex].times.splice(timeIndex, 1);
    setServiceTimes(updated);
  };

  return (
    <>
     <CustomModal
        show={show}
        onHide={() => handleModalClose()}
        aria-labelledby="delete-confirmation-modal"
        centered
        className="sitback-modal-wrapper sitback-edit-service-modal-wrapper sitback-modalv2-wrapper sitback-approve-req-modal-wrapper sitback-suggest-req-modal-div"
      >
        <Modal.Header closeButton className="red-close-icon">
          <Modal.Title>
          {t("suggestRequestText")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SitBackModalBodyWrapper>
            <div className="sit-req-table-div">
              <Table responsive>
                <thead>
                  <tr>
                    <th>{t("cName")}</th>
                    <th>{t("phoneText")}</th>
                    <th>{t("date")}</th>
                    <th>{t("slotText")}</th>
                    <th>{t("massageTypeText")}</th>
                    <th>Preference</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>{data?.username}</td>
                      <td>{formatPhoneNumber(data?.phone)}</td>
                      <td>{moment(data?.date).format('DD MMMM YYYY')}</td>
                      <td>{data?.slot_title}</td>
                      <td>{data?.servicename}</td>
                      <td>{data?.name}</td>
                    </tr>
                </tbody>
              </Table>
              {data?.notes &&
                <div className="info-icon-text-div">
                  {/* <div className="clearfix">
                    <InlineSVG src={Info_icon} className="global_laguage_icon" />
                  </div> */}
                  <p>
                    <span>Special Note:</span> {data?.notes}
                  </p>
                </div>
              }
            </div>
            <Form onSubmit={handleSubmit(onSubmitForm)} className="sit-req-form-wrapper">
              <div className="date-slot-type-div">
                {/* <FormGroup isNewDashboardInsightsSitbackFormGroup={true} className="suggest-req-form-group">
                  <Label isNewDashboardInsightsSitbackLabel={true}>Slot Selection Type</Label>
                  <Controller
                    name="appointmentType"
                    control={control}
                    defaultValue="manual" // Default selected value
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
              {appointmentType === "system" ? (
              <>
              <Label className="suggest-timeslot-label">{t('suggestTimeSlots')}</Label>
              <div className="sitback-suggest-time-slot-main-div">
               <FormGroup isNewDashboardInsightsSitbackFormGroup={true} className="suggest-req-form-group">
                  {/* <Label isNewDashboardInsightsSitbackLabel={true}>Date</Label> */}
                  <ReactDatePicker
                      className="datepicker-input"
                      placeholderText="Select start date"
                      dateFormat="MM/dd/yyyy"
                      selected={selectedStartDate || null} // Ensure it's not undefined
                      minDate={new Date()}
                      value={selectedStartDate ? moment(selectedStartDate).format('ddd, DD MMM YYYY') : ''} // Format the selected date using toString()
                      onChange={(date) => {
                        setSelectedStartDate(date); // Update the selected start date state with the Date object
                      }}
                    />
                    <p className="text-danger mt-1">{errors?.date?.message}</p>
                </FormGroup>
                <FormGroup controlId="formBasicEmail" isNewDashboardInsightsSitbackFormGroup={true} className="suggest-req-form-group">
                  {/* <Label isNewDashboardInsightsSitbackLabel={true}>Slot Type</Label> */}

                  {slotTypeLoading ? (
                    <div className="loader-placeholder">
                      <div className="spinner-border text-info" role="status"></div>
                    </div>
                  ) : slotTypeData.length === 0 ? (
                    <div className="spa-close-message">
                      <p className="text-danger mt-1"> {spaCloseMsg || "No slots available for this date."}</p>

                    </div>
                  ) : (
                    <Controller
                      name="slottype"
                      control={control}
                      render={({ field }) => (
                        <ReactSelect
                          className="sitback-select2-container input-with-icon"
                          classNamePrefix="sitback-select-option"
                          placeholder="Select Slot Type"
                          options={slotTypeData}
                          closeMenuOnSelect={true}
                          hideSelectedOptions={false}
                          components={{
                            SingleValue: IconSingleValues,
                            Option: IconOptions,
                          }}
                          {...field}
                          isSearchable={false}
                          value={slotTypeData?.find(option => option.value === field.value)} // Set the selected value correctly
                        />
                      )}
                    />
                  )}

                  <p className="text-danger mt-1">{errors?.slottype?.message}</p>
                </FormGroup>
                {slotTypeData.length > 0 ? <>
                {slotLoading ? (
                    <div className="loader-placeholder">
                      <div className="spinner-border text-info" role="status"></div>
                    </div>
                  ) : serviceData.length === 0 ? (
                    <div className="spa-close-message">
                      <p className="text-danger mt-1"> {"No slots available for this date."}</p>

                    </div>
                  ) :
                 (
                  <FormGroup controlId="formBasicservice" className="suggest-time-slot-wrapper suggest-req-form-group">
                      {/* <Label>Suggest Time Slot(s)</Label> */}
                      <Controller
                        name="slots"
                        control={control}
                        render={({ field }) => (
                          <ReactSelect
                            className="sitback-select2-container input-with-icon Select-Service-checkbox-wrapper"
                            classNamePrefix="sitback-select-option"
                            placeholder="Choose Appointment slots"
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
                      <p className="text-danger">{errors?.slots?.message}</p>
                  </FormGroup>
                  )}
                  </> : <></>}
                  </div>
                </>

              ) :
              <>
              <div className="date-slotmanual-div">
                <FormGroup isNewDashboardInsightsSitbackFormGroup={true} className="suggest-req-form-group">
                  <Label isNewDashboardInsightsSitbackLabel={true} className="slot-manual-date-label">{t("date")}</Label>
                  <ReactDatePicker
                      className="datepicker-input"
                      placeholderText="Select start date"
                      dateFormat="MM/dd/yyyy"
                      selected={selectedStartDate || null} // Ensure it's not undefined
                      minDate={new Date()}
                      value={selectedStartDate ? moment(selectedStartDate).format('ddd, DD MMM YYYY') : ''} // Format the selected date using toString()
                      onChange={(date) => {
                        setSelectedStartDate(date); // Update the selected start date state with the Date object
                      }}
                    />
                    <p className="text-danger mt-1">{errors?.date?.message}</p>
                </FormGroup>
                </div>
                {manualDataLoading ? (
                  <div className="loader-placeholder">
                    <div className="spinner-border text-info" role="status"></div>
                  </div>
                )  : serviceTimes?.length === 0 ? (
                  <div className="spa-close-message spa-closed-msg">
                    <p className="text-danger mt-1"> {spaCloseMsgManual || "No services available."}</p>
                  </div>
                ) : (
                  serviceTimes?.map((service, index) => (
                    <div key={index} className="service-time-manage-display-div">
                      <h3 className="service-label">
                        {service.serviceName}
                      </h3>

                      <div className="datepicker-display-div">
                        <ReactDatePicker
                          selected={service.input}
                          onChange={(date) => handleTimeChange(index, date)}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={5}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          includeTimes={includedTimes}
                        />
                        <Button
                          onClick={() => handleSaveTime(index, service?.duration)}
                          className="save-btn"
                        >
                          {t("save")}
                        </Button>
                      </div>

                      {service.error && <p className="error-text">{service.error}</p>}

                      <ul className="service-time-list">
                        {service.times.map((time, timeIndex) => (
                          <li key={timeIndex} className="flex justify-between items-center">
                            {time}
                            <button
                              onClick={() => handleRemoveTime(index, timeIndex)}
                              className="remove-btn"
                            >
                              <i>
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle cx="12" cy="12" r="12" fill="white" />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M16.2584 8.5752L8.5752 16.2584L16.2584 8.5752Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M16.2584 8.5752L8.5752 16.2584"
                                    stroke="#E32C1F"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M16.2609 16.263L8.57129 8.57178L16.2609 16.263Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M16.2609 16.263L8.57129 8.57178"
                                    stroke="#E32C1F"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </i>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                )}
              </>}
              <div className="sit-req-form-btn-wrapper">
              {/* <Button variant="secondary" onClick={handleCloseModal}>Close</Button> */}
              {
                acceptData?.isReadyForApproval === true && acceptData?.slotListOutData.length === 0 ? (
                  <p className="approve-note">{t('noSuggestedSlotsAvailable')}</p>
                ) : (
                  <>
                    {manualDataLoading ? (
                      <></>
                    ) : (
                      <Button
                        type="submit"
                        disabled={loading} // Disable the button if loading is true
                        className="approve-btn"
                      >
                        {t("suggestToClientText")}
                      </Button>
                    )}
                  </>
                )
              }

            </div>
          </Form>
          </SitBackModalBodyWrapper>
        </Modal.Body>

      </CustomModal>
    </>
  );
};

export default SuggestRequestModal;
