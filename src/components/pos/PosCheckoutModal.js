"use client";

import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import NewAddClientModal from "@/components/appoiments/modal/NewAddClientModal";
import LoadingButton from "@/components/shared/button/LoadingButton";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import { Input, Label, SitBackModalBodyWrapper } from "@/styles/global/main.style";
import {
  ClientAddBtn,
  ClientSearchInput,
  ClientSearchWrapper,
  SearchDropdown,
  SearchDropdownItem,
} from "@/styles/pages/new-custom-calendar.style";
import {
  CheckoutCardList,
  CheckoutCardOption,
  CheckoutModalBody,
  CheckoutModalFooter,
  CheckoutModalHeader,
  CheckoutSection,
  CheckoutSectionTitle,
  OrderSummaryBox,
  OrderSummaryItem,
  OrderSummarySubtotal,
  OrderSummaryTitle,
  PosCheckoutModalGlobalStyles,
} from "@/styles/pages/pos-product-list.style";
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

const CardForm = ({ onHide, onSuccess, selectedClient }) => {
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
      return toaster("Please select a client before adding a card", TOAST_TYPES.ERROR);
    }

    try {
      const res = await axiosApiCall.post(API_ROUTER?.ADD_MANUAL_NEW_CARD, {
        user_id: userId,
        sourceId: cardToken,
        stripe_token: cardToken,
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

const AddCardModal = ({ show, onHide, onSuccess, selectedClient }) => (
  <Modal
    show={show}
    onHide={onHide}
    centered
    className="sitback-modal-wrapper sitbackmodalwrapper sitback-updated-profile-service-modal white-bg-modal"
  >
    <Modal.Header closeButton className="red-close-icon" onClick={onHide} />
    <Modal.Body className="stripe-card">
      <SitBackModalBodyWrapper>
        <h3 className="modal-title-text">Add Credit Card</h3>
        <Elements stripe={stripePromise}>
          <CardForm onHide={onHide} onSuccess={onSuccess} selectedClient={selectedClient} />
        </Elements>
      </SitBackModalBodyWrapper>
    </Modal.Body>
  </Modal>
);

const PosCheckoutModal = ({
  show,
  onHide = () => {},
  cartItems = [],
  cartSubtotal = 0,
  onSuccess = () => {},
}) => {
  const [clientSearch, setClientSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [clients, setClients] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [cardsList, setCardsList] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [clientError, setClientError] = useState("");
  const [cardError, setCardError] = useState("");
  const [paying, setPaying] = useState(false);
  const { toaster } = useToaster();

  const resetState = () => {
    setClientSearch("");
    setSelectedClient(null);
    setShowDropdown(false);
    setCardsList([]);
    setSelectedCardId(null);
    setClientError("");
    setCardError("");
    setPaying(false);
  };

  const handleClose = () => {
    resetState();
    onHide();
  };

  const fetchClients = async (newClientData = null) => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.POST_ADD_CLIENT);
      if (!res?.status) return;

      const clientList = res?.data?.data || [];
      setClients(clientList);

      if (newClientData) {
        const cleanPhone = (p) => (p ? String(p).replace(/\D/g, "") : "");
        const targetEmail = newClientData.email?.toLowerCase();
        const targetPhone = cleanPhone(newClientData.phone);
        const matched = clientList.find(
          (c) =>
            (c.email && c.email.toLowerCase() === targetEmail) ||
            (c.phone && cleanPhone(c.phone) === targetPhone)
        );
        if (matched) {
          setClientSearch(matched.username || "");
          setSelectedClient(matched);
          setClientError("");
        }
      }
    } catch (error) {
      console.error("Error fetching client list", error);
    }
  };

  const fetchCardDetails = async (customerId) => {
    if (!customerId) {
      setCardsList([]);
      setSelectedCardId(null);
      return;
    }

    try {
      const res = await axiosApiCall.get(
        `${API_ROUTER?.GET_CUSTOMER_CARD_DETAILS}?customerId=${customerId}`
      );
      if (!res?.status) {
        setCardsList([]);
        setSelectedCardId(null);
        return;
      }

      const data = res?.data?.data;
      const cards = Array.isArray(data) ? data : data ? [data] : [];
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
    }
  };

  useEffect(() => {
    if (show) {
      fetchClients();
    }
  }, [show]);

  useEffect(() => {
    if (selectedClient?.customerId) {
      fetchCardDetails(selectedClient.customerId);
    } else {
      setCardsList([]);
      setSelectedCardId(null);
    }
  }, [selectedClient]);

  useEffect(() => {
    if (selectedCardId) {
      setCardError("");
    }
  }, [selectedCardId]);

  const filteredClients = clients.filter((client) => {
    const query = clientSearch.toLowerCase();
    const nameMatch = client.username?.toLowerCase().includes(query);
    const phoneMatch = client.phone?.includes(query);
    return nameMatch || phoneMatch;
  });

  const handleSelectClient = (client) => {
    setClientSearch(client.username || "");
    setSelectedClient(client);
    setClientError("");
    setShowDropdown(false);
  };

  const handlePayNow = async () => {
    if (!selectedClient) {
      setClientError("Please select a client from the list");
      return;
    }
    if (!selectedCardId) {
      setCardError("Please select or add a credit card");
      return;
    }

    try {
      setPaying(true);
      setCardError("");

      const orderParam = {
        name: selectedClient?.username?.trim() || selectedClient?.name || "",
        email: selectedClient?.email || "",
        phone: selectedClient?.phone || "",
        user_id: selectedClient?.id || selectedClient?.userId || selectedClient?.user_id,
        countrycode: selectedClient?.countrycode || "1",
        totalamount: cartSubtotal,
        cartItems,
        payment_card_id: selectedCardId,
      };

      const addOrderDetails = await axiosApiCall.post(
        API_ROUTER?.POS_ADD_ORDER_DETAILS,
        orderParam
      );

      if (!addOrderDetails?.status) {
        setPaying(false);
        return toaster(addOrderDetails?.message, TOAST_TYPES.ERROR);
      } else {
          toaster(addOrderDetails?.data?.message, TOAST_TYPES.SUCCESS);
          setPaying(false);
          handleClose();
          onSuccess();
      }

      // const invoiceData = {
      //   order_id: addOrderDetails?.data?.data?.id,
      //   totalamount: cartSubtotal,
      //   name: selectedClient?.username?.trim() || selectedClient?.name || "",
      //   customerId: selectedClient?.customerId,
      //   payment_card_id: selectedCardId,
      // };

      // const payInvoice = await axiosApiCall({
      //   method: "post",
      //   url: API_ROUTER?.POS_PAY_INVOICE,
      //   baseURL: process.env.API_URL_V3,
      //   data: invoiceData,
      // });

      // if (!payInvoice?.status) {
      //   setPaying(false);
      //   return toast.error(payInvoice?.message || "Payment failed", { autoClose: 2000 });
      // }

      // toast.success("Payment successfully.", { autoClose: 2000 });
      // setPaying(false);
      // handleClose();
      // onSuccess();
    } catch (error) {
      setPaying(false);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  return (
    <>
      <PosCheckoutModalGlobalStyles />
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="sitback-modal-wrapper sitback-pos-checkout-modal"
      >
        <CheckoutModalHeader>
          <h3>Complete Sale</h3>
          <button type="button" className="checkout-close-btn" onClick={handleClose} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 1L1 13M1 1L13 13" stroke="#E86D4D" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </CheckoutModalHeader>

        <Modal.Body>
          <CheckoutModalBody>
            <CheckoutSection>
              <div className="checkout-field-wrap" style={{ position: "relative" }}>
                <ClientSearchWrapper className="checkout-client-search">
                  <ClientSearchInput
                    type="text"
                    placeholder="Search or create client"
                    value={clientSearch}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => {
                      setTimeout(() => setShowDropdown(false), 200);
                    }}
                    onChange={(e) => {
                      setClientSearch(e.target.value);
                      setSelectedClient(null);
                      setClientError("");
                      setShowDropdown(true);
                    }}
                  />
                  <ClientAddBtn
                    type="button"
                    aria-label="Add client"
                    onClick={() => setShowAddClientModal(true)}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 1V11M1 6H11" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </ClientAddBtn>
                </ClientSearchWrapper>

                {showDropdown && clientSearch && (
                  <SearchDropdown className="sitback-pos-client-dropdown">
                    {filteredClients.length > 0 ? (
                      filteredClients.map((client) => (
                        <SearchDropdownItem
                          key={client.userId || client.id}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => handleSelectClient(client)}
                        >
                          <div className="client-name">{client.username}</div>
                          {client.phone && (
                            <div className="client-info">
                              ({client.countrycode || "+1"}) {client.phone}
                            </div>
                          )}
                        </SearchDropdownItem>
                      ))
                    ) : (
                      <SearchDropdownItem
                        className="create-client-option"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          setShowDropdown(false);
                          setShowAddClientModal(true);
                        }}
                      >
                        <div className="client-name">
                          Create new client &ldquo;{clientSearch.trim()}&rdquo;
                        </div>
                        <div className="client-info">No client found with this name</div>
                      </SearchDropdownItem>
                    )}
                  </SearchDropdown>
                )}
              </div>
              {clientError && <p className="checkout-error-text">{clientError}</p>}

              {selectedClient && (
                <div className="selected-client-chip">
                  <strong>{selectedClient.username || selectedClient.name}</strong>
                  <span>
                    ({selectedClient.countrycode || "+1"}) {selectedClient.phone || "N/A"}
                  </span>
                </div>
              )}
            </CheckoutSection>

            <CheckoutSection>
              <div className="payment-section-header">
                <CheckoutSectionTitle style={{ marginBottom: 0 }}>
                  Saved Credit Cards
                </CheckoutSectionTitle>
                {selectedClient && (
                  <button
                    type="button"
                    className="add-new-card-btn"
                    onClick={() => setShowCardModal(true)}
                  >
                    + Add new card
                  </button>
                )}
              </div>
              {selectedClient ? (
                <>
                  <CheckoutCardList>
                    {cardsList.length > 0 ? (
                      cardsList.map((card, index) => {
                        const { brand, last4, cardId, isDefault } = getCardMeta(card);
                        const value = String(cardId || index);
                        const isSelected = String(selectedCardId) === String(cardId);
                        return (
                          <CheckoutCardOption
                            key={value}
                            $active={isSelected}
                            onClick={() => {
                              setSelectedCardId(cardId);
                              setCardError("");
                            }}
                          >
                            <label>
                              <input
                                type="radio"
                                name="pos-checkout-card"
                                checked={isSelected}
                                onChange={() => {
                                  setSelectedCardId(cardId);
                                  setCardError("");
                                }}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <span className="card-meta">
                                <strong>{brand}</strong>
                                <span>**** **** **** {last4}</span>
                              </span>
                            </label>
                            {isDefault && <span className="default-badge">Default</span>}
                          </CheckoutCardOption>
                        );
                      })
                    ) : (
                      <p className="checkout-empty-cards">
                        No cards found for this client. Please add a new card.
                      </p>
                    )}
                  </CheckoutCardList>
                  {cardError && <p className="checkout-error-text">{cardError}</p>}
                </>
              ) : (
                <p className="checkout-empty-cards">Select a client to view saved cards.</p>
              )}
            </CheckoutSection>

            <CheckoutSection>
              <OrderSummaryBox>
                <OrderSummaryTitle>Order Summary</OrderSummaryTitle>
                {cartItems.map((item) => (
                  <OrderSummaryItem key={item.id}>
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <strong>
                      ${(Number(item.price || 0) * Number(item.quantity || 0)).toFixed(2)}
                    </strong>
                  </OrderSummaryItem>
                ))}
                <OrderSummarySubtotal>
                  <span>Subtotal</span>
                  <strong>${Number(cartSubtotal || 0).toFixed(2)}</strong>
                </OrderSummarySubtotal>
              </OrderSummaryBox>
            </CheckoutSection>
          </CheckoutModalBody>
        </Modal.Body>

        <CheckoutModalFooter>
          <LoadingButton
            type="button"
            className="checkout-pay-btn"
            disabled={paying}
            isLoading={paying}
            label={`Pay Now ($${Number(cartSubtotal || 0).toFixed(2)})`}
            loadinglabel="Processing..."
            onClick={handlePayNow}
          />
        </CheckoutModalFooter>
      </Modal>

      <NewAddClientModal
        show={showAddClientModal}
        onHide={() => setShowAddClientModal(false)}
        onSuccess={(newClient) => fetchClients(newClient)}
        initialName={!selectedClient ? clientSearch : ""}
      />

      <AddCardModal
        show={showCardModal}
        onHide={() => setShowCardModal(false)}
        selectedClient={selectedClient}
        onSuccess={(details) => {
          const cid = selectedClient?.customerId || details?.customerId;
          if (details?.customerId && !selectedClient?.customerId) {
            setSelectedClient((prev) => ({ ...prev, customerId: details.customerId }));
          }
          setCardError("");
          if (cid) {
            fetchCardDetails(cid);
          }
        }}
      />
    </>
  );
};

export default PosCheckoutModal;
