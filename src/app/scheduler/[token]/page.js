"use client";

import { useParams,useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import MasterModal from "@/components/schedular/modals/MasterModal";
import { useToaster } from "@/hooks";
import { handleStep, schedulerDetail, schedulerSpaName,setServiceData } from "@/redux/scheduler";
import { mySelectedServiceList } from "@/redux/service";
import { API_ROUTER } from "@/services/apiRouter";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

export default function SchedulerPage() {
  // Hooks
  const params = useParams();
  const { toaster } = useToaster();
  const dispatch = useDispatch();
  const { back } = useRouter();
  // useEffects
  useEffect(() => {
    dispatch(mySelectedServiceList(null));
    //dispatch(schedulerDetail(null));
    getId();
  }, [params]);

   const goBack = async () => {
    back();
  };

  // functions
  const getId = async () => {
    try {
      let param = {
        spaToken: params?.token,
      };
      const res = await axiosApiCall.post(API_ROUTER?.GET_SPA_ID, param);
      if (!res?.status) {

        if(res?.url == false) {
          setTimeout(() => {
            goBack()
          }, 2000);
          dispatch(schedulerDetail(null));
          return toaster(res?.message, TOAST_TYPES.ERROR);

        } else {
          dispatch(schedulerSpaName(res?.spaname || null));
          dispatch(handleStep(12));
        }
      } else {
        dispatch(handleStep(1));
        dispatch(schedulerDetail(res?.data));
        await getServiceList(res?.data);
        await removePendingPaymentData(res?.data);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const removePendingPaymentData = async (data) => {
    try {
      let param = {
        sp_id: data?.sp_id,
      };
      const res = await axiosApiCall.post(API_ROUTER?.RMV_SCHEDULAR_PENDING_PAYMENT_DATA, param);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const getServiceList = async (data) => {
    try {
      let param = {
        sp_id: data?.sp_id,
      };
      const res = await axiosApiCall.post(API_ROUTER?.GET_SERVICES_LIST, param);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        formatServiceData(res?.data?.data);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const formatServiceData = async (services) => {
    let options = [];
    services.length &&
      services?.map((s) => {
        options.push({
          value: s?.id,
          label: s?.name,
          image: s?.image,
          price: s?.price,
          time: { hour: s?.hour, minute: s?.minutes },
          calculatedTime: `(${s?.hour * 60 + s?.minutes} min)`,
        });
      });
    dispatch(setServiceData(options));
  };

  return (
    <>
      <MasterModal />
    </>
  );
}
