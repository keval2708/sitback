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
import { authCheckSliceSelector } from "@/redux/authCheck";
import { handleCalender } from "@/redux/messageTab";
import { API_ROUTER } from "@/services/apiRouter";
import { Image, Input, Label, SitBackModalBodyWrapper } from "@/styles/global/main.style";
import axiosApiCall from "@/utils/axios";
import {
  CARD_CVC_OPTIONS,
  CARD_ELEMENT_OPTIONS,
  TOAST_ALERTS,
  TOAST_TYPES,
} from "@/utils/constants";

const AddCardModal = ({
  show,
  onHide = () => { },
  appointmentDate,
  setShowAddModal,
  setSmModalHide,
  setOnlineBooking,
  setAppointmentDate,
  setCurrentPage,
  calenderBookingList,
}) => {
  // constant
  const { login, card } = useSelector(authCheckSliceSelector);
  const dispatch = useDispatch();

  // state
  const [isPaymentProgress, setIsPaymentProgress] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

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
    setIsCardModalOpen(false);
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

  const RemoveSlots = async () => {
    try {
      const res = await axiosApiCall.post(API_ROUTER?.CLICK_ON_CREATE);
      if (!res?.status) {
        return res;
      } else {
        // setServiceData(res?.data?.data);
        // formatServiceData(res?.data?.data);
      }
    } catch (error) {
      return error;
    }
  };

  const resetValues = () => {
    // resetValue();
    RemoveSlots();
    setIsPaymentProgress(false);
    setIsCardModalOpen(false);
    setSmModalHide(true);
    handleCloseModal();
    setOnlineBooking(true);
    setShowAddModal(false);
    setAppointmentDate(false);
    setCurrentPage(1);
    setTimeout(() => {
      calenderBookingList(0);
    }, 1000);
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
        let param = {
          email: login?.email,
          stripe_token: cardToken,
          user_id: appointmentDate?.user_id,
        };
        const res = await axiosApiCall.post(API_ROUTER?.CREATE_ONLINE_PAYMENT, param);

        if (!res?.status) {
          setIsPaymentProgress(false);
          setIsCardModalOpen(false);
          return toaster(res?.message, TOAST_TYPES.ERROR);
        } else {
          if (res?.data?.data?.result?.default_source) {
            try {
              let subscriptionData = {
                total_charge_amount: parseInt(appointmentDate?.charges),
                paymentdescription: `Manual booking payment done by userName: ${appointmentDate?.clientName} & id: ${appointmentDate?.id}`,
                stripe_card_id: res?.data?.data?.result?.default_source,
                booking_id: appointmentDate?.id,
                user_id: appointmentDate?.user_id,
              };
              const subscriptionRes = await axiosApiCall.post(
                API_ROUTER?.CREATE_MANUAL_SUBSCRIPTION,
                subscriptionData
              );
              if (!subscriptionRes?.status) {
                setIsPaymentProgress(false);
                setIsCardModalOpen(false);
                setOnlineBooking(true);

                return toaster(subscriptionRes?.message, TOAST_TYPES.ERROR);
              } else {
                toaster(subscriptionRes?.data?.message, TOAST_TYPES.SUCCESS);
                // dispatch(handleSubscribe(res?.data?.data.isSubscribe));
                setIsPaymentProgress(false);
                setIsCardModalOpen(false);
                setSmModalHide(true);
                handleCloseModal();
                setOnlineBooking(true);
                setShowAddModal(false);
                setAppointmentDate(false);
                setCurrentPage(1);
              }
              dispatch(handleCalender(true));
            } catch (error) {
              toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
            }
          }
        }
      } catch (error) {
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
        className="red-close-icon"
        onClick={() => resetValues()}
      ></Modal.Header>
      <Modal.Body className="stripe-card">
        <span onClick={() => resetValue()} className="go-to-backbtn enter-card-info-back">
          <Image alt="sitback" src="/images/Arrow-v3.svg" />
        </span>
        <SitBackModalBodyWrapper>
          <h3 className="modal-title-text">{t("cardModal")}</h3>
          <Form>
            <div className="card-info-detail-wrapper">
              <div className="row-wrapper">
                <div className="total-amount">
                  <h3>{t("totalAmtDue")}</h3>
                  <p>${appointmentDate?.charges}</p>
                </div>
              </div>
            </div>
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
                    options={CARD_ELEMENT_OPTIONS}
                    className="card_number_input"
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
                    className="card_number_input"
                    onChange={(e) => handlechangeCardcsv(e)}
                  />
                  {cvcError && <p className="text-danger">{cvcError}</p>}
                </Col>
              </Row>
              <div className="note-wrapper-block">
                <h6>Note:</h6>
                <p className="note-description">
                  Platform charges based on the subscription will be deducted from the card (*******
                  {card}) that was used to purchase the subscription.
                </p>
              </div>
              <PaymentForm />
            </Elements>
          </Form>
        </SitBackModalBodyWrapper>
      </Modal.Body>
    </CustomModal>
  );
};

export default memo(AddCardModal);
