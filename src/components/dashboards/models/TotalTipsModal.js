import moment from "moment";
import React, { memo, useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import InlineSVG from "svg-inline-react";
import Loader from "@/components/shared/spinner/loader";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import { TableWrapperMain } from "@/styles/global/main.style";
import { Calendar_icon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const TotalTipsModal = ({ show, onHide = () => { }, showTipData }) => {
  // state
  const [loading, setLoading] = useState(false);

  // hooks
  const { toaster } = useToaster();

  // Default date range: today and one week ago
  const today = new Date();
  const oneWeekAgo = moment().subtract(7, "days").toDate();

  const [dateRange, setDateRange] = useState([oneWeekAgo, today]);
  const [customStartDate, customEndDate] = dateRange;
  const [totalEmployeTipData, setTotalEmployeTipData] = useState(null); // Initialize as null

  // methods
  const employeDtata = async (startDate, endDate) => {
    try {
      setLoading(true); // Start loading
      setTotalEmployeTipData(null); // Clear data to avoid showing outdated data
      if (startDate && endDate && showTipData) {
        let param = {
          employee_id: showTipData?.id,
          start_date: startDate,
          end_date: endDate,
        };
        const res = await axiosApiCall.post(API_ROUTER?.EMPLOYEE_TIP, param);
        if (!res?.status) {
          toaster(res?.message, TOAST_TYPES.ERROR);
        } else {
          setTotalEmployeTipData(res); // Set new data after loading
        }
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    if (dateRange[0] && dateRange[1]) {
      const startDate = moment(dateRange[0]).format("YYYY-MM-DD");
      const endDate = moment(dateRange[1]).format("YYYY-MM-DD");

      employeDtata(startDate, endDate);
    }
  }, [dateRange, showTipData]);

  const cancel = async () => {
    onHide();
    setTotalEmployeTipData(null); // Clear data on cancel
    setDateRange([oneWeekAgo, today]);
  };

  const handleCustomDate = () => {
    if (customStartDate !== null && customEndDate !== null) {
      dateChange(32);
    }
  };

  const dateChange = async (start) => {
    let startDate, endDate;
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

    await employeDtata(startDate, endDate);
  };

  return (
    <Modal
      show={show}
      aria-labelledby="example-modal-sizes-title-lg"
      centered
      className="sitback-modal-wrapper sitback-payment-reminder-modal sitback-payment-reminderV2-modal sitback-updated-profile-service-modal"
    >
      <Modal.Header
        closeButton
        className="red-close-icon"
        style={{ zIndex: "9" }}
        onClick={() => cancel()}
      ></Modal.Header>
      <Modal.Body className="pt-0" style={{ marginTop: "-35px" }}>
        <div className="payment-reminder-section">
          <div className="payment-header-date-wrapper">
            <h2>{showTipData?.name}</h2>
            <ReactDatePicker
              showIcon
              selectsRange={true}
              startDate={customStartDate}
              endDate={customEndDate}
              placeholderText="Custom dates"
              onChange={(update) => {
                setDateRange(update);
              }}
              onKeyDown={(e) => {
                e.preventDefault();
              }}
              isClearable={true}
              icon={<InlineSVG src={Calendar_icon} className="global_laguage_icon" />}
            />
          </div>
          <div className="Payment-detail-wrapper">
            <TableWrapperMain>
              <Table responsive bordered>
                <thead>
                  <tr>
                    <th>Appointment Date</th>
                    <th>Client Name</th>
                    <th>Service Name</th>
                    <th>Amount of Tip</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4">
                        <Loader loading={loading}  className="background-transparent"/>
                      </td>
                    </tr>
                  ) : totalEmployeTipData?.data?.data?.length > 0 ? (
                    totalEmployeTipData?.data?.data?.map((dt, key) => {
                      const isOddIndex = key % 2 !== 0;
                      const DateView =
                        dt?.date && dt?.slot_time && dt?.time_type
                          ? moment(
                            `${dt.date} ${dt.slot_time} ${dt.time_type}`,
                            "YYYY-MM-DD h:mm a"
                          ).format("MMM Do YYYY, h:mm A")
                          : "-";

                      return (
                        <tr
                          key={key}
                          style={{
                            backgroundColor: isOddIndex ? "#f9f9f9" : "#ffffff", // Light gray for odd index, white for even
                          }}
                        >
                          <td>{DateView}</td>
                          <td>
                            {dt?.username?.length > 10 ? (
                              <p>{dt?.username?.substring(0, 11)}...</p>
                            ) : (
                              <p>{dt?.username ? dt?.username : "-"}</p>
                            )}
                          </td>
                          <td>{dt?.name}</td>
                          <td>${dt?.tip}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No data found
                      </td>
                    </tr>
                  )}
                  {/* Total amount row */}
                  {totalEmployeTipData?.data?.totalTip > 0 && !loading && (
                    <tr style={{ backgroundColor: "#ffffff" }}>
                      <td colSpan="3" style={{ textAlign: "right" }}>
                        <strong>Total Amount</strong>
                      </td>
                      {totalEmployeTipData?.data?.totalTip > 0 ? (
                        <>
                          <td>
                            <strong>${totalEmployeTipData?.data?.totalTip}</strong>
                          </td>
                        </>
                      ) : (
                        ""
                      )}
                    </tr>
                  )}
                </tbody>
              </Table>
            </TableWrapperMain>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default memo(TotalTipsModal);
