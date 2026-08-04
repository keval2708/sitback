import { useRouter } from "next/navigation";
import { memo, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Block from "./Block";
import ConformDetail from "./conformDetail";
import GuestFour from "./GuestFour";
import GuestOne from "./GuestOne";
import GuestThree from "./GuestThree";
import GuestTwo from "./GuestTwo";
import MainModal from "./MainModal";
import MainUser from "./MainUser";
import PaymentDetail from "./paymentDetail";
import UserInfo from "./userInfo";
import {
  bookAppointmentSchedulerData,
  finalBookData,
  manageGuestResponse,
  manageSchedulerResponse,
  quickBookingSliceSelector,
} from "@/redux/quickBooking";
import { Image } from "@/styles/global/main.style";

const MasterModal = () => {
  // const
  const { currentStep, isMasterModalOpen, schedulerData, spaName } =
    useSelector(quickBookingSliceSelector);
  const { back } = useRouter();

  // hooks
  const dispatch = useDispatch();

  const onClose = async () => {
    // if (currentStep == 1) return;
    // dispatch(handleStep(currentStep - 1))
    await goBack();

    setTimeout(async() => {
        await dispatch(manageSchedulerResponse(null));
        await dispatch(manageGuestResponse(null));
        await dispatch(bookAppointmentSchedulerData(null));
        await dispatch(finalBookData(null));
    }, );


    // await dispatch(handleStep(1));
    // back();

    // window.location.reload();
  };

  const goBack = async () => {
    // Try using history.back() as a fallback in case the router does not work on mobile
    if (typeof window !== "undefined" && window.history) {
      window.history.back();
    } else {
      back(); // Next.js back navigation
    }
  };

  const renderCurrentForm = useMemo(() => {
    switch (currentStep) {
      case 1:
        return <MainModal />;
      // return <Block />;
      case 2:
        return <MainUser />;
      case 3:
        return <GuestOne />;
      case 4:
        return <GuestTwo />;
      case 5:
        return <GuestThree />;
      case 6:
        return <GuestFour />;
      case 7:
        return <UserInfo />;
      case 8:
        return <ConformDetail />;
      case 9:
        return <PaymentDetail />;
      case 12:
        return <Block />;

      default:
        return null;
    }
  }, [currentStep]);

  return (
    <>
      <Modal
        show={isMasterModalOpen}
        onHide={() => onClose()}
        aria-labelledby="example-modal-sizes-title-sm"
        backdrop="static"
        keyboard={false}
        centered
        className={`sitback-scheduler-modal-wrapper header-layout-change-wrapper sitback-start-booking-modal-wrapper ${
          currentStep == 7 || currentStep == 8 ? "reviewyourdetails-modal" : ""
        }`}
      >
        <Modal.Header className="red-close-icon">
          {/* <Modal.Title id="example-modal-sizes-title-sm">
            {schedulerData?.data?.username || spaName}
          </Modal.Title>
          <Link href="" className="logo-wrapper sitback-modal-mobile-view-header-logo">
            <Image isContainImg={true} alt="sitback" src="/images/scheduler-logov2.svg" />
          </Link> */}
          <div className="powered-text-display-wrapper">
            <p>Powered by: <span>Sitback</span></p>
          </div>
          <h4 className="spa-name-header-text">
            {schedulerData?.data?.username || spaName}
          </h4>
          <button className="close-modal-btn-wrapper" onClick={() => onClose()}>
            <i><Image isContainImg={true} alt="sitback" src="/images/red-close-icon.svg" /></i>
          </button>
        </Modal.Header>
        <Modal.Body className={`${currentStep == 8 ? "reviewyourdetails-wrapper" : ""}`}>
          {renderCurrentForm}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default memo(MasterModal);
