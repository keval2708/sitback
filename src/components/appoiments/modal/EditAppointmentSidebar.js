import { CardCvcElement, CardExpiryElement, CardNumberElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import moment from "moment";
import React, { forwardRef, useEffect, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
import ReactSelect, { components } from "react-select";
import * as yup from "yup";
import NewAddClientModal from "./NewAddClientModal";
import LoadingButton from "@/components/shared/button/LoadingButton";

const getSlotDisplayRange = (timeStr, durationMinutes) => {
  if (!timeStr) return "";
  const start = moment(timeStr, "hh:mm A");
  const end = moment(start).add(durationMinutes || 50, "minutes");
  return `${start.format("hh:mma")} - ${end.format("hh:mma")}`;
};

const { SingleValue, Option } = components;

import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import {
  Input,
  Label,
  SitBackModalBodyWrapper,
} from "@/styles/global/main.style";
import {
  AddCreditCardBtn,
  BookAppointmentBtn,
  ClientAddBtn,
  ClientSearchInput,
  ClientSearchWrapper,
  ErrorText,
  NotesTextarea,
  ReviewAvatar,
  ReviewCard,
  ReviewCardDeleteBtn,
  ReviewHeader,
  ReviewLabel,
  ReviewRow,
  ReviewSubtitle,
  ReviewTitle,
  ReviewValue,
  SearchDropdown,
  SearchDropdownItem,
  ServiceReviewCard,
  ServiceReviewHeader,
  ServiceReviewSubText,
  ServiceReviewTimeText,
  ServiceReviewTitle,
  SidebarCancelBtn,
  SidebarContainer,
  SidebarDatePickerCell,
  SidebarDateTimeButton,
  SidebarDateTimeRow,
  SidebarDivider,
  SidebarField,
  SidebarFooter,
  SidebarForm,
  SidebarHeader,
  SidebarTimePickerCell,
  SidebarTitle,
  SidebarTitleRow,
  SkeletonChip,
  SlotChipButton,
} from "@/styles/pages/new-custom-calendar.style";
import axiosApiCall from "@/utils/axios";
import { CARD_CVC_OPTIONS, CARD_ELEMENT_OPTIONS, TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const TIME_FORMAT = "h:mm A";

const combineDateAndTime = (date, time) =>
  moment(date)
    .hour(time.hour())
    .minute(time.minute())
    .second(0)
    .milliseconds(0)
    .toDate();

const SidebarDatePickerInput = forwardRef(({ selectedDate, onClick, disabled }, ref) => (
  <SidebarDateTimeButton
    type="button"
    onClick={disabled ? undefined : onClick}
    ref={ref}
    disabled={disabled}
    style={disabled ? { cursor: "not-allowed" } : {}}
  >
    On {moment(selectedDate).format("ddd, MMM D")}
  </SidebarDateTimeButton>
));

SidebarDatePickerInput.displayName = "SidebarDatePickerInput";

const stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY);

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

  const handlechangeCardname = (event) => {
    setAccHolderNameError(null);
    setUsername(event.target.value);
    if (!event.target.value) {
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
    if (!username) {
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

  const handleFormSubmit = async (event) => {
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
    setStripeError(null);

    const { error, token } = await stripe.createToken(elements.getElement(CardNumberElement), {
      currency: "usd",
      name: username,
    });

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
      return;
    }

    const cardToken = token?.id;
    const customerId = selectedClient?.customerId;
    const userId = selectedClient?.user_id || selectedClient?.userId || selectedClient?.id;

    if (!userId && !customerId) {
      setIsPaymentProgress(false);
      return toaster("Please select a client before adding a card", TOAST_TYPES.ERROR);
    }

    try {
      const param = {
        user_id: userId,
        sourceId: cardToken,
        stripe_token: cardToken,
      };
      const res = await axiosApiCall.post(API_ROUTER?.ADD_MANUAL_NEW_CARD, param);
      if (!res?.status) {
        setIsPaymentProgress(false);
        return toaster(res?.message || "Failed to add card to customer", TOAST_TYPES.ERROR);
      }

      setIsPaymentProgress(false);
      onSuccess({
        brand: token?.card?.brand || "Visa",
        last4: token?.card?.last4 || "4242",
        stripe_card_id: res?.data?.data?.paymentMethodId || res?.data?.data?.default_source || null,
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
      <div>
        <Label className="cardtitle">{t('cardHolderName')}</Label>
        <Input
          name="accHolderName"
          id="accHolderName"
          placeholder={t('nameOnCard')}
          required
          value={username}
          onChange={handlechangeCardname}
        />
        {accHolderNameError && <p className="text-danger">{accHolderNameError}</p>}
      </div>

      <Row className="payment-input-wrapper">
        <Col md={12} className="card_number">
          <Label>{t('cardNumber')}</Label>
          <CardNumberElement
            className="card_number_input"
            onChange={handlechangeCardnumber}
            options={CARD_ELEMENT_OPTIONS}
          />
          {cardNumberError && <p className="text-danger">{cardNumberError}</p>}
        </Col>

        <Col md={12} className="card_number">
          <Label>{t('cardExpire')}</Label>
          <CardExpiryElement
            className="card_number_input"
            onChange={handlechangeCardexpiry}
            options={CARD_ELEMENT_OPTIONS}
          />
          {expiryError && <p className="text-danger">{expiryError}</p>}
        </Col>

        <Col md={12} className="card_number">
          <Label>{t('cardCvvNumber')}</Label>
          <CardCvcElement
            options={CARD_CVC_OPTIONS}
            className="card_number_input"
            onChange={handlechangeCardcsv}
          />
          {cvcError && <p className="text-danger">{cvcError}</p>}
        </Col>
      </Row>

      {stripeError && <p className="text-danger" style={{ display: 'block', marginLeft: '25px', fontSize: '12px' }}>{stripeError}</p>}

      <LoadingButton
        type="submit"
        disabled={isPaymentProgress}
        label={"Add card"}
        loadinglabel={"Add card"}
        isLoading={isPaymentProgress}
        className="loading-btn-wrapper sitback-add-card-btn"
      />
    </Form>
  );
};

const AddCardModal = ({ show, onHide, onSuccess, selectedClient }) => {
  const { t } = useTranslation();
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className="sitback-modal-wrapper sitbackmodalwrapper sitback-updated-profile-service-modal white-bg-modal"
    >
      <Modal.Header closeButton className="red-close-icon"></Modal.Header>
      <Modal.Body className="stripe-card">
        <SitBackModalBodyWrapper className="p-0">
          <h3 className="modal-title-text" style={{ marginTop: '-30px' }}>{t("cardModal")}</h3>
          <Elements stripe={stripePromise}>
            <CardForm onHide={onHide} onSuccess={onSuccess} selectedClient={selectedClient} />
          </Elements>
        </SitBackModalBodyWrapper>
      </Modal.Body>
    </Modal>
  );
};

const EditAppointmentSidebar = ({
  bookedAppointment,
  onClose,
  setIsEditing,
  fromDragDrop = false,
  selectedService,
  onServiceChange,
  onSlotChange,
  serviceOptions,
  scheduleSummary,
  selectedProvider,
  setSelectedId,
  onSuccess,
}) => {
  const { toaster } = useToaster();
  const [step, setStep] = useState(1);
  const [clientSearch, setClientSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [note, setNote] = useState("");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(moment());

  const [clients, setClients] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [cardDetails, setCardDetails] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [cardsList, setCardsList] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [cardsLoading, setCardsLoading] = useState(false);

  const [selectedTipPercentage, setSelectedTipPercentage] = useState(20);
  const [customTipAmount, setCustomTipAmount] = useState("");
  const [customChargeAmount, setCustomChargeAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [employeeSlots, setEmployeeSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [isFormHydrated, setIsFormHydrated] = useState(false);

  useEffect(() => {
    if (bookedAppointment) {
      if (bookedAppointment.client) {
        const clientObj = {
          ...bookedAppointment.client,
          id: bookedAppointment.client.clientId || bookedAppointment.client.id || bookedAppointment.client.userId,
          username: bookedAppointment.client.clientName || bookedAppointment.client.name || bookedAppointment.client.username,
        };
        setSelectedClient(clientObj);
        setClientSearch(clientObj.username || "");
      }
      if (bookedAppointment.service || bookedAppointment.servicelist_id || bookedAppointment.serviceListId) {
        const sId = String(
          bookedAppointment.servicelist_id ||
          bookedAppointment.serviceListId ||
          bookedAppointment.service?.serviceListId ||
          bookedAppointment.service?.serviceslistId ||
          bookedAppointment.service?.serviceslist_id ||
          bookedAppointment.service?.servicelist_id ||
          bookedAppointment.service_id ||
          bookedAppointment.service?.id ||
          bookedAppointment.service?.serviceId ||
          ""
        );
        if (sId && onServiceChange && String(selectedService) !== sId) {
          onServiceChange(sId);
        }
      }
      if (bookedAppointment.employee) {
        const empId = bookedAppointment.employee.employeeId || bookedAppointment.employee.id || bookedAppointment.employee.userId || bookedAppointment.employee_id || bookedAppointment.employeeId;
        const fullName = bookedAppointment.employee.employeeName ||
          bookedAppointment.employee.username ||
          (bookedAppointment.employee.firstName || bookedAppointment.employee.lastName
            ? `${bookedAppointment.employee.firstName} ${bookedAppointment.employee.lastName}`.trim()
            : bookedAppointment.employee.name || "Employee");
        setSelectedEmployee((prev) => {
          if (prev && String(prev.value) === String(empId)) return prev;
          return {
            value: String(empId),
            label: fullName,
            image: bookedAppointment.employee.profile_image || bookedAppointment.employee.image || bookedAppointment.employee.thumb_image || null,
            raw: bookedAppointment.employee
          };
        });
      }
      if (bookedAppointment.date || bookedAppointment.orderDate) {
        setSelectedDate(moment(bookedAppointment.date || bookedAppointment.orderDate, "YYYY-MM-DD").toDate());
      }
      if (bookedAppointment.start_time) {
        setSelectedTime(moment(bookedAppointment.start_time, ["hh:mm A", "hh:mm:ss a", "hh:mm:ss A", "hh:mm a"]));
      }
      if (bookedAppointment.notes || bookedAppointment.note) {
        setNote(bookedAppointment.notes || bookedAppointment.note || "");
      }
      setIsFormHydrated(true);
    }
  }, [bookedAppointment]);

  // Ensure service is selected once options have loaded (matches serviceListId / name from API)
  useEffect(() => {
    if (!bookedAppointment || !Array.isArray(serviceOptions) || serviceOptions.length === 0) return;

    const hasSelected = serviceOptions.some(
      (opt) => opt.value && String(opt.value) === String(selectedService)
    );
    if (hasSelected) return;

    const listId = String(
      bookedAppointment.servicelist_id ||
      bookedAppointment.serviceListId ||
      bookedAppointment.service?.serviceListId ||
      bookedAppointment.service?.serviceslistId ||
      bookedAppointment.service?.serviceslist_id ||
      bookedAppointment.service?.servicelist_id ||
      bookedAppointment.service?.id ||
      bookedAppointment.service?.serviceId ||
      ""
    );
    const serviceName = (
      bookedAppointment.service?.serviceName ||
      bookedAppointment.service?.name ||
      bookedAppointment.servicename ||
      ""
    ).toLowerCase();

    const byId = listId
      ? serviceOptions.find((opt) => String(opt.value) === listId)
      : null;
    if (byId) {
      onServiceChange?.(byId.value);
      return;
    }

    if (serviceName) {
      const byName = serviceOptions.find(
        (opt) => String(opt.label || "").toLowerCase() === serviceName
      );
      if (byName) {
        onServiceChange?.(byName.value);
      }
    }
  }, [serviceOptions, bookedAppointment, selectedService, onServiceChange]);

  const fetchCardDetails = async (customerId) => {
    if (!customerId) return;
    setCardsLoading(true);
    try {
      const res = await axiosApiCall.get(
        `${API_ROUTER?.GET_CUSTOMER_CARD_DETAILS}?customerId=${customerId}`
      );
      if (res?.status) {
        const data = res?.data?.data;
        let cards = [];
        if (Array.isArray(data)) {
          cards = data;
        } else if (data) {
          cards = [data];
        }
        setCardsList(cards);

        if (cards.length > 0) {
          const defaultCard = cards.find(c => c?.isDefault == true || c?.isDefault === "true" || c?.status == 1 || c?.get_card_detail?.status == 1) || cards[0];
          const defaultCardId = defaultCard?.paymentMethodId || defaultCard?.id || defaultCard?.get_card_detail?.id || null;
          setSelectedCardId(defaultCardId);

          const brand = defaultCard?.brand || defaultCard?.get_card_detail?.brand || defaultCard?.get_card_detail?.name || "Visa";
          const last4 = defaultCard?.last4 || defaultCard?.get_card_detail?.last4 || "";
          setCardDetails({ brand, last4, customerId });
        } else {
          setSelectedCardId(null);
          setCardDetails(null);
        }
      } else {
        setCardsList([]);
        setSelectedCardId(null);
        setCardDetails(null);
      }
    } catch (error) {
      console.error("Error fetching card details:", error);
      setCardsList([]);
      setSelectedCardId(null);
      setCardDetails(null);
    } finally {
      setCardsLoading(false);
    }
  };

  const handleCardRadioChange = (cardId) => {
    setSelectedCardId(cardId);
    const selectedCard = cardsList.find(c => (c?.paymentMethodId || c?.id || c?.get_card_detail?.id) === cardId);
    if (selectedCard) {
      const brand = selectedCard?.brand || selectedCard?.get_card_detail?.brand || selectedCard?.get_card_detail?.name || "Visa";
      const last4 = selectedCard?.last4 || selectedCard?.get_card_detail?.last4 || "";
      setCardDetails({ brand, last4, customerId: selectedClient?.customerId });
    }
  };

  useEffect(() => {
    if (selectedClient?.customerId) {
      fetchCardDetails(selectedClient.customerId);
    } else {
      setCardDetails(null);
      setCardsList([]);
      setSelectedCardId(null);
    }
  }, [selectedClient]);

  useEffect(() => {
    setSelectedTipPercentage(20);
    setCustomTipAmount("");
    setCustomChargeAmount("");
    setPaymentMethod("credit_card");
  }, [selectedService]);

  useEffect(() => {
    if (selectedService) {
      setEmployeeSlots([]);
      const fetchEmployees = async () => {
        try {
          const res = await axiosApiCall.get(`${API_ROUTER?.ACTIVE_EMPLOYEE_LIST}?serviceId=${selectedService}`);

          if (res?.status) {
            const list = res?.data?.data || [];
            setEmployees(list);

            if (bookedAppointment && bookedAppointment.employee) {
              const empId = bookedAppointment.employee.employeeId || bookedAppointment.employee.id || bookedAppointment.employee.userId || bookedAppointment.employee_id || bookedAppointment.employeeId;
              const fullName = bookedAppointment.employee.employeeName ||
                bookedAppointment.employee.username ||
                (bookedAppointment.employee.firstName || bookedAppointment.employee.lastName
                  ? `${bookedAppointment.employee.firstName} ${bookedAppointment.employee.lastName}`.trim()
                  : bookedAppointment.employee.name || "Employee");
              setSelectedEmployee((prev) => {
                if (prev && String(prev.value) === String(empId)) return prev;
                return {
                  value: String(empId),
                  label: fullName,
                  image: bookedAppointment.employee.profile_image || bookedAppointment.employee.image || bookedAppointment.employee.thumb_image || null,
                  raw: bookedAppointment.employee
                };
              });
              setSelectedId?.(Number(empId));
            } else if (list.length > 0) {
              const firstEmp = list[0];
              const firstName = firstEmp.firstName || firstEmp.first_name || "";
              const lastName = firstEmp.lastName || firstEmp.last_name || "";
              const fullName = firstEmp.username || (firstName || lastName ? `${firstName} ${lastName}`.trim() : firstEmp.name || "Employee");
              const empId = firstEmp.id || firstEmp.userId || firstEmp._id;
              setSelectedEmployee((prev) => {
                if (prev && String(prev.value) === String(empId)) return prev;
                return {
                  value: String(empId),
                  label: fullName,
                  image: firstEmp.image || firstEmp.profile_image || null,
                  raw: firstEmp
                };
              });
              setSelectedId?.(Number(empId));
            } else {
              setSelectedEmployee(null);
              setSelectedId?.(0);
            }
          }
        } catch (error) {
          console.error("Error fetching active employee list", error);
        }
      };
      fetchEmployees();
    } else {
      setEmployees([]);
      setSelectedEmployee(null);
    }
  }, [selectedService]);

  const selectedDateKey = selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : "";
  const selectedEmployeeId = selectedEmployee?.value ? String(selectedEmployee.value) : "";

  useEffect(() => {
    if (!isFormHydrated || !selectedEmployeeId || !selectedDateKey || !selectedService) {
      if (!isFormHydrated) return undefined;
      setEmployeeSlots([]);
      setSlotsLoading(false);
      return undefined;
    }

    let cancelled = false;

    const fetchSlots = async () => {
      setSlotsLoading(true);
      try {
        const timeStr =
          selectedTime && moment(selectedTime).isValid()
            ? moment(selectedTime).format("HH:mm:ss")
            : bookedAppointment?.start_time
              ? moment(bookedAppointment.start_time, ["hh:mm A", "hh:mm:ss a", "hh:mm:ss A", "hh:mm a"]).format("HH:mm:ss")
              : null;

        const res = await axiosApiCall.get(
          `/calender/get-employee-slotes?employeeId=${selectedEmployeeId}&date=${selectedDateKey}&time=${timeStr}&serviceId=${selectedService}`
        );
        if (cancelled) return;

        if (res?.status) {
          let fetchedSlots = res?.data?.data || [];

          if (bookedAppointment && bookedAppointment.start_time) {
            const currentSlotFormatted = moment(bookedAppointment.start_time, ["hh:mm A", "hh:mm:ss a", "hh:mm:ss A", "hh:mm a"]).format("hh:mm A");
            const alreadyExists = fetchedSlots.some((s) => {
              const sStr = typeof s === "string" ? s : s.time;
              return sStr && moment(sStr, ["hh:mm A", "hh:mm:ss a", "hh:mm:ss A", "hh:mm a"]).format("hh:mm A") === currentSlotFormatted;
            });
            if (!alreadyExists) {
              if (fetchedSlots.length > 0 && typeof fetchedSlots[0] !== "string") {
                fetchedSlots = [{ time: currentSlotFormatted }, ...fetchedSlots];
              } else {
                fetchedSlots = [currentSlotFormatted, ...fetchedSlots];
              }
            }
          }

          setEmployeeSlots(fetchedSlots);
          if (fetchedSlots.length > 0) {
            const hasCurrentSlot = selectedTime && fetchedSlots.some((s) => {
              const sStr = typeof s === "string" ? s : s.time;
              return sStr && moment(selectedTime).format("HH:mm") === moment(sStr, ["hh:mm A", "hh:mm:ss a", "hh:mm:ss A", "hh:mm a"]).format("HH:mm");
            });

            if (!hasCurrentSlot) {
              const initialTimeStr = bookedAppointment?.start_time;
              const parsedInitial = initialTimeStr ? moment(initialTimeStr, ["hh:mm A", "hh:mm:ss a", "hh:mm:ss A", "hh:mm a"]) : null;
              const isInitialSelected = selectedTime && parsedInitial && moment(selectedTime).format("HH:mm") === moment(parsedInitial).format("HH:mm");

              if (!isInitialSelected) {
                const firstSlot = fetchedSlots[0];
                const firstSlotTimeStr = typeof firstSlot === "string" ? firstSlot : firstSlot.time;
                if (firstSlotTimeStr) {
                  const parsed = moment(firstSlotTimeStr, ["hh:mm A", "hh:mm:ss a", "hh:mm:ss A", "hh:mm a"]);
                  setSelectedTime(parsed);
                  const nextStart = combineDateAndTime(selectedDate, parsed);
                  onSlotChange?.(nextStart);
                }
              }
            }
          } else {
            setSelectedTime(null);
          }
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Error fetching employee slots", error);
        }
      } finally {
        if (!cancelled) {
          setSlotsLoading(false);
        }
      }
    };

    fetchSlots();

    return () => {
      cancelled = true;
    };
  }, [isFormHydrated, selectedEmployeeId, selectedDateKey, selectedService]);

  const isTimeAllowed = (hour, minute, date) => {
    const targetMoment = moment(date).hour(hour).minute(minute).second(0).milliseconds(0);

    if (targetMoment.isBefore(moment())) {
      return false;
    }

    if (!scheduleSummary || !scheduleSummary.data) {
      const startBound = moment(date).hour(7).minute(0).second(0).milliseconds(0);
      const endBound = moment(date).hour(21).minute(0).second(0).milliseconds(0);
      return targetMoment.isSameOrAfter(startBound) && targetMoment.isSameOrBefore(endBound);
    }

    const dateKey = moment(date).format("YYYY-MM-DD");
    const dayData = scheduleSummary.data[dateKey];

    if (!dayData || dayData.isLeave) {
      return false;
    }

    const dayStart = moment(dateKey + " " + dayData.startTime, "YYYY-MM-DD hh:mm A");
    const dayEnd = moment(dateKey + " " + dayData.endTime, "YYYY-MM-DD hh:mm A");

    if (targetMoment.isBefore(dayStart) || targetMoment.isAfter(dayEnd)) {
      return false;
    }

    const leaveHours = Array.isArray(dayData.leaveHours)
      ? dayData.leaveHours
      : dayData.leaveHours
        ? [dayData.leaveHours]
        : [];

    if (leaveHours.length > 0) {
      for (const leave of leaveHours) {
        if (leave && leave.startTime && leave.endTime) {
          const leaveStart = moment(dateKey + " " + leave.startTime, "YYYY-MM-DD hh:mm A");
          const leaveEnd = moment(dateKey + " " + leave.endTime, "YYYY-MM-DD hh:mm A");
          if (targetMoment.isSameOrAfter(leaveStart) && targetMoment.isBefore(leaveEnd)) {
            return false;
          }
        }
      }
    }

    return true;
  };

  const IconSingleValue = (props) => (
    <SingleValue {...props}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0, maxWidth: "100%", overflow: "hidden" }}>
        {props.data.image ? (
          <img src={props.data.image} style={{ height: "30px", width: "30px", borderRadius: "4px", objectFit: "cover", flexShrink: 0 }} alt="img-tag" />
        ) : (
          <div style={{ height: "30px", width: "30px", borderRadius: "4px", backgroundColor: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "bold", flexShrink: 0 }}>
            {props.data.label ? props.data.label.charAt(0).toUpperCase() : ""}
          </div>
        )}
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>
          {props.data.label} {props?.data?.calculatedTime}
          {props?.data?.price !== undefined && props?.data?.price !== null ? ` - $${props?.data?.price}` : ""}
        </span>
      </div>
    </SingleValue>
  );

  const IconOption = (props) => (
    <Option {...props}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {props.data.image ? (
          <img src={props.data.image} style={{ height: "30px", width: "30px", borderRadius: "4px", objectFit: "cover" }} alt="img-tag" />
        ) : (
          <div style={{ height: "30px", width: "30px", borderRadius: "4px", backgroundColor: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "bold" }}>
            {props.data.label ? props.data.label.charAt(0).toUpperCase() : ""}
          </div>
        )}
        <span>
          {props.data.label} {props?.data?.calculatedTime}
          {props?.data?.price !== undefined && props?.data?.price !== null ? ` - $${props?.data?.price}` : ""}
        </span>
      </div>
    </Option>
  );

  const appointmentSchema = yup.object().shape({
    client: yup.object().nullable().required("Please select a client from the list"),
    service: yup.string().required("Please select a service"),
    employee: yup.object().nullable().required("Please select an employee"),
    date: yup.date().required("Please select a date"),
    time: yup.string().required("Please select a time"),
    note: yup.string().max(100, "Note must be at most 100 characters"),
  });

  const fetchClients = async (newClientData = null) => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.POST_ADD_CLIENT);
      if (res?.status) {
        const clientList = res?.data?.data || [];
        setClients(clientList);
        if (newClientData) {
          const cleanPhone = (p) => p ? String(p).replace(/\D/g, "") : "";
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
            setErrors((prev) => ({ ...prev, client: null }));
          }
        }
      }
    } catch (error) {
      console.error("Error fetching client list", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = clients.filter((client) => {
    const query = clientSearch.toLowerCase();
    const nameMatch = client.username?.toLowerCase().includes(query);
    const phoneMatch = client.phone?.includes(query);
    return nameMatch || phoneMatch;
  });

  const handleSelectClient = (client) => {
    setClientSearch(client.username || "");
    setSelectedClient(client);
    setErrors((prev) => ({ ...prev, client: null }));
    setShowDropdown(false);
  };

  const handleNextClick = async () => {
    const formData = {
      client: selectedClient,
      service: selectedService,
      employee: selectedEmployee,
      date: selectedDate,
      time: selectedTime ? selectedTime.format(TIME_FORMAT) : "",
      note: note,
    };

    try {
      setErrors({});
      await appointmentSchema.validate(formData, { abortEarly: false });
      setStep(2);
    } catch (err) {
      if (err.name === "ValidationError" && err.inner) {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        console.error("Validation failed:", err);
      }
    }
  };

  const handleBookClick = async () => {
    const formData = {
      client: selectedClient,
      service: selectedService,
      employee: selectedEmployee,
      date: selectedDate,
      time: selectedTime ? selectedTime.format(TIME_FORMAT) : "",
      note: note,
    };

    try {
      setErrors({});
      await appointmentSchema.validate(formData, { abortEarly: false });

      setBookingLoading(true);

      const clientName = selectedClient?.username || selectedClient?.name || "";
      const clientEmail = selectedClient?.email || "";
      const phone = selectedClient?.phone || "";
      const countrycode =
        selectedClient?.countrycode ||
        selectedClient?.countryCode ||
        selectedClient?.dialCode ||
        "";

      if (bookedAppointment) {
        const currentService = serviceOptions.find((opt) => String(opt.value) === String(selectedService));
        const durationMins = parseInt(currentService?.duration || 0, 10);
        const endTimeObj = selectedTime ? moment(selectedTime).add(durationMins, "minutes") : null;
        const end_time = endTimeObj ? endTimeObj.format("HH:mm:ss") : "";
        const end_time_type = endTimeObj ? endTimeObj.format("a") : "am";

        const payload = {
          id: bookedAppointment.id || bookedAppointment.bookingId || bookedAppointment.booking_id,
          date: moment(selectedDate).format("YYYY-MM-DD"),
          slot_time: selectedTime ? selectedTime.format("HH:mm:ss") : "",
          end_time: end_time,
          time_type: selectedTime ? selectedTime.format("a") : "am",
          end_time_type: end_time_type,
          notes: note,
          employee_id: selectedEmployee?.value,
        };

        const res = await axiosApiCall.post(
          API_ROUTER?.EDIT_MANUAL_APPOINTMENT,
          payload
        );

        if (res?.status) {
          toaster(res?.message || "Appointment Updated Successfully!", TOAST_TYPES.SUCCESS);
          if (onSuccess) {
            onSuccess();
          }
          onClose();
        } else {
          toaster(res?.message || "Failed to update appointment.", TOAST_TYPES.ERROR);
        }
      }
    } catch (err) {
      if (err.name === "ValidationError" && err.inner) {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        console.error("Booking failed:", err);
        toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      }
    } finally {
      setBookingLoading(false);
    }
  };

  const findFirstValidTime = (date, currentVal) => {
    const currentHour = currentVal.hour();
    const currentMin = currentVal.minute();
    if (isTimeAllowed(currentHour, currentMin, date)) {
      return currentVal;
    }

    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 15) {
        if (isTimeAllowed(h, m, date)) {
          return moment(date).hour(h).minute(m).second(0).milliseconds(0);
        }
      }
    }
    return currentVal;
  };

  const updateSlotDateTime = (date, time) => {
    const nextStart = combineDateAndTime(date, time);
    onSlotChange?.(nextStart);
  };

  const handleDateChange = (date) => {
    if (!date) return;
    setSelectedDate((prevDate) => {
      if (prevDate && moment(prevDate).isSame(date, "day")) {
        return prevDate;
      }
      return date;
    });
    setErrors((prev) => ({ ...prev, date: null }));
    setStep(1);

    if (!selectedEmployee || !selectedService) {
      const validTime = findFirstValidTime(date, selectedTime);
      setSelectedTime(validTime);
      updateSlotDateTime(date, validTime);
    } else {
      if (selectedTime) {
        updateSlotDateTime(date, selectedTime);
      }
    }
  };

  const handleTimeChange = (time) => {
    if (!time) return;
    setSelectedTime(time);
    updateSlotDateTime(selectedDate, time);
    setErrors((prev) => ({ ...prev, time: null }));
    setStep(1);
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 15) {
        if (isTimeAllowed(h, m, selectedDate)) {
          const timeVal = moment(selectedDate).hour(h).minute(m).second(0).milliseconds(0);
          options.push({
            value: timeVal.format(TIME_FORMAT),
            label: timeVal.format(TIME_FORMAT),
          });
        }
      }
    }
    return options;
  };

  const formatDuration = (mins) => {
    if (!mins) return "";
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    if (hours > 0) {
      return `${hours} hr${hours > 1 ? "s" : ""}${remainingMins > 0 ? ` ${remainingMins} min${remainingMins > 1 ? "s" : ""}` : ""}`;
    }
    return `${mins} min${mins > 1 ? "s" : ""}`;
  };

  const clientName = selectedClient?.username || selectedClient?.name || "";
  const getInitials = (fullName) => {
    if (!fullName) return "?";
    const parts = fullName.trim().split(" ");
    if (parts.length > 1) {
      return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }
    return fullName.charAt(0).toUpperCase();
  };
  const initials = getInitials(clientName);
  const clientImage = selectedClient?.profile_image || selectedClient?.image || null;
  const sinceDate = selectedClient?.client_created_at ? moment(selectedClient.client_created_at).format("MMMM YYYY") : "January 2026";

  const currentService = serviceOptions.find((opt) => opt.value === selectedService);

  const providerName = selectedEmployee
    ? selectedEmployee.label
    : selectedProvider
      ? (selectedProvider.username || `${selectedProvider.firstName || ""} ${selectedProvider.lastName || ""}`.trim())
      : "Harriet Love";

  const subtotal = parseFloat(currentService?.price || 0);
  let tipVal = 0;
  if (selectedTipPercentage !== null) {
    tipVal = parseFloat((subtotal * (selectedTipPercentage / 100)).toFixed(2));
  } else {
    tipVal = parseFloat(customTipAmount) || 0;
  }
  const totalVal = parseFloat((subtotal + tipVal).toFixed(2));
  const chargeAmount = totalVal;

  return (
    <SidebarContainer>
      {step === 3 ? (
        <SidebarHeader style={{ borderBottom: "1px solid #E2E8F0", paddingBottom: "16px" }}>
          <button
            type="button"
            onClick={() => setStep(2)}
            style={{
              background: "none",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#295086",
              fontWeight: "600",
              fontSize: "18px",
              padding: 0,
              cursor: "pointer"
            }}
          >
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 13L1 7L7 1" stroke="#295086" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Payment
          </button>
        </SidebarHeader>
      ) : (
        <>
          <SidebarHeader>
            <SidebarTitleRow>
              <SidebarTitle>Edit Appointment</SidebarTitle>
              {fromDragDrop ? (
                <button
                  type="button"
                  onClick={onClose}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", alignItems: "center" }}
                  aria-label="Close"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="#295086" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ) : (
                <SidebarCancelBtn type="button" onClick={() => setIsEditing(false)}>
                  Back
                </SidebarCancelBtn>
              )}
            </SidebarTitleRow>
          </SidebarHeader>

          {selectedService && selectedEmployee ? (
            <>
              <SidebarDateTimeRow style={{ display: "block" }}>
                <SidebarDatePickerCell style={{ flexDirection: "column", borderRight: "none" }}>
                  <ReactDatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    minDate={new Date()}
                    dateFormat="ddd, MMM d"
                    customInput={<SidebarDatePickerInput selectedDate={selectedDate} disabled />}
                    popperPlacement="bottom-start"
                    disabled
                  />
                  {errors.date && <ErrorText style={{ fontSize: "11px", marginTop: "2px" }}>{errors.date}</ErrorText>}
                </SidebarDatePickerCell>
              </SidebarDateTimeRow>
            </>
          ) : (
            <SidebarDateTimeRow>
              <SidebarDatePickerCell style={{ flexDirection: "column" }}>
                <ReactDatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  dateFormat="ddd, MMM d"
                  customInput={<SidebarDatePickerInput selectedDate={selectedDate} disabled />}
                  popperPlacement="bottom-start"
                  disabled
                />
                {errors.date && <ErrorText style={{ fontSize: "11px", marginTop: "2px" }}>{errors.date}</ErrorText>}
              </SidebarDatePickerCell>

              <SidebarDivider />

              <SidebarTimePickerCell style={{ flexDirection: "column" }}>
                <div className="sidebar-time-picker-wrap">
                  <span className="label-prefix">At&nbsp;</span>
                  <select
                    value={selectedTime ? selectedTime.format(TIME_FORMAT) : ""}
                    onChange={(e) => {
                      const parsed = moment(e.target.value, TIME_FORMAT);
                      handleTimeChange(parsed);
                    }}
                    className="sidebar-time-select"
                  >
                    {generateTimeOptions().length === 0 ? (
                      <option value="">No slots</option>
                    ) : (
                      generateTimeOptions().map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                {errors.time && <ErrorText style={{ fontSize: "11px", marginTop: "2px" }}>{errors.time}</ErrorText>}
              </SidebarTimePickerCell>
            </SidebarDateTimeRow>
          )}
        </>
      )}

      <SidebarForm>
        {step === 1 && (
          <>
            <SidebarField style={{ position: "relative" }}>
              <ClientSearchWrapper>
                <ClientSearchInput
                  type="text"
                  placeholder="Search or create client"
                  value={clientSearch}
                  disabled={true}
                  style={{ backgroundColor: "#F8FAFC", color: "#64748B", cursor: "not-allowed" }}
                  onFocus={() => { }}
                  onBlur={() => { }}
                  onChange={() => { }}
                />
                <ClientAddBtn
                  type="button"
                  aria-label="Add client"
                  disabled={true}
                  style={{ opacity: 0.5, cursor: "not-allowed", backgroundColor: "#CBD5E1" }}
                  onClick={() => { }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 1V11M1 6H11" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </ClientAddBtn>
              </ClientSearchWrapper>

              {showDropdown && clientSearch && (
                <SearchDropdown>
                  {filteredClients.length > 0 ? (
                    filteredClients.map((client) => (
                      <SearchDropdownItem
                        key={client.userId}
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
              {errors.client && <ErrorText>{errors.client}</ErrorText>}
            </SidebarField>

            <SidebarField>
              <ReactSelect
                className="sitback-select2-container"
                classNamePrefix="sitback-select-option"
                placeholder="Select service"
                options={serviceOptions}
                value={
                  serviceOptions.find(
                    (opt) => opt.value && String(opt.value) === String(selectedService)
                  ) || null
                }
                onChange={() => { }}
                components={{
                  SingleValue: IconSingleValue,
                  Option: IconOption,
                }}
                isSearchable={false}
                isDisabled={true}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: state.isDisabled ? "#F8FAFC" : base.backgroundColor,
                    borderColor: state.isDisabled ? "#E2E8F0" : base.borderColor,
                    cursor: state.isDisabled ? "not-allowed" : "default",
                  })
                }}
              />
              {errors.service && <ErrorText>{errors.service}</ErrorText>}
            </SidebarField>

            {selectedService && (
              <SidebarField>
                <ReactSelect
                  className="sitback-select2-container"
                  classNamePrefix="sitback-select-option"
                  placeholder="Select employee"
                  options={employees.map((emp) => {
                    const firstName = emp.firstName || emp.first_name || "";
                    const lastName = emp.lastName || emp.last_name || "";
                    const fullName = emp.username || (firstName || lastName ? `${firstName} ${lastName}`.trim() : emp.name || "Employee");
                    return {
                      value: String(emp.id || emp.userId || emp._id),
                      label: fullName,
                      image: emp.image || emp.profile_image || null,
                      raw: emp
                    };
                  })}
                  value={
                    selectedEmployee
                      ? employees
                        .map((emp) => {
                          const firstName = emp.firstName || emp.first_name || "";
                          const lastName = emp.lastName || emp.last_name || "";
                          const fullName = emp.username || (firstName || lastName ? `${firstName} ${lastName}`.trim() : emp.name || "Employee");
                          return {
                            value: String(emp.id || emp.userId || emp._id),
                            label: fullName,
                            image: emp.image || emp.profile_image || null,
                            raw: emp
                          };
                        })
                        .find(opt => String(opt.value) === String(selectedEmployee.value)) || selectedEmployee
                      : null
                  }
                  onChange={(option) => {
                    setSelectedEmployee(option);
                    setSelectedId?.(option ? Number(option.value) : 0);
                    setErrors((prev) => ({ ...prev, employee: null }));
                  }}
                  components={{
                    SingleValue: IconSingleValue,
                    Option: IconOption,
                  }}
                  isSearchable={true}
                />
                {errors.employee && <ErrorText>{errors.employee}</ErrorText>}
              </SidebarField>
            )}

            {selectedService && selectedEmployee && (
              <SidebarField>
                <div style={{ fontSize: "14px", fontWeight: "600", color: "#295086", marginBottom: "12px" }}>
                  Available Time Slots
                </div>
                {slotsLoading ? (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <SkeletonChip key={i} />
                    ))}
                  </div>
                ) : employeeSlots.length === 0 ? (
                  <div style={{ fontSize: "13px", color: "#718096" }}>No available slots on this date</div>
                ) : (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {employeeSlots.map((slot, index) => {
                      const timeValStr = typeof slot === "string" ? slot : slot.time;
                      const isSelected = selectedTime && moment(selectedTime).format("HH:mm") === moment(timeValStr, ["hh:mm A", "hh:mm:ss a", "hh:mm:ss A", "hh:mm a"]).format("HH:mm");

                      return (
                        <SlotChipButton
                          key={index}
                          type="button"
                          active={isSelected}
                          onClick={() => {
                            const parsed = moment(timeValStr, ["hh:mm A", "hh:mm:ss a", "hh:mm:ss A", "hh:mm a"]);
                            setSelectedTime(parsed);
                            updateSlotDateTime(selectedDate, parsed);
                            setErrors((prev) => ({ ...prev, time: null }));
                          }}
                        >
                          {isSelected && <span style={{ marginRight: "6px" }}>✓</span>}
                          {getSlotDisplayRange(timeValStr, currentService?.duration)}
                        </SlotChipButton>
                      );
                    })}
                  </div>
                )}
                {errors.time && <ErrorText style={{ fontSize: "11px", marginTop: "6px" }}>{errors.time}</ErrorText>}
              </SidebarField>
            )}

            <SidebarField>
              <NotesTextarea
                placeholder="Add a Note"
                maxLength={100}
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                  setErrors((prev) => ({ ...prev, note: null }));
                }}
                rows={6}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                {errors.note ? (
                  <ErrorText style={{ margin: 0 }}>{errors.note}</ErrorText>
                ) : (
                  <span />
                )}
                <span style={{ fontSize: "11px", color: note.length > 100 ? "#e53e3e" : "#7a869a" }}>
                  {note.length}/100
                </span>
              </div>
            </SidebarField>
          </>
        )}

        {step === 2 && (
          <>
            <ReviewCard>
              <ReviewCardDeleteBtn
                type="button"
                onClick={() => {
                  setSelectedClient(null);
                  setClientSearch("");
                  setStep(1);
                }}
              >
                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 3.8H2.33333M2.33333 3.8H13M2.33333 3.8V13.6C2.33333 13.9713 2.47381 14.3274 2.72386 14.5899C2.97391 14.8525 3.3129 15 3.66667 15H10.3333C10.6871 15 11.0261 14.8525 11.2761 14.5899C11.5262 14.3274 11.6667 13.9713 11.6667 13.6V3.8M4.33333 3.8V2.4C4.33333 2.0287 4.47381 1.6726 4.72386 1.41005C4.97391 1.1475 5.3129 1 5.66667 1H8.33333C8.6871 1 9.0261 1.1475 9.2761 1.41005C9.5262 1.6726 9.66667 2.0287 9.66667 2.4V3.8M5.66667 7.3V11.5M8.33333 7.3V11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </ReviewCardDeleteBtn>

              <ReviewHeader>
                <ReviewAvatar>
                  {clientImage ? <img src={clientImage} alt={clientName} /> : initials}
                </ReviewAvatar>
                <ReviewTitle>{clientName}</ReviewTitle>
                <ReviewSubtitle>Client Since {sinceDate}</ReviewSubtitle>
              </ReviewHeader>

              <ReviewRow>
                <ReviewLabel>Phone:</ReviewLabel>
                <ReviewValue>({selectedClient?.countrycode || "+1"}) {selectedClient?.phone || ""}</ReviewValue>
              </ReviewRow>

              <ReviewRow>
                <ReviewLabel>Email Address:</ReviewLabel>
                <ReviewValue>{selectedClient?.email || ""}</ReviewValue>
              </ReviewRow>

              <ReviewRow>
                <ReviewLabel>Credit:</ReviewLabel>
                <ReviewValue>
                  {cardDetails ? (
                    <>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        **** **** **** {cardDetails.last4}
                      </span><br></br>
                      <AddCreditCardBtn type="button" onClick={() => setShowCardModal(true)}>
                        Add Credit Card
                      </AddCreditCardBtn>
                    </>
                  ) : (
                    <AddCreditCardBtn type="button" onClick={() => setShowCardModal(true)}>
                      Add Credit Card
                    </AddCreditCardBtn>
                  )}
                </ReviewValue>
              </ReviewRow>
            </ReviewCard>

            <ServiceReviewCard>
              <ServiceReviewHeader>
                <ServiceReviewTitle>{currentService?.label || ""}</ServiceReviewTitle>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <button
                    type="button"
                    style={{ background: "none", border: "none", color: "#295086", padding: "4px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                    onClick={() => {
                      onServiceChange("");
                      setStep(1);
                    }}
                  >
                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 3.8H2.33333M2.33333 3.8H13M2.33333 3.8V13.6C2.33333 13.9713 2.47381 14.3274 2.72386 14.5899C2.97391 14.8525 3.3129 15 3.66667 15H10.3333C10.6871 15 11.0261 14.8525 11.2761 14.5899C11.5262 14.3274 11.6667 13.9713 11.6667 13.6V3.8M4.33333 3.8V2.4C4.33333 2.0287 4.47381 1.6726 4.72386 1.41005C4.97391 1.1475 5.3129 1 5.66667 1H8.33333C8.6871 1 9.0261 1.1475 9.2761 1.41005C9.5262 1.6726 9.66667 2.0287 9.66667 2.4V3.8M5.66667 7.3V11.5M8.33333 7.3V11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </ServiceReviewHeader>

              <ServiceReviewSubText>
                with <span>{providerName}</span>{note && note.trim() && <><br /> Request: <span>{note}</span></>}
              </ServiceReviewSubText>

              <ServiceReviewTimeText>
                at <span>{selectedTime ? selectedTime.format("h:mm A") : ""}</span> for <span>{formatDuration(currentService?.duration)}</span>
              </ServiceReviewTimeText>
            </ServiceReviewCard>
          </>
        )}

        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", padding: "8px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <span style={{ fontSize: "15px", color: "#295086", fontWeight: "500" }}>Subtotal</span>
              <span style={{ fontSize: "15px", color: "#295086", fontWeight: "600" }}>${subtotal.toFixed(2)}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <span style={{ fontSize: "15px", color: "#295086", fontWeight: "500" }}>Tip</span>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ display: "flex", gap: "6px" }}>
                  {[18, 20, 22].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => {
                        setSelectedTipPercentage(pct);
                        setCustomTipAmount("");
                      }}
                      style={{
                        borderRadius: "100px",
                        border: "1px solid #295086",
                        background: selectedTipPercentage === pct ? "#295086" : "transparent",
                        color: selectedTipPercentage === pct ? "#ffffff" : "#295086",
                        padding: "4px 10px",
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: "pointer",
                        outline: "none"
                      }}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>

                <div style={{ position: "relative", width: "100px" }}>
                  <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#295086", fontSize: "14px", fontWeight: "600" }}>$</span>
                  <input
                    type="text"
                    value={selectedTipPercentage !== null ? tipVal.toFixed(2) : customTipAmount}
                    onChange={(e) => {
                      setSelectedTipPercentage(null);
                      setCustomTipAmount(e.target.value.replace(/[^0-9.]/g, ""));
                    }}
                    style={{
                      width: "100%",
                      padding: "6px 8px 6px 20px",
                      borderRadius: "4px",
                      border: "1px solid #E2E8F0",
                      textAlign: "right",
                      fontSize: "14px",
                      color: "#295086",
                      fontWeight: "600",
                      outline: "none"
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <span style={{ fontSize: "16px", color: "#295086", fontWeight: "700" }}>Total</span>
              <span style={{ fontSize: "16px", color: "#295086", fontWeight: "700" }}>${totalVal.toFixed(2)}</span>
            </div>

            <div style={{ borderBottom: "1px solid #E2E8F0", margin: "10px 0 24px 0" }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <span style={{ fontSize: "15px", color: "#295086", fontWeight: "600" }}>Amount To Charge</span>
              <div style={{
                border: "1px solid #E2E8F0",
                background: "#F8FAFC",
                borderRadius: "6px",
                padding: "8px 16px",
                color: "#295086",
                fontWeight: "700",
                fontSize: "15px",
                minWidth: "120px",
                textAlign: "right"
              }}>
                ${totalVal.toFixed(2)}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "12px" }}>
              <button
                type="button"
                onClick={() => setPaymentMethod("credit_card")}
                style={{
                  padding: "14px",
                  borderRadius: "8px",
                  border: "1px solid #295086",
                  background: paymentMethod === "credit_card" ? "#295086" : "#ffffff",
                  color: paymentMethod === "credit_card" ? "#ffffff" : "#295086",
                  fontWeight: "600",
                  fontSize: "14px",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.2s"
                }}
              >
                Credit Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("cash")}
                style={{
                  padding: "14px",
                  borderRadius: "8px",
                  border: "1px solid #295086",
                  background: paymentMethod === "cash" ? "#295086" : "#ffffff",
                  color: paymentMethod === "cash" ? "#ffffff" : "#295086",
                  fontWeight: "600",
                  fontSize: "14px",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.2s"
                }}
              >
                Cash
              </button>
            </div>

            {paymentMethod === "credit_card" && (
              <div style={{
                marginTop: "16px",
                padding: "16px",
                border: "1px solid #E2E8F0",
                borderRadius: "8px",
                background: "#ffffff"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "#295086" }}>Saved Credit Cards</span>
                  <button
                    type="button"
                    onClick={() => setShowCardModal(true)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#295086",
                      fontWeight: "600",
                      fontSize: "13px",
                      textDecoration: "underline",
                      cursor: "pointer",
                      padding: 0
                    }}
                  >
                    + Add Card
                  </button>
                </div>

                {cardsLoading ? (
                  <div style={{ fontSize: "13px", color: "#718096", padding: "8px 0" }}>Loading cards...</div>
                ) : cardsList.length === 0 ? (
                  <div style={{
                    fontSize: "13px",
                    color: "#e53e3e",
                    fontWeight: "500",
                    padding: "12px",
                    background: "#fff5f5",
                    border: "1px solid #fed7d7",
                    borderRadius: "6px",
                    textAlign: "center"
                  }}>
                    No credit cards available. Please add a credit card first.
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {cardsList.map((card, idx) => {
                      const brand = card?.brand || card?.get_card_detail?.brand || card?.get_card_detail?.name || "Visa";
                      const last4 = card?.last4 || card?.get_card_detail?.last4 || "";
                      const cardId = card?.paymentMethodId || card?.id || card?.get_card_detail?.id || idx;
                      const isDefault = card?.isDefault == true;

                      return (
                        <div
                          key={cardId}
                          onClick={() => handleCardRadioChange(cardId)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "10px 12px",
                            border: "1px solid",
                            borderColor: selectedCardId === cardId ? "#295086" : "#E2E8F0",
                            borderRadius: "6px",
                            background: selectedCardId === cardId ? "#F8FAFC" : "#ffffff",
                            cursor: "pointer",
                            transition: "all 0.2s"
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <input
                              type="radio"
                              name="selectedCard"
                              checked={selectedCardId === cardId}
                              onChange={() => handleCardRadioChange(cardId)}
                              style={{ cursor: "pointer", accentColor: "#295086" }}
                              onClick={(e) => e.stopPropagation()}
                            />
                            <div style={{ display: "flex", flexDirection: "column" }}>
                              <span style={{ fontSize: "13px", color: "#295086", fontWeight: "600" }}>
                                **** **** **** {last4}
                              </span>
                            </div>
                          </div>
                          {isDefault && (
                            <span style={{
                              fontSize: "10px",
                              fontWeight: "600",
                              color: "#2563EB",
                              background: "#DBEAFE",
                              padding: "2px 6px",
                              borderRadius: "4px"
                            }}>
                              Default
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </SidebarForm>

      <SidebarFooter>
        <BookAppointmentBtn
          type="button"
          disabled={bookingLoading}
          onClick={handleBookClick}
        >
          {bookingLoading ? "Saving..." : "Save Changes"}
        </BookAppointmentBtn>
      </SidebarFooter>

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
          if (cid) {
            fetchCardDetails(cid);
          } else {
            setCardDetails(details);
          }
        }}
      />
    </SidebarContainer>
  );
};

export default EditAppointmentSidebar;
