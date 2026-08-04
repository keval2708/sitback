import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import LoadingButton from "@/components/shared/button/LoadingButton";
import Loader from "@/components/shared/spinner/loader";
import { useToaster } from "@/hooks";
import { handleCalender } from "@/redux/messageTab";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, FormGroup } from "@/styles/global/main.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const UnavailableAppointment = ({ show, onHide = () => {}, setCloseSpaTag }) => {
  const { toaster } = useToaster();
  const dispatch = useDispatch();

  const [message, setMessage] = useState(
    "Are you sure you want to close appointments rest of the day?"
  );
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const [error, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    if (show) {
      CheckCloseSpaBooking();
    }
  }, [show]);

  const CheckCloseSpaBooking = async () => {
    try {
      setLoading(true);
      const res = await axiosApiCall.get(API_ROUTER?.CHECK_CLOSE_SPA_BOOKING);
      if (!res?.status) {
        if (!res.status) {
          setMessage("Some bookings are ongoing, do you still want to close spa?");
        } else {
          return toaster(res?.message, TOAST_TYPES.ERROR);
        }
      } else {
        if (res?.data?.status) {
          setMessage("Are you sure you want to close appointments rest of the day?");
        }
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const CloseSpaToday = async () => {
    if (!isChecked) {
      setError("Please select checkbox before proceed");
      return;
    }
    try {
      setButtonLoading(true);
      const res = await axiosApiCall.get(API_ROUTER?.CLOSE_SPA_TODAY);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.ERROR);
        cancel();
        dispatch(handleCalender(true));
        setCloseSpaTag(true);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setButtonLoading(false);
    }
  };
  const cancel = async () => {
    onHide();
    setMessage("Are you sure you want to close appointments rest of the day?");
    setIsChecked(false);
    setError(null);
  };

  const CloseModal = async () => {
    cancel();
  };

  const handleCheck = (e) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      setError(null);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => cancel()}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
        className="sitback-modal-wrapper sitback-modalv2-wrapper"
      >
        <Modal.Header closeButton className="red-close-icon pb-0"></Modal.Header>
        <Modal.Body className="pt-0">
          <div className="sitback-option-modal-wrapper sitback-payment-tip-modal siteback-unavailable-appointments-model">

              <h5>Unavailable appointments all day !</h5>
              <p>{message}</p>

          </div>
          <FormGroup controlId="formBasicEmail">
            <div className="checkbox-wrapperv5 mb-4" style={{ alignItems: "start" }}>
              <input
                type="checkbox"
                id="info"
                name="info"
                // {...register("info")}
                checked={isChecked}
                className="form-check-input"
                onChange={(e) => handleCheck(e)}
              />
              <p className="checkbox-wrapperv5-text" style={{ textAlign: "start" }}>
                Any pending appointment for today will be auto cancelled once you click on confirm
                button. Cancellation charge will be deducted from your card for each appointment.
              </p>
            </div>
            <small className="text-danger">{error && error}</small>
          </FormGroup>
          {loading ? (
            <Loader loading={loading} />
          ) : (
            <div className="addcard-footer-wrapper">
              {/* <Button onClick={() => CloseSpaToday()}>Confirm</Button> */}
              <LoadingButton
                // type="submit"
                disabled={buttonLoading}
                onClick={() => CloseSpaToday()}
                label="Confirm"
                loadinglabel="Confirm"
                isLoading={buttonLoading}
                className="loading-btn-wrapper"
              />
              <Button className="cash-payment-btn" onClick={() => CloseModal()}>
                Cancel
              </Button>
            </div>
          )}{" "}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UnavailableAppointment;
