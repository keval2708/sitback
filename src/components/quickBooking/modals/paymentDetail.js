import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import moment from "moment";
import { memo, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "@/components/shared/button/LoadingButton";
import { useToaster } from "@/hooks";
import { finalBookData, handleStep, quickBookingSliceSelector } from "@/redux/quickBooking";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, FormGroup, Input, Label } from "@/styles/global/main.style";
import { SchedulerModalLayoutWrapper } from "@/styles/pages/scheduler.style";
import axiosApiCall from "@/utils/axios";
import {
  CARD_CVC_OPTIONS,
  CARD_ELEMENT_OPTIONS,
  TOAST_ALERTS,
  TOAST_TYPES,
} from "@/utils/constants";

const paymentDetail = () => {
  // const
  const { t } = useTranslation();
  const stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY);
  const { schedulerResponse, schedulerData, saveBookInfo, bookAppointmentInfo } =
    useSelector(quickBookingSliceSelector);
  const { toaster } = useToaster();
  const dispatch = useDispatch();
  const cardToken = useRef(null);

  // state
  const [isPaymentProgress, setIsPaymentProgress] = useState(false);

  const [stripeError, setStripeError] = useState(null);
  const [cardNumberError, setCardNumberError] = useState(null);
  const [accHolderNameError, setAccHolderNameError] = useState(null);
  const [expiryError, setExpiryError] = useState(null);
  const [cvcError, setCvcError] = useState(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [cardNum, setCardNum] = useState(false);
  const [expiryDate, setExiry] = useState(false);
  const [csvCode, setCsvCode] = useState(false);

  // function
  const handlechangeCardnumber = (event) => {
    setCardNumberError(null);
    setCardNum(true);

    if (event.error) {
      setCardNumberError(event.error.message);
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

  const handlechangeCardname = (event) => {
    setAccHolderNameError(null);
    setUsername(event.target.value);

    if (!document.getElementById("accHolderName")?.value) {
      setAccHolderNameError("Please enter account name");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    return (
      <>
        <LoadingButton
          type="submit"
          disabled={isPaymentProgress}
          label={"Confirm payment and secure booking"}
          loadinglabel={"Confirm payment and secure booking..."}
          isLoading={isPaymentProgress}
          className="loading-btn-wrapper"
          onClick={handleSubmit(stripe, elements)}
        />
        <Button isBorderBtn={true} onClick={(e) => goBack(e)}>
          GO BACK
        </Button>
      </>
    );
  };

  const goBack = (e) => {
    e.preventDefault();
    dispatch(handleStep(8));
  };

  const handleSubmit = (stripe, elements) => async (event) => {
    event.preventDefault();
    if (!cardNum || !expiryDate || !csvCode) {
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

    cardToken.current = token?.id;

    if (error) {
      setIsPaymentProgress(false);
      const { message, code } = error;
      if (code == "card_declined") {
        setIsPaymentProgress(false);
        setStripeError(message);
      } else if (code == "invalid_number") {
        setIsPaymentProgress(false);
        setStripeError(message);
      } else if (code == "invalid_expiry_year_past") {
        setIsPaymentProgress(false);
        setStripeError(message);
      } else if (code == "incomplete_number") {
        setIsPaymentProgress(false);
        setStripeError(message);
      } else if (code == "incomplete_expiry") {
        setIsPaymentProgress(false);
        setStripeError(message);
      } else if (code == "incomplete_cvc") {
        setIsPaymentProgress(false);
        setStripeError(message);
      } else {
        setIsPaymentProgress(false);
        setStripeError(message);
      }
    } else {
      await bookAppointment();
    }
  };

  const paymentCall = async (token, bookInfo) => {
    try {
      let param = {
        email: schedulerResponse?.userInfo?.email,
        stripe_token: token,
        user_id: bookInfo?.data?.user_id,
        sp_id: schedulerData?.sp_id,
      };
      const res = await axiosApiCall.post(API_ROUTER?.CREATE_MANUAL_CUSTOMER, param);

      if (!res?.status) {
        setIsPaymentProgress(false);

        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        if (res?.data?.data?.result?.default_source) {
          let paymentRes = {
            total_charge_amount: bookInfo?.data?.paymentCharge,
            paymentdescription: `Scheduler booking payment done by user ${schedulerResponse?.userInfo?.name} id:${bookInfo?.data?.user_id}`,
            stripe_card_id: res?.data?.data?.result?.default_source,
            sendMailEmail: email || "",
            booking_id: bookInfo?.data?.id,
            user_id: bookInfo?.data?.user_id,
          };
          const payment = await axiosApiCall.post(API_ROUTER?.CREATE_MANUAL_PAYMENT, paymentRes);
          if (!payment?.status) {
            setIsPaymentProgress(false);
            return toaster(payment?.message, TOAST_TYPES.ERROR);
          } else {
            setIsPaymentProgress(false);
            toaster(payment?.data?.message, TOAST_TYPES.SUCCESS);
            // dispatch(handleStep(10));
          }
        }
      }
    } catch (error) {
      setIsPaymentProgress(false);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const bookAppointment = async () => {
    try {
      setIsPaymentProgress(true);
      let param = {
        sp_id: schedulerData?.sp_id,
        servicelist_id: schedulerResponse?.mainUser?.services?.value,
        employee_id: schedulerResponse?.mainUser.employee?.id,
        date: moment(schedulerResponse?.date).format("YYYY-MM-DD"),
        slot_time: schedulerResponse?.mainUser?.slots?.slot_time,
        time_type: schedulerResponse?.mainUser?.slots?.time_type,
        charges: schedulerResponse?.mainUser?.services?.price,
        total_charge_amount: bookAppointmentInfo?.total_charge_amount,
        client_name: schedulerResponse?.userInfo?.name,
        client_email: schedulerResponse?.userInfo?.email,
        client_dob: moment(schedulerResponse?.userInfo?.client_dob).format("YYYY-MM-DD"),
        phone: schedulerResponse?.userInfo?.phone,
        countrycode: `+${schedulerResponse?.userInfo?.countrycode}`,
        payment_by: "card",
        isguest: schedulerResponse?.guest == 0 ? 0 : 1,
        total_guest: schedulerResponse?.guest,
        notes: schedulerResponse?.userInfo?.notes ? schedulerResponse?.userInfo?.notes : "",
      };
      if (bookAppointmentInfo?.updateGuestInfo) {
        param.temp_book_id = bookAppointmentInfo?.updateGuestInfo?.book_id;
      }
      if (saveBookInfo) {
        setIsPaymentProgress(false);
      } else {
        const res = await axiosApiCall.post(API_ROUTER?.BOOK_APPOINTMENT_SCHEDULAR, param);
        if (!res?.status) {
          setIsPaymentProgress(false);
          return toaster(res?.message, TOAST_TYPES.ERROR);
        } else {
          dispatch(finalBookData(res?.data));
          removeTempData(res?.data);
          await paymentCall(cardToken.current, res?.data);
        }
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const removeTempData = async (info) => {
    try {
      let param = {
        userId: info?.data?.id,
      };
      const res = await axiosApiCall.post(API_ROUTER?.TEMPBOOKAPPOINTMENT_RMV_TEMP_DATA, param);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  return (
    <>
      <SchedulerModalLayoutWrapper>
        <Form>
          <Elements stripe={stripePromise}>
            <div className="bookings-detail-wrapper">
              <Label>{t("paymentText")} </Label>
              <p>{t("paymentRules")}</p>
            </div>
            <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
              <Label>{t("cardHolderName")}</Label>
              <Input
                type="type"
                placeholder="Will Smith"
                id="accHolderName"
                value={username}
                onChange={(e) => handlechangeCardname(e)}
              />
              {accHolderNameError && <p className="text-danger">{accHolderNameError}</p>}
            </FormGroup>
            <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
              <Label>{t("cardNumber")}</Label>
              <CardNumberElement
                className="card_number_input"
                onChange={(e) => handlechangeCardnumber(e)}
                options={CARD_ELEMENT_OPTIONS}
              />
              {cardNumberError && <p className="text-danger">{cardNumberError}</p>}
            </FormGroup>
            <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
              <Label>{t("cardExpire")}</Label>
              <CardExpiryElement
                className=""
                onChange={(e) => handlechangeCardexpiry(e)}
                options={CARD_ELEMENT_OPTIONS}
              />
              {expiryError && <p className="text-danger">{expiryError}</p>}
            </FormGroup>
            <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
              <Label>{t("cardCvvNumber")}</Label>
              <CardCvcElement
                // options={{ placeholder: "CVV" }}
                options={CARD_CVC_OPTIONS}
                className=""
                onChange={(e) => handlechangeCardcsv(e)}
              />
              {cvcError && <p className="text-danger">{cvcError}</p>}
            </FormGroup>
            <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
              <Label>
                {t("receiptConfirmation")} <span>({t("optional")})</span>
              </Label>
              <Input
                type="email"
                placeholder="abc@gmail.com"
                value={email}
                onChange={(e) => handleEmailChange(e)}
              />
            </FormGroup>
            <PaymentForm />
          </Elements>
        </Form>
      </SchedulerModalLayoutWrapper>
    </>
  );
};

export default memo(paymentDetail);
