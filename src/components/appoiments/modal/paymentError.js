import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import AddCards from "@/components/insights/modal/addCards";
import CashModal from "@/components/shared/modal/cashModal";
import { API_ROUTER } from "@/services/apiRouter";
import { Button } from "@/styles/global/main.style";
import axiosApiCall from "@/utils/axios";

const PaymentError = ({
  show,
  data,
  handleClose,
  onHide = () => {},
  onPaymentSuccess = () => {},
}) => {
  const closeModal = handleClose || onHide;
  const [openCard, setOpenCard] = useState(false);
  const [openCash, setOpenCash] = useState(false);
  const [productTotalAmount, setProductTotalAmount] = useState(0);
  const [tipAmount, setTipAmount] = useState(0);

  const cardAdd = () => {
    setOpenCard(true);
  };

  const handlePaymentRecoverySuccess = () => {
    setOpenCard(false);
    setOpenCash(false);
    closeModal();
    onPaymentSuccess();
  };

  const bookingWiseCardList = async () => {
    if (data?.id) {
      try {
        let param = {
          booking_id: data?.id,
        };
        const res = await axiosApiCall.post(API_ROUTER?.BOOKING_WISE_CART_ITEM_LIST, param);
        if (!res?.status) {
          //return toaster(res?.message, TOAST_TYPES.ERROR);
        } else {
          setTipAmount(res?.data?.totalTip);
          setProductTotalAmount(res?.data?.totalAmount ? res?.data?.totalAmount : 0);
        }
      } catch (error) {}
    }
  };

  useEffect(() => {
    if (show && data?.id) {
      bookingWiseCardList();
    }
  }, [show, data?.id]);

  return (
    <>
      <Modal
        show={show}
        onHide={() => closeModal()}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
        className="sitback-modal-wrapper warning-modal-wrapper"
      >
        <Modal.Body>
          <div className="sitback-request-modal-wrapper">
            <h5>Payment Failed!</h5>
            <p>
              We are sorry, but your card payment has failed. Please check the details you have
              provided and try again.
            </p>
          </div>
          <div className="addcard-footer-wrapper">
            <Button onClick={() => cardAdd()}>Add new card +</Button>
            <Button className="cash-payment-btn" onClick={() => setOpenCash(true)}>
              Cash payment
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <AddCards
        show={openCard}
        onHide={() => setOpenCard(false)}
        data={data}
        productTotalAmount={productTotalAmount}
        tipAmount={tipAmount}
        onPaymentSuccess={handlePaymentRecoverySuccess}
      />
      <CashModal
        show={openCash}
        onHide={() => setOpenCash(false)}
        data={data}
        productTotalAmount={productTotalAmount}
        tipAmount={tipAmount}
        onPaymentSuccess={handlePaymentRecoverySuccess}
      />
    </>
  );
};

export default PaymentError;
