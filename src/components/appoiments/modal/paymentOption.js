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
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { Accordion, Col, Form, Modal, Row } from "react-bootstrap";
// import AddCards from "@/components/insights/modal/addCards";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { default as ReactSelect, components } from "react-select";
import InlineSVG from "svg-inline-react";
import * as yup from "yup";
import ProductListPayment from "@/components/appoiments/modal/productListPayment";
import LoadingButton from "@/components/shared/button/LoadingButton";
import CashModal from "@/components/shared/modal/cashModal";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { useToaster } from "@/hooks";
import { handlePaymentFailedModal } from "@/redux/appointment";
import {
  handleCalender,
  handleTarget,
  handleTargetProcess,
  messageCheckSliceSelector,
} from "@/redux/messageTab";
import { API_ROUTER } from "@/services/apiRouter";
import {
  Button,
  FormGroup,
  Input,
  Label,
  SitBackModalBodyWrapper,
} from "@/styles/global/main.style";
import { DeleteV2_icon, dollar_icon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import {
  CARD_CVC_OPTIONS,
  CARD_ELEMENT_OPTIONS,
  TOAST_ALERTS,
  TOAST_TYPES,
} from "@/utils/constants";

const stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY);

const getCardMeta = (card) => {
  const brand =
    card?.brand ||
    card?.get_card_detail?.brand ||
    card?.get_card_detail?.name ||
    "Card";
  const last4 = card?.last4 || card?.get_card_detail?.last4 || "****";
  const cardId =
    card?.paymentId ||
    card?.paymentMethodId ||
    card?.id ||
    card?.stripe_card_id ||
    card?.get_card_detail?.id ||
    null;
  const isDefault =
    card?.isDefault == true ||
    card?.isDefault === "true" ||
    card?.status == 1 ||
    card?.get_card_detail?.status == 1;
  return { brand, last4, cardId, isDefault };
};

const resolveClientId = (bookingData) =>
  bookingData?.client?.clientId ||
  bookingData?.client?.customerId ||
  bookingData?.client?.id ||
  bookingData?.client?.userId ||
  bookingData?.customerId ||
  bookingData?.customer?.customerId ||
  bookingData?.customer?.id ||
  bookingData?.userId ||
  null;

const CardForm = ({ onHide, onSuccess, selectedClient, bookingId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toaster } = useToaster();
  const { t } = useTranslation();

  const [isPaymentProgress, setIsPaymentProgress] = useState(false);
  const [stripeError, setStripeError] = useState(null);
  const [accHolderNameError, setAccHolderNameError] = useState(null);
  const [cardNumberError, setCardNumberError] = useState(null);
  const [expiryError, setExpiryError] = useState(null);
  const [cvcError, setCvcError] = useState(null);
  const [username, setUsername] = useState("");
  const [cardNum, setCardNum] = useState(false);
  const [expiryDate, setExiry] = useState(false);
  const [csvCode, setCsvCode] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!username || !cardNum || !expiryDate || !csvCode) {
      if (!username) setAccHolderNameError("Please enter card holder name");
      if (!cardNum) setCardNumberError("Your card number is incomplete.");
      if (!expiryDate) setExpiryError("Your card's expiry date is incomplete.");
      if (!csvCode) setCvcError("Your card's security code is incomplete.");
      return;
    }

    setIsPaymentProgress(true);
    setStripeError(null);

    const { error, token } = await stripe.createToken(
      elements.getElement(CardNumberElement),
      { currency: "usd", name: username }
    );

    if (error) {
      setStripeError(error.message);
      setIsPaymentProgress(false);
      return;
    }

    const cardToken = token?.id;
    const customerId = selectedClient?.customerId;
    const userId =
      selectedClient?.user_id || selectedClient?.userId || selectedClient?.id;

    if (!userId && !customerId) {
      setIsPaymentProgress(false);
      return toaster("Client details missing for adding a card", TOAST_TYPES.ERROR);
    }

    try {
      const res = await axiosApiCall.post(API_ROUTER?.ADD_MANUAL_NEW_CARD, {
        user_id: userId,
        sourceId: cardToken,
        stripe_token: cardToken,
        bookingId,
      });
      if (!res?.status) {
        setIsPaymentProgress(false);
        return toaster(res?.message || "Failed to add card", TOAST_TYPES.ERROR);
      }

      setIsPaymentProgress(false);
      onSuccess({
        brand: token?.card?.brand || "Visa",
        last4: token?.card?.last4 || "4242",
        stripe_card_id:
          res?.data?.data?.paymentMethodId || res?.data?.data?.default_source || null,
        customerId: res?.data?.data?.customerId || customerId,
      });
      onHide();
      toaster(res?.data?.message || "Card added successfully!", TOAST_TYPES.SUCCESS);
    } catch (err) {
      setIsPaymentProgress(false);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <div className="mt-1">
        <Label className="cardtitle">{t("cardHolderName")}</Label>
        <Input
          name="accHolderName"
          id="accHolderName"
          placeholder={t("nameOnCard")}
          value={username}
          onChange={(e) => {
            setAccHolderNameError(null);
            setUsername(e.target.value);
            if (!e.target.value) setAccHolderNameError("Please enter account name");
          }}
        />
        {accHolderNameError && (
          <p className="text-danger" style={{ marginLeft: "25px", marginTop: "5px" }}>
            {accHolderNameError}
          </p>
        )}
      </div>
      <Row className="payment-input-wrapper">
        <Col md={12} className="card_number mt-1">
          <Label>{t("cardNumber")}</Label>
          <CardNumberElement
            className="card_number_input"
            options={CARD_ELEMENT_OPTIONS}
            onChange={(e) => {
              setCardNumberError(null);
              setCardNum(true);
              if (e.error) setCardNumberError(e.error.message);
            }}
          />
          {cardNumberError && (
            <p className="text-danger" style={{ marginLeft: "25px", marginTop: "5px" }}>
              {cardNumberError}
            </p>
          )}
        </Col>
        <Col md={12} className="card_number mt-1">
          <Label>{t("cardExpire")}</Label>
          <CardExpiryElement
            className="card_number_input"
            options={CARD_ELEMENT_OPTIONS}
            onChange={(e) => {
              setExiry(true);
              setExpiryError(null);
              if (e.error) setExpiryError(e.error.message);
            }}
          />
          {expiryError && (
            <p className="text-danger" style={{ marginLeft: "25px", marginTop: "5px" }}>
              {expiryError}
            </p>
          )}
        </Col>
        <Col md={12} className="card_number mt-1">
          <Label>{t("cardCvvNumber")}</Label>
          <CardCvcElement
            className="card_number_input"
            options={CARD_CVC_OPTIONS}
            onChange={(e) => {
              setCsvCode(true);
              setCvcError(null);
              if (e.error) setCvcError(e.error.message);
            }}
          />
          {cvcError && (
            <p className="text-danger" style={{ marginLeft: "25px", marginTop: "5px" }}>
              {cvcError}
            </p>
          )}
        </Col>
      </Row>
      {stripeError && <p className="text-danger mt-2">{stripeError}</p>}
      <LoadingButton
        type="submit"
        disabled={isPaymentProgress}
        label="Add card"
        loadinglabel="Add card"
        isLoading={isPaymentProgress}
        className="loading-btn-wrapper sitback-add-card-btn"
      />
    </Form>
  );
};

const AddCardModal = ({ show, onHide, onSuccess, selectedClient, bookingId }) => (
  <Modal
    show={show}
    onHide={onHide}
    centered
    className="sitback-modal-wrapper sitbackmodalwrapper sitback-updated-profile-service-modal white-bg-modal"
  >
    <Modal.Header closeButton className="red-close-icon" onClick={onHide} />
    <Modal.Body className="stripe-card">
      <SitBackModalBodyWrapper>
        <h3 className="modal-title-text">Add Card Details</h3>
        <Elements stripe={stripePromise}>
          <CardForm
            onHide={onHide}
            onSuccess={onSuccess}
            selectedClient={selectedClient}
            bookingId={bookingId}
          />
        </Elements>
      </SitBackModalBodyWrapper>
    </Modal.Body>
  </Modal>
);

const PaymentOption = ({
  show,
  data,
  providerData,
  selectedData,
  onHide = () => { },
  onShow = () => { },
  onPaymentSuccess = () => { },
}) => {
  const [openCash, setOpenCash] = useState(false);
  const [bookingProductData, setBookingProductData] = useState([]);
  const [getPaymentLoader, setGetPaymentLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteTipLoading, setDeleteTipLoading] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [cardsList, setCardsList] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [cardsLoading, setCardsLoading] = useState(false);
  const [cardError, setCardError] = useState("");
  const [openAccordionKey, setOpenAccordionKey] = useState("0");

  const { bookingData } = useSelector(messageCheckSliceSelector);
  const { t } = useTranslation();
  const { toaster } = useToaster();
  const dispatch = useDispatch();
  const { SingleValue, Option } = components;
  const [serviceData, setServiceData] = useState([]);
  const [tipPrice, setTipPrice] = useState(null);
  // const [priceError, setPriceError] = useState(false);
  const [showProductListModal, setProductListModal] = useState(false);
  const [productListInTarget, setProductListTarget] = useState(false);
  const [productTotalAmount, setProductTotalAmount] = useState(0);

  //Delete tip Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteModalTip, setShowDeleteModalTip] = useState(false);
  const [deleteTargetTip, setDeleteTargetTip] = useState(null);

  //Delete Product Modal
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [addTipLoader, setAddTipLoader] = useState(false);

  const getInitials = (name) => {
    if (!name) return "";
    const cleaned = name.trim();
    if (cleaned.toLowerCase() === "mishari mishari") return "MM";
    const parts = cleaned.split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0]?.toUpperCase() || "";
  };

  const IconSingleValue = (props) => {
    const hasImage = props.data.image && props.data.image !== "null" && props.data.image !== "";
    return (
      <SingleValue {...props}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {hasImage ? (
            <img src={props.data.image} style={{ height: "30px", width: "30px" }} alt="img-tag" />
          ) : (
            <div style={{
              height: "30px",
              width: "30px",
              backgroundColor: "#e2e8f0",
              color: "#4a5568",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "bold",
              flexShrink: 0
            }}>
              {getInitials(props.data.label)}
            </div>
          )}
          <span>{props.data.label}</span>
        </div>
      </SingleValue>
    );
  };

  const IconOption = (props) => {
    const hasImage = props.data.image && props.data.image !== "null" && props.data.image !== "";
    return (
      <Option {...props}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {hasImage ? (
            <img src={props.data.image} style={{ height: "30px", width: "30px", }} alt="img-tag" />
          ) : (
            <div style={{
              height: "30px",
              width: "30px",

              backgroundColor: "#e2e8f0",
              color: "#4a5568",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "bold",
              flexShrink: 0
            }}>
              {getInitials(props.data.label)}
            </div>
          )}
          <span>{props.data.label}</span>
        </div>
      </Option>
    );
  };

  const CapturePayment = async (paymentData) => {
    if (!selectedCardId) {
      setCardError("Please select or add a credit card");
      return toaster("Please select or add a credit card", TOAST_TYPES.ERROR);
    }

    const params = {
      id: paymentData.id,
      tip: tipPrice ? tipPrice : 0,
      poscharge: productTotalAmount ? productTotalAmount : 0,
      payment_card_id: selectedCardId,
    };

    try {
      setGetPaymentLoader(true);
      const res = await axiosApiCall.post(API_ROUTER?.CAPTURE_PAYMENT, params);
      if (!res?.status) {
        if (res?.userCardError) {
          onHide();
          dispatch(
            handlePaymentFailedModal({
              show: true,
              data: selectedData?.id ? selectedData : paymentData,
            })
          );
        } else {
          return toaster(res?.message, TOAST_TYPES.ERROR);
        }
      } else {
        const updatedList = bookingData.filter((record) => record.id == paymentData?.id);
        dispatch(handleTargetProcess("removeBooking"));
        dispatch(handleTarget(updatedList[0]));
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        handlePaymentOptionModel();
        onPaymentSuccess();

        // setOpenConfirmationModal(true)
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      // dispatch(handleCalender(false));
      setGetPaymentLoader(false);
    }
  };

  const handlePaymentOptionModel = async () => {
    onHide();
    setTipPrice(null);
    setBookingProductData([]);
    setProductTotalAmount(0);
    setCardsList([]);
    setSelectedCardId(null);
    setCardError("");
    setShowCardModal(false);
    setOpenAccordionKey("0");
    reset(defaultValues);
    clearErrors("client_list");
    reset(defaultValues);
  };
  const handleCashPayment = async () => {
    setOpenCash(true);
    onHide();
  };

  const selectedClientForCard = useMemo(() => {
    const clientId = resolveClientId(data);
    if (!clientId && !data?.client) return null;
    return {
      ...(data?.client || {}),
      id: clientId,
      userId: clientId,
      user_id: clientId,
      customerId: clientId,
      username: data?.username || data?.client?.clientName || data?.client?.username,
    };
  }, [data]);

  const fetchCardDetails = async (customerId) => {
    if (!customerId) {
      setCardsList([]);
      setSelectedCardId(null);
      return;
    }

    try {
      setCardsLoading(true);
      const res = await axiosApiCall.get(
        `${API_ROUTER?.GET_CUSTOMER_CARD_DETAILS}?customerId=${customerId}`
      );
      console.log(res, "res");
      if (!res?.status) {
        setCardsList([]);
        setSelectedCardId(null);
        return;
      }

      const responseData = res?.data?.data;
      const cards = Array.isArray(responseData)
        ? responseData
        : responseData
          ? [responseData]
          : [];
      setCardsList(cards);

      if (cards.length > 0) {
        const defaultCard =
          cards.find(
            (c) =>
              c?.isDefault == true ||
              c?.isDefault === "true" ||
              c?.status == 1 ||
              c?.get_card_detail?.status == 1
          ) || cards[0];
        const { cardId } = getCardMeta(defaultCard);
        setSelectedCardId(cardId);
        if (cardId) setCardError("");
      } else {
        setSelectedCardId(null);
      }
    } catch (error) {
      console.error("Error fetching card details:", error);
      setCardsList([]);
      setSelectedCardId(null);
    } finally {
      setCardsLoading(false);
    }
  };

  const bookingWiseCardList = async () => {
    console.log(selectedData, "selectedData");
    try {
      setLoading(true);
      let param = {
        booking_id: selectedData?.id,
      };
      const res = await axiosApiCall.post(API_ROUTER?.BOOKING_WISE_CART_ITEM_LIST, param);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setBookingProductData(res?.data?.data);
        setProductTotalAmount(res?.data?.totalAmount ? res?.data?.totalAmount : 0);
        setTipPrice(res?.data?.totalTip);
        res?.data?.data?.forEach((s) => {
          // Find index of the item in fields if it already exists
          const existingIndex = fields.findIndex((field) => field.key === s.id);

          if (existingIndex !== -1) {
            // Remove the existing item if found
            remove(existingIndex);
          }
          // Append the new (or updated) data
          append({
            key: s.id,
            value: s.id,
            main_id: s.main_id,
            user_id: s.user_id,
            employee_id: s.employee_id,
            type: s?.type,
            date: s?.date,
            username: s?.username,
            productData: s?.productData,
            ammount: 0,
            tip: s?.tip,
            tipemployeename: s?.tipemployeename,
            bookingstatus: s?.bookingstatus,
          });
        });
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // getCancelUserList();
    if (show) {
      bookingWiseCardList();
    }
  }, [show]);

  useEffect(() => {
    if (!show) return;
    const customerId = resolveClientId(data);
    if (customerId) {
      fetchCardDetails(customerId);
    } else {
      setCardsList([]);
      setSelectedCardId(null);
    }
  }, [show, data?.client?.clientId, data?.customerId, data?.userId]);

  const services = async (providerData) => {
    try {
      let options = [];
      providerData &&
        providerData?.map((s) => {
          options.push({
            value: s.id,
            label: s.name,
            image: s.image,
          });
        });
      setServiceData(options);
    } catch (error) { }
  };

  useEffect(() => {
    if (providerData) {
      services(providerData);
    }
  }, [providerData]);

  const handleCount = async (info, count, event) => {
    try {
      // setLoading(true);
      let param = {
        id: info?.id,
        pmainamount: info?.basicamount,
        pcount: count,
        countin: event,
      };
      const res = await axiosApiCall.post(API_ROUTER?.UPDATE_PRODUCT_BOOKING_DATA, param);
      if (!res?.data?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        dispatch(handleCalender(true));
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        bookingWiseCardList();
        //tempCartList(false);
      }
    } catch (err) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      // setLoading(false);
    }
  };

  const formSchema = yup.object().shape({
    client_list: yup.array().of(
      yup.object().shape({
        is_checked: yup.bool(), // Remove the required validation
        employee_id: yup.string().when("is_checked", {
          is: (val) => val == true,
          then: (schema) => schema.required(t("Please Select Employee")),
          otherwise: (schema) => schema.nullable(),
        }),
        ammount: yup.number().when("is_checked", {
          is: (val) => val == true,
          then: (schema) =>
            schema
              .min(1, "Please enter tip amount")
              // .typeError("Tip must be a number")
              .transform((value) => (isNaN(value) ? 0 : value))
              .integer("Tip must be a whole number")
              .required("Please enter tip amount"),
          otherwise: (schema) => schema.nullable(),
        }),
      })
    ),
  });

  const defaultValues = useMemo(
    () => ({
      client_list: [],
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "client_list",
  });

  const handleCloseProductDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };

  const handleConfirmDeleteProduct = async () => {
    if (deleteTarget) {
      handleCloseProductDeleteModal();
      await handleDeleteProduct(deleteTarget);
    }
  };


  const handleCloseTipDeleteModal = () => {
    setShowDeleteModalTip(false);
    setDeleteTargetTip(null);
  };

  const handleConfirmDeleteTip = async () => {
    if (deleteTargetTip) {
      handleCloseTipDeleteModal();
      await DeleteTip(deleteTargetTip);
    }
  };

  const handleDeleteProduct = async (item) => {
    try {
      setLoading(true);
      let param = {
        id: item?.id,
        booking_id: data?.id,
      };
      const res = await axiosApiCall.post(API_ROUTER?.REMOVE_BOOKING_TEMP_CART, param);
      if (!res?.status) {
        return toaster(res?.data?.message, TOAST_TYPES.ERROR);
      } else {
        dispatch(handleCalender(true));
        bookingWiseCardList();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleShowProductListModal = (target) => {
    setProductListTarget(target);
    setProductListModal(true);
    handlePaymentOptionModel();
  };

  const onSubmitForm = (formData) => {
    try {
      const checkedClients = formData.client_list.filter((client) => client.is_checked === true);
      checkedClients.map((item) => AddTip(item));
    } catch (error) { }
    // console.log("formData>>>", formData);
  };

  const AddTip = async (item) => {
    try {
      setAddTipLoader(true);
      let param = {
        main_id: item?.main_id,
        booking_id: item?.key,
        tip: item?.ammount,
        tipemployee_id: item?.employee_id,
        type: item?.type, //guest
      };
      const res = await axiosApiCall.post(API_ROUTER?.ADD_TIP, param);
      if (!res?.status) {
        return toaster(res?.data?.message, TOAST_TYPES.ERROR);
      } else {
        bookingWiseCardList();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setAddTipLoader(false);
    }
  };

  const DeleteTip = async (item) => {
    try {
      setDeleteTipLoading(true);
      let param = {
        main_id: item?.main_id,
        type: item?.type,
      };
      const res = await axiosApiCall.post(API_ROUTER?.DELETE_TIP, param);
      if (!res?.status) {
        return toaster(res?.data?.message, TOAST_TYPES.ERROR);
      } else {
        bookingWiseCardList();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setDeleteTipLoading(false);
    }
  };

  const total =
    Number(tipPrice) +
    Number(data?.userTotalAmount || 0) +
    Number(productTotalAmount);
  return (
    <>
      <Modal
        show={show}
        onHide={() => handlePaymentOptionModel()}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
        className="sitback-modal-wrapper sitback-modalv2-wrapper sitback-payment-options-wrapper sitback-updated-payment-modal-wrapper
"
      >
        <Modal.Header
          closeButton
          className="red-close-icon"
          onClick={() => handlePaymentOptionModel()}
        ></Modal.Header>
        <Modal.Body className="pt-0">
          <div className="sitback-option-modal-wrapper">
            <h5>Payment Options</h5>
            <p>
              Please select the preferred payment option for services provided to {data?.username}{" "}
              an amount of ${data?.userTotalAmount}
            </p>
            <Form onSubmit={handleSubmit(onSubmitForm)}>
              <div className="sitback-history-table-wrapper addnew-client-wrapper table-scroll-added-wrapper0">
                <div className="header-bar-wrapper">
                  <h6>{t("client")}</h6>
                  <h6>Date of Transaction</h6>
                </div>
                <Accordion
                  activeKey={openAccordionKey}
                  onSelect={(key) => setOpenAccordionKey(key)}
                >
                  {bookingProductData?.length > 0
                    ? fields?.map((data, index) => {
                      const isAccordionOpen = openAccordionKey === index.toString();
                      const current_obj = isAccordionOpen ? watch(`client_list[${index}]`) : null;

                      return (
                        <Accordion.Item key={index} eventKey={index.toString()}>
                          <Accordion.Header>
                            <h6>{data.username}</h6>
                            <h6>{moment(data?.date).format("MMMM D, YYYY")}</h6>
                            <h6>{data.booking_type}</h6>
                          </Accordion.Header>
                          <Accordion.Body>
                            {data?.productData?.length > 0 ? (
                              <>
                                <div className="header-bar-wrapper inner-table-header">
                                  <h6>Service/Products</h6>
                                  <h6>Quantity</h6>
                                  <h6>Price</h6>
                                </div>

                                <div key={index}>
                                  {data?.productData?.length > 0 &&
                                    data?.productData?.map((product, pIndex) => (
                                      <div
                                        className="header-bar-wrapper service-products-table-wrapper"
                                        key={pIndex}
                                      >
                                        <h6 className="">{product?.name}</h6>
                                        <h6 className="">
                                          <div className="quantity">
                                            <div>
                                              <a
                                                className="quantity__minus"
                                                onClick={() =>
                                                  handleCount(
                                                    product,
                                                    product?.pcount - 1,
                                                    "removed"
                                                  )
                                                }
                                              >
                                                <span>-</span>
                                              </a>
                                            </div>
                                            <input
                                              name={`quantity`}
                                              type="text"
                                              className="quantity__input"
                                              value={product?.pcount}
                                              readOnly
                                            />
                                            <div>
                                              <a
                                                className="quantity__plus"
                                                onClick={() =>
                                                  handleCount(
                                                    product,
                                                    product?.pcount + 1,
                                                    "added"
                                                  )
                                                }
                                              >
                                                <span>+</span>
                                              </a>
                                            </div>
                                          </div>
                                        </h6>
                                        <h6 className="price-delete-cell">
                                          <p className="mb-0 product-price-text">${product?.pamount}</p>
                                          <div className="action-icons">
                                            <InlineSVG
                                              src={DeleteV2_icon}
                                              className="sitback-icon"
                                              onClick={() => handleDeleteProduct(product)}
                                            />
                                          </div>
                                        </h6>
                                      </div>
                                    ))}
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                            {data?.tip && data?.tip !== "0" ? (
                              <>
                                <div className="header-bar-wrapper inner-table-header">
                                  <h6>Employee Name</h6>
                                  <h6>Tip Amount</h6>
                                  <h6></h6>
                                </div>
                                <div>
                                  <div className="header-bar-wrapper service-products-table-wrapper">
                                    <h6 className="">
                                      {data?.tipemployeename ? data?.tipemployeename : "-"}
                                    </h6>
                                    <h6>$ {data?.tip ? data?.tip : 0}</h6>
                                    <h6 className="">
                                      <p className="mb-0"></p>
                                      <div className="action-icons">
                                        {/* <InlineSVG src={editV2_icon} className="sitback-icon" /> */}
                                        <InlineSVG
                                          src={DeleteV2_icon}
                                          className="sitback-icon"
                                          onClick={() => DeleteTip(current_obj)}
                                          style={{ color: "#E53935" }}
                                        />
                                      </div>
                                    </h6>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="checkbox-wrapper-div">
                                  <FormGroup
                                    controlId="formBasicEmail"
                                    style={{ marginBottom: "0" }}
                                  >
                                    <Controller
                                      key={index}
                                      name={`client_list[${index}].is_checked`}
                                      control={control}
                                      render={({ field }) => (
                                        <Form.Check
                                          key={index}
                                          name="addtip"
                                          // label={day.label}

                                          type="checkbox"
                                          id={`inline-checkbox-${index}`}
                                          className="checkbox-wrapper-div"
                                          style={{ margin: "0" }}
                                          checked={field.value}
                                          // value={day.value}
                                          {...field}
                                          onChange={(e) => {
                                            field.onChange(e);
                                            if (e.target.checked == false) {
                                              clearErrors(`client_list[${index}].ammount`);
                                              setValue(`client_list[${index}].ammount`, 0);
                                            }
                                          }}
                                        />
                                      )}
                                    />
                                  </FormGroup>
                                  <label htmlFor={`addtip`}>
                                    <p>Add Tip</p>
                                  </label>
                                </div>
                                {current_obj?.is_checked ? (
                                  <div className="add-trip-modal-input-wrapper">
                                    <FormGroup controlId="formBasicEmail">
                                      {/* <Label>{t("selectemployee")}</Label> */}
                                      <Controller
                                        name={`client_list[${index}].employee_id`}
                                        control={control}
                                        render={({ field }) => (
                                          <ReactSelect
                                            className="sitback-select2-container input-with-icon"
                                            classNamePrefix="sitback-select-option"
                                            placeholder="Select Employee"
                                            //{...register("service")}
                                            // {...register(`client_list[${index}].employee_id`)}
                                            {...field}
                                            options={serviceData}
                                            closeMenuOnSelect={true}
                                            hideSelectedOptions={false}
                                            components={{
                                              SingleValue: IconSingleValue,
                                              Option: IconOption,
                                            }}
                                            isSearchable={false}
                                            onChange={(selected) => {
                                              // handleChange(selected);
                                              // setOptionSelected(selected);
                                              field.onChange(selected.value); // Update state when a new option is selected
                                            }}
                                            allowSelectAll={true}
                                            value={
                                              serviceData.find(
                                                (option) => option.value === field.value
                                              ) || null
                                            }
                                            menuPortalTarget={document.body} // Ensure this is a valid DOM element
                                            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                                          // value={optionSelected || defaultSelectedOption}
                                          />
                                        )}
                                      />
                                      <p
                                        className="text-danger text-start"
                                        style={{ fontSize: "12px" }}
                                      >
                                        {errors?.client_list
                                          ? errors?.client_list[index]?.employee_id?.message
                                          : ""}
                                      </p>
                                    </FormGroup>
                                    <FormGroup controlId="formBasicEmail">
                                      {/* <Label>{t("price")}</Label> */}
                                      <div className="sitback-tip-payment-amount">
                                        <Controller
                                          name={`client_list[${index}].ammount`}
                                          control={control}
                                          render={({ field }) => (
                                            <Input
                                              type="number"
                                              // name={`client_list[${index}].ammount`}
                                              // placeholder="$"
                                              {...field}
                                              placeholder="Enter Tip Amount"
                                              // defaultValue={current_obj?.ammount || 0}
                                              // onChange={(e) => handleChangePrice(e)}
                                              value={field?.value || ""}
                                              min="0"
                                              onChange={(e) => {
                                                field.onChange(e);
                                                // if (e?.value > 0) {
                                                //   clearErrors(`service_list[${index}].minute`);
                                                // }
                                              }}
                                            />
                                          )}
                                        />

                                        <InlineSVG
                                          src={dollar_icon}
                                          className="global_laguage_icon"
                                        //onClick={(e) => handleSearch(e)}
                                        />
                                      </div>
                                      <p className="text-danger text-start">
                                        {errors?.client_list
                                          ? errors?.client_list[index]?.ammount?.message
                                          : ""}
                                      </p>
                                      {/* {priceError ? <small className="text-danger">price is required</small> : ""} */}
                                    </FormGroup>
                                    <div className="mb-2" style={{ width: "150px" }}>
                                      {/* <Button type="submit" className="cash-payment-btn">
                                          Save
                                        </Button> */}
                                      <LoadingButton
                                        type="submit"
                                        className="cash-payment-btn"
                                        disabled={addTipLoader}
                                        label={"Save"}
                                        loadinglabel={"Save"}
                                        isLoading={addTipLoader}
                                      />
                                    </div>
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </>
                            )}
                            {current_obj?.bookingstatus && current_obj?.bookingstatus !== 1 && (
                              <p
                                onClick={() => handleShowProductListModal(data)}
                                className="add-ugrades-text"
                              >
                                <img
                                  src="/images/plus-round-circle-blue.svg"
                                  alt="add"
                                  className="add-upgrades-plus-icon"
                                />
                                Add Upgrades or Products to cart
                              </p>
                            )}
                          </Accordion.Body>
                        </Accordion.Item>
                      );
                    })
                    : null}
                </Accordion>
                <div className="payment-card-selection-wrapper">
                  <div className="payment-card-selection-header">
                    <h6>Saved Credit Cards</h6>
                    <button
                      type="button"
                      className="add-new-card-btn"
                      onClick={() => setShowCardModal(true)}
                    >
                      + Add new card
                    </button>
                  </div>

                  {cardsLoading ? (
                    <p className="payment-card-loading">Loading cards...</p>
                  ) : cardsList.length > 0 ? (
                    <div className="payment-card-list">
                      {cardsList.map((card, index) => {
                        const { brand, last4, cardId, isDefault } = getCardMeta(card);
                        const value = String(cardId || index);
                        const isSelected = String(selectedCardId) === String(cardId);
                        return (
                          <div
                            key={value}
                            className={`payment-card-option${isSelected ? " is-selected" : ""}`}
                            onClick={() => {
                              setSelectedCardId(cardId);
                              setCardError("");
                            }}
                          >
                            <label className="payment-card-option-main">
                              <input
                                type="radio"
                                name="payment-option-card"
                                checked={isSelected}
                                onChange={() => {
                                  setSelectedCardId(cardId);
                                  setCardError("");
                                }}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <span className="payment-card-meta">
                                <span className="payment-card-brand">{brand}</span>
                                <span className="payment-card-number">
                                  **** **** **** {last4}
                                </span>
                              </span>
                            </label>
                            {isDefault && (
                              <span className="payment-card-default-badge">Default</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="payment-card-empty">
                      No credit cards available. Please add a credit card first.
                    </p>
                  )}
                  {cardError && <p className="payment-card-error">{cardError}</p>}
                </div>

                <div className="addcard-footer-wrapper mb-3">
                  <LoadingButton
                    type="button"
                    className="get-payment-btn card-payment-updated-wrapper"
                    id={data?.id}
                    disabled={getPaymentLoader}
                    label={"Card payment"}
                    loadinglabel={"Card payment"}
                    isLoading={getPaymentLoader}
                    onClick={() => CapturePayment(data)}
                  />
                  <Button
                    type="button"
                    className="cash-payment-btn cash-payment-updated-wrapper"
                    onClick={() => handleCashPayment(true)}
                  >
                    Cash payment
                  </Button>
                </div>
                <div className="sitback-payment-history-tip">
                  <div className="sitback-tip">
                    <p>Tip amount:</p>
                    <p>${tipPrice ? tipPrice : 0}</p>
                  </div>
                  <div className="sitback-tip">
                    <p>Services amount:</p>
                    <p>${data?.userTotalAmount}</p>
                  </div>
                  <div className="sitback-tip">
                    <p>Product purchase amount:</p>
                    <p>${productTotalAmount}</p>
                  </div>
                  <div className="sitback-tip">
                    <p className="total-text">Total amount:</p>
                    <p className="total-amout-text">${total}</p>
                  </div>
                </div>

              </div>
            </Form>

            {/* <div className="addcard-footer-wrapper mb-3">
              <LoadingButton
                className="get-payment-btn"
                id={data?.id}
                disabled={getPaymentLoader}
                label={"Card payment"}
                loadinglabel={"Card payment"}
                isLoading={getPaymentLoader}
                onClick={() => CapturePayment(data)}
              />
              <Button className="cash-payment-btn" onClick={() => handleCashPayment(true)}>
                Cash payment
              </Button>
            </div> */}
          </div>
        </Modal.Body>
      </Modal>
      <CashModal
        show={openCash}
        onHide={() => setOpenCash(false)}
        data={data}
        handlePaymentOptionModel={handlePaymentOptionModel}
        onPaymentSuccess={onPaymentSuccess}
        productTotalAmount={productTotalAmount}
        tipAmount={tipPrice}
      />

      <DeleteModal
        show={showDeleteModal}
        disabled={loading}
        messageBody={<>{t("deleteProductDetail")}</>}
        handleClose={handleCloseProductDeleteModal}
        handleConfirmDelete={handleConfirmDeleteProduct}
      />
      <DeleteModal
        show={showDeleteModalTip}
        disabled={deleteTipLoading}
        messageBody={<>{t("deleteTipDetail")}</>}
        handleClose={handleCloseTipDeleteModal}
        handleConfirmDelete={handleConfirmDeleteTip}
      />
      <ProductListPayment
        show={showProductListModal}
        handleClose={() => setProductListModal(false)}
        data={productListInTarget}
        selectedData={selectedData}
        bookingWiseCardList={bookingWiseCardList}
        onShow={onShow}
      />
      <AddCardModal
        show={showCardModal}
        onHide={() => setShowCardModal(false)}
        selectedClient={selectedClientForCard}
        bookingId={
          selectedData?.id ||
          selectedData?.bookingId ||
          data?.id ||
          data?.bookingId ||
          null
        }
        onSuccess={(details) => {
          const customerId =
            resolveClientId(data) || details?.customerId || selectedClientForCard?.customerId;
          if (customerId) {
            fetchCardDetails(customerId);
          } else if (details?.stripe_card_id) {
            setSelectedCardId(details.stripe_card_id);
            setCardError("");
          }
        }}
      />
    </>
  );
};

export default PaymentOption;
