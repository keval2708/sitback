import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { memo, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "@/components/shared/button/LoadingButton";
import CustomModal from "@/components/shared/modal";
import { useToaster } from "@/hooks";
import {
  appointmentCheckSliceSelector,
  handlePaymentFailedModal,
  handlePaymentFailedTotalAmount,
} from "@/redux/appointment";
import {
  handleCalender,
  handleTarget,
  handleTargetProcess,
  messageCheckSliceSelector,
} from "@/redux/messageTab";
import { API_ROUTER } from "@/services/apiRouter";
import { Input, Label, SitBackModalBodyWrapper } from "@/styles/global/main.style";
import axiosApiCall from "@/utils/axios";
import {
  CARD_CVC_OPTIONS,
  CARD_ELEMENT_OPTIONS,
  TOAST_ALERTS,
  TOAST_TYPES,
} from "@/utils/constants";

const addCards = ({
  show,
  onHide = () => {},
  data,
  productTotalAmount,
  tipAmount,
  onPaymentSuccess = () => {},
}) => {
  // constant
  const dispatch = useDispatch();
  const { bookingData } = useSelector(messageCheckSliceSelector);

  // state
  const [isPaymentProgress, setIsPaymentProgress] = useState(false);

  const stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY);
  const [stripeError, setStripeError] = useState(null);

  const [accHolderNameError, setAccHolderNameError] = useState(null);
  const [cardNumberError, setCardNumberError] = useState(null);
  const [expiryError, setExpiryError] = useState(null);
  const [cvcError, setCvcError] = useState(null);

  const [username, setUsername] = useState(null);
  const [cardNum, setCardNum] = useState(false);
  const [expiryDate, setExiry] = useState(false);
  const [csvCode, setCsvCode] = useState(false);
  const { tipTotalAmount } = useSelector(appointmentCheckSliceSelector);
  //const { tipPrice,isAddTip,optionSelected } = tipTotalAmount;

  // hooks
  const { toaster } = useToaster();
  const { t } = useTranslation();

  const handlechangeCardname = (event) => {
    setAccHolderNameError(null);
    setUsername(event.target.value);
    if (!document.getElementById("accHolderName")?.value) {
      setAccHolderNameError("Please enter Account Name");
    }
    if (!/^[a-zA-Z\s\-_]+$/.test(event.target.value)) {
      setAccHolderNameError("Please enter a valid Account Name (must be text)");
      return;
    }
  };

  const handlechangeCardnumber = (event) => {
    setCardNumberError(null);
    setCardNum(true);
    if (event.error) {
      setCardNumberError(event.error.message);
    }

    if (!document.getElementById("accHolderName")?.value) {
      setAccHolderNameError("Please enter Account Name");
    }
  };

  const handlechangeCardexpiry = (event) => {
    setExiry(true);
    setExpiryError(null);
    if (event.error) {
      setExpiryError(event.error.message);
    }
  };

  const handlechangeCardcsv = (event) => {
    setCsvCode(true);
    setCvcError(null);
    if (event.error) {
      setCvcError(event.error.message);
    }
  };

  const handleCloseModal = () => {
    onHide();
    setUsername(null);
    setAccHolderNameError(null);
    setCardNumberError(null);
    setCvcError(null);
    setExpiryError(null);
    setStripeError(null);
  };

  const resetValue = () => {
    setUsername(null);
    setAccHolderNameError(null);
    setCardNumberError(null);
    setCvcError(null);
    setExpiryError(null);
    setStripeError(null);
    onHide();
  };

  const CapturePayment = async () => {
    // let params = "";
    // if (tipTotalAmount?.isAddTip) {
    //   params = {
    //     id: data.id, //bookingId
    //     tip: tipAmount,
    //     tipemployee_id: tipTotalAmount?.optionSelected?.value,
    //     poscharge: productTotalAmount ? productTotalAmount : 0,
    //   };
    // } else {
    //   params = {
    //     tip:tipAmount,
    //     id: data.id, //bookingId
    //     poscharge: productTotalAmount ? productTotalAmount : 0,
    //   };
    // }

    const params = {
      tip: tipAmount ? tipAmount : 0,
      id: data.id, //bookingId
      poscharge: productTotalAmount ? productTotalAmount : 0,
    };

    try {
      // setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.CAPTURE_PAYMENT, params);
      if (!res?.status) {
        setIsPaymentProgress(false);
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        const updatedList = bookingData.filter((record) => record.id == data?.id);
        dispatch(handleTargetProcess("removeBooking"));

        // if (data?.guestList?.length > 0) {
        //   dispatch(handleTargetProcess("removeBooking"));
        // } else {
        //   if (data?.bookingstatus == "0") {
        //     dispatch(handleTargetProcess("noshow"));
        //   } else if (data?.bookingstatus == "3") {
        //     dispatch(handleTargetProcess("completedd"));
        //   } else if (data?.bookingstatus == "1") {
        //     dispatch(handleTargetProcess("cancel"));
        //   }
        // }

        dispatch(handleTarget(updatedList[0]));
        setIsPaymentProgress(false);
        handleCloseModal();
        dispatch(handlePaymentFailedModal(false));
        dispatch(
          handlePaymentFailedTotalAmount({ tipPrice: null, isAddTip: false, optionSelected: null })
        );
        dispatch(handleCalender(true));
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        onPaymentSuccess();
      }
    } catch (error) {
      setIsPaymentProgress(false);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      // setLoading(false);
    }
  };

  const handleSubmit = (stripe, elements) => async (event) => {
    event.preventDefault();
    if (!username || !cardNum || !expiryDate || !csvCode) {
      if (!username) {
        setAccHolderNameError("Please enter card holder name");
      }
      if (!cardNum) {
        setCardNumberError("Your card number is incomplete.");
      }
      if (!expiryDate) {
        setExpiryError("Your card's expiry date is incomplete.");
      }
      if (!csvCode) {
        setCvcError("Your card's security code is incomplete.");
      }
      return;
    }
    setIsPaymentProgress(true);
    const { error, token } = await stripe.createToken(elements.getElement(CardNumberElement), {
      currency: "usd",
      name: document.getElementById("accHolderName")?.value,
    });

    const cardToken = token?.id;

    if (error) {
      const { message, code } = error;
      if (code == "card_declined") {
        setStripeError(message);
      } else if (code == "invalid_number") {
        setStripeError(message);
      } else if (code == "invalid_expiry_year_past") {
        setStripeError(message);
      } else if (code == "incomplete_number") {
        setStripeError(message);
      } else if (code == "incomplete_expiry") {
        setStripeError(message);
      } else if (code == "incomplete_cvc") {
        setStripeError(message);
      } else {
        setStripeError(message);
      }
      setIsPaymentProgress(false);
    } else {
      try {
        setIsPaymentProgress(true);
        // data
        let param = {
          user_id: data?.user_id || data?.client?.clientId || null,
          sourceId: cardToken,
          booking_id: data?.id,
        };
        const res = await axiosApiCall.post(API_ROUTER?.ADD_NEW_CARD, param);

        if (!res?.status) {
          setIsPaymentProgress(false);
          // setIsCardModalOpen(false);
          return toaster(res?.message, TOAST_TYPES.ERROR);
        } else {
          CapturePayment();
        }
      } catch (error) {
        setIsPaymentProgress(false);
        toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      }
    }
  };

  const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    return (
      <LoadingButton
        type="submit"
        disabled={isPaymentProgress}
        label={"pay now"}
        loadinglabel={"pay now..."}
        isLoading={isPaymentProgress}
        className="loading-btn-wrapper sitback-updated-pay-now-btn-wrapper"
        onClick={handleSubmit(stripe, elements)}
      />
    );
  };

  return (
    <CustomModal
      show={show}
      onHide={() => onHide()}
      aria-labelledby="example-modal-sizes-title-sm"
      centered
      className="sitback-modal-wrapper sitbackmodalwrapper sitback-updated-profile-service-modal"
    >
      <Modal.Header
        closeButton
        className="red-close-icon "
        onClick={() => resetValue()}
      ></Modal.Header>
      <Modal.Body className="stripe-card">
        <SitBackModalBodyWrapper>
          <h3 className="modal-title-text">{t("cardModal")}</h3>
          <Form>
            <Elements stripe={stripePromise}>
              <div>
                <Label className="cardtitle">{t("cardHolderName")}</Label>
                <Input
                  name="accHolderName"
                  id="accHolderName"
                  placeholder={t("nameOnCard")}
                  required
                  value={username}
                  onChange={(e) => handlechangeCardname(e)}
                />
                {accHolderNameError && <p className="text-danger">{accHolderNameError}</p>}
              </div>
              <Row className="payment-input-wrapper">
                <Col md={12} className="card_number">
                  <Label>{t("cardNumber")}</Label>
                  <CardNumberElement
                    className="card_number_input"
                    options={CARD_ELEMENT_OPTIONS}
                    onChange={(e) => handlechangeCardnumber(e)}
                  />
                  {cardNumberError && <p className="text-danger">{cardNumberError}</p>}
                </Col>
                <Col md={12} className="card_number">
                  <Label>{t("cardExpire")}</Label>
                  <CardExpiryElement
                    options={CARD_ELEMENT_OPTIONS}
                    className="card_number_input"
                    onChange={(e) => handlechangeCardexpiry(e)}
                  />
                  {expiryError && <p className="text-danger">{expiryError}</p>}
                </Col>
                <Col md={12} className="card_number">
                  <Label>{t("cardCvvNumber")}</Label>
                  <CardCvcElement
                    options={CARD_CVC_OPTIONS}
                    // options={{ placeholder: "CVV" }}
                    className="card_number_input"
                    onChange={(e) => handlechangeCardcsv(e)}
                  />
                  {cvcError && <p className="text-danger">{cvcError}</p>}
                </Col>
              </Row>
              <PaymentForm />
            </Elements>
          </Form>
        </SitBackModalBodyWrapper>
      </Modal.Body>
    </CustomModal>
  );
};

export default memo(addCards);
