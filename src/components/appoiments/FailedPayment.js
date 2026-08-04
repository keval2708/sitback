import _ from "lodash";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import UserInfo from "./modal/userInfo";
import LoadingButton from "../shared/button/LoadingButton";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import { Image } from "@/styles/global/main.style";
import { QuickChatBoxWrapper } from "@/styles/pages/appointments.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES, userDummyImage } from "@/utils/constants";

export const FailedPayment = ({
  selectedId,
}) => {

  // hooks
  //hooks
  const { toaster } = useToaster();
  const { t } = useTranslation();

  // state
  const [loading, setLoading] = useState(false);
  const [paymentBtn, setPaymentBtn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [failedList, setFailedList] = useState([]);
  const [isNextPage, setIsNextPage] = useState(false);
  const [show, setShow] = useState(false);
  const userInfo = useRef(null);
  const loadingData = useRef(null);

  // const
  const getFailedPaymentList = async () => {
    const params = {
      page: currentPage,
      employee_id: selectedId,
    };

    try {
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.GET_FAILED_PAYMENT_BOOKING_LIST, params);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        const newData = res?.data?.data;
        const records = currentPage === 1 ? newData : [...failedList, ...newData];
        const formatRecords = _.uniqBy(records, "id");
        setFailedList(formatRecords);
        setIsNextPage(res?.data?.isNextPage);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

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

  function calculateEndTime(startTime, hour, minutes, timeType) {
    const startDate = new Date();
    const startHours = parseInt(startTime?.split(":")[0]);
    const startMinutes = parseInt(startTime?.split(":")[1]);
    startDate.setHours(startHours, startMinutes, 0, 0);

    // Adjust for time period (AM/PM)
    if (timeType?.toLowerCase() === "pm" && startHours !== 12) {
      startDate.setHours(startHours + 12);
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

  const handleViewMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleUserInfo = (data) => {
    userInfo.current = data;
    setShow(true);
  };

  const getFailPayment = async (data, index) => {

    try {
      setPaymentBtn(true);
      loadingData.current = data
      const captureParams = {
        id: data?.id,
      };
      const params = {
        booking_id: data?.id,
      };

      const capture = await axiosApiCall.post(API_ROUTER?.CAPTURE_PAYMENT, captureParams);
      if (!capture?.status) {
        toaster(capture?.message, TOAST_TYPES.ERROR);
        const res = await axiosApiCall.post(API_ROUTER?.create_payment_failed, params);
        if (!res?.status) {
          return toaster(res?.message, TOAST_TYPES.ERROR);
        } else {
          if (data?.failed_count < 5) {
            const updateCount = failedList;
            updateCount[index].failed_count += 1;
            setFailedList(updateCount)
          } else {
            getFailedPaymentList();
            // toaster(capture?.data?.message, TOAST_TYPES.SUCCESS);
          }
        }
      } else {
        toaster(capture?.data?.message, TOAST_TYPES.SUCCESS);
        await getFailedPaymentList();
      }
      // setPaymentBtn(true);
      // const params = {
      //   booking_id: data?.id,
      // };
      // const res = await axiosApiCall.post(API_ROUTER?.create_payment_failed, params);
      // if (!res?.status) {
      //   return toaster(res?.message, TOAST_TYPES.ERROR);
      // } else {
      //   // console.log("1111 failedList", failedList)
      //   // console.log("getFailPayment", res)
      //   if (data?.failed_count < 5) {
      //     const updateCount = failedList;
      //     updateCount[index].failed_count += 1;
      //     setFailedList(updateCount)
      //   } else {
      //     getFailedPaymentList();
      //   }
      // }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setPaymentBtn(false);
    }
  };

  useEffect(() => {
    if (window.io) {
      window.io.socket.on("serviceprovider", async (msg) => {
        if (msg?.action == "towHoursReminder") {
          getFailedPaymentList();
        }
      });
    }
  }, [window.io]);

  useEffect(() => {
    getFailedPaymentList();
    // getUpcomingList();
    // getUnavailableList();
    // getEmployee();
  }, [currentPage, selectedId]);

  return (
    <>
      <div className="box-wrapper-div box-wrapper-padding upcoming-schedulesviewmore">
        {loading && currentPage === 1 ? (
          <></>
        ) : failedList && failedList.length > 0 ? (
          failedList?.map((data, key) => {
            return (
              <QuickChatBoxWrapper key={key}>
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
                        <div className="user-guest-detail">
                          <p className="quickusername">{data?.username}</p>
                          <span className="failed-payment-text" onClick={() => handleUserInfo(data)}>View detail</span>
                        </div>
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
                                <p className="quickusername">{guestdata?.name}</p>
                                <div className="schedules-text">
                                  <h6>{t("serviceType")}</h6>
                                  <ul>
                                    <li>{guestdata?.servicename}</li>
                                  </ul>
                                </div>
                                <div className="schedules-text">
                                  <ul>
                                    <li>
                                      ({guestdata?.hour * 60 + guestdata?.minutes} min)
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
                                </div>
                              </div>
                            );
                          })}
                      {data?.failed_count == 5 && !(data?.failed_time && moment().isAfter(moment(data?.failed_time).add(119, 'minutes')))
                        ? <p className="amount-text">Please try to fetch the amount after 2 hours.</p> : ""}
                      <div className="startservice-btns-noshow">
                        {
                          data?.failed_count < 5 ?
                            <LoadingButton
                              className="get-payment-btn"
                              disabled={paymentBtn && loadingData?.current?.id == data?.id}
                              label={"get payment"}
                              loadinglabel={"get payment"}
                              isLoading={paymentBtn && loadingData?.current?.id == data?.id}
                              onClick={() => getFailPayment(data, key)}
                            /> :
                            <LoadingButton
                              className="get-payment-btn"
                              disabled={!(data?.failed_time && moment().isAfter(moment(data?.failed_time).add(119, 'minutes')))}
                              label={"get payment"}
                              loadinglabel={"get payment"}
                              isLoading={paymentBtn && loadingData?.current?.id == data?.id}
                              onClick={() => getFailPayment(data, key)}
                            />
                        }
                      </div>
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
                          <span className="failed-payment-text" onClick={() => handleUserInfo(data)}>View detail</span>
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
                              {data?.servicename} ({data?.hour * 60 + data?.minutes} min)
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="schedules-text">
                        <h6>{t("time")}</h6>
                        <ul>
                          <li>{moment(data?.date).format("dddd, MMM D, YYYY")}</li>
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
                      {data?.failed_count == 5 && !(data?.failed_time && moment().isAfter(moment(data?.failed_time).add(119, 'minutes')))
                        ? <p className="amount-text">Please try to fetch the amount after 2 hours.</p> : ""}
                      <div className="startservice-btns-noshow">
                        {
                          data?.failed_count < 5 ?
                            <LoadingButton
                              className="get-payment-btn"
                              disabled={paymentBtn && loadingData?.current?.id == data?.id}
                              label={"get payment"}
                              loadinglabel={"get payment"}
                              isLoading={paymentBtn && loadingData?.current?.id == data?.id}
                              onClick={() => getFailPayment(data, key)}
                            /> :
                            <LoadingButton
                              className="get-payment-btn"
                              disabled={!(data?.failed_time && moment().isAfter(moment(data?.failed_time).add(119, 'minutes')))}
                              label={"get payment"}
                              loadinglabel={"get payment"}
                              isLoading={paymentBtn && loadingData?.current?.id == data?.id}
                              onClick={() => getFailPayment(data, key)}
                            />
                        }
                      </div>
                    </div>
                  </>
                )}
              </QuickChatBoxWrapper>
            );
          })
        ) : (
          <div className="nodatext-div"><p>{t("nodataavailable")}</p></div>
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

      <UserInfo
        show={show}
        onHide={() => setShow(false)}
        details={userInfo?.current}
      />

    </>
  );
};
