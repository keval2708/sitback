"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import * as gtag from "../../../lib/gtag";
import HomeHeader from "@/components/homeheader/page";
import { bookAppointmentSchedulerData, finalBookData, manageGuestResponse, manageSchedulerResponse } from "@/redux/quickBooking";
import { Button, Image, LoginTextTitle } from "@/styles/global/main.style";
import { ComingSoonLayoutWrapper, } from "@/styles/pages/comingsoon.style";
import { SchedulerModalLayoutWrapper } from "@/styles/pages/scheduler.style";


export default function endBookingPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onClose = async () => {

    window.location.href = "/";
    setTimeout(async() => {
        await dispatch(manageSchedulerResponse(null));
        await dispatch(manageGuestResponse(null));
        await dispatch(bookAppointmentSchedulerData(null));
        await dispatch(finalBookData(null));
    },);


    // await dispatch(handleStep(1));
    // back();

    // window.location.reload();
  };

   useEffect(() => {
     if (process.env.SERVER_TYPE == "production") {
      const handleRouteChange = () => {
      const url = `${window.location.href}`;
        gtag.pageview(url);
      };
       window.gtag('event', 'conversion', {'send_to': 'AW-11564679938/15KKCNmriaAaEIKGvIor'});
      handleRouteChange();
    }
  }, []);

  const [showLinkModel, setShowLinkModel] = useState(false);
  const [showEndBookingModel, setShowEndBookingModel] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowEndBookingModel(true)
    }, 450);

  }, []);

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
              {/* <Container>
                <h1>Amara Spa</h1>
              </Container> */}
            </div>
          </div>
        </div>
      </section>
    </ComingSoonLayoutWrapper>
     <Modal
        show={showEndBookingModel}
        onHide={() => onClose()}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
        className={`sitback-scheduler-modal-wrapper header-layout-change-wrapper sitback-updated-complete-booking-modal`}
      >
        <Modal.Header closeButton className="red-close-icon">
          {/* <Modal.Title id="example-modal-sizes-title-sm">
            {schedulerData?.data?.username || spaName}
          </Modal.Title> */}
          {/* <Link href="" className="logo-wrapper">
            <Image isContainImg={true} alt="sitback" src="/images/scheduler-logov2.svg" />
          </Link> */}
        </Modal.Header>
        <Modal.Body>
            <div className="login-above-image-div">
              <Link href="/" className="login-logo-div">
                <Image alt="sitback" src="/images/sitback-login-logo.svg" />
              </Link>
            </div>
            <SchedulerModalLayoutWrapper className="congrats-block-wrapper">
              {/* <div className="user-img-wrapper">
                <Image isContainImg={true} alt="sitback" src="/images/sitback-relax-logo.svg" />
              </div> */}
              <h4>Booking Request Received!</h4>

              {/* <p>{schedulerData?.data?.username} will contact you soon to confirm!</p> */}
              <p>Your request has been sent!</p>
              <p>Sitback is reaching out to your selected spa now. </p>
              <p>You’ll receive a confirmation soon!</p>
              <div className="mt-4 mb-2 text-center">
              <Button onClick={() => {
                  setShowLinkModel(true);
                  setShowEndBookingModel(false);
                }}>
              {t("downloadSitback")}
            </Button>
              </div>
            </SchedulerModalLayoutWrapper>
        </Modal.Body>
      </Modal>

       <Modal
        show={showLinkModel}
        onHide={() => onClose()}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
        className={`sitback-scheduler-modal-wrapper header-layout-change-wrapper sitback-download-app-modal-wrapper`}
      >
        <Modal.Header closeButton className="red-close-icon">
          {/* <Modal.Title id="example-modal-sizes-title-sm">
            {schedulerData?.data?.username || spaName}
          </Modal.Title> */}
          {/* <Link href="" className="logo-wrapper">
            <Image isContainImg={true} alt="sitback" src="/images/scheduler-logov2.svg" />
          </Link> */}
        </Modal.Header>
        <Modal.Body>
            <div className="login-above-image-div">
              <Link href="/" className="login-logo-div">
                <Image alt="sitback" src="/images/sitback-login-logo.svg" />
              </Link>
            </div>
             <SchedulerModalLayoutWrapper className="congrats-block-wrapper">
            <div className="app-store-wrapper">
              <LoginTextTitle className="app-store-modal-title-text">Your relaxation<br />starts with one simple download...</LoginTextTitle>
              <div className="app-store-btns-wrapper">
                <Link href="javascript:void(0)" className="app-store-btn app-store-spacing"  onClick={() => window.location = 'https://apps.apple.com/us/app/id6475679969'}>
                  <Image isContainImg={true} alt="sitback" src="/images/app-store-download-image.svg" />
                </Link>
                <Link href="javascript:void(0)" className="app-store-btn" onClick={() => window.location = 'https://play.google.com/store/apps/details?id=com.truvyn.sitback'}>
                  <Image isContainImg={true} alt="sitback" src="/images/google-play-download-image.svg" />
                </Link>
              </div>
            </div>
          </SchedulerModalLayoutWrapper>
        </Modal.Body>
      </Modal>
      {/* <MasterModal /> */}
    </>
  );
}
