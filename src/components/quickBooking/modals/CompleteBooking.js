import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  cmsSelectSpa,
  finalBookData,
  handleStep,
  manageGuestResponse,
  manageSchedulerResponse,
} from "@/redux/quickBooking";
import { Button, Image } from "@/styles/global/main.style";
import { SchedulerModalLayoutWrapper } from "@/styles/pages/scheduler.style";

const CompleteBooking = () => {
  // const
  const dispatch = useDispatch();
  // const { schedulerData } = useSelector(quickBookingSliceSelector);
  const { t } = useTranslation();
  // const { back } = useRouter();

  // // function
  // const refresh = () => {
  //   // window.location.reload();
  //   dispatch(manageSchedulerResponse(null));
  //   // dispatch(schedulerDetail(null))
  //   dispatch(manageGuestResponse(null));
  //   dispatch(finalBookData(null));
  //   back();
  //   dispatch(handleStep(1));
  // };

  const next = () => {
    dispatch(manageSchedulerResponse(null));
    // dispatch(schedulerDetail(null))
    dispatch(manageGuestResponse(null));
    dispatch(finalBookData(null));
    dispatch(handleStep(11));
    dispatch(cmsSelectSpa(false));
  };

  return (
    <>
      <SchedulerModalLayoutWrapper className="congrats-block-wrapper">
        <div className="user-img-wrapper">
          <Image isContainImg={true} alt="sitback" src="/images/sitback-relax-logo.svg" />
        </div>
        <h4>Booking Request Received!</h4>

        {/* <p>{schedulerData?.data?.username} will contact you soon to confirm!</p> */}
        <p>Your request has been sent!</p>
        <p>Sitback is reaching out to your selected spa now. </p>
        <p>You’ll receive a confirmation soon!</p>
        <div className="mt-4 mb-2 text-center">
          <Button onClick={() => next()}>{t("downloadSitback")}</Button>
        </div>
      </SchedulerModalLayoutWrapper>
    </>
  );
};

export default memo(CompleteBooking);
