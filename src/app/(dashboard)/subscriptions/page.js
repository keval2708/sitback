/* eslint-disable no-dupe-keys */
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
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import InlineSVG from "svg-inline-react";
import LoadingButton from "@/components/shared/button/LoadingButton";
import CustomModal from "@/components/shared/modal";
import "react-loading-skeleton/dist/skeleton.css";
import HandleSubscriptionService from "@/components/subscription/modals/handleSubscriptionService";
import SubscriptionCancelModal from "@/components/subscription/modals/subscriptionCancelModal";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector, loginDetail } from "@/redux/authCheck";
import { handleBank, handleSubscribe, tabHandle } from "@/redux/messageTab";
import { PATH_DASHBOARD } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, Input, MainLayoutWrapper } from "@/styles/global/main.style";
import {
  SubscriptionPlanWrapper,
  SubscriptionsLayoutWrapper,
} from "@/styles/pages/subscriptions.style";
import { RightMarkRoundedIcon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { SUBSCRIPTION_VALUE, TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const stripeElementOptions = {
  style: {
    base: {
      fontSize: "15px",
      color: "#295086",
      fontFamily: "Poppins, sans-serif",
      fontWeight: "400",
      "::placeholder": {
        color: "#29508699",
      },
    },
    invalid: {
      color: "#E32C1F",
    },
  },
};

export default function Subscriptions() {
  // constant
  const { login } = useSelector(authCheckSliceSelector);
  const { t } = useTranslation();

  // state
  const [planData, setPlanData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkBankDetailModal, setCheckBankDetailModal] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [openSubscriptionService, setOpenSubscriptionService] = useState(false);
  const [isPaymentProgress, setIsPaymentProgress] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [selectPrice, setSelectPrice] = useState({});
  const [id, setId] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState(null);

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
  const dispatch = useDispatch();
  const { push } = useRouter();

  // useEffect
  useEffect(() => {
    getSubscription();
    getProfileInfo();
  }, []);

  // method
  const getSubscription = async (isLoader = true) => {
    try {
      setLoading(isLoader);
      const res = await axiosApiCall.get(API_ROUTER?.SUBSCRIPTION_LIST);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setPlanData(res?.data?.data);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleModelClose = async () => {
    setOpenCancelModal(false)
    getSubscription(false)
    getProfileInfo();
  }

  // const updatePlan = async () => {
  //   try {
  //     // setBtnLoading(true);
  //     let param = {
  //       item_id: subscriptionData?.planData?.item_id,
  //       new_price_id: selectPrice?.stripeProductId,
  //       subscription_id: subscriptionData?.planData?.subscription_id,
  //     };
  //     const res = await axiosApiCall.post(API_ROUTER?.UPDATE_CUSTOMER_PLAN, param);
  //     if (!res?.status) {
  //       return toaster(res?.message, TOAST_TYPES.ERROR);
  //     } else {
  //       toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
  //       push(PATH_DASHBOARD?.serviceProvider);
  //     }
  //   } catch (error) {
  //     toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
  //   } finally {
  //     // setBtnLoading(false);
  //   }
  // };

  const getProfileInfo = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.GET_DETAILS);
      if (!res?.status) {
        return res;
      } else {
        dispatch(loginDetail(res?.data?.data));
        setSubscriptionData(res?.data?.data);
        dispatch(handleSubscribe(res?.data?.data.isSubscribe));
        if (res?.data?.data.isBlocked) {
          push(PATH_DASHBOARD?.serviceProvider);
        }
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const getPlanDetails = (planName) => {
    switch (planName) {
      case "Basic":
        return {
          description: `${t('basicPlanDes')}`,
          features: [
            `${t('basicFeature1')}`,
            `${t('basicFeature2')}`,
            `${t('basicFeature3')}`,
            `${t('basicFeature4')}`,
            `${t('basicFeature5')}`,
            `${t('basicFeature6')}`,
          ],
          details: `${t('basicPlanDetail')}`,
          warning: `${t('basicWarning')}`,
        };
      case "Pro":
        return {
          description: `${t('proPlanDes')}`,
          features: [
            `${t('proFeature1')}`,
            `${t('proFeature2')}`,
            `${t('proFeature3')}`,
          ],
          details: `${t('proDetail')}`,
          warning: `${t('proWarning')}`,
        };
      case "Premium":
        return {
          description: `${t('premiumPlanDes')}`,
          features: [
            `${t('premiumFeature1')}`,
            `${t('premiumFeature2')}`,
            `${t('premiumFeature3')}`,
            `${t('premiumFeature4')}`,
            `${t('premiumFeature5')}`,
          ],
          details: `${t('premiumPlanDetail')}`,
          warning: `${t('premiumWarning')}`,
        };
      default:
        return {
          description: "",
          features: [],
          details: "",
        };
    }
  };

  const handlechangeCardname = (event) => {
    setAccHolderNameError(null);
    setUsername(event.target.value)

    if (!document.getElementById("accHolderName")?.value) {
      setAccHolderNameError("Please enter Account Name")
    }
  };

  const handlechangeCardnumber = (event) => {

    setCardNumberError(null);
    setCardNum(true)
    if (event.error) {
      setCardNumberError(event.error.message)
    }

    if (!document.getElementById("accHolderName")?.value) {
      setAccHolderNameError("Please enter Account Name")
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


  const handleSubmit = (stripe, elements) => async () => {

    if (!username || !cardNum || !expiryDate || !csvCode) {
      if (!username) {
        setAccHolderNameError("Please Enter Account name")
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
        let param = {
          email: login?.email,
          stripe_token: cardToken,
        };
        const res = await axiosApiCall.post(API_ROUTER?.ADD_SPA_CUSTOMER, param);
        if (!res?.status) {
          setIsPaymentProgress(false);
          setIsCardModalOpen(false);
          return toaster(res?.message, TOAST_TYPES.ERROR);
        } else {
          if (res?.data?.data?.result?.id) {
            try {
              let subscriptionsData = {
                plan_id: selectPrice?.id,
                plan_amount: selectPrice?.amount,
                stripeProductId: selectPrice?.stripeProductId,
                stripeCustomerId: res?.data?.data?.result?.customerId,
              };
              const subscriptionRes = await axiosApiCall.post(
                API_ROUTER?.ADD_SPA_SUBSCRIPTION,
                subscriptionsData
              );
              if (!subscriptionRes?.status) {
                setIsPaymentProgress(false);
                setIsCardModalOpen(false);
                handleCloseModal();
                return toaster(subscriptionRes?.message, TOAST_TYPES.ERROR);
              } else {
                toaster(subscriptionRes?.data?.message, TOAST_TYPES.SUCCESS);
                dispatch(handleSubscribe(res?.data?.data.isSubscribe));
                setIsPaymentProgress(false);
                setIsCardModalOpen(false);
                handleCloseModal();
                push(PATH_DASHBOARD?.getStarted);
              }
            } catch (error) {
              toaster("TOAST_ALERTS.GENERAL_ERROR", TOAST_TYPES.ERROR);
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
        className="loading-btn-wrapper"
        onClick={handleSubmit(stripe, elements)}
      />
    );
  };

  const checkBankDetails = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.CHECK_BANK_DETAILS);
      if (res) {
        return res?.data;
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const openPaymentPopup = async (value) => {
    setSelectPrice({
      id: value.id,
      amount: value?.plan_amount,
      stripeProductId: value?.stripeProductId,
      planServiceLength: SUBSCRIPTION_VALUE[value?.plan_name],
      planName: value?.plan_name,
    });
    if (subscriptionData?.planData?.status) {
      if (subscriptionData?.isSubscribe != 3) {
        let { isBankDetailsAdded } = await checkBankDetails();
        if (!isBankDetailsAdded) {
          setCheckBankDetailModal(true);
        } else {
          setLgShow(true);
        }
      }
    } else {
      setIsCardModalOpen(true);
    }
  };

  const goToPage = async () => {
    dispatch(tabHandle("second"));
    dispatch(handleBank(true));
    push(PATH_DASHBOARD?.insights);
  };

  const openCancelPopUp = async (value) => {
    setId(value);
    if (subscriptionData?.isSubscribe != 3) {
      setOpenCancelModal(true);
    }
  };

  const handleSubscriptionModal = () => {
    setLgShow(false);
    setOpenSubscriptionService(true);
  };

  const handleCloseModal = () => {
    setIsCardModalOpen(false);
    setUsername(null);
    setAccHolderNameError(null);
    setCardNumberError(null);
    setCvcError(null);
    setExpiryError(null);
    setStripeError(null);
  };
  console.log("stripePromise",process.env.STRIPE_SECRET_KEY);
  return (
    <>
      <MainLayoutWrapper>
        <SubscriptionsLayoutWrapper>
          <Container>
            <Row>
              {loading ? (
                <Col lg={{ span: 10, offset: 1 }} style={{ cursor: 'default', pointerEvents: 'none' }}>
                  <div className="text-center-wrapper" style={{ marginBottom: '40px' }}>
                    <Skeleton width={200} height={32} />
                  </div>
                  <Row>
                    {[1, 2, 3].map((item) => (
                      <Col sm={6} lg={4} key={item}>
                        <SubscriptionPlanWrapper>
                          <div className="box-wrapper" style={{ padding: '24px' }}>
                            <div className="plan-detail-wrapper">
                              <Skeleton width={120} height={28} style={{ marginBottom: '12px' }} />
                              <Skeleton width={80} height={20} style={{ marginBottom: '16px' }} />
                              <Skeleton width="90%" height={16} style={{ marginBottom: '24px' }} />
                              <ul style={{ padding: 0 }}>
                                {[1, 2, 3, 4, 5].map((feat) => (
                                  <li key={feat} style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                                    <Skeleton circle width={16} height={16} />
                                    <Skeleton width={140} height={16} />
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <Skeleton width="100%" height={40} style={{ borderRadius: '100px', marginTop: '20px' }} />
                          </div>
                        </SubscriptionPlanWrapper>
                        <div className="subscripation_charged" style={{ marginTop: '16px' }}>
                          <Skeleton count={2} height={12} style={{ marginBottom: '4px' }} />
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Col>
              ) : (
                <Col lg={{ span: 10, offset: 1 }}>
                  <div className="text-center-wrapper">
                    <h3 className="main-title-text">
                      {t('choosePlan')}
                    </h3>
                  </div>
                  <Row>
                    {planData &&
                      planData.length > 0 &&
                      planData.map((plan) => (
                        <React.Fragment key={plan.id}>
                          <Col sm={6} lg={4}>
                            <SubscriptionPlanWrapper
                              className={`${plan.plan_name.toLowerCase()}-plan-wrapper`}
                            >
                              <div className="box-wrapper">
                                <div className="plan-detail-wrapper">
                                  <h4 className="main-title-text">
                                    ${plan.plan_amount} <span>/month</span>
                                  </h4>
                                  <h5>{plan.plan_name}</h5>
                                  <p>{getPlanDetails(plan.plan_name).description}</p>
                                  <ul>
                                    {getPlanDetails(plan.plan_name).features.map((feature, index) => (
                                      <li key={index}>
                                        <div>
                                          <InlineSVG
                                            src={RightMarkRoundedIcon}
                                            className="global_laguage_icon"
                                          />
                                        </div>
                                        {feature}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                {subscriptionData?.planData?.planDetails?.plan_name ==
                                  plan?.plan_name ? (
                                  <Button
                                    onClick={() =>
                                      openCancelPopUp(subscriptionData?.planData?.subscription_id)
                                    }
                                    disabled={(subscriptionData?.planData?.cancel_status == "" || subscriptionData?.planData?.cancel_status == null) ? false : true}
                                  >
                                    {t('cancel')} {plan.plan_name}
                                  </Button>
                                ) : subscriptionData ?  (
                                  <Button onClick={() => openPaymentPopup(plan)}
                                    disabled={(subscriptionData?.planData?.cancel_status == "" || subscriptionData?.planData?.cancel_status == null) ? false : true}>
                                    {t('select')} {plan.plan_name}
                                  </Button>
                                ) : ''}
                              </div>
                            </SubscriptionPlanWrapper>
                            <div className="subscripation_charged">
                              <p className="">{getPlanDetails(plan.plan_name).details}</p>
                              <span className="warning-text-plan">{getPlanDetails(plan.plan_name).warning}</span>
                            </div>
                          </Col>
                        </React.Fragment>
                      ))}
                  </Row>
                  <p className="text-warning-all">{t('subscriptionNote')}</p>
                </Col>
              )}
            </Row>
          </Container>
        </SubscriptionsLayoutWrapper>
      </MainLayoutWrapper>

      <CustomModal
        show={isCardModalOpen}
        onHide={() => {
          // push(PATH_AUTH?.signIn);
          handleCloseModal();
        }}
        // onConfirm={() => setIsCardModalOpen(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
        className="sitback-modal-wrapper payment-modal-wrapper sitback-payment-reminder-modal "
      >
        <Modal.Header closeButton className="red-close-icon" style={{zIndex: 9}}></Modal.Header>
        <Modal.Body  className="pt-0 stripe-card" style={{marginTop: "-35px"}}>
          <Elements stripe={stripePromise}>
            <h6 className="cardtitle">{t('payment')}</h6>
            <Input
              name="accHolderName"
              id="accHolderName"
              placeholder="Name on card"
              required
              value={username}
              onChange={(e) => handlechangeCardname(e)}
            />
            {accHolderNameError && <p className="text-danger">{accHolderNameError}</p>}
            <Row className="payment-input-wrapper">
              <Col md={12}>
                <CardNumberElement options={stripeElementOptions} onChange={(e) => handlechangeCardnumber(e)} />
                {cardNumberError && <p className="text-danger">{cardNumberError}</p>}
              </Col>
              <Col md={6}>
                <CardExpiryElement options={stripeElementOptions} onChange={(e) => handlechangeCardexpiry(e)} />
                {expiryError && <p className="text-danger">{expiryError}</p>}
              </Col>
              <Col md={6}>
                <CardCvcElement options={{ placeholder: "CVV", ...stripeElementOptions }} onChange={(e) => handlechangeCardcsv(e)} />
                {cvcError && <p className="text-danger">{cvcError}</p>}
              </Col>
            </Row>
            <PaymentForm />
          </Elements>
        </Modal.Body>
      </CustomModal>

      <Modal
        show={lgShow}
        onHide={() => {
          setLgShow(false);
        }}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
        className="sitback-modal-wrapper sitback-modalv2-wrapper subscriptions-cancel-popup-wrapper"
      >
        <Modal.Header closeButton className="red-close-icon"></Modal.Header>
        <Modal.Body>
          <div className="sitback-request-modal-wrapper">
            {subscriptionData?.planData?.plan_id < selectPrice?.id ?
              <div className="text-wrapper">
                <h6>{t('wahoo')}</h6>
                <h4>{t('upgradeText')}</h4>
                <p>{t('upgradeText1')}</p>
              </div>
              :
              <div className="text-wrapper">
                <h4>{t('downgradeText1')}</h4>
                <p>{t('downgradeText2')}</p>
                <p>{t('downgradeText3')}</p>
              </div>
            }
            <div className="btn-wrapper">
              {subscriptionData?.planData?.plan_id < selectPrice?.id ?
                <LoadingButton
                  type="submit"
                  disabled={false}
                  label={t("membershipText")}
                  loadinglabel={t("membershipText")}
                  isLoading={false}
                  className="loading-btn-wrapper"
                  onClick={() => handleSubscriptionModal()}
                />
                :
                <LoadingButton
                  type="submit"
                  disabled={false}
                  label={t("membershipText1")}
                  loadinglabel={t("membershipText1")}
                  isLoading={false}
                  className="loading-btn-wrapper"
                  onClick={() => handleSubscriptionModal()}
                />
              }
              <Button onClick={() => setLgShow(false)} className="text-btn">
                Nevermind, don&apos;t {subscriptionData?.planData?.plan_id < selectPrice?.id ? 'upgrade' : 'downgrade'}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <SubscriptionCancelModal
        show={openCancelModal}
        handleClose={() => handleModelClose()}
        selectPrice={id}
        subscriptionData={subscriptionData}
      />

      <HandleSubscriptionService
        show={openSubscriptionService}
        handleClose={() => setOpenSubscriptionService(false)}
        subscriptionData={subscriptionData}
        selectPrice={selectPrice}
      />

      <Modal
        show={checkBankDetailModal}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
        className="sitback-modal-wrapper warning-modal-wrapper"
      >
        <Modal.Body>
          <div className="sitback-request-modal-wrapper">
            <h5>{t('warning')}</h5>
            <p>{t('addBankDetails')}</p>
            <span onClick={() => goToPage()}>{t('addBankDetailText')}</span>
          </div>
        </Modal.Body>
      </Modal>

    </>
  );
}
