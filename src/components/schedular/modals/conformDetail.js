import moment from "moment";
import { memo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "@/components/shared/button/LoadingButton";
import { useToaster } from "@/hooks";
import {
  bookAppointmentSchedulerData,
  cmsSelectSpa,
  handleStep,
  schedulerSliceSelector,
} from "@/redux/scheduler";
import { API_ROUTER } from "@/services/apiRouter";
import { Button } from "@/styles/global/main.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const ConformDetail = () => {
  // hooks
  const { toaster } = useToaster();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // state
  const { schedulerResponse, schedulerData, guestResponse } = useSelector(schedulerSliceSelector);
  const [loading, setLoading] = useState(false);
  const totalCharge = useRef(null);

  // function

  const handleSubmit = async () => {
    try {
      setLoading(true);
      let param = {
        sp_id: schedulerData?.sp_id,
        servicelist_id: schedulerResponse?.mainUser?.services?.value,
        employee_id: schedulerResponse?.mainUser.employee?.id,
        date: moment(schedulerResponse?.date).format("YYYY-MM-DD"),
        slot_time: schedulerResponse?.mainUser?.slots?.slot_time,
        time_type: schedulerResponse?.mainUser?.slots?.time_type,
        charges: schedulerResponse?.mainUser?.services?.price,
        total_charge_amount: totalCharge?.current,
        client_name: schedulerResponse?.userInfo?.name,
        client_email: schedulerResponse?.userInfo?.email,
        client_dob: moment(schedulerResponse?.userInfo?.client_dob).format("YYYY-MM-DD"),
        phone: schedulerResponse?.userInfo?.phone,
        countrycode: `+${schedulerResponse?.userInfo?.countrycode}`,
        payment_by: "card",
        isguest: schedulerResponse?.guest == 0 ? 0 : 1,
        total_guest: schedulerResponse?.guest,
      };
      dispatch(bookAppointmentSchedulerData(param));
      if (schedulerResponse?.guest > 0) {
        dispatch(cmsSelectSpa(false));

        await updateGuestData(param);
      } else {
        dispatch(cmsSelectSpa(false));

        setLoading(false);
        dispatch(handleStep(9));
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

  const calculatePrice = () => {
    let price = 0;
    if (schedulerResponse?.mainUser?.services?.price) {
      price += parseInt(schedulerResponse?.mainUser?.services?.price);
    }
    if (schedulerResponse?.guest1Detail?.services?.price) {
      price += parseInt(schedulerResponse?.guest1Detail?.services?.price);
    }
    if (schedulerResponse?.guest2Detail?.services?.price) {
      price += parseInt(schedulerResponse?.guest2Detail?.services?.price);
    }
    if (schedulerResponse?.guest3Detail?.services?.price) {
      price += parseInt(schedulerResponse?.guest3Detail?.services?.price);
    }
    if (schedulerResponse?.guest4Detail?.services?.price) {
      price += parseInt(schedulerResponse?.guest4Detail?.services?.price);
    }
    totalCharge.current = price;
    return price;
  };

  const goBack = () => {
    dispatch(handleStep(7));
  };

  const calculateTime = (arg) => {
    let d = arg?.services?.time?.hour * 60 + arg?.services?.time?.minute;
    let startServiceValue = moment(
      `${arg?.slots?.slot_time} ${arg?.slots?.time_type}`,
      "hh:mm:ss A"
    ).format("hh:mm A");
    let endServiceValue = moment(`${arg?.slots?.slot_time} ${arg?.slots?.time_type}`, "hh:mm:ss A")
      .add(d, "minutes")
      .format("hh:mm A");

    return `${startServiceValue} - ${endServiceValue}`;
  };

  return (
    <>
      <div className="reviewyourdetails-header">
        <h5>{t("reviewDetail")}</h5>
        <h6>{moment(schedulerResponse?.date).format("MMMM Do, YYYY")}</h6>
      </div>
      <div className="reviewyourdetails-block">
        <div className="reviewyourdetails">
          <h4>{t("you")}:</h4>
          <ul>
            <li>
              <h3>{t("serviceType")}</h3>
              <div className="flex-text-wrapper">
                <p>{schedulerResponse?.mainUser?.services?.label}</p>
                <p>
                  (
                  {schedulerResponse?.mainUser?.services?.time?.hour * 60 +
                    schedulerResponse?.mainUser?.services?.time?.minute}{" "}
                  Min)
                </p>
              </div>
            </li>
            <li>
              <h3>{t("totalAmt")}</h3>
              <p>${schedulerResponse?.mainUser?.services?.price}</p>
            </li>
          </ul>
          <ul className="employee-time-list">
            <li>
              <h3>{t("employee")}</h3>
              <p>{schedulerResponse?.mainUser?.employee?.name}</p>
            </li>
            <li>
              <h3>{t("time")}</h3>
              <p>{calculateTime(schedulerResponse?.mainUser)}</p>
            </li>
          </ul>
        </div>
        {schedulerResponse?.guest > 0 && (
          <div className="reviewyourdetails">
            <h4>{t("guest")} # 1:</h4>
            <ul>
              <li>
                <h3>{t("serviceType")}</h3>
                <div className="flex-text-wrapper">
                  <p>{schedulerResponse?.guest1Detail?.services?.label}</p>
                  <p>
                    (
                    {schedulerResponse?.guest1Detail?.services?.time?.hour * 60 +
                      schedulerResponse?.guest1Detail?.services?.time?.minute}{" "}
                    Min)
                  </p>
                </div>
              </li>
              <li>
                <h3>{t("totalAmt")}</h3>
                <p>${schedulerResponse?.guest1Detail?.services?.price}</p>
              </li>
            </ul>
            <ul className="employee-time-list">
              <li>
                <h3>{t("employee")}</h3>
                <p>{schedulerResponse?.guest1Detail?.employee?.name}</p>
              </li>
              <li>
                <h3>{t("time")}</h3>
                <p>{calculateTime(schedulerResponse?.guest1Detail)}</p>
              </li>
            </ul>
          </div>
        )}
        {schedulerResponse?.guest > 1 && (
          <div className="reviewyourdetails">
            <h4>{t("guest")} # 2:</h4>
            <ul>
              <li>
                <h3>{t("serviceType")}</h3>
                <div className="flex-text-wrapper">
                  <p>{schedulerResponse?.guest2Detail?.services?.label}</p>
                  <p>
                    (
                    {schedulerResponse?.guest2Detail?.services?.time?.hour * 60 +
                      schedulerResponse?.guest2Detail?.services?.time?.minute}{" "}
                    Min)
                  </p>
                </div>
              </li>
              <li>
                <h3>{t("totalAmt")}</h3>
                <p>${schedulerResponse?.guest2Detail?.services?.price}</p>
              </li>
            </ul>
            <ul className="employee-time-list">
              <li>
                <h3>{t("employee")}</h3>
                <p>{schedulerResponse?.guest2Detail?.employee?.name}</p>
              </li>
              <li>
                <h3>{t("time")}</h3>
                <p>{calculateTime(schedulerResponse?.guest2Detail)}</p>
              </li>
            </ul>
          </div>
        )}
        {schedulerResponse?.guest > 2 && (
          <div className="reviewyourdetails">
            <h4>{t("guest")} # 3:</h4>
            <ul>
              <li>
                <h3>{t("serviceType")}</h3>
                <div className="flex-text-wrapper">
                  <p>{schedulerResponse?.guest3Detail?.services?.label}</p>
                  <p>
                    (
                    {schedulerResponse?.guest3Detail?.services?.time?.hour * 60 +
                      schedulerResponse?.guest3Detail?.services?.time?.minute}{" "}
                    Min)
                  </p>
                </div>
              </li>
              <li>
                <h3>{t("totalAmt")}</h3>
                <p>${schedulerResponse?.guest3Detail?.services?.price}</p>
              </li>
            </ul>
            <ul className="employee-time-list">
              <li>
                <h3>{t("employee")}</h3>
                <p>{schedulerResponse?.guest3Detail?.employee?.name}</p>
              </li>
              <li>
                <h3>{t("time")}</h3>
                <p>{calculateTime(schedulerResponse?.guest3Detail)}</p>
              </li>
            </ul>
          </div>
        )}
        {schedulerResponse?.guest > 3 && (
          <div className="reviewyourdetails">
            <h4>{t("guest")} # 4:</h4>
            <ul>
              <li>
                <h3>{t("serviceType")}</h3>
                <div className="flex-text-wrapper">
                  <p>{schedulerResponse?.guest4Detail?.services?.label}</p>
                  <p>
                    (
                    {schedulerResponse?.guest4Detail?.services?.time?.hour * 60 +
                      schedulerResponse?.guest4Detail?.services?.time?.minute}{" "}
                    Min)
                  </p>
                </div>
              </li>
              <li>
                <h3>{t("totalAmt")}</h3>
                <p>${schedulerResponse?.guest4Detail?.services?.price}</p>
              </li>
            </ul>
            <ul className="employee-time-list">
              <li>
                <h3>{t("employee")}</h3>
                <p>{schedulerResponse?.guest4Detail?.employee?.name}</p>
              </li>
              <li>
                <h3>{t("time")}</h3>
                <p>{calculateTime(schedulerResponse?.guest4Detail)}</p>
              </li>
            </ul>
          </div>
        )}
        <div className="reviewyourdetails">
          <ul className="employee-time-list">
            <li>
              <h3>{t("totalCharge")}</h3>
              <p>${calculatePrice()}</p>
            </li>
          </ul>
        </div>
        <div className="booking-confirms-block">
          <h3>{t("cancelPolicy")} </h3>
          <ul>
            <li>1- {t("cancelPolicy1")}</li>
            <li>2- {t("cancelPolicy2")}</li>
            <li>3- {t("cancelPolicy3")}</li>
          </ul>
          <div className="confirm-footer-wrapper">
            <LoadingButton
              disabled={loading}
              label={`${t("confirmAndPay")}`}
              loadinglabel={`${t("confirmAndPay")}`}
              isLoading={loading}
              className="loading-btn-wrapper"
              onClick={(e) => handleSubmit(e)}
            />
            <Button isBorderBtn={true} onClick={() => goBack()}>
              {t("goBack")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ConformDetail);
