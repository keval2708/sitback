// BankDetailModal.js
import { yupResolver } from "@hookform/resolvers/yup";
import { CardCvcElement, CardExpiryElement, CardNumberElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import moment from "moment";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import LoadingButton from "@/components/shared/button/LoadingButton";
import { useToaster } from "@/hooks";
import { appointmentCheckSliceSelector, handlePaymentTab, handleSubscriptionFail } from "@/redux/appointment";
import { authCheckSliceSelector } from "@/redux/authCheck";
import { handleBank, handleBlock } from "@/redux/messageTab";
import { API_ROUTER } from "@/services/apiRouter";
import {
  Input,
  Label,
  SitBackModalBodyWrapper,
} from "@/styles/global/main.style";
import axiosApiCall from "@/utils/axios";
import { CARD_CVC_OPTIONS, CARD_ELEMENT_OPTIONS, TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const BankDetailModal = ({ lgCardShow, setCardLgShow, cardData }) => {
  //hooks
  const { t } = useTranslation();
  const { toaster } = useToaster();
  const { login } = useSelector(authCheckSliceSelector);
  const { isPaymentTab } = useSelector(appointmentCheckSliceSelector);
  const { subscriptionPayment } = useSelector(appointmentCheckSliceSelector);
  const dispatch = useDispatch();
  const formData = new FormData();
  const stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY);
  const [selectedDate, setSelectedDate] = useState('');
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const calendarRef = useRef(null);
  // state
  const [loading, setLoading] = useState(false);
  const [isPaymentProgress, setIsPaymentProgress] = useState(false);
  const [stripeError, setStripeError] = useState(null);

  const [accHolderNameError, setAccHolderNameError] = useState(null);
  const [cardNumberError, setCardNumberError] = useState(null);
  const [expiryError, setExpiryError] = useState(null);
  const [cvcError, setCvcError] = useState(null);

  const [username, setUsername] = useState(null);
  const [cardNum, setCardNum] = useState(false);
  const [expiryDate, setExiry] = useState(false);
  const [csvCode, setCsvCode] = useState(false);

  // Form Config
  const defaultValues = useMemo(() => {
    return {
      accountType: "",
      bankName: "",
      accountNumber: "",
      routingNumber: "",
      firstName: "",
      lastName: "",
      birthDate: null,
      frontImage: null,
      backImage: null,
      address: "",
      city: "",
      state: "",
      pinCode: "",
    };
  }, []);

  const onSubmitForm = (Data) => {
    try {
      // onSave(formData);
      createAccount(Data);
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const createAccount = async (Data) => {

    const params = {
      country: "US",
      currency: "usd",
      account_holder_name: login?.username,
      account_holder_type: Data?.accountType,
      routing_number: Data?.routingNumber?.trim(),
      account_number: Data?.accountNumber?.trim(),
      birthday: moment(formData?.birthDate).format("YYYY-MM-DD"),
    };
    try {
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.CRATE_ACCOUNT, params);
      if (!res?.status) {
        let err = null;
        if (res?.error.includes("bank account")) {
          err = "Please enter valid account number."
        }
        if (res?.error.includes("Routing number")) {
          err = "Routing number must have 9 digits."
        }
        if (res?.error.includes("routing number")) {
          err = "Invalid routing number."
        }
        return toaster(err || res?.error, TOAST_TYPES.ERROR);
      } else {
        if (res?.data?.data?.result?.createBtokErr !== null) {
          toaster(res?.data?.data?.result?.createBtokErr?.message, TOAST_TYPES.ERROR);
        } else {
          if (res?.data?.data?.result?.createBtokRes?.id) {
            await createStripeAccount(res?.data?.data?.result?.createBtokRes?.id, Data);
          }
        }
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const createStripeAccount = async (token, Data) => {
    formData?.append("payout_method", "bank");
    formData?.append("email", login?.email);
    formData?.append("bank_name", Data?.bankName?.trim());
    formData?.append("first_name", Data?.firstName?.trim());
    formData?.append("last_name", Data?.lastName)?.trim();
    formData?.append("date_of_birth", moment(Data?.birthDate).format("YYYY-MM-DD"));
    formData?.append("address_line_1", Data?.address?.trim());
    formData?.append("city", Data?.city?.trim());
    formData?.append("state", Data?.state?.trim());
    formData?.append("zip_code", Data?.pinCode?.trim());
    formData?.append("btok_us_verified", token);
    formData?.append("document_front_image", Data?.frontImage);
    formData?.append("document_back_image", Data?.backImage);

    try {
      const res = await axiosApiCall.post(API_ROUTER?.CREATE_STRIPE_ACCOUNT, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (!res?.status) {
        let err = null;
        if (res?.error?.includes("postal code")) {
          err = "City, State, Zipcode: Invalid US state or province."
        }
        return toaster(err || res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        cancel();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  //schema
  const formSchema = yup
    .object()
    .shape({
      bankName: yup.string().required("Bank Name is required"),
      accountType: yup.string().required("Account Type is required"),
      routingNumber: yup.string().required("Routing Number is required"),
      accountNumber: yup.string().required("Account Number is required"),
      firstName: yup.string().required("First Name is required"),
      lastName: yup.string().required("Last Name is required"),
      birthDate: yup.mixed().required("Birth Date is required"),
      frontImage: yup
        .mixed()
        .required("Image is required")
        .test("file-present", "Image is required", (value) => {
          return value;
        })
        .test("fileSize", "Profile image size is too large", (value) =>
          value ? (typeof value !== "string" ? (value.size <= 5 ? 1024 : 1024) : true) : true
        )
        .test("fileType", "Invalid profile image", (value) =>
          value
            ? typeof value !== "string"
              ? ["image/jpeg", "image/png", "image/jpg"].includes(value?.type)
              : true
            : true
        ),
      backImage: yup
        .mixed()
        .required("Image is required")
        .test("file-present", "Image is required", (value) => {
          return value;
        })
        .test("fileSize", "Profile image size is too large", (value) =>
          value ? (typeof value !== "string" ? (value.size <= 5 ? 1024 : 1024) : true) : true
        )
        .test("fileType", "Invalid profile image", (value) =>
          value
            ? typeof value !== "string"
              ? ["image/jpeg", "image/png", "image/jpg"].includes(value?.type)
              : true
            : true
        ),
      address: yup.string().required("Address is required"),
      city: yup.string().required("City is required"),
      state: yup.string().required("State is required"),
      pinCode: yup
        .string()
        .matches(/^\d+$/, "ZipCode must be a number")
        .max(8, "Please enter valid zipcode")
        .required("ZipCode is required"),
    })
    .strict(true);

  // Hooks
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  // Constants
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const cancel = async () => {
    setUsername(null);
    setAccHolderNameError(null);
    setCardNumberError(null);
    setCvcError(null);
    setExpiryError(null);
    setStripeError(null);

    reset(defaultValues);
    // setFrontImage(null);
    // setBackImage(null);
    dispatch(handleBank(false));
    setCardLgShow(false);
  };

  const handlechangeCardname = (event) => {
    setAccHolderNameError(null);
    setUsername(event.target.value)
    if (!document.getElementById("accHolderName")?.value) {
      setAccHolderNameError("Please enter account name")
    }
    if (!/^[a-zA-Z\s\-_]+$/.test(event.target.value)) {
      setAccHolderNameError("Please enter a valid account name (must be text)");
      return;
    }
  };

  const handlechangeCardnumber = (event) => {

    setCardNumberError(null);
    setCardNum(true)
    if (event.error) {
      setCardNumberError(event.error.message)
    }

    if (!document.getElementById("accHolderName")?.value) {
      setAccHolderNameError("Please enter account name")
    }
  };

  const handlechangeCardexpiry = (event) => {
    setExiry(true);
    setExpiryError(null);
    if (event.error) {
      setExpiryError(event.error.message)
    }
  };

  const handlechangeCardcsv = (event) => {
    setCsvCode(true);
    setCvcError(null);
    if (event.error) {
      setCvcError(event.error.message)
    }
  };

  const handleSubmitStripe = (stripe, elements) => async (event) => {
    event.preventDefault();
    if (!username || !cardNum || !expiryDate || !csvCode) {
      if (!username) {
        setAccHolderNameError("Please enter card holder name")
      }
      if (!cardNum) {
        setCardNumberError("Your card number is incomplete.")
      }
      if (!expiryDate) {
        setExpiryError("Your card's expiry date is incomplete.")
      }
      if (!csvCode) {
        setCvcError("Your card's security code is incomplete.")
      }
      return;

    }

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
    } else {
      try {
        setIsPaymentProgress(true);
        let param = {
          customerId: cardData[0]?.customerId,
          sourceId: cardToken,
        };
        const res = await axiosApiCall.post(API_ROUTER?.ADD_SPA_CARD, param);
        if (!res?.status) {
          setIsPaymentProgress(false);
          return toaster(res?.message, TOAST_TYPES.ERROR);
        } else {
          if (subscriptionPayment) {
            let cardParam = {
              stripe_card_id: res?.data?.data?.stripe_card_id,
              customerId: res?.data?.data?.customerId,
            };
            const defaultCard = await axiosApiCall.post(API_ROUTER?.UPDATE_SPA_DEFAULT_CARD, cardParam);
            if (!defaultCard?.status) {
              return toaster(defaultCard?.data?.message, TOAST_TYPES.ERROR);
            }
            dispatch(handleSubscriptionFail(false));
            dispatch(handleBlock(false));
          }
          setIsPaymentProgress(false);
          cancel();
          toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
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
        label={"Add card"}
        loadinglabel={"Add card"}
        isLoading={isPaymentProgress}
        className="loading-btn-wrapper sitback-add-card-btn"
        onClick={handleSubmitStripe(stripe, elements)}
      />
    );
  };

  const handleTabChange = (val) => {
    dispatch(handlePaymentTab(val))
  }

  useEffect(() => {
    setSelectedDate()
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarVisible(false);
      }
    };

    if (isCalendarVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarVisible]);

  return (
    <Modal
      show={lgCardShow}
      onHide={() => cancel()}
      aria-labelledby="example-modal-sizes-title-sm"
      centered
      className="sitback-modal-wrapper sitbackmodalwrapper sitback-updated-profile-service-modal"
    >
      <Modal.Header closeButton className="red-close-icon"></Modal.Header>
      <Modal.Body className="stripe-card">
        <SitBackModalBodyWrapper className="p-0">
          <h3 className="modal-title-text" style={{ marginTop: '-30px' }}>{t("cardModal")}</h3>
          <Form>
            <Elements stripe={stripePromise}>
              <div>
                <Label className="cardtitle">{t('cardHolderName')}</Label>
                <Input
                  name="accHolderName"
                  id="accHolderName"
                  placeholder={t('nameOnCard')}
                  required
                  value={username}
                  onChange={(e) => handlechangeCardname(e)}
                />
                {accHolderNameError && <p className="text-danger mt-1">{accHolderNameError}</p>}
              </div>
              <Row className="payment-input-wrapper">
                <Col md={12} className="card_number">
                  <Label>{t('cardNumber')}</Label>
                  <CardNumberElement
                    className="card_number_input"
                    onChange={(e) => handlechangeCardnumber(e)}
                    options={CARD_ELEMENT_OPTIONS}
                  />
                  {cardNumberError && <p className="text-danger mt-1">{cardNumberError}</p>}
                </Col>
                <Col md={12} className="card_number">
                  <Label>{t('cardExpire')}</Label>
                  <CardExpiryElement
                    className="card_number_input"
                    onChange={(e) => handlechangeCardexpiry(e)}
                    options={CARD_ELEMENT_OPTIONS}
                  />
                  {expiryError && <p className="text-danger mt-1">{expiryError}</p>}
                </Col>
                <Col md={12} className="card_number">
                  <Label>{t('cardCvvNumber')}</Label>
                  <CardCvcElement
                    options={CARD_CVC_OPTIONS}
                    className="card_number_input"
                    onChange={(e) => handlechangeCardcsv(e)}
                  />
                  {cvcError && <p className="text-danger mt-1">{cvcError}</p>}
                </Col>
              </Row>
              <PaymentForm />
            </Elements>
          </Form>
        </SitBackModalBodyWrapper>
      </Modal.Body>
    </Modal>
  );
};

export default BankDetailModal;
