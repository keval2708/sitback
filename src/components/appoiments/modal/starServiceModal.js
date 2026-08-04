import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "@/components/shared/button/LoadingButton";
import { useToaster } from "@/hooks";
import {
  handleCalender,
  handleTarget,
  handleTargetProcess,
  messageCheckSliceSelector,
} from "@/redux/messageTab";
import { API_ROUTER } from "@/services/apiRouter";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const StartServiceModal = ({
  show,
  handleClose,
  mainId,
  guest_ids,
  setupdatebookinU,
  serviceData,
}) => {
  //hooks
  const { t } = useTranslation();
  const { toaster } = useToaster();
  const { calenderData } = useSelector(messageCheckSliceSelector);
  const dispatch = useDispatch();

  //states
  const [loading, setLoading] = useState(false);

  const getType = () => {
    if (mainId != null && guest_ids != null) {
      return "only_guest";
    } else if (guest_ids == null && mainId != null) {
      return "only_main_user";
    } else {
      return "only_main_user";
    }
  };

  const startService = async () => {
    const params = {
      id: mainId,
      type: getType(),
      guest_id: guest_ids ? guest_ids : 0,
    };

    // const updatedList = calenderData.filter((record) => record.id == serviceData?.id);
    // dispatch(handleTargetProcess("startservice"));
    // dispatch(handleTarget(updatedList[0]));
    // handleClose();

    try {
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.CAPTURE_BOOKING_START_STATUS_CHARGE, params);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        // toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        setupdatebookinU(true);
        handleClose();
        dispatch(handleCalender(true));
        const updatedList = calenderData.filter((record) => record.id == serviceData?.id);
        dispatch(handleTargetProcess("startservice"));
        dispatch(handleTarget(updatedList[0]));
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmStart = () => {
    startService();
  };

  return (
    <Modal
      className="confirm-delete-modal confirm-service-modal-wrapper"
      show={show}
      onHide={handleClose}
      centered
    >
      <Modal.Header closeButton className="red-close-icon">
        <Modal.Title>{t("startServiceText")}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="text">{t("startAndConfirm")}</Modal.Body>
      <div></div>
      <Modal.Footer className="btn-loader-wrapper">
        <LoadingButton
          disabled={loading}
          label={t("confirm")}
          loadinglabel={t("conforming")}
          isLoading={loading}
          className="loading-btn-wrapper"
          onClick={handleConfirmStart}
        />
        <Button variant="secondary" onClick={handleClose}>
          {t("cancelCaps")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StartServiceModal;
