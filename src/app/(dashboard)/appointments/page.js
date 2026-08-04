"use client";

import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import InlineSVG from "svg-inline-react";

import BookedAppointmentDetails from "@/components/appoiments/modal/BookedAppointmentDetails";
import CancelAppointmentModal from "@/components/appoiments/modal/cancelAppointmentModal";
import CheckInModal from "@/components/appoiments/modal/checkinConfirmationModa";
import Confirmation from "@/components/appoiments/modal/confirmation";
import EditAppointmentSidebar from "@/components/appoiments/modal/EditAppointmentSidebar";
import NoteList from "@/components/appoiments/modal/listNotes";
import NewAppointmentSidebar from "@/components/appoiments/modal/NewAppointmentSidebar";
import NewCustomCalender from "@/components/appoiments/modal/NewCustomCalender";
import NoShowModal from "@/components/appoiments/modal/noShowServiceModal";
import PaymentError from "@/components/appoiments/modal/paymentError";
import PaymentOption from "@/components/appoiments/modal/paymentOption";
import PaymentReminder from "@/components/appoiments/modal/paymentReminder";
import ProductListModal from "@/components/appoiments/modal/productList";
import StartServiceModal from "@/components/appoiments/modal/starServiceModal";
import UserInfoModal from "@/components/appoiments/modal/userInfo";
import TherapistMapping from "@/components/appoiments/TherapistMapping";

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
import {
  ActionButton,
  ActionIconButton,
  ActionIconGroup,
  CustomerInfo,
  CustomerName,
  CustomerPhone,
  DashboardContainer,
  DatePickerInput,
  DropdownSelect,
  EmptyState,
  FilterGroupLeft,
  FilterRow,
  GuestBadge,
  HeaderActions,
  HeaderLeft,
  HeaderRow,
  HeaderSection,
  ListLayoutWrapper,
  ListMainArea,
  ListSidebarWrap,
  MiddleSection,
  PageTitle,
  PageWrapper,
  PillBadge,
  SearchIconWrapper,
  SearchInput,
  SearchWrapper,
  StatCard,
  StatIconContainer,
  StatInfo,
  StatLabel,
  StatValue,
  StatsRow,
  StyledTable,
  TableSection,
  Td,
  Th,
  ToggleButton,
  Tr,
  ViewToggle,
} from "@/styles/pages/booking-dashboard.style";
import { DeleteV2_icon, EditV2_icon, Info_icon, Search_icon_appointment, TherapistMappingIcon, ViewShow_icon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { removeCookie } from "@/utils/cookie";


export default function AppointmentsPage() {
  const { toaster } = useToaster();
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { login } = useSelector(authCheckSliceSelector);
  const { t } = useTranslation();

  const { appointmentTarget, targetProcess, calenderRefresh } = useSelector(
    messageCheckSliceSelector
  );
  const { failedModal, failedModalData, reminderDetails, upcomingDetails } = useSelector(
    appointmentCheckSliceSelector
  );

  // States
  const [viewMode, setViewMode] = useState("list"); // "list" | "calendar"
  const [dashboardTab, setDashboardTab] = useState("booking"); // "booking" | "therapist-mapping"
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filterDate, setFilterDate] = useState(null);

  const [totalCount, setTotalCount] = useState(null);
  const [reminderData, setReminderData] = useState([]);
  const [upcomingList, setUpcomingList] = useState(upcomingDetails || []);
  const [failedList, setFailedList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isNextPage, setIsNextPage] = useState(false);
  const [unavaliableList, setUnavaliableList] = useState([]);
  const [guestIds, setGuestIds] = useState(null);
  const [mainUserId, setMainUserId] = useState(null);
  const [updatebookingcalender, setupdatebookinU] = useState(false);
  const [analyticsData, setAnalyticsData] = useState([]);

  // Modals state
  const [confirmationModal, setOpenConfirmationModal] = useState(false);
  const [showcheckInModal, setShowCheckInModal] = useState(false);
  const [checkInTarget, setCheckInTarget] = useState(null);

  const [showStartServiceModal, setStartServiceModal] = useState(false);
  const [StartServiceTarget, setStartServiceTarget] = useState(null);
  const [noteTarget, setNoteTarget] = useState(null);
  const [selectedId, setSelectedId] = useState(0);

  const [productListInTarget, setProductListTarget] = useState(false);
  const [showProductListModal, setProductListModal] = useState(false);

  const [showNoShowModal, setShowNoShowModal] = useState(false);
  const [NoShowTarget, setNoShowTarget] = useState(null);

  const [openPaymentOption, setOpenPaymentOption] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [showNoteModal, setShowNoteModal] = useState(false);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedCancelData, setSelectedCancelData] = useState(null);

  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [userInfoData, setUserInfoData] = useState(null);

  const [providerData, setProviderData] = useState([]);
  const loadingEnabled = useRef(null);
  const userInfoRef = useRef(null);
  const calendarRef = useRef(null);

  // List-view new booking sidebar
  const DEFAULT_SLOT_MINUTES = 15;
  const [showListSidebar, setShowListSidebar] = useState(false);
  const [listSelectedSlot, setListSelectedSlot] = useState(null);
  const [listSelectedService, setListSelectedService] = useState("");
  const [listServiceOptions, setListServiceOptions] = useState([
    { value: "", label: "Select Services", duration: DEFAULT_SLOT_MINUTES },
  ]);
  const [listScheduleSummary, setListScheduleSummary] = useState(null);
  const [listEditAppointment, setListEditAppointment] = useState(null);
  const [listViewAppointment, setListViewAppointment] = useState(null);

  // --- API Functions ---

  const getUpcomingList = async (targetDate = null) => {
    let queryParams = `?page=${currentPage}&limit=10`;
    if (selectedId && selectedId !== 0) {
      queryParams += `&employee_id=${selectedId}&employeeId=${selectedId}`;
    }
    const fetchDate = targetDate || filterDate;
    if (fetchDate) {
      queryParams += `&date=${fetchDate}&orderDate=${fetchDate}`;
    }
    if (statusFilter) {
      let statusMap = "";
      if (statusFilter === "confirmed") statusMap = "0";
      else if (statusFilter === "cancelled") statusMap = "1";
      else if (statusFilter === "noshow") statusMap = "2";
      else if (statusFilter === "completed") statusMap = "3";
      else if (statusFilter === "inservice") statusMap = "4";

      if (statusMap !== "") {
        queryParams += `&orderStatus=${statusMap}`;
      }
    }

    try {
      const res = await axiosApiCall.get(`/calender/get-all-booking${queryParams}`);
      console.log("Get All Booking", res);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        const rawList = res?.data?.data?.bookingList || res?.data?.data || [];
        const newdata = rawList.map((item) => ({
          ...item,
          id: item.bookingId || item.id,
          username: item.customer?.name || item.username || "",
          phone: item.customer?.phone || item.phone || "",
          countrycode: item.customer?.countrycode || item.countrycode || "",
          servicename: item.service?.serviceName || item.servicename || "",
          hour: item.service?.hour !== undefined ? item.service?.hour : (item.hour || 0),
          minutes: item.service?.minutes !== undefined ? item.service?.minutes : (item.minutes || 0),
          employeename: item.employee?.employeeName || item.employeename || "Unassigned",
          displayDate: item.date || item.displayDate,
          slot_time: item.slot?.slot_time || item.slot_time || "",
          time_type: item.slot?.time_type || item.time_type || "am",
          isPaymentDone: item.paymentStatus === "Paid" ? 1 : (item.isPaymentDone || 0),
          paymentBy: item.paymentBy || item.payment_by || "",
          guestList: (item.guestList || []).map((g) => ({
            ...g,
            id: g.bookingId || g.id,
            username: g.customer?.name || g.username || "",
            phone: g.customer?.phone || g.phone || "",
            countrycode: g.customer?.countrycode || g.countrycode || "",
            servicename: g.service?.serviceName || g.servicename || "",
            hour: g.service?.hour !== undefined ? g.service?.hour : (g.hour || 0),
            minutes: g.service?.minutes !== undefined ? g.service?.minutes : (g.minutes || 0),
            employeename: g.employee?.employeeName || g.employeename || "Unassigned",
            displayDate: g.date || g.displayDate || item.date,
            slot_time: g.slot?.slot_time || g.slot_time || "",
            time_type: g.slot?.time_type || g.time_type || "am",
            isPaymentDone: g.paymentStatus === "Paid" ? 1 : (g.isPaymentDone || 0),
            paymentBy: g.paymentBy || g.payment_by || "",
          })),
        }));

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
        dispatch(handleUpcomingData(formatrecords));
        setUpcomingList(formatrecords);
        setIsNextPage(res?.data?.isNextPage);
        if (currentPage === 1) {
          setAnalyticsData(res?.data?.analytics);
        }
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      dispatch(handleCalender(false));
    }
  };

  const getFailedPaymentList = async () => {
    const params = {
      page: currentPage,
      employee_id: selectedId,
    };
    try {
      const res = await axiosApiCall.post(API_ROUTER?.GET_FAILED_PAYMENT_BOOKING_LIST, params);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        const newData = res?.data?.data || [];
        const records = currentPage === 1 ? newData : [...failedList, ...newData];
        const formatRecords = _.uniqBy(records, "id");
        setFailedList(formatRecords);
        setIsNextPage(res?.data?.isNextPage);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const getEmployee = async () => {
    try {
      const res = await axiosApiCall.post(API_ROUTER?.EMPLOYEE_LIST);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setProviderData(res?.data?.data || []);
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
          const logoutRes = await axiosApiCall.post(API_ROUTER?.LOGOUT, { id: login?.id });
          if (!logoutRes?.status) {
            return toaster(logoutRes?.message, TOAST_TYPES.ERROR);
          } else {
            removeCookie("token");
            localStorage.clear();
            push(PATH_AUTH?.signIn);
            window.location.reload();
            return logoutRes;
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
        setUnavaliableList(res?.data?.slotListOut || []);
        setupdatebookinU(true);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  // --- Handlers & Helpers ---

  const handlePaymentOption = (data) => {
    console.log("1111", data);
    loadingEnabled.current = data;
    setSelectedData(data);
    setOpenPaymentOption(true);
  };

  const handleShowNoteModal = (target) => {
    setNoteTarget(target);
    setShowNoteModal(true);
  };

  const handleShowCheckInModal = (target) => {
    const isGuest = target.btype === "guest";
    setMainUserId(isGuest ? target.mainUserId : target.id);
    setGuestIds(isGuest ? target.id : null);
    setCheckInTarget(target);
    setShowCheckInModal(true);
  };

  const handleShowServiceModal = (target) => {
    const isGuest = target.btype === "guest";
    setMainUserId(isGuest ? target.mainUserId : target.id);
    setGuestIds(isGuest ? target.id : null);
    setStartServiceTarget(target);
    setStartServiceModal(true);
  };

  const handleShowNotShowModal = (target) => {
    const isGuest = target.btype === "guest";
    setMainUserId(isGuest ? target.mainUserId : target.id);
    setGuestIds(isGuest ? target.id : null);
    setNoShowTarget(target);
    setShowNoShowModal(true);
  };

  const handleShowProductListModal = (target) => {
    setProductListTarget(target);
    setProductListModal(true);
  };

  const handleCancelClick = (item) => {
    const isGuest = item.btype === "guest";
    const mappedData = {
      id: item.id,
      _def: {
        extendedProps: {
          type: isGuest ? "only_guest" : "only_main_user",
          mainUserId: isGuest ? item.mainUserId : item.id,
          isguest: isGuest ? 1 : 0
        }
      }
    };
    setSelectedCancelData(mappedData);
    setShowCancelModal(true);
  };

  const handleUserInfoClick = (item) => {
    userInfoRef.current = item;
    setUserInfoData(item);
    setShowUserInfoModal(true);
  };

  // Edit pen click handler mapping logical status updates
  const handleEditClick = (item) => {
    if (item.bookingstatus === 3) {
      // Completed - show product list
      handleShowProductListModal(item);
    } else if (item.bookingstatus === 4) {
      // In Progress / In service - payment option
      handlePaymentOption(item);
    } else if (item.checkinstatus === 1) {
      // Checked in - start service
      handleShowServiceModal(item);
    } else if (item.bookingstatus === 0 && item.checkinstatus === 0) {
      // Pending check-in: if time started, show no-show modal, else show check-in modal
      if (item.isStartServiceSocketDone || item.isTimeStarted) {
        handleShowNotShowModal(item);
      } else {
        handleShowCheckInModal(item);
      }
    } else {
      // Fallback
      handleUserInfoClick(item);
    }
  };

  const mapListItemToBookedAppointment = (item) => {
    const dateStr = item.displayDate || item.date;
    let start_time = item.start_time || item.slot?.start_time;

    if (!start_time && item.slot_time) {
      const [h, m] = String(item.slot_time).split(":");
      start_time = moment(
        `${dateStr} ${h}:${m || "00"} ${item.time_type || "am"}`,
        ["YYYY-MM-DD HH:mm a", "YYYY-MM-DD H:mm a"]
      ).format("h:mm A");
    }

    const durationMins = (Number(item.hour) || 0) * 60 + (Number(item.minutes) || 0);
    const end_time = start_time
      ? moment(start_time, ["h:mm A", "hh:mm A"]).add(durationMins || 30, "minutes").format("h:mm A")
      : item.end_time || "";

    const serviceId =
      item.servicelist_id ||
      item.serviceListId ||
      item.service?.serviceListId ||
      item.service?.serviceslistId ||
      item.service?.serviceslist_id ||
      item.service?.servicelist_id ||
      item.service?.id ||
      item.service_id ||
      item.service?.serviceId ||
      "";

    const durationFromService =
      item.service?.durationMinutes ??
      item.durationMinutes ??
      ((Number(item.hour) || Number(item.service?.hour) || 0) * 60 +
        (Number(item.minutes) || Number(item.service?.minutes) || 0));
    const serviceHour = item.hour ?? item.service?.hour ?? Math.floor(Number(durationFromService || 0) / 60);
    const serviceMinutes = item.minutes ?? item.service?.minutes ?? (Number(durationFromService || 0) % 60);

    const employeeId =
      item.employee_id ||
      item.employeeId ||
      item.employee?.employeeId ||
      item.employee?.id ||
      item.employee?.userId ||
      "";

    return {
      ...item,
      bookingId: item.id || item.bookingId,
      id: item.id || item.bookingId,
      date: dateStr,
      orderDate: dateStr,
      start_time,
      end_time,
      notes: item.notes || "",
      servicelist_id: serviceId,
      employee_id: employeeId,
      client: {
        ...(item.customer || item.client || {}),
        clientId:
          item.customer?.id ||
          item.customer?.userId ||
          item.client?.clientId ||
          item.userId,
        clientName: item.username || item.customer?.name || item.client?.clientName || "",
        phoneNumber: item.phone || item.customer?.phone || item.client?.phoneNumber || "",
        countrycode: item.countrycode || item.customer?.countrycode || item.client?.countrycode || "",
        email: item.email || item.customer?.email || item.client?.email || "",
      },
      service: {
        ...(item.service || {}),
        id: serviceId,
        serviceListId: serviceId,
        serviceslistId: serviceId,
        serviceName: item.servicename || item.service?.serviceName || item.service?.name || "",
        hour: serviceHour,
        minutes: serviceMinutes,
        durationMinutes: durationFromService,
        price: item.service?.price ?? item.charges ?? item.price ?? 0,
      },
      employee: {
        ...(item.employee || {}),
        employeeId,
        id: employeeId,
        employeeName: item.employeename || item.employee?.employeeName || item.employee?.name || "Unassigned",
      },
    };
  };

  const handleListEditClick = (item) => {
    if (Number(item.bookingstatus) !== 0) return;

    const mapped = mapListItemToBookedAppointment(item);
    const serviceId = String(mapped.servicelist_id || mapped.service?.id || "");
    const start = mapped.date && mapped.start_time
      ? moment(`${mapped.date} ${mapped.start_time}`, "YYYY-MM-DD h:mm A").toDate()
      : getNextHalfHourSlot().toDate();

    setShowListSidebar(false);
    setListViewAppointment(null);
    setListEditAppointment(mapped);
    setListSelectedService(serviceId);
    setListSelectedSlot({
      start,
      end: buildListSlotEnd(start, serviceId),
    });
    fetchListServices();
    fetchListScheduleSummary(start);
  };

  const handleListViewClick = (item) => {
    const mapped = mapListItemToBookedAppointment(item);
    const serviceId = String(mapped.servicelist_id || mapped.service?.id || "");
    const start = mapped.date && mapped.start_time
      ? moment(`${mapped.date} ${mapped.start_time}`, "YYYY-MM-DD h:mm A").toDate()
      : getNextHalfHourSlot().toDate();

    setShowListSidebar(false);
    setListEditAppointment(null);
    setListViewAppointment(mapped);
    setListSelectedService(serviceId);
    setListSelectedSlot({
      start,
      end: buildListSlotEnd(start, serviceId),
    });
    fetchListServices();
    fetchListScheduleSummary(start);
  };

  const handleCloseListViewSidebar = () => {
    setListViewAppointment(null);
    setListSelectedSlot(null);
    setListSelectedService("");
  };

  const handleListViewStatusUpdate = (updates = {}) => {
    setListViewAppointment((prev) => (prev ? { ...prev, ...updates } : null));
  };

  const handleListEditFromView = () => {
    if (!listViewAppointment || Number(listViewAppointment.bookingstatus) !== 0) return;

    const mapped = listViewAppointment;
    const serviceId = String(mapped.servicelist_id || mapped.service?.id || "");
    const start = mapped.date && mapped.start_time
      ? moment(`${mapped.date} ${mapped.start_time}`, "YYYY-MM-DD h:mm A").toDate()
      : getNextHalfHourSlot().toDate();

    setListEditAppointment(mapped);
    setListSelectedService(serviceId);
    setListSelectedSlot({
      start,
      end: buildListSlotEnd(start, serviceId),
    });
    fetchListServices();
    fetchListScheduleSummary(start);
  };

  const handleCloseListEditSidebar = () => {
    setListEditAppointment(null);
    // If opened from View Info, return to details sidebar; otherwise close fully
    if (!listViewAppointment) {
      setListSelectedSlot(null);
      setListSelectedService("");
    }
  };

  const handleViewMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // --- Flattening & Process Data ---

  const getFlattenedBookings = (list) => {
    if (!list) return [];
    let flattened = [];
    list.forEach((booking) => {
      if (booking.guestList && booking.guestList.length > 0) {
        booking.guestList.forEach((guest) => {
          flattened.push({
            ...guest,
            mainUserId: booking.id,
            parentBooking: booking,
            btype: "guest",
            displayDate: booking.date || guest.date
          });
        });
      } else {
        flattened.push({
          ...booking,
          mainUserId: booking.id,
          parentBooking: booking,
          btype: "main",
          displayDate: booking.date
        });
      }
    });
    return flattened;
  };

  const processedList = useMemo(() => {
    // Single unified list: show upcoming bookings
    const flat = getFlattenedBookings(upcomingList);

    return flat.filter(item => {
      // 1. Search text filter
      if (searchText) {
        const query = searchText.toLowerCase();
        const matchesName = item.username?.toLowerCase().includes(query);
        const matchesPhone = item.phone?.toLowerCase().includes(query);
        const matchesService = item.servicename?.toLowerCase().includes(query);
        const matchesEmployee = item.employeename?.toLowerCase().includes(query);
        if (!matchesName && !matchesPhone && !matchesService && !matchesEmployee) {
          return false;
        }
      }

      // 2. Status filter
      if (statusFilter) {
        const status = statusFilter.toLowerCase();
        if (status === "confirmed" && (item.bookingstatus !== 0 || item.checkinstatus !== 0)) return false;
        if (status === "inservice" && item.bookingstatus !== 4) return false;
        if (status === "completed" && item.bookingstatus !== 3) return false;
        if (status === "cancelled" && item.bookingstatus !== 1) return false;
        if (status === "noshow" && item.bookingstatus !== 2) return false;
      }

      return true;
    });
  }, [upcomingList, searchText, statusFilter]);

  const stats = useMemo(() => {
    const flatUpcoming = getFlattenedBookings(upcomingList);
    const todayStr = moment().format("YYYY-MM-DD");
    const todayList = flatUpcoming.filter(item => item.displayDate === todayStr);

    return {
      todayBookings: todayList.length,
      completedToday: todayList.filter(item => item.bookingstatus === 3).length,
      pendingToday: todayList.filter(item => item.bookingstatus === 0 && item.checkinstatus === 0).length,
      totalBookings: flatUpcoming.length
    };
  }, [upcomingList]);

  // Status badge style helper
  const getStatusBadgeStyles = (item) => {
    if (item.bookingstatus === 3) {
      return { bg: "#E6F4FF", color: "#0958D9", text: "Completed" };
    }
    if (item.bookingstatus === 1) {
      return { bg: "#FFF1F0", color: "#FF4D4F", text: "Cancelled" };
    }
    if (item.bookingstatus === 2) {
      return { bg: "#FFFBE6", color: "#D4B106", text: "No Show" };
    }
    if (item.bookingstatus === 4) {
      return { bg: "#E6F4FF", color: "#0958D9", text: "In Progress" };
    }
    if (item.bookingstatus === 5) {
      return { bg: "#E6FFFB", color: "#08979C", text: "Ready to Complete" };
    }
    if (item.checkinstatus === 1) {
      return { bg: "#E6F4FF", color: "#0958D9", text: "Checked In" };
    }
    if (item.bookingstatus === 0 && item.checkinstatus === 0) {
      return { bg: "#E6F4FF", color: "#0958D9", text: "Confirmed" };
    }

  };

  // Payment badge style helper
  const getPaymentBadgeStyles = (item) => {
    const bookingStatus = Number(item.bookingstatus ?? item.bookingStatus ?? 0);
    const isPaymentDone = Number(item.isPaymentDone ?? 0);
    const cancelBy = String(item.cancel_by_type == "serviceProvider" || item.cancel_by_type == "user" || "");
    console.log("cancelBy", cancelBy);
    const paymentBy = String(item.paymentBy || item.payment_by || "").toLowerCase();

    if ((bookingStatus === 4 || bookingStatus === 0 || bookingStatus === 5) && isPaymentDone === 0) {
      return { bg: "#FFF7E6", color: "#D46B08", text: "Pending" };
    }

    if (isPaymentDone === 1 && paymentBy === "cash") {
      return { bg: "#E6F4FF", color: "#0958D9", text: "Paid(cash)" };
    }

    if ((isPaymentDone === 1 && paymentBy === "card") || (cancelBy)) {
      return { bg: "#E6F4FF", color: "#0958D9", text: "Paid(card)" };
    }

    return { bg: "#F5F5F5", color: "#595959", text: "-" };
  };

  // --- Real-time Sockets ---

  let allDataArray = [];
  useEffect(() => {
    if (window.io) {
      window.io.socket.on("serviceprovider", async (msg) => {
        if (
          msg.action == "auto_no_show_user_booking_alert" ||
          msg.action == "auto_start_service_user_booking_alert" ||
          msg.action == "cancelBookingUser" ||
          msg.action == "cancelledAllBookingBySpa" ||
          msg.action == "cancelBookingSpa" ||
          msg.action == "booking_time_started" ||
          msg.action == "auto_complete_socket_solo_booking" ||
          msg.action == "completeAllBooking"
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
          }
          // else if (msg.action == "auto_no_show_user_booking_alert") {
          //   if (msg?.starttype === "only_main_user_solo") {
          //     dispatch(handleTargetProcess("removeBooking"));
          //   } else {
          //     dispatch(handleTargetProcess("noshow"));
          //   }
          // }
           else if (msg.action == "cancelBookingUser") {
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
          if (currentPage === 1) {
            getUpcomingList();
          } else {
            setCurrentPage(1);
          }
          getEmployee();
        }

        if (msg.action === "fiveminReminder") {
          if (msg?.spa_id == login?.id) {
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
          }
        }

        if (msg?.action == "towHoursReminder") {
          getFailedPaymentList();
        }

        // Before completion reminder → mark booking ready to complete (status 5)
        if (msg?.action === "beforeCompletionReminder") {
          const bookingId = msg?.bookingid ?? msg?.message;
          if (bookingId != null && bookingId !== "") {
            const markStatus5 = (list = []) =>
              (list || []).map((item) => {
                if (item?.id == bookingId || item?.bookingId == bookingId) {
                  return { ...item, bookingstatus: 5 };
                }
                if (Array.isArray(item?.guestList)) {
                  return {
                    ...item,
                    guestList: item.guestList.map((guest) =>
                      guest?.id == bookingId || guest?.bookingId == bookingId
                        ? { ...guest, bookingstatus: 5 }
                        : guest
                    ),
                  };
                }
                return item;
              });

            setUpcomingList((prev) => {
              const next = markStatus5(prev);
              dispatch(handleUpcomingData(next));
              dispatch(handleBookingData(next));
              return next;
            });

            setListViewAppointment((prev) => {
              if (!prev) return prev;
              const openId = prev.bookingId || prev.id;
              if (openId == bookingId) {
                return { ...prev, bookingstatus: 5 };
              }
              return prev;
            });

            // Refresh schedule summary for list + calendar sidebars
            fetchListScheduleSummary(filterDate ? new Date(filterDate) : new Date());
            calendarRef.current?.refreshScheduleSummary?.({
              bookingId,
              bookingstatus: 5,
            });
          }
        }

         if (msg?.action === "auto_no_show_user_booking_alert") {
          const bookingId = msg?.bookingid ?? msg?.message;
          if (bookingId != null && bookingId !== "") {
            const markStatus2 = (list = []) =>
              (list || []).map((item) => {
                if (item?.id == bookingId || item?.bookingId == bookingId) {
                  return { ...item, bookingstatus: 2 };
                }
                if (Array.isArray(item?.guestList)) {
                  return {
                    ...item,
                    guestList: item.guestList.map((guest) =>
                      guest?.id == bookingId || guest?.bookingId == bookingId
                        ? { ...guest, bookingstatus: 2 }
                        : guest
                    ),
                  };
                }
                return item;
              });

            setUpcomingList((prev) => {
              const next = markStatus2(prev);
              dispatch(handleUpcomingData(next));
              dispatch(handleBookingData(next));
              return next;
            });

            setListViewAppointment((prev) => {
              if (!prev) return prev;
              const openId = prev.bookingId || prev.id;
              if (openId == bookingId) {
                return { ...prev, bookingstatus: 2 };
              }
              return prev;
            });

            // Refresh schedule summary for list + calendar sidebars
            fetchListScheduleSummary(filterDate ? new Date(filterDate) : new Date());
            calendarRef.current?.refreshScheduleSummary?.({
              bookingId,
              bookingstatus: 2,
            });
          }
        }
      });
    }
  }, [window.io, upcomingList]);

  // Handle Redux updates
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
      });
      dispatch(handleUpcomingData(list));
    }
    setUpcomingList(list);
  };

  const handleSwitchToList = () => {
    setDashboardTab("booking");
    setViewMode("list");
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      getUpcomingList();
    }
  };

  const handleSwitchToCalendar = () => {
    handleCloseListSidebar();
    setDashboardTab("booking");
    setViewMode("calendar");
  };

  const handleOpenTherapistMapping = () => {
    handleCloseListSidebar();
    setSearchText("");
    setDashboardTab("therapist-mapping");
  };

  const handleOpenBookingTab = () => {
    setSearchText("");
    setDashboardTab("booking");
  };

  const getNextHalfHourSlot = (fromDate = moment()) => {
    const current = moment(fromDate).seconds(0).milliseconds(0);
    const remainder = current.minutes() % 30;
    if (remainder === 0) return current;
    return current.clone().add(30 - remainder, "minutes");
  };

  const getListServiceDuration = (serviceValue) =>
    listServiceOptions.find((option) => option.value === serviceValue)?.duration || DEFAULT_SLOT_MINUTES;

  const buildListSlotEnd = (start, serviceValue) =>
    moment(start).add(getListServiceDuration(serviceValue), "minutes").toDate();

  const fetchListServices = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.GET_MY_SERVICES_LIST);
      if (res?.status) {
        const options = [];
        res?.data?.data?.forEach((s) => {
          options.push({
            value: String(s?.id),
            label: s?.name,
            image: s?.image,
            price: s?.price,
            time: { hour: s?.hour, minute: s?.minutes },
            calculatedTime: `(${s?.hour * 60 + s?.minutes} min)`,
            duration: (s?.hour || 0) * 60 + (s?.minutes || 0),
          });
        });
        setListServiceOptions(options);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const fetchListScheduleSummary = async (date = new Date()) => {
    const current = moment(date);
    const start_date = current.clone().startOf("week").format("YYYY-MM-DD");
    const end_date = current.clone().endOf("week").format("YYYY-MM-DD");
    try {
      let url = `${API_ROUTER?.GET_SUMMARY_LIST_BY_DATE_RANGE}?fromDate=${start_date}&toDate=${end_date}`;
      if (selectedId !== undefined && selectedId !== null) {
        url += `&employeeId=${selectedId}`;
      }
      const res = await axiosApiCall.get(url);
      if (res?.status) {
        setListScheduleSummary(res?.data);
      }
    } catch {
      // Schedule summary is optional for sidebar time validation fallback
    }
  };

  const parseScheduleSlotStart = (payload) => {
    if (payload && payload.date && payload.firstSlot) {
      const combined = moment(`${payload.date} ${payload.firstSlot}`, [
        "YYYY-MM-DD hh:mm:ss A",
        "YYYY-MM-DD hh:mm A",
        "YYYY-MM-DD HH:mm:ss",
        "YYYY-MM-DD HH:mm",
      ]);
      if (combined.isValid()) {
        return combined.toDate();
      }
    }

    const candidates = [];

    const pushCandidate = (item) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) return;

      const dateStr =
        item.date ||
        item.startDate ||
        item.start_date ||
        item.orderDate ||
        item.suggestedDate ||
        item.availableDate;
      const timeStr =
        item.time ||
        item.start_time ||
        item.startTime ||
        item.slot_time ||
        item.suggestedTime ||
        item.availableTime;
      const timeType = item.time_type || item.start_type || item.timeType || "";

      if (!dateStr) return;

      const dateKey = moment(dateStr).isValid()
        ? moment(dateStr).format("YYYY-MM-DD")
        : String(dateStr);

      let parsed = null;
      if (timeStr) {
        const withType = `${dateKey} ${timeStr} ${timeType}`.trim();
        parsed = moment(withType, [
          "YYYY-MM-DD hh:mm A",
          "YYYY-MM-DD hh:mm:ss A",
          "YYYY-MM-DD hh:mm a",
          "YYYY-MM-DD hh:mm:ss a",
          "YYYY-MM-DD HH:mm:ss",
          "YYYY-MM-DD HH:mm",
        ], true);

        if (!parsed.isValid()) {
          parsed = moment(`${dateKey} ${timeStr}`, [
            "YYYY-MM-DD hh:mm A",
            "YYYY-MM-DD hh:mm:ss A",
            "YYYY-MM-DD hh:mm a",
            "YYYY-MM-DD hh:mm:ss a",
            "YYYY-MM-DD HH:mm:ss",
            "YYYY-MM-DD HH:mm",
          ]);
        }
      } else {
        parsed = moment(dateKey, "YYYY-MM-DD");
      }

      if (parsed?.isValid()) {
        candidates.push(parsed);
      }
    };

    const walk = (value) => {
      if (!value) return;
      if (Array.isArray(value)) {
        value.forEach(walk);
        return;
      }
      if (typeof value !== "object") return;

      pushCandidate(value);
      ["data", "schedules", "slots", "list", "availableSlots", "nextSlot"].forEach((key) => {
        if (value[key] != null) walk(value[key]);
      });
    };

    walk(payload);
    if (!candidates.length) return null;

    candidates.sort((a, b) => a.valueOf() - b.valueOf());
    const upcoming = candidates.find((item) => item.isSameOrAfter(moment(), "minute"));
    return (upcoming || candidates[0]).toDate();
  };

  const fetchSuggestedBookingSlot = async (employeeId = selectedId) => {
    const currentDate = moment().format("YYYY-MM-DD");

    try {
      const url = `${API_ROUTER?.GET_SCHEDULES}?date=${currentDate}`;
      const res = await axiosApiCall.get(url);
      if (!res?.status) return null;
      return parseScheduleSlotStart(res?.data?.data ?? res?.data);
    } catch {
      return null;
    }
  };

  const handleListNewBooking = async () => {
    setListEditAppointment(null);
    setListViewAppointment(null);
    setListSelectedService("");

    const suggestedStart = await fetchSuggestedBookingSlot(selectedId);
    const start = suggestedStart || getNextHalfHourSlot().toDate();

    setListSelectedSlot({ start, end: buildListSlotEnd(start, "") });
    setShowListSidebar(true);
    fetchListServices();
    fetchListScheduleSummary(start);
  };

  const handleCloseListSidebar = () => {
    setShowListSidebar(false);
    setListSelectedSlot(null);
    setListSelectedService("");
    setListEditAppointment(null);
    setListViewAppointment(null);
    setSelectedId(0);
  };

  const handleListServiceChange = (serviceValue) => {
    setListSelectedService(serviceValue);
    setListSelectedSlot((currentSlot) => {
      if (!currentSlot) return currentSlot;
      return {
        start: currentSlot.start,
        end: buildListSlotEnd(currentSlot.start, serviceValue),
      };
    });
  };

  const handleListSlotChange = (start) => {
    setListSelectedSlot({
      start,
      end: buildListSlotEnd(start, listSelectedService),
    });
    fetchListScheduleSummary(start);
  };

  const handleListBookingSuccess = () => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      getUpcomingList();
    }
  };

  const handlePaymentRecoverySuccess = () => {
    handleCloseListViewSidebar();
    handleListBookingSuccess();
    fetchListScheduleSummary(filterDate ? new Date(filterDate) : new Date());
    calendarRef.current?.onPaymentSuccess?.();
  };

  const handleCalendarNewBooking = () => {
    calendarRef.current?.openNewAppointment();
  };

  const handleBookingTabNewBooking = () => {
    setSearchText("");
    setDashboardTab("booking");
    if (viewMode === "calendar") {
      handleCalendarNewBooking();
    } else {
      handleListNewBooking();
    }
  };

  const newBookingButtonIcon = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "8px" }}>
      <path d="M10.6667 2C10.83 2.00002 10.9876 2.05997 11.1096 2.16848C11.2316 2.27698 11.3096 2.4265 11.3287 2.58867L11.3333 2.66667V3.33333H12.6667C13.0031 3.33323 13.327 3.46027 13.5737 3.689C13.8204 3.91772 13.9714 4.23123 13.9967 4.56667L14 4.66667V12.6667C14.0001 13.0031 13.8731 13.327 13.6443 13.5737C13.4156 13.8204 13.1021 13.9714 12.7667 13.9967L12.6667 14H3.33333C2.99695 14.0001 2.67296 13.8731 2.4263 13.6443C2.17965 13.4156 2.02856 13.1021 2.00333 12.7667L2 12.6667V4.66667C1.99989 4.33028 2.12694 4.00629 2.35566 3.75963C2.58439 3.51298 2.8979 3.3619 3.23333 3.33667L3.33333 3.33333H4.66667V2.66667C4.66686 2.49675 4.73192 2.33331 4.84857 2.20975C4.96521 2.0862 5.12464 2.01184 5.29426 2.00189C5.46389 1.99193 5.63092 2.04712 5.76122 2.15618C5.89152 2.26524 5.97526 2.41994 5.99533 2.58867L6 2.66667V3.33333H10V2.66667C10 2.48986 10.0702 2.32029 10.1953 2.19526C10.3203 2.07024 10.4899 2 10.6667 2ZM12.6667 8H3.33333V12.6667H12.6667V8ZM12.6667 4.66667H3.33333V6.66667H12.6667V4.66667Z" fill="white" />
    </svg>
  );

  // --- Effects ---

  useEffect(() => {
    getEmployee();
    getProfileInfo();
    dispatch(handlePaymentFailedModal(false));
  }, []);

  useEffect(() => {
    getUpcomingList();
  }, [currentPage, selectedId, filterDate, statusFilter, calenderRefresh]);

  useEffect(() => {
    setGuestIds(null);
    setMainUserId(null);
    handleTargetData();
  }, [appointmentTarget]);

  // console.log("failedModalData", failedModalData);
  // console.log("selectedData", selectedData);

  return (
    <>
      <PageWrapper>
        <DashboardContainer>
          {dashboardTab === "therapist-mapping" ? (
            <>
              <HeaderSection>
                <HeaderRow>
                  <HeaderLeft>
                    <PageTitle>Therapist Mapping</PageTitle>
                    <SearchWrapper>
                      <SearchIconWrapper>
                        <InlineSVG src={Search_icon_appointment} />
                      </SearchIconWrapper>
                      <SearchInput
                        placeholder="Search service, therapist and phone"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                    </SearchWrapper>
                  </HeaderLeft>

                  <HeaderActions>
                    <ActionButton type="button" className="active-tab">
                      <InlineSVG src={TherapistMappingIcon} style={{ marginRight: "8px" }} />
                      Therapist Mapping
                    </ActionButton>

                    <ActionButton type="button" className="primary" onClick={handleBookingTabNewBooking}>
                      {newBookingButtonIcon}
                      New Booking
                    </ActionButton>
                  </HeaderActions>
                </HeaderRow>
              </HeaderSection>

              <TherapistMapping searchText={searchText} />
            </>
          ) : viewMode === "list" ? (
            <>
              <HeaderSection>
                {/* Header Row */}
                <HeaderRow>
                  <HeaderLeft>
                    <PageTitle>Booking Dashboard</PageTitle>
                    <SearchWrapper>
                      <SearchIconWrapper>
                        <InlineSVG src={Search_icon_appointment} />
                      </SearchIconWrapper>
                      <SearchInput
                        placeholder="Search customer name or phone"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                    </SearchWrapper>
                  </HeaderLeft>

                  <HeaderActions>
                    {/* <Link href={PATH_SCHEDULER?.scheduler || "/scheduler"} style={{ textDecoration: 'none' }}>
                      <ActionButton className="secondary">
                        <InlineSVG src={SlotManagementTimeIcon} style={{ marginRight: '8px' }} />
                        Slot Management
                      </ActionButton>
                    </Link> */}

                    <ActionButton type="button" className="secondary" onClick={handleOpenTherapistMapping}>
                      <InlineSVG src={TherapistMappingIcon} style={{ marginRight: '8px' }} />
                      Therapist Mapping
                    </ActionButton>

                    <ActionButton type="button" className="primary" onClick={handleListNewBooking}>
                      {newBookingButtonIcon}
                      New Booking
                    </ActionButton>

                    <ViewToggle style={{ marginLeft: '12px' }}>
                      <ToggleButton
                        active={viewMode === "list"}
                        onClick={handleSwitchToList}
                      >
                        List
                      </ToggleButton>
                      <ToggleButton
                        active={viewMode === "calendar"}
                        onClick={handleSwitchToCalendar}
                      >
                        Calendar
                      </ToggleButton>
                    </ViewToggle>
                  </HeaderActions>
                </HeaderRow>
              </HeaderSection>

              <ListLayoutWrapper>
                <ListMainArea>
                  <MiddleSection>
                    {/* Stats / KPI Cards */}
                    <StatsRow>
                      <StatCard>
                        <StatInfo>
                          <StatLabel>Today&apos;s Bookings</StatLabel>
                          <StatValue>{analyticsData?.todayNewBookings}</StatValue>
                        </StatInfo>
                        <StatIconContainer>
                          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="40" height="40" rx="8" fill="#3B67A3" />
                            <path d="M24 11C24.2449 11 24.4813 11.09 24.6644 11.2527C24.8474 11.4155 24.9643 11.6397 24.993 11.883L25 12V13H27C27.5046 12.9998 27.9906 13.1904 28.3605 13.5335C28.7305 13.8766 28.9572 14.3468 28.995 14.85L29 15V27C29.0002 27.5046 28.8096 27.9906 28.4665 28.3605C28.1234 28.7305 27.6532 28.9572 27.15 28.995L27 29H13C12.4954 29.0002 12.0094 28.8096 11.6395 28.4665C11.2695 28.1234 11.0428 27.6532 11.005 27.15L11 27V15C10.9998 14.4954 11.1904 14.0094 11.5335 13.6395C11.8766 13.2695 12.3468 13.0428 12.85 13.005L13 13H15V12C15.0003 11.7451 15.0979 11.5 15.2728 11.3146C15.4478 11.1293 15.687 11.0178 15.9414 11.0028C16.1958 10.9879 16.4464 11.0707 16.6418 11.2343C16.8373 11.3979 16.9629 11.6299 16.993 11.883L17 12V13H23V12C23 11.7348 23.1054 11.4804 23.2929 11.2929C23.4804 11.1054 23.7348 11 24 11ZM27 20H13V27H27V20ZM27 15H13V18H27V15Z" fill="white" />
                          </svg>

                        </StatIconContainer>
                      </StatCard>

                      <StatCard>
                        <StatInfo>
                          <StatLabel>Completed Today</StatLabel>
                          <StatValue>{analyticsData?.todayCompletedBookings}</StatValue>
                        </StatInfo>
                        <StatIconContainer>
                          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="40" height="40" rx="8" fill="#3B67A3" />
                            <path d="M20 29C24.9706 29 29 24.9706 29 20C29 15.0294 24.9706 11 20 11C15.0294 11 11 15.0294 11 20C11 24.9706 15.0294 29 20 29Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M19 16V21H24" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>

                        </StatIconContainer>
                      </StatCard>

                      <StatCard>
                        <StatInfo>
                          <StatLabel>Pending</StatLabel>
                          <StatValue>{analyticsData?.totalPendingBookings}</StatValue>
                        </StatInfo>
                        <StatIconContainer>
                          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="40" height="40" rx="8" fill="#3B67A3" />
                            <path d="M20 29C24.9706 29 29 24.9706 29 20C29 15.0294 24.9706 11 20 11C15.0294 11 11 15.0294 11 20C11 24.9706 15.0294 29 20 29Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M19 16V21H24" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>

                        </StatIconContainer>
                      </StatCard>

                      <StatCard>
                        <StatInfo>
                          <StatLabel>Total Bookings</StatLabel>
                          <StatValue>{analyticsData?.totalBookings}</StatValue>
                        </StatInfo>
                        <StatIconContainer>
                          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="40" height="40" rx="8" fill="#3B67A3" />
                            <path d="M17 21C19.2091 21 21 19.2091 21 17C21 14.7909 19.2091 13 17 13C14.7909 13 13 14.7909 13 17C13 19.2091 14.7909 21 17 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M24 27C24 23.686 20.866 21 17 21C13.134 21 10 23.686 10 27M23 21C23.6684 21 24.3261 20.8324 24.9131 20.5127C25.5 20.193 25.9975 19.7313 26.3601 19.1698C26.7227 18.6083 26.9388 17.9649 26.9886 17.2984C27.0385 16.6319 26.9205 15.9635 26.6456 15.3543C26.3706 14.7451 25.9473 14.2145 25.4144 13.811C24.8816 13.4076 24.2561 13.144 23.5952 13.0446C22.9342 12.9451 22.2589 13.0128 21.6309 13.2415C21.0028 13.4703 20.4421 13.8527 20 14.354" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M30 27.0001C30 23.6861 26.866 21.0001 23 21.0001C22.193 21.0001 20.897 20.7071 20 19.7651" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>

                        </StatIconContainer>
                      </StatCard>
                    </StatsRow>

                    {/* Filters Row */}
                    <FilterRow>
                      <FilterGroupLeft>
                        <DropdownSelect
                          value={statusFilter}
                          onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(1);
                          }}
                        >
                          <option value="">All Statuses</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="inservice">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="noshow">No Show</option>
                        </DropdownSelect>

                        <DropdownSelect
                          value={selectedId}
                          onChange={(e) => {
                            setSelectedId(Number(e.target.value));
                            setCurrentPage(1);
                          }}
                        >
                          <option value={0}>All Therapists</option>
                          {providerData.map((prov) => (
                            <option key={prov.id} value={prov.id}>
                              {prov.name}
                            </option>
                          ))}
                        </DropdownSelect>

                        {/* Custom Styled Date Picker Field */}
                        <ReactDatePicker
                          selected={filterDate ? moment(filterDate).toDate() : null}
                          onChange={(date) => {
                            setFilterDate(date ? moment(date).format("YYYY-MM-DD") : null);
                            setCurrentPage(1);
                          }}
                          placeholderText="Filter by date"
                          isClearable
                          onKeyDown={(e) => {
                            e.preventDefault();
                          }}
                          customInput={<DatePickerInput />}
                        />
                      </FilterGroupLeft>
                    </FilterRow>
                  </MiddleSection>

                  <TableSection>
                    {/* Table List */}
                    {processedList.length > 0 ? (
                      <InfiniteScroll
                        className="pageScroll"
                        dataLength={processedList.length}
                        next={() => setCurrentPage((prev) => prev + 1)}
                        hasMore={isNextPage}
                        loader={<div style={{ visibility: "hidden" }}>{t('done') || 'done'}</div>}
                      >
                        <StyledTable>
                          <thead>
                            <tr>
                              <Th>Booking</Th>
                              <Th>Customer</Th>
                              <Th>Service</Th>
                              <Th>Therapist</Th>
                              <Th>Date & Time</Th>
                              <Th>Status</Th>
                              <Th>Payment</Th>
                              <Th style={{ textAlign: "center", width: "170px" }}>Actions</Th>
                            </tr>
                          </thead>
                          <tbody>
                            {processedList.map((item, idx) => {

                              const statusBadge = getStatusBadgeStyles(item);
                              const paymentBadge = getPaymentBadgeStyles(item);

                              return (
                                <Tr key={`${item.id}-${idx}`} className={item.btype === "guest" ? "guest-row" : ""}>
                                  <Td style={{ color: "#7A869A", fontSize: "13px" }}>
                                    BK{item.id}
                                  </Td>
                                  <Td>
                                    <CustomerInfo>
                                      <CustomerName>
                                        {item.username}
                                        {item.btype === "guest" && (
                                          <GuestBadge>Guest</GuestBadge>
                                        )}
                                      </CustomerName>
                                      <CustomerPhone>{item.countrycode} {item.phone || "No phone"}</CustomerPhone>
                                    </CustomerInfo>
                                  </Td>
                                  <Td>
                                    <div style={{ fontWeight: 500, color: "#295086" }}>{item.servicename}</div>
                                    <div style={{ fontSize: "12px", color: "#7A869A", marginTop: "2px" }}>
                                      {item.hour * 60 + item.minutes} min
                                    </div>
                                  </Td>
                                  <Td style={{ color: "#295086", fontWeight: 500 }}>{item.employeename || "Unassigned"}</Td>
                                  <Td>
                                    <div style={{ color: "#295086", fontWeight: 500 }}>
                                      {moment(item.displayDate).format("MMM D, YYYY")}
                                    </div>
                                    <div style={{ fontSize: "12px", color: "#7A869A", marginTop: "2px" }}>
                                      {item.slot_time && moment(item.slot_time, "HH:mm").format("hh:mm A")}
                                    </div>
                                  </Td>
                                  <Td>
                                    <PillBadge bgColor={statusBadge.bg} color={statusBadge.color}>
                                      {statusBadge.text}
                                    </PillBadge>
                                  </Td>
                                  <Td>
                                    <PillBadge bgColor={paymentBadge.bg} color={paymentBadge.color}>
                                      {paymentBadge.text}
                                    </PillBadge>
                                  </Td>
                                  <Td style={{ width: "170px" }}>
                                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                                      {/* Icon Actions matching Figma in order (Edit/Modals, Delete/Cancel, View) */}
                                      <ActionIconGroup>
                                        {/* Edit booking details - only for confirmed (bookingstatus == 0) */}
                                        {Number(item.bookingstatus) === 0 && (
                                          <ActionIconButton
                                            className="action-edit"
                                            title="Edit Booking"
                                            onClick={() => handleListEditClick(item)}
                                          >
                                            <InlineSVG src={EditV2_icon} />
                                          </ActionIconButton>
                                        )}

                                        {/* Delete/Cancel */}
                                        <ActionIconButton
                                          className="action-delete"
                                          title="Cancel Booking"
                                          onClick={() => handleCancelClick(item)}
                                          disabled={item.bookingstatus !== 0}
                                        >
                                          <InlineSVG src={DeleteV2_icon} />
                                        </ActionIconButton>

                                        {/* View Info */}
                                        <ActionIconButton
                                          className="action-view"
                                          title="View Info"
                                          onClick={() => handleListViewClick(item)}
                                        >
                                          <InlineSVG src={ViewShow_icon} />
                                        </ActionIconButton>

                                        {/* Special notes info */}
                                        <ActionIconButton
                                          title="View Notes/Special Requests"
                                          onClick={() => handleShowNoteModal(item)}
                                          style={{
                                            color: "#FF9800",
                                            visibility: item.notes ? "visible" : "hidden"
                                          }}
                                        >
                                          <InlineSVG src={Info_icon} />
                                        </ActionIconButton>
                                      </ActionIconGroup>
                                    </div>
                                  </Td>
                                </Tr>
                              );
                            })}
                          </tbody>
                        </StyledTable>
                      </InfiniteScroll>
                    ) : (
                      <EmptyState>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        <span>No appointments found matching the criteria.</span>
                      </EmptyState>
                    )}
                  </TableSection>
                </ListMainArea>

                {showListSidebar && listSelectedSlot && !listEditAppointment && !listViewAppointment && (
                  <ListSidebarWrap>
                    <NewAppointmentSidebar
                      selectedSlot={listSelectedSlot}
                      onClose={handleCloseListSidebar}
                      selectedService={listSelectedService}
                      onServiceChange={handleListServiceChange}
                      onSlotChange={handleListSlotChange}
                      serviceOptions={listServiceOptions}
                      scheduleSummary={listScheduleSummary}
                      selectedProvider={providerData.find((u) => u.id === selectedId)}
                      setSelectedId={setSelectedId}
                      onSuccess={handleListBookingSuccess}
                    />
                  </ListSidebarWrap>
                )}

                {listViewAppointment && !listEditAppointment && (
                  <ListSidebarWrap>
                    <BookedAppointmentDetails
                      bookedAppointment={listViewAppointment}
                      onClose={handleCloseListViewSidebar}
                      setIsEditing={handleListEditFromView}
                      onSuccess={() => {
                        handleListBookingSuccess();
                      }}
                      onStatusUpdate={handleListViewStatusUpdate}
                      scheduleSummary={listScheduleSummary}
                    />
                  </ListSidebarWrap>
                )}

                {listEditAppointment && (
                  <ListSidebarWrap>
                    <EditAppointmentSidebar
                      bookedAppointment={listEditAppointment}
                      onClose={() => {
                        handleCloseListEditSidebar();
                        if (listViewAppointment) {
                          handleListViewStatusUpdate(listEditAppointment);
                        } else {
                          setListSelectedSlot(null);
                          setListSelectedService("");
                        }
                        handleListBookingSuccess();
                      }}
                      setIsEditing={() => handleCloseListEditSidebar()}
                      selectedService={listSelectedService}
                      onServiceChange={handleListServiceChange}
                      onSlotChange={handleListSlotChange}
                      serviceOptions={listServiceOptions}
                      scheduleSummary={listScheduleSummary}
                      selectedProvider={
                        providerData.find(
                          (u) =>
                            u.id ===
                            (listEditAppointment?.employee?.employeeId ||
                              listEditAppointment?.employee?.id ||
                              listEditAppointment?.employee_id ||
                              listEditAppointment?.employeeId)
                        ) || providerData.find((u) => u.id === selectedId)
                      }
                      onSuccess={() => {
                        handleCloseListEditSidebar();
                        if (!listViewAppointment) {
                          setListSelectedSlot(null);
                          setListSelectedService("");
                        }
                        handleListBookingSuccess();
                      }}
                    />
                  </ListSidebarWrap>
                )}
              </ListLayoutWrapper>
            </>
          ) : (
            /* Calendar View */
            <>
              <HeaderSection>
                {/* Header Row */}
                <HeaderRow>
                  <HeaderLeft>
                    <PageTitle>Booking Dashboard</PageTitle>
                    {/* <SearchWrapper>
                      <SearchIconWrapper>
                        <InlineSVG src={Search_icon_appointment} />
                      </SearchIconWrapper>
                      <SearchInput
                        placeholder="Search customer name or phone"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                    </SearchWrapper> */}
                  </HeaderLeft>

                  <HeaderActions>
                    {/* <Link href={PATH_SCHEDULER?.scheduler || "/scheduler"} style={{ textDecoration: 'none' }}>
                      <ActionButton className="secondary">
                        <InlineSVG src={SlotManagementTimeIcon} style={{ marginRight: '8px' }} />
                        Slot Management
                      </ActionButton>
                    </Link> */}

                    <ActionButton type="button" className="secondary" onClick={handleOpenTherapistMapping}>
                      <InlineSVG src={TherapistMappingIcon} style={{ marginRight: '8px' }} />
                      Therapist Mapping
                    </ActionButton>

                    <ActionButton type="button" className="primary" onClick={handleCalendarNewBooking}>
                      {newBookingButtonIcon}
                      New Booking
                    </ActionButton>

                    <ViewToggle style={{ marginLeft: '12px' }}>
                      <ToggleButton
                        active={viewMode === "list"}
                        onClick={handleSwitchToList}
                      >
                        List
                      </ToggleButton>
                      <ToggleButton
                        active={viewMode === "calendar"}
                        onClick={handleSwitchToCalendar}
                      >
                        Calendar
                      </ToggleButton>
                    </ViewToggle>
                  </HeaderActions>
                </HeaderRow>
              </HeaderSection>

              <div style={{ background: "#FFFFFF", padding: "24px" }}>
                {/* <CustomCalender
                  provider={providerData}
                  upcoming={upcomingList}
                  setSelectedId={setSelectedId}
                  currentUser={selectedId}
                  unavaliableList={unavaliableList}
                  getUnavailableList={getUnavailableList}
                  updatebookingcalender={updatebookingcalender}
                  setCurrentPage={setCurrentPage}
                /> */}
                <NewCustomCalender
                  ref={calendarRef}
                  provider={providerData}
                  setSelectedId={setSelectedId}
                  currentUser={selectedId}
                />
              </div>
            </>
          )}
        </DashboardContainer>
      </PageWrapper>

      {/* --- Modals Wiring --- */}

      <StartServiceModal
        show={showStartServiceModal}
        handleClose={() => {
          setStartServiceModal(false);
          setShowNoShowModal(false);
        }}
        serviceData={StartServiceTarget}
        mainId={mainUserId}
        guest_ids={guestIds}
        setupdatebookinU={setupdatebookinU}
      />

      <NoShowModal
        show={showNoShowModal}
        handleClose={() => {
          setStartServiceModal(false);
          setShowNoShowModal(false);
        }}
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
        handleClose={() => dispatch(handlePaymentFailedModal(false))}
        data={failedModalData || selectedData}
        onPaymentSuccess={handlePaymentRecoverySuccess}
      />

      <PaymentOption
        show={openPaymentOption}
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

      <NoteList
        show={showNoteModal}
        onHide={() => setShowNoteModal(false)}
        note={noteTarget}
      />

      <CancelAppointmentModal
        show={showCancelModal}
        handleClose={() => setShowCancelModal(false)}
        data={selectedCancelData}
        setcancelBooking={setupdatebookinU}
        upcomingCalenderData={upcomingList}
      />

      <UserInfoModal
        show={showUserInfoModal}
        handleClose={() => setShowUserInfoModal(false)}
        data={userInfoData}
      />
    </>
  );
}
