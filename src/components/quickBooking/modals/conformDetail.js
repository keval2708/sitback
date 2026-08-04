import moment from "moment";
import { usePathname, useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as gtag from "../../../lib/gtag";
import LoadingButton from "@/components/shared/button/LoadingButton";
import { useToaster } from "@/hooks";
import {
  bookAppointmentSchedulerData,
  cmsSelectSpa,
  finalBookData,
  handleStep,
  manageGuestResponse,
  manageSchedulerResponse,
  quickBookingSliceSelector,
} from "@/redux/quickBooking";
import { PATH_QUICKBOOKING } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { Button,Image } from "@/styles/global/main.style";
import { SchedulerModalLayoutWrapper } from "@/styles/pages/scheduler.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const ConformDetail = () => {
  // hooks
  const { toaster } = useToaster();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { back } = useRouter();

  // state
  const { schedulerResponse, schedulerData, guestResponse } =
  useSelector(quickBookingSliceSelector);
  const [loading, setLoading] = useState(false);
  const [showHappenButton, setShowHappenButton] = useState(false);

  // function

  const handleSubmit = async () => {
    setLoading(true);
    const basePath = pathname.split("/").slice(0, 2).join("/");
    const endBookingUrl = window.location.origin+ basePath + '/end-booking';

    let slotAny = '';
    if(schedulerResponse?.mainUser?.availableSlots == "Request Any") {
      slotAny = schedulerResponse?.mainUser?.availableSlots;
    } else {
      slotAny = null;
    }

    try {

      let param = {
        sp_id: schedulerData?.sp_id,
        servicelist_id: schedulerResponse?.mainUser?.services?.value,
        employee_id: schedulerResponse?.mainUser.employee?.id,
        date: moment(schedulerResponse?.date).format("YYYY-MM-DD"),
        slot_title: schedulerResponse?.mainUser.slots?.slot_title,
        // slot_time: schedulerResponse?.mainUser?.availableSlots?.slot_time,
        // time_type: schedulerResponse?.mainUser?.availableSlots?.time_type,
        slotstring:schedulerResponse?.mainUser?.availableSlots,
        charges: schedulerResponse?.mainUser?.services?.price,
        total_charge_amount: schedulerResponse?.mainUser?.services?.price,
        client_name: schedulerResponse?.userInfo?.name,
        client_email: schedulerResponse?.userInfo?.email,
        phone: schedulerResponse?.userInfo?.phone,
        countrycode: `+1`,
        payment_by: "card",
        isguest: schedulerResponse?.guest == 0 ? 0 : 1,
        total_guest: schedulerResponse?.guest,
        notes: schedulerResponse?.userInfo?.notes ? schedulerResponse?.userInfo?.notes : "",
        selectAny: slotAny,
      };
      // setLoading(false);


      dispatch(bookAppointmentSchedulerData(param));
      if (schedulerResponse?.guest > 0) {
        dispatch(cmsSelectSpa(false));

        await updateGuestData(param);
      } else {
         const res = await axiosApiCall.post(API_ROUTER?.BOOKING_WITHOUT_PAYMENT_NEW, param);
        if (!res?.status) {
          setLoading(false);
          return toaster(res?.message, TOAST_TYPES.ERROR);
        } else {
          if (process.env.SERVER_TYPE == "production") {
              gtag.trackBookingEvent("end-booking", {
                label: schedulerData?.data?.username,
                url: endBookingUrl,
              });
          }
          dispatch(cmsSelectSpa(false));
          setShowHappenButton(true)

          //window.location.href = PATH_QUICKBOOKING?.completebooking
          //setLoading(false);
          //dispatch(handleStep(10));
        }

      }
    } catch (error) {
      setLoading(false);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const updateGuestData = async (detail) => {
    try {
      let guestData = [];

      if (guestResponse?.guest1Res?.data) {
        guestData.push({
          guestid: guestResponse?.guest1Res?.data?.id,
          name: schedulerResponse?.userInfo?.guest1?.name,
          countrycode: `+${schedulerResponse?.userInfo?.guest1?.countrycode}`,
          phone: schedulerResponse?.userInfo?.guest1?.phone,
          guestDob: schedulerResponse?.userInfo?.guest1?.guestDob
            ? moment(schedulerResponse?.userInfo?.guest1?.guestDob).format("YYYY-MM-DD")
            : null,
          notes: schedulerResponse?.userInfo?.guest1?.notes
            ? schedulerResponse?.userInfo?.guest1?.notes
            : "",
        });
      }
      if (guestResponse?.guest2Res?.data) {
        guestData.push({
          guestid: guestResponse?.guest2Res?.data?.id,
          name: schedulerResponse?.userInfo?.guest2?.name,
          countrycode: `+${schedulerResponse?.userInfo?.guest2?.countrycode}`,
          phone: schedulerResponse?.userInfo?.guest2?.phone,
          guestDob: schedulerResponse?.userInfo?.guest2?.guestDob
            ? moment(schedulerResponse?.userInfo?.guest2?.guestDob).format("YYYY-MM-DD")
            : null,
          notes: schedulerResponse?.userInfo?.guest2?.notes
            ? schedulerResponse?.userInfo?.guest2?.notes
            : "",
        });
      }
      if (guestResponse?.guest3Res?.data) {
        guestData.push({
          guestid: guestResponse?.guest3Res?.data?.id,
          name: schedulerResponse?.userInfo?.guest3?.name,
          countrycode: `+${schedulerResponse?.userInfo?.guest3?.countrycode}`,
          phone: schedulerResponse?.userInfo?.guest3?.phone,
          guestDob: schedulerResponse?.userInfo?.guest3?.guestDob
            ? moment(schedulerResponse?.userInfo?.guest3?.guestDob).format("YYYY-MM-DD")
            : null,
          notes: schedulerResponse?.userInfo?.guest3?.notes
            ? schedulerResponse?.userInfo?.guest3?.notes
            : "",
        });
      }
      if (guestResponse?.guest4Res?.data) {
        guestData.push({
          guestid: guestResponse?.guest4Res?.data?.id,
          name: schedulerResponse?.userInfo?.guest4?.name,
          countrycode: `+${schedulerResponse?.userInfo?.guest4?.countrycode}`,
          phone: schedulerResponse?.userInfo?.guest4?.phone,
          guestDob: schedulerResponse?.userInfo?.guest4?.guestDob
            ? moment(schedulerResponse?.userInfo?.guest4?.guestDob).format("YYYY-MM-DD")
            : null,
          notes: schedulerResponse?.userInfo?.guest4?.notes
            ? schedulerResponse?.userInfo?.guest4?.notes
            : "",
        });
      }

      let param = {
        guestdata: JSON?.stringify(guestData),
        serviceProviderId: schedulerData?.sp_id,
      };

      const res = await axiosApiCall.post(API_ROUTER?.TEMPBOOKAPPOINTMENT_UPDATE_GUEST_DATA, param);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        dispatch(bookAppointmentSchedulerData({ ...detail, updateGuestInfo: res?.data?.data }));
        setLoading(false);
        dispatch(handleStep(9));
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

    useEffect(() => {
    if (process.env.SERVER_TYPE == "production") {
      const handleRouteChange = () => {
      const url = `${window.location.href}/step-4`;
        gtag.pageview(url);
      };
      handleRouteChange();
    }
  }, []);
  const onClose = async () => {
    // if (currentStep == 1) return;
    // dispatch(handleStep(currentStep - 1))
    await goBacks();
    setTimeout(async() => {
        await dispatch(manageSchedulerResponse(null));
        await dispatch(manageGuestResponse(null));
        await dispatch(bookAppointmentSchedulerData(null));
        await dispatch(finalBookData(null));
    }, 1000);

    // await dispatch(handleStep(1));
    // back();

    // window.location.reload();
  };
  const goBacks = async () => {
    back();
  };

  const redirectToCompleteBooking = async () => {
    window.location.href = PATH_QUICKBOOKING?.completebooking
  }


  return (
    <>
    {showHappenButton ?
    <>
    <div className="simplicity-detail-wrapper">
        <div className="text-center">
          <h5>Here’s what will happen when you confirm</h5>
        </div>
        <div className="blue-box-row">
          <div className="box-col">
            <div className="bluebox-wrapper">
              <div className="iconbox">
                <Image isContainImg={true} alt="sitback" src="/images/confirm-image-1.svg" />
              </div>
              <p>Sitback will contact your selected spa and request your service.</p>
            </div>
          </div>
          <div className="box-col">
            <div className="bluebox-wrapper">
              <div className="iconbox">
                <Image isContainImg={true} alt="sitback" src="/images/confirm-image-2.svg" />
              </div>
              <p>The spa will contact you to confirm appointment</p>
            </div>
          </div>
          <div className="box-col">
            <div className="bluebox-wrapper">
              <div className="iconbox">
                <Image isContainImg={true} alt="sitback" src="/images/confirm-image-3.svg" />
              </div>
              <p>You get to sitback and relax</p>
            </div>
          </div>
        </div>
      </div>

      <div className="confirm-footer-wrapper final-step-btn-div">
        <LoadingButton
          label="Close"
          loadinglabel="Close"
          className="loading-btn-wrapper"
          onClick={() => redirectToCompleteBooking()}
        />

      </div>
    </> :
    <>
     <SchedulerModalLayoutWrapper>
          <div className="sit-step-display-div sit-confirm-step-display-div">
            <h5>Step 4 of 4</h5>
            <div className="step-content-wrapper">
              <div className="step-note-div active">
                <div className="step-round-wrapper">
                  <span className="number-text">1</span>
                  <span className="checkmark-icon">
                      <Image isContainImg={true} alt="sitback" src="/images/white-checkmark-icon.svg" />
                  </span>
                </div>
              </div>
              <div className="step-note-div active">
                <div className="step-round-wrapper">
                  <span className="number-text">2</span>
                  <span className="checkmark-icon">
                      <Image isContainImg={true} alt="sitback" src="/images/white-checkmark-icon.svg" />
                  </span>
                </div>
              </div>
              <div className="step-note-div active">
                <div className="step-round-wrapper">
                  <span className="number-text">3</span>
                  <span className="checkmark-icon">
                      <Image isContainImg={true} alt="sitback" src="/images/white-checkmark-icon.svg" />
                  </span>
                </div>
              </div>
              <div className="step-note-div active">
                <div className="step-round-wrapper">
                  <span className="number-text">4</span>
                  <span className="checkmark-icon">
                      <Image isContainImg={true} alt="sitback" src="/images/white-checkmark-icon.svg" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SchedulerModalLayoutWrapper>

      <div className="review-details-wrapper">
        <div className="text-center header-bar-primary mb-3">
          <h5>Please Review Your Details</h5>
        </div>
        <div className="calender-wrapper">
          <div className="date-and-text">
            <h2>Date</h2>
            <h3>{moment(schedulerResponse?.date).format("MMMM D, YYYY")}</h3>
          </div>
          <div className="date-and-text">
            <h2>Time</h2>
            {(schedulerResponse?.mainUser?.availableSlots && schedulerResponse?.mainUser?.availableSlots == "Request Any")  ? <><h3>{schedulerResponse?.mainUser?.availableSlots}</h3></> : <><h3>{(schedulerResponse?.mainUser?.slots?.slot_title)}{" "}({schedulerResponse?.mainUser?.availableSlots}) </h3></>}



          </div>
          <div className="date-and-text">
            <h2>Service Type</h2>
            <h3>{schedulerResponse?.mainUser?.services?.label} (
                  {schedulerResponse?.mainUser?.services?.time?.hour * 60 +
                    schedulerResponse?.mainUser?.services?.time?.minute}{" "}
                  Min)</h3>
          </div>
          <div className="date-and-text">
            <h2>Massage Specialist</h2>
            <h3>{schedulerResponse?.mainUser?.employee?.name}</h3>
          </div>
          <div className="date-and-text">
            <h2>Total Amount</h2>
            <h3>${parseFloat(schedulerResponse?.mainUser?.services?.price)?.toFixed(2)}</h3>
          </div>
        </div>
      </div>
      <div className="confirm-footer-wrapper final-step-btn-div">
        <LoadingButton
          disabled={loading}
          label="Book now"
          loadinglabel="Book now"
          isLoading={loading}
          className="loading-btn-wrapper"
          onClick={(e) => handleSubmit(e)}
        />
        <Button isBorderBtn={true} onClick={() => onClose()} className="cancel-btn">
         Cancel
        </Button>
      </div>
    </>}

    </>
  );
};

export default memo(ConformDetail);
