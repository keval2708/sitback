
"use client";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import InlineSVG from 'svg-inline-react';
import AddCardDetailModal from "@/components/newdashboards/modals/addCardDetailModal";
import CustomModal from "@/components/shared/modal";
import UpgradeSubscriptionCancelModal from "@/components/subscription/modals/upgradeSubscriptionCancelModal";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector } from "@/redux/authCheck";
import { PATH_DASHBOARD } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, Image, SitBackModalBodyWrapper } from '@/styles/global/main.style';
import { PlanForwardIcon_icon, PremiumFeatureIcon_icon } from '@/styles/svgs';
import axiosApiCall from "@/utils/axios";
import { SUBSCRIPTION_VALUE, TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { getSocketId } from "@/utils/helper";


const Upgrades = () => {
  // hooks
  const { toaster } = useToaster();
  const { t } = useTranslation();
  const { login } = useSelector(authCheckSliceSelector);
  const { push } = useRouter();

  const [id, setId] = useState(null);
  const [planDataForSpotLight, setPlanDataForSpotLight] = useState([]);
  const [selectPrice, setSelectPrice] = useState({});
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [loadingPlanId, setLoadingPlanId] = useState(null); // Track loading per plan
  const [loading, setLoading] = useState(null);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [checkBankDetailModal, setCheckBankDetailModal] = useState(false);
  const [lgCardShow, setLgCardShow] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isTrialPeriod, setTrialPeriod] = useState(null);
  const rating = Number.parseFloat(login?.google_average_rating ?? 0);
  const showLowRatingNote = Number.isFinite(rating) && rating < 4.2;

  useEffect(() => {
    getSubscriptionForSpotLight();
    // setLgCardShow(true)
  }, []);

  const checkUserSubscription = async () => {
      try {
        const res = await axiosApiCall.get(API_ROUTER?.CHECK_SUBSCRIPTION);
        if (res) {
          return res?.data?.status;
        }
      } catch (error) {
        toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      }
  };

  const getSubscriptionForSpotLight = async (isLoader = true) => {
    try {
      setLoading(isLoader);
      const res = await axiosApiCall.get(API_ROUTER?.SUBSCRIPTION_LIST_FOR_SPOTLIGHT_VIDEO);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        let isBankDetailsAdded  = await checkUserSubscription();
        if (isBankDetailsAdded) {
          setCheckBankDetailModal(false);
        } else {
          setCheckBankDetailModal(true);
        }
        setTrialPeriod(res?.data?.subscriptionStatus);
        setPlanDataForSpotLight(res?.data?.data);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const getPlanDetails = (planName) => {
    switch (planName) {
      case "Video Spotlight":
        return {
          description: t('videoSpotlightPlanDes'),
          features: [
            t('videoSpotlightFeature1'),
            t('videoSpotlightFeature2'),
          ],
        };
      case "Featured Spa":
        return {
          description: t('FeaturedSpaPlanDes'),
          features: [
            t('FeaturedSpaFeature1'),
            t('FeaturedSpaFeature2'),
          ],
        };
      default:
        return {
          description: "",
          features: [],
          details: "",
        };
    }
  };

  const openPaymentPopup = async (value) => {
    setSelectedPlan(value);
    setSelectPrice({
      id: value.id,
      amount: value?.plan_amount,
      stripeProductId: value?.stripeProductId,
      planServiceLength: SUBSCRIPTION_VALUE[value?.plan_name],
      planName: value?.plan_name,
      nextBillingDate: value?.nextBillingDate,
      startBillingDate: value?.startBillingDate,
    });
    setIsPlanModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsPlanModalOpen(false);
  };

  const handleSubmitModelData = async () => {
    const socketId = getSocketId();
    try {
      setLoading(true);
      // Call your API to create a checkout session
      const payload = {
        plan_id: selectPrice?.id,
        plan_amount: selectPrice?.planServiceLength,
        stripeProductId: selectPrice?.stripeProductId,
        socketId: socketId,
      };

      let res;
      if(selectPrice?.planName == "Video Spotlight"){
          res = await axiosApiCall.post(API_ROUTER?.CREATE_SUBSCRIPTION_VIDEO_SPOTLIGHT, payload);
      } else {
          res = await axiosApiCall.post(API_ROUTER?.CREATE_SUBSCRIPTION_FEATUTED_SPA, payload);
      }
      if (!res?.status) {
        if(res?.isCardError) {
          setIsPlanModalOpen(false);
          getSubscriptionForSpotLight();
          setLoadingPlanId(null);
          setLgCardShow(true);
        }
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        getSubscriptionForSpotLight()
        setIsPlanModalOpen(false);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const openCancelPopUp = async (value) => {
    setId(value);
    if (value?.plan_name === "Video Spotlight" && value?.isVideoSpotlightSubscribe == 1) {
      setOpenCancelModal(true);
    }
    if (value?.plan_name === "Featured Spa" && value?.isFeaturedSpaSubscribe == 1) {
      setOpenCancelModal(true);
    }
  };

   const handleModelClose = async () => {
    setOpenCancelModal(false)
    getSubscriptionForSpotLight();
    setId(null);
  }

  // Separate API call for purchasing a plan
  const handlePurchasePlan = async (plan) => {
    const socketId = getSocketId();
    try {
      setSelectedPlan(plan);
      setLoadingPlanId(plan?.id);
      const payload = {
        type: plan?.plan_name,
        plan_amount: plan?.plan_amount,
        stripeProductId: plan?.stripeProductId,
        socketId: socketId,
      };
      // console.log("payload", payload);
      // return
      const res = await axiosApiCall.post(API_ROUTER?.CREATE_MANUAL_SUBSCRIPTION_SPOTLIGHT_FEATUTED, payload);
      if (!res?.status) {
        if(res?.isCardError) {
          getSubscriptionForSpotLight();
          setLoadingPlanId(null);
          setLgCardShow(true);
        }
        toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setTimeout(() => {
          toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
          getSubscriptionForSpotLight();
          setLoadingPlanId(null);
          setLgCardShow(false);
        }, 4000);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const goToPage = async () => {
    push(PATH_DASHBOARD?.subscriptions);
  };

  useEffect(() => {
    if (window.io) {
      window.io.socket.on("serviceprovider", async (message) => {
        if(message?.action == "updateVSSubscription") {
          getSubscriptionForSpotLight();
        }

      });
    }
  }, [window.io]);
  return (
    <>
      <div className="upgrade-tab-detail-div">
        <div className="upgrade-header-div">
          <h5>
            <InlineSVG
              src={PremiumFeatureIcon_icon}
              data-tooltip-id="my-tooltip-1"
              className="global_laguage_icon"
            />
            {t('PremiumUpgradesText')}
          </h5>
          <p>
            {t('PremiumUpgradesDesc')}
          </p>
          {isTrialPeriod == "trialing" ? <h5 className="upgrade-header-div mt-4">{t('PremiumUpgradesUnlockMsg')}</h5> : <></>  }
        </div>
        <div className="spotlight-plan-div">
          {planDataForSpotLight &&
            planDataForSpotLight.length > 0 &&
            planDataForSpotLight.map((plan,key) => (
              <>
                <div className="spotlight-main-box-wrapper" key={key}>
                  <div className={plan?.plan_name === "Featured Spa" ? "plan-box-div most-popular-plan-box" : "plan-box-div" }>
                    {  plan?.plan_name === "Featured Spa" ? <>
                      <span className="popular-span">
                        {t('MostPopularText')}
                      </span>
                    </> : <></>
                    }
                    <h5>
                      <i>
                        <Image
                          isContainImg={true}
                          alt="sitback"
                          src={plan?.plan_name === "Video Spotlight" ? "images/video-spotlight-plan-icon.svg" : "images/featured-star-icon.svg"}
                        />
                      </i>
                      {plan?.plan_name}
                    </h5>
                    <p className="extra-month-text">
                      ${plan?.plan_amount}
                      <span>
                        /month extra
                      </span>
                    </p>

                    <p className="plan-desc">
                      <p>{getPlanDetails(plan?.plan_name).description}</p>
                    </p>
                    <div className="plan-property-div">
                      {getPlanDetails(plan?.plan_name).features.map((feature, index) => (
                        <>
                          <div className="plan-property-wrapper" key={index}>
                            <InlineSVG
                              src={PlanForwardIcon_icon}
                              data-tooltip-id="my-tooltip-1"
                              className="global_laguage_icon"
                            />
                            <p> {feature}</p>
                          </div>
                        </>
                      ))}
                    </div>
                    {
                      plan?.plan_name === "Video Spotlight" && isTrialPeriod != "trialing" ? <>
                      {
                         (
                          plan?.isVideoSpotlightSubscribe != 1 ? (
                            <>
                            <Button
                              variant="primary"
                              type="reset"
                              isBorderBtn={false}
                              onClick={() => openPaymentPopup(plan)}
                            >
                              Get upgrade-${plan?.plan_amount}/mo
                            </Button></>
                          ) :  (
                            <></>
                          )
                        )
                      }
                      </> :
                      (
                        plan?.plan_name === "Featured Spa" && isTrialPeriod != "trialing" ? (
                          <>
                            {showLowRatingNote ? (
                              <p className="mt-2 text-error text-danger">
                                Note: Your rating ({rating.toFixed(1)}) is below 4.2.
                                You’ll need to improve this rating before subscribing to Featured Spa.
                              </p>
                            ) : (
                              <>
                                {(plan?.isFeaturedSpaSubscribe != 1) ? (
                                  <Button
                                      variant="primary"
                                      type="reset"
                                      isBorderBtn={false}
                                      onClick={() => openPaymentPopup(plan)}
                                    >
                                      {`Get upgrade-$${plan?.plan_amount}/mo`}
                                    </Button>
                                ) : (
                                 <></>
                                )}
                              </>
                            )}
                          </>
                        ) : (<></>)
                      )
                    }
                  </div>
                </div>
              </>
            ))
          }
        </div>
      </div>

      <CustomModal
        show={isPlanModalOpen}
        onHide={() => {
          handleCloseModal();
        }}
        aria-labelledby="example-modal-sizes-title-sm"
        className="sitback-modal-wrapper sitback-edit-service-modal-wrapper sitback-availability-modal-wrapper sitback-confirm-upgrade-modal-wrapper"
      >
        <Modal.Body>
          <div className="modal-header-wrapper">
            <h3>{t('ConfirmYourUpgradeText')}</h3>
          </div>
          <SitBackModalBodyWrapper className="sitback-edit-modal-body">
            <div className="spa-detail-div">
              <h4>
                <i>
                  <Image
                    isContainImg={true}
                    alt="sitback"
                    src={selectPrice?.planName === "Video Spotlight" ? "images/video-spotlight-plan-icon.svg" : "images/featured-star-icon.svg"}
                  />
                </i>
                {selectPrice?.planName}
              </h4>
              <div className="plan-inner-div">
                  <p className="per-month-text">
                    ${selectPrice?.amount}
                    <span>
                      /mo
                    </span>
                  </p>

                  <p className="plan-desc-text">
                    <p>{getPlanDetails(selectPrice?.planName).description}</p>
                  </p>
                  <div className="plan-property-div">
                    {getPlanDetails(selectPrice?.planName).features.map((feature, index) => (
                <>

                    <div className="plan-property-wrapper" key={index}>
                      <InlineSVG
                        src={PlanForwardIcon_icon}
                        data-tooltip-id="my-tooltip-1"
                        className="global_laguage_icon"
                      />
                      <p> {feature}</p>
                    </div>

                </>
                ))}


                  </div>
              </div>
            </div>
            <div className="additional-monthly-charge-div">
              {/* <div className="monthly-detail-div">
                <p>
                  Additional Monthly Charges
                </p>
                <p>$99.00</p>
              </div> */}
              <div className="monthly-detail-div">
                <p>
                  {t('StartBillingDateText')}:
                </p>
                <p>{selectPrice?.startBillingDate ? moment(selectPrice?.startBillingDate, "YYYY-MM-DD").format("MMMM D, YYYY") : ''}</p>
              </div>
              <div className="monthly-detail-div">
                <p>
                  {t('FirstBillingDateText')}:
                </p>
                <p>{selectPrice?.nextBillingDate ? moment(selectPrice?.nextBillingDate, "YYYY-MM-DD").format("MMMM D, YYYY") : ''}</p>
              </div>
            </div>
            <p className="cancle-text">
                {t('UpgradeCancelText')}
            </p>

            <div className="service-modal-btn-div">
              <Button
                variant="primary"
                type="submit"
                onClick={() => {
                  handleSubmitModelData();
                }}
              >
                {t('ConfirmUpgradeText')}
              </Button>
              <Button variant="secondary" type="button" className="cancle-modal-btn" onClick={()=>handleCloseModal()}>
                {t('cancelCaps')}
              </Button>
            </div>
          </SitBackModalBodyWrapper>
        </Modal.Body>
      </CustomModal>

      <UpgradeSubscriptionCancelModal
        show={openCancelModal}
        handleClose={() => handleModelClose()}
        selectPrice={id}
      />

      <AddCardDetailModal lgCardShow={lgCardShow} setLgCardShow={setLgCardShow}  selectedPlan={selectedPlan} getSubscriptionForSpotLight={getSubscriptionForSpotLight}/>

       <Modal
        show={checkBankDetailModal}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
        className="sitback-modal-wrapper warning-modal-wrapper"
      >
        <Modal.Body>
          <div className="sitback-request-modal-wrapper">
            <h5>{t('warning')}</h5>
            <p>{t('unlockSpaDashboardFeaturesText')}</p>
            <span onClick={() => goToPage()}>{t('purchaseSubscription')}</span>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Upgrades;
