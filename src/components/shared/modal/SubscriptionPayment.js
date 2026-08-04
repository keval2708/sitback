import { useRouter } from "next/navigation";
import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import LoadingButton from "../button/LoadingButton";
import { handlePaymentTab } from "@/redux/appointment";
import { handleBank, tabHandle } from "@/redux/messageTab";
import { PATH_DASHBOARD } from "@/routes/paths";

const SubscriptionPayment = ({
  show
}) => {

  // Hooks
  const dispatch = useDispatch();
  const { push } = useRouter();

  const goToPage = async () => {
    dispatch(tabHandle("second"));
    dispatch(handleBank(true));
    dispatch(handlePaymentTab("second"))
    push(PATH_DASHBOARD?.insights);
  };

  return (
    <Modal
      show={show}
      aria-labelledby="example-modal-sizes-title-lg"
      centered
      className="sitback-modal-wrapper warning-modal-wrapper"
    >
      <Modal.Body>
        <div className="sitback-request-modal-wrapper">
          <h5>Subscription Renewal Failed!</h5>
          <p>We are sorry, but your card payment has failed. Please check the details you have provided and try again</p>
        </div>
        <div className="modal-footer-div mb-4">
          <LoadingButton
            type="submit"
            disabled={false}
            label="ADD NEW CARD +"
            loadinglabel="ADD NEW CARD +"
            isLoading={false}
            className="loading-btn-wrapper"
            onClick={() => goToPage()}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SubscriptionPayment;
