import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import LoadingButton from "@/components/shared/button/LoadingButton";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector } from "@/redux/authCheck";
import { PATH_AUTH } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { removeCookie } from "@/utils/cookie";
import { getSocketId } from "@/utils/helper";

const SubscriptionCancelModal = ({ show, handleClose, subscriptionData, selectPrice }) => {
  //hooks
  const { t } = useTranslation();
  const { toaster } = useToaster();
  const { push } = useRouter();

  //states
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [error, setError] = useState(null);
  const { login } = useSelector(authCheckSliceSelector);
  // const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleRadioChange = (e) => {
    setSelectedValue(e.target.checked ? e.target.value : null);
    setError('')
  };

  const handleConfirmStart = (e) => {
    e.preventDefault();
    if (!selectedValue) {
      setError('Please select cancellation option')
      return;
    }
    cancelSubscription();
  };

  const clearSelection = async () => {
    handleClose();
    setError(null);
    setSelectedValue(null);

  };

   const leave_room = async () => {
    // setIsLoggingOut(true);
    try {
      const res = await axiosApiCall.get(API_ROUTER?.USER_LEAVE_ROOM);
      if (!res?.status) {
        return res
      } else {
        // console.log("res", res);
        try {
          const res = await axiosApiCall.post(API_ROUTER?.LOGOUT, { id: login?.id });
          if (!res?.status) {
            // setIsLoggingOut(false); // Set loading state back to false if error
            return toaster(res?.message, TOAST_TYPES.ERROR);
          } else {
            removeCookie('token');
            localStorage.clear();
            push(PATH_AUTH?.signIn);
            // setIsLoggingOut(false); // Set loading state back to false once done
            //dispatch(handleLoginTab('first'));
            // window.location.reload();
            return res
          }
        } catch (error) {
          // setIsLoggingOut(false); // Set loading state back to false in case of error
          toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
        }
      }
    } catch (error) {
      return error
    }
  };

  const cancelSubscription = async () => {
    const socketId = getSocketId();
    try {
      setLoading(true)
      const params = {
        subscription_id: selectPrice,
        cancel_status: selectedValue == "immediate" ? "immediate": "endofperiod",
        socketId: socketId,
      };
      const res = await axiosApiCall.post(API_ROUTER?.CANCEL_SUBSCRIPTION, params);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        // setUpcomingList(res?.data?.data);
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        if (selectedValue == "immediate") {

          leave_room()
          //dispatch(handleSubscribe(0));
        } else {
          handleClose();
        }

      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <Modal
      className="sitback-modal-wrapper sitback-modalv2-wrapper subscriptions-cancel-popup-wrapper  modal-white-bg"
      show={show}
      onHide={() => clearSelection()}
      centered
    >
      <Modal.Header closeButton className="red-close-icon">
        <Modal.Title>

        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="sitback-request-modal-wrapper">
          <div className="text-wrapper">
            <h6>{t('wait')}</h6>
            <h4>{t('cancelMember')}</h4>
            <p>{t('accessRemoved')}</p>
          </div>
          <Form className="cancellation-modal-wrapper">
            <h4>Cancellation Option:</h4>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="form-check-wrapper-div">
                <Form.Check
                  inline
                  label="Immediate"
                  name="group1"
                  type={type}
                  id={`inline-${type}-1`}
                  value="immediate"
                  disabled={subscriptionData?.planData?.status == 'trialing' ? true : false}
                  onChange={handleRadioChange}
                />
                <Form.Check
                  inline
                  label="Gross Period"
                  name="group1"
                  type={type}
                  id={`inline-${type}-2`}
                  value="monthEnd"
                  onChange={handleRadioChange}
                />
              </div>
            ))}
            {error && <p className="text-danger">{error}</p>}
            <div className="btn-wrapper">
              <LoadingButton
                // type="submit"
                disabled={loading}
                label="Cancel membership"
                loadinglabel="CONFIRMing"
                isLoading={loading}
                className="loading-btn-wrapper"
                onClick={(e) => handleConfirmStart(e)}
              />
              <Button variant="secondary" onClick={handleClose} className="text-btn">
                {t('neverMindText')}
              </Button>
            </div>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SubscriptionCancelModal;
