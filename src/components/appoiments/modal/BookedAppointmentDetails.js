import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import CancelAppointmentModal from "./cancelAppointmentModal";
import CheckInModal from "./checkinConfirmationModa";
import NoShowModal from "./noShowServiceModal";
import PaymentOption from "./paymentOption";
import StartServiceModal from "./starServiceModal";
import { API_ROUTER } from "@/services/apiRouter";
import {
  ReviewAvatar,
  ReviewHeader,
  ReviewSubtitle,
  ReviewTitle,
  SidebarContainer,
  SidebarDatePickerCell,
  SidebarDateTimeButton,
  SidebarDateTimeRow,
  SidebarDivider,
  SidebarForm,
  SidebarHeader,
  SidebarTimePickerCell,
  SidebarTitle,
  SidebarTitleRow,
} from "@/styles/pages/new-custom-calendar.style";
import axiosApiCall from "@/utils/axios";

const BookedAppointmentDetails = ({
  bookedAppointment,
  onClose,
  setIsEditing,
  onSuccess,
  onStatusUpdate,
  scheduleSummary,
}) => {
  console.log("bookedAppointment", bookedAppointment);
  const [showMenu, setShowMenu] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [showNoShowModal, setShowNoShowModal] = useState(false);
  const [showStartServiceModal, setShowStartServiceModal] = useState(false);
  const [showPaymentOption, setShowPaymentOption] = useState(false);
  const [providerData, setProviderData] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await axiosApiCall.get(API_ROUTER?.ACTIVE_EMPLOYEE_LIST);
        if (res?.status) {
          setProviderData(res?.data?.data || []);
        }
      } catch (err) {
        console.error("Error fetching providers in details:", err);
      }
    };
    fetchProviders();
  }, []);

  const bookingStatus = Number(bookedAppointment?.bookingstatus ?? 0);
  const checkInStatus = Number(bookedAppointment?.checkinstatus ?? 0);

  const isPast = useMemo(() => {
    if (!bookedAppointment) return false;
    const dateStr = bookedAppointment.date || bookedAppointment.orderDate;
    const timeStr = bookedAppointment.start_time;
    if (!dateStr || !timeStr) return false;
    const appointmentMoment = moment(`${dateStr} ${timeStr}`, "YYYY-MM-DD hh:mm A");
    return appointmentMoment.isBefore(moment());
  }, [bookedAppointment]);

  const clientNameVal = bookedAppointment?.client?.clientName || "Client";
  const specialistNameVal = bookedAppointment?.employee?.employeeName || "Specialist";

  const durationMinsVal = bookedAppointment?.service ? ((bookedAppointment.service.hour || 0) * 60 + (bookedAppointment.service.minutes || 0)) : 60;

  const handleUpdateBookingU = () => {
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleCancelSuccess = () => {
    setShowCancelModal(false);
    if (onSuccess) {
      onSuccess();
    }
    if (onClose) {
      onClose();
    }
  };

  const handleCheckInSuccess = () => {
    onStatusUpdate?.({
      bookingstatus: 4,
      checkinstatus: 1,
    });
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleCompleteSuccess = () => {
    onStatusUpdate?.({
      bookingstatus: 3,
    });
    if (onSuccess) {
      onSuccess();
    }
  };

  const handlePaymentSuccess = () => {
    setShowPaymentOption(false);
    onStatusUpdate?.({
      bookingstatus: 3,
    });
    if (onSuccess) {
      onSuccess();
    }
    if (onClose) {
      onClose();
    }
  };

  const getStatusText = (status, checkin, cancelByType) => {
    const s = status !== undefined && status !== null ? Number(status) : 0;
    const c = checkin !== undefined && checkin !== null ? Number(checkin) : 0;

    if (s === 1) {
      let cancelText = "Cancelled";
      if (cancelByType === "serviceProvider") cancelText = "Cancelled (Spa)";
      else if (cancelByType === "user") cancelText = "Cancelled (Client)";
      return { text: cancelText, color: "#EF4444", bg: "#FEE2E2" };
    }
    if (s === 2) return { text: "No Show", color: "#6B7280", bg: "#F3F4F6" };
    if (s === 3) return { text: "Service Completed", color: "#10B981", bg: "#D1FAE5" };
    if (s === 4) return { text: "In Progress", color: "#3B82F6", bg: "#DBEAFE" };
    if (s === 5) return { text: "Ready to Complete", color: "#0F766E", bg: "#CCFBF1" };
    if (c === 1) return { text: "Checked In", color: "#8B5CF6", bg: "#EDE9FE" };
    return { text: "Confirmed", color: "#10B981", bg: "#D1FAE5" };
  };

  const getPaymentByLabel = (appointment) => {
    const bookingStatus = Number(appointment?.bookingstatus ?? appointment?.bookingStatus ?? 0);
    const isPaymentDone = Number(appointment?.isPaymentDone ?? 0);
    const paymentBy = String(appointment?.paymentBy || appointment?.payment_by || "").toLowerCase();

     if ((bookingStatus === 4 || bookingStatus === 0 || bookingStatus === 5) && isPaymentDone === 0) {
      return "Pending";
    }
    if (isPaymentDone === 1 && paymentBy === "cash") {
      return "Paid(Cash)";
    }
    if (isPaymentDone === 1 && paymentBy === "card") {
      return "Paid(Card)";
    }
    return "-";
  };

  const formatDuration = (mins) => {
    if (!mins) return "";
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    if (hours > 0) {
      return `${hours} hr${hours > 1 ? "s" : ""}${remainingMins > 0 ? ` ${remainingMins} min${remainingMins > 1 ? "s" : ""}` : ""}`;
    }
    return `${mins} min${mins > 1 ? "s" : ""}`;
  };

  const getInitials = (fullName) => {
    if (!fullName) return "?";
    const parts = fullName.trim().split(" ");
    if (parts.length > 1) {
      return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }
    return fullName.charAt(0).toUpperCase();
  };

  const cancelModalData = useMemo(() => {
    if (!bookedAppointment) return null;
    const isGuest = bookedAppointment.btype === "guest";
    return {
      id: bookedAppointment?.bookingId,
      _def: {
        extendedProps: {
          type: isGuest ? "only_guest" : "only_main_user",
          mainUserId: isGuest ? bookedAppointment.mainUserId : bookedAppointment?.bookingId,
          isguest: isGuest ? 1 : 0
        }
      }
    };
  }, [bookedAppointment]);
  console.log("bookedAppointment", bookedAppointment);

  const paymentOptionData = useMemo(() => {
    if (!bookedAppointment) return null;
    return {
      ...bookedAppointment,
      id: bookedAppointment?.bookingId || bookedAppointment?.id,
      username: bookedAppointment?.client?.clientName || bookedAppointment?.username || "Client",
      userTotalAmount: bookedAppointment?.paymentCharge ||  bookedAppointment?.service?.price || 0,
    };
  }, [bookedAppointment]);

  if (!bookedAppointment) return null;

  const statusInfo = getStatusText(
    bookingStatus,
    checkInStatus,
    bookedAppointment?.cancel_by_type
  );

  const orderHistory = useMemo(() => {
    if (!bookedAppointment?.orderHistory) return {};
    if (typeof bookedAppointment.orderHistory === "string") {
      try {
        return JSON.parse(bookedAppointment.orderHistory);
      } catch (e) {
        console.error("Failed to parse orderHistory JSON", e);
        return {};
      }
    }
    return bookedAppointment.orderHistory;
  }, [bookedAppointment?.orderHistory]);

  const createdAtVal = orderHistory?.createdAt || bookedAppointment?.createdAt;
  const createdByVal = orderHistory?.created_by || bookedAppointment?.created_by;
  const updatedAtVal = orderHistory?.updatedAt || bookedAppointment?.updatedAt;
  const updatedByVal = orderHistory?.updated_by || bookedAppointment?.updated_by;

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarTitleRow>
          <SidebarTitle>Appointment</SidebarTitle>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            {!isPast && bookingStatus === 0 && (
              <>
                {/* Three dots button */}
                <div style={{ position: "relative" }}>
                  <button
                    type="button"
                    onClick={() => setShowMenu(!showMenu)}
                    style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#295086" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="#295086" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="#295086" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {showMenu && (
                    <div style={{
                      position: "absolute",
                      right: 0,
                      top: "30px",
                      background: "#fff",
                      border: "1px solid #E2E8F0",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                      zIndex: 100,
                      minWidth: "160px",
                      overflow: "hidden"
                    }}>
                      {/* Cancel Option */}
                      <button
                        type="button"
                        onClick={() => {
                          setShowMenu(false);
                          setShowCancelModal(true);
                        }}
                        style={{ width: "100%", padding: "10px 16px", textAlign: "left", background: "none", border: "none", fontSize: "14px", color: "#ef4444", cursor: "pointer", transition: "background 0.2s" }}
                        onMouseEnter={(e) => e.target.style.background = "#FEE2E2"}
                        onMouseLeave={(e) => e.target.style.background = "none"}
                      >
                        Cancel Booking
                      </button>
                    </div>
                  )}
                </div>
                {/* Edit Button */}
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
                >
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.75 15.75H15.75M12.56 7.23167L7.8875 11.9042C7.73126 12.0605 7.51933 12.1483 7.29833 12.1483H3.51833V8.36833C3.51838 8.14734 3.60621 7.93541 3.7625 7.77917L8.435 3.10667L10.7917 0.75L14.9167 4.875L12.56 7.23167ZM8.435 3.10667L12.56 7.23167" stroke="#345E97" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            )}
            {/* Close Cross Icon Button */}
            <button
              type="button"
              onClick={onClose}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", alignItems: "center" }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="#295086" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </SidebarTitleRow>
      </SidebarHeader>

      {/* Status Row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid #e2eefc", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: statusInfo.color }} />
          <span style={{ fontSize: "14px", fontWeight: "600", color: statusInfo.color }}>{statusInfo.text}</span>
        </div>
        {checkInStatus === 0 && bookingStatus === 0 && (
          <button
            type="button"
            onClick={() => setShowCheckInModal(true)}
            style={{
              border: "1px solid #CBD5E1",
              borderRadius: "100px",
              background: "#fff",
              color: "#295086",
              fontWeight: "600",
              fontSize: "13px",
              padding: "5px 16px",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = "#295086"; e.target.style.background = "#F8FAFC"; }}
            onMouseLeave={(e) => { e.target.style.borderColor = "#CBD5E1"; e.target.style.background = "#fff"; }}
          >
            Check-In
          </button>
        )}
        {checkInStatus === 1 && bookingStatus === 0 && (
          <button
            type="button"
            onClick={() => setShowStartServiceModal(true)}
            style={{
              border: "1px solid #295086",
              borderRadius: "100px",
              background: "#295086",
              color: "#fff",
              fontWeight: "600",
              fontSize: "13px",
              padding: "5px 16px",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => { e.target.style.background = "#1D3B64"; e.target.style.borderColor = "#1D3B64"; }}
            onMouseLeave={(e) => { e.target.style.background = "#295086"; e.target.style.borderColor = "#295086"; }}
          >
            Start Service
          </button>
        )}
        {bookingStatus === 4 && (
          <button
            type="button"
            disabled
            style={{
              border: "1px solid #CBD5E1",
              borderRadius: "100px",
              background: "#F1F5F9",
              color: "#94A3B8",
              fontWeight: "600",
              fontSize: "13px",
              padding: "5px 16px",
              cursor: "not-allowed",
            }}
          >
            Checked-In
          </button>
        )}
        {bookingStatus === 5 && (
          <button
            type="button"
            onClick={() => setShowPaymentOption(true)}
            style={{
              border: "1px solid #295086",
              borderRadius: "100px",
              background: "#295086",
              color: "#fff",
              fontWeight: "600",
              fontSize: "13px",
              padding: "5px 16px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.target.style.background = "#1D3B64"; e.target.style.borderColor = "#1D3B64"; }}
            onMouseLeave={(e) => { e.target.style.background = "#295086"; e.target.style.borderColor = "#295086"; }}
          >
            Complete
          </button>
        )}
      </div>

      {/* Date & Time Row */}
      <SidebarDateTimeRow>
        <SidebarDatePickerCell>
          <SidebarDateTimeButton type="button" style={{ cursor: "default" }}>
            On {moment(bookedAppointment.date || bookedAppointment.orderDate).format("ddd, MMM D")}
          </SidebarDateTimeButton>
        </SidebarDatePickerCell>
        <SidebarDivider />
        <SidebarTimePickerCell>
          <div className="sidebar-time-picker-wrap">
            <span className="label-prefix">At&nbsp;</span>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "#295086" }}>
              {moment(bookedAppointment.start_time, ["hh:mm A", "hh:mm:ss a", "hh:mm:ss A", "hh:mm a"]).format("h:mm A")}
            </span>
          </div>
        </SidebarTimePickerCell>
      </SidebarDateTimeRow>

      <SidebarForm>

        {/* Client Details Section */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <ReviewHeader>
            <ReviewAvatar>
              {bookedAppointment.client?.profile_image || bookedAppointment.client?.image ? (
                <img src={bookedAppointment.client?.profile_image || bookedAppointment.client?.image} alt={clientNameVal} />
              ) : (
                getInitials(clientNameVal)
              )}
            </ReviewAvatar>
            <ReviewTitle>{clientNameVal}</ReviewTitle>
            <ReviewSubtitle>
              Client Since {bookedAppointment.client_created_at ? moment(bookedAppointment?.client_created_at).format("MMMM YYYY") : "January 2026"}
            </ReviewSubtitle>
          </ReviewHeader>
          <button
            type="button"
            style={{
              background: "#0F4C81",
              color: "#fff",
              border: "none",
              borderRadius: "100px",
              padding: "8px 24px",
              fontWeight: "600",
              fontSize: "14px",
              cursor: "pointer",
              marginBottom: "16px"
            }}
          >
            Conversation
          </button>
          <div style={{ width: "100%", borderTop: "1px solid #F1F5F9", paddingTop: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #F1F5F9" }}>
              <span style={{ fontSize: "13px", color: "#64748B" }}>Phone:</span>
              <span style={{ fontSize: "13px", color: "#295086", fontWeight: "600" }}>
                {bookedAppointment?.client?.countrycode || bookedAppointment?.client?.phoneNumber
                  ? `${bookedAppointment.client.countrycode || ""} ${bookedAppointment.client.phoneNumber || ""}`.trim()
                  : "N/A"}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #F1F5F9" }}>
              <span style={{ fontSize: "13px", color: "#64748B" }}>Email Address:</span>
              <span style={{ fontSize: "13px", color: "#295086", fontWeight: "600" }}>
                {bookedAppointment?.client?.email || "N/A"}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 0 0" }}>
              <span style={{ fontSize: "13px", color: "#64748B" }}>Payment:</span>
              <span style={{ fontSize: "13px", color: getPaymentByLabel(bookedAppointment)?.toLowerCase() === "pending" ? "red" : "#295086", fontWeight: "600" }}>
                {getPaymentByLabel(bookedAppointment)}
              </span>
            </div>
          </div>
        </div>

        {/* Service Details Section */}
        <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "20px", marginBottom: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: "16px", fontWeight: "700", color: "#295086" }}>
              {bookedAppointment.service?.serviceName || bookedAppointment.service?.name || "Service"}
            </span>
            <span style={{ fontSize: "16px", fontWeight: "700", color: "#295086" }}>
              ${bookedAppointment.service?.price || 0}
            </span>
          </div>
          <div style={{ fontSize: "12px", color: "#64748B", marginTop: "4px" }}>
            with{" "}
            <span style={{ fontWeight: "700", color: "#295086" }}>
              {specialistNameVal}
            </span>

            {(bookedAppointment.notes || bookedAppointment.note) && (
              <>
                <br />
                Request:{" "}
                <span style={{ fontWeight: "700", color: "#295086" }}>
                  {bookedAppointment.notes || bookedAppointment.note}
                </span>
              </>
            )}
          </div>
          <div style={{ fontSize: "12px", color: "#64748B", marginTop: "4px" }}>
            at <span style={{ fontWeight: "700", color: "#295086" }}>{moment(bookedAppointment.start_time, ["hh:mm A", "hh:mm:ss a", "hh:mm:ss A", "hh:mm a"]).format("h:mm A")}</span> for <span style={{ fontWeight: "700", color: "#295086" }}>{formatDuration(durationMinsVal)}</span>
          </div>
        </div>

        {/* Booking Details (Blue Box) */}
        <div style={{ backgroundColor: "#F0F7FF", border: "1px solid #E0F2FE", borderRadius: "8px", padding: "16px", marginBottom: "10px" }}>
          <span style={{ fontSize: "11px", fontWeight: "700", color: "#0369A1", letterSpacing: "0.5px", display: "block", marginBottom: "12px" }}>BOOKING DETAILS</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", position: "relative" }}>
            {/* Continuous timeline vertical line */}
            <div style={{
              position: "absolute",
              left: "12px",
              transform: "translateX(-50%)",
              top: "12px",
              bottom: "12px",
              width: "2px",
              backgroundColor: "#E0F2FE",
              zIndex: 0
            }} />

            {/* Row 1: Booked On */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center", position: "relative", zIndex: 1 }}>
              <div style={{ width: "24px", display: "flex", justifyContent: "center", alignItems: "center", flexShrink: 0 }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#0284C7" }} />
              </div>
              <span style={{ fontSize: "12px", color: "#295086" }}>
                Booked On <span style={{ fontWeight: "600" }}>{createdAtVal ? moment(createdAtVal).format("ddd, MMM D [At] h:mm A") : "Fri, Apr 10 At 5:25 AM"}</span>
              </span>
            </div>

            {/* Row 2: Booked By */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center", position: "relative", zIndex: 1 }}>
              <div style={{ width: "24px", display: "flex", justifyContent: "center", alignItems: "center", flexShrink: 0 }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#94A3B8" }} />
              </div>
              <span style={{ fontSize: "12px", color: "#295086" }}>
                Booked By <span style={{ fontWeight: "600" }}>
                  {(typeof createdByVal === "object" ? (createdByVal?.name || createdByVal?.username || createdByVal?.firstName || "") : createdByVal) || "Karley"}
                </span>
              </span>
            </div>

            {/* Conditionally render Updated On and Updated By only if dates are different */}
            {createdAtVal && updatedAtVal && moment(createdAtVal).format("YYYY-MM-DD HH:mm") !== moment(updatedAtVal).format("YYYY-MM-DD HH:mm") && (
              <>
                {/* Row 3: Updated On */}
                <div style={{ display: "flex", gap: "10px", alignItems: "center", position: "relative", zIndex: 1 }}>
                  <div style={{ width: "24px", display: "flex", justifyContent: "center", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#0284C7" }} />
                  </div>
                  <span style={{ fontSize: "12px", color: "#295086" }}>
                    Updated On <span style={{ fontWeight: "600" }}>{moment(updatedAtVal).format("ddd, MMM D [At] h:mm A")}</span>
                  </span>
                </div>

                {/* Row 4: Updated By */}
                <div style={{ display: "flex", gap: "10px", alignItems: "center", position: "relative", zIndex: 1 }}>
                  <div style={{ width: "24px", display: "flex", justifyContent: "center", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#94A3B8" }} />
                  </div>
                  <span style={{ fontSize: "12px", color: "#295086" }}>
                    Updated By <span style={{ fontWeight: "600" }}>
                      {(typeof updatedByVal === "object" ? (updatedByVal?.name || updatedByVal?.username || updatedByVal?.firstName || "") : updatedByVal) || "Karley"}
                    </span>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </SidebarForm>

      {/* Modals inside sidebar */}
      <CancelAppointmentModal
        show={showCancelModal}
        handleClose={() => setShowCancelModal(false)}
        data={cancelModalData}
        setcancelBooking={handleCancelSuccess}
        upcomingCalenderData={scheduleSummary?.data ? Object.values(scheduleSummary.data).flatMap(d => d.bookedSlots || []) : []}
      />

      <CheckInModal
        show={showCheckInModal}
        handleClose={() => setShowCheckInModal(false)}
        mainId={bookedAppointment.btype === "guest" ? bookedAppointment.mainUserId : bookedAppointment?.bookingId}
        guest_ids={bookedAppointment.btype === "guest" ? bookedAppointment?.bookingId : null}
        data={bookedAppointment}
        setupdatebookinU={handleCheckInSuccess}
      />

      <NoShowModal
        show={showNoShowModal}
        handleClose={() => setShowNoShowModal(false)}
        noShowData={bookedAppointment}
        mainId={bookedAppointment.btype === "guest" ? bookedAppointment.mainUserId : bookedAppointment?.bookingId}
        guest_ids={bookedAppointment.btype === "guest" ? bookedAppointment?.bookingId : null}
        setupdatebookinU={handleUpdateBookingU}
      />

      <StartServiceModal
        show={showStartServiceModal}
        handleClose={() => setShowStartServiceModal(false)}
        mainId={bookedAppointment.btype === "guest" ? bookedAppointment.mainUserId : bookedAppointment?.bookingId}
        guest_ids={bookedAppointment.btype === "guest" ? bookedAppointment?.bookingId : null}
        serviceData={bookedAppointment}
        setupdatebookinU={handleUpdateBookingU}
      />

      <PaymentOption
        show={showPaymentOption}
        onShow={() => setShowPaymentOption(true)}
        onHide={() => {
          setShowPaymentOption(false);
        }}
        data={paymentOptionData}
        providerData={providerData}
        selectedData={paymentOptionData}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </SidebarContainer>
  );
};

export default BookedAppointmentDetails;
