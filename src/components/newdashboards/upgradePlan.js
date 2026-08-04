import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import InlineSVG from "svg-inline-react";
import SubscriptionCancelModal from "../subscription/modals/subscriptionCancelModal";
import { useToaster } from "@/hooks";
import { loginDetail } from "@/redux/authCheck";
import { handleSubscribe } from "@/redux/messageTab";
import { API_ROUTER } from "@/services/apiRouter";
import { Button,} from "@/styles/global/main.style";
import {
  UpgradePlanDisplayDiv,
} from '@/styles/pages/insights.style';
import { rightmark_icon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { SUBSCRIPTION_VALUE, TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

export const UpgradePlan = () => {
  const { t } = useTranslation();
  const [id, setId] = useState(null);
  // const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  // state
    const [planData, setPlanData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [subscriptionData, setSubscriptionData] = useState(null);
    const [openCancelModal, setOpenCancelModal] = useState(false);
    const [selectPrice, setSelectPrice] = useState({});
    const [checkBankDetailModal, setCheckBankDetailModal] = useState(false);
    const [lgShow, setLgShow] = useState(false);
  // hooks
    const { toaster } = useToaster();
    const dispatch = useDispatch();

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
              // push(PATH_DASHBOARD?.serviceProvider);
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
            case "Dashboard Access":
          return {
            description: `${t('dashboardPlanDes')}`,
            features: [
              `${t('dashboardFeature1')}`,
              `${t('dashboardFeature2')}`,
              `${t('dashboardFeature3')}`,
              `${t('dashboardFeature4')}`,
              `${t('dashboardFeature5')}`,
              `${t('dashboardFeature6')}`,
            ],
            // details: `${t('premiumPlanDetail')}`,
            // warning: `${t('premiumWarning')}`,
          };
        default:
          return {
            description: "",
            features: [],
            details: "",
          };
      }
    };

    const openCancelPopUp = async (value) => {
      setId(value);
      if (subscriptionData?.isSubscribe != 3) {
        setOpenCancelModal(true);
      }
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
      }
  };

  const handleModelClose = async () => {
    setOpenCancelModal(false)
    getSubscription(false)
    getProfileInfo();
  }


  return (
    <>
      <UpgradePlanDisplayDiv>
        {loading ?
          <>
            <div className="sitback-main-loader-wrapper">
              <div className="spinner-border text-info" role="status">
              </div>
            </div>
          </> :
          <>
            {planData &&
              planData.length > 0 &&
              planData.map((plan) => (
                <>
                  <div className="upgrade-plan-box-wrapper" key={plan.id}>
                  <div className="upgrade-plan-box-div">
                    <div className="upgrade-plan-header-wrapper">
                      <h3>${plan.plan_amount}<sup>/month</sup></h3>
                    <h5>{plan.plan_name}</h5>
                      <p>{getPlanDetails(plan.plan_name).description}</p>
                    </div>
                    <div className="plan-list-display-div">
                      <ul>
                          {getPlanDetails(plan.plan_name).features.map((feature, index) => (
                            <li key={index}>
                              <div>
                                <InlineSVG
                                  src={rightmark_icon}
                                  className="global_laguage_icon"
                                />
                              </div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <div className="cancel-plan-btn-div">
                          {subscriptionData?.planData?.planDetails?.plan_name ==
                            plan?.plan_name ? (
                            <Button
                              onClick={() =>
                                openCancelPopUp(subscriptionData?.planData?.subscription_id)
                              }
                              disabled={(subscriptionData?.planData?.cancel_status == "" || subscriptionData?.planData?.cancel_status == null )  && (subscriptionData?.planData?.status == "active") ? false : true}
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
                      </div>
                    </div>

                    {/* <p className="para-note-text">
                        Per guest cover: FREE for 30 days then $3.00 per guest booking.
                        *You are never charged for on time cancellations
                    </p> */}
                  </div>
                </>
              ))
            }
          </>
        }

      </UpgradePlanDisplayDiv>
      <SubscriptionCancelModal
        show={openCancelModal}
        handleClose={() => handleModelClose()}
        selectPrice={id}
        subscriptionData={subscriptionData}
      />
    </>

  );
};
