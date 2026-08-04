import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "@/components/shared/button/LoadingButton";
import { useToaster } from "@/hooks";
import { handleCalender, handleTarget, handleTargetProcess, messageCheckSliceSelector } from "@/redux/messageTab";
import { API_ROUTER } from "@/services/apiRouter";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const NoShowModal = ({
  show,
  handleClose,
  noShowData,
  mainId,
  guest_ids,
  setupdatebookinU
}) => {
  //hooks
  const { t } = useTranslation();
  const { toaster } = useToaster();
  const [loading, setLoading] = useState(false);
  const [bookingType, setBookingType] = useState("");
  const dispatch = useDispatch();
  const { calenderData } = useSelector(messageCheckSliceSelector);

  const getType = () => {
    if (mainId != null && guest_ids != null) {
      return setBookingType("only_guest");
    } else if (guest_ids == null && mainId != null) {
      return setBookingType("only_main_user");
    } else {
      return setBookingType('only_main_user')
    }
  };

  useEffect(() => {
    getType();
  }, [guest_ids, mainId])

  const noShow = async () => {
    const params = {
      id: mainId,
      type: bookingType,
      guest_id: guest_ids ? guest_ids : 0
    };

    try {
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.BOOKING_NO_SHOW, params);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        // setUpcomingList(res?.data?.data);
        // toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        setupdatebookinU(false);
        handleClose();
        dispatch(handleCalender(true));

        const updatedList = calenderData.filter(record => record.id == noShowData?.id);
        dispatch(handleTargetProcess('noshow'));
        dispatch(handleTarget(updatedList[0]));
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false)
    }
  };

  const handleConfirmNoShow = () => {
    noShow();
  }
  return (
    <Modal className="confirm-delete-modal confirm-service-modal-wrapper sitback-no-show-updated-modal-wrapper" show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="red-close-icon">

      </Modal.Header>
      <Modal.Body className="pt-0" style={{ marginTop: '-20px' }}>
        <h3 className="sitback-no-show-title-text">
          {t('noShowText')}
        </h3>
      </Modal.Body>
      <Modal.Footer className="btn-loader-wrapper">

        <LoadingButton
          // type="submit"
          disabled={loading}
          label={t('sureText')}
          loadinglabel={t('sureText')}
          isLoading={loading}
          className="loading-btn-wrapper sitback-confirm-red-btn"
          onClick={handleConfirmNoShow}
        />

        {/* <Button disabled={disabled} onClick={handleConfirmNoShow}>
          {`YES I'M SURE`}
        </Button> */}
        <Button variant="secondary" onClick={handleClose} className="sitback-nevermind-btn-wrapper">
          {t('neverMind')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NoShowModal;
