import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddAppointmentFromCalender from "./modal/addAppointmentFromCalender";
import AddCardModal from "./modal/addCardModal";
import AddOfflineCardModal from "./modal/addOfflinePaymentModal";
import CancelAppointmentModal from "./modal/cancelAppointmentModal";
import UnavailableAppointment from "./modal/unavailableAppointmentModal";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector } from "@/redux/authCheck";
import { handleCalender, handleCalenderData, messageCheckSliceSelector } from "@/redux/messageTab";
import { PATH_AUTH, PATH_DASHBOARD } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, Image } from "@/styles/global/main.style";
import { CalendarLayoutWrapperMain } from "@/styles/pages/appointments.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES, userDummyImage } from "@/utils/constants";
import { removeCookie } from "@/utils/cookie";
// import moment from "moment-timezone";

const CustomCalender = ({
  provider,
  setSelectedId,
  currentUser,
  unavaliableList,
  getUnavailableList,
  setSmModalHide = () => {},
  updatebookingcalender,
  setCancelbookinU,
  setCurrentPage,
}) => {
  //hooks
  const { toaster } = useToaster();
  const calenderRef = useRef();
  const { push } = useRouter();
  const { login } = useSelector(authCheckSliceSelector);
  const { calenderRefresh } = useSelector(messageCheckSliceSelector);
  const dispatch = useDispatch();

  // States
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [upcomingCalenderData, setUpcomingCalenderData] = useState([]);

  //No Show
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [selectedEmployeeColor, setSelectedEmployeeColor] = useState(); // #95CCD5

  const [showAddModal, setShowAddModal] = useState(false);
  const [showOfflineCardModal, setOfflineCardModal] = useState(false);
  const [showOnlineCardModal, setOnlineCardModal] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState(null);

  const [cancelBooking, setCancelBooking] = useState(false);
  const [offlineBooking, setOfflineBooking] = useState(false);
  const [onlineBooking, setOnlineBooking] = useState(false);

  const [showCloseSpaModal, setShowCloseSpaModal] = useState(false);
  const [CloseSpaTag, setCloseSpaTag] = useState(false);

  const [calenderDate, setCalenderDate] = useState(null);

  const handleUserClick = (userId) => {
    const user = provider.find((user) => user.id === userId);
    setSelectedEmployeeColor(user.color);
    calenderBookingList(userId);
    setSelectedId(user.id);
    setSelectedUser(user);
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
            <React.Fragment key={index}>
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
                <>
                  {user?.name.length > 10 ? (
                    <p>{user?.name.substring(0, 11)}...</p>
                  ) : (
                    <p>{user?.name}</p>
                  )}{" "}
                </>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );

  useEffect(() => {
    getProfileInfo();
  }, [CloseSpaTag]);

  const getProfileInfo = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.GET_DETAILS);
      if (!res?.status) {
        return res;
      } else {
        if (res?.data?.closeSpaTag) {
          setCloseSpaTag(true);
        } else {
          setCloseSpaTag(false);
        }
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

  const calenderBookingList = async (id = 0) => {
    try {
      let param = {
        date: moment().format("YYYY-MM-DD"),
        employee_id: id,
      };
      const res = await axiosApiCall.post(API_ROUTER?.UPCOMING_CALENDER_BOOKING_LIST, param);
      if (!res?.status) {
        return res;
      } else {
        // handleCalenderData
        dispatch(handleCalenderData(res?.data?.data));
        setUpcomingCalenderData(res?.data?.data);
      }
    } catch (error) {
      // return error
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      dispatch(handleCalender(false));
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
  }, [cancelBooking, onlineBooking, offlineBooking, updatebookingcalender]);

  useEffect(() => {
    setSelectedId(currentUser);
    calenderBookingList(currentUser);
  }, [calenderRefresh]);

  useEffect(() => {
    if (window.io) {
      window.io.socket.on("serviceprovider", async (msg) => {
        if (
          msg.action == "auto_no_show_user_booking_alert" ||
          msg.action == "auto_start_service_user_booking_alert" ||
          msg.action == "compltedBySpa" ||
          msg.action == "cancelBookingUser" ||
          msg.action == "completeAllBooking" ||
          msg.action == "cancelledAllBookingBySpa" ||
          msg.action == "cancelBookingSpa" ||
          msg.action == "booking_time_started" ||
          msg.action == "auto_complete_socket_solo_booking" ||
          msg.action == "auto_complete_socket_multiple_booking" ||
          msg.action == "Bookappointmentbyspa" ||
          msg.action == "Bookguestappointmentbyspa" ||
          msg.action == "Bookguestappointmentbyuser" ||
          msg.action == "Bookappointmentbyuser" ||
          msg.action == "new_booking_from_spa" ||
          msg.action == "new_booking_from_user" ||
          msg?.action == "userCheckInSpa"
        ) {
          calenderBookingList();
        }
      });
    }
  }, [window.io]);

  const handleDayClick = (selectInfo) => {
    // calenderRef.current
    //   .getApi()
    //   .changeView("timeGridDay", moment.tz(selectInfo.dateStr, login?.timeZone));
    // const clickedDate = selectInfo.date.toISOString();
    // const weekday = new Date(clickedDate).toLocaleDateString('en-US', { weekday: 'long' });
    // console.log("selectInfo", selectInfo);

    calenderRef.current.getApi().changeView("timeGridDay", selectInfo.date);
  };

  const handleAllStaff = () => {
    setSelectedId(0);
    calenderBookingList(0);
    setSelectedUser(null);
  };

  function calculateEndTime(startDate, startTime, hour, minute, timeType) {
    const startDateTime = moment(`${startDate} ${startTime}`, "YYYY-MM-DD HH:mm:ss");

    // Adjust for 12 AM case
    if (timeType?.toLowerCase() === "am" && startDateTime?.hour() === 12) {
      startDateTime.subtract(12, "hours");
    }

    // Adjust for PM times
    // if (timeType?.toLowerCase() === "pm") {
    //   startDateTime.add(12, "hours");
    // }

    if (timeType?.toLowerCase() === "pm" && startDateTime?.hour() !== 12) {
      startDateTime.add(12, "hours");
    }

    const endDateTime = startDateTime.clone().add(hour, "hours").add(minute, "minutes");
    return endDateTime.format("HH:mm:ss");
  }

  function convertTo24HourFormat(date, startTime, timeType) {
    const dateTime = moment(`${date} ${startTime}`, "YYYY-MM-DD HH:mm:ss");

    // Adjust for AM times (hour 12 should become 0)
    if (timeType?.toLowerCase() === "am" && dateTime.hour() === 12) {
      dateTime.subtract(12, "hours");
    } else if (timeType?.toLowerCase() === "pm" && dateTime.hour() < 12) {
      dateTime.add(12, "hours");
    }

    return dateTime.format("YYYY-MM-DDTHH:mm:ss");
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

  useEffect(() => {
    // if (calenderRef?.current?.getApi()?.currentData?.currentDate) {
    // const currentDate = calenderRef?.current?.getApi()?.currentData?.currentDate;
    const formattedDate = moment(calenderDate).format("YYYY-MM-DD");
    getUnavailableList(formattedDate);
    // }
  }, [
    calenderRef?.current?.getApi()?.currentData?.currentDate,
    currentUser,
    currentView,
    upcomingCalenderData,
    calenderDate,
  ]);

  const handleDatesSet = (arg) => {
    setCurrentView(arg?.view.type);
    setCalenderDate(arg?.start);
  };

  // console.log("upcomingCalenderData>>>>>>", upcomingCalenderData);
  //MonthGrid
  const renderMonthGrid = useMemo(() => {
    if (currentView === "dayGridMonth") {
      let events = [];
      let temp = {};
      if (upcomingCalenderData && upcomingCalenderData.length > 0) {
        for (const item of upcomingCalenderData) {
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

          const evtObj = {
            id: item?.id,
            start: start.format("YYYY-MM-DDTHH:mm:ss"),
            end: end.format("YYYY-MM-DDTHH:mm:ss"),
            display: "item-list",
            color: item?.color,
            editable: false,
            isCancelled: false,
            image: item?.userimage,
            title: `${durationMinutes} Minutes ${item?.servicename}`,
            clientName:
              currentUser == 0 ? `Employee: ${item?.employeename}` : `Client: ${item?.username}`,
            bookingstatus: item?.bookingstatus,
            isChargeCaptured: item?.isChargeCaptured,
            dateString,
          };
          // eslint-disable-next-line no-prototype-builtins
          if (!temp?.hasOwnProperty(dateString)) {
            temp[dateString] = [];
          }
          temp[dateString].push(evtObj);
        }

        Object?.keys(temp).map((t) => {
          let item = temp[t][0];
          delete temp[t][0];
          const evtObj = {
            id: item?.id,
            start: item?.start,
            end: item?.end,
            display: "item-list",
            color: item?.color,
            editable: false,
            isCancelled: false,
            image: item?.image,
            title: item?.title,
            clientName:
              currentUser == 0 ? `Employee: ${item?.employeename}` : `Client: ${item?.username}`,
            bookingstatus: item?.bookingstatus,
            isChargeCaptured: item?.isChargeCaptured,
            sameDayEvents: temp[t],
            dateString: t,
          };
          events.push(evtObj);
        });
      }
      return events;
    } else if (currentView === "timeGridDay") {
      let finalData = [];
      const currentDate = calenderRef.current.getApi().currentData.currentDate;

      const formattedDate = moment(currentDate).format("YYYY-MM-DD");
      const weekday = calenderRef.current.getApi().currentData.currentDate;
      const weekDateName = new Date(weekday).toLocaleDateString("en-US", { weekday: "short" });

      unavaliableList?.forEach((slot) => {
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

      upcomingCalenderData && upcomingCalenderData.length > 0
        ? upcomingCalenderData.forEach((item) => {
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
            const mainEvent = {
              id: item?.id,
              start: start.format("YYYY-MM-DDTHH:mm:ss"),
              end: end.format("YYYY-MM-DDTHH:mm:ss"),
              display: "item-list",
              color: item?.color, //currentUser == 0 ? randomColor : "#49a6b6"
              editable: false,
              title: `${durationMinutes} Minutes ${item?.servicename}`,
              clientName:
                currentUser == 0 ? `Employee: ${item?.employeename}` : `Client: ${item?.username}`,
              image: item?.userimage,
              bookingstatus: item?.bookingstatus,
              isChargeCaptured: item?.isChargeCaptured,
              type: item?.btype == "user" ? "only_main_user" : "only_guest",
              status: handleAppointmentType(item?.bookingtype),
              timeStart: start.format("YYYY-MM-DDTHH:mm:ss"),
              isTimeStarted: item?.isTimeStarted,
              checkinstatus: item?.checkinstatus,
              timeEnd: end.format("YYYY-MM-DDTHH:mm:ss"),
              mainUserId: item?.book_id,
              isguest: item?.isguest,
              // employee_id: item?.employee_id,
            };

            finalData.push(mainEvent);
          })
        : [];
      return finalData;
    }
  }, [upcomingCalenderData, calculateEndTime, currentView, convertTo24HourFormat]);

  function CustomMonthGrid(info) {
    let totalEvs = [];
    const finalObj = {
      image: info.event.extendedProps.image,
      start: info.event.start,
      isChargeCaptured: info.event.extendedProps.isChargeCaptured,
      bookingstatus: info.event.extendedProps.bookingstatus,
      isCancelled: info.event.extendedProps.isCancelled,
      title: info.event._def.title,
      display: info.event.display,
    };

    if (!finalObj.isCancelled) {
      totalEvs.push(finalObj);
    }

    if (info?.event?.extendedProps?.sameDayEvents?.length > 0) {
      const newEvs = info?.event?.extendedProps?.sameDayEvents;
      if (newEvs?.length > 0) {
        totalEvs = totalEvs.concat(newEvs?.filter((item) => !item.isCancelled));
      }
    }

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
                  <>
                    {info?.event?._def?.extendedProps?.clientName.length > 17 ? (
                      <span>
                        {info?.event?._def?.extendedProps?.clientName.substring(0, 17)}...
                      </span>
                    ) : (
                      <span>{info?.event?._def?.extendedProps?.clientName}</span>
                    )}
                  </>
                  {/* <span>{info?.event?._def?.extendedProps?.clientName.substring(0, 17)}...</span> */}
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

                {/* {info?.event?._def?.extendedProps &&
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
                          info?.event?._def?.extendedProps?.isTimeStarted == 1 ||
                          info?.event?._def?.extendedProps?.checkinstatus == 1
                            ? true
                            : false
                          // moment(
                          //   info?.event?._def?.extendedProps?.timeStart).isBefore(moment()) ||
                          // !info?.event?._def?.extendedProps?.bookingstatus == 0
                          // info?.event?._def?.extendedProps?.isTimeStarted == 0
                        }
                      >
                        Cancel
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  ""
                )} */}
              </>
            )}
          </div>
        </div>
      </>
    );
  }

  const handleShowCancelModal = (target) => {
    // const updatedList = upcomingCalenderData.filter(record => record.id == target?._def?.extendedProps?.mainUserId);
    // dispatch(handleTarget(updatedList[0]));
    setCancelTarget(target);
    setShowCancelModal(true);
  };

  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const customDayHeaderContent = useCallback(
    (info) => {
      if (info.view.type === "timeGridDay") {
        const parsedDate = moment.parseZone(info.date);
        const formattedDate = parsedDate.format("D MMMM, YYYY");
        const weekdayname = moment(info.date).format("dddd");
        const isToday = parsedDate.isSame(moment(), "day");

        return (
          <>
            <div className="calender-title-text">
              <div className="headerdate-wraper">
                <p className="headerdate">{formattedDate}</p>
                <p className="headerweekname">{weekdayname}</p>
              </div>
              {isToday && (
                <button
                  onClick={() => setShowCloseSpaModal(true)}
                  disabled={CloseSpaTag ? true : false}
                  className="calender-unavailable-appointment"
                >
                  UNAVAILABLE APPOINTMENT
                </button>
              )}
            </div>
          </>
        );
      } else if (info.view.type === "dayGridMonth") {
        const weekdayname = moment(info.date).format("dddd");
        return (
          <>
            <div>
              <p>{weekdayname}</p>
            </div>
          </>
        );
      }
      return null;
    },
    [CloseSpaTag] // Add CloseSpaTag as a dependency
  );

  // console.log("upcomingCalenderData>>>", upcomingCalenderData);

  return (
    <CalendarLayoutWrapperMain>
      <div className="specificevent-headerbar">
        <Button onClick={handleAllStaff}>
          <i>
            <img alt="sitback" src="/images/profile-icon.svg" />
          </i>
          All Therapists
        </Button>
        <UserList users={provider} />
      </div>
      <div className="calendar-flex appointment-calender">
        <FullCalendar
          // timeZone={login?.timezone}
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
          titleFormat={{ year: "numeric", month: "long" }}
          slotLabelClassNames="slotLable"
          events={renderMonthGrid}
          eventContent={currentView === "dayGridMonth" ? CustomMonthGrid : CustomTimeGrid}
          headerToolbar={{
            start: "prev title next",
            center: "appointmentButton",
            end: "timeGridDay dayGridMonth",
          }}
          customButtons={{
            appointmentButton: {
              text: "Add Appointments +",
              click: () => handleShowAddModal(),
            },
          }}
          buttonText={{ month: "Monthly", day: "Daily" }}
          dayCellClassNames={({ date }) => {
            const classes = [];
            {
              upcomingCalenderData?.length > 0 &&
                upcomingCalenderData?.map((dateList) => {
                  const dateListDate = new Date(dateList?.date);
                  const previousDay = new Date(dateListDate.setDate(dateListDate.getDate() - 1));
                  if (date.toISOString().slice(0, 10) == previousDay?.toISOString().slice(0, 10)) {
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

      <CancelAppointmentModal
        show={showCancelModal}
        handleClose={() => handleCloseCancelModal()}
        data={cancelTarget}
        upcomingCalenderData={upcomingCalenderData}
        setcancelBooking={setCancelBooking}
        setCancelbookinU={setCancelbookinU}
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
        setAppointmentDate={setAppointmentDate}
        setSmModalHide={setSmModalHide}
        setShowAddModal={setShowAddModal}
        setOnlineBooking={setOnlineBooking}
        setCurrentPage={setCurrentPage}
        calenderBookingList={calenderBookingList}
      />
      <AddOfflineCardModal
        show={showOfflineCardModal}
        onHide={() => setOfflineCardModal(false)}
        setAppointmentDate={setAppointmentDate}
        appointmentDate={appointmentDate}
        setSmModalHide={setSmModalHide}
        setShowAddModal={setShowAddModal}
        setOfflineBooking={setOfflineBooking}
        setCurrentPage={setCurrentPage}
      />
      <UnavailableAppointment
        show={showCloseSpaModal}
        onHide={() => setShowCloseSpaModal(false)}
        setCloseSpaTag={setCloseSpaTag}
        // handleClose={() => setOpenPaymentError(false)}
        // handleClose={() => showCloseSpaModal(false)}
        // data={selectedData}
      />
    </CalendarLayoutWrapperMain>
  );
};

export default CustomCalender;
