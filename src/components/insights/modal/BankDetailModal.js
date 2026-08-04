// BankDetailModal.js
import { yupResolver } from "@hookform/resolvers/yup";
import { CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import dayjs from "dayjs";
import moment from "moment";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import Calendar from "react-calendar";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import InlineSVG from "svg-inline-react";
import * as yup from "yup";
import LoadingButton from "@/components/shared/button/LoadingButton";
import { useToaster } from "@/hooks";
import {
  appointmentCheckSliceSelector,
  handlePaymentTab,
  handleSubscriptionFail,
} from "@/redux/appointment";
import { authCheckSliceSelector } from "@/redux/authCheck";
import { handleBank, handleBlock } from "@/redux/messageTab";
import { API_ROUTER } from "@/services/apiRouter";
import {
  FormGroup,
  Input,
  Label,
  Select,
  SitBackModalBodyWrapper,
} from "@/styles/global/main.style";
import { Info_icon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
const BankDetailModal = ({ lgShow, setLgShow, cardData }) => {
  //hooks
  const { t } = useTranslation();
  const { toaster } = useToaster();
  const { login } = useSelector(authCheckSliceSelector);
  const { isPaymentTab } = useSelector(appointmentCheckSliceSelector);
  const { subscriptionPayment } = useSelector(appointmentCheckSliceSelector);
  const dispatch = useDispatch();
  const formData = new FormData();
  const stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY);
  const [selectedDate, setSelectedDate] = useState("");
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

  const [showToolTip, setShowToolTip] = useState(false);
  const target = useRef(null);
  const tooltipRef = useRef(null);

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
          err = "Please enter valid account number.";
        }
        if (res?.error.includes("Routing number")) {
          err = "Routing number must have 9 digits.";
        }
        if (res?.error.includes("routing number")) {
          err = "Invalid routing number.";
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
          err = "City, State, Zipcode: Invalid US state or province.";
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
        .test("fileType", "Invalid image format", (value) =>
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
        .test("fileType", "Invalid image format", (value) =>
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
        .matches(/^\d+$/, "Zip-code must be a number")
        .max(8, "Please enter valid zipcode")
        .required("Zip-code is required"),
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

  const UploadedFirstImage = watch("frontImage");
  const UploadedBackImage = watch("backImage");

  const handleDropFrontImage = useCallback(
    (event) => {
      const file = event?.target.files[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("frontImage", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleDropBackImage = useCallback(
    (event) => {
      const file = event?.target.files[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("backImage", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const cancel = async () => {
    setShowToolTip(false)
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
    setLgShow(false);
  };

  const handlechangeCardname = (event) => {
    setAccHolderNameError(null);
    setUsername(event.target.value);
    if (!document.getElementById("accHolderName")?.value) {
      setAccHolderNameError("Please enter account name");
    }
    if (!/^[a-zA-Z\s\-_]+$/.test(event.target.value)) {
      setAccHolderNameError("Please enter a valid account name (must be text)");
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
      setAccHolderNameError("Please enter account name");
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

  const handleSubmitStripe = (stripe, elements) => async (event) => {
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
            const defaultCard = await axiosApiCall.post(
              API_ROUTER?.UPDATE_SPA_DEFAULT_CARD,
              cardParam
            );
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
    dispatch(handlePaymentTab(val));
  };

  useEffect(() => {
    setSelectedDate();
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

  const handleClickOutsides = (event) => {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target) && !target.current.contains(event.target)) {
      setShowToolTip(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsides);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsides);
    };
  }, []);

  return (
    <Modal
      show={lgShow}
      onHide={() => cancel()}
      aria-labelledby="example-modal-sizes-title-lg"
      centered
      className="sitback-modal-wrapper sitbackmodalwrapper sitback-updated-profile-service-modal"
    >
      <Modal.Header closeButton className="red-close-icon"></Modal.Header>
      <Modal.Body className="stripe-card">
        <SitBackModalBodyWrapper className="p-0">
          <h3 className="modal-title-text" style={{ marginTop: "-30px" }}>
            Add bank details
          </h3>
          <Form onSubmit={handleSubmit(onSubmitForm)}>
            <FormGroup controlId="formBasicEmail">
              <Row>
                <Col col={6}>
                  <div>
                    <Label>{t("firstName")}</Label>
                    <Input type="text" {...register("firstName")} placeholder="Will" />
                    <p className="text-danger">{errors.firstName?.message}</p>
                  </div>
                </Col>
                <Col col={6}>
                  <div>
                    <Label>{t("lastName")}</Label>
                    <Input type="text" {...register("lastName")} placeholder="Smith" />
                    <p className="text-danger">{errors.lastName?.message}</p>
                  </div>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup controlId="formBasicEmail">
              <Label>{t("bankName1")}</Label>
              <Input type="text" {...register("bankName")} placeholder="Wells Fargo" />
              <p className="text-danger">{errors.bankName?.message}</p>
            </FormGroup>
            <FormGroup controlId="formBasicEmail">
              <Label>{t("accNumber")}</Label>
              <Input
                type="text"
                {...register("accountNumber")}
                placeholder="0000 - 0000 - 0000 - 0000"
              />
              <p className="text-danger">{errors.accountNumber?.message}</p>
            </FormGroup>
            <FormGroup controlId="formBasicEmail">
              <Label>{t("routingNum")}</Label>
              <Input
                type="text"
                {...register("routingNumber")}
                placeholder="0000 - 0000 - 0000 - 0000"
              />
              <p className="text-danger">{errors.routingNumber?.message}</p>
            </FormGroup>
            <div className="account-section">
              <Row>
                <Col col={6}>
                  <FormGroup className="mb-0">
                    <Label>{t("accType")}</Label>
                    <Select {...register("accountType")} aria-label="Default select example">
                      <option value="company">{t("company")}</option>
                      <option value="individual">{t("individual")}</option>
                    </Select>
                    <p className="text-danger">{errors.accountType?.message}</p>
                  </FormGroup>
                </Col>
                <Col col={6}>
                  <FormGroup
                    className={`white-input-wrapper mb-0 ${isCalendarVisible ? "show-calendar" : ""
                      }`}
                  >
                    <Label className="birthday">{t("birthDay")}</Label>
                    <Input
                      type="text"
                      placeholder="Select birth date"
                      className=""
                      value={selectedDate && moment(selectedDate).format("yyyy-MM-DD")}
                      onClick={() => setIsCalendarVisible(true)}
                    />
                    <div className="calendar-wrapper-div" ref={calendarRef}>
                      {isCalendarVisible && (
                        <Controller
                          name="birthDate"
                          control={control}
                          render={({ field }) => (
                            <Calendar
                              dateFormat="YYYY-MM-DD"
                              {...field}
                              value={""}
                              defaultValue={dayjs(moment().subtract(13, "years").toDate())}
                              maxDate={moment().subtract(13, "years").toDate()} // 13 years ago
                              onChange={(e) => {
                                field.onChange(e);
                                setSelectedDate(e);
                                setIsCalendarVisible(false);
                              }}
                            />
                          )}
                        />
                      )}
                    </div>
                    <p className="text-danger">{errors?.birthDate?.message}</p>
                  </FormGroup>
                </Col>
              </Row>
            </div>
            <FormGroup controlId="formBasicEmail">
              <Label>{t("address")}</Label>
              <Input as="textarea" rows={2} {...register("address")} placeholder="Address" />
              <p className="text-danger">{errors.address?.message}</p>
            </FormGroup>
            <Row>
              <Col sm={4}>
                <div>
                  <Label>{t("city")}</Label>
                  <Input type="text" placeholder="City" {...register("city")} />
                  <p className="text-danger">{errors.city?.message}</p>
                </div>
              </Col>
              <Col sm={4}>
                <div>
                  <Label>{t("state")}</Label>
                  <Input type="text" placeholder="State" {...register("state")} />
                  <p className="text-danger">{errors.state?.message}</p>
                </div>
              </Col>
              <Col sm={4}>
                <div>
                  <Label>{t("zipCodeBank")}</Label>
                  <Input type="number" placeholder="Zip-code" {...register("pinCode")} />
                  <p className="text-danger">{errors.pinCode?.message}</p>
                </div>
              </Col>
            </Row>
            <div className="IdentifyDocument">
              <h5>
                Identity Document{" "}
                <Button ref={target} onClick={() => setShowToolTip(!showToolTip)}>
                  <InlineSVG
                    src={Info_icon}
                    data-tooltip-id="my-tooltip-1"
                    className="global_laguage_icon"
                  />
                </Button>
              </h5>
              <Overlay target={target.current} show={showToolTip} placement="right" ref={tooltipRef}>
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    <p>Passport</p>
                    <p>Passport card</p>
                    <p>Driver license</p>
                    <p>State issued ID card</p>
                    <p>Resident permit ID / U.S. Green Card</p>
                    <p>Border crossing card</p>
                    {/* <p>Child ID</p> */}
                    <p>Child ID</p>
                    <p>NYC card</p>
                    <p>U.S. visa card</p>
                  </Tooltip>
                )}
              </Overlay>
            </div>
            <div className="front-and-back-image-wrapper">
              <Row>
                <Col sm={6}>
                  <div className="upload-file-input-wrapper">
                    <Label>{t("fImg")}</Label>
                    <div className="upload-file-input">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleDropFrontImage(e)}
                      />
                      <img
                        alt="sitback"
                        className=""
                        src={UploadedFirstImage?.preview || "/images/upload-file-icon.svg"} //
                      />
                      {!UploadedFirstImage?.preview && <p>{t("dragFile")}</p>}
                    </div>
                    <p className="text-danger">{errors.frontImage?.message}</p>
                  </div>
                </Col>
                <Col col={6}>
                  <div className="upload-file-input-wrapper">
                    <Label>{t("bImg")}</Label>
                    <div className="upload-file-input">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleDropBackImage(e)}
                      />
                      <img
                        alt="sitback"
                        className=""
                        src={UploadedBackImage?.preview || "/images/upload-file-icon.svg"}
                      />
                      {!UploadedBackImage?.preview && <p>{t("dragFile")}</p>}
                    </div>
                    <p className="text-danger">{errors.backImage?.message}</p>
                  </div>
                </Col>
              </Row>
            </div>
            <LoadingButton
              type="submit"
              disabled={loading}
              label={t("addBank")}
              variant="primary"
              loadinglabel={t("addBank")}
              isLoading={loading}
              className="loading-btn-wrapper sitback-add-card-btn"
            />
          </Form>
        </SitBackModalBodyWrapper>
      </Modal.Body>
    </Modal>
  );
};

export default BankDetailModal;
