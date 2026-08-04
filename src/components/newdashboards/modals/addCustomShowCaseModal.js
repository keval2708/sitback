import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import CustomModal from "@/components/shared/modal";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import { SitBackModalBodyWrapper } from "@/styles/global/main.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const AddCustomShowCaseModal = ({ show, handleClose,data, listShowcaseTemp }) => {
  const { t } = useTranslation();
  const [serviceTimes, setServiceTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toaster } = useToaster();
 // Can be dynamically set

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

  const timeStringToDates = (timeString,duration) => {
    if (timeString) {
      const [time, period] = timeString.split(" ");
      const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
      const date = new Date();
      date.setHours(period === "PM" && hours !== 12 ? hours + 12 : hours); // Adjust for PM times
      date.setMinutes(minutes);
      date.setSeconds(0);
      date.setMilliseconds(0);

      // Subtract 30 minutes
      date.setMinutes(date.getMinutes() - duration);
      return date;
    } else {
      return '';
    }
  }

  // Dynamically set min and max times based on the input
  const minAllowedTime = useMemo(() => timeStringToDate(data?.start), [data?.start]);
  const maxAllowedTime = useMemo(() => timeStringToDate(data?.end), [data?.end]);

  // Generate an array of times to include, based on 5-minute intervals
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

  // states
  // Initialize 'input' with minAllowedTime

  useEffect(() => {
    if (data) {
      const startTime = timeStringToDate(data?.start)

      const updatedServiceTimes = data?.serviceData?.map((service) => ({
        serviceName: service.service_name,
        id: service.id,
        times: service.times || [], // Initialize times as an empty array if not provided
        input: startTime || "", // Initialize with the default input time
        error: service.error || "", // Initialize with an empty error message
        duration: service.total_min || 0, // Set the duration or default to 0
      }));

      // Reset the state
      setServiceTimes(updatedServiceTimes);

    }
  }, [data,show,handleClose]);


  // const [serviceTimes, setServiceTimes] = useState(() => [
  //   {
  //     serviceName: "Cleaning",
  //     times: [],
  //     input: minAllowedTime, // Set initial input to minAllowedTime
  //     error: "",
  //     duration: 30,
  //   },
  //   {
  //     serviceName: "Plumbing",
  //     times: [],
  //     input: minAllowedTime, // Set initial input to minAllowedTime
  //     error: "",
  //     duration: 35,
  //   },
  //   {
  //     serviceName: "Electrical",
  //     times: [],
  //     input: minAllowedTime, // Set initial input to minAllowedTime
  //     error: "",
  //     duration: 55,
  //   },
  // ]);


  // Form Config (rest of your form config and validation)
  const defaultValues = useMemo(
    () => ({
      employeeName: "",
      phoneNumber: "",
      email: "",
      permissions: [],
      password: "",
      confirmPassword: "",
    }),
    []
  );

  // Validation schema
  const CustomformSchema = yup
    .object()
    .shape({
      employeeName: yup
        .string()
        .required("Employee Name is required")
        .min(3, "Employee Name must be at least 3 characters"),
      phoneNumber: yup
        .string()
        .required("Phone Number is required")
        .matches(/^\d{10}$/, "Phone Number must be 10 digits"),
      email: yup
        .string()
        .required("Email is required")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Invalid email format."),
      permissions: yup
        .array()
        .min(1, "Please select at least one permission")
        .required("Permissions are required"),
      password: yup
        .string()
        .required(t("reqPassword"))
        .min(8, t("errMinPassword"))
        .max(12, t("errMaxPassword"))
        .trim(t("validPassword"))
        .matches(
          /^(?=.*[A-Za-z0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]+$/,
          t("errPassword")
        ),
      confirmPassword: yup
        .string()
        .required(t("reqCfmPassword"))
        .oneOf([yup.ref("password"), null], t("errCfmPassword")),
    })
    .strict(true);

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(CustomformSchema),
    defaultValues,
  });

  const {
    reset,
    formState: { errors },
  } = methods;

  // Reset the form and serviceTimes when modal is closed
  const handleModalClose = (id) => {
    reset(defaultValues); // Reset the form values
    // When resetting, also set the input back to minAllowedTime
    // setServiceTimes([
    //   {
    //     serviceName: "",
    //     times: [],
    //     input: minAllowedTime, // Reset to minAllowedTime
    //     error: "",
    //     duration: 30,
    //   },
    //   {
    //     serviceName: "Plumbing",
    //     times: [],
    //     input: minAllowedTime, // Reset to minAllowedTime
    //     error: "",
    //     duration: 35,
    //   },
    //   {
    //     serviceName: "Electrical",
    //     times: [],
    //     input: minAllowedTime, // Reset to minAllowedTime
    //     error: "",
    //     duration: 55,
    //   },
    // ]);
    setServiceTimes([])
    handleClose(id); // Close the modal
  };

  const handleTimeChange = (index, date) => {
    const updated = [...serviceTimes];
    updated[index].input = date;
    updated[index].error = ""; // Clear the error message when the input is changed
    setServiceTimes(updated);
  };

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

  const handleFinalSubmit = async () => {
    let hasError = false;
    const updatedServiceTimes = [...serviceTimes];

    updatedServiceTimes.forEach((service, index) => {
      if (service.times.length === 0) {
        updatedServiceTimes[index].error = `Please add at least one time for ${service.serviceName}`;
        hasError = true;
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


    try {
      setLoading(true)

          const res = await axiosApiCall.post(API_ROUTER.DASHBOARD_ADD_SHOWCASE_TEMP_DETAILS, allData);

          if (!res?.status) {
            toaster(res?.message, TOAST_TYPES.ERROR);
          } else {
            toaster("Showcase Appointments Added successfully", TOAST_TYPES.SUCCESS);
            listShowcaseTemp();
            handleModalClose(); // Reload the list after deletion
          }
        } catch (error) {
          toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
        } finally {
          setLoading(false)
        }


    // Close the modal after submission
  };

  return (
    <CustomModal
      show={show}
      onHide={() => handleModalClose(data?.id)}
      centered
      aria-labelledby="example-modal-sizes-title-sm"
      className="sitback-modal-wrapper sitback-edit-service-modal-wrapper sitback-availability-modal-wrapper"
    >
      <Modal.Body>
        <SitBackModalBodyWrapper className="sitback-edit-modal-body sitback-service-time-manage-modal-body">
          <div className="">
            <h3 className="modal-title-text">Slot Manager</h3>

            {serviceTimes?.map((service, index) => {
              const max = timeStringToDates(data?.end, service?.duration)
              return (
                <div key={index} className="service-time-manage-display-div">
                  <h3 className="service-label">{service.serviceName} ({service?.duration} min)</h3>

                  <div className="datepicker-display-div">
                    <DatePicker
                      selected={service.input} // This will now default to minAllowedTime
                      onChange={(date) => handleTimeChange(index, date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={5}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      minTime={minAllowedTime}
                      maxTime={max}
                      includeTimes={includedTimes}
                    />
                    <button
                      onClick={() => handleSaveTime(index, service?.duration)}
                      className="save-btn"
                    >
                      Save
                    </button>
                  </div>

                  {service.error && (
                    <p className="error-text">{service.error}</p>
                  )}

                  <ul className="service-time-list">
                    {service.times.map((time, timeIndex) => (
                      <li key={timeIndex} className="flex justify-between items-center">
                        {time}
                        <button
                          onClick={() => handleRemoveTime(index, timeIndex)}
                          className="remove-btn"
                        >
                          <i>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="12" cy="12" r="12" fill="white"/>
                              <path fillRule="evenodd" clipRule="evenodd" d="M16.2584 8.5752L8.5752 16.2584L16.2584 8.5752Z" fill="white"/>
                              <path d="M16.2584 8.5752L8.5752 16.2584" stroke="#E32C1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path fillRule="evenodd" clipRule="evenodd" d="M16.2609 16.263L8.57129 8.57178L16.2609 16.263Z" fill="white"/>
                              <path d="M16.2609 16.263L8.57129 8.57178" stroke="#E32C1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </i>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            <p className="small-note-text">Please note that manually added slots cannot be edited, but they can be removed.</p>
            <div className="submit-btn-wrapper">
                  <button
                    onClick={() => handleFinalSubmit()}
                    className="submit-btn"
                    disabled={loading} // Disable button while submitting
                  >
                    {loading ? 'Submitting...' : 'Submit'}
                  </button>
                  <Button onClick={() => handleModalClose(data?.id)} className="submit-btn cancel-btn-wrapper">Cancel</Button>
                </div>
          </div>
        </SitBackModalBodyWrapper>
      </Modal.Body>
    </CustomModal>
  );
};

export default AddCustomShowCaseModal;
