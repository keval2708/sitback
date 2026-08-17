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

const SidebarDatePickerInput = forwardRef(({ selectedDate, onClick }, ref) => (
  <SidebarDateTimeButton type="button" onClick={onClick} ref={ref}>
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
        // customerId: customerId,
        sourceId: cardToken,
        stripe_token: cardToken,
      };
      const res = await axiosApiCall.post(API_ROUTER?.ADD_MANUAL_NEW_CARD, param);
      if (!res?.status) {
        setIsPaymentProgress(false);
        return toaster(res?.message || "Failed to add card to customer", TOAST_TYPES.ERROR);
      }
      console.log("new", res);

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

  console.log("selectedClient", selectedClient);

  return (
    <Form onSubmit={handleFormSubmit}>
      <div className="mt-1">
        <Label className="cardtitle">{t('cardHolderName')}</Label>
        <Input
          name="accHolderName"
          id="accHolderName"
          placeholder={t('nameOnCard')}
          value={username}
          onChange={handlechangeCardname}
        />
        {accHolderNameError && <p className="text-danger" style={{ marginLeft: "25px", marginTop: "5px" }}>{accHolderNameError}</p>}
      </div>

      <Row className="payment-input-wrapper">
        <Col md={12} className="card_number mt-1">
          <Label>{t('cardNumber')}</Label>
          <CardNumberElement
            className="card_number_input"
            onChange={handlechangeCardnumber}
            options={CARD_ELEMENT_OPTIONS}
          />
          {cardNumberError && <p className="text-danger" style={{ marginLeft: "25px", marginTop: "5px" }}>{cardNumberError}</p>}
        </Col>

        <Col md={12} className="card_number mt-1">
          <Label>{t('cardExpire')}</Label>
          <CardExpiryElement
            className="card_number_input"
            onChange={handlechangeCardexpiry}
            options={CARD_ELEMENT_OPTIONS}
          />
          {expiryError && <p className="text-danger" style={{ marginLeft: "25px", marginTop: "5px" }}>{expiryError}</p>}
        </Col>

        <Col md={12} className="card_number mt-1">
          <Label>{t('cardCvvNumber')}</Label>
          <CardCvcElement
            options={CARD_CVC_OPTIONS}
            className="card_number_input"
            onChange={handlechangeCardcsv}
          />
          {cvcError && <p className="text-danger" style={{ marginLeft: "25px", marginTop: "5px" }}>{cvcError}</p>}
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
          <h3 className="modal-title-text" style={{ marginTop: '-30px' }}>Add Card Details</h3>
          <Elements stripe={stripePromise}>
            <CardForm onHide={onHide} onSuccess={onSuccess} selectedClient={selectedClient} />
          </Elements>
        </SitBackModalBodyWrapper>
      </Modal.Body>
    </Modal>
  );
};

const NewAppointmentSidebar = ({
  selectedSlot,
  onClose,
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
  const [selectedDate, setSelectedDate] = useState(() => selectedSlot?.start ? moment(selectedSlot.start).toDate() : new Date());
  const [selectedTime, setSelectedTime] = useState(() => selectedSlot?.start ? moment(selectedSlot.start) : moment());
  const [clients, setClients] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [cardDetails, setCardDetails] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [cardsList, setCardsList] = useState([]);

  const fetchCardDetails = async (customerId) => {
    if (!customerId) return;
    try {
      const res = await axiosApiCall.get(
        `${API_ROUTER?.GET_CUSTOMER_CARD_DETAILS}?customerId=${customerId}`
      );
      console.log("res", res);
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
          console.log('defaultCard', defaultCard)

          const brand = defaultCard?.brand || defaultCard?.get_card_detail?.brand || defaultCard?.get_card_detail?.name || "Visa";
          const last4 = defaultCard?.last4 || defaultCard?.get_card_detail?.last4 || "";
          const cardId = defaultCard?.paymentId  || null;
          setCardDetails({ brand, last4, customerId, cardId });
        } else {
          setCardDetails(null);
        }
      } else {
        setCardsList([]);
        setCardDetails(null);
      }
    } catch (error) {
      console.error("Error fetching card details:", error);
      setCardsList([]);
      setCardDetails(null);
    }
  };

  useEffect(() => {
    if (selectedClient?.customerId) {
      fetchCardDetails(selectedClient.customerId);
    } else {
      setCardDetails(null);
      setCardsList([]);
    }
  }, [selectedClient]);


  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    if (selectedService) {
      setSelectedEmployee(null);
      setEmployeeSlots([]);
      const fetchEmployees = async () => {
        try {
          const res = await axiosApiCall.get(`${API_ROUTER?.ACTIVE_EMPLOYEE_LIST}?serviceId=${selectedService}`);

          if (res?.status) {
            const list = res?.data?.data || [];

            setEmployees(list);
            if (list.length > 0) {
              const firstEmp = list[0];
              const firstName = firstEmp.firstName || firstEmp.first_name || "";
              const lastName = firstEmp.lastName || firstEmp.last_name || "";
              const fullName = firstEmp.username || (firstName || lastName ? `${firstName} ${lastName}`.trim() : firstEmp.name || "Employee");
              const empId = firstEmp.id || firstEmp.userId || firstEmp._id;
              setSelectedEmployee({
                value: String(empId),
                label: fullName,
                image: firstEmp.image || firstEmp.profile_image || null,
                raw: firstEmp
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

  const [employeeSlots, setEmployeeSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const selectedDateKey = selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : "";

  useEffect(() => {
    if (selectedEmployee && selectedDate && selectedService) {
      const empId = selectedEmployee.value;

      const fetchSlots = async () => {
        setSlotsLoading(true);
        try {
          const dateStr = selectedDateKey;
          const serviceId = selectedService;
          const timeStr = selectedTime && moment(selectedTime).isValid() ? moment(selectedTime).format("HH:mm:ss") : null;

          const res = await axiosApiCall.get(
            `/calender/get-employee-slotes?employeeId=${empId}&date=${dateStr}&time=${timeStr}&serviceId=${serviceId}`
          );
          if (res?.status) {
            let fetchedSlots = res?.data?.data || [];

            setEmployeeSlots(fetchedSlots);
            if (fetchedSlots.length > 0) {
              const hasCurrentSlot = selectedTime && fetchedSlots.some((s) => {
                const sStr = typeof s === "string" ? s : s.time;
                return sStr && moment(selectedTime).format("HH:mm") === moment(sStr, ["hh:mm A", "hh:mm:ss a", "hh:mm:ss A", "hh:mm a"]).format("HH:mm");
              });

              if (!hasCurrentSlot) {
                const firstSlot = fetchedSlots[0];
                const firstSlotTimeStr = typeof firstSlot === "string" ? firstSlot : firstSlot.time;
                if (firstSlotTimeStr) {
                  const parsed = moment(firstSlotTimeStr, ["hh:mm A", "hh:mm:ss a", "hh:mm:ss A", "hh:mm a"]);
                  setSelectedTime(parsed);
                  const nextStart = combineDateAndTime(selectedDate, parsed);
                  onSlotChange?.(nextStart);
                }
              }
            } else {
              setSelectedTime(null);
            }
          }
        } catch (error) {
          console.error("Error fetching employee slots", error);
        } finally {
          setSlotsLoading(false);
        }
      };
      fetchSlots();
    } else {
      setEmployeeSlots([]);
      setSlotsLoading(false);
    }
  }, [selectedEmployee, selectedDateKey, selectedService]);

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
        console.log("clientList", clientList);
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
      payment_card_id: cardDetails?.cardId || null,
    };

    try {
      setErrors({});
      await appointmentSchema.validate(formData, { abortEarly: false });

      if (cardsList.length === 0 && !cardDetails) {
        toaster("Please add at least one credit card.", TOAST_TYPES.ERROR);
        return;
      }

      setBookingLoading(true);

      const clientName = selectedClient?.username || selectedClient?.name || "";
      const clientEmail = selectedClient?.email || "";
      const phone = selectedClient?.phone || "";
      const countrycode =
        selectedClient?.countrycode ||
        selectedClient?.countryCode ||
        selectedClient?.dialCode ||
        "";

      const currentService = serviceOptions.find((opt) => opt.value === selectedService);
      const durationMins = parseInt(currentService?.duration || 0, 10);
      const endTimeObj = selectedTime ? moment(selectedTime).add(durationMins, "minutes") : null;
      const end_time = endTimeObj ? endTimeObj.format("HH:mm:ss") : "";
      const end_time_type = endTimeObj ? endTimeObj.format("a") : "am";



      const payload = {
        servicelist_id: selectedService,
        employee_id: selectedEmployee?.value,
        date: moment(selectedDate).format("YYYY-MM-DD"),
        slot_time: selectedTime ? selectedTime.format("HH:mm:ss") : "",
        time_type: selectedTime ? selectedTime.format("a") : "am",
        end_time: end_time,
        end_time_type: end_time_type,
        charges: chargeAmount,
        total_charge_amount: chargeAmount,
        client_name: clientName,
        client_email: clientEmail,
        phone: phone,
        countrycode: countrycode,
        notes: note,
        payment_card_id: cardDetails?.cardId || null,
      };

      const res = await axiosApiCall.post(
        API_ROUTER?.BOOK_APPOINTMENT_SPA,
        payload
      );

      if (res?.status) {
        toaster(res?.message || "Appointment Booked Successfully!", TOAST_TYPES.SUCCESS);
        if (onSuccess) {
          onSuccess();
        }
        onClose();
      } else {
        toaster(res?.message || "Failed to book appointment.", TOAST_TYPES.ERROR);
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

  useEffect(() => {
    if (!selectedSlot || !selectedSlot.start) return;
    const newDate = moment(selectedSlot.start).toDate();
    setSelectedDate((prevDate) => {
      if (prevDate && moment(prevDate).isSame(newDate, "day")) {
        return prevDate;
      }
      return newDate;
    });
    const newTime = moment(selectedSlot.start);
    const matchesCurrent = selectedTime && moment(selectedTime).format("HH:mm") === newTime.format("HH:mm");
    if (!matchesCurrent) {
      const validTime = findFirstValidTime(newDate, newTime);
      setSelectedTime(validTime);
    }
    setStep(1);
  }, [selectedSlot?.start]);

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
  const chargeAmount = subtotal;



  return (
    <SidebarContainer>
      {step === 2 ? (
        <SidebarHeader style={{ borderBottom: "1px solid #E2E8F0", paddingBottom: "16px" }}>
          <button
            type="button"
            onClick={() => setStep(1)}
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
            Review Details
          </button>
        </SidebarHeader>
      ) : (
        <>
          <SidebarHeader>
            <SidebarTitleRow>
              <SidebarTitle>New Appointment</SidebarTitle>
              <SidebarCancelBtn type="button" onClick={onClose}>
                Cancel
              </SidebarCancelBtn>
            </SidebarTitleRow>
          </SidebarHeader>

          {selectedService && selectedEmployee ? (
            <SidebarDateTimeRow style={{ display: "block" }}>
              <SidebarDatePickerCell style={{ flexDirection: "column", borderRight: "none" }}>
                <ReactDatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  dateFormat="ddd, MMM d"
                  customInput={<SidebarDatePickerInput selectedDate={selectedDate} />}
                  popperPlacement="bottom-start"
                />
                {errors.date && <ErrorText style={{ fontSize: "11px", marginTop: "2px" }}>{errors.date}</ErrorText>}
              </SidebarDatePickerCell>
            </SidebarDateTimeRow>
          ) : (
            <SidebarDateTimeRow>
              <SidebarDatePickerCell style={{ flexDirection: "column" }}>
                <ReactDatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  dateFormat="ddd, MMM d"
                  customInput={<SidebarDatePickerInput selectedDate={selectedDate} />}
                  popperPlacement="bottom-start"
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
                  onFocus={() => setShowDropdown(true)}
                  onBlur={() => {
                    setTimeout(() => setShowDropdown(false), 200);
                  }}
                  onChange={(e) => {
                    setClientSearch(e.target.value);
                    setSelectedClient(null);
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
                value={serviceOptions.find((opt) => opt.value === selectedService) || null}
                onChange={(option) => {
                  onServiceChange(option ? option.value : "");
                  setSelectedEmployee(null);
                  setEmployeeSlots([]);
                  setErrors((prev) => ({ ...prev, service: null }));
                }}
                components={{
                  SingleValue: IconSingleValue,
                  Option: IconOption,
                }}
                isSearchable={true}
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
                  value={selectedEmployee}
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
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
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
                      // console.log("isSelected", isSelected);
                      // console.log("selectedDate", selectedDate);

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
                  {cardsList.length === 0 && !cardDetails && (
                    <ErrorText style={{ marginTop: "6px", display: "block" }}>
                      Please add at least one credit card.
                    </ErrorText>
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

        {/* Step 3 has been removed */}
      </SidebarForm>

      <SidebarFooter>
        {step === 1 ? (
          <BookAppointmentBtn type="button" onClick={handleNextClick}>
            Next
          </BookAppointmentBtn>
        ) : (
          <BookAppointmentBtn
            type="button"
            disabled={bookingLoading}
            onClick={handleBookClick}
          >
            {bookingLoading ? "Saving..." : `Book Appointment ($${chargeAmount.toFixed(2)})`}
          </BookAppointmentBtn>
        )}
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
          if (details?.customerId && !selectedClient.customerId) {
            setSelectedClient((prev) => ({ ...prev, customerId: details.customerId }));
          }
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

export default NewAppointmentSidebar;
