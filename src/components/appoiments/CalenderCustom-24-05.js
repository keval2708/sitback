import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import AddAppointmentFromCalender from "./modal/addAppointmentFromCalender";
import AddCardModal from "./modal/addCardModal";
import AddOfflineCardModal from "./modal/addOfflinePaymentModal";
import CancelAppointmentModal from "./modal/cancelAppointmentModal";
import Loader from "../shared/spinner/loader";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector } from "@/redux/authCheck";
import { PATH_AUTH, PATH_DASHBOARD } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, Image } from "@/styles/global/main.style";
import { CalendarLayoutWrapperMain } from "@/styles/pages/appointments.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES, userDummyImage } from "@/utils/constants";
import { removeCookie } from "@/utils/cookie";
const CustomCalender = ({
  provider,
  setSelectedId,
  upcoming,
  currentUser,
  setcancelBooking,
  unavaliableList,
  getUnavailableList,
  setSmModalHide,
}) => {
  //hooks
  const { toaster } = useToaster();
  const calenderRef = useRef();
  const { push } = useRouter();
  const { login } = useSelector(authCheckSliceSelector);

  // States
  const [calendarConfig, setCalendarConfig] = useState({
    monthyear: moment().startOf("month").format("YYYY-MM"),
    currentMonth: 0,
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [loading, setLoading] = useState(false);
  const [upcomingCalenderData, setUpcomingCalenderData] = useState([]);

  //No Show
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [selectedEmployeeColor, setSelectedEmployeeColor] = useState(); // #95CCD5

  const [showAddModal, setShowAddModal] = useState(false);
  const [showOfflineCardModal, setOfflineCardModal] = useState(false);
  const [showOnlineCardModal, setOnlineCardModal] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState(null);

  // useEffect(() => {
  //   setSmModalHide(!showOfflineCardModal);
  // }, [!showOfflineCardModal])

  // useEffect(() => {
  //   setSmModalHide(!showOnlineCardModal);
  // }, [!showOnlineCardModal])

  const handleUserClick = (userId) => {
    // setLoading(true);
    const user = provider.find((user) => user.id === userId);
    setSelectedEmployeeColor(user.color);
    setSelectedId(user.id);
    setSelectedUser(user);
    // setLoading(false)
  };

  const UserList = () => (
    <div className="user-list">
      <ul>
        {provider?.map((user, index) => {
          const isActive = selectedUser?.id === user?.id;
          const activeStyle = isActive
            ? { background: `${selectedEmployeeColor ? selectedEmployeeColor : "#95CCD5"}` }
            : {};
          return (
            <>
              <li key={index} onClick={() => handleUserClick(user?.id)} style={activeStyle}>
                <div className="user-wrapper">
                  <Image
                    alt="sitback"
                    src={user ? user?.image : "/images/sitback-relax-logo.svg"}
                    onError={(e) => {
                      e.target.src = userDummyImage;
                    }}
                  />
                </div>
                <p>{user?.name}</p>
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );

  const getProfileInfo = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.GET_DETAILS);
      if (!res?.status) {
        return res;
      } else {
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
      // return error
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const calenderBookingList = async () => {
    try {
      let param = {
        date: moment().format("YYYY-MM-DD"),
        employee_id: "0",
      };
      const res = await axiosApiCall.post(API_ROUTER?.UPCOMING_CALENDER_BOOKING_LIST, param);
      if (!res?.status) {
        return res;
      } else {
        setUpcomingCalenderData(res?.data?.data);
      }
    } catch (error) {
      // return error
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

  // useEffect
  useEffect(() => {
    getProfileInfo();
    calenderBookingList();
  }, []);

  const handleDayClick = (selectInfo) => {
    calenderRef.current.getApi().changeView("timeGridDay", selectInfo.date);
    // const clickedDate = selectInfo.date.toISOString();
    // const weekday = new Date(clickedDate).toLocaleDateString('en-US', { weekday: 'long' });
  };

  const handleDatesSet = (arg) => {
    const { start } = arg;
    setCurrentView(arg.view.type);
    setCalendarConfig((prev) => ({
      ...prev,
      monthyear: moment(start).format("YYYY-MM"),
      currentMonth: 0,
    }));
  };

  const handleAllStaff = () => {
    setSelectedId(0);
    setSelectedUser(null);
  };

  function calculateEndTime(startDate, startTime, hour, minute, timeType) {
    const startDateTime = moment(`${startDate} ${startTime}`, "YYYY-MM-DD HH:mm:ss");
    if (timeType?.toLowerCase() === "pm" && startDateTime?.hour() < 12) {
      startDateTime.add(12, "hours");
    } else if (timeType?.toLowerCase() === "am" && startDateTime?.hour() === 12) {
      startDateTime.subtract(12, "hours");
    }
    const endDateTime = startDateTime.clone().add(hour, "hours").add(minute, "minutes");
    return endDateTime.format("HH:mm:ss");
  }

  function convertTo24HourFormat(date, startTime, timeType) {
    const dateTime = moment(`${date} ${startTime}`, "YYYY-MM-DD HH:mm:ss");
    if (timeType?.toLowerCase() === "pm" && dateTime.hour() < 12) {
      dateTime.add(12, "hours");
    }
    return dateTime.format("YYYY-MM-DDTHH:mm:ss");
  }

  function removeDuplicates(array) {
    // Use Set to store unique IDs
    let uniqueIds = new Set();

    return array.filter((obj) => {
      if (!uniqueIds.has(obj.id)) {
        uniqueIds.add(obj.id);
        return true;
      }
      return false;
    });
  }

  useEffect(() => {
    // if (calenderRef?.current?.getApi()?.currentData?.currentDate) {
    const currentDate = calenderRef?.current?.getApi()?.currentData?.currentDate;
    const formattedDate = moment(currentDate).format("YYYY-MM-DD");
    getUnavailableList(formattedDate);
    // }
  }, [
    calenderRef?.current?.getApi()?.currentData?.currentDate,
    currentUser,
    currentView,
    upcoming,
  ]);

  //MonthGrid
  const renderMonthGrid = useMemo(() => {
    if (currentView === "dayGridMonth") {
      let events = [];
      if (upcoming && upcoming.length > 0) {
        upcoming.forEach((item) => {
          const dateString = `${item?.date}`;
          const start = moment(convertTo24HourFormat(item?.date, item?.slot_time, item?.time_type));
          const end = moment(
            `${item?.date} ${calculateEndTime(
              item?.date,
              item?.slot_time,
              item?.hour,
              item?.minutes,
              item?.time_type
            )}`
          );

          const durationMinutes = moment.duration(end.diff(start)).asMinutes();
          const isExist = events?.find((ev) => ev?.dateString === dateString);

          const evtObj = {
            id: item?.id,
            start: start.format("YYYY-MM-DDTHH:mm:ss"),
            end: end.format("YYYY-MM-DDTHH:mm:ss"),
            display: "item-list",
            color: item?.color,
            editable: false,
            isCancelled:
              (item.isChargeCaptured == 0 && item.bookingstatus == 0) ||
              (item.isChargeCaptured == 1 && item.bookingstatus == 0)
                ? false
                : true,
            image: item?.userimage,
            title: `${durationMinutes} Minutes ${item?.servicename}`,
            clientName:
              currentUser == 0 ? `Employee: ${item?.employeename}` : `Client: ${item?.username}`,
            bookingstatus: item?.bookingstatus,
            isChargeCaptured: item?.isChargeCaptured,
            sameDayEvents: [],
            dateString,
          };

          if (item.guestList && item.guestList.length > 0) {
            item.guestList
              .filter(
                (guest) =>
                  (guest.isChargeCaptured == 0 && guest.bookingstatus == 0) ||
                  (guest.isChargeCaptured == 1 && guest.bookingstatus == 0)
              )
              .forEach((guest) => {
                const startguesttime = moment(
                  convertTo24HourFormat(guest?.date, guest?.slot_time, guest?.time_type)
                );

                const endguesttime = moment(
                  `${guest?.date} ${calculateEndTime(
                    guest?.date,
                    guest?.slot_time,
                    guest?.hour,
                    guest?.minutes,
                    guest?.time_type
                  )}`
                );
                const durationMinutesguesttime = moment
                  .duration(endguesttime.diff(startguesttime))
                  .asMinutes();

                evtObj?.sameDayEvents?.push({
                  id: guest?.id,
                  start: startguesttime.format("YYYY-MM-DDTHH:mm:ss"),
                  end: endguesttime.format("YYYY-MM-DDTHH:mm:ss"),
                  display: "item-list",
                  color: item?.color,
                  editable: false,
                  isCancelled: false,
                  image: guest?.userimage,
                  title: `${durationMinutesguesttime} Minutes ${guest?.servicename}`,
                  clientName:
                    currentUser == 0 ? `Employee: ${item?.employeename}` : `Client: ${guest?.name}`,
                  bookingstatus: guest?.bookingstatus,
                  isChargeCaptured: guest?.isChargeCaptured,
                  dateString,
                });
              });
          }
          if (isExist) {
            let clone_IsExist = { ...isExist };
            let cloneExistingEvents = clone_IsExist?.sameDayEvents || [];
            // delete CloneEventObj.sameDayEvents,
            let clonedData = [...events];
            // let CloneEventObj = { ...evtObj };
            // delete CloneEventObj.sameDayEvents,
            clonedData = clonedData.map((subEv) => {
              let cancel_event = subEv?.sameDayEvents
                ? selectedUser === null
                  ? removeDuplicates([...subEv.sameDayEvents, evtObj, ...cloneExistingEvents])
                  : removeDuplicates([...subEv.sameDayEvents, evtObj])
                : selectedUser === null
                ? [evtObj, ...cloneExistingEvents]
                : [evtObj];
              cancel_event = cancel_event?.map((newEv) => ({
                ...newEv,
                isCancelled:
                  (newEv.isChargeCaptured == 0 && newEv.bookingstatus == 0) ||
                  (newEv.isChargeCaptured == 1 && newEv.bookingstatus == 0)
                    ? false
                    : true,
              }));
              return subEv.dateString === dateString
                ? {
                    ...subEv,
                    sameDayEvents: cancel_event,
                  }
                : subEv &&
                    subEv?.length > 0 &&
                    subEv?.map((newEv) => ({
                      ...newEv,
                      isCancelled:
                        (newEv.isChargeCaptured == 0 && newEv.bookingstatus == 0) ||
                        (newEv.isChargeCaptured == 1 && newEv.bookingstatus == 0)
                          ? false
                          : true,
                    }));
            });
            // events = clonedData;
            events = removeDuplicates(clonedData);
            events = events?.map((newEv) => ({
              ...newEv,
              isCancelled:
                (newEv.isChargeCaptured == 0 && newEv.bookingstatus == 0) ||
                (newEv.isChargeCaptured == 1 && newEv.bookingstatus == 0)
                  ? false
                  : true,
            }));
          } else {
            events.push(evtObj);
          }
          // }
        });
      }
      return events;
    } else if (currentView === "timeGridDay") {
      let finalData = [];
      const currentDate = calenderRef.current.getApi().currentData.currentDate;

      // const current_Date = new Date(currentDate).toISOString()
      const formattedDate = moment(currentDate).format("YYYY-MM-DD");
      const weekday = calenderRef.current.getApi().currentData.currentDate;
      const weekDateName = new Date(weekday).toLocaleDateString("en-US", { weekday: "short" });

      unavaliableList.forEach((slot) => {
        const start = moment(
          convertTo24HourFormat(formattedDate, slot?.start_time, slot?.start_type)
        );
        const end = moment(convertTo24HourFormat(formattedDate, slot?.end_time, slot?.end_type));
        if (slot?.days.split(",").includes(weekDateName)) {
          const unavailabe_event = {
            id: slot?.id,
            start: start.format("YYYY-MM-DDTHH:mm:ss"),
            end: end.format("YYYY-MM-DDTHH:mm:ss"),
            identify: "unavailable",
            // display: "item-list",
            clientName: currentUser == 0 ? `Employee: ${slot?.employeename}` : "",
            color: "#E7E7E7",
            editable: false,
            slotDuration: slot?.duration,
            title: "Unavailable", // currentUser == 0 ? `${slot?.servicename}` : "Unavailable"
          };
          finalData.push(unavailabe_event);
        }
      });

      upcoming && upcoming.length > 0
        ? upcoming.forEach((item) => {
            const start = moment(
              convertTo24HourFormat(item?.date, item?.slot_time, item?.time_type)
            );
            const end = moment(
              `${item?.date} ${calculateEndTime(
                item?.date,
                item?.slot_time,
                item?.hour,
                item?.minutes,
                item?.time_type
              )}`
            );
            const durationMinutes = moment.duration(end.diff(start)).asMinutes();
            if (
              (item.isChargeCaptured == 0 && item.bookingstatus == 0) ||
              (item.isChargeCaptured == 1 && item.bookingstatus == 0)
            ) {
              const mainEvent = {
                id: item?.id,
                start: start.format("YYYY-MM-DDTHH:mm:ss"),
                end: end.format("YYYY-MM-DDTHH:mm:ss"),
                display: "item-list",
                color: item?.color, //currentUser == 0 ? randomColor : "#49a6b6"
                editable: false,
                title: `${durationMinutes} Minutes ${item?.servicename}`,
                clientName:
                  currentUser == 0
                    ? `Employee: ${item?.employeename}`
                    : `Client: ${item?.username}`,
                image: item?.userimage,
                bookingstatus: item?.bookingstatus,
                isChargeCaptured: item?.isChargeCaptured,
                type: "only_main_user",
                status: item?.bookingtype == "bookingbyspa" ? "WALK IN" : "MOBILE APP",
                timeStart: start.format("YYYY-MM-DDTHH:mm:ss"),
                timeEnd: end.format("YYYY-MM-DDTHH:mm:ss"),
                // employee_id: item?.employee_id,
              };

              finalData.push(mainEvent);
            }

            if (item.guestList && item.guestList.length > 0) {
              const guestEvents = item.guestList
                .filter(
                  (guest) =>
                    (guest.isChargeCaptured == 0 && guest.bookingstatus == 0) ||
                    (guest.isChargeCaptured == 1 && guest.bookingstatus == 0)
                )
                .map((guest) => {
                  // if (guest?.isChargeCaptured == 0 && guest?.bookingstatus == 0) {

                  const startguesttime = moment(
                    convertTo24HourFormat(guest?.date, guest?.slot_time, guest?.time_type)
                  );
                  const endguesttime = moment(
                    `${guest?.date} ${calculateEndTime(
                      guest?.date,
                      guest?.slot_time,
                      guest?.hour,
                      guest?.minutes,
                      guest?.time_type
                    )}`
                  );
                  const durationMinutesguesttime = moment
                    .duration(endguesttime.diff(startguesttime))
                    .asMinutes();
                  return {
                    id: guest?.id,
                    mainUserId: item?.id,
                    start: startguesttime.format("YYYY-MM-DDTHH:mm:ss"),
                    end: endguesttime.format("YYYY-MM-DDTHH:mm:ss"),
                    display: "item-list",
                    color: item?.color, //currentUser == 0 ? randomColor : "#49a6b6"
                    editable: false,
                    title: `${durationMinutesguesttime} Minutes ${guest?.servicename}`,
                    clientName:
                      currentUser == 0
                        ? `Employee: ${guest?.employeename}`
                        : `Client: ${guest?.name}`,
                    image: guest?.userimage,
                    bookingstatus: item?.bookingstatus,
                    isChargeCaptured: item?.isChargeCaptured,
                    type: "only_guest",
                    status: item?.bookingtype == "bookingbyspa" ? "WALK IN" : "MOBILE APP",
                    timeStart: startguesttime.format("YYYY-MM-DDTHH:mm:ss"),
                    timeEnd: endguesttime.format("YYYY-MM-DDTHH:mm:ss"),
                    // employee_id: guest?.employee_id
                  };

                  // }
                });

              finalData = finalData.concat(guestEvents);
            }
          })
        : [];
      return finalData;
    }
  }, [upcoming, calculateEndTime, currentView, convertTo24HourFormat]);

  function CustomMonthGrid(info) {
    let totalEvs = [];
    const finalObj = {
      image: info.event.extendedProps.image,
      start: info.event.start,
      isChargeCaptured: info.event.extendedProps.isChargeCaptured,
      bookingstatus: info.event.extendedProps.bookingstatus,
      isCancelled: info.event.extendedProps.isCancelled,
      // isCancelled: info.event.extendedProps.isCancelled == null ? info.event.extendedProps.isChargeCaptured == 0 && info.event.extendedProps.bookingstatus == 0
      //   || info.event.extendedProps.isChargeCaptured == 1 && info.event.extendedProps.bookingstatus == 0 ? false : true : true,
      // end: info.event.end,
      title: info.event._def.title,
      display: info.event.display,
      // sameDayEvs: info?.event?.extendedProps?.sameDayEvents || [],
    };
    if (!finalObj.isCancelled) {
      totalEvs.push(finalObj);
    }

    if (info?.event?.extendedProps?.sameDayEvents?.length > 0) {
      const newEvs = info?.event?.extendedProps?.sameDayEvents;
      if (newEvs?.length > 0) {
        totalEvs = totalEvs.concat(newEvs?.filter((item) => !item.isCancelled));
        // finalObj.sameDayEvs = [...finalObj.sameDayEvs, ...subEvents];
      }
    }
    // Render events
    return (
      <>
        <div className="fc-event-content">
          {totalEvs.slice(0, 3).map((events, key) => (
            <div key={key} className="userContent">
              {info.view.type === "dayGridMonth" && (
                <div className="imageWrapper">
                  <img
                    className="icon"
                    src={events?.image}
                    alt={events?.title || "Event"}
                    onError={(e) => {
                      e.target.src = userDummyImage;
                    }}
                  />

                  {/* <>
                    {events.sameDayEvs?.length > 0 &&
                      events?.sameDayEvs?.slice(0, 2).map((dt, inx) => {
                        {
                          return (a
                            <>
                              <img
                                className="icon"
                                key={inx}
                                src={dt?.image}
                                alt={dt?.title || "Event"}
                                onError={(e) => {
                                  e.target.src = userDummyImage;
                                }}
                              />
                            </>
                          );
                        }
                      })}
                    {events.sameDayEvs?.length > 0 && events.sameDayEvs.map((subevs, index) => { })}
                    {events.sameDayEvs?.length > 2 && (
                      <div className="image-count"> {events.sameDayEvs?.length - 2}+</div>
                    )}
                  </> */}
                </div>
              )}
            </div>
          ))}
          {totalEvs?.length > 3 && <div className="image-count"> {totalEvs?.length - 3}+</div>}
        </div>
      </>
    );
  }

  function CustomTimeGrid(info) {
    return (
      <>
        <div
          className={
            info?.event?._def?.extendedProps?.slotDuration &&
            info?.event?._def?.extendedProps?.slotDuration < 30
              ? "fc-event-content-small"
              : "fc-event-content"
          }
        >
          <div className="eventContent">
            {info.view.type === "timeGridDay" && (
              <>
                <div className="sitback-text">
                  <p>{info?.event?.title}</p>
                  <span>{info?.event?._def?.extendedProps?.clientName}</span>
                </div>
                {info?.event?._def?.extendedProps &&
                info?.event?._def?.extendedProps?.status != null &&
                info?.event?._def?.extendedProps?.identify == null ? (
                  <span className="status-text-wrapper" style={{ backgroundColor: "#F5DEC8" }}>
                    {info?.event?._def?.extendedProps?.status}
                  </span>
                ) : (
                  <></>
                )}

                {info?.event?._def?.extendedProps &&
                info?.event?._def?.extendedProps?.identify == null ? (
                  <Dropdown className="dropdown-btn-wrapper">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      <i>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 4 17">
                          <path
                            fill="#000000"
                            d="M2.13.847A1.611 1.611 0 0 0 .552 2.49a1.604 1.604 0 0 0 1.635 1.577 1.604 1.604 0 0 0 1.576-1.635v-.015A1.599 1.599 0 0 0 2.129.847ZM.67 8.927a1.61 1.61 0 0 1 1.577-1.642 1.598 1.598 0 0 1 1.635 1.568v.015a1.604 1.604 0 0 1-1.576 1.635A1.604 1.604 0 0 1 .67 8.926Zm.119 6.438a1.611 1.611 0 0 1 1.576-1.643A1.599 1.599 0 0 1 4 15.291v.016a1.604 1.604 0 0 1-1.576 1.635 1.605 1.605 0 0 1-1.635-1.577Z"
                          />
                        </svg>
                      </i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => handleShowCancelModal(info.event)}
                        disabled={
                          moment(info?.event?._def?.extendedProps?.timeStart).isBefore(moment()) ||
                          (info?.event?._def?.extendedProps?.bookingstatus == 0 &&
                            info?.event?._def?.extendedProps?.isChargeCaptured == 1)
                        }
                      >
                        Cancel
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </div>
      </>
    );
  }

  const handleShowCancelModal = (target) => {
    setCancelTarget(target);
    setShowCancelModal(true);
  };

  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const customDayHeaderContent = (info) => {
    if (info.view.type === "timeGridDay") {
      const parsedDate = moment.parseZone(info.date);
      const formattedDate = parsedDate.format("D MMMM, YYYY");
      const weekdayname = moment(info.date).format("dddd");
      return (
        <>
          <div className="calender-title-text">
            <p className="headerdate">{formattedDate}</p>
            <button onClick={() => handleShowAddModal()}>Add Appointment +</button>
          </div>
          <p className="headerweekname">{weekdayname}</p>
        </>
      );
    } else if (info.view.type === "dayGridMonth") {
      const weekdayname = moment(info.date).format("dddd");
      return (
        <div>
          <p>{weekdayname}</p>
        </div>
      );
    }
  };

  return (
    <CalendarLayoutWrapperMain>
      <div>
        {/* <button onClick={() => setOnlineCardModal(true)}> Online Card Modal</button>
        <button onClick={() => setOfflineCardModal(true)}> Offline Card Modal</button> */}
      </div>
      <div className="specificevent-headerbar">
        <Button onClick={handleAllStaff}>
          <i>
            <img alt="sitback" src="/images/profile-icon.svg" />
          </i>
          All Therapists
        </Button>
        <UserList users={provider} />
      </div>
      {!loading ? (
        <div className="calendar-flex">
          <FullCalendar
            editable={false}
            selectable={false}
            allDaySlot={false}
            firstDay={1}
            dayHeaderContent={customDayHeaderContent}
            slotDuration="00:15:00"
            slotLabelFormat={{
              hour: "numeric",
              minute: "2-digit",
              omitZeroMinute: true,
              meridiem: "long",
            }}
            titleFormat={
              { year: "numeric", month: "long" } // like 'September 2009', for month view
            }
            slotLabelClassNames="slotLable"
            // dayMinWidth={200}
            // eventMinWidth={100}
            events={renderMonthGrid} // finaleeve
            // eventContent={getEventContent}
            // events={currentView === "dayGridMonth" ? renderMonthGrid : renderTimeGrid}
            eventContent={currentView === "dayGridMonth" ? CustomMonthGrid : CustomTimeGrid}
            // eventContent={CustomTimeGrid}
            headerToolbar={{
              start: "prev title next",
              end: "timeGridDay dayGridMonth",
            }}
            buttonText={{ month: "Monthly", day: "Daily" }}
            dayCellClassNames={({ date }) => {
              const classes = [];
              {
                upcoming?.length > 0 &&
                  upcoming?.map((dateList) => {
                    const dateListDate = new Date(dateList?.date);
                    const previousDay = new Date(dateListDate.setDate(dateListDate.getDate() - 1));
                    if (
                      date.toISOString().slice(0, 10) == previousDay?.toISOString().slice(0, 10)
                    ) {
                      classes.push("custom-cell-bg");
                    }
                  });
              }
              return classes;
            }}
            initialView="dayGridMonth"
            datesSet={handleDatesSet}
            ref={calenderRef}
            dateClick={handleDayClick}
            plugins={[daygridPlugin, interactionPlugin, timeGridPlugin]}
            views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
          />
        </div>
      ) : (
        <Loader loading={loading} />
      )}

      <CancelAppointmentModal
        show={showCancelModal}
        handleClose={() => handleCloseCancelModal()}
        data={cancelTarget}
        setcancelBooking={setcancelBooking}
      />
      <AddAppointmentFromCalender
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        setAppointmentDate={setAppointmentDate}
        appointmentDate={appointmentDate}
        setOnlineCardModal={setOnlineCardModal}
        setOfflineCardModal={setOfflineCardModal}
      />
      <AddCardModal
        show={showOnlineCardModal}
        onHide={() => setOnlineCardModal(false)}
        appointmentDate={appointmentDate}
        setSmModalHide={setSmModalHide}
        setShowAddModal={setShowAddModal}
      />
      <AddOfflineCardModal
        show={showOfflineCardModal}
        onHide={() => setOfflineCardModal(false)}
        appointmentDate={appointmentDate}
        setSmModalHide={setSmModalHide}
        setShowAddModal={setShowAddModal}
      />
    </CalendarLayoutWrapperMain>
  );
};

export default CustomCalender;
