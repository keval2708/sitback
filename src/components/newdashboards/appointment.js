import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Modal,Table } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { default as ReactSelect, components } from "react-select";
import * as yup from "yup";
import SuggestRequestModal from "./modals/suggestRequestModal";
import CustomModal from "../shared/modal";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector } from "@/redux/authCheck";
import { mySpaHeadSelectedDate, mySpaHeadSelectedEndDate, mySpaHeadSelectedStartDate, mySpaHeadSelectedType, mySpaHeadStatusSearch, mySpaHeadTextSearch, serviceSliceSelector } from "@/redux/service";
import { API_ROUTER } from "@/services/apiRouter";
import { Input, Label, SitBackModalBodyWrapper } from "@/styles/global/main.style";
import { AppointmentContentDiv } from '@/styles/pages/insights.style';
import axiosApiCall from "@/utils/axios";
import { TOAST_TYPES } from "@/utils/constants";
import { getSocketId } from "@/utils/helper";

export const Appointment = () => {

  const { SingleValue, Option } = components;
  const { login } = useSelector(authCheckSliceSelector);


  // state

  const { t } = useTranslation();
  const { toaster } = useToaster();
  const [serviceData, setServiceData] = useState([]);
  const {spaHeadSelectedEndDate} = useSelector(serviceSliceSelector)
  const {spaHeadSelectedStartDate} = useSelector(serviceSliceSelector)
  const {spaHeadTextSearch} = useSelector(serviceSliceSelector)
  const {spaHeadStatusSearch} = useSelector(serviceSliceSelector)
  const {spaHeadSelectedType} = useSelector(serviceSliceSelector)
  const [showModal, setShowModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [dateRange, setDateRange] = useState();
  const dispatch = useDispatch();

  // State for managing displayed appointments
  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [statusText, setStatusText] = useState("");
  const [appPageResponse, setAppPageResponse] = useState([]);
  const [acceptData, setAcceptData] = useState([]);
  const [headDate, setHeadDate] = useState(null);
  const [confirmationStatusMap, setConfirmationStatusMap] = useState({});
  const [loadingStatusMap, setLoadingStatusMap] = useState({});
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [showSuggestModal, setSuggestShowModal] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmData,setConfirmData]  = useState(false);
  const [selectedSlot, setSelectedSlot] = useState();
  const [confirmShowMsg, setConfirmShowMsg] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);



 // Flag to indicate if there are more pages



  // Handle "Accept" button click
  const handleAccept = async (data) => {

    setSelectedAppointment(data);
     const socketId = getSocketId();

    let param = {
      bookingid: data?.id,
      isCheckAvailability: true,
      socketId: socketId,
    };

    try {
    const res = await axiosApiCall.post(API_ROUTER?.DASHBOARD_BOOKING_APPROVED, param);
      // console.log("res",res);

    if (!res?.status) {
      return toaster(res?.message, TOAST_TYPES.ERROR);
    } else {
      setAcceptData(res?.data?.data)
      if(res?.data?.data?.isReadyForApproval == true) {
        const bookingData = res?.data?.data?.slotListOutData;

        let options = [];
          bookingData?.length &&
            bookingData?.map((s) => {
              options.push({
                value: s,
                label: s,
              });
            });
        setServiceData(options);
      } else {
        setServiceData([]);
      }
    }
    } catch (error) {
      // console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setShowModal(true);
    }
  };

  const handleAcceptDateGet = async (data) => {
    setSelectedAppointment(data);
    setSuggestShowModal(true); // Open the modal (if needed)

  };


  const handleDecline= (data) => {
    setSelectedAppointment(data);
    setShowDeclineModal(true)
  };

  const handleFinalDecline = async (data) => {

    setLoading(true)
    const socketId = getSocketId();
    const message = getValues("message"); // Get the message field value

    let declineData = {
      bookingid: data?.id,
      decline_reason: message, // Add message to the request body
      socketId: socketId,
    };

    try {
      const res = await axiosApiCall.post(API_ROUTER?.DASHBOARD_FINAL_BOOKING_REJECT, declineData);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setItems((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === data?.id ? { ...appointment, status: 'Rejected' } : appointment
          )
        );
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        setShowDeclineModal(false);
        setSelectedAppointment(null);
        reset({
          message: '',  // Reset message value
        });

      }
    } catch (error) {
      // console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }


  };

  const defaultValues = {
    slots: [],
  };

  const CustomFormSchema = yup
    .object()
    .shape()
    .strict(true);

  // Hooks
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(CustomFormSchema),
    defaultValues,
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    getValues,
    formState: { errors },
  } = methods;




  useEffect(() => {
    if (page === 1) {
      setItems([]);
      getNotification(); // explicitly call fetchData if page is already 1
    } else {
      setPage(1);
      getNotification(1);
    }
  }, [spaHeadTextSearch,spaHeadSelectedStartDate,spaHeadSelectedEndDate,spaHeadStatusSearch]);

  useEffect(() => {
      getNotification(1);
  }, [])

  const getNotification = async (page = 1) => {

    setLoading(true);

    let data = {
      page: page,
      search: spaHeadTextSearch ? spaHeadTextSearch : '',
      // filterDate: spaHeadSelectedDate ? moment(spaHeadSelectedDate).format("YYYY-MM-DD") : '',
      // startDate: spaHeadSelectedStartDate ? moment(spaHeadSelectedStartDate).format("YYYY-MM-DD") : '',
      // endDate: spaHeadSelectedEndDate ? moment(spaHeadSelectedEndDate).format("YYYY-MM-DD") : '',
      filterstatus: spaHeadStatusSearch ? spaHeadStatusSearch?.value : '',
      perpage: 10,

    };

    try {
      const res = await axiosApiCall.post(API_ROUTER?.GET_DASHBOARD_BOOKING_LIST, data);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        const bookingList = res?.data?.data?.bookingList;
        // console.log("bookingList",bookingList);
        if (bookingList.length > 0) {

          setItems((prevData) => (page == 1 ? bookingList : [...prevData, ...bookingList]));
          setAppPageResponse(res?.data)
        } else {
          setItems([]);
        }
      }
    } catch (error) {
      // console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextNotification = async () => {
    setPage((prev) => prev + 1);
    setAppPageResponse(null);

    if (appPageResponse?.data?.isNextPage) {
      await getNotification(page + 1);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
    reset();
    setServiceData([])
    setAcceptData([])

  };

  const handleCloseSuggestModal = () => {
    setSuggestShowModal(false);
    setSelectedAppointment(null);
    reset();
    setServiceData([])
    setAcceptData([])

  };

  const handleCloseDeclineModal = () => {
    setShowDeclineModal(false);
    setSelectedAppointment(null);
    reset({
      message: '',  // Reset message value
    });
  };
  const handleConfirmModal = () => {
    setConfirmData()
    setShowConfirmModal(false);
  };

  const onSubmitForm = async (formData) => {

    if (serviceData?.length > 0 && formData?.slots == '') {
      setError("slots", { message: "Please select the slots." });
      return;
    }

    const dt = formData?.slots?.map((data) => data.value);
    const service_ids = dt?.join(",");

    setLoading(true);
    const socketId = getSocketId();

    let data = {
      bookingid: selectedAppointment?.id,
      bookedTimeSlot: service_ids,
      socketId: socketId,

    };

    try {
      const res = await axiosApiCall.post(API_ROUTER?.DASHBOARD_FINAL_BOOKING_APPROVED, data);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setItems((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === selectedAppointment?.id ? { ...appointment, status: 'Approved' } : appointment
          )
        );
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        setShowModal(false);
        setSelectedAppointment(null);
        reset();
        setServiceData([])

      }
    } catch (error) {
      // console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  // Handle the change in the search input field
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    dispatch(mySpaHeadTextSearch(e.target.value))
  };

   const handleStatusChange = (e) => {
      setStatusText(e)
      dispatch(mySpaHeadStatusSearch(e))
    };

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




  useEffect(() => {
      dateSetChanges()
  }, []);

  const dateSetChanges = async () => {

    if (spaHeadTextSearch) {
      setSearchText(spaHeadTextSearch)
      dispatch(mySpaHeadTextSearch(spaHeadTextSearch))
    }
    if(spaHeadStatusSearch) {
      setStatusText(spaHeadStatusSearch)
       dispatch(mySpaHeadStatusSearch(spaHeadStatusSearch))
    }
    if(spaHeadSelectedType) {
      setSelectedFilter(spaHeadSelectedType)
      dispatch(mySpaHeadSelectedType(spaHeadSelectedType));
    }
  }

  const dateSetChange = async (update) => {
    setSelectedFilter('');
    setHeadDate(moment(update).format("YYYY-MM-DD"));
    setDateRange(update);
    dispatch(mySpaHeadSelectedDate(update))
    dispatch(mySpaHeadSelectedStartDate(null));
    dispatch(mySpaHeadSelectedEndDate(null));
    dispatch(mySpaHeadSelectedType(null));
  }

  useEffect(() => {
  const handleSocketMessage = async (msg) => {
    // console.log("window.io", msg);
    if (msg.action === "new_booking_from_quick" || msg.action === "booking_confirmed_bell_icon" || msg.action === "spa_close_booking_bell_icon" || msg.action === "booking_action" || msg.action === "AppointmentRequestUpdated") {
      callSomeFunction(msg?.message);
    }
  };

    if (window.io) {

      if(login?.employeeType == "spa") {
        window.io.socket.on("serviceprovider", handleSocketMessage);
      } else if (login?.employeeType == "spaemployee") {
        window.io.socket.on("spaemployee", handleSocketMessage);
      }
    }

    // Cleanup the old listener when headDate changes or component unmounts
    return () => {
      if (window.io) {
        if(login?.employeeType == "spa") {
          window.io.socket.off("serviceprovider", handleSocketMessage);
        } else if (login?.employeeType == "spaemployee") {
          window.io.socket.off("spaemployee", handleSocketMessage);
        }

      }
    };
  }, [headDate,spaHeadTextSearch,spaHeadStatusSearch]);

  const callSomeFunction = async () => {
    setPage(1);
    getNotification(1);

  }

  const formatPhoneNumber = (phone) => {
    const cleaned = ('' + phone).replace(/\D/g, ''); // Remove non-digit characters
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/); // Match the format
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`; // Format the phone number
    }
    return phone; // Return the phone number as is if it doesn't match the pattern
  };

  const handleConfirmationChange = (id, value) => {
    setConfirmationStatusMap((prev) => ({
      ...prev,
      [id]: value, // Set the selected status for the appointment
    }));
  };

  const getMatchingSlot = (slotTitle, timeSlots) => {
    return timeSlots.find(slot => {
        const [start] = slot.split(" - ");
        return start === slotTitle;
    });
};

  const handleSaveConfirmation = async (info) => {
    const selectedStatus = confirmationStatusMap[info?.id] ? confirmationStatusMap[info?.id] : 'Confirmed';
    setLoadingStatusMap((prev) => ({ ...prev, [info?.id]: true }));
    const socketId = getSocketId();


    try {
      const res = await axiosApiCall.post(API_ROUTER?.DASHBOARD_CONFIRMATION_STATUS_UPDATE, {
        bookingid: info?.id,
        confirmed_status: selectedStatus,
        socketId: socketId,
      });
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        if(res?.data?.bookedTimeSlot && res?.data?.bookedTimeSlot.length > 0) {

          const selectedTime = getMatchingSlot(info?.slot_title,res?.data?.bookedTimeSlot)
          if(selectedTime) {
            setSelectedSlot(selectedTime);
          } else {
            setSelectedSlot(res?.data?.bookedTimeSlot[0]);
          }
          if(res?.data?.slotfinalby == "user") {
            setConfirmShowMsg(res?.data?.slotfinalby)
          } else {
            setConfirmShowMsg(null)
          }

          setConfirmData(res?.data)
          setShowConfirmModal(true)
        } else {
          setSelectedSlot();
          setConfirmData()
          toaster("Status updated successfully", TOAST_TYPES.SUCCESS);
          setItems((prev) =>
            prev.map((appointment) =>
              appointment.id === info?.id ? { ...appointment, confirmed_status: selectedStatus, confirmed_bell_icon: 0, } : appointment
            )
          );
        }

      }
    } catch (error) {
      // console.error("Error updating confirmation:", error);
    } finally {
      // Reset loading state
      setLoadingStatusMap((prev) => ({ ...prev, [info?.id]: false }));
    }
  };

  const selectThisWeek = () => {
    if (selectedFilter === 'week') {
      // Toggle off
      setSelectedFilter(null);
      dispatch(mySpaHeadSelectedType(null));
      dispatch(mySpaHeadSelectedStartDate(null));
      dispatch(mySpaHeadSelectedEndDate(null));
    } else {
      // Toggle on
      setSelectedFilter('week');
      setDateRange(null);
      dispatch(mySpaHeadSelectedDate(null))
      let startOfWeek = moment().startOf('week').format('YYYY-MM-DD');
      let endOfWeek = moment().endOf('week').format('YYYY-MM-DD');
      dispatch(mySpaHeadSelectedStartDate(startOfWeek));
      dispatch(mySpaHeadSelectedEndDate(endOfWeek));
      dispatch(mySpaHeadSelectedType('week'));
    }
  };

  const selectThisMonth = () => {
      if (selectedFilter === 'month') {
        // Toggle off
        setSelectedFilter(null);
        dispatch(mySpaHeadSelectedType(null));
        dispatch(mySpaHeadSelectedStartDate(null));
        dispatch(mySpaHeadSelectedEndDate(null));
      } else {
        // Toggle on
        setSelectedFilter('month');
        setDateRange(null);
        dispatch(mySpaHeadSelectedDate(null))
        let startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
        let endOfMonth = moment().endOf('month').format('YYYY-MM-DD');
        dispatch(mySpaHeadSelectedStartDate(startOfMonth));
        dispatch(mySpaHeadSelectedEndDate(endOfMonth));
        dispatch(mySpaHeadSelectedType('month'));
      }
  };

  const options = [
    { value: "All", label: "All" },
    { value: "Pending", label: "Pending"},
    { value: "Approved", label: "Approved"},
    { value: "Rejected", label: "Rejected"},
    { value: "Confirmed", label: "Confirmed"},
    { value: "Not Confirmed", label: "Not Confirmed"},
  ];

  const onSubmitForms = async () => {

    setConfirmLoading(true)
    const socketId = getSocketId();
    const selectedStatus = 'Confirmed';


    try {
      const res = await axiosApiCall.post(API_ROUTER?.DASHBOARD_CONFIRMATION_STATUS_UPDATE, {
        bookingid: confirmData?.bookingid,
        confirmed_status: selectedStatus,
        finalslot:selectedSlot,
        socketId: socketId,
      });
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
          callSomeFunction()
          handleConfirmModal()
          setSelectedSlot();
          setConfirmData()
          toaster("Status updated successfully", TOAST_TYPES.SUCCESS);
        }
    } catch (error) {
      // console.error("Error updating confirmation:", error);
    } finally {
      setConfirmLoading(false)
      // Reset loading state

    }
  };

  const editConformation = async (listData) => {

    setItems((prev) =>
      prev.map((appointment) =>
        appointment.id === listData?.id ? { ...appointment, confirmed_status: 'Pending', confirmed_bell_icon: 0, it_close_show: true, past_status:listData?.confirmed_status  } : appointment
      )
    );
  }

  const closeIcon  = async (listData) => {
    setItems((prev) =>
      prev.map((appointment) =>
        appointment.id === listData?.id ? { ...appointment, confirmed_status: listData?.past_status ? listData?.past_status : '' , } : appointment
      )
    );
  }
const selectStatus = (status) => {
    if (statusText.value === status) {
      // If the current filter is the same as the selected status, remove the filter
      setStatusText({ value: "All", label: "All" });
      dispatch(mySpaHeadStatusSearch({ value: "All", label: "All" }));
    } else {
      // Set the selected status filter and update Redux store
      setStatusText({ value: status, label: status });
      dispatch(mySpaHeadStatusSearch({ value: status, label: status }));
    }
  };
  return (
    <>
      <div className="mobile-header-display-div">
          {/* <div className="date-select-wrapper">
            <ReactDatePicker
                showIcon
                placeholderText="Select Date"
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
          </div> */}
          <div className="week-month-filters sitback-all-pending-filter-wrapper">
              {/* <button
               className={selectedFilter === 'week' ? 'active-filter' : ''}
                    onClick={selectThisWeek}
              >
                This Week
              </button>
              <button
                className={selectedFilter === 'month' ? 'month-btn active-filter' : 'month-btn'}
                    onClick={selectThisMonth}
              >
                This Month
              </button> */}

              <button
                className={statusText.value === "All" ? 'active-filter' : ''}
                onClick={() => selectStatus("All")}
              >
                {t("allText")}
              </button>
              <button
                className={statusText.value === "Pending" ? 'active-filter' : ''}
                onClick={() => selectStatus("Pending")}
              >
                {t("pending")}
              </button>
              <button
                className={statusText.value === "Confirmed" ? 'active-filter' : ''}
                onClick={() => selectStatus("Confirmed")}
              >
                {t("confirmedText")}
              </button>
              <button
              className={statusText.value === "Rejected" ? 'active-filter' : ''}
                onClick={() => selectStatus("Rejected")}
              >
                {t("declinedText")}
              </button>
          </div>
          <div className="search-status-select-display-div">
            <div className="search-input-icon-div">
              <i className="calendar-icon">
                <img alt="sitback" src="/images/search-normal.svg" />
              </i>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Control
                    type="text"
                    placeholder="Search"
                    value={searchText} // Bind value to the state
                    onChange={handleSearchChange} // Update state on change
                  />
              </Form.Group>
            </div>

        </div>
        </div>

      <AppointmentContentDiv>
        <div className="table-title-div">
          <h3>{t("appointmentRequestsText")}</h3>
        </div>
        <div className="appointment-table-div">
          <div className="sitback-notification-list-wrapper">
            <InfiniteScroll
              className="pageScroll"
              dataLength={items?.length || 0}
              next={() => handleNextNotification()}
              hasMore={appPageResponse?.data?.isNextPage }
              loader={<div style={{ visibility: "hidden" }}>{t('done')}</div>}
              height={600}
              scrollableTarget= "sitback-notification-list-wrapper"
            >
              <Table responsive striped>
              <thead>
                {/* <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Service</th>
                  <th>Actions</th>
                </tr> */}
              </thead>
              <tbody>
              {items.length > 0 ? (
                items.map((appointment) => (
                  <tr key={appointment.id} className={appointment?.confirmed_bell_icon ? 'notification-tr-display-wrapper' : ''}>
                    <td>
                      <p className="appointment-name-text">{appointment.username}</p>
                      <p className="mobile-number-text">{appointment?.countrycode} {appointment?.phone}</p>
                    </td>
                    <td>
                      <span className={`appointment-status ${appointment.status.charAt(0).toLowerCase() + appointment.status.slice(1)}`}>
                        {appointment?.status}
                      </span>
                    </td>
                    <td>
                      {appointment?.confirmed_bell_icon ?
                      <div className="notification-icon-wrapper">
                        <img alt="sitback" src="/images/notification-icon-ring-transparent.gif" />
                      </div>
                    : <></>}
                    </td>
                    <td>{moment(appointment?.date).format('DD MMMM YYYY')}</td>
                    <td>{appointment.slot_title}</td>
                    <td>{appointment.servicename}</td>

                    <td>
                      <div className="appoint-table-btn-div">
                        <div className="appointment-status-active-div">
                          <span className={`declined ${appointment.status === "Rejected" ? "" : "d-none"}`}>Declined</span>
                              {appointment.status === "Approved" && appointment.confirmed_status === "Pending" ?  (
                                <div className="confirmation-select-wrapper">
                                  <Form.Select
                                    value={confirmationStatusMap[appointment.id] || ""}
                                    onChange={(e) => handleConfirmationChange(appointment.id, e.target.value)}
                                    className="confirmation-dropdown"
                                  >
                                    <option value="Confirmed" selected>{t("confirmText")}</option>
                                    <option value="Not Confirmed">{t("notConfirmText")}</option>
                                  </Form.Select>
                                  <Button
                                    variant="primary"
                                    size="sm"
                                    className="save-btn"
                                    onClick={() => handleSaveConfirmation(appointment)}
                                    disabled={loadingStatusMap[appointment.id]} // Disable if loading
                                  >
                                    {loadingStatusMap[appointment.id] ? "Saving..." : "Save"} {/* Change text while loading */}
                                  </Button>
                                  {appointment?.it_close_show ? <><Button className="edit-remove-btn-wrapper" onClick={() => closeIcon(appointment)}><img alt="sitback" src="/images/close-icon.svg" /></Button></> : ''}
                                </div>
                              ) : <></>}


                              {appointment.status === "Approved" && appointment.confirmed_status === "Confirmed" ?  (
                                <>
                                <span className={`accepted ${appointment.status === "Approved" ? "" : "d-none"}`}>{t("confirmedText")}</span>
                                {appointment?.isEditButton == 1 ?
                                <Button onClick={() => editConformation(appointment)} className="edit-remove-btn-wrapper edit-pencil-icon">
                                  <img alt="sitback" src="/images/pencil-edit-icon.svg"/>
                                </Button> : ''}
                                </>
                              ): <></>}

                              {appointment.status === "Approved" && appointment.confirmed_status === "Not Confirmed" ? (
                                <>
                                <span className="declined not-confirmed-span-wrapper" >{t("notConfirmText")}</span>
                                {appointment?.isEditButton == 1 ?
                                <Button onClick={() => editConformation(appointment)} className="edit-remove-btn-wrapper edit-pencil-icon">
                                  <img alt="sitback" src="/images/pencil-edit-icon.svg"/>
                                </Button> : ''}
                                </>
                              ) : <></>}

                          <span className={`declined ${appointment.status === "Pastbooking" ? "" : "d-none"}`}>{t('expired')}</span>
                        </div>
                        {appointment.status === "Pending" && (
                          <>
                            {/* <button
                              onClick={() => handleAccept(appointment, 'Approved')}
                              className="btn-wrapper"
                            >
                              Accept
                            </button> */}
                             <div className={`accept-decline-icon-btn-div ${appointment.slot_id != null ? '' : 'decline-btn-display-div'}`}>

                              {appointment.slot_id != null ?
                              <>
                              <a href="javascript:void(0);" className="accept-btn" onClick={() => handleAccept(appointment, 'Approved')}>
                                <img alt="sitback" src="/images/accept-user-icon.svg" />
                              </a>
                              <a href="javascript:void(0);" className="decline-btn">
                                <img alt="sitback" src="/images/decline-user-icon.svg" onClick={() => handleDecline(appointment, 'Rejected')} />
                              </a>
                              </> : <>  <a href="javascript:void(0);" className="decline-btn">
                                <img alt="sitback" src="/images/decline-user-icon.svg" onClick={() => handleDecline(appointment, 'Rejected')} />
                              </a> </> }

                            </div>
                            {/* <a href="javascript:void(0)" onClick={() => handleDecline(appointment, 'Rejected')} className="btn-wrapper declined">Decline</a> */}

                            <a href="javascript:void(0)"  className="btn-wrapper suggest-btn" onClick={() => handleAcceptDateGet(appointment, 'Approved')}>{t("suggest")}</a>



                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                !loading && (
                  <tr>
                    <td colSpan="6" className="text-center">
                      <p className="not-found-text-wrapper">{t("noAppointmentRequestText")}</p>
                    </td>
                  </tr>
                )
              )}
            </tbody>
              </Table>
            </InfiniteScroll>
          </div>
        </div>
        <div className="appointment-mobile-table-div">
          <InfiniteScroll
            className="pageScroll"
            dataLength={items?.length || 0}
            next={() => handleNextNotification()}
            hasMore={appPageResponse?.data?.isNextPage }
            loader={<div style={{ visibility: "hidden" }}>{t('done')}</div>}
            height={600}
            scrollableTarget= "sitback-notification-list-wrapper"
          >
            <Table responsive striped>
              <tbody>
                  {items.length > 0 ? (
                items.map((appointment) => (
                    <>
                    <tr key={appointment.id} className={appointment?.confirmed_bell_icon ? 'notification-tr-display-wrapper' : ''}>
                      <td>
                        <div className="appointment-detail-div">
                        <p>{moment(appointment?.date).format('DD MMMM YYYY')}</p>
                          <h5>{appointment.username}</h5>
                        </div>
                      </td>
                      <td>
                        <div className="body-massage-detail-div">
                          <div className="massage-appointment-image-div">
                            {appointment.slot_title == "Morning" ?<>
                              <div className="icon-img"><img alt="sitback" src="/images/half-sun-image.svg" /></div>
                            </> : <></> }

                            {appointment.slot_title == "Afternoon" ?<>
                            <div className="icon-img"><img alt="sitback" src="/images/sun-image.svg" /></div>

                            </> : <></> }


                            {appointment.slot_title == "Evening" ?<>
                            <div className="icon-img"><img alt="sitback" src="/images/moon-with-clouds-image.svg" /></div>
                            </> : <></> }
                            {appointment?.confirmed_bell_icon ?
                            <div className="notification-icon-wrapper">
                              <img alt="sitback" src="/images/notification-icon-ring-transparent.gif" />
                          </div> : <></>}
                          </div>
                          {appointment.slot_title != "Evening" && appointment.slot_title != "Afternoon"  && appointment.slot_title != "Morning"?<>
                            <p className="slot-time-text">{appointment.slot_title}</p>
                          </> : <></> }
                          {appointment.status === "Rejected" ? <>
                            <p className="detail-text">{appointment.servicename}</p>
                            <p className="appointment-status rejected">{t('rejected')}</p>
                            </> : <></>
                          }
                          {appointment.status === "Pastbooking" ? <>
                            <p className="detail-text">{appointment.servicename}</p>
                            <p className="appointment-status rejected">{t('pastBooking')}</p>
                            </> : <></>
                          }
                          {appointment.status === "Pending" ? <>

                            <p className="detail-text">{appointment.servicename}</p>
                            <p className="appointment-status pending">{t('pending')}</p>
                            </> : <></>
                          }
                        {appointment.status === "Approved" ? <>

                          <p className="detail-text">{appointment.servicename}</p>
                          <p className="appointment-status approved">{t("approved")}</p>
                          </> : <></>
                          }

                        </div>
                      </td>
                      <td>
                        <div className="appoint-table-btn-div">
                          <div className="appointment-status-active-div">
                            {appointment.status === "Rejected" ? <>
                            <span className="declined">{t('declinedText')}</span>
                            </> : <></>
                            }
                            {appointment.status === "Pastbooking" ? <>
                            <span className="declined">{t('expired')}</span>
                            </> : <></>
                            }
                            {appointment.status === "Approved" && appointment.confirmed_status === "Pending" ?  (
                              <div className="confirmation-select-wrapper">
                                <Form.Select
                                  value={confirmationStatusMap[appointment.id] || ""}
                                  onChange={(e) => handleConfirmationChange(appointment.id, e.target.value)}
                                  className="confirmation-dropdown"
                                >
                                  <option value="Confirmed" selected>{t('confirmText')}</option>
                                  <option value="Not Confirmed">{t('notConfirmText')}</option>
                                </Form.Select>
                                <Button
                                  variant="primary"
                                  size="sm"
                                  className="save-btn"
                                  onClick={() => handleSaveConfirmation(appointment)}
                                  disabled={loadingStatusMap[appointment.id]} // Disable if loading
                                >
                                  {loadingStatusMap[appointment.id] ? "Saving..." : "Save"} {/* Change text while loading */}
                                </Button>
                                {appointment?.it_close_show ? <><Button className="edit-remove-btn-wrapper" onClick={() => closeIcon(appointment)}><img alt="sitback" src="/images/close-icon.svg" /></Button></> : ''}
                              </div>
                            ) : <></>}
                            {appointment.status === "Approved" && appointment.confirmed_status === "Confirmed" ?  (
                              <>
                              <span className={`accepted ${appointment.status === "Approved" ? "" : "d-none"}`}>{t("confirmedText")}</span>
                              {appointment?.isEditButton == 1 ?
                              <Button onClick={() => editConformation(appointment)} className="edit-remove-btn-wrapper edit-pencil-icon">
                                <img alt="sitback" src="/images/pencil-edit-icon.svg"/>
                              </Button> : ''}
                              </>
                            ): <></>}

                            {appointment.status === "Approved" && appointment.confirmed_status === "Not Confirmed" ? (
                              <>
                              <span className="declined not-confirmed-span-wrapper">{t('notConfirmText')}</span>
                              {appointment?.isEditButton == 1 ?
                              <Button onClick={() => editConformation(appointment)} className="edit-remove-btn-wrapper edit-pencil-icon">
                                <img alt="sitback" src="/images/pencil-edit-icon.svg"/>
                              </Button> : ''}
                              </>
                            ) : <></>}

                          </div>

                          {appointment.status === "Pending" && (
                            <>
                              {/* <div className="accept-decline-icon-btn-div"> */}
                                <div className={`accept-decline-icon-btn-div ${appointment.slot_id != null ? '' : 'decline-btn-display-div'}`}>
                                {appointment.slot_id != null ?
                                <>
                                <a href="javascript:void(0);" className="accept-btn" onClick={() => handleAccept(appointment, 'Approved')}>
                                  <img alt="sitback" src="/images/accept-user-icon.svg" />
                                </a>
                                <a href="javascript:void(0);" className="decline-btn">
                                  <img alt="sitback" src="/images/decline-user-icon.svg" onClick={() => handleDecline(appointment, 'Rejected')} />
                                </a>
                                </> : <> <a href="javascript:void(0);" className="decline-btn">
                                  <img alt="sitback" src="/images/decline-user-icon.svg" onClick={() => handleDecline(appointment, 'Rejected')} />
                                </a> </> }
                              </div>
                              <a href="javascript:void(0)"  className="btn-wrapper suggest-btn" onClick={() => handleAcceptDateGet(appointment, 'Approved')}>{t('suggest')}</a>
                            </>
                          )}

                        </div>
                      </td>
                    </tr>
                    </>
                ))
              ) : (
                !loading && (
                  <tr>
                    <td colSpan="3" className="text-center">
                      <p className="not-found-text-wrapper">{t("noAppointmentRequestText")}</p>
                    </td>
                  </tr>
                )
              )}
              </tbody>
            </Table>
          </InfiniteScroll>
        </div>
      </AppointmentContentDiv>

      <CustomModal
        show={showModal}
        onHide={() => handleCloseModal()}
        aria-labelledby="delete-confirmation-modal"
        centered
        className="sitback-modal-wrapper sitback-edit-service-modal-wrapper sitback-modalv2-wrapper sitback-approve-req-modal-wrapper"
      >
        <Modal.Header closeButton className="red-close-icon">
          <Modal.Title>
            {t('approveRequestText')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SitBackModalBodyWrapper>
            <div className="sit-req-table-div">
              <Table responsive>
                <thead>
                  <tr>
                    <th>{t('cName')}</th>
                    <th>{t('phoneText')}</th>
                    <th>{t('date')}</th>
                    <th>{t('slotText')}</th>
                    <th>{t('massageTypeText')}</th>
                    <th>Preference</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>{selectedAppointment?.username}</td>
                      <td>{formatPhoneNumber(selectedAppointment?.phone)}</td>
                      <td>{moment(selectedAppointment?.date).format('DD MMMM YYYY')}</td>
                      <td>{selectedAppointment?.slot_title}</td>
                      <td>{selectedAppointment?.servicename}</td>
                      <td>{selectedAppointment?.name}</td>
                    </tr>
                </tbody>
              </Table>
              {selectedAppointment?.notes &&
                <div className="info-icon-text-div">
                  {/* <div className="clearfix">
                    <InlineSVG src={Info_icon} className="global_laguage_icon" />
                  </div> */}
                  <p>
                    <span>Special Note:</span> {selectedAppointment?.notes}
                  </p>
                </div>
              }
            </div>
          <Form onSubmit={handleSubmit(onSubmitForm)} className="sit-req-form-wrapper">
             {serviceData.length > 0 && (
              <FormGroup controlId="formBasicservice" className="suggest-time-slot-wrapper">
                  <Label>{t('suggestTimeSlots')}</Label>
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
            <div className="sit-req-form-btn-wrapper">
              {/* <Button variant="secondary" onClick={handleCloseModal}>Close</Button> */}
              {acceptData?.isReadyForApproval == true && acceptData?.slotListOutData.length == 0 ?
                <>
                <p className="approve-note">{t('noSuggestedSlotsAvailable')}</p>
                </>
                :
                <Button
                  type="submit"
                  disabled={loading} // Disable the button if loading is true
                  className="approve-btn"
                >
                  {t('yesApprove')}
                </Button>
              }
            </div>
          </Form>
          </SitBackModalBodyWrapper>
        </Modal.Body>

      </CustomModal>
      <CustomModal
        show={showDeclineModal}
        onHide={() => handleCloseDeclineModal()}
        aria-labelledby="delete-confirmation-modal"
        centered
        className="sitback-modal-wrapper sitback-edit-service-modal-wrapper sitback-modalv2-wrapper sitback-approve-req-modal-wrapper"
      >
        <Modal.Header closeButton className="red-close-icon">
          <Modal.Title>
            {t('declineRequest')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SitBackModalBodyWrapper>
            <div className="sit-req-table-div">
              <Table responsive>
                <thead>
                  <tr>
                    <th>{t('cName')}</th>
                    <th>{t('phoneText')}</th>
                    <th>{t('date')}</th>
                    <th>{t('slotText')}</th>
                    <th>{t('massageTypeText')}</th>
                    <th>Preference</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>{selectedAppointment?.username}</td>
                      <td>{formatPhoneNumber(selectedAppointment?.phone)}</td>
                      <td>{moment(selectedAppointment?.date).format('DD MMMM YYYY')}</td>
                      <td>{selectedAppointment?.slot_title}</td>
                      <td>{selectedAppointment?.servicename}</td>
                      <td>{selectedAppointment?.name}</td>
                    </tr>
                </tbody>
              </Table>
            </div>
            <div>
              <FormGroup className="msg-textarea-wrapper">
                <Label>{t('includeMessageToTheClient')}</Label>
                  <Input
                    as="textarea"
                    rows={5}
                    {...register("message")}
                    name="message"
                    placeholder="Write here..."
                  />
                </FormGroup>
                <p className="text-danger">{errors?.message?.message}</p>
                <div className="sit-req-cancel-btn-wrapper">
                <Button variant="primary" className="decline-btn" onClick={() => handleFinalDecline(selectedAppointment)} disabled={loading}>{t('declineNow')}</Button>
                  <Button variant="secondary" className="decline-btn cancel-btn" onClick={handleCloseDeclineModal}>{t('cancel')}</Button>

                </div>
              </div>
            </SitBackModalBodyWrapper>

        </Modal.Body>
      </CustomModal>

      <CustomModal
        show={showConfirmModal}
        onHide={() => handleConfirmModal()}
        aria-labelledby="delete-confirmation-modal"
        centered
        className="sitback-modal-wrapper sitback-edit-service-modal-wrapper sitback-modalv2-wrapper sitback-approve-req-modal-wrapper"
      >
        <Modal.Header closeButton className="red-close-icon">
          <Modal.Title>
            {t('slotConfirmation')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SitBackModalBodyWrapper>
            <p className="sit-date-data-wrapper">{t('date')}: <span>{moment(confirmData?.new_date).format('DD MMM YYYY')}</span></p>
            {confirmShowMsg ? <p className="sit-slot-confirmation-text"><b>Note: The slot below has already been selected by the user from the mobile app.</b></p> : '' }
          <Form onSubmit={handleSubmit(onSubmitForms)} className="sit-req-form-wrapper sit-approve-slot-display-div">
              <div className="slot-selection">
                  {confirmData && confirmData?.bookedTimeSlot.map((slot, index) => (
                    <div key={index} className="slot-option">
                    <Form.Check
                      type="radio"
                      id={`slot-${index}`}
                      name="timeSlot"
                      value={slot}
                      label={slot}
                      checked={selectedSlot === slot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      custom
                    />
                  </div>
                  ))}
              </div>
              <div className="approve-btn-modal-wrapper">
                <Button type="submit" className="submit-btn" disabled={confirmLoading} >{t('confirmText')}</Button>
              </div>
          </Form>
            </SitBackModalBodyWrapper>

        </Modal.Body>
      </CustomModal>

      <SuggestRequestModal
        show={showSuggestModal}
        handleClose={() => handleCloseSuggestModal()}
        data = {selectedAppointment}
        setItems ={setItems}
      />
    </>
  );
};
