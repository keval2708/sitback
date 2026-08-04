import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Col, Overlay, Row, Table, Tooltip } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
import InlineSVG from "svg-inline-react";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import { Button } from "@/styles/global/main.style";
import { Calendar_icon, Info_icon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

export const Analyrtics = () => {
  // const
  const { t } = useTranslation();
  const today = moment().format("YYYY-MM-DD");

  // state
  const [analyticsData, setAnalyticsData] = useState({ totalEarning: 0 });

  //hooks
  const { toaster } = useToaster();
  const [dateRange, setDateRange] = useState([null, null]);
  const [loading, setLoading] = useState(false);
  const [customStartDate, customEndDate] = dateRange;
  const [activeTab, setActiveTab] = useState(0);
  const targets = useRef(null);
  const tooltipRef = useRef(null);
  const [showToolTip, setShowToolTip] = useState(false);

  const handleCustomDate = () => {
    setActiveTab(5);
    if (customStartDate !== null && customEndDate !== null) {
      dateChange(32);
    }
  };



  // methods

  const dateChange = async (start) => {
    let startDate, endDate;
    // const today = moment();
    switch (start) {
      case 0:
        startDate = moment().format("YYYY-MM-DD");
        endDate = moment().format("YYYY-MM-DD");
        break;
      case 1:
        startDate = moment().subtract(1, "days").format("YYYY-MM-DD");
        endDate = moment().subtract(1, "days").format("YYYY-MM-DD");
        break;
      case 6:
        startDate = moment().subtract(6, "days").format("YYYY-MM-DD");
        endDate = moment().format("YYYY-MM-DD");
        break;
      case 30:
        startDate = moment().subtract(30, "days").format("YYYY-MM-DD");
        endDate = moment().format("YYYY-MM-DD");
        break;
      case 31:
        startDate = moment().subtract(1, "months").startOf("month").format("YYYY-MM-DD");
        endDate = moment().subtract(1, "months").endOf("month").format("YYYY-MM-DD");
        break;
      case 32:
        startDate = moment(customStartDate).format("YYYY-MM-DD");
        endDate = moment(customEndDate).format("YYYY-MM-DD");
        break;
      default:
        startDate = moment().format("YYYY-MM-DD");
        endDate = null;
    }

    await getAnalystic(startDate, endDate);
  };

  const getAnalystic = async (startDate, endDate) => {
    try {
      setLoading(true);
      const param = {
        startDate: startDate,
        endDate: endDate,
      };
      const res = await axiosApiCall.post(API_ROUTER?.ANALYSTIC_LIST, param);
      if (!res?.status) {
        return useToaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setAnalyticsData(res?.data?.data);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const socketEventListener = async (msg) => {
      if (msg.action == "newOrderArrived" || msg.action == "new_booking_from_user" || msg.action == "auto_no_show_guest_booking_alert" || msg.action == "cancelBookingSpa" ||
        msg.action == "auto_no_show_user_booking_alert" || msg.action == "auto_start_service_user_booking_alert"
        || msg.action == "auto_start_service_guest_booking_alert" || msg.action == "compltedBySpa" || msg.action == 'new_booking_from_spa') {
        if (activeTab == 0 || activeTab == 1) {
          await dateChange(activeTab);
        } else if (activeTab == 2) {
          await dateChange(6);
        } else if (activeTab == 3) {
          await dateChange(30);
        } else if (activeTab == 4) {
          await dateChange(31);
        }
      }
    };

    if (window.io) {
      window.io.socket.on("serviceprovider", socketEventListener);
    }

    return () => {
      if (window.io) {
        window.io.socket.off("serviceprovider", socketEventListener);
      }
    };
  }, [activeTab, dateChange]);

  useEffect(() => {
    if (customStartDate !== null && customEndDate !== null) {
      dateChange(32);
    } else {
      getAnalystic(today);
    }
  }, [dateRange]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target) &&
        !targets.current.contains(event.target)
      ) {
        setShowToolTip(false); // Hide the tooltip if clicked outside
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup the event listener when the component is unmounted or when showToolTip changes
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showToolTip]);


  return (
    <Row>
      <Col sm={12}>
        <ul className="sitback-calender-week-header">
          <li
            className={activeTab == 0 ? "active" : ""}
            onClick={() => {
              dateChange(0);
              setActiveTab(0);
            }}
          >
            {t("today")}
          </li>
          <li
            className={activeTab == 1 ? "active" : ""}
            onClick={() => {
              dateChange(1);
              setActiveTab(1);
            }}
          >
            {t("yesterday")}
          </li>
          <li
            className={activeTab == 2 ? "active" : ""}
            onClick={() => {
              dateChange(6), setActiveTab(2);
            }}
          >
            {t("last7Day")}
          </li>
          <li
            className={activeTab == 3 ? "active" : ""}
            onClick={() => {
              dateChange(30), setActiveTab(3);
            }}
          >
            {t("last30Days")}
          </li>
          <li
            className={activeTab == 4 ? "active" : ""}
            onClick={() => {
              dateChange(31), setActiveTab(4);
            }}
          >
            {t("lastMonth")}
          </li>
          <li className={activeTab == 5 ? "active" : ""} onClick={() => handleCustomDate()}>
            <ReactDatePicker
              showIcon
              selectsRange={true}
              startDate={customStartDate}
              endDate={customEndDate}
              placeholderText="Custom dates"
              onChange={(update) => {
                setDateRange(update);
              }}
              isClearable={true}
              icon={
                <InlineSVG
                  src={Calendar_icon}
                  className="global_laguage_icon"
                  onClick={() => handleCustomDate()}
                />
              }
              onKeyDown={(e) => {
                e.preventDefault();
              }}
            // withPortal
            />
          </li>
        </ul>
      </Col>
      <Col md={12} lg={7}>
        <div className="sitback-insights-tab-wrapper sitback-updated-inner-insight-div">
          <div className="sitback-marketing-list-wrapper">
            <div className="sitback-marketing">
              <span className="totalEarningText">
                Total Earning{" "}
                <p>
                  (Excluding all charges){" "}
                  <span
                    ref={targets}
                    onMouseEnter={() => setShowToolTip(true)}
                    onMouseLeave={() => setShowToolTip(false)}
                  >
                    <InlineSVG
                      src={Info_icon}
                      data-tooltip-id="my-tooltip-1"
                      className="global_laguage_icon"
                    />
                  </span>
                  <Overlay
                    target={targets.current}
                    show={showToolTip}
                    placement="right"
                    ref={tooltipRef}
                  >
                    {(props) => (
                      <Tooltip id="overlay-example" {...props}>
                        <p>
                          Please note that the total earnings displayed do not include tip amounts
                          given by customers to service specialists, as well as Stripe fees and
                          transaction fees.
                        </p>
                      </Tooltip>
                    )}
                  </Overlay>
                </p>
              </span>
              {analyticsData?.totalEarning ? (
                <h5 className="sitback-subtitle-text">
                  ${parseFloat(analyticsData?.totalEarning)?.toFixed(2)}
                </h5>
              ) : (
                <h5 className="sitback-subtitle-text">-</h5>
              )}
            </div>
            <div className="sitback-marketing-icon-div">
              <img src="/images/total-earning-icon.svg" alt="Total Earning" />
            </div>
          </div>
          <div className="sitback-marketing-list-wrapper">
            <div className="sitback-marketing">
              <span>{t("bookings")}</span>
              <h5 className="sitback-subtitle-text">{analyticsData?.totalBooked || "-"}</h5>
            </div>
            <div className="sitback-marketing-icon-div">
              <img src="/images/total-earning-icon.svg" alt="Total Earning" />
            </div>
          </div>
          <div className="sitback-marketing-list-wrapper">
            <div className="sitback-marketing">
              <span>{t("cancellation")}</span>
              <h5 className="sitback-subtitle-text">{analyticsData?.totalCancelled || "-"}</h5>
            </div>
            <div className="sitback-marketing-icon-div">
              <img src="/images/cancellation-icon.svg" alt="Total Earning" />
            </div>
          </div>
        </div>
        <div className="sitback-insights-tab-wrapper sitback-updated-inner-insight-div">
          <div className="sitback-customer-activity-block">
            <h5 className="sitback-subtitle-text">{t("customerActivity")}</h5>
          </div>
          <div className="CustomerActivity sitback-updated-customer-activity-table-wrapper">
            {analyticsData?.totalNotification && analyticsData?.totalNotification?.length > 0 ? (
              <Table striped hover>
                <tbody>
                  {analyticsData?.totalNotification?.map((activity, key) => (
                    <tr key={key}>
                      <td>
                        <div>
                          <h4>{activity?.username}</h4>
                          <h6>{activity?.name}</h6>
                        </div>
                      </td>
                      <td>
                        {activity?.bookingstatus == 0 ? (
                          <button className="approved-btn">{t("pendingCaps")}</button>
                        ) : (
                          <></>
                        )}
                        {activity?.bookingstatus == 1 ? (
                          <button className="cancelled-btn">{t("cancelledCaps")}</button>
                        ) : (
                          <></>
                        )}
                        {activity?.bookingstatus == 2 ? (
                          <button className="cancelled-btn">{t("noShow")}</button>
                        ) : (
                          <></>
                        )}

                        {activity?.bookingstatus == 3 ? (
                          <button className="approved-btn">{t("completed")}</button>
                        ) : (
                          <></>
                        )}
                        {activity?.bookingstatus == 4 ? (
                          <button className="approved-btn">{t("startedCaps")}</button>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td>
                        <span className="date-text">
                          {moment(activity?.date).format("DD MMMM YYYY")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p style={{ textAlign: "center" }} className="no-data-text">
                {t("noDataAvail")}
              </p>
            )}
          </div>
        </div>
      </Col>

      <Col md={12} lg={5}>
        {analyticsData?.totalService && analyticsData?.totalService?.length > 0 && (
          <div className="sitback-insights-tab-wrapper sitback-updated-inner-insight-div">
            <div className="sitback-customer-activity-block">
              <h5 className="sitback-subtitle-text">{t("bestSelling")}</h5>
              <div className="sitback-service-ranking-block">
                {analyticsData?.totalService?.map((service, key) => {
                  return (
                    <div className="sitback-service-ranking-list" key={key}>
                      <div className="sitback-service-icon-block">
                        <h5>{service?.name}</h5>
                      </div>
                      <div>
                        <p>${service?.total_charge}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        <div className="sitback-insights-tab-wrapper comingsoon-block-wrapper sitback-updated-inner-insight-div">
          <div className="sitback-competitor-block">
            <div className="competitor-coming-soon-text">
              <h5 className="sitback-subtitle-text">{t("competitorData")}</h5>
              <h6>{t("comingSoon")}</h6>
            </div>
            <div className="sitback-booked-services-btn">
              <button>{t("topBooked")}</button>
              <button>{t("topOffering")}</button>
            </div>
            <Button className="upgrade-access-btn">{t("upgradeToAccess")}</Button>
          </div>
        </div>
      </Col>
    </Row>
  );
};
