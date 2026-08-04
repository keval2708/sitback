
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Block from "./Block";
import CompleteBooking from "./CompleteBooking";
import ConformDetail from "./conformDetail";
import GuestFour from "./GuestFour";
import GuestOne from "./GuestOne";
import GuestThree from "./GuestThree";
import GuestTwo from "./GuestTwo";
import LinkScreen from "./LinkScreen";
import MainModal from "./MainModal";
import MainUser from "./MainUser";
import PaymentDetail from "./paymentDetail";
import UserInfo from "./userInfo";
import { bookAppointmentSchedulerData, finalBookData, handleStep, manageGuestResponse, manageSchedulerResponse, schedulerSliceSelector } from "@/redux/scheduler";
import { Image } from "@/styles/global/main.style";

const MasterModal = () => {

  // const
  const { currentStep, isMasterModalOpen, schedulerData, spaName } = useSelector(schedulerSliceSelector);
  const { back } = useRouter();

  // hooks
  const dispatch = useDispatch();

  const onClose = async () => {
    // if (currentStep == 1) return;
    // dispatch(handleStep(currentStep - 1))
    await dispatch(manageSchedulerResponse(null))
    await dispatch(manageGuestResponse(null))
    await dispatch(bookAppointmentSchedulerData(null));
    await dispatch(finalBookData(null))
    await dispatch(handleStep(1))
    // back();
    await goBack();
    // window.location.reload();
  }

  const goBack = async () => {
    back();
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
      case 10:
        return <CompleteBooking />;
      case 11:
        return <LinkScreen />;
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
        centered
        className={`sitback-scheduler-modal-wrapper ${currentStep == 7 || currentStep == 8 ? 'reviewyourdetails-modal' : ''}`}
      >
        <Modal.Header closeButton className="red-close-icon">
          <Link href="" className="logo-wrapper">
            <Image isContainImg={true} alt="sitback" src="/images/scheduler-logo.svg" />
          </Link>
          <Modal.Title id="example-modal-sizes-title-sm">{schedulerData?.data?.username || spaName}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={`${currentStep == 8 ? 'reviewyourdetails-wrapper' : ''}`}>
          {renderCurrentForm}
        </Modal.Body>
      </Modal>

    </>
  );

};

export default memo(MasterModal);
