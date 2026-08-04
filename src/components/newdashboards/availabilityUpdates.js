import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import TimePicker from "rc-time-picker";
import { useEffect, useMemo, useState } from "react";
import { Button, Form, Modal, Table, } from "react-bootstrap";

import ReactDatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ReactSelect, { components } from "react-select";
import InlineSVG from "svg-inline-react";
import * as yup from "yup";
import CustomModal from "../shared/modal";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector } from "@/redux/authCheck";
import { mySpaHeadSelectedDate, serviceSliceSelector } from "@/redux/service";
import { API_ROUTER } from "@/services/apiRouter";
import { FormGroup, Label, SitBackModalBodyWrapper } from "@/styles/global/main.style";
import {
  AvailabilityDetailDiv,
} from '@/styles/pages/insights.style';
import { Calendar_icon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { getSocketId } from "@/utils/helper";

export const AvailabilityUpdates = () => {


  //hooks
  const { toaster } = useToaster();
  const { t } = useTranslation();
  const { login } = useSelector(authCheckSliceSelector);
  const { SingleValue, Option } = components;
  const [loading, setLoading] = useState(false);
  const [tempShowcaseData, setTempShowcaseData] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [serviceData, setServiceData] = useState([]);
  const [loadingButtons, setLoadingButtons] = useState({});
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const {spaHeadSelectedDate} = useSelector(serviceSliceSelector)
  const [isUpdating, setIsUpdating] = useState(false);
  const [dateRange, setDateRange] = useState();
  const dispatch = useDispatch();

  // Form Config
  const defaultValues = useMemo(
    () => ({
        services: [],
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
      time: yup.string().test("time-validation", "Time range is invalid", function () {
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
    trigger,
    reset,
    formState: { errors },
  } = methods;


  const IconSingleValue = (props) => (
    <SingleValue {...props}>
      {props.data.label}
    </SingleValue>
  );

  const IconOption = (props) => (
    <Option {...props}>

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

  const onSubmitForm = async (formData) => {

    const dt = formData.services.map((data) => data.value);
    // const label = formData.services.map((data) => data.label);
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
    const socketId = getSocketId();
    let serviceData = {
      randomid:formData?.randomid,
      serviceids: service_ids,
      date: startDate,
      start_time: formData?.starttime.format("hh:mm:00"),
      end_time: formData?.endtime.format("hh:mm:00"),
      start_type: formData?.starttime.format("hh:mm:ss a").split(" ")[1],
      end_type: formData?.endtime.format("hh:mm:ss a").split(" ")[1],
      socketId: socketId,
    };

    try {
      setIsUpdating(true);
      const res = await axiosApiCall.post(API_ROUTER?.UPDATE_SHOWCASE, serviceData);
        if (!res?.status) {
          setIsUpdating(false);
          return toaster(res?.message, TOAST_TYPES.ERROR);
        } else {
          reset()
          listShowcaseTemp()
          setShowModal(false);
          setIsUpdating(false);
          toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        }
    } catch (error) {
      setIsUpdating(false);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const format = "h:mm a";
  const example = "time-picker";

  // useEffect
  useEffect(() => {
    getServices();
    listShowcaseTemp();
  }, []);

  useEffect(() => {
      listShowcaseTemp();
  }, [spaHeadSelectedDate]);

  const listShowcaseTemp = async () => {

    let param = {
      date: spaHeadSelectedDate ? moment(spaHeadSelectedDate).format("YYYY-MM-DD") : '',
    };

    try {

      setLoading(true)
      const res = await axiosApiCall.post(API_ROUTER?.LIST_SHOWCASE, param);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        //
        setTempShowcaseData(res?.data?.data)
        setLoading(false)
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  }

  // Function to handle edit click and open modal with the selected item's data
  const handleEditClick = (item) => {
    setShowModal(true); // Open the modal

    // Prefill form fields with selected item data
    const serviceIds = item.service_ids.split(",");
    const serviceNames = item.name.split(",").map(name => name.trim());

    const transformedArray = serviceIds.map((id, index) => ({
      value: id,
      label: serviceNames[index] || "",
    }));

    setValue("services", transformedArray);

    setValue("date", moment(item?.start_date, "YYYY-MM-DD").toDate());
    // Assuming you want to store the moment object (not Date object)
    setValue("starttime", moment(`${item.start_time} ${item.start_type}`, "hh:mm:ss a"));
    setValue("endtime", moment(`${item.end_time} ${item.end_type}`, "hh:mm:ss a"));
    setValue("randomid", item?.randomid)
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    reset()
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowDeleteConfirm(true); // Show confirmation modal
  };

  const handleDeleteConfirm = async (item) => {
    // console.log("item to delete",item);
    try {
      setLoadingButtons((prev) => ({ ...prev, [item.id]: true }));
      const socketId = getSocketId();



      let idToSend;

        if (item?.slot_generation === "calender" && item?.confirmedtype === "pending") {
          idToSend = item?.id; // Use item's randomid for API call
        } else {
          idToSend = item?.randomid; // Use alternativeId or another ID based on condition
        }

      const res = await axiosApiCall.post(API_ROUTER.DELETE_SHOWCASE, {
        randomid: idToSend, // Send the dynamically selected ID
        confirmedtype: item?.confirmedtype,
        socketId: socketId,
      })

      if (!res?.status) {
        toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster("Item deleted successfully", TOAST_TYPES.SUCCESS);
        listShowcaseTemp(); // Reload the list after deletion
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoadingButtons((prev) => ({ ...prev, [item.id]: false }));
    }
  };

  useEffect(() => {
    dateSetChanges()
  }, []);

  const dateSetChanges = async () => {
    if(spaHeadSelectedDate){
      setDateRange(moment(spaHeadSelectedDate).toDate())
    }
  }

  const dateSetChange = async (update) => {
    setDateRange(update);
    dispatch(mySpaHeadSelectedDate(update))
  }

  useEffect(() => {
    if (window.io) {
      if(login?.employeeType == "spa") {
          window.io.socket.on("serviceprovider", async (msg) => {
          if (msg?.action == "new_temp_showcase" || msg?.action == "availabilityUpdate") {
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

const handleConfirmClick = async (item) => {

  setLoadingButtons((prev) => ({ ...prev, [item.id]: true }));
  const socketId = getSocketId();

  try {
    // Make the API call to update the status
    const res = await axiosApiCall.post(API_ROUTER.UPDATTE_SHOWCASE_STATUS, {
      temp_id: item?.id, // ID to identify the item
      socketId: socketId,
    });

    if (!res?.status) {

      toaster(res?.message, TOAST_TYPES.ERROR); // Handle error response
    } else {
      // If successful, update the status locally
      setTempShowcaseData((prev) =>
        prev.map((data) =>
          data.id === item.id ? { ...data, confirmedtype: "confirmed" } : data
        )
      );
      toaster("Showcase confirmed successfully.", TOAST_TYPES.SUCCESS); // Show success message
    }
  } catch (error) {
    listShowcaseTemp()
    toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR); // Handle error during API call
  } finally {
     listShowcaseTemp()
    setLoadingButtons((prev) => ({ ...prev, [item.id]: false })); // Reset loading state
  }
};

  return (
    <>
      <div className="mobile-header-display-div">
        <div className="date-select-wrapper">
          <ReactDatePicker
            showIcon
            placeholderText={t('selectDate')}
            className="datepicker-input"
            selected={dateRange ? dateRange : ''}
            value={dateRange ? moment(dateRange).format("ddd, DD MMM YYYY") : ''}
            onKeyDown={(e) => {
              e.preventDefault();
            }}
            isClearable={!!dateRange}
            onChange={(update) =>  dateSetChange (update)}
            icon={<InlineSVG src={Calendar_icon} className="global_laguage_icon" />}
              />
        </div>
      </div>
      <AvailabilityDetailDiv>
        <div className="availability-main-wrapper-div">
          <div className="title-content-div">
            <h3>{t('availabilityUpdates')}</h3>
          </div>
          <div className="availability-table-div">
            <Table responsive striped>
              <thead>
                <tr>
                  <th>{t('services')}</th>
                  <th>{t('date')}</th>
                  <th>{t('time')}</th>
                  {/* <th>Slot Type</th> */}
                  <th>{t('addedBy')}</th>
                  <th>{t('action')}</th>
                  {login?.employeeType == "spa" ?
                  <th>{t('confirmAndUpload')}</th> : ''}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr  className="text-center">


                   {login?.employeeType == "spa" ?

                  <td colSpan="6" className="text-center">
                    <div className="spinner-border text-info" role="status"></div>
                  </td>
                  : <td colSpan="5" className="text-center">
                    <div className="spinner-border text-info" role="status"></div>
                  </td> }

                  </tr>
                ) : tempShowcaseData.length === 0 ? (
                  <div className="not-found-available-text-div">
                    {/* <td colSpan="3" className="text-center">No Availability Updates Available here.</td> */}
                    <p className="not-found-availability">{t('NoAvailabilityUpdatesAvailable')}</p>
                  </div>
                ) :
                tempShowcaseData.map((tempData, key) => {
                  //console.log("tempData:", tempData); // Log tempData

                  return (
                    <tr key={key}>
                      <td>
                        <ul className="service-ul-wrapper">
                      {tempData?.serviceData?.map((service, serviceIndex) => (
                            <li key={serviceIndex}>
                              <strong>{service.serviceName}</strong>
                              {/* <ul>
                                {service.slots.map((slot, slotIndex) => (
                                  <li key={slotIndex}>{slot.slotTime}</li>
                                ))}
                              </ul> */}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td>{moment(tempData?.start_date).format("MM/DD/YYYY")}</td>
                      <td>{tempData?.timeRange}</td>
                      {/* <td>{tempData?.slot_generation === "system" ? "System Generate" : "Manual"}</td> */}
                      <td>{tempData?.addedbyname}</td>
                      <td>
                        <div className="action-td-wrapper">
                          {tempData?.confirmedtype === "confirmed" ? (
                            <>
                              <a href="javascript:void(0);" className="edit-icon" onClick={() => handleEditClick(tempData)}>
                                <img alt="sitback" src="/images/pencil-edit-icon.svg" />
                              </a>
                            </>
                          ) : (
                            ""
                          )}
                          <a href="javascript:void(0);" onClick={() => handleDeleteClick(tempData)}>
                            <img alt="sitback" src="/images/trash-icon.svg" />
                          </a>
                        </div>
                      </td>
                          {login?.employeeType == "spa" ?
                      <td>
                        {tempData?.confirmedtype === "confirmed" ? (
                          <Button className="confirmed-btn" disabled>
                            {t('confirmedText')}
                          </Button>
                        ) : (
                          <Button
                            className="confirmed-btn question-btn"
                            onClick={() => handleConfirmClick(tempData)}
                            disabled={loadingButtons[tempData.id]}
                          >
                            {loadingButtons[tempData.id] ? "Confirming..." : "Confirm?"}
                          </Button>
                        )}
                      </td>
                      : '' }
                    </tr>
                  );
                })}


              </tbody>
            </Table>
          </div>
        </div>
      </AvailabilityDetailDiv>

      <CustomModal
        show={showModal}
        onHide={() => handleCloseModal()}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
        className="sitback-modal-wrapper sitback-edit-service-modal-wrapper sitback-availability-modal-wrapper"
      >
        <Modal.Body>
          <SitBackModalBodyWrapper className="sitback-edit-modal-body">
            <Form onSubmit={handleSubmit(onSubmitForm)}>
              <FormGroup isNewDashboardInsightsSitbackFormGroup={true}>
                <Label isNewDashboardInsightsSitbackLabel={true}>Select Services</Label>
                <Controller
                      name="services"
                      control={control}
                      render={({ field }) => (
                        <ReactSelect
                          className="sitback-select2-container input-with-icon Select-Service-checkbox-wrapper"
                          classNamePrefix="sitback-select-option"
                          placeholder={t('selectServiceAvbText')}
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
                          value={field.value || []}
                        />
                      )}
                    />
                <p className="text-danger mt-1">{errors?.services?.message}</p>
              </FormGroup>

              <div className="date-input-wrapper">

                <FormGroup isNewDashboardInsightsSitbackFormGroup={true} className="date-input-main-div">
                  <Label isNewDashboardInsightsSitbackLabel={true}>Date</Label>
                  <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                      <ReactDatePicker
                        className="datepicker-input"
                        placeholderText={t('selectStartDateText')}
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
                              placeholder={t('selectStartTimeText')}
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
                                placeholder={t('selectEndTimeText')}
                                className="time-addinput-wrapper"
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
              </div>
              <div className="showcase-btn-div availability-showcase-btn-wrapper">
              <Button
                  type="submit"
                  className="add-appointment-btn"
                  disabled={isUpdating} // Disable the button when updating
                >
                  {isUpdating ? "Updating..." : "Update"} {/* Change text based on the loading state */}
                </Button>

                <Button  className="cancel-btn-wrapper" onClick={ () => handleCloseModal()}>{t('cancel')}</Button>
              </div>
            </Form>

          </SitBackModalBodyWrapper>
        </Modal.Body>
      </CustomModal>
      <CustomModal
          show={showDeleteConfirm}
          onHide={() => setShowDeleteConfirm(false)}
          aria-labelledby="delete-confirmation-modal"
          centered
          className="confirmation-modal-wrapper sitback-delete-modal-wrapper"
        >
        <Modal.Body>
          <SitBackModalBodyWrapper className="sitback-delete-modal-body-wrapper">
            <h5 className="delete-modal-title-wrapper">{t('areYouSureYouDeleteItem')}</h5>

            <p>{itemToDelete?.name?.split(',')
              .map((item, index) => (
                <li key={index} className="mb-2">
                  {item.trim()}
                  <br />
                </li>
              ))}
            </p>
            <div className="confirmation-buttons delete-confirmation-btn">
              <Button
                variant="secondary"
                onClick={() => setShowDeleteConfirm(false)}
                className="confirm-btn cancel-btn"
                type="cancel"
              >
                {t('cancel')}
              </Button>
              <Button
                variant="danger"
                onClick={async () => {
                  await handleDeleteConfirm(itemToDelete);
                  setShowDeleteConfirm(false); // Close the modal
                }}
                className="confirm-btn"
              >
                {t('deleteConfirm')}
              </Button>
            </div>
          </SitBackModalBodyWrapper>
        </Modal.Body>
      </CustomModal>
    </>
  );
};
