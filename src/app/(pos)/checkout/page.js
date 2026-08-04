"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import { useDispatch } from "react-redux";
import { components } from "react-select";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import * as yup from "yup";
import { AddClientModal } from "../AddClientModal";
import LoadingButton from "@/components/shared/button/LoadingButton";
import CustomModal from "@/components/shared/modal";
import Loader from "@/components/shared/spinner/loader";
import { handlePosRedirect } from "@/redux/messageTab";
import { PATH_POS } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { Input } from "@/styles/global/main.style";
import { CheckoutWraper } from "@/styles/pages/pos.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS } from "@/utils/constants";

export default function Checkout() {
  const { SingleValue, Option } = components;

  //states
  const [loading, setLoading] = useState(false);
const [loadingProductCount, setLoadingProductCount] = useState(false);
  const [tempOrderList, setTempOrderList] = useState([]);
  const [tempOrderTotal, setTempOrderTotal] = useState(0);
  const [stripeError, setStripeError] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [invoiceValue, setInvoiceValue] = useState(0);
  const [isPaymentProgress, setIsPaymentProgress] = useState(false);

  const [accHolderNameError, setAccHolderNameError] = useState(null);
  const [zipCodeError, setZipCodeError] = useState(null);
  const [cardNumberError, setCardNumberError] = useState(null);
  const [expiryError, setExpiryError] = useState(null);
  const [postalError, setPostalError] = useState(null);
  const [cvcError, setCvcError] = useState(null);

  const [username, setUsername] = useState(null);
  const [PCode, setPCode] = useState(null);
  const [cardNum, setCardNum] = useState(false);
  const [expiryDate, setExiry] = useState(false);
  const [csvCode, setCsvCode] = useState(false);
  const [postalCode, setPostalCode] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [clientDetail, setClientDetail] = useState();
  const [emailDisable, setEmailDisable] = useState(true);
  const stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY);
  const [client, seClient] = useState([]);

  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const cardRef = useRef(null);

  const defaultValues = useMemo(
    () => ({
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
    }),
    []
  );

  // Hooks
  const { t } = useTranslation();
  const { push } = useRouter();
  const dispatch = useDispatch();

  const formSchema = yup
    .object()
    .shape({
      name: yup.string().required("Name is required").max(40, t("errMaxNameLength")),
      email: yup
        .string()
        .required(t("reqEmail"))
        .email("Enter valid email address")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, t("validEmailAddress")),
      phoneNumber: yup
        .string()
        .required("Phone Number is required")
        .min(5, "please enter a valid phone number"),
      address: yup.string().required("Address is required"),
    })
    .strict(true);

  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  const { setValue, reset } = methods;

  const HandleOrder = async () => {
    let { isBankDetailsAdded } = await checkBankDetails();
    if (tempOrderList?.length > 0) {
      // eslint-disable-next-line no-useless-escape
      const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (clientDetail?.email == null || clientDetail?.email == "") {
        toast.error("Email field is required", { autoClose: 2000 });
      } else {
        if (!regex.test(clientDetail?.email)) {
          toast.error("Please enter correct email address", { autoClose: 2000 });
        } else {
          if (isBankDetailsAdded) {
            setIsCardModalOpen(true);
          } else {
            toast.error("You’ve to add bank details before move further", { autoClose: 2000 });
          }
        }
      }
    } else {
      toast.error("Please add product in cart", { autoClose: 2000 });
    }
  };

  const tempCartList = async (loading = true) => {
    try {
      setLoading(loading);
      const res = await axiosApiCall.get(API_ROUTER?.POS_TEMP_CART_LIST);
      if (!res?.data?.status) {
        return toast.error(res?.message, { autoClose: 2000 });
      } else {
        setTempOrderTotal((Math.round(res?.data?.totalAmount * 100) / 100).toFixed(2));
        setTempOrderList(res?.data?.data);
        setLoadingProductCount(false)
      }
    } catch (err) {
      toast.error(TOAST_ALERTS.GENERAL_ERROR, { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  const GetProduct = async () => {
    try {
      const res = await axiosApiCall.post(API_ROUTER?.POS_PRODUCT_LIST);
      if (!res?.data?.status) {
        return toast.error(res?.message, { autoClose: 2000 });
      } else {
        dispatch(handlePosRedirect(res?.data?.data?.length));
      }
    } catch (error) {
      toast.error(TOAST_ALERTS.GENERAL_ERROR, { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCart = async (data) => {
    try {
      cardRef.current = data;
      // setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.POS_REMOVE_TEMP_CART, { id: data?.id });
      if (!res?.data?.status) {
        return toast.error(res?.message, { autoClose: 2000 });
      } else {
        toast.success(res?.data?.message, { autoClose: 2000 });

        tempCartList(false);
      }
    } catch (err) {
      //setLoading(false);
      toast.error(TOAST_ALERTS.GENERAL_ERROR, { autoClose: 2000 });
    } finally {
      //setLoading(false);
    }
  };

    const handleCount = async (data, count, event) => {
    try {
      setLoadingProductCount(true);
      let param = {
        id: data?.id,
        pmainamount: data?.pdata[0]?.price,
        pcount: count,
        countin: event,
      };
      const res = await axiosApiCall.post(API_ROUTER?.UPDATE_TEMP_CART, param);
      if (!res?.data?.status) {
        setLoadingProductCount(false)
        toast.error(res?.message, { autoClose: 2000 });
      } else {
        tempCartList(false);
      }
    } catch (err) {
      setLoadingProductCount(false)
      toast.error(TOAST_ALERTS.GENERAL_ERROR, { autoClose: 2000 });
    } finally {
      //setLoading(false);
    }
  };

  const handlePostalCode = (event) => {
    if (!document.getElementById("postalCodeNumber")?.value) {
      setZipCodeError("Please enter Zip Code");
      // return;
    }
    if (event?.target?.value.length > 8) {
      setZipCodeError("Please enter a proper Zip Code");
      return;
    }
    if (event?.target?.value == "") {
      setZipCodeError("Please enter Zip Code");
      // return;
    }
    setPostalCode(true);
    setZipCodeError(null);
    setPostalError(null);
    setPCode(event?.target?.value);
  };

  const handlechangeCardname = (event) => {
    setAccHolderNameError(null);
    setUsername(event.target.value);

    if (!document.getElementById("accHolderName")?.value) {
      setAccHolderNameError("Please enter Account Name");
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

    if (!document.getElementById("postalCodeNumber")?.value) {
      setZipCodeError("Please enter Zip Code");
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

  const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    return (
      <LoadingButton
        type="submit"
        disabled={isPaymentProgress}
        label={`pay $${invoiceValue || tempOrderTotal}`}
        loadinglabel={"pay now..."}
        isLoading={isPaymentProgress}
        className="loading-btn-wrapper"
        onClick={handleInvoiceSubmit(stripe, elements)}
      />
    );
  };

  const handleCloseModal = () => {
    setIsCardModalOpen(false);
    setUsername(null);
    setAccHolderNameError(null);
    setCardNumberError(null);
    setCvcError(null);
    setExpiryError(null);
    // setStripeError(null);
  };

  const getClients = async () => {
    try {
      setLoading(true);
      const res = await axiosApiCall.get(API_ROUTER?.POST_ADD_CLIENT);
      if (!res?.status) {
        return toast.error(res?.message, { autoClose: 2000 });
      } else {
        let options = [];
        res?.data?.data.length &&
          res?.data?.data?.map((s) => {
            options.push({
              value: s?.userId,
              label: s?.username,
              phNo: s?.phone,
            });
          });
        seClient(options);
        // seClient(res?.data?.data)
      }
    } catch (error) {
      toast.error(TOAST_ALERTS.GENERAL_ERROR, { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  const checkBankDetails = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.CHECK_BANK_DETAILS);
      if (res) {
        return res?.data;
      }
    } catch (error) {
      toast.error(TOAST_ALERTS.GENERAL_ERROR, { autoClose: 2000 });
    }
  };

  const getClientDetail = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.POS_USER_DETAIL + `${selectedUser?.value}`);
      if (!res?.status) {
        return toast.error(res?.message, { autoClose: 2000 });
      } else {
        if (res?.data?.data?.email == "" || res?.data?.data?.email == null) {
          setEmailDisable(false);
        } else {
          setEmailDisable(true);
        }
        setClientDetail(res?.data?.data);
      }
    } catch (error) {
      toast.error(TOAST_ALERTS.GENERAL_ERROR, { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getClients();
  }, [showAddClientModal]);

  useEffect(() => {
    getClients();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      getClientDetail();
    }
  }, [selectedUser]);

  // const handleInvoiceSubmit
  const handleInvoiceSubmit = (stripe, elements) => async () => {
    if (!username || !cardNum || !expiryDate || !csvCode || !postalCode) {
      if (!username) {
        setAccHolderNameError("Please Enter Account name");
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
      if (!postalCode) {
        setPostalError("Please Enter Postal Code");
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
      try {
        let orderParam = {
          name: clientDetail?.username?.trim(),
          email: clientDetail?.email,
          phone: clientDetail?.phone,
          user_id: clientDetail?.id,
          countrycode: clientDetail?.countrycode || "1",
          totalamount: invoiceValue || tempOrderTotal,
          cartItems: tempOrderList,
        };

        const addOrderDetails = await axiosApiCall.post(
          API_ROUTER?.POS_ADD_ORDER_DETAILS,
          orderParam
        );
        if (!addOrderDetails?.status) {
          setIsPaymentProgress(false);
          return toast.error(addOrderDetails?.data, { autoClose: 2000 });
        }
        if (!addOrderDetails?.data?.status) {
          setIsPaymentProgress(false);
          return toast.error(addOrderDetails?.data?.message, { autoClose: 2000 });
        } else {
          let customerData = {
            email: clientDetail?.email,
            stripe_token: cardToken,
          };
          const addCustomer = await axiosApiCall.post(API_ROUTER?.POS_ADD_CUSTOMER, customerData);
          if (!addCustomer?.status) {
            setIsPaymentProgress(false);
            return toast.error(addCustomer?.message, { autoClose: 2000 });
          } else {
            let invoiceData = {
              order_id: addOrderDetails?.data?.data?.id,
              totalamount: invoiceValue || tempOrderTotal,
              name: clientDetail?.username?.trim(),
              customerId: addCustomer?.data?.data?.result?.id,
              zipcode: PCode,
            };
            //const payInvoice = await axiosApiCall.post(API_ROUTER?.POS_PAY_INVOICE, invoiceData);
            const payInvoice = await axiosApiCall({
              method: "post",
              url: API_ROUTER?.POS_PAY_INVOICE,
              baseURL: process.env.API_URL_V3,
              data: invoiceData,
            });
            if (!payInvoice?.status) {
              setIsPaymentProgress(false);
              return toast.error(payInvoice?.message, { autoClose: 2000 });
            } else {
              handleCloseModal();
              toast.success("Payment successfully.", { autoClose: 2000 });

              tempCartList();
              resetState();
              push(PATH_POS?.list);
            }
          }
        }
      } catch (error) {
        toast.error(TOAST_ALERTS.GENERAL_ERROR, { autoClose: 2000 });
        setIsPaymentProgress(false);
      }
    }
  };

  const resetState = () => {
    setValue("phoneNumber", "");
    reset(defaultValues);
  };

  const IconSingleValue = (props) => (
    <SingleValue {...props}>
      <div className="user-name-number-text">
        {" "}
        <p>{props.data.label}</p> <p className="phone">{props.data.phNo}</p>{" "}
      </div>
    </SingleValue>
  );

  const IconOption = (props) => (
    <Option {...props}>
      <div className="user-name-number-text">
        {" "}
        <p>{props.data.label}</p> <p className="phone">{props.data.phNo}</p>{" "}
      </div>
    </Option>
  );

  const handleEmail = (e) => {
    setClientDetail({ ...clientDetail, email: e.target.value });
  };

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    if (!isNaN(value)) {
      setInvoiceValue(value);
    }
  };

  useEffect(() => {
    tempCartList();
    GetProduct();
  }, []);

  return (
    <CheckoutWraper>
      <Loader loading={loading} />
      <Container>
        <div className="checkout_box">
          <div className="checkout_main">
            <div className="contact_form addclient-form">
              <Row>
                <Col md={12} lg={12}>
                  <div className="input_wrap">
                    <label htmlFor="Name">{t("name")}</label>
                    <CreatableSelect
                      // id="user-select"
                      className="sitback-select2-container input-with-icon Select-Service-checkbox-wrapper"
                      classNamePrefix="sitback-select-option"
                      placeholder="Select user"
                      options={client}
                      onCreateOption={() => setShowAddClientModal(true)}
                      closeMenuOnSelect={true}
                      isSearchable={true}
                      components={{
                        SingleValue: IconSingleValue,
                        Option: IconOption,
                      }}
                      onChange={(e) => setSelectedUser(e)}
                    />
                  </div>
                </Col>
                <Col md={12} lg={6}>
                  <div className="input_wrap">
                    <label htmlFor="Name">{t("email")}</label>
                    <input
                      disabled={emailDisable}
                      className="flex w-full "
                      type="text"
                      id="name"
                      value={clientDetail?.email || ""}
                      onChange={(e) => handleEmail(e)}
                    ></input>
                  </div>
                </Col>
                <Col md={12} lg={6}>
                  <div className="input_wrap">
                    <label htmlFor="Name">{t("phone")}</label>
                    <PhoneInput
                      disabled
                      placeholder={t("enterphoneNumber")}
                      specialLabel={t("phonenumber")}
                      country={"us"}
                      className="phone-number-input-wrapper"
                      value={clientDetail ? clientDetail?.countrycode + clientDetail?.phone : ""}
                    />
                  </div>
                </Col>
              </Row>
            </div>
            <div className="checkout_cart_item">
              <div>
                <span className="text_title">Order Details</span>
              </div>
              {tempOrderList?.length > 0 &&
                tempOrderList?.map((order, index) => (
                  <div className="detail_card" key={index}>
                    <div className="product_img">
                      <img src={order?.pdata[0]?.image} alt="product-image" />
                    </div>
                    <div className="product_detail">
                      <span className="product_title">{order?.pdata[0]?.name}</span>
                      <span className="product_price">${order?.pdata[0]?.price}</span>

                      <div className="quantity">
                        <a
                          className="quantity__minus"
                          onClick={() => handleCount(order, order?.pcount - 1, "removed")}
                          disabled={loadingProductCount}
                          style={{ pointerEvents: loadingProductCount ? 'none' : 'auto', opacity: loadingProductCount ? 0.5 : 1 }}
                        >
                          <span>-</span>
                        </a>
                        <input
                          name="quantity"
                          type="text"
                          className="quantity__input"
                          value={order?.pcount}
                          readOnly
                        />
                        <a
                          className="quantity__plus"
                          onClick={() => handleCount(order, order?.pcount + 1, "added")}
                          disabled={loadingProductCount}
                          style={{ pointerEvents: loadingProductCount ? 'none' : 'auto', opacity: loadingProductCount ? 0.5 : 1 }}
                        >
                          <span>+</span>
                        </a>
                      </div>
                    </div>
                    <div className="remove_cart_icon">
                      <img
                        src="/images/removecarticon.svg"
                        alt="remove icon"
                        onClick={() => {
                          if (cardRef?.current?.id == order?.id) {
                            return;
                          } else {
                            handleRemoveCart(order);
                          }
                        }}
                      />
                    </div>
                  </div>
                ))}
              <div className="sub_total">
                <span className="sub_total_title">{t("total")}</span>
                <span className="sub_total_price">${tempOrderTotal}</span>
              </div>
              <div className="checkout_btn">
                <LoadingButton
                  disabled={false}
                  label={t("checkout")}
                  onClick={() =>
                    selectedUser
                      ? HandleOrder()
                      : toast.error("Please Select User", { autoClose: 2000 })
                  }
                  loadinglabel={t("checkout")}
                  isLoading={false}
                  className="loading-btn-wrapper csvmodal"
                />
              </div>
            </div>
          </div>
          {/* </Form> */}
        </div>
      </Container>

      {/* modal */}
      <CustomModal
        show={isCardModalOpen}
        onHide={() => {
          handleCloseModal();
        }}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
        className="sitback-modal-wrapper checkout-payment-model"
      >
        <Modal.Header>{t("payInvoice")}</Modal.Header>
        <Modal.Body className="stripe-card">
          <Elements stripe={stripePromise}>
            <div className="payment-card-imgs">
              <img src="/images/visacard.svg" className="" alt="visacard" />
              <img src="/images/mastercard.svg" alt="visacard" />
              <img src="/images/ameracan.svg" alt="visacard" />
              <img src="/images/discover.svg" alt="visacard" />
            </div>
            <label htmlFor="amount">{t("PayAmt")}</label>
            <div className="payment-amount">
              <input
                className="payment-price"
                value={invoiceValue || tempOrderTotal}
                onChange={(e) => handleInputChange(e)}
                disabled={!isEditable}
              />
              <button onClick={() => setIsEditable(!isEditable)}>
                {!isEditable ? "Edit" : "Save"}
              </button>
            </div>
            <div className="Card-name">
              <label htmlFor="Name">{t("nameOnCard")}</label>
              <Input
                name="accHolderName"
                id="accHolderName"
                placeholder="Name on card"
                required
                value={username}
                onChange={(e) => handlechangeCardname(e)}
              />
              {accHolderNameError && <p className="text-danger">{accHolderNameError}</p>}
            </div>
            <div className="card_number Card-name">
              <label htmlFor="card number">{t("cardNumber")}</label>
              <CardNumberElement
                className="card_number_input"
                onChange={(e) => handlechangeCardnumber(e)}
              />
              {cardNumberError && <p className="text-danger">{cardNumberError}</p>}
            </div>
            <Row className="payment-input-wrapper Card-name">
              <div className="expirey_date">
                <div className="expiry-width">
                  <label htmlFor="expiry date">{t("expiryDate")}</label>
                  <CardExpiryElement
                    className="card_number_input_left"
                    onChange={(e) => handlechangeCardexpiry(e)}
                  />
                  {expiryError && <p className="text-danger">{expiryError}</p>}
                </div>
                <div className="expiry-width">
                  <label htmlFor="security code">{t("securityCode")}</label>
                  <CardCvcElement
                    options={{ placeholder: "CVV" }}
                    className="card_number_input_right  "
                    onChange={(e) => handlechangeCardcsv(e)}
                  />
                  {cvcError && <p className="text-danger">{cvcError}</p>}
                </div>
              </div>
            </Row>
            <div className="Card-name">
              <label htmlFor="card number">{t("zipCode")}</label>
              <Input
                name="postalCodeNumber"
                id="postalCodeNumber"
                placeholder="Postal code"
                type="number"
                required
                value={PCode}
                onChange={(e) => handlePostalCode(e)}
              />
              {postalError && <p className="text-danger">{postalError}</p>}
            </div>
            <PaymentForm />
          </Elements>
        </Modal.Body>
      </CustomModal>

      <AddClientModal show={showAddClientModal} onHide={() => setShowAddClientModal(false)} />
    </CheckoutWraper>
  );
}
