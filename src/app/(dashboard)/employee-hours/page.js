"use client";

import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import Loader from "@/components/shared/spinner/loader";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import { Image, MainLayoutWrapper, TableWrapperMain } from "@/styles/global/main.style";
import { RemployeeHoursCalendarLayout } from "@/styles/pages/appointments.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES, userDummyImage } from "@/utils/constants";

export default function EmployeeHours() {
  dayjs.extend(isBetween);

  const { toaster } = useToaster();
  const [provider, setProviderData] = useState([]);
  const [startOfWeek, setStartOfWeek] = useState(dayjs().startOf("week").add(1, "day")); // Start from Monday
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  const getEmployee = async () => {
    try {
      const res = await axiosApiCall.post(API_ROUTER?.EMPLOYEE_LIST);
      if (!res?.status) {
        toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setProviderData(res?.data?.data);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const getSchedules = async (start, end) => {
    setLoading(true);
    try {
      const params = {
        employee_id: 0,
        start_date: start,
        end_date: end,
      };
      const res = await axiosApiCall.post(API_ROUTER?.Get_WEEK_DATA, params);
      if (res?.status) {
        const filteredData = res?.data?.availableDaterangeList?.filter((entry) => {
          if (entry.isAvaliable == 0) {
            const matchingEntries = res?.data?.availableDaterangeList?.filter(
              (e) =>
                e.employee_id === entry.employee_id &&
                e.start_date === entry.start_date &&
                e.start_time === entry.start_time &&
                e.end_date === entry.end_date &&
                e.end_time === entry.end_time &&
                e.isAvaliable == 1
            );
            return matchingEntries.length === 0;
          }
          return true;
        });
        setSchedules(filteredData);
      } else {
        toaster(res?.message, TOAST_TYPES.ERROR);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployee();
  }, []);

  useEffect(() => {
    const start = startOfWeek.format("YYYY-MM-DD");
    const end = startOfWeek.add(6, "days").format("YYYY-MM-DD");
    getSchedules(start, end);
  }, [startOfWeek]);

  const handlePrevWeek = () => {
    setStartOfWeek(startOfWeek.subtract(1, "week"));
  };

  const handleNextWeek = () => {
    setStartOfWeek(startOfWeek.add(1, "week"));
  };

  // const isEmployeeNotScheduled = (employeeId) => {
  //   const employeeSchedules = schedules.filter((s) => s.employee_id === employeeId);
  //   return employeeSchedules.length === 0;
  // };

  // const mergeTimeRanges = (schedules) => {
  //   if (schedules.length === 0) return [];

  //   const sortedSchedules = schedules.sort(
  //     (a, b) =>
  //       moment(a.start_time + " " + a.start_type, ["HH:mm:ss A", "HH:mm:ss"]) -
  //       moment(b.start_time + " " + b.start_type, ["HH:mm:ss A", "HH:mm:ss"])
  //   );

  //   const mergedRanges = [];
  //   let currentRange = sortedSchedules[0];

  //   for (let i = 1; i < sortedSchedules.length; i++) {
  //     const schedule = sortedSchedules[i];
  //     const currentEndTime = moment(
  //       currentRange.end_time + " " + currentRange.end_type,
  //       "HH:mm:ss a"
  //     );
  //     const nextStartTime = moment(schedule.start_time + " " + schedule.start_type, "HH:mm:ss a");

  //     if (
  //       currentEndTime.isSameOrAfter(nextStartTime) ||
  //       currentEndTime.add(1, "minute").isSameOrAfter(nextStartTime)
  //     ) {
  //       currentRange.end_time = moment
  //         .max(currentEndTime, moment(schedule.end_time, "HH:mm:ss"))
  //         .format("hh:mm:ss");
  //       if (schedule.isAvaliable == 1) {
  //         currentRange.isAvaliable = 1;
  //       }
  //     } else {
  //       mergedRanges.push(currentRange);
  //       currentRange = schedule;
  //     }
  //   }
  //   mergedRanges.push(currentRange);
  //   return mergedRanges;
  // };

  // const renderScheduleCell = (employeeId, date) => {
  //   const schedulesForDate = schedules.filter((s) => {
  //     const startDate = dayjs(s.start_date);
  //     const endDate = dayjs(s.end_date);
  //     const currentDate = dayjs(date);
  //     const daysAvailable = s?.days?.split(","); // Split the days field into an array
  //     const isAvailableOnDay = daysAvailable?.includes(currentDate.format("ddd")); // Check if the current day is in the days array
  //     return (
  //       s.employee_id === employeeId &&
  //       currentDate.isBetween(startDate, endDate, "day", "[]") &&
  //       isAvailableOnDay
  //     );
  //   });

  //   const availableSchedules = schedulesForDate.filter((s) => s.isAvaliable == 1);
  //   const unavailableSchedules = schedulesForDate.filter((s) => s.isAvaliable == 0);

  //   const mergedAvailableSchedules = mergeTimeRanges(availableSchedules);
  //   const mergedUnavailableSchedules = mergeTimeRanges(unavailableSchedules);

  //   const employeeNotScheduled = isEmployeeNotScheduled(employeeId);

  //   if (employeeNotScheduled) {
  //     return (
  //       <td key={date} className="unavailable">
  //         <h6 className="unavailable-date">Not Scheduled</h6>
  //       </td>
  //     );
  //   }

  //   if (mergedAvailableSchedules.length === 0 && mergedUnavailableSchedules.length === 0) {
  //     return (
  //       <td key={date} className="unavailable">
  //         <h6 className="unavailable-date">
  //           <div>
  //             <i>
  //               <Image isContainImg={true} alt="sitback" src="/images/group-icon.svg" />
  //             </i>
  //           </div>
  //           Unavailable
  //         </h6>
  //       </td>
  //     );
  //   }

  //   return (
  //     <td key={date}>
  //       {mergedAvailableSchedules.map((schedule, index) => (
  //         <h6 key={index}>
  //           <div>
  //             <i>
  //               <Image isContainImg={true} alt="sitback" src="/images/Rectangle.svg" />
  //             </i>
  //           </div>
  //           {`${moment(schedule.start_time, "HH:mm:ss").format("HH:mm")} ${
  //             schedule.start_type
  //           } - ${moment(schedule.end_time, "HH:mm:ss").format("HH:mm")} ${schedule.end_type}`}
  //         </h6>
  //       ))}
  //       {mergedUnavailableSchedules.map((schedule, index) => (
  //         <h6 className="unavailable-date" key={index}>
  //           <div>
  //             <i>
  //               <Image isContainImg={true} alt="sitback" src="/images/TimeCircle.svg" />
  //             </i>
  //           </div>
  //           {`${moment(schedule.start_time, "HH:mm:ss").format("HH:mm")} ${
  //             schedule.start_type
  //           } - ${moment(schedule.end_time, "HH:mm:ss").format("HH:mm")} ${schedule.end_type}`}
  //         </h6>
  //       ))}
  //     </td>
  //   );
  // };

  const renderTable = () => {
    const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
      startOfWeek.add(i, "day").format("YYYY-MM-DD")
    );
    return (
      <TableWrapperMain className="sitback-employee-hours-updated-wrapper">
        <Loader loading={loading} />
        <Table responsive bordered>
          <thead>
            <tr>
              <th>Employee</th>
              {daysOfWeek.map((date) => {
                return <th key={date}>{dayjs(date).format("MMM DD, ddd")}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {!loading && provider.length > 0 ? (
              <>
                {schedules.map((employee) => {
                  return (
                    <tr key={employee.id}>
                      <td>
                        <div className="employee-detail-wrapper">
                          <div className="employee-img">
                            <Image
                              alt="employee"
                              src={employee.image || "/images/sitback-relax-logo.svg"}
                              onError={(e) => {
                                e.target.src = userDummyImage;
                              }}
                            />
                          </div>
                          {employee.name?.length > 11 ? (
                            <p>{employee.name.substring(0, 10)}...</p>
                          ) : (
                            <p>{employee.name}</p>
                          )}
                        </div>
                      </td>
                      {employee?.dateArr.map((data) => {
                        // Loop through each date in the data
                        return (
                          <>
                            {Object.keys(data).map((date) => {
                              const schedules = data[date]; // Access the array of schedules for this date
                              // Determine the content to render inside <td>
                              let content;

                              if (schedules.length > 0) {
                                if (schedules === "notSchedule" || schedules === "unavailable") {
                                  content =
                                    schedules === "unavailable" ? (
                                      <>
                                        <h6 className="unavailable-date">
                                          <div>
                                            <i>
                                              <Image
                                                isContainImg={true}
                                                alt="sitback"
                                                src="/images/group-icon.svg"
                                              />
                                            </i>
                                          </div>
                                          Unavailable
                                        </h6>
                                      </>
                                    ) : (
                                      <h6 className="unavailable-date">Not Scheduled</h6>
                                    );
                                } else {
                                  content = schedules.map((schedule, index) => {
                                    if (schedule?.isAvaliable === 0) {
                                      return (
                                        <h6 className="unavailable-date" key={index}>
                                          <div>
                                            <i>
                                              <Image
                                                isContainImg={true}
                                                alt="sitback"
                                                src="/images/TimeCircle.svg"
                                              />
                                            </i>
                                          </div>
                                          {`${moment(schedule.start_time, "HH:mm:ss").format(
                                            "HH:mm"
                                          )} ${schedule.start_type} - ${moment(
                                            schedule.end_time,
                                            "HH:mm:ss"
                                          ).format("HH:mm")} ${schedule.end_type}`}
                                        </h6>
                                      );
                                    } else {
                                      return (
                                        <h6 key={index}>
                                          <div>
                                            <i>
                                              <Image
                                                isContainImg={true}
                                                alt="sitback"
                                                src="/images/Rectangle.svg"
                                              />
                                            </i>
                                          </div>
                                          {`${moment(schedule.start_time, "HH:mm:ss").format(
                                            "HH:mm"
                                          )} ${schedule.start_type} - ${moment(
                                            schedule.end_time,
                                            "HH:mm:ss"
                                          ).format("HH:mm")} ${schedule.end_type}`}
                                        </h6>
                                      );
                                    }
                                  });
                                }
                              } else {
                                content = (
                                  <h6 className="unavailable-date">
                                    <div>
                                      <i>
                                        <Image
                                          isContainImg={true}
                                          alt="sitback"
                                          src="/images/group-icon.svg"
                                        />
                                      </i>
                                    </div>
                                    Unavailable
                                  </h6>
                                );
                              }

                              // Return a single <td> that contains the content determined above
                              return <td key={date}>{content}</td>;
                            })}
                          </>
                        );
                      })}
                    </tr>
                  );
                })}
              </>
            ) : (
              !loading && (
                <tr>
                  <td colSpan="8" className="text-center">
                    Record not found
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </TableWrapperMain>
    );
  };

  const getWeekTitle = () => {
    const currentWeekStart = dayjs().startOf("week").add(1, "day"); // Start from Monday
    const start = startOfWeek.format("MMM DD, YYYY"); // Use "MMM" for abbreviated month name
    const end = startOfWeek.add(6, "days").format("MMM DD, YYYY");

    if (startOfWeek.isSame(currentWeekStart, "week")) {
      return `This Week ${startOfWeek.format("YYYY")}`;
    } else if (startOfWeek.isBefore(currentWeekStart, "week")) {
      return `${start} - ${end}`;
    } else {
      return `${start} - ${end}`;
    }
  };

  return (
    <MainLayoutWrapper>
      <RemployeeHoursCalendarLayout className="sitback-employee-hours-updated-wrapper">
        <Container>
          <div className="sitback-employee-inner-div">
            <div className="legend-list-block-wrapper">
              <ul>
                <li>Legend :</li>
                <li>
                  <i>
                    <Image isContainImg={true} alt="sitback" src="/images/Rectangle.svg" />
                  </i>
                  Available
                </li>
                <li>
                  <i>
                    <Image isContainImg={true} alt="sitback" src="/images/group-icon.svg" />
                  </i>
                  Unavailable
                </li>
                <li>
                  <i>
                    <Image isContainImg={true} alt="sitback" src="/images/TimeCircle.svg" />
                  </i>
                  Partially Unavailable
                </li>
              </ul>
            </div>
            <div className="calendar-section">
              <div className="specificevent-headerbar">
                <button onClick={handlePrevWeek}>
                  <Image isContainImg={true} alt="sitback" src="/images/calender-arrow.svg" />
                </button>
                <span>{getWeekTitle()}</span>
                <button onClick={handleNextWeek} className="nextweek-btn">
                  <Image isContainImg={true} alt="sitback" src="/images/calender-arrow.svg" />
                </button>
              </div>
              {renderTable()}
            </div>
          </div>
        </Container>
      </RemployeeHoursCalendarLayout>
    </MainLayoutWrapper>
  );
}
