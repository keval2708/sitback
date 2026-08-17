import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Accordion, Col, Form, Overlay, Row, Tooltip } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import InlineSVG from "svg-inline-react";
import BankDetailModal from "./modal/BankDetailModal";
import CardDetailModal from "./modal/CardDetailModal";
import PaymentHistoryDownloadCsvModal from "../dashboards/models/PaymentHistoryDownloadCsvModal";
import DeleteModal from "../shared/modal/DeleteModal";
import { useToaster } from "@/hooks";
import { messageCheckSliceSelector } from "@/redux/messageTab";
import { API_ROUTER } from "@/services/apiRouter";
import {
  Button,
} from '@/styles/global/main.style';
import { Calendar_icon, DeleteV2_icon, Info_icon, download_icon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
export const Payments = () => {
  const { bankModal, cardModal } = useSelector(messageCheckSliceSelector);
  // state
  const [lgShow, setLgShow] = useState(bankModal);
  const [lgCardShow, setCardLgShow] = useState(cardModal);

  const [bankData, setBankData] = useState();
  const [cardData, setCardData] = useState();
  const [paymentHistory, setPaymentHistory] = useState([]);
  const today = moment(new Date()).format("YYYY-MM-DD");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [showToolTip, setShowToolTip] = useState(false);
  const [showToolTips, setShowToolTips] = useState(false);

  const [tooltipShow, setTooltipShow] = useState({});
  const tooltipRefs = useRef([]);

  const handleMouseEnter = (index) => {
    setTooltipShow((prev) => ({ ...prev, [index]: true }));
  };

  const handleMouseLeave = (index) => {
    setTooltipShow((prev) => ({ ...prev, [index]: false }));
  };

  const [dateRange, setDateRange] = useState(new Date());

  // Delete model
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loading, setLoading] = useState(false);
  const [earning, setEarning] = useState({
    currentMonthEarnings: 0,
    currentMonthName: "",
  });
  const targets = useRef(null);
  const tooltipRef = useRef(null);

  const target = useRef(null);
  const [smShowPayMentCsvModal, setPaymentCsvModal] = useState(false);

  // hooks
  const { toaster } = useToaster();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    getAccountDetail();
    getCardDetail();
  }, [lgShow, lgCardShow]);

  useEffect(() => {
    if (cardModal) {
      setCardLgShow(true);
    }
  }, [cardModal]);

  useEffect(() => {
    if (bankModal) {
      setLgShow(true);
    }
  }, [bankModal]);

  const getAccountDetail = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.GET_ACCOUNT_DETAIL);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setBankData(res?.data?.data);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const getCardDetail = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.GET_SUBSCRIPTION_CARD_DETAIL);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setCardData(res?.data?.data);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const getCurrentMonthEarning = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.GET_CURRENT_MONTH_EARNING);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      }

      const payload = res?.data?.data ?? res?.data ?? {};
      console.log("payload", payload);
      setEarning({
        currentMonthEarnings:
          payload?.currentMonthEarnings ?? res?.data?.currentMonthEarnings ?? 0,
        currentMonthName:
          payload?.currentMonthName ?? res?.data?.currentMonthName ?? "",
      });
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const getPaymentHistory = async (selectedDate) => {
    try {
      setPaymentLoading(true);
      const params = {
        date: selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : today,
      };
      const res = await axiosApiCall.post(API_ROUTER?.PAYMENT_HISTORY, params);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setPaymentHistory(res?.data?.data);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setPaymentLoading(false);
    }
  };

  useEffect(() => {
    getPaymentHistory();
    getCurrentMonthEarning();
  }, []);

  const deleteAccount = async (bank) => {
    try {
      setLoading(true);
      let param = {
        id: bank?.id,
      };
      const res = await axiosApiCall.post(API_ROUTER?.DELETE_STRIPE_ACCOUNT, param);
      if (!res?.status) {
        return toaster(res?.data?.message, TOAST_TYPES.ERROR);
      } else {
        getAccountDetail();
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (bank) => {
    try {
      let param = {
        id: bank?.id,
      };
      //const res = await axiosApiCall.post(API_ROUTER?.UPDATE_ACTIVE_STATUS, param);

      const res = await axiosApiCall({
        method: "post",
        url: API_ROUTER?.UPDATE_ACTIVE_STATUS,
        baseURL: process.env.API_URL_V3,
        data: param,
      });

      if (!res?.status) {
        return toaster(res?.data?.message, TOAST_TYPES.ERROR);
      } else {
        getAccountDetail();
        // toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const handleCardSelect = async (bank) => {
    try {
      let param = {
        stripe_card_id: bank?.stripe_card_id,
        customerId: bank?.customerId,
      };
      const res = await axiosApiCall.post(API_ROUTER?.UPDATE_SPA_DEFAULT_CARD, param);
      if (!res?.status) {
        return toaster(res?.data?.message, TOAST_TYPES.ERROR);
      } else {
        getCardDetail();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const handleDeleteCard = async (bank) => {
    try {
      setLoading(true);
      let param = {
        stripe_card_id: bank?.stripe_card_id,
        customerId: bank?.customerId,
      };
      const res = await axiosApiCall.post(API_ROUTER?.DELETE_SPA_CARD, param);
      if (!res?.status) {
        return toaster(res?.data?.message, TOAST_TYPES.ERROR);
      } else {
        getCardDetail();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleBankSelect = (dt) => {
    updateStatus(dt);
  };

  //delete
  const handleShowDeleteModal = (target) => {
    setDeleteTarget(target);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };

  const handleShowDeleteCardModal = (target) => {
    setDeleteTarget(target);
    setShowCardModal(true);
  };

  const handleCloseCardModal = () => {
    setShowCardModal(false);
    setDeleteTarget(null);
  };

  const handleConfirmDeleteCard = async () => {
    if (deleteTarget) {
      handleCloseCardModal();
      await handleDeleteCard(deleteTarget);
    }
  };

  const handleConfirmDelete = async () => {
    if (deleteTarget) {
      handleCloseDeleteModal();
      await deleteAccount(deleteTarget);
    }
  };

  function calculateTotalMinutes(hour, minutes) {
    return hour * 60 + minutes;
  }

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  const capitalFirst = (param) => {
    if (param?.payment_by == "cash") {
      return "(Cash)";
    } else {
      return "(Card)";
    }
  };

  useEffect(() => {
    if (window.io) {
      window.io.socket.on("serviceprovider", async (msg) => {
        if (
          msg.action == "new_booking_from_user" ||
          msg.action == "auto_no_show_guest_booking_alert" ||
          msg.action == "cancelBookingSpa" ||
          msg.action == "auto_no_show_user_booking_alert" ||
          msg.action == "auto_start_service_user_booking_alert" ||
          msg.action == "auto_start_service_guest_booking_alert" ||
          msg.action == "compltedBySpa" ||
          msg.action == "new_booking_from_spa" ||
          msg.action == "newOrderArrived"
        ) {
          getPaymentHistory();
        }
      });
    }
  }, [window.io]);

  const handleCardModelCahnge = () => {
    setCardLgShow(true);
  };
  const handleBankCahnge = () => {
    setLgShow(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target) &&
        !targets.current.contains(event.target)
      ) {
        setShowToolTip(false); // Hide the tooltip if clicked outside
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup the event listener when the component is unmounted or when showToolTip changes
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showToolTip]);

  return (
    <Row>
      <Col sm={12} lg={8}>
        <div className="sitback-insights-tab-wrapper sitback-updated-inner-insight-div">
          <div className="sitback-add-payment-method-block">
            <h4 className="sitback-payment-title-text">{t("addPaymentMethod")}</h4>
            {/* <button onClick={() => setLgShow(true)}>{t("addPayment")} +</button> */}
          </div>
          <div className="sitback-payment-method-table-wrapper sitback-subscription-method-wrapper">
            <div className="sitback-add-payment-method-block">
              <h4 className="subtitle-textdiv">Subscription Card</h4>
              <button onClick={() => handleCardModelCahnge(true)}>Add Card +</button>
            </div>
            {cardData &&
              cardData?.length > 0 &&
              cardData?.map((card, key) => (
                <div key={key}>
                  <div className="table-wrapper-div">
                    <div className="bank-detail-div">
                      <div className="form-check">
                        <Form.Check.Input
                          type="radio"
                          id={`custom-switch-${key}`}
                          label={card?.get_card_detail?.name}
                          checked={card?.status == 1}
                          onChange={() => handleCardSelect(card)}
                          isValid
                        />
                        <Form.Check.Label>
                          <h6>{card?.get_card_detail?.name}</h6>
                          <p>************{card?.get_card_detail?.last4}</p>
                        </Form.Check.Label>
                      </div>
                    </div>
                    <div className="btn-block-div">
                      {card?.status == 1 && (
                        <button className="connected-text">{t("connected")}</button>
                      )}
                      <div className="icon-btns-wrapper">
                        {card?.status !== 1 && (
                          <InlineSVG
                            src={DeleteV2_icon}
                            onClick={() => handleShowDeleteCardModal(card)}
                            className="global_laguage_icon"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="sitback-payment-method-table-wrapper">
            <div className="sitback-add-payment-method-block">
              <h4 className="subtitle-textdiv">Bank Details</h4>
              <button onClick={() => handleBankCahnge(true)}>Add Bank +</button>
            </div>
            {bankData && bankData?.length > 0 ? (
              bankData?.map((databank, key) => (
                <div key={key}>
                  <div className="table-wrapper-div">
                    <div className="bank-detail-div">
                      <div className="form-check">
                        <Form.Check.Input
                          type="radio"
                          id={`custom-switch-${key}`}
                          label={databank?.bank_name}
                          checked={databank?.isActive == 1}
                          onChange={() => handleBankSelect(databank)}
                          isValid
                        />
                        <Form.Check.Label>
                          <h6>{truncateText(databank?.bank_name, 25)}</h6>
                          <p>************{databank?.last4}</p>
                        </Form.Check.Label>
                      </div>
                    </div>
                    <div className="btn-block-div">
                      {databank?.isActive == 1 && (
                        <button className="connected-text">{t("connected")}</button>
                      )}
                      <div className="icon-btns-wrapper">
                        {databank?.isActive !== true && (
                          <InlineSVG
                            src={DeleteV2_icon}
                            onClick={() => handleShowDeleteModal(databank)}
                            className="global_laguage_icon"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="data-text pb-3">{t("noAccAdded")}</p>
            )}
          </div>
        </div>
      </Col>
      <Col sm={12} lg={4}>
        <div className="sitback-insights-tab-wrapper earnings-section sitback-updated-inner-insight-div">
          <div className="sitback-calender-box-wrapper sitback-updated-calendar-box-wrapper">
            <h2>Total Earnings</h2>

            <p className="including-text">(Excluding all charges)
              <span ref={targets}
                onMouseEnter={() => setShowToolTip(true)}
                onMouseLeave={() => setShowToolTip(false)}>
                <InlineSVG
                  src={Info_icon}
                  data-tooltip-id="my-tooltip-1"
                  className="global_laguage_icon"
                />
              </span>
              <Overlay target={targets.current} show={showToolTip} placement="left" ref={tooltipRef}>
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    <p>Please note that the total earnings displayed do not include tip amounts given by customers to service specialists, as well as Stripe fees and transaction fees.</p>

                  </Tooltip>
                )}
              </Overlay></p>

            <p>{earning?.currentMonthName}</p>
            <h2 className="earn-text">
              ${parseFloat(earning?.currentMonthEarnings)?.toFixed(2) || 0}
            </h2>
            <h3>{t("earning")}</h3>
            {/* <p className="note-text">Note: Tips amount given to service specialist by customer is not included in total earnings</p> */}
          </div>
        </div>
      </Col>
      <Col sm={12}>
        <div className="sitback-insights-tab-wrapper payment-history sitback-updated-inner-insight-div">
          <div className="sitback-add-payment-method-block0 PaymentHistoryWrapper mb-0">
            <h4 className="sitback-payment-title-text">{t("paymentHistory")}</h4>
            <div className="download-and-date-btn">
              <ReactDatePicker
                showIcon
                startDate={today}
                placeholderText="Custom dates"
                className="datepicker-input"
                selected={dateRange}
                value={moment(dateRange).format("Do MMMM YYYY")}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                onChange={(update) => {
                  setDateRange(update);
                  getPaymentHistory(update);
                }}

                icon={<InlineSVG src={Calendar_icon} className="global_laguage_icon" />}
              />
              <Button variant="primary" className="download-btn-wrapper" onClick={() => setPaymentCsvModal(true)}>
                Download
                <InlineSVG
                  src={download_icon}
                  className="global_laguage_icon"
                />
              </Button>
            </div>
          </div>

          <div className="payment-history-accordion-wrapper">
            <div className="header-bar-wrapper">
              <h5>Description</h5>
              <h5>Amount</h5>
              <h5>Status</h5>
            </div>
            <Accordion>
              {paymentHistory?.length > 0 ? (
                paymentHistory.map((history, index) => (
                  <Accordion.Item key={index} eventKey={index.toString()}>
                    <Accordion.Header>
                      <h6>
                        {history?.username} - {history?.name} -{" "}
                        {calculateTotalMinutes(history?.hour, history?.minutes)} min
                      </h6>
                      <h6>${parseFloat(history?.totalCountAmount)?.toFixed(2)}</h6>
                      {/* <h6>
                        $
                        {history?.bookingstatus == 0 && history?.isPaymentDone == 0
                          ? parseFloat(history?.spapendingcharge)?.toFixed(2)
                          : history?.bookingstatus == 4
                          ? parseFloat(history?.spapendingcharge)?.toFixed(2)
                          : parseFloat(history?.spaCharge)?.toFixed(2)}
                      </h6> */}
                      {(history?.bookingstatus == 3 && history?.isChargeCaptured == 1) ||
                        (history?.bookingstatus == 0 && history?.isChargeCaptured == 1) ||
                        (history?.bookingstatus == 4 && history?.isChargeCaptured == 1) ? (
                        <h6>
                          {t("paid")} {capitalFirst(history)}
                        </h6>
                      ) : (
                        <></>
                      )}
                      {history?.bookingstatus == 0 && history?.isChargeCaptured == 0 ? (
                        <h6 className="pending-text">{t("pending")}</h6>
                      ) : (
                        <></>
                      )}
                      {history?.cancel_by_type == "serviceProvider" ? (
                        <>
                          {(history?.bookingstatus == 1 && history?.isChargeCaptured == 0) ||
                            (history?.bookingstatus == 1 && history?.isChargeCaptured == 1) ? (
                            <h6 className="pending-text">{t("cancelled")}</h6>
                          ) : (
                            <></>
                          )}{" "}
                        </>
                      ) : (
                        ""
                      )}
                      {history?.cancel_by_type == "user" ? (
                        <>
                          {history?.bookingstatus == 1 && history?.isChargeCaptured == 0 ? (
                            <h6 className="pending-text">
                              {history?.spapendingcharge == "0" ? (
                                <> {t("cancelled")}</>
                              ) : (
                                <>{t("cancelPending")}</>
                              )}
                            </h6>
                          ) : (
                            ""
                          )}
                          {history?.bookingstatus == 1 && history?.isChargeCaptured == 1 ? (
                            <h6 className="pending-text">{t("cancelled")}</h6>
                          ) : (
                            ""
                          )}
                        </>
                      ) : (
                        ""
                      )}
                      {history?.payment_by == "cash" ? (
                        history?.bookingstatus == 2 && history?.isChargeCaptured == 0 ? (
                          <h6>{t("NoShowCashPayment")}</h6>
                        ) : history?.bookingstatus == 2 && history?.isChargeCaptured == 1 ? (
                          <h6>{t("NoShowCashPayment")}</h6>
                        ) : history?.bookingstatus == 3 && history?.isChargeCaptured == 0 ? (
                          <h6>
                            {t("paid")} {capitalFirst(history)}{" "}
                          </h6>
                        ) : (
                          <></>
                        )
                      ) : (
                        <></>
                      )}
                      {history?.payment_by == "card" ? (
                        history?.bookingstatus == 2 && history?.isChargeCaptured == 0 ? (
                          <h6 className="pending-text">{t("pending")}</h6>
                        ) : history?.bookingstatus == 3 && history?.isChargeCaptured == 0 ? (
                          <h6 className="pending-text">{t("pending")}</h6>
                        ) : history?.bookingstatus == 4 && history?.isChargeCaptured == 0 ? (
                          <h6 className="pending-text">{t("pending")}</h6>
                        ) : history?.bookingstatus == 2 && history?.isChargeCaptured == 1 ? (
                          <h6 className="pending-text">
                            {t("cancelled")} ({t("noShowNew")})
                          </h6>
                        ) : (
                          <></>
                        )
                      ) : (
                        <></>
                      )}
                    </Accordion.Header>
                    <Accordion.Body >
                      {history?.productData?.length > 0
                        ? history?.productData?.map((prodData, prodIndex) => {

                          return (
                            <>
                              <div className="header-bar-wrapper">
                                <h5>
                                  {prodData?.name} {"x " + prodData?.pcount + ""}
                                </h5>
                                {history?.payment_by == "cash" ? <>
                                  <h5>${parseFloat(prodData?.pamount || 0).toFixed(2)}</h5>
                                </> : history?.bookingstatus == 4 ? <h5><> ${parseFloat(prodData?.pamount || 0).toFixed(2)} </></h5> : <h5>${parseFloat(prodData?.pamount || 0).toFixed(2)}</h5>}
                                <h5></h5>
                              </div>
                            </>
                          );
                        })
                        : null}

                      {history?.tipemployeename != null && history?.tip > 0 ? (
                        <>
                          <div className="header-bar-wrapper">
                            <h5>Tip {"(" + history?.tipemployeename + ")"}</h5>
                            <h5>${parseFloat(history?.tip || 0).toFixed(2)}</h5>
                            <h5></h5>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      <div className="header-bar-wrapper">
                        <h5>Service Charge</h5>
                        <h5>
                          $
                          {history?.bookingstatus == 0 && history?.isPaymentDone == 0
                            ? parseFloat(history?.spapendingcharge)?.toFixed(2)
                            : history?.bookingstatus == 4
                              ? parseFloat(history?.spapendingcharge)?.toFixed(2)
                              : parseFloat(history?.spaCharge)?.toFixed(2)}
                        </h5>
                        <h5></h5>
                      </div>

                      {history?.totalPlateformcharge != null && history?.totalPlateformcharge > 0 ? (
                        <>
                          <div className="header-bar-wrapper" onMouseLeave={() => handleMouseLeave(index)}>
                            <h5 className="platform-charge-tooltip" >
                              Platform Charge
                              <span
                                ref={(el) => (tooltipRefs.current[index] = el)}
                                onMouseEnter={() => handleMouseEnter(index)}
                                style={{ cursor: 'pointer' }}


                              >
                                <InlineSVG src={Info_icon} className="global_laguage_icon" />
                              </span>
                              <Overlay
                                target={tooltipRefs.current[index]}
                                show={tooltipShow[index]}
                                placement="top"
                              >
                                {(props) => (
                                  <Tooltip id={`overlay-example-${index}`} {...props}>
                                    <p>Subscription fee and other charges are included.</p>
                                  </Tooltip>
                                )}
                              </Overlay>
                            </h5>

                              <span style={{ color: '#29508699' }}>-</span><h5>${parseFloat(history?.totalPlateformcharge)?.toFixed(2)}</h5>
                            <h5></h5>
                          </div>
                        </>
                      ) : (
                        ""
                      )}


                    </Accordion.Body>
                  </Accordion.Item>
                ))
              ) : paymentLoading ? (
                <></>
              ) : (
                <p className="notes-available-text payment-history-display-text">{t("noRecAvail")}</p>
              )}
            </Accordion>
          </div>
        </div>
      </Col>
      <DeleteModal
        show={showDeleteModal}
        disabled={loading}
        messageBody={<>{t("deleteBackendDetail")}</>}
        handleClose={handleCloseDeleteModal}
        handleConfirmDelete={handleConfirmDelete}
      />
      <PaymentHistoryDownloadCsvModal
        show={smShowPayMentCsvModal}
        onHide={() => setPaymentCsvModal(false)}
        onConfirm={() => setPaymentCsvModal(false)}
        paymentHistory={paymentHistory}
      />

      <DeleteModal
        show={showCardModal}
        disabled={loading}
        messageBody={<>{t("deleteCardDetail")}</>}
        handleClose={handleCloseCardModal}
        handleConfirmDelete={handleConfirmDeleteCard}
      />
      <BankDetailModal lgShow={lgShow} setLgShow={setLgShow} cardData={cardData} />
      <CardDetailModal lgCardShow={lgCardShow} setCardLgShow={setCardLgShow} cardData={cardData} />
    </Row>
  );
};
