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

const CheckInModal = ({ show, handleClose, mainId, guest_ids, data, setupdatebookinU }) => {
  //hooks
  const { t } = useTranslation();
  const { toaster } = useToaster();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { calenderData } = useSelector(messageCheckSliceSelector);

  const getType = () => {
    if (mainId != null && guest_ids != null) {
      return "only_guest";
    } else if (guest_ids == null && mainId != null) {
      return "only_main_user";
    } else {
      return "only_main_user";
    }
  };

  const checkInApi = async () => {
    // setupdatebookinU(true);
    // handleClose();
    // const updatedList = calenderData.filter((record) => record.id == data?.id);
    // dispatch(handleTargetProcess("startservice"));
    // dispatch(handleTarget(updatedList[0]));
    try {
      setLoading(true);
      const params = {
        id: mainId,
        type: getType(),
        guest_id: guest_ids ? guest_ids : 0,
      };

      const res = await axiosApiCall.post(API_ROUTER?.CREATE_CHECK_IN, params);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setupdatebookinU?.(true);
        handleClose();
        dispatch(handleCalender(true));

        const bookingId = data?.bookingId || data?.id || mainId;
        const records = Array.isArray(calenderData) ? calenderData : [];
        const matchedRecord =
          records.find(
            (record) =>
              record?.id == bookingId ||
              record?.bookingId == bookingId
          ) || {
            ...data,
            id: bookingId,
            bookingId,
            bookingstatus: 4,
            checkinstatus: 1,
          };

        dispatch(handleTargetProcess("startservice"));
        dispatch(handleTarget(matchedRecord));
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        className="confirm-delete-modal confirm-service-modal-wrapper check-in-model sitback-modal-wrapper sitback-updated-service-modal-wrapper"
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton className="red-close-icon"></Modal.Header>
        <Modal.Body className="pt-0 check-in-confirm-modal" style={{ marginTop: "-35px" }}>
          <div className="sitback-option-modal-wrapper sitback-payment-tip-modal note-modal-wrapper">
            <h5> Check In</h5>
            <p>Has the guest arrived at the spa?</p>
          </div>
        </Modal.Body>
        <Modal.Footer className="btn-loader-wrapper confirm-modal-footer">
          <LoadingButton
            // type="submit"
            disabled={loading}
            label={t("confirm")}
            loadinglabel={t("confirm")}
            isLoading={loading}
            className="loading-btn-wrapper confirm-btn-wrapper"
            onClick={() => checkInApi()}
          />

          {/* <Button disabled={disabled} onClick={handleConfirmNoShow}>
          {`YES I'M SURE`}
        </Button> */}
          <Button variant="secondary" onClick={handleClose} className="cancel-btn-wrapper">
            {t("cancelCaps")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CheckInModal;
