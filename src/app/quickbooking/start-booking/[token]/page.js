"use client";

import { useParams,usePathname,useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Container, } from "react-bootstrap";
import { useDispatch } from "react-redux";
import HomeHeader from "@/components/homeheader/page";
import MasterModal from "@/components/quickBooking/modals/MasterModal";
import { useToaster } from "@/hooks";
import { handleStep,schedulerDetail, schedulerSpaName,setServiceData  } from "@/redux/quickBooking";
import { API_ROUTER } from "@/services/apiRouter";
import { ComingSoonLayoutWrapper, } from "@/styles/pages/comingsoon.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
export default function SchedulerPage() {
  // Hooks
  const params = useParams();
  const { toaster } = useToaster();
  const dispatch = useDispatch();
  const { back } = useRouter();
  // const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  // useEffects
  useEffect(() => {
    //dispatch(schedulerDetail(null));
    dispatch(setServiceData([]));
    getId();
  }, [params]);

   const goBack = async () => {
    back();
  };


  // functions
  const getId = async () => {
    try {
      let param = {
        slug: params?.token,
      };
      const res = await axiosApiCall.post(API_ROUTER?.GET_QUICK_SPA_ID, param);
      if (!res?.status) {

        if(res?.url == false) {
          setTimeout(() => {
            goBack()
          }, 2000);
          dispatch(schedulerDetail(null));
          return toaster(res?.message, TOAST_TYPES.ERROR);

        } else {
          dispatch(schedulerDetail(null));
          dispatch(schedulerSpaName(res?.spaname || null));
          dispatch(handleStep(12));
        }
      } else {
        dispatch(handleStep(1));
        dispatch(schedulerDetail(res?.data));
        await getServiceList(res?.data);
        //await removePendingPaymentData(res?.data);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  // const removePendingPaymentData = async (data) => {
  //   try {
  //     let param = {
  //       sp_id: data?.sp_id,
  //     };
  //     const res = await axiosApiCall.post(API_ROUTER?.RMV_SCHEDULAR_PENDING_PAYMENT_DATA, param);
  //     if (!res?.status) {
  //       return toaster(res?.message, TOAST_TYPES.ERROR);
  //     }
  //   } catch (error) {
  //     toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
  //   }
  // };

  const getServiceList = async (data) => {
  try {
    let param = {
      sp_id: data?.sp_id,
    };
    const res = await axiosApiCall.post(API_ROUTER?.GET_QUICK_SERVICES_LIST, param);

    if (!res?.status) {
      return toaster(res?.message, TOAST_TYPES.ERROR);
    } else {
      // Ensure services is always an array
      const services = res?.data?.data || [];
      formatServiceData(services); // Pass the services array to formatServiceData
    }
  } catch (error) {
    toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
  }
};
  const formatServiceData = async (services) => {
  let options = [];
  if (Array.isArray(services) && services.length > 0) {
    services.map((s) => {
      options.push({
        value: s?.id,
        label: s?.name,
        image: s?.image,
        price: s?.price,
        time: { hour: s?.hour, minute: s?.minutes },
        calculatedTime: `(${s?.hour * 60 + s?.minutes} min)`,
      });
    });
  }
  dispatch(setServiceData(options));
};

  return (
    <>
    <HomeHeader />
    <ComingSoonLayoutWrapper className="sitback-revamp-banner-section sitback-small-size-banner-div">
      <section className="sitback-banner-updated-div">
        <div className="sitback-banner-image-div">
          <img
            src="/images/landing-banner-image.webp"
            alt="Loading Video..."
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
              zIndex: 2,
            }}
          />
          <p className="breadcrumb-text">Home  Services</p>
          <div className="banner-content-wrapper">
            <div className="banner-top-title-div">
              <Container>
                <h1>Amara Spa</h1>
              </Container>
            </div>
          </div>
        </div>
      </section>
    </ComingSoonLayoutWrapper>
      <MasterModal />
    </>
  );
}
