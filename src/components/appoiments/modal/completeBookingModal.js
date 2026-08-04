import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import LoadingButton from "@/components/shared/button/LoadingButton";
import { useToaster } from "@/hooks";
import { handleCalender } from "@/redux/messageTab";
import { API_ROUTER } from "@/services/apiRouter";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const CompleteBookingModal = ({
  show,
  handleClose,
  bookingId,
  onSuccess,
}) => {
  const { toaster } = useToaster();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    if (!bookingId) {
      return toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }

    try {
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.COMPLETE_SPA_APPOINTMENT, {
        id: bookingId,
      });

      if (!res?.status) {
        return toaster(res?.message || TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      }

      toaster(res?.data?.message || res?.message || "Booking completed successfully", TOAST_TYPES.SUCCESS);
      handleClose();
      dispatch(handleCalender(true));
      onSuccess?.();
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      className="confirm-delete-modal modal-white-bg complete-booking-modal"
      show={show}
      onHide={handleClose}
      centered
    >
      <Modal.Header closeButton className="red-close-icon">
        <Modal.Title>Complete Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text">
        Are you sure you want to Complete this booking?
      </Modal.Body>
      <Modal.Footer className="btn-loader-wrapper">
        <LoadingButton
          disabled={loading}
          label="Complete"
          loadinglabel="Completing"
          isLoading={loading}
          className="loading-btn-wrapper complete-booking-confirm-btn"
          onClick={handleComplete}
          style={{
            background: "#004B87",
            backgroundColor: "#004B87",
            borderColor: "#004B87",
            color: "#ffffff",
          }}
        />
        <Button
          variant="secondary"
          onClick={handleClose}
          disabled={loading}
          className="complete-booking-cancel-btn"
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CompleteBookingModal;
