"use client";

import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import InlineSVG from "svg-inline-react";
import CustomCalender from "@/components/appoiments/CalenderCustom";
import { FailedPayment } from "@/components/appoiments/FailedPayment";
import CheckInModal from "@/components/appoiments/modal/checkinConfirmationModa";
import Confirmation from "@/components/appoiments/modal/confirmation";
import NoteList from "@/components/appoiments/modal/listNotes";
import NoShowModal from "@/components/appoiments/modal/noShowServiceModal";
import PaymentError from "@/components/appoiments/modal/paymentError";
import PaymentOption from "@/components/appoiments/modal/paymentOption";
import PaymentReminder from "@/components/appoiments/modal/paymentReminder";
import ProductListModal from "@/components/appoiments/modal/productList";
import StartServiceModal from "@/components/appoiments/modal/starServiceModal";
import LoadingButton from "@/components/shared/button/LoadingButton";
import { useToaster } from "@/hooks";
import {
    appointmentCheckSliceSelector,
    handlePaymentFailedModal,
    handleReminderData,
    handleUpcomingData,
} from "@/redux/appointment";
import { authCheckSliceSelector, loginDetail, manageSpaCard } from "@/redux/authCheck";
import {
    handleBookingData,
    handleCalender,
    handleTarget,
    handleTargetProcess,
    messageCheckSliceSelector,
} from "@/redux/messageTab";
import { PATH_AUTH, PATH_DASHBOARD } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, Image, MainLayoutWrapper } from "@/styles/global/main.style";
import { AppointmentsLayoutWrapper, QuickChatBoxWrapper } from "@/styles/pages/appointments.style";
import { Info_icon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES, userDummyImage } from "@/utils/constants";
import { removeCookie } from "@/utils/cookie";

export default function appointments_page() {
    //hooks
    const { toaster } = useToaster();
    const { push } = useRouter();
    const dispatch = useDispatch();
    const { login } = useSelector(authCheckSliceSelector);
    const { t } = useTranslation();
    const { appointmentTarget, targetProcess, calenderRefresh } =
        useSelector(messageCheckSliceSelector);
    const { failedModal, failedModalData, reminderDetails, upcomingDetails } = useSelector(
        appointmentCheckSliceSelector
    );

    //states

    const [totalCount, setTotalCount] = useState(null);
    const [reminderData, setReminderData] = useState([]);
    const [upcomingList, setUpcomingList] = useState(upcomingDetails);
    const [currentPage, setCurrentPage] = useState(1);
    const [isNextPage, setIsNextPage] = useState(false);
    const today = moment().format("YYYY-MM-DD");
    const [unavaliableList, setUnavaliableList] = useState([]);
    const [guestIds, setGuestIds] = useState(null);
    const [mainUserId, setMainUserId] = useState(null);
    const [updatebookingcalender, setupdatebookinU] = useState(false);
    const [completeLoader, setCompleteLoader] = useState(false);
    // const [loading, setLoading] = useState(false);
    const [loadingBookingId, setLoadingBookingId] = useState(null);
    const [confirmationModal, setOpenConfirmationModal] = useState(false);
    const [showcheckInModal, setShowCheckInModal] = useState(false);
    const [checkInTarget, setCheckInTarget] = useState(false);

    //Start Service
    const [showStartServiceModal, setStartServiceModal] = useState(false);
    const [StartServiceTarget, setStartServiceTarget] = useState(null);
    const [noteTarget, setNoteTarget] = useState(null);

    const [selectedId, setSelectedId] = useState(0);

    const [productListInTarget, setProductListTarget] = useState(false);
    const [showProductListModal, setProductListModal] = useState(false);

    //No Show
    const [showNoShowModal, setShowNoShowModal] = useState(false);
    const [NoShowTarget, setNoShowTarget] = useState(null);

    const [openPaymentReminder, setOpenPaymentReminder] = useState(false);
    const [openPaymentOption, setOpenPaymentOption] = useState(false);

    //Employee
    const [providerData, setProviderData] = useState([]);
    const loadingEnabled = useRef(null);
    // const [paymentEnabledId, setPaymentEnabledId] = useState(null);

    const [selectedData, setSelectedData] = useState([]);
    const [getPaymentLoader, setGetPaymentLoader] = useState(false);
    const [showNoteModal, setShowNoteModal] = useState(false);

    //api's
    const getUpcomingList = async () => {
        const params = {
            date: moment().format("YYYY-MM-DD"),
            page: currentPage,
            employee_id: selectedId,
        };

        try {
            // setLoading(true);
            const res = await axiosApiCall.post(API_ROUTER?.GET_UPCOMING_APPOINTMENT_LIST, params);
            if (!res?.status) {
                return toaster(res?.message, TOAST_TYPES.ERROR);
            } else {
                const newdata = res?.data?.data;
                let finalUpdatedList = [];
                if (currentPage > 1) {
                    const updatedList = upcomingList.map((item) => {
                        const matchingNewData = newdata.find((newItem) => newItem.id === item.id);
                        return matchingNewData ? { ...item, ...matchingNewData } : item;
                    });
                    const newItems = newdata.filter(
                        (newItem) => !upcomingList.some((item) => item.id === newItem.id)
                    );
                    finalUpdatedList = [...updatedList, ...newItems];
                }
                const formatrecords = currentPage === 1 ? newdata : finalUpdatedList;
                dispatch(handleBookingData(formatrecords));
                if (currentPage === 1) {
                    dispatch(handleUpcomingData(formatrecords));
                } else {
                    dispatch(handleUpcomingData(formatrecords));
                }
                setUpcomingList(formatrecords);
                setIsNextPage(res?.data?.isNextPage);
                // setUpcomingList(res?.data?.data);
                // toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
            }
        } catch (error) {
            toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
        } finally {
            dispatch(handleCalender(false));
            // setLoading(false);
        }
    };

    const getType = (mainId, guestId) => {
        if (mainId != null && guestId != null) {
            return "only_guest";
        } else if (guestId == null && mainId != null) {
            return "only_main_user";
        } else {
            return "only_main_user";
        }
    };

    const updateBooking = async (mainId, guestId = null) => {
        const type = getType(mainId, guestId);
        if (!type || !mainId) {
            return;
        }

        try {
            setCompleteLoader(true);
            if (guestId) {
                setLoadingBookingId(guestId);
            } else {
                setLoadingBookingId(mainId);
            }
            // Set the loading booking ID
            const params = {
                id: mainId,
                type: type,
                guest_id: guestId ? guestId : 0,
            };
            const res = await axiosApiCall({
                method: "post",
                url: API_ROUTER?.UPDATE_COMPLETE_BOOKING_STATUS,
                baseURL: process.env.API_URL_V3,
                data: params,
            });

            if (!res?.status) {
                return toaster(res?.message, TOAST_TYPES.ERROR);
            } else {
                let updatedList = [];
                //updatedList = JSON.parse(JSON.stringify(updatedList));
                if (mainId && guestId == null) {
                    updatedList = upcomingList.filter((record) => record.id == mainId);
                    updatedList = JSON.parse(JSON.stringify(updatedList));
                    updatedList[0].userTotalAmount = res?.data?.data?.userTotalAmount;
                    updatedList[0].spaTotalAmount = res?.data?.data?.spaTotalAmount;
                } else {
                    upcomingList.forEach((record) =>
                        record?.guestList?.forEach((element) => {
                            // if (element.id == guestId) {
                            //   element.btype = "guest";
                            //   updatedList.push(element);
                            //   return element;
                            // }
                            if (element?.id == guestId) {
                                let updatedElement = { ...element, btype: "guest" };
                                updatedList.push(updatedElement);
                            }
                        })
                    );
                }
                dispatch(handleTargetProcess("completedd"));
                dispatch(handleTarget(updatedList[0]));
                setupdatebookinU(true);
                toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
            }
        } catch (error) {
            console.log("catch ", error);
            // toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
        } finally {
            setCompleteLoader(false);
            setLoadingBookingId(null); // Reset the loading booking ID
        }
    };

    const getEmployee = async () => {
        try {
            const res = await axiosApiCall.post(API_ROUTER?.EMPLOYEE_LIST);
            if (!res?.status) {
                return toaster(res?.message, TOAST_TYPES.ERROR);
            } else {
                // dispatch(myServiceList(res?.data?.data));
                setProviderData(res?.data?.data);
                setupdatebookinU(true);
            }
        } catch (error) {
            toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
        }
    };

    const getProfileInfo = async () => {
        try {
            const res = await axiosApiCall.get(API_ROUTER?.GET_DETAILS);
            if (!res?.status) {
                return res;
            } else {
                dispatch(loginDetail(res?.data?.data));
                dispatch(manageSpaCard(res?.data?.getSpaCard || null));
                if (res?.data?.data.isBlocked) {
                    push(PATH_DASHBOARD?.serviceProvider);
                }
                if (res?.data?.data?.isSubscribe == 3) {
                    if (res?.data?.data.planData?.status == "canceled") {
                        leave_room();
                    }
                }
            }
        } catch (error) {
            toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
        }
    };

    const leave_room = async () => {
        try {
            const res = await axiosApiCall.get(API_ROUTER?.USER_LEAVE_ROOM);
            if (!res?.status) {
                return res;
            } else {
                try {
                    const res = await axiosApiCall.post(API_ROUTER?.LOGOUT, { id: login?.id });
                    if (!res?.status) {
                        return toaster(res?.message, TOAST_TYPES.ERROR);
                    } else {
                        removeCookie("token");
                        localStorage.clear();
                        push(PATH_AUTH?.signIn);
                        window.location.reload();
                        return res;
                    }
                } catch (error) {
                    toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
                }
            }
        } catch (error) {
            return error;
        }
    };

    const getUnavailableList = async (date) => {
        const params = {
            employee_id: selectedId,
            date: date,
        };
        try {
            const res = await axiosApiCall.post(API_ROUTER?.GET_UNAVAILABLE_DATA, params);
            if (!res?.status) {
                return res;
            } else {
                setUnavaliableList(res?.data?.slotListOut);
                setupdatebookinU(true);
            }
        } catch (error) {
            toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
        }
    };

    const handlePaymentOption = (data) => {
        loadingEnabled.current = data;
        setSelectedData(data);
        setOpenPaymentOption(true);
    };

    useEffect(() => {
        getEmployee();
        getProfileInfo();
        dispatch(handlePaymentFailedModal(false));
    }, []);

    useEffect(() => {
        getUpcomingList();
    }, [calenderRefresh]);

    useEffect(() => {
        getUpcomingList();
    }, [currentPage, selectedId]);

    useEffect(() => {
        setGuestIds(null);
        setMainUserId(null);
        handleTargetData();
    }, [appointmentTarget]);

    let allDataArray = [];
    useEffect(() => {
        if (window.io) {
            //cancelledAllBookingBySpa  , completeAllBooking
            window.io.socket.on("serviceprovider", async (msg) => {
                console.log("msg>>>>>", msg);
                if (
                    msg.action == "auto_no_show_user_booking_alert" ||
                    msg.action == "auto_start_service_user_booking_alert" ||
                    msg.action == "cancelBookingUser" ||
                    msg.action == "cancelledAllBookingBySpa" ||
                    msg.action == "cancelBookingSpa" ||
                    msg.action == "booking_time_started" ||
                    msg.action == "auto_complete_socket_solo_booking" ||
                    // msg.action == "auto_complete_socket_multiple_booking" ||
                    msg.action == "completeAllBooking"
                    // ||
                    //  msg.action == "auto_complete_socket_guest_booking"
                ) {
                    let updatedList = [];
                    if (msg?.starttype === "only_main_user") {
                        updatedList = upcomingList?.filter((record) => record.id == msg.bookingid);
                        updatedList = JSON.parse(JSON.stringify(updatedList));
                        if (msg?.totalSpaCountAmount && updatedList.length > 0) {
                            updatedList[0].spaTotalAmount = msg?.totalSpaCountAmount;
                            updatedList[0].userTotalAmount = msg?.totalCountAmount;
                        }

                        if (msg?.totalCountAmount && updatedList.length > 0) {
                            updatedList[0].spaTotalAmount = msg?.totalSpaCountAmount;
                            updatedList[0].userTotalAmount = msg?.totalCountAmount;
                        }
                    } else if (msg?.starttype === "only_main_user_solo") {
                        updatedList = upcomingList?.filter((record) => record.id == msg.bookingid);
                    } else if (msg?.starttype === "only_guest") {
                        upcomingList?.forEach((record) =>
                            record?.guestList?.forEach((element) => {
                                if (element?.id == msg?.guestids) {
                                    let updatedElement = { ...element, btype: "guest" };
                                    updatedList.push(updatedElement);
                                }
                            })
                        );
                    }
                    if (msg.action == "auto_start_service_user_booking_alert") {
                        dispatch(handleTargetProcess("start"));
                    } else if (msg.action == "auto_no_show_user_booking_alert") {
                        if (msg?.starttype === "only_main_user_solo") {
                            dispatch(handleTargetProcess("removeBooking"));
                        } else {
                            dispatch(handleTargetProcess("noshow"));
                        }
                    } else if (msg.action == "cancelBookingUser") {
                        // dispatch(handleTargetProcess("cancel"));
                        dispatch(handleTargetProcess("userCancel"));
                    } else if (msg.action == "auto_complete_socket_solo_booking") {
                        dispatch(handleTargetProcess("allcomplete"));
                    } else if (msg.action == "completeAllBooking") {
                        dispatch(handleTargetProcess("allcompleteguest"));
                    } else if (msg.action == "cancelledAllBookingBySpa") {
                        dispatch(handleTargetProcess("removeBooking"));
                    } else if (msg.action == "booking_time_started") {
                        dispatch(handleTargetProcess("noShowEnable"));
                    } else if (msg.action == "cancelBookingSpa") {
                        if (msg.guestFlag) {
                            dispatch(handleTargetProcess("spaCancel"));
                        } else {
                            dispatch(handleTargetProcess("removeBooking"));
                        }
                    }
                    dispatch(handleTarget(updatedList[0]));
                    getEmployee();
                } else if (msg.action == "new_booking_from_user" || msg.action == "new_booking_from_spa") {
                    //|| msg.action == "new_booking_from_spa"
                    if (currentPage == 1) {
                        getUpcomingList();
                    } else {
                        setCurrentPage(1);
                    }
                    getEmployee();
                }

                if (msg.action == "fiveminReminder") {
                    //reminderData
                    if (msg?.spa_id == login.id) {
                        setTotalCount(msg.totalCount);

                        allDataArray = [...allDataArray, msg];
                        setReminderData(allDataArray);
                        dispatch(
                            handleReminderData({
                                data: JSON.parse(JSON.stringify(allDataArray)),
                                openModal: true,
                                total: msg.totalCount,
                            })
                        );
                        setTimeout(() => {
                            allDataArray = [];
                        }, 7000);

                        //allDataArray = [];
                        if (reminderData) {
                            //
                        }

                        setOpenPaymentReminder(true);
                    }
                }
            });
        }
    }, [window.io, upcomingList]);

    const handleTargetData = () => {
        let status = {
            bookingstatus: 0,
            isChargeCaptured: 1,
            isAfterCompleteDoneSocket: 0,
            isPaymentDone: 0,
            cancel_by_type: null,
            cancel_by: 0,
            checkinstatus: 0,
            isTimeStarted: 0,
            isFiveHourSocketDone: 0,
            isStartServiceSocketDone: 0,
            isLastSocketDone: 0,
        };
        if (targetProcess == "start") {
            status.bookingstatus = 0;
            status.isFiveHourSocketDone = 1;
        } else if (targetProcess == "startservice") {
            status.bookingstatus = 4;
            status.checkinstatus = 1;
        } else if (targetProcess == "noshow") {
            status.isPaymentDone = 1;
            status.bookingstatus = 2;
        } else if (targetProcess == "completedd") {
            status.isPaymentDone = 1;
            status.bookingstatus = 3;
        } else if (targetProcess == "allcomplete") {
            status.isAfterCompleteDoneSocket = 1;
        } else if (targetProcess == "allcompleteguest") {
            status.isLastSocketDone = 1;
        } else if (targetProcess == "userCancel") {
            status.bookingstatus = 1;
            status.isPaymentDone = 1;
            status.cancel_by = 1;
            status.cancel_by_type = "user";
        } else if (targetProcess == "spaCancel") {
            status.bookingstatus = 1;
            status.isPaymentDone = 1;
            status.cancel_by = 1;
            status.cancel_by_type = "serviceProvider";
        } else if (targetProcess == "noShowEnable") {
            status.isTimeStarted = 1;
            status.isStartServiceSocketDone = 1;
        }

        let list = JSON.parse(JSON.stringify(upcomingList));
        //dispatch(handleUpcomingData(list));
        if (targetProcess == "removeBooking") {
            list = list.filter((x) => x?.id !== appointmentTarget?.id);
            dispatch(handleUpcomingData(list));
        } else {
            list.some((x) => {
                if (x?.id == appointmentTarget?.id) {
                    if (targetProcess == "allcomplete") {
                        x.isAfterCompleteDoneSocket = status.isAfterCompleteDoneSocket;
                        x.spaTotalAmount = appointmentTarget?.spaTotalAmount;
                        x.userTotalAmount = appointmentTarget?.userTotalAmount;
                    } else if (targetProcess == "spaCancel" || targetProcess == "userCancel") {
                        x.cancel_by_type = status.cancel_by_type;
                        x.bookingstatus = status.bookingstatus;
                        x.cancel_by = status.cancel_by;
                        x.spaTotalAmount = appointmentTarget?.spaTotalAmount;
                        x.userTotalAmount = appointmentTarget?.userTotalAmount;
                    } else if (targetProcess == "completedd") {
                        x.bookingstatus = status.bookingstatus;
                        x.spaTotalAmount = appointmentTarget?.spaTotalAmount;
                        x.userTotalAmount = appointmentTarget?.userTotalAmount;
                    } else if (targetProcess == "startservice") {
                        x.checkinstatus = status?.checkinstatus;
                        x.bookingstatus = status?.bookingstatus;
                    } else if (targetProcess == "noShowEnable") {
                        x.isTimeStarted = status?.isTimeStarted;
                        x.isStartServiceSocketDone = status?.isStartServiceSocketDone;
                    } else if (targetProcess == "start") {
                        x.bookingstatus = status?.bookingstatus;
                        x.isFiveHourSocketDone = status?.isFiveHourSocketDone;
                    } else if (targetProcess == "allcompleteguest") {
                        x.isLastSocketDone = status?.isLastSocketDone;
                        x.spaTotalAmount = appointmentTarget?.spaTotalAmount;
                        x.userTotalAmount = appointmentTarget?.userTotalAmount;
                    } else {
                        x.bookingstatus = status.bookingstatus;
                    }
                } else if (appointmentTarget?.btype == "guest") {
                    x?.guestList?.forEach((element, index) => {
                        if (element?.id == appointmentTarget?.id) {
                            // x.guestList[index].bookingstatus = status.bookingstatus;
                            if (targetProcess == "spaCancel" || targetProcess == "userCancel") {
                                x.guestList[index].bookingstatus = status?.bookingstatus;
                                x.guestList[index].cancel_by_type = status.cancel_by_type;
                                x.guestList[index].cancel_by = status.cancel_by;
                            } else if (targetProcess == "startservice") {
                                x.guestList[index].bookingstatus = status?.bookingstatus;
                                x.guestList[index].checkinstatus = status?.checkinstatus;
                            } else if (targetProcess == "noShowEnable") {
                                x.guestList[index].isTimeStarted = status?.isTimeStarted;
                                x.guestList[index].isStartServiceSocketDone = status?.isStartServiceSocketDone;
                            } else if (targetProcess == "allcomplete") {
                                x.guestList[index].isAfterCompleteDoneSocket = status?.isAfterCompleteDoneSocket;
                            } else if (targetProcess == "start") {
                                x.guestList[index].bookingstatus = status.bookingstatus;
                                x.guestList[index].isFiveHourSocketDone = status.isFiveHourSocketDone;
                            } else {
                                x.guestList[index].bookingstatus = status.bookingstatus;
                            }
                        }
                    });
                }

                // return true;
            });
            dispatch(handleUpcomingData(list));
        }
        //dispatch(handleUpcomingData(list));
        setUpcomingList(list);
    };

    const handleShowServiceModal = (target) => {
        setStartServiceTarget(target);
        setStartServiceModal(true);
    };

    const handleCloseServiceModal = () => {
        setStartServiceModal(false);
        setShowNoShowModal(false);
    };

    const handleShowNotShowModal = (target) => {
        setNoShowTarget(target);
        setShowNoShowModal(true);
    };

    const handleViewMore = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    function isNoShowActive(startTime, type) {
        const bookingTime = new Date();
        const hours = parseInt(startTime.split(":")[0]);
        const minutes = parseInt(startTime.split(":")[1]);
        bookingTime.setHours(hours, minutes, 0, 0);

        const currentTime = new Date();

        if (type.toLowerCase() === "pm" && hours !== 12) {
            bookingTime.setHours(hours + 12);
        }

        return bookingTime < currentTime;
    }

    function isPastBookingTime(date, startTime, type) {
        const [hours, minutes] = startTime.split(":").map(Number);
        const bookingTime = new Date(date);
        bookingTime.setHours(hours, minutes, 0, 0);
        if (type?.toLowerCase() === "pm" && hours !== 12) {
            bookingTime?.setHours(hours + 12); // PM but not 12 PM
        } else if (type?.toLowerCase() === "am" && hours === 12) {
            bookingTime?.setHours(0); // Special case for 12 AM (midnight)
        }
        bookingTime?.setHours(bookingTime?.getHours() - 5);
        const currentTime = new Date();
        return currentTime >= bookingTime;
    }

    function calculateEndTime(startTime, hour, minutes, timeType) {
        const startDate = new Date();
        const startHours = parseInt(startTime?.split(":")[0]);
        const startMinutes = parseInt(startTime?.split(":")[1]);
        startDate.setHours(startHours, startMinutes, 0, 0);

        // Adjust for time period (AM/PM)
        if (timeType?.toLowerCase() === "pm" && startHours !== 12) {
            startDate.setHours(startHours + 12);
        } else if (timeType?.toLowerCase() === "am" && startHours === 12) {
            startDate.setHours(startHours - 12);
        }

        // Add the specified duration
        startDate?.setMinutes(startDate?.getMinutes() + minutes);
        startDate?.setHours(startDate?.getHours() + hour);

        // Format the end time as "hh:mm:ss AM/PM"
        const formattedTime = startDate
            .toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            })
            .replace(/ ([AP]M)$/, (match) => match.toLowerCase()); // R

        return formattedTime;
    }

    const handleAppointmentType = (type) => {
        if (type == "bookingbyschedular") {
            return "Scheduler";
        }
        if (type == "bookingbyuser") {
            return "Mobile App";
        }
        if (type == "bookingbyspa") {
            return "WalkIn";
        }
    };

    const handleShowNoteModal = (target) => {
        setNoteTarget(target);
        setShowNoteModal(true);
    };
    const handleShowCheckInModal = (target) => {
        setCheckInTarget(target);
        setShowCheckInModal(true);
    };

    const handleShowProductListModal = (target) => {
        setProductListTarget(target);
        setProductListModal(true);
    };

    console.log("upcomingList", upcomingList);

    return (
        <>
            <MainLayoutWrapper>
                <AppointmentsLayoutWrapper className="sitback-appointment-updated-display-div">
                    <Container>
                        <Row>
                            <Col md={12} lg={4}>
                                <div className="upcoming-schedules-failed-payment">
                                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                        <Nav variant="pills">
                                            <Nav.Item>
                                                <Nav.Link eventKey="first">Upcoming Schedules</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="second">Failed Payment</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="first">
                                                <div className="box-wrapper-div box-wrapper-padding upcoming-schedulesviewmore">
                                                    {upcomingList && upcomingList.length > 0 ? (
                                                        upcomingList?.map((data, key) => {
                                                            const isToday = data?.date === today;
                                                            const mainId = data?.maxTimeData?.main_id;
                                                            const isPastDay = moment(data?.date).isBefore(moment(), "day");
                                                            const guestListFiltered = data?.guestList?.filter(
                                                                (guest) => guest.id === mainId
                                                            );
                                                            return (
                                                                <QuickChatBoxWrapper className="sitback-updated-quick-box-wrapper"
                                                                    key={key}
                                                                    style={{ backgroundColor: isPastDay ? "#e4e1e1" : "" }}
                                                                >
                                                                    {data?.guestList && data?.guestList?.length > 0 ? (
                                                                        <>
                                                                            <div className="dateofquickcheat">
                                                                                <p>{moment(data?.date).format("dddd, MMM D, YYYY")}</p>
                                                                                <span className="status-text-btn">
                                                                                    {handleAppointmentType(data?.bookingtype)}
                                                                                </span>
                                                                            </div>
                                                                            <div className="schedules-time-detail">
                                                                                <div className="services-completed-block border-wrapper">
                                                                                    {data?.username?.length > 20 ? (
                                                                                        <p className="quickusername">
                                                                                            {data?.username.substring(0, 17)}...
                                                                                        </p>
                                                                                    ) : (
                                                                                        <p className="quickusername">{data?.username}</p>
                                                                                    )}

                                                                                    <div className="schedules-text">
                                                                                        <h6>{t("serviceType")}</h6>
                                                                                        <ul>
                                                                                            <li>{data?.servicename}</li>
                                                                                        </ul>
                                                                                    </div>

                                                                                    <div className="schedules-text">
                                                                                        <ul>
                                                                                            <li>({data?.hour * 60 + data?.minutes} min)</li>
                                                                                        </ul>
                                                                                    </div>
                                                                                    <div className="services-completed-block">
                                                                                        <div className="schedules-text">
                                                                                            <h6>{t("employee")}</h6>
                                                                                            <ul>
                                                                                                <li>{data?.employeename}</li>
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div className="schedules-text">
                                                                                            <h6>{t("time")}</h6>
                                                                                            <ul>
                                                                                                <li>
                                                                                                    {data?.slot_time?.split(":")[0]}:
                                                                                                    {data?.slot_time?.split(":")[1]} {data?.time_type}{" "}
                                                                                                    -{" "}
                                                                                                    {calculateEndTime(
                                                                                                        data?.slot_time,
                                                                                                        data?.hour,
                                                                                                        data?.minutes,
                                                                                                        data?.time_type,
                                                                                                        data?.date
                                                                                                    )}
                                                                                                </li>
                                                                                            </ul>
                                                                                        </div>

                                                                                        <div className="services-completed-block">
                                                                                            <div className="schedules-text">
                                                                                                {data?.notes ? <></> : <h6>Special request</h6>}
                                                                                                <ul>
                                                                                                    <li>
                                                                                                        {data?.notes ? (
                                                                                                            <div className="special-request-btn">
                                                                                                                <p
                                                                                                                    onClick={() => handleShowNoteModal(data)}
                                                                                                                >
                                                                                                                    <InlineSVG
                                                                                                                        src={Info_icon}
                                                                                                                        className="global_laguage_icon"
                                                                                                                    />
                                                                                                                    Special request
                                                                                                                </p>
                                                                                                            </div>
                                                                                                        ) : (
                                                                                                            <p>None</p>
                                                                                                        )}
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>
                                                                                            <div className="schedules-text">
                                                                                                {data?.bookingstatus == 0 &&
                                                                                                    data?.isTimeStarted == 0 ? (
                                                                                                    <>
                                                                                                        <Button
                                                                                                            style={{ backgroundColor: "red" }}
                                                                                                            className="noshow-btn"
                                                                                                            onClick={() => {
                                                                                                                setMainUserId(data?.id);
                                                                                                                handleShowNotShowModal(data);
                                                                                                            }}
                                                                                                            disabled={
                                                                                                                data?.isTimeStarted == 0 &&
                                                                                                                    data?.isStartServiceSocketDone == 0
                                                                                                                    ? true
                                                                                                                    : false
                                                                                                                // !isToday ||
                                                                                                                // !isNoShowActive(
                                                                                                                //   data?.slot_time,
                                                                                                                //   data?.time_type
                                                                                                                // )
                                                                                                            }
                                                                                                        >
                                                                                                            {t("noShow")}
                                                                                                        </Button>
                                                                                                    </>
                                                                                                ) : data?.bookingstatus == 0 &&
                                                                                                    data?.isTimeStarted == 1 &&
                                                                                                    data?.isStartServiceSocketDone == 1 ? (
                                                                                                    <>
                                                                                                        <Button
                                                                                                            className="noshow-btn"
                                                                                                            style={{ backgroundColor: "red" }}
                                                                                                            onClick={() => {
                                                                                                                setMainUserId(data?.id);
                                                                                                                handleShowNotShowModal(data);
                                                                                                            }}
                                                                                                        >
                                                                                                            {t("noShow")}
                                                                                                        </Button>
                                                                                                    </>
                                                                                                ) : (
                                                                                                    <>
                                                                                                        {/* <Button
                                                      // variant="secondary"

                                                      className="noshow-btn"
                                                      disabled
                                                    >
                                                      {t("noShow")}
                                                    </Button> */}
                                                                                                    </>
                                                                                                )}
                                                                                                {/* {data?.bookingstatus == 0 &&
                                                data?.isTimeStarted == 0 ? (
                                                  <>
                                                    <Button
                                                      className="noshow-btn"
                                                      onClick={() => {
                                                        setMainUserId(data?.id);
                                                        handleShowNotShowModal(data);
                                                      }}
                                                      disabled={
                                                        !isToday ||
                                                        !isNoShowActive(
                                                          data?.slot_time,
                                                          data?.time_type
                                                        )
                                                      }
                                                    >
                                                      {t("noShow")}
                                                    </Button>
                                                  </>
                                                ) : (
                                                  <></>
                                                )}
                                                {data?.bookingstatus == 0 &&
                                                data?.isTimeStarted == 1 &&
                                                data?.isStartServiceSocketDone == 1 ? (
                                                  <>
                                                    <Button
                                                      className="noshow-btn"
                                                      onClick={() => {
                                                        setMainUserId(data?.id);
                                                        handleShowNotShowModal(data);
                                                      }}
                                                    >
                                                      {t("noShow")}
                                                    </Button>
                                                  </>
                                                ) : (
                                                  <></>
                                                )}
                                                {data?.bookingstatus == 4 &&
                                                data?.checkinstatus == 0 ? (
                                                  <>
                                                    <Button
                                                      // variant="secondary"
                                                      style={{ backgroundColor: "red" }}
                                                      className="noshow-btn"
                                                      disabled
                                                    >
                                                      {t("noShow")}
                                                    </Button>
                                                  </>
                                                ) : (
                                                  <></>
                                                )}
                                                {data?.bookingstatus == 4 &&
                                                data?.checkinstatus == 1 ? (
                                                  <>
                                                    <Button className="noshow-btn" disabled>
                                                      {t("noShow")}
                                                    </Button>
                                                  </>
                                                ) : (
                                                  <></>
                                                )} */}
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="startservice-btns-noshow"></div>
                                                                                        {data?.cancel_by && (
                                                                                            <div className="cancelled-block">
                                                                                                <h6>
                                                                                                    {data ? (
                                                                                                        data?.cancel_by_type === "serviceProvider" ? (
                                                                                                            <h6>Cancelled by Spa</h6>
                                                                                                        ) : data?.cancel_by_type === "user" ? (
                                                                                                            <h6>Cancelled by User</h6>
                                                                                                        ) : (
                                                                                                            <></>
                                                                                                        )
                                                                                                    ) : null}
                                                                                                </h6>
                                                                                            </div>
                                                                                        )}
                                                                                    </div>

                                                                                    <div className="complete-payment-box">
                                                                                        {data?.checkinstatus == 0 &&
                                                                                            data?.bookingstatus == 0 ? (
                                                                                            <>
                                                                                                <Button
                                                                                                    className="btn-primary secondary-btn sitback-updated-checkin-btn"
                                                                                                    onClick={() => {
                                                                                                        setMainUserId(data?.id);
                                                                                                        handleShowCheckInModal(data);
                                                                                                    }}
                                                                                                    disabled={
                                                                                                        data?.isFiveHourSocketDone == 0 ? true : false
                                                                                                        // ||
                                                                                                        // !isPastBookingTime(
                                                                                                        //   data?.date,
                                                                                                        //   data?.slot_time,
                                                                                                        //   data?.time_type
                                                                                                        // )
                                                                                                    }
                                                                                                >
                                                                                                    CHECK IN
                                                                                                </Button>
                                                                                            </>
                                                                                        ) : (
                                                                                            <></>
                                                                                        )}
                                                                                        {data?.bookingstatus == 3 ||
                                                                                            data?.bookingstatus == 4 ? (
                                                                                            <>
                                                                                                {data?.isLastSocketDone == 0 ? (
                                                                                                    data?.checkinstatus == 1 ? (
                                                                                                        <>
                                                                                                            <p
                                                                                                                onClick={() =>
                                                                                                                    handleShowProductListModal(data)
                                                                                                                }
                                                                                                            >
                                                                                                                <span>
                                                                                                                    Add Upgrades or Products to cart
                                                                                                                </span>{" "}
                                                                                                                (
                                                                                                                {data?.tempItemCount
                                                                                                                    ? data?.tempItemCount
                                                                                                                    : 0}
                                                                                                                )
                                                                                                            </p>
                                                                                                        </>
                                                                                                    ) : (
                                                                                                        <></>
                                                                                                    )
                                                                                                ) : (
                                                                                                    <></>
                                                                                                )}
                                                                                            </>
                                                                                        ) : (
                                                                                            <></>
                                                                                        )}
                                                                                        {/* {data?.bookingstatus !== 2 ||
                                            (data?.bookingstatus !== 1 &&
                                              data?.isAfterCompleteDoneSocket == 0) ? (
                                              data?.checkinstatus == 1 ? (
                                                <>
                                                  <p
                                                    onClick={() => handleShowProductListModal(data)}
                                                  >
                                                    <span>Add Upgrades or Products to cart</span> (
                                                    {data?.tempItemCount ? data?.tempItemCount : 0})
                                                  </p>
                                                </>
                                              ) : (
                                                <></>
                                              )
                                            ) : data?.isAfterCompleteDoneSocket == 1 &&
                                              data.maxTimeData.type == "guest" ? (
                                              <p onClick={() => handleShowProductListModal(data)}>
                                                <span>Add Upgrades or Products to cart</span> (
                                                {data?.tempItemCount ? data?.tempItemCount : 0})
                                              </p>
                                            ) : (
                                              <></>
                                            )} */}
                                                                                        {/* data.maxTimeData.type === "main_user" && data.id ===
                                            data.maxTimeData.main_id && */}
                                                                                        {data?.isLastSocketDone == 1 && (
                                                                                            <>
                                                                                                {data?.bookingstatus == 1 ? (
                                                                                                    <div className="complete-payment-box">
                                                                                                        {data?.userTotalAmount > 0 ? (
                                                                                                            <>
                                                                                                                <LoadingButton
                                                                                                                    className="green-btn-wrapper complete-get-payment-btn-wrapper"
                                                                                                                    id={data?.id}
                                                                                                                    disabled={
                                                                                                                        getPaymentLoader &&
                                                                                                                        loadingEnabled?.current?.id == data?.id
                                                                                                                    }
                                                                                                                    label="CANCELLED & GET PAYMENT"
                                                                                                                    loadinglabel="CANCELLED & GET PAYMENT"
                                                                                                                    isLoading={
                                                                                                                        getPaymentLoader &&
                                                                                                                        loadingEnabled?.current?.id == data?.id
                                                                                                                    }
                                                                                                                    // className="loading-btn-wrapper"
                                                                                                                    // onClick={() => CapturePayment(data)}
                                                                                                                    onClick={() => handlePaymentOption(data)}
                                                                                                                />
                                                                                                            </>
                                                                                                        ) : (
                                                                                                            ""
                                                                                                        )}
                                                                                                    </div>
                                                                                                ) : data?.bookingstatus == 2 ? (
                                                                                                    <div className="complete-payment-box">
                                                                                                        {data?.userTotalAmount > 0 ? (
                                                                                                            <>
                                                                                                                <LoadingButton
                                                                                                                    className="green-btn-wrapper complete-get-payment-btn-wrapper"
                                                                                                                    id={data?.id}
                                                                                                                    disabled={
                                                                                                                        getPaymentLoader &&
                                                                                                                        loadingEnabled?.current?.id == data?.id
                                                                                                                    }
                                                                                                                    label="COMPLETE & GET PAYMENT"
                                                                                                                    loadinglabel="COMPLETE & GET PAYMENT"
                                                                                                                    isLoading={
                                                                                                                        getPaymentLoader &&
                                                                                                                        loadingEnabled?.current?.id == data?.id
                                                                                                                    }
                                                                                                                    // className="loading-btn-wrapper"
                                                                                                                    // onClick={() => CapturePayment(data)}
                                                                                                                    onClick={() => handlePaymentOption(data)}
                                                                                                                />
                                                                                                            </>
                                                                                                        ) : (
                                                                                                            <></>
                                                                                                        )}
                                                                                                    </div>
                                                                                                ) : data?.bookingstatus == 3 ? (
                                                                                                    <div className="complete-payment-box">
                                                                                                        {data?.userTotalAmount > 0 ? (
                                                                                                            <>
                                                                                                                <LoadingButton
                                                                                                                    className="green-btn-wrapper complete-get-payment-btn-wrapper"
                                                                                                                    id={data?.id}
                                                                                                                    disabled={
                                                                                                                        getPaymentLoader &&
                                                                                                                        loadingEnabled?.current?.id == data?.id
                                                                                                                    }
                                                                                                                    label="COMPLETE & GET PAYMENT"
                                                                                                                    loadinglabel="COMPLETE & GET PAYMENT"
                                                                                                                    isLoading={
                                                                                                                        getPaymentLoader &&
                                                                                                                        loadingEnabled?.current?.id == data?.id
                                                                                                                    }
                                                                                                                    // className="loading-btn-wrapper"
                                                                                                                    // onClick={() => CapturePayment(data)}
                                                                                                                    onClick={() => handlePaymentOption(data)}
                                                                                                                />
                                                                                                            </>
                                                                                                        ) : (
                                                                                                            ""
                                                                                                        )}
                                                                                                        <p
                                                                                                            onClick={() =>
                                                                                                                handleShowProductListModal(data)
                                                                                                            }
                                                                                                        >
                                                                                                            {" "}
                                                                                                            <span>
                                                                                                                Add Upgrades or Products to cart
                                                                                                            </span>{" "}
                                                                                                            (
                                                                                                            {data?.tempItemCount
                                                                                                                ? data?.tempItemCount
                                                                                                                : 0}
                                                                                                            )
                                                                                                        </p>
                                                                                                    </div>
                                                                                                ) : data?.bookingstatus == 4 ? (
                                                                                                    <div className="complete-payment-box">
                                                                                                        {data?.userTotalAmount > 0 ? (
                                                                                                            <>
                                                                                                                <LoadingButton
                                                                                                                    className="green-btn-wrapper complete-get-payment-btn-wrapper"
                                                                                                                    id={data?.id}
                                                                                                                    disabled={
                                                                                                                        getPaymentLoader &&
                                                                                                                        loadingEnabled?.current?.id == data?.id
                                                                                                                    }
                                                                                                                    label="COMPLETE & GET PAYMENT"
                                                                                                                    loadinglabel="COMPLETE & GET PAYMENT"
                                                                                                                    isLoading={
                                                                                                                        getPaymentLoader &&
                                                                                                                        loadingEnabled?.current?.id == data?.id
                                                                                                                    }
                                                                                                                    // className="loading-btn-wrapper"
                                                                                                                    // onClick={() => CapturePayment(data)}
                                                                                                                    onClick={() => handlePaymentOption(data)}
                                                                                                                />
                                                                                                            </>
                                                                                                        ) : (
                                                                                                            ""
                                                                                                        )}
                                                                                                        <p
                                                                                                            onClick={() =>
                                                                                                                handleShowProductListModal(data)
                                                                                                            }
                                                                                                        >
                                                                                                            {" "}
                                                                                                            <span>
                                                                                                                Add Upgrades or Products to cart
                                                                                                            </span>{" "}
                                                                                                            (
                                                                                                            {data?.tempItemCount
                                                                                                                ? data?.tempItemCount
                                                                                                                : 0}
                                                                                                            )
                                                                                                        </p>
                                                                                                    </div>
                                                                                                ) : (
                                                                                                    <></>
                                                                                                )}
                                                                                            </>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                                {data?.guestList?.length > 0 &&
                                                                                    data?.guestList
                                                                                        ?.slice()
                                                                                        .sort((a, b) => {
                                                                                            const timeA = moment(
                                                                                                `${a.slot_time} ${a.time_type}`,
                                                                                                "HH:mm:ss A"
                                                                                            );
                                                                                            const timeB = moment(
                                                                                                `${b.slot_time} ${b.time_type}`,
                                                                                                "HH:mm:ss A"
                                                                                            );
                                                                                            return timeA - timeB;
                                                                                        })
                                                                                        .map((guestdata, index) => {
                                                                                            return (
                                                                                                <div
                                                                                                    className="services-completed-block border-wrapper"
                                                                                                    key={index}
                                                                                                >
                                                                                                    {data?.username?.length > 20 ? (
                                                                                                        <p className="quickusername">
                                                                                                            {guestdata?.username.substring(0, 17)}...
                                                                                                        </p>
                                                                                                    ) : (
                                                                                                        <p className="quickusername">
                                                                                                            {guestdata?.username}
                                                                                                        </p>
                                                                                                    )}

                                                                                                    <div className="schedules-text">
                                                                                                        <h6>{t("serviceType")}</h6>
                                                                                                        <ul>
                                                                                                            <li>{guestdata?.servicename}</li>
                                                                                                        </ul>
                                                                                                    </div>

                                                                                                    <div className="schedules-text">
                                                                                                        <ul>
                                                                                                            <li>
                                                                                                                ({guestdata?.hour * 60 + guestdata?.minutes}{" "}
                                                                                                                min)
                                                                                                            </li>
                                                                                                        </ul>
                                                                                                    </div>
                                                                                                    <div className="services-completed-block">
                                                                                                        <div className="schedules-text">
                                                                                                            <h6>{t("employee")}</h6>
                                                                                                            <ul>
                                                                                                                <li>{guestdata?.employeename}</li>
                                                                                                            </ul>
                                                                                                        </div>
                                                                                                        <div className="schedules-text">
                                                                                                            <h6>{t("time")}</h6>
                                                                                                            <ul>
                                                                                                                <li>
                                                                                                                    {guestdata?.slot_time?.split(":")[0]}:
                                                                                                                    {guestdata?.slot_time?.split(":")[1]}{" "}
                                                                                                                    {guestdata?.time_type} -{" "}
                                                                                                                    {calculateEndTime(
                                                                                                                        guestdata?.slot_time,
                                                                                                                        guestdata?.hour,
                                                                                                                        guestdata?.minutes,
                                                                                                                        guestdata?.time_type,
                                                                                                                        guestdata?.date
                                                                                                                    )}
                                                                                                                </li>
                                                                                                            </ul>
                                                                                                        </div>
                                                                                                        <div className="services-completed-block">
                                                                                                            <div className="schedules-text">
                                                                                                                {guestdata?.notes ? (
                                                                                                                    <></>
                                                                                                                ) : (
                                                                                                                    <h6>Special request</h6>
                                                                                                                )}

                                                                                                                <ul>
                                                                                                                    <li>
                                                                                                                        {guestdata?.notes ? (
                                                                                                                            <div className="special-request-btn">
                                                                                                                                <p
                                                                                                                                    onClick={() =>
                                                                                                                                        handleShowNoteModal(guestdata)
                                                                                                                                    }
                                                                                                                                >
                                                                                                                                    {" "}
                                                                                                                                    <InlineSVG
                                                                                                                                        src={Info_icon}
                                                                                                                                        className="global_laguage_icon"
                                                                                                                                    />
                                                                                                                                    Special request
                                                                                                                                </p>
                                                                                                                            </div>
                                                                                                                        ) : (
                                                                                                                            <p>None</p>
                                                                                                                        )}
                                                                                                                    </li>
                                                                                                                </ul>
                                                                                                            </div>
                                                                                                            <div className="schedules-text">
                                                                                                                {guestdata?.bookingstatus == 0 &&
                                                                                                                    guestdata?.isTimeStarted == 0 ? (
                                                                                                                    <>
                                                                                                                        <Button
                                                                                                                            className="noshow-btn"
                                                                                                                            style={{ backgroundColor: "red" }}
                                                                                                                            onClick={() => {
                                                                                                                                setMainUserId(data?.id);
                                                                                                                                handleShowNotShowModal(guestdata);
                                                                                                                                setGuestIds(guestdata?.id);
                                                                                                                            }}
                                                                                                                            disabled={
                                                                                                                                guestdata?.isTimeStarted == 0 &&
                                                                                                                                    guestdata?.isStartServiceSocketDone ==
                                                                                                                                    0
                                                                                                                                    ? true
                                                                                                                                    : false
                                                                                                                                // !isToday ||
                                                                                                                                // !isPastBookingTime(
                                                                                                                                //   guestdata?.slot_time,
                                                                                                                                //   guestdata?.time_type
                                                                                                                                // )
                                                                                                                            }
                                                                                                                        >
                                                                                                                            {t("noShow")}
                                                                                                                        </Button>
                                                                                                                    </>
                                                                                                                ) : guestdata?.bookingstatus == 0 &&
                                                                                                                    guestdata?.isTimeStarted == 1 &&
                                                                                                                    guestdata?.isStartServiceSocketDone ==
                                                                                                                    1 ? (
                                                                                                                    <>
                                                                                                                        <Button
                                                                                                                            className="noshow-btn"
                                                                                                                            style={{ backgroundColor: "red" }}
                                                                                                                            onClick={() => {
                                                                                                                                setMainUserId(data?.id);
                                                                                                                                handleShowNotShowModal(guestdata);
                                                                                                                                setGuestIds(guestdata?.id);
                                                                                                                            }}
                                                                                                                        >
                                                                                                                            {t("noShow")}
                                                                                                                        </Button>
                                                                                                                    </>
                                                                                                                ) : (
                                                                                                                    <>
                                                                                                                        {/* <Button
                                                              // variant="secondary"
                                                              className="noshow-btn"
                                                              disabled
                                                            >
                                                              {t("noShow")}
                                                            </Button> */}
                                                                                                                    </>
                                                                                                                )}
                                                                                                                {/* {guestdata?.bookingstatus == 0 &&
                                                        data?.isTimeStarted == 0 ? (
                                                          <>
                                                            <Button
                                                              className="noshow-btn"
                                                              onClick={() => {
                                                                setMainUserId(data?.id);
                                                                handleShowNotShowModal(guestdata);
                                                                setGuestIds(guestdata?.id);
                                                              }}
                                                              disabled={
                                                                !isToday ||
                                                                !isPastBookingTime(
                                                                  guestdata?.slot_time,
                                                                  guestdata?.time_type
                                                                )
                                                              }
                                                            >
                                                              {t("noShow")}
                                                            </Button>
                                                          </>
                                                        ) : guestdata?.bookingstatus == 4 &&
                                                          guestdata?.checkinstatus == 0 ? (
                                                          <>
                                                            <Button
                                                              // variant="secondary"
                                                              style={{ backgroundColor: "red" }}
                                                              className="noshow-btn"
                                                              disabled
                                                            >
                                                              {t("noShow")}
                                                            </Button>
                                                          </>
                                                        ) : guestdata?.bookingstatus == 4 &&
                                                          guestdata?.checkinstatus == 1 ? (
                                                          <>
                                                            <Button className="noshow-btn" disabled>
                                                              {t("noShow")}
                                                            </Button>
                                                          </>
                                                        ) : guestdata?.bookingstatus == 0 &&
                                                          guestdata?.isTimeStarted == 1 &&
                                                          guestdata?.isStartServiceSocketDone ==
                                                            1 ? (
                                                          <>
                                                            <Button
                                                              className="noshow-btn"
                                                              onClick={() => {
                                                                setMainUserId(data?.id);
                                                                handleShowNotShowModal(guestdata);
                                                              }}
                                                            >
                                                              {t("noShow")}
                                                            </Button>
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )} */}
                                                                                                            </div>
                                                                                                        </div>

                                                                                                        {guestdata?.bookingstatus == 1 &&
                                                                                                            guestdata?.cancel_by && (
                                                                                                                <div className="cancelled-block">
                                                                                                                    <h6>
                                                                                                                        {data ? (
                                                                                                                            guestdata?.cancel_by_type ===
                                                                                                                                "serviceProvider" ? (
                                                                                                                                <h6>Cancelled by Spa</h6>
                                                                                                                            ) : guestdata?.cancel_by_type ===
                                                                                                                                "user" ? (
                                                                                                                                <h6>Cancelled by User</h6>
                                                                                                                            ) : (
                                                                                                                                <></>
                                                                                                                            )
                                                                                                                        ) : null}
                                                                                                                    </h6>
                                                                                                                </div>
                                                                                                            )}
                                                                                                    </div>
                                                                                                    <div className="complete-payment-box">
                                                                                                        {guestdata?.checkinstatus == 0 &&
                                                                                                            guestdata?.bookingstatus == 0 ? (
                                                                                                            <>
                                                                                                                <Button
                                                                                                                    className="btn-primary secondary-btn sitback-updated-checkin-btn"
                                                                                                                    onClick={() => {
                                                                                                                        setMainUserId(data?.id);
                                                                                                                        setGuestIds(guestdata?.id);
                                                                                                                        handleShowCheckInModal(guestdata);
                                                                                                                    }}
                                                                                                                    disabled={
                                                                                                                        guestdata?.isFiveHourSocketDone == 0
                                                                                                                            ? true
                                                                                                                            : false
                                                                                                                        //   ||
                                                                                                                        // !isPastBookingTime(
                                                                                                                        //   guestdata?.date,
                                                                                                                        //   guestdata?.slot_time,
                                                                                                                        //   guestdata?.time_type
                                                                                                                        // )
                                                                                                                    }
                                                                                                                >
                                                                                                                    CHECK IN
                                                                                                                </Button>
                                                                                                            </>
                                                                                                        ) : (
                                                                                                            <></>
                                                                                                        )}
                                                                                                        <>
                                                                                                            {guestdata?.bookingstatus == 3 ||
                                                                                                                guestdata?.bookingstatus == 4 ? (
                                                                                                                <>
                                                                                                                    {guestdata?.checkinstatus == 1 ? (
                                                                                                                        <>
                                                                                                                            <p
                                                                                                                                onClick={() =>
                                                                                                                                    handleShowProductListModal(
                                                                                                                                        guestdata
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            >
                                                                                                                                <span>
                                                                                                                                    Add Upgrades or Products to cart
                                                                                                                                </span>{" "}
                                                                                                                                (
                                                                                                                                {guestdata?.tempItemCount
                                                                                                                                    ? guestdata?.tempItemCount
                                                                                                                                    : 0}
                                                                                                                                )
                                                                                                                            </p>
                                                                                                                        </>
                                                                                                                    ) : (
                                                                                                                        <></>
                                                                                                                    )}
                                                                                                                </>
                                                                                                            ) : (
                                                                                                                <></>
                                                                                                            )}
                                                                                                            {/* {guestdata?.bookingstatus == 3 ||
                                                      guestdata?.bookingstatus == 4 ? (
                                                        <>
                                                          {data?.isAfterCompleteDoneSocket == 0 ? (
                                                            guestdata?.checkinstatus == 1 ? (
                                                              <>
                                                                <p
                                                                  onClick={() =>
                                                                    handleShowProductListModal(
                                                                      guestdata
                                                                    )
                                                                  }
                                                                >
                                                                  <span>
                                                                    Add Upgrades or Products to cart
                                                                  </span>{" "}
                                                                  (
                                                                  {guestdata?.tempItemCount
                                                                    ? guestdata?.tempItemCount
                                                                    : 0}
                                                                  )
                                                                </p>
                                                              </>
                                                            ) : (
                                                              <></>
                                                            )
                                                          ) : data?.isAfterCompleteDoneSocket ==
                                                              1 &&
                                                            data.maxTimeData.type == "main_user" ? (
                                                            <p
                                                              onClick={() =>
                                                                handleShowProductListModal(
                                                                  guestdata
                                                                )
                                                              }
                                                            >
                                                              <span>
                                                                Add Upgrades or Products to cart
                                                              </span>{" "}
                                                              (
                                                              {guestdata?.tempItemCount
                                                                ? guestdata?.tempItemCount
                                                                : 0}
                                                              )
                                                            </p>
                                                          ) : data?.isAfterCompleteDoneSocket ==
                                                              1 &&
                                                            data.maxTimeData.type == "guest" &&
                                                            guestdata.id !==
                                                              data.maxTimeData.main_id ? (
                                                            <p
                                                              onClick={() =>
                                                                handleShowProductListModal(
                                                                  guestdata
                                                                )
                                                              }
                                                            >
                                                              <span>
                                                                Add Upgrades or Products to cart
                                                              </span>{" "}
                                                              (
                                                              {guestdata?.tempItemCount
                                                                ? guestdata?.tempItemCount
                                                                : 0}
                                                              )
                                                            </p>
                                                          ) : guestdata?.isAfterCompleteDoneSocket ==
                                                              0 &&
                                                            data.maxTimeData.type == "guest" &&
                                                            guestdata.id ==
                                                              data.maxTimeData.main_id ? (
                                                            <p
                                                              onClick={() =>
                                                                handleShowProductListModal(
                                                                  guestdata
                                                                )
                                                              }
                                                            >
                                                              <span>
                                                                Add Upgrades or Products to cart
                                                              </span>{" "}
                                                              (
                                                              {guestdata?.tempItemCount
                                                                ? guestdata?.tempItemCount
                                                                : 0}
                                                              )
                                                            </p>
                                                          ) : (
                                                            <></>
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )} */}
                                                                                                        </>
                                                                                                    </div>
                                                                                                </div>
                                                                                            );
                                                                                        })}
                                                                            </div>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <div className="quick-chat-list-wrapper">
                                                                                <div className="userdetailwrapper">
                                                                                    <div>
                                                                                        <div className="user-img-wrapper">
                                                                                            <Image
                                                                                                radius={50}
                                                                                                src={data?.userimage || userDummyImage}
                                                                                                alt="sitback"
                                                                                                onError={(e) => {
                                                                                                    e.target.src = userDummyImage;
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="user-detail-wrapper">
                                                                                        <h3>{data?.username}</h3>
                                                                                        {/* <span className="failed-payment-text" onClick={() => setShow(true)}>Failed Payment</span> */}
                                                                                    </div>
                                                                                </div>
                                                                                <span className="status-text-btn">
                                                                                    {handleAppointmentType(data?.bookingtype)}
                                                                                </span>
                                                                            </div>
                                                                            <div className="schedules-time-detail">
                                                                                <div className="services-completed-block">
                                                                                    <div className="schedules-text">
                                                                                        <h6>{t("employee")}</h6>
                                                                                        <ul>
                                                                                            <li>{data?.employeename}</li>
                                                                                        </ul>
                                                                                    </div>
                                                                                    <div className="schedules-text">
                                                                                        <h6>{t("services")}</h6>
                                                                                        <ul>
                                                                                            <li>
                                                                                                {data?.servicename} (
                                                                                                {data?.hour * 60 + data?.minutes} min)
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="schedules-text">
                                                                                    <h6>{t("time")}</h6>
                                                                                    <ul>
                                                                                        <li>
                                                                                            {moment(data?.date).format("dddd, MMM D, YYYY")}
                                                                                        </li>
                                                                                        <li>
                                                                                            {data?.slot_time?.split(":")[0]}:
                                                                                            {data?.slot_time?.split(":")[1]} {data?.time_type} -{" "}
                                                                                            {calculateEndTime(
                                                                                                data?.slot_time,
                                                                                                data?.hour,
                                                                                                data?.minutes,
                                                                                                data?.time_type,
                                                                                                data?.date
                                                                                            )}
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                                {data?.bookingtype === "bookingbyspa" ||
                                                                                    data?.bookingtype === "bookingbyschedular" ||
                                                                                    data?.bookingtype === "bookingbyuser" ? (
                                                                                    <div className="services-completed-block">
                                                                                        <div className="schedules-text">
                                                                                            <h6>Payment</h6>
                                                                                            <ul>
                                                                                                <li>
                                                                                                    {data ? (
                                                                                                        data.payment_by === "card" ? (
                                                                                                            <>By Card</>
                                                                                                        ) : data.payment_by === "cash" ? (
                                                                                                            <>By Cash</>
                                                                                                        ) : (
                                                                                                            <></>
                                                                                                        )
                                                                                                    ) : null}
                                                                                                </li>
                                                                                                <li></li>
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div className="schedules-text">
                                                                                            {data?.bookingstatus == 0 &&
                                                                                                data?.isTimeStarted == 0 ? (
                                                                                                <>
                                                                                                    <Button
                                                                                                        className="noshow-btn"
                                                                                                        style={{ backgroundColor: "red" }}
                                                                                                        onClick={() => {
                                                                                                            setMainUserId(data?.id);
                                                                                                            handleShowNotShowModal(data);
                                                                                                        }}
                                                                                                        disabled={
                                                                                                            data?.isTimeStarted == 0 &&
                                                                                                                data?.isStartServiceSocketDone == 0
                                                                                                                ? true
                                                                                                                : false
                                                                                                            // !isToday ||
                                                                                                            // !isNoShowActive(
                                                                                                            //   data?.slot_time,
                                                                                                            //   data?.time_type
                                                                                                            // )
                                                                                                        }
                                                                                                    >
                                                                                                        {t("noShow")}
                                                                                                    </Button>
                                                                                                </>
                                                                                            ) : data?.bookingstatus == 0 &&
                                                                                                data?.isTimeStarted == 1 &&
                                                                                                data?.isStartServiceSocketDone == 1 ? (
                                                                                                <>
                                                                                                    <Button
                                                                                                        className="noshow-btn"
                                                                                                        style={{ backgroundColor: "red" }}
                                                                                                        onClick={() => {
                                                                                                            setMainUserId(data?.id);
                                                                                                            handleShowNotShowModal(data);
                                                                                                        }}
                                                                                                    >
                                                                                                        {t("noShow")}
                                                                                                    </Button>
                                                                                                </>
                                                                                            ) : (
                                                                                                <>
                                                                                                    {/* <Button
                                                    // variant="secondary"
                                                    className="noshow-btn"
                                                    disabled
                                                  >
                                                    {t("noShow")}
                                                  </Button> */}
                                                                                                </>
                                                                                            )}
                                                                                        </div>
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.notes && (
                                                                                    <div className="special-request-btn">
                                                                                        <p onClick={() => handleShowNoteModal(data)}>
                                                                                            {" "}
                                                                                            <InlineSVG
                                                                                                src={Info_icon}
                                                                                                className="global_laguage_icon"
                                                                                            />
                                                                                            Special request
                                                                                        </p>
                                                                                    </div>
                                                                                )}

                                                                                {data?.cancel_by && (
                                                                                    <div className="cancelled-block">
                                                                                        <h6>
                                                                                            {data ? (
                                                                                                data.cancel_by_type === "serviceProvider" ? (
                                                                                                    <h6>Cancelled by Spa</h6>
                                                                                                ) : data.cancel_by_type === "user" ? (
                                                                                                    <h6>Cancelled by User</h6>
                                                                                                ) : (
                                                                                                    <></>
                                                                                                )
                                                                                            ) : null}
                                                                                        </h6>
                                                                                    </div>
                                                                                )}

                                                                                <div
                                                                                    // className={
                                                                                    //   data?.userTotalAmount > 0
                                                                                    //     ? "startservice-btns-noshow completed-btn-wrapperdiv"
                                                                                    //     : "startservice-btns-noshow "
                                                                                    // }
                                                                                    className="complete-payment-box"
                                                                                >
                                                                                    {data?.checkinstatus == 0 && data?.bookingstatus == 0 ? (
                                                                                        <>
                                                                                            <Button
                                                                                                className="btn-primary secondary-btn sitback-updated-checkin-btn"
                                                                                                onClick={() => {
                                                                                                    setMainUserId(data?.id);
                                                                                                    handleShowCheckInModal(data);
                                                                                                    // isPastBookingTime(
                                                                                                    //   data?.slot_time,
                                                                                                    //   data?.time_type
                                                                                                    // );
                                                                                                }}
                                                                                                disabled={
                                                                                                    data?.isFiveHourSocketDone == 0 ? true : false
                                                                                                    // !isPastBookingTime(
                                                                                                    //   data?.date,
                                                                                                    //   data?.slot_time,
                                                                                                    //   data?.time_type
                                                                                                    // )
                                                                                                }
                                                                                            >
                                                                                                CHECK IN
                                                                                            </Button>
                                                                                        </>
                                                                                    ) : (
                                                                                        <></>
                                                                                    )}
                                                                                    {/* {data?.checkinstatus == 1 ? (
                                            <div className="complete-payment-box">
                                              <Button className="green-btn-wrapper">
                                                COMPLETE & GET PAYMENT
                                              </Button>
                                              <p onClick={() => handleShowProductListModal(data)}>
                                                {" "}
                                                <span>Add Upgrades or Products to cart</span> (3)
                                              </p>
                                            </div>
                                          ) : (
                                            <></>
                                          )} */}
                                                                                    {data?.isAfterCompleteDoneSocket == 0 &&
                                                                                        data?.checkinstatus == 0 ? (
                                                                                        <>
                                                                                            {data?.cancel_by_type == "user" &&
                                                                                                data?.bookingstatus == 1 ? (
                                                                                                <div className="complete-payment-box">
                                                                                                    {data?.userTotalAmount > 0 ? (
                                                                                                        <>
                                                                                                            <LoadingButton
                                                                                                                className="green-btn-wrapper complete-get-payment-btn-wrapper"
                                                                                                                id={data?.id}
                                                                                                                disabled={
                                                                                                                    getPaymentLoader &&
                                                                                                                    loadingEnabled?.current?.id == data?.id
                                                                                                                }
                                                                                                                label="CANCELLED & GET PAYMENT"
                                                                                                                loadinglabel="CANCELLED & GET PAYMENT"
                                                                                                                isLoading={
                                                                                                                    getPaymentLoader &&
                                                                                                                    loadingEnabled?.current?.id == data?.id
                                                                                                                }
                                                                                                                // className="loading-btn-wrapper"
                                                                                                                // onClick={() => CapturePayment(data)}
                                                                                                                onClick={() => handlePaymentOption(data)}
                                                                                                            />
                                                                                                        </>
                                                                                                    ) : (
                                                                                                        <></>
                                                                                                    )}
                                                                                                </div>
                                                                                            ) : data?.bookingstatus == 2 ? (
                                                                                                <div className="complete-payment-box">
                                                                                                    {data?.userTotalAmount > 0 ? (
                                                                                                        <>
                                                                                                            <LoadingButton
                                                                                                                className="green-btn-wrapper complete-get-payment-btn-wrapper"
                                                                                                                id={data?.id}
                                                                                                                disabled={
                                                                                                                    getPaymentLoader &&
                                                                                                                    loadingEnabled?.current?.id == data?.id
                                                                                                                }
                                                                                                                label="COMPLETE & GET PAYMENT"
                                                                                                                loadinglabel="COMPLETE & GET PAYMENT"
                                                                                                                isLoading={
                                                                                                                    getPaymentLoader &&
                                                                                                                    loadingEnabled?.current?.id == data?.id
                                                                                                                }
                                                                                                                // className="loading-btn-wrapper"
                                                                                                                // onClick={() => CapturePayment(data)}
                                                                                                                onClick={() => handlePaymentOption(data)}
                                                                                                            />
                                                                                                        </>
                                                                                                    ) : (
                                                                                                        <></>
                                                                                                    )}
                                                                                                </div>
                                                                                            ) : (
                                                                                                <></>
                                                                                            )}
                                                                                        </>
                                                                                    ) : (
                                                                                        <></>
                                                                                    )}
                                                                                    {data?.isAfterCompleteDoneSocket == 1 ? (
                                                                                        <>
                                                                                            {data?.bookingstatus == 1 ? (
                                                                                                <div
                                                                                                    // className={
                                                                                                    //   data?.userTotalAmount > 0
                                                                                                    //     ? "startservice-btns-noshow completed-btn-wrapperdiv"
                                                                                                    //     : "startservice-btns-noshow "
                                                                                                    // }
                                                                                                    className="complete-payment-box"
                                                                                                >
                                                                                                    {data?.userTotalAmount > 0 ? (
                                                                                                        <>
                                                                                                            <LoadingButton
                                                                                                                className="green-btn-wrapper complete-get-payment-btn-wrapper"
                                                                                                                id={data?.id}
                                                                                                                disabled={
                                                                                                                    getPaymentLoader &&
                                                                                                                    loadingEnabled?.current?.id == data?.id
                                                                                                                }
                                                                                                                label="CANCELLED & GET PAYMENT"
                                                                                                                loadinglabel="CANCELLED & GET PAYMENT"
                                                                                                                isLoading={
                                                                                                                    getPaymentLoader &&
                                                                                                                    loadingEnabled?.current?.id == data?.id
                                                                                                                }
                                                                                                                // className="loading-btn-wrapper"
                                                                                                                // onClick={() => CapturePayment(data)}
                                                                                                                onClick={() => handlePaymentOption(data)}
                                                                                                            />
                                                                                                        </>
                                                                                                    ) : (
                                                                                                        ""
                                                                                                    )}
                                                                                                    {/* <p onClick={() => handleShowProductListModal(data)}>
                                                  {" "}
                                                  <span>Add Upgrades or Products to cart</span> (
                                                  {data?.tempItemCount ? data?.tempItemCount : 0})
                                                </p> */}
                                                                                                </div>
                                                                                            ) : data?.bookingstatus == 2 ? (
                                                                                                <div
                                                                                                    // className={
                                                                                                    //   data?.userTotalAmount > 0
                                                                                                    //     ? "startservice-btns-noshow completed-btn-wrapperdiv"
                                                                                                    //     : "startservice-btns-noshow "
                                                                                                    // }
                                                                                                    className="complete-payment-box"
                                                                                                >
                                                                                                    {data?.userTotalAmount > 0 ? (
                                                                                                        <>
                                                                                                            <LoadingButton
                                                                                                                className="green-btn-wrapper complete-get-payment-btn-wrapper"
                                                                                                                id={data?.id}
                                                                                                                disabled={
                                                                                                                    getPaymentLoader &&
                                                                                                                    loadingEnabled?.current?.id == data?.id
                                                                                                                }
                                                                                                                label="COMPLETE & GET PAYMENT"
                                                                                                                loadinglabel="COMPLETE & GET PAYMENT"
                                                                                                                isLoading={
                                                                                                                    getPaymentLoader &&
                                                                                                                    loadingEnabled?.current?.id == data?.id
                                                                                                                }
                                                                                                                // className="loading-btn-wrapper"
                                                                                                                // onClick={() => CapturePayment(data)}
                                                                                                                onClick={() => handlePaymentOption(data)}
                                                                                                            />
                                                                                                        </>
                                                                                                    ) : (
                                                                                                        ""
                                                                                                    )}
                                                                                                    {/* <p onClick={() => handleShowProductListModal(data)}>
                                                  {" "}
                                                  <span>Add Upgrades or Products to cart</span> (
                                                  {data?.tempItemCount ? data?.tempItemCount : 0})
                                                </p> */}
                                                                                                </div>
                                                                                            ) : data?.bookingstatus == 3 ? (
                                                                                                <div className="complete-payment-box">
                                                                                                    {data?.userTotalAmount > 0 ? (
                                                                                                        <>
                                                                                                            <LoadingButton
                                                                                                                className="green-btn-wrapper complete-get-payment-btn-wrapper"
                                                                                                                id={data?.id}
                                                                                                                disabled={
                                                                                                                    getPaymentLoader &&
                                                                                                                    loadingEnabled?.current?.id == data?.id
                                                                                                                }
                                                                                                                label="COMPLETE & GET PAYMENT"
                                                                                                                loadinglabel="COMPLETE & GET PAYMENT"
                                                                                                                isLoading={
                                                                                                                    getPaymentLoader &&
                                                                                                                    loadingEnabled?.current?.id == data?.id
                                                                                                                }
                                                                                                                // className="loading-btn-wrapper"
                                                                                                                // onClick={() => CapturePayment(data)}
                                                                                                                onClick={() => handlePaymentOption(data)}
                                                                                                            />
                                                                                                        </>
                                                                                                    ) : (
                                                                                                        ""
                                                                                                    )}
                                                                                                    <p
                                                                                                        onClick={() => handleShowProductListModal(data)}
                                                                                                    >
                                                                                                        {" "}
                                                                                                        <span>Add Upgrades or Products to cart</span> (
                                                                                                        {data?.tempItemCount ? data?.tempItemCount : 0})
                                                                                                    </p>
                                                                                                </div>
                                                                                            ) : data?.bookingstatus == 4 ? (
                                                                                                <div className="complete-payment-box">
                                                                                                    {data?.userTotalAmount > 0 ? (
                                                                                                        <>
                                                                                                            <LoadingButton
                                                                                                                className="green-btn-wrapper complete-get-payment-btn-wrapper"
                                                                                                                id={data?.id}
                                                                                                                disabled={
                                                                                                                    getPaymentLoader &&
                                                                                                                    loadingEnabled?.current?.id == data?.id
                                                                                                                }
                                                                                                                label="COMPLETE & GET PAYMENT"
                                                                                                                loadinglabel="COMPLETE & GET PAYMENT"
                                                                                                                isLoading={
                                                                                                                    getPaymentLoader &&
                                                                                                                    loadingEnabled?.current?.id == data?.id
                                                                                                                }
                                                                                                                // className="loading-btn-wrapper"
                                                                                                                // onClick={() => CapturePayment(data)}
                                                                                                                onClick={() => handlePaymentOption(data)}
                                                                                                            />
                                                                                                        </>
                                                                                                    ) : (
                                                                                                        ""
                                                                                                    )}
                                                                                                    <p
                                                                                                        onClick={() => handleShowProductListModal(data)}
                                                                                                    >
                                                                                                        {" "}
                                                                                                        <span>Add Upgrades or Products to cart</span> (
                                                                                                        {data?.tempItemCount ? data?.tempItemCount : 0})
                                                                                                    </p>
                                                                                                </div>
                                                                                            ) : (
                                                                                                <></>
                                                                                            )}{" "}
                                                                                        </>
                                                                                    ) : (
                                                                                        <>
                                                                                            {data?.bookingstatus == 4 ||
                                                                                                data?.bookingstatus == 3 ? (
                                                                                                <div className="complete-payment-box">
                                                                                                    <p
                                                                                                        onClick={() => handleShowProductListModal(data)}
                                                                                                    >
                                                                                                        {" "}
                                                                                                        <span>Add Upgrades or Products to cart</span> (
                                                                                                        {data?.tempItemCount ? data?.tempItemCount : 0})
                                                                                                    </p>
                                                                                                </div>
                                                                                            ) : (
                                                                                                <></>
                                                                                            )}
                                                                                        </>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                </QuickChatBoxWrapper>
                                                            );
                                                        })
                                                    ) : (
                                                        <div className="nodatext-div">
                                                            <p>{t("nodataavailable")}</p>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="viewmore">
                                                    {isNextPage ? (
                                                        <span onClick={handleViewMore} className="viewmore-text-btn">
                                                            {t("viewmore")}
                                                        </span>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="second">
                                                <FailedPayment selectedId={selectedId} />
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Tab.Container>
                                </div>
                            </Col>
                            <Col md={12} lg={8}>
                                <div className="box-wrapper-div" style={{ background: "#FFFFFF" }}>
                                    <CustomCalender
                                        provider={providerData}
                                        upcoming={upcomingList}
                                        setSelectedId={setSelectedId}
                                        currentUser={selectedId}
                                        unavaliableList={unavaliableList}
                                        getUnavailableList={getUnavailableList}
                                        updatebookingcalender={updatebookingcalender}
                                        setCurrentPage={setCurrentPage}
                                    />
                                </div>
                                <div className="employees-hours-btn">
                                    <Link href={PATH_DASHBOARD?.employeeHours} className="employee-hours-btn-wrapper">
                                        {t("seeAllEmployee")}
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </AppointmentsLayoutWrapper>

                <StartServiceModal
                    show={showStartServiceModal}
                    handleClose={() => handleCloseServiceModal()}
                    serviceData={StartServiceTarget}
                    mainId={mainUserId}
                    guest_ids={guestIds}
                    setupdatebookinU={setupdatebookinU}
                />

                <NoShowModal
                    show={showNoShowModal}
                    handleClose={() => handleCloseServiceModal()}
                    noShowData={NoShowTarget}
                    mainId={mainUserId}
                    guest_ids={guestIds}
                    setupdatebookinU={setupdatebookinU}
                />

                <PaymentReminder
                    show={reminderDetails?.openModal}
                    data={reminderData}
                    count={totalCount}
                    handleClose={() =>
                        dispatch(handleReminderData({ data: null, openModal: false, total: null }))
                    }
                />

                <PaymentError
                    show={failedModal}
                    // handleClose={() => setOpenPaymentError(false)}
                    handleClose={() => dispatch(handlePaymentFailedModal(false))}
                    data={failedModalData || selectedData}
                />
                <PaymentOption
                    show={openPaymentOption}
                    // handleClose={() => setOpenPaymentError(false)}
                    onShow={() => setOpenPaymentOption(true)}
                    onHide={() => setOpenPaymentOption(false)}
                    data={loadingEnabled?.current}
                    providerData={providerData}
                    selectedData={selectedData}
                />

                <Confirmation
                    show={confirmationModal}
                    handleClose={() => setOpenConfirmationModal(false)}
                />
                <CheckInModal
                    show={showcheckInModal}
                    handleClose={() => setShowCheckInModal(false)}
                    mainId={mainUserId}
                    guest_ids={guestIds}
                    data={checkInTarget}
                    setupdatebookinU={setupdatebookinU}
                />

                <ProductListModal
                    show={showProductListModal}
                    handleClose={() => setProductListModal(false)}
                    data={productListInTarget}
                />
                <NoteList show={showNoteModal} onHide={() => setShowNoteModal(false)} note={noteTarget} />
            </MainLayoutWrapper>
        </>
    );
}
