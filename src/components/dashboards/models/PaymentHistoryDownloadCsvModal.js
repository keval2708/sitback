import { Parser } from "json2csv";
import moment from "moment";
import React, { memo, useEffect, useState } from "react";
import {Modal } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import InlineSVG from "svg-inline-react";
import Loader from "@/components/shared/spinner/loader";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import {
  Button,
} from '@/styles/global/main.style';
import { Calendar_icon, download_icon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
const PaymentHistoryDownloadCsvModal = ({ show, onHide = () => {} }) => {
  // state
  const [loading, setLoading] = useState(false);
  const [showDownloadButton, setShowDownloadButton] = useState(true);


  // hooks
  const { toaster } = useToaster();

  // Default date range: today and one week ago
  const today = new Date();
  const oneWeekAgo = moment().subtract(7, "days").toDate();

  const [dateRange, setDateRange] = useState([oneWeekAgo, today]);
  const [customStartDate, customEndDate] = dateRange;
  const [csvDownloadData, setCsvDownloadData] = useState(null); // Initialize as null

  // methods
  const paymentHistoryCsvData = async (startDate, endDate) => {
    try {
      setLoading(true); // Start loading
      setCsvDownloadData(null); // Clear data to avoid showing outdated data
      if (startDate && endDate) {
        let param = { start_date: startDate, end_date: endDate };
        const res = await axiosApiCall.post(API_ROUTER?.PAYMENT_HISTORY_CSV_DOWNLOAD, param);
        if (!res?.status) {
          toaster(res?.message, TOAST_TYPES.ERROR);
        } else {
          //console.log("res",res?.data?.data);
          setCsvDownloadData(res?.data?.data); // Set new data after loading
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
      setShowDownloadButton(true)
      const startDate = moment(dateRange[0]).format("YYYY-MM-DD");
      const endDate = moment(dateRange[1]).format("YYYY-MM-DD");
      paymentHistoryCsvData(startDate, endDate);
    } else {
      setShowDownloadButton(false)
    }
  }, [dateRange]);

  const cancel = () => {
    onHide();
    setCsvDownloadData(null); // Clear data on cancel
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
    await paymentHistoryCsvData(startDate, endDate);
  };

  const downloadCSV = () => {
    if (csvDownloadData.length === 0) {
      toaster("No records are available to download in payment history for given date range.", TOAST_TYPES.ERROR);
      return;
    }

    try {
      // Define the fields you want in the CSV
      const fields = [
        { label: "Date", value: "date" },
        { label: "Description", value: "historyname" },
        {label: "Products", value: "posnames"},
        {label: "Total Product Charges", value: (row) =>  row.postotalcharges ? parseFloat(row.postotalcharges).toFixed(2) : ''},
        {label: "Tip Employee Name", value: "tipemployeename"},
        {label: "Tip Amount", value: (row) => row.tip ? parseFloat(row.tip).toFixed(2) : ''},
        {label: "Service Charge", value: (row) => row.serviceTotalCharge ? parseFloat(row.serviceTotalCharge).toFixed(2) : ''},
        {
          label: "Platform Charge (Subscription fee and other charges are included.)",
          value: (row) => row.totalPlateformcharge && !isNaN(parseFloat(row.totalPlateformcharge))
            ? parseFloat(row.totalPlateformcharge).toFixed(2)
            : ''
        },
        { label: "Amount", value: (row) => row.totalCountAmount ? parseFloat(row.totalCountAmount).toFixed(2) : '' },
        { label: "Status", value: "status" },

        // Add any additional fields here
      ];

      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(csvDownloadData);

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", `Payment History.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      // console.error("CSV generation error:", error);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  return (
    <Modal
      show={show}
      aria-labelledby="example-modal-sizes-title-lg"
      centered
      className="sitback-modal-wrapper sitback-payment-reminder-modal sitback-modalv2-wrapper"
    >
      <Modal.Header
        closeButton
        className="red-close-icon"
        style={{ zIndex: "9" }}
        onClick={cancel}
      ></Modal.Header>
      <Modal.Body className="pt-0" style={{ marginTop: "-20px" }}>
        <div className="payment-reminder-section">
          <div className="payment-header-date-wrapper">
            <h2 className="mb-3">Payment History Download</h2>
            <ReactDatePicker
              showIcon
              selectsRange={true}
              startDate={customStartDate}
              endDate={customEndDate}
              placeholderText="Custom dates"
              onChange={(update) => setDateRange(update)}
              isClearable={true}
              icon={<InlineSVG src={Calendar_icon} className="global_laguage_icon" />}
              onKeyDown={(e) => {
                e.preventDefault();
              }}
            />
          </div>
          {loading ? (
            <Loader loading={loading} />
          ) : (
            showDownloadButton && (
              <div>
                <Button variant="primary" className="download-btn-wrapper" onClick={downloadCSV}>
                  Download
                  <InlineSVG src={download_icon} className="global_language_icon" />
                </Button>
              </div>
            )
          )}

        </div>
      </Modal.Body>
    </Modal>
  );
};

export default memo(PaymentHistoryDownloadCsvModal);
